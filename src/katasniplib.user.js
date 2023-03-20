// ==UserScript==
// @name         Kata Snippets
// @namespace    https://github.com/hobovsky/katasniplib/
// @version      0.9
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
// @require      https://cdnjs.cloudflare.com/ajax/libs/selectize.js/0.15.2/js/selectize.min.js
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
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/selectize.js/0.15.2/css/selectize.default.min.css" type="text/css">
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
    // const BRANCH = "snippets/basic-organization";
    const BRANCH = "main";
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
                        <label for="tags" style="margin-top: 15px">Show only snippets tagged as:</label>
                        <select multiple id="tags">
                        </select>
                    </div>
                    <div class="column" style="padding: 10px">
                        <div id="sniplibcontent" class="markdown prose"/>
                        <a alt="View on GitHub" title="View on GitHub" id="showOnGithub" href="https://github.com/hobovsky/katasniplib/blob/main/content/snippets/">
                            <svg width="20px" style="fill: white;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg>
                        </a>
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

            let url = `https://raw.githubusercontent.com/hobovsky/katasniplib/${BRANCH}/content/snippets/${snippet.contentUrl}`;
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

            if(e.data.snippet.contentUrl) {
                let href = `https://github.com/hobovsky/katasniplib/blob/${BRANCH}/content/snippets/${e.data.snippet.contentUrl}`;
                jQuery('#showOnGithub').attr('href', href);
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
            $(`#${listIds[sectionName]}`).append(`<li data-snippet_id="${snippet.id}"><a data-snippetId="${snippet.id}">${snippet.title}</a></li>`);
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

            function isForLanguage(langId, snippet) {
                return !langId ||
                        snippet.language === langId ||
                        snippet.language === "all" ||
                        snippet.languages?.some(l => l == "all" || l == langId);
            }

            let idx=0;
            let snippets = [];
            for(let polyglot of library.polyglots ?? []) {
                let stencil = polyglot.stencil ?? {};
                for(let translation of polyglot.translations ?? []) {

                    idx++;
                    if(!isForLanguage(langId, translation))
                        continue;

                    let snippet = merge(stencil, translation);
                    snippet.id = idx;
                    snippets.push(snippet);
                }
            }

            for(let snippet of library.snippets ?? []) {
                snippet.id = idx++;
                if(!isForLanguage(langId, snippet))
                    continue;
                snippet.tags = snippet.tags ? new Set(snippet.tags) : notags;
                snippets.push(snippet);
            }

            return snippets;
        }


        let allTags = new Set();
        let loadedSnippets = loadSnippets(library, langId);
        for(let snippet of loadedSnippets) {
            for(let kataSnippet of snippet.kataSnippets) {
                listSnippet(snippet, kataSnippet);
            }
            for(let tag of snippet.tags ?? []) {
                allTags.add({tag});
            }
        }

        let loadedSnippetsById = new Map();
        for (let s of loadedSnippets) loadedSnippetsById.set(s.id, s);

        const idxs = {
            "sampleTests":      0,
            "submissionTests":  1,
            "completeSolution": 2,
            "solutionSetup":    3,
            "preloaded":        4,
            "description":      5
        };
        let accordion = jQuery("#accordion").accordion({active: idxs[editor] ?? 1 });


        let tagsSelect = null;

        function listTaggedSnippets() {
            let selectedTags = new Set(tagsSelect[0].selectize.getValue());
            let accordion = jQuery('#accordion');
            accordion.find('li').each(
                function(idx, elem) {
                    elem = jQuery(elem);
                    let relatedId = elem.data('snippet_id');
                    if(relatedId === undefined) return;
                    let relatedSnippet = loadedSnippetsById.get(relatedId);
                    if(!relatedSnippet) return;

                    if(selectedTags.size === 0 || [...relatedSnippet.tags].some(t => selectedTags.has(t))) {
                        elem.show();
                    } else {
                        elem.hide();
                    }
                }
            );
            accordion.accordion( "refresh" );
        }

        tagsSelect = jQuery("#tags").selectize({
            delimiter: " - ",
            valueField: "tag",
            labelField: "tag",
            searchField: ["tag"],
            options: [...allTags],
            onBlur: listTaggedSnippets
        });

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

            let url = `https://raw.githubusercontent.com/hobovsky/katasniplib/${BRANCH}/content/library.json`;
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