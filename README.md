# MicroCODE's 'mcode-list' package
A public NPM Package of our internal list processing tools for Frontend and Backend JavaScript NodeJS projects.

This is an extremely 'light weight' package with *zero dependencies* (other than our own logging package which has none).

Identical logging on both...

* **Frontend** - in the Browser UI
* **Backend** - in the Server MVC


## Description

This is our internal list processing (lisp) code. It is used for more flexibility than a standard 'Dictionary'.

* **mcode.swap()** - allows any 'list' to be used as 'keys' and any other list of the same size to be used as 'values'.
* **mcode.call()** - allows any 'list' to be used as 'keys' to call a function in any other list of the same size.

* To test, from the CLI in the package folder...

```
> node examples
```

* Example of package usage...

<p align="left"><img src=".\.github\images\mcode-list-example-calls.png" width="720" title="List Calls..."></p>

* Corresponding results...

<p align="left"><img src=".\.github\images\mcode-list-example-results.png" width="720" title="List Results..."></p>


## Dependencies

* **Production**
1) mcode-log - our standard logging package (_just for displayed list mismatch errors_)

* **Development**
1) Node.JS - standard runtime environment
2) JSDocs - our preferred JavaScript documentation system
3) Jest.JS - our preferred JavaScript testing framework


## Development

When using list process its best to start with a good definition of the lists of objects your App will deal with.

**USE CASE #1**: Localization, or dynamic language switching. Where you can define lists for your UI to switch languages on-the-fly.

1) The first list is a set of App defined tokens that identify a piece of text somewhere in the UI.
2) The next list can be the English (EN) text list.
3) The next list can be the Spanish (SP) text list.
4) etc.

At runtime you then call...

1) uiToken = DOM Element ID
2) uiLanguageList = **mcode.swap**(uiLanguage, languages, languageLists);
3) uiElementText = **mcode.swap**(uiToken, uiTokens, uiLanguageList);
4) Place 'uiElementText' in the DOM Element.

...this is over simplified but you ge tthe idea I'm sure. Using techiques like these we produced the first Plant-Floor
manufacturing application in General Motors that could literally toggle thru all supported languages as fast as you could hit
the 'switch languages' key, including switching the language being used in the App Log files.

**USE CASE #2**: Remove all embedded if-then-else and switch-case logic from your App and externalize the lists that drive Application decisions.

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

* list-processing with mixed lists (reversibility)
```
    keys: { key1, key2, key3 };
    values: { value1, value2, value3 };
    ...
    key = mcode.swap(value, values, keys);

```

Easier, clearer, consise, and extensible, and the lists can be externalized as JSON data.

### Installing

* Use "npm install" to load the package, it can be used 'stand-alone'...
```
npm install mcode-list
```

### Testing

This package includes a simple test/demog module: **index.test.js**. running it direclty will show you all the 'log' and 'exp' formatting that occurs into the console and the recursive destruction of objects when they are logged.

* From your project directory...
```
node .\node_modules\mcode-list\examples
```
...you should see the 'severities' example shown earlier in this README.

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

* This entire project is documented with **JSDocs**

* To install JSDocs use...
```
npm install --save-dev jsdoc
```
* Configure JSDoc processing in...
```
jsdoc.json
```
* To regenerate the JSDocs from all source code use (from project root directory)...
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
|  **NVM**	        | Node Version Manager, a tool that support changing NodeJS versions.
|  **MERN**         | MongoDB, Express, React, Node JS.
|  **MongoDB**      | A ‘NoSQL’ database designed for Cloud applications, also referred to as a ‘Document Store’.
|  **Express**      | Express is *not* a database but rather an ‘extensible routing language’ for communication between a Client and a Server.
|  **React**        | A Web UI development system, a JavaScript library developed by Facebook and made public—and Open Source—since 2013.
|  **Node JS**      | A development stack that executes from a local file store—on a local Server—instead of from a network of |  **JSDocs**           | A toolset to automatically generate API-style documentation from source tagging.


## Authors

Contributors names and contact info...

* Timothy J McGuire [@TimothyMcGuire](https://twitter.com/TimothyMcGuire)


## Version History

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

* 0.0.*
    * ESM and CJS packaging.
* 0.0.*
    * Any additional core code we development for general JavaScript MERN coding, debug, and support.


## License

This project is licensed under the MIT License - see the LICENSE.md file for details


## MicroCODE Mantra

Our slogan mark, distilled from over three decades of developing, testing, installing, and supporting 24x7x365
manufacturing applications...

<p align="left"><img src=".\.github\images\hail-caesar.png" width="720" title="Hail Caesar!"></p>
