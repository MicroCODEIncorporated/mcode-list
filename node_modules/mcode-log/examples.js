// MicroCODE: define this module's name for  our 'mcode' package
const moduleName = 'index.test.js';
const mcode = require('./index.js');

// test/demo code for mcode-log package...
const errorObject =
{
    message: 'Please enter the correct login details',
    inputError: 'email'
};

const exceptionJson = '{ "message": "This is an exception JSON, it can be whatever is presented in by the log call.",' +
                      '"timestamp": "2019-01-01T00:00:00.000Z" }';
const exceptionObject =
{
    message: "This is an exception OBJECT, it can be whatever is presented in by the log call.",
    timestamp: new Date()
};

// version display...
mcode.ready();

// mcode.log() form...
mcode.log(`This is an INFO log event`, moduleName, 'info');
mcode.log(`This is an WARNING log event`, moduleName, 'warning');
mcode.log(`This is an ERROR log event`, moduleName, 'error');
mcode.log(`This is an ERROR log event`, moduleName, 'error', 'ERR=this is the optional error message');
mcode.log(`This is an ERROR log OBJECT`, moduleName, 'error', errorObject);
mcode.log(`This is an SUCCESS log event`, moduleName, 'success');
mcode.log(`This is an DEBUG log event`, moduleName, 'debug');
mcode.log(`This is an UNKNOWN log event`, moduleName, 'unknown');
mcode.log(`This is an EXCEPTION 'log' event`, moduleName, 'exception');
mcode.log(`This is an EXCEPTION 'log' JSON`, moduleName, 'exception', exceptionJson);
mcode.log(`This is an EXCEPTION 'log' OBJECT`, moduleName, 'exception', exceptionObject);

mcode.exp(`This is an EXCEPTION 'exp' JSON`, moduleName, exceptionJson);
mcode.exp(`This is an EXCEPTION 'exp' OBJECT`, moduleName, exceptionObject);

try
{
    throw new Error('This is an an actual EXCEPTION OBJECT');
}
catch (exp)
{
    mcode.exp(`This is an EXCEPTION 'exp' OBJECT`, moduleName, exp);
}

// special 'trace' log event for debugging...
mcode.fnc(`This is a FUNCTION call trace`, moduleName);

// mcode.'severity'() short form...
mcode.info(`This is an INFO log event`, moduleName);
mcode.warn(`This is an WARNING log event`, moduleName);
mcode.error(`This is an ERROR log event`, moduleName);
mcode.error(`This is an ERROR log event`, moduleName, 'ERR=this is the optional error message');
mcode.error(`This is an ERROR log OBJECT`, moduleName, errorObject);
mcode.done(`This is an SUCCESS log event`, moduleName);
mcode.debug(`This is an DEBUG log event`, moduleName);

// Log 'mcode' code as an object in a warning log event...
mcode.warn(mcode, moduleName);

// Log PROCESS_ENV as an object in a warning log event... HUGE!
//* mcode.warn(process, moduleName);
