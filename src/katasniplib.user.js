// ==UserScript==
// @name         Kata Snippets
// @namespace    https://github.com/hobovsky/katasniplib/
// @version      0.7
// @description  Insert snippets into kata
// @author       hobovsky
// @match        https://www.codewars.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=codewars.com
// @updateURL    https://github.com/hobovsky/katasniplib/raw/main/src/katasniplib.user.js
// @downloadURL  https://github.com/hobovsky/katasniplib/raw/main/src/katasniplib.user.js
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        GM_listValues
// @grant        GM_xmlhttpRequest
// @connect      raw.githubusercontent.com
// @require      http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js
// @require      http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.1/jquery-ui.min.js
// @require      https://greasyfork.org/scripts/21927-arrive-js/code/arrivejs.js?version=198809
// @require      https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/languages/ocaml.min.js
// @require      https://cdn.jsdelivr.net/npm/marked/marked.min.js
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

    const STORAGE_VALUE_KEY_LIBRARY = "katasnippets.library";
    const STORAGE_VALUE_KEY_SNIPPET = "katasnippets.snippet.";
    function clearLocalStorageCache() {
        GM_deleteValue(STORAGE_VALUE_KEY_LIBRARY);
        for(let key of GM_listValues()) {
            if(key.startsWith(STORAGE_VALUE_KEY_SNIPPET)) {
                GM_deleteValue(key);
            }
        }
    }

    function fetchAborted() {
        console.info("Fetch aborted.", "info");
    }
    function fetchError() {
        console.info("ERROR!", "error");
    }
    let currentDialog = null;
    function buildSnippetsDialog(lang, library, editor) {

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
                let snippet = resp.context;
                snippet.content = markdown;
                console.info(`Caching snippet from url [${url}]`, "info");
                GM_setValue(STORAGE_VALUE_KEY_SNIPPET + snippet.contentUrl, snippet.content);
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
                let cachedContent = GM_getValue(STORAGE_VALUE_KEY_SNIPPET + e.data.snippet.contentUrl, null);
                if(cachedContent?.length) {
                    console.info(`Reusing cached snippet for contentUrl=${e.data.snippet.contentUrl}`);
                    presentSnippet(cachedContent);
                } else {
                    fetchSnippet(e.data.snippet);
                }
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

        function loadSnippets(library, langId) {

            let notags = new Set();

            function merge(stencil, translation) {
                if(!translation.title       ) translation.title        = stencil.title;
                if(!translation.summary     ) translation.summary      = stencil.summary;
                if(!translation.kataSnippets) translation.kataSnippets = stencil.kataSnippets;
                if(!translation.content     ) translation.content      = stencil.content;
                if(!translation.contentUrl  ) translation.contentUrl   = stencil.contentUrl;
                translation.tags = (translation.tags || stencil.tags) ? new Set([...translation.tags ?? [], ...stencil.tags ?? []]) : notags;
                return translation;
            }

            let idx=0;
            let snippets = [];
            for(let polyglot of library.polyglots ?? []) {
                let stencil = polyglot.stencil ?? {};
                for(let translation of polyglot.translations ?? []) {

                    idx++;
                    if(langId && translation.languages.every(l => l != "all" && l != langId))
                        continue;

                    let snippet = merge(stencil, translation);
                    snippet.id = idx;
                    snippets.push(snippet);
                }
            }

            for(let snippet of library.snippets ?? []) {
                snippet.id = idx++;
                if(langId && snippet.languages.every(l => l != "all" && l != langId))
                    continue;
                snippet.tags = snippet.tags ? new Set([...snippet.tags]) : notags;
                snippets.push(snippet);
            }

            return snippets;
        }


        for(let snippet of loadSnippets(library, langId)) {
            for(let kataSnippet of snippet.kataSnippets) {
                listSnippet(snippet, kataSnippet);
            }
        }

        const idxs = {
            "sampleTests":      0,
            "submissionTests":  1,
            "completeSolution": 2,
            "solutionSetup":    3,
            "preloaded":        4,
            "description":      5
        };
        let accordion = jQuery("#accordion").accordion({active: idxs[editor] ?? 1 });

        let dialog = jQuery('#glotSnippetsDialog').dialog({
            autoOpen: false,
            height: 600,
            width: "80%",
            modal: true,
            resizable: true,
            title: "Snippets library for " + langName,
            buttons: [
                {
                    text: "Clear cache",
                    click: function() {
                        clearLocalStorageCache();
                        jQuery(this).dialog("close");
                    }
                },
                {
                    text: "OK",
                    click: function() { jQuery(this).dialog("close"); }
                }
            ]
        });
        dialog.accordion = accordion;
        return dialog;
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


    function getSnippetsDialog(library, editor, lang) {

        if(lang.langId == currentDialog?.lang?.langId) {
            console.info(`Reusing existing dialog for ${lang.langId}`);

            const idxs = {
                "sampleTests":      0,
                "submissionTests":  1,
                "completeSolution": 2,
                "solutionSetup":    3,
                "preloaded":        4,
                "description":      5
            };
            let activeSection = idxs[editor] ?? 1;
            currentDialog.accordion.accordion("option", "active", activeSection);

            return currentDialog;
        }

        console.info(`Creating dialog for ${lang.langId}`);
        currentDialog = buildSnippetsDialog(lang, library, editor);
        currentDialog.lang = lang;
        return currentDialog;
    }

    function showSnippetsLibrary(e) {

        let editor = e.data.editor;
        let lang = getActiveLang();
        let go = library => getSnippetsDialog(library, editor, lang).dialog("open");

        let snippetsLib = GM_getValue(STORAGE_VALUE_KEY_LIBRARY, null);
        if(snippetsLib) {
            go(snippetsLib);
        } else {
            console.info("Loading snippets library...");

            function libraryDownloaded(resp) {
                if (resp.readyState !== 4) return;
                const snippetsLib = resp.response;
                GM_setValue(STORAGE_VALUE_KEY_LIBRARY, snippetsLib);
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
            console.info(`Fetching snippet library from url [${url}]`, "info");
        }
    }

    $(document).arrive(".commands-container ul", {existing: true, onceOnly: false}, function(elem) {

        function getEditor(e) {
            let editorId = jQuery(e).parents("li[data-tab]").first().data("tab");
            if(!editorId)
                return null;

            return {
                write_description: "description",
                answer:            "completeSolution",
                code:              "completeSolution",
                setup:             "solutionSetup",
                package:           "preloaded",
                fixture:           "submissionTests",
                example_fixture:   "sampleTests"
            }[editorId];
        }

        let editor = getEditor(elem) || "submissionTests";
        $(elem).append('<li><a class="lnkShowSnippets">{...}</a></li>');
        $(elem).find("li a.lnkShowSnippets").on("click", { editor }, showSnippetsLibrary);
    });


})();