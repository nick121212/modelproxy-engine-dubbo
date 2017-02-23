(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("modelproxy"), require("util"), require("crypto"), require("net"), require("node-zookeeper-client"), require("lodash"), require("buffer"), require("fs"), require("os"), require("stream"), require("tty"));
	else if(typeof define === 'function' && define.amd)
		define(["modelproxy", "util", "crypto", "net", "node-zookeeper-client", "lodash", "buffer", "fs", "os", "stream", "tty"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("modelproxy"), require("util"), require("crypto"), require("net"), require("node-zookeeper-client"), require("lodash"), require("buffer"), require("fs"), require("os"), require("stream"), require("tty")) : factory(root["modelProxy"], root["util"], root["crypto"], root["net"], root["node-zookeeper-client"], root["_"], root["buffer"], root["fs"], root["os"], root["stream"], root["tty"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_19__, __WEBPACK_EXTERNAL_MODULE_20__, __WEBPACK_EXTERNAL_MODULE_21__, __WEBPACK_EXTERNAL_MODULE_22__, __WEBPACK_EXTERNAL_MODULE_71__, __WEBPACK_EXTERNAL_MODULE_72__, __WEBPACK_EXTERNAL_MODULE_73__, __WEBPACK_EXTERNAL_MODULE_74__, __WEBPACK_EXTERNAL_MODULE_75__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 76);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * hessian.js - lib/utils.js
 * Copyright(c)
 * MIT Licensed
 *
 * Authors:
 *   dead_horse <dead_horse@qq.com> (http://deadhorse.me)
 */



var debug = __webpack_require__(1)('hessian.js:utils');
var Long = __webpack_require__(47);
var object = __webpack_require__(2);

var MAX_SAFE_INT = Long.fromNumber(Math.pow(2, 53) - 1);
var MIN_SAFE_INT = Long.fromNumber(1 - Math.pow(2, 53));

var MAX_BYTE_TRUNK_SIZE = exports.MAX_BYTE_TRUNK_SIZE = 0x8000;
var MAX_CHAR_TRUNK_SIZE = exports.MAX_CHAR_TRUNK_SIZE = 0x8000;

// Map feature detect
exports.supportES6Map = typeof Map === 'function' && typeof Map.prototype.forEach === 'function';

exports.getSerializer = function (type) {
  // get from SERIALIZER_MAP
  if (object.SERIALIZER_MAP[type]) {
    return 'write' + object.SERIALIZER_MAP[type];
  }
  // array: [int
  if (type[0] === '[') {
    return 'writeArray';
  }
  // object
  return 'writeObject';
};

exports.isJavaObject = function (type) {
  return type === object.Object;
};

exports.handleLong = function (val) {
  if (val.greaterThan(MAX_SAFE_INT) || val.lessThan(MIN_SAFE_INT)) {
    val = val.toString();
    debug('[hessian.js Warning] Read a not safe long(%s), translate it to string', val);
    return val;
  }
  return val.toNumber();
};

exports.lengthOfUTF8 = function (head) {
  if (head < 0x80) {
    return 1;
  }
  if ((head & 0xe0) === 0xc0) {
    return 2;
  }

  if ((head & 0xf0) === 0xe0) {
    return 3;
  }
  throw new Error('string is not valid UTF-8 encode');
};

var _hasOwnProperty = Object.prototype.hasOwnProperty;
/* jshint -W001 */
exports.hasOwnProperty = function hasOwnProperty(obj, property) {
  return _hasOwnProperty.call(obj, property);
};

exports.addByteCodes = function addByteCodes(map, codes, method) {
  for (var i = 0; i < codes.length; i++) {
    var code = codes[i];
    if (Array.isArray(code)) {
      var startCode = code[0];
      var endCode = code[1];
      for (var c = startCode; c <= endCode; c++) {
        map[c] = method;
      }
    } else {
      map[code] = method;
    }
  }
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Module dependencies.
 */

var tty = __webpack_require__(75);
var util = __webpack_require__(4);

/**
 * This is the Node.js implementation of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = __webpack_require__(39);
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;

/**
 * Colors.
 */

exports.colors = [6, 2, 3, 4, 5, 1];

/**
 * The file descriptor to write the `debug()` calls to.
 * Set the `DEBUG_FD` env variable to override with another value. i.e.:
 *
 *   $ DEBUG_FD=3 node script.js 3>debug.log
 */

var fd = parseInt(process.env.DEBUG_FD, 10) || 2;
var stream = 1 === fd ? process.stdout :
             2 === fd ? process.stderr :
             createWritableStdioStream(fd);

/**
 * Is stdout a TTY? Colored output is enabled when `true`.
 */

function useColors() {
  var debugColors = (process.env.DEBUG_COLORS || '').trim().toLowerCase();
  if (0 === debugColors.length) {
    return tty.isatty(fd);
  } else {
    return '0' !== debugColors
        && 'no' !== debugColors
        && 'false' !== debugColors
        && 'disabled' !== debugColors;
  }
}

/**
 * Map %o to `util.inspect()`, since Node doesn't do that out of the box.
 */

var inspect = (4 === util.inspect.length ?
  // node <= 0.8.x
  function (v, colors) {
    return util.inspect(v, void 0, void 0, colors);
  } :
  // node > 0.8.x
  function (v, colors) {
    return util.inspect(v, { colors: colors });
  }
);

exports.formatters.o = function(v) {
  return inspect(v, this.useColors)
    .replace(/\s*\n\s*/g, ' ');
};

/**
 * Adds ANSI color escape codes if enabled.
 *
 * @api public
 */

function formatArgs() {
  var args = arguments;
  var useColors = this.useColors;
  var name = this.namespace;

  if (useColors) {
    var c = this.color;

    args[0] = '  \u001b[3' + c + ';1m' + name + ' '
      + '\u001b[0m'
      + args[0] + '\u001b[3' + c + 'm'
      + ' +' + exports.humanize(this.diff) + '\u001b[0m';
  } else {
    args[0] = new Date().toUTCString()
      + ' ' + name + ' ' + args[0];
  }
  return args;
}

/**
 * Invokes `console.error()` with the specified arguments.
 */

function log() {
  return stream.write(util.format.apply(this, arguments) + '\n');
}

/**
 * Save `namespaces`.
 *
 * @param {String} namespaces
 * @api private
 */

function save(namespaces) {
  if (null == namespaces) {
    // If you set a process.env field to null or undefined, it gets cast to the
    // string 'null' or 'undefined'. Just delete instead.
    delete process.env.DEBUG;
  } else {
    process.env.DEBUG = namespaces;
  }
}

/**
 * Load `namespaces`.
 *
 * @return {String} returns the previously persisted debug modes
 * @api private
 */

function load() {
  return process.env.DEBUG;
}

/**
 * Copied from `node/src/node.js`.
 *
 * XXX: It's lame that node doesn't expose this API out-of-the-box. It also
 * relies on the undocumented `tty_wrap.guessHandleType()` which is also lame.
 */

function createWritableStdioStream (fd) {
  var stream;
  var tty_wrap = process.binding('tty_wrap');

  // Note stream._type is used for test-module-load-list.js

  switch (tty_wrap.guessHandleType(fd)) {
    case 'TTY':
      stream = new tty.WriteStream(fd);
      stream._type = 'tty';

      // Hack to have stream not keep the event loop alive.
      // See https://github.com/joyent/node/issues/1726
      if (stream._handle && stream._handle.unref) {
        stream._handle.unref();
      }
      break;

    case 'FILE':
      var fs = __webpack_require__(72);
      stream = new fs.SyncWriteStream(fd, { autoClose: false });
      stream._type = 'fs';
      break;

    case 'PIPE':
    case 'TCP':
      var net = __webpack_require__(20);
      stream = new net.Socket({
        fd: fd,
        readable: false,
        writable: true
      });

      // FIXME Should probably have an option in net.Socket to create a
      // stream from an existing fd which is writable only. But for now
      // we'll just add this hack and set the `readable` member to false.
      // Test: ./node test/fixtures/echo.js < /etc/passwd
      stream.readable = false;
      stream.read = null;
      stream._type = 'pipe';

      // FIXME Hack to have stream not keep the event loop alive.
      // See https://github.com/joyent/node/issues/1726
      if (stream._handle && stream._handle.unref) {
        stream._handle.unref();
      }
      break;

    default:
      // Probably an error on in uv_guess_handle()
      throw new Error('Implement me. Unknown stream file type!');
  }

  // For supporting legacy API we put the FD here.
  stream.fd = fd;

  stream._isStdio = true;

  return stream;
}

/**
 * Enable namespaces listed in `process.env.DEBUG` initially.
 */

exports.enable(load());


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * hessian.js - lib/object.js
 * Copyright(c)
 * MIT Licensed
 *
 * Authors:
 *   dead_horse <dead_horse@qq.com> (http://deadhorse.me)
 *   fengmk2 <fengmk2@gmail.com> (http://fengmk2.github.com)
 */



var util = __webpack_require__(4);

exports.DEFAULT_CLASSNAME = {
  boolean: 'boolean',
  int: 'int',
  long: 'long',
  double: 'double',
  date: 'java.util.Date',
  string: 'java.lang.String',
  byteArray: '[B',
  list: 'java.util.ArrayList',
  // iList: 'java.util.List',
  map: 'java.util.HashMap',
  iMap: 'java.util.Map',
  exception: 'java.lang.RuntimeException'
};

exports.Object = 'java.lang.Object';

var SERIALIZER_MAP = exports.SERIALIZER_MAP = {};

[
  'boolean',
  'java.lang.Boolean',
  'bool',
].forEach(function (t) {
  SERIALIZER_MAP[t] = 'Bool';
});

[
  'double',
  'java.lang.Double',
  'float',
  'java.lang.Float',
].forEach(function (t) {
  SERIALIZER_MAP[t] = 'Double';
});

[
  'java.lang.Long',
  'long',
].forEach(function (t) {
  SERIALIZER_MAP[t] = 'Long';
});

[
  'short',
  'java.lang.Short',
  'int',
  'java.lang.Integer',
  'byte',
  'java.lang.Byte',
].forEach(function (t) {
  SERIALIZER_MAP[t] = 'Int';
});

[
  'java.lang.String',
  'String',
  'string',
  'char',
  'char[]',
  'java.lang.Character',
].forEach(function (t) {
  SERIALIZER_MAP[t] = 'String';
});

[
  'java.util.Date'
].forEach(function (t) {
  SERIALIZER_MAP[t] = 'Date';
});

// http://www.devthought.com/2011/12/22/a-string-is-not-an-error/
function JavaExceptionError(obj, withType) {
  Error.call(this);
  Error.captureStackTrace(this, JavaExceptionError);

  // $: { detailMessage: 'this is a java IOException instance',
  // cause: [Circular],
  // stackTrace:
  //  [ { declaringClass: 'hessian.Main',
  //      methodName: 'main',
  //      fileName: 'Main.java',
  //      lineNumber: 1282 } ] }
  var undeclaredThrowable = obj.$.undeclaredThrowable;
  if (undeclaredThrowable && withType) {
    undeclaredThrowable = undeclaredThrowable.$;
  }
  var detailMessage = obj.$.detailMessage;
  if (detailMessage && withType) {
    detailMessage = detailMessage.$;
  }

  var cause = obj.$.cause;
  if (cause && cause.$ && withType) {
    cause = cause.$;
  }

  if (undeclaredThrowable && undeclaredThrowable instanceof Error) {
    if (!obj.$.detailMessage) {
      return undeclaredThrowable;
    }
    this.name = undeclaredThrowable.name;
    if (withType) {
      this.message = obj.$.detailMessage.$ + '; ' + undeclaredThrowable.message;
    } else {
      this.message = obj.$.detailMessage + '; ' + undeclaredThrowable.message;
    }
  } else if (!detailMessage && cause && cause !== obj.$) {
    return cause;
  } else {
    if (withType) {
      this.message = obj.$.detailMessage && obj.$.detailMessage.$ || obj.$class;
      if (obj.$.reasonAndSolution) {
        this.message += '; reasonAndSolution: ' + obj.$.reasonAndSolution.$;
      }
    } else {
      this.message = obj.$.detailMessage || obj.$class;
      if (obj.$.reasonAndSolution) {
        this.message += '; reasonAndSolution: ' + obj.$.reasonAndSolution;
      }
    }
    this.name = obj.$class;
  }

  this.cause = obj.$.cause;

  var stack = this.name + ': ' + this.message;
  if (withType) {
    var stackTraces = obj.$.stackTrace && obj.$.stackTrace.$ || [];
    for (var i = 0; i < stackTraces.length; i++) {
      var trace = stackTraces[i].$;
      stack += '\n    at ' + (trace.declaringClass && trace.declaringClass.$)
        + '.' + (trace.methodName && trace.methodName.$)
        + ' (' + (trace.fileName && trace.fileName.$)
        + ':' + (trace.lineNumber && trace.lineNumber.$) + ')';
    }
  } else {
    var stackTraces = obj.$.stackTrace || [];
    for (var i = 0; i < stackTraces.length; i++) {
      var trace = stackTraces[i];
      stack += '\n    at ' + trace.declaringClass + '.' + trace.methodName
        + ' (' + trace.fileName + ':' + trace.lineNumber + ')';
    }
  }

  this.stack = stack;
}

util.inherits(JavaExceptionError, Error);

exports.JavaExceptionError = JavaExceptionError;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * is-type-of - index.js
 * Copyright(c) 2014 dead_horse <dead_horse@qq.com>
 * MIT Licensed
 */



/**
 * Module dependencies.
 */

var utils = __webpack_require__(8);
var isStearm = __webpack_require__(12);
var isClass = __webpack_require__(45);

/**
 * Expose all methods in core-util-is
 */

Object.keys(utils).map(function (name) {
  exports[transform(name)] = utils[name];
});

/**
 * Stream detected by isstream
 */

exports.stream = isStearm;
exports.readableStream = isStearm.isReadable;
exports.writableStream = isStearm.isWritable;
exports.duplexStream = isStearm.isDuplex;

/**
 * Class detected by is-class
 */
 exports.class = isClass;

/**
 * Extend method
 */

exports.finite = function (obj) {
  return Number.isFinite(obj);
};

exports.NaN = function (obj) {
  return Number.isNaN(obj);
};

exports.generator = function (obj) {
  return obj
    && 'function' === typeof obj.next
    && 'function' === typeof obj.throw;
};

exports.generatorFunction = function (obj) {
  return obj
    && obj.constructor
    && 'GeneratorFunction' === obj.constructor.name;
};

exports.promise = function (obj) {
  return obj
    && 'function' === typeof obj.then;
};

var MAX_INT_31 = Math.pow(2, 31);

exports.int = function (obj) {
  return utils.isNumber(obj)
    && obj % 1 === 0;
};

exports.int32 = function (obj) {
  return exports.int(obj)
    && obj < MAX_INT_31
    && obj >= -MAX_INT_31;
};

exports.long = function (obj) {
  return exports.int(obj)
    && (obj >= MAX_INT_31 || obj < -MAX_INT_31);
};

exports.Long = function (obj) {
  return exports.object(obj)
    && exports.number(obj.high)
    && exports.number(obj.low);
};

exports.double = function (obj) {
  return utils.isNumber(obj)
    && !isNaN(obj)
    && obj % 1 !== 0;
};

/**
 * transform isNull type to null
 * @param {[type]} m [description]
 * @return {[type]} [description]
 */

function transform(m) {
  var name = m.slice(2);
  name = name[0].toLowerCase() + name.slice(1);
  return name;
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * byte - lib/byte.js
 *
 * Copyright(c) 2013 - 2014
 * MIT Licensed
 *
 * Authors:
 *   fengmk2 <fengmk2@gmail.com> (http://fengmk2.github.com)
 *   dead-horse <dead_horse@qq.com> (https://github.com/dead-horse)
 */



/**
 * Module dependencies.
 */

var Long = __webpack_require__(26);
var debug = __webpack_require__(1)('byte');
var numbers = __webpack_require__(24);
var utility = __webpack_require__(37);
var is = __webpack_require__(25);

var DEFAULT_SIZE = 1024;
var BIG_ENDIAN = 1;
var LITTLE_ENDIAN = 2;
var MAX_INT_31 = Math.pow(2, 31);

function ByteBuffer(options) {
  options = options || {};
  this._order = options.order || BIG_ENDIAN;
  this._size = options.size || DEFAULT_SIZE;
  this._offset = 0;
  this._limit = this._size;
  var array = options.array;
  if (array) {
    this._bytes = array;
  } else {
    this._bytes = new Buffer(this._size);
  }
}

ByteBuffer.BIG_ENDIAN = BIG_ENDIAN;
ByteBuffer.LITTLE_ENDIAN = LITTLE_ENDIAN;

ByteBuffer.allocate = function (capacity) {
  return new ByteBuffer({size: capacity});
};

ByteBuffer.wrap = function (array, offset, length) {
  if (offset) {
    var end = offset + (length || array.length);
    array = array.slice(offset, end);
  }
  return new ByteBuffer({array: array, size: array.length});
};

ByteBuffer.prototype.reset = function () {
  this._offset = 0;
};

ByteBuffer.prototype.order = function (order) {
  this._order = order;
  return this;
};

ByteBuffer.prototype._checkSize = function (afterSize) {
  if (this._size >= afterSize) {
    return;
  }
  var old = this._size;
  this._size = afterSize * 2;
  this._limit = this._size;
  debug('allocate new Buffer: from %d to %d bytes', old, this._size);
  var bytes = new Buffer(this._size);
  this._bytes.copy(bytes, 0);
  this._bytes = bytes;
};

ByteBuffer.prototype.put = function (src, offset, length) {
  // byte
  // bytes, offset, length
  // index, byte

  if (typeof src !== 'number') {
    // bytes, offset, length
    var index = this._offset;
    offset = offset || 0;
    length = length || src.length;
    this._offset += length;
    this._checkSize(this._offset);
    src.copy(this._bytes, index, offset, offset + length);
    return this;
  }

  if (offset === undefined) {
    // byte
    offset = src;
    src = this._offset;
    this._offset++;
    this._checkSize(this._offset);
  }
  // index, byte
  this._bytes[src] = offset;
  return this;
};

ByteBuffer.prototype.get = function (index, length) {
  if (is.buffer(index) || is.array(index)) { // get (byte[] dst, int offset, int length)
    var dst = index;
    var offset = length || 0;
    length = dst.length;

    this.checkArraySize(dst.length, offset, length);
    this.checkForUnderflow(length);

    if (is.buffer(dst)) {
      this._bytes.copy(dst, offset, this._offset, (this._offset + length));
    } else {
      for (var i = offset; i < (offset + length); i++) {
        dst[i] = this._bytes[i];
      }
    }
    this._offset += length;
    return this;
  } else if (typeof index !== 'number') {
    index = this._offset++;
  } else if (typeof length === 'number') {
    // offset, length => Buffer
    return this._copy(index, index + length);
  }
  // return byte
  return this._bytes[index];
};

ByteBuffer.prototype.read = function (size) {
  var index = this._offset;
  this._offset += size;
  return this._bytes.slice(index, this._offset);
};

ByteBuffer.prototype.putChar = function (index, value) {
  // char
  // int, char
  if (value === undefined) {
    // char
    value = charCode(index);
    index = this._offset;
    this._offset++;
    this._checkSize(this._offset);
  } else {
    // int, char
    value = charCode(value);
  }
  this._bytes[index] = value;
  return this;
};

function charCode(c) {
  return typeof c === 'string' ? c.charCodeAt(0) : c;
}

ByteBuffer.prototype.getChar = function (index) {
  var b = this.get(index);
  return String.fromCharCode(b);
};

Object.keys(numbers).forEach(function (type) {
  var putMethod = 'put' + type;
  var getMethod = 'get' + type;
  var handles = numbers[type];
  var size = handles.size;

  ByteBuffer.prototype[putMethod] = function (index, value) {
    // index, value
    // value
    if (value === undefined) {
      // index, value
      value = index;
      index = this._offset;
      this._offset += size;
      this._checkSize(this._offset);
    }

    var handle = this._order === BIG_ENDIAN
      ? handles.writeBE
      : handles.writeLE;
    this._bytes[handle](value, index);
    return this;
  };

  ByteBuffer.prototype[getMethod] = function (index) {
    if (typeof index !== 'number') {
      index = this._offset;
      this._offset += size;
    }

    var handle = this._order === BIG_ENDIAN
      ? handles.readBE
      : handles.readLE;
    return this._bytes[handle](index);
  };
});

ByteBuffer.prototype._putZero = function (index) {
  this._bytes[index] = 0;
  this._bytes[index + 1] = 0;
  this._bytes[index + 2] = 0;
  this._bytes[index + 3] = 0;
};

ByteBuffer.prototype._putFF = function (index) {
  this._bytes[index] = 0xff;
  this._bytes[index + 1] = 0xff;
  this._bytes[index + 2] = 0xff;
  this._bytes[index + 3] = 0xff;
};

ByteBuffer.prototype.putLong = function (index, value) {
  // long
  // int, long
  var offset = 0;
  if (value === undefined) {
    // long
    offset = this._offset;
    this._offset += 8;
    this._checkSize(this._offset);
    value = index;
  } else {
    // int, long
    offset = index;
  }

  // get the offset
  var highOffset = offset;
  var lowOffset = offset + 4;
  if (this._order !== BIG_ENDIAN) {
    highOffset = offset + 4;
    lowOffset = offset;
  }

  var isNumber = typeof value === 'number';
  // convert safe number string to number
  if (!isNumber && utility.isSafeNumberString(value)) {
    isNumber = true;
    value = Number(value);
  }

  // int
  if (isNumber
    && value < MAX_INT_31
    && value >= -MAX_INT_31) {
    // put high
    value < 0
      ? this._putFF(highOffset)
      : this._putZero(highOffset);
    if (this._order === BIG_ENDIAN) {
      this._bytes.writeInt32BE(value, lowOffset);
    } else {
      this._bytes.writeInt32LE(value, lowOffset);
    }
    return this;
  }

  // long number or string, make it a Long Object
  // TODO: Long object's performence has big problem
  if (typeof value.low !== 'number'
    || typeof value.high !== 'number') {
    // not Long instance, must be Number or String
    value = isNumber
      ? Long.fromNumber(value)
      : Long.fromString(value);
  }

  // write
  if (this._order === BIG_ENDIAN) {
    this._bytes.writeInt32BE(value.high, highOffset);
    this._bytes.writeInt32BE(value.low, lowOffset);
  } else {
    this._bytes.writeInt32LE(value.high, highOffset);
    this._bytes.writeInt32LE(value.low, lowOffset);
  }

  return this;
};

ByteBuffer.prototype.putInt64 = ByteBuffer.prototype.putLong;

ByteBuffer.prototype.getLong = function (index) {
  if (typeof index !== 'number') {
    index = this._offset;
    this._offset += 8;
  }
  if (this._order === BIG_ENDIAN) {
    return new Long(
      this._bytes.readInt32BE(index + 4), // low, high
      this._bytes.readInt32BE(index)
    );
  } else {
    return new Long(
      this._bytes.readInt32LE(index),
      this._bytes.readInt32LE(index + 4)
    );
  }
};

ByteBuffer.prototype.getInt64 = ByteBuffer.prototype.getLong;

ByteBuffer.prototype._putString = function (index, value, format) {
  if (!value || value.length === 0) {
    // empty string
    if (index === null || index === undefined) {
      index = this._offset;
      this._offset += 4;
      this._checkSize(this._offset);
    } else {
      this._checkSize(index + 4);
    }
    return this.putInt(index, 0);
  }

  var isBuffer = Buffer.isBuffer(value);
  var length = isBuffer
    ? value.length
    : Buffer.byteLength(value);

  if (format === 'c') {
    length++;
  }
  if (index === null || index === undefined) {
    index = this._offset;
    this._offset += length + 4;
    this._checkSize(this._offset);
  } else {
    this._checkSize(index + length + 4);
  }
  this.putInt(index, length);
  var valueOffset = index + 4;

  if (isBuffer) {
    value.copy(this._bytes, valueOffset);
  } else {
    this._bytes.write(value, valueOffset);
  }

  if (format === 'c') {
    this.put(valueOffset + length, 0);
  }

  return this;
};

// Prints a string to the Buffer, encoded as CESU-8
ByteBuffer.prototype.putRawString = function (index, str) {
  if (typeof index === 'string') {
    // putRawString(str)
    str = index;
    index = this._offset;
    // Note that an UTF-8 encoder will encode a character that is outside BMP
    // as 4 bytes, yet a CESU-8 encoder will encode as 6 bytes, ergo 6 / 4 = 1.5
    this._checkSize(this._offset + Math.ceil(Buffer.byteLength(str) * 1.5));
  }

  if (!str || str.length === 0) {
    return this;
  }
  for (var i = 0, len = str.length; i < len; i++) {
    var ch = str.charCodeAt(i);
    if (ch < 0x80) {
      this._bytes[index++] = ch >>> 32;
    } else if (ch < 0x800) {
      this._bytes[index++] = (0xc0 + ((ch >> 6) & 0x1f)) >>> 32;
      this._bytes[index++] = (0x80 + (ch & 0x3f)) >>> 32;
    } else {
      this._bytes[index++] = (0xe0 + ((ch >> 12) & 0xf)) >>> 32;
      this._bytes[index++] = (0x80 + ((ch >> 6) & 0x3f)) >>> 32;
      this._bytes[index++] = (0x80 + (ch & 0x3f)) >>> 32;
    }
  }
  // index is now probably less than @_offset and reflects the real length
  this._offset = index;
  return this;
};

ByteBuffer.prototype._copy = function (start, end) {
  // magic number here..
  // @see benchmark/buffer_slice_and_copy.js
  // if (end - start > 2048) {
  //   return this._bytes.slice(start, end);
  // }
  var buf = new Buffer(end - start);
  this._bytes.copy(buf, 0, start, end);
  return buf;
};

ByteBuffer.prototype.getRawString = function (index, length) {
  if (typeof index !== 'number') {
    // getRawString() => current offset char string
    index = this._offset++;
  } else if (typeof length === 'number') {
    var data = [];
    for (var pos = index, end = index + length; pos < end; pos++) {
      var ch = this._bytes[pos];
      if (ch < 0x80) {
        data.push(ch);
      } else if ((ch & 0xe0) === 0xc0) {
        var ch1 = this._bytes[++pos];
        var v = ((ch & 0x1f) << 6) + (ch1 & 0x3f);
        data.push(v);
      } else if ((ch & 0xf0) === 0xe0) {
        var ch1 = this._bytes[++pos];
        var ch2 = this._bytes[++pos];
        var v = ((ch & 0x0f) << 12) + ((ch1 & 0x3f) << 6) + (ch2 & 0x3f);
        data.push(v);
      }
    }
    return String.fromCharCode.apply(String, data);
  }
  return String.fromCharCode(this._bytes[index]);
};

ByteBuffer.prototype.readRawString = function (index, length) {
  if (arguments.length === 2) {
    // readRawString(index, length)
  } else {
    // readRawString(length);
    length = index;
    index = this._offset;
    this._offset += length;
  }
  return this._bytes.toString('utf8', index, index + length);
};

[ 'getString', 'getCString' ].forEach(function (method) {
  ByteBuffer.prototype[method] = function (index) {
    var moveOffset = false;
    if (index === null || index === undefined) {
      index = this._offset;
      moveOffset = true;
    }
    var length = this.getInt(index);
    index += 4;

    if (moveOffset) {
      this._offset += 4 + length;
    }

    if (length === 0) {
      // empty string
      return '';
    }

    if (method === 'getCString') {
      length--;
    }
    return this._bytes.toString('utf8', index, index + length);
  };
});

ByteBuffer.prototype.putString = function (index, value) {
  if (typeof value === 'undefined') {
    value = index;
    index = null;
  }
  return this._putString(index, value, 'java');
};

ByteBuffer.prototype.putCString = function (index, value) {
  if (typeof value === 'undefined') {
    value = index;
    index = null;
  }
  return this._putString(index, value, 'c');
};

ByteBuffer.prototype.toString = function () {
  var s = '<ByteBuffer';
  for (var i = 0; i < this._offset; i++) {
    var c = this._bytes[i].toString('16');
    if (c.length === 1) {
      c = '0' + c;
    }
    s += ' ' + c;
  }
  s += '>';
  return s;
};

ByteBuffer.prototype.copy = ByteBuffer.prototype.array = function (start, end) {
  if (arguments.length === 0) {
    // copy()
    start = 0;
    end = this._offset;
  } else if (arguments.length === 1) {
    // copy(start)
    end = this._offset;
  }

  if (end > this._offset) {
    end = this._offset;
  }
  return this._copy(start, end);
};

ByteBuffer.prototype.position = function (newPosition) {
  if (typeof newPosition === 'number') {
    this._offset = newPosition;
    // make `bytes.position(1).read();` chain
    return this;
  }
  return this._offset;
};

ByteBuffer.prototype.skip = function (size) {
  this._offset += size;
};

ByteBuffer.prototype.flip = function () {
  // switch to read mode
  this.limit(this.position());
  this.position(0);
  return this;
};

ByteBuffer.prototype.clear = function () {
  this._limit = this._size;
  this._offset = 0;
  this._bytes = new Buffer(this._size);
  return this;
}

ByteBuffer.prototype.limit = function (newLimit) {
  if(typeof newLimit === 'number') {
    if ((newLimit < 0) || (newLimit > this._size)) {
      throw new Error('IllegalArgumentException');
    }
    if (this._offset > newLimit) {
      this._offset = newLimit;
    }
    this._limit = newLimit;
    return this;
  }
  return this._limit;
};

ByteBuffer.prototype.capacity = function () {
  return this._size;
};

ByteBuffer.prototype.remaining = function () {
  return this.limit() - this.position();
};

ByteBuffer.prototype.hasRemaining = function () {
  return this.remaining() > 0;
};

ByteBuffer.prototype.checkArraySize = function (arrayLength, offset, length) {
  if ((offset < 0) || (length < 0) || (arrayLength < length + offset)) {
    throw new Error('IndexOutOfBoundsException');
  }
};

ByteBuffer.prototype.checkForUnderflow = function (length) {
  length = length || 0;
  if (this.remaining() < length) {
    throw new Error('BufferOverflowException');
  }
};

module.exports = ByteBuffer;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * copy-to - index.js
 * Copyright(c) 2014 dead_horse <dead_horse@qq.com>
 * MIT Licensed
 */



/**
 * slice() reference.
 */

var slice = Array.prototype.slice;

/**
 * Expose copy
 *
 * ```
 * copy({foo: 'nar', hello: 'copy'}).to({hello: 'world'});
 * copy({foo: 'nar', hello: 'copy'}).toCover({hello: 'world'});
 * ```
 *
 * @param {Object} src
 * @return {Copy}
 */

module.exports = Copy;


/**
 * Copy
 * @param {Object} src
 * @param {Boolean} withAccess
 */

function Copy(src, withAccess) {
  if (!(this instanceof Copy)) return new Copy(src, withAccess);
  this.src = src;
  this._withAccess = withAccess;
}

/**
 * copy properties include getter and setter
 * @param {[type]} val [description]
 * @return {[type]} [description]
 */

Copy.prototype.withAccess = function (w) {
  this._withAccess = w !== false;
  return this;
};

/**
 * pick keys in src
 *
 * @api: public
 */

Copy.prototype.pick = function(keys) {
  if (!Array.isArray(keys)) {
    keys = slice.call(arguments);
  }
  if (keys.length) {
    this.keys = keys;
  }
  return this;
};

/**
 * copy src to target,
 * do not cover any property target has
 * @param {Object} to
 *
 * @api: public
 */

Copy.prototype.to = function(to) {
  to = to || {};

  if (!this.src) return to;
  var keys = this.keys || Object.keys(this.src);

  if (!this._withAccess) {
    for (var i = 0; i < keys.length; i++) {
      key = keys[i];
      if (to[key] !== undefined) continue;
      to[key] = this.src[key];
    }
    return to;
  }

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!notDefined(to, key)) continue;
    var getter = this.src.__lookupGetter__(key);
    var setter = this.src.__lookupSetter__(key);
    if (getter) to.__defineGetter__(key, getter);
    if (setter) to.__defineSetter__(key, setter);

    if (!getter && !setter) {
      to[key] = this.src[key];
    }
  }
  return to;
};

/**
 * copy src to target,
 * override any property target has
 * @param {Object} to
 *
 * @api: public
 */

Copy.prototype.toCover = function(to) {
  var keys = this.keys || Object.keys(this.src);

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    delete to[key];
    var getter = this.src.__lookupGetter__(key);
    var setter = this.src.__lookupSetter__(key);
    if (getter) to.__defineGetter__(key, getter);
    if (setter) to.__defineSetter__(key, setter);

    if (!getter && !setter) {
      to[key] = this.src[key];
    }
  }
};

Copy.prototype.override = Copy.prototype.toCover;

/**
 * append another object to src
 * @param {Obj} obj
 * @return {Copy}
 */

Copy.prototype.and = function (obj) {
  var src = {};
  this.to(src);
  this.src = obj;
  this.to(src);
  this.src = src;

  return this;
};

/**
 * check obj[key] if not defiend
 * @param {Object} obj
 * @param {String} key
 * @return {Boolean}
 */

function notDefined(obj, key) {
  return obj[key] === undefined
    && obj.__lookupGetter__(key) === undefined
    && obj.__lookupSetter__(key) === undefined;
}


/***/ }),
/* 8 */
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.

function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return objectToString(arg) === '[object Array]';
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = Buffer.isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright(c) node-modules and other contributors.
 * MIT Licensed
 *
 * Authors:
 *   dead_horse <dead_horse@qq.com> (http://deadhorse.me)
 *   fengmk2 <fengmk2@gmail.com> (http://fengmk2.com)
 */



var EncoderV1 = exports.EncoderV1 = exports.Encoder = __webpack_require__(11);
var DecoderV1 = exports.DecoderV1 = exports.Decoder = __webpack_require__(10);

var EncoderV2 = exports.EncoderV2 = __webpack_require__(43);
var DecoderV2 = exports.DecoderV2 = __webpack_require__(42);

exports.encoderV1 = new EncoderV1({size: 1024 * 1024});
exports.encoderV2 = new EncoderV2({size: 1024 * 1024});

exports.decode = function decode(buf, version, withType) {
  if (typeof version === 'boolean') {
    // buf, withType, version
    var t = version;
    version = withType;
    withType = t;
  }

  withType = !!withType;

  if (version === '2.0') {
    return new DecoderV2(buf).read(withType);
  }
  return new DecoderV1(buf).read(withType);
};

exports.encode = function encode(obj, version) {
  var encoder;
  if (version === '2.0') {
    encoder = exports.encoderV2;
  } else {
    encoder = exports.encoderV1;
  }

  encoder.reset();
  return encoder.write(obj).get();
};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * hessian.js - lib/v1/decoder.js
 * Copyright(c)
 * MIT Licensed
 *
 * Authors:
 *   dead_horse <dead_horse@qq.com> (http://deadhorse.me)
 *   fengmk2 <fengmk2@gmail.com> (http://fengmk2.github.com)
 */



var debug = __webpack_require__(1)('hessian:v1:decoder');
var ByteBuffer = __webpack_require__(6);
var is = __webpack_require__(5);
var utils = __webpack_require__(0);
var object = __webpack_require__(2);
var JavaExceptionError = object.JavaExceptionError;
var supportES6Map = __webpack_require__(0).supportES6Map;

var BYTE_CODES = {};

function Decoder(buf) {
  this.byteBuffer = buf ? ByteBuffer.wrap(buf) : null;
  this.refMap = {};
  this.refId = 0;
  this.BYTE_CODES = BYTE_CODES;
}

/**
 * prototype of Decoder
 */

var proto = Decoder.prototype;

proto.throwError = function (method, code) {
  throw new TypeError('hessian ' + method + ' error, unexpect code: 0x' + code.toString(16));
};

proto._addRef = function (obj) {
  this.refMap[this.refId++] = obj;
};

/**
 * init from a buffer
 * @param {Buffer} buf
 * @api public
 */
proto.init = function (buf) {
  this.byteBuffer = ByteBuffer.wrap(buf);
  return this;
};

/**
 * clean the decoder
 * @api public
 */
proto.clean = function () {
  this.byteBuffer = new ByteBuffer();
  this.refMap = {};
  this.refId = 0;
  return this;
};

/**
 * check if the label match the method
 * @api private
 */
proto._checkLabel = function (method, label) {
  var l = this.byteBuffer.getChar();
  var labelIsOk = l === label || label.indexOf(l) >= 0;
  if (!labelIsOk) {
    throw new TypeError('hessian ' + method + ' only accept label `' + label +
      '` but got unexpect label `' + l + '`');
  }
  return l;
};

proto.handleType = function(type, val, withType) {
  return withType ? {$class: object.DEFAULT_CLASSNAME[type], $: val} : val;
};

/**
 * read a null from buffer
 *
 * v1.0
 * ```
 * null ::= N(x4e)
 * ```
 *
 * @return {Null}
 * @api public
 */
proto.readNull = function () {
  this._checkLabel('readNull', 'N');
  return null;
};

utils.addByteCodes(BYTE_CODES, [
  0x4e,
], 'readNull');

/**
 * read a boolean from buffer
 *
 * v1.0
 * ```
 * boolean ::= T(x54)
 *         ::= F(x46)
 * ```
 *
 * @return {Boolean}
 * @api public
 */
proto.readBool = function (withType) {
  var label = this._checkLabel('readBool', ['T', 'F']);
  var val = label === 'T';
  return this.handleType('boolean', val, withType);
};

utils.addByteCodes(BYTE_CODES, [
  0x54,
  0x46,
], 'readBool');

/**
 * read a int from buffer
 *
 * v1.0
 * ```
 * int ::= I(x49) b32 b24 b16 b8
 * ```
 *
 * @return {Number}
 * @api public
 */
proto.readInt = function (withType) {
  this._checkLabel('readInt', 'I');
  var val = this.byteBuffer.getInt();
  return this.handleType('int', val, withType);
};

utils.addByteCodes(BYTE_CODES, [
  0x49
], 'readInt');

/**
 * read a long from buffer
 *
 * v1.0
 * ```
 * long ::= L(x4c) b64 b56 b48 b40 b32 b24 b16 b8
 * ```
 *
 * @return {Number}
 * @api public
 */
proto.readLong = function (withType) {
  this._checkLabel('readLong', 'L');
  var val = utils.handleLong(this.byteBuffer.getLong());
  return this.handleType('long', val, withType);
};

utils.addByteCodes(BYTE_CODES, [
  0x4c
], 'readLong');

/**
 * read a double from buffer
 *
 * v1.0
 * ```
 * double ::= D(x44) b64 b56 b48 b40 b32 b24 b16 b8
 * ```
 *
 * @return {Number}
 * @api public
 */
proto.readDouble = function (withType) {
  this._checkLabel('readDouble', 'D');
  var val = this.byteBuffer.getDouble();
  return this.handleType('double', val, withType);
};

utils.addByteCodes(BYTE_CODES, [
  0x44
], 'readDouble');

/**
 * read a date from buffer
 *
 * v1.0
 * ```
 * date ::= d(x64) b64 b56 b48 b40 b32 b24 b16 b8
 * ```
 * Date represented by a 64-bit long of milliseconds since Jan 1 1970 00:00H, UTC.
 *
 * @return {Date}
 * @api public
 */
proto.readDate = function (withType) {
  this._checkLabel('readDate', 'd');
  var date = utils.handleLong(this.byteBuffer.getLong());
  debug('read a date with milliEpoch: %d', date);
  var val = new Date(date);
  return this.handleType('date', val, withType);
};

utils.addByteCodes(BYTE_CODES, [
  0x64
], 'readDate');

/**
 * read bytes from buffer
 *
 * v1.0
 * ```
 * binary ::= (b(x62) b16 b8 binary-data)* B(x42) b16 b8 binary-data
 * ```
 * Binary data is encoded in chunks.
 * 'B' represents the final chunk and
 * 'b' represents any initial chunk. Each chunk has a 16-bit length value.
 *
 * @return {Buffer}
 * @api public
 */
proto.readBytes = function () {
  var label = this._checkLabel('readBytes', ['b', 'B']);
  var bufs = [];
  var length = 0;
  // get all trunk start with 'b'
  while (label === 'b') {
    length = this.byteBuffer.getUInt16();
    bufs.push(this.byteBuffer.read(length));
    label = this._checkLabel('readBytes', ['b', 'B']);
  }
  // get the last trunk start with 'B'
  length = this.byteBuffer.getUInt16();
  bufs.push(this.byteBuffer.read(length));

  return Buffer.concat(bufs);
};

utils.addByteCodes(BYTE_CODES, [
  0x62,
  0x42
], 'readBytes');

proto._readUTF8String = function (len) {
  if (!is.number(len)) {
    len = this.byteBuffer.getUInt16();
  }

  var startPos = this.byteBuffer.position();
  var head;
  var l;
  debug('read utf8 string tunk, chars length: %d', len);

  if (len === 0) {
    return '';
  }

  while (len--) {
    head = this.byteBuffer.get();
    l = utils.lengthOfUTF8(head);
    this.byteBuffer.skip(l - 1);
  }
  debug('get string trunk. start position: %d, byte length: %d',
    startPos, this.byteBuffer.position() - startPos);

  return this.byteBuffer.getRawString(startPos, this.byteBuffer.position() - startPos);
};

/**
 * read a string from buffer
 *
 * The length is the number of characters, which may be different than the number of bytes.
 *
 * v1.0
 * ```
 * string ::= (s(x73) b16 b8 utf-8-data)* S(x53) b16 b8 utf-8-data
 * ```
 *
 * @return {String}
 * @api public
 */
proto.readString = function (withType) {
  var str = '';
  var code = this.byteBuffer.get();
  // get all trunk start with 's'
  while (code === 0x73) {
    str += this._readUTF8String();
    code = this.byteBuffer.get();
  }

  if (code === 0x53) {
    // x53 ('S') represents the final chunk
    debug('read last trunk of string');
    str += this._readUTF8String();
  } else {
    // error format
    throw new TypeError('hessian readString error, unexpect string code: 0x' + code.toString(16));
  }
  return this.handleType('string', str, withType);
};

utils.addByteCodes(BYTE_CODES, [
  0x73,
  0x53
], 'readString');

/**
 * v1.0
 * ```
 * t(x74) b16 b8 type-string
 * ```
 *
 * @param {Boolean} skip skip type, if true, will return empty string
 * @return {String} type string
 */
proto.readType = function (skip) {
  this._checkLabel('readType', 't');
  var typeLength = this.byteBuffer.getUInt16();
  if (skip) {
    this.byteBuffer.skip(typeLength);
    debug('ignore type, skip %d bytes', typeLength);
    return '';
  } else {
    var type = this.byteBuffer.readRawString(typeLength);
    debug('get type: %s', type);
    return type;
  }
};

utils.addByteCodes(BYTE_CODES, [
  0x74,
], 'readType');

proto.readLength = function () {
  this._checkLabel('readLength', 'l'); // x6c
  var len = this.byteBuffer.getUInt();
  debug('read length: %s', len);
  return len;
};

utils.addByteCodes(BYTE_CODES, [
  0x6c,
], 'readLength');

/**
 * A sparse array, hessian v1.0
 * http://hessian.caucho.com/doc/hessian-1.0-spec.xtp#map
 */
proto._readSparseObject = function (withType) {
  var obj = {};
  var label = this.byteBuffer.getChar(this.byteBuffer.position());
  while (label !== 'z') {
    debug('sparse array label: %s', label);
    var key = this.read(withType);
    var val = this.read(withType);
    obj[key] = val;
    label = this.byteBuffer.getChar(this.byteBuffer.position());
  }
  // skip 'z' char
  this.byteBuffer.position(this.byteBuffer.position() + 1);

  // default type info
  if (withType) {
    return {
      $class: object.DEFAULT_CLASSNAME.map,
      $: obj
    };
  }

  return obj;
};

/**
 * read an object from buffer
 *
 * v1.0
 * ```
 * map ::= M(x4d) t b16 b8 type-string (object, object)* z
 * ```
 *
 * @param {Boolean} withType if need retain the type info
 * @return {Object}
 * @api public
 */
proto.readObject = function (withType) {
  this._checkLabel('readObject', 'M');
  debug('start read an object');
  var typeLabel = this.byteBuffer.getChar(this.byteBuffer.position());
  if (typeLabel !== 't') {
    debug('read sparse object, start label: %s', typeLabel);
    return this._readSparseObject(withType);
  }

  var type = this.readType(false) || object.DEFAULT_CLASSNAME.map;
  // if object is 'java.util.HashMap', type will be ''

  var result = {
    $class: type,
    $: {}
  };
  var isMap = (type.indexOf(object.DEFAULT_CLASSNAME.map) === 0 ||
    type.indexOf(object.DEFAULT_CLASSNAME.iMap) === 0) && supportES6Map;

  if (isMap) {
    Object.defineProperty(result.$, '$map', {
      value: new Map(),
      enumerable: false,
    });
  }

  this._addRef(result);

  // get
  var label = this.byteBuffer.getChar();
  var key;

  while (label !== 'z') {
    this.byteBuffer.position(this.byteBuffer.position() - 1);
    key = this.read();
    var value = this.read(withType);
    label = this.byteBuffer.getChar();
    // property name will auto transfer to a String type.
    debug('read object prop: %j with type: %s', key, withType);
    if (!/^this\$\d+$/.test(key)) {
      result.$[key] = value;
    }
    if (isMap) {
      result.$.$map.set(key, value);
    }
  }
  debug('read object finish');

  // java.lang.NoClassDefFoundError
  if (/Exception$/.test(type) || /^java\.lang\.\w+Error$/.test(type)) {
    result.$ = new JavaExceptionError(result, withType);
  }

  return withType ? result : result.$;
};

utils.addByteCodes(BYTE_CODES, [
  0x4d,
], 'readObject');

/**
 * read an map from buffer
 *
 * v1.0
 * ```
 * map ::= M t b16 b8 type-string (object, object)* z
 * ```
 *
 * @param {Boolean} withType if need retain the type info
 * @return {Object}
 * @api public
 */
proto.readMap = proto.readObject;

/**
 * anonymous variable-length list = {0, "foobar"}
 * http://hessian.caucho.com/doc/hessian-1.0-spec.xtp#list
 */
proto._readNoLengthArray = function (withType, type) {
  var arr = [];
  var label = this.byteBuffer.getChar(this.byteBuffer.position());
  while (label !== 'z') {
    debug('no length array item#%d label: %s', arr.length, label);
    arr.push(this.read(withType));
    label = this.byteBuffer.getChar(this.byteBuffer.position());
  }
  // skip 'z' char
  this.byteBuffer.position(this.byteBuffer.position() + 1);

  arr = withType
  ? { $class: type, $: arr }
  : arr;
  return arr;
};

/**
 * read an array from buffer
 *
 * v1.0
 * ```
 * list ::= V(x56) type? length? object* z
 * ```
 *
 * @param {Boolean} withType if need retain the type info
 * @return {Array}
 * @api public
 */
proto.readArray = function (withType) {
  debug('start read an array');
  this._checkLabel('readArray', 'V');
  var type = '';

  var typeLabel = this.byteBuffer.getChar(this.byteBuffer.position());
  if (typeLabel === 't') {
    type = this.readType(!withType);
  }
  type = type || object.DEFAULT_CLASSNAME.list;

  var lengthLabel = this.byteBuffer.getChar(this.byteBuffer.position());
  if (lengthLabel !== 'l') {
    debug('read no length array, start label: %s', typeLabel);
    return this._readNoLengthArray(withType, type);
  }

  // if object is 'java.util.ArrayList', type will be ''

  var realResult = [];
  var result = realResult;

  if (withType) {
    result = {
      $class: type,
      $: realResult
    };
  }

  this._addRef(result);

  var len = this.readLength();
  while (len--) {
    realResult.push(this.read(withType));
  }
  var endLabel = this.byteBuffer.getChar();
  if (endLabel !== 'z') {
    throw new TypeError('hessian readArray error, unexpect end label: ' + endLabel);
  }
  debug('read array finished with a length of %d', realResult.length);
  return result;
};

utils.addByteCodes(BYTE_CODES, [
  0x56,
], 'readArray');

proto.readList = proto.readArray;

/**
 * Get a object by ref id
 *
 * @return {Object}
 */
proto.readRef = function (withType) {
  var rid = this.readRefId();
  var obj = this.refMap[rid];
  if (!withType && obj && utils.hasOwnProperty(obj, '$')) {
    obj = obj.$;
  }
  return obj;
};

/**
 * v1.0
 * ```
 * ref ::= R(x52) b32 b24 b16 b8
 * ```
 *
 * @return {Number}
 */
proto.readRefId = function (withType) {
  this._checkLabel('readRef', 'R');
  return this.byteBuffer.getInt();
};

utils.addByteCodes(BYTE_CODES, [
  0x52,
], 'readRef');

/**
 * read any thing
 *
 * @param {Boolean} withType if need retain the type info
 * @api public
 */
proto.read = function (withType) {
  var pos = this.byteBuffer.position();
  var code = this.byteBuffer.get(pos);
  var method = this.BYTE_CODES[code];
  if (debug.enabled) {
    debug('read position: %s, code: 0x%s, method: %s', pos, code.toString(16), method);
  }

  if (!method) {
    throw new Error('hessian read got an unexpect code: 0x' + code.toString(16));
  }

  return this[method](withType);
};

/**
 * set or get decoder byteBuffer position
 */
proto.position = function (num) {
  if (is.number(num)) {
    this.byteBuffer.position(num);
    return this;
  }

  return this.byteBuffer.position();
};

module.exports = Decoder;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * hessian.js - lib/encoder.js
 * Copyright(c)
 * MIT Licensed
 *
 * Authors:
 *   dead_horse <dead_horse@qq.com> (http://deadhorse.me)
 *   fengmk2 <fengmk2@gmail.com> (http://fengmk2.github.com)
 */



var ByteBuffer = __webpack_require__(6);
var debug = __webpack_require__(1)('hessian:v1:encoder');
var utils = __webpack_require__(0);
var javaObject = __webpack_require__(2);
var is = __webpack_require__(5);
var supportES6Map = __webpack_require__(0).supportES6Map;

function Encoder(options) {
  options = options || {};
  //array of buffer
  this.byteBuffer = new ByteBuffer({
    size: options.size
  });
  this.objects = [];
}

var proto = Encoder.prototype;

proto._assertType = function (method, expectType, val, desc) {
  var valType = typeof val;
  if (!is[expectType](val)) {
    var msg = 'hessian ' + method +
      ' expect input type is `' + expectType + '`, but got `' + valType + '`' + ' : ' + JSON.stringify(val) + ' ' + (desc || '');
    throw new TypeError(msg);
  }
};

/**
 * get the encode buffer
 * @return {Buffer}
 */
proto.get = function () {
  return this.byteBuffer.array();
};

/**
 * clean the buf
 */
proto.reset = proto.clean = function () {
  this.byteBuffer.reset();
  this.objects = [];
  return this;
};

/**
 * encode null
 * : N
 */
proto.writeNull = function () {
  this.byteBuffer.putChar('N');
  return this;
};

/**
 * encode bool
 * : T
 * : F
 */
proto.writeBool = function (val) {
  this.byteBuffer.putChar(val ? 'T' : 'F');
  return this;
};

/**
 * encode int
 * : I 0x00 0x00 0x00 0x10
 */
proto.writeInt = function (val) {
  this._assertType('writeInt', 'int32', val);
  this.byteBuffer
    .putChar('I')
    .putInt(val);
  return this;
};

/**
 * encode long
 * warning: we won't check if the long value is out of bound, be careful!
 * : L 0x00 0x00 0x00 0x00 0x10 0x32 0x33 0x12
 */
proto.writeLong = function (val) {
  this.byteBuffer
    .putChar('L')
    .putLong(val);
  return this;
};

/**
 * encode double
 * : D 0x00 0x00 0x00 0x00 0x10 0x32 0x33 0x12
 */
proto.writeDouble = function (val) {
  this._assertType('writeDouble', 'number', val);
  this.byteBuffer
    .putChar('D')
    .putDouble(val);
  return this;
};

/**
 * encode date
 * 1.0: http://hessian.caucho.com/doc/hessian-1.0-spec.xtp#date
 * : d 0x00 0x00 0x00 0x00 0x10 0x32 0x33 0x12
 */
proto.writeDate = function (milliEpoch) {
  if (milliEpoch instanceof Date) {
    milliEpoch = milliEpoch.getTime();
  }
  this._assertType('writeDate', 'number', milliEpoch);

  this.byteBuffer
    .putChar('d')
    .putLong(milliEpoch);
  return this;
};

/**
 * encode buffer
 * : b 0x80 0x00 [...]
 *   B 0x00 0x03 [0x01 0x02 0x03]
 */
proto.writeBytes = function (buf) {
  this._assertType('writeBytes', 'buffer', buf);
  var offset = 0;
  while (buf.length - offset > utils.MAX_BYTE_TRUNK_SIZE) {
    this.byteBuffer
      .putChar('b')
      .putUInt16(utils.MAX_BYTE_TRUNK_SIZE)
      .put(buf.slice(offset, offset + utils.MAX_BYTE_TRUNK_SIZE));

    offset += utils.MAX_BYTE_TRUNK_SIZE;
  }

  this.byteBuffer
    .putChar('B')
    .putUInt16(buf.length - offset)
    .put(buf.slice(offset));
  return this;
};

/**
 * encode string
 * : s 0x80 0x00 [...]
 *   S 0x00 0x03 [0x01 0x02 0x03]
 */
proto.writeString = function (str) {
  this._assertType('writeString', 'string', str);
  var offset = 0;

  var length = str.length;
  var strOffset = 0;
  while (length > 0x8000) {
    var sublen = 0x8000;
    // chunk can't end in high surrogate
    var tail = str.charCodeAt(strOffset + sublen - 1);

    if (0xd800 <= tail && tail <= 0xdbff) {
      debug('writeString got tail: 0x%s', tail.toString(16));
      sublen--;
    }

    this.byteBuffer
      .put(0x73) // 's'
      .putUInt16(sublen)
      .putRawString(str.slice(strOffset, strOffset + sublen));

    length -= sublen;
    strOffset += sublen;
    debug('writeString strOffset: %s, length: %s, sublen: %s', strOffset, length, sublen);
  }

  debug('writeString left length: %s', length);
  this.byteBuffer
    .put(0x53) // 'S'
    .putUInt16(length)
    .putRawString(str.slice(strOffset));

  return this;
};

var _typecache = {};

/**
 * encode type
 * v1.0
 * ```
 * type ::= 0x74(t) type-string-length(putUInt16) type-string(putRawString)
 * ```
 */
proto.writeType = function (type) {
  type = type || '';
  if (_typecache[type]) {
    this.byteBuffer.put(_typecache[type]);
    return this;
  }

  var start = this.byteBuffer.position();

  this.byteBuffer
    .put(0x74)
    .putUInt16(type.length)
    .putRawString(type);

  var end = this.byteBuffer.position();
  _typecache[type] = this.byteBuffer.copy(start, end);

  return this;
};

/**
 * encode ref
 * v1.0
 * ```
 * ref ::= R(0x52) int(putInt)
 * ```
 */
proto.writeRef = function (refId) {
  this.byteBuffer
    .putChar('R')
    .putInt(refId);

  return this;
};

proto._checkRef = function (obj) {
  var refIndex = this.objects.indexOf(obj);
  if (refIndex >= 0) {
    // already have this object
    // just write ref
    debug('writeObject with a refIndex: %d', refIndex);
    this.writeRef(refIndex);
    return true;
  }
  // a new comming object
  this.objects.push(obj);
  return false;
};

/**
 * A sparse array
 *
 * @param {Object} obj simple obj
 * @return {this}
 */
proto._writeHashMap = function (obj) {
  debug('_writeHashMap() %j, fields: %j', obj);

  // Real code in java impl:
  // http://grepcode.com/file/repo1.maven.org/maven2/com.caucho/hessian/3.1.3/com/caucho/hessian/io/Hessian2Output.java#Hessian2Output.writeMapBegin%28java.lang.String%29
  // M(0x4d) type(writeType) (<key> <value>) z(0x7a)
  this.byteBuffer.put(0x4d);
  // hashmap's type is null
  this.writeType('');

  if (supportES6Map && obj instanceof Map) {
    obj.forEach(function (value, key) {
      this.write(key);
      this.write(value);
    }, this);
  } else {
    // hash map must sort keys
    var keys = Object.keys(obj).sort();
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      this.writeString(k);
      this.write(obj[k]);
    }
  }
  this.byteBuffer.put(0x7a);
  return this;
};

// M(0x4d) type(writeType) (<key> <value>) z(0x7a)
proto._writeObject = function (obj) {
  this._assertType('writeObject / writeMap', 'object', obj.$, obj.$class);
  this.byteBuffer.put(0x4d);
  this.writeType(obj.$class);

  var val = obj.$;
  var keys = Object.keys(val);
  for (var i = 0, len = keys.length; i < len; i++) {
    var key = keys[i];
    this.writeString(key);
    this.write(val[key]);
  }
  this.byteBuffer.put(0x7a);
  return this;
};

/**
 * encode object
 *   support circular
 *   support all kind of java object
 * : {a: 1}
 * : {$class: 'java.lang.Map', $: {a: 1}}
 */
proto.writeObject = function (obj) {
  if (is.nullOrUndefined(obj) || 
    // : { a: { '$class': 'xxx', '$': null } }
    (is.string(obj.$class) && is.nullOrUndefined(obj.$))) {
    debug('writeObject with a null');
    return this.writeNull();
  }
  this._assertType('writeObject / writeMap', 'object', obj);

  if (this._checkRef(obj)) {
    // if is ref, will write by _checkRef
    return this;
  }

  var className = '';
  var realObj;
  if (!obj.$class || !obj.$) {
    // : {a: 1}
    realObj = obj;
  } else {
    // : {$class: 'java.util.HashMap', $: {a: 1}}
    className = obj.$class === javaObject.DEFAULT_CLASSNAME.map || obj.$class === javaObject.DEFAULT_CLASSNAME.iMap ? '' : obj.$class;
    realObj = obj.$;
  }

  if (!className) {
    return this._writeHashMap(realObj);
  }

  debug('writeObject with complex object, className: %s', className);
  return this._writeObject(obj);
};

proto.writeMap = proto.writeObject;

proto._writeListBegin = function (length, type) {
  this.byteBuffer.putChar('V');

  if (type) {
    this.writeType(type);
  }

  this.byteBuffer.put(0x6c); // 'l'
  this.byteBuffer.putInt(length);
  return true;
};

/**
 * encode array
 *
 * v1.0
 * ```
 * list ::= V(x56) [type(writeType)] l(0x6c) long-length(putInt) values 'z'
 * ```
 *
 * v2.0
 * ```
 * list ::= V(x56) type(writeType) n(0x6e) short-length(put) values 'z'
 *      ::= V(x56) type(writeType) l(0x6c) long-length(putInt) values 'z'
 *      ::= v(x76) ref(writeInt) fix-length(writeInt) values
 * ```
 *
 * An ordered list, like an array.
 * The two list productions are a fixed-length list and a variable length list.
 * Both lists have a type.
 * The type string may be an arbitrary UTF-8 string understood by the service.
 *
 * fixed length list:
 * Hessian 2.0 allows a compact form of the list for successive lists of
 * the same type where the length is known beforehand.
 * The type and length are encoded by integers,
 * where the type is a reference to an earlier specified type.
 *
 * @param {Array} arr
 * @return {this}
 */

proto.writeArray = function (arr) {
  if (this._checkRef(arr)) {
    // if is ref, will write by _checkRef
    return this;
  }

  var isSimpleArray = is.array(arr);
  var className = ''; // empty string meaning: `javaObject.DEFAULT_CLASSNAME.list`
  var realArray = arr;
  if (!isSimpleArray) {
    if (is.object(arr) && is.nullOrUndefined(arr.$)) {
      return this.writeNull();
    }
    var isComplexArray = is.object(arr) &&
      is.string(arr.$class) && is.array(arr.$);
    if (!isComplexArray) {
      throw new TypeError('hessian writeArray input type invalid');
    }

    debug('write array with a complex array with className: %s', className);

    className = arr.$class === javaObject.DEFAULT_CLASSNAME.list ? '' : arr.$class;
    realArray = arr.$;
  }

  var hasEnd = this._writeListBegin(realArray.length, className);

  for (var i = 0; i < realArray.length; i++) {
    this.write(realArray[i]);
  }

  if (hasEnd) {
    this.byteBuffer.putChar('z');
  }
  return this;
};

proto.writeList = proto.writeArray;

/**
 * write any type
 * @param {Object|Number|String|Boolean|Array} val
 * : 1 => int
 * : 1.1 => double
 * :
 */
proto.write = function (val) {
  var type = typeof val;
  if (is.nullOrUndefined(val) || is.NaN(val)) {
    return this.writeNull();
  }
  switch (type) {
  case 'string':
    return this.writeString(val);
  case 'boolean':
    return this.writeBool(val);
  case 'number':
    // must check long value first
    if (is.long(val)) {
      debug('write number %d as long', val);
      return this.writeLong(val);
    }

    if (is.int(val)) {
      debug('write number %d as int', val);
      return this.writeInt(val);
    }

    // double
    debug('write number %d as double', val);
    return this.writeDouble(val);
  }

  if (is.long(val) || is.Long(val)) {
    debug('write long: high: %s, low: %s', val.high, val.low);
    return this.writeLong(val);
  }

  if (is.date(val)) {
    debug('write Date: %s', val);
    return this.writeDate(val);
  }

  if (is.buffer(val)) {
    debug('write Buffer with a length of %d', val.length);
    return this.writeBytes(val);
  }

  if (is.array(val)) {
    debug('write simple array with a length of %d', val.length);
    return this.writeArray(val);
  }

  // Object
  // {a: 1, b: 'test'}
  // {a: 0, b: null}
  if (!is.string(val.$class) || !utils.hasOwnProperty(val, '$')) {
    debug('write simple object');
    return this.writeObject(val);
  }

  if (is.array(val.$)) {
    debug('detect val.$ is array');
    return this.writeArray(val);
  }

  var method = utils.getSerializer(val.$class);
  debug('write detect %s use serializer %s', val.$class, method);

  // {$class: 'long', $: 123}
  if (method !== 'writeObject' && method !== 'writeArray') {
    if (is.nullOrUndefined(val.$)) {
      return this.writeNull();
    }
    return this[method](val.$);
  }

  // java.lang.Object
  if (utils.isJavaObject(val.$class)) {
    if (is.date(val.$) || !is.object(val.$)) {
      return this.write(val.$);
    }
  }

  // {$class: 'java.util.Map', $: {a: 1}}
  return this[method](val);
};

module.exports = Encoder;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var stream = __webpack_require__(74)


function isStream (obj) {
  return obj instanceof stream.Stream
}


function isReadable (obj) {
  return isStream(obj) && typeof obj._read == 'function' && typeof obj._readableState == 'object'
}


function isWritable (obj) {
  return isStream(obj) && typeof obj._write == 'function' && typeof obj._writableState == 'object'
}


function isDuplex (obj) {
  return isReadable(obj) && isWritable(obj)
}


module.exports            = isStream
module.exports.isReadable = isReadable
module.exports.isWritable = isWritable
module.exports.isDuplex   = isDuplex


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var replace = String.prototype.replace;
var percentTwenties = /%20/g;

module.exports = {
    'default': 'RFC3986',
    formatters: {
        RFC1738: function (value) {
            return replace.call(value, percentTwenties, '+');
        },
        RFC3986: function (value) {
            return value;
        }
    },
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty;

var hexTable = (function () {
    var array = [];
    for (var i = 0; i < 256; ++i) {
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    }

    return array;
}());

exports.arrayToObject = function (source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }

    return obj;
};

exports.merge = function (target, source, options) {
    if (!source) {
        return target;
    }

    if (typeof source !== 'object') {
        if (Array.isArray(target)) {
            target.push(source);
        } else if (typeof target === 'object') {
            target[source] = true;
        } else {
            return [target, source];
        }

        return target;
    }

    if (typeof target !== 'object') {
        return [target].concat(source);
    }

    var mergeTarget = target;
    if (Array.isArray(target) && !Array.isArray(source)) {
        mergeTarget = exports.arrayToObject(target, options);
    }

    if (Array.isArray(target) && Array.isArray(source)) {
        source.forEach(function (item, i) {
            if (has.call(target, i)) {
                if (target[i] && typeof target[i] === 'object') {
                    target[i] = exports.merge(target[i], item, options);
                } else {
                    target.push(item);
                }
            } else {
                target[i] = item;
            }
        });
        return target;
    }

    return Object.keys(source).reduce(function (acc, key) {
        var value = source[key];

        if (Object.prototype.hasOwnProperty.call(acc, key)) {
            acc[key] = exports.merge(acc[key], value, options);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};

exports.decode = function (str) {
    try {
        return decodeURIComponent(str.replace(/\+/g, ' '));
    } catch (e) {
        return str;
    }
};

exports.encode = function (str) {
    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }

    var string = typeof str === 'string' ? str : String(str);

    var out = '';
    for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);

        if (
            c === 0x2D || // -
            c === 0x2E || // .
            c === 0x5F || // _
            c === 0x7E || // ~
            (c >= 0x30 && c <= 0x39) || // 0-9
            (c >= 0x41 && c <= 0x5A) || // a-z
            (c >= 0x61 && c <= 0x7A) // A-Z
        ) {
            out += string.charAt(i);
            continue;
        }

        if (c < 0x80) {
            out = out + hexTable[c];
            continue;
        }

        if (c < 0x800) {
            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        if (c < 0xD800 || c >= 0xE000) {
            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        i += 1;
        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
        out += hexTable[0xF0 | (c >> 18)] + hexTable[0x80 | ((c >> 12) & 0x3F)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]; // eslint-disable-line max-len
    }

    return out;
};

exports.compact = function (obj, references) {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    var refs = references || [];
    var lookup = refs.indexOf(obj);
    if (lookup !== -1) {
        return refs[lookup];
    }

    refs.push(obj);

    if (Array.isArray(obj)) {
        var compacted = [];

        for (var i = 0; i < obj.length; ++i) {
            if (obj[i] && typeof obj[i] === 'object') {
                compacted.push(exports.compact(obj[i], refs));
            } else if (typeof obj[i] !== 'undefined') {
                compacted.push(obj[i]);
            }
        }

        return compacted;
    }

    var keys = Object.keys(obj);
    keys.forEach(function (key) {
        obj[key] = exports.compact(obj[key], refs);
    });

    return obj;
};

exports.isRegExp = function (obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

exports.isBuffer = function (obj) {
    if (obj === null || typeof obj === 'undefined') {
        return false;
    }

    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * URI.js - Mutating URLs
 * IPv6 Support
 *
 * Version: 1.18.7
 *
 * Author: Rodney Rehm
 * Web: http://medialize.github.io/URI.js/
 *
 * Licensed under
 *   MIT License http://www.opensource.org/licenses/mit-license
 *
 */

(function (root, factory) {
  'use strict';
  // https://github.com/umdjs/umd/blob/master/returnExports.js
  if (typeof module === 'object' && module.exports) {
    // Node
    module.exports = factory();
  } else if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {
    // Browser globals (root is window)
    root.IPv6 = factory(root);
  }
}(this, function (root) {
  'use strict';

  /*
  var _in = "fe80:0000:0000:0000:0204:61ff:fe9d:f156";
  var _out = IPv6.best(_in);
  var _expected = "fe80::204:61ff:fe9d:f156";

  console.log(_in, _out, _expected, _out === _expected);
  */

  // save current IPv6 variable, if any
  var _IPv6 = root && root.IPv6;

  function bestPresentation(address) {
    // based on:
    // Javascript to test an IPv6 address for proper format, and to
    // present the "best text representation" according to IETF Draft RFC at
    // http://tools.ietf.org/html/draft-ietf-6man-text-addr-representation-04
    // 8 Feb 2010 Rich Brown, Dartware, LLC
    // Please feel free to use this code as long as you provide a link to
    // http://www.intermapper.com
    // http://intermapper.com/support/tools/IPV6-Validator.aspx
    // http://download.dartware.com/thirdparty/ipv6validator.js

    var _address = address.toLowerCase();
    var segments = _address.split(':');
    var length = segments.length;
    var total = 8;

    // trim colons (:: or ::a:b:c… or …a:b:c::)
    if (segments[0] === '' && segments[1] === '' && segments[2] === '') {
      // must have been ::
      // remove first two items
      segments.shift();
      segments.shift();
    } else if (segments[0] === '' && segments[1] === '') {
      // must have been ::xxxx
      // remove the first item
      segments.shift();
    } else if (segments[length - 1] === '' && segments[length - 2] === '') {
      // must have been xxxx::
      segments.pop();
    }

    length = segments.length;

    // adjust total segments for IPv4 trailer
    if (segments[length - 1].indexOf('.') !== -1) {
      // found a "." which means IPv4
      total = 7;
    }

    // fill empty segments them with "0000"
    var pos;
    for (pos = 0; pos < length; pos++) {
      if (segments[pos] === '') {
        break;
      }
    }

    if (pos < total) {
      segments.splice(pos, 1, '0000');
      while (segments.length < total) {
        segments.splice(pos, 0, '0000');
      }
    }

    // strip leading zeros
    var _segments;
    for (var i = 0; i < total; i++) {
      _segments = segments[i].split('');
      for (var j = 0; j < 3 ; j++) {
        if (_segments[0] === '0' && _segments.length > 1) {
          _segments.splice(0,1);
        } else {
          break;
        }
      }

      segments[i] = _segments.join('');
    }

    // find longest sequence of zeroes and coalesce them into one segment
    var best = -1;
    var _best = 0;
    var _current = 0;
    var current = -1;
    var inzeroes = false;
    // i; already declared

    for (i = 0; i < total; i++) {
      if (inzeroes) {
        if (segments[i] === '0') {
          _current += 1;
        } else {
          inzeroes = false;
          if (_current > _best) {
            best = current;
            _best = _current;
          }
        }
      } else {
        if (segments[i] === '0') {
          inzeroes = true;
          current = i;
          _current = 1;
        }
      }
    }

    if (_current > _best) {
      best = current;
      _best = _current;
    }

    if (_best > 1) {
      segments.splice(best, _best, '');
    }

    length = segments.length;

    // assemble remaining segments
    var result = '';
    if (segments[0] === '')  {
      result = ':';
    }

    for (i = 0; i < length; i++) {
      result += segments[i];
      if (i === length - 1) {
        break;
      }

      result += ':';
    }

    if (segments[length - 1] === '') {
      result += ':';
    }

    return result;
  }

  function noConflict() {
    /*jshint validthis: true */
    if (root.IPv6 === this) {
      root.IPv6 = _IPv6;
    }
  
    return this;
  }

  return {
    best: bestPresentation,
    noConflict: noConflict
  };
}));


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * URI.js - Mutating URLs
 * Second Level Domain (SLD) Support
 *
 * Version: 1.18.7
 *
 * Author: Rodney Rehm
 * Web: http://medialize.github.io/URI.js/
 *
 * Licensed under
 *   MIT License http://www.opensource.org/licenses/mit-license
 *
 */

(function (root, factory) {
  'use strict';
  // https://github.com/umdjs/umd/blob/master/returnExports.js
  if (typeof module === 'object' && module.exports) {
    // Node
    module.exports = factory();
  } else if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {
    // Browser globals (root is window)
    root.SecondLevelDomains = factory(root);
  }
}(this, function (root) {
  'use strict';

  // save current SecondLevelDomains variable, if any
  var _SecondLevelDomains = root && root.SecondLevelDomains;

  var SLD = {
    // list of known Second Level Domains
    // converted list of SLDs from https://github.com/gavingmiller/second-level-domains
    // ----
    // publicsuffix.org is more current and actually used by a couple of browsers internally.
    // downside is it also contains domains like "dyndns.org" - which is fine for the security
    // issues browser have to deal with (SOP for cookies, etc) - but is way overboard for URI.js
    // ----
    list: {
      'ac':' com gov mil net org ',
      'ae':' ac co gov mil name net org pro sch ',
      'af':' com edu gov net org ',
      'al':' com edu gov mil net org ',
      'ao':' co ed gv it og pb ',
      'ar':' com edu gob gov int mil net org tur ',
      'at':' ac co gv or ',
      'au':' asn com csiro edu gov id net org ',
      'ba':' co com edu gov mil net org rs unbi unmo unsa untz unze ',
      'bb':' biz co com edu gov info net org store tv ',
      'bh':' biz cc com edu gov info net org ',
      'bn':' com edu gov net org ',
      'bo':' com edu gob gov int mil net org tv ',
      'br':' adm adv agr am arq art ato b bio blog bmd cim cng cnt com coop ecn edu eng esp etc eti far flog fm fnd fot fst g12 ggf gov imb ind inf jor jus lel mat med mil mus net nom not ntr odo org ppg pro psc psi qsl rec slg srv tmp trd tur tv vet vlog wiki zlg ',
      'bs':' com edu gov net org ',
      'bz':' du et om ov rg ',
      'ca':' ab bc mb nb nf nl ns nt nu on pe qc sk yk ',
      'ck':' biz co edu gen gov info net org ',
      'cn':' ac ah bj com cq edu fj gd gov gs gx gz ha hb he hi hl hn jl js jx ln mil net nm nx org qh sc sd sh sn sx tj tw xj xz yn zj ',
      'co':' com edu gov mil net nom org ',
      'cr':' ac c co ed fi go or sa ',
      'cy':' ac biz com ekloges gov ltd name net org parliament press pro tm ',
      'do':' art com edu gob gov mil net org sld web ',
      'dz':' art asso com edu gov net org pol ',
      'ec':' com edu fin gov info med mil net org pro ',
      'eg':' com edu eun gov mil name net org sci ',
      'er':' com edu gov ind mil net org rochest w ',
      'es':' com edu gob nom org ',
      'et':' biz com edu gov info name net org ',
      'fj':' ac biz com info mil name net org pro ',
      'fk':' ac co gov net nom org ',
      'fr':' asso com f gouv nom prd presse tm ',
      'gg':' co net org ',
      'gh':' com edu gov mil org ',
      'gn':' ac com gov net org ',
      'gr':' com edu gov mil net org ',
      'gt':' com edu gob ind mil net org ',
      'gu':' com edu gov net org ',
      'hk':' com edu gov idv net org ',
      'hu':' 2000 agrar bolt casino city co erotica erotika film forum games hotel info ingatlan jogasz konyvelo lakas media news org priv reklam sex shop sport suli szex tm tozsde utazas video ',
      'id':' ac co go mil net or sch web ',
      'il':' ac co gov idf k12 muni net org ',
      'in':' ac co edu ernet firm gen gov i ind mil net nic org res ',
      'iq':' com edu gov i mil net org ',
      'ir':' ac co dnssec gov i id net org sch ',
      'it':' edu gov ',
      'je':' co net org ',
      'jo':' com edu gov mil name net org sch ',
      'jp':' ac ad co ed go gr lg ne or ',
      'ke':' ac co go info me mobi ne or sc ',
      'kh':' com edu gov mil net org per ',
      'ki':' biz com de edu gov info mob net org tel ',
      'km':' asso com coop edu gouv k medecin mil nom notaires pharmaciens presse tm veterinaire ',
      'kn':' edu gov net org ',
      'kr':' ac busan chungbuk chungnam co daegu daejeon es gangwon go gwangju gyeongbuk gyeonggi gyeongnam hs incheon jeju jeonbuk jeonnam k kg mil ms ne or pe re sc seoul ulsan ',
      'kw':' com edu gov net org ',
      'ky':' com edu gov net org ',
      'kz':' com edu gov mil net org ',
      'lb':' com edu gov net org ',
      'lk':' assn com edu gov grp hotel int ltd net ngo org sch soc web ',
      'lr':' com edu gov net org ',
      'lv':' asn com conf edu gov id mil net org ',
      'ly':' com edu gov id med net org plc sch ',
      'ma':' ac co gov m net org press ',
      'mc':' asso tm ',
      'me':' ac co edu gov its net org priv ',
      'mg':' com edu gov mil nom org prd tm ',
      'mk':' com edu gov inf name net org pro ',
      'ml':' com edu gov net org presse ',
      'mn':' edu gov org ',
      'mo':' com edu gov net org ',
      'mt':' com edu gov net org ',
      'mv':' aero biz com coop edu gov info int mil museum name net org pro ',
      'mw':' ac co com coop edu gov int museum net org ',
      'mx':' com edu gob net org ',
      'my':' com edu gov mil name net org sch ',
      'nf':' arts com firm info net other per rec store web ',
      'ng':' biz com edu gov mil mobi name net org sch ',
      'ni':' ac co com edu gob mil net nom org ',
      'np':' com edu gov mil net org ',
      'nr':' biz com edu gov info net org ',
      'om':' ac biz co com edu gov med mil museum net org pro sch ',
      'pe':' com edu gob mil net nom org sld ',
      'ph':' com edu gov i mil net ngo org ',
      'pk':' biz com edu fam gob gok gon gop gos gov net org web ',
      'pl':' art bialystok biz com edu gda gdansk gorzow gov info katowice krakow lodz lublin mil net ngo olsztyn org poznan pwr radom slupsk szczecin torun warszawa waw wroc wroclaw zgora ',
      'pr':' ac biz com edu est gov info isla name net org pro prof ',
      'ps':' com edu gov net org plo sec ',
      'pw':' belau co ed go ne or ',
      'ro':' arts com firm info nom nt org rec store tm www ',
      'rs':' ac co edu gov in org ',
      'sb':' com edu gov net org ',
      'sc':' com edu gov net org ',
      'sh':' co com edu gov net nom org ',
      'sl':' com edu gov net org ',
      'st':' co com consulado edu embaixada gov mil net org principe saotome store ',
      'sv':' com edu gob org red ',
      'sz':' ac co org ',
      'tr':' av bbs bel biz com dr edu gen gov info k12 name net org pol tel tsk tv web ',
      'tt':' aero biz cat co com coop edu gov info int jobs mil mobi museum name net org pro tel travel ',
      'tw':' club com ebiz edu game gov idv mil net org ',
      'mu':' ac co com gov net or org ',
      'mz':' ac co edu gov org ',
      'na':' co com ',
      'nz':' ac co cri geek gen govt health iwi maori mil net org parliament school ',
      'pa':' abo ac com edu gob ing med net nom org sld ',
      'pt':' com edu gov int net nome org publ ',
      'py':' com edu gov mil net org ',
      'qa':' com edu gov mil net org ',
      're':' asso com nom ',
      'ru':' ac adygeya altai amur arkhangelsk astrakhan bashkiria belgorod bir bryansk buryatia cbg chel chelyabinsk chita chukotka chuvashia com dagestan e-burg edu gov grozny int irkutsk ivanovo izhevsk jar joshkar-ola kalmykia kaluga kamchatka karelia kazan kchr kemerovo khabarovsk khakassia khv kirov koenig komi kostroma kranoyarsk kuban kurgan kursk lipetsk magadan mari mari-el marine mil mordovia mosreg msk murmansk nalchik net nnov nov novosibirsk nsk omsk orenburg org oryol penza perm pp pskov ptz rnd ryazan sakhalin samara saratov simbirsk smolensk spb stavropol stv surgut tambov tatarstan tom tomsk tsaritsyn tsk tula tuva tver tyumen udm udmurtia ulan-ude vladikavkaz vladimir vladivostok volgograd vologda voronezh vrn vyatka yakutia yamal yekaterinburg yuzhno-sakhalinsk ',
      'rw':' ac co com edu gouv gov int mil net ',
      'sa':' com edu gov med net org pub sch ',
      'sd':' com edu gov info med net org tv ',
      'se':' a ac b bd c d e f g h i k l m n o org p parti pp press r s t tm u w x y z ',
      'sg':' com edu gov idn net org per ',
      'sn':' art com edu gouv org perso univ ',
      'sy':' com edu gov mil net news org ',
      'th':' ac co go in mi net or ',
      'tj':' ac biz co com edu go gov info int mil name net nic org test web ',
      'tn':' agrinet com defense edunet ens fin gov ind info intl mincom nat net org perso rnrt rns rnu tourism ',
      'tz':' ac co go ne or ',
      'ua':' biz cherkassy chernigov chernovtsy ck cn co com crimea cv dn dnepropetrovsk donetsk dp edu gov if in ivano-frankivsk kh kharkov kherson khmelnitskiy kiev kirovograd km kr ks kv lg lugansk lutsk lviv me mk net nikolaev od odessa org pl poltava pp rovno rv sebastopol sumy te ternopil uzhgorod vinnica vn zaporizhzhe zhitomir zp zt ',
      'ug':' ac co go ne or org sc ',
      'uk':' ac bl british-library co cym gov govt icnet jet lea ltd me mil mod national-library-scotland nel net nhs nic nls org orgn parliament plc police sch scot soc ',
      'us':' dni fed isa kids nsn ',
      'uy':' com edu gub mil net org ',
      've':' co com edu gob info mil net org web ',
      'vi':' co com k12 net org ',
      'vn':' ac biz com edu gov health info int name net org pro ',
      'ye':' co com gov ltd me net org plc ',
      'yu':' ac co edu gov org ',
      'za':' ac agric alt bourse city co cybernet db edu gov grondar iaccess imt inca landesign law mil net ngo nis nom olivetti org pix school tm web ',
      'zm':' ac co com edu gov net org sch '
    },
    // gorhill 2013-10-25: Using indexOf() instead Regexp(). Significant boost
    // in both performance and memory footprint. No initialization required.
    // http://jsperf.com/uri-js-sld-regex-vs-binary-search/4
    // Following methods use lastIndexOf() rather than array.split() in order
    // to avoid any memory allocations.
    has: function(domain) {
      var tldOffset = domain.lastIndexOf('.');
      if (tldOffset <= 0 || tldOffset >= (domain.length-1)) {
        return false;
      }
      var sldOffset = domain.lastIndexOf('.', tldOffset-1);
      if (sldOffset <= 0 || sldOffset >= (tldOffset-1)) {
        return false;
      }
      var sldList = SLD.list[domain.slice(tldOffset+1)];
      if (!sldList) {
        return false;
      }
      return sldList.indexOf(' ' + domain.slice(sldOffset+1, tldOffset) + ' ') >= 0;
    },
    is: function(domain) {
      var tldOffset = domain.lastIndexOf('.');
      if (tldOffset <= 0 || tldOffset >= (domain.length-1)) {
        return false;
      }
      var sldOffset = domain.lastIndexOf('.', tldOffset-1);
      if (sldOffset >= 0) {
        return false;
      }
      var sldList = SLD.list[domain.slice(tldOffset+1)];
      if (!sldList) {
        return false;
      }
      return sldList.indexOf(' ' + domain.slice(0, tldOffset) + ' ') >= 0;
    },
    get: function(domain) {
      var tldOffset = domain.lastIndexOf('.');
      if (tldOffset <= 0 || tldOffset >= (domain.length-1)) {
        return null;
      }
      var sldOffset = domain.lastIndexOf('.', tldOffset-1);
      if (sldOffset <= 0 || sldOffset >= (tldOffset-1)) {
        return null;
      }
      var sldList = SLD.list[domain.slice(tldOffset+1)];
      if (!sldList) {
        return null;
      }
      if (sldList.indexOf(' ' + domain.slice(sldOffset+1, tldOffset) + ' ') < 0) {
        return null;
      }
      return domain.slice(sldOffset+1);
    },
    noConflict: function(){
      if (root.SecondLevelDomains === this) {
        root.SecondLevelDomains = _SecondLevelDomains;
      }
      return this;
    }
  };

  return SLD;
}));


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;/*! https://mths.be/punycode v1.4.0 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports = typeof exports == 'object' && exports &&
		!exports.nodeType && exports;
	var freeModule = typeof module == 'object' && module &&
		!module.nodeType && module;
	var freeGlobal = typeof global == 'object' && global;
	if (
		freeGlobal.global === freeGlobal ||
		freeGlobal.window === freeGlobal ||
		freeGlobal.self === freeGlobal
	) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw new RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		var result = [];
		while (length--) {
			result[length] = fn(array[length]);
		}
		return result;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings or email
	 * addresses.
	 * @private
	 * @param {String} domain The domain name or email address.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		var parts = string.split('@');
		var result = '';
		if (parts.length > 1) {
			// In email addresses, only the domain name should be punycoded. Leave
			// the local part (i.e. everything up to `@`) intact.
			result = parts[0] + '@';
			string = parts[1];
		}
		// Avoid `split(regex)` for IE8 compatibility. See #17.
		string = string.replace(regexSeparators, '\x2E');
		var labels = string.split('.');
		var encoded = map(labels, fn).join('.');
		return result + encoded;
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name or an email address
	 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
	 * it doesn't matter if you call it on a string that has already been
	 * converted to Unicode.
	 * @memberOf punycode
	 * @param {String} input The Punycoded domain name or email address to
	 * convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(input) {
		return mapDomain(input, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
		return mapDomain(input, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.3.2',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		true
	) {
		!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return punycode;
		}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (freeExports && freeModule) {
		if (module.exports == freeExports) {
			// in Node.js, io.js, or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else {
			// in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else {
		// in Rhino or a web browser
		root.punycode = punycode;
	}

}(this));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(18)(module)))

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("net");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_21__;

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_22__;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var modelproxy_1 = __webpack_require__(3);
var zookeeper = __webpack_require__(21);
var jsonPointer = __webpack_require__(46);
var nodedubbo_1 = __webpack_require__(55);
var NodeDubboFactory = (function (_super) {
    __extends(NodeDubboFactory, _super);
    function NodeDubboFactory(options) {
        var _this = _super.call(this) || this;
        _this.options = options;
        _this.init();
        return _this;
    }
    NodeDubboFactory.prototype.init = function () {
        var _this = this;
        this.client = zookeeper.createClient(this.options.dubbo.registerStr, this.options.options);
        this.client.on('state', function (state) {
            if (state === zookeeper.State.SYNC_CONNECTED) {
                console.log('zookeeper成功连接!');
            }
            if (state === zookeeper.State.DISCONNECTED) {
                _this.client.connect();
            }
        });
        this.client.connect();
    };
    NodeDubboFactory.prototype.addService = function (app) {
        return __awaiter(this, void 0, void 0, function () {
            var client;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        client = new nodedubbo_1.NodeDubbo(this.client);
                        return [4 /*yield*/, client.init(this.options.dubbo, app)];
                    case 1:
                        _a.sent();
                        if (app.dInterface.alias) {
                            this.add("" + app.dInterface.alias, client, true);
                        }
                        else {
                            this.add(app.dInterface.name + ":" + app.dInterface.version, client, true);
                        }
                        return [2 /*return*/, client];
                }
            });
        });
    };
    NodeDubboFactory.prototype.execute = function (method) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!jsonPointer.has(this, "/instances" + method)) return [3 /*break*/, 2];
                        return [4 /*yield*/, jsonPointer.get(this, "/instances" + method)(args)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [2 /*return*/, new Error("\u6CA1\u6709\u627E\u5230\u65B9\u6CD5[" + method + "]")];
                }
            });
        });
    };
    return NodeDubboFactory;
}(modelproxy_1.modelProxy.BaseFactory));
exports.NodeDubboFactory = NodeDubboFactory;


/***/ }),
/* 24 */
/***/ (function(module, exports) {

// put / get number types
module.exports =  {
  Double: {
    size: 8,
    writeBE: 'writeDoubleBE',
    writeLE: 'writeDoubleLE',
    readBE: 'readDoubleBE',
    readLE: 'readDoubleLE'
  },
  Float: {
    size: 4,
    writeBE: 'writeFloatBE',
    writeLE: 'writeFloatLE',
    readBE: 'readFloatBE',
    readLE: 'readFloatLE'
  },
  Int8: {
    size: 1,
    writeBE: 'writeInt8',
    writeLE: 'writeInt8',
    readBE: 'readInt8',
    readLE: 'readInt8'
  },
  UInt8: {
    size: 1,
    writeBE: 'writeUInt8',
    writeLE: 'writeUInt8',
    readBE: 'readUInt8',
    readLE: 'readUInt8'
  },
  Short: {
    size: 2,
    writeBE: 'writeInt16BE',
    writeLE: 'writeInt16LE',
    readBE: 'readInt16BE',
    readLE: 'readInt16LE'
  },
  Int16: {
    size: 2,
    writeBE: 'writeInt16BE',
    writeLE: 'writeInt16LE',
    readBE: 'readInt16BE',
    readLE: 'readInt16LE'
  },
  UInt16: {
    size: 2,
    writeBE: 'writeUInt16BE',
    writeLE: 'writeUInt16LE',
    readBE: 'readUInt16BE',
    readLE: 'readUInt16LE'
  },
  Int: {
    size: 4,
    writeBE: 'writeInt32BE',
    writeLE: 'writeInt32LE',
    readBE: 'readInt32BE',
    readLE: 'readInt32LE'
  },
  UInt: {
    size: 4,
    writeBE: 'writeUInt32BE',
    writeLE: 'writeUInt32LE',
    readBE: 'readUInt32BE',
    readLE: 'readUInt32LE'
  },
  Int32: {
    size: 4,
    writeBE: 'writeInt32BE',
    writeLE: 'writeInt32LE',
    readBE: 'readInt32BE',
    readLE: 'readInt32LE'
  },
  UInt32: {
    size: 4,
    writeBE: 'writeUInt32BE',
    writeLE: 'writeUInt32LE',
    readBE: 'readUInt32BE',
    readLE: 'readUInt32LE'
  }
};


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * is-type-of - index.js
 * Copyright(c) 2014 dead_horse <dead_horse@qq.com>
 * MIT Licensed
 */



/**
 * Module dependencies.
 */

var utils = __webpack_require__(8);
var isStearm = __webpack_require__(12);

/**
 * Expose all methods in core-util-is
 */

Object.keys(utils).map(function (name) {
  exports[transform(name)] = utils[name];
});

/**
 * Stream detected by isstream
 */

exports.stream = isStearm;
exports.readableStream = isStearm.isReadable;
exports.writableStream = isStearm.isWritable;
exports.duplexStream = isStearm.isDuplex;

/**
 * Extend method
 */

exports.finite = function (obj) {
  return Number.isFinite(obj);
};

exports.NaN = function (obj) {
  return Number.isNaN(obj);
};

exports.generator = function (obj) {
  return obj
    && 'function' === typeof obj.next
    && 'function' === typeof obj.throw;
};

exports.generatorFunction = function (obj) {
  return obj
    && obj.constructor
    && 'GeneratorFunction' === obj.constructor.name;
};

exports.promise = function (obj) {
  return obj
    && 'function' === typeof obj.then;
};

var MAX_INT_31 = Math.pow(2, 31);

exports.int = function (obj) {
  return utils.isNumber(obj)
    && obj % 1 === 0;
};

exports.int32 = function (obj) {
  return exports.int(obj)
    && obj < MAX_INT_31
    && obj >= -MAX_INT_31;
};

exports.long = function (obj) {
  return exports.int(obj)
    && (obj >= MAX_INT_31 || obj < -MAX_INT_31);
};

exports.Long = function (obj) {
  return exports.object(obj)
    && exports.number(obj.high)
    && exports.number(obj.low);
};

exports.double = function (obj) {
  return utils.isNumber(obj)
    && !isNaN(obj)
    && obj % 1 !== 0;
};

/**
 * transform isNull type to null
 * @param {[type]} m [description]
 * @return {[type]} [description]
 */

function transform(m) {
  var name = m.slice(2);
  name = name[0].toLowerCase() + name.slice(1);
  return name;
}


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var __WEBPACK_AMD_DEFINE_RESULT__;/*
 Copyright 2013 Daniel Wirtz <dcode@dcode.io>
 Copyright 2009 The Closure Library Authors. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS-IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

/**
 * @license Long.js (c) 2013 Daniel Wirtz <dcode@dcode.io>
 * Released under the Apache License, Version 2.0
 * see: https://github.com/dcodeIO/Long.js for details
 */
(function(global) {
    "use strict";

    /**
     * Constructs a 64 bit two's-complement integer, given its low and high 32 bit values as *signed* integers.
     *  See the from* functions below for more convenient ways of constructing Longs.
     * @exports Long
     * @class A Long class for representing a 64 bit two's-complement integer value.
     * @param {number} low The low (signed) 32 bits of the long
     * @param {number} high The high (signed) 32 bits of the long
     * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
     * @constructor
     */
    var Long = function(low, high, unsigned) {

        /**
         * The low 32 bits as a signed value.
         * @type {number}
         * @expose
         */
        this.low = low|0;

        /**
         * The high 32 bits as a signed value.
         * @type {number}
         * @expose
         */
        this.high = high|0;

        /**
         * Whether unsigned or not.
         * @type {boolean}
         * @expose
         */
        this.unsigned = !!unsigned;
    };

    // The internal representation of a long is the two given signed, 32-bit values.
    // We use 32-bit pieces because these are the size of integers on which
    // Javascript performs bit-operations.  For operations like addition and
    // multiplication, we split each number into 16 bit pieces, which can easily be
    // multiplied within Javascript's floating-point representation without overflow
    // or change in sign.
    //
    // In the algorithms below, we frequently reduce the negative case to the
    // positive case by negating the input(s) and then post-processing the result.
    // Note that we must ALWAYS check specially whether those values are MIN_VALUE
    // (-2^63) because -MIN_VALUE == MIN_VALUE (since 2^63 cannot be represented as
    // a positive number, it overflows back into a negative).  Not handling this
    // case would often result in infinite recursion.
    //
    // Common constant values ZERO, ONE, NEG_ONE, etc. are defined below the from*
    // methods on which they depend.

    /**
     * Tests if the specified object is a Long.
     * @param {*} obj Object
     * @returns {boolean}
     * @expose
     */
    Long.isLong = function(obj) {
        return (obj && obj instanceof Long) === true;
    };

    /**
     * A cache of the Long representations of small integer values.
     * @type {!Object}
     * @inner
     */
    var INT_CACHE = {};

    /**
     * A cache of the Long representations of small unsigned integer values.
     * @type {!Object}
     * @inner
     */
    var UINT_CACHE = {};

    /**
     * Returns a Long representing the given 32 bit integer value.
     * @param {number} value The 32 bit integer in question
     * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
     * @returns {!Long} The corresponding Long value
     * @expose
     */
    Long.fromInt = function(value, unsigned) {
        var obj, cachedObj;
        if (!unsigned) {
            value = value | 0;
            if (-128 <= value && value < 128) {
                cachedObj = INT_CACHE[value];
                if (cachedObj)
                    return cachedObj;
            }
            obj = new Long(value, value < 0 ? -1 : 0, false);
            if (-128 <= value && value < 128)
                INT_CACHE[value] = obj;
            return obj;
        } else {
            value = value >>> 0;
            if (0 <= value && value < 256) {
                cachedObj = UINT_CACHE[value];
                if (cachedObj)
                    return cachedObj;
            }
            obj = new Long(value, (value | 0) < 0 ? -1 : 0, true);
            if (0 <= value && value < 256)
                UINT_CACHE[value] = obj;
            return obj;
        }
    };

    /**
     * Returns a Long representing the given value, provided that it is a finite number. Otherwise, zero is returned.
     * @param {number} value The number in question
     * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
     * @returns {!Long} The corresponding Long value
     * @expose
     */
    Long.fromNumber = function(value, unsigned) {
        unsigned = !!unsigned;
        if (isNaN(value) || !isFinite(value))
            return Long.ZERO;
        if (!unsigned && value <= -TWO_PWR_63_DBL)
            return Long.MIN_VALUE;
        if (!unsigned && value + 1 >= TWO_PWR_63_DBL)
            return Long.MAX_VALUE;
        if (unsigned && value >= TWO_PWR_64_DBL)
            return Long.MAX_UNSIGNED_VALUE;
        if (value < 0)
            return Long.fromNumber(-value, unsigned).negate();
        return new Long((value % TWO_PWR_32_DBL) | 0, (value / TWO_PWR_32_DBL) | 0, unsigned);
    };

    /**
     * Returns a Long representing the 64 bit integer that comes by concatenating the given low and high bits. Each is
     *  assumed to use 32 bits.
     * @param {number} lowBits The low 32 bits
     * @param {number} highBits The high 32 bits
     * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
     * @returns {!Long} The corresponding Long value
     * @expose
     */
    Long.fromBits = function(lowBits, highBits, unsigned) {
        return new Long(lowBits, highBits, unsigned);
    };

    /**
     * Returns a Long representation of the given string, written using the specified radix.
     * @param {string} str The textual representation of the Long
     * @param {(boolean|number)=} unsigned Whether unsigned or not, defaults to `false` for signed
     * @param {number=} radix The radix in which the text is written (2-36), defaults to 10
     * @returns {!Long} The corresponding Long value
     * @expose
     */
    Long.fromString = function(str, unsigned, radix) {
        if (str.length === 0)
            throw Error('number format error: empty string');
        if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity")
            return Long.ZERO;
        if (typeof unsigned === 'number') // For goog.math.long compatibility
            radix = unsigned,
            unsigned = false;
        radix = radix || 10;
        if (radix < 2 || 36 < radix)
            throw Error('radix out of range: ' + radix);

        var p;
        if ((p = str.indexOf('-')) > 0)
            throw Error('number format error: interior "-" character: ' + str);
        else if (p === 0)
            return Long.fromString(str.substring(1), unsigned, radix).negate();

        // Do several (8) digits each time through the loop, so as to
        // minimize the calls to the very expensive emulated div.
        var radixToPower = Long.fromNumber(Math.pow(radix, 8));

        var result = Long.ZERO;
        for (var i = 0; i < str.length; i += 8) {
            var size = Math.min(8, str.length - i);
            var value = parseInt(str.substring(i, i + size), radix);
            if (size < 8) {
                var power = Long.fromNumber(Math.pow(radix, size));
                result = result.multiply(power).add(Long.fromNumber(value));
            } else {
                result = result.multiply(radixToPower);
                result = result.add(Long.fromNumber(value));
            }
        }
        result.unsigned = unsigned;
        return result;
    };

    /**
     * Converts the specified value to a Long.
     * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val Value
     * @returns {!Long}
     * @expose
     */
    Long.fromValue = function(val) {
        if (typeof val === 'number')
            return Long.fromNumber(val);
        if (typeof val === 'string')
            return Long.fromString(val);
        if (Long.isLong(val))
            return val;
        // Throws for not an object (undefined, null):
        return new Long(val.low, val.high, val.unsigned);
    };

    // NOTE: the compiler should inline these constant values below and then remove these variables, so there should be
    // no runtime penalty for these.

    /**
     * @type {number}
     * @const
     * @inner
     */
    var TWO_PWR_16_DBL = 1 << 16;

    /**
     * @type {number}
     * @const
     * @inner
     */
    var TWO_PWR_24_DBL = 1 << 24;

    /**
     * @type {number}
     * @const
     * @inner
     */
    var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;

    /**
     * @type {number}
     * @const
     * @inner
     */
    var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;

    /**
     * @type {number}
     * @const
     * @inner
     */
    var TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;

    /**
     * @type {!Long}
     * @const
     * @inner
     */
    var TWO_PWR_24 = Long.fromInt(TWO_PWR_24_DBL);

    /**
     * Signed zero.
     * @type {!Long}
     * @expose
     */
    Long.ZERO = Long.fromInt(0);

    /**
     * Unsigned zero.
     * @type {!Long}
     * @expose
     */
    Long.UZERO = Long.fromInt(0, true);

    /**
     * Signed one.
     * @type {!Long}
     * @expose
     */
    Long.ONE = Long.fromInt(1);

    /**
     * Unsigned one.
     * @type {!Long}
     * @expose
     */
    Long.UONE = Long.fromInt(1, true);

    /**
     * Signed negative one.
     * @type {!Long}
     * @expose
     */
    Long.NEG_ONE = Long.fromInt(-1);

    /**
     * Maximum signed value.
     * @type {!Long}
     * @expose
     */
    Long.MAX_VALUE = Long.fromBits(0xFFFFFFFF|0, 0x7FFFFFFF|0, false);

    /**
     * Maximum unsigned value.
     * @type {!Long}
     * @expose
     */
    Long.MAX_UNSIGNED_VALUE = Long.fromBits(0xFFFFFFFF|0, 0xFFFFFFFF|0, true);

    /**
     * Minimum signed value.
     * @type {!Long}
     * @expose
     */
    Long.MIN_VALUE = Long.fromBits(0, 0x80000000|0, false);

    /**
     * Converts the Long to a 32 bit integer, assuming it is a 32 bit integer.
     * @returns {number}
     * @expose
     */
    Long.prototype.toInt = function() {
        return this.unsigned ? this.low >>> 0 : this.low;
    };

    /**
     * Converts the Long to a the nearest floating-point representation of this value (double, 53 bit mantissa).
     * @returns {number}
     * @expose
     */
    Long.prototype.toNumber = function() {
        if (this.unsigned) {
            return ((this.high >>> 0) * TWO_PWR_32_DBL) + (this.low >>> 0);
        }
        return this.high * TWO_PWR_32_DBL + (this.low >>> 0);
    };

    /**
     * Converts the Long to a string written in the specified radix.
     * @param {number=} radix Radix (2-36), defaults to 10
     * @returns {string}
     * @override
     * @throws {RangeError} If `radix` is out of range
     * @expose
     */
    Long.prototype.toString = function(radix) {
        radix = radix || 10;
        if (radix < 2 || 36 < radix)
            throw RangeError('radix out of range: ' + radix);
        if (this.isZero())
            return '0';
        var rem;
        if (this.isNegative()) { // Unsigned Longs are never negative
            if (this.equals(Long.MIN_VALUE)) {
                // We need to change the Long value before it can be negated, so we remove
                // the bottom-most digit in this base and then recurse to do the rest.
                var radixLong = Long.fromNumber(radix);
                var div = this.div(radixLong);
                rem = div.multiply(radixLong).subtract(this);
                return div.toString(radix) + rem.toInt().toString(radix);
            } else
                return '-' + this.negate().toString(radix);
        }

        // Do several (6) digits each time through the loop, so as to
        // minimize the calls to the very expensive emulated div.
        var radixToPower = Long.fromNumber(Math.pow(radix, 6), this.unsigned);
        rem = this;
        var result = '';
        while (true) {
            var remDiv = rem.div(radixToPower),
                intval = rem.subtract(remDiv.multiply(radixToPower)).toInt() >>> 0,
                digits = intval.toString(radix);
            rem = remDiv;
            if (rem.isZero())
                return digits + result;
            else {
                while (digits.length < 6)
                    digits = '0' + digits;
                result = '' + digits + result;
            }
        }
    };

    /**
     * Gets the high 32 bits as a signed integer.
     * @returns {number} Signed high bits
     * @expose
     */
    Long.prototype.getHighBits = function() {
        return this.high;
    };

    /**
     * Gets the high 32 bits as an unsigned integer.
     * @returns {number} Unsigned high bits
     * @expose
     */
    Long.prototype.getHighBitsUnsigned = function() {
        return this.high >>> 0;
    };

    /**
     * Gets the low 32 bits as a signed integer.
     * @returns {number} Signed low bits
     * @expose
     */
    Long.prototype.getLowBits = function() {
        return this.low;
    };

    /**
     * Gets the low 32 bits as an unsigned integer.
     * @returns {number} Unsigned low bits
     * @expose
     */
    Long.prototype.getLowBitsUnsigned = function() {
        return this.low >>> 0;
    };

    /**
     * Gets the number of bits needed to represent the absolute value of this Long.
     * @returns {number}
     * @expose
     */
    Long.prototype.getNumBitsAbs = function() {
        if (this.isNegative()) // Unsigned Longs are never negative
            return this.equals(Long.MIN_VALUE) ? 64 : this.negate().getNumBitsAbs();
        var val = this.high != 0 ? this.high : this.low;
        for (var bit = 31; bit > 0; bit--)
            if ((val & (1 << bit)) != 0)
                break;
        return this.high != 0 ? bit + 33 : bit + 1;
    };

    /**
     * Tests if this Long's value equals zero.
     * @returns {boolean}
     * @expose
     */
    Long.prototype.isZero = function() {
        return this.high === 0 && this.low === 0;
    };

    /**
     * Tests if this Long's value is negative.
     * @returns {boolean}
     * @expose
     */
    Long.prototype.isNegative = function() {
        return !this.unsigned && this.high < 0;
    };

    /**
     * Tests if this Long's value is positive.
     * @returns {boolean}
     * @expose
     */
    Long.prototype.isPositive = function() {
        return this.unsigned || this.high >= 0;
    };

    /**
     * Tests if this Long's value is odd.
     * @returns {boolean}
     * @expose
     */
    Long.prototype.isOdd = function() {
        return (this.low & 1) === 1;
    };

    /**
     * Tests if this Long's value is even.
     * @returns {boolean}
     * @expose
     */
    Long.prototype.isEven = function() {
        return (this.low & 1) === 0;
    };

    /**
     * Tests if this Long's value equals the specified's.
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     * @expose
     */
    Long.prototype.equals = function(other) {
        if (!Long.isLong(other))
            other = Long.fromValue(other);
        if (this.unsigned !== other.unsigned && (this.high >>> 31) === 1 && (other.high >>> 31) === 1)
            return false;
        return this.high === other.high && this.low === other.low;
    };

    /**
     * Tests if this Long's value differs from the specified's.
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     * @expose
     */
    Long.prototype.notEquals = function(other) {
        if (!Long.isLong(other))
            other = Long.fromValue(other);
        return !this.equals(other);
    };

    /**
     * Tests if this Long's value is less than the specified's.
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     * @expose
     */
    Long.prototype.lessThan = function(other) {
        if (!Long.isLong(other))
            other = Long.fromValue(other);
        return this.compare(other) < 0;
    };

    /**
     * Tests if this Long's value is less than or equal the specified's.
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     * @expose
     */
    Long.prototype.lessThanOrEqual = function(other) {
        if (!Long.isLong(other))
            other = Long.fromValue(other);
        return this.compare(other) <= 0;
    };

    /**
     * Tests if this Long's value is greater than the specified's.
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     * @expose
     */
    Long.prototype.greaterThan = function(other) {
        if (!Long.isLong(other))
            other = Long.fromValue(other);
        return this.compare(other) > 0;
    };

    /**
     * Tests if this Long's value is greater than or equal the specified's.
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     * @expose
     */
    Long.prototype.greaterThanOrEqual = function(other) {
        if (!Long.isLong(other))
            other = Long.fromValue(other);
        return this.compare(other) >= 0;
    };

    /**
     * Compares this Long's value with the specified's.
     * @param {!Long|number|string} other Other value
     * @returns {number} 0 if they are the same, 1 if the this is greater and -1
     *  if the given one is greater
     * @expose
     */
    Long.prototype.compare = function(other) {
        if (this.equals(other))
            return 0;
        var thisNeg = this.isNegative(),
            otherNeg = other.isNegative();
        if (thisNeg && !otherNeg)
            return -1;
        if (!thisNeg && otherNeg)
            return 1;
        // At this point the sign bits are the same
        if (!this.unsigned)
            return this.subtract(other).isNegative() ? -1 : 1;
        // Both are positive if at least one is unsigned
        return (other.high >>> 0) > (this.high >>> 0) || (other.high === this.high && (other.low >>> 0) > (this.low >>> 0)) ? -1 : 1;
    };

    /**
     * Negates this Long's value.
     * @returns {!Long} Negated Long
     * @expose
     */
    Long.prototype.negate = function() {
        if (!this.unsigned && this.equals(Long.MIN_VALUE))
            return Long.MIN_VALUE;
        return this.not().add(Long.ONE);
    };

    /**
     * Returns the sum of this and the specified Long.
     * @param {!Long|number|string} addend Addend
     * @returns {!Long} Sum
     * @expose
     */
    Long.prototype.add = function(addend) {
        if (!Long.isLong(addend))
            addend = Long.fromValue(addend);

        // Divide each number into 4 chunks of 16 bits, and then sum the chunks.

        var a48 = this.high >>> 16;
        var a32 = this.high & 0xFFFF;
        var a16 = this.low >>> 16;
        var a00 = this.low & 0xFFFF;

        var b48 = addend.high >>> 16;
        var b32 = addend.high & 0xFFFF;
        var b16 = addend.low >>> 16;
        var b00 = addend.low & 0xFFFF;

        var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
        c00 += a00 + b00;
        c16 += c00 >>> 16;
        c00 &= 0xFFFF;
        c16 += a16 + b16;
        c32 += c16 >>> 16;
        c16 &= 0xFFFF;
        c32 += a32 + b32;
        c48 += c32 >>> 16;
        c32 &= 0xFFFF;
        c48 += a48 + b48;
        c48 &= 0xFFFF;
        return Long.fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
    };

    /**
     * Returns the difference of this and the specified Long.
     * @param {!Long|number|string} subtrahend Subtrahend
     * @returns {!Long} Difference
     * @expose
     */
    Long.prototype.subtract = function(subtrahend) {
        if (!Long.isLong(subtrahend))
            subtrahend = Long.fromValue(subtrahend);
        return this.add(subtrahend.negate());
    };

    /**
     * Returns the product of this and the specified Long.
     * @param {!Long|number|string} multiplier Multiplier
     * @returns {!Long} Product
     * @expose
     */
    Long.prototype.multiply = function(multiplier) {
        if (this.isZero())
            return Long.ZERO;
        if (!Long.isLong(multiplier))
            multiplier = Long.fromValue(multiplier);
        if (multiplier.isZero())
            return Long.ZERO;
        if (this.equals(Long.MIN_VALUE))
            return multiplier.isOdd() ? Long.MIN_VALUE : Long.ZERO;
        if (multiplier.equals(Long.MIN_VALUE))
            return this.isOdd() ? Long.MIN_VALUE : Long.ZERO;

        if (this.isNegative()) {
            if (multiplier.isNegative())
                return this.negate().multiply(multiplier.negate());
            else
                return this.negate().multiply(multiplier).negate();
        } else if (multiplier.isNegative())
            return this.multiply(multiplier.negate()).negate();

        // If both longs are small, use float multiplication
        if (this.lessThan(TWO_PWR_24) && multiplier.lessThan(TWO_PWR_24))
            return Long.fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned);

        // Divide each long into 4 chunks of 16 bits, and then add up 4x4 products.
        // We can skip products that would overflow.

        var a48 = this.high >>> 16;
        var a32 = this.high & 0xFFFF;
        var a16 = this.low >>> 16;
        var a00 = this.low & 0xFFFF;

        var b48 = multiplier.high >>> 16;
        var b32 = multiplier.high & 0xFFFF;
        var b16 = multiplier.low >>> 16;
        var b00 = multiplier.low & 0xFFFF;

        var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
        c00 += a00 * b00;
        c16 += c00 >>> 16;
        c00 &= 0xFFFF;
        c16 += a16 * b00;
        c32 += c16 >>> 16;
        c16 &= 0xFFFF;
        c16 += a00 * b16;
        c32 += c16 >>> 16;
        c16 &= 0xFFFF;
        c32 += a32 * b00;
        c48 += c32 >>> 16;
        c32 &= 0xFFFF;
        c32 += a16 * b16;
        c48 += c32 >>> 16;
        c32 &= 0xFFFF;
        c32 += a00 * b32;
        c48 += c32 >>> 16;
        c32 &= 0xFFFF;
        c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
        c48 &= 0xFFFF;
        return Long.fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
    };

    /**
     * Returns this Long divided by the specified.
     * @param {!Long|number|string} divisor Divisor
     * @returns {!Long} Quotient
     * @expose
     */
    Long.prototype.div = function(divisor) {
        if (!Long.isLong(divisor))
            divisor = Long.fromValue(divisor);
        if (divisor.isZero())
            throw(new Error('division by zero'));
        if (this.isZero())
            return this.unsigned ? Long.UZERO : Long.ZERO;
        var approx, rem, res;
        if (this.equals(Long.MIN_VALUE)) {
            if (divisor.equals(Long.ONE) || divisor.equals(Long.NEG_ONE))
                return Long.MIN_VALUE;  // recall that -MIN_VALUE == MIN_VALUE
            else if (divisor.equals(Long.MIN_VALUE))
                return Long.ONE;
            else {
                // At this point, we have |other| >= 2, so |this/other| < |MIN_VALUE|.
                var halfThis = this.shiftRight(1);
                approx = halfThis.div(divisor).shiftLeft(1);
                if (approx.equals(Long.ZERO)) {
                    return divisor.isNegative() ? Long.ONE : Long.NEG_ONE;
                } else {
                    rem = this.subtract(divisor.multiply(approx));
                    res = approx.add(rem.div(divisor));
                    return res;
                }
            }
        } else if (divisor.equals(Long.MIN_VALUE))
            return this.unsigned ? Long.UZERO : Long.ZERO;
        if (this.isNegative()) {
            if (divisor.isNegative())
                return this.negate().div(divisor.negate());
            return this.negate().div(divisor).negate();
        } else if (divisor.isNegative())
            return this.div(divisor.negate()).negate();

        // Repeat the following until the remainder is less than other:  find a
        // floating-point that approximates remainder / other *from below*, add this
        // into the result, and subtract it from the remainder.  It is critical that
        // the approximate value is less than or equal to the real value so that the
        // remainder never becomes negative.
        res = Long.ZERO;
        rem = this;
        while (rem.greaterThanOrEqual(divisor)) {
            // Approximate the result of division. This may be a little greater or
            // smaller than the actual value.
            approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber()));

            // We will tweak the approximate result by changing it in the 48-th digit or
            // the smallest non-fractional digit, whichever is larger.
            var log2 = Math.ceil(Math.log(approx) / Math.LN2),
                delta = (log2 <= 48) ? 1 : Math.pow(2, log2 - 48),

            // Decrease the approximation until it is smaller than the remainder.  Note
            // that if it is too large, the product overflows and is negative.
                approxRes = Long.fromNumber(approx),
                approxRem = approxRes.multiply(divisor);
            while (approxRem.isNegative() || approxRem.greaterThan(rem)) {
                approx -= delta;
                approxRes = Long.fromNumber(approx, this.unsigned);
                approxRem = approxRes.multiply(divisor);
            }

            // We know the answer can't be zero... and actually, zero would cause
            // infinite recursion since we would make no progress.
            if (approxRes.isZero())
                approxRes = Long.ONE;

            res = res.add(approxRes);
            rem = rem.subtract(approxRem);
        }
        return res;
    };

    /**
     * Returns this Long modulo the specified.
     * @param {!Long|number|string} divisor Divisor
     * @returns {!Long} Remainder
     * @expose
     */
    Long.prototype.modulo = function(divisor) {
        if (!Long.isLong(divisor))
            divisor = Long.fromValue(divisor);
        return this.subtract(this.div(divisor).multiply(divisor));
    };

    /**
     * Returns the bitwise NOT of this Long.
     * @returns {!Long}
     * @expose
     */
    Long.prototype.not = function() {
        return Long.fromBits(~this.low, ~this.high, this.unsigned);
    };

    /**
     * Returns the bitwise AND of this Long and the specified.
     * @param {!Long|number|string} other Other Long
     * @returns {!Long}
     * @expose
     */
    Long.prototype.and = function(other) {
        if (!Long.isLong(other))
            other = Long.fromValue(other);
        return Long.fromBits(this.low & other.low, this.high & other.high, this.unsigned);
    };

    /**
     * Returns the bitwise OR of this Long and the specified.
     * @param {!Long|number|string} other Other Long
     * @returns {!Long}
     * @expose
     */
    Long.prototype.or = function(other) {
        if (!Long.isLong(other))
            other = Long.fromValue(other);
        return Long.fromBits(this.low | other.low, this.high | other.high, this.unsigned);
    };

    /**
     * Returns the bitwise XOR of this Long and the given one.
     * @param {!Long|number|string} other Other Long
     * @returns {!Long}
     * @expose
     */
    Long.prototype.xor = function(other) {
        if (!Long.isLong(other))
            other = Long.fromValue(other);
        return Long.fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
    };

    /**
     * Returns this Long with bits shifted to the left by the given amount.
     * @param {number|!Long} numBits Number of bits
     * @returns {!Long} Shifted Long
     * @expose
     */
    Long.prototype.shiftLeft = function(numBits) {
        if (Long.isLong(numBits))
            numBits = numBits.toInt();
        if ((numBits &= 63) === 0)
            return this;
        else if (numBits < 32)
            return Long.fromBits(this.low << numBits, (this.high << numBits) | (this.low >>> (32 - numBits)), this.unsigned);
        else
            return Long.fromBits(0, this.low << (numBits - 32), this.unsigned);
    };

    /**
     * Returns this Long with bits arithmetically shifted to the right by the given amount.
     * @param {number|!Long} numBits Number of bits
     * @returns {!Long} Shifted Long
     * @expose
     */
    Long.prototype.shiftRight = function(numBits) {
        if (Long.isLong(numBits))
            numBits = numBits.toInt();
        if ((numBits &= 63) === 0)
            return this;
        else if (numBits < 32)
            return Long.fromBits((this.low >>> numBits) | (this.high << (32 - numBits)), this.high >> numBits, this.unsigned);
        else
            return Long.fromBits(this.high >> (numBits - 32), this.high >= 0 ? 0 : -1, this.unsigned);
    };

    /**
     * Returns this Long with bits logically shifted to the right by the given amount.
     * @param {number|!Long} numBits Number of bits
     * @returns {!Long} Shifted Long
     * @expose
     */
    Long.prototype.shiftRightUnsigned = function(numBits) {
        if (Long.isLong(numBits))
            numBits = numBits.toInt();
        numBits &= 63;
        if (numBits === 0)
            return this;
        else {
            var high = this.high;
            if (numBits < 32) {
                var low = this.low;
                return Long.fromBits((low >>> numBits) | (high << (32 - numBits)), high >>> numBits, this.unsigned);
            } else if (numBits === 32)
                return Long.fromBits(high, 0, this.unsigned);
            else
                return Long.fromBits(high >>> (numBits - 32), 0, this.unsigned);
        }
    };

    /**
     * Converts this Long to signed.
     * @returns {!Long} Signed long
     * @expose
     */
    Long.prototype.toSigned = function() {
        if (!this.unsigned)
            return this;
        return new Long(this.low, this.high, false);
    };

    /**
     * Converts this Long to unsigned.
     * @returns {!Long} Unsigned long
     * @expose
     */
    Long.prototype.toUnsigned = function() {
        if (this.unsigned)
            return this;
        return new Long(this.low, this.high, true);
    };

    /* CommonJS */ if ("function" === 'function' && typeof module === 'object' && module && typeof exports === 'object' && exports)
        module["exports"] = Long;
    /* AMD */ else if (true)
        !(__WEBPACK_AMD_DEFINE_RESULT__ = function() { return Long; }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    /* Global */ else
        (global["dcodeIO"] = global["dcodeIO"] || {})["Long"] = Long;

})(this);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(18)(module)))

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * utility - lib/array.js
 *
 * Copyright(c) 2012 - 2014 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */



/**
 * Array random slice with items count.
 * @param {Array} arr
 * @param {Number} num, number of sub items.
 * @return {Array}
 */
exports.randomSlice = function randomSlice(arr, num) {
  if (!num || num >= arr.length) {
    return arr.slice();
  }
  var index = Math.floor(Math.random() * arr.length);
  var a = [];
  for (var i = 0, j = index; i < num; i++) {
    a.push(arr[j++]);
    if (j === arr.length) {
      j = 0;
    }
  }
  return a;
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * utility - lib/crypto.js
 *
 * Copyright(c) 2012 - 2014 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */



/**
 * Module dependencies.
 */

var crypto = __webpack_require__(19);

/**
 * hash
 *
 * @param {String} method hash method, e.g.: 'md5', 'sha1'
 * @param {String|Buffer} s
 * @param {String} [format] output string format, could be 'hex' or 'base64'. default is 'hex'.
 * @return {String} md5 hash string
 * @public
 */
exports.hash = function hash(method, s, format) {
  var sum = crypto.createHash(method);
  var isBuffer = Buffer.isBuffer(s);
  if (!isBuffer && typeof s === 'object') {
    s = JSON.stringify(sortObject(s));
  }
  sum.update(s, isBuffer ? 'binary' : 'utf8');
  return sum.digest(format || 'hex');
};

/**
 * md5 hash
 *
 * @param {String|Buffer} s
 * @param {String} [format] output string format, could be 'hex' or 'base64'. default is 'hex'.
 * @return {String} md5 hash string
 * @public
 */
exports.md5 = function md5(s, format) {
  return exports.hash('md5', s, format);
};

/**
 * sha1 hash
 *
 * @param {String|Buffer} s
 * @param {String} [format] output string format, could be 'hex' or 'base64'. default is 'hex'.
 * @return {String} sha1 hash string
 * @public
 */
exports.sha1 = function sha1(s, format) {
  return exports.hash('sha1', s, format);
};

/**
 * sha256 hash
 *
 * @param {String|Buffer} s
 * @param {String} [format] output string format, could be 'hex' or 'base64'. default is 'hex'.
 * @return {String} sha256 hash string
 * @public
 */
exports.sha256 = function sha1(s, format) {
  return exports.hash('sha256', s, format);
};

/**
 * HMAC algorithm.
 *
 * Equal bash:
 *
 * ```bash
 * $ echo -n "$data" | openssl dgst -binary -$algorithm -hmac "$key" | openssl $encoding
 * ```
 *
 * @param {String} algorithm, dependent on the available algorithms supported by the version of OpenSSL on the platform.
 *   Examples are 'sha1', 'md5', 'sha256', 'sha512', etc.
 *   On recent releases, `openssl list-message-digest-algorithms` will display the available digest algorithms.
 * @param {String} key, the hmac key to be used.
 * @param {String|Buffer} data, content string.
 * @param {String} [encoding='base64']
 * @return {String} digest string.
 */
exports.hmac = function hmac(algorithm, key, data, encoding) {
  encoding = encoding || 'base64';
  var hmac = crypto.createHmac(algorithm, key);
  hmac.update(data, Buffer.isBuffer(data) ? 'binary' : 'utf8');
  return hmac.digest(encoding);
};

/**
 * Base64 encode string.
 *
 * @param {String|Buffer} s
 * @param {Boolean} [urlsafe=false] Encode string s using a URL-safe alphabet,
 *   which substitutes - instead of + and _ instead of / in the standard Base64 alphabet.
 * @return {String} base64 encode format string.
 */
exports.base64encode = function base64encode(s, urlsafe) {
  if (!Buffer.isBuffer(s)) {
    s = new Buffer(s);
  }
  var encode = s.toString('base64');
  if (urlsafe) {
    encode = encode.replace(/\+/g, '-').replace(/\//g, '_');
  }
  return encode;
};

/**
 * Base64 string decode.
 *
 * @param {String} encode, base64 encoding string.
 * @param {Boolean} [urlsafe=false] Decode string s using a URL-safe alphabet,
 *   which substitutes - instead of + and _ instead of / in the standard Base64 alphabet.
 * @param {encoding} [encoding=utf8] if encoding = buffer, will return Buffer instance
 * @return {String|Buffer} plain text.
 */
exports.base64decode = function base64decode(encodeStr, urlsafe, encoding) {
  if (urlsafe) {
    encodeStr = encodeStr.replace(/\-/g, '+').replace(/_/g, '/');
  }
  var buf = new Buffer(encodeStr, 'base64');
  if (encoding === 'buffer') {
    return buf;
  }
  return buf.toString(encoding || 'utf8');
};

function sortObject(o) {
  if (!o || Array.isArray(o) || typeof o !== 'object') {
    return o;
  }
  var keys = Object.keys(o);
  keys.sort();
  var values = [];
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    values.push([k, sortObject(o[k])]);
  }
  return values;
}


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * utility - lib/date.js
 *
 * Copyright(c) 2012 - 2014 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */



var MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

// only set once.
var TIMEZONE = ' ';
var _hourOffset = parseInt(-(new Date().getTimezoneOffset()) / 60, 10);
if (_hourOffset >= 0) {
  TIMEZONE += '+';
} else {
  TIMEZONE += '-';
}
_hourOffset = Math.abs(_hourOffset);
if (_hourOffset < 10) {
  _hourOffset = '0' + _hourOffset;
}
TIMEZONE += _hourOffset + '00';

/**
 * Access log format date. format: `moment().format('DD/MMM/YYYY:HH:mm:ss ZZ')`
 *
 * @return {String}
 */
exports.accessLogDate = function (d) {
  // 16/Apr/2013:16:40:09 +0800
  d = d || new Date();
  var date = d.getDate();
  if (date < 10) {
    date = '0' + date;
  }
  var hours = d.getHours();
  if (hours < 10) {
    hours = '0' + hours;
  }
  var mintues = d.getMinutes();
  if (mintues < 10) {
    mintues = '0' + mintues;
  }
  var seconds = d.getSeconds();
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  return date + '/' + MONTHS[d.getMonth()] + '/' + d.getFullYear() +
    ':' + hours + ':' + mintues + ':' + seconds + TIMEZONE;
};

/**
 * Normal log format date. format: `moment().format('YYYY-MM-DD HH:mm:ss.SSS')`
 *
 * @return {String}
 */
exports.logDate = exports.YYYYMMDDHHmmssSSS = function (d, msSep) {
  if (typeof d === 'string') {
    // logDate(msSep)
    msSep = d;
    d = new Date();
  } else {
    // logDate(d, msSep)
    d = d || new Date();
  }
  var date = d.getDate();
  if (date < 10) {
    date = '0' + date;
  }
  var month = d.getMonth() + 1;
  if (month < 10) {
    month = '0' + month;
  }
  var hours = d.getHours();
  if (hours < 10) {
    hours = '0' + hours;
  }
  var mintues = d.getMinutes();
  if (mintues < 10) {
    mintues = '0' + mintues;
  }
  var seconds = d.getSeconds();
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  var milliseconds = d.getMilliseconds();
  if (milliseconds < 10) {
    milliseconds = '00' + milliseconds;
  } else if (milliseconds < 100) {
    milliseconds = '0' + milliseconds;
  }
  return d.getFullYear() + '-' + month + '-' + date + ' ' +
    hours + ':' + mintues + ':' + seconds + (msSep || '.') + milliseconds;
};

/**
 * `moment().format('YYYY-MM-DD HH:mm:ss')` format date string.
 *
 * @return {String}
 */
exports.YYYYMMDDHHmmss = function (d, options) {
  d = d || new Date();
  var dateSep = '-';
  var timeSep = ':';
  if (options) {
    if (options.dateSep) {
      dateSep = options.dateSep;
    }
    if (options.timeSep) {
      timeSep = options.timeSep;
    }
  }
  var date = d.getDate();
  if (date < 10) {
    date = '0' + date;
  }
  var month = d.getMonth() + 1;
  if (month < 10) {
    month = '0' + month;
  }
  var hours = d.getHours();
  if (hours < 10) {
    hours = '0' + hours;
  }
  var mintues = d.getMinutes();
  if (mintues < 10) {
    mintues = '0' + mintues;
  }
  var seconds = d.getSeconds();
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  return d.getFullYear() + dateSep + month + dateSep + date + ' ' +
    hours + timeSep + mintues + timeSep + seconds;
};

/**
 * `moment().format('YYYY-MM-DD')` format date string.
 *
 * @return {String}
 */
exports.YYYYMMDD = function YYYYMMDD(d, sep) {
  if (typeof d === 'string') {
    // YYYYMMDD(sep)
    sep = d;
    d = new Date();
  } else {
    // YYYYMMDD(d, sep)
    d = d || new Date();
    if (typeof sep !== 'string') {
      sep = '-';
    }
  }
  var date = d.getDate();
  if (date < 10) {
    date = '0' + date;
  }
  var month = d.getMonth() + 1;
  if (month < 10) {
    month = '0' + month;
  }
  return d.getFullYear() + sep + month + sep + date;
};

/**
 * return datetime struct.
 *
 * @return {Object} date
 *  - {Number} YYYYMMDD, 20130401
 *  - {Number} H, 0, 1, 9, 12, 23
 */
exports.datestruct = function (now) {
  now = now || new Date();
  return {
    YYYYMMDD: now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate(),
    H: now.getHours()
  };
};

/**
 * Get Unix's timestamp in seconds.
 * @return {Number}
 */
exports.timestamp = function timestamp(t) {
  if (t) {
    var v = t;
    if (typeof v === 'string') {
      v = Number(v);
    }
    if (String(t).length === 10) {
      v *= 1000;
    }
    return new Date(v);
  }
  return Math.round(Date.now() / 1000);
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * utility - lib/function.js
 *
 * Copyright(c) 2012 - 2014 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */



/**
 * A empty function.
 *
 * @return {Function}
 * @public
 */
exports.noop = function noop() {};

/**
 * Get a function parameter's names.
 *
 * @param {Function} func
 * @param {Boolean} [useCache], default is true
 * @return {Array} names
 */
exports.getParamNames = function getParamNames(func, cache) {
  cache = cache !== false;
  if (cache && func.__cache_names) {
    return func.__cache_names;
  }
  var str = func.toString();
  var names = str.slice(str.indexOf('(') + 1, str.indexOf(')')).match(/([^\s,]+)/g) || [];
  func.__cache_names = names;
  return names;
};


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * utility - lib/crypto.js
 *
 * MIT Licensed
 */



/**
 * Module dependencies.
 */

exports.strictJSONParse = function (str) {
  var obj = JSON.parse(str);
  if (!obj || typeof obj !== 'object') {
    throw new Error('JSON string is not object');
  }
  return obj;
};


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * utility - lib/map.js
 *
 * Copyright(c) 2012 - 2014 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */



/**
 * Module dependencies.
 */

exports.has = function has(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};

/**
 * generate a real map object, no constructor, no __proto__
 * @param {Object} [obj], init object, optional
 * @return {Object}
 */
exports.map = function map(obj) {
  var map = Object.create(null);
  if (!obj) {
    return map;
  }

  for (var key in obj) {
    map[key] = obj[key];
  }
  return map;
};


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * utility - lib/number.js
 *
 * Copyright(c) 2012 - 2014 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */



// http://www.2ality.com/2013/10/safe-integers.html
// http://es6.ruanyifeng.com/#docs/number
exports.MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;
exports.MIN_SAFE_INTEGER = -exports.MAX_SAFE_INTEGER;
var MAX_SAFE_INTEGER_STR = exports.MAX_SAFE_INTEGER_STR = String(exports.MAX_SAFE_INTEGER);
var MAX_SAFE_INTEGER_STR_LENGTH = MAX_SAFE_INTEGER_STR.length;

/**
 * Detect a number string can safe convert to Javascript Number.
 *
 * @param {String} s number format string, like `"123"`, `"-1000123123123123123123"`
 * @return {Boolean}
 */
exports.isSafeNumberString = function isSafeNumberString(s) {
  if (s[0] === '-') {
    s = s.substring(1);
  }
  if (s.length < MAX_SAFE_INTEGER_STR_LENGTH ||
    (s.length === MAX_SAFE_INTEGER_STR_LENGTH && s <= MAX_SAFE_INTEGER_STR)) {
    return true;
  }
  return false;
};

/**
 * Convert string to Number if string in safe Number scope.
 *
 * @param {String} s number format string.
 * @return {Number|String} success will return Number, otherise return the original string.
 */
exports.toSafeNumber = function toSafeNumber(s) {
  if (typeof s === 'number') {
    return s;
  }

  return exports.isSafeNumberString(s) ? Number(s) : s;
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * utility - lib/optimize.js
 *
 * Copyright(c) 2012 - 2014 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */



/**
 * optimize try catch
 * @param {Function} fn
 * @return {Object}
 *   - {Error} error
 *   - {Mix} value
 */
exports.try = function (fn) {
  var res = {
    error: undefined,
    value: undefined
  };

  try {
    res.value = fn();
  } catch (err) {
    res.error = err instanceof Error
      ? err
      : new Error(err);
  }

  return res;
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * utility - lib/polyfill.js
 *
 * Copyright(c) 2012 - 2014 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */



exports.setImmediate = typeof setImmediate === 'function'
  ? setImmediate
  : function(fn){
    process.nextTick(fn.bind.apply(fn, arguments));
  };


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * utility - lib/string.js
 *
 * Copyright(c) 2012 - 2014 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */



exports.randomString = function randomString(length, charSet) {
  var result = [];
  length = length || 16;
  charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  while (length--) {
    result.push(charSet[Math.floor(Math.random() * charSet.length)]);
  }
  return result.join('');
};

/**
 * split string to array
 * @param  {String} str
 * @param  {String} [sep] default is ','
 * @return {Array}
 */
exports.split = function split(str, sep) {
  str = str || '';
  sep = sep || ',';
  var items = str.split(sep);
  var needs = [];
  for (var i = 0; i < items.length; i++) {
    var s = items[i].trim();
    if (s.length > 0) {
      needs.push(s);
    }
  }
  return needs;
};

// always optimized
exports.splitAlwaysOptimized = function splitAlwaysOptimized() {
  var str = '';
  var sep = ',';
  if (arguments.length === 1) {
    str = arguments[0] || '';
  } else if (arguments.length === 2) {
    str = arguments[0] || '';
    sep = arguments[1] || ',';
  }
  var items = str.split(sep);
  var needs = [];
  for (var i = 0; i < items.length; i++) {
    var s = items[i].trim();
    if (s.length > 0) {
      needs.push(s);
    }
  }
  return needs;
};

/**
 * Replace string
 *
 * @param  {String} str
 * @param  {String|RegExp} substr
 * @param  {String|Function} newSubstr
 * @return {String}
 */
exports.replace = function replace(str, substr, newSubstr) {
  var replaceFunction = newSubstr;
  if (typeof replaceFunction !== 'function') {
    replaceFunction = function () {
      return newSubstr;
    };
  }
  return str.replace(substr, replaceFunction);
};


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * utility - lib/utility.js
 *
 * Copyright(c) 2012 - 2014 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */



/**
 * Module dependencies.
 */

var copy = __webpack_require__(7);

copy(__webpack_require__(30))
.and(__webpack_require__(35))
.and(__webpack_require__(34))
.and(__webpack_require__(28))
.and(__webpack_require__(33))
.and(__webpack_require__(36))
.and(__webpack_require__(27))
.and(__webpack_require__(31))
.and(__webpack_require__(29))
.and(__webpack_require__(32))
.and(__webpack_require__(38))
.to(module.exports);


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * utility - lib/web.js
 *
 * Copyright(c) 2012 - 2014 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */



/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @public
 */
exports.escape = function escape(html) {
  return String(html)
    .replace(/&(?!\w+;)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
};

/**
 * Safe encodeURIComponent, won't throw any error.
 * If `encodeURIComponent` error happen, just return the original value.
 *
 * @param {String} text
 * @return {String} URL encode string.
 */
exports.encodeURIComponent = function encodeURIComponent_(text) {
  try {
    return encodeURIComponent(text);
  } catch (e) {
    return text;
  }
};

/**
 * Safe decodeURIComponent, won't throw any error.
 * If `decodeURIComponent` error happen, just return the original value.
 *
 * @param {String} encodeText
 * @return {String} URL decode original string.
 */
exports.decodeURIComponent = function decodeURIComponent_(encodeText) {
  try {
    return decodeURIComponent(encodeText);
  } catch (e) {
    return encodeText;
  }
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {


/**
 * This is the common logic for both the Node.js and web browser
 * implementations of `debug()`.
 *
 * Expose `debug()` as the module.
 */

exports = module.exports = debug;
exports.coerce = coerce;
exports.disable = disable;
exports.enable = enable;
exports.enabled = enabled;
exports.humanize = __webpack_require__(48);

/**
 * The currently active debug mode names, and names to skip.
 */

exports.names = [];
exports.skips = [];

/**
 * Map of special "%n" handling functions, for the debug "format" argument.
 *
 * Valid key names are a single, lowercased letter, i.e. "n".
 */

exports.formatters = {};

/**
 * Previously assigned color.
 */

var prevColor = 0;

/**
 * Previous log timestamp.
 */

var prevTime;

/**
 * Select a color.
 *
 * @return {Number}
 * @api private
 */

function selectColor() {
  return exports.colors[prevColor++ % exports.colors.length];
}

/**
 * Create a debugger with the given `namespace`.
 *
 * @param {String} namespace
 * @return {Function}
 * @api public
 */

function debug(namespace) {

  // define the `disabled` version
  function disabled() {
  }
  disabled.enabled = false;

  // define the `enabled` version
  function enabled() {

    var self = enabled;

    // set `diff` timestamp
    var curr = +new Date();
    var ms = curr - (prevTime || curr);
    self.diff = ms;
    self.prev = prevTime;
    self.curr = curr;
    prevTime = curr;

    // add the `color` if not set
    if (null == self.useColors) self.useColors = exports.useColors();
    if (null == self.color && self.useColors) self.color = selectColor();

    var args = Array.prototype.slice.call(arguments);

    args[0] = exports.coerce(args[0]);

    if ('string' !== typeof args[0]) {
      // anything else let's inspect with %o
      args = ['%o'].concat(args);
    }

    // apply any `formatters` transformations
    var index = 0;
    args[0] = args[0].replace(/%([a-z%])/g, function(match, format) {
      // if we encounter an escaped % then don't increase the array index
      if (match === '%%') return match;
      index++;
      var formatter = exports.formatters[format];
      if ('function' === typeof formatter) {
        var val = args[index];
        match = formatter.call(self, val);

        // now we need to remove `args[index]` since it's inlined in the `format`
        args.splice(index, 1);
        index--;
      }
      return match;
    });

    if ('function' === typeof exports.formatArgs) {
      args = exports.formatArgs.apply(self, args);
    }
    var logFn = enabled.log || exports.log || console.log.bind(console);
    logFn.apply(self, args);
  }
  enabled.enabled = true;

  var fn = exports.enabled(namespace) ? enabled : disabled;

  fn.namespace = namespace;

  return fn;
}

/**
 * Enables a debug mode by namespaces. This can include modes
 * separated by a colon and wildcards.
 *
 * @param {String} namespaces
 * @api public
 */

function enable(namespaces) {
  exports.save(namespaces);

  var split = (namespaces || '').split(/[\s,]+/);
  var len = split.length;

  for (var i = 0; i < len; i++) {
    if (!split[i]) continue; // ignore empty strings
    namespaces = split[i].replace(/\*/g, '.*?');
    if (namespaces[0] === '-') {
      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
    } else {
      exports.names.push(new RegExp('^' + namespaces + '$'));
    }
  }
}

/**
 * Disable debug output.
 *
 * @api public
 */

function disable() {
  exports.enable('');
}

/**
 * Returns true if the given mode name is enabled, false otherwise.
 *
 * @param {String} name
 * @return {Boolean}
 * @api public
 */

function enabled(name) {
  var i, len;
  for (i = 0, len = exports.skips.length; i < len; i++) {
    if (exports.skips[i].test(name)) {
      return false;
    }
  }
  for (i = 0, len = exports.names.length; i < len; i++) {
    if (exports.names[i].test(name)) {
      return true;
    }
  }
  return false;
}

/**
 * Coerce `val`.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function coerce(val) {
  if (val instanceof Error) return val.stack || val.message;
  return val;
}


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * escape-html
 * Copyright(c) 2012-2013 TJ Holowaychuk
 * Copyright(c) 2015 Andreas Lubbe
 * Copyright(c) 2015 Tiancheng "Timothy" Gu
 * MIT Licensed
 */



/**
 * Module variables.
 * @private
 */

var matchHtmlRegExp = /["'&<>]/;

/**
 * Module exports.
 * @public
 */

module.exports = escapeHtml;

/**
 * Escape special characters in the given string of html.
 *
 * @param  {string} string The string to escape for inserting into HTML
 * @return {string}
 * @public
 */

function escapeHtml(string) {
  var str = '' + string;
  var match = matchHtmlRegExp.exec(str);

  if (!match) {
    return str;
  }

  var escape;
  var html = '';
  var index = 0;
  var lastIndex = 0;

  for (index = match.index; index < str.length; index++) {
    switch (str.charCodeAt(index)) {
      case 34: // "
        escape = '&quot;';
        break;
      case 38: // &
        escape = '&amp;';
        break;
      case 39: // '
        escape = '&#39;';
        break;
      case 60: // <
        escape = '&lt;';
        break;
      case 62: // >
        escape = '&gt;';
        break;
      default:
        continue;
    }

    if (lastIndex !== index) {
      html += str.substring(lastIndex, index);
    }

    lastIndex = index + 1;
    html += escape;
  }

  return lastIndex !== index
    ? html + str.substring(lastIndex, index)
    : html;
}


/***/ }),
/* 41 */
/***/ (function(module, exports) {


var hasOwn = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

module.exports = function forEach (obj, fn, ctx) {
    if (toString.call(fn) !== '[object Function]') {
        throw new TypeError('iterator must be a function');
    }
    var l = obj.length;
    if (l === +l) {
        for (var i = 0; i < l; i++) {
            fn.call(ctx, obj[i], i, obj);
        }
    } else {
        for (var k in obj) {
            if (hasOwn.call(obj, k)) {
                fn.call(ctx, obj[k], k, obj);
            }
        }
    }
};



/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * hessian.js - lib/v2/decoder.js
 *
 * Copyright(c)
 * MIT Licensed
 *
 * Authors:
 *   fengmk2 <fengmk2@gmail.com> (http://fengmk2.github.com)
 */



/**
 * Module dependencies.
 */

var util = __webpack_require__(4);
var debug = __webpack_require__(1)('hessian:v2:decoder');
var DecoderV1 = __webpack_require__(10);
var utils = __webpack_require__(0);
var JavaExceptionError = __webpack_require__(2).JavaExceptionError;
var supportES6Map = __webpack_require__(0).supportES6Map;

var BYTE_CODES = {};

function Decoder(buf) {
  DecoderV1.call(this, buf);
  this.BYTE_CODES = BYTE_CODES;
  this.classes = []; // {name: classname, fields: []}
  this.types = [];

  this._isLastChunk = false;
}

util.inherits(Decoder, DecoderV1);

var proto = Decoder.prototype;

proto.clean = function () {
  DecoderV1.prototype.clean.call(this);
  this.types = [];
  this.classes = [];
  return this;
};

// readBool()
utils.addByteCodes(BYTE_CODES, [
  0x46,
  0x54,
], 'readBool');

// readNull()
utils.addByteCodes(BYTE_CODES, [
  0x4e,
], 'readNull');

/**
 * read a int from buffer
 *
 * v2.0
 * ```
 * int ::= I(x49) b3 b2 b1 b0
 *     ::= [x80-xbf]
 *     ::= [xc0-xcf] b0
 *     ::= [xd0-xd7] b1 b0
 *
 * @see http://hessian.caucho.com/doc/hessian-serialization.html##int
 * ```
 *
 * A 32-bit signed integer. An integer is represented by the octet x49 ('I')
 * followed by the 4 octets of the integer in big-endian order.
 * ```
 * value = (b3 << 24) + (b2 << 16) + (b1 << 8) + b0;
 * ```
 *
 * single octet integers:
 * Integers between -16 and 47 can be encoded by a single octet in the range x80 to xbf.
 * ```
 * value = code - 0x90
 * ```
 *
 * two octet integers:
 * Integers between -2048 and 2047 can be encoded in two octets with the leading byte in the range xc0 to xcf.
 * ```
 * value = ((code - 0xc8) << 8) + b0;
 * ```
 *
 * three octet integers:
 * Integers between -262144 and 262143 can be encoded in three bytes with the leading byte in the range xd0 to xd7.
 * ```
 * value = ((code - 0xd4) << 16) + (b1 << 8) + b0;
 * ```
 *
 * @return {Number}
 * @api public
 */
proto.readInt = function () {
  var code = this.byteBuffer.get();
  // Compact int
  if (code >= 0x80 && code <= 0xbf) {
    // Integers between -16 and 47 can be encoded by a single octet in the range x80 to xbf.
    // value = code - 0x90
    return code - 0x90;
  }
  if (code >= 0xc0 && code <= 0xcf) {
    // Integers between -2048 and 2047 can be encoded in two octets with the leading byte in the range xc0 to xcf.
    // value = ((code - 0xc8) << 8) + b0;
    return ((code - 0xc8) << 8) + this.byteBuffer.get();
  }
  if (code >= 0xd0 && code <= 0xd7) {
    // Integers between -262144 and 262143 can be encoded in three bytes with the leading byte in the range xd0 to xd7.
    // value = ((code - 0xd4) << 16) + (b1 << 8) + b0;
    var b1 = this.byteBuffer.get();
    var b0 = this.byteBuffer.get();
    return ((code - 0xd4) << 16) + (b1 << 8) + b0;
  }
  if (code === 0x49) {
    return this.byteBuffer.getInt();
  }

  this.throwError('readInt', code);
};

utils.addByteCodes(BYTE_CODES, [
  [0x80, 0xbf],
  [0xc0, 0xcf],
  [0xd0, 0xd7],
  0x49
], 'readInt');

/**
 * read a long from buffer
 *
 * v2.0
 * ```
 * long ::= L(x4c) b7 b6 b5 b4 b3 b2 b1 b0
 *      ::= [xd8-xef]
 *      ::= [xf0-xff] b0
 *      ::= [x38-x3f] b1 b0
 *      ::= x4c b3 b2 b1 b0
 *
 * @see http://hessian.caucho.com/doc/hessian-serialization.html##long
 * ```
 * A 64-bit signed integer. An long is represented by the octet x4c ('L' )
 * followed by the 8-bytes of the integer in big-endian order.
 *
 * single octet longs:
 * Longs between -8 and 15 are represented by a single octet in the range xd8 to xef.
 * ```
 * value = (code - 0xe0)
 * ```
 *
 * two octet longs:
 * Longs between -2048 and 2047 are encoded in two octets with the leading byte in the range xf0 to xff.
 * ```
 * value = ((code - 0xf8) << 8) + b0
 * ```
 *
 * three octet longs:
 * Longs between -262144 and 262143 are encoded in three octets with the leading byte in the range x38 to x3f.
 * ```
 * value = ((code - 0x3c) << 16) + (b1 << 8) + b0
 * ```
 *
 * four octet longs:
 * Longs between which fit into 32-bits are encoded in five octets with the leading byte x59.
 * ```
 * value = (b3 << 24) + (b2 << 16) + (b1 << 8) + b0
 * ```
 *
 * @return {Number}
 * @api public
 */
proto.readLong = function () {
  var code = this.byteBuffer.get();
  // Compact long
  if (code >= 0xd8 && code <= 0xef) {
    // Longs between -8 and 15 are represented by a single octet in the range xd8 to xef.
    // value = (code - 0xe0)
    return code - 0xe0;
  }
  if (code >= 0xf0 && code <= 0xff) {
    // Longs between -2048 and 2047 are encoded in two octets with the leading byte in the range xf0 to xff.
    // value = ((code - 0xf8) << 8) + b0
    return ((code - 0xf8) << 8) + this.byteBuffer.get();
  }
  if (code >= 0x38 && code <= 0x3f) {
    // Longs between -262144 and 262143 are encoded in three octets with the leading byte in the range x38 to x3f.
    // value = ((code - 0x3c) << 16) + (b1 << 8) + b0
    var b1 = this.byteBuffer.get();
    var b0 = this.byteBuffer.get();
    return ((code - 0x3c) << 16) + (b1 << 8) + b0;
  }
  if (code === 0x59) {
    // 32-bit integer cast to long
    return this.byteBuffer.getInt32();
  }
  if (code === 0x4c) {
    return utils.handleLong(this.byteBuffer.getLong());
  }

  this.throwError('readLong', code);
};

utils.addByteCodes(BYTE_CODES, [
  [0xd8, 0xef],
  [0xf0, 0xff],
  [0x38, 0x3f],
  0x59,
  0x4c
], 'readLong');

/**
 * read a double from buffer
 *
 * v2.0
 * ```
 * double ::= D(x44) b7 b6 b5 b4 b3 b2 b1 b0
 *        ::= x5b
 *        ::= x5c
 *        ::= x5d(byte) b0
 *        ::= x5e(short) b1 b0
 *        ::= x5f(float) b3 b2 b1 b0
 *
 * @see http://hessian.caucho.com/doc/hessian-serialization.html##double
 * ```
 * The double 0.0 can be represented by the octet x5b
 * The double 1.0 can be represented by the octet x5c
 *
 * double octet:
 * Doubles between -128.0 and 127.0 with no fractional component
 * can be represented in two octets by casting the byte value to a double.
 * ```
 * value = (double) b0
 * ```
 *
 * double short:
 * Doubles between -32768.0 (-0x8000) and 32767.0(0x8000 - 1) with no fractional component
 * can be represented in three octets by casting the short value to a double.
 * ```
 * value = (double) (256 * b1 + b0)
 * ```
 *
 * double float:
 * Doubles which are equivalent to their 32-bit float representation
 * can be represented as the 4-octet float and then cast to double.
 *
 * @return {Number}
 * @api public
 */
proto.readDouble = function () {
  var code = this.byteBuffer.get();
  if (code === 0x44) {
    return this.byteBuffer.getDouble();
  }

  // Compact double
  if (code === 0x5b) {
    return 0.0;
  }
  if (code === 0x5c) {
    return 1.0;
  }
  if (code === 0x5d) {
    return this.byteBuffer.getInt8();
  }
  if (code === 0x5e) {
    return this.byteBuffer.getInt16();
  }
  if (code === 0x5f) {
    return this.byteBuffer.getInt32() * 0.001;
  }
  this.throwError('readDouble', code);
};

utils.addByteCodes(BYTE_CODES, [
  0x44,
  0x5b,
  0x5c,
  0x5d,
  0x5e,
  0x5f
], 'readDouble');

/**
 * read a date from buffer,
 *
 * v2.0
 * ```
 * date ::= x4a(J) b7 b6 b5 b4 b3 b2 b1 b0 // Date represented by a 64-bit long of milliseconds since Jan 1 1970 00:00H, UTC.
 *      ::= x4b(K) b4 b3 b2 b1 b0          // The second form contains a 32-bit int of minutes since Jan 1 1970 00:00H, UTC.
 *
 * @see http://hessian.caucho.com/doc/hessian-serialization.html##date
 * ```
 *
 * @return {Date}
 * @api public
 */
proto.readDate = function () {
  var code = this.byteBuffer.get();
  if (code === 0x4a) {
    return new Date(utils.handleLong(this.byteBuffer.getLong()));
  }
  if (code === 0x4b) {
    return new Date(this.byteBuffer.getInt32() * 60000);
  }

  this.throwError('readDate', code);
};

utils.addByteCodes(BYTE_CODES, [
  0x4a,
  0x4b,
], 'readDate');

/**
 * read bytes from buffer
 *
 * v2.0
 * ```
 * binary ::= x41(A) b1 b0 <binary-data> binary
 *        ::= x42(B) b1 b0 <binary-data>
 *        ::= [x20-x2f] <binary-data>
 *
 * @see http://hessian.caucho.com/doc/hessian-serialization.html##binary
 * ```
 * The octet x42 ('B') encodes the final chunk and
 * x41 ('A') represents any non-final chunk.
 * Each chunk has a 16-bit length value.
 *
 * len = 256 * b1 + b0
 *
 * Binary data with length less than 15 may be encoded by a single octet length [x20-x2f].
 *
 * len = code - 0x20
 *
 * @return {Buffer}
 * @api public
 */
proto.readBytes = function () {
  var code = this.byteBuffer.get();
  if (code >= 0x20 && code <= 0x2f) {
    // short binary
    var len = code - 0x20;
    return this.byteBuffer.read(len);
  }

  var bufs = [];
  var length = 0;
  // get non-final trunk start with 'A'
  while (code === 0x41) {
    length = this.byteBuffer.getUInt16();
    bufs.push(this.byteBuffer.read(length));
    code = this.byteBuffer.get();
  }

  if (code === 0x42) {
    // get the last trunk start with 'B'
    length = this.byteBuffer.getUInt16();
    bufs.push(this.byteBuffer.read(length));
  } else if (code >= 0x20 && code <= 0x2f) {
    length = code - 0x20;
    bufs.push(this.byteBuffer.read(length));
  } else if (code >= 0x34 && code <= 0x37) {
    length = (code - 0x34) * 256 + this.byteBuffer.get();
    bufs.push(this.byteBuffer.read(length));
  } else {
    this.throwError('readBytes', code);
  }

  return Buffer.concat(bufs);
};

utils.addByteCodes(BYTE_CODES, [
  0x41,
  0x42,
  [0x34, 0x37],
  [0x20, 0x2f],
], 'readBytes');

/**
 * read a string from buffer
 *
 * The length is the number of characters, which may be different than the number of bytes.
 *
 * v2.0
 * ```
 * string ::= R(x52) b1 b0 <utf8-data> string  # non-final chunk
 *        ::= S(x53) b1 b0 <utf8-data>         # string of length 0-65535
 *        ::= [x00-x1f] <utf8-data>            # string of length 0-31
 *        ::= [x30-x33] b0 <utf8-data>         # string of length 0-1023
 *
 * @see http://hessian.caucho.com/doc/hessian-serialization.html##string
 * ```
 * A 16-bit unicode character string encoded in UTF-8. Strings are encoded in chunks.
 * x53 ('S') represents the final chunk and x52 ('R') represents any non-final chunk.
 * Each chunk has a 16-bit unsigned integer length value.
 *
 * The length is the number of 16-bit characters, which may be different than the number of bytes.
 * String chunks may not split surrogate pairs.
 *
 * short strings:
 * Strings with length less than 32 may be encoded with a single octet length [x00-x1f].
 * ```
 * [x00-x1f] <utf8-data>
 * ```
 *
 * @return {String}
 * @api public
 */
proto.readString = function () {
  var str = '';
  var code = this.byteBuffer.get();
  debug('readString() code: %s', code);

  var length;
  switch(code) {
    // 0-byte string
    case 0x00: case 0x01: case 0x02: case 0x03:
    case 0x04: case 0x05: case 0x06: case 0x07:
    case 0x08: case 0x09: case 0x0a: case 0x0b:
    case 0x0c: case 0x0d: case 0x0e: case 0x0f:

    case 0x10: case 0x11: case 0x12: case 0x13:
    case 0x14: case 0x15: case 0x16: case 0x17:
    case 0x18: case 0x19: case 0x1a: case 0x1b:
    case 0x1c: case 0x1d: case 0x1e: case 0x1f:
      this._isLastChunk = true;
      length = code - 0x00;
      debug('read short strings');
      str += this._readUTF8String(length);
      break;

    case 0x30: case 0x31: case 0x32: case 0x33:
      this._isLastChunk = true;
      length = (code - 0x30) * 256 + this.byteBuffer.get();
      str += this._readUTF8String(length);
      break;

    case 0x53:
      this._isLastChunk = true;
      // x53 ('S') represents the final chunk
      debug('read last trunk of string');
      str += this._readUTF8String();
      break;

    case 0x52:
      this._isLastChunk = false;
      // x52 ('R') represents any non-final chunk.
      str += this._readUTF8String();

      while (!this._isLastChunk) {
        str += this.readString();
      }
      break;

    default:
      this.throwError('readString', code);
      break;
  }
  return str;
};

utils.addByteCodes(BYTE_CODES, [
  0x52,
  0x53,
  [0x00, 0x1f],
  [0x30, 0x33],
], 'readString');

/**
 * @return {String} type string
 *
 * v2.0
 * ```
 * ref ::= (0x51) int(putInt)
 *
 * @see http://hessian.caucho.com/doc/hessian-serialization.html##ref
 * ```
 */
proto.readType = function () {
  var pos = this.byteBuffer.position();
  var code = this.byteBuffer.get(pos);

  var type = '';
  switch (code) {
    case 0x00: case 0x01: case 0x02: case 0x03:
    case 0x04: case 0x05: case 0x06: case 0x07:
    case 0x08: case 0x09: case 0x0a: case 0x0b:
    case 0x0c: case 0x0d: case 0x0e: case 0x0f:

    case 0x10: case 0x11: case 0x12: case 0x13:
    case 0x14: case 0x15: case 0x16: case 0x17:
    case 0x18: case 0x19: case 0x1a: case 0x1b:
    case 0x1c: case 0x1d: case 0x1e: case 0x1f:

    case 0x30: case 0x31: case 0x32: case 0x33:
    case 0x52: case 0x53:
      type = this.readString();
      this.types.push(type);
      debug('got type#%d: %s', this.types.length, type);
      break;

    default:
      var ref = this.readInt();
      type = this.types[ref];
      debug('got ref:%d type#%d: %s', ref, this.types.length, type);
      break;
  }
  return type;
};

proto._readObjectDefinition = function () {
  var classname = this.readString();
  var fieldsLength = this.readInt();
  var fields = [];
  for (var i = 0; i < fieldsLength; i++) {
    fields.push(this.readString());
  }

  debug('_readObjectDefinition got %s fields: %j', classname, fields);
  this.classes.push({
    name: classname,
    fields: fields
  });
};

/**
 * Read an object from buffer
 *
 * v2.0
 * ```
 * class-def  ::= 'C(x43)' string int string*
 *
 * object     ::= 'O(x4f)' int value*
 *            ::= [x60-x6f] value*
 *
 * @see http://hessian.caucho.com/doc/hessian-serialization.html##object
 * ```
 *
 * class definition:
 * Hessian 2.0 has a compact object form where the field names are only serialized once.
 * Following objects only need to serialize their values.
 *
 * The object definition includes a mandatory type string,
 * the number of fields, and the field names.
 * The object definition is stored in the object definition map
 * and will be referenced by object instances with an integer reference.
 *
 * object instantiation:
 * Hessian 2.0 has a compact object form where the field names are only serialized once.
 * Following objects only need to serialize their values.
 *
 * The object instantiation creates a new object based on a previous definition.
 * The integer value refers to the object definition.
 *
 * @param {Boolean} withType if need retain the type info
 * @return {Object}
 * @api public
 */
proto.readObject = function (withType) {
  var code = this.byteBuffer.get();
  var ref;
  if (code === 0x43) {
    // C(x43) type fields-length(writeInt) fields-names(writeString) o ref fields-values(write)
    this._readObjectDefinition();
    return this.readObject(withType);
  } else if (code === 0x4f) {
    ref = this.readInt();
  } else if (code >= 0x60 && code <= 0x6f) {
    ref = code - 0x60;
  } else {
    this.throwError('readObject', code);
  }
  
  var cls = this.classes[ref];
  debug('readObject %s, ref: %s', cls.name, ref);

  var result = {
    $class: cls.name,
    $: {}
  };
  this._addRef(result);

  var fields = cls.fields;
  for (var i = 0; i < fields.length; i++) {
    var name = fields[i];
    var value = this.read(withType);
    if (!/^this\$\d+$/.test(name)) {
      result.$[name] = value;
    }
  }

  if (/Exception$/.test(cls.name)) {
    result.$ = new JavaExceptionError(result, withType);
  }

  return withType ? result : result.$;
};

utils.addByteCodes(BYTE_CODES, [
  0x43,
  0x4f,
  [0x60, 0x6f],
], 'readObject');

/**
 * v2.0
 * ```
 * ref ::= Q(x51) int
 *
 * @see http://hessian.caucho.com/doc/hessian-serialization.html##ref
 * ```
 *
 * Each map or list is stored into an array as it is parsed.
 * ref selects one of the stored objects. The first object is numbered '0'.
 *
 * @return {Number}
 */
proto.readRefId = function (withType) {
  var code = this.byteBuffer.get();
  if (code === 0x51) {
    return this.readInt();
  }

  this.throwError('readRef', code);
};

utils.addByteCodes(BYTE_CODES, [
  0x51,
], 'readRef');

proto._readFixedLengthItems = function (len, list, withType) {
  for (var i = 0; i < len; i++) {
    list.push(this.read(withType));
  }
};

/**
 * read an array from buffer
 *
 * v2.0
 * ```
 * list ::= x55 type value* 'Z'   # variable-length list
 *      ::= 'V(x56)' type int value*   # fixed-length list
 *      ::= x57 value* 'Z'        # variable-length untyped list
 *      ::= x58 int value*        # fixed-length untyped list
 *      ::= [x70-77] type value*  # fixed-length typed list
 *      ::= [x78-7f] value*       # fixed-length untyped list
 *
 * @see http://hessian.caucho.com/doc/hessian-serialization.html##list
 * ```
 * An ordered list, like an array.
 * The two list productions are a fixed-length list and a variable length list.
 * Both lists have a type.
 * The type string may be an arbitrary UTF-8 string understood by the service.
 *
 * fixed length list:
 * Hessian 2.0 allows a compact form of the list for successive lists of
 * the same type where the length is known beforehand.
 * The type and length are encoded by integers,
 * where the type is a reference to an earlier specified type.
 *
 * @param {Boolean} withType if need retain the type info
 * @return {Array}
 * @api public
 */
proto.readArray = function (withType) {
  var code = this.byteBuffer.get();
  var type;
  var result;
  var list = [];
  var length = null;

  if (code === 0x56) {
    type = this.readType();
    length = this.readInt();
  } else if (code === 0x58) {
    length = this.readInt();
  } else if (code >= 0x78 && code <= 0x7f) {
    length = code - 0x78;
  } else if (code >= 0x70 && code <= 0x77) {
    type = this.readType();
    length = code - 0x70;
  }

  debug('readArray() type: %s, code: %s', type, code);

  if (type) {
    result = {
      $class: type,
      $: list
    };
  } else {
    result = list;
  }

  this._addRef(result);
  this._readFixedLengthItems(length, list, withType);

  if (!withType) {
    return list;
  }

  return result;
};

utils.addByteCodes(BYTE_CODES, [
  0x56,
  0x58,
  [0x70, 0x77],
  [0x78, 0x7f],
], 'readArray');

proto._readMap = function (map, withType) {
  var code = this.byteBuffer.get(this.byteBuffer.position());
  map = map || {};

  if (supportES6Map) {
    Object.defineProperty(map, '$map', {
      value: new Map(),
      enumerable: false,
    });
  }

  var k;
  var v;
  // Z(0x5a) list/map terminator
  while (code !== 0x5a) {
    k = this.read(withType);
    v = this.read(withType);
    
    map[k] = v;
    if (supportES6Map) {
      map.$map.set(k, v);
    }

    code = this.byteBuffer.get(this.byteBuffer.position());
  }

  // got [Z], move forward 1 byte
  this.byteBuffer.skip(1);
  return map;
};

/**
 * A sparse array, untyped map (HashMap for Java)
 * hessian 2.0
 * @see http://hessian.caucho.com/doc/hessian-serialization.html#anchor27
 *
 * @return {Object}
 */
proto.readHashMap = function (withType) {
  // H: x48
  var code = this.byteBuffer.get();
  if (code !== 0x48) {
    this.throwError('readHashMap', code);
  }

  var result = {};
  this._addRef(result);
  this._readMap(result, withType);
  return result;
};

utils.addByteCodes(BYTE_CODES, [
  0x48
], 'readHashMap');

/**
 * read an map from buffer
 *
 * v2.0
 * ```
 * map        ::= M(x4d) [type] (value value)* Z
 * 
 * @see http://hessian.caucho.com/doc/hessian-serialization.html##map
 * ```
 * Represents serialized maps and can represent objects.
 * The type element describes the type of the map.
 * The type may be empty, i.e. a zero length.
 * The parser is responsible for choosing a type if one is not specified.
 * For objects, unrecognized keys will be ignored.
 *
 * Each map is added to the reference list. Any time the parser expects a map,
 * it must also be able to support a null or a ref.
 *
 * The type is chosen by the service.
 *
 * @param {Boolean} withType if need retain the type info
 * @return {Object}
 * @api public
 */
proto.readMap = function (withType) {
  var code = this.byteBuffer.get();
  if (code !== 0x4d) {
    this.throwError('readMap', code);
  }

  var type = this.readType();
  debug('readMap() got type: %j, withType: %s', type, withType);
  if (!type) {
    var map = {};
    this._addRef(map);
    this._readMap(map);
    return map;
  }

  var result = {
    $class: type,
    $: {}
  };

  // obj maybe refers to itself
  this._addRef(result);
  this._readMap(result.$, withType);

  if (/Exception$/.test(type)) {
    result.$ = new JavaExceptionError(result);
  }

  return withType ? result : result.$;
};

utils.addByteCodes(BYTE_CODES, [
  0x4d
], 'readMap');

module.exports = Decoder;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * hessian.js - lib/v2/encoder.js
 *
 * Copyright(c)
 * MIT Licensed
 *
 * Authors:
 *   fengmk2 <fengmk2@gmail.com> (http://fengmk2.github.com)
 */



/**
 * Module dependencies.
 */

var debug = __webpack_require__(1)('hessian:v2:encoder');
var is = __webpack_require__(5);
var util = __webpack_require__(4);
var EncoderV1 = __webpack_require__(11);
var javaObject = __webpack_require__(2);
var utility = __webpack_require__(69);
var supportES6Map = __webpack_require__(0).supportES6Map;

function Encoder(options) {
  EncoderV1.call(this, options);

  this._classRefs = [];
  this._typeRefs = [];
  this._classRefFields = {};
}

util.inherits(Encoder, EncoderV1);

var proto = Encoder.prototype;

/**
 * clean the buf
 */
proto.reset = proto.clean = function () {
  EncoderV1.prototype.clean.call(this);
  this._classRefs = [];
  this._typeRefs = [];
  return this;
};

var INT_DIRECT_MIN = -0x10; // -16
var INT_DIRECT_MAX = 0x2f;  // 47
var INT_ZERO = 0x90;        // 144

var INT_BYTE_MIN = -0x800;  // -2048
var INT_BYTE_MAX = 0x7ff;   // 2047
var INT_BYTE_ZERO = 0xc8;   // 200

var INT_SHORT_MIN = -0x40000; // -262144
var INT_SHORT_MAX = 0x3ffff;  // 262143
var INT_SHORT_ZERO = 0xd4;    // 212

/**
 * encode int
 *
 * v1.0
 * ```
 * int ::= I(x49) b3 b2 b1 b0
 * ```
 *
 * v2.0
 * ```
 * int ::= I(x49) b3 b2 b1 b0
 *     ::= [x80-xbf]
 *     ::= [xc0-xcf] b0
 *     ::= [xd0-xd7] b1 b0
 *
 * @see http://hessian.caucho.com/doc/hessian-serialization.html##int
 * ```
 */
proto.writeInt = function (val) {
  this._assertType('writeInt', 'int32', val);
  if (INT_DIRECT_MIN <= val && val <= INT_DIRECT_MAX) {
    this.byteBuffer.put(val + INT_ZERO);
  } else if (INT_BYTE_MIN <= val && val <= INT_BYTE_MAX) {
    var b0 = val & 0xff;
    var code = (val >> 8) + INT_BYTE_ZERO;
    this.byteBuffer.put(code).put(b0);
  } else if (INT_SHORT_MIN <= val && val <= INT_SHORT_MAX) {
    var b1b0 = val & 0xffff;
    var code = (val >> 16) + INT_SHORT_ZERO;
    this.byteBuffer.put(code).putUInt16(b1b0);
  } else {
    this.byteBuffer
      .put(0x49)
      .putInt(val);
  }
  return this;
};

/**
 * encode long
 *
 * warning: we won't check if the long value is out of bound, be careful!
 *
 * v1.0
 * ```
 * long ::= L(x4c) b7 b6 b5 b4 b3 b2 b1 b0
 * ```
 *
 * v2.0
 * ```
 * long ::= L(x4c) b7 b6 b5 b4 b3 b2 b1 b0
 *      ::= [xd8-xef]
 *      ::= [xf0-xff] b0
 *      ::= [x38-x3f] b1 b0
 *      ::= x4c b3 b2 b1 b0
 *
 * @see http://hessian.caucho.com/doc/hessian-serialization.html##long
 * ```
 * A 64-bit signed integer. An long is represented by the octet x4c ('L' )
 * followed by the 8-bytes of the integer in big-endian order.
 *
 * single octet longs:
 * Longs between -8 and 15 are represented by a single octet in the range xd8 to xef.
 * ```
 * value = (code - 0xe0)
 * ```
 *
 * two octet longs:
 * Longs between -2048 and 2047 are encoded in two octets with the leading byte in the range xf0 to xff.
 * ```
 * value = ((code - 0xf8) << 8) + b0
 * ```
 *
 * three octet longs:
 * Longs between -262144 and 262143 are encoded in three octets with the leading byte in the range x38 to x3f.
 * ```
 * value = ((code - 0x3c) << 16) + (b1 << 8) + b0
 * ```
 *
 * four octet longs:
 * Longs between which fit into 32-bits are encoded in five octets with the leading byte x59.
 * ```
 * value = (b3 << 24) + (b2 << 16) + (b1 << 8) + b0
 * ```
 */
proto.writeLong = function (val) {
  if (typeof val !== 'number' && utility.isSafeNumberString(val)) {
    val = Number(val);
  }

  if (val >= -8 && val <= 15) {
    this.byteBuffer.put(val + 0xe0);
  } else if (val >= -2048 && val <= 2047) {
    var b0 = val & 0xff;
    var code = (val >> 8) + 0xf8;
    this.byteBuffer.put(code).put(b0);
  } else if (val >= -262144 && val <= 262143) {
    var b1b0 = val & 0xffff;
    var code = (val >> 16) + 0x3c;
    this.byteBuffer.put(code).putUInt16(b1b0);
  } else if (val >= -0x80000000 && val <= 0x7fffffff) {
    // 32-bit integer cast to long
    this.byteBuffer.put(0x59).putInt32(val);
  } else {
    this.byteBuffer
      .put(0x4c) // 'L'
      .putLong(val);
  }
  return this;
};

/**
 * encode double
 *
 * v1.0
 * ```
 * double ::= D(x44) b7 b6 b5 b4 b3 b2 b1 b0
 * ```
 *
 * v2.0
 * ```
 * double ::= D(x44) b7 b6 b5 b4 b3 b2 b1 b0
 *        ::= x5b
 *        ::= x5c
 *        ::= x5d(byte) b0
 *        ::= x5e(short) b1 b0
 *        ::= x5f(float) b3 b2 b1 b0
 *
 * @see http://hessian.caucho.com/doc/hessian-serialization.html##double
 * ```
 * The double 0.0 can be represented by the octet x5b
 * The double 1.0 can be represented by the octet x5c
 *
 * double octet:
 * Doubles between -128.0 and 127.0 with no fractional component
 * can be represented in two octets by casting the byte value to a double.
 * ```
 * value = (double) b0
 * ```
 *
 * double short:
 * Doubles between -32768.0 (-0x8000) and 32767.0(0x8000 - 1) with no fractional component
 * can be represented in three octets by casting the short value to a double.
 * ```
 * value = (double) (256 * b1 + b0)
 * ```
 *
 * double float:
 * Doubles which are equivalent to their 32-bit float representation
 * can be represented as the 4-octet float and then cast to double.
 */
proto.writeDouble = function (val) {
  var intValue = parseInt(val);
  if (intValue === val) {
    if (val === 0) {
      this.byteBuffer.put(0x5b);
      return this;
    } else if (val === 1) {
      this.byteBuffer.put(0x5c);
      return this;
    } else if (-0x80 <= intValue && intValue < 0x80) {
      this.byteBuffer.put(0x5d).put(intValue);
      return this;
    } else if (-0x8000 <= intValue && intValue < 0x8000) {
      this.byteBuffer.put(0x5e).putInt16(intValue);
      return this;
    }
  }

  var mills = parseInt(val * 1000, 10);
  if (is.int32(mills) && mills * 0.001 === val) {
    // // 32-bit integer cast to double
    this.byteBuffer.put(0x5f).putInt32(mills);
    return this;
  }

  this.byteBuffer.put(0x44).putDouble(val);
  return this;
};

/**
 * Writes a date to the stream.
 *
 * date ::= x4a b7 b6 b5 b4 b3 b2 b1 b0
 *      ::= x4b b4 b3 b2 b1 b0
 *
 * @see http://hessian.caucho.com/doc/hessian-serialization.html##date
 *
 * @param time the date in milliseconds from the epoch in UTC
 */
proto.writeDate = function (milliEpoch) {
  if (milliEpoch instanceof Date) {
    milliEpoch = milliEpoch.getTime();
  }

  this._assertType('writeDate', 'number', milliEpoch);

  if ((milliEpoch % 60000) === 0) {
    // compact date
    var minutes = milliEpoch / 60000;
    if (minutes >= -0x80000000 && minutes <= 0x7fffffff) {
      this.byteBuffer
        .put(0x4b)
        .putInt32(minutes);
      return this;
    }
  }

  this.byteBuffer
    .putChar(0x4a)
    .putLong(milliEpoch);
  return this;
};

/**
 * encode buffer
 *
 * v1.0
 * ```
 * binary ::= [x62(b)] b1 b0 <binary-data> binary  # non-final chunk
 *        ::= x42(B) b1 b0 <binary-data>           # final chunk
 * ```
 *
 * v2.0
 * ```
 * binary ::= x41(A) b1 b0 <binary-data> binary    # non-final chunk
 *        ::= x42(B) b1 b0 <binary-data>           # final chunk
 *        ::= [x20-x2f] <binary-data>              # binary data of length 0-15
 *        ::= [x34-x37] b0 <binary-data>           # binary data of length 0-1023
 *
 * @see http://hessian.caucho.com/doc/hessian-serialization.html##binary
 * ```
 * The octet x42 ('B') encodes the final chunk and
 * x62 ('b') represents any non-final chunk.
 * Each chunk has a 16-bit length value.
 *
 * len = 256 * b1 + b0 # max length 32768(0x8000)
 *
 * Binary data with length less than 15 may be encoded by a single octet length [x20-x2f].
 *
 * len = code - 0x20
 */
proto.writeBytes = function (buf) {
  this._assertType('writeBytes', 'buffer', buf);
  if (buf.length <= 15) {
    this.byteBuffer.put(buf.length + 0x20).put(buf);
    return this;
  }

  var offset = 0;
  var left = buf.length - offset;
  while (left > 4093) {
    this.byteBuffer
      .put(0x41) // 'A'
      .putUInt16(4093)
      .put(buf.slice(offset, offset + 4093));

    offset += 4093;
    left = buf.length - offset;
  }

  if (left <= 15) {
    this.byteBuffer
      .put(left + 0x20)
      .put(buf.slice(offset));
  } else if (left <= 1023) {
    this.byteBuffer
      .put((left >> 8) + 0x34)
      .put(left)
      .put(buf.slice(offset));
  } else {
    this.byteBuffer
      .put(0x42) // 'B'
      .putUInt16(left)
      .put(buf.slice(offset));
  }
  return this;
};

/**
 * encode string
 *
 * v1.0
 * ```
 * string ::= s(x73) b1 b0 <utf8-data> string  # non-final chunk
 *        ::= S(x53) b1 b0 <utf8-data>         # string of length 0-65535
 * ```
 *
 * v2.0
 * ```
 * string ::= R(x52) b1 b0 <utf8-data> string  # non-final chunk
 *        ::= S(x53) b1 b0 <utf8-data>         # string of length 0-65535
 *        ::= [x00-x1f] <utf8-data>            # string of length 0-31
 *        ::= [x30-x33] b0 <utf8-data>         # string of length 0-1023
 *
 * @see http://hessian.caucho.com/doc/hessian-serialization.html##string
 * ```
 * A 16-bit unicode character string encoded in UTF-8. Strings are encoded in chunks.
 * x53 ('S') represents the final chunk and x52 ('R') represents any non-final chunk.
 * Each chunk has a 16-bit unsigned integer length value.
 *
 * The length is the number of 16-bit (0x8000) characters, which may be different than the number of bytes.
 * String chunks may not split surrogate pairs.
 *
 * short strings:
 * Strings with length less than 32 may be encoded with a single octet length [x00-x1f].
 * ```
 * [x00-x1f] <utf8-data>
 * ```
 */
proto.writeString = function (str) {
  this._assertType('writeString', 'string', str);

  var length = str.length;
  var strOffset = 0;
  var sublen;
  while (length > 0x8000) {
    sublen = 0x8000;
    // chunk can't end in high surrogate
    var tail = str.charCodeAt(strOffset + sublen - 1);
    if (0xd800 <= tail && tail <= 0xdbff) {
      debug('writeString got tail: 0x%s', tail.toString(16));
      sublen--;
    }

    this.byteBuffer
      .put(0x52)
      .putUInt16(sublen)
      .putRawString(str.slice(strOffset, strOffset + sublen));

    length -= sublen;
    strOffset += sublen;
    debug('writeString strOffset: %s, length: %s, sublen: %s', strOffset, length, sublen);
  }

  debug('writeString left length: %s', length);
  if (length <= 31) {
    // short strings
    this.byteBuffer.put(length);
  } else if (length <= 1023) {
    this.byteBuffer
      .put(48 + (length >> 8))
      .put(length);
  } else {
    this.byteBuffer
      .putChar('S')
      .put(length >> 8)
      .put(length);
  }

  this.byteBuffer.putRawString(str.slice(strOffset));
  return this;
};

var _typecache = {};

/**
 * encode type
 *
 * v1.0
 * ```
 * type ::= 0x74(t) type-string-length(putUInt16) type-string(putRawString)
 * ```
 *
 * v2.0
 * ```
 * type ::= type-string(putRawString)
 *      ::= type-ref(writeInt)
 *
 * @see http://hessian.caucho.com/doc/hessian-serialization.html##type
 * ```
 *
 * A map or list includes a type attribute indicating the type name of the map or
 * list for object-oriented languages.
 *
 * Each type is added to the type map for future reference.
 *
 * type references:
 * Repeated type strings MAY use the type map to refer to a previously used type.
 * The type reference is zero-based over all the types encountered during parsing.
 */
proto.writeType = function (type) {
  type = type || '';
  if (!type) {
    return;
  }

  var ref = this._typeRefs.indexOf(type);
  if (ref >= 0) {
    this.writeInt(ref);
  } else {
    this._typeRefs.push(type);
    if (_typecache[type]) {
      this.byteBuffer.put(_typecache[type]);
    } else {
      var start = this.byteBuffer.position();
      this.writeString(type);
      var end = this.byteBuffer.position();
      _typecache[type] = this.byteBuffer.copy(start, end);
    }
  }
  return this;
};

/**
 * encode ref
 *
 * v1.0
 * ```
 * ref ::= R(0x52) int(putInt)
 * ```
 *
 * v2.0
 * ```
 * ref ::= (0x51) int(putInt)
 *
 * @see http://hessian.caucho.com/doc/hessian-serialization.html##ref
 * ```
 *
 * Each map or list is stored into an array as it is parsed.
 * ref selects one of the stored objects. The first object is numbered '0'.
 */
proto.writeRef = function (value) {
  this.byteBuffer.put(0x51);
  this.writeInt(value);
  return this;
};

var _classcache = {};

/**
 *
 * v2.0
 * ```
 * class-def  ::= 'C' string int string*
 * object     ::= 'O' int value*
 *            ::= [x60-x6f] value*
 *
 * @see http://hessian.caucho.com/doc/hessian-serialization.html##object
 * ```
 */
proto._writeObjectBegin = function (type, fields) {
  debug('_writeObjectBegin() type: %s', type);
  var ref = this._classRefs.indexOf(type);
  if (ref >= 0) {
    if (ref <= 15) {
      this.byteBuffer.put(0x60 + ref);
    } else {
      // O(x4f) type-string-length(writeInt) type-string(putRawString)
      this.byteBuffer.putChar('O');
      this.writeInt(ref);
    }
    return ref;
  } else {
    // class definition
    this.byteBuffer.putChar('C');
    this._classRefs.push(type);
    this._classRefFields[type] = fields;
    if (_classcache[type]) {
      this.byteBuffer.put(_classcache[type]);
    } else {
      var start = this.byteBuffer.position();
      this.writeString(type);
      var end = this.byteBuffer.position();
      _classcache[type] = this.byteBuffer.copy(start, end);
    }
    return -1;
  }
};

// class definition:
//
// The object definition includes a mandatory type string, the number of fields,
// and the field names. The object definition is stored in the object definition
// map and will be referenced by object instances with an integer reference.
//
// object instantiation:
//
// The object instantiation creates a new object based on a previous definition.
// The integer value refers to the object definition.
//
// type format: length(writeInt) stringbytes(putRawString)
proto._writeObject = function (obj) {
  var className = obj.$class;
  var realObj = obj.$;
  // hessian 2.0
  // field defined sort must same as java Class defined
  var keys = Object.keys(realObj);
  var ref = this._writeObjectBegin(className, keys);
  if (ref === -1) {
    // writeDefinition20
    // out.writeClassFieldLength(_fields.length);
    this.writeInt(keys.length);
    // write field names
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      this.writeString(key);
    }
    this._writeObjectBegin(className);
  }
  keys = this._classRefFields[className];
  // writeInstance
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    this.write(realObj[key]);
  }

  return this;
};

/**
 * A sparse array
 *
 * ```
 * untyped map    ::= 'H' (value value)* 'Z'
 *
 * @see http://hessian.caucho.com/doc/hessian-serialization.html##map
 * ```
 *
 * @param {Object} obj simple obj
 * @return {this}
 */
proto._writeHashMap = function (obj) {
  debug('_writeHashMap() %j, fields: %j', obj);

  this.byteBuffer.put(0x48); // H

  if (supportES6Map && obj instanceof Map) {
    obj.forEach(function (value, key) {
      this.write(key);
      this.write(value);
    }, this);
  } else {
    // hash map must sort keys
    var keys = Object.keys(obj).sort();
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      this.writeString(k);
      this.write(obj[k]);
    }
  }
  this.byteBuffer.putChar('Z');
  return this;
};

// Writes the list header to the stream.
//
// list ::= x55 type value* 'Z'   # variable-length list
//      ::= 'V' type int value*   # fixed-length list
//      ::= x57 value* 'Z'        # variable-length untyped list
//      ::= x58 int value*        # fixed-length untyped list
//      ::= [x70-77] type value*  # fixed-length typed list
//      ::= [x78-7f] value*       # fixed-length untyped list
//
// @see http://hessian.caucho.com/doc/hessian-serialization.html##list
proto._writeListBegin = function (length, type) {
  if (length < 0) {
    if (!type) {
      this.byteBuffer.put(0x57);
    } else {
      this.byteBuffer.put(0x55);
      this.writeType(type);
    }
    return true;
  } else if (length <= 7) {
    if (!type) {
      this.byteBuffer.put(120 + length);
    } else {
      this.byteBuffer.put(112 + length);
      this.writeType(type);
    }
    return false;
  } else {
    if (!type) {
      this.byteBuffer.put(0x58);
    } else {
      this.byteBuffer.put(0x56);
      this.writeType(type);
    }
    this.writeInt(length);
    return false;
  }
};

module.exports = Encoder;


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var ip = exports;
var Buffer = __webpack_require__(71).Buffer;
var os = __webpack_require__(73);

ip.toBuffer = function(ip, buff, offset) {
  offset = ~~offset;

  var result;

  if (this.isV4Format(ip)) {
    result = buff || new Buffer(offset + 4);
    ip.split(/\./g).map(function(byte) {
      result[offset++] = parseInt(byte, 10) & 0xff;
    });
  } else if (this.isV6Format(ip)) {
    var sections = ip.split(':', 8);

    var i;
    for (i = 0; i < sections.length; i++) {
      var isv4 = this.isV4Format(sections[i]);
      var v4Buffer;

      if (isv4) {
        v4Buffer = this.toBuffer(sections[i]);
        sections[i] = v4Buffer.slice(0, 2).toString('hex');
      }

      if (v4Buffer && ++i < 8) {
        sections.splice(i, 0, v4Buffer.slice(2, 4).toString('hex'));
      }
    }

    if (sections[0] === '') {
      while (sections.length < 8) sections.unshift('0');
    } else if (sections[sections.length - 1] === '') {
      while (sections.length < 8) sections.push('0');
    } else if (sections.length < 8) {
      for (i = 0; i < sections.length && sections[i] !== ''; i++);
      var argv = [ i, 1 ];
      for (i = 9 - sections.length; i > 0; i--) {
        argv.push('0');
      }
      sections.splice.apply(sections, argv);
    }

    result = buff || new Buffer(offset + 16);
    for (i = 0; i < sections.length; i++) {
      var word = parseInt(sections[i], 16);
      result[offset++] = (word >> 8) & 0xff;
      result[offset++] = word & 0xff;
    }
  }

  if (!result) {
    throw Error('Invalid ip address: ' + ip);
  }

  return result;
};

ip.toString = function(buff, offset, length) {
  offset = ~~offset;
  length = length || (buff.length - offset);

  var result = [];
  if (length === 4) {
    // IPv4
    for (var i = 0; i < length; i++) {
      result.push(buff[offset + i]);
    }
    result = result.join('.');
  } else if (length === 16) {
    // IPv6
    for (var i = 0; i < length; i += 2) {
      result.push(buff.readUInt16BE(offset + i).toString(16));
    }
    result = result.join(':');
    result = result.replace(/(^|:)0(:0)*:0(:|$)/, '$1::$3');
    result = result.replace(/:{3,4}/, '::');
  }

  return result;
};

var ipv4Regex = /^(\d{1,3}\.){3,3}\d{1,3}$/;
var ipv6Regex =
    /^(::)?(((\d{1,3}\.){3}(\d{1,3}){1})?([0-9a-f]){0,4}:{0,2}){1,8}(::)?$/i;

ip.isV4Format = function(ip) {
  return ipv4Regex.test(ip);
};

ip.isV6Format = function(ip) {
  return ipv6Regex.test(ip);
};
function _normalizeFamily(family) {
  return family ? family.toLowerCase() : 'ipv4';
}

ip.fromPrefixLen = function(prefixlen, family) {
  if (prefixlen > 32) {
    family = 'ipv6';
  } else {
    family = _normalizeFamily(family);
  }

  var len = 4;
  if (family === 'ipv6') {
    len = 16;
  }
  var buff = new Buffer(len);

  for (var i = 0, n = buff.length; i < n; ++i) {
    var bits = 8;
    if (prefixlen < 8) {
      bits = prefixlen;
    }
    prefixlen -= bits;

    buff[i] = ~(0xff >> bits) & 0xff;
  }

  return ip.toString(buff);
};

ip.mask = function(addr, mask) {
  addr = ip.toBuffer(addr);
  mask = ip.toBuffer(mask);

  var result = new Buffer(Math.max(addr.length, mask.length));

  // Same protocol - do bitwise and
  if (addr.length === mask.length) {
    for (var i = 0; i < addr.length; i++) {
      result[i] = addr[i] & mask[i];
    }
  } else if (mask.length === 4) {
    // IPv6 address and IPv4 mask
    // (Mask low bits)
    for (var i = 0; i < mask.length; i++) {
      result[i] = addr[addr.length - 4  + i] & mask[i];
    }
  } else {
    // IPv6 mask and IPv4 addr
    for (var i = 0; i < result.length - 6; i++) {
      result[i] = 0;
    }

    // ::ffff:ipv4
    result[10] = 0xff;
    result[11] = 0xff;
    for (var i = 0; i < addr.length; i++) {
      result[i + 12] = addr[i] & mask[i + 12];
    }
  }

  return ip.toString(result);
};

ip.cidr = function(cidrString) {
  var cidrParts = cidrString.split('/');

  var addr = cidrParts[0];
  if (cidrParts.length !== 2)
    throw new Error('invalid CIDR subnet: ' + addr);

  var mask = ip.fromPrefixLen(parseInt(cidrParts[1], 10));

  return ip.mask(addr, mask);
};

ip.subnet = function(addr, mask) {
  var networkAddress = ip.toLong(ip.mask(addr, mask));

  // Calculate the mask's length.
  var maskBuffer = ip.toBuffer(mask);
  var maskLength = 0;

  for (var i = 0; i < maskBuffer.length; i++) {
    if (maskBuffer[i] === 0xff) {
      maskLength += 8;
    } else {
      var octet = maskBuffer[i] & 0xff;
      while (octet) {
        octet = (octet << 1) & 0xff;
        maskLength++;
      }
    }
  }

  var numberOfAddresses = Math.pow(2, 32 - maskLength);

  return {
    networkAddress: ip.fromLong(networkAddress),
    firstAddress: numberOfAddresses <= 2 ?
                    ip.fromLong(networkAddress) :
                    ip.fromLong(networkAddress + 1),
    lastAddress: numberOfAddresses <= 2 ?
                    ip.fromLong(networkAddress + numberOfAddresses - 1) :
                    ip.fromLong(networkAddress + numberOfAddresses - 2),
    broadcastAddress: ip.fromLong(networkAddress + numberOfAddresses - 1),
    subnetMask: mask,
    subnetMaskLength: maskLength,
    numHosts: numberOfAddresses <= 2 ?
                numberOfAddresses : numberOfAddresses - 2,
    length: numberOfAddresses,
    contains: function(other) {
      return networkAddress === ip.toLong(ip.mask(other, mask));
    }
  };
};

ip.cidrSubnet = function(cidrString) {
  var cidrParts = cidrString.split('/');

  var addr = cidrParts[0];
  if (cidrParts.length !== 2)
    throw new Error('invalid CIDR subnet: ' + addr);

  var mask = ip.fromPrefixLen(parseInt(cidrParts[1], 10));

  return ip.subnet(addr, mask);
};

ip.not = function(addr) {
  var buff = ip.toBuffer(addr);
  for (var i = 0; i < buff.length; i++) {
    buff[i] = 0xff ^ buff[i];
  }
  return ip.toString(buff);
};

ip.or = function(a, b) {
  a = ip.toBuffer(a);
  b = ip.toBuffer(b);

  // same protocol
  if (a.length === b.length) {
    for (var i = 0; i < a.length; ++i) {
      a[i] |= b[i];
    }
    return ip.toString(a);

  // mixed protocols
  } else {
    var buff = a;
    var other = b;
    if (b.length > a.length) {
      buff = b;
      other = a;
    }

    var offset = buff.length - other.length;
    for (var i = offset; i < buff.length; ++i) {
      buff[i] |= other[i - offset];
    }

    return ip.toString(buff);
  }
};

ip.isEqual = function(a, b) {
  a = ip.toBuffer(a);
  b = ip.toBuffer(b);

  // Same protocol
  if (a.length === b.length) {
    for (var i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }

  // Swap
  if (b.length === 4) {
    var t = b;
    b = a;
    a = t;
  }

  // a - IPv4, b - IPv6
  for (var i = 0; i < 10; i++) {
    if (b[i] !== 0) return false;
  }

  var word = b.readUInt16BE(10);
  if (word !== 0 && word !== 0xffff) return false;

  for (var i = 0; i < 4; i++) {
    if (a[i] !== b[i + 12]) return false;
  }

  return true;
};

ip.isPrivate = function(addr) {
  return /^(::f{4}:)?10\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/i
      .test(addr) ||
    /^(::f{4}:)?192\.168\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(addr) ||
    /^(::f{4}:)?172\.(1[6-9]|2\d|30|31)\.([0-9]{1,3})\.([0-9]{1,3})$/i
      .test(addr) ||
    /^(::f{4}:)?127\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(addr) ||
    /^(::f{4}:)?169\.254\.([0-9]{1,3})\.([0-9]{1,3})$/i.test(addr) ||
    /^f[cd][0-9a-f]{2}:/i.test(addr) ||
    /^fe80:/i.test(addr) ||
    /^::1$/.test(addr) ||
    /^::$/.test(addr);
};

ip.isPublic = function(addr) {
  return !ip.isPrivate(addr);
};

ip.isLoopback = function(addr) {
  return /^(::f{4}:)?127\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})/
      .test(addr) ||
    /^fe80::1$/.test(addr) ||
    /^::1$/.test(addr) ||
    /^::$/.test(addr);
};

ip.loopback = function(family) {
  //
  // Default to `ipv4`
  //
  family = _normalizeFamily(family);

  if (family !== 'ipv4' && family !== 'ipv6') {
    throw new Error('family must be ipv4 or ipv6');
  }

  return family === 'ipv4' ? '127.0.0.1' : 'fe80::1';
};

//
// ### function address (name, family)
// #### @name {string|'public'|'private'} **Optional** Name or security
//      of the network interface.
// #### @family {ipv4|ipv6} **Optional** IP family of the address (defaults
//      to ipv4).
//
// Returns the address for the network interface on the current system with
// the specified `name`:
//   * String: First `family` address of the interface.
//             If not found see `undefined`.
//   * 'public': the first public ip address of family.
//   * 'private': the first private ip address of family.
//   * undefined: First address with `ipv4` or loopback address `127.0.0.1`.
//
ip.address = function(name, family) {
  var interfaces = os.networkInterfaces();
  var all;

  //
  // Default to `ipv4`
  //
  family = _normalizeFamily(family);

  //
  // If a specific network interface has been named,
  // return the address.
  //
  if (name && name !== 'private' && name !== 'public') {
    var res = interfaces[name].filter(function(details) {
      var itemFamily = details.family.toLowerCase();
      return itemFamily === family;
    });
    if (res.length === 0)
      return undefined;
    return res[0].address;
  }

  var all = Object.keys(interfaces).map(function (nic) {
    //
    // Note: name will only be `public` or `private`
    // when this is called.
    //
    var addresses = interfaces[nic].filter(function (details) {
      details.family = details.family.toLowerCase();
      if (details.family !== family || ip.isLoopback(details.address)) {
        return false;
      } else if (!name) {
        return true;
      }

      return name === 'public' ? ip.isPrivate(details.address) :
          ip.isPublic(details.address);
    });

    return addresses.length ? addresses[0].address : undefined;
  }).filter(Boolean);

  return !all.length ? ip.loopback(family) : all[0];
};

ip.toLong = function(ip) {
  var ipl = 0;
  ip.split('.').forEach(function(octet) {
    ipl <<= 8;
    ipl += parseInt(octet);
  });
  return(ipl >>> 0);
};

ip.fromLong = function(ipl) {
  return ((ipl >>> 24) + '.' +
      (ipl >> 16 & 255) + '.' +
      (ipl >> 8 & 255) + '.' +
      (ipl & 255) );
};


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

(function(root) {
  var toString = Function.prototype.toString;

  function fnBody(fn) {
    return toString.call(fn).replace(/^[^{]*{\s*/,'').replace(/\s*}[^}]*$/,'');
  }

  function isClass(fn) {
    return (typeof fn === 'function' &&
            (/^class\s/.test(toString.call(fn)) ||
              (/^.*classCallCheck\(/.test(fnBody(fn)))) // babel.js
            );
  }

  if (true) {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = isClass;
    }
    exports.isClass = isClass;
  } else if (typeof define === 'function' && define.amd) {
    define([], function() {
      return isClass;
    });
  } else {
    root.isClass = isClass;
  }

})(this);



/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var each = __webpack_require__(41);
module.exports = api;


/**
 * Convenience wrapper around the api.
 * Calls `.get` when called with an `object` and a `pointer`.
 * Calls `.set` when also called with `value`.
 * If only supplied `object`, returns a partially applied function, mapped to the object.
 *
 * @param {Object} obj
 * @param {String|Array} pointer
 * @param value
 * @returns {*}
 */

function api (obj, pointer, value) {
    // .set()
    if (arguments.length === 3) {
        return api.set(obj, pointer, value);
    }
    // .get()
    if (arguments.length === 2) {
        return api.get(obj, pointer);
    }
    // Return a partially applied function on `obj`.
    var wrapped = api.bind(api, obj);

    // Support for oo style
    for (var name in api) {
        if (api.hasOwnProperty(name)) {
            wrapped[name] = api[name].bind(wrapped, obj);
        }
    }
    return wrapped;
}


/**
 * Lookup a json pointer in an object
 *
 * @param {Object} obj
 * @param {String|Array} pointer
 * @returns {*}
 */
api.get = function get (obj, pointer) {
    var refTokens = Array.isArray(pointer) ? pointer : api.parse(pointer);

    for (var i = 0; i < refTokens.length; ++i) {
        var tok = refTokens[i];
        if (!(typeof obj == 'object' && tok in obj)) {
            throw new Error('Invalid reference token: ' + tok);
        }
        obj = obj[tok];
    }
    return obj;
};

/**
 * Sets a value on an object
 *
 * @param {Object} obj
 * @param {String|Array} pointer
 * @param value
 */
api.set = function set (obj, pointer, value) {
    var refTokens = Array.isArray(pointer) ? pointer : api.parse(pointer),
      nextTok = refTokens[0];

    for (var i = 0; i < refTokens.length - 1; ++i) {
        var tok = refTokens[i];
        if (tok === '-' && Array.isArray(obj)) {
          tok = obj.length;
        }
        nextTok = refTokens[i + 1];

        if (!(tok in obj)) {
            if (nextTok.match(/^(\d+|-)$/)) {
                obj[tok] = [];
            } else {
                obj[tok] = {};
            }
        }
        obj = obj[tok];
    }
    if (nextTok === '-' && Array.isArray(obj)) {
      nextTok = obj.length;
    }
    obj[nextTok] = value;
    return this;
};

/**
 * Removes an attribute
 *
 * @param {Object} obj
 * @param {String|Array} pointer
 */
api.remove = function (obj, pointer) {
    var refTokens = Array.isArray(pointer) ? pointer : api.parse(pointer);
    var finalToken = refTokens[refTokens.length -1];
    if (finalToken === undefined) {
        throw new Error('Invalid JSON pointer for remove: "' + pointer + '"');
    }

    var parent = api.get(obj, refTokens.slice(0, -1));
    if (Array.isArray(parent)) {
      var index = +finalToken;
      if (finalToken === '' && isNaN(index)) {
        throw new Error('Invalid array index: "' + finalToken + '"');
      }

      Array.prototype.splice.call(parent, index, 1);
    } else {
      delete parent[finalToken];
    }
};

/**
 * Returns a (pointer -> value) dictionary for an object
 *
 * @param obj
 * @param {function} descend
 * @returns {}
 */
api.dict = function dict (obj, descend) {
    var results = {};
    api.walk(obj, function (value, pointer) {
        results[pointer] = value;
    }, descend);
    return results;
};

/**
 * Iterates over an object
 * Iterator: function (value, pointer) {}
 *
 * @param obj
 * @param {function} iterator
 * @param {function} descend
 */
api.walk = function walk (obj, iterator, descend) {
    var refTokens = [];

    descend = descend || function (value) {
        var type = Object.prototype.toString.call(value);
        return type === '[object Object]' || type === '[object Array]';
    };

    (function next (cur) {
        each(cur, function (value, key) {
            refTokens.push(String(key));
            if (descend(value)) {
                next(value);
            } else {
                iterator(value, api.compile(refTokens));
            }
            refTokens.pop();
        });
    }(obj));
};

/**
 * Tests if an object has a value for a json pointer
 *
 * @param obj
 * @param pointer
 * @returns {boolean}
 */
api.has = function has (obj, pointer) {
    try {
        api.get(obj, pointer);
    } catch (e) {
        return false;
    }
    return true;
};

/**
 * Escapes a reference token
 *
 * @param str
 * @returns {string}
 */
api.escape = function escape (str) {
    return str.toString().replace(/~/g, '~0').replace(/\//g, '~1');
};

/**
 * Unescapes a reference token
 *
 * @param str
 * @returns {string}
 */
api.unescape = function unescape (str) {
    return str.replace(/~1/g, '/').replace(/~0/g, '~');
};

/**
 * Converts a json pointer into a array of reference tokens
 *
 * @param pointer
 * @returns {Array}
 */
api.parse = function parse (pointer) {
    if (pointer === '') { return []; }
    if (pointer.charAt(0) !== '/') { throw new Error('Invalid JSON pointer: ' + pointer); }
    return pointer.substring(1).split(/\//).map(api.unescape);
};

/**
 * Builds a json pointer from a array of reference tokens
 *
 * @param refTokens
 * @returns {string}
 */
api.compile = function compile (refTokens) {
    if (refTokens.length === 0) { return ''; }
    return '/' + refTokens.map(api.escape).join('/');
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
 Copyright 2013 Daniel Wirtz <dcode@dcode.io>
 Copyright 2009 The Closure Library Authors. All Rights Reserved.

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS-IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

/**
 * @license long.js (c) 2013 Daniel Wirtz <dcode@dcode.io>
 * Released under the Apache License, Version 2.0
 * see: https://github.com/dcodeIO/long.js for details
 */
(function(global, factory) {

    /* AMD */ if (true)
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    /* CommonJS */ else if (typeof require === 'function' && typeof module === "object" && module && module["exports"])
        module["exports"] = factory();
    /* Global */ else
        (global["dcodeIO"] = global["dcodeIO"] || {})["Long"] = factory();

})(this, function() {
    "use strict";

    /**
     * Constructs a 64 bit two's-complement integer, given its low and high 32 bit values as *signed* integers.
     *  See the from* functions below for more convenient ways of constructing Longs.
     * @exports Long
     * @class A Long class for representing a 64 bit two's-complement integer value.
     * @param {number} low The low (signed) 32 bits of the long
     * @param {number} high The high (signed) 32 bits of the long
     * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
     * @constructor
     */
    function Long(low, high, unsigned) {

        /**
         * The low 32 bits as a signed value.
         * @type {number}
         * @expose
         */
        this.low = low | 0;

        /**
         * The high 32 bits as a signed value.
         * @type {number}
         * @expose
         */
        this.high = high | 0;

        /**
         * Whether unsigned or not.
         * @type {boolean}
         * @expose
         */
        this.unsigned = !!unsigned;
    }

    // The internal representation of a long is the two given signed, 32-bit values.
    // We use 32-bit pieces because these are the size of integers on which
    // Javascript performs bit-operations.  For operations like addition and
    // multiplication, we split each number into 16 bit pieces, which can easily be
    // multiplied within Javascript's floating-point representation without overflow
    // or change in sign.
    //
    // In the algorithms below, we frequently reduce the negative case to the
    // positive case by negating the input(s) and then post-processing the result.
    // Note that we must ALWAYS check specially whether those values are MIN_VALUE
    // (-2^63) because -MIN_VALUE == MIN_VALUE (since 2^63 cannot be represented as
    // a positive number, it overflows back into a negative).  Not handling this
    // case would often result in infinite recursion.
    //
    // Common constant values ZERO, ONE, NEG_ONE, etc. are defined below the from*
    // methods on which they depend.

    /**
     * An indicator used to reliably determine if an object is a Long or not.
     * @type {boolean}
     * @const
     * @expose
     * @private
     */
    Long.__isLong__;

    Object.defineProperty(Long.prototype, "__isLong__", {
        value: true,
        enumerable: false,
        configurable: false
    });

    /**
     * @function
     * @param {*} obj Object
     * @returns {boolean}
     * @inner
     */
    function isLong(obj) {
        return (obj && obj["__isLong__"]) === true;
    }

    /**
     * Tests if the specified object is a Long.
     * @function
     * @param {*} obj Object
     * @returns {boolean}
     * @expose
     */
    Long.isLong = isLong;

    /**
     * A cache of the Long representations of small integer values.
     * @type {!Object}
     * @inner
     */
    var INT_CACHE = {};

    /**
     * A cache of the Long representations of small unsigned integer values.
     * @type {!Object}
     * @inner
     */
    var UINT_CACHE = {};

    /**
     * @param {number} value
     * @param {boolean=} unsigned
     * @returns {!Long}
     * @inner
     */
    function fromInt(value, unsigned) {
        var obj, cachedObj, cache;
        if (unsigned) {
            value >>>= 0;
            if (cache = (0 <= value && value < 256)) {
                cachedObj = UINT_CACHE[value];
                if (cachedObj)
                    return cachedObj;
            }
            obj = fromBits(value, (value | 0) < 0 ? -1 : 0, true);
            if (cache)
                UINT_CACHE[value] = obj;
            return obj;
        } else {
            value |= 0;
            if (cache = (-128 <= value && value < 128)) {
                cachedObj = INT_CACHE[value];
                if (cachedObj)
                    return cachedObj;
            }
            obj = fromBits(value, value < 0 ? -1 : 0, false);
            if (cache)
                INT_CACHE[value] = obj;
            return obj;
        }
    }

    /**
     * Returns a Long representing the given 32 bit integer value.
     * @function
     * @param {number} value The 32 bit integer in question
     * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
     * @returns {!Long} The corresponding Long value
     * @expose
     */
    Long.fromInt = fromInt;

    /**
     * @param {number} value
     * @param {boolean=} unsigned
     * @returns {!Long}
     * @inner
     */
    function fromNumber(value, unsigned) {
        if (isNaN(value) || !isFinite(value))
            return unsigned ? UZERO : ZERO;
        if (unsigned) {
            if (value < 0)
                return UZERO;
            if (value >= TWO_PWR_64_DBL)
                return MAX_UNSIGNED_VALUE;
        } else {
            if (value <= -TWO_PWR_63_DBL)
                return MIN_VALUE;
            if (value + 1 >= TWO_PWR_63_DBL)
                return MAX_VALUE;
        }
        if (value < 0)
            return fromNumber(-value, unsigned).neg();
        return fromBits((value % TWO_PWR_32_DBL) | 0, (value / TWO_PWR_32_DBL) | 0, unsigned);
    }

    /**
     * Returns a Long representing the given value, provided that it is a finite number. Otherwise, zero is returned.
     * @function
     * @param {number} value The number in question
     * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
     * @returns {!Long} The corresponding Long value
     * @expose
     */
    Long.fromNumber = fromNumber;

    /**
     * @param {number} lowBits
     * @param {number} highBits
     * @param {boolean=} unsigned
     * @returns {!Long}
     * @inner
     */
    function fromBits(lowBits, highBits, unsigned) {
        return new Long(lowBits, highBits, unsigned);
    }

    /**
     * Returns a Long representing the 64 bit integer that comes by concatenating the given low and high bits. Each is
     *  assumed to use 32 bits.
     * @function
     * @param {number} lowBits The low 32 bits
     * @param {number} highBits The high 32 bits
     * @param {boolean=} unsigned Whether unsigned or not, defaults to `false` for signed
     * @returns {!Long} The corresponding Long value
     * @expose
     */
    Long.fromBits = fromBits;

    /**
     * @function
     * @param {number} base
     * @param {number} exponent
     * @returns {number}
     * @inner
     */
    var pow_dbl = Math.pow; // Used 4 times (4*8 to 15+4)

    /**
     * @param {string} str
     * @param {(boolean|number)=} unsigned
     * @param {number=} radix
     * @returns {!Long}
     * @inner
     */
    function fromString(str, unsigned, radix) {
        if (str.length === 0)
            throw Error('empty string');
        if (str === "NaN" || str === "Infinity" || str === "+Infinity" || str === "-Infinity")
            return ZERO;
        if (typeof unsigned === 'number') {
            // For goog.math.long compatibility
            radix = unsigned,
            unsigned = false;
        } else {
            unsigned = !! unsigned;
        }
        radix = radix || 10;
        if (radix < 2 || 36 < radix)
            throw RangeError('radix');

        var p;
        if ((p = str.indexOf('-')) > 0)
            throw Error('interior hyphen');
        else if (p === 0) {
            return fromString(str.substring(1), unsigned, radix).neg();
        }

        // Do several (8) digits each time through the loop, so as to
        // minimize the calls to the very expensive emulated div.
        var radixToPower = fromNumber(pow_dbl(radix, 8));

        var result = ZERO;
        for (var i = 0; i < str.length; i += 8) {
            var size = Math.min(8, str.length - i),
                value = parseInt(str.substring(i, i + size), radix);
            if (size < 8) {
                var power = fromNumber(pow_dbl(radix, size));
                result = result.mul(power).add(fromNumber(value));
            } else {
                result = result.mul(radixToPower);
                result = result.add(fromNumber(value));
            }
        }
        result.unsigned = unsigned;
        return result;
    }

    /**
     * Returns a Long representation of the given string, written using the specified radix.
     * @function
     * @param {string} str The textual representation of the Long
     * @param {(boolean|number)=} unsigned Whether unsigned or not, defaults to `false` for signed
     * @param {number=} radix The radix in which the text is written (2-36), defaults to 10
     * @returns {!Long} The corresponding Long value
     * @expose
     */
    Long.fromString = fromString;

    /**
     * @function
     * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val
     * @returns {!Long}
     * @inner
     */
    function fromValue(val) {
        if (val /* is compatible */ instanceof Long)
            return val;
        if (typeof val === 'number')
            return fromNumber(val);
        if (typeof val === 'string')
            return fromString(val);
        // Throws for non-objects, converts non-instanceof Long:
        return fromBits(val.low, val.high, val.unsigned);
    }

    /**
     * Converts the specified value to a Long.
     * @function
     * @param {!Long|number|string|!{low: number, high: number, unsigned: boolean}} val Value
     * @returns {!Long}
     * @expose
     */
    Long.fromValue = fromValue;

    // NOTE: the compiler should inline these constant values below and then remove these variables, so there should be
    // no runtime penalty for these.

    /**
     * @type {number}
     * @const
     * @inner
     */
    var TWO_PWR_16_DBL = 1 << 16;

    /**
     * @type {number}
     * @const
     * @inner
     */
    var TWO_PWR_24_DBL = 1 << 24;

    /**
     * @type {number}
     * @const
     * @inner
     */
    var TWO_PWR_32_DBL = TWO_PWR_16_DBL * TWO_PWR_16_DBL;

    /**
     * @type {number}
     * @const
     * @inner
     */
    var TWO_PWR_64_DBL = TWO_PWR_32_DBL * TWO_PWR_32_DBL;

    /**
     * @type {number}
     * @const
     * @inner
     */
    var TWO_PWR_63_DBL = TWO_PWR_64_DBL / 2;

    /**
     * @type {!Long}
     * @const
     * @inner
     */
    var TWO_PWR_24 = fromInt(TWO_PWR_24_DBL);

    /**
     * @type {!Long}
     * @inner
     */
    var ZERO = fromInt(0);

    /**
     * Signed zero.
     * @type {!Long}
     * @expose
     */
    Long.ZERO = ZERO;

    /**
     * @type {!Long}
     * @inner
     */
    var UZERO = fromInt(0, true);

    /**
     * Unsigned zero.
     * @type {!Long}
     * @expose
     */
    Long.UZERO = UZERO;

    /**
     * @type {!Long}
     * @inner
     */
    var ONE = fromInt(1);

    /**
     * Signed one.
     * @type {!Long}
     * @expose
     */
    Long.ONE = ONE;

    /**
     * @type {!Long}
     * @inner
     */
    var UONE = fromInt(1, true);

    /**
     * Unsigned one.
     * @type {!Long}
     * @expose
     */
    Long.UONE = UONE;

    /**
     * @type {!Long}
     * @inner
     */
    var NEG_ONE = fromInt(-1);

    /**
     * Signed negative one.
     * @type {!Long}
     * @expose
     */
    Long.NEG_ONE = NEG_ONE;

    /**
     * @type {!Long}
     * @inner
     */
    var MAX_VALUE = fromBits(0xFFFFFFFF|0, 0x7FFFFFFF|0, false);

    /**
     * Maximum signed value.
     * @type {!Long}
     * @expose
     */
    Long.MAX_VALUE = MAX_VALUE;

    /**
     * @type {!Long}
     * @inner
     */
    var MAX_UNSIGNED_VALUE = fromBits(0xFFFFFFFF|0, 0xFFFFFFFF|0, true);

    /**
     * Maximum unsigned value.
     * @type {!Long}
     * @expose
     */
    Long.MAX_UNSIGNED_VALUE = MAX_UNSIGNED_VALUE;

    /**
     * @type {!Long}
     * @inner
     */
    var MIN_VALUE = fromBits(0, 0x80000000|0, false);

    /**
     * Minimum signed value.
     * @type {!Long}
     * @expose
     */
    Long.MIN_VALUE = MIN_VALUE;

    /**
     * @alias Long.prototype
     * @inner
     */
    var LongPrototype = Long.prototype;

    /**
     * Converts the Long to a 32 bit integer, assuming it is a 32 bit integer.
     * @returns {number}
     * @expose
     */
    LongPrototype.toInt = function toInt() {
        return this.unsigned ? this.low >>> 0 : this.low;
    };

    /**
     * Converts the Long to a the nearest floating-point representation of this value (double, 53 bit mantissa).
     * @returns {number}
     * @expose
     */
    LongPrototype.toNumber = function toNumber() {
        if (this.unsigned)
            return ((this.high >>> 0) * TWO_PWR_32_DBL) + (this.low >>> 0);
        return this.high * TWO_PWR_32_DBL + (this.low >>> 0);
    };

    /**
     * Converts the Long to a string written in the specified radix.
     * @param {number=} radix Radix (2-36), defaults to 10
     * @returns {string}
     * @override
     * @throws {RangeError} If `radix` is out of range
     * @expose
     */
    LongPrototype.toString = function toString(radix) {
        radix = radix || 10;
        if (radix < 2 || 36 < radix)
            throw RangeError('radix');
        if (this.isZero())
            return '0';
        if (this.isNegative()) { // Unsigned Longs are never negative
            if (this.eq(MIN_VALUE)) {
                // We need to change the Long value before it can be negated, so we remove
                // the bottom-most digit in this base and then recurse to do the rest.
                var radixLong = fromNumber(radix),
                    div = this.div(radixLong),
                    rem1 = div.mul(radixLong).sub(this);
                return div.toString(radix) + rem1.toInt().toString(radix);
            } else
                return '-' + this.neg().toString(radix);
        }

        // Do several (6) digits each time through the loop, so as to
        // minimize the calls to the very expensive emulated div.
        var radixToPower = fromNumber(pow_dbl(radix, 6), this.unsigned),
            rem = this;
        var result = '';
        while (true) {
            var remDiv = rem.div(radixToPower),
                intval = rem.sub(remDiv.mul(radixToPower)).toInt() >>> 0,
                digits = intval.toString(radix);
            rem = remDiv;
            if (rem.isZero())
                return digits + result;
            else {
                while (digits.length < 6)
                    digits = '0' + digits;
                result = '' + digits + result;
            }
        }
    };

    /**
     * Gets the high 32 bits as a signed integer.
     * @returns {number} Signed high bits
     * @expose
     */
    LongPrototype.getHighBits = function getHighBits() {
        return this.high;
    };

    /**
     * Gets the high 32 bits as an unsigned integer.
     * @returns {number} Unsigned high bits
     * @expose
     */
    LongPrototype.getHighBitsUnsigned = function getHighBitsUnsigned() {
        return this.high >>> 0;
    };

    /**
     * Gets the low 32 bits as a signed integer.
     * @returns {number} Signed low bits
     * @expose
     */
    LongPrototype.getLowBits = function getLowBits() {
        return this.low;
    };

    /**
     * Gets the low 32 bits as an unsigned integer.
     * @returns {number} Unsigned low bits
     * @expose
     */
    LongPrototype.getLowBitsUnsigned = function getLowBitsUnsigned() {
        return this.low >>> 0;
    };

    /**
     * Gets the number of bits needed to represent the absolute value of this Long.
     * @returns {number}
     * @expose
     */
    LongPrototype.getNumBitsAbs = function getNumBitsAbs() {
        if (this.isNegative()) // Unsigned Longs are never negative
            return this.eq(MIN_VALUE) ? 64 : this.neg().getNumBitsAbs();
        var val = this.high != 0 ? this.high : this.low;
        for (var bit = 31; bit > 0; bit--)
            if ((val & (1 << bit)) != 0)
                break;
        return this.high != 0 ? bit + 33 : bit + 1;
    };

    /**
     * Tests if this Long's value equals zero.
     * @returns {boolean}
     * @expose
     */
    LongPrototype.isZero = function isZero() {
        return this.high === 0 && this.low === 0;
    };

    /**
     * Tests if this Long's value is negative.
     * @returns {boolean}
     * @expose
     */
    LongPrototype.isNegative = function isNegative() {
        return !this.unsigned && this.high < 0;
    };

    /**
     * Tests if this Long's value is positive.
     * @returns {boolean}
     * @expose
     */
    LongPrototype.isPositive = function isPositive() {
        return this.unsigned || this.high >= 0;
    };

    /**
     * Tests if this Long's value is odd.
     * @returns {boolean}
     * @expose
     */
    LongPrototype.isOdd = function isOdd() {
        return (this.low & 1) === 1;
    };

    /**
     * Tests if this Long's value is even.
     * @returns {boolean}
     * @expose
     */
    LongPrototype.isEven = function isEven() {
        return (this.low & 1) === 0;
    };

    /**
     * Tests if this Long's value equals the specified's.
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     * @expose
     */
    LongPrototype.equals = function equals(other) {
        if (!isLong(other))
            other = fromValue(other);
        if (this.unsigned !== other.unsigned && (this.high >>> 31) === 1 && (other.high >>> 31) === 1)
            return false;
        return this.high === other.high && this.low === other.low;
    };

    /**
     * Tests if this Long's value equals the specified's. This is an alias of {@link Long#equals}.
     * @function
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     * @expose
     */
    LongPrototype.eq = LongPrototype.equals;

    /**
     * Tests if this Long's value differs from the specified's.
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     * @expose
     */
    LongPrototype.notEquals = function notEquals(other) {
        return !this.eq(/* validates */ other);
    };

    /**
     * Tests if this Long's value differs from the specified's. This is an alias of {@link Long#notEquals}.
     * @function
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     * @expose
     */
    LongPrototype.neq = LongPrototype.notEquals;

    /**
     * Tests if this Long's value is less than the specified's.
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     * @expose
     */
    LongPrototype.lessThan = function lessThan(other) {
        return this.comp(/* validates */ other) < 0;
    };

    /**
     * Tests if this Long's value is less than the specified's. This is an alias of {@link Long#lessThan}.
     * @function
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     * @expose
     */
    LongPrototype.lt = LongPrototype.lessThan;

    /**
     * Tests if this Long's value is less than or equal the specified's.
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     * @expose
     */
    LongPrototype.lessThanOrEqual = function lessThanOrEqual(other) {
        return this.comp(/* validates */ other) <= 0;
    };

    /**
     * Tests if this Long's value is less than or equal the specified's. This is an alias of {@link Long#lessThanOrEqual}.
     * @function
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     * @expose
     */
    LongPrototype.lte = LongPrototype.lessThanOrEqual;

    /**
     * Tests if this Long's value is greater than the specified's.
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     * @expose
     */
    LongPrototype.greaterThan = function greaterThan(other) {
        return this.comp(/* validates */ other) > 0;
    };

    /**
     * Tests if this Long's value is greater than the specified's. This is an alias of {@link Long#greaterThan}.
     * @function
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     * @expose
     */
    LongPrototype.gt = LongPrototype.greaterThan;

    /**
     * Tests if this Long's value is greater than or equal the specified's.
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     * @expose
     */
    LongPrototype.greaterThanOrEqual = function greaterThanOrEqual(other) {
        return this.comp(/* validates */ other) >= 0;
    };

    /**
     * Tests if this Long's value is greater than or equal the specified's. This is an alias of {@link Long#greaterThanOrEqual}.
     * @function
     * @param {!Long|number|string} other Other value
     * @returns {boolean}
     * @expose
     */
    LongPrototype.gte = LongPrototype.greaterThanOrEqual;

    /**
     * Compares this Long's value with the specified's.
     * @param {!Long|number|string} other Other value
     * @returns {number} 0 if they are the same, 1 if the this is greater and -1
     *  if the given one is greater
     * @expose
     */
    LongPrototype.compare = function compare(other) {
        if (!isLong(other))
            other = fromValue(other);
        if (this.eq(other))
            return 0;
        var thisNeg = this.isNegative(),
            otherNeg = other.isNegative();
        if (thisNeg && !otherNeg)
            return -1;
        if (!thisNeg && otherNeg)
            return 1;
        // At this point the sign bits are the same
        if (!this.unsigned)
            return this.sub(other).isNegative() ? -1 : 1;
        // Both are positive if at least one is unsigned
        return (other.high >>> 0) > (this.high >>> 0) || (other.high === this.high && (other.low >>> 0) > (this.low >>> 0)) ? -1 : 1;
    };

    /**
     * Compares this Long's value with the specified's. This is an alias of {@link Long#compare}.
     * @function
     * @param {!Long|number|string} other Other value
     * @returns {number} 0 if they are the same, 1 if the this is greater and -1
     *  if the given one is greater
     * @expose
     */
    LongPrototype.comp = LongPrototype.compare;

    /**
     * Negates this Long's value.
     * @returns {!Long} Negated Long
     * @expose
     */
    LongPrototype.negate = function negate() {
        if (!this.unsigned && this.eq(MIN_VALUE))
            return MIN_VALUE;
        return this.not().add(ONE);
    };

    /**
     * Negates this Long's value. This is an alias of {@link Long#negate}.
     * @function
     * @returns {!Long} Negated Long
     * @expose
     */
    LongPrototype.neg = LongPrototype.negate;

    /**
     * Returns the sum of this and the specified Long.
     * @param {!Long|number|string} addend Addend
     * @returns {!Long} Sum
     * @expose
     */
    LongPrototype.add = function add(addend) {
        if (!isLong(addend))
            addend = fromValue(addend);

        // Divide each number into 4 chunks of 16 bits, and then sum the chunks.

        var a48 = this.high >>> 16;
        var a32 = this.high & 0xFFFF;
        var a16 = this.low >>> 16;
        var a00 = this.low & 0xFFFF;

        var b48 = addend.high >>> 16;
        var b32 = addend.high & 0xFFFF;
        var b16 = addend.low >>> 16;
        var b00 = addend.low & 0xFFFF;

        var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
        c00 += a00 + b00;
        c16 += c00 >>> 16;
        c00 &= 0xFFFF;
        c16 += a16 + b16;
        c32 += c16 >>> 16;
        c16 &= 0xFFFF;
        c32 += a32 + b32;
        c48 += c32 >>> 16;
        c32 &= 0xFFFF;
        c48 += a48 + b48;
        c48 &= 0xFFFF;
        return fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
    };

    /**
     * Returns the difference of this and the specified Long.
     * @param {!Long|number|string} subtrahend Subtrahend
     * @returns {!Long} Difference
     * @expose
     */
    LongPrototype.subtract = function subtract(subtrahend) {
        if (!isLong(subtrahend))
            subtrahend = fromValue(subtrahend);
        return this.add(subtrahend.neg());
    };

    /**
     * Returns the difference of this and the specified Long. This is an alias of {@link Long#subtract}.
     * @function
     * @param {!Long|number|string} subtrahend Subtrahend
     * @returns {!Long} Difference
     * @expose
     */
    LongPrototype.sub = LongPrototype.subtract;

    /**
     * Returns the product of this and the specified Long.
     * @param {!Long|number|string} multiplier Multiplier
     * @returns {!Long} Product
     * @expose
     */
    LongPrototype.multiply = function multiply(multiplier) {
        if (this.isZero())
            return ZERO;
        if (!isLong(multiplier))
            multiplier = fromValue(multiplier);
        if (multiplier.isZero())
            return ZERO;
        if (this.eq(MIN_VALUE))
            return multiplier.isOdd() ? MIN_VALUE : ZERO;
        if (multiplier.eq(MIN_VALUE))
            return this.isOdd() ? MIN_VALUE : ZERO;

        if (this.isNegative()) {
            if (multiplier.isNegative())
                return this.neg().mul(multiplier.neg());
            else
                return this.neg().mul(multiplier).neg();
        } else if (multiplier.isNegative())
            return this.mul(multiplier.neg()).neg();

        // If both longs are small, use float multiplication
        if (this.lt(TWO_PWR_24) && multiplier.lt(TWO_PWR_24))
            return fromNumber(this.toNumber() * multiplier.toNumber(), this.unsigned);

        // Divide each long into 4 chunks of 16 bits, and then add up 4x4 products.
        // We can skip products that would overflow.

        var a48 = this.high >>> 16;
        var a32 = this.high & 0xFFFF;
        var a16 = this.low >>> 16;
        var a00 = this.low & 0xFFFF;

        var b48 = multiplier.high >>> 16;
        var b32 = multiplier.high & 0xFFFF;
        var b16 = multiplier.low >>> 16;
        var b00 = multiplier.low & 0xFFFF;

        var c48 = 0, c32 = 0, c16 = 0, c00 = 0;
        c00 += a00 * b00;
        c16 += c00 >>> 16;
        c00 &= 0xFFFF;
        c16 += a16 * b00;
        c32 += c16 >>> 16;
        c16 &= 0xFFFF;
        c16 += a00 * b16;
        c32 += c16 >>> 16;
        c16 &= 0xFFFF;
        c32 += a32 * b00;
        c48 += c32 >>> 16;
        c32 &= 0xFFFF;
        c32 += a16 * b16;
        c48 += c32 >>> 16;
        c32 &= 0xFFFF;
        c32 += a00 * b32;
        c48 += c32 >>> 16;
        c32 &= 0xFFFF;
        c48 += a48 * b00 + a32 * b16 + a16 * b32 + a00 * b48;
        c48 &= 0xFFFF;
        return fromBits((c16 << 16) | c00, (c48 << 16) | c32, this.unsigned);
    };

    /**
     * Returns the product of this and the specified Long. This is an alias of {@link Long#multiply}.
     * @function
     * @param {!Long|number|string} multiplier Multiplier
     * @returns {!Long} Product
     * @expose
     */
    LongPrototype.mul = LongPrototype.multiply;

    /**
     * Returns this Long divided by the specified. The result is signed if this Long is signed or
     *  unsigned if this Long is unsigned.
     * @param {!Long|number|string} divisor Divisor
     * @returns {!Long} Quotient
     * @expose
     */
    LongPrototype.divide = function divide(divisor) {
        if (!isLong(divisor))
            divisor = fromValue(divisor);
        if (divisor.isZero())
            throw Error('division by zero');
        if (this.isZero())
            return this.unsigned ? UZERO : ZERO;
        var approx, rem, res;
        if (!this.unsigned) {
            if (this.eq(MIN_VALUE)) {
                if (divisor.eq(ONE) || divisor.eq(NEG_ONE))
                    return MIN_VALUE;  // recall that -MIN_VALUE == MIN_VALUE
                else if (divisor.eq(MIN_VALUE))
                    return ONE;
                else {
                    // At this point, we have |other| >= 2, so |this/other| < |MIN_VALUE|.
                    var halfThis = this.shr(1);
                    approx = halfThis.div(divisor).shl(1);
                    if (approx.eq(ZERO)) {
                        return divisor.isNegative() ? ONE : NEG_ONE;
                    } else {
                        rem = this.sub(divisor.mul(approx));
                        res = approx.add(rem.div(divisor));
                        return res;
                    }
                }
            } else if (divisor.eq(MIN_VALUE))
                return this.unsigned ? UZERO : ZERO;
            if (this.isNegative()) {
                if (divisor.isNegative())
                    return this.neg().div(divisor.neg());
                return this.neg().div(divisor).neg();
            } else if (divisor.isNegative())
                return this.div(divisor.neg()).neg();
        } else if (!divisor.unsigned)
            divisor = divisor.toUnsigned();

        // The algorithm below has not been made for unsigned longs. It's therefore
        // required to take special care of the MSB prior to running it.
        if (this.unsigned) {
            if (divisor.gt(this))
                return UZERO;
            if (divisor.gt(this.shru(1))) // 15 >>> 1 = 7 ; with divisor = 8 ; true
                return UONE;
            res = UZERO;
        } else
            res = ZERO;

        // Repeat the following until the remainder is less than other:  find a
        // floating-point that approximates remainder / other *from below*, add this
        // into the result, and subtract it from the remainder.  It is critical that
        // the approximate value is less than or equal to the real value so that the
        // remainder never becomes negative.
        rem = this;
        while (rem.gte(divisor)) {
            // Approximate the result of division. This may be a little greater or
            // smaller than the actual value.
            approx = Math.max(1, Math.floor(rem.toNumber() / divisor.toNumber()));

            // We will tweak the approximate result by changing it in the 48-th digit or
            // the smallest non-fractional digit, whichever is larger.
            var log2 = Math.ceil(Math.log(approx) / Math.LN2),
                delta = (log2 <= 48) ? 1 : pow_dbl(2, log2 - 48),

            // Decrease the approximation until it is smaller than the remainder.  Note
            // that if it is too large, the product overflows and is negative.
                approxRes = fromNumber(approx),
                approxRem = approxRes.mul(divisor);
            while (approxRem.isNegative() || approxRem.gt(rem)) {
                approx -= delta;
                approxRes = fromNumber(approx, this.unsigned);
                approxRem = approxRes.mul(divisor);
            }

            // We know the answer can't be zero... and actually, zero would cause
            // infinite recursion since we would make no progress.
            if (approxRes.isZero())
                approxRes = ONE;

            res = res.add(approxRes);
            rem = rem.sub(approxRem);
        }
        return res;
    };

    /**
     * Returns this Long divided by the specified. This is an alias of {@link Long#divide}.
     * @function
     * @param {!Long|number|string} divisor Divisor
     * @returns {!Long} Quotient
     * @expose
     */
    LongPrototype.div = LongPrototype.divide;

    /**
     * Returns this Long modulo the specified.
     * @param {!Long|number|string} divisor Divisor
     * @returns {!Long} Remainder
     * @expose
     */
    LongPrototype.modulo = function modulo(divisor) {
        if (!isLong(divisor))
            divisor = fromValue(divisor);
        return this.sub(this.div(divisor).mul(divisor));
    };

    /**
     * Returns this Long modulo the specified. This is an alias of {@link Long#modulo}.
     * @function
     * @param {!Long|number|string} divisor Divisor
     * @returns {!Long} Remainder
     * @expose
     */
    LongPrototype.mod = LongPrototype.modulo;

    /**
     * Returns the bitwise NOT of this Long.
     * @returns {!Long}
     * @expose
     */
    LongPrototype.not = function not() {
        return fromBits(~this.low, ~this.high, this.unsigned);
    };

    /**
     * Returns the bitwise AND of this Long and the specified.
     * @param {!Long|number|string} other Other Long
     * @returns {!Long}
     * @expose
     */
    LongPrototype.and = function and(other) {
        if (!isLong(other))
            other = fromValue(other);
        return fromBits(this.low & other.low, this.high & other.high, this.unsigned);
    };

    /**
     * Returns the bitwise OR of this Long and the specified.
     * @param {!Long|number|string} other Other Long
     * @returns {!Long}
     * @expose
     */
    LongPrototype.or = function or(other) {
        if (!isLong(other))
            other = fromValue(other);
        return fromBits(this.low | other.low, this.high | other.high, this.unsigned);
    };

    /**
     * Returns the bitwise XOR of this Long and the given one.
     * @param {!Long|number|string} other Other Long
     * @returns {!Long}
     * @expose
     */
    LongPrototype.xor = function xor(other) {
        if (!isLong(other))
            other = fromValue(other);
        return fromBits(this.low ^ other.low, this.high ^ other.high, this.unsigned);
    };

    /**
     * Returns this Long with bits shifted to the left by the given amount.
     * @param {number|!Long} numBits Number of bits
     * @returns {!Long} Shifted Long
     * @expose
     */
    LongPrototype.shiftLeft = function shiftLeft(numBits) {
        if (isLong(numBits))
            numBits = numBits.toInt();
        if ((numBits &= 63) === 0)
            return this;
        else if (numBits < 32)
            return fromBits(this.low << numBits, (this.high << numBits) | (this.low >>> (32 - numBits)), this.unsigned);
        else
            return fromBits(0, this.low << (numBits - 32), this.unsigned);
    };

    /**
     * Returns this Long with bits shifted to the left by the given amount. This is an alias of {@link Long#shiftLeft}.
     * @function
     * @param {number|!Long} numBits Number of bits
     * @returns {!Long} Shifted Long
     * @expose
     */
    LongPrototype.shl = LongPrototype.shiftLeft;

    /**
     * Returns this Long with bits arithmetically shifted to the right by the given amount.
     * @param {number|!Long} numBits Number of bits
     * @returns {!Long} Shifted Long
     * @expose
     */
    LongPrototype.shiftRight = function shiftRight(numBits) {
        if (isLong(numBits))
            numBits = numBits.toInt();
        if ((numBits &= 63) === 0)
            return this;
        else if (numBits < 32)
            return fromBits((this.low >>> numBits) | (this.high << (32 - numBits)), this.high >> numBits, this.unsigned);
        else
            return fromBits(this.high >> (numBits - 32), this.high >= 0 ? 0 : -1, this.unsigned);
    };

    /**
     * Returns this Long with bits arithmetically shifted to the right by the given amount. This is an alias of {@link Long#shiftRight}.
     * @function
     * @param {number|!Long} numBits Number of bits
     * @returns {!Long} Shifted Long
     * @expose
     */
    LongPrototype.shr = LongPrototype.shiftRight;

    /**
     * Returns this Long with bits logically shifted to the right by the given amount.
     * @param {number|!Long} numBits Number of bits
     * @returns {!Long} Shifted Long
     * @expose
     */
    LongPrototype.shiftRightUnsigned = function shiftRightUnsigned(numBits) {
        if (isLong(numBits))
            numBits = numBits.toInt();
        numBits &= 63;
        if (numBits === 0)
            return this;
        else {
            var high = this.high;
            if (numBits < 32) {
                var low = this.low;
                return fromBits((low >>> numBits) | (high << (32 - numBits)), high >>> numBits, this.unsigned);
            } else if (numBits === 32)
                return fromBits(high, 0, this.unsigned);
            else
                return fromBits(high >>> (numBits - 32), 0, this.unsigned);
        }
    };

    /**
     * Returns this Long with bits logically shifted to the right by the given amount. This is an alias of {@link Long#shiftRightUnsigned}.
     * @function
     * @param {number|!Long} numBits Number of bits
     * @returns {!Long} Shifted Long
     * @expose
     */
    LongPrototype.shru = LongPrototype.shiftRightUnsigned;

    /**
     * Converts this Long to signed.
     * @returns {!Long} Signed long
     * @expose
     */
    LongPrototype.toSigned = function toSigned() {
        if (!this.unsigned)
            return this;
        return fromBits(this.low, this.high, false);
    };

    /**
     * Converts this Long to unsigned.
     * @returns {!Long} Unsigned long
     * @expose
     */
    LongPrototype.toUnsigned = function toUnsigned() {
        if (this.unsigned)
            return this;
        return fromBits(this.low, this.high, true);
    };

    return Long;
});


/***/ }),
/* 48 */
/***/ (function(module, exports) {

/**
 * Helpers.
 */

var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;

/**
 * Parse or format the given `val`.
 *
 * Options:
 *
 *  - `long` verbose formatting [false]
 *
 * @param {String|Number} val
 * @param {Object} options
 * @return {String|Number}
 * @api public
 */

module.exports = function(val, options){
  options = options || {};
  if ('string' == typeof val) return parse(val);
  return options.long
    ? long(val)
    : short(val);
};

/**
 * Parse the given `str` and return milliseconds.
 *
 * @param {String} str
 * @return {Number}
 * @api private
 */

function parse(str) {
  str = '' + str;
  if (str.length > 10000) return;
  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
  if (!match) return;
  var n = parseFloat(match[1]);
  var type = (match[2] || 'ms').toLowerCase();
  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
  }
}

/**
 * Short format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function short(ms) {
  if (ms >= d) return Math.round(ms / d) + 'd';
  if (ms >= h) return Math.round(ms / h) + 'h';
  if (ms >= m) return Math.round(ms / m) + 'm';
  if (ms >= s) return Math.round(ms / s) + 's';
  return ms + 'ms';
}

/**
 * Long format for `ms`.
 *
 * @param {Number} ms
 * @return {String}
 * @api private
 */

function long(ms) {
  return plural(ms, d, 'day')
    || plural(ms, h, 'hour')
    || plural(ms, m, 'minute')
    || plural(ms, s, 'second')
    || ms + ' ms';
}

/**
 * Pluralization helper.
 */

function plural(ms, n, name) {
  if (ms < n) return;
  if (ms < n * 1.5) return Math.floor(ms / n) + ' ' + name;
  return Math.ceil(ms / n) + ' ' + name + 's';
}


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stringify = __webpack_require__(51);
var parse = __webpack_require__(50);
var formats = __webpack_require__(13);

module.exports = {
    formats: formats,
    parse: parse,
    stringify: stringify
};


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(14);

var has = Object.prototype.hasOwnProperty;

var defaults = {
    allowDots: false,
    allowPrototypes: false,
    arrayLimit: 20,
    decoder: utils.decode,
    delimiter: '&',
    depth: 5,
    parameterLimit: 1000,
    plainObjects: false,
    strictNullHandling: false
};

var parseValues = function parseQueryStringValues(str, options) {
    var obj = {};
    var parts = str.split(options.delimiter, options.parameterLimit === Infinity ? undefined : options.parameterLimit);

    for (var i = 0; i < parts.length; ++i) {
        var part = parts[i];
        var pos = part.indexOf(']=') === -1 ? part.indexOf('=') : part.indexOf(']=') + 1;

        var key, val;
        if (pos === -1) {
            key = options.decoder(part);
            val = options.strictNullHandling ? null : '';
        } else {
            key = options.decoder(part.slice(0, pos));
            val = options.decoder(part.slice(pos + 1));
        }
        if (has.call(obj, key)) {
            obj[key] = [].concat(obj[key]).concat(val);
        } else {
            obj[key] = val;
        }
    }

    return obj;
};

var parseObject = function parseObjectRecursive(chain, val, options) {
    if (!chain.length) {
        return val;
    }

    var root = chain.shift();

    var obj;
    if (root === '[]') {
        obj = [];
        obj = obj.concat(parseObject(chain, val, options));
    } else {
        obj = options.plainObjects ? Object.create(null) : {};
        var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
        var index = parseInt(cleanRoot, 10);
        if (
            !isNaN(index) &&
            root !== cleanRoot &&
            String(index) === cleanRoot &&
            index >= 0 &&
            (options.parseArrays && index <= options.arrayLimit)
        ) {
            obj = [];
            obj[index] = parseObject(chain, val, options);
        } else {
            obj[cleanRoot] = parseObject(chain, val, options);
        }
    }

    return obj;
};

var parseKeys = function parseQueryStringKeys(givenKey, val, options) {
    if (!givenKey) {
        return;
    }

    // Transform dot notation to bracket notation
    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

    // The regex chunks

    var parent = /^([^[]*)/;
    var child = /(\[[^[\]]*])/g;

    // Get the parent

    var segment = parent.exec(key);

    // Stash the parent if it exists

    var keys = [];
    if (segment[1]) {
        // If we aren't using plain objects, optionally prefix keys
        // that would overwrite object prototype properties
        if (!options.plainObjects && has.call(Object.prototype, segment[1])) {
            if (!options.allowPrototypes) {
                return;
            }
        }

        keys.push(segment[1]);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while ((segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
            if (!options.allowPrototypes) {
                return;
            }
        }
        keys.push(segment[1]);
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return parseObject(keys, val, options);
};

module.exports = function (str, opts) {
    var options = opts || {};

    if (options.decoder !== null && options.decoder !== undefined && typeof options.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
    }

    options.delimiter = typeof options.delimiter === 'string' || utils.isRegExp(options.delimiter) ? options.delimiter : defaults.delimiter;
    options.depth = typeof options.depth === 'number' ? options.depth : defaults.depth;
    options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : defaults.arrayLimit;
    options.parseArrays = options.parseArrays !== false;
    options.decoder = typeof options.decoder === 'function' ? options.decoder : defaults.decoder;
    options.allowDots = typeof options.allowDots === 'boolean' ? options.allowDots : defaults.allowDots;
    options.plainObjects = typeof options.plainObjects === 'boolean' ? options.plainObjects : defaults.plainObjects;
    options.allowPrototypes = typeof options.allowPrototypes === 'boolean' ? options.allowPrototypes : defaults.allowPrototypes;
    options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : defaults.parameterLimit;
    options.strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;

    if (str === '' || str === null || typeof str === 'undefined') {
        return options.plainObjects ? Object.create(null) : {};
    }

    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
    var obj = options.plainObjects ? Object.create(null) : {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options);
        obj = utils.merge(obj, newObj, options);
    }

    return utils.compact(obj);
};


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(14);
var formats = __webpack_require__(13);

var arrayPrefixGenerators = {
    brackets: function brackets(prefix) { // eslint-disable-line func-name-matching
        return prefix + '[]';
    },
    indices: function indices(prefix, key) { // eslint-disable-line func-name-matching
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) { // eslint-disable-line func-name-matching
        return prefix;
    }
};

var toISO = Date.prototype.toISOString;

var defaults = {
    delimiter: '&',
    encode: true,
    encoder: utils.encode,
    serializeDate: function serializeDate(date) { // eslint-disable-line func-name-matching
        return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
};

var stringify = function stringify( // eslint-disable-line func-name-matching
    object,
    prefix,
    generateArrayPrefix,
    strictNullHandling,
    skipNulls,
    encoder,
    filter,
    sort,
    allowDots,
    serializeDate,
    formatter
) {
    var obj = object;
    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    } else if (obj === null) {
        if (strictNullHandling) {
            return encoder ? encoder(prefix) : prefix;
        }

        obj = '';
    }

    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || utils.isBuffer(obj)) {
        if (encoder) {
            return [formatter(encoder(prefix)) + '=' + formatter(encoder(obj))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (Array.isArray(filter)) {
        objKeys = filter;
    } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        if (Array.isArray(obj)) {
            values = values.concat(stringify(
                obj[key],
                generateArrayPrefix(prefix, key),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter
            ));
        } else {
            values = values.concat(stringify(
                obj[key],
                prefix + (allowDots ? '.' + key : '[' + key + ']'),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter
            ));
        }
    }

    return values;
};

module.exports = function (object, opts) {
    var obj = object;
    var options = opts || {};

    if (options.encoder !== null && options.encoder !== undefined && typeof options.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }

    var delimiter = typeof options.delimiter === 'undefined' ? defaults.delimiter : options.delimiter;
    var strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;
    var skipNulls = typeof options.skipNulls === 'boolean' ? options.skipNulls : defaults.skipNulls;
    var encode = typeof options.encode === 'boolean' ? options.encode : defaults.encode;
    var encoder = encode ? (typeof options.encoder === 'function' ? options.encoder : defaults.encoder) : null;
    var sort = typeof options.sort === 'function' ? options.sort : null;
    var allowDots = typeof options.allowDots === 'undefined' ? false : options.allowDots;
    var serializeDate = typeof options.serializeDate === 'function' ? options.serializeDate : defaults.serializeDate;
    if (typeof options.format === 'undefined') {
        options.format = formats.default;
    } else if (!Object.prototype.hasOwnProperty.call(formats.formatters, options.format)) {
        throw new TypeError('Unknown format option provided.');
    }
    var formatter = formats.formatters[options.format];
    var objKeys;
    var filter;

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (Array.isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }

    var keys = [];

    if (typeof obj !== 'object' || obj === null) {
        return '';
    }

    var arrayFormat;
    if (options.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = options.arrayFormat;
    } else if ('indices' in options) {
        arrayFormat = options.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = 'indices';
    }

    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

    if (!objKeys) {
        objKeys = Object.keys(obj);
    }

    if (sort) {
        objKeys.sort(sort);
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        keys = keys.concat(stringify(
            obj[key],
            key,
            generateArrayPrefix,
            strictNullHandling,
            skipNulls,
            encoder,
            filter,
            sort,
            allowDots,
            serializeDate,
            formatter
        ));
    }

    return keys.join(delimiter);
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var hessian_js_1 = __webpack_require__(9);
var Response = {
    OK: 20,
    CLIENT_TIMEOUT: 30,
    SERVER_TIMEOUT: 31,
    BAD_REQUEST: 40,
    BAD_RESPONSE: 50,
    SERVICE_NOT_FOUND: 60,
    SERVICE_ERROR: 70,
    SERVER_ERROR: 80,
    CLIENT_ERROR: 90
};
var RESPONSE_WITH_EXCEPTION = 0;
var RESPONSE_VALUE = 1;
var RESPONSE_NULL_VALUE = 2;
var HessianDecode = (function () {
    function HessianDecode() {
    }
    HessianDecode.prototype.decode = function (heap) {
        return __awaiter(this, void 0, void 0, function () {
            var flag, result, rtn, excep;
            return __generator(this, function (_a) {
                if (heap[3] !== Response.OK) {
                    throw new Error(decodeURIComponent(heap.slice(18, heap.length - 1).toString()));
                }
                result = new hessian_js_1.DecoderV2(heap.slice(16, heap.length));
                flag = result.readInt();
                switch (flag) {
                    case RESPONSE_NULL_VALUE:
                        break;
                    case RESPONSE_VALUE:
                        rtn = result.read();
                        break;
                    case RESPONSE_WITH_EXCEPTION:
                        excep = result.read();
                        if (!(excep instanceof Error) && (excep = new Error(excep))) {
                            throw excep;
                        }
                        break;
                    default:
                        throw new Error("Unknown result flag, expect '0' '1' '2', get " + flag);
                }
                return [2 /*return*/, rtn];
            });
        });
    };
    return HessianDecode;
}());
exports.HessianDecode = HessianDecode;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var hessian_js_1 = __webpack_require__(9);
var DEFAULT_LEN = 8388608;
var HessianEncode = (function () {
    function HessianEncode(dubboInfo, appInfo) {
        this.dubboInfo = dubboInfo;
        this.appInfo = appInfo;
    }
    HessianEncode.prototype.encode = function (method, args) {
        var body = this._body(method, args);
        var head = this._head(body.length);
        return Buffer.concat([head, body]);
    };
    HessianEncode.prototype._head = function (len) {
        var head = [0xda, 0xbb, 0xc2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        var i = 15;
        if (len > DEFAULT_LEN) {
            throw new Error("Data length too large: " + len + ", max payload: " + DEFAULT_LEN);
        }
        while (len >= 256) {
            head.splice(i--, 1, len % 256);
            len >>= 8;
        }
        head.splice(i, 1, len);
        return new Buffer(head);
    };
    HessianEncode.prototype._body = function (method, args) {
        var body = new hessian_js_1.EncoderV2();
        body.write(this.dubboInfo.version || '2.8.5');
        body.write(this.appInfo.dInterface.name);
        body.write(this.appInfo.dInterface.version);
        body.write(method);
        if (args && args.length) {
            body.write(args.length);
            for (var i = 0, len = args.length; i < len; ++i) {
                body.write(args[i]);
            }
        }
        else {
            body.write(0);
        }
        body.write(this._attachments());
        return body.byteBuffer._bytes.slice(0, body.byteBuffer._offset);
    };
    HessianEncode.prototype._attachments = function () {
        var implicitArgs = {
            interface: this.appInfo.dInterface.name,
            path: this.appInfo.dInterface.name,
            timeout: this.appInfo.dInterface.timeout || 6000
        };
        if (this.appInfo.dInterface.version) {
            implicitArgs.version = this.appInfo.dInterface.version;
        }
        if (this.appInfo.dInterface.group) {
            implicitArgs.group = this.appInfo.dInterface.group;
        }
        return {
            $class: 'java.util.HashMap',
            $: implicitArgs
        };
    };
    return HessianEncode;
}());
exports.HessianEncode = HessianEncode;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var net = __webpack_require__(20);
var encode_1 = __webpack_require__(53);
var decode_1 = __webpack_require__(52);
var RpcHessian = (function () {
    function RpcHessian() {
    }
    RpcHessian.prototype.execute = function (method, args, host, dubboInfo, appInfo) {
        var encode = new encode_1.HessianEncode(dubboInfo, appInfo);
        return new Promise(function (resolve, reject) {
            var client = new net.Socket();
            var chunks = [];
            var heap, bl = 16;
            client.connect(~~host.port || 80, host.host, function () {
                client.write(encode.encode(method, args));
            });
            client.on('error', function (err) {
                reject(err);
            });
            client.on('data', function (chunk) {
                if (!chunks.length) {
                    var arr = Array.prototype.slice.call(chunk.slice(0, 16));
                    var i = 0;
                    while (i < 3) {
                        bl += arr.pop() * Math.pow(256, i++);
                    }
                }
                chunks.push(chunk);
                heap = Buffer.concat(chunks);
                (heap.length >= bl) && client.destroy();
            });
            client.on('close', function (err) {
                if (err) {
                    return reject(err);
                }
                var decode = new decode_1.HessianDecode();
                decode.decode(heap).then(resolve).catch(reject);
            });
        });
    };
    return RpcHessian;
}());
exports.RpcHessian = RpcHessian;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var modelproxy_1 = __webpack_require__(3);
var _ = __webpack_require__(22);
var rpc_1 = __webpack_require__(56);
var zk_1 = __webpack_require__(57);
var NodeDubbo = (function (_super) {
    __extends(NodeDubbo, _super);
    function NodeDubbo(zookeeperClient) {
        var _this = _super.call(this) || this;
        _this.client = new zk_1.ZookeeperClient(zookeeperClient);
        return _this;
    }
    NodeDubbo.prototype.init = function (dubboInfo, appInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var _a, host;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.client.connect()];
                    case 1:
                        _b.sent();
                        _a = this;
                        return [4 /*yield*/, this.client.findHosts(dubboInfo.rootPath, appInfo, dubboInfo)];
                    case 2:
                        _a.hosts = _b.sent();
                        host = _.first(this.hosts);
                        if (host) {
                            _.each(host.methods.split(","), function (m) {
                                _this.add(m, appInfo, true);
                                _.extend(_this, (_a = {},
                                    _a[m] = _this.execute.bind(_this, m, dubboInfo, appInfo),
                                    _a));
                                var _a;
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    NodeDubbo.prototype.execute = function (method, dubboInfo, appInfo, args) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, rpc_1.rpcFactory.execute(method, this.hosts[0], dubboInfo, appInfo, args)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return NodeDubbo;
}(modelproxy_1.modelProxy.BaseFactory));
exports.NodeDubbo = NodeDubbo;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var modelproxy_1 = __webpack_require__(3);
var hessian_1 = __webpack_require__(54);
var RpcFactory = (function (_super) {
    __extends(RpcFactory, _super);
    function RpcFactory() {
        return _super.call(this) || this;
    }
    RpcFactory.prototype.execute = function (method, host, dubboInfo, appInfo, args) {
        return __awaiter(this, void 0, void 0, function () {
            var instance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        instance = this.use("hessian");
                        return [4 /*yield*/, instance.execute(method, args, host, dubboInfo, appInfo)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return RpcFactory;
}(modelproxy_1.modelProxy.BaseFactory));
exports.rpcFactory = new RpcFactory();
exports.rpcFactory.add("hessian", new hessian_1.RpcHessian());


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var zookeeper = __webpack_require__(21);
var _ = __webpack_require__(22);
var uri = __webpack_require__(58);
var qs = __webpack_require__(49);
var ip = __webpack_require__(44);
var ZookeeperClient = (function () {
    function ZookeeperClient(client) {
        var _this = this;
        this.client = client;
        this.client.on('state', function (state) {
            _this.state = state;
        });
    }
    ZookeeperClient.prototype.connect = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (_this.state === zookeeper.State.SYNC_CONNECTED) {
                return resolve();
            }
            _this.client.once('connected', function () {
                resolve();
            });
        });
    };
    ZookeeperClient.prototype.getChildren = function (path, watch) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var args = [path, watch, function (error, children, stats) {
                    if (error) {
                        return reject(error);
                    }
                    resolve(children || []);
                }];
            if (!watch) {
                args.splice(1, 1);
            }
            _this.client.getChildren.apply(_this.client, args);
        });
    };
    ZookeeperClient.prototype.handleHostResult = function (children, appVer) {
        return __awaiter(this, void 0, void 0, function () {
            var hosts;
            return __generator(this, function (_a) {
                hosts = [];
                _.each(children, function (child) {
                    var host = uri(decodeURIComponent(child));
                    var query = qs.parse(host.query());
                    if (query.version === appVer) {
                        hosts.push({
                            host: host.hostname(),
                            port: host.port(),
                            methods: query.methods,
                            weight: query.weight || 0,
                            application: query.application,
                            category: 'consumers',
                            generic: query.generic.toString() !== 'false',
                            dubbo: query.dubbo || '2.8.5',
                            interface: query.interface,
                            revision: query.revision,
                            version: query.version,
                            side: query.side || 'consumer',
                            timestamp: (new Date()).getTime()
                        });
                    }
                });
                return [2 /*return*/, hosts];
            });
        });
    };
    ZookeeperClient.prototype.exists = function (path) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.client.exists(path, function (err, stat) {
                if (err) {
                    return reject(err);
                }
                resolve(!!stat);
            });
        });
    };
    ZookeeperClient.prototype.registerHost = function (rootPath, app, dubboInfo) {
        var _this = this;
        var host = uri({
            protocol: "consumer",
            hostname: ip.address(),
            port: "",
            path: app.dInterface.name,
            query: uri.buildQuery({
                application: app.name,
                category: 'consumers',
                check: 'false',
                dubbo: dubboInfo.version,
                interface: app.dInterface.name,
                revision: app.dInterface.version,
                version: app.dInterface.version,
                side: 'consumer',
                timestamp: (new Date()).getTime()
            })
        });
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var path, exist;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = "/" + rootPath + "/" + app.dInterface.name + "/consumers/" + encodeURIComponent(host.href());
                        return [4 /*yield*/, this.exists(path)];
                    case 1:
                        exist = _a.sent();
                        if (exist) {
                            return [2 /*return*/, resolve()];
                        }
                        this.client.create(path, zookeeper.CreateMode.EPHEMERAL, function (err, path) {
                            if (err) {
                                return reject(err);
                            }
                            resolve(path);
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    };
    ZookeeperClient.prototype.findHosts = function (rootPath, app, dubboInfo) {
        if (rootPath === void 0) { rootPath = 'dubbo'; }
        return __awaiter(this, void 0, void 0, function () {
            var children;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect()];
                    case 1:
                        _a.sent();
                        if (!(this.state === zookeeper.State.SYNC_CONNECTED)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.getChildren("/" + rootPath + "/" + app.dInterface.name + "/providers")];
                    case 2:
                        children = _a.sent();
                        return [4 /*yield*/, this.registerHost(rootPath, app, dubboInfo)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.handleHostResult(children, app.dInterface.version)];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5: throw new Error('zookeeper未连接。');
                }
            });
        });
    };
    return ZookeeperClient;
}());
exports.ZookeeperClient = ZookeeperClient;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * URI.js - Mutating URLs
 *
 * Version: 1.18.7
 *
 * Author: Rodney Rehm
 * Web: http://medialize.github.io/URI.js/
 *
 * Licensed under
 *   MIT License http://www.opensource.org/licenses/mit-license
 *
 */
(function (root, factory) {
  'use strict';
  // https://github.com/umdjs/umd/blob/master/returnExports.js
  if (typeof module === 'object' && module.exports) {
    // Node
    module.exports = factory(__webpack_require__(17), __webpack_require__(15), __webpack_require__(16));
  } else if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(17), __webpack_require__(15), __webpack_require__(16)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {
    // Browser globals (root is window)
    root.URI = factory(root.punycode, root.IPv6, root.SecondLevelDomains, root);
  }
}(this, function (punycode, IPv6, SLD, root) {
  'use strict';
  /*global location, escape, unescape */
  // FIXME: v2.0.0 renamce non-camelCase properties to uppercase
  /*jshint camelcase: false */

  // save current URI variable, if any
  var _URI = root && root.URI;

  function URI(url, base) {
    var _urlSupplied = arguments.length >= 1;
    var _baseSupplied = arguments.length >= 2;

    // Allow instantiation without the 'new' keyword
    if (!(this instanceof URI)) {
      if (_urlSupplied) {
        if (_baseSupplied) {
          return new URI(url, base);
        }

        return new URI(url);
      }

      return new URI();
    }

    if (url === undefined) {
      if (_urlSupplied) {
        throw new TypeError('undefined is not a valid argument for URI');
      }

      if (typeof location !== 'undefined') {
        url = location.href + '';
      } else {
        url = '';
      }
    }

    if (url === null) {
      if (_urlSupplied) {
        throw new TypeError('null is not a valid argument for URI');
      }
    }

    this.href(url);

    // resolve to base according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#constructor
    if (base !== undefined) {
      return this.absoluteTo(base);
    }

    return this;
  }

  URI.version = '1.18.7';

  var p = URI.prototype;
  var hasOwn = Object.prototype.hasOwnProperty;

  function escapeRegEx(string) {
    // https://github.com/medialize/URI.js/commit/85ac21783c11f8ccab06106dba9735a31a86924d#commitcomment-821963
    return string.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
  }

  function getType(value) {
    // IE8 doesn't return [Object Undefined] but [Object Object] for undefined value
    if (value === undefined) {
      return 'Undefined';
    }

    return String(Object.prototype.toString.call(value)).slice(8, -1);
  }

  function isArray(obj) {
    return getType(obj) === 'Array';
  }

  function filterArrayValues(data, value) {
    var lookup = {};
    var i, length;

    if (getType(value) === 'RegExp') {
      lookup = null;
    } else if (isArray(value)) {
      for (i = 0, length = value.length; i < length; i++) {
        lookup[value[i]] = true;
      }
    } else {
      lookup[value] = true;
    }

    for (i = 0, length = data.length; i < length; i++) {
      /*jshint laxbreak: true */
      var _match = lookup && lookup[data[i]] !== undefined
        || !lookup && value.test(data[i]);
      /*jshint laxbreak: false */
      if (_match) {
        data.splice(i, 1);
        length--;
        i--;
      }
    }

    return data;
  }

  function arrayContains(list, value) {
    var i, length;

    // value may be string, number, array, regexp
    if (isArray(value)) {
      // Note: this can be optimized to O(n) (instead of current O(m * n))
      for (i = 0, length = value.length; i < length; i++) {
        if (!arrayContains(list, value[i])) {
          return false;
        }
      }

      return true;
    }

    var _type = getType(value);
    for (i = 0, length = list.length; i < length; i++) {
      if (_type === 'RegExp') {
        if (typeof list[i] === 'string' && list[i].match(value)) {
          return true;
        }
      } else if (list[i] === value) {
        return true;
      }
    }

    return false;
  }

  function arraysEqual(one, two) {
    if (!isArray(one) || !isArray(two)) {
      return false;
    }

    // arrays can't be equal if they have different amount of content
    if (one.length !== two.length) {
      return false;
    }

    one.sort();
    two.sort();

    for (var i = 0, l = one.length; i < l; i++) {
      if (one[i] !== two[i]) {
        return false;
      }
    }

    return true;
  }

  function trimSlashes(text) {
    var trim_expression = /^\/+|\/+$/g;
    return text.replace(trim_expression, '');
  }

  URI._parts = function() {
    return {
      protocol: null,
      username: null,
      password: null,
      hostname: null,
      urn: null,
      port: null,
      path: null,
      query: null,
      fragment: null,
      // state
      duplicateQueryParameters: URI.duplicateQueryParameters,
      escapeQuerySpace: URI.escapeQuerySpace
    };
  };
  // state: allow duplicate query parameters (a=1&a=1)
  URI.duplicateQueryParameters = false;
  // state: replaces + with %20 (space in query strings)
  URI.escapeQuerySpace = true;
  // static properties
  URI.protocol_expression = /^[a-z][a-z0-9.+-]*$/i;
  URI.idn_expression = /[^a-z0-9\.-]/i;
  URI.punycode_expression = /(xn--)/i;
  // well, 333.444.555.666 matches, but it sure ain't no IPv4 - do we care?
  URI.ip4_expression = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
  // credits to Rich Brown
  // source: http://forums.intermapper.com/viewtopic.php?p=1096#1096
  // specification: http://www.ietf.org/rfc/rfc4291.txt
  URI.ip6_expression = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
  // expression used is "gruber revised" (@gruber v2) determined to be the
  // best solution in a regex-golf we did a couple of ages ago at
  // * http://mathiasbynens.be/demo/url-regex
  // * http://rodneyrehm.de/t/url-regex.html
  URI.find_uri_expression = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig;
  URI.findUri = {
    // valid "scheme://" or "www."
    start: /\b(?:([a-z][a-z0-9.+-]*:\/\/)|www\.)/gi,
    // everything up to the next whitespace
    end: /[\s\r\n]|$/,
    // trim trailing punctuation captured by end RegExp
    trim: /[`!()\[\]{};:'".,<>?«»“”„‘’]+$/,
    // balanced parens inclusion (), [], {}, <>
    parens: /(\([^\)]*\)|\[[^\]]*\]|\{[^}]*\}|<[^>]*>)/g,
  };
  // http://www.iana.org/assignments/uri-schemes.html
  // http://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers#Well-known_ports
  URI.defaultPorts = {
    http: '80',
    https: '443',
    ftp: '21',
    gopher: '70',
    ws: '80',
    wss: '443'
  };
  // allowed hostname characters according to RFC 3986
  // ALPHA DIGIT "-" "." "_" "~" "!" "$" "&" "'" "(" ")" "*" "+" "," ";" "=" %encoded
  // I've never seen a (non-IDN) hostname other than: ALPHA DIGIT . -
  URI.invalid_hostname_characters = /[^a-zA-Z0-9\.-]/;
  // map DOM Elements to their URI attribute
  URI.domAttributes = {
    'a': 'href',
    'blockquote': 'cite',
    'link': 'href',
    'base': 'href',
    'script': 'src',
    'form': 'action',
    'img': 'src',
    'area': 'href',
    'iframe': 'src',
    'embed': 'src',
    'source': 'src',
    'track': 'src',
    'input': 'src', // but only if type="image"
    'audio': 'src',
    'video': 'src'
  };
  URI.getDomAttribute = function(node) {
    if (!node || !node.nodeName) {
      return undefined;
    }

    var nodeName = node.nodeName.toLowerCase();
    // <input> should only expose src for type="image"
    if (nodeName === 'input' && node.type !== 'image') {
      return undefined;
    }

    return URI.domAttributes[nodeName];
  };

  function escapeForDumbFirefox36(value) {
    // https://github.com/medialize/URI.js/issues/91
    return escape(value);
  }

  // encoding / decoding according to RFC3986
  function strictEncodeURIComponent(string) {
    // see https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/encodeURIComponent
    return encodeURIComponent(string)
      .replace(/[!'()*]/g, escapeForDumbFirefox36)
      .replace(/\*/g, '%2A');
  }
  URI.encode = strictEncodeURIComponent;
  URI.decode = decodeURIComponent;
  URI.iso8859 = function() {
    URI.encode = escape;
    URI.decode = unescape;
  };
  URI.unicode = function() {
    URI.encode = strictEncodeURIComponent;
    URI.decode = decodeURIComponent;
  };
  URI.characters = {
    pathname: {
      encode: {
        // RFC3986 2.1: For consistency, URI producers and normalizers should
        // use uppercase hexadecimal digits for all percent-encodings.
        expression: /%(24|26|2B|2C|3B|3D|3A|40)/ig,
        map: {
          // -._~!'()*
          '%24': '$',
          '%26': '&',
          '%2B': '+',
          '%2C': ',',
          '%3B': ';',
          '%3D': '=',
          '%3A': ':',
          '%40': '@'
        }
      },
      decode: {
        expression: /[\/\?#]/g,
        map: {
          '/': '%2F',
          '?': '%3F',
          '#': '%23'
        }
      }
    },
    reserved: {
      encode: {
        // RFC3986 2.1: For consistency, URI producers and normalizers should
        // use uppercase hexadecimal digits for all percent-encodings.
        expression: /%(21|23|24|26|27|28|29|2A|2B|2C|2F|3A|3B|3D|3F|40|5B|5D)/ig,
        map: {
          // gen-delims
          '%3A': ':',
          '%2F': '/',
          '%3F': '?',
          '%23': '#',
          '%5B': '[',
          '%5D': ']',
          '%40': '@',
          // sub-delims
          '%21': '!',
          '%24': '$',
          '%26': '&',
          '%27': '\'',
          '%28': '(',
          '%29': ')',
          '%2A': '*',
          '%2B': '+',
          '%2C': ',',
          '%3B': ';',
          '%3D': '='
        }
      }
    },
    urnpath: {
      // The characters under `encode` are the characters called out by RFC 2141 as being acceptable
      // for usage in a URN. RFC2141 also calls out "-", ".", and "_" as acceptable characters, but
      // these aren't encoded by encodeURIComponent, so we don't have to call them out here. Also
      // note that the colon character is not featured in the encoding map; this is because URI.js
      // gives the colons in URNs semantic meaning as the delimiters of path segements, and so it
      // should not appear unencoded in a segment itself.
      // See also the note above about RFC3986 and capitalalized hex digits.
      encode: {
        expression: /%(21|24|27|28|29|2A|2B|2C|3B|3D|40)/ig,
        map: {
          '%21': '!',
          '%24': '$',
          '%27': '\'',
          '%28': '(',
          '%29': ')',
          '%2A': '*',
          '%2B': '+',
          '%2C': ',',
          '%3B': ';',
          '%3D': '=',
          '%40': '@'
        }
      },
      // These characters are the characters called out by RFC2141 as "reserved" characters that
      // should never appear in a URN, plus the colon character (see note above).
      decode: {
        expression: /[\/\?#:]/g,
        map: {
          '/': '%2F',
          '?': '%3F',
          '#': '%23',
          ':': '%3A'
        }
      }
    }
  };
  URI.encodeQuery = function(string, escapeQuerySpace) {
    var escaped = URI.encode(string + '');
    if (escapeQuerySpace === undefined) {
      escapeQuerySpace = URI.escapeQuerySpace;
    }

    return escapeQuerySpace ? escaped.replace(/%20/g, '+') : escaped;
  };
  URI.decodeQuery = function(string, escapeQuerySpace) {
    string += '';
    if (escapeQuerySpace === undefined) {
      escapeQuerySpace = URI.escapeQuerySpace;
    }

    try {
      return URI.decode(escapeQuerySpace ? string.replace(/\+/g, '%20') : string);
    } catch(e) {
      // we're not going to mess with weird encodings,
      // give up and return the undecoded original string
      // see https://github.com/medialize/URI.js/issues/87
      // see https://github.com/medialize/URI.js/issues/92
      return string;
    }
  };
  // generate encode/decode path functions
  var _parts = {'encode':'encode', 'decode':'decode'};
  var _part;
  var generateAccessor = function(_group, _part) {
    return function(string) {
      try {
        return URI[_part](string + '').replace(URI.characters[_group][_part].expression, function(c) {
          return URI.characters[_group][_part].map[c];
        });
      } catch (e) {
        // we're not going to mess with weird encodings,
        // give up and return the undecoded original string
        // see https://github.com/medialize/URI.js/issues/87
        // see https://github.com/medialize/URI.js/issues/92
        return string;
      }
    };
  };

  for (_part in _parts) {
    URI[_part + 'PathSegment'] = generateAccessor('pathname', _parts[_part]);
    URI[_part + 'UrnPathSegment'] = generateAccessor('urnpath', _parts[_part]);
  }

  var generateSegmentedPathFunction = function(_sep, _codingFuncName, _innerCodingFuncName) {
    return function(string) {
      // Why pass in names of functions, rather than the function objects themselves? The
      // definitions of some functions (but in particular, URI.decode) will occasionally change due
      // to URI.js having ISO8859 and Unicode modes. Passing in the name and getting it will ensure
      // that the functions we use here are "fresh".
      var actualCodingFunc;
      if (!_innerCodingFuncName) {
        actualCodingFunc = URI[_codingFuncName];
      } else {
        actualCodingFunc = function(string) {
          return URI[_codingFuncName](URI[_innerCodingFuncName](string));
        };
      }

      var segments = (string + '').split(_sep);

      for (var i = 0, length = segments.length; i < length; i++) {
        segments[i] = actualCodingFunc(segments[i]);
      }

      return segments.join(_sep);
    };
  };

  // This takes place outside the above loop because we don't want, e.g., encodeUrnPath functions.
  URI.decodePath = generateSegmentedPathFunction('/', 'decodePathSegment');
  URI.decodeUrnPath = generateSegmentedPathFunction(':', 'decodeUrnPathSegment');
  URI.recodePath = generateSegmentedPathFunction('/', 'encodePathSegment', 'decode');
  URI.recodeUrnPath = generateSegmentedPathFunction(':', 'encodeUrnPathSegment', 'decode');

  URI.encodeReserved = generateAccessor('reserved', 'encode');

  URI.parse = function(string, parts) {
    var pos;
    if (!parts) {
      parts = {};
    }
    // [protocol"://"[username[":"password]"@"]hostname[":"port]"/"?][path]["?"querystring]["#"fragment]

    // extract fragment
    pos = string.indexOf('#');
    if (pos > -1) {
      // escaping?
      parts.fragment = string.substring(pos + 1) || null;
      string = string.substring(0, pos);
    }

    // extract query
    pos = string.indexOf('?');
    if (pos > -1) {
      // escaping?
      parts.query = string.substring(pos + 1) || null;
      string = string.substring(0, pos);
    }

    // extract protocol
    if (string.substring(0, 2) === '//') {
      // relative-scheme
      parts.protocol = null;
      string = string.substring(2);
      // extract "user:pass@host:port"
      string = URI.parseAuthority(string, parts);
    } else {
      pos = string.indexOf(':');
      if (pos > -1) {
        parts.protocol = string.substring(0, pos) || null;
        if (parts.protocol && !parts.protocol.match(URI.protocol_expression)) {
          // : may be within the path
          parts.protocol = undefined;
        } else if (string.substring(pos + 1, pos + 3) === '//') {
          string = string.substring(pos + 3);

          // extract "user:pass@host:port"
          string = URI.parseAuthority(string, parts);
        } else {
          string = string.substring(pos + 1);
          parts.urn = true;
        }
      }
    }

    // what's left must be the path
    parts.path = string;

    // and we're done
    return parts;
  };
  URI.parseHost = function(string, parts) {
    // Copy chrome, IE, opera backslash-handling behavior.
    // Back slashes before the query string get converted to forward slashes
    // See: https://github.com/joyent/node/blob/386fd24f49b0e9d1a8a076592a404168faeecc34/lib/url.js#L115-L124
    // See: https://code.google.com/p/chromium/issues/detail?id=25916
    // https://github.com/medialize/URI.js/pull/233
    string = string.replace(/\\/g, '/');

    // extract host:port
    var pos = string.indexOf('/');
    var bracketPos;
    var t;

    if (pos === -1) {
      pos = string.length;
    }

    if (string.charAt(0) === '[') {
      // IPv6 host - http://tools.ietf.org/html/draft-ietf-6man-text-addr-representation-04#section-6
      // I claim most client software breaks on IPv6 anyways. To simplify things, URI only accepts
      // IPv6+port in the format [2001:db8::1]:80 (for the time being)
      bracketPos = string.indexOf(']');
      parts.hostname = string.substring(1, bracketPos) || null;
      parts.port = string.substring(bracketPos + 2, pos) || null;
      if (parts.port === '/') {
        parts.port = null;
      }
    } else {
      var firstColon = string.indexOf(':');
      var firstSlash = string.indexOf('/');
      var nextColon = string.indexOf(':', firstColon + 1);
      if (nextColon !== -1 && (firstSlash === -1 || nextColon < firstSlash)) {
        // IPv6 host contains multiple colons - but no port
        // this notation is actually not allowed by RFC 3986, but we're a liberal parser
        parts.hostname = string.substring(0, pos) || null;
        parts.port = null;
      } else {
        t = string.substring(0, pos).split(':');
        parts.hostname = t[0] || null;
        parts.port = t[1] || null;
      }
    }

    if (parts.hostname && string.substring(pos).charAt(0) !== '/') {
      pos++;
      string = '/' + string;
    }

    return string.substring(pos) || '/';
  };
  URI.parseAuthority = function(string, parts) {
    string = URI.parseUserinfo(string, parts);
    return URI.parseHost(string, parts);
  };
  URI.parseUserinfo = function(string, parts) {
    // extract username:password
    var firstSlash = string.indexOf('/');
    var pos = string.lastIndexOf('@', firstSlash > -1 ? firstSlash : string.length - 1);
    var t;

    // authority@ must come before /path
    if (pos > -1 && (firstSlash === -1 || pos < firstSlash)) {
      t = string.substring(0, pos).split(':');
      parts.username = t[0] ? URI.decode(t[0]) : null;
      t.shift();
      parts.password = t[0] ? URI.decode(t.join(':')) : null;
      string = string.substring(pos + 1);
    } else {
      parts.username = null;
      parts.password = null;
    }

    return string;
  };
  URI.parseQuery = function(string, escapeQuerySpace) {
    if (!string) {
      return {};
    }

    // throw out the funky business - "?"[name"="value"&"]+
    string = string.replace(/&+/g, '&').replace(/^\?*&*|&+$/g, '');

    if (!string) {
      return {};
    }

    var items = {};
    var splits = string.split('&');
    var length = splits.length;
    var v, name, value;

    for (var i = 0; i < length; i++) {
      v = splits[i].split('=');
      name = URI.decodeQuery(v.shift(), escapeQuerySpace);
      // no "=" is null according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#collect-url-parameters
      value = v.length ? URI.decodeQuery(v.join('='), escapeQuerySpace) : null;

      if (hasOwn.call(items, name)) {
        if (typeof items[name] === 'string' || items[name] === null) {
          items[name] = [items[name]];
        }

        items[name].push(value);
      } else {
        items[name] = value;
      }
    }

    return items;
  };

  URI.build = function(parts) {
    var t = '';

    if (parts.protocol) {
      t += parts.protocol + ':';
    }

    if (!parts.urn && (t || parts.hostname)) {
      t += '//';
    }

    t += (URI.buildAuthority(parts) || '');

    if (typeof parts.path === 'string') {
      if (parts.path.charAt(0) !== '/' && typeof parts.hostname === 'string') {
        t += '/';
      }

      t += parts.path;
    }

    if (typeof parts.query === 'string' && parts.query) {
      t += '?' + parts.query;
    }

    if (typeof parts.fragment === 'string' && parts.fragment) {
      t += '#' + parts.fragment;
    }
    return t;
  };
  URI.buildHost = function(parts) {
    var t = '';

    if (!parts.hostname) {
      return '';
    } else if (URI.ip6_expression.test(parts.hostname)) {
      t += '[' + parts.hostname + ']';
    } else {
      t += parts.hostname;
    }

    if (parts.port) {
      t += ':' + parts.port;
    }

    return t;
  };
  URI.buildAuthority = function(parts) {
    return URI.buildUserinfo(parts) + URI.buildHost(parts);
  };
  URI.buildUserinfo = function(parts) {
    var t = '';

    if (parts.username) {
      t += URI.encode(parts.username);
    }

    if (parts.password) {
      t += ':' + URI.encode(parts.password);
    }

    if (t) {
      t += '@';
    }

    return t;
  };
  URI.buildQuery = function(data, duplicateQueryParameters, escapeQuerySpace) {
    // according to http://tools.ietf.org/html/rfc3986 or http://labs.apache.org/webarch/uri/rfc/rfc3986.html
    // being »-._~!$&'()*+,;=:@/?« %HEX and alnum are allowed
    // the RFC explicitly states ?/foo being a valid use case, no mention of parameter syntax!
    // URI.js treats the query string as being application/x-www-form-urlencoded
    // see http://www.w3.org/TR/REC-html40/interact/forms.html#form-content-type

    var t = '';
    var unique, key, i, length;
    for (key in data) {
      if (hasOwn.call(data, key) && key) {
        if (isArray(data[key])) {
          unique = {};
          for (i = 0, length = data[key].length; i < length; i++) {
            if (data[key][i] !== undefined && unique[data[key][i] + ''] === undefined) {
              t += '&' + URI.buildQueryParameter(key, data[key][i], escapeQuerySpace);
              if (duplicateQueryParameters !== true) {
                unique[data[key][i] + ''] = true;
              }
            }
          }
        } else if (data[key] !== undefined) {
          t += '&' + URI.buildQueryParameter(key, data[key], escapeQuerySpace);
        }
      }
    }

    return t.substring(1);
  };
  URI.buildQueryParameter = function(name, value, escapeQuerySpace) {
    // http://www.w3.org/TR/REC-html40/interact/forms.html#form-content-type -- application/x-www-form-urlencoded
    // don't append "=" for null values, according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#url-parameter-serialization
    return URI.encodeQuery(name, escapeQuerySpace) + (value !== null ? '=' + URI.encodeQuery(value, escapeQuerySpace) : '');
  };

  URI.addQuery = function(data, name, value) {
    if (typeof name === 'object') {
      for (var key in name) {
        if (hasOwn.call(name, key)) {
          URI.addQuery(data, key, name[key]);
        }
      }
    } else if (typeof name === 'string') {
      if (data[name] === undefined) {
        data[name] = value;
        return;
      } else if (typeof data[name] === 'string') {
        data[name] = [data[name]];
      }

      if (!isArray(value)) {
        value = [value];
      }

      data[name] = (data[name] || []).concat(value);
    } else {
      throw new TypeError('URI.addQuery() accepts an object, string as the name parameter');
    }
  };
  URI.removeQuery = function(data, name, value) {
    var i, length, key;

    if (isArray(name)) {
      for (i = 0, length = name.length; i < length; i++) {
        data[name[i]] = undefined;
      }
    } else if (getType(name) === 'RegExp') {
      for (key in data) {
        if (name.test(key)) {
          data[key] = undefined;
        }
      }
    } else if (typeof name === 'object') {
      for (key in name) {
        if (hasOwn.call(name, key)) {
          URI.removeQuery(data, key, name[key]);
        }
      }
    } else if (typeof name === 'string') {
      if (value !== undefined) {
        if (getType(value) === 'RegExp') {
          if (!isArray(data[name]) && value.test(data[name])) {
            data[name] = undefined;
          } else {
            data[name] = filterArrayValues(data[name], value);
          }
        } else if (data[name] === String(value) && (!isArray(value) || value.length === 1)) {
          data[name] = undefined;
        } else if (isArray(data[name])) {
          data[name] = filterArrayValues(data[name], value);
        }
      } else {
        data[name] = undefined;
      }
    } else {
      throw new TypeError('URI.removeQuery() accepts an object, string, RegExp as the first parameter');
    }
  };
  URI.hasQuery = function(data, name, value, withinArray) {
    switch (getType(name)) {
      case 'String':
        // Nothing to do here
        break;

      case 'RegExp':
        for (var key in data) {
          if (hasOwn.call(data, key)) {
            if (name.test(key) && (value === undefined || URI.hasQuery(data, key, value))) {
              return true;
            }
          }
        }

        return false;

      case 'Object':
        for (var _key in name) {
          if (hasOwn.call(name, _key)) {
            if (!URI.hasQuery(data, _key, name[_key])) {
              return false;
            }
          }
        }

        return true;

      default:
        throw new TypeError('URI.hasQuery() accepts a string, regular expression or object as the name parameter');
    }

    switch (getType(value)) {
      case 'Undefined':
        // true if exists (but may be empty)
        return name in data; // data[name] !== undefined;

      case 'Boolean':
        // true if exists and non-empty
        var _booly = Boolean(isArray(data[name]) ? data[name].length : data[name]);
        return value === _booly;

      case 'Function':
        // allow complex comparison
        return !!value(data[name], name, data);

      case 'Array':
        if (!isArray(data[name])) {
          return false;
        }

        var op = withinArray ? arrayContains : arraysEqual;
        return op(data[name], value);

      case 'RegExp':
        if (!isArray(data[name])) {
          return Boolean(data[name] && data[name].match(value));
        }

        if (!withinArray) {
          return false;
        }

        return arrayContains(data[name], value);

      case 'Number':
        value = String(value);
        /* falls through */
      case 'String':
        if (!isArray(data[name])) {
          return data[name] === value;
        }

        if (!withinArray) {
          return false;
        }

        return arrayContains(data[name], value);

      default:
        throw new TypeError('URI.hasQuery() accepts undefined, boolean, string, number, RegExp, Function as the value parameter');
    }
  };


  URI.joinPaths = function() {
    var input = [];
    var segments = [];
    var nonEmptySegments = 0;

    for (var i = 0; i < arguments.length; i++) {
      var url = new URI(arguments[i]);
      input.push(url);
      var _segments = url.segment();
      for (var s = 0; s < _segments.length; s++) {
        if (typeof _segments[s] === 'string') {
          segments.push(_segments[s]);
        }

        if (_segments[s]) {
          nonEmptySegments++;
        }
      }
    }

    if (!segments.length || !nonEmptySegments) {
      return new URI('');
    }

    var uri = new URI('').segment(segments);

    if (input[0].path() === '' || input[0].path().slice(0, 1) === '/') {
      uri.path('/' + uri.path());
    }

    return uri.normalize();
  };

  URI.commonPath = function(one, two) {
    var length = Math.min(one.length, two.length);
    var pos;

    // find first non-matching character
    for (pos = 0; pos < length; pos++) {
      if (one.charAt(pos) !== two.charAt(pos)) {
        pos--;
        break;
      }
    }

    if (pos < 1) {
      return one.charAt(0) === two.charAt(0) && one.charAt(0) === '/' ? '/' : '';
    }

    // revert to last /
    if (one.charAt(pos) !== '/' || two.charAt(pos) !== '/') {
      pos = one.substring(0, pos).lastIndexOf('/');
    }

    return one.substring(0, pos + 1);
  };

  URI.withinString = function(string, callback, options) {
    options || (options = {});
    var _start = options.start || URI.findUri.start;
    var _end = options.end || URI.findUri.end;
    var _trim = options.trim || URI.findUri.trim;
    var _parens = options.parens || URI.findUri.parens;
    var _attributeOpen = /[a-z0-9-]=["']?$/i;

    _start.lastIndex = 0;
    while (true) {
      var match = _start.exec(string);
      if (!match) {
        break;
      }

      var start = match.index;
      if (options.ignoreHtml) {
        // attribut(e=["']?$)
        var attributeOpen = string.slice(Math.max(start - 3, 0), start);
        if (attributeOpen && _attributeOpen.test(attributeOpen)) {
          continue;
        }
      }

      var end = start + string.slice(start).search(_end);
      var slice = string.slice(start, end);
      // make sure we include well balanced parens
      var parensEnd = -1;
      while (true) {
        var parensMatch = _parens.exec(slice);
        if (!parensMatch) {
          break;
        }

        var parensMatchEnd = parensMatch.index + parensMatch[0].length;
        parensEnd = Math.max(parensEnd, parensMatchEnd);
      }

      if (parensEnd > -1) {
        slice = slice.slice(0, parensEnd) + slice.slice(parensEnd).replace(_trim, '');
      } else {
        slice = slice.replace(_trim, '');
      }

      if (slice.length <= match[0].length) {
        // the extract only contains the starting marker of a URI,
        // e.g. "www" or "http://"
        continue;
      }

      if (options.ignore && options.ignore.test(slice)) {
        continue;
      }

      end = start + slice.length;
      var result = callback(slice, start, end, string);
      if (result === undefined) {
        _start.lastIndex = end;
        continue;
      }

      result = String(result);
      string = string.slice(0, start) + result + string.slice(end);
      _start.lastIndex = start + result.length;
    }

    _start.lastIndex = 0;
    return string;
  };

  URI.ensureValidHostname = function(v) {
    // Theoretically URIs allow percent-encoding in Hostnames (according to RFC 3986)
    // they are not part of DNS and therefore ignored by URI.js

    if (v.match(URI.invalid_hostname_characters)) {
      // test punycode
      if (!punycode) {
        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-] and Punycode.js is not available');
      }

      if (punycode.toASCII(v).match(URI.invalid_hostname_characters)) {
        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
      }
    }
  };

  // noConflict
  URI.noConflict = function(removeAll) {
    if (removeAll) {
      var unconflicted = {
        URI: this.noConflict()
      };

      if (root.URITemplate && typeof root.URITemplate.noConflict === 'function') {
        unconflicted.URITemplate = root.URITemplate.noConflict();
      }

      if (root.IPv6 && typeof root.IPv6.noConflict === 'function') {
        unconflicted.IPv6 = root.IPv6.noConflict();
      }

      if (root.SecondLevelDomains && typeof root.SecondLevelDomains.noConflict === 'function') {
        unconflicted.SecondLevelDomains = root.SecondLevelDomains.noConflict();
      }

      return unconflicted;
    } else if (root.URI === this) {
      root.URI = _URI;
    }

    return this;
  };

  p.build = function(deferBuild) {
    if (deferBuild === true) {
      this._deferred_build = true;
    } else if (deferBuild === undefined || this._deferred_build) {
      this._string = URI.build(this._parts);
      this._deferred_build = false;
    }

    return this;
  };

  p.clone = function() {
    return new URI(this);
  };

  p.valueOf = p.toString = function() {
    return this.build(false)._string;
  };


  function generateSimpleAccessor(_part){
    return function(v, build) {
      if (v === undefined) {
        return this._parts[_part] || '';
      } else {
        this._parts[_part] = v || null;
        this.build(!build);
        return this;
      }
    };
  }

  function generatePrefixAccessor(_part, _key){
    return function(v, build) {
      if (v === undefined) {
        return this._parts[_part] || '';
      } else {
        if (v !== null) {
          v = v + '';
          if (v.charAt(0) === _key) {
            v = v.substring(1);
          }
        }

        this._parts[_part] = v;
        this.build(!build);
        return this;
      }
    };
  }

  p.protocol = generateSimpleAccessor('protocol');
  p.username = generateSimpleAccessor('username');
  p.password = generateSimpleAccessor('password');
  p.hostname = generateSimpleAccessor('hostname');
  p.port = generateSimpleAccessor('port');
  p.query = generatePrefixAccessor('query', '?');
  p.fragment = generatePrefixAccessor('fragment', '#');

  p.search = function(v, build) {
    var t = this.query(v, build);
    return typeof t === 'string' && t.length ? ('?' + t) : t;
  };
  p.hash = function(v, build) {
    var t = this.fragment(v, build);
    return typeof t === 'string' && t.length ? ('#' + t) : t;
  };

  p.pathname = function(v, build) {
    if (v === undefined || v === true) {
      var res = this._parts.path || (this._parts.hostname ? '/' : '');
      return v ? (this._parts.urn ? URI.decodeUrnPath : URI.decodePath)(res) : res;
    } else {
      if (this._parts.urn) {
        this._parts.path = v ? URI.recodeUrnPath(v) : '';
      } else {
        this._parts.path = v ? URI.recodePath(v) : '/';
      }
      this.build(!build);
      return this;
    }
  };
  p.path = p.pathname;
  p.href = function(href, build) {
    var key;

    if (href === undefined) {
      return this.toString();
    }

    this._string = '';
    this._parts = URI._parts();

    var _URI = href instanceof URI;
    var _object = typeof href === 'object' && (href.hostname || href.path || href.pathname);
    if (href.nodeName) {
      var attribute = URI.getDomAttribute(href);
      href = href[attribute] || '';
      _object = false;
    }

    // window.location is reported to be an object, but it's not the sort
    // of object we're looking for:
    // * location.protocol ends with a colon
    // * location.query != object.search
    // * location.hash != object.fragment
    // simply serializing the unknown object should do the trick
    // (for location, not for everything...)
    if (!_URI && _object && href.pathname !== undefined) {
      href = href.toString();
    }

    if (typeof href === 'string' || href instanceof String) {
      this._parts = URI.parse(String(href), this._parts);
    } else if (_URI || _object) {
      var src = _URI ? href._parts : href;
      for (key in src) {
        if (hasOwn.call(this._parts, key)) {
          this._parts[key] = src[key];
        }
      }
    } else {
      throw new TypeError('invalid input');
    }

    this.build(!build);
    return this;
  };

  // identification accessors
  p.is = function(what) {
    var ip = false;
    var ip4 = false;
    var ip6 = false;
    var name = false;
    var sld = false;
    var idn = false;
    var punycode = false;
    var relative = !this._parts.urn;

    if (this._parts.hostname) {
      relative = false;
      ip4 = URI.ip4_expression.test(this._parts.hostname);
      ip6 = URI.ip6_expression.test(this._parts.hostname);
      ip = ip4 || ip6;
      name = !ip;
      sld = name && SLD && SLD.has(this._parts.hostname);
      idn = name && URI.idn_expression.test(this._parts.hostname);
      punycode = name && URI.punycode_expression.test(this._parts.hostname);
    }

    switch (what.toLowerCase()) {
      case 'relative':
        return relative;

      case 'absolute':
        return !relative;

      // hostname identification
      case 'domain':
      case 'name':
        return name;

      case 'sld':
        return sld;

      case 'ip':
        return ip;

      case 'ip4':
      case 'ipv4':
      case 'inet4':
        return ip4;

      case 'ip6':
      case 'ipv6':
      case 'inet6':
        return ip6;

      case 'idn':
        return idn;

      case 'url':
        return !this._parts.urn;

      case 'urn':
        return !!this._parts.urn;

      case 'punycode':
        return punycode;
    }

    return null;
  };

  // component specific input validation
  var _protocol = p.protocol;
  var _port = p.port;
  var _hostname = p.hostname;

  p.protocol = function(v, build) {
    if (v !== undefined) {
      if (v) {
        // accept trailing ://
        v = v.replace(/:(\/\/)?$/, '');

        if (!v.match(URI.protocol_expression)) {
          throw new TypeError('Protocol "' + v + '" contains characters other than [A-Z0-9.+-] or doesn\'t start with [A-Z]');
        }
      }
    }
    return _protocol.call(this, v, build);
  };
  p.scheme = p.protocol;
  p.port = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v !== undefined) {
      if (v === 0) {
        v = null;
      }

      if (v) {
        v += '';
        if (v.charAt(0) === ':') {
          v = v.substring(1);
        }

        if (v.match(/[^0-9]/)) {
          throw new TypeError('Port "' + v + '" contains characters other than [0-9]');
        }
      }
    }
    return _port.call(this, v, build);
  };
  p.hostname = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v !== undefined) {
      var x = {};
      var res = URI.parseHost(v, x);
      if (res !== '/') {
        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
      }

      v = x.hostname;
    }
    return _hostname.call(this, v, build);
  };

  // compound accessors
  p.origin = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v === undefined) {
      var protocol = this.protocol();
      var authority = this.authority();
      if (!authority) {
        return '';
      }

      return (protocol ? protocol + '://' : '') + this.authority();
    } else {
      var origin = URI(v);
      this
        .protocol(origin.protocol())
        .authority(origin.authority())
        .build(!build);
      return this;
    }
  };
  p.host = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v === undefined) {
      return this._parts.hostname ? URI.buildHost(this._parts) : '';
    } else {
      var res = URI.parseHost(v, this._parts);
      if (res !== '/') {
        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
      }

      this.build(!build);
      return this;
    }
  };
  p.authority = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v === undefined) {
      return this._parts.hostname ? URI.buildAuthority(this._parts) : '';
    } else {
      var res = URI.parseAuthority(v, this._parts);
      if (res !== '/') {
        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
      }

      this.build(!build);
      return this;
    }
  };
  p.userinfo = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v === undefined) {
      var t = URI.buildUserinfo(this._parts);
      return t ? t.substring(0, t.length -1) : t;
    } else {
      if (v[v.length-1] !== '@') {
        v += '@';
      }

      URI.parseUserinfo(v, this._parts);
      this.build(!build);
      return this;
    }
  };
  p.resource = function(v, build) {
    var parts;

    if (v === undefined) {
      return this.path() + this.search() + this.hash();
    }

    parts = URI.parse(v);
    this._parts.path = parts.path;
    this._parts.query = parts.query;
    this._parts.fragment = parts.fragment;
    this.build(!build);
    return this;
  };

  // fraction accessors
  p.subdomain = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    // convenience, return "www" from "www.example.org"
    if (v === undefined) {
      if (!this._parts.hostname || this.is('IP')) {
        return '';
      }

      // grab domain and add another segment
      var end = this._parts.hostname.length - this.domain().length - 1;
      return this._parts.hostname.substring(0, end) || '';
    } else {
      var e = this._parts.hostname.length - this.domain().length;
      var sub = this._parts.hostname.substring(0, e);
      var replace = new RegExp('^' + escapeRegEx(sub));

      if (v && v.charAt(v.length - 1) !== '.') {
        v += '.';
      }

      if (v) {
        URI.ensureValidHostname(v);
      }

      this._parts.hostname = this._parts.hostname.replace(replace, v);
      this.build(!build);
      return this;
    }
  };
  p.domain = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (typeof v === 'boolean') {
      build = v;
      v = undefined;
    }

    // convenience, return "example.org" from "www.example.org"
    if (v === undefined) {
      if (!this._parts.hostname || this.is('IP')) {
        return '';
      }

      // if hostname consists of 1 or 2 segments, it must be the domain
      var t = this._parts.hostname.match(/\./g);
      if (t && t.length < 2) {
        return this._parts.hostname;
      }

      // grab tld and add another segment
      var end = this._parts.hostname.length - this.tld(build).length - 1;
      end = this._parts.hostname.lastIndexOf('.', end -1) + 1;
      return this._parts.hostname.substring(end) || '';
    } else {
      if (!v) {
        throw new TypeError('cannot set domain empty');
      }

      URI.ensureValidHostname(v);

      if (!this._parts.hostname || this.is('IP')) {
        this._parts.hostname = v;
      } else {
        var replace = new RegExp(escapeRegEx(this.domain()) + '$');
        this._parts.hostname = this._parts.hostname.replace(replace, v);
      }

      this.build(!build);
      return this;
    }
  };
  p.tld = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (typeof v === 'boolean') {
      build = v;
      v = undefined;
    }

    // return "org" from "www.example.org"
    if (v === undefined) {
      if (!this._parts.hostname || this.is('IP')) {
        return '';
      }

      var pos = this._parts.hostname.lastIndexOf('.');
      var tld = this._parts.hostname.substring(pos + 1);

      if (build !== true && SLD && SLD.list[tld.toLowerCase()]) {
        return SLD.get(this._parts.hostname) || tld;
      }

      return tld;
    } else {
      var replace;

      if (!v) {
        throw new TypeError('cannot set TLD empty');
      } else if (v.match(/[^a-zA-Z0-9-]/)) {
        if (SLD && SLD.is(v)) {
          replace = new RegExp(escapeRegEx(this.tld()) + '$');
          this._parts.hostname = this._parts.hostname.replace(replace, v);
        } else {
          throw new TypeError('TLD "' + v + '" contains characters other than [A-Z0-9]');
        }
      } else if (!this._parts.hostname || this.is('IP')) {
        throw new ReferenceError('cannot set TLD on non-domain host');
      } else {
        replace = new RegExp(escapeRegEx(this.tld()) + '$');
        this._parts.hostname = this._parts.hostname.replace(replace, v);
      }

      this.build(!build);
      return this;
    }
  };
  p.directory = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v === undefined || v === true) {
      if (!this._parts.path && !this._parts.hostname) {
        return '';
      }

      if (this._parts.path === '/') {
        return '/';
      }

      var end = this._parts.path.length - this.filename().length - 1;
      var res = this._parts.path.substring(0, end) || (this._parts.hostname ? '/' : '');

      return v ? URI.decodePath(res) : res;

    } else {
      var e = this._parts.path.length - this.filename().length;
      var directory = this._parts.path.substring(0, e);
      var replace = new RegExp('^' + escapeRegEx(directory));

      // fully qualifier directories begin with a slash
      if (!this.is('relative')) {
        if (!v) {
          v = '/';
        }

        if (v.charAt(0) !== '/') {
          v = '/' + v;
        }
      }

      // directories always end with a slash
      if (v && v.charAt(v.length - 1) !== '/') {
        v += '/';
      }

      v = URI.recodePath(v);
      this._parts.path = this._parts.path.replace(replace, v);
      this.build(!build);
      return this;
    }
  };
  p.filename = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (typeof v !== 'string') {
      if (!this._parts.path || this._parts.path === '/') {
        return '';
      }

      var pos = this._parts.path.lastIndexOf('/');
      var res = this._parts.path.substring(pos+1);

      return v ? URI.decodePathSegment(res) : res;
    } else {
      var mutatedDirectory = false;

      if (v.charAt(0) === '/') {
        v = v.substring(1);
      }

      if (v.match(/\.?\//)) {
        mutatedDirectory = true;
      }

      var replace = new RegExp(escapeRegEx(this.filename()) + '$');
      v = URI.recodePath(v);
      this._parts.path = this._parts.path.replace(replace, v);

      if (mutatedDirectory) {
        this.normalizePath(build);
      } else {
        this.build(!build);
      }

      return this;
    }
  };
  p.suffix = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v === undefined || v === true) {
      if (!this._parts.path || this._parts.path === '/') {
        return '';
      }

      var filename = this.filename();
      var pos = filename.lastIndexOf('.');
      var s, res;

      if (pos === -1) {
        return '';
      }

      // suffix may only contain alnum characters (yup, I made this up.)
      s = filename.substring(pos+1);
      res = (/^[a-z0-9%]+$/i).test(s) ? s : '';
      return v ? URI.decodePathSegment(res) : res;
    } else {
      if (v.charAt(0) === '.') {
        v = v.substring(1);
      }

      var suffix = this.suffix();
      var replace;

      if (!suffix) {
        if (!v) {
          return this;
        }

        this._parts.path += '.' + URI.recodePath(v);
      } else if (!v) {
        replace = new RegExp(escapeRegEx('.' + suffix) + '$');
      } else {
        replace = new RegExp(escapeRegEx(suffix) + '$');
      }

      if (replace) {
        v = URI.recodePath(v);
        this._parts.path = this._parts.path.replace(replace, v);
      }

      this.build(!build);
      return this;
    }
  };
  p.segment = function(segment, v, build) {
    var separator = this._parts.urn ? ':' : '/';
    var path = this.path();
    var absolute = path.substring(0, 1) === '/';
    var segments = path.split(separator);

    if (segment !== undefined && typeof segment !== 'number') {
      build = v;
      v = segment;
      segment = undefined;
    }

    if (segment !== undefined && typeof segment !== 'number') {
      throw new Error('Bad segment "' + segment + '", must be 0-based integer');
    }

    if (absolute) {
      segments.shift();
    }

    if (segment < 0) {
      // allow negative indexes to address from the end
      segment = Math.max(segments.length + segment, 0);
    }

    if (v === undefined) {
      /*jshint laxbreak: true */
      return segment === undefined
        ? segments
        : segments[segment];
      /*jshint laxbreak: false */
    } else if (segment === null || segments[segment] === undefined) {
      if (isArray(v)) {
        segments = [];
        // collapse empty elements within array
        for (var i=0, l=v.length; i < l; i++) {
          if (!v[i].length && (!segments.length || !segments[segments.length -1].length)) {
            continue;
          }

          if (segments.length && !segments[segments.length -1].length) {
            segments.pop();
          }

          segments.push(trimSlashes(v[i]));
        }
      } else if (v || typeof v === 'string') {
        v = trimSlashes(v);
        if (segments[segments.length -1] === '') {
          // empty trailing elements have to be overwritten
          // to prevent results such as /foo//bar
          segments[segments.length -1] = v;
        } else {
          segments.push(v);
        }
      }
    } else {
      if (v) {
        segments[segment] = trimSlashes(v);
      } else {
        segments.splice(segment, 1);
      }
    }

    if (absolute) {
      segments.unshift('');
    }

    return this.path(segments.join(separator), build);
  };
  p.segmentCoded = function(segment, v, build) {
    var segments, i, l;

    if (typeof segment !== 'number') {
      build = v;
      v = segment;
      segment = undefined;
    }

    if (v === undefined) {
      segments = this.segment(segment, v, build);
      if (!isArray(segments)) {
        segments = segments !== undefined ? URI.decode(segments) : undefined;
      } else {
        for (i = 0, l = segments.length; i < l; i++) {
          segments[i] = URI.decode(segments[i]);
        }
      }

      return segments;
    }

    if (!isArray(v)) {
      v = (typeof v === 'string' || v instanceof String) ? URI.encode(v) : v;
    } else {
      for (i = 0, l = v.length; i < l; i++) {
        v[i] = URI.encode(v[i]);
      }
    }

    return this.segment(segment, v, build);
  };

  // mutating query string
  var q = p.query;
  p.query = function(v, build) {
    if (v === true) {
      return URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    } else if (typeof v === 'function') {
      var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
      var result = v.call(this, data);
      this._parts.query = URI.buildQuery(result || data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
      this.build(!build);
      return this;
    } else if (v !== undefined && typeof v !== 'string') {
      this._parts.query = URI.buildQuery(v, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
      this.build(!build);
      return this;
    } else {
      return q.call(this, v, build);
    }
  };
  p.setQuery = function(name, value, build) {
    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);

    if (typeof name === 'string' || name instanceof String) {
      data[name] = value !== undefined ? value : null;
    } else if (typeof name === 'object') {
      for (var key in name) {
        if (hasOwn.call(name, key)) {
          data[key] = name[key];
        }
      }
    } else {
      throw new TypeError('URI.addQuery() accepts an object, string as the name parameter');
    }

    this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
    if (typeof name !== 'string') {
      build = value;
    }

    this.build(!build);
    return this;
  };
  p.addQuery = function(name, value, build) {
    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    URI.addQuery(data, name, value === undefined ? null : value);
    this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
    if (typeof name !== 'string') {
      build = value;
    }

    this.build(!build);
    return this;
  };
  p.removeQuery = function(name, value, build) {
    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    URI.removeQuery(data, name, value);
    this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
    if (typeof name !== 'string') {
      build = value;
    }

    this.build(!build);
    return this;
  };
  p.hasQuery = function(name, value, withinArray) {
    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    return URI.hasQuery(data, name, value, withinArray);
  };
  p.setSearch = p.setQuery;
  p.addSearch = p.addQuery;
  p.removeSearch = p.removeQuery;
  p.hasSearch = p.hasQuery;

  // sanitizing URLs
  p.normalize = function() {
    if (this._parts.urn) {
      return this
        .normalizeProtocol(false)
        .normalizePath(false)
        .normalizeQuery(false)
        .normalizeFragment(false)
        .build();
    }

    return this
      .normalizeProtocol(false)
      .normalizeHostname(false)
      .normalizePort(false)
      .normalizePath(false)
      .normalizeQuery(false)
      .normalizeFragment(false)
      .build();
  };
  p.normalizeProtocol = function(build) {
    if (typeof this._parts.protocol === 'string') {
      this._parts.protocol = this._parts.protocol.toLowerCase();
      this.build(!build);
    }

    return this;
  };
  p.normalizeHostname = function(build) {
    if (this._parts.hostname) {
      if (this.is('IDN') && punycode) {
        this._parts.hostname = punycode.toASCII(this._parts.hostname);
      } else if (this.is('IPv6') && IPv6) {
        this._parts.hostname = IPv6.best(this._parts.hostname);
      }

      this._parts.hostname = this._parts.hostname.toLowerCase();
      this.build(!build);
    }

    return this;
  };
  p.normalizePort = function(build) {
    // remove port of it's the protocol's default
    if (typeof this._parts.protocol === 'string' && this._parts.port === URI.defaultPorts[this._parts.protocol]) {
      this._parts.port = null;
      this.build(!build);
    }

    return this;
  };
  p.normalizePath = function(build) {
    var _path = this._parts.path;
    if (!_path) {
      return this;
    }

    if (this._parts.urn) {
      this._parts.path = URI.recodeUrnPath(this._parts.path);
      this.build(!build);
      return this;
    }

    if (this._parts.path === '/') {
      return this;
    }

    _path = URI.recodePath(_path);

    var _was_relative;
    var _leadingParents = '';
    var _parent, _pos;

    // handle relative paths
    if (_path.charAt(0) !== '/') {
      _was_relative = true;
      _path = '/' + _path;
    }

    // handle relative files (as opposed to directories)
    if (_path.slice(-3) === '/..' || _path.slice(-2) === '/.') {
      _path += '/';
    }

    // resolve simples
    _path = _path
      .replace(/(\/(\.\/)+)|(\/\.$)/g, '/')
      .replace(/\/{2,}/g, '/');

    // remember leading parents
    if (_was_relative) {
      _leadingParents = _path.substring(1).match(/^(\.\.\/)+/) || '';
      if (_leadingParents) {
        _leadingParents = _leadingParents[0];
      }
    }

    // resolve parents
    while (true) {
      _parent = _path.search(/\/\.\.(\/|$)/);
      if (_parent === -1) {
        // no more ../ to resolve
        break;
      } else if (_parent === 0) {
        // top level cannot be relative, skip it
        _path = _path.substring(3);
        continue;
      }

      _pos = _path.substring(0, _parent).lastIndexOf('/');
      if (_pos === -1) {
        _pos = _parent;
      }
      _path = _path.substring(0, _pos) + _path.substring(_parent + 3);
    }

    // revert to relative
    if (_was_relative && this.is('relative')) {
      _path = _leadingParents + _path.substring(1);
    }

    this._parts.path = _path;
    this.build(!build);
    return this;
  };
  p.normalizePathname = p.normalizePath;
  p.normalizeQuery = function(build) {
    if (typeof this._parts.query === 'string') {
      if (!this._parts.query.length) {
        this._parts.query = null;
      } else {
        this.query(URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace));
      }

      this.build(!build);
    }

    return this;
  };
  p.normalizeFragment = function(build) {
    if (!this._parts.fragment) {
      this._parts.fragment = null;
      this.build(!build);
    }

    return this;
  };
  p.normalizeSearch = p.normalizeQuery;
  p.normalizeHash = p.normalizeFragment;

  p.iso8859 = function() {
    // expect unicode input, iso8859 output
    var e = URI.encode;
    var d = URI.decode;

    URI.encode = escape;
    URI.decode = decodeURIComponent;
    try {
      this.normalize();
    } finally {
      URI.encode = e;
      URI.decode = d;
    }
    return this;
  };

  p.unicode = function() {
    // expect iso8859 input, unicode output
    var e = URI.encode;
    var d = URI.decode;

    URI.encode = strictEncodeURIComponent;
    URI.decode = unescape;
    try {
      this.normalize();
    } finally {
      URI.encode = e;
      URI.decode = d;
    }
    return this;
  };

  p.readable = function() {
    var uri = this.clone();
    // removing username, password, because they shouldn't be displayed according to RFC 3986
    uri.username('').password('').normalize();
    var t = '';
    if (uri._parts.protocol) {
      t += uri._parts.protocol + '://';
    }

    if (uri._parts.hostname) {
      if (uri.is('punycode') && punycode) {
        t += punycode.toUnicode(uri._parts.hostname);
        if (uri._parts.port) {
          t += ':' + uri._parts.port;
        }
      } else {
        t += uri.host();
      }
    }

    if (uri._parts.hostname && uri._parts.path && uri._parts.path.charAt(0) !== '/') {
      t += '/';
    }

    t += uri.path(true);
    if (uri._parts.query) {
      var q = '';
      for (var i = 0, qp = uri._parts.query.split('&'), l = qp.length; i < l; i++) {
        var kv = (qp[i] || '').split('=');
        q += '&' + URI.decodeQuery(kv[0], this._parts.escapeQuerySpace)
          .replace(/&/g, '%26');

        if (kv[1] !== undefined) {
          q += '=' + URI.decodeQuery(kv[1], this._parts.escapeQuerySpace)
            .replace(/&/g, '%26');
        }
      }
      t += '?' + q.substring(1);
    }

    t += URI.decodeQuery(uri.hash(), true);
    return t;
  };

  // resolving relative and absolute URLs
  p.absoluteTo = function(base) {
    var resolved = this.clone();
    var properties = ['protocol', 'username', 'password', 'hostname', 'port'];
    var basedir, i, p;

    if (this._parts.urn) {
      throw new Error('URNs do not have any generally defined hierarchical components');
    }

    if (!(base instanceof URI)) {
      base = new URI(base);
    }

    if (!resolved._parts.protocol) {
      resolved._parts.protocol = base._parts.protocol;
    }

    if (this._parts.hostname) {
      return resolved;
    }

    for (i = 0; (p = properties[i]); i++) {
      resolved._parts[p] = base._parts[p];
    }

    if (!resolved._parts.path) {
      resolved._parts.path = base._parts.path;
      if (!resolved._parts.query) {
        resolved._parts.query = base._parts.query;
      }
    } else {
      if (resolved._parts.path.substring(-2) === '..') {
        resolved._parts.path += '/';
      }

      if (resolved.path().charAt(0) !== '/') {
        basedir = base.directory();
        basedir = basedir ? basedir : base.path().indexOf('/') === 0 ? '/' : '';
        resolved._parts.path = (basedir ? (basedir + '/') : '') + resolved._parts.path;
        resolved.normalizePath();
      }
    }

    resolved.build();
    return resolved;
  };
  p.relativeTo = function(base) {
    var relative = this.clone().normalize();
    var relativeParts, baseParts, common, relativePath, basePath;

    if (relative._parts.urn) {
      throw new Error('URNs do not have any generally defined hierarchical components');
    }

    base = new URI(base).normalize();
    relativeParts = relative._parts;
    baseParts = base._parts;
    relativePath = relative.path();
    basePath = base.path();

    if (relativePath.charAt(0) !== '/') {
      throw new Error('URI is already relative');
    }

    if (basePath.charAt(0) !== '/') {
      throw new Error('Cannot calculate a URI relative to another relative URI');
    }

    if (relativeParts.protocol === baseParts.protocol) {
      relativeParts.protocol = null;
    }

    if (relativeParts.username !== baseParts.username || relativeParts.password !== baseParts.password) {
      return relative.build();
    }

    if (relativeParts.protocol !== null || relativeParts.username !== null || relativeParts.password !== null) {
      return relative.build();
    }

    if (relativeParts.hostname === baseParts.hostname && relativeParts.port === baseParts.port) {
      relativeParts.hostname = null;
      relativeParts.port = null;
    } else {
      return relative.build();
    }

    if (relativePath === basePath) {
      relativeParts.path = '';
      return relative.build();
    }

    // determine common sub path
    common = URI.commonPath(relativePath, basePath);

    // If the paths have nothing in common, return a relative URL with the absolute path.
    if (!common) {
      return relative.build();
    }

    var parents = baseParts.path
      .substring(common.length)
      .replace(/[^\/]*$/, '')
      .replace(/.*?\//g, '../');

    relativeParts.path = (parents + relativeParts.path.substring(common.length)) || './';

    return relative.build();
  };

  // comparing URIs
  p.equals = function(uri) {
    var one = this.clone();
    var two = new URI(uri);
    var one_map = {};
    var two_map = {};
    var checked = {};
    var one_query, two_query, key;

    one.normalize();
    two.normalize();

    // exact match
    if (one.toString() === two.toString()) {
      return true;
    }

    // extract query string
    one_query = one.query();
    two_query = two.query();
    one.query('');
    two.query('');

    // definitely not equal if not even non-query parts match
    if (one.toString() !== two.toString()) {
      return false;
    }

    // query parameters have the same length, even if they're permuted
    if (one_query.length !== two_query.length) {
      return false;
    }

    one_map = URI.parseQuery(one_query, this._parts.escapeQuerySpace);
    two_map = URI.parseQuery(two_query, this._parts.escapeQuerySpace);

    for (key in one_map) {
      if (hasOwn.call(one_map, key)) {
        if (!isArray(one_map[key])) {
          if (one_map[key] !== two_map[key]) {
            return false;
          }
        } else if (!arraysEqual(one_map[key], two_map[key])) {
          return false;
        }

        checked[key] = true;
      }
    }

    for (key in two_map) {
      if (hasOwn.call(two_map, key)) {
        if (!checked[key]) {
          // two contains a parameter not present in one
          return false;
        }
      }
    }

    return true;
  };

  // state
  p.duplicateQueryParameters = function(v) {
    this._parts.duplicateQueryParameters = !!v;
    return this;
  };

  p.escapeQuerySpace = function(v) {
    this._parts.escapeQuerySpace = !!v;
    return this;
  };

  return URI;
}));


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * utility - lib/array.js
 *
 * Copyright(c) 2012 - 2014 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */



/**
 * Array random slice with items count.
 * @param {Array} arr
 * @param {Number} num, number of sub items.
 * @return {Array}
 */
exports.randomSlice = function randomSlice(arr, num) {
  if (!num || num >= arr.length) {
    return arr.slice();
  }
  var index = Math.floor(Math.random() * arr.length);
  var a = [];
  for (var i = 0, j = index; i < num; i++) {
    a.push(arr[j++]);
    if (j === arr.length) {
      j = 0;
    }
  }
  return a;
};


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * utility - lib/crypto.js
 *
 * Copyright(c) 2012 - 2014 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */



/**
 * Module dependencies.
 */

var crypto = __webpack_require__(19);

/**
 * hash
 *
 * @param {String} method hash method, e.g.: 'md5', 'sha1'
 * @param {String|Buffer} s
 * @param {String} [format] output string format, could be 'hex' or 'base64'. default is 'hex'.
 * @return {String} md5 hash string
 * @public
 */
exports.hash = function hash(method, s, format) {
  var sum = crypto.createHash(method);
  var isBuffer = Buffer.isBuffer(s);
  if (!isBuffer && typeof s === 'object') {
    s = JSON.stringify(sortObject(s));
  }
  sum.update(s, isBuffer ? 'binary' : 'utf8');
  return sum.digest(format || 'hex');
};

/**
 * md5 hash
 *
 * @param {String|Buffer} s
 * @param {String} [format] output string format, could be 'hex' or 'base64'. default is 'hex'.
 * @return {String} md5 hash string
 * @public
 */
exports.md5 = function md5(s, format) {
  return exports.hash('md5', s, format);
};

/**
 * sha1 hash
 *
 * @param {String|Buffer} s
 * @param {String} [format] output string format, could be 'hex' or 'base64'. default is 'hex'.
 * @return {String} sha1 hash string
 * @public
 */
exports.sha1 = function sha1(s, format) {
  return exports.hash('sha1', s, format);
};

/**
 * sha256 hash
 *
 * @param {String|Buffer} s
 * @param {String} [format] output string format, could be 'hex' or 'base64'. default is 'hex'.
 * @return {String} sha256 hash string
 * @public
 */
exports.sha256 = function sha1(s, format) {
  return exports.hash('sha256', s, format);
};

/**
 * HMAC algorithm.
 *
 * Equal bash:
 *
 * ```bash
 * $ echo -n "$data" | openssl dgst -binary -$algorithm -hmac "$key" | openssl $encoding
 * ```
 *
 * @param {String} algorithm, dependent on the available algorithms supported by the version of OpenSSL on the platform.
 *   Examples are 'sha1', 'md5', 'sha256', 'sha512', etc.
 *   On recent releases, `openssl list-message-digest-algorithms` will display the available digest algorithms.
 * @param {String} key, the hmac key to be used.
 * @param {String|Buffer} data, content string.
 * @param {String} [encoding='base64']
 * @return {String} digest string.
 */
exports.hmac = function hmac(algorithm, key, data, encoding) {
  encoding = encoding || 'base64';
  var hmac = crypto.createHmac(algorithm, key);
  hmac.update(data, Buffer.isBuffer(data) ? 'binary' : 'utf8');
  return hmac.digest(encoding);
};

/**
 * Base64 encode string.
 *
 * @param {String|Buffer} s
 * @param {Boolean} [urlsafe=false] Encode string s using a URL-safe alphabet,
 *   which substitutes - instead of + and _ instead of / in the standard Base64 alphabet.
 * @return {String} base64 encode format string.
 */
exports.base64encode = function base64encode(s, urlsafe) {
  if (!Buffer.isBuffer(s)) {
    s = new Buffer(s);
  }
  var encode = s.toString('base64');
  if (urlsafe) {
    encode = encode.replace(/\+/g, '-').replace(/\//g, '_');
  }
  return encode;
};

/**
 * Base64 string decode.
 *
 * @param {String} encode, base64 encoding string.
 * @param {Boolean} [urlsafe=false] Decode string s using a URL-safe alphabet,
 *   which substitutes - instead of + and _ instead of / in the standard Base64 alphabet.
 * @param {encoding} [encoding=utf8] if encoding = buffer, will return Buffer instance
 * @return {String|Buffer} plain text.
 */
exports.base64decode = function base64decode(encodeStr, urlsafe, encoding) {
  if (urlsafe) {
    encodeStr = encodeStr.replace(/\-/g, '+').replace(/_/g, '/');
  }
  var buf = new Buffer(encodeStr, 'base64');
  if (encoding === 'buffer') {
    return buf;
  }
  return buf.toString(encoding || 'utf8');
};

function sortObject(o) {
  if (!o || Array.isArray(o) || typeof o !== 'object') {
    return o;
  }
  var keys = Object.keys(o);
  keys.sort();
  var values = [];
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    values.push([k, sortObject(o[k])]);
  }
  return values;
}


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * utility - lib/date.js
 *
 * Copyright(c) 2012 - 2014 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */



var MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

// only set once.
var TIMEZONE = ' ';
var _hourOffset = parseInt(-(new Date().getTimezoneOffset()) / 60, 10);
if (_hourOffset >= 0) {
  TIMEZONE += '+';
} else {
  TIMEZONE += '-';
}
_hourOffset = Math.abs(_hourOffset);
if (_hourOffset < 10) {
  _hourOffset = '0' + _hourOffset;
}
TIMEZONE += _hourOffset + '00';

/**
 * Access log format date. format: `moment().format('DD/MMM/YYYY:HH:mm:ss ZZ')`
 *
 * @return {String}
 */
exports.accessLogDate = function (d) {
  // 16/Apr/2013:16:40:09 +0800
  d = d || new Date();
  var date = d.getDate();
  if (date < 10) {
    date = '0' + date;
  }
  var hours = d.getHours();
  if (hours < 10) {
    hours = '0' + hours;
  }
  var mintues = d.getMinutes();
  if (mintues < 10) {
    mintues = '0' + mintues;
  }
  var seconds = d.getSeconds();
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  return date + '/' + MONTHS[d.getMonth()] + '/' + d.getFullYear() +
    ':' + hours + ':' + mintues + ':' + seconds + TIMEZONE;
};

/**
 * Normal log format date. format: `moment().format('YYYY-MM-DD HH:mm:ss.SSS')`
 *
 * @return {String}
 */
exports.logDate = exports.YYYYMMDDHHmmssSSS = function (d, msSep) {
  if (typeof d === 'string') {
    // logDate(msSep)
    msSep = d;
    d = new Date();
  } else {
    // logDate(d, msSep)
    d = d || new Date();
  }
  var date = d.getDate();
  if (date < 10) {
    date = '0' + date;
  }
  var month = d.getMonth() + 1;
  if (month < 10) {
    month = '0' + month;
  }
  var hours = d.getHours();
  if (hours < 10) {
    hours = '0' + hours;
  }
  var mintues = d.getMinutes();
  if (mintues < 10) {
    mintues = '0' + mintues;
  }
  var seconds = d.getSeconds();
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  var milliseconds = d.getMilliseconds();
  if (milliseconds < 10) {
    milliseconds = '00' + milliseconds;
  } else if (milliseconds < 100) {
    milliseconds = '0' + milliseconds;
  }
  return d.getFullYear() + '-' + month + '-' + date + ' ' +
    hours + ':' + mintues + ':' + seconds + (msSep || '.') + milliseconds;
};

/**
 * `moment().format('YYYY-MM-DD HH:mm:ss')` format date string.
 *
 * @return {String}
 */
exports.YYYYMMDDHHmmss = function (d, options) {
  d = d || new Date();
  if (!(d instanceof Date)) {
    d = new Date(d);
  }

  var dateSep = '-';
  var timeSep = ':';
  if (options) {
    if (options.dateSep) {
      dateSep = options.dateSep;
    }
    if (options.timeSep) {
      timeSep = options.timeSep;
    }
  }
  var date = d.getDate();
  if (date < 10) {
    date = '0' + date;
  }
  var month = d.getMonth() + 1;
  if (month < 10) {
    month = '0' + month;
  }
  var hours = d.getHours();
  if (hours < 10) {
    hours = '0' + hours;
  }
  var mintues = d.getMinutes();
  if (mintues < 10) {
    mintues = '0' + mintues;
  }
  var seconds = d.getSeconds();
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  return d.getFullYear() + dateSep + month + dateSep + date + ' ' +
    hours + timeSep + mintues + timeSep + seconds;
};

/**
 * `moment().format('YYYY-MM-DD')` format date string.
 *
 * @return {String}
 */
exports.YYYYMMDD = function YYYYMMDD(d, sep) {
  if (typeof d === 'string') {
    // YYYYMMDD(sep)
    sep = d;
    d = new Date();
  } else {
    // YYYYMMDD(d, sep)
    d = d || new Date();
    if (typeof sep !== 'string') {
      sep = '-';
    }
  }
  var date = d.getDate();
  if (date < 10) {
    date = '0' + date;
  }
  var month = d.getMonth() + 1;
  if (month < 10) {
    month = '0' + month;
  }
  return d.getFullYear() + sep + month + sep + date;
};

/**
 * return datetime struct.
 *
 * @return {Object} date
 *  - {Number} YYYYMMDD, 20130401
 *  - {Number} H, 0, 1, 9, 12, 23
 */
exports.datestruct = function (now) {
  now = now || new Date();
  return {
    YYYYMMDD: now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate(),
    H: now.getHours()
  };
};

/**
 * Get Unix's timestamp in seconds.
 * @return {Number}
 */
exports.timestamp = function timestamp(t) {
  if (t) {
    var v = t;
    if (typeof v === 'string') {
      v = Number(v);
    }
    if (String(t).length === 10) {
      v *= 1000;
    }
    return new Date(v);
  }
  return Math.round(Date.now() / 1000);
};


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * utility - lib/function.js
 *
 * Copyright(c) 2012 - 2014 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */



/**
 * A empty function.
 *
 * @return {Function}
 * @public
 */
exports.noop = function noop() {};

/**
 * Get a function parameter's names.
 *
 * @param {Function} func
 * @param {Boolean} [useCache], default is true
 * @return {Array} names
 */
exports.getParamNames = function getParamNames(func, cache) {
  cache = cache !== false;
  if (cache && func.__cache_names) {
    return func.__cache_names;
  }
  var str = func.toString();
  var names = str.slice(str.indexOf('(') + 1, str.indexOf(')')).match(/([^\s,]+)/g) || [];
  func.__cache_names = names;
  return names;
};


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * utility - lib/crypto.js
 *
 * MIT Licensed
 */



/**
 * Module dependencies.
 */

exports.strictJSONParse = function (str) {
  var obj = JSON.parse(str);
  if (!obj || typeof obj !== 'object') {
    throw new Error('JSON string is not object');
  }
  return obj;
};


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * utility - lib/map.js
 *
 * Copyright(c) 2012 - 2014 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */



/**
 * Module dependencies.
 */

exports.has = function has(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
};

/**
 * generate a real map object, no constructor, no __proto__
 * @param {Object} [obj], init object, optional
 * @return {Object}
 */
exports.map = function map(obj) {
  var map = Object.create(null);
  if (!obj) {
    return map;
  }

  for (var key in obj) {
    map[key] = obj[key];
  }
  return map;
};


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * utility - lib/number.js
 *
 * Copyright(c) 2012 - 2014 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */



// http://www.2ality.com/2013/10/safe-integers.html
// http://es6.ruanyifeng.com/#docs/number
exports.MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || Math.pow(2, 53) - 1;
exports.MIN_SAFE_INTEGER = -exports.MAX_SAFE_INTEGER;
var MAX_SAFE_INTEGER_STR = exports.MAX_SAFE_INTEGER_STR = String(exports.MAX_SAFE_INTEGER);
var MAX_SAFE_INTEGER_STR_LENGTH = MAX_SAFE_INTEGER_STR.length;

/**
 * Detect a number string can safe convert to Javascript Number.
 *
 * @param {String} s number format string, like `"123"`, `"-1000123123123123123123"`
 * @return {Boolean}
 */
exports.isSafeNumberString = function isSafeNumberString(s) {
  if (s[0] === '-') {
    s = s.substring(1);
  }
  if (s.length < MAX_SAFE_INTEGER_STR_LENGTH ||
    (s.length === MAX_SAFE_INTEGER_STR_LENGTH && s <= MAX_SAFE_INTEGER_STR)) {
    return true;
  }
  return false;
};

/**
 * Convert string to Number if string in safe Number scope.
 *
 * @param {String} s number format string.
 * @return {Number|String} success will return Number, otherise return the original string.
 */
exports.toSafeNumber = function toSafeNumber(s) {
  if (typeof s === 'number') {
    return s;
  }

  return exports.isSafeNumberString(s) ? Number(s) : s;
};


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * utility - lib/optimize.js
 *
 * Copyright(c) 2012 - 2014 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */



/**
 * optimize try catch
 * @param {Function} fn
 * @return {Object}
 *   - {Error} error
 *   - {Mix} value
 */
exports.try = function (fn) {
  var res = {
    error: undefined,
    value: undefined
  };

  try {
    res.value = fn();
  } catch (err) {
    res.error = err instanceof Error
      ? err
      : new Error(err);
  }

  return res;
};

/**
 * avoid if (a && a.b && a.b.c)
 * @param {Object} obj
 * @param {...String} keys
 * @return {Object}
 */
exports.dig = function (obj) {
  if (!obj) {
    return;
  }
  if (arguments.length <= 1) {
    return obj;
  }

  var value = obj[arguments[1]];
  for (var i = 2; i < arguments.length; i++) {
    if (!value) {
      break;
    }
    value = value[arguments[i]];
  }

  return value;
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * utility - lib/polyfill.js
 *
 * Copyright(c) 2012 - 2014 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */



exports.setImmediate = typeof setImmediate === 'function'
  ? setImmediate
  : function(fn){
    process.nextTick(fn.bind.apply(fn, arguments));
  };


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * utility - lib/string.js
 *
 * Copyright(c) 2012 - 2014 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */



exports.randomString = function randomString(length, charSet) {
  var result = [];
  length = length || 16;
  charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  while (length--) {
    result.push(charSet[Math.floor(Math.random() * charSet.length)]);
  }
  return result.join('');
};

/**
 * split string to array
 * @param  {String} str
 * @param  {String} [sep] default is ','
 * @return {Array}
 */
exports.split = function split(str, sep) {
  str = str || '';
  sep = sep || ',';
  var items = str.split(sep);
  var needs = [];
  for (var i = 0; i < items.length; i++) {
    var s = items[i].trim();
    if (s.length > 0) {
      needs.push(s);
    }
  }
  return needs;
};

// always optimized
exports.splitAlwaysOptimized = function splitAlwaysOptimized() {
  var str = '';
  var sep = ',';
  if (arguments.length === 1) {
    str = arguments[0] || '';
  } else if (arguments.length === 2) {
    str = arguments[0] || '';
    sep = arguments[1] || ',';
  }
  var items = str.split(sep);
  var needs = [];
  for (var i = 0; i < items.length; i++) {
    var s = items[i].trim();
    if (s.length > 0) {
      needs.push(s);
    }
  }
  return needs;
};

/**
 * Replace string
 *
 * @param  {String} str
 * @param  {String|RegExp} substr
 * @param  {String|Function} newSubstr
 * @return {String}
 */
exports.replace = function replace(str, substr, newSubstr) {
  var replaceFunction = newSubstr;
  if (typeof replaceFunction !== 'function') {
    replaceFunction = function () {
      return newSubstr;
    };
  }
  return str.replace(substr, replaceFunction);
};


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * utility - lib/utility.js
 *
 * Copyright(c) 2012 - 2014 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */



/**
 * Module dependencies.
 */

var copy = __webpack_require__(7);

copy(__webpack_require__(62))
.and(__webpack_require__(67))
.and(__webpack_require__(66))
.and(__webpack_require__(60))
.and(__webpack_require__(65))
.and(__webpack_require__(68))
.and(__webpack_require__(59))
.and(__webpack_require__(63))
.and(__webpack_require__(61))
.and(__webpack_require__(64))
.and(__webpack_require__(70))
.to(module.exports);


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * utility - lib/web.js
 *
 * Copyright(c) 2012 - 2014 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */



/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @public
 */
exports.escape = __webpack_require__(40);

/**
 * Safe encodeURIComponent, won't throw any error.
 * If `encodeURIComponent` error happen, just return the original value.
 *
 * @param {String} text
 * @return {String} URL encode string.
 */
exports.encodeURIComponent = function encodeURIComponent_(text) {
  try {
    return encodeURIComponent(text);
  } catch (e) {
    return text;
  }
};

/**
 * Safe decodeURIComponent, won't throw any error.
 * If `decodeURIComponent` error happen, just return the original value.
 *
 * @param {String} encodeText
 * @return {String} URL decode original string.
 */
exports.decodeURIComponent = function decodeURIComponent_(encodeText) {
  try {
    return decodeURIComponent(encodeText);
  } catch (e) {
    return encodeText;
  }
};


/***/ }),
/* 71 */
/***/ (function(module, exports) {

module.exports = require("buffer");

/***/ }),
/* 72 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 73 */
/***/ (function(module, exports) {

module.exports = require("os");

/***/ }),
/* 74 */
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),
/* 75 */
/***/ (function(module, exports) {

module.exports = require("tty");

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t;
    return { next: verb(0), "throw": verb(1), "return": verb(2) };
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var modelproxy_1 = __webpack_require__(3);
var _ = __webpack_require__(22);
var libs_1 = __webpack_require__(23);
var jsonPoiner = __webpack_require__(46);
var nodeDubboFactory = new libs_1.NodeDubboFactory({
    dubbo: {
        version: "2.8.5",
        rootPath: "dubbo",
        registerStr: "dubboadmin.uat1.rs.com:2181"
    },
    options: {
        sessionTimeout: 6000,
        spinDelay: 3000,
        retries: 5
    }
});
var DubboEngine = (function (_super) {
    __extends(DubboEngine, _super);
    function DubboEngine() {
        return _super.call(this) || this;
    }
    DubboEngine.prototype.validate = function (instance, options) {
        _super.prototype.validate.call(this, instance, options);
        return true;
    };
    DubboEngine.prototype.dataAdapter = function (instance, executeInfo) {
        var dataObj = {
            "$class": instance.config.dataAdapter.class,
            "$": {}
        };
        _.forEach(instance.config.dataAdapter.data, function (val, key) {
            if (jsonPoiner.has(executeInfo.data, "/" + key)) {
                jsonPoiner.set(dataObj, val, jsonPoiner.get(executeInfo.data, "/" + key));
            }
        });
        return dataObj;
    };
    DubboEngine.prototype.proxy = function (instance, options) {
        return __awaiter(this, void 0, void 0, function () {
            var interfaceModel;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        interfaceModel = _.extend({}, instance, options.instance || {});
                        return [4 /*yield*/, nodeDubboFactory.addService(interfaceModel.config.application)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, nodeDubboFactory.execute("/" + interfaceModel.config.application.dInterface.alias + "/" + interfaceModel.config.method, this.dataAdapter(interfaceModel, options.executeInfo))];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return DubboEngine;
}(modelproxy_1.modelProxy.BaseEngine));
exports.DubboEngine = DubboEngine;


/***/ })
/******/ ]);
});