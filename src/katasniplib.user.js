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
// @require     http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js
// @require     http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/jquery-ui.min.js
// @require     https://greasyfork.org/scripts/21927-arrive-js/code/arrivejs.js?version=198809
// @require     https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/languages/ocaml.min.js
// @require     https://cdn.jsdelivr.net/npm/marked/marked.min.js
// ==/UserScript==

// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/default.min.css">
// <script src=""></script>

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

let snippetsLib = GM_getValue("katasnippets.library");
if(!snippetsLib) {
    console.info("Loading empty library");
    snippetsLib = { snippets: [], tags: [] };
    GM_setValue("katasnippets.library", snippetsLib);
}

    function buildSnippetsDialog(lang, editor) {

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

        function showSnippetContent(e) {
            document.getElementById('sniplibcontent').innerHTML =
            marked.parse(e.data.snippet.content);

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
        for(let snippet of snippetsLib.snippets) {
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

    function getSnippetsDialog() {
        let lang = getActiveLang();
        let dialog = buildSnippetsDialog(lang);
        return dialog;
    }

    function showSnippetsLibrary() {
        getSnippetsDialog().dialog("open");
    }

    $(document).arrive(".commands-container ul", {existing: true, onceOnly: false}, function(elem) {
        $(elem).append('<li><a id="lnkShowSnippets">{...}</a></li>');
        $("#lnkShowSnippets").click(showSnippetsLibrary);
    });


})();