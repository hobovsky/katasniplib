# katasniplib
Userscript with a sketch of a library of code snippets useful when creating Codewars kata

## Installation

`katasniplib` works as a user script run by [Tampermonkey](https://www.tampermonkey.net). To use the script, you need to install the Tampermonkey extension in your browser, and then install the script in its scripts library. If Tampermonkey is already available in your browser, clicking on a [direct link](https://github.com/hobovsky/katasniplib/raw/main/src/katasniplib.user.js) to the script should also trigger installation.

## Contributing

New features and ideas can be requested with a ticket labeled as `enhancement`.

New snippets can be proposed by:
- Creating a ticket labeled as `new-snippet`, preferrably by using the issue tempalte "Proposing a snippet", or
- Creating a pull request with an updated `library.json` metadata and a new markdown file with a content of the proposed snippet. Structure of the library file is described on [wiki](https://github.com/hobovsky/katasniplib/wiki/Structure-of-the-library-file). Schema of the `library.json` can be found in `resources/library.schema.json`.
