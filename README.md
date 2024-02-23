# MicroCODE's 'mcode-list' package
A public NPM Package of our internal list processing tools for Frontend and Backend JavaScript NodeJS projects.

This is an extremely 'light weight' package with *zero dependencies* (other than our own logging package which has none).

Identical logging on both...

* **Frontend** - in the Browser UI
* **Backend** - in the Server MVC


## Description

This is our own internal list processing (lisp) code. It is used to gain more flexibility than a standard 'Dictionary'.
Building large, extensible applications it is inevitable that you will have to extend decision trees and data sets.
Both of these can be defined as 'lists', lists that--when paired togther--make decisions, select data, execute functions, perform
transforms, etc. Over time we have distilled this down to two (2) simple functions:

* **mcode.swap()** - allows any 'list' to be used as 'keys' and any other list of the same size to be used as 'values'.
* **mcode.call()** - allows any 'list' to be used as 'keys' to call a function in any other list of the same size.

* To test, from the CLI in the package folder...

```
> node examples
```

* Example of package use...

<p align="left"><img src=".\.github\images\mcode-list-example-calls.png" width="720" title="List Calls..."></p>

* Corresponding results (logged to console by our **mcode-log** functions)...

<p align="left"><img src=".\.github\images\mcode-list-example-results.png" width="720" title="List Results..."></p>


## Dependencies

* **Production**
1) mcode-log - our standard logging package (_just for displaying list mismatch errors or test results_)

* **Development**
1) Node.JS - standard runtime environment
2) JSDocs - our preferred JavaScript documentation system
3) Jest.JS - our preferred JavaScript testing framework


## Development

When using list processing it's best to start with a good definition of the lists of objects your App will deal with.

**USE CASE #1**: Localization, or dynamic language switching. Where you can define lists for your UI to switch languages on-the-fly.

1) The first list is a set of App defined tokens that identify a piece of text somewhere in the UI.
2) The next list can be the English (EN) text list.
3) The next list can be the Spanish (SP) text list.
4) ...etc.

Then at runtime, you call...

1) uiToken = DOM Element ID
2) uiLanguage = Currently configured language from 'Settings/Context'
3) uiLanguageList = **mcode.swap**(uiLanguage, languages, languageLists);
4) uiElementText = **mcode.swap**(uiToken, uiTokens, uiLanguageList);
5) Place 'uiElementText' in the DOM Element.

...this is over simplified but you get the idea. Using techiques like these we produced the first Plant-Floor
manufacturing application in General Motors that could literally toggle thru all supported languages as fast as you could hit
the 'switch languages' key, including switching the language being used in the App Log files.

Adding a new language would involve:

1) Add the Language ID to the list 'languages'.
2) Add the languageList as a new list (probably external JSON item defined all 'uiTokens' in the new language).
3) Add the selection of the language to the uiLanguage menu (another list keyed off of 'langugages' list).
4) Add the new languageList to 'uiLanguages'.

NOTE: __No code would need to be touched anywhere__.

**USE CASE #2**: Move your code base to a data driven structure, one that is easily extended in the future without editing the code itself.

First step, remove all embedded __if-then-else__ and __switch-case__ logic from your App and externalize the lists that drive Application decisions.

* if-then-else
```
    if (key == key1)
    {
        value = value1;
    }
    else if (key == key2)
    {
        value = value2;
    }
    else if (key == key3)
    {
        value = value3;
    }
    ...
```

* switch-case
```
    switch key:
    {
        case key1:
            value = value1;
            break;
        case key2:
            value = value2;
            break;
        case key3:
            value = value3;
            break;
     ...
    }
```

* list-processing for key generated values
```
    keys: { key1, key2, key3 };
    values: { value1, value2, value3 };
    ...
    value = mcode.swap(key, keys, values);

```

* list-processing for key generated function calls
```
    keys: { key1, key2, key3 };
    functions: { func1, func2, func3 };
    ...
    value = mcode.call(key, keys, functions);

```

* list-processing with mixed or swapped lists (reversibility)
```
    keys: { key1, key2, key3 };
    values: { value1, value2, value3 };
    ...
    key = mcode.swap(value, values, keys);

```

Easier, clearer, concise, and extensible, and the lists can be externalized as JSON data.

### Installing

* Get to a terminal session in the local repo folder of your project.
* Use 'npm install' to load the package. It can be used 'stand-alone'...
```
npm install mcode-list
```

### Testing

This package includes a simple demo module: **examples.js**.
Running it directly will show you a set of examples for using **swap()** and **call()**.

* From your project directory after installation...
```
node .\node_modules\mcode-list\examples
```
...this will deomnstrate thru console logging various uses of the mcode-list functions.

* To test with **JEST**:
* From the **mcode-list** package directory...
```
npm install --save-dev jest
npm test
```

* A view of the JEST tests in the console...

<p align="left"><img src=".\.github\images\mcode-list-jest.png" width="720" title="Jest Results..."></p>


## Included Functions

These are the functions we want at the ready in any module for development and debug.

| Function	    | Description                                                                    | Usage                     |
|---------------|--------------------------------------------------------------------------------|---------------------------|
| **swap**      | Swaps a 'key' found in a key list with a matching 'value' in value list        | value = mcode.swap(key, keys, values)
| **call**      | Calls a function in a 'functions' list based on a 'key' found in a keys list   | result = mcode.call(key, keys, functions)


### Documentation

We believe is explicit code documentation, for other users, and for our 'future selves'.<br>
JSDocs is a standardized system for documenting functions and data structures that produces three (3) primary outputs:

1) Inline documentation for the coder.
2) Intellisense popup documentation for the coder for every function.
3) External 'reference manual' documentation for your entire code base, if used consistently.

* This entire project--like all our projects--is documented with **JSDocs**.

* To install JSDocs use, get to a terminal session in the project folder...
```
npm install --save-dev jsdoc
```
* Configure JSDoc processing in...
```
jsdoc.json
```
* To regenerate the JSDocs from all source code, use the following command (from the project root directory)...
```
jsdoc -c .jsdoc.json
```

...then open ./docs/index.html

<p align="left"><img src=".\.github\images\mcode-list-jsdocs.png" width="720" title="JSDocs..."></p>


## Help

Contact Timothy McGuire, support@mcode.com.


## Terminology

| Word or Acronym	| Description/Definition                                |
|-------------------|-------------------------------------------------------|
|  **NPM**	        | Node Package Manager, actually “Node PM”, “Node pkgmakeinst” a system to deploy, install, and maintain NodeJS Apps. (PM was a BASH utility).
|  **NVM**	        | Node Version Manager, a tool that supports changing NodeJS versions.
|  **MERN**         | MongoDB, Express, React, Node JS.
|  **MongoDB**      | A ‘NoSQL’ database designed for Cloud applications, also referred to as a ‘Document Store’.
|  **Express**      | Express is *not* a database but rather an ‘extensible routing language’ for communication between a Client and a Server.
|  **React**        | A Web UI development system, a JavaScript library developed by Facebook and made public—and Open Source—since 2013.
|  **Node JS**      | A development stack that executes from a local file store—on a local Server—instead of from a network of servers.
|  **JSDocs**       | A toolset to automatically generate API-style documentation from source code tagging.


## Authors

Contributor's names and contact info...

* Timothy McGuire [@TimothyMcGuire](https://twitter.com/TimothyMcGuire) - Founder, President-CEO of MicroCODE, Inc. a software and controls engineering company in Detroit, Michigan USA.


## Version History

* 0.1.2
    * Upgrade 'mcode-log' to v0.1.15.
* 0.1.1
    * Improved README examples, corrected typos.
* 0.1.0
    * Changed export to the Univeral Module Defintion (UMD) pattern, and now throw exceptions on list mismatches.
* 0.0.6 - 0.0.7
    * Updated 'mcode-log' to v0.1.11, corrected 'mcode.log()' call to 'log()' with this module, and updated README.
* 0.0.5
    * Updated 'mcode-log' to v0.1.5 and updated README.
* 0.0.4
    * Updated README, uninstalled JSDocs and Jest for publsihing.
* 0.0.3
    * Corrected JSDocs and Jest to DEV ONLY dependencies.
* 0.0.2
    * Added JSDocs, Jest and updated README.
* 0.0.1
    * Initial movement of our internal code into an NPM package for ease of use in other projects.

## Future Development

* 0.1.*
    * Any additional core code we will develop for general list processing work.
    * Complex function execution with passed arguments or passed functions.


## License

This project is licensed under the MIT License - see the LICENSE.md file for details


## MicroCODE Mantra

MicroCODE, Inc. was founded in 1987 as a controls engineering and software development company.<br>
We specialize in manufacturing and quality control applications that must run 24x7x365 for years at a time.

Our slogan, distilled from over three decades of developing, testing, installing, and supporting 24x7x365
manufacturing applications, is..

<p align="left"><img src=".\.github\images\hail-caesar.png" width="720" title="Hail Caesar!"></p>
