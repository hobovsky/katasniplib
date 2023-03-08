// ==UserScript==
// @name         Kata Snippets
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Insert snippets into kata
// @author       You
// @match        https://www.codewars.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=codewars.com
// @grant   GM_addStyle
// @grant   GM_getValue
// @grant   GM_setValue
// @grant   GM_xmlhttpRequest
// @connect raw.githubusercontent.com
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js
// @require     http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/jquery-ui.min.js
// @require     https://greasyfork.org/scripts/21927-arrive-js/code/arrivejs.js?version=198809
// @require     https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/languages/ocaml.min.js
// @require     https://cdn.jsdelivr.net/npm/marked/marked.min.js
// ==/UserScript==

console.info("Tampermonkey script started");

(function() {
    'use strict';
    var $ = window.jQuery;
    const JQUERYUI_CSS_URL = '//ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/themes/dark-hive/jquery-ui.min.css';
    $.noConflict();
    $("head").append(`
        <link href="${JQUERYUI_CSS_URL}" rel="stylesheet" type="text/css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/default.min.css" type="text/css">
     `);

    let css = `
.row {
  display: flex;
}

.column {
  flex: 50%;
  padding: 10px;
}

ul.snippetsList {
  list-style-type: disc;
}
`;
    GM_addStyle(css);

    function fetchAborted() {
        console.info("Fetch aborted.", "info");
    }
    function fetchError() {
        console.info("ERROR!", "error");
    }

    function buildSnippetsDialog(lang, library) {

        jQuery('#glotSnippetsDialog').remove();

        jQuery('body').append(`
            <div id='glotSnippetsDialog' title='Snippets Library for Python'>
                <div class="row">
                <div class="column">
                <div id='accordion'>
                    <h3>Sample tests</h3>
                    <div><ul class="snippetsList" id="listSampleTestsSnippets"/></div>
                    <h3>Submission tests</h3>
                    <div><ul class="snippetsList" id="listSubmissionTestsSnippets"/></div>
                    <h3>Complete solution</h3>
                    <div><ul class="snippetsList" id="listCompleteSolutionSnippets"/></div>
                    <h3>Solution setup</h3>
                    <div><ul class="snippetsList" id="listSolutionSetupSnippets"/></div>
                    <h3>Preloaded code</h3>
                    <div><ul class="snippetsList" id="listPreloadedSnippets"/></div>
                    <h3>Description</h3>
                    <div><ul class="snippetsList" id="listDescriptionSnippets"/></div>
                </div>
                </div>
                <div class="column" style="padding: 10px">
                  <div id="sniplibcontent" class="markdown prose">
                  </div>
                </div>
                </div>
            </div>`);

        const listIds = {
            "sampleTests":      "listSampleTestsSnippets",
            "submissionTests":  "listSubmissionTestsSnippets",
            "completeSolution": "listCompleteSolutionSnippets",
            "solutionSetup":    "listSolutionSetupSnippets",
            "preloaded":        "listPreloadedSnippets",
            "description":      "listDescriptionSnippets"
        };


        function fetchSnippet(snippet) {

            function snippetDownloaded(resp) {
                if (resp.readyState !== 4) return;
                const markdown = resp.response;
                presentSnippet(markdown);
            }

            let url = `https://raw.githubusercontent.com/hobovsky/katasniplib/main/content/snippets/${snippet.contentUrl}`;
            let opts = {
                method: "GET",
                url: url,
                onreadystatechange: snippetDownloaded,
                onabort: fetchAborted,
                onerror: fetchError,
                context: snippet,
                responseType: "text"
            };
            GM_xmlhttpRequest(opts);
            console.info(`Fetching snippet ${snippet} from url [${url}]`, "info");
        }

        function showSnippetContent(e) {

            let markdown = e.data.snippet.content;
            if(markdown) {
                presentSnippet(markdown);
            } else {
                fetchSnippet(e.data.snippet);
            }
        }


        function presentSnippet(markdown) {
            document.getElementById('sniplibcontent').innerHTML =
                marked.parse(markdown);

            document.querySelectorAll('#sniplibcontent pre code').forEach((el) => {
                hljs.highlightElement(el);
            });
        }

        function listSnippet(snippet, sectionName) {
            $(`#${listIds[sectionName]}`).append(`<li><a data-snippetId="${snippet.id}">${snippet.title}</a></li>`);
            $(`#${listIds[sectionName]}`).find('li a').last().on("click", {snippet: snippet}, showSnippetContent);
        }

        let { langId, langName } = lang;
        let idx=0;
        for(let snippet of library.snippets) {
            snippet.id = idx++;
            if(langId && snippet.languages.every(l => l != "all" && l != langId))
                continue;
            for(let kataSnippet of snippet.kataSnippets) {
                listSnippet(snippet, kataSnippet);
            }
        }

        jQuery("#accordion").accordion();

        return jQuery('#glotSnippetsDialog').dialog({
            autoOpen: false,
            height: 600,
            width: "80%",
            modal: true,
            resizable: true,
            title: "Snippets library for " + langName,
            buttons: [
                {
                    text: "OK",
                    click: function() { jQuery(this).dialog("close"); }
                }
            ]
        });
    }

    function getActiveLang() {
        let lang = jQuery("#language_dd");
        if(!lang.length)
            lang = jQuery("#languages");

        lang = lang.find("dd.is-active");
        let langId = lang.attr("data-language");
        let langName = lang.text();
        return { langId, langName };
    }

    function getSnippetsDialog(library) {
        let lang = getActiveLang();
        let dialog = buildSnippetsDialog(lang, library);
        return dialog;
    }

    function showSnippetsLibrary() {

        let go = library => getSnippetsDialog(library).dialog("open");

        let snippetsLib = GM_getValue("katasnippets.library");
        if(snippetsLib) {
            go(snippetsLib);
        } else {
            console.info("Loading empty library");

            function libraryDownloaded(resp) {
                if (resp.readyState !== 4) return;
                const snippetsLib = resp.response.data;
                GM_setValue("katasnippets.library", snippetsLib);
                go(snippetsLib);
            }

            let url = `https://raw.githubusercontent.com/hobovsky/katasniplib/main/content/library.json`;
            let opts = {
                method: "GET",
                url: url,
                onreadystatechange: libraryDownloaded,
                onabort: fetchAborted,
                onerror: fetchError,
                context: {},
                responseType: "json"
            };
            GM_xmlhttpRequest(opts);
            console.info(`Fetching snippet ${snippet} from url [${url}]`, "info");
        }
    }

    $(document).arrive(".commands-container ul", {existing: true, onceOnly: false}, function(elem) {
        $(elem).append('<li><a id="lnkShowSnippets">{...}</a></li>');
        $("#lnkShowSnippets").click(showSnippetsLibrary);
    });


})();