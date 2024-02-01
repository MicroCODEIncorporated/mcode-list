// #region  F I L E
// <copyright file="mcode-list/index.js" company="MicroCODE Incorporated">Copyright © 2022-2024 MicroCODE, Inc. Troy, MI</copyright><author>Timothy J. McGuire</author>
// #region  M O D U L E

// #region  D O C U M E N T A T I O N
/*
 *      Title:    MicroCODE Shared Function Library
 *      Module:   modules (node_modules/mcode-list/index.js)
 *      Project:  MicroCODE MERN Applications
 *      Customer: Internal+MIT xPRO Course
 *      Creator:  MicroCODE Incorporated
 *      Date:     January 2022-2024
 *      Author:   Timothy McGuire
 *
 *      MIT License: MicroCODE.mcode-list
 *
 *      Copyright (c) 2022-2024 Timothy McGuire, MicroCODE, Inc.
 *
 *      Permission is hereby granted, free of charge, to any person obtaining a copy
 *      of this software and associated documentation files (the "Software"), to deal
 *      in the Software without restriction, including without limitation the rights
 *      to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *      copies of the Software, and to permit persons to whom the Software is
 *      furnished to do so, subject to the following conditions:
 *
 *      The above copyright notice and this permission notice shall be included in all
 *      copies or substantial portions of the Software.
 *
 *      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *      IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *      FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *      AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *      LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *      OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *      SOFTWARE.
 *
 *
 *      DESCRIPTION:
 *      ------------
 *
 *      This module implements the MicroCODE's Common JavaScript functions for list processing.
 *
 *
 *      REFERENCES:
 *      -----------
 *
 *      1. MIT xPRO Course: Professional Certificate in Coding: Full Stack Development with MERN
 *
 *      2. LADDERS® source code: MACRO-11, MACRO-32, C#, and JavaScript.
 *
 *
 *
 *
 *      MODIFICATIONS:
 *      --------------
 *
 *  Date:         By-Group:   Rev:    Description:
 *
 *  30-Jan-2024   TJM-MCODE  {0001}   New module for common reusable JavaScript list processing functions.
 *  01-Feb-2024   TJM-MCODE  {0002}   Changed to the Universal Module Definition (UMD) pattern to support AMD,
 *                                    CommonJS/Node.js, and browser global in our exported module.
 *  01-Feb-2024   TJM-MCODE  {0003}   Swap() and Call() now throw an error if the 'keys' and 'values' lists are not the same length,
 *                                    instead of looging the error and returning a default value.
 *
 *
 *
 * NOTE: This module follow's MicroCODE's JavaScript Style Guide and Template JS file, see:
 *
 *       o  https://github.com/MicroCODEIncorporated/JavaScriptSG
 *       o  https://github.com/MicroCODEIncorporated/TemplatesJS
 *
 */

// #endregion

// #region  I M P O R T S

const log = require('mcode-log');
const packageJson = require('./package.json');

// #endregion

// #region  T Y P E S

// #endregion

// #region  I N T E R F A C E S

// #endregion

// #region  C O N S T A N T S, F U N C T I O N S – P U B L I C

// MicroCODE: define this module's name for our 'mcode-log' package
const moduleName = 'mcode-list.js';

// define local copy of 'getEnvVar()' for use before 'mcode' is loaded
// this same function is available in 'mcode-env.js' but we need it here without that package

/**
 * @function getEnvVar
 * @memberof mcode
 * @desc a private helper function that returns the value of an environment variable, or a default value if not found.
 * @param {any} key the name of the environment variable to get.
 * @param {any} defaultValue the default value to return if the environment variable is not found.
 * @returns {any} the value of the environment variable, or the default value if not found.
 */
function getEnvVar(key, defaultValue)
{
    if (typeof process !== 'undefined' && process.env && key in process.env)
    {
        return process.env[key];
    }
    return defaultValue;
};

// get our environment variables if we're on a Node.js platform
const theme = getEnvVar('THEME', 'dark'); // default to dark mode
const mode = getEnvVar('NODE_ENV', 'development'); // default to development mode

/**
 * @func getIndex
 * @memberof mcode
 * @desc a private helper function that returns the index of a 'key' in a 'keys' list
 * or the last/default index in the 'keys' list if not found.
 * @param {any} key a JavaScript value viewed as a 'key' in the 'keys' list.
 * @param {any[]} keys a JavaScript array of values viewed as 'keys' list.
 * @returns {number} the index of the 'key' in the 'keys' list or the last/default index in the list if not found
 */
function getIndex(key, keys)
{
    let index = keys.indexOf(key);
    return (index === -1) ? (keys.length - 1) : index;
}

/**
 * @namespace mcode
 * @desc mcode namespace containing functions and constants.
 */
const mcode = {

    /**
     * @func ready
     * @memberof mcode
     * @desc Logs a message to the Console when the module is loaded to show version.
     */
    ready: function ()
    {
        log.success(`MicroCODE ${moduleName} v${packageJson.version} is loaded, mode: ${mode}, theme: ${theme}.`, moduleName);
    },

    /**
     * @func swap
     * @memberof mcode
     * @desc Swaps a 'key' from a 'keys' list with a 'value' in a 'values' list.
     * @api public
     * @param {any} key a JavaScript value viewed as a 'key' in the 'keys' list.
     * @param {any[]} keys a JavaScript array of values viewed as a 'keys' list.
     * @param {any[]} values a JavaScript array of values viewed as the 'values' list.
     * @returns {any} the value from the 'values' list corresponding to the 'key' in the 'keys' list.
     *
     * @example
     *     let list1 = [1, 2, 3, 4, 5, 0];
     *     let list2 = ['one', 'two', 'three', 'four', 'five', 'default'];
     *     let list3 = [false, true, false, true, false, false];
     *     let list4 = [{ key: 1, property: ONE },
     *                  { key: 2, property: TWO },
     *                  { key: 3, property: THREE },
     *                  { key: 4, property: FOUR },
     *                  { key: 5, property: FIVE },
     *                  { key: 0, property: DEFAULT }];
     *
     *     let key = null;
     *     let value = null;
     *
     *  1) straight swap of two values...
     *
     *     key = 3;
     *     value = mcode.swap(key, list1, list2);  // value = 'three'
     *
     *     key = 6;
     *     value = mcode.swap(key, list1, list2);  // value = 'default'
     *
     *     key = 0;
     *     value = mcode.swap(key, list1, list2);  // value = 'default'
     *
     *  2) the same lists can be used the other way around...
     *
     *     key = 'three';
     *     value = mcode.swap(key, list2, list1);  // value = 3
     *
     *     key = 'six';
     *     value = mcode.swap(key, list2, list1);  // value = 0
     *
     *  3) any two lists on the same subject (i.e.: the same length) can be used...
     *
     *    key = 3;
     *    value = mcode.swap(key, list1, list3);  // value = false
     *
     *    key = 'three';
     *    value = mcode.swap(key, list2, list4);  // value = { key: 4, property: FOUR }
     *
     *
     *   ...seems simple enough, but keep in mind that the 'key' and 'value' in the lists can be any JavaScript value, including:
     *
     *   - a number
     *   - a string
     *   - a boolean
     *   - an object
     *   - a function
     *   - a class
     *   - a module
     *   - a BigInt
     *   - a Promise
     *   - an Array
     *   - a JSON object
     *   - null
     *   - undefined
     *     etc.
     *
     */
    swap: function (key, keys, values)
    {
        // ensure the 'keys' and 'values' lists are the same length
        if (keys.length !== values.length)
        {
            throw new Error(`mcode-list.swap(): The 'keys' and 'values' lists are not the same length, keys.length:${keys.length} !== values.length:${values.length}`);
        }

        // return the value from the 'values' list corresponding to the 'key' in the 'keys' list, or default value
        return values[getIndex(key, keys)];
    },

    /**
     * @func call
     * @memberof mcode
     * @desc Calls a function from a 'functions' list using a 'key' index found in a 'keys' list.
     * @api public
     * @param {any} key a JavaScript value viewed as a 'key' in the 'keys' list.
     * @param {any[]} keys a JavaScript array of values viewed as 'keys' list.
     * @param {any[]} functions a JavaScript array of values viewed as 'values' list.
     * @returns {any} the return value from the function called in 'functions' list corresponding to the 'key' in the 'keys' list.
     *
     * @example
     *      let keys = [1, 2, 3, 4, 5, null];
     *      let functions = [function1, function2, function3, function4, function5, default];
     *      let key = 3;
     *      let value = mcode.call(key, keys, functions);  // value = (return value of function3)
     */
    call: function (key, keys, functions)
    {
        // ensure the source and destination lists are the same length
        if (keys.length !== functions.length)
        {
            throw new Error(`mcode-list.call(): The 'keys' and 'functions' lists are not the same length, keys.length:${keys.length} !== functions.length:${functions.length}`);
        }

        // return the value of the function called from the 'functions' list corresponding to the 'key' in the 'keys' list, or the value returned by the default function
        return functions[getIndex(key, keys)]();
    },
};

// #endregion

// #region  M E T H O D - E X P O R T S

// Immediately Invoked Function Expression (IIFE) invoked on 'this' which
// represents the global object(window in a browser, global in Node.js).
// This IIFE returns the 'mcode' object to be assigned to the global object.
// The Universal Module Definition (UMD) pattern supports Asynchronous Module Definition (AMD),
// CommonJS / Node.js, and Browser 'global' usage.
(
    /**
     * @function (IIFE)
     * @description Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, and browser global
     * @param {any} root the global object (window, self, global, etc.) being updated.
     * @param {any} factory a function that returns the exports of the module. This function is invoked in
     * the context of the global object when the module is loaded. The return value of this function is used
     * as the exported value of the module when it's not being used with AMD or Node.js module systems.
     * This function is where you define what your module exports.
     */
    function (root, factory)
    {
        if (typeof define === 'function' && define.amd)
        {
            // AMD. Register as an anonymous module.
            define([], factory);
        }
        else if (typeof module === 'object' && module.exports)
        {
            // Node. Does not work with strict CommonJS, but
            // only CommonJS-like environments that support module.exports, like Node.
            module.exports = factory();
        }
        else
        {
            // Browser globals (root is 'window')
            root.mcode = factory();
        }

    }(  // root: the global object (window, self, global, etc.)
        (typeof self !== 'undefined') ? self : this,

        // factory: a function that returns the exports of the module
        function () {return mcode;})
);

// #endregion

// #endregion
// #endregion