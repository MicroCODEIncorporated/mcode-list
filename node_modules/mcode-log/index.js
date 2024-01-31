// #region  F I L E
// <copyright file="mcode-log/index.js" company="MicroCODE Incorporated">Copyright © 2022-2024 MicroCODE, Inc. Troy, MI</copyright><author>Timothy J. McGuire</author>
// #region  M O D U L E

// #region  D O C U M E N T A T I O N
/*
 *      Title:    MicroCODE Shared Function Library
 *      Module:   modules (node_modules/mcode-log/index.js)
 *      Project:  MicroCODE MERN Applications
 *      Customer: Internal+MIT xPRO Course
 *      Creator:  MicroCODE Incorporated
 *      Date:     January 2022-2024
 *      Author:   Timothy McGuire
 *
 *      MIT License: MicroCODE.mcode-log
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
 *      This module implements the MicroCODE's Common JavaScript functions for logging and debugging.
 *
 *
 *      REFERENCES:
 *      -----------
 *
 *      1. MIT xPRO Course: Professional Certificate in Coding: Full Stack Development with MERN
 *
 *      2.  List of ANSI Color Escape Sequences
 *          https://stackoverflow.com/questions/4842424/list-of-ansi-color-escape-sequences
 *
 *      3.  Showing Line Numbers in console.log from Node.js
 *          https://stackoverflow.com/questions/45395369/how-to-get-console-log-line-numbers-shown-in-nodejs
 *
 *
 *
 *
 *      MODIFICATIONS:
 *      --------------
 *
 *  Date:         By-Group:   Rev:    Description:
 *
 *  27-Jan-2022   TJM-MCODE  {0001}   New module for common reusable Javascript logging functions.
 *  05-Mar-2022   TJM-MCODE  {0002}   Documentation updates.
 *  04-May-0222   TJM-MCODE  {0003}   Corrected 'month' in timeStamp.
 *  03-Oct-2022   TJM-MCODE  {0004}   Added 'log()' to simplify console logging of app events.
 *  03-Oct-2022   TJM-MCODE  {0005}   Added use of 'vt' for colorizing Console Log entries.
 *  16-Oct-2022   TJM-MCODE  {0006}   Added 'success' as a severity.
 *  30-Oct-2023   TJM-MCODE  {0007}   Updated to TypeScript, reversed to pure JavaScript in Jan 2024.
 *  03-Dec-2023   TJM-MCODE  {0008}   Don't log 'debug' messages in staging or production mode.
 *  21-Jan-2024   TJM-MCODE  {0009}   Converted to a single ES6 Module (ESM) for use in both
 *                                    Frontend/Client and Backend/Server as a NodeJS package.
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

// #endregion

// #region  T Y P E S

// #endregion

// #region  I N T E R F A C E S

// #endregion

// #region  C O N S T A N T S, F U N C T I O N S – P U B L I C

const theme = process.env.THEME || 'dark'; // default to dark mode
const mode = process.env.NODE_ENV || 'development'; // default to development mode
const packageJson = require('./package.json');

// @ts-ignore TS6133 - standard module definition for 'debug' logging
const moduleName = 'mcode-log.js';

/**
 * @namespace mcode
 * @desc mcode namespace containing functions and constants.
 */
const mcode = {

    /**
     * @const vt
     * @memberof mcode
     * @desc Colors constants for changing Console appearance ala DEC's VT52 + VT100 + VT220.
     * @example
        ANSI Color Escape Sequence

        \x1b[***m  -- where '***' is a series of command codes separated by semi-colons (;).

        Code	Effect -- notes
        ------------------------------------------------------------------------------
        0	    Reset / Normal -- all attributes off
        1	    Bold -- increased intensity
        2	    Faint -- decreased intensity - not widely supported
        3	    Italic -- not widely supported, sometimes treated as inverse
        4	    Underline
        5	    Slow Blink -- less than 150 per minute
        6	    Rapid Blink -- MS-DOS ANSI.SYS; 150+ per minute; not widely supported
        7	    Reverse video -- swap foreground and background colors
        8	    Conceal -- not widely supported.
        9	    Crossed-out -- characters legible, but marked for deletion. Not widely supported
        10	    Primary font (default)
        11–19	Alternate font -- select alternate font n-10
        20	    Fraktur -- hardly ever supported
        21	    Bold off or Double Underline -- bold off not widely supported; double underline hardly ever supported
        22	    Normal color or intensity -- neither bold nor faint
        23	    Not italic, not Fraktur
        24	    Underline roundOff -- not singly or doubly underlined
        25	    Blink off
        27	    Inverse off
        28	    Reveal	conceal off
        29	    Not crossed out
        30–37	Set foreground color -- see color table below
        38	    Set foreground color -- next arguments are 5;<n> or 2;<r>;<g>;<b>, see below
        39	    Default foreground color -- implementation defined (according to standard)
        40–47   Set background color -- see color table below
        48	    Set background color -- next arguments are 5;<n> or 2;<r>;<g>;<b>, see below
        49	    Default background color -- implementation defined (according to standard)
        51	    Framed
        52	    Encircled
        53	    Overlined
        54	    Not framed or encircled
        55	    Not overlined
        60	    ideogram underline -- hardly ever supported
        61	    ideogram double underline -- hardly ever supported
        62	    ideogram overline -- hardly ever supported
        63	    ideogram double overline -- hardly ever supported
        64	    ideogram stress marking	hardly ever supported
        65	    ideogram attributes off	reset the effects of all of 60-64
        90–97	Set bright foreground color	aixterm (not in standard)
        100–107	Set bright background color	aixterm (not in standard)
     *
     */
    vt:
    {
        notice: "This is a test string for logifying 'mcode' as an object during testing.",

        // common effects, predefined ANSI escape sequences
        reset: "\x1b[0m",
        bold: "\x1b[1m",
        bright: "\x1b[1m",
        dim: "\x1b[2m",
        faint: "\x1b[2m",
        italic: "\x1b[3m",
        underscore: "\x1b[4m",
        underline: "\x1b[4m",
        blink: "\x1b[5m",
        blink_slow: "\x1b[5m",
        blink_fast: "\x1b[6m",
        reverse: "\x1b[7m",
        hidden: "\x1b[8m",
        conceal: "\x1b[8m",
        strikethru: "\x1b[9m",
        crossed_out: "\x1b[9m",

        // foreground colors
        fg: {
            black: "\x1b[30m",
            red: "\x1b[31m",
            green: "\x1b[32m",
            yellow: "\x1b[33m",
            blue: "\x1b[34m",
            magenta: "\x1b[35m",
            cyan: "\x1b[36m",
            white: "\x1b[37m",
        },

        // background colors
        bg: {
            black: "\x1b[40m",
            red: "\x1b[41m",
            green: "\x1b[42m",
            yellow: "\x1b[43m",
            blue: "\x1b[44m",
            magenta: "\x1b[45m",
            cyan: "\x1b[46m",
            white: "\x1b[47m",
        },

        // colors for event severity:   dark        light
        gray: (theme === 'dark') ? "\x1b[90m" : "\x1b[30m",  // gray
        errr: (theme === 'dark') ? "\x1b[91m" : "\x1b[31m",  // red
        good: (theme === 'dark') ? "\x1b[92m" : "\x1b[32m",  // green
        warn: (theme === 'dark') ? "\x1b[93m" : "\x1b[33m",  // yellow
        cold: (theme === 'dark') ? "\x1b[94m" : "\x1b[34m",  // blue
        dead: (theme === 'dark') ? "\x1b[95m" : "\x1b[35m",  // magenta
        hmmm: (theme === 'dark') ? "\x1b[96m" : "\x1b[36m",  // cyan
        info: (theme === 'dark') ? "\x1b[97m" : "\x1b[37m",  // white
        dbug: (theme === 'dark') ? "\x1b[97m" : "\x1b[37m",  // white

        // custom JSON colors -- see 'logify()' for use
        key: "\x1b[96m",  // key name
        value: "\x1b[93m",  // number, boolean, null
        string: "\x1b[94m",  // special value
    },

    /**
     * @func ready
     * @memberof mcode
     * @desc Logs a message to the Console when the module is loaded to show version.
     */
    ready: function ()
    {
        mcode.log(`MicroCODE ${moduleName} v${packageJson.version} is loaded, mode: ${mode}, theme: ${theme}.`, moduleName, 'success');
    },

    /**
     * @func log
     * @memberof mcode
     * @desc Logs App Events to the Console in a standardized format.
     * @api public
     * @param {object} message pre-formatted message to be logged.
     * @param {string} source where the message orginated.
     * @param {string} severity Event.Severity: 'info', 'warn', 'error', 'exception', and 'success'.
     * @param {string} error [Optional] error message from another source.
     * @returns {string} "{severity}: {message}" for display in UI.
     *
     * @example
     * From our other MicroCODE Apps:
     ++
       Message: 'Station SYNCHRONIZED to new Job from TRACKING IMAGE'

           Class: JobIdZone                                  Audience: Operator
          Object: 8                                         Condition: Takt=[0%]  Memory in use=[1,659,216.00]
           Event: 14                                         Severity: Confirmation
         Targets: AppLog, AppBanner, AppDatabase, AppSound

           Event: (see 'Message:' above)                      Time: Tuesday, August 10, 2021 06:57:47.623 AM
           Class: MicroCODE.AppBanner                         Type: App.Information
    --
     */
    log: function (message, source, severity, error = null)
    {
        let vt = mcode.vt;
        let entry1 = "";
        let entry2 = "";
        let status = `${severity}: ${message}`;
        let logifiedMessage = "";

        // do not log 'debug' messages in staging or production mode - {0010}
        if ((severity === 'debug') && (mode === 'production'))
        {
            return status;
        }

        // flatten the message object to strings for logging...
        if (mcode.isObject(message))
        {
            logifiedMessage = "\n" + mcode.logify(mcode.logifyObject(message));
        }
        else if (mcode.isJson(message))
        {
            logifiedMessage = "\n" + mcode.logify(message);
        }
        else
        {
            logifiedMessage = message;
        }

        const moduleName = source.split('.')[0].toUpperCase();

        entry1 += (vt.reset + vt.dim + '++\n' + vt.reset + vt.dim);

        let sevColor = vt.reset;
        let sevText = severity;

        switch (severity)
        {
            case 'i':
            case 'inf':
            case 'info':
                sevText = 'info';
                sevColor += vt.info;
                entry1 += ` i ｢mcode｣: 📣 ${sevColor}[${moduleName}] '${logifiedMessage}'`;
                break;
            case 'w':
            case 'wrn':
            case 'warn':
            case 'warning':
                sevText = 'warn';
                sevColor += vt.warn;
                entry1 += ` ! ｢mcode｣: ⚠️ ${sevColor}[${moduleName}] '${logifiedMessage}'`;
                break;
            case 'e':
            case 'err':
            case 'error':
                sevText = 'error';
                sevColor += vt.errr;
                entry1 += ` x ｢mcode｣: ❌ ${sevColor}[${moduleName}] '${logifiedMessage}'`;
                break;
            case 'x':
            case 'exp':
            case 'crash':
            case 'exception':
                sevText = 'exception';
                sevColor += vt.dead;
                entry1 += ` * ｢mcode｣: 🟪 ${sevColor}[${moduleName}] '${logifiedMessage}'`;
                break;
            case 's':
            case 'ack':
            case 'done':
            case 'success':
                sevText = 'success';
                sevColor += vt.good;
                entry1 += ` ✓ ｢mcode｣: ✅ ${sevColor}[${moduleName}] '${logifiedMessage}'`;
                break;
            case 'd':
            case 'dbg':
            case 'debug':
                sevText = 'debug';
                sevColor += vt.dbug;
                entry1 += ` µ ｢mcode｣: 🔍 ${sevColor}[${moduleName}] '${logifiedMessage}'`;
                break;
            case '?':
            default:
                sevText = 'undefined';
                sevColor += vt.hmmm;
                entry1 += ` ? ｢mcode｣: ❓ ${sevColor}[${moduleName}] '${logifiedMessage}'`;
                break;
        }

        let logifiedError = false;
        if (error)
        {
            if (mcode.isObject(error))
            {
                logifiedError = mcode.logify(mcode.logifyObject(error));
            }
            else if (mcode.isJson(error))
            {
                logifiedError = mcode.logify(error);
            }
            else
            {
                logifiedError = error;
            }
            status += ` ERROR: ${mcode.simplify(logifiedError)}`;
        }

        entry2 +=
            `${vt.reset}${vt.dim}      time: ${vt.reset}${mcode.timeStamp()}` +
            `${vt.reset}${vt.dim}      from: ${vt.reset}${source}` +
            `${vt.reset}${vt.dim}  severity: ${vt.reset}${sevColor}${sevText}\n` +
            `${vt.reset}${vt.dim}--${vt.reset}`;

        console.log(entry1);
        if (logifiedError) {console.log(`${vt.reset}${vt.dim}     error: ${vt.reset}${sevColor}${mcode.simplify(logifiedError)}`);}
        console.log(entry2);

        return status;  // for caller to use as needed
    },

    // convient abbreviations of all the logged severities...
    info: function (message, source) {mcode.log(message, source, 'info');},
    warn: function (message, source) {mcode.log(message, source, 'warn');},
    error: function (message, source) {mcode.log(message, source, 'error');},
    error: function (message, source, error) {mcode.log(message, source, 'error', error);},
    crash: function (message, source) {mcode.log(message, source, 'exception');},
    done: function (message, source) {mcode.log(message, source, 'success');},
    debug: function (message, source) {mcode.log(message, source, 'debug');},

    /**
     * @func exp
     * @memberof mcode
     * @desc logs an exception to the Console in a standardized format and a stack dump.
     * @api public
     * @param {object} message pre-formatted message to be logged.
     * @param {string} source where the message orginated.
     * @param {string} exception the underlying exception message that was caught.
     * @returns {string} "message: {message} - exception: {exception}" for display in UI.
     */
    exp: function (message, source, exception)
    {
        let vt = mcode.vt;
        let entry1 = "";
        let entry2 = "";
        let logifiedMessage = "";
        let logifiedException = "";
        let isExpObject = false;

        // flatten the message object to strings for logging...
        if (mcode.isObject(message))
        {
            logifiedMessage = mcode.logify(mcode.logifyObject(message));
        }
        else if (mcode.isJson(message))
        {
            logifiedMessage = mcode.logify(message);
        }
        else
        {
            logifiedMessage = message;
        }

        // flatten the exception object to strings for logging...
        if (mcode.isObject(exception))
        {
            isExpObject = true;
            if (exception.stack)
            {
                const stackTrace = mcode.logify(mcode.logifyObject(exception.stack));

                // remove leading and trailing quotes from the stack trace...
                logifiedException = `${vt.gray}` + stackTrace.substring(1, stackTrace.length - 1);
            }
            else
            {
                logifiedException = `${vt.reset}` + mcode.logify(mcode.logifyObject(exception));
            }
        }
        else if (mcode.isJson(exception))
        {
            logifiedException = mcode.logify(exception);
        }
        else
        {
            logifiedException = exception;
        }

        const moduleName = source.split('.')[0].toUpperCase();

        let sevColor = vt.reset;
        sevColor += vt.dead;

        // created a simplified exception message for the log entry...
        const loggedException = ' exception: ' + mcode.simplify(logifiedException);

        // if 'loggedException' contains a stack trace, log it as an 'exception w/stack'
        if (loggedException.includes('Error:') && loggedException.includes('at '))
        {
            isExpObject = true;
        }

        if (isExpObject)
        {
            entry1 +=
                `${vt.reset}${vt.dim}++\n` +
                `${vt.reset}${vt.dim} * ｢mcode｣: 🟪 ${sevColor}[${moduleName}] '${logifiedMessage}'\n` +
                `${vt.reset}${vt.dim}${sevColor} exception: This is an actual exception and its inner data as passed.`;
            entry2 +=
                `${vt.reset}${vt.dim}      time: ${vt.reset}${mcode.timeStamp()}` +
                `${vt.reset}${vt.dim}      from: ${vt.reset}${source}` +
                `${vt.reset}${vt.dim}  severity: ${sevColor}exception w/stack${sevColor}\n` +
                `${vt.reset}${vt.dim}--${vt.reset}`;

            console.log(entry1);
            console.log(`${vt.reset}` + logifiedException);
            console.log(entry2);

            return `${message} ${exception}`;  // for caller to return
        }
        else
        {
            entry1 +=
                `${vt.reset}${vt.dim}++\n` +
                `${vt.reset}${vt.dim} * ｢mcode｣: 🟪 ${sevColor}[${moduleName}] '${logifiedMessage}'\n` +
                `${vt.reset}${vt.dim}${sevColor}${loggedException}${vt.gray}`;
            entry2 +=
                `${vt.reset}${vt.dim}      time: ${vt.reset}${mcode.timeStamp()}` +
                `${vt.reset}${vt.dim}      from: ${vt.reset}${source}` +
                `${vt.reset}${vt.dim}  severity: ${sevColor}exception w/trace${sevColor}\n` +
                `${vt.reset}${vt.dim}--${vt.reset}`;

            console.log(entry1);
            console.trace('call stack...');
            console.log(entry2);

            return `${message} ${exception}`;  // for caller to return
        }
    },

    /**
     * @func fnc
     * @memberof mcode
     * @desc logs 'function call' showing call patterns to the Console in a standardized format.
     * @api public
     * @param {object} message pre-formatted message to be logged.
     * @param {string} source where the message orginated.
     * @returns nothing.
     *
     */
    fnc: function (message, source)
    {
        let vt = mcode.vt;
        let entry1 = "";
        let entry2 = "";
        let logifiedMessage = "";

        // flatten the message object to strings for logging...
        if (mcode.isObject(message))
        {
            logifiedMessage = "\n" + mcode.logify(mcode.logifyObject(message));
        }
        else if (mcode.isJson(message))
        {
            logifiedMessage = "\n" + mcode.logify(message);
        }
        else
        {
            logifiedMessage = message;
        }

        const moduleName = source.split('.')[0].toUpperCase();

        let sevColor = vt.reset;
        sevColor += vt.info;

        // Function calls are always logged as 'Info'
        entry1 +=
            `${vt.reset}${vt.dim}++\n` +
            `${vt.reset}${vt.dim} * ｢mcode｣: 🔍 ${sevColor}[${moduleName}] '${logifiedMessage}'${vt.reset}${vt.gray}`;
        entry2 +=
            `${vt.reset}${vt.dim}      time: ${vt.reset}${mcode.timeStamp()}` +
            `${vt.reset}${vt.dim}      from: ${vt.reset}${source}` +
            `${vt.reset}${vt.dim}  severity: ${sevColor}trace\n` +
            `${vt.reset}${vt.dim}--${vt.reset}`;

        console.log(entry1);
        console.trace('function call stack...');
        console.log(entry2);
    },

    /**
     * @func simplify
     * @memberof mcode
     * @desc Strips a string of BRACES, BRACKETS, QUOTES, etc.
     * @api public
     * @param {object} object the string to be simplified to data
     * @returns {string} the simplified text
     */
    simplify: function (object)
    {
        if (mcode.isUndefined(object))
        {
            return "undefined";
        }

        // flatten the message object to strings for logging...
        if (mcode.isObject(object))
        {
            // do not use JSON.stringify(object, null, 4)
            // --it's output is horrible, produce our own here in 'simplify()'
            object = JSON.stringify(object);
        }

        let simplifiedText = "";
        let inValue = false;
        let inEscape = false;
        let c = ' ';
        let clast = ' ';

        for (let i = 0; i < object.length; i++)
        {
            clast = c;
            c = object[i];

            // detect VT52,100,200 escape sequence
            if (c === '\x1b')
            {
                inEscape = true;
                continue;
            }
            // skip entire escape sequence
            if (inEscape)
            {
                if (((c >= 'A') && (c <= 'Z')) || ((c >= 'a') && (c <= 'z')))
                {
                    inEscape = false;
                }
                continue;
            }
            switch (c)
            {
                case '{':
                case '}':
                case '[':
                case ']':
                    inValue = false;
                    c = ' ';
                    break;
                case '"':
                    c = ' ';
                    break;
                case ':':
                    simplifiedText += c;
                    if (!inValue)
                    {
                        simplifiedText += ' ';
                        c = ' ';
                    }
                    inValue = true;
                    break;
                case ',':
                    simplifiedText += c;
                    simplifiedText += ' ';
                    c = ' ';
                    inValue = false;
                    break;
                case '\n':
                case '\t':
                    c = ' ';
                    break;  // strip newlines and tabs
                case ' ':
                    if (clast != ' ')
                    {
                        simplifiedText += c;
                    }
                    break;
                default:
                    simplifiedText += c;
                    break;
            }
        }

        return simplifiedText;
    },

    /**
     * @func simplifyObject
     * @memberof mcode
     * @desc Strips an object of BRACES, BRACKETS, QUOTES, etc.
     * @api public
     * @param {object} objectToSimplify the object to be formatted for the event log
     * @returns {string} the simplified object
     */
    simplifyObject: function (objectToSimplify)
    {
        // do not use JSON.stringify(object, null, 4) -- it's output is horrible, use our own
        return mcode.simplify(JSON.stringify(objectToSimplify));
    },

    /**
     * @func logify
     * @memberof mcode
     * @desc Formats a string of BRACES, BRACKETS, QUOTES, for display in the EVENT LOG.
     * No formatting occurs until the opening brace '{' of the JSON Data. VT Escape sequences are stripped.
     * @api public
     * @param {string} textToLogify the string to be formatted for the event log
     * @returns {string} the logified text
     */
    logify: function (textToLogify)
    {
        let vt = mcode.vt;
        let inJson = false;  // start formatting when we hit the first '{'
        let inValue = false;  // handle 'true, false, null, or number' as-is
        let inString = false;  // handle "quoted strings" as-is
        let inLiteral = false;  // take internal text as-is

        let logifiedText = '';  // the text we build
        let tabStop = 0;  // indent level for formatting
        let lineEmpty = true;  // controls indent() output

        // helper function to remove surrounding " " from key names only.
        let keyPairs = (jsonString) =>
        {
            // loop backward through the string, building a new copy, remove " " from key names
            let newString = '';
            let inKey = false;
            let inKeyName = false;
            let inString = false;
            let c = '';

            for (let i = jsonString.length - 1; i >= 0; i--)
            {
                c = jsonString[i];

                if (inString)
                {
                    if (c === '"')
                    {
                        inString = false;
                        newString = c + newString;
                        continue;
                    }
                    newString = c + newString;
                    continue;
                }
                if (inKeyName)
                {
                    if (c === '"')
                    {
                        inKeyName = false;
                        inKey = false;
                        continue;
                    }
                    else
                    {
                        newString = c + newString;
                        continue;
                    }
                }
                if (inKey)
                {
                    if (c === '"')
                    {
                        inKeyName = true;
                        continue;
                    }
                    else
                    {
                        newString = c + newString;
                        continue;
                    }
                }
                if (c === '"')
                {
                    newString = c + newString;
                    inString = true;
                    continue;
                }
                if (c === ':')
                {
                    inKey = true;
                }
                newString = c + newString;
            }

            return newString;
        };

        // helper function to indent the JSON
        let indent = () =>
        {
            let newline = '';
            if (!lineEmpty)
            {
                newline += '\n' + `${vt.reset}`;
                for (let index = 0; index < tabStop; index++)
                {
                    newline += '    ';  // 4-space tab-stop
                }
                lineEmpty = true;
            }
            return newline;
        };

        // helper function to check for alpha-numeric characters
        let isKeyChar = (c) =>
        {
            return (c === '_') || (c === '$') || (c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z') || (c >= '0' && c <= '9');
        };

        // process the JSON string...
        textToLogify = keyPairs(textToLogify);

        let c = '';  // current char

        for (let i = 0; i < textToLogify.length; i++)
        {
            c = textToLogify[i];

            if (textToLogify.substring(i, i + 2) === '\\\\')
            {
                // take backslash as-is
                logifiedText += c;
                logifiedText += c;
                i++; // skip the next '\'
                continue;
            }

            if (!inString && textToLogify.substring(i, i + 2) === '\\n')
            {
                logifiedText += '' + indent();
                lineEmpty = false;
                i++; // skip the 'n'
                continue;
            }

            if (inLiteral)
            {
                logifiedText += c;
                if (c === '}')
                {
                    inLiteral = false;
                }
                continue;
            }

            if (textToLogify.substring(i, i + 2) === '${')
            {
                inLiteral = true;
                logifiedText += c;
                continue;
            }

            if (!inJson && c === '{')
            {
                inJson = true;
                --i;  // reprocess '{' as JSON
                continue;
            }

            if (inValue)
            {
                if (!isKeyChar(c))
                {
                    inValue = false;
                    --i;  // reprocess non-alpha-numeric character outside of 'value'
                }
                else
                {
                    logifiedText += c;
                }
                continue;
            }

            if (inString)
            {
                if (c === '"')
                {
                    inString = false;
                    c = '\'' + `${mcode.vt.reset}`;
                }
                logifiedText += c;
                continue;
            }

            if (!inJson)
            {
                logifiedText += c;
                lineEmpty = false;
                continue;
            }

            switch (c)
            {
                case '{':
                    logifiedText += indent() + '{';
                    lineEmpty = false;
                    tabStop++;
                    logifiedText += '' + indent();
                    break;
                case '[':
                    logifiedText += indent() + '[';
                    lineEmpty = false;
                    tabStop++;
                    logifiedText += '' + indent();
                    break;
                case '}':
                    tabStop--;
                    logifiedText += indent() + '}';
                    lineEmpty = false;
                    inJson = tabStop > 0;
                    break;
                case ']':
                    tabStop--;
                    logifiedText += indent() + ']';
                    lineEmpty = false;
                    break;
                case ',':
                    logifiedText += `${mcode.vt.reset}` + ',' + indent();
                    lineEmpty = false;
                    break;
                case ':':
                    logifiedText += ': ' + `${mcode.vt.value}`;
                    lineEmpty = false;
                    break;
                case '"':
                    logifiedText += `${mcode.vt.string}`;
                    logifiedText += '\'';
                    lineEmpty = false;
                    inString = !inString;
                    break;
                case ' ':
                    lineEmpty = false;
                    break;
                default:
                    if (isKeyChar(c))
                    {
                        inValue = true;  // true, false, null, or number
                        logifiedText += c;
                        lineEmpty = false;
                    }
                    break;
            }
        }

        return logifiedText;
    },

    /**
     * @func logifyObject
     * @memberof mcode
     * @desc Converts a JSON Object into loggable text, like JSON.stringify() but with more control.
     * @api public
     * @param {object} objectToLogify
     * @returns {string} the logified object
     */
    logifyObject: function (objectToLogify, parentObjects = [''])
    {
        // Helper function to check for and handle circular references
        const isCyclic = (member) =>
        {
            if (parentObjects.includes(member))
            {
                return '"<self-reference>"';  // 'true'
            }
            return false;
        };

        // Helper function to handle non-object types
        const handleNonObject = (value) =>
        {
            if (typeof value === 'string')
            {
                // detect JSON objects that have been escaped and convert them back to JSON
                if (value.startsWith(`{`)
                    && value.endsWith(`}`))
                {
                    // convert to JSON representation
                    return value.replace('\\"', '"');
                }
                else
                {
                    return `"${value}"`;
                }
            }
            if (typeof value === 'function')
            {
                return `"ƒ ${value.name}"`;
            }
            if (typeof value === 'symbol')
            {
                return '"<symbol>"';
            }
            if (typeof value === 'undefined')
            {
                return '"<undefined>"';
            }
            if (typeof value === 'bigint')
            {
                return value.toString();
            }

            return String(value);
        };

        // helper function to recursively stringify an object
        const recursiveStringify = (currentObject) =>
        {
            // Handle non-object types
            if (typeof currentObject !== 'object' || currentObject === null)
            {
                return handleNonObject(currentObject);
            }

            if (this.isTimeStamp(currentObject))
            {
                return `"${this.timeStamp(now = currentObject, local = true)}"`;
            }

            // special case for File objects which cannot be completely stringified
            if (currentObject instanceof File)
            {
                let file = currentObject;
                const date = new Date(file.lastModified);

                // change File to a simple object
                currentObject = {
                    name: file.name,
                    size: file.size,
                    date: date.toString()
                };
            }

            // Detect and handle circular references
            let cyclicCheck = isCyclic(currentObject);
            if (cyclicCheck)
            {
                return cyclicCheck;
            }

            // Keep track of parent objects to detect circular references
            parentObjects.push(currentObject);

            let result;
            if (Array.isArray(currentObject))
            {
                result = currentObject.map((item) => recursiveStringify(item)).join(",");
                parentObjects.pop();
                return `[${result}]`;
            }
            else
            {
                result = Object.keys(currentObject).map((key) =>
                {
                    let value = currentObject[key];

                    // Skip functions, symbols, and undefined properties
                    if (typeof value === 'function'
                        || typeof value === 'symbol'
                        || typeof value === 'undefined')
                    {
                        return `"${key}":${handleNonObject(value)}`;
                    }

                    return `"${key}":${recursiveStringify(value)}`;

                }).filter(Boolean).join(",");

                parentObjects.pop();

                return `{${result}}`;
            }
        };

        // stringify the object, recursively
        return recursiveStringify(objectToLogify);
    },

    /**
     * @func listifyArray
     * @memberof mcode
     * @desc Converts an array of text items into a HTML or JSX List.
     * @api public
     * @param {Array<any>} arrayToListify the array to be convert to a HTML List.
     * @param {string} outputType how to out the list: 'html' or 'jsx'.
     * @returns {string} the HTML List code.
     */
    listifyArray: function (arrayToListify, outputType = 'html')
    {
        let listifiedText = "";
        var keyIndex = 0;

        if (outputType === 'jsx')
        {
            listifiedText += '<ul className="list-group">';

            arrayToListify.forEach(element =>
            {
                // convert array element to text, simplify for display, and add to LIST...
                listifiedText += `<li className="list-group-item" key="${keyIndex++}">${mcode.simplifyObject(element)}</li>`;
            });

            listifiedText += '</ul>';
        }
        else
        {
            arrayToListify.forEach(element =>
            {
                // convert array element to text, simplify for display, and add to LIST...
                listifiedText += `<li class="list-group-item" key="${keyIndex++}">${mcode.simplifyObject(element)}</li>`;
            });
        }

        return listifiedText;
    },

    /**
     * @func extractId
     * @memberof mcode
     * @desc Extracts an alpha-numberic ID Field from a string, intended to be a unique portion of a common string.
     * @param {string} objectName typically a file name, but can be any string, to extract an ID Field from.
     * @returns {string} the extracted ID Field.
     *
     *  Rules for extracting the ID Field:
     *  ----------------------------------
     *  1. The ID Field is assumed to be the first alpha-numeric field in the string.
     *  2. The ID Field is assumed to be Letters + Numbers, with no spaces or special characters.
     *  3. The ID Field is assumed to be either at the beginning or end of the string, or separated by non-alpha-numeric characters.
     *  4. The ID Field cound have lowercase 'placeholders' for numbers, like 'PxCy' or 'PnCn' for 'P1C2'.
     *
     * @example
     *
     * const str1 = "CG_BRKE01_20231116.L5K";
     * const str2 = "CG_BRKE03_20231116.L5K";
     *
     * console.log(extractIdField(str1)); // Expected output: "BRKE01"
     * console.log(extractIdField(str2)); // Expected output: "BRKE03"
     *
     * const str1 = "EP_GPT13TZ1_20231115_0800.L5K";
     * const str2 = "EP_GPT13TZ2_20231113_1600.L5K";
     *
     * console.log(extractIdField(str1)); // Expected output: "GPT13TZ1"
     * console.log(extractIdField(str2)); // Expected output: "GPT13TZ2"
     *
     * const str1 = "SEP_P1C2_GMP_ARL.L5K";
     * const str2 = "SEP_P3C0_GMP_ARL.L5K";
     *
     * console.log(extractIdField(str1)); // Expected output: "P1C2"
     * console.log(extractIdField(str2)); // Expected output: "P3C0"
     *
     * const str1 = "SEP_P1C2_GMP_ARL.L5K";
     * const str2 = "SEP_PxCy_GMP.L5K";
     *
     * console.log(extractIdField(str1)); // Expected output: "P1C2"
     * console.log(extractIdField(str2)); // Expected output: "PxCy"
     *
     *
     */
    extractId: function (objectName)
    {
        let idField = '';
        let inAlphaNumeric = false;
        let isLetter = false;
        let isLowerL = false;
        let isNumber = false;
        let hasLetters = false;
        let hasNumbers = false;
        let si = 0;

        // helper function to check for upper case letter
        const isUpper = (objectName, i) =>
        {
            // if 'i' is outside 'objectName' return false
            if (i < 0 || i >= objectName.length)
            {
                return false;
            }
            return (objectName[i] >= 'A' && objectName[i] <= 'Z');
        };

        // scan the string for the first alpha-numeric field
        for (let i = 0; i < objectName.length; i++)
        {
            isNumber = (objectName[i] >= '0' && objectName[i] <= '9');
            isLetter = (objectName[i] >= 'A' && objectName[i] <= 'Z');
            isLowerL = (objectName[i] >= 'a' && objectName[i] <= 'z');

            if (isNumber || isLetter || isLowerL)
            {
                if (!inAlphaNumeric)
                {
                    inAlphaNumeric = true;
                    si = i;
                }
                idField += objectName[i];
                hasLetters = hasLetters || isLetter || isLowerL;
                hasNumbers = hasNumbers || isNumber;

                // Check for 'lower case numeric placeholder' like 'PxCy' or 'PnCn' for 'P1C2'
                if (isUpper(objectName, i - 1) && isUpper(objectName, i + 1) && isLowerL)
                {
                    hasNumbers = true;  // treat the single lower case letter between upper case letters as a number placeholder
                }
            }
            else
            {
                // hit non Alpha-Numeric character
                if (inAlphaNumeric && hasLetters && hasNumbers)
                {
                    idField = objectName.substring(si, i);
                    break;  // we have the field we want, exit to return it
                }
                else
                {
                    // current field does not meet criteria, reset and continue
                    si = 0;
                    idField = '';
                    inAlphaNumeric = false;
                    hasLetters = false;
                    hasNumbers = false;
                }
            }
        }

        return idField || '';
    },

    /**
     * @func isString
     * @memberof mcode
     * @desc Checks the type of an Object for String.
     * @api public
     * @param {object} object to be tested
     * @returns {boolean} a value indicating whether or not the object is a string
     */
    isString: function (object)
    {
        return Object.prototype.toString.call(object) === '[object String]';
    },

    /**
     * @method isObject
     * @memberof mcode
     * @desc Checks whether or not a string is a JS Object.
     * @api public
     * @param {object} jsObject string to be tested
     * @returns {boolean} a value indicating whether or not the string is a JS Object.
     */
    isObject: function (jsObject)
    {
        if (mcode.isString(jsObject)) return false;

        return typeof jsObject === 'object' && jsObject !== null && !Array.isArray(jsObject) && typeof jsObject !== 'function';
    },

    /**
     * @func isNumber
     * @memberof mcode
     * @desc Checks for NaN.
     * @api public
     * @param {any} numberToCheck as a number of some type
     * @returns {boolean} a value indicating whether or not it is NaN.
     */
    isNumber: function (numberToCheck)
    {
        // NOTE: this compare will fail for NaN
        // eslint-disable-next-line no-self-compare
        return (numberToCheck === numberToCheck);
    },

    /**
     * @func isJson
     * @memberof mcode
     * @desc Checks a string for embedded JSON data.
     * @api public
     * @param {object} object string to be tested
     * @returns {boolean} a value indicating whether or not the object contains a JSON string
     */
    isJson: function (object)
    {
        try
        {
            if (typeof object !== 'string')
            {
                return false;
            }

            if ((object).includes('{'))
            {
                return true;  // treat as JSON -- JSON.parse() is overkill here
            }
            else
            {
                return false; // *not* JSON
            }
        }
        catch
        {
            return false;  // *not* JSON and not parsable
        }
    },

    /**
     * @func isUndefined
     * @memberof mcode
     * @desc Checks for undefined.
     * @api public
     * @param {any} objectToCheck as a variable of some type
     * @returns {boolean} a value indicating whether or not it is UNDEFINED.
     */
    isUndefined: function (objectToCheck)
    {
        // return true if 'objectToCheck' is UNDEFINED
        return ((typeof objectToCheck === 'undefined') || (objectToCheck === null));
    },

    /**
     * @func isDate
     * @memberof mcode
     * @desc Checks for Date.
     * @param {object} objectToCheck
     * @returns {boolean} a value indicating whether or not it is DATE.
     */
    isDate: function (objectToCheck)
    {
        // return true if 'objectToCheck' is DATE Value
        return (objectToCheck instanceof Date);
    },

    /**
     * @func isTimeStampe
     * @memberof mcode
     * @desc Checks for Date, i.e.: TimeStamp.
     * @param {object} objectToCheck
     * @returns {boolean} a value indicating whether or not it is TIEMSTAMP.
     */
    isTimeStamp: function (objectToCheck)
    {
        // return true if 'objectToCheck' is DATE/TIMESTAMP Value
        return (objectToCheck instanceof Date);
    },

    /**
     * @func timestamp
     * @memberof mcode
     * @desc Generates timestamp string: YYYY-MM-DD Day HH:MM:SS.mmm.
     * @api public
     * @param {boolean} local [Optional] determines whether or not local time is used, if not it returns use UTC.
     * @returns {string} "YYYY-MM-DD Day HH:MM:SS.mmm UTC|Local".
     */
    timeStamp: function (now = new Date(), local = true)
    {
        const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        // make sure all fields are fixed length with leading zeros
        const leadingZeros = (number, length) =>
        {
            let numberField = '' + number;
            while (numberField.length < length)
            {
                numberField = '0' + numberField;
            }
            return numberField;
        };

        if (local)
        {
            let dayofweek = weekdays[now.getDay()];           // 3-letter day of week
            let year = now.getFullYear();                     // 4-digit year
            let month = months[now.getMonth()];               // 3-letter month of year
            let day = leadingZeros(now.getDate(), 2);         // 2-digit day
            let hours = leadingZeros(now.getHours(), 2);      // 2-digit hour
            let minutes = leadingZeros(now.getMinutes(), 2);  // 2-digit minute
            let seconds = leadingZeros(now.getSeconds(), 2);  // 2-digit second
            let ms = leadingZeros(now.getMilliseconds(), 3);  // 3-digit millisecond

            return `${year}-${month}-${day} ${dayofweek} ${hours}:${minutes}:${seconds}.${ms} Local`;
        }
        else
        {
            let dayofweek = weekdays[now.getUTCDay()];           // 3-letter day of week
            let year = now.getUTCFullYear();                     // 4-digit year
            let month = months[now.getMonth()];                  // 3-letter month of year
            let day = leadingZeros(now.getUTCDate(), 2);         // 2-digit day
            let hours = leadingZeros(now.getUTCHours(), 2);      // 2-digit hour
            let minutes = leadingZeros(now.getUTCMinutes(), 2);  // 2-digit minute
            let seconds = leadingZeros(now.getUTCSeconds(), 2);  // 2-digit second
            let ms = leadingZeros(now.getUTCMilliseconds(), 3);  // 3-digit millisecond

            return `${year}-${month}-${day} ${dayofweek} ${hours}:${minutes}:${seconds}.${ms} UTC`;
        }
    },
};

// #endregion

// #region  M E T H O D - E X P O R T S

// Export as Common JS (CJS) code -- NOTE: Build as CommonJS Module for NodeJS Version v16.7.0
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
{
    // In a Node.js environment export mcode directly
    module.exports = mcode;
}
else
{
    // In a browser environment, attach mcode to the window object
    window.mcode = mcode;
}

// #endregion

// #endregion
// #endregion