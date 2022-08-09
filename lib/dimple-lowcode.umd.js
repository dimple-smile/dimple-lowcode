(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"));
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["dimple-lowcode"] = factory(require("vue"));
	else
		root["dimple-lowcode"] = factory(root["Vue"]);
})((typeof self !== 'undefined' ? self : this), function(__WEBPACK_EXTERNAL_MODULE__7203__) {
return /******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 9662:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isCallable = __webpack_require__(614);
var tryToString = __webpack_require__(6330);

var $TypeError = TypeError;

// `Assert: IsCallable(argument) is true`
module.exports = function (argument) {
  if (isCallable(argument)) return argument;
  throw $TypeError(tryToString(argument) + ' is not a function');
};


/***/ }),

/***/ 6077:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isCallable = __webpack_require__(614);

var $String = String;
var $TypeError = TypeError;

module.exports = function (argument) {
  if (typeof argument == 'object' || isCallable(argument)) return argument;
  throw $TypeError("Can't set " + $String(argument) + ' as a prototype');
};


/***/ }),

/***/ 5787:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isPrototypeOf = __webpack_require__(7976);

var $TypeError = TypeError;

module.exports = function (it, Prototype) {
  if (isPrototypeOf(Prototype, it)) return it;
  throw $TypeError('Incorrect invocation');
};


/***/ }),

/***/ 9670:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(111);

var $String = String;
var $TypeError = TypeError;

// `Assert: Type(argument) is Object`
module.exports = function (argument) {
  if (isObject(argument)) return argument;
  throw $TypeError($String(argument) + ' is not an object');
};


/***/ }),

/***/ 4019:
/***/ (function(module) {

// eslint-disable-next-line es-x/no-typed-arrays -- safe
module.exports = typeof ArrayBuffer != 'undefined' && typeof DataView != 'undefined';


/***/ }),

/***/ 260:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var NATIVE_ARRAY_BUFFER = __webpack_require__(4019);
var DESCRIPTORS = __webpack_require__(9781);
var global = __webpack_require__(7854);
var isCallable = __webpack_require__(614);
var isObject = __webpack_require__(111);
var hasOwn = __webpack_require__(2597);
var classof = __webpack_require__(648);
var tryToString = __webpack_require__(6330);
var createNonEnumerableProperty = __webpack_require__(8880);
var defineBuiltIn = __webpack_require__(8052);
var defineProperty = (__webpack_require__(3070).f);
var isPrototypeOf = __webpack_require__(7976);
var getPrototypeOf = __webpack_require__(9518);
var setPrototypeOf = __webpack_require__(7674);
var wellKnownSymbol = __webpack_require__(5112);
var uid = __webpack_require__(9711);
var InternalStateModule = __webpack_require__(9909);

var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
var Int8Array = global.Int8Array;
var Int8ArrayPrototype = Int8Array && Int8Array.prototype;
var Uint8ClampedArray = global.Uint8ClampedArray;
var Uint8ClampedArrayPrototype = Uint8ClampedArray && Uint8ClampedArray.prototype;
var TypedArray = Int8Array && getPrototypeOf(Int8Array);
var TypedArrayPrototype = Int8ArrayPrototype && getPrototypeOf(Int8ArrayPrototype);
var ObjectPrototype = Object.prototype;
var TypeError = global.TypeError;

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var TYPED_ARRAY_TAG = uid('TYPED_ARRAY_TAG');
var TYPED_ARRAY_CONSTRUCTOR = 'TypedArrayConstructor';
// Fixing native typed arrays in Opera Presto crashes the browser, see #595
var NATIVE_ARRAY_BUFFER_VIEWS = NATIVE_ARRAY_BUFFER && !!setPrototypeOf && classof(global.opera) !== 'Opera';
var TYPED_ARRAY_TAG_REQUIRED = false;
var NAME, Constructor, Prototype;

var TypedArrayConstructorsList = {
  Int8Array: 1,
  Uint8Array: 1,
  Uint8ClampedArray: 1,
  Int16Array: 2,
  Uint16Array: 2,
  Int32Array: 4,
  Uint32Array: 4,
  Float32Array: 4,
  Float64Array: 8
};

var BigIntArrayConstructorsList = {
  BigInt64Array: 8,
  BigUint64Array: 8
};

var isView = function isView(it) {
  if (!isObject(it)) return false;
  var klass = classof(it);
  return klass === 'DataView'
    || hasOwn(TypedArrayConstructorsList, klass)
    || hasOwn(BigIntArrayConstructorsList, klass);
};

var getTypedArrayConstructor = function (it) {
  var proto = getPrototypeOf(it);
  if (!isObject(proto)) return;
  var state = getInternalState(proto);
  return (state && hasOwn(state, TYPED_ARRAY_CONSTRUCTOR)) ? state[TYPED_ARRAY_CONSTRUCTOR] : getTypedArrayConstructor(proto);
};

var isTypedArray = function (it) {
  if (!isObject(it)) return false;
  var klass = classof(it);
  return hasOwn(TypedArrayConstructorsList, klass)
    || hasOwn(BigIntArrayConstructorsList, klass);
};

var aTypedArray = function (it) {
  if (isTypedArray(it)) return it;
  throw TypeError('Target is not a typed array');
};

var aTypedArrayConstructor = function (C) {
  if (isCallable(C) && (!setPrototypeOf || isPrototypeOf(TypedArray, C))) return C;
  throw TypeError(tryToString(C) + ' is not a typed array constructor');
};

var exportTypedArrayMethod = function (KEY, property, forced, options) {
  if (!DESCRIPTORS) return;
  if (forced) for (var ARRAY in TypedArrayConstructorsList) {
    var TypedArrayConstructor = global[ARRAY];
    if (TypedArrayConstructor && hasOwn(TypedArrayConstructor.prototype, KEY)) try {
      delete TypedArrayConstructor.prototype[KEY];
    } catch (error) {
      // old WebKit bug - some methods are non-configurable
      try {
        TypedArrayConstructor.prototype[KEY] = property;
      } catch (error2) { /* empty */ }
    }
  }
  if (!TypedArrayPrototype[KEY] || forced) {
    defineBuiltIn(TypedArrayPrototype, KEY, forced ? property
      : NATIVE_ARRAY_BUFFER_VIEWS && Int8ArrayPrototype[KEY] || property, options);
  }
};

var exportTypedArrayStaticMethod = function (KEY, property, forced) {
  var ARRAY, TypedArrayConstructor;
  if (!DESCRIPTORS) return;
  if (setPrototypeOf) {
    if (forced) for (ARRAY in TypedArrayConstructorsList) {
      TypedArrayConstructor = global[ARRAY];
      if (TypedArrayConstructor && hasOwn(TypedArrayConstructor, KEY)) try {
        delete TypedArrayConstructor[KEY];
      } catch (error) { /* empty */ }
    }
    if (!TypedArray[KEY] || forced) {
      // V8 ~ Chrome 49-50 `%TypedArray%` methods are non-writable non-configurable
      try {
        return defineBuiltIn(TypedArray, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS && TypedArray[KEY] || property);
      } catch (error) { /* empty */ }
    } else return;
  }
  for (ARRAY in TypedArrayConstructorsList) {
    TypedArrayConstructor = global[ARRAY];
    if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
      defineBuiltIn(TypedArrayConstructor, KEY, property);
    }
  }
};

for (NAME in TypedArrayConstructorsList) {
  Constructor = global[NAME];
  Prototype = Constructor && Constructor.prototype;
  if (Prototype) enforceInternalState(Prototype)[TYPED_ARRAY_CONSTRUCTOR] = Constructor;
  else NATIVE_ARRAY_BUFFER_VIEWS = false;
}

for (NAME in BigIntArrayConstructorsList) {
  Constructor = global[NAME];
  Prototype = Constructor && Constructor.prototype;
  if (Prototype) enforceInternalState(Prototype)[TYPED_ARRAY_CONSTRUCTOR] = Constructor;
}

// WebKit bug - typed arrays constructors prototype is Object.prototype
if (!NATIVE_ARRAY_BUFFER_VIEWS || !isCallable(TypedArray) || TypedArray === Function.prototype) {
  // eslint-disable-next-line no-shadow -- safe
  TypedArray = function TypedArray() {
    throw TypeError('Incorrect invocation');
  };
  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
    if (global[NAME]) setPrototypeOf(global[NAME], TypedArray);
  }
}

if (!NATIVE_ARRAY_BUFFER_VIEWS || !TypedArrayPrototype || TypedArrayPrototype === ObjectPrototype) {
  TypedArrayPrototype = TypedArray.prototype;
  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
    if (global[NAME]) setPrototypeOf(global[NAME].prototype, TypedArrayPrototype);
  }
}

// WebKit bug - one more object in Uint8ClampedArray prototype chain
if (NATIVE_ARRAY_BUFFER_VIEWS && getPrototypeOf(Uint8ClampedArrayPrototype) !== TypedArrayPrototype) {
  setPrototypeOf(Uint8ClampedArrayPrototype, TypedArrayPrototype);
}

if (DESCRIPTORS && !hasOwn(TypedArrayPrototype, TO_STRING_TAG)) {
  TYPED_ARRAY_TAG_REQUIRED = true;
  defineProperty(TypedArrayPrototype, TO_STRING_TAG, { get: function () {
    return isObject(this) ? this[TYPED_ARRAY_TAG] : undefined;
  } });
  for (NAME in TypedArrayConstructorsList) if (global[NAME]) {
    createNonEnumerableProperty(global[NAME], TYPED_ARRAY_TAG, NAME);
  }
}

module.exports = {
  NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS,
  TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQUIRED && TYPED_ARRAY_TAG,
  aTypedArray: aTypedArray,
  aTypedArrayConstructor: aTypedArrayConstructor,
  exportTypedArrayMethod: exportTypedArrayMethod,
  exportTypedArrayStaticMethod: exportTypedArrayStaticMethod,
  getTypedArrayConstructor: getTypedArrayConstructor,
  isView: isView,
  isTypedArray: isTypedArray,
  TypedArray: TypedArray,
  TypedArrayPrototype: TypedArrayPrototype
};


/***/ }),

/***/ 1318:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toIndexedObject = __webpack_require__(5656);
var toAbsoluteIndex = __webpack_require__(1400);
var lengthOfArrayLike = __webpack_require__(6244);

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = lengthOfArrayLike(O);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ 9671:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var bind = __webpack_require__(9974);
var IndexedObject = __webpack_require__(8361);
var toObject = __webpack_require__(7908);
var lengthOfArrayLike = __webpack_require__(6244);

// `Array.prototype.{ findLast, findLastIndex }` methods implementation
var createMethod = function (TYPE) {
  var IS_FIND_LAST_INDEX = TYPE == 1;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that);
    var index = lengthOfArrayLike(self);
    var value, result;
    while (index-- > 0) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (result) switch (TYPE) {
        case 0: return value; // findLast
        case 1: return index; // findLastIndex
      }
    }
    return IS_FIND_LAST_INDEX ? -1 : undefined;
  };
};

module.exports = {
  // `Array.prototype.findLast` method
  // https://github.com/tc39/proposal-array-find-from-last
  findLast: createMethod(0),
  // `Array.prototype.findLastIndex` method
  // https://github.com/tc39/proposal-array-find-from-last
  findLastIndex: createMethod(1)
};


/***/ }),

/***/ 4326:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);

var toString = uncurryThis({}.toString);
var stringSlice = uncurryThis(''.slice);

module.exports = function (it) {
  return stringSlice(toString(it), 8, -1);
};


/***/ }),

/***/ 648:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__(1694);
var isCallable = __webpack_require__(614);
var classofRaw = __webpack_require__(4326);
var wellKnownSymbol = __webpack_require__(5112);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var $Object = Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && isCallable(O.callee) ? 'Arguments' : result;
};


/***/ }),

/***/ 7741:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);

var $Error = Error;
var replace = uncurryThis(''.replace);

var TEST = (function (arg) { return String($Error(arg).stack); })('zxcasd');
var V8_OR_CHAKRA_STACK_ENTRY = /\n\s*at [^:]*:[^\n]*/;
var IS_V8_OR_CHAKRA_STACK = V8_OR_CHAKRA_STACK_ENTRY.test(TEST);

module.exports = function (stack, dropEntries) {
  if (IS_V8_OR_CHAKRA_STACK && typeof stack == 'string' && !$Error.prepareStackTrace) {
    while (dropEntries--) stack = replace(stack, V8_OR_CHAKRA_STACK_ENTRY, '');
  } return stack;
};


/***/ }),

/***/ 9920:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var hasOwn = __webpack_require__(2597);
var ownKeys = __webpack_require__(3887);
var getOwnPropertyDescriptorModule = __webpack_require__(1236);
var definePropertyModule = __webpack_require__(3070);

module.exports = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};


/***/ }),

/***/ 8544:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es-x/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),

/***/ 8880:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var definePropertyModule = __webpack_require__(3070);
var createPropertyDescriptor = __webpack_require__(9114);

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ 9114:
/***/ (function(module) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ 8052:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isCallable = __webpack_require__(614);
var definePropertyModule = __webpack_require__(3070);
var makeBuiltIn = __webpack_require__(6339);
var defineGlobalProperty = __webpack_require__(3072);

module.exports = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable(value)) makeBuiltIn(value, name, options);
  if (options.global) {
    if (simple) O[key] = value;
    else defineGlobalProperty(key, value);
  } else {
    try {
      if (!options.unsafe) delete O[key];
      else if (O[key]) simple = true;
    } catch (error) { /* empty */ }
    if (simple) O[key] = value;
    else definePropertyModule.f(O, key, {
      value: value,
      enumerable: false,
      configurable: !options.nonConfigurable,
      writable: !options.nonWritable
    });
  } return O;
};


/***/ }),

/***/ 3072:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);

// eslint-disable-next-line es-x/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

module.exports = function (key, value) {
  try {
    defineProperty(global, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ 9781:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);

// Detect IE8's incomplete defineProperty implementation
module.exports = !fails(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),

/***/ 317:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var isObject = __webpack_require__(111);

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ 3678:
/***/ (function(module) {

module.exports = {
  IndexSizeError: { s: 'INDEX_SIZE_ERR', c: 1, m: 1 },
  DOMStringSizeError: { s: 'DOMSTRING_SIZE_ERR', c: 2, m: 0 },
  HierarchyRequestError: { s: 'HIERARCHY_REQUEST_ERR', c: 3, m: 1 },
  WrongDocumentError: { s: 'WRONG_DOCUMENT_ERR', c: 4, m: 1 },
  InvalidCharacterError: { s: 'INVALID_CHARACTER_ERR', c: 5, m: 1 },
  NoDataAllowedError: { s: 'NO_DATA_ALLOWED_ERR', c: 6, m: 0 },
  NoModificationAllowedError: { s: 'NO_MODIFICATION_ALLOWED_ERR', c: 7, m: 1 },
  NotFoundError: { s: 'NOT_FOUND_ERR', c: 8, m: 1 },
  NotSupportedError: { s: 'NOT_SUPPORTED_ERR', c: 9, m: 1 },
  InUseAttributeError: { s: 'INUSE_ATTRIBUTE_ERR', c: 10, m: 1 },
  InvalidStateError: { s: 'INVALID_STATE_ERR', c: 11, m: 1 },
  SyntaxError: { s: 'SYNTAX_ERR', c: 12, m: 1 },
  InvalidModificationError: { s: 'INVALID_MODIFICATION_ERR', c: 13, m: 1 },
  NamespaceError: { s: 'NAMESPACE_ERR', c: 14, m: 1 },
  InvalidAccessError: { s: 'INVALID_ACCESS_ERR', c: 15, m: 1 },
  ValidationError: { s: 'VALIDATION_ERR', c: 16, m: 0 },
  TypeMismatchError: { s: 'TYPE_MISMATCH_ERR', c: 17, m: 1 },
  SecurityError: { s: 'SECURITY_ERR', c: 18, m: 1 },
  NetworkError: { s: 'NETWORK_ERR', c: 19, m: 1 },
  AbortError: { s: 'ABORT_ERR', c: 20, m: 1 },
  URLMismatchError: { s: 'URL_MISMATCH_ERR', c: 21, m: 1 },
  QuotaExceededError: { s: 'QUOTA_EXCEEDED_ERR', c: 22, m: 1 },
  TimeoutError: { s: 'TIMEOUT_ERR', c: 23, m: 1 },
  InvalidNodeTypeError: { s: 'INVALID_NODE_TYPE_ERR', c: 24, m: 1 },
  DataCloneError: { s: 'DATA_CLONE_ERR', c: 25, m: 1 }
};


/***/ }),

/***/ 8113:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(5005);

module.exports = getBuiltIn('navigator', 'userAgent') || '';


/***/ }),

/***/ 7392:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var userAgent = __webpack_require__(8113);

var process = global.process;
var Deno = global.Deno;
var versions = process && process.versions || Deno && Deno.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

module.exports = version;


/***/ }),

/***/ 748:
/***/ (function(module) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ 2914:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);
var createPropertyDescriptor = __webpack_require__(9114);

module.exports = !fails(function () {
  var error = Error('a');
  if (!('stack' in error)) return true;
  // eslint-disable-next-line es-x/no-object-defineproperty -- safe
  Object.defineProperty(error, 'stack', createPropertyDescriptor(1, 7));
  return error.stack !== 7;
});


/***/ }),

/***/ 2109:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var getOwnPropertyDescriptor = (__webpack_require__(1236).f);
var createNonEnumerableProperty = __webpack_require__(8880);
var defineBuiltIn = __webpack_require__(8052);
var defineGlobalProperty = __webpack_require__(3072);
var copyConstructorProperties = __webpack_require__(9920);
var isForced = __webpack_require__(4705);

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    defineBuiltIn(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ 7293:
/***/ (function(module) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ 2104:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_BIND = __webpack_require__(4374);

var FunctionPrototype = Function.prototype;
var apply = FunctionPrototype.apply;
var call = FunctionPrototype.call;

// eslint-disable-next-line es-x/no-reflect -- safe
module.exports = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call.bind(apply) : function () {
  return call.apply(apply, arguments);
});


/***/ }),

/***/ 9974:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var aCallable = __webpack_require__(9662);
var NATIVE_BIND = __webpack_require__(4374);

var bind = uncurryThis(uncurryThis.bind);

// optional / simple context binding
module.exports = function (fn, that) {
  aCallable(fn);
  return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ 4374:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);

module.exports = !fails(function () {
  // eslint-disable-next-line es-x/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});


/***/ }),

/***/ 6916:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_BIND = __webpack_require__(4374);

var call = Function.prototype.call;

module.exports = NATIVE_BIND ? call.bind(call) : function () {
  return call.apply(call, arguments);
};


/***/ }),

/***/ 6530:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var hasOwn = __webpack_require__(2597);

var FunctionPrototype = Function.prototype;
// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn(FunctionPrototype, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

module.exports = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};


/***/ }),

/***/ 1702:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_BIND = __webpack_require__(4374);

var FunctionPrototype = Function.prototype;
var bind = FunctionPrototype.bind;
var call = FunctionPrototype.call;
var uncurryThis = NATIVE_BIND && bind.bind(call, call);

module.exports = NATIVE_BIND ? function (fn) {
  return fn && uncurryThis(fn);
} : function (fn) {
  return fn && function () {
    return call.apply(fn, arguments);
  };
};


/***/ }),

/***/ 5005:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var isCallable = __webpack_require__(614);

var aFunction = function (argument) {
  return isCallable(argument) ? argument : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global[namespace]) : global[namespace] && global[namespace][method];
};


/***/ }),

/***/ 8173:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var aCallable = __webpack_require__(9662);

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
module.exports = function (V, P) {
  var func = V[P];
  return func == null ? undefined : aCallable(func);
};


/***/ }),

/***/ 7854:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line es-x/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof __webpack_require__.g == 'object' && __webpack_require__.g) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();


/***/ }),

/***/ 2597:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var toObject = __webpack_require__(7908);

var hasOwnProperty = uncurryThis({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es-x/no-object-hasown -- safe
module.exports = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject(it), key);
};


/***/ }),

/***/ 3501:
/***/ (function(module) {

module.exports = {};


/***/ }),

/***/ 4664:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var fails = __webpack_require__(7293);
var createElement = __webpack_require__(317);

// Thanks to IE8 for its funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ 8361:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var fails = __webpack_require__(7293);
var classof = __webpack_require__(4326);

var $Object = Object;
var split = uncurryThis(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split(it, '') : $Object(it);
} : $Object;


/***/ }),

/***/ 9587:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isCallable = __webpack_require__(614);
var isObject = __webpack_require__(111);
var setPrototypeOf = __webpack_require__(7674);

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    isCallable(NewTarget = dummy.constructor) &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};


/***/ }),

/***/ 2788:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var isCallable = __webpack_require__(614);
var store = __webpack_require__(5465);

var functionToString = uncurryThis(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ 8340:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(111);
var createNonEnumerableProperty = __webpack_require__(8880);

// `InstallErrorCause` abstract operation
// https://tc39.es/proposal-error-cause/#sec-errorobjects-install-error-cause
module.exports = function (O, options) {
  if (isObject(options) && 'cause' in options) {
    createNonEnumerableProperty(O, 'cause', options.cause);
  }
};


/***/ }),

/***/ 9909:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__(8536);
var global = __webpack_require__(7854);
var uncurryThis = __webpack_require__(1702);
var isObject = __webpack_require__(111);
var createNonEnumerableProperty = __webpack_require__(8880);
var hasOwn = __webpack_require__(2597);
var shared = __webpack_require__(5465);
var sharedKey = __webpack_require__(6200);
var hiddenKeys = __webpack_require__(3501);

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError = global.TypeError;
var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared.state) {
  var store = shared.state || (shared.state = new WeakMap());
  var wmget = uncurryThis(store.get);
  var wmhas = uncurryThis(store.has);
  var wmset = uncurryThis(store.set);
  set = function (it, metadata) {
    if (wmhas(store, it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    wmset(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget(store, it) || {};
  };
  has = function (it) {
    return wmhas(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ 614:
/***/ (function(module) {

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
module.exports = function (argument) {
  return typeof argument == 'function';
};


/***/ }),

/***/ 4705:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);
var isCallable = __webpack_require__(614);

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : isCallable(detection) ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ 111:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isCallable = __webpack_require__(614);

module.exports = function (it) {
  return typeof it == 'object' ? it !== null : isCallable(it);
};


/***/ }),

/***/ 1913:
/***/ (function(module) {

module.exports = false;


/***/ }),

/***/ 2190:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(5005);
var isCallable = __webpack_require__(614);
var isPrototypeOf = __webpack_require__(7976);
var USE_SYMBOL_AS_UID = __webpack_require__(3307);

var $Object = Object;

module.exports = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn('Symbol');
  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
};


/***/ }),

/***/ 6244:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toLength = __webpack_require__(7466);

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
module.exports = function (obj) {
  return toLength(obj.length);
};


/***/ }),

/***/ 6339:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var fails = __webpack_require__(7293);
var isCallable = __webpack_require__(614);
var hasOwn = __webpack_require__(2597);
var DESCRIPTORS = __webpack_require__(9781);
var CONFIGURABLE_FUNCTION_NAME = (__webpack_require__(6530).CONFIGURABLE);
var inspectSource = __webpack_require__(2788);
var InternalStateModule = __webpack_require__(9909);

var enforceInternalState = InternalStateModule.enforce;
var getInternalState = InternalStateModule.get;
// eslint-disable-next-line es-x/no-object-defineproperty -- safe
var defineProperty = Object.defineProperty;

var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function () {
  return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
});

var TEMPLATE = String(String).split('String');

var makeBuiltIn = module.exports = function (value, name, options) {
  if (String(name).slice(0, 7) === 'Symbol(') {
    name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
  }
  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;
  if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
    if (DESCRIPTORS) defineProperty(value, 'name', { value: name, configurable: true });
    else value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {
    defineProperty(value, 'length', { value: options.arity });
  }
  try {
    if (options && hasOwn(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS) defineProperty(value, 'prototype', { writable: false });
    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) { /* empty */ }
  var state = enforceInternalState(value);
  if (!hasOwn(state, 'source')) {
    state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
  } return value;
};

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn(function toString() {
  return isCallable(this) && getInternalState(this).source || inspectSource(this);
}, 'toString');


/***/ }),

/***/ 4758:
/***/ (function(module) {

var ceil = Math.ceil;
var floor = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es-x/no-math-trunc -- safe
module.exports = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor : ceil)(n);
};


/***/ }),

/***/ 133:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable es-x/no-symbol -- required for testing */
var V8_VERSION = __webpack_require__(7392);
var fails = __webpack_require__(7293);

// eslint-disable-next-line es-x/no-object-getownpropertysymbols -- required for testing
module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
});


/***/ }),

/***/ 8536:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var isCallable = __webpack_require__(614);
var inspectSource = __webpack_require__(2788);

var WeakMap = global.WeakMap;

module.exports = isCallable(WeakMap) && /native code/.test(inspectSource(WeakMap));


/***/ }),

/***/ 6277:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toString = __webpack_require__(1340);

module.exports = function (argument, $default) {
  return argument === undefined ? arguments.length < 2 ? '' : $default : toString(argument);
};


/***/ }),

/***/ 3070:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var IE8_DOM_DEFINE = __webpack_require__(4664);
var V8_PROTOTYPE_DEFINE_BUG = __webpack_require__(3353);
var anObject = __webpack_require__(9670);
var toPropertyKey = __webpack_require__(4948);

var $TypeError = TypeError;
// eslint-disable-next-line es-x/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPropertyKey(P);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw $TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ 1236:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var call = __webpack_require__(6916);
var propertyIsEnumerableModule = __webpack_require__(5296);
var createPropertyDescriptor = __webpack_require__(9114);
var toIndexedObject = __webpack_require__(5656);
var toPropertyKey = __webpack_require__(4948);
var hasOwn = __webpack_require__(2597);
var IE8_DOM_DEFINE = __webpack_require__(4664);

// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPropertyKey(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
};


/***/ }),

/***/ 8006:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__(6324);
var enumBugKeys = __webpack_require__(748);

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es-x/no-object-getownpropertynames -- safe
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ 5181:
/***/ (function(__unused_webpack_module, exports) {

// eslint-disable-next-line es-x/no-object-getownpropertysymbols -- safe
exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ 9518:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var hasOwn = __webpack_require__(2597);
var isCallable = __webpack_require__(614);
var toObject = __webpack_require__(7908);
var sharedKey = __webpack_require__(6200);
var CORRECT_PROTOTYPE_GETTER = __webpack_require__(8544);

var IE_PROTO = sharedKey('IE_PROTO');
var $Object = Object;
var ObjectPrototype = $Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es-x/no-object-getprototypeof -- safe
module.exports = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function (O) {
  var object = toObject(O);
  if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];
  var constructor = object.constructor;
  if (isCallable(constructor) && object instanceof constructor) {
    return constructor.prototype;
  } return object instanceof $Object ? ObjectPrototype : null;
};


/***/ }),

/***/ 7976:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);

module.exports = uncurryThis({}.isPrototypeOf);


/***/ }),

/***/ 6324:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);
var hasOwn = __webpack_require__(2597);
var toIndexedObject = __webpack_require__(5656);
var indexOf = (__webpack_require__(1318).indexOf);
var hiddenKeys = __webpack_require__(3501);

var push = uncurryThis([].push);

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn(O, key = names[i++])) {
    ~indexOf(result, key) || push(result, key);
  }
  return result;
};


/***/ }),

/***/ 5296:
/***/ (function(__unused_webpack_module, exports) {

"use strict";

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;


/***/ }),

/***/ 7674:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable no-proto -- safe */
var uncurryThis = __webpack_require__(1702);
var anObject = __webpack_require__(9670);
var aPossiblePrototype = __webpack_require__(6077);

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es-x/no-object-setprototypeof -- safe
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    // eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
    setter = uncurryThis(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
    setter(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ 2140:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var call = __webpack_require__(6916);
var isCallable = __webpack_require__(614);
var isObject = __webpack_require__(111);

var $TypeError = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
module.exports = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  throw $TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ 3887:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getBuiltIn = __webpack_require__(5005);
var uncurryThis = __webpack_require__(1702);
var getOwnPropertyNamesModule = __webpack_require__(8006);
var getOwnPropertySymbolsModule = __webpack_require__(5181);
var anObject = __webpack_require__(9670);

var concat = uncurryThis([].concat);

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ 2626:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var defineProperty = (__webpack_require__(3070).f);

module.exports = function (Target, Source, key) {
  key in Target || defineProperty(Target, key, {
    configurable: true,
    get: function () { return Source[key]; },
    set: function (it) { Source[key] = it; }
  });
};


/***/ }),

/***/ 4488:
/***/ (function(module) {

var $TypeError = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw $TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ 6200:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var shared = __webpack_require__(2309);
var uid = __webpack_require__(9711);

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ 5465:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var defineGlobalProperty = __webpack_require__(3072);

var SHARED = '__core-js_shared__';
var store = global[SHARED] || defineGlobalProperty(SHARED, {});

module.exports = store;


/***/ }),

/***/ 2309:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var IS_PURE = __webpack_require__(1913);
var store = __webpack_require__(5465);

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.24.1',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.24.1/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});


/***/ }),

/***/ 1400:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toIntegerOrInfinity = __webpack_require__(9303);

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toIntegerOrInfinity(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ 5656:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__(8361);
var requireObjectCoercible = __webpack_require__(4488);

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ 9303:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var trunc = __webpack_require__(4758);

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
module.exports = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};


/***/ }),

/***/ 7466:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toIntegerOrInfinity = __webpack_require__(9303);

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toIntegerOrInfinity(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ 7908:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__(4488);

var $Object = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
module.exports = function (argument) {
  return $Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ 4590:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toPositiveInteger = __webpack_require__(3002);

var $RangeError = RangeError;

module.exports = function (it, BYTES) {
  var offset = toPositiveInteger(it);
  if (offset % BYTES) throw $RangeError('Wrong offset');
  return offset;
};


/***/ }),

/***/ 3002:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toIntegerOrInfinity = __webpack_require__(9303);

var $RangeError = RangeError;

module.exports = function (it) {
  var result = toIntegerOrInfinity(it);
  if (result < 0) throw $RangeError("The argument can't be less than 0");
  return result;
};


/***/ }),

/***/ 7593:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var call = __webpack_require__(6916);
var isObject = __webpack_require__(111);
var isSymbol = __webpack_require__(2190);
var getMethod = __webpack_require__(8173);
var ordinaryToPrimitive = __webpack_require__(2140);
var wellKnownSymbol = __webpack_require__(5112);

var $TypeError = TypeError;
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
module.exports = function (input, pref) {
  if (!isObject(input) || isSymbol(input)) return input;
  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call(exoticToPrim, input, pref);
    if (!isObject(result) || isSymbol(result)) return result;
    throw $TypeError("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};


/***/ }),

/***/ 4948:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toPrimitive = __webpack_require__(7593);
var isSymbol = __webpack_require__(2190);

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
module.exports = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};


/***/ }),

/***/ 1694:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__(5112);

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ 1340:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var classof = __webpack_require__(648);

var $String = String;

module.exports = function (argument) {
  if (classof(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
  return $String(argument);
};


/***/ }),

/***/ 6330:
/***/ (function(module) {

var $String = String;

module.exports = function (argument) {
  try {
    return $String(argument);
  } catch (error) {
    return 'Object';
  }
};


/***/ }),

/***/ 9711:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var uncurryThis = __webpack_require__(1702);

var id = 0;
var postfix = Math.random();
var toString = uncurryThis(1.0.toString);

module.exports = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
};


/***/ }),

/***/ 3307:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable es-x/no-symbol -- required for testing */
var NATIVE_SYMBOL = __webpack_require__(133);

module.exports = NATIVE_SYMBOL
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';


/***/ }),

/***/ 3353:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__(9781);
var fails = __webpack_require__(7293);

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
module.exports = DESCRIPTORS && fails(function () {
  // eslint-disable-next-line es-x/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype != 42;
});


/***/ }),

/***/ 5112:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var global = __webpack_require__(7854);
var shared = __webpack_require__(2309);
var hasOwn = __webpack_require__(2597);
var uid = __webpack_require__(9711);
var NATIVE_SYMBOL = __webpack_require__(133);
var USE_SYMBOL_AS_UID = __webpack_require__(3307);

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var symbolFor = Symbol && Symbol['for'];
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!hasOwn(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    var description = 'Symbol.' + name;
    if (NATIVE_SYMBOL && hasOwn(Symbol, name)) {
      WellKnownSymbolsStore[name] = Symbol[name];
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ 9191:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var getBuiltIn = __webpack_require__(5005);
var hasOwn = __webpack_require__(2597);
var createNonEnumerableProperty = __webpack_require__(8880);
var isPrototypeOf = __webpack_require__(7976);
var setPrototypeOf = __webpack_require__(7674);
var copyConstructorProperties = __webpack_require__(9920);
var proxyAccessor = __webpack_require__(2626);
var inheritIfRequired = __webpack_require__(9587);
var normalizeStringArgument = __webpack_require__(6277);
var installErrorCause = __webpack_require__(8340);
var clearErrorStack = __webpack_require__(7741);
var ERROR_STACK_INSTALLABLE = __webpack_require__(2914);
var DESCRIPTORS = __webpack_require__(9781);
var IS_PURE = __webpack_require__(1913);

module.exports = function (FULL_NAME, wrapper, FORCED, IS_AGGREGATE_ERROR) {
  var STACK_TRACE_LIMIT = 'stackTraceLimit';
  var OPTIONS_POSITION = IS_AGGREGATE_ERROR ? 2 : 1;
  var path = FULL_NAME.split('.');
  var ERROR_NAME = path[path.length - 1];
  var OriginalError = getBuiltIn.apply(null, path);

  if (!OriginalError) return;

  var OriginalErrorPrototype = OriginalError.prototype;

  // V8 9.3- bug https://bugs.chromium.org/p/v8/issues/detail?id=12006
  if (!IS_PURE && hasOwn(OriginalErrorPrototype, 'cause')) delete OriginalErrorPrototype.cause;

  if (!FORCED) return OriginalError;

  var BaseError = getBuiltIn('Error');

  var WrappedError = wrapper(function (a, b) {
    var message = normalizeStringArgument(IS_AGGREGATE_ERROR ? b : a, undefined);
    var result = IS_AGGREGATE_ERROR ? new OriginalError(a) : new OriginalError();
    if (message !== undefined) createNonEnumerableProperty(result, 'message', message);
    if (ERROR_STACK_INSTALLABLE) createNonEnumerableProperty(result, 'stack', clearErrorStack(result.stack, 2));
    if (this && isPrototypeOf(OriginalErrorPrototype, this)) inheritIfRequired(result, this, WrappedError);
    if (arguments.length > OPTIONS_POSITION) installErrorCause(result, arguments[OPTIONS_POSITION]);
    return result;
  });

  WrappedError.prototype = OriginalErrorPrototype;

  if (ERROR_NAME !== 'Error') {
    if (setPrototypeOf) setPrototypeOf(WrappedError, BaseError);
    else copyConstructorProperties(WrappedError, BaseError, { name: true });
  } else if (DESCRIPTORS && STACK_TRACE_LIMIT in OriginalError) {
    proxyAccessor(WrappedError, OriginalError, STACK_TRACE_LIMIT);
    proxyAccessor(WrappedError, OriginalError, 'prepareStackTrace');
  }

  copyConstructorProperties(WrappedError, OriginalError);

  if (!IS_PURE) try {
    // Safari 13- bug: WebAssembly errors does not have a proper `.name`
    if (OriginalErrorPrototype.name !== ERROR_NAME) {
      createNonEnumerableProperty(OriginalErrorPrototype, 'name', ERROR_NAME);
    }
    OriginalErrorPrototype.constructor = WrappedError;
  } catch (error) { /* empty */ }

  return WrappedError;
};


/***/ }),

/***/ 1703:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

/* eslint-disable no-unused-vars -- required for functions `.length` */
var $ = __webpack_require__(2109);
var global = __webpack_require__(7854);
var apply = __webpack_require__(2104);
var wrapErrorConstructorWithCause = __webpack_require__(9191);

var WEB_ASSEMBLY = 'WebAssembly';
var WebAssembly = global[WEB_ASSEMBLY];

var FORCED = Error('e', { cause: 7 }).cause !== 7;

var exportGlobalErrorCauseWrapper = function (ERROR_NAME, wrapper) {
  var O = {};
  O[ERROR_NAME] = wrapErrorConstructorWithCause(ERROR_NAME, wrapper, FORCED);
  $({ global: true, constructor: true, arity: 1, forced: FORCED }, O);
};

var exportWebAssemblyErrorCauseWrapper = function (ERROR_NAME, wrapper) {
  if (WebAssembly && WebAssembly[ERROR_NAME]) {
    var O = {};
    O[ERROR_NAME] = wrapErrorConstructorWithCause(WEB_ASSEMBLY + '.' + ERROR_NAME, wrapper, FORCED);
    $({ target: WEB_ASSEMBLY, stat: true, constructor: true, arity: 1, forced: FORCED }, O);
  }
};

// https://github.com/tc39/proposal-error-cause
exportGlobalErrorCauseWrapper('Error', function (init) {
  return function Error(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('EvalError', function (init) {
  return function EvalError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('RangeError', function (init) {
  return function RangeError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('ReferenceError', function (init) {
  return function ReferenceError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('SyntaxError', function (init) {
  return function SyntaxError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('TypeError', function (init) {
  return function TypeError(message) { return apply(init, this, arguments); };
});
exportGlobalErrorCauseWrapper('URIError', function (init) {
  return function URIError(message) { return apply(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('CompileError', function (init) {
  return function CompileError(message) { return apply(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('LinkError', function (init) {
  return function LinkError(message) { return apply(init, this, arguments); };
});
exportWebAssemblyErrorCauseWrapper('RuntimeError', function (init) {
  return function RuntimeError(message) { return apply(init, this, arguments); };
});


/***/ }),

/***/ 8675:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__(260);
var lengthOfArrayLike = __webpack_require__(6244);
var toIntegerOrInfinity = __webpack_require__(9303);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.at` method
// https://github.com/tc39/proposal-relative-indexing-method
exportTypedArrayMethod('at', function at(index) {
  var O = aTypedArray(this);
  var len = lengthOfArrayLike(O);
  var relativeIndex = toIntegerOrInfinity(index);
  var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;
  return (k < 0 || k >= len) ? undefined : O[k];
});


/***/ }),

/***/ 2958:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__(260);
var $findLastIndex = (__webpack_require__(9671).findLastIndex);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.findLastIndex` method
// https://github.com/tc39/proposal-array-find-from-last
exportTypedArrayMethod('findLastIndex', function findLastIndex(predicate /* , thisArg */) {
  return $findLastIndex(aTypedArray(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ 3408:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var ArrayBufferViewCore = __webpack_require__(260);
var $findLast = (__webpack_require__(9671).findLast);

var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

// `%TypedArray%.prototype.findLast` method
// https://github.com/tc39/proposal-array-find-from-last
exportTypedArrayMethod('findLast', function findLast(predicate /* , thisArg */) {
  return $findLast(aTypedArray(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
});


/***/ }),

/***/ 3462:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(7854);
var call = __webpack_require__(6916);
var ArrayBufferViewCore = __webpack_require__(260);
var lengthOfArrayLike = __webpack_require__(6244);
var toOffset = __webpack_require__(4590);
var toIndexedObject = __webpack_require__(7908);
var fails = __webpack_require__(7293);

var RangeError = global.RangeError;
var Int8Array = global.Int8Array;
var Int8ArrayPrototype = Int8Array && Int8Array.prototype;
var $set = Int8ArrayPrototype && Int8ArrayPrototype.set;
var aTypedArray = ArrayBufferViewCore.aTypedArray;
var exportTypedArrayMethod = ArrayBufferViewCore.exportTypedArrayMethod;

var WORKS_WITH_OBJECTS_AND_GEERIC_ON_TYPED_ARRAYS = !fails(function () {
  // eslint-disable-next-line es-x/no-typed-arrays -- required for testing
  var array = new Uint8ClampedArray(2);
  call($set, array, { length: 1, 0: 3 }, 1);
  return array[1] !== 3;
});

// https://bugs.chromium.org/p/v8/issues/detail?id=11294 and other
var TO_OBJECT_BUG = WORKS_WITH_OBJECTS_AND_GEERIC_ON_TYPED_ARRAYS && ArrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS && fails(function () {
  var array = new Int8Array(2);
  array.set(1);
  array.set('2', 1);
  return array[0] !== 0 || array[1] !== 2;
});

// `%TypedArray%.prototype.set` method
// https://tc39.es/ecma262/#sec-%typedarray%.prototype.set
exportTypedArrayMethod('set', function set(arrayLike /* , offset */) {
  aTypedArray(this);
  var offset = toOffset(arguments.length > 1 ? arguments[1] : undefined, 1);
  var src = toIndexedObject(arrayLike);
  if (WORKS_WITH_OBJECTS_AND_GEERIC_ON_TYPED_ARRAYS) return call($set, this, src, offset);
  var length = this.length;
  var len = lengthOfArrayLike(src);
  var index = 0;
  if (len + offset > length) throw RangeError('Wrong length');
  while (index < len) this[offset + index] = src[index++];
}, !WORKS_WITH_OBJECTS_AND_GEERIC_ON_TYPED_ARRAYS || TO_OBJECT_BUG);


/***/ }),

/***/ 1118:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// TODO: Remove from `core-js@4`
__webpack_require__(2958);


/***/ }),

/***/ 7380:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

// TODO: Remove from `core-js@4`
__webpack_require__(3408);


/***/ }),

/***/ 2801:
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__(2109);
var global = __webpack_require__(7854);
var getBuiltIn = __webpack_require__(5005);
var createPropertyDescriptor = __webpack_require__(9114);
var defineProperty = (__webpack_require__(3070).f);
var hasOwn = __webpack_require__(2597);
var anInstance = __webpack_require__(5787);
var inheritIfRequired = __webpack_require__(9587);
var normalizeStringArgument = __webpack_require__(6277);
var DOMExceptionConstants = __webpack_require__(3678);
var clearErrorStack = __webpack_require__(7741);
var DESCRIPTORS = __webpack_require__(9781);
var IS_PURE = __webpack_require__(1913);

var DOM_EXCEPTION = 'DOMException';
var Error = getBuiltIn('Error');
var NativeDOMException = getBuiltIn(DOM_EXCEPTION);

var $DOMException = function DOMException() {
  anInstance(this, DOMExceptionPrototype);
  var argumentsLength = arguments.length;
  var message = normalizeStringArgument(argumentsLength < 1 ? undefined : arguments[0]);
  var name = normalizeStringArgument(argumentsLength < 2 ? undefined : arguments[1], 'Error');
  var that = new NativeDOMException(message, name);
  var error = Error(message);
  error.name = DOM_EXCEPTION;
  defineProperty(that, 'stack', createPropertyDescriptor(1, clearErrorStack(error.stack, 1)));
  inheritIfRequired(that, this, $DOMException);
  return that;
};

var DOMExceptionPrototype = $DOMException.prototype = NativeDOMException.prototype;

var ERROR_HAS_STACK = 'stack' in Error(DOM_EXCEPTION);
var DOM_EXCEPTION_HAS_STACK = 'stack' in new NativeDOMException(1, 2);

// eslint-disable-next-line es-x/no-object-getownpropertydescriptor -- safe
var descriptor = NativeDOMException && DESCRIPTORS && Object.getOwnPropertyDescriptor(global, DOM_EXCEPTION);

// Bun ~ 0.1.1 DOMException have incorrect descriptor and we can't redefine it
// https://github.com/Jarred-Sumner/bun/issues/399
var BUGGY_DESCRIPTOR = !!descriptor && !(descriptor.writable && descriptor.configurable);

var FORCED_CONSTRUCTOR = ERROR_HAS_STACK && !BUGGY_DESCRIPTOR && !DOM_EXCEPTION_HAS_STACK;

// `DOMException` constructor patch for `.stack` where it's required
// https://webidl.spec.whatwg.org/#es-DOMException-specialness
$({ global: true, constructor: true, forced: IS_PURE || FORCED_CONSTRUCTOR }, { // TODO: fix export logic
  DOMException: FORCED_CONSTRUCTOR ? $DOMException : NativeDOMException
});

var PolyfilledDOMException = getBuiltIn(DOM_EXCEPTION);
var PolyfilledDOMExceptionPrototype = PolyfilledDOMException.prototype;

if (PolyfilledDOMExceptionPrototype.constructor !== PolyfilledDOMException) {
  if (!IS_PURE) {
    defineProperty(PolyfilledDOMExceptionPrototype, 'constructor', createPropertyDescriptor(1, PolyfilledDOMException));
  }

  for (var key in DOMExceptionConstants) if (hasOwn(DOMExceptionConstants, key)) {
    var constant = DOMExceptionConstants[key];
    var constantName = constant.s;
    if (!hasOwn(PolyfilledDOMException, constantName)) {
      defineProperty(PolyfilledDOMException, constantName, createPropertyDescriptor(6, constant.c));
    }
  }
}


/***/ }),

/***/ 824:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8081);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".dimple-lowcode-conatiner[data-v-e7bfadce]{height:100%;width:100%;overflow:hidden;display:flex;flex-direction:column;background:#f0f2f5}.header[data-v-e7bfadce]{height:48px;background:#fff;display:flex;align-items:center;justify-content:center;padding:0 10px}.header .title[data-v-e7bfadce]{font-weight:500}.selection[data-v-e7bfadce]{flex:1;padding:5px}.material[data-v-e7bfadce],.selection[data-v-e7bfadce]{overflow:hidden;display:flex}.material[data-v-e7bfadce]{width:25%;height:100%;background:#fff;flex-direction:column}.content[data-v-e7bfadce]{flex:1;height:100%;overflow:overlay;margin:0 1%}.content-component-item[data-v-e7bfadce]{height:100%;width:100%;overflow:hidden;position:relative}.content-component-item-mask[data-v-e7bfadce]{position:absolute;height:100%;width:100%;z-index:1;box-sizing:border-box;text-align:right;padding:4px;padding-top:2px}.content-component-item-mask .icon[data-v-e7bfadce]{display:none;color:#f56c6c}.content-component-item-mask[data-v-e7bfadce]:hover{border:1px dashed rgba(21,59,184,.3);background:rgba(21,59,184,.05)}.content-component-item-mask:hover .icon[data-v-e7bfadce]{display:inline-block;cursor:pointer}.content-component-item-mask-active[data-v-e7bfadce]{border:1px dashed rgba(21,59,184,.3);background:rgba(21,59,184,.05)}.content-component-item-mask-active .icon[data-v-e7bfadce]{display:inline-block;cursor:pointer}.options[data-v-e7bfadce]{width:25%;height:100%;overflow:overlay;background:#fff}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 2903:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8081);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".dimple-lowcode-conatiner .vue-grid-item.vue-grid-placeholder{box-sizing:border-box;border:1px dashed rgba(0,0,255,.2);background:rgba(0,0,255,.2)}.dimple-lowcode-conatiner .vue-grid-item{box-sizing:border-box;touch-action:none;min-height:1px!important}.dimple-lowcode-conatiner .vue-grid-item .vue-resizable-handle{display:none}.dimple-lowcode-conatiner .vue-grid-item:hover .vue-resizable-handle{display:inline-block;z-index:3}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 9968:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8081);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".dimple-lowcode-configs[data-v-caae7ab8]{width:100%;height:100%;overflow:hidden;display:flex;flex-direction:column}.no-data[data-v-caae7ab8]{padding:20px;text-align:center;color:#909399;font-size:13px}.main[data-v-caae7ab8]{flex:1;overflow:overlay;padding:0 20px}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 7936:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8081);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".rules-editor[data-v-78fb8f85]{max-height:50vh;overflow:overlay}.rules-editor-item[data-v-78fb8f85]{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px}.rules-editor-item-type[data-v-78fb8f85]{width:30%;margin-right:5px}.rules-editor-item-input[data-v-78fb8f85]{flex:1;margin-right:5px}.rules-editor-add-btn[data-v-78fb8f85]{text-align:center;margin-top:10px}.no-data[data-v-78fb8f85]{text-align:center;padding:10px}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 5595:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8081);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".options-editor[data-v-e39386b0]{max-height:50vh;overflow:overlay}.options-editor-item[data-v-e39386b0]{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px}.options-editor-item-input[data-v-e39386b0]{flex:1;margin:0 5px}.options-editor-add-btn[data-v-e39386b0]{text-align:center;margin-top:10px}.no-data[data-v-e39386b0]{text-align:center;padding:10px}.flex[data-v-e39386b0]{display:flex}.flex-1[data-v-e39386b0]{flex:1}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 4865:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8081);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".ui-aiot-form-item[data-v-18aae6bd]{margin-bottom:20px;font-size:14px}.label[data-v-18aae6bd],.ui-aiot-form-item[data-v-18aae6bd]{display:flex;align-items:center}.label[data-v-18aae6bd]{margin-right:10px;height:30px}.label.right[data-v-18aae6bd]{justify-content:flex-end}.label.left[data-v-18aae6bd]{justify-content:flex-start}.required-icon[data-v-18aae6bd]{margin-right:5px;margin-top:8px;color:#dd3914}.tip-icon[data-v-18aae6bd]{color:#999}.content[data-v-18aae6bd]{position:relative}.select[data-v-18aae6bd]{width:100%}.content .se[data-v-18aae6bd]{width:160px}.content .mini[data-v-18aae6bd]{width:320px}.content .mini .radio-group[data-v-18aae6bd]{margin-top:4px}.content .mini .checkbox[data-v-18aae6bd],.content .mini .radio[data-v-18aae6bd]{margin-bottom:16px}.content .small[data-v-18aae6bd]{width:480px}.content .medium[data-v-18aae6bd]{width:720px}.aiot-confirm-button[data-v-18aae6bd],.aiot-confirm-button[data-v-18aae6bd]:active,.aiot-confirm-button[data-v-18aae6bd]:focus,.aiot-confirm-button[data-v-18aae6bd]:hover{border:1px solid #4066e2!important}.error-message[data-v-18aae6bd]{display:flex;align-items:center;color:#dd3914}.error-message .tip[data-v-18aae6bd]{color:#999}.error-message .inline[data-v-18aae6bd]{position:absolute;top:0;left:calc(100% + 10px);height:100%;white-space:nowrap}.error-message .block[data-v-18aae6bd]{margin-top:10px}.error-message-icon[data-v-18aae6bd]{margin-right:10px}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 2690:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8081);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".ui-aiot-form-item .el-textarea__inner{font-size:15px!important;resize:none}.ui-aiot-form-item .el-range-input{font-size:14px!important}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 9154:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8081);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".dimple-lowcode-form-configs[data-v-5958cc28]{height:100%;width:100%;overflow:hidden;display:flex;flex-direction:column}.main[data-v-5958cc28]{flex:1;overflow:overlay;padding:0 20px}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 3515:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8081);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".dimple-lowcode-materials[data-v-08929ae5]{width:100%;height:100%;display:flex;flex-direction:column}.components[data-v-08929ae5]{flex:1;overflow:overlay;padding:10px 20px}.component-item[data-v-08929ae5]{padding:10px;margin-bottom:20px;box-shadow:0 0 10px rgba(128,145,165,.2);transition:all .3s}.component-item[data-v-08929ae5]:hover{box-shadow:0 6px 16px 0 rgba(0,0,0,.15);border-color:transparent}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 181:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8081);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".options-editor[data-v-f7af5492]{max-height:50vh;overflow:overlay}.options-editor-item[data-v-f7af5492]{display:flex;align-items:center;justify-content:space-between;margin-bottom:20px}.options-editor-item-input[data-v-f7af5492]{flex:1;margin:0 5px}.options-editor-add-btn[data-v-f7af5492]{text-align:center;margin-top:10px}.no-data[data-v-f7af5492]{text-align:center;padding:10px}", ""]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 3645:
/***/ (function(module) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ 8081:
/***/ (function(module) {

"use strict";


module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ 2084:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__(4637);

/***/ }),

/***/ 2627:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


__webpack_require__(2801);

var utils = __webpack_require__(9962);

var settle = __webpack_require__(8312);

var cookies = __webpack_require__(4937);

var buildURL = __webpack_require__(9862);

var buildFullPath = __webpack_require__(6536);

var parseHeaders = __webpack_require__(1119);

var isURLSameOrigin = __webpack_require__(9155);

var transitionalDefaults = __webpack_require__(3695);

var AxiosError = __webpack_require__(8625);

var CanceledError = __webpack_require__(9255);

var parseProtocol = __webpack_require__(4117);

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;
    var responseType = config.responseType;
    var onCanceled;

    function done() {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(onCanceled);
      }

      if (config.signal) {
        config.signal.removeEventListener('abort', onCanceled);
      }
    }

    if (utils.isFormData(requestData) && utils.isStandardBrowserEnv()) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest(); // HTTP basic authentication

    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true); // Set the request timeout in MS

    request.timeout = config.timeout;

    function onloadend() {
      if (!request) {
        return;
      } // Prepare the response


      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !responseType || responseType === 'text' || responseType === 'json' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };
      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response); // Clean up request

      request = null;
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        } // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request


        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        } // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'


        setTimeout(onloadend);
      };
    } // Handle browser request cancellation (as opposed to a manual cancellation)


    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(new AxiosError('Request aborted', AxiosError.ECONNABORTED, config, request)); // Clean up request

      request = null;
    }; // Handle low level network errors


    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(new AxiosError('Network Error', AxiosError.ERR_NETWORK, config, request, request)); // Clean up request

      request = null;
    }; // Handle timeout


    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = config.timeout ? 'timeout of ' + config.timeout + 'ms exceeded' : 'timeout exceeded';
      var transitional = config.transitional || transitionalDefaults;

      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }

      reject(new AxiosError(timeoutErrorMessage, transitional.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED, config, request)); // Clean up request

      request = null;
    }; // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.


    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ? cookies.read(config.xsrfCookieName) : undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    } // Add headers to the request


    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    } // Add withCredentials to request if needed


    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    } // Add responseType to request if needed


    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    } // Handle progress if needed


    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    } // Not all browsers support upload events


    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken || config.signal) {
      // Handle cancellation
      // eslint-disable-next-line func-names
      onCanceled = function (cancel) {
        if (!request) {
          return;
        }

        reject(!cancel || cancel && cancel.type ? new CanceledError() : cancel);
        request.abort();
        request = null;
      };

      config.cancelToken && config.cancelToken.subscribe(onCanceled);

      if (config.signal) {
        config.signal.aborted ? onCanceled() : config.signal.addEventListener('abort', onCanceled);
      }
    }

    if (!requestData) {
      requestData = null;
    }

    var protocol = parseProtocol(fullPath);

    if (protocol && ['http', 'https', 'file'].indexOf(protocol) === -1) {
      reject(new AxiosError('Unsupported protocol ' + protocol + ':', AxiosError.ERR_BAD_REQUEST, config));
      return;
    } // Send the request


    request.send(requestData);
  });
};

/***/ }),

/***/ 4637:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(9962);

var bind = __webpack_require__(6781);

var Axios = __webpack_require__(551);

var mergeConfig = __webpack_require__(1279);

var defaults = __webpack_require__(2403);
/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */


function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context); // Copy axios.prototype to instance

  utils.extend(instance, Axios.prototype, context); // Copy context to instance

  utils.extend(instance, context); // Factory for creating new instances

  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };

  return instance;
} // Create the default instance to be exported


var axios = createInstance(defaults); // Expose Axios class to allow class inheritance

axios.Axios = Axios; // Expose Cancel & CancelToken

axios.CanceledError = __webpack_require__(9255);
axios.CancelToken = __webpack_require__(9904);
axios.isCancel = __webpack_require__(5475);
axios.VERSION = (__webpack_require__(5606).version);
axios.toFormData = __webpack_require__(1326); // Expose AxiosError class

axios.AxiosError = __webpack_require__(8625); // alias for CanceledError for backward compatibility

axios.Cancel = axios.CanceledError; // Expose all/spread

axios.all = function all(promises) {
  return Promise.all(promises);
};

axios.spread = __webpack_require__(2526); // Expose isAxiosError

axios.isAxiosError = __webpack_require__(2767);
module.exports = axios; // Allow use of default import syntax in TypeScript

module.exports["default"] = axios;

/***/ }),

/***/ 9904:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


__webpack_require__(1703);

var CanceledError = __webpack_require__(9255);
/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */


function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });
  var token = this; // eslint-disable-next-line func-names

  this.promise.then(function (cancel) {
    if (!token._listeners) return;
    var i;
    var l = token._listeners.length;

    for (i = 0; i < l; i++) {
      token._listeners[i](cancel);
    }

    token._listeners = null;
  }); // eslint-disable-next-line func-names

  this.promise.then = function (onfulfilled) {
    var _resolve; // eslint-disable-next-line func-names


    var promise = new Promise(function (resolve) {
      token.subscribe(resolve);
      _resolve = resolve;
    }).then(onfulfilled);

    promise.cancel = function reject() {
      token.unsubscribe(_resolve);
    };

    return promise;
  };

  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new CanceledError(message);
    resolvePromise(token.reason);
  });
}
/**
 * Throws a `CanceledError` if cancellation has been requested.
 */


CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};
/**
 * Subscribe to the cancel signal
 */


CancelToken.prototype.subscribe = function subscribe(listener) {
  if (this.reason) {
    listener(this.reason);
    return;
  }

  if (this._listeners) {
    this._listeners.push(listener);
  } else {
    this._listeners = [listener];
  }
};
/**
 * Unsubscribe from the cancel signal
 */


CancelToken.prototype.unsubscribe = function unsubscribe(listener) {
  if (!this._listeners) {
    return;
  }

  var index = this._listeners.indexOf(listener);

  if (index !== -1) {
    this._listeners.splice(index, 1);
  }
};
/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */


CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;

/***/ }),

/***/ 9255:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var AxiosError = __webpack_require__(8625);

var utils = __webpack_require__(9962);
/**
 * A `CanceledError` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */


function CanceledError(message) {
  // eslint-disable-next-line no-eq-null,eqeqeq
  AxiosError.call(this, message == null ? 'canceled' : message, AxiosError.ERR_CANCELED);
  this.name = 'CanceledError';
}

utils.inherits(CanceledError, AxiosError, {
  __CANCEL__: true
});
module.exports = CanceledError;

/***/ }),

/***/ 5475:
/***/ (function(module) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

/***/ }),

/***/ 551:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(9962);

var buildURL = __webpack_require__(9862);

var InterceptorManager = __webpack_require__(7370);

var dispatchRequest = __webpack_require__(5994);

var mergeConfig = __webpack_require__(1279);

var buildFullPath = __webpack_require__(6536);

var validator = __webpack_require__(2877);

var validators = validator.validators;
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */

function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}
/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */


Axios.prototype.request = function request(configOrUrl, config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof configOrUrl === 'string') {
    config = config || {};
    config.url = configOrUrl;
  } else {
    config = configOrUrl || {};
  }

  config = mergeConfig(this.defaults, config); // Set config.method

  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  var transitional = config.transitional;

  if (transitional !== undefined) {
    validator.assertOptions(transitional, {
      silentJSONParsing: validators.transitional(validators.boolean),
      forcedJSONParsing: validators.transitional(validators.boolean),
      clarifyTimeoutError: validators.transitional(validators.boolean)
    }, false);
  } // filter out skipped interceptors


  var requestInterceptorChain = [];
  var synchronousRequestInterceptors = true;
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
      return;
    }

    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  });
  var responseInterceptorChain = [];
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  });
  var promise;

  if (!synchronousRequestInterceptors) {
    var chain = [dispatchRequest, undefined];
    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    chain = chain.concat(responseInterceptorChain);
    promise = Promise.resolve(config);

    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  }

  var newConfig = config;

  while (requestInterceptorChain.length) {
    var onFulfilled = requestInterceptorChain.shift();
    var onRejected = requestInterceptorChain.shift();

    try {
      newConfig = onFulfilled(newConfig);
    } catch (error) {
      onRejected(error);
      break;
    }
  }

  try {
    promise = dispatchRequest(newConfig);
  } catch (error) {
    return Promise.reject(error);
  }

  while (responseInterceptorChain.length) {
    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  var fullPath = buildFullPath(config.baseURL, config.url);
  return buildURL(fullPath, config.params, config.paramsSerializer);
}; // Provide aliases for supported request methods


utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function (url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});
utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data, config) {
      return this.request(mergeConfig(config || {}, {
        method: method,
        headers: isForm ? {
          'Content-Type': 'multipart/form-data'
        } : {},
        url: url,
        data: data
      }));
    };
  }

  Axios.prototype[method] = generateHTTPMethod();
  Axios.prototype[method + 'Form'] = generateHTTPMethod(true);
});
module.exports = Axios;

/***/ }),

/***/ 8625:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


__webpack_require__(1703);

var utils = __webpack_require__(9962);
/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [config] The config.
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */


function AxiosError(message, code, config, request, response) {
  Error.call(this);
  this.message = message;
  this.name = 'AxiosError';
  code && (this.code = code);
  config && (this.config = config);
  request && (this.request = request);
  response && (this.response = response);
}

utils.inherits(AxiosError, Error, {
  toJSON: function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});
var prototype = AxiosError.prototype;
var descriptors = {};
['ERR_BAD_OPTION_VALUE', 'ERR_BAD_OPTION', 'ECONNABORTED', 'ETIMEDOUT', 'ERR_NETWORK', 'ERR_FR_TOO_MANY_REDIRECTS', 'ERR_DEPRECATED', 'ERR_BAD_RESPONSE', 'ERR_BAD_REQUEST', 'ERR_CANCELED' // eslint-disable-next-line func-names
].forEach(function (code) {
  descriptors[code] = {
    value: code
  };
});
Object.defineProperties(AxiosError, descriptors);
Object.defineProperty(prototype, 'isAxiosError', {
  value: true
}); // eslint-disable-next-line func-names

AxiosError.from = function (error, code, config, request, response, customProps) {
  var axiosError = Object.create(prototype);
  utils.toFlatObject(error, axiosError, function filter(obj) {
    return obj !== Error.prototype;
  });
  AxiosError.call(axiosError, error.message, code, config, request, response);
  axiosError.name = error.name;
  customProps && Object.assign(axiosError, customProps);
  return axiosError;
};

module.exports = AxiosError;

/***/ }),

/***/ 7370:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(9962);

function InterceptorManager() {
  this.handlers = [];
}
/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */


InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected,
    synchronous: options ? options.synchronous : false,
    runWhen: options ? options.runWhen : null
  });
  return this.handlers.length - 1;
};
/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */


InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};
/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */


InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;

/***/ }),

/***/ 6536:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var isAbsoluteURL = __webpack_require__(3497);

var combineURLs = __webpack_require__(9604);
/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */


module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }

  return requestedURL;
};

/***/ }),

/***/ 5994:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(9962);

var transformData = __webpack_require__(4600);

var isCancel = __webpack_require__(5475);

var defaults = __webpack_require__(2403);

var CanceledError = __webpack_require__(9255);
/**
 * Throws a `CanceledError` if cancellation has been requested.
 */


function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }

  if (config.signal && config.signal.aborted) {
    throw new CanceledError();
  }
}
/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */


module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config); // Ensure headers exist

  config.headers = config.headers || {}; // Transform request data

  config.data = transformData.call(config, config.data, config.headers, config.transformRequest); // Flatten headers

  config.headers = utils.merge(config.headers.common || {}, config.headers[config.method] || {}, config.headers);
  utils.forEach(['delete', 'get', 'head', 'post', 'put', 'patch', 'common'], function cleanHeaderConfig(method) {
    delete config.headers[method];
  });
  var adapter = config.adapter || defaults.adapter;
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config); // Transform response data

    response.data = transformData.call(config, response.data, response.headers, config.transformResponse);
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config); // Transform response data

      if (reason && reason.response) {
        reason.response.data = transformData.call(config, reason.response.data, reason.response.headers, config.transformResponse);
      }
    }

    return Promise.reject(reason);
  });
};

/***/ }),

/***/ 1279:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(9962);
/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */


module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }

    return source;
  } // eslint-disable-next-line consistent-return


  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      return getMergedValue(undefined, config1[prop]);
    }
  } // eslint-disable-next-line consistent-return


  function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(undefined, config2[prop]);
    }
  } // eslint-disable-next-line consistent-return


  function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      return getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      return getMergedValue(undefined, config1[prop]);
    }
  } // eslint-disable-next-line consistent-return


  function mergeDirectKeys(prop) {
    if (prop in config2) {
      return getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      return getMergedValue(undefined, config1[prop]);
    }
  }

  var mergeMap = {
    'url': valueFromConfig2,
    'method': valueFromConfig2,
    'data': valueFromConfig2,
    'baseURL': defaultToConfig2,
    'transformRequest': defaultToConfig2,
    'transformResponse': defaultToConfig2,
    'paramsSerializer': defaultToConfig2,
    'timeout': defaultToConfig2,
    'timeoutMessage': defaultToConfig2,
    'withCredentials': defaultToConfig2,
    'adapter': defaultToConfig2,
    'responseType': defaultToConfig2,
    'xsrfCookieName': defaultToConfig2,
    'xsrfHeaderName': defaultToConfig2,
    'onUploadProgress': defaultToConfig2,
    'onDownloadProgress': defaultToConfig2,
    'decompress': defaultToConfig2,
    'maxContentLength': defaultToConfig2,
    'maxBodyLength': defaultToConfig2,
    'beforeRedirect': defaultToConfig2,
    'transport': defaultToConfig2,
    'httpAgent': defaultToConfig2,
    'httpsAgent': defaultToConfig2,
    'cancelToken': defaultToConfig2,
    'socketPath': defaultToConfig2,
    'responseEncoding': defaultToConfig2,
    'validateStatus': mergeDirectKeys
  };
  utils.forEach(Object.keys(config1).concat(Object.keys(config2)), function computeConfigValue(prop) {
    var merge = mergeMap[prop] || mergeDeepProperties;
    var configValue = merge(prop);
    utils.isUndefined(configValue) && merge !== mergeDirectKeys || (config[prop] = configValue);
  });
  return config;
};

/***/ }),

/***/ 8312:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var AxiosError = __webpack_require__(8625);
/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */


module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;

  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(new AxiosError('Request failed with status code ' + response.status, [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4], response.config, response.request, response));
  }
};

/***/ }),

/***/ 4600:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(9962);

var defaults = __webpack_require__(2403);
/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */


module.exports = function transformData(data, headers, fns) {
  var context = this || defaults;
  /*eslint no-param-reassign:0*/

  utils.forEach(fns, function transform(fn) {
    data = fn.call(context, data, headers);
  });
  return data;
};

/***/ }),

/***/ 2403:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(9962);

var normalizeHeaderName = __webpack_require__(1954);

var AxiosError = __webpack_require__(8625);

var transitionalDefaults = __webpack_require__(3695);

var toFormData = __webpack_require__(1326);

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;

  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(2627);
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(2627);
  }

  return adapter;
}

function stringifySafely(rawValue, parser, encoder) {
  if (utils.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils.trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

var defaults = {
  transitional: transitionalDefaults,
  adapter: getDefaultAdapter(),
  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');

    if (utils.isFormData(data) || utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
      return data;
    }

    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }

    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }

    var isObjectPayload = utils.isObject(data);
    var contentType = headers && headers['Content-Type'];
    var isFileList;

    if ((isFileList = utils.isFileList(data)) || isObjectPayload && contentType === 'multipart/form-data') {
      var _FormData = this.env && this.env.FormData;

      return toFormData(isFileList ? {
        'files[]': data
      } : data, _FormData && new _FormData());
    } else if (isObjectPayload || contentType === 'application/json') {
      setContentTypeIfUnset(headers, 'application/json');
      return stringifySafely(data);
    }

    return data;
  }],
  transformResponse: [function transformResponse(data) {
    var transitional = this.transitional || defaults.transitional;
    var silentJSONParsing = transitional && transitional.silentJSONParsing;
    var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';

    if (strictJSONParsing || forcedJSONParsing && utils.isString(data) && data.length) {
      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw AxiosError.from(e, AxiosError.ERR_BAD_RESPONSE, this, null, this.response);
          }

          throw e;
        }
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: __webpack_require__(4953)
  },
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },
  headers: {
    common: {
      'Accept': 'application/json, text/plain, */*'
    }
  }
};
utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});
utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});
module.exports = defaults;

/***/ }),

/***/ 3695:
/***/ (function(module) {

"use strict";


module.exports = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};

/***/ }),

/***/ 5606:
/***/ (function(module) {

module.exports = {
  "version": "0.27.2"
};

/***/ }),

/***/ 6781:
/***/ (function(module) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);

    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }

    return fn.apply(thisArg, args);
  };
};

/***/ }),

/***/ 9862:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(9962);

function encode(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
}
/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */


module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;

  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];
    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }

        parts.push(encode(key) + '=' + encode(v));
      });
    });
    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');

    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

/***/ }),

/***/ 9604:
/***/ (function(module) {

"use strict";

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */

module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') : baseURL;
};

/***/ }),

/***/ 4937:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(9962);

module.exports = utils.isStandardBrowserEnv() ? // Standard browser envs support document.cookie
function standardBrowserEnv() {
  return {
    write: function write(name, value, expires, path, domain, secure) {
      var cookie = [];
      cookie.push(name + '=' + encodeURIComponent(value));

      if (utils.isNumber(expires)) {
        cookie.push('expires=' + new Date(expires).toGMTString());
      }

      if (utils.isString(path)) {
        cookie.push('path=' + path);
      }

      if (utils.isString(domain)) {
        cookie.push('domain=' + domain);
      }

      if (secure === true) {
        cookie.push('secure');
      }

      document.cookie = cookie.join('; ');
    },
    read: function read(name) {
      var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
      return match ? decodeURIComponent(match[3]) : null;
    },
    remove: function remove(name) {
      this.write(name, '', Date.now() - 86400000);
    }
  };
}() : // Non standard browser env (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
  return {
    write: function write() {},
    read: function read() {
      return null;
    },
    remove: function remove() {}
  };
}();

/***/ }),

/***/ 3497:
/***/ (function(module) {

"use strict";

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */

module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
};

/***/ }),

/***/ 2767:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(9962);
/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */


module.exports = function isAxiosError(payload) {
  return utils.isObject(payload) && payload.isAxiosError === true;
};

/***/ }),

/***/ 9155:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(9962);

module.exports = utils.isStandardBrowserEnv() ? // Standard browser envs have full support of the APIs needed to test
// whether the request URL is of the same origin as current location.
function standardBrowserEnv() {
  var msie = /(msie|trident)/i.test(navigator.userAgent);
  var urlParsingNode = document.createElement('a');
  var originURL;
  /**
  * Parse a URL to discover it's components
  *
  * @param {String} url The URL to be parsed
  * @returns {Object}
  */

  function resolveURL(url) {
    var href = url;

    if (msie) {
      // IE needs attribute set twice to normalize properties
      urlParsingNode.setAttribute('href', href);
      href = urlParsingNode.href;
    }

    urlParsingNode.setAttribute('href', href); // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils

    return {
      href: urlParsingNode.href,
      protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
      host: urlParsingNode.host,
      search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
      hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
      hostname: urlParsingNode.hostname,
      port: urlParsingNode.port,
      pathname: urlParsingNode.pathname.charAt(0) === '/' ? urlParsingNode.pathname : '/' + urlParsingNode.pathname
    };
  }

  originURL = resolveURL(window.location.href);
  /**
  * Determine if a URL shares the same origin as the current location
  *
  * @param {String} requestURL The URL to test
  * @returns {boolean} True if URL shares the same origin, otherwise false
  */

  return function isURLSameOrigin(requestURL) {
    var parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
    return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
  };
}() : // Non standard browser envs (web workers, react-native) lack needed support.
function nonStandardBrowserEnv() {
  return function isURLSameOrigin() {
    return true;
  };
}();

/***/ }),

/***/ 1954:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(9962);

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

/***/ }),

/***/ 4953:
/***/ (function(module) {

// eslint-disable-next-line strict
module.exports = null;

/***/ }),

/***/ 1119:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(9962); // Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers


var ignoreDuplicateOf = ['age', 'authorization', 'content-length', 'content-type', 'etag', 'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since', 'last-modified', 'location', 'max-forwards', 'proxy-authorization', 'referer', 'retry-after', 'user-agent'];
/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */

module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) {
    return parsed;
  }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }

      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });
  return parsed;
};

/***/ }),

/***/ 4117:
/***/ (function(module) {

"use strict";


module.exports = function parseProtocol(url) {
  var match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  return match && match[1] || '';
};

/***/ }),

/***/ 2526:
/***/ (function(module) {

"use strict";

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */

module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

/***/ }),

/***/ 1326:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


__webpack_require__(1703);

var utils = __webpack_require__(9962);
/**
 * Convert a data object to FormData
 * @param {Object} obj
 * @param {?Object} [formData]
 * @returns {Object}
 **/


function toFormData(obj, formData) {
  // eslint-disable-next-line no-param-reassign
  formData = formData || new FormData();
  var stack = [];

  function convertValue(value) {
    if (value === null) return '';

    if (utils.isDate(value)) {
      return value.toISOString();
    }

    if (utils.isArrayBuffer(value) || utils.isTypedArray(value)) {
      return typeof Blob === 'function' ? new Blob([value]) : Buffer.from(value);
    }

    return value;
  }

  function build(data, parentKey) {
    if (utils.isPlainObject(data) || utils.isArray(data)) {
      if (stack.indexOf(data) !== -1) {
        throw Error('Circular reference detected in ' + parentKey);
      }

      stack.push(data);
      utils.forEach(data, function each(value, key) {
        if (utils.isUndefined(value)) return;
        var fullKey = parentKey ? parentKey + '.' + key : key;
        var arr;

        if (value && !parentKey && typeof value === 'object') {
          if (utils.endsWith(key, '{}')) {
            // eslint-disable-next-line no-param-reassign
            value = JSON.stringify(value);
          } else if (utils.endsWith(key, '[]') && (arr = utils.toArray(value))) {
            // eslint-disable-next-line func-names
            arr.forEach(function (el) {
              !utils.isUndefined(el) && formData.append(fullKey, convertValue(el));
            });
            return;
          }
        }

        build(value, fullKey);
      });
      stack.pop();
    } else {
      formData.append(parentKey, convertValue(data));
    }
  }

  build(obj);
  return formData;
}

module.exports = toFormData;

/***/ }),

/***/ 2877:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


var VERSION = (__webpack_require__(5606).version);

var AxiosError = __webpack_require__(8625);

var validators = {}; // eslint-disable-next-line func-names

['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function (type, i) {
  validators[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});
var deprecatedWarnings = {};
/**
 * Transitional option validator
 * @param {function|boolean?} validator - set to false if the transitional option has been removed
 * @param {string?} version - deprecated version / removed since version
 * @param {string?} message - some message with additional info
 * @returns {function}
 */

validators.transitional = function transitional(validator, version, message) {
  function formatMessage(opt, desc) {
    return '[Axios v' + VERSION + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  } // eslint-disable-next-line func-names


  return function (value, opt, opts) {
    if (validator === false) {
      throw new AxiosError(formatMessage(opt, ' has been removed' + (version ? ' in ' + version : '')), AxiosError.ERR_DEPRECATED);
    }

    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true; // eslint-disable-next-line no-console

      console.warn(formatMessage(opt, ' has been deprecated since v' + version + ' and will be removed in the near future'));
    }

    return validator ? validator(value, opt, opts) : true;
  };
};
/**
 * Assert object's properties type
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 */


function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new AxiosError('options must be an object', AxiosError.ERR_BAD_OPTION_VALUE);
  }

  var keys = Object.keys(options);
  var i = keys.length;

  while (i-- > 0) {
    var opt = keys[i];
    var validator = schema[opt];

    if (validator) {
      var value = options[opt];
      var result = value === undefined || validator(value, opt, options);

      if (result !== true) {
        throw new AxiosError('option ' + opt + ' must be ' + result, AxiosError.ERR_BAD_OPTION_VALUE);
      }

      continue;
    }

    if (allowUnknown !== true) {
      throw new AxiosError('Unknown option ' + opt, AxiosError.ERR_BAD_OPTION);
    }
  }
}

module.exports = {
  assertOptions: assertOptions,
  validators: validators
};

/***/ }),

/***/ 9962:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

"use strict";


__webpack_require__(8675);

__webpack_require__(3462);

__webpack_require__(7380);

__webpack_require__(1118);

var bind = __webpack_require__(6781); // utils is a library of generic helper functions non-specific to axios


var toString = Object.prototype.toString; // eslint-disable-next-line func-names

var kindOf = function (cache) {
  // eslint-disable-next-line func-names
  return function (thing) {
    var str = toString.call(thing);
    return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
  };
}(Object.create(null));

function kindOfTest(type) {
  type = type.toLowerCase();
  return function isKindOf(thing) {
    return kindOf(thing) === type;
  };
}
/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */


function isArray(val) {
  return Array.isArray(val);
}
/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */


function isUndefined(val) {
  return typeof val === 'undefined';
}
/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */


function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}
/**
 * Determine if a value is an ArrayBuffer
 *
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */


var isArrayBuffer = kindOfTest('ArrayBuffer');
/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */

function isArrayBufferView(val) {
  var result;

  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && isArrayBuffer(val.buffer);
  }

  return result;
}
/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */


function isString(val) {
  return typeof val === 'string';
}
/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */


function isNumber(val) {
  return typeof val === 'number';
}
/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */


function isObject(val) {
  return val !== null && typeof val === 'object';
}
/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */


function isPlainObject(val) {
  if (kindOf(val) !== 'object') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}
/**
 * Determine if a value is a Date
 *
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */


var isDate = kindOfTest('Date');
/**
 * Determine if a value is a File
 *
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */

var isFile = kindOfTest('File');
/**
 * Determine if a value is a Blob
 *
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */

var isBlob = kindOfTest('Blob');
/**
 * Determine if a value is a FileList
 *
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */

var isFileList = kindOfTest('FileList');
/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */

function isFunction(val) {
  return toString.call(val) === '[object Function]';
}
/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */


function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}
/**
 * Determine if a value is a FormData
 *
 * @param {Object} thing The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */


function isFormData(thing) {
  var pattern = '[object FormData]';
  return thing && (typeof FormData === 'function' && thing instanceof FormData || toString.call(thing) === pattern || isFunction(thing.toString) && thing.toString() === pattern);
}
/**
 * Determine if a value is a URLSearchParams object
 * @function
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */


var isURLSearchParams = kindOfTest('URLSearchParams');
/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */

function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}
/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */


function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' || navigator.product === 'NativeScript' || navigator.product === 'NS')) {
    return false;
  }

  return typeof window !== 'undefined' && typeof document !== 'undefined';
}
/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */


function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  } // Force an array if not already something iterable


  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}
/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */


function
  /* obj1, obj2, obj3, ... */
merge() {
  var result = {};

  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }

  return result;
}
/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */


function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}
/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */


function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }

  return content;
}
/**
 * Inherit the prototype methods from one constructor into another
 * @param {function} constructor
 * @param {function} superConstructor
 * @param {object} [props]
 * @param {object} [descriptors]
 */


function inherits(constructor, superConstructor, props, descriptors) {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors);
  constructor.prototype.constructor = constructor;
  props && Object.assign(constructor.prototype, props);
}
/**
 * Resolve object with deep prototype chain to a flat object
 * @param {Object} sourceObj source object
 * @param {Object} [destObj]
 * @param {Function} [filter]
 * @returns {Object}
 */


function toFlatObject(sourceObj, destObj, filter) {
  var props;
  var i;
  var prop;
  var merged = {};
  destObj = destObj || {};

  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;

    while (i-- > 0) {
      prop = props[i];

      if (!merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }

    sourceObj = Object.getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter || filter(sourceObj, destObj)) && sourceObj !== Object.prototype);

  return destObj;
}
/*
 * determines whether a string ends with the characters of a specified string
 * @param {String} str
 * @param {String} searchString
 * @param {Number} [position= 0]
 * @returns {boolean}
 */


function endsWith(str, searchString, position) {
  str = String(str);

  if (position === undefined || position > str.length) {
    position = str.length;
  }

  position -= searchString.length;
  var lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
}
/**
 * Returns new array from array like object
 * @param {*} [thing]
 * @returns {Array}
 */


function toArray(thing) {
  if (!thing) return null;
  var i = thing.length;
  if (isUndefined(i)) return null;
  var arr = new Array(i);

  while (i-- > 0) {
    arr[i] = thing[i];
  }

  return arr;
} // eslint-disable-next-line func-names


var isTypedArray = function (TypedArray) {
  // eslint-disable-next-line func-names
  return function (thing) {
    return TypedArray && thing instanceof TypedArray;
  };
}(typeof Uint8Array !== 'undefined' && Object.getPrototypeOf(Uint8Array));

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM,
  inherits: inherits,
  toFlatObject: toFlatObject,
  kindOf: kindOf,
  kindOfTest: kindOfTest,
  endsWith: endsWith,
  toArray: toArray,
  isTypedArray: isTypedArray,
  isFileList: isFileList
};

/***/ }),

/***/ 9804:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var hashClear = __webpack_require__(7877),
    hashDelete = __webpack_require__(925),
    hashGet = __webpack_require__(9738),
    hashHas = __webpack_require__(2974),
    hashSet = __webpack_require__(9115);
/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */


function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
} // Add methods to `Hash`.


Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;
module.exports = Hash;

/***/ }),

/***/ 941:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var listCacheClear = __webpack_require__(52),
    listCacheDelete = __webpack_require__(6675),
    listCacheGet = __webpack_require__(2272),
    listCacheHas = __webpack_require__(5575),
    listCacheSet = __webpack_require__(3786);
/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */


function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
} // Add methods to `ListCache`.


ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;
module.exports = ListCache;

/***/ }),

/***/ 9271:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getNative = __webpack_require__(4160),
    root = __webpack_require__(8503);
/* Built-in method references that are verified to be native. */


var Map = getNative(root, 'Map');
module.exports = Map;

/***/ }),

/***/ 6510:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var mapCacheClear = __webpack_require__(8875),
    mapCacheDelete = __webpack_require__(9032),
    mapCacheGet = __webpack_require__(895),
    mapCacheHas = __webpack_require__(167),
    mapCacheSet = __webpack_require__(7510);
/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */


function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;
  this.clear();

  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
} // Add methods to `MapCache`.


MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;
module.exports = MapCache;

/***/ }),

/***/ 2288:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var ListCache = __webpack_require__(941),
    stackClear = __webpack_require__(4370),
    stackDelete = __webpack_require__(7169),
    stackGet = __webpack_require__(8732),
    stackHas = __webpack_require__(7017),
    stackSet = __webpack_require__(7036);
/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */


function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
} // Add methods to `Stack`.


Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;
module.exports = Stack;

/***/ }),

/***/ 6620:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var root = __webpack_require__(8503);
/** Built-in value references. */


var Symbol = root.Symbol;
module.exports = Symbol;

/***/ }),

/***/ 7141:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var root = __webpack_require__(8503);
/** Built-in value references. */


var Uint8Array = root.Uint8Array;
module.exports = Uint8Array;

/***/ }),

/***/ 8847:
/***/ (function(module) {

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0:
      return func.call(thisArg);

    case 1:
      return func.call(thisArg, args[0]);

    case 2:
      return func.call(thisArg, args[0], args[1]);

    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }

  return func.apply(thisArg, args);
}

module.exports = apply;

/***/ }),

/***/ 974:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseTimes = __webpack_require__(2154),
    isArguments = __webpack_require__(870),
    isArray = __webpack_require__(4003),
    isBuffer = __webpack_require__(8400),
    isIndex = __webpack_require__(4274),
    isTypedArray = __webpack_require__(2071);
/** Used for built-in method references. */


var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */

function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && ( // Safari 9 has enumerable `arguments.length` in strict mode.
    key == 'length' || // Node.js 0.10 has enumerable non-index properties on buffers.
    isBuff && (key == 'offset' || key == 'parent') || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset') || // Skip index properties.
    isIndex(key, length)))) {
      result.push(key);
    }
  }

  return result;
}

module.exports = arrayLikeKeys;

/***/ }),

/***/ 7844:
/***/ (function(module) {

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array == null ? 0 : array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }

  return result;
}

module.exports = arrayMap;

/***/ }),

/***/ 4713:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseAssignValue = __webpack_require__(2408),
    eq = __webpack_require__(8138);
/**
 * This function is like `assignValue` except that it doesn't assign
 * `undefined` values.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */


function assignMergeValue(object, key, value) {
  if (value !== undefined && !eq(object[key], value) || value === undefined && !(key in object)) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignMergeValue;

/***/ }),

/***/ 9401:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseAssignValue = __webpack_require__(2408),
    eq = __webpack_require__(8138);
/** Used for built-in method references. */


var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */

function assignValue(object, key, value) {
  var objValue = object[key];

  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === undefined && !(key in object)) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignValue;

/***/ }),

/***/ 2753:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var eq = __webpack_require__(8138);
/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */


function assocIndexOf(array, key) {
  var length = array.length;

  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }

  return -1;
}

module.exports = assocIndexOf;

/***/ }),

/***/ 2408:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var defineProperty = __webpack_require__(4506);
/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */


function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

module.exports = baseAssignValue;

/***/ }),

/***/ 4049:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(2661);
/** Built-in value references. */


var objectCreate = Object.create;
/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */

var baseCreate = function () {
  function object() {}

  return function (proto) {
    if (!isObject(proto)) {
      return {};
    }

    if (objectCreate) {
      return objectCreate(proto);
    }

    object.prototype = proto;
    var result = new object();
    object.prototype = undefined;
    return result;
  };
}();

module.exports = baseCreate;

/***/ }),

/***/ 3573:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var createBaseFor = __webpack_require__(5644);
/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */


var baseFor = createBaseFor();
module.exports = baseFor;

/***/ }),

/***/ 9411:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Symbol = __webpack_require__(6620),
    getRawTag = __webpack_require__(4737),
    objectToString = __webpack_require__(2492);
/** `Object#toString` result references. */


var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';
/** Built-in value references. */

var symToStringTag = Symbol ? Symbol.toStringTag : undefined;
/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */

function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }

  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}

module.exports = baseGetTag;

/***/ }),

/***/ 5422:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseGetTag = __webpack_require__(9411),
    isObjectLike = __webpack_require__(6408);
/** `Object#toString` result references. */


var argsTag = '[object Arguments]';
/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */

function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;

/***/ }),

/***/ 5382:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isFunction = __webpack_require__(8326),
    isMasked = __webpack_require__(9817),
    isObject = __webpack_require__(2661),
    toSource = __webpack_require__(2059);
/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */


var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
/** Used to detect host constructors (Safari). */

var reIsHostCtor = /^\[object .+?Constructor\]$/;
/** Used for built-in method references. */

var funcProto = Function.prototype,
    objectProto = Object.prototype;
/** Used to resolve the decompiled source of functions. */

var funcToString = funcProto.toString;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/** Used to detect if a method is native. */

var reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */

function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }

  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;

/***/ }),

/***/ 8782:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseGetTag = __webpack_require__(9411),
    isLength = __webpack_require__(1759),
    isObjectLike = __webpack_require__(6408);
/** `Object#toString` result references. */


var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';
var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';
/** Used to identify `toStringTag` values of typed arrays. */

var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */

function baseIsTypedArray(value) {
  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;

/***/ }),

/***/ 4651:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isObject = __webpack_require__(2661),
    isPrototype = __webpack_require__(7168),
    nativeKeysIn = __webpack_require__(4859);
/** Used for built-in method references. */


var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */

function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }

  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }

  return result;
}

module.exports = baseKeysIn;

/***/ }),

/***/ 2234:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Stack = __webpack_require__(2288),
    assignMergeValue = __webpack_require__(4713),
    baseFor = __webpack_require__(3573),
    baseMergeDeep = __webpack_require__(2751),
    isObject = __webpack_require__(2661),
    keysIn = __webpack_require__(5848),
    safeGet = __webpack_require__(5143);
/**
 * The base implementation of `_.merge` without support for multiple sources.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */


function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }

  baseFor(source, function (srcValue, key) {
    stack || (stack = new Stack());

    if (isObject(srcValue)) {
      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
    } else {
      var newValue = customizer ? customizer(safeGet(object, key), srcValue, key + '', object, source, stack) : undefined;

      if (newValue === undefined) {
        newValue = srcValue;
      }

      assignMergeValue(object, key, newValue);
    }
  }, keysIn);
}

module.exports = baseMerge;

/***/ }),

/***/ 2751:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var assignMergeValue = __webpack_require__(4713),
    cloneBuffer = __webpack_require__(7953),
    cloneTypedArray = __webpack_require__(8500),
    copyArray = __webpack_require__(4897),
    initCloneObject = __webpack_require__(8725),
    isArguments = __webpack_require__(870),
    isArray = __webpack_require__(4003),
    isArrayLikeObject = __webpack_require__(5189),
    isBuffer = __webpack_require__(8400),
    isFunction = __webpack_require__(8326),
    isObject = __webpack_require__(2661),
    isPlainObject = __webpack_require__(8969),
    isTypedArray = __webpack_require__(2071),
    safeGet = __webpack_require__(5143),
    toPlainObject = __webpack_require__(510);
/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */


function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = safeGet(object, key),
      srcValue = safeGet(source, key),
      stacked = stack.get(srcValue);

  if (stacked) {
    assignMergeValue(object, key, stacked);
    return;
  }

  var newValue = customizer ? customizer(objValue, srcValue, key + '', object, source, stack) : undefined;
  var isCommon = newValue === undefined;

  if (isCommon) {
    var isArr = isArray(srcValue),
        isBuff = !isArr && isBuffer(srcValue),
        isTyped = !isArr && !isBuff && isTypedArray(srcValue);
    newValue = srcValue;

    if (isArr || isBuff || isTyped) {
      if (isArray(objValue)) {
        newValue = objValue;
      } else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue);
      } else if (isBuff) {
        isCommon = false;
        newValue = cloneBuffer(srcValue, true);
      } else if (isTyped) {
        isCommon = false;
        newValue = cloneTypedArray(srcValue, true);
      } else {
        newValue = [];
      }
    } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      newValue = objValue;

      if (isArguments(objValue)) {
        newValue = toPlainObject(objValue);
      } else if (!isObject(objValue) || isFunction(objValue)) {
        newValue = initCloneObject(srcValue);
      }
    } else {
      isCommon = false;
    }
  }

  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack['delete'](srcValue);
  }

  assignMergeValue(object, key, newValue);
}

module.exports = baseMergeDeep;

/***/ }),

/***/ 5910:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var identity = __webpack_require__(1223),
    overRest = __webpack_require__(4530),
    setToString = __webpack_require__(704);
/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */


function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}

module.exports = baseRest;

/***/ }),

/***/ 8891:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var constant = __webpack_require__(8867),
    defineProperty = __webpack_require__(4506),
    identity = __webpack_require__(1223);
/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */


var baseSetToString = !defineProperty ? identity : function (func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};
module.exports = baseSetToString;

/***/ }),

/***/ 2154:
/***/ (function(module) {

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }

  return result;
}

module.exports = baseTimes;

/***/ }),

/***/ 1731:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Symbol = __webpack_require__(6620),
    arrayMap = __webpack_require__(7844),
    isArray = __webpack_require__(4003),
    isSymbol = __webpack_require__(9322);
/** Used as references for various `Number` constants. */


var INFINITY = 1 / 0;
/** Used to convert symbols to primitives and strings. */

var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;
/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */

function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }

  if (isArray(value)) {
    // Recursively convert values (susceptible to call stack limits).
    return arrayMap(value, baseToString) + '';
  }

  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }

  var result = value + '';
  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
}

module.exports = baseToString;

/***/ }),

/***/ 7300:
/***/ (function(module) {

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function (value) {
    return func(value);
  };
}

module.exports = baseUnary;

/***/ }),

/***/ 4585:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Uint8Array = __webpack_require__(7141);
/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */


function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

module.exports = cloneArrayBuffer;

/***/ }),

/***/ 7953:
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var root = __webpack_require__(8503);
/** Detect free variable `exports`. */


var freeExports =  true && exports && !exports.nodeType && exports;
/** Detect free variable `module`. */

var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;
/** Detect the popular CommonJS extension `module.exports`. */

var moduleExports = freeModule && freeModule.exports === freeExports;
/** Built-in value references. */

var Buffer = moduleExports ? root.Buffer : undefined,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;
/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */

function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }

  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
  buffer.copy(result);
  return result;
}

module.exports = cloneBuffer;

/***/ }),

/***/ 8500:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var cloneArrayBuffer = __webpack_require__(4585);
/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */


function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

module.exports = cloneTypedArray;

/***/ }),

/***/ 4897:
/***/ (function(module) {

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;
  array || (array = Array(length));

  while (++index < length) {
    array[index] = source[index];
  }

  return array;
}

module.exports = copyArray;

/***/ }),

/***/ 5052:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var assignValue = __webpack_require__(9401),
    baseAssignValue = __webpack_require__(2408);
/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */


function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});
  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];
    var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }

    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }

  return object;
}

module.exports = copyObject;

/***/ }),

/***/ 3234:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var root = __webpack_require__(8503);
/** Used to detect overreaching core-js shims. */


var coreJsData = root['__core-js_shared__'];
module.exports = coreJsData;

/***/ }),

/***/ 6540:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseRest = __webpack_require__(5910),
    isIterateeCall = __webpack_require__(41);
/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */


function createAssigner(assigner) {
  return baseRest(function (object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;
    customizer = assigner.length > 3 && typeof customizer == 'function' ? (length--, customizer) : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }

    object = Object(object);

    while (++index < length) {
      var source = sources[index];

      if (source) {
        assigner(object, source, index, customizer);
      }
    }

    return object;
  });
}

module.exports = createAssigner;

/***/ }),

/***/ 5644:
/***/ (function(module) {

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function (object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];

      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }

    return object;
  };
}

module.exports = createBaseFor;

/***/ }),

/***/ 4506:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getNative = __webpack_require__(4160);

var defineProperty = function () {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}();

module.exports = defineProperty;

/***/ }),

/***/ 6419:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof __webpack_require__.g == 'object' && __webpack_require__.g && __webpack_require__.g.Object === Object && __webpack_require__.g;
module.exports = freeGlobal;

/***/ }),

/***/ 6022:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isKeyable = __webpack_require__(2727);
/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */


function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key) ? data[typeof key == 'string' ? 'string' : 'hash'] : data.map;
}

module.exports = getMapData;

/***/ }),

/***/ 4160:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseIsNative = __webpack_require__(5382),
    getValue = __webpack_require__(503);
/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */


function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;

/***/ }),

/***/ 9127:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var overArg = __webpack_require__(1165);
/** Built-in value references. */


var getPrototype = overArg(Object.getPrototypeOf, Object);
module.exports = getPrototype;

/***/ }),

/***/ 4737:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Symbol = __webpack_require__(6620);
/** Used for built-in method references. */


var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */

var nativeObjectToString = objectProto.toString;
/** Built-in value references. */

var symToStringTag = Symbol ? Symbol.toStringTag : undefined;
/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */

function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);

  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }

  return result;
}

module.exports = getRawTag;

/***/ }),

/***/ 503:
/***/ (function(module) {

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;

/***/ }),

/***/ 7877:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var nativeCreate = __webpack_require__(5175);
/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */


function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;

/***/ }),

/***/ 925:
/***/ (function(module) {

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;

/***/ }),

/***/ 9738:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var nativeCreate = __webpack_require__(5175);
/** Used to stand-in for `undefined` hash values. */


var HASH_UNDEFINED = '__lodash_hash_undefined__';
/** Used for built-in method references. */

var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */

function hashGet(key) {
  var data = this.__data__;

  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }

  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;

/***/ }),

/***/ 2974:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var nativeCreate = __webpack_require__(5175);
/** Used for built-in method references. */


var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */

function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

module.exports = hashHas;

/***/ }),

/***/ 9115:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var nativeCreate = __webpack_require__(5175);
/** Used to stand-in for `undefined` hash values. */


var HASH_UNDEFINED = '__lodash_hash_undefined__';
/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */

function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;

/***/ }),

/***/ 8725:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseCreate = __webpack_require__(4049),
    getPrototype = __webpack_require__(9127),
    isPrototype = __webpack_require__(7168);
/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */


function initCloneObject(object) {
  return typeof object.constructor == 'function' && !isPrototype(object) ? baseCreate(getPrototype(object)) : {};
}

module.exports = initCloneObject;

/***/ }),

/***/ 4274:
/***/ (function(module) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;
/** Used to detect unsigned integer values. */

var reIsUint = /^(?:0|[1-9]\d*)$/;
/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */

function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length && (type == 'number' || type != 'symbol' && reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
}

module.exports = isIndex;

/***/ }),

/***/ 41:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var eq = __webpack_require__(8138),
    isArrayLike = __webpack_require__(1589),
    isIndex = __webpack_require__(4274),
    isObject = __webpack_require__(2661);
/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */


function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }

  var type = typeof index;

  if (type == 'number' ? isArrayLike(object) && isIndex(index, object.length) : type == 'string' && index in object) {
    return eq(object[index], value);
  }

  return false;
}

module.exports = isIterateeCall;

/***/ }),

/***/ 2727:
/***/ (function(module) {

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
}

module.exports = isKeyable;

/***/ }),

/***/ 9817:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var coreJsData = __webpack_require__(3234);
/** Used to detect methods masquerading as native. */


var maskSrcKey = function () {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? 'Symbol(src)_1.' + uid : '';
}();
/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */


function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}

module.exports = isMasked;

/***/ }),

/***/ 7168:
/***/ (function(module) {

/** Used for built-in method references. */
var objectProto = Object.prototype;
/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */

function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = typeof Ctor == 'function' && Ctor.prototype || objectProto;
  return value === proto;
}

module.exports = isPrototype;

/***/ }),

/***/ 52:
/***/ (function(module) {

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;

/***/ }),

/***/ 6675:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(2753);
/** Used for built-in method references. */


var arrayProto = Array.prototype;
/** Built-in value references. */

var splice = arrayProto.splice;
/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */

function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }

  var lastIndex = data.length - 1;

  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }

  --this.size;
  return true;
}

module.exports = listCacheDelete;

/***/ }),

/***/ 2272:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(2753);
/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */


function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);
  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;

/***/ }),

/***/ 5575:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(2753);
/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */


function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;

/***/ }),

/***/ 3786:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var assocIndexOf = __webpack_require__(2753);
/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */


function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }

  return this;
}

module.exports = listCacheSet;

/***/ }),

/***/ 8875:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Hash = __webpack_require__(9804),
    ListCache = __webpack_require__(941),
    Map = __webpack_require__(9271);
/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */


function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash(),
    'map': new (Map || ListCache)(),
    'string': new Hash()
  };
}

module.exports = mapCacheClear;

/***/ }),

/***/ 9032:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getMapData = __webpack_require__(6022);
/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */


function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;

/***/ }),

/***/ 895:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getMapData = __webpack_require__(6022);
/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */


function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;

/***/ }),

/***/ 167:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getMapData = __webpack_require__(6022);
/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */


function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;

/***/ }),

/***/ 7510:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getMapData = __webpack_require__(6022);
/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */


function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;

/***/ }),

/***/ 5175:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var getNative = __webpack_require__(4160);
/* Built-in method references that are verified to be native. */


var nativeCreate = getNative(Object, 'create');
module.exports = nativeCreate;

/***/ }),

/***/ 4859:
/***/ (function(module) {

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];

  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }

  return result;
}

module.exports = nativeKeysIn;

/***/ }),

/***/ 6862:
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var freeGlobal = __webpack_require__(6419);
/** Detect free variable `exports`. */


var freeExports =  true && exports && !exports.nodeType && exports;
/** Detect free variable `module`. */

var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;
/** Detect the popular CommonJS extension `module.exports`. */

var moduleExports = freeModule && freeModule.exports === freeExports;
/** Detect free variable `process` from Node.js. */

var freeProcess = moduleExports && freeGlobal.process;
/** Used to access faster Node.js helpers. */

var nodeUtil = function () {
  try {
    // Use `util.types` for Node.js 10+.
    var types = freeModule && freeModule.require && freeModule.require('util').types;

    if (types) {
      return types;
    } // Legacy `process.binding('util')` for Node.js < 10.


    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}();

module.exports = nodeUtil;

/***/ }),

/***/ 2492:
/***/ (function(module) {

/** Used for built-in method references. */
var objectProto = Object.prototype;
/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */

var nativeObjectToString = objectProto.toString;
/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */

function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;

/***/ }),

/***/ 1165:
/***/ (function(module) {

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function (arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;

/***/ }),

/***/ 4530:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var apply = __webpack_require__(8847);
/* Built-in method references for those with the same name as other `lodash` methods. */


var nativeMax = Math.max;
/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */

function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? func.length - 1 : start, 0);
  return function () {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }

    index = -1;
    var otherArgs = Array(start + 1);

    while (++index < start) {
      otherArgs[index] = args[index];
    }

    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

module.exports = overRest;

/***/ }),

/***/ 8503:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var freeGlobal = __webpack_require__(6419);
/** Detect free variable `self`. */


var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
/** Used as a reference to the global object. */

var root = freeGlobal || freeSelf || Function('return this')();
module.exports = root;

/***/ }),

/***/ 5143:
/***/ (function(module) {

/**
 * Gets the value at `key`, unless `key` is "__proto__" or "constructor".
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function safeGet(object, key) {
  if (key === 'constructor' && typeof object[key] === 'function') {
    return;
  }

  if (key == '__proto__') {
    return;
  }

  return object[key];
}

module.exports = safeGet;

/***/ }),

/***/ 704:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseSetToString = __webpack_require__(8891),
    shortOut = __webpack_require__(6413);
/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */


var setToString = shortOut(baseSetToString);
module.exports = setToString;

/***/ }),

/***/ 6413:
/***/ (function(module) {

/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;
/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeNow = Date.now;
/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */

function shortOut(func) {
  var count = 0,
      lastCalled = 0;
  return function () {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);
    lastCalled = stamp;

    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }

    return func.apply(undefined, arguments);
  };
}

module.exports = shortOut;

/***/ }),

/***/ 4370:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var ListCache = __webpack_require__(941);
/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */


function stackClear() {
  this.__data__ = new ListCache();
  this.size = 0;
}

module.exports = stackClear;

/***/ }),

/***/ 7169:
/***/ (function(module) {

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);
  this.size = data.size;
  return result;
}

module.exports = stackDelete;

/***/ }),

/***/ 8732:
/***/ (function(module) {

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

module.exports = stackGet;

/***/ }),

/***/ 7017:
/***/ (function(module) {

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

module.exports = stackHas;

/***/ }),

/***/ 7036:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var ListCache = __webpack_require__(941),
    Map = __webpack_require__(9271),
    MapCache = __webpack_require__(6510);
/** Used as the size to enable large array optimizations. */


var LARGE_ARRAY_SIZE = 200;
/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */

function stackSet(key, value) {
  var data = this.__data__;

  if (data instanceof ListCache) {
    var pairs = data.__data__;

    if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }

    data = this.__data__ = new MapCache(pairs);
  }

  data.set(key, value);
  this.size = data.size;
  return this;
}

module.exports = stackSet;

/***/ }),

/***/ 2059:
/***/ (function(module) {

/** Used for built-in method references. */
var funcProto = Function.prototype;
/** Used to resolve the decompiled source of functions. */

var funcToString = funcProto.toString;
/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */

function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}

    try {
      return func + '';
    } catch (e) {}
  }

  return '';
}

module.exports = toSource;

/***/ }),

/***/ 8867:
/***/ (function(module) {

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function () {
    return value;
  };
}

module.exports = constant;

/***/ }),

/***/ 8138:
/***/ (function(module) {

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || value !== value && other !== other;
}

module.exports = eq;

/***/ }),

/***/ 1223:
/***/ (function(module) {

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

/***/ }),

/***/ 870:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseIsArguments = __webpack_require__(5422),
    isObjectLike = __webpack_require__(6408);
/** Used for built-in method references. */


var objectProto = Object.prototype;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/** Built-in value references. */

var propertyIsEnumerable = objectProto.propertyIsEnumerable;
/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */

var isArguments = baseIsArguments(function () {
  return arguments;
}()) ? baseIsArguments : function (value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
};
module.exports = isArguments;

/***/ }),

/***/ 4003:
/***/ (function(module) {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;
module.exports = isArray;

/***/ }),

/***/ 1589:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isFunction = __webpack_require__(8326),
    isLength = __webpack_require__(1759);
/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */


function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;

/***/ }),

/***/ 5189:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var isArrayLike = __webpack_require__(1589),
    isObjectLike = __webpack_require__(6408);
/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */


function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

module.exports = isArrayLikeObject;

/***/ }),

/***/ 8400:
/***/ (function(module, exports, __webpack_require__) {

/* module decorator */ module = __webpack_require__.nmd(module);
var root = __webpack_require__(8503),
    stubFalse = __webpack_require__(7769);
/** Detect free variable `exports`. */


var freeExports =  true && exports && !exports.nodeType && exports;
/** Detect free variable `module`. */

var freeModule = freeExports && "object" == 'object' && module && !module.nodeType && module;
/** Detect the popular CommonJS extension `module.exports`. */

var moduleExports = freeModule && freeModule.exports === freeExports;
/** Built-in value references. */

var Buffer = moduleExports ? root.Buffer : undefined;
/* Built-in method references for those with the same name as other `lodash` methods. */

var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;
/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */

var isBuffer = nativeIsBuffer || stubFalse;
module.exports = isBuffer;

/***/ }),

/***/ 8326:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseGetTag = __webpack_require__(9411),
    isObject = __webpack_require__(2661);
/** `Object#toString` result references. */


var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';
/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */

function isFunction(value) {
  if (!isObject(value)) {
    return false;
  } // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.


  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;

/***/ }),

/***/ 1759:
/***/ (function(module) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;
/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */

function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;

/***/ }),

/***/ 2661:
/***/ (function(module) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;

/***/ }),

/***/ 6408:
/***/ (function(module) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;

/***/ }),

/***/ 8969:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseGetTag = __webpack_require__(9411),
    getPrototype = __webpack_require__(9127),
    isObjectLike = __webpack_require__(6408);
/** `Object#toString` result references. */


var objectTag = '[object Object]';
/** Used for built-in method references. */

var funcProto = Function.prototype,
    objectProto = Object.prototype;
/** Used to resolve the decompiled source of functions. */

var funcToString = funcProto.toString;
/** Used to check objects for own properties. */

var hasOwnProperty = objectProto.hasOwnProperty;
/** Used to infer the `Object` constructor. */

var objectCtorString = funcToString.call(Object);
/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */

function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }

  var proto = getPrototype(value);

  if (proto === null) {
    return true;
  }

  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString;
}

module.exports = isPlainObject;

/***/ }),

/***/ 9322:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseGetTag = __webpack_require__(9411),
    isObjectLike = __webpack_require__(6408);
/** `Object#toString` result references. */


var symbolTag = '[object Symbol]';
/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */

function isSymbol(value) {
  return typeof value == 'symbol' || isObjectLike(value) && baseGetTag(value) == symbolTag;
}

module.exports = isSymbol;

/***/ }),

/***/ 2071:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseIsTypedArray = __webpack_require__(8782),
    baseUnary = __webpack_require__(7300),
    nodeUtil = __webpack_require__(6862);
/* Node.js helper references. */


var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */

var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
module.exports = isTypedArray;

/***/ }),

/***/ 5848:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(974),
    baseKeysIn = __webpack_require__(4651),
    isArrayLike = __webpack_require__(1589);
/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */


function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

module.exports = keysIn;

/***/ }),

/***/ 2569:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseMerge = __webpack_require__(2234),
    createAssigner = __webpack_require__(6540);
/**
 * This method is like `_.assign` except that it recursively merges own and
 * inherited enumerable string keyed properties of source objects into the
 * destination object. Source properties that resolve to `undefined` are
 * skipped if a destination value exists. Array and plain object properties
 * are merged recursively. Other objects and value types are overridden by
 * assignment. Source objects are applied from left to right. Subsequent
 * sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 0.5.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var object = {
 *   'a': [{ 'b': 2 }, { 'd': 4 }]
 * };
 *
 * var other = {
 *   'a': [{ 'c': 3 }, { 'e': 5 }]
 * };
 *
 * _.merge(object, other);
 * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
 */


var merge = createAssigner(function (object, source, srcIndex) {
  baseMerge(object, source, srcIndex);
});
module.exports = merge;

/***/ }),

/***/ 7769:
/***/ (function(module) {

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;

/***/ }),

/***/ 510:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var copyObject = __webpack_require__(5052),
    keysIn = __webpack_require__(5848);
/**
 * Converts `value` to a plain object flattening inherited enumerable string
 * keyed properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */


function toPlainObject(value) {
  return copyObject(value, keysIn(value));
}

module.exports = toPlainObject;

/***/ }),

/***/ 7287:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var baseToString = __webpack_require__(1731);
/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */


function toString(value) {
  return value == null ? '' : baseToString(value);
}

module.exports = toString;

/***/ }),

/***/ 9483:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var toString = __webpack_require__(7287);
/** Used to generate unique IDs. */


var idCounter = 0;
/**
 * Generates a unique ID. If `prefix` is given, the ID is appended to it.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {string} [prefix=''] The value to prefix the ID with.
 * @returns {string} Returns the unique ID.
 * @example
 *
 * _.uniqueId('contact_');
 * // => 'contact_104'
 *
 * _.uniqueId();
 * // => '105'
 */

function uniqueId(prefix) {
  var id = ++idCounter;
  return toString(prefix) + id;
}

module.exports = uniqueId;

/***/ }),

/***/ 4910:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

__webpack_require__(1703);

__webpack_require__(2801);

/*! vue-grid-layout - 2.4.0 | (c) 2015, 2022  Gustavo Santos (JBay Solutions) <gustavo.santos@jbaysolutions.com> (http://www.jbaysolutions.com) | https://github.com/jbaysolutions/vue-grid-layout */
module.exports =
/******/
function (modules) {
  // webpackBootstrap

  /******/
  // The module cache

  /******/
  var installedModules = {};
  /******/

  /******/
  // The require function

  /******/

  function __nested_webpack_require_509__(moduleId) {
    /******/

    /******/
    // Check if module is in cache

    /******/
    if (installedModules[moduleId]) {
      /******/
      return installedModules[moduleId].exports;
      /******/
    }
    /******/
    // Create a new module (and put it into the cache)

    /******/


    var module = installedModules[moduleId] = {
      /******/
      i: moduleId,

      /******/
      l: false,

      /******/
      exports: {}
      /******/

    };
    /******/

    /******/
    // Execute the module function

    /******/

    modules[moduleId].call(module.exports, module, module.exports, __nested_webpack_require_509__);
    /******/

    /******/
    // Flag the module as loaded

    /******/

    module.l = true;
    /******/

    /******/
    // Return the exports of the module

    /******/

    return module.exports;
    /******/
  }
  /******/

  /******/

  /******/
  // expose the modules object (__webpack_modules__)

  /******/


  __nested_webpack_require_509__.m = modules;
  /******/

  /******/
  // expose the module cache

  /******/

  __nested_webpack_require_509__.c = installedModules;
  /******/

  /******/
  // define getter function for harmony exports

  /******/

  __nested_webpack_require_509__.d = function (exports, name, getter) {
    /******/
    if (!__nested_webpack_require_509__.o(exports, name)) {
      /******/
      Object.defineProperty(exports, name, {
        enumerable: true,
        get: getter
      });
      /******/
    }
    /******/

  };
  /******/

  /******/
  // define __esModule on exports

  /******/


  __nested_webpack_require_509__.r = function (exports) {
    /******/
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      /******/
      Object.defineProperty(exports, Symbol.toStringTag, {
        value: 'Module'
      });
      /******/
    }
    /******/


    Object.defineProperty(exports, '__esModule', {
      value: true
    });
    /******/
  };
  /******/

  /******/
  // create a fake namespace object

  /******/
  // mode & 1: value is a module id, require it

  /******/
  // mode & 2: merge all properties of value into the ns

  /******/
  // mode & 4: return value when already ns object

  /******/
  // mode & 8|1: behave like require

  /******/


  __nested_webpack_require_509__.t = function (value, mode) {
    /******/
    if (mode & 1) value = __nested_webpack_require_509__(value);
    /******/

    if (mode & 8) return value;
    /******/

    if (mode & 4 && typeof value === 'object' && value && value.__esModule) return value;
    /******/

    var ns = Object.create(null);
    /******/

    __nested_webpack_require_509__.r(ns);
    /******/


    Object.defineProperty(ns, 'default', {
      enumerable: true,
      value: value
    });
    /******/

    if (mode & 2 && typeof value != 'string') for (var key in value) __nested_webpack_require_509__.d(ns, key, function (key) {
      return value[key];
    }.bind(null, key));
    /******/

    return ns;
    /******/
  };
  /******/

  /******/
  // getDefaultExport function for compatibility with non-harmony modules

  /******/


  __nested_webpack_require_509__.n = function (module) {
    /******/
    var getter = module && module.__esModule ?
    /******/
    function getDefault() {
      return module['default'];
    } :
    /******/
    function getModuleExports() {
      return module;
    };
    /******/

    __nested_webpack_require_509__.d(getter, 'a', getter);
    /******/


    return getter;
    /******/
  };
  /******/

  /******/
  // Object.prototype.hasOwnProperty.call

  /******/


  __nested_webpack_require_509__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };
  /******/

  /******/
  // __webpack_public_path__

  /******/


  __nested_webpack_require_509__.p = "";
  /******/

  /******/

  /******/
  // Load entry module and return exports

  /******/

  return __nested_webpack_require_509__(__nested_webpack_require_509__.s = "fb15");
  /******/
}
/************************************************************************/

/******/
({
  /***/
  "01f9":
  /***/
  function (module, exports, __nested_webpack_require_4543__) {
    "use strict";

    var LIBRARY = __nested_webpack_require_4543__("2d00");

    var $export = __nested_webpack_require_4543__("5ca1");

    var redefine = __nested_webpack_require_4543__("2aba");

    var hide = __nested_webpack_require_4543__("32e9");

    var Iterators = __nested_webpack_require_4543__("84f2");

    var $iterCreate = __nested_webpack_require_4543__("41a0");

    var setToStringTag = __nested_webpack_require_4543__("7f20");

    var getPrototypeOf = __nested_webpack_require_4543__("38fd");

    var ITERATOR = __nested_webpack_require_4543__("2b4c")('iterator');

    var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`

    var FF_ITERATOR = '@@iterator';
    var KEYS = 'keys';
    var VALUES = 'values';

    var returnThis = function () {
      return this;
    };

    module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
      $iterCreate(Constructor, NAME, next);

      var getMethod = function (kind) {
        if (!BUGGY && kind in proto) return proto[kind];

        switch (kind) {
          case KEYS:
            return function keys() {
              return new Constructor(this, kind);
            };

          case VALUES:
            return function values() {
              return new Constructor(this, kind);
            };
        }

        return function entries() {
          return new Constructor(this, kind);
        };
      };

      var TAG = NAME + ' Iterator';
      var DEF_VALUES = DEFAULT == VALUES;
      var VALUES_BUG = false;
      var proto = Base.prototype;
      var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
      var $default = $native || getMethod(DEFAULT);
      var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
      var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
      var methods, key, IteratorPrototype; // Fix native

      if ($anyNative) {
        IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));

        if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
          // Set @@toStringTag to native iterators
          setToStringTag(IteratorPrototype, TAG, true); // fix for some old engines

          if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
        }
      } // fix Array#{values, @@iterator}.name in V8 / FF


      if (DEF_VALUES && $native && $native.name !== VALUES) {
        VALUES_BUG = true;

        $default = function values() {
          return $native.call(this);
        };
      } // Define iterator


      if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
        hide(proto, ITERATOR, $default);
      } // Plug for library


      Iterators[NAME] = $default;
      Iterators[TAG] = returnThis;

      if (DEFAULT) {
        methods = {
          values: DEF_VALUES ? $default : getMethod(VALUES),
          keys: IS_SET ? $default : getMethod(KEYS),
          entries: $entries
        };
        if (FORCED) for (key in methods) {
          if (!(key in proto)) redefine(proto, key, methods[key]);
        } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
      }

      return methods;
    };
    /***/

  },

  /***/
  "02f4":
  /***/
  function (module, exports, __nested_webpack_require_7851__) {
    var toInteger = __nested_webpack_require_7851__("4588");

    var defined = __nested_webpack_require_7851__("be13"); // true  -> String#at
    // false -> String#codePointAt


    module.exports = function (TO_STRING) {
      return function (that, pos) {
        var s = String(defined(that));
        var i = toInteger(pos);
        var l = s.length;
        var a, b;
        if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
        a = s.charCodeAt(i);
        return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
      };
    };
    /***/

  },

  /***/
  "0390":
  /***/
  function (module, exports, __nested_webpack_require_8622__) {
    "use strict";

    var at = __nested_webpack_require_8622__("02f4")(true); // `AdvanceStringIndex` abstract operation
    // https://tc39.github.io/ecma262/#sec-advancestringindex


    module.exports = function (S, index, unicode) {
      return index + (unicode ? at(S, index).length : 1);
    };
    /***/

  },

  /***/
  "0bfb":
  /***/
  function (module, exports, __nested_webpack_require_9008__) {
    "use strict"; // 21.2.5.3 get RegExp.prototype.flags

    var anObject = __nested_webpack_require_9008__("cb7c");

    module.exports = function () {
      var that = anObject(this);
      var result = '';
      if (that.global) result += 'g';
      if (that.ignoreCase) result += 'i';
      if (that.multiline) result += 'm';
      if (that.unicode) result += 'u';
      if (that.sticky) result += 'y';
      return result;
    };
    /***/

  },

  /***/
  "0d58":
  /***/
  function (module, exports, __nested_webpack_require_9527__) {
    // 19.1.2.14 / 15.2.3.14 Object.keys(O)
    var $keys = __nested_webpack_require_9527__("ce10");

    var enumBugKeys = __nested_webpack_require_9527__("e11e");

    module.exports = Object.keys || function keys(O) {
      return $keys(O, enumBugKeys);
    };
    /***/

  },

  /***/
  "1156":
  /***/
  function (module, exports, __nested_webpack_require_9862__) {
    // style-loader: Adds some css to the DOM by adding a <style> tag
    // load the styles
    var content = __nested_webpack_require_9862__("ad20");

    if (typeof content === 'string') content = [[module.i, content, '']];
    if (content.locals) module.exports = content.locals; // add the styles to the DOM

    var add = __nested_webpack_require_9862__("499e").default;

    var update = add("c1ec597e", content, true, {
      "sourceMap": false,
      "shadowMode": false
    });
    /***/
  },

  /***/
  "11e9":
  /***/
  function (module, exports, __nested_webpack_require_10420__) {
    var pIE = __nested_webpack_require_10420__("52a7");

    var createDesc = __nested_webpack_require_10420__("4630");

    var toIObject = __nested_webpack_require_10420__("6821");

    var toPrimitive = __nested_webpack_require_10420__("6a99");

    var has = __nested_webpack_require_10420__("69a8");

    var IE8_DOM_DEFINE = __nested_webpack_require_10420__("c69a");

    var gOPD = Object.getOwnPropertyDescriptor;
    exports.f = __nested_webpack_require_10420__("9e1e") ? gOPD : function getOwnPropertyDescriptor(O, P) {
      O = toIObject(O);
      P = toPrimitive(P, true);
      if (IE8_DOM_DEFINE) try {
        return gOPD(O, P);
      } catch (e) {
        /* empty */
      }
      if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
    };
    /***/
  },

  /***/
  "1495":
  /***/
  function (module, exports, __nested_webpack_require_11188__) {
    var dP = __nested_webpack_require_11188__("86cc");

    var anObject = __nested_webpack_require_11188__("cb7c");

    var getKeys = __nested_webpack_require_11188__("0d58");

    module.exports = __nested_webpack_require_11188__("9e1e") ? Object.defineProperties : function defineProperties(O, Properties) {
      anObject(O);
      var keys = getKeys(Properties);
      var length = keys.length;
      var i = 0;
      var P;

      while (length > i) dP.f(O, P = keys[i++], Properties[P]);

      return O;
    };
    /***/
  },

  /***/
  "18d2":
  /***/
  function (module, exports, __nested_webpack_require_11750__) {
    "use strict";
    /**
     * Resize detection strategy that injects objects to elements in order to detect resize events.
     * Heavily inspired by: http://www.backalleycoder.com/2013/03/18/cross-browser-event-based-element-resize-detection/
     */

    var browserDetector = __nested_webpack_require_11750__("18e9");

    module.exports = function (options) {
      options = options || {};
      var reporter = options.reporter;
      var batchProcessor = options.batchProcessor;
      var getState = options.stateHandler.getState;

      if (!reporter) {
        throw new Error("Missing required dependency: reporter.");
      }
      /**
       * Adds a resize event listener to the element.
       * @public
       * @param {element} element The element that should have the listener added.
       * @param {function} listener The listener callback to be called for each resize event of the element. The element will be given as a parameter to the listener callback.
       */


      function addListener(element, listener) {
        function listenerProxy() {
          listener(element);
        }

        if (browserDetector.isIE(8)) {
          //IE 8 does not support object, but supports the resize event directly on elements.
          getState(element).object = {
            proxy: listenerProxy
          };
          element.attachEvent("onresize", listenerProxy);
        } else {
          var object = getObject(element);

          if (!object) {
            throw new Error("Element is not detectable by this strategy.");
          }

          object.contentDocument.defaultView.addEventListener("resize", listenerProxy);
        }
      }

      function buildCssTextString(rules) {
        var seperator = options.important ? " !important; " : "; ";
        return (rules.join(seperator) + seperator).trim();
      }
      /**
       * Makes an element detectable and ready to be listened for resize events. Will call the callback when the element is ready to be listened for resize changes.
       * @private
       * @param {object} options Optional options object.
       * @param {element} element The element to make detectable
       * @param {function} callback The callback to be called when the element is ready to be listened for resize changes. Will be called with the element as first parameter.
       */


      function makeDetectable(options, element, callback) {
        if (!callback) {
          callback = element;
          element = options;
          options = null;
        }

        options = options || {};
        var debug = options.debug;

        function injectObject(element, callback) {
          var OBJECT_STYLE = buildCssTextString(["display: block", "position: absolute", "top: 0", "left: 0", "width: 100%", "height: 100%", "border: none", "padding: 0", "margin: 0", "opacity: 0", "z-index: -1000", "pointer-events: none"]); //The target element needs to be positioned (everything except static) so the absolute positioned object will be positioned relative to the target element.
          // Position altering may be performed directly or on object load, depending on if style resolution is possible directly or not.

          var positionCheckPerformed = false; // The element may not yet be attached to the DOM, and therefore the style object may be empty in some browsers.
          // Since the style object is a reference, it will be updated as soon as the element is attached to the DOM.

          var style = window.getComputedStyle(element);
          var width = element.offsetWidth;
          var height = element.offsetHeight;
          getState(element).startSize = {
            width: width,
            height: height
          };

          function mutateDom() {
            function alterPositionStyles() {
              if (style.position === "static") {
                element.style.setProperty("position", "relative", options.important ? "important" : "");

                var removeRelativeStyles = function (reporter, element, style, property) {
                  function getNumericalValue(value) {
                    return value.replace(/[^-\d\.]/g, "");
                  }

                  var value = style[property];

                  if (value !== "auto" && getNumericalValue(value) !== "0") {
                    reporter.warn("An element that is positioned static has style." + property + "=" + value + " which is ignored due to the static positioning. The element will need to be positioned relative, so the style." + property + " will be set to 0. Element: ", element);
                    element.style.setProperty(property, "0", options.important ? "important" : "");
                  }
                }; //Check so that there are no accidental styles that will make the element styled differently now that is is relative.
                //If there are any, set them to 0 (this should be okay with the user since the style properties did nothing before [since the element was positioned static] anyway).


                removeRelativeStyles(reporter, element, style, "top");
                removeRelativeStyles(reporter, element, style, "right");
                removeRelativeStyles(reporter, element, style, "bottom");
                removeRelativeStyles(reporter, element, style, "left");
              }
            }

            function onObjectLoad() {
              // The object has been loaded, which means that the element now is guaranteed to be attached to the DOM.
              if (!positionCheckPerformed) {
                alterPositionStyles();
              }
              /*jshint validthis: true */


              function getDocument(element, callback) {
                //Opera 12 seem to call the object.onload before the actual document has been created.
                //So if it is not present, poll it with an timeout until it is present.
                //TODO: Could maybe be handled better with object.onreadystatechange or similar.
                if (!element.contentDocument) {
                  var state = getState(element);

                  if (state.checkForObjectDocumentTimeoutId) {
                    window.clearTimeout(state.checkForObjectDocumentTimeoutId);
                  }

                  state.checkForObjectDocumentTimeoutId = setTimeout(function checkForObjectDocument() {
                    state.checkForObjectDocumentTimeoutId = 0;
                    getDocument(element, callback);
                  }, 100);
                  return;
                }

                callback(element.contentDocument);
              } //Mutating the object element here seems to fire another load event.
              //Mutating the inner document of the object element is fine though.


              var objectElement = this; //Create the style element to be added to the object.

              getDocument(objectElement, function onObjectDocumentReady(objectDocument) {
                //Notify that the element is ready to be listened to.
                callback(element);
              });
            } // The element may be detached from the DOM, and some browsers does not support style resolving of detached elements.
            // The alterPositionStyles needs to be delayed until we know the element has been attached to the DOM (which we are sure of when the onObjectLoad has been fired), if style resolution is not possible.


            if (style.position !== "") {
              alterPositionStyles(style);
              positionCheckPerformed = true;
            } //Add an object element as a child to the target element that will be listened to for resize events.


            var object = document.createElement("object");
            object.style.cssText = OBJECT_STYLE;
            object.tabIndex = -1;
            object.type = "text/html";
            object.setAttribute("aria-hidden", "true");
            object.onload = onObjectLoad; //Safari: This must occur before adding the object to the DOM.
            //IE: Does not like that this happens before, even if it is also added after.

            if (!browserDetector.isIE()) {
              object.data = "about:blank";
            }

            if (!getState(element)) {
              // The element has been uninstalled before the actual loading happened.
              return;
            }

            element.appendChild(object);
            getState(element).object = object; //IE: This must occur after adding the object to the DOM.

            if (browserDetector.isIE()) {
              object.data = "about:blank";
            }
          }

          if (batchProcessor) {
            batchProcessor.add(mutateDom);
          } else {
            mutateDom();
          }
        }

        if (browserDetector.isIE(8)) {
          //IE 8 does not support objects properly. Luckily they do support the resize event.
          //So do not inject the object and notify that the element is already ready to be listened to.
          //The event handler for the resize event is attached in the utils.addListener instead.
          callback(element);
        } else {
          injectObject(element, callback);
        }
      }
      /**
       * Returns the child object of the target element.
       * @private
       * @param {element} element The target element.
       * @returns The object element of the target.
       */


      function getObject(element) {
        return getState(element).object;
      }

      function uninstall(element) {
        if (!getState(element)) {
          return;
        }

        var object = getObject(element);

        if (!object) {
          return;
        }

        if (browserDetector.isIE(8)) {
          element.detachEvent("onresize", object.proxy);
        } else {
          element.removeChild(object);
        }

        if (getState(element).checkForObjectDocumentTimeoutId) {
          window.clearTimeout(getState(element).checkForObjectDocumentTimeoutId);
        }

        delete getState(element).object;
      }

      return {
        makeDetectable: makeDetectable,
        addListener: addListener,
        uninstall: uninstall
      };
    };
    /***/

  },

  /***/
  "18e9":
  /***/
  function (module, exports, __webpack_require__) {
    "use strict";

    var detector = module.exports = {};

    detector.isIE = function (version) {
      function isAnyIeVersion() {
        var agent = navigator.userAgent.toLowerCase();
        return agent.indexOf("msie") !== -1 || agent.indexOf("trident") !== -1 || agent.indexOf(" edge/") !== -1;
      }

      if (!isAnyIeVersion()) {
        return false;
      }

      if (!version) {
        return true;
      } //Shamelessly stolen from https://gist.github.com/padolsey/527683


      var ieVersion = function () {
        var undef,
            v = 3,
            div = document.createElement("div"),
            all = div.getElementsByTagName("i");

        do {
          div.innerHTML = "<!--[if gt IE " + ++v + "]><i></i><![endif]-->";
        } while (all[0]);

        return v > 4 ? v : undef;
      }();

      return version === ieVersion;
    };

    detector.isLegacyOpera = function () {
      return !!window.opera;
    };
    /***/

  },

  /***/
  "1ca7":
  /***/
  function (module, __webpack_exports__, __nested_webpack_require_23081__) {
    "use strict";
    /* harmony export (binding) */

    __nested_webpack_require_23081__.d(__webpack_exports__, "b", function () {
      return getDocumentDir;
    });
    /* unused harmony export setDocumentDir */

    /* harmony export (binding) */


    __nested_webpack_require_23081__.d(__webpack_exports__, "a", function () {
      return addWindowEventListener;
    });
    /* harmony export (binding) */


    __nested_webpack_require_23081__.d(__webpack_exports__, "c", function () {
      return removeWindowEventListener;
    });

    var currentDir
    /*: "ltr" | "rtl" | "auto"*/
    = "auto"; // let currentDir = "auto";

    function hasDocument() {
      return typeof document !== "undefined";
    }

    function hasWindow() {
      return typeof window !== "undefined";
    }

    function getDocumentDir() {
      if (!hasDocument()) {
        return currentDir;
      }

      var direction = typeof document.dir !== "undefined" ? document.dir : document.getElementsByTagName("html")[0].getAttribute("dir");
      return direction;
    }

    function setDocumentDir(dir
    /*: "ltr" | "rtl" | "auto"*/
    ) {
      // export function setDocumentDir(dir){
      if (!hasDocument) {
        currentDir = dir;
        return;
      }

      var html = document.getElementsByTagName("html")[0];
      html.setAttribute("dir", dir);
    }

    function addWindowEventListener(event
    /*:string*/
    , callback
    /*: () => mixed*/
    ) {
      if (!hasWindow) {
        callback();
        return;
      }

      window.addEventListener(event, callback);
    }

    function removeWindowEventListener(event
    /*:string*/
    , callback
    /*: () => mixed*/
    ) {
      if (!hasWindow) {
        return;
      }

      window.removeEventListener(event, callback);
    }
    /***/

  },

  /***/
  "214f":
  /***/
  function (module, exports, __nested_webpack_require_24938__) {
    "use strict";

    __nested_webpack_require_24938__("b0c5");

    var redefine = __nested_webpack_require_24938__("2aba");

    var hide = __nested_webpack_require_24938__("32e9");

    var fails = __nested_webpack_require_24938__("79e5");

    var defined = __nested_webpack_require_24938__("be13");

    var wks = __nested_webpack_require_24938__("2b4c");

    var regexpExec = __nested_webpack_require_24938__("520a");

    var SPECIES = wks('species');
    var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
      // #replace needs built-in support for named groups.
      // #match works fine because it just return the exec results, even if it has
      // a "grops" property.
      var re = /./;

      re.exec = function () {
        var result = [];
        result.groups = {
          a: '7'
        };
        return result;
      };

      return ''.replace(re, '$<a>') !== '7';
    });

    var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = function () {
      // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
      var re = /(?:)/;
      var originalExec = re.exec;

      re.exec = function () {
        return originalExec.apply(this, arguments);
      };

      var result = 'ab'.split(re);
      return result.length === 2 && result[0] === 'a' && result[1] === 'b';
    }();

    module.exports = function (KEY, length, exec) {
      var SYMBOL = wks(KEY);
      var DELEGATES_TO_SYMBOL = !fails(function () {
        // String methods call symbol-named RegEp methods
        var O = {};

        O[SYMBOL] = function () {
          return 7;
        };

        return ''[KEY](O) != 7;
      });
      var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function () {
        // Symbol-named RegExp methods call .exec
        var execCalled = false;
        var re = /a/;

        re.exec = function () {
          execCalled = true;
          return null;
        };

        if (KEY === 'split') {
          // RegExp[@@split] doesn't call the regex's exec method, but first creates
          // a new one. We need to return the patched regex when creating the new one.
          re.constructor = {};

          re.constructor[SPECIES] = function () {
            return re;
          };
        }

        re[SYMBOL]('');
        return !execCalled;
      }) : undefined;

      if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS || KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC) {
        var nativeRegExpMethod = /./[SYMBOL];
        var fns = exec(defined, SYMBOL, ''[KEY], function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
          if (regexp.exec === regexpExec) {
            if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
              // The native String method already delegates to @@method (this
              // polyfilled function), leasing to infinite recursion.
              // We avoid it by directly calling the native @@method method.
              return {
                done: true,
                value: nativeRegExpMethod.call(regexp, str, arg2)
              };
            }

            return {
              done: true,
              value: nativeMethod.call(str, regexp, arg2)
            };
          }

          return {
            done: false
          };
        });
        var strfn = fns[0];
        var rxfn = fns[1];
        redefine(String.prototype, KEY, strfn);
        hide(RegExp.prototype, SYMBOL, length == 2 // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
        // 21.2.5.11 RegExp.prototype[@@split](string, limit)
        ? function (string, arg) {
          return rxfn.call(string, this, arg);
        } // 21.2.5.6 RegExp.prototype[@@match](string)
        // 21.2.5.9 RegExp.prototype[@@search](string)
        : function (string) {
          return rxfn.call(string, this);
        });
      }
    };
    /***/

  },

  /***/
  "230e":
  /***/
  function (module, exports, __nested_webpack_require_28861__) {
    var isObject = __nested_webpack_require_28861__("d3f4");

    var document = __nested_webpack_require_28861__("7726").document; // typeof document.createElement is 'object' in old IE


    var is = isObject(document) && isObject(document.createElement);

    module.exports = function (it) {
      return is ? document.createElement(it) : {};
    };
    /***/

  },

  /***/
  "2350":
  /***/
  function (module, exports) {
    /*
    	MIT License http://www.opensource.org/licenses/mit-license.php
    	Author Tobias Koppers @sokra
    */
    // css base code, injected by the css-loader
    module.exports = function (useSourceMap) {
      var list = []; // return the list of modules as css string

      list.toString = function toString() {
        return this.map(function (item) {
          var content = cssWithMappingToString(item, useSourceMap);

          if (item[2]) {
            return "@media " + item[2] + "{" + content + "}";
          } else {
            return content;
          }
        }).join("");
      }; // import a list of modules into the list


      list.i = function (modules, mediaQuery) {
        if (typeof modules === "string") modules = [[null, modules, ""]];
        var alreadyImportedModules = {};

        for (var i = 0; i < this.length; i++) {
          var id = this[i][0];
          if (typeof id === "number") alreadyImportedModules[id] = true;
        }

        for (i = 0; i < modules.length; i++) {
          var item = modules[i]; // skip already imported module
          // this implementation is not 100% perfect for weird media query combinations
          //  when a module is imported multiple times with different media queries.
          //  I hope this will never occur (Hey this way we have smaller bundles)

          if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
            if (mediaQuery && !item[2]) {
              item[2] = mediaQuery;
            } else if (mediaQuery) {
              item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
            }

            list.push(item);
          }
        }
      };

      return list;
    };

    function cssWithMappingToString(item, useSourceMap) {
      var content = item[1] || '';
      var cssMapping = item[3];

      if (!cssMapping) {
        return content;
      }

      if (useSourceMap && typeof btoa === 'function') {
        var sourceMapping = toComment(cssMapping);
        var sourceURLs = cssMapping.sources.map(function (source) {
          return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
        });
        return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
      }

      return [content].join('\n');
    } // Adapted from convert-source-map (MIT)


    function toComment(sourceMap) {
      // eslint-disable-next-line no-undef
      var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
      var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;
      return '/*# ' + data + ' */';
    }
    /***/

  },

  /***/
  "23c6":
  /***/
  function (module, exports, __nested_webpack_require_31988__) {
    // getting tag from 19.1.3.6 Object.prototype.toString()
    var cof = __nested_webpack_require_31988__("2d95");

    var TAG = __nested_webpack_require_31988__("2b4c")('toStringTag'); // ES3 wrong here


    var ARG = cof(function () {
      return arguments;
    }()) == 'Arguments'; // fallback for IE11 Script Access Denied error

    var tryGet = function (it, key) {
      try {
        return it[key];
      } catch (e) {
        /* empty */
      }
    };

    module.exports = function (it) {
      var O, T, B;
      return it === undefined ? 'Undefined' : it === null ? 'Null' // @@toStringTag case
      : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T // builtinTag case
      : ARG ? cof(O) // ES3 arguments fallback
      : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
    };
    /***/

  },

  /***/
  "2621":
  /***/
  function (module, exports) {
    exports.f = Object.getOwnPropertySymbols;
    /***/
  },

  /***/
  "2877":
  /***/
  function (module, __webpack_exports__, __nested_webpack_require_33025__) {
    "use strict";
    /* harmony export (binding) */

    __nested_webpack_require_33025__.d(__webpack_exports__, "a", function () {
      return normalizeComponent;
    });
    /* globals __VUE_SSR_CONTEXT__ */
    // IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
    // This module is a runtime utility for cleaner component module output and will
    // be included in the final webpack user bundle.


    function normalizeComponent(scriptExports, render, staticRenderFns, functionalTemplate, injectStyles, scopeId, moduleIdentifier,
    /* server only */
    shadowMode
    /* vue-cli only */
    ) {
      // Vue.extend constructor export interop
      var options = typeof scriptExports === 'function' ? scriptExports.options : scriptExports; // render functions

      if (render) {
        options.render = render;
        options.staticRenderFns = staticRenderFns;
        options._compiled = true;
      } // functional template


      if (functionalTemplate) {
        options.functional = true;
      } // scopedId


      if (scopeId) {
        options._scopeId = 'data-v-' + scopeId;
      }

      var hook;

      if (moduleIdentifier) {
        // server build
        hook = function (context) {
          // 2.3 injection
          context = context || // cached call
          this.$vnode && this.$vnode.ssrContext || // stateful
          this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
          // 2.2 with runInNewContext: true

          if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
            context = __VUE_SSR_CONTEXT__;
          } // inject component styles


          if (injectStyles) {
            injectStyles.call(this, context);
          } // register component module identifier for async chunk inferrence


          if (context && context._registeredComponents) {
            context._registeredComponents.add(moduleIdentifier);
          }
        }; // used by ssr in case component is cached and beforeCreate
        // never gets called


        options._ssrRegister = hook;
      } else if (injectStyles) {
        hook = shadowMode ? function () {
          injectStyles.call(this, (options.functional ? this.parent : this).$root.$options.shadowRoot);
        } : injectStyles;
      }

      if (hook) {
        if (options.functional) {
          // for template-only hot-reload because in that case the render fn doesn't
          // go through the normalizer
          options._injectStyles = hook; // register for functional component in vue file

          var originalRender = options.render;

          options.render = function renderWithStyleInjection(h, context) {
            hook.call(context);
            return originalRender(h, context);
          };
        } else {
          // inject component registration as beforeCreate hook
          var existing = options.beforeCreate;
          options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
      }

      return {
        exports: scriptExports,
        options: options
      };
    }
    /***/

  },

  /***/
  "2aba":
  /***/
  function (module, exports, __nested_webpack_require_36219__) {
    var global = __nested_webpack_require_36219__("7726");

    var hide = __nested_webpack_require_36219__("32e9");

    var has = __nested_webpack_require_36219__("69a8");

    var SRC = __nested_webpack_require_36219__("ca5a")('src');

    var $toString = __nested_webpack_require_36219__("fa5b");

    var TO_STRING = 'toString';
    var TPL = ('' + $toString).split(TO_STRING);

    __nested_webpack_require_36219__("8378").inspectSource = function (it) {
      return $toString.call(it);
    };

    (module.exports = function (O, key, val, safe) {
      var isFunction = typeof val == 'function';
      if (isFunction) has(val, 'name') || hide(val, 'name', key);
      if (O[key] === val) return;
      if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));

      if (O === global) {
        O[key] = val;
      } else if (!safe) {
        delete O[key];
        hide(O, key, val);
      } else if (O[key]) {
        O[key] = val;
      } else {
        hide(O, key, val);
      } // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative

    })(Function.prototype, TO_STRING, function toString() {
      return typeof this == 'function' && this[SRC] || $toString.call(this);
    });
    /***/
  },

  /***/
  "2aeb":
  /***/
  function (module, exports, __nested_webpack_require_37522__) {
    // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
    var anObject = __nested_webpack_require_37522__("cb7c");

    var dPs = __nested_webpack_require_37522__("1495");

    var enumBugKeys = __nested_webpack_require_37522__("e11e");

    var IE_PROTO = __nested_webpack_require_37522__("613b")('IE_PROTO');

    var Empty = function () {
      /* empty */
    };

    var PROTOTYPE = 'prototype'; // Create object with fake `null` prototype: use iframe Object with cleared prototype

    var createDict = function () {
      // Thrash, waste and sodomy: IE GC bug
      var iframe = __nested_webpack_require_37522__("230e")('iframe');

      var i = enumBugKeys.length;
      var lt = '<';
      var gt = '>';
      var iframeDocument;
      iframe.style.display = 'none';

      __nested_webpack_require_37522__("fab2").appendChild(iframe);

      iframe.src = 'javascript:'; // eslint-disable-line no-script-url
      // createDict = iframe.contentWindow.Object;
      // html.removeChild(iframe);

      iframeDocument = iframe.contentWindow.document;
      iframeDocument.open();
      iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
      iframeDocument.close();
      createDict = iframeDocument.F;

      while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];

      return createDict();
    };

    module.exports = Object.create || function create(O, Properties) {
      var result;

      if (O !== null) {
        Empty[PROTOTYPE] = anObject(O);
        result = new Empty();
        Empty[PROTOTYPE] = null; // add "__proto__" for Object.getPrototypeOf polyfill

        result[IE_PROTO] = O;
      } else result = createDict();

      return Properties === undefined ? result : dPs(result, Properties);
    };
    /***/

  },

  /***/
  "2af9":
  /***/
  function (module, __webpack_exports__, __nested_webpack_require_39324__) {
    "use strict";
    /* WEBPACK VAR INJECTION */

    (function (global) {
      /* harmony export (binding) */
      __nested_webpack_require_39324__.d(__webpack_exports__, "d", function () {
        return install;
      });
      /* harmony import */


      var core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_39324__("7f7f");
      /* harmony import */


      var core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__nested_webpack_require_39324__.n(core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_0__);
      /* harmony import */


      var core_js_modules_es6_array_iterator__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_39324__("cadf");
      /* harmony import */


      var core_js_modules_es6_array_iterator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__nested_webpack_require_39324__.n(core_js_modules_es6_array_iterator__WEBPACK_IMPORTED_MODULE_1__);
      /* harmony import */


      var core_js_modules_es6_object_keys__WEBPACK_IMPORTED_MODULE_2__ = __nested_webpack_require_39324__("456d");
      /* harmony import */


      var core_js_modules_es6_object_keys__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__nested_webpack_require_39324__.n(core_js_modules_es6_object_keys__WEBPACK_IMPORTED_MODULE_2__);
      /* harmony import */


      var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_3__ = __nested_webpack_require_39324__("ac6a");
      /* harmony import */


      var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__nested_webpack_require_39324__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_3__);
      /* harmony import */


      var _GridItem_vue__WEBPACK_IMPORTED_MODULE_4__ = __nested_webpack_require_39324__("bc21");
      /* harmony reexport (safe) */


      __nested_webpack_require_39324__.d(__webpack_exports__, "a", function () {
        return _GridItem_vue__WEBPACK_IMPORTED_MODULE_4__["a"];
      });
      /* harmony import */


      var _GridLayout_vue__WEBPACK_IMPORTED_MODULE_5__ = __nested_webpack_require_39324__("37c8");
      /* harmony reexport (safe) */


      __nested_webpack_require_39324__.d(__webpack_exports__, "b", function () {
        return _GridLayout_vue__WEBPACK_IMPORTED_MODULE_5__["a"];
      }); // import ResponsiveGridLayout from './ResponsiveGridLayout.vue';


      var VueGridLayout = {
        // ResponsiveGridLayout,
        GridLayout: _GridLayout_vue__WEBPACK_IMPORTED_MODULE_5__[
        /* default */
        "a"],
        GridItem: _GridItem_vue__WEBPACK_IMPORTED_MODULE_4__[
        /* default */
        "a"]
      };

      function install(Vue) {
        if (install.installed) return;
        install.installed = true;
        Object.keys(VueGridLayout).forEach(function (name) {
          Vue.component(name, VueGridLayout[name]);
        });
      }

      var plugin = {
        install: install
      };
      var GlobalVue = null;

      if (typeof window !== 'undefined') {
        GlobalVue = window.Vue;
      } else if (typeof global !== 'undefined') {
        GlobalVue = global.Vue;
      }

      if (GlobalVue) {
        GlobalVue.use(plugin);
      }
      /* harmony default export */


      __webpack_exports__["c"] = VueGridLayout;
      /* WEBPACK VAR INJECTION */
    }).call(this, __nested_webpack_require_39324__("c8ba"));
    /***/
  },

  /***/
  "2b4c":
  /***/
  function (module, exports, __nested_webpack_require_42651__) {
    var store = __nested_webpack_require_42651__("5537")('wks');

    var uid = __nested_webpack_require_42651__("ca5a");

    var Symbol = __nested_webpack_require_42651__("7726").Symbol;

    var USE_SYMBOL = typeof Symbol == 'function';

    var $exports = module.exports = function (name) {
      return store[name] || (store[name] = USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
    };

    $exports.store = store;
    /***/
  },

  /***/
  "2cef":
  /***/
  function (module, exports, __webpack_require__) {
    "use strict";

    module.exports = function () {
      var idCount = 1;
      /**
       * Generates a new unique id in the context.
       * @public
       * @returns {number} A unique id in the context.
       */

      function generate() {
        return idCount++;
      }

      return {
        generate: generate
      };
    };
    /***/

  },

  /***/
  "2d00":
  /***/
  function (module, exports) {
    module.exports = false;
    /***/
  },

  /***/
  "2d95":
  /***/
  function (module, exports) {
    var toString = {}.toString;

    module.exports = function (it) {
      return toString.call(it).slice(8, -1);
    };
    /***/

  },

  /***/
  "2f21":
  /***/
  function (module, exports, __nested_webpack_require_43892__) {
    "use strict";

    var fails = __nested_webpack_require_43892__("79e5");

    module.exports = function (method, arg) {
      return !!method && fails(function () {
        // eslint-disable-next-line no-useless-call
        arg ? method.call(null, function () {
          /* empty */
        }, 1) : method.call(null);
      });
    };
    /***/

  },

  /***/
  "32e9":
  /***/
  function (module, exports, __nested_webpack_require_44315__) {
    var dP = __nested_webpack_require_44315__("86cc");

    var createDesc = __nested_webpack_require_44315__("4630");

    module.exports = __nested_webpack_require_44315__("9e1e") ? function (object, key, value) {
      return dP.f(object, key, createDesc(1, value));
    } : function (object, key, value) {
      object[key] = value;
      return object;
    };
    /***/
  },

  /***/
  "37c8":
  /***/
  function (module, __webpack_exports__, __nested_webpack_require_44747__) {
    "use strict"; // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"1705dc22-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/GridLayout.vue?vue&type=template&id=361da5e4&

    var render = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', {
        ref: "item",
        staticClass: "vue-grid-layout",
        style: _vm.mergedStyle
      }, [_vm._t("default"), _c('grid-item', {
        directives: [{
          name: "show",
          rawName: "v-show",
          value: _vm.isDragging,
          expression: "isDragging"
        }],
        staticClass: "vue-grid-placeholder",
        attrs: {
          "x": _vm.placeholder.x,
          "y": _vm.placeholder.y,
          "w": _vm.placeholder.w,
          "h": _vm.placeholder.h,
          "i": _vm.placeholder.i
        }
      })], 2);
    };

    var staticRenderFns = []; // CONCATENATED MODULE: ./src/components/GridLayout.vue?vue&type=template&id=361da5e4&
    // EXTERNAL MODULE: ./node_modules/core-js/modules/es7.object.get-own-property-descriptors.js

    var es7_object_get_own_property_descriptors = __nested_webpack_require_44747__("8e6e"); // EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.iterator.js


    var es6_array_iterator = __nested_webpack_require_44747__("cadf"); // EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.keys.js


    var es6_object_keys = __nested_webpack_require_44747__("456d"); // EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.assign.js


    var es6_object_assign = __nested_webpack_require_44747__("f751"); // EXTERNAL MODULE: ./node_modules/core-js/modules/es6.number.is-finite.js


    var es6_number_is_finite = __nested_webpack_require_44747__("fca0"); // EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js


    var web_dom_iterable = __nested_webpack_require_44747__("ac6a"); // EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js


    var defineProperty = __nested_webpack_require_44747__("ade3"); // EXTERNAL MODULE: ./node_modules/core-js/modules/es6.number.constructor.js


    var es6_number_constructor = __nested_webpack_require_44747__("c5f6"); // EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}


    var external_commonjs_vue_commonjs2_vue_root_Vue_ = __nested_webpack_require_44747__("8bbf");

    var external_commonjs_vue_commonjs2_vue_root_Vue_default = /*#__PURE__*/__nested_webpack_require_44747__.n(external_commonjs_vue_commonjs2_vue_root_Vue_); // EXTERNAL MODULE: ./src/helpers/utils.js


    var utils = __nested_webpack_require_44747__("a2b6"); // EXTERNAL MODULE: ./src/helpers/responsiveUtils.js


    var responsiveUtils = __nested_webpack_require_44747__("97a7"); // EXTERNAL MODULE: ./src/components/GridItem.vue + 71 modules


    var GridItem = __nested_webpack_require_44747__("bc21"); // EXTERNAL MODULE: ./src/helpers/DOM.js


    var DOM = __nested_webpack_require_44747__("1ca7"); // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/GridLayout.vue?vue&type=script&lang=js&


    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);

      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
        keys.push.apply(keys, symbols);
      }

      return keys;
    }

    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};

        if (i % 2) {
          ownKeys(Object(source), true).forEach(function (key) {
            Object(defineProperty["a"
            /* default */
            ])(target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
          ownKeys(Object(source)).forEach(function (key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
      }

      return target;
    } //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //


    var elementResizeDetectorMaker = __nested_webpack_require_44747__("eec4"); //var eventBus = require('./eventBus');

    /* harmony default export */


    var GridLayoutvue_type_script_lang_js_ = {
      name: "GridLayout",
      provide: function provide() {
        return {
          eventBus: null,
          layout: this
        };
      },
      components: {
        GridItem: GridItem["a"
        /* default */
        ]
      },
      props: {
        // If true, the container height swells and contracts to fit contents
        autoSize: {
          type: Boolean,
          default: true
        },
        colNum: {
          type: Number,
          default: 12
        },
        rowHeight: {
          type: Number,
          default: 150
        },
        maxRows: {
          type: Number,
          default: Infinity
        },
        margin: {
          type: Array,
          default: function _default() {
            return [10, 10];
          }
        },
        isDraggable: {
          type: Boolean,
          default: true
        },
        isResizable: {
          type: Boolean,
          default: true
        },
        isMirrored: {
          type: Boolean,
          default: false
        },
        isBounded: {
          type: Boolean,
          default: false
        },
        useCssTransforms: {
          type: Boolean,
          default: true
        },
        verticalCompact: {
          type: Boolean,
          default: true
        },
        restoreOnDrag: {
          type: Boolean,
          default: false
        },
        layout: {
          type: Array,
          required: true
        },
        responsive: {
          type: Boolean,
          default: false
        },
        responsiveLayouts: {
          type: Object,
          default: function _default() {
            return {};
          }
        },
        transformScale: {
          type: Number,
          default: 1
        },
        breakpoints: {
          type: Object,
          default: function _default() {
            return {
              lg: 1200,
              md: 996,
              sm: 768,
              xs: 480,
              xxs: 0
            };
          }
        },
        cols: {
          type: Object,
          default: function _default() {
            return {
              lg: 12,
              md: 10,
              sm: 6,
              xs: 4,
              xxs: 2
            };
          }
        },
        preventCollision: {
          type: Boolean,
          default: false
        },
        useStyleCursor: {
          type: Boolean,
          default: true
        }
      },
      data: function data() {
        return {
          width: null,
          mergedStyle: {},
          lastLayoutLength: 0,
          isDragging: false,
          placeholder: {
            x: 0,
            y: 0,
            w: 0,
            h: 0,
            i: -1
          },
          layouts: {},
          // array to store all layouts from different breakpoints
          lastBreakpoint: null,
          // store last active breakpoint
          originalLayout: null // store original Layout

        };
      },
      created: function created() {
        var self = this; // Accessible refernces of functions for removing in beforeDestroy

        self.resizeEventHandler = function (eventType, i, x, y, h, w) {
          self.resizeEvent(eventType, i, x, y, h, w);
        };

        self.dragEventHandler = function (eventType, i, x, y, h, w) {
          self.dragEvent(eventType, i, x, y, h, w);
        };

        self._provided.eventBus = new external_commonjs_vue_commonjs2_vue_root_Vue_default.a();
        self.eventBus = self._provided.eventBus;
        self.eventBus.$on('resizeEvent', self.resizeEventHandler);
        self.eventBus.$on('dragEvent', self.dragEventHandler);
        self.$emit('layout-created', self.layout);
      },
      beforeDestroy: function beforeDestroy() {
        //Remove listeners
        this.eventBus.$off('resizeEvent', this.resizeEventHandler);
        this.eventBus.$off('dragEvent', this.dragEventHandler);
        this.eventBus.$destroy();
        Object(DOM["c"
        /* removeWindowEventListener */
        ])("resize", this.onWindowResize);

        if (this.erd) {
          this.erd.uninstall(this.$refs.item);
        }
      },
      beforeMount: function beforeMount() {
        this.$emit('layout-before-mount', this.layout);
      },
      mounted: function mounted() {
        this.$emit('layout-mounted', this.layout);
        this.$nextTick(function () {
          Object(utils["l"
          /* validateLayout */
          ])(this.layout);
          this.originalLayout = this.layout;
          var self = this;
          this.$nextTick(function () {
            self.initResponsiveFeatures();
            self.onWindowResize(); //self.width = self.$el.offsetWidth;

            Object(DOM["a"
            /* addWindowEventListener */
            ])('resize', self.onWindowResize);
            Object(utils["c"
            /* compact */
            ])(self.layout, self.verticalCompact);
            self.$emit('layout-updated', self.layout);
            self.updateHeight();
            self.$nextTick(function () {
              this.erd = elementResizeDetectorMaker({
                strategy: "scroll",
                //<- For ultra performance.
                // See https://github.com/wnr/element-resize-detector/issues/110 about callOnAdd.
                callOnAdd: false
              });
              this.erd.listenTo(self.$refs.item, function () {
                self.onWindowResize();
              });
            });
          });
        });
      },
      watch: {
        width: function width(newval, oldval) {
          var self = this;
          this.$nextTick(function () {
            var _this = this; //this.$broadcast("updateWidth", this.width);


            this.eventBus.$emit("updateWidth", this.width);

            if (oldval === null) {
              /*
                  If oldval == null is when the width has never been
                  set before. That only occurs when mouting is
                  finished, and onWindowResize has been called and
                  this.width has been changed the first time after it
                  got set to null in the constructor. It is now time
                  to issue layout-ready events as the GridItems have
                  their sizes configured properly.
                    The reason for emitting the layout-ready events on
                  the next tick is to allow for the newly-emitted
                  updateWidth event (above) to have reached the
                  children GridItem-s and had their effect, so we're
                  sure that they have the final size before we emit
                  layout-ready (for this GridLayout) and
                  item-layout-ready (for the GridItem-s).
                    This way any client event handlers can reliably
                  invistigate stable sizes of GridItem-s.
              */
              this.$nextTick(function () {
                _this.$emit('layout-ready', self.layout);
              });
            }

            this.updateHeight();
          });
        },
        layout: function layout() {
          this.layoutUpdate();
        },
        colNum: function colNum(val) {
          this.eventBus.$emit("setColNum", val);
        },
        rowHeight: function rowHeight() {
          this.eventBus.$emit("setRowHeight", this.rowHeight);
        },
        isDraggable: function isDraggable() {
          this.eventBus.$emit("setDraggable", this.isDraggable);
        },
        isResizable: function isResizable() {
          this.eventBus.$emit("setResizable", this.isResizable);
        },
        isBounded: function isBounded() {
          this.eventBus.$emit("setBounded", this.isBounded);
        },
        transformScale: function transformScale() {
          this.eventBus.$emit("setTransformScale", this.transformScale);
        },
        responsive: function responsive() {
          if (!this.responsive) {
            this.$emit('update:layout', this.originalLayout);
            this.eventBus.$emit("setColNum", this.colNum);
          }

          this.onWindowResize();
        },
        maxRows: function maxRows() {
          this.eventBus.$emit("setMaxRows", this.maxRows);
        },
        margin: function margin() {
          this.updateHeight();
        }
      },
      methods: {
        layoutUpdate: function layoutUpdate() {
          if (this.layout !== undefined && this.originalLayout !== null) {
            if (this.layout.length !== this.originalLayout.length) {
              // console.log("### LAYOUT UPDATE!", this.layout.length, this.originalLayout.length);
              var diff = this.findDifference(this.layout, this.originalLayout);

              if (diff.length > 0) {
                // console.log(diff);
                if (this.layout.length > this.originalLayout.length) {
                  this.originalLayout = this.originalLayout.concat(diff);
                } else {
                  this.originalLayout = this.originalLayout.filter(function (obj) {
                    return !diff.some(function (obj2) {
                      return obj.i === obj2.i;
                    });
                  });
                }
              }

              this.lastLayoutLength = this.layout.length;
              this.initResponsiveFeatures();
            }

            Object(utils["c"
            /* compact */
            ])(this.layout, this.verticalCompact);
            this.eventBus.$emit("updateWidth", this.width);
            this.updateHeight();
            this.$emit('layout-updated', this.layout);
          }
        },
        updateHeight: function updateHeight() {
          this.mergedStyle = {
            height: this.containerHeight()
          };
        },
        onWindowResize: function onWindowResize() {
          if (this.$refs !== null && this.$refs.item !== null && this.$refs.item !== undefined) {
            this.width = this.$refs.item.offsetWidth;
          }

          this.eventBus.$emit("resizeEvent");
        },
        containerHeight: function containerHeight() {
          if (!this.autoSize) return; // console.log("bottom: " + bottom(this.layout))
          // console.log("rowHeight + margins: " + (this.rowHeight + this.margin[1]) + this.margin[1])

          var containerHeight = Object(utils["a"
          /* bottom */
          ])(this.layout) * (this.rowHeight + this.margin[1]) + this.margin[1] + 'px';
          return containerHeight;
        },
        dragEvent: function dragEvent(eventName, id, x, y, h, w) {
          //console.log(eventName + " id=" + id + ", x=" + x + ", y=" + y);
          var l = Object(utils["f"
          /* getLayoutItem */
          ])(this.layout, id); //GetLayoutItem sometimes returns null object

          if (l === undefined || l === null) {
            l = {
              x: 0,
              y: 0
            };
          }

          if (eventName === "dragstart" && !this.verticalCompact) {
            this.positionsBeforeDrag = this.layout.reduce(function (result, _ref) {
              var i = _ref.i,
                  x = _ref.x,
                  y = _ref.y;
              return _objectSpread(_objectSpread({}, result), {}, Object(defineProperty["a"
              /* default */
              ])({}, i, {
                x: x,
                y: y
              }));
            }, {});
          }

          if (eventName === "dragmove" || eventName === "dragstart") {
            this.placeholder.i = id;
            this.placeholder.x = l.x;
            this.placeholder.y = l.y;
            this.placeholder.w = w;
            this.placeholder.h = h;
            this.$nextTick(function () {
              this.isDragging = true;
            }); //this.$broadcast("updateWidth", this.width);

            this.eventBus.$emit("updateWidth", this.width);
          } else {
            this.$nextTick(function () {
              this.isDragging = false;
            });
          } // Move the element to the dragged location.


          this.layout = Object(utils["g"
          /* moveElement */
          ])(this.layout, l, x, y, true, this.preventCollision);

          if (this.restoreOnDrag) {
            // Do not compact items more than in layout before drag
            // Set moved item as static to avoid to compact it
            l.static = true;
            Object(utils["c"
            /* compact */
            ])(this.layout, this.verticalCompact, this.positionsBeforeDrag);
            l.static = false;
          } else {
            Object(utils["c"
            /* compact */
            ])(this.layout, this.verticalCompact);
          } // needed because vue can't detect changes on array element properties


          this.eventBus.$emit("compact");
          this.updateHeight();

          if (eventName === 'dragend') {
            delete this.positionsBeforeDrag;
            this.$emit('layout-updated', this.layout);
          }
        },
        resizeEvent: function resizeEvent(eventName, id, x, y, h, w) {
          var l = Object(utils["f"
          /* getLayoutItem */
          ])(this.layout, id); //GetLayoutItem sometimes return null object

          if (l === undefined || l === null) {
            l = {
              h: 0,
              w: 0
            };
          }

          var hasCollisions;

          if (this.preventCollision) {
            var collisions = Object(utils["e"
            /* getAllCollisions */
            ])(this.layout, _objectSpread(_objectSpread({}, l), {}, {
              w: w,
              h: h
            })).filter(function (layoutItem) {
              return layoutItem.i !== l.i;
            });
            hasCollisions = collisions.length > 0; // If we're colliding, we need adjust the placeholder.

            if (hasCollisions) {
              // adjust w && h to maximum allowed space
              var leastX = Infinity,
                  leastY = Infinity;
              collisions.forEach(function (layoutItem) {
                if (layoutItem.x > l.x) leastX = Math.min(leastX, layoutItem.x);
                if (layoutItem.y > l.y) leastY = Math.min(leastY, layoutItem.y);
              });
              if (Number.isFinite(leastX)) l.w = leastX - l.x;
              if (Number.isFinite(leastY)) l.h = leastY - l.y;
            }
          }

          if (!hasCollisions) {
            // Set new width and height.
            l.w = w;
            l.h = h;
          }

          if (eventName === "resizestart" || eventName === "resizemove") {
            this.placeholder.i = id;
            this.placeholder.x = x;
            this.placeholder.y = y;
            this.placeholder.w = l.w;
            this.placeholder.h = l.h;
            this.$nextTick(function () {
              this.isDragging = true;
            }); //this.$broadcast("updateWidth", this.width);

            this.eventBus.$emit("updateWidth", this.width);
          } else {
            this.$nextTick(function () {
              this.isDragging = false;
            });
          }

          if (this.responsive) this.responsiveGridLayout();
          Object(utils["c"
          /* compact */
          ])(this.layout, this.verticalCompact);
          this.eventBus.$emit("compact");
          this.updateHeight();
          if (eventName === 'resizeend') this.$emit('layout-updated', this.layout);
        },
        // finds or generates new layouts for set breakpoints
        responsiveGridLayout: function responsiveGridLayout() {
          var newBreakpoint = Object(responsiveUtils["b"
          /* getBreakpointFromWidth */
          ])(this.breakpoints, this.width);
          var newCols = Object(responsiveUtils["c"
          /* getColsFromBreakpoint */
          ])(newBreakpoint, this.cols); // save actual layout in layouts

          if (this.lastBreakpoint != null && !this.layouts[this.lastBreakpoint]) this.layouts[this.lastBreakpoint] = Object(utils["b"
          /* cloneLayout */
          ])(this.layout); // Find or generate a new layout.

          var layout = Object(responsiveUtils["a"
          /* findOrGenerateResponsiveLayout */
          ])(this.originalLayout, this.layouts, this.breakpoints, newBreakpoint, this.lastBreakpoint, newCols, this.verticalCompact); // Store the new layout.

          this.layouts[newBreakpoint] = layout;

          if (this.lastBreakpoint !== newBreakpoint) {
            this.$emit('breakpoint-changed', newBreakpoint, layout);
          } // new prop sync


          this.$emit('update:layout', layout);
          this.lastBreakpoint = newBreakpoint;
          this.eventBus.$emit("setColNum", Object(responsiveUtils["c"
          /* getColsFromBreakpoint */
          ])(newBreakpoint, this.cols));
        },
        // clear all responsive layouts
        initResponsiveFeatures: function initResponsiveFeatures() {
          // clear layouts
          this.layouts = Object.assign({}, this.responsiveLayouts);
        },
        // find difference in layouts
        findDifference: function findDifference(layout, originalLayout) {
          //Find values that are in result1 but not in result2
          var uniqueResultOne = layout.filter(function (obj) {
            return !originalLayout.some(function (obj2) {
              return obj.i === obj2.i;
            });
          }); //Find values that are in result2 but not in result1

          var uniqueResultTwo = originalLayout.filter(function (obj) {
            return !layout.some(function (obj2) {
              return obj.i === obj2.i;
            });
          }); //Combine the two arrays of unique entries#

          return uniqueResultOne.concat(uniqueResultTwo);
        }
      }
    }; // CONCATENATED MODULE: ./src/components/GridLayout.vue?vue&type=script&lang=js&

    /* harmony default export */

    var components_GridLayoutvue_type_script_lang_js_ = GridLayoutvue_type_script_lang_js_; // EXTERNAL MODULE: ./src/components/GridLayout.vue?vue&type=style&index=0&lang=css&

    var GridLayoutvue_type_style_index_0_lang_css_ = __nested_webpack_require_44747__("e279"); // EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js


    var componentNormalizer = __nested_webpack_require_44747__("2877"); // CONCATENATED MODULE: ./src/components/GridLayout.vue

    /* normalize component */


    var component = Object(componentNormalizer["a"
    /* default */
    ])(components_GridLayoutvue_type_script_lang_js_, render, staticRenderFns, false, null, null, null);
    /* harmony default export */

    var GridLayout = __webpack_exports__["a"] = component.exports;
    /***/
  },

  /***/
  "38fd":
  /***/
  function (module, exports, __nested_webpack_require_68257__) {
    // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
    var has = __nested_webpack_require_68257__("69a8");

    var toObject = __nested_webpack_require_68257__("4bf8");

    var IE_PROTO = __nested_webpack_require_68257__("613b")('IE_PROTO');

    var ObjectProto = Object.prototype;

    module.exports = Object.getPrototypeOf || function (O) {
      O = toObject(O);
      if (has(O, IE_PROTO)) return O[IE_PROTO];

      if (typeof O.constructor == 'function' && O instanceof O.constructor) {
        return O.constructor.prototype;
      }

      return O instanceof Object ? ObjectProto : null;
    };
    /***/

  },

  /***/
  "41a0":
  /***/
  function (module, exports, __nested_webpack_require_68921__) {
    "use strict";

    var create = __nested_webpack_require_68921__("2aeb");

    var descriptor = __nested_webpack_require_68921__("4630");

    var setToStringTag = __nested_webpack_require_68921__("7f20");

    var IteratorPrototype = {}; // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()

    __nested_webpack_require_68921__("32e9")(IteratorPrototype, __nested_webpack_require_68921__("2b4c")('iterator'), function () {
      return this;
    });

    module.exports = function (Constructor, NAME, next) {
      Constructor.prototype = create(IteratorPrototype, {
        next: descriptor(1, next)
      });
      setToStringTag(Constructor, NAME + ' Iterator');
    };
    /***/

  },

  /***/
  "456d":
  /***/
  function (module, exports, __nested_webpack_require_69625__) {
    // 19.1.2.14 Object.keys(O)
    var toObject = __nested_webpack_require_69625__("4bf8");

    var $keys = __nested_webpack_require_69625__("0d58");

    __nested_webpack_require_69625__("5eda")('keys', function () {
      return function keys(it) {
        return $keys(toObject(it));
      };
    });
    /***/

  },

  /***/
  "4588":
  /***/
  function (module, exports) {
    // 7.1.4 ToInteger
    var ceil = Math.ceil;
    var floor = Math.floor;

    module.exports = function (it) {
      return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
    };
    /***/

  },

  /***/
  "4630":
  /***/
  function (module, exports) {
    module.exports = function (bitmap, value) {
      return {
        enumerable: !(bitmap & 1),
        configurable: !(bitmap & 2),
        writable: !(bitmap & 4),
        value: value
      };
    };
    /***/

  },

  /***/
  "4917":
  /***/
  function (module, exports, __nested_webpack_require_70526__) {
    "use strict";

    var anObject = __nested_webpack_require_70526__("cb7c");

    var toLength = __nested_webpack_require_70526__("9def");

    var advanceStringIndex = __nested_webpack_require_70526__("0390");

    var regExpExec = __nested_webpack_require_70526__("5f1b"); // @@match logic


    __nested_webpack_require_70526__("214f")('match', 1, function (defined, MATCH, $match, maybeCallNative) {
      return [// `String.prototype.match` method
      // https://tc39.github.io/ecma262/#sec-string.prototype.match
      function match(regexp) {
        var O = defined(this);
        var fn = regexp == undefined ? undefined : regexp[MATCH];
        return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
      }, // `RegExp.prototype[@@match]` method
      // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
      function (regexp) {
        var res = maybeCallNative($match, regexp, this);
        if (res.done) return res.value;
        var rx = anObject(regexp);
        var S = String(this);
        if (!rx.global) return regExpExec(rx, S);
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
        var A = [];
        var n = 0;
        var result;

        while ((result = regExpExec(rx, S)) !== null) {
          var matchStr = String(result[0]);
          A[n] = matchStr;
          if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
          n++;
        }

        return n === 0 ? null : A;
      }];
    });
    /***/

  },

  /***/
  "499e":
  /***/
  function (module, __webpack_exports__, __nested_webpack_require_72104__) {
    "use strict"; // ESM COMPAT FLAG

    __nested_webpack_require_72104__.r(__webpack_exports__); // EXPORTS


    __nested_webpack_require_72104__.d(__webpack_exports__, "default", function () {
      return (
        /* binding */
        addStylesClient
      );
    }); // CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/listToStyles.js

    /**
     * Translates the list format produced by css-loader into something
     * easier to manipulate.
     */


    function listToStyles(parentId, list) {
      var styles = [];
      var newStyles = {};

      for (var i = 0; i < list.length; i++) {
        var item = list[i];
        var id = item[0];
        var css = item[1];
        var media = item[2];
        var sourceMap = item[3];
        var part = {
          id: parentId + ':' + i,
          css: css,
          media: media,
          sourceMap: sourceMap
        };

        if (!newStyles[id]) {
          styles.push(newStyles[id] = {
            id: id,
            parts: [part]
          });
        } else {
          newStyles[id].parts.push(part);
        }
      }

      return styles;
    } // CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/addStylesClient.js

    /*
      MIT License http://www.opensource.org/licenses/mit-license.php
      Author Tobias Koppers @sokra
      Modified by Evan You @yyx990803
    */


    var hasDocument = typeof document !== 'undefined';

    if (typeof DEBUG !== 'undefined' && DEBUG) {
      if (!hasDocument) {
        throw new Error('vue-style-loader cannot be used in a non-browser environment. ' + "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");
      }
    }
    /*
    type StyleObject = {
      id: number;
      parts: Array<StyleObjectPart>
    }
    
    type StyleObjectPart = {
      css: string;
      media: string;
      sourceMap: ?string
    }
    */


    var stylesInDom = {
      /*
      [id: number]: {
      id: number,
      refs: number,
      parts: Array<(obj?: StyleObjectPart) => void>
      }
      */
    };
    var head = hasDocument && (document.head || document.getElementsByTagName('head')[0]);
    var singletonElement = null;
    var singletonCounter = 0;
    var isProduction = false;

    var noop = function () {};

    var options = null;
    var ssrIdKey = 'data-vue-ssr-id'; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
    // tags it will allow on a page

    var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase());

    function addStylesClient(parentId, list, _isProduction, _options) {
      isProduction = _isProduction;
      options = _options || {};
      var styles = listToStyles(parentId, list);
      addStylesToDom(styles);
      return function update(newList) {
        var mayRemove = [];

        for (var i = 0; i < styles.length; i++) {
          var item = styles[i];
          var domStyle = stylesInDom[item.id];
          domStyle.refs--;
          mayRemove.push(domStyle);
        }

        if (newList) {
          styles = listToStyles(parentId, newList);
          addStylesToDom(styles);
        } else {
          styles = [];
        }

        for (var i = 0; i < mayRemove.length; i++) {
          var domStyle = mayRemove[i];

          if (domStyle.refs === 0) {
            for (var j = 0; j < domStyle.parts.length; j++) {
              domStyle.parts[j]();
            }

            delete stylesInDom[domStyle.id];
          }
        }
      };
    }

    function addStylesToDom(styles
    /* Array<StyleObject> */
    ) {
      for (var i = 0; i < styles.length; i++) {
        var item = styles[i];
        var domStyle = stylesInDom[item.id];

        if (domStyle) {
          domStyle.refs++;

          for (var j = 0; j < domStyle.parts.length; j++) {
            domStyle.parts[j](item.parts[j]);
          }

          for (; j < item.parts.length; j++) {
            domStyle.parts.push(addStyle(item.parts[j]));
          }

          if (domStyle.parts.length > item.parts.length) {
            domStyle.parts.length = item.parts.length;
          }
        } else {
          var parts = [];

          for (var j = 0; j < item.parts.length; j++) {
            parts.push(addStyle(item.parts[j]));
          }

          stylesInDom[item.id] = {
            id: item.id,
            refs: 1,
            parts: parts
          };
        }
      }
    }

    function createStyleElement() {
      var styleElement = document.createElement('style');
      styleElement.type = 'text/css';
      head.appendChild(styleElement);
      return styleElement;
    }

    function addStyle(obj
    /* StyleObjectPart */
    ) {
      var update, remove;
      var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]');

      if (styleElement) {
        if (isProduction) {
          // has SSR styles and in production mode.
          // simply do nothing.
          return noop;
        } else {
          // has SSR styles but in dev mode.
          // for some reason Chrome can't handle source map in server-rendered
          // style tags - source maps in <style> only works if the style tag is
          // created and inserted dynamically. So we remove the server rendered
          // styles and inject new ones.
          styleElement.parentNode.removeChild(styleElement);
        }
      }

      if (isOldIE) {
        // use singleton mode for IE9.
        var styleIndex = singletonCounter++;
        styleElement = singletonElement || (singletonElement = createStyleElement());
        update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
        remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
      } else {
        // use multi-style-tag mode in all other cases
        styleElement = createStyleElement();
        update = applyToTag.bind(null, styleElement);

        remove = function () {
          styleElement.parentNode.removeChild(styleElement);
        };
      }

      update(obj);
      return function updateStyle(newObj
      /* StyleObjectPart */
      ) {
        if (newObj) {
          if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
            return;
          }

          update(obj = newObj);
        } else {
          remove();
        }
      };
    }

    var replaceText = function () {
      var textStore = [];
      return function (index, replacement) {
        textStore[index] = replacement;
        return textStore.filter(Boolean).join('\n');
      };
    }();

    function applyToSingletonTag(styleElement, index, remove, obj) {
      var css = remove ? '' : obj.css;

      if (styleElement.styleSheet) {
        styleElement.styleSheet.cssText = replaceText(index, css);
      } else {
        var cssNode = document.createTextNode(css);
        var childNodes = styleElement.childNodes;
        if (childNodes[index]) styleElement.removeChild(childNodes[index]);

        if (childNodes.length) {
          styleElement.insertBefore(cssNode, childNodes[index]);
        } else {
          styleElement.appendChild(cssNode);
        }
      }
    }

    function applyToTag(styleElement, obj) {
      var css = obj.css;
      var media = obj.media;
      var sourceMap = obj.sourceMap;

      if (media) {
        styleElement.setAttribute('media', media);
      }

      if (options.ssrId) {
        styleElement.setAttribute(ssrIdKey, obj.id);
      }

      if (sourceMap) {
        // https://developer.chrome.com/devtools/docs/javascript-debugging
        // this makes source maps inside style tags work properly in Chrome
        css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

        css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */';
      }

      if (styleElement.styleSheet) {
        styleElement.styleSheet.cssText = css;
      } else {
        while (styleElement.firstChild) {
          styleElement.removeChild(styleElement.firstChild);
        }

        styleElement.appendChild(document.createTextNode(css));
      }
    }
    /***/

  },

  /***/
  "49ad":
  /***/
  function (module, exports, __webpack_require__) {
    "use strict";

    module.exports = function (idHandler) {
      var eventListeners = {};
      /**
       * Gets all listeners for the given element.
       * @public
       * @param {element} element The element to get all listeners for.
       * @returns All listeners for the given element.
       */

      function getListeners(element) {
        var id = idHandler.get(element);

        if (id === undefined) {
          return [];
        }

        return eventListeners[id] || [];
      }
      /**
       * Stores the given listener for the given element. Will not actually add the listener to the element.
       * @public
       * @param {element} element The element that should have the listener added.
       * @param {function} listener The callback that the element has added.
       */


      function addListener(element, listener) {
        var id = idHandler.get(element);

        if (!eventListeners[id]) {
          eventListeners[id] = [];
        }

        eventListeners[id].push(listener);
      }

      function removeListener(element, listener) {
        var listeners = getListeners(element);

        for (var i = 0, len = listeners.length; i < len; ++i) {
          if (listeners[i] === listener) {
            listeners.splice(i, 1);
            break;
          }
        }
      }

      function removeAllListeners(element) {
        var listeners = getListeners(element);

        if (!listeners) {
          return;
        }

        listeners.length = 0;
      }

      return {
        get: getListeners,
        add: addListener,
        removeListener: removeListener,
        removeAllListeners: removeAllListeners
      };
    };
    /***/

  },

  /***/
  "4bf8":
  /***/
  function (module, exports, __nested_webpack_require_82228__) {
    // 7.1.13 ToObject(argument)
    var defined = __nested_webpack_require_82228__("be13");

    module.exports = function (it) {
      return Object(defined(it));
    };
    /***/

  },

  /***/
  "5058":
  /***/
  function (module, exports, __webpack_require__) {
    "use strict";

    module.exports = function (options) {
      var idGenerator = options.idGenerator;
      var getState = options.stateHandler.getState;
      /**
       * Gets the resize detector id of the element.
       * @public
       * @param {element} element The target element to get the id of.
       * @returns {string|number|null} The id of the element. Null if it has no id.
       */

      function getId(element) {
        var state = getState(element);

        if (state && state.id !== undefined) {
          return state.id;
        }

        return null;
      }
      /**
       * Sets the resize detector id of the element. Requires the element to have a resize detector state initialized.
       * @public
       * @param {element} element The target element to set the id of.
       * @returns {string|number|null} The id of the element.
       */


      function setId(element) {
        var state = getState(element);

        if (!state) {
          throw new Error("setId required the element to have a resize detection state.");
        }

        var id = idGenerator.generate();
        state.id = id;
        return id;
      }

      return {
        get: getId,
        set: setId
      };
    };
    /***/

  },

  /***/
  "50bf":
  /***/
  function (module, exports, __webpack_require__) {
    "use strict";

    var utils = module.exports = {};
    utils.getOption = getOption;

    function getOption(options, name, defaultValue) {
      var value = options[name];

      if ((value === undefined || value === null) && defaultValue !== undefined) {
        return defaultValue;
      }

      return value;
    }
    /***/

  },

  /***/
  "520a":
  /***/
  function (module, exports, __nested_webpack_require_84236__) {
    "use strict";

    var regexpFlags = __nested_webpack_require_84236__("0bfb");

    var nativeExec = RegExp.prototype.exec; // This always refers to the native implementation, because the
    // String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
    // which loads this file before patching the method.

    var nativeReplace = String.prototype.replace;
    var patchedExec = nativeExec;
    var LAST_INDEX = 'lastIndex';

    var UPDATES_LAST_INDEX_WRONG = function () {
      var re1 = /a/,
          re2 = /b*/g;
      nativeExec.call(re1, 'a');
      nativeExec.call(re2, 'a');
      return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
    }(); // nonparticipating capturing group, copied from es5-shim's String#split patch.


    var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;
    var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

    if (PATCH) {
      patchedExec = function exec(str) {
        var re = this;
        var lastIndex, reCopy, match, i;

        if (NPCG_INCLUDED) {
          reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
        }

        if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];
        match = nativeExec.call(re, str);

        if (UPDATES_LAST_INDEX_WRONG && match) {
          re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
        }

        if (NPCG_INCLUDED && match && match.length > 1) {
          // Fix browsers whose `exec` methods don't consistently return `undefined`
          // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
          // eslint-disable-next-line no-loop-func
          nativeReplace.call(match[0], reCopy, function () {
            for (i = 1; i < arguments.length - 2; i++) {
              if (arguments[i] === undefined) match[i] = undefined;
            }
          });
        }

        return match;
      };
    }

    module.exports = patchedExec;
    /***/
  },

  /***/
  "52a7":
  /***/
  function (module, exports) {
    exports.f = {}.propertyIsEnumerable;
    /***/
  },

  /***/
  "5537":
  /***/
  function (module, exports, __nested_webpack_require_86362__) {
    var core = __nested_webpack_require_86362__("8378");

    var global = __nested_webpack_require_86362__("7726");

    var SHARED = '__core-js_shared__';
    var store = global[SHARED] || (global[SHARED] = {});
    (module.exports = function (key, value) {
      return store[key] || (store[key] = value !== undefined ? value : {});
    })('versions', []).push({
      version: core.version,
      mode: __nested_webpack_require_86362__("2d00") ? 'pure' : 'global',
      copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
    });
    /***/
  },

  /***/
  "55dd":
  /***/
  function (module, exports, __nested_webpack_require_86950__) {
    "use strict";

    var $export = __nested_webpack_require_86950__("5ca1");

    var aFunction = __nested_webpack_require_86950__("d8e8");

    var toObject = __nested_webpack_require_86950__("4bf8");

    var fails = __nested_webpack_require_86950__("79e5");

    var $sort = [].sort;
    var test = [1, 2, 3];
    $export($export.P + $export.F * (fails(function () {
      // IE8-
      test.sort(undefined);
    }) || !fails(function () {
      // V8 bug
      test.sort(null); // Old WebKit
    }) || !__nested_webpack_require_86950__("2f21")($sort)), 'Array', {
      // 22.1.3.25 Array.prototype.sort(comparefn)
      sort: function sort(comparefn) {
        return comparefn === undefined ? $sort.call(toObject(this)) : $sort.call(toObject(this), aFunction(comparefn));
      }
    });
    /***/
  },

  /***/
  "5be5":
  /***/
  function (module, exports, __webpack_require__) {
    "use strict";

    module.exports = function (options) {
      var getState = options.stateHandler.getState;
      /**
       * Tells if the element has been made detectable and ready to be listened for resize events.
       * @public
       * @param {element} The element to check.
       * @returns {boolean} True or false depending on if the element is detectable or not.
       */

      function isDetectable(element) {
        var state = getState(element);
        return state && !!state.isDetectable;
      }
      /**
       * Marks the element that it has been made detectable and ready to be listened for resize events.
       * @public
       * @param {element} The element to mark.
       */


      function markAsDetectable(element) {
        getState(element).isDetectable = true;
      }
      /**
       * Tells if the element is busy or not.
       * @public
       * @param {element} The element to check.
       * @returns {boolean} True or false depending on if the element is busy or not.
       */


      function isBusy(element) {
        return !!getState(element).busy;
      }
      /**
       * Marks the object is busy and should not be made detectable.
       * @public
       * @param {element} element The element to mark.
       * @param {boolean} busy If the element is busy or not.
       */


      function markBusy(element, busy) {
        getState(element).busy = !!busy;
      }

      return {
        isDetectable: isDetectable,
        markAsDetectable: markAsDetectable,
        isBusy: isBusy,
        markBusy: markBusy
      };
    };
    /***/

  },

  /***/
  "5ca1":
  /***/
  function (module, exports, __nested_webpack_require_89459__) {
    var global = __nested_webpack_require_89459__("7726");

    var core = __nested_webpack_require_89459__("8378");

    var hide = __nested_webpack_require_89459__("32e9");

    var redefine = __nested_webpack_require_89459__("2aba");

    var ctx = __nested_webpack_require_89459__("9b43");

    var PROTOTYPE = 'prototype';

    var $export = function (type, name, source) {
      var IS_FORCED = type & $export.F;
      var IS_GLOBAL = type & $export.G;
      var IS_STATIC = type & $export.S;
      var IS_PROTO = type & $export.P;
      var IS_BIND = type & $export.B;
      var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
      var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
      var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
      var key, own, out, exp;
      if (IS_GLOBAL) source = name;

      for (key in source) {
        // contains in native
        own = !IS_FORCED && target && target[key] !== undefined; // export native or passed

        out = (own ? target : source)[key]; // bind timers to global for call from export context

        exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out; // extend global

        if (target) redefine(target, key, out, type & $export.U); // export

        if (exports[key] != out) hide(exports, key, exp);
        if (IS_PROTO && expProto[key] != out) expProto[key] = out;
      }
    };

    global.core = core; // type bitmap

    $export.F = 1; // forced

    $export.G = 2; // global

    $export.S = 4; // static

    $export.P = 8; // proto

    $export.B = 16; // bind

    $export.W = 32; // wrap

    $export.U = 64; // safe

    $export.R = 128; // real proto method for `library`

    module.exports = $export;
    /***/
  },

  /***/
  "5dbc":
  /***/
  function (module, exports, __nested_webpack_require_91335__) {
    var isObject = __nested_webpack_require_91335__("d3f4");

    var setPrototypeOf = __nested_webpack_require_91335__("8b97").set;

    module.exports = function (that, target, C) {
      var S = target.constructor;
      var P;

      if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
        setPrototypeOf(that, P);
      }

      return that;
    };
    /***/

  },

  /***/
  "5ed4":
  /***/
  function (module, __webpack_exports__, __nested_webpack_require_91833__) {
    "use strict";
    /* harmony import */

    var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GridItem_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_91833__("6e21");
    /* harmony import */


    var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GridItem_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__nested_webpack_require_91833__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GridItem_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
    /* unused harmony reexport * */

    /***/

  },

  /***/
  "5eda":
  /***/
  function (module, exports, __nested_webpack_require_93483__) {
    // most Object methods by ES6 should accept primitives
    var $export = __nested_webpack_require_93483__("5ca1");

    var core = __nested_webpack_require_93483__("8378");

    var fails = __nested_webpack_require_93483__("79e5");

    module.exports = function (KEY, exec) {
      var fn = (core.Object || {})[KEY] || Object[KEY];
      var exp = {};
      exp[KEY] = exec(fn);
      $export($export.S + $export.F * fails(function () {
        fn(1);
      }), 'Object', exp);
    };
    /***/

  },

  /***/
  "5f1b":
  /***/
  function (module, exports, __nested_webpack_require_94029__) {
    "use strict";

    var classof = __nested_webpack_require_94029__("23c6");

    var builtinExec = RegExp.prototype.exec; // `RegExpExec` abstract operation
    // https://tc39.github.io/ecma262/#sec-regexpexec

    module.exports = function (R, S) {
      var exec = R.exec;

      if (typeof exec === 'function') {
        var result = exec.call(R, S);

        if (typeof result !== 'object') {
          throw new TypeError('RegExp exec method returned something other than an Object or null');
        }

        return result;
      }

      if (classof(R) !== 'RegExp') {
        throw new TypeError('RegExp#exec called on incompatible receiver');
      }

      return builtinExec.call(R, S);
    };
    /***/

  },

  /***/
  "613b":
  /***/
  function (module, exports, __nested_webpack_require_94822__) {
    var shared = __nested_webpack_require_94822__("5537")('keys');

    var uid = __nested_webpack_require_94822__("ca5a");

    module.exports = function (key) {
      return shared[key] || (shared[key] = uid(key));
    };
    /***/

  },

  /***/
  "626a":
  /***/
  function (module, exports, __nested_webpack_require_95115__) {
    // fallback for non-array-like ES3 and non-enumerable old V8 strings
    var cof = __nested_webpack_require_95115__("2d95"); // eslint-disable-next-line no-prototype-builtins


    module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
      return cof(it) == 'String' ? it.split('') : Object(it);
    };
    /***/
  },

  /***/
  "6821":
  /***/
  function (module, exports, __nested_webpack_require_95530__) {
    // to indexed object, toObject with fallback for non-array-like ES3 strings
    var IObject = __nested_webpack_require_95530__("626a");

    var defined = __nested_webpack_require_95530__("be13");

    module.exports = function (it) {
      return IObject(defined(it));
    };
    /***/

  },

  /***/
  "69a8":
  /***/
  function (module, exports) {
    var hasOwnProperty = {}.hasOwnProperty;

    module.exports = function (it, key) {
      return hasOwnProperty.call(it, key);
    };
    /***/

  },

  /***/
  "6a99":
  /***/
  function (module, exports, __nested_webpack_require_96091__) {
    // 7.1.1 ToPrimitive(input [, PreferredType])
    var isObject = __nested_webpack_require_96091__("d3f4"); // instead of the ES6 spec version, we didn't implement @@toPrimitive case
    // and the second argument - flag - preferred type is a string


    module.exports = function (it, S) {
      if (!isObject(it)) return it;
      var fn, val;
      if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
      if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
      if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
      throw TypeError("Can't convert object to primitive value");
    };
    /***/

  },

  /***/
  "6e21":
  /***/
  function (module, exports, __nested_webpack_require_96891__) {
    // style-loader: Adds some css to the DOM by adding a <style> tag
    // load the styles
    var content = __nested_webpack_require_96891__("9cbe");

    if (typeof content === 'string') content = [[module.i, content, '']];
    if (content.locals) module.exports = content.locals; // add the styles to the DOM

    var add = __nested_webpack_require_96891__("499e").default;

    var update = add("3cbd0c21", content, true, {
      "sourceMap": false,
      "shadowMode": false
    });
    /***/
  },

  /***/
  "7333":
  /***/
  function (module, exports, __nested_webpack_require_97449__) {
    "use strict"; // 19.1.2.1 Object.assign(target, source, ...)

    var DESCRIPTORS = __nested_webpack_require_97449__("9e1e");

    var getKeys = __nested_webpack_require_97449__("0d58");

    var gOPS = __nested_webpack_require_97449__("2621");

    var pIE = __nested_webpack_require_97449__("52a7");

    var toObject = __nested_webpack_require_97449__("4bf8");

    var IObject = __nested_webpack_require_97449__("626a");

    var $assign = Object.assign; // should work with symbols and should have deterministic property order (V8 bug)

    module.exports = !$assign || __nested_webpack_require_97449__("79e5")(function () {
      var A = {};
      var B = {}; // eslint-disable-next-line no-undef

      var S = Symbol();
      var K = 'abcdefghijklmnopqrst';
      A[S] = 7;
      K.split('').forEach(function (k) {
        B[k] = k;
      });
      return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
    }) ? function assign(target, source) {
      // eslint-disable-line no-unused-vars
      var T = toObject(target);
      var aLen = arguments.length;
      var index = 1;
      var getSymbols = gOPS.f;
      var isEnum = pIE.f;

      while (aLen > index) {
        var S = IObject(arguments[index++]);
        var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
        var length = keys.length;
        var j = 0;
        var key;

        while (length > j) {
          key = keys[j++];
          if (!DESCRIPTORS || isEnum.call(S, key)) T[key] = S[key];
        }
      }

      return T;
    } : $assign;
    /***/
  },

  /***/
  "7726":
  /***/
  function (module, exports) {
    // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
    var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self // eslint-disable-next-line no-new-func
    : Function('return this')();
    if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

    /***/
  },

  /***/
  "77f1":
  /***/
  function (module, exports, __nested_webpack_require_99475__) {
    var toInteger = __nested_webpack_require_99475__("4588");

    var max = Math.max;
    var min = Math.min;

    module.exports = function (index, length) {
      index = toInteger(index);
      return index < 0 ? max(index + length, 0) : min(index, length);
    };
    /***/

  },

  /***/
  "79e5":
  /***/
  function (module, exports) {
    module.exports = function (exec) {
      try {
        return !!exec();
      } catch (e) {
        return true;
      }
    };
    /***/

  },

  /***/
  "7f20":
  /***/
  function (module, exports, __nested_webpack_require_100032__) {
    var def = __nested_webpack_require_100032__("86cc").f;

    var has = __nested_webpack_require_100032__("69a8");

    var TAG = __nested_webpack_require_100032__("2b4c")('toStringTag');

    module.exports = function (it, tag, stat) {
      if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, {
        configurable: true,
        value: tag
      });
    };
    /***/

  },

  /***/
  "7f7f":
  /***/
  function (module, exports, __nested_webpack_require_100461__) {
    var dP = __nested_webpack_require_100461__("86cc").f;

    var FProto = Function.prototype;
    var nameRE = /^\s*function ([^ (]*)/;
    var NAME = 'name'; // 19.2.4.2 name

    NAME in FProto || __nested_webpack_require_100461__("9e1e") && dP(FProto, NAME, {
      configurable: true,
      get: function () {
        try {
          return ('' + this).match(nameRE)[1];
        } catch (e) {
          return '';
        }
      }
    });
    /***/
  },

  /***/
  "8378":
  /***/
  function (module, exports) {
    var core = module.exports = {
      version: '2.6.12'
    };
    if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

    /***/
  },

  /***/
  "84f2":
  /***/
  function (module, exports) {
    module.exports = {};
    /***/
  },

  /***/
  "86cc":
  /***/
  function (module, exports, __nested_webpack_require_101286__) {
    var anObject = __nested_webpack_require_101286__("cb7c");

    var IE8_DOM_DEFINE = __nested_webpack_require_101286__("c69a");

    var toPrimitive = __nested_webpack_require_101286__("6a99");

    var dP = Object.defineProperty;
    exports.f = __nested_webpack_require_101286__("9e1e") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
      anObject(O);
      P = toPrimitive(P, true);
      anObject(Attributes);
      if (IE8_DOM_DEFINE) try {
        return dP(O, P, Attributes);
      } catch (e) {
        /* empty */
      }
      if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
      if ('value' in Attributes) O[P] = Attributes.value;
      return O;
    };
    /***/
  },

  /***/
  "8b97":
  /***/
  function (module, exports, __nested_webpack_require_102062__) {
    // Works with __proto__ only. Old v8 can't work with null proto objects.

    /* eslint-disable no-proto */
    var isObject = __nested_webpack_require_102062__("d3f4");

    var anObject = __nested_webpack_require_102062__("cb7c");

    var check = function (O, proto) {
      anObject(O);
      if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
    };

    module.exports = {
      set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
      function (test, buggy, set) {
        try {
          set = __nested_webpack_require_102062__("9b43")(Function.call, __nested_webpack_require_102062__("11e9").f(Object.prototype, '__proto__').set, 2);
          set(test, []);
          buggy = !(test instanceof Array);
        } catch (e) {
          buggy = true;
        }

        return function setPrototypeOf(O, proto) {
          check(O, proto);
          if (buggy) O.__proto__ = proto;else set(O, proto);
          return O;
        };
      }({}, false) : undefined),
      check: check
    };
    /***/
  },

  /***/
  "8bbf":
  /***/
  function (module, exports) {
    module.exports = __webpack_require__(7203);
    /***/
  },

  /***/
  "8e6e":
  /***/
  function (module, exports, __nested_webpack_require_103278__) {
    // https://github.com/tc39/proposal-object-getownpropertydescriptors
    var $export = __nested_webpack_require_103278__("5ca1");

    var ownKeys = __nested_webpack_require_103278__("990b");

    var toIObject = __nested_webpack_require_103278__("6821");

    var gOPD = __nested_webpack_require_103278__("11e9");

    var createProperty = __nested_webpack_require_103278__("f1ae");

    $export($export.S, 'Object', {
      getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
        var O = toIObject(object);
        var getDesc = gOPD.f;
        var keys = ownKeys(O);
        var result = {};
        var i = 0;
        var key, desc;

        while (keys.length > i) {
          desc = getDesc(O, key = keys[i++]);
          if (desc !== undefined) createProperty(result, key, desc);
        }

        return result;
      }
    });
    /***/
  },

  /***/
  "9093":
  /***/
  function (module, exports, __nested_webpack_require_104167__) {
    // 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
    var $keys = __nested_webpack_require_104167__("ce10");

    var hiddenKeys = __nested_webpack_require_104167__("e11e").concat('length', 'prototype');

    exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
      return $keys(O, hiddenKeys);
    };
    /***/

  },

  /***/
  "97a7":
  /***/
  function (module, __webpack_exports__, __nested_webpack_require_104580__) {
    "use strict";
    /* harmony export (binding) */

    __nested_webpack_require_104580__.d(__webpack_exports__, "b", function () {
      return getBreakpointFromWidth;
    });
    /* harmony export (binding) */


    __nested_webpack_require_104580__.d(__webpack_exports__, "c", function () {
      return getColsFromBreakpoint;
    });
    /* harmony export (binding) */


    __nested_webpack_require_104580__.d(__webpack_exports__, "a", function () {
      return findOrGenerateResponsiveLayout;
    });
    /* unused harmony export generateResponsiveLayout */

    /* unused harmony export sortBreakpoints */

    /* harmony import */


    var core_js_modules_es6_array_sort__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_104580__("55dd");
    /* harmony import */


    var core_js_modules_es6_array_sort__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__nested_webpack_require_104580__.n(core_js_modules_es6_array_sort__WEBPACK_IMPORTED_MODULE_0__);
    /* harmony import */


    var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_104580__("ac6a");
    /* harmony import */


    var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__nested_webpack_require_104580__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_1__);
    /* harmony import */


    var core_js_modules_es6_array_iterator__WEBPACK_IMPORTED_MODULE_2__ = __nested_webpack_require_104580__("cadf");
    /* harmony import */


    var core_js_modules_es6_array_iterator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__nested_webpack_require_104580__.n(core_js_modules_es6_array_iterator__WEBPACK_IMPORTED_MODULE_2__);
    /* harmony import */


    var core_js_modules_es6_object_keys__WEBPACK_IMPORTED_MODULE_3__ = __nested_webpack_require_104580__("456d");
    /* harmony import */


    var core_js_modules_es6_object_keys__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__nested_webpack_require_104580__.n(core_js_modules_es6_object_keys__WEBPACK_IMPORTED_MODULE_3__);
    /* harmony import */


    var _utils__WEBPACK_IMPORTED_MODULE_4__ = __nested_webpack_require_104580__("a2b6"); // @flow

    /*:: import type {Layout} from './utils';*/

    /*:: export type ResponsiveLayout = {lg?: Layout, md?: Layout, sm?: Layout, xs?: Layout, xxs?: Layout};*/

    /*:: type Breakpoint = string;*/

    /**
     * Given a width, find the highest breakpoint that matches is valid for it (width > breakpoint).
     *
     * @param  {Object} breakpoints Breakpoints object (e.g. {lg: 1200, md: 960, ...})
     * @param  {Number} width Screen width.
     * @return {String}       Highest breakpoint that is less than width.
     */

    /*:: type Breakpoints = {lg?: number, md?: number, sm?: number, xs?: number, xxs?: number};*/


    function getBreakpointFromWidth(breakpoints
    /*: Breakpoints*/
    , width
    /*: number*/
    )
    /*: Breakpoint*/
    {
      var sorted = sortBreakpoints(breakpoints);
      var matching = sorted[0];

      for (var i = 1, len = sorted.length; i < len; i++) {
        var breakpointName = sorted[i];
        if (width > breakpoints[breakpointName]) matching = breakpointName;
      }

      return matching;
    }
    /**
     * Given a breakpoint, get the # of cols set for it.
     * @param  {String} breakpoint Breakpoint name.
     * @param  {Object} cols       Map of breakpoints to cols.
     * @return {Number}            Number of cols.
     */


    function getColsFromBreakpoint(breakpoint
    /*: Breakpoint*/
    , cols
    /*: Breakpoints*/
    )
    /*: number*/
    {
      if (!cols[breakpoint]) {
        throw new Error("ResponsiveGridLayout: `cols` entry for breakpoint " + breakpoint + " is missing!");
      }

      return cols[breakpoint];
    }
    /**
     * Given existing layouts and a new breakpoint, find or generate a new layout.
     *
     * This finds the layout above the new one and generates from it, if it exists.
     *
     * @param  {Array} orgLayout     Original layout.
     * @param  {Object} layouts     Existing layouts.
     * @param  {Array} breakpoints All breakpoints.
     * @param  {String} breakpoint New breakpoint.
     * @param  {String} breakpoint Last breakpoint (for fallback).
     * @param  {Number} cols       Column count at new breakpoint.
     * @param  {Boolean} verticalCompact Whether or not to compact the layout
     *   vertically.
     * @return {Array}             New layout.
     */


    function findOrGenerateResponsiveLayout(orgLayout
    /*: Layout*/
    , layouts
    /*: ResponsiveLayout*/
    , breakpoints
    /*: Breakpoints*/
    , breakpoint
    /*: Breakpoint*/
    , lastBreakpoint
    /*: Breakpoint*/
    , cols
    /*: number*/
    , verticalCompact
    /*: boolean*/
    )
    /*: Layout*/
    {
      // If it already exists, just return it.
      if (layouts[breakpoint]) return Object(_utils__WEBPACK_IMPORTED_MODULE_4__[
      /* cloneLayout */
      "b"])(layouts[breakpoint]); // Find or generate the next layout

      var layout = orgLayout;
      var breakpointsSorted = sortBreakpoints(breakpoints);
      var breakpointsAbove = breakpointsSorted.slice(breakpointsSorted.indexOf(breakpoint));

      for (var i = 0, len = breakpointsAbove.length; i < len; i++) {
        var b = breakpointsAbove[i];

        if (layouts[b]) {
          layout = layouts[b];
          break;
        }
      }

      layout = Object(_utils__WEBPACK_IMPORTED_MODULE_4__[
      /* cloneLayout */
      "b"])(layout || []); // clone layout so we don't modify existing items

      return Object(_utils__WEBPACK_IMPORTED_MODULE_4__[
      /* compact */
      "c"])(Object(_utils__WEBPACK_IMPORTED_MODULE_4__[
      /* correctBounds */
      "d"])(layout, {
        cols: cols
      }), verticalCompact);
    }

    function generateResponsiveLayout(layout
    /*: Layout*/
    , breakpoints
    /*: Breakpoints*/
    , breakpoint
    /*: Breakpoint*/
    , lastBreakpoint
    /*: Breakpoint*/
    , cols
    /*: number*/
    , verticalCompact
    /*: boolean*/
    )
    /*: Layout*/
    {
      // If it already exists, just return it.

      /*if (layouts[breakpoint]) return cloneLayout(layouts[breakpoint]);
      // Find or generate the next layout
      let layout = layouts[lastBreakpoint];*/

      /*const breakpointsSorted = sortBreakpoints(breakpoints);
      const breakpointsAbove = breakpointsSorted.slice(breakpointsSorted.indexOf(breakpoint));
      for (let i = 0, len = breakpointsAbove.length; i < len; i++) {
      const b = breakpointsAbove[i];
      if (layouts[b]) {
        layout = layouts[b];
        break;
      }
      }*/
      layout = Object(_utils__WEBPACK_IMPORTED_MODULE_4__[
      /* cloneLayout */
      "b"])(layout || []); // clone layout so we don't modify existing items

      return Object(_utils__WEBPACK_IMPORTED_MODULE_4__[
      /* compact */
      "c"])(Object(_utils__WEBPACK_IMPORTED_MODULE_4__[
      /* correctBounds */
      "d"])(layout, {
        cols: cols
      }), verticalCompact);
    }
    /**
     * Given breakpoints, return an array of breakpoints sorted by width. This is usually
     * e.g. ['xxs', 'xs', 'sm', ...]
     *
     * @param  {Object} breakpoints Key/value pair of breakpoint names to widths.
     * @return {Array}              Sorted breakpoints.
     */


    function sortBreakpoints(breakpoints
    /*: Breakpoints*/
    )
    /*: Array<Breakpoint>*/
    {
      var keys
      /*: Array<string>*/
      = Object.keys(breakpoints);
      return keys.sort(function (a, b) {
        return breakpoints[a] - breakpoints[b];
      });
    }
    /***/

  },

  /***/
  "990b":
  /***/
  function (module, exports, __nested_webpack_require_112179__) {
    // all object keys, includes non-enumerable and symbols
    var gOPN = __nested_webpack_require_112179__("9093");

    var gOPS = __nested_webpack_require_112179__("2621");

    var anObject = __nested_webpack_require_112179__("cb7c");

    var Reflect = __nested_webpack_require_112179__("7726").Reflect;

    module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
      var keys = gOPN.f(anObject(it));
      var getSymbols = gOPS.f;
      return getSymbols ? keys.concat(getSymbols(it)) : keys;
    };
    /***/

  },

  /***/
  "9b43":
  /***/
  function (module, exports, __nested_webpack_require_112742__) {
    // optional / simple context binding
    var aFunction = __nested_webpack_require_112742__("d8e8");

    module.exports = function (fn, that, length) {
      aFunction(fn);
      if (that === undefined) return fn;

      switch (length) {
        case 1:
          return function (a) {
            return fn.call(that, a);
          };

        case 2:
          return function (a, b) {
            return fn.call(that, a, b);
          };

        case 3:
          return function (a, b, c) {
            return fn.call(that, a, b, c);
          };
      }

      return function
        /* ...args */
      () {
        return fn.apply(that, arguments);
      };
    };
    /***/

  },

  /***/
  "9c6c":
  /***/
  function (module, exports, __nested_webpack_require_113502__) {
    // 22.1.3.31 Array.prototype[@@unscopables]
    var UNSCOPABLES = __nested_webpack_require_113502__("2b4c")('unscopables');

    var ArrayProto = Array.prototype;
    if (ArrayProto[UNSCOPABLES] == undefined) __nested_webpack_require_113502__("32e9")(ArrayProto, UNSCOPABLES, {});

    module.exports = function (key) {
      ArrayProto[UNSCOPABLES][key] = true;
    };
    /***/

  },

  /***/
  "9cbe":
  /***/
  function (module, exports, __nested_webpack_require_113943__) {
    exports = module.exports = __nested_webpack_require_113943__("2350")(false); // imports
    // module

    exports.push([module.i, ".vue-grid-item{-webkit-transition:all .2s ease;transition:all .2s ease;-webkit-transition-property:left,top,right;transition-property:left,top,right}.vue-grid-item.no-touch{-ms-touch-action:none;touch-action:none}.vue-grid-item.cssTransforms{-webkit-transition-property:-webkit-transform;transition-property:-webkit-transform;transition-property:transform;transition-property:transform,-webkit-transform;left:0;right:auto}.vue-grid-item.cssTransforms.render-rtl{left:auto;right:0}.vue-grid-item.resizing{opacity:.6;z-index:3}.vue-grid-item.vue-draggable-dragging{-webkit-transition:none;transition:none;z-index:3}.vue-grid-item.vue-grid-placeholder{background:red;opacity:.2;-webkit-transition-duration:.1s;transition-duration:.1s;z-index:2;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;-o-user-select:none;user-select:none}.vue-grid-item>.vue-resizable-handle{position:absolute;width:20px;height:20px;bottom:0;right:0;background:url(\"data:image/svg+xml;base64,PHN2ZyBzdHlsZT0iYmFja2dyb3VuZC1jb2xvcjojZmZmZmZmMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjYiIGhlaWdodD0iNiI+PHBhdGggZD0iTTYgNkgwVjQuMmg0LjJWMEg2djZ6IiBvcGFjaXR5PSIuMzAyIi8+PC9zdmc+\");background-position:100% 100%;padding:0 3px 3px 0;background-repeat:no-repeat;background-origin:content-box;-webkit-box-sizing:border-box;box-sizing:border-box;cursor:se-resize}.vue-grid-item>.vue-rtl-resizable-handle{bottom:0;left:0;background:url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTS0xLTFoMTJ2MTJILTF6Ii8+PGc+PHBhdGggc3Ryb2tlLWxpbmVjYXA9InVuZGVmaW5lZCIgc3Ryb2tlLWxpbmVqb2luPSJ1bmRlZmluZWQiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2U9IiMwMDAiIGZpbGw9Im5vbmUiIGQ9Ik0xNDQuODIxLTM4LjM5M2wtMjAuMzU3LTMxLjc4NSIvPjxwYXRoIHN0cm9rZT0iIzY2NiIgc3Ryb2tlLWxpbmVjYXA9InVuZGVmaW5lZCIgc3Ryb2tlLWxpbmVqb2luPSJ1bmRlZmluZWQiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIgZD0iTS45NDctLjAxOHY5LjEyNU0tLjY1NiA5aDEwLjczIi8+PC9nPjwvc3ZnPg==);background-position:0 100%;padding-left:3px;background-repeat:no-repeat;background-origin:content-box;cursor:sw-resize;right:auto}.vue-grid-item.disable-userselect{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}", ""]); // exports

    /***/
  },

  /***/
  "9def":
  /***/
  function (module, exports, __nested_webpack_require_116426__) {
    // 7.1.15 ToLength
    var toInteger = __nested_webpack_require_116426__("4588");

    var min = Math.min;

    module.exports = function (it) {
      return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
    };
    /***/

  },

  /***/
  "9e1e":
  /***/
  function (module, exports, __nested_webpack_require_116765__) {
    // Thank's IE8 for his funny defineProperty
    module.exports = !__nested_webpack_require_116765__("79e5")(function () {
      return Object.defineProperty({}, 'a', {
        get: function () {
          return 7;
        }
      }).a != 7;
    });
    /***/
  },

  /***/
  "a2b6":
  /***/
  function (module, __webpack_exports__, __nested_webpack_require_117111__) {
    "use strict";
    /* harmony export (binding) */

    __nested_webpack_require_117111__.d(__webpack_exports__, "a", function () {
      return bottom;
    });
    /* harmony export (binding) */


    __nested_webpack_require_117111__.d(__webpack_exports__, "b", function () {
      return cloneLayout;
    });
    /* unused harmony export cloneLayoutItem */

    /* unused harmony export collides */

    /* harmony export (binding) */


    __nested_webpack_require_117111__.d(__webpack_exports__, "c", function () {
      return compact;
    });
    /* unused harmony export compactItem */

    /* harmony export (binding) */


    __nested_webpack_require_117111__.d(__webpack_exports__, "d", function () {
      return correctBounds;
    });
    /* harmony export (binding) */


    __nested_webpack_require_117111__.d(__webpack_exports__, "f", function () {
      return getLayoutItem;
    });
    /* unused harmony export getFirstCollision */

    /* harmony export (binding) */


    __nested_webpack_require_117111__.d(__webpack_exports__, "e", function () {
      return getAllCollisions;
    });
    /* unused harmony export getStatics */

    /* harmony export (binding) */


    __nested_webpack_require_117111__.d(__webpack_exports__, "g", function () {
      return moveElement;
    });
    /* unused harmony export moveElementAwayFromCollision */

    /* unused harmony export perc */

    /* harmony export (binding) */


    __nested_webpack_require_117111__.d(__webpack_exports__, "j", function () {
      return setTransform;
    });
    /* harmony export (binding) */


    __nested_webpack_require_117111__.d(__webpack_exports__, "k", function () {
      return setTransformRtl;
    });
    /* harmony export (binding) */


    __nested_webpack_require_117111__.d(__webpack_exports__, "h", function () {
      return setTopLeft;
    });
    /* harmony export (binding) */


    __nested_webpack_require_117111__.d(__webpack_exports__, "i", function () {
      return setTopRight;
    });
    /* unused harmony export sortLayoutItemsByRowCol */

    /* harmony export (binding) */


    __nested_webpack_require_117111__.d(__webpack_exports__, "l", function () {
      return validateLayout;
    });
    /* unused harmony export autoBindHandlers */

    /* unused harmony export createMarkup */

    /* unused harmony export IS_UNITLESS */

    /* unused harmony export addPx */

    /* unused harmony export hyphenateRE */

    /* unused harmony export hyphenate */

    /* unused harmony export findItemInArray */

    /* unused harmony export findAndRemove */

    /* harmony import */


    var core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_117111__("a481");
    /* harmony import */


    var core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__nested_webpack_require_117111__.n(core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_0__);
    /* harmony import */


    var core_js_modules_es6_array_iterator__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_117111__("cadf");
    /* harmony import */


    var core_js_modules_es6_array_iterator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__nested_webpack_require_117111__.n(core_js_modules_es6_array_iterator__WEBPACK_IMPORTED_MODULE_1__);
    /* harmony import */


    var core_js_modules_es6_object_keys__WEBPACK_IMPORTED_MODULE_2__ = __nested_webpack_require_117111__("456d");
    /* harmony import */


    var core_js_modules_es6_object_keys__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__nested_webpack_require_117111__.n(core_js_modules_es6_object_keys__WEBPACK_IMPORTED_MODULE_2__);
    /* harmony import */


    var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_3__ = __nested_webpack_require_117111__("ac6a");
    /* harmony import */


    var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__nested_webpack_require_117111__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_3__);
    /* harmony import */


    var core_js_modules_es6_array_sort__WEBPACK_IMPORTED_MODULE_4__ = __nested_webpack_require_117111__("55dd");
    /* harmony import */


    var core_js_modules_es6_array_sort__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__nested_webpack_require_117111__.n(core_js_modules_es6_array_sort__WEBPACK_IMPORTED_MODULE_4__); // @flow

    /*:: export type LayoutItemRequired = {w: number, h: number, x: number, y: number, i: string};*/

    /*:: export type LayoutItem = LayoutItemRequired &
                             {minW?: number, minH?: number, maxW?: number, maxH?: number,
                              moved?: boolean, static?: boolean,
                              isDraggable?: ?boolean, isResizable?: ?boolean};*/
    // export type Position = {left: number, top: number, width: number, height: number};

    /*
    export type DragCallbackData = {
      node: HTMLElement,
      x: number, y: number,
      deltaX: number, deltaY: number,
      lastX: number, lastY: number
    };
    */
    // export type DragEvent = {e: Event} & DragCallbackData;

    /*:: export type Layout = Array<LayoutItem>;*/
    // export type ResizeEvent = {e: Event, node: HTMLElement, size: Size};
    // const isProduction = process.env.NODE_ENV === 'production';

    /**
     * Return the bottom coordinate of the layout.
     *
     * @param  {Array} layout Layout array.
     * @return {Number}       Bottom coordinate.
     */

    /*:: export type Size = {width: number, height: number};*/


    function bottom(layout
    /*: Layout*/
    )
    /*: number*/
    {
      var max = 0,
          bottomY;

      for (var i = 0, len = layout.length; i < len; i++) {
        bottomY = layout[i].y + layout[i].h;
        if (bottomY > max) max = bottomY;
      }

      return max;
    }

    function cloneLayout(layout
    /*: Layout*/
    )
    /*: Layout*/
    {
      var newLayout = Array(layout.length);

      for (var i = 0, len = layout.length; i < len; i++) {
        newLayout[i] = cloneLayoutItem(layout[i]);
      }

      return newLayout;
    } // Fast path to cloning, since this is monomorphic


    function cloneLayoutItem(layoutItem
    /*: LayoutItem*/
    )
    /*: LayoutItem*/
    {
      /*return {
        w: layoutItem.w, h: layoutItem.h, x: layoutItem.x, y: layoutItem.y, i: layoutItem.i,
        minW: layoutItem.minW, maxW: layoutItem.maxW, minH: layoutItem.minH, maxH: layoutItem.maxH,
        moved: Boolean(layoutItem.moved), static: Boolean(layoutItem.static),
        // These can be null
        isDraggable: layoutItem.isDraggable, isResizable: layoutItem.isResizable
      };*/
      return JSON.parse(JSON.stringify(layoutItem));
    }
    /**
     * Given two layoutitems, check if they collide.
     *
     * @return {Boolean}   True if colliding.
     */


    function collides(l1
    /*: LayoutItem*/
    , l2
    /*: LayoutItem*/
    )
    /*: boolean*/
    {
      if (l1 === l2) return false; // same element

      if (l1.x + l1.w <= l2.x) return false; // l1 is left of l2

      if (l1.x >= l2.x + l2.w) return false; // l1 is right of l2

      if (l1.y + l1.h <= l2.y) return false; // l1 is above l2

      if (l1.y >= l2.y + l2.h) return false; // l1 is below l2

      return true; // boxes overlap
    }
    /**
     * Given a layout, compact it. This involves going down each y coordinate and removing gaps
     * between items.
     *
     * @param  {Array} layout Layout.
     * @param  {Boolean} verticalCompact Whether or not to compact the layout
     *   vertically.
     * @param {Object} minPositions
     * @return {Array}       Compacted Layout.
     */


    function compact(layout
    /*: Layout*/
    , verticalCompact
    /*: Boolean*/
    , minPositions)
    /*: Layout*/
    {
      // Statics go in the compareWith array right away so items flow around them.
      var compareWith = getStatics(layout); // We go through the items by row and column.

      var sorted = sortLayoutItemsByRowCol(layout); // Holding for new items.

      var out = Array(layout.length);

      for (var i = 0, len = sorted.length; i < len; i++) {
        var l = sorted[i]; // Don't move static elements

        if (!l.static) {
          l = compactItem(compareWith, l, verticalCompact, minPositions); // Add to comparison array. We only collide with items before this one.
          // Statics are already in this array.

          compareWith.push(l);
        } // Add to output array to make sure they still come out in the right order.


        out[layout.indexOf(l)] = l; // Clear moved flag, if it exists.

        l.moved = false;
      }

      return out;
    }
    /**
     * Compact an item in the layout.
     */


    function compactItem(compareWith
    /*: Layout*/
    , l
    /*: LayoutItem*/
    , verticalCompact
    /*: boolean*/
    , minPositions)
    /*: LayoutItem*/
    {
      if (verticalCompact) {
        // Move the element up as far as it can go without colliding.
        while (l.y > 0 && !getFirstCollision(compareWith, l)) {
          l.y--;
        }
      } else if (minPositions) {
        var minY = minPositions[l.i].y;

        while (l.y > minY && !getFirstCollision(compareWith, l)) {
          l.y--;
        }
      } // Move it down, and keep moving it down if it's colliding.


      var collides;

      while (collides = getFirstCollision(compareWith, l)) {
        l.y = collides.y + collides.h;
      }

      return l;
    }
    /**
     * Given a layout, make sure all elements fit within its bounds.
     *
     * @param  {Array} layout Layout array.
     * @param  {Number} bounds Number of columns.
     */


    function correctBounds(layout
    /*: Layout*/
    , bounds
    /*: {cols: number}*/
    )
    /*: Layout*/
    {
      var collidesWith = getStatics(layout);

      for (var i = 0, len = layout.length; i < len; i++) {
        var l = layout[i]; // Overflows right

        if (l.x + l.w > bounds.cols) l.x = bounds.cols - l.w; // Overflows left

        if (l.x < 0) {
          l.x = 0;
          l.w = bounds.cols;
        }

        if (!l.static) collidesWith.push(l);else {
          // If this is static and collides with other statics, we must move it down.
          // We have to do something nicer than just letting them overlap.
          while (getFirstCollision(collidesWith, l)) {
            l.y++;
          }
        }
      }

      return layout;
    }
    /**
     * Get a layout item by ID. Used so we can override later on if necessary.
     *
     * @param  {Array}  layout Layout array.
     * @param  {String} id     ID
     * @return {LayoutItem}    Item at ID.
     */


    function getLayoutItem(layout
    /*: Layout*/
    , id
    /*: string*/
    )
    /*: ?LayoutItem*/
    {
      for (var i = 0, len = layout.length; i < len; i++) {
        if (layout[i].i === id) return layout[i];
      }
    }
    /**
     * Returns the first item this layout collides with.
     * It doesn't appear to matter which order we approach this from, although
     * perhaps that is the wrong thing to do.
     *
     * @param  {Object} layoutItem Layout item.
     * @return {Object|undefined}  A colliding layout item, or undefined.
     */


    function getFirstCollision(layout
    /*: Layout*/
    , layoutItem
    /*: LayoutItem*/
    )
    /*: ?LayoutItem*/
    {
      for (var i = 0, len = layout.length; i < len; i++) {
        if (collides(layout[i], layoutItem)) return layout[i];
      }
    }

    function getAllCollisions(layout
    /*: Layout*/
    , layoutItem
    /*: LayoutItem*/
    )
    /*: Array<LayoutItem>*/
    {
      return layout.filter(function (l) {
        return collides(l, layoutItem);
      });
    }
    /**
     * Get all static elements.
     * @param  {Array} layout Array of layout objects.
     * @return {Array}        Array of static layout items..
     */


    function getStatics(layout
    /*: Layout*/
    )
    /*: Array<LayoutItem>*/
    {
      //return [];
      return layout.filter(function (l) {
        return l.static;
      });
    }
    /**
     * Move an element. Responsible for doing cascading movements of other elements.
     *
     * @param  {Array}      layout Full layout to modify.
     * @param  {LayoutItem} l      element to move.
     * @param  {Number}     [x]    X position in grid units.
     * @param  {Number}     [y]    Y position in grid units.
     * @param  {Boolean}    [isUserAction] If true, designates that the item we're moving is
     *                                     being dragged/resized by th euser.
     */


    function moveElement(layout
    /*: Layout*/
    , l
    /*: LayoutItem*/
    , x
    /*: Number*/
    , y
    /*: Number*/
    , isUserAction
    /*: Boolean*/
    , preventCollision
    /*: Boolean*/
    )
    /*: Layout*/
    {
      if (l.static) return layout; // Short-circuit if nothing to do.
      //if (l.y === y && l.x === x) return layout;

      var oldX = l.x;
      var oldY = l.y;
      var movingUp = y && l.y > y; // This is quite a bit faster than extending the object

      if (typeof x === 'number') l.x = x;
      if (typeof y === 'number') l.y = y;
      l.moved = true; // If this collides with anything, move it.
      // When doing this comparison, we have to sort the items we compare with
      // to ensure, in the case of multiple collisions, that we're getting the
      // nearest collision.

      var sorted = sortLayoutItemsByRowCol(layout);
      if (movingUp) sorted = sorted.reverse();
      var collisions = getAllCollisions(sorted, l);

      if (preventCollision && collisions.length) {
        l.x = oldX;
        l.y = oldY;
        l.moved = false;
        return layout;
      } // Move each item that collides away from this element.


      for (var i = 0, len = collisions.length; i < len; i++) {
        var collision = collisions[i]; // console.log('resolving collision between', l.i, 'at', l.y, 'and', collision.i, 'at', collision.y);
        // Short circuit so we can't infinite loop

        if (collision.moved) continue; // This makes it feel a bit more precise by waiting to swap for just a bit when moving up.

        if (l.y > collision.y && l.y - collision.y > collision.h / 4) continue; // Don't move static items - we have to move *this* element away

        if (collision.static) {
          layout = moveElementAwayFromCollision(layout, collision, l, isUserAction);
        } else {
          layout = moveElementAwayFromCollision(layout, l, collision, isUserAction);
        }
      }

      return layout;
    }
    /**
     * This is where the magic needs to happen - given a collision, move an element away from the collision.
     * We attempt to move it up if there's room, otherwise it goes below.
     *
     * @param  {Array} layout            Full layout to modify.
     * @param  {LayoutItem} collidesWith Layout item we're colliding with.
     * @param  {LayoutItem} itemToMove   Layout item we're moving.
     * @param  {Boolean} [isUserAction]  If true, designates that the item we're moving is being dragged/resized
     *                                   by the user.
     */


    function moveElementAwayFromCollision(layout
    /*: Layout*/
    , collidesWith
    /*: LayoutItem*/
    , itemToMove
    /*: LayoutItem*/
    , isUserAction
    /*: ?boolean*/
    )
    /*: Layout*/
    {
      var preventCollision = false; // we're already colliding
      // If there is enough space above the collision to put this element, move it there.
      // We only do this on the main collision as this can get funky in cascades and cause
      // unwanted swapping behavior.

      if (isUserAction) {
        // Make a mock item so we don't modify the item here, only modify in moveElement.
        var fakeItem
        /*: LayoutItem*/
        = {
          x: itemToMove.x,
          y: itemToMove.y,
          w: itemToMove.w,
          h: itemToMove.h,
          i: '-1'
        };
        fakeItem.y = Math.max(collidesWith.y - itemToMove.h, 0);

        if (!getFirstCollision(layout, fakeItem)) {
          return moveElement(layout, itemToMove, undefined, fakeItem.y, preventCollision);
        }
      } // Previously this was optimized to move below the collision directly, but this can cause problems
      // with cascading moves, as an item may actually leapflog a collision and cause a reversal in order.


      return moveElement(layout, itemToMove, undefined, itemToMove.y + 1, preventCollision);
    }
    /**
     * Helper to convert a number to a percentage string.
     *
     * @param  {Number} num Any number
     * @return {String}     That number as a percentage.
     */


    function perc(num
    /*: number*/
    )
    /*: string*/
    {
      return num * 100 + '%';
    }

    function setTransform(top, left, width, height)
    /*: Object*/
    {
      // Replace unitless items with px
      var translate = "translate3d(" + left + "px," + top + "px, 0)";
      return {
        transform: translate,
        WebkitTransform: translate,
        MozTransform: translate,
        msTransform: translate,
        OTransform: translate,
        width: width + "px",
        height: height + "px",
        position: 'absolute'
      };
    }
    /**
     * Just like the setTransform method, but instead it will return a negative value of right.
     *
     * @param top
     * @param right
     * @param width
     * @param height
     * @returns {{transform: string, WebkitTransform: string, MozTransform: string, msTransform: string, OTransform: string, width: string, height: string, position: string}}
     */


    function setTransformRtl(top, right, width, height)
    /*: Object*/
    {
      // Replace unitless items with px
      var translate = "translate3d(" + right * -1 + "px," + top + "px, 0)";
      return {
        transform: translate,
        WebkitTransform: translate,
        MozTransform: translate,
        msTransform: translate,
        OTransform: translate,
        width: width + "px",
        height: height + "px",
        position: 'absolute'
      };
    }

    function setTopLeft(top, left, width, height)
    /*: Object*/
    {
      return {
        top: top + "px",
        left: left + "px",
        width: width + "px",
        height: height + "px",
        position: 'absolute'
      };
    }
    /**
     * Just like the setTopLeft method, but instead, it will return a right property instead of left.
     *
     * @param top
     * @param right
     * @param width
     * @param height
     * @returns {{top: string, right: string, width: string, height: string, position: string}}
     */


    function setTopRight(top, right, width, height)
    /*: Object*/
    {
      return {
        top: top + "px",
        right: right + "px",
        width: width + "px",
        height: height + "px",
        position: 'absolute'
      };
    }
    /**
     * Get layout items sorted from top left to right and down.
     *
     * @return {Array} Array of layout objects.
     * @return {Array}        Layout, sorted static items first.
     */


    function sortLayoutItemsByRowCol(layout
    /*: Layout*/
    )
    /*: Layout*/
    {
      return [].concat(layout).sort(function (a, b) {
        if (a.y === b.y && a.x === b.x) {
          return 0;
        }

        if (a.y > b.y || a.y === b.y && a.x > b.x) {
          return 1;
        }

        return -1;
      });
    }
    /**
     * Generate a layout using the initialLayout and children as a template.
     * Missing entries will be added, extraneous ones will be truncated.
     *
     * @param  {Array}  initialLayout Layout passed in through props.
     * @param  {String} breakpoint    Current responsive breakpoint.
     * @param  {Boolean} verticalCompact Whether or not to compact the layout vertically.
     * @return {Array}                Working layout.
     */

    /*
    export function synchronizeLayoutWithChildren(initialLayout: Layout, children: Array<React.Element>|React.Element,
                                                  cols: number, verticalCompact: boolean): Layout {
      // ensure 'children' is always an array
      if (!Array.isArray(children)) {
        children = [children];
      }
      initialLayout = initialLayout || [];
    
      // Generate one layout item per child.
      let layout: Layout = [];
      for (let i = 0, len = children.length; i < len; i++) {
        let newItem;
        const child = children[i];
    
        // Don't overwrite if it already exists.
        const exists = getLayoutItem(initialLayout, child.key || "1" /!* FIXME satisfies Flow *!/);
        if (exists) {
          newItem = exists;
        } else {
          const g = child.props._grid;
    
          // Hey, this item has a _grid property, use it.
          if (g) {
            if (!isProduction) {
              validateLayout([g], 'ReactGridLayout.children');
            }
            // Validated; add it to the layout. Bottom 'y' possible is the bottom of the layout.
            // This allows you to do nice stuff like specify {y: Infinity}
            if (verticalCompact) {
              newItem = cloneLayoutItem({...g, y: Math.min(bottom(layout), g.y), i: child.key});
            } else {
              newItem = cloneLayoutItem({...g, y: g.y, i: child.key});
            }
          }
          // Nothing provided: ensure this is added to the bottom
          else {
            newItem = cloneLayoutItem({w: 1, h: 1, x: 0, y: bottom(layout), i: child.key || "1"});
          }
        }
        layout[i] = newItem;
      }
    
      // Correct the layout.
      layout = correctBounds(layout, {cols: cols});
      layout = compact(layout, verticalCompact);
    
      return layout;
    }
    */

    /**
     * Validate a layout. Throws errors.
     *
     * @param  {Array}  layout        Array of layout items.
     * @param  {String} [contextName] Context name for errors.
     * @throw  {Error}                Validation error.
     */


    function validateLayout(layout
    /*: Layout*/
    , contextName
    /*: string*/
    )
    /*: void*/
    {
      contextName = contextName || "Layout";
      var subProps = ['x', 'y', 'w', 'h'];
      var keyArr = [];
      if (!Array.isArray(layout)) throw new Error(contextName + " must be an array!");

      for (var i = 0, len = layout.length; i < len; i++) {
        var item = layout[i];

        for (var j = 0; j < subProps.length; j++) {
          if (typeof item[subProps[j]] !== 'number') {
            throw new Error('VueGridLayout: ' + contextName + '[' + i + '].' + subProps[j] + ' must be a number!');
          }
        }

        if (item.i === undefined || item.i === null) {
          throw new Error('VueGridLayout: ' + contextName + '[' + i + '].i cannot be null!');
        }

        if (typeof item.i !== 'number' && typeof item.i !== 'string') {
          throw new Error('VueGridLayout: ' + contextName + '[' + i + '].i must be a string or number!');
        }

        if (keyArr.indexOf(item.i) >= 0) {
          throw new Error('VueGridLayout: ' + contextName + '[' + i + '].i must be unique!');
        }

        keyArr.push(item.i);

        if (item.static !== undefined && typeof item.static !== 'boolean') {
          throw new Error('VueGridLayout: ' + contextName + '[' + i + '].static must be a boolean!');
        }
      }
    } // Flow can't really figure this out, so we just use Object


    function autoBindHandlers(el
    /*: Object*/
    , fns
    /*: Array<string>*/
    )
    /*: void*/
    {
      fns.forEach(function (key) {
        return el[key] = el[key].bind(el);
      });
    }
    /**
     * Convert a JS object to CSS string. Similar to React's output of CSS.
     * @param obj
     * @returns {string}
     */


    function createMarkup(obj) {
      var keys = Object.keys(obj);
      if (!keys.length) return '';
      var i,
          len = keys.length;
      var result = '';

      for (i = 0; i < len; i++) {
        var key = keys[i];
        var val = obj[key];
        result += hyphenate(key) + ':' + addPx(key, val) + ';';
      }

      return result;
    }
    /* The following list is defined in React's core */


    var IS_UNITLESS = {
      animationIterationCount: true,
      boxFlex: true,
      boxFlexGroup: true,
      boxOrdinalGroup: true,
      columnCount: true,
      flex: true,
      flexGrow: true,
      flexPositive: true,
      flexShrink: true,
      flexNegative: true,
      flexOrder: true,
      gridRow: true,
      gridColumn: true,
      fontWeight: true,
      lineClamp: true,
      lineHeight: true,
      opacity: true,
      order: true,
      orphans: true,
      tabSize: true,
      widows: true,
      zIndex: true,
      zoom: true,
      // SVG-related properties
      fillOpacity: true,
      stopOpacity: true,
      strokeDashoffset: true,
      strokeOpacity: true,
      strokeWidth: true
    };
    /**
     * Will add px to the end of style values which are Numbers.
     * @param name
     * @param value
     * @returns {*}
     */

    function addPx(name, value) {
      if (typeof value === 'number' && !IS_UNITLESS[name]) {
        return value + 'px';
      } else {
        return value;
      }
    }
    /**
     * Hyphenate a camelCase string.
     *
     * @param {String} str
     * @return {String}
     */


    var hyphenateRE = /([a-z\d])([A-Z])/g;

    function hyphenate(str) {
      return str.replace(hyphenateRE, '$1-$2').toLowerCase();
    }

    function findItemInArray(array, property, value) {
      for (var i = 0; i < array.length; i++) {
        if (array[i][property] == value) return true;
      }

      return false;
    }

    function findAndRemove(array, property, value) {
      array.forEach(function (result, index) {
        if (result[property] === value) {
          //Remove from array
          array.splice(index, 1);
        }
      });
    }
    /***/

  },

  /***/
  "a481":
  /***/
  function (module, exports, __nested_webpack_require_143046__) {
    "use strict";

    var anObject = __nested_webpack_require_143046__("cb7c");

    var toObject = __nested_webpack_require_143046__("4bf8");

    var toLength = __nested_webpack_require_143046__("9def");

    var toInteger = __nested_webpack_require_143046__("4588");

    var advanceStringIndex = __nested_webpack_require_143046__("0390");

    var regExpExec = __nested_webpack_require_143046__("5f1b");

    var max = Math.max;
    var min = Math.min;
    var floor = Math.floor;
    var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
    var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

    var maybeToString = function (it) {
      return it === undefined ? it : String(it);
    }; // @@replace logic


    __nested_webpack_require_143046__("214f")('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
      return [// `String.prototype.replace` method
      // https://tc39.github.io/ecma262/#sec-string.prototype.replace
      function replace(searchValue, replaceValue) {
        var O = defined(this);
        var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
        return fn !== undefined ? fn.call(searchValue, O, replaceValue) : $replace.call(String(O), searchValue, replaceValue);
      }, // `RegExp.prototype[@@replace]` method
      // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
      function (regexp, replaceValue) {
        var res = maybeCallNative($replace, regexp, this, replaceValue);
        if (res.done) return res.value;
        var rx = anObject(regexp);
        var S = String(this);
        var functionalReplace = typeof replaceValue === 'function';
        if (!functionalReplace) replaceValue = String(replaceValue);
        var global = rx.global;

        if (global) {
          var fullUnicode = rx.unicode;
          rx.lastIndex = 0;
        }

        var results = [];

        while (true) {
          var result = regExpExec(rx, S);
          if (result === null) break;
          results.push(result);
          if (!global) break;
          var matchStr = String(result[0]);
          if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        }

        var accumulatedResult = '';
        var nextSourcePosition = 0;

        for (var i = 0; i < results.length; i++) {
          result = results[i];
          var matched = String(result[0]);
          var position = max(min(toInteger(result.index), S.length), 0);
          var captures = []; // NOTE: This is equivalent to
          //   captures = result.slice(1).map(maybeToString)
          // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
          // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
          // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.

          for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));

          var namedCaptures = result.groups;

          if (functionalReplace) {
            var replacerArgs = [matched].concat(captures, position, S);
            if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
            var replacement = String(replaceValue.apply(undefined, replacerArgs));
          } else {
            replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
          }

          if (position >= nextSourcePosition) {
            accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
            nextSourcePosition = position + matched.length;
          }
        }

        return accumulatedResult + S.slice(nextSourcePosition);
      }]; // https://tc39.github.io/ecma262/#sec-getsubstitution

      function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
        var tailPos = position + matched.length;
        var m = captures.length;
        var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;

        if (namedCaptures !== undefined) {
          namedCaptures = toObject(namedCaptures);
          symbols = SUBSTITUTION_SYMBOLS;
        }

        return $replace.call(replacement, symbols, function (match, ch) {
          var capture;

          switch (ch.charAt(0)) {
            case '$':
              return '$';

            case '&':
              return matched;

            case '`':
              return str.slice(0, position);

            case "'":
              return str.slice(tailPos);

            case '<':
              capture = namedCaptures[ch.slice(1, -1)];
              break;

            default:
              // \d\d?
              var n = +ch;
              if (n === 0) return match;

              if (n > m) {
                var f = floor(n / 10);
                if (f === 0) return match;
                if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
                return match;
              }

              capture = captures[n - 1];
          }

          return capture === undefined ? '' : capture;
        });
      }
    });
    /***/

  },

  /***/
  "aa77":
  /***/
  function (module, exports, __nested_webpack_require_148169__) {
    var $export = __nested_webpack_require_148169__("5ca1");

    var defined = __nested_webpack_require_148169__("be13");

    var fails = __nested_webpack_require_148169__("79e5");

    var spaces = __nested_webpack_require_148169__("fdef");

    var space = '[' + spaces + ']';
    var non = '\u200b\u0085';
    var ltrim = RegExp('^' + space + space + '*');
    var rtrim = RegExp(space + space + '*$');

    var exporter = function (KEY, exec, ALIAS) {
      var exp = {};
      var FORCE = fails(function () {
        return !!spaces[KEY]() || non[KEY]() != non;
      });
      var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
      if (ALIAS) exp[ALIAS] = fn;
      $export($export.P + $export.F * FORCE, 'String', exp);
    }; // 1 -> String#trimLeft
    // 2 -> String#trimRight
    // 3 -> String#trim


    var trim = exporter.trim = function (string, TYPE) {
      string = String(defined(string));
      if (TYPE & 1) string = string.replace(ltrim, '');
      if (TYPE & 2) string = string.replace(rtrim, '');
      return string;
    };

    module.exports = exporter;
    /***/
  },

  /***/
  "abb4":
  /***/
  function (module, exports, __webpack_require__) {
    "use strict";
    /* global console: false */

    /**
     * Reporter that handles the reporting of logs, warnings and errors.
     * @public
     * @param {boolean} quiet Tells if the reporter should be quiet or not.
     */

    module.exports = function (quiet) {
      function noop() {//Does nothing.
      }

      var reporter = {
        log: noop,
        warn: noop,
        error: noop
      };

      if (!quiet && window.console) {
        var attachFunction = function (reporter, name) {
          //The proxy is needed to be able to call the method with the console context,
          //since we cannot use bind.
          reporter[name] = function reporterProxy() {
            var f = console[name];

            if (f.apply) {
              //IE9 does not support console.log.apply :)
              f.apply(console, arguments);
            } else {
              for (var i = 0; i < arguments.length; i++) {
                f(arguments[i]);
              }
            }
          };
        };

        attachFunction(reporter, "log");
        attachFunction(reporter, "warn");
        attachFunction(reporter, "error");
      }

      return reporter;
    };
    /***/

  },

  /***/
  "ac6a":
  /***/
  function (module, exports, __nested_webpack_require_150575__) {
    var $iterators = __nested_webpack_require_150575__("cadf");

    var getKeys = __nested_webpack_require_150575__("0d58");

    var redefine = __nested_webpack_require_150575__("2aba");

    var global = __nested_webpack_require_150575__("7726");

    var hide = __nested_webpack_require_150575__("32e9");

    var Iterators = __nested_webpack_require_150575__("84f2");

    var wks = __nested_webpack_require_150575__("2b4c");

    var ITERATOR = wks('iterator');
    var TO_STRING_TAG = wks('toStringTag');
    var ArrayValues = Iterators.Array;
    var DOMIterables = {
      CSSRuleList: true,
      // TODO: Not spec compliant, should be false.
      CSSStyleDeclaration: false,
      CSSValueList: false,
      ClientRectList: false,
      DOMRectList: false,
      DOMStringList: false,
      DOMTokenList: true,
      DataTransferItemList: false,
      FileList: false,
      HTMLAllCollection: false,
      HTMLCollection: false,
      HTMLFormElement: false,
      HTMLSelectElement: false,
      MediaList: true,
      // TODO: Not spec compliant, should be false.
      MimeTypeArray: false,
      NamedNodeMap: false,
      NodeList: true,
      PaintRequestList: false,
      Plugin: false,
      PluginArray: false,
      SVGLengthList: false,
      SVGNumberList: false,
      SVGPathSegList: false,
      SVGPointList: false,
      SVGStringList: false,
      SVGTransformList: false,
      SourceBufferList: false,
      StyleSheetList: true,
      // TODO: Not spec compliant, should be false.
      TextTrackCueList: false,
      TextTrackList: false,
      TouchList: false
    };

    for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
      var NAME = collections[i];
      var explicit = DOMIterables[NAME];
      var Collection = global[NAME];
      var proto = Collection && Collection.prototype;
      var key;

      if (proto) {
        if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
        if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
        Iterators[NAME] = ArrayValues;
        if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
      }
    }
    /***/

  },

  /***/
  "ad20":
  /***/
  function (module, exports, __nested_webpack_require_152762__) {
    exports = module.exports = __nested_webpack_require_152762__("2350")(false); // imports
    // module

    exports.push([module.i, ".vue-grid-layout{position:relative;-webkit-transition:height .2s ease;transition:height .2s ease}", ""]); // exports

    /***/
  },

  /***/
  "ade3":
  /***/
  function (module, __webpack_exports__, __nested_webpack_require_153108__) {
    "use strict";
    /* harmony export (binding) */

    __nested_webpack_require_153108__.d(__webpack_exports__, "a", function () {
      return _defineProperty;
    });

    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }

      return obj;
    }
    /***/

  },

  /***/
  "b0c5":
  /***/
  function (module, exports, __nested_webpack_require_153669__) {
    "use strict";

    var regexpExec = __nested_webpack_require_153669__("520a");

    __nested_webpack_require_153669__("5ca1")({
      target: 'RegExp',
      proto: true,
      forced: regexpExec !== /./.exec
    }, {
      exec: regexpExec
    });
    /***/

  },

  /***/
  "b770":
  /***/
  function (module, exports, __webpack_require__) {
    "use strict";

    var utils = module.exports = {};
    /**
     * Loops through the collection and calls the callback for each element. if the callback returns truthy, the loop is broken and returns the same value.
     * @public
     * @param {*} collection The collection to loop through. Needs to have a length property set and have indices set from 0 to length - 1.
     * @param {function} callback The callback to be called for each element. The element will be given as a parameter to the callback. If this callback returns truthy, the loop is broken and the same value is returned.
     * @returns {*} The value that a callback has returned (if truthy). Otherwise nothing.
     */

    utils.forEach = function (collection, callback) {
      for (var i = 0; i < collection.length; i++) {
        var result = callback(collection[i]);

        if (result) {
          return result;
        }
      }
    };
    /***/

  },

  /***/
  "bc21":
  /***/
  function (module, __webpack_exports__, __nested_webpack_require_155016__) {
    "use strict"; // NAMESPACE OBJECT: ./node_modules/@interactjs/snappers/all.js

    var all_namespaceObject = {};

    __nested_webpack_require_155016__.r(all_namespaceObject);

    __nested_webpack_require_155016__.d(all_namespaceObject, "edgeTarget", function () {
      return edgeTarget;
    });

    __nested_webpack_require_155016__.d(all_namespaceObject, "elements", function () {
      return snappers_elements;
    });

    __nested_webpack_require_155016__.d(all_namespaceObject, "grid", function () {
      return grid;
    }); // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"1705dc22-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/GridItem.vue?vue&type=template&id=e7489122&


    var render = function () {
      var _vm = this;

      var _h = _vm.$createElement;

      var _c = _vm._self._c || _h;

      return _c('div', {
        ref: "item",
        staticClass: "vue-grid-item",
        class: _vm.classObj,
        style: _vm.style
      }, [_vm._t("default"), _vm.resizableAndNotStatic ? _c('span', {
        ref: "handle",
        class: _vm.resizableHandleClass
      }) : _vm._e()], 2);
    };

    var staticRenderFns = []; // CONCATENATED MODULE: ./src/components/GridItem.vue?vue&type=template&id=e7489122&
    // EXTERNAL MODULE: ./node_modules/core-js/modules/es7.object.get-own-property-descriptors.js

    var es7_object_get_own_property_descriptors = __nested_webpack_require_155016__("8e6e"); // EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js


    var web_dom_iterable = __nested_webpack_require_155016__("ac6a"); // EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.iterator.js


    var es6_array_iterator = __nested_webpack_require_155016__("cadf"); // EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.keys.js


    var es6_object_keys = __nested_webpack_require_155016__("456d"); // EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.replace.js


    var es6_regexp_replace = __nested_webpack_require_155016__("a481"); // EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js


    var defineProperty = __nested_webpack_require_155016__("ade3"); // EXTERNAL MODULE: ./node_modules/core-js/modules/es6.number.is-finite.js


    var es6_number_is_finite = __nested_webpack_require_155016__("fca0"); // EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.match.js


    var es6_regexp_match = __nested_webpack_require_155016__("4917"); // EXTERNAL MODULE: ./node_modules/core-js/modules/es6.number.constructor.js


    var es6_number_constructor = __nested_webpack_require_155016__("c5f6"); // EXTERNAL MODULE: ./src/helpers/utils.js


    var utils = __nested_webpack_require_155016__("a2b6"); // CONCATENATED MODULE: ./src/helpers/draggableUtils.js
    // Get {x, y} positions from event.


    function getControlPosition(e) {
      return offsetXYFromParentOf(e);
    } // Get from offsetParent


    function offsetXYFromParentOf(evt) {
      var offsetParent = evt.target.offsetParent || document.body;
      var offsetParentRect = evt.offsetParent === document.body ? {
        left: 0,
        top: 0
      } : offsetParent.getBoundingClientRect();
      var x = evt.clientX + offsetParent.scrollLeft - offsetParentRect.left;
      var y = evt.clientY + offsetParent.scrollTop - offsetParentRect.top;
      /*const x = Math.round(evt.clientX + offsetParent.scrollLeft - offsetParentRect.left);
      const y = Math.round(evt.clientY + offsetParent.scrollTop - offsetParentRect.top);*/

      return {
        x: x,
        y: y
      };
    } // Create an data object exposed by <DraggableCore>'s events


    function createCoreData(lastX, lastY, x, y) {
      // State changes are often (but not always!) async. We want the latest value.
      var isStart = !isNum(lastX);

      if (isStart) {
        // If this is our first move, use the x and y as last coords.
        return {
          deltaX: 0,
          deltaY: 0,
          lastX: x,
          lastY: y,
          x: x,
          y: y
        };
      } else {
        // Otherwise calculate proper values.
        return {
          deltaX: x - lastX,
          deltaY: y - lastY,
          lastX: lastX,
          lastY: lastY,
          x: x,
          y: y
        };
      }
    }

    function isNum(num) {
      return typeof num === 'number' && !isNaN(num);
    } // EXTERNAL MODULE: ./src/helpers/responsiveUtils.js


    var responsiveUtils = __nested_webpack_require_155016__("97a7"); // EXTERNAL MODULE: ./src/helpers/DOM.js


    var DOM = __nested_webpack_require_155016__("1ca7"); // CONCATENATED MODULE: ./node_modules/@interactjs/utils/domObjects.js


    const domObjects = {
      init,
      document: null,
      DocumentFragment: null,
      SVGElement: null,
      SVGSVGElement: null,
      SVGElementInstance: null,
      Element: null,
      HTMLElement: null,
      Event: null,
      Touch: null,
      PointerEvent: null
    };

    function blank() {}
    /* harmony default export */


    var utils_domObjects = domObjects;

    function init(window) {
      const win = window;
      domObjects.document = win.document;
      domObjects.DocumentFragment = win.DocumentFragment || blank;
      domObjects.SVGElement = win.SVGElement || blank;
      domObjects.SVGSVGElement = win.SVGSVGElement || blank;
      domObjects.SVGElementInstance = win.SVGElementInstance || blank;
      domObjects.Element = win.Element || blank;
      domObjects.HTMLElement = win.HTMLElement || domObjects.Element;
      domObjects.Event = win.Event;
      domObjects.Touch = win.Touch || blank;
      domObjects.PointerEvent = win.PointerEvent || win.MSPointerEvent;
    } // CONCATENATED MODULE: ./node_modules/@interactjs/utils/isWindow.js

    /* harmony default export */


    var isWindow = thing => !!(thing && thing.Window) && thing instanceof thing.Window; // CONCATENATED MODULE: ./node_modules/@interactjs/utils/window.js


    let realWindow = undefined;
    let win = undefined;

    function window_init(window) {
      // get wrapped window if using Shadow DOM polyfill
      realWindow = window; // create a TextNode

      const el = window.document.createTextNode(''); // check if it's wrapped by a polyfill

      if (el.ownerDocument !== window.document && typeof window.wrap === 'function' && window.wrap(el) === el) {
        // use wrapped window
        window = window.wrap(window);
      }

      win = window;
    }

    if (typeof window !== 'undefined' && !!window) {
      window_init(window);
    }

    function getWindow(node) {
      if (isWindow(node)) {
        return node;
      }

      const rootNode = node.ownerDocument || node;
      return rootNode.defaultView || win.window;
    } // CONCATENATED MODULE: ./node_modules/@interactjs/utils/is.js


    const is_window = thing => thing === win || isWindow(thing);

    const docFrag = thing => object(thing) && thing.nodeType === 11;

    const object = thing => !!thing && typeof thing === 'object';

    const func = thing => typeof thing === 'function';

    const number = thing => typeof thing === 'number';

    const bool = thing => typeof thing === 'boolean';

    const string = thing => typeof thing === 'string';

    const is_element = thing => {
      if (!thing || typeof thing !== 'object') {
        return false;
      } // eslint-disable-next-line import/no-named-as-default-member


      const _window = getWindow(thing) || win;

      return /object|function/.test(typeof _window.Element) ? thing instanceof _window.Element // DOM2
      : thing.nodeType === 1 && typeof thing.nodeName === 'string';
    };

    const plainObject = thing => object(thing) && !!thing.constructor && /function Object\b/.test(thing.constructor.toString());

    const array = thing => object(thing) && typeof thing.length !== 'undefined' && func(thing.splice);
    /* harmony default export */


    var is = {
      window: is_window,
      docFrag,
      object,
      func,
      number,
      bool,
      string,
      element: is_element,
      plainObject,
      array
    }; // CONCATENATED MODULE: ./node_modules/@interactjs/utils/browser.js

    const browser = {
      init: browser_init,
      supportsTouch: null,
      supportsPointerEvent: null,
      isIOS7: null,
      isIOS: null,
      isIe9: null,
      isOperaMobile: null,
      prefixedMatchesSelector: null,
      pEventTypes: null,
      wheelEvent: null
    };

    function browser_init(window) {
      const Element = utils_domObjects.Element;
      const navigator = win.navigator; // Does the browser support touch input?

      browser.supportsTouch = 'ontouchstart' in window || is.func(window.DocumentTouch) && utils_domObjects.document instanceof window.DocumentTouch; // Does the browser support PointerEvents

      browser.supportsPointerEvent = navigator.pointerEnabled !== false && !!utils_domObjects.PointerEvent;
      browser.isIOS = /iP(hone|od|ad)/.test(navigator.platform); // scrolling doesn't change the result of getClientRects on iOS 7

      browser.isIOS7 = /iP(hone|od|ad)/.test(navigator.platform) && /OS 7[^\d]/.test(navigator.appVersion);
      browser.isIe9 = /MSIE 9/.test(navigator.userAgent); // Opera Mobile must be handled differently

      browser.isOperaMobile = navigator.appName === 'Opera' && browser.supportsTouch && /Presto/.test(navigator.userAgent); // prefix matchesSelector

      browser.prefixedMatchesSelector = 'matches' in Element.prototype ? 'matches' : 'webkitMatchesSelector' in Element.prototype ? 'webkitMatchesSelector' : 'mozMatchesSelector' in Element.prototype ? 'mozMatchesSelector' : 'oMatchesSelector' in Element.prototype ? 'oMatchesSelector' : 'msMatchesSelector';
      browser.pEventTypes = browser.supportsPointerEvent ? utils_domObjects.PointerEvent === window.MSPointerEvent ? {
        up: 'MSPointerUp',
        down: 'MSPointerDown',
        over: 'mouseover',
        out: 'mouseout',
        move: 'MSPointerMove',
        cancel: 'MSPointerCancel'
      } : {
        up: 'pointerup',
        down: 'pointerdown',
        over: 'pointerover',
        out: 'pointerout',
        move: 'pointermove',
        cancel: 'pointercancel'
      } : null; // because Webkit and Opera still use 'mousewheel' event type

      browser.wheelEvent = 'onmousewheel' in utils_domObjects.document ? 'mousewheel' : 'wheel';
    }
    /* harmony default export */


    var utils_browser = browser; // CONCATENATED MODULE: ./node_modules/@interactjs/utils/arr.js

    const contains = (array, target) => array.indexOf(target) !== -1;

    const arr_remove = (array, target) => array.splice(array.indexOf(target), 1);

    const merge = (target, source) => {
      for (const item of source) {
        target.push(item);
      }

      return target;
    };

    const from = source => merge([], source);

    const findIndex = (array, func) => {
      for (let i = 0; i < array.length; i++) {
        if (func(array[i], i, array)) {
          return i;
        }
      }

      return -1;
    };

    const find = (array, func) => array[findIndex(array, func)]; // CONCATENATED MODULE: ./node_modules/@interactjs/utils/clone.js
    // tslint:disable-next-line ban-types


    function clone(source) {
      const dest = {};

      for (const prop in source) {
        const value = source[prop];

        if (is.plainObject(value)) {
          dest[prop] = clone(value);
        } else if (is.array(value)) {
          dest[prop] = from(value);
        } else {
          dest[prop] = value;
        }
      }

      return dest;
    } // CONCATENATED MODULE: ./node_modules/@interactjs/utils/extend.js


    function extend(dest, source) {
      for (const prop in source) {
        dest[prop] = source[prop];
      }

      const ret = dest;
      return ret;
    } // CONCATENATED MODULE: ./node_modules/@interactjs/utils/raf.js


    let lastTime = 0;
    let request;
    let cancel;

    function raf_init(window) {
      request = window.requestAnimationFrame;
      cancel = window.cancelAnimationFrame;

      if (!request) {
        const vendors = ['ms', 'moz', 'webkit', 'o'];

        for (const vendor of vendors) {
          request = window[`${vendor}RequestAnimationFrame`];
          cancel = window[`${vendor}CancelAnimationFrame`] || window[`${vendor}CancelRequestAnimationFrame`];
        }
      }

      request = request && request.bind(window);
      cancel = cancel && cancel.bind(window);

      if (!request) {
        request = callback => {
          const currTime = Date.now();
          const timeToCall = Math.max(0, 16 - (currTime - lastTime)); // eslint-disable-next-line node/no-callback-literal

          const token = window.setTimeout(() => {
            callback(currTime + timeToCall);
          }, timeToCall);
          lastTime = currTime + timeToCall;
          return token;
        };

        cancel = token => clearTimeout(token);
      }
    }
    /* harmony default export */


    var raf = {
      request: callback => request(callback),
      cancel: token => cancel(token),
      init: raf_init
    }; // CONCATENATED MODULE: ./node_modules/@interactjs/utils/normalizeListeners.js

    function normalize(type, listeners, result) {
      result = result || {};

      if (is.string(type) && type.search(' ') !== -1) {
        type = split(type);
      }

      if (is.array(type)) {
        return type.reduce((acc, t) => extend(acc, normalize(t, listeners, result)), result);
      } // ({ type: fn }) -> ('', { type: fn })


      if (is.object(type)) {
        listeners = type;
        type = '';
      }

      if (is.func(listeners)) {
        result[type] = result[type] || [];
        result[type].push(listeners);
      } else if (is.array(listeners)) {
        for (const l of listeners) {
          normalize(type, l, result);
        }
      } else if (is.object(listeners)) {
        for (const prefix in listeners) {
          const combinedTypes = split(prefix).map(p => `${type}${p}`);
          normalize(combinedTypes, listeners[prefix], result);
        }
      }

      return result;
    }

    function split(type) {
      return type.trim().split(/ +/);
    } // CONCATENATED MODULE: ./node_modules/@interactjs/core/Eventable.js


    function fireUntilImmediateStopped(event, listeners) {
      for (const listener of listeners) {
        if (event.immediatePropagationStopped) {
          break;
        }

        listener(event);
      }
    }

    class Eventable_Eventable {
      constructor(options) {
        this.options = void 0;
        this.types = {};
        this.propagationStopped = false;
        this.immediatePropagationStopped = false;
        this.global = void 0;
        this.options = extend({}, options || {});
      }

      fire(event) {
        let listeners;
        const global = this.global; // Interactable#on() listeners
        // tslint:disable no-conditional-assignment

        if (listeners = this.types[event.type]) {
          fireUntilImmediateStopped(event, listeners);
        } // interact.on() listeners


        if (!event.propagationStopped && global && (listeners = global[event.type])) {
          fireUntilImmediateStopped(event, listeners);
        }
      }

      on(type, listener) {
        const listeners = normalize(type, listener);

        for (type in listeners) {
          this.types[type] = merge(this.types[type] || [], listeners[type]);
        }
      }

      off(type, listener) {
        const listeners = normalize(type, listener);

        for (type in listeners) {
          const eventList = this.types[type];

          if (!eventList || !eventList.length) {
            continue;
          }

          for (const subListener of listeners[type]) {
            const index = eventList.indexOf(subListener);

            if (index !== -1) {
              eventList.splice(index, 1);
            }
          }
        }
      }

      getRect(_element) {
        return null;
      }

    } // CONCATENATED MODULE: ./node_modules/@interactjs/utils/domUtils.js


    function nodeContains(parent, child) {
      if (parent.contains) {
        return parent.contains(child);
      }

      while (child) {
        if (child === parent) {
          return true;
        }

        child = child.parentNode;
      }

      return false;
    }

    function domUtils_closest(element, selector) {
      while (is.element(element)) {
        if (matchesSelector(element, selector)) {
          return element;
        }

        element = parentNode(element);
      }

      return null;
    }

    function parentNode(node) {
      let parent = node.parentNode;

      if (is.docFrag(parent)) {
        // skip past #shado-root fragments
        // tslint:disable-next-line
        while ((parent = parent.host) && is.docFrag(parent)) {
          continue;
        }

        return parent;
      }

      return parent;
    }

    function matchesSelector(element, selector) {
      // remove /deep/ from selectors if shadowDOM polyfill is used
      if (win !== realWindow) {
        selector = selector.replace(/\/deep\//g, ' ');
      }

      return element[utils_browser.prefixedMatchesSelector](selector);
    }

    const getParent = el => el.parentNode || el.host; // Test for the element that's "above" all other qualifiers


    function indexOfDeepestElement(elements) {
      let deepestNodeParents = [];
      let deepestNodeIndex;

      for (let i = 0; i < elements.length; i++) {
        const currentNode = elements[i];
        const deepestNode = elements[deepestNodeIndex]; // node may appear in elements array multiple times

        if (!currentNode || i === deepestNodeIndex) {
          continue;
        }

        if (!deepestNode) {
          deepestNodeIndex = i;
          continue;
        }

        const currentNodeParent = getParent(currentNode);
        const deepestNodeParent = getParent(deepestNode); // check if the deepest or current are document.documentElement/rootElement
        // - if the current node is, do nothing and continue

        if (currentNodeParent === currentNode.ownerDocument) {
          continue;
        } // - if deepest is, update with the current node and continue to next
        else if (deepestNodeParent === currentNode.ownerDocument) {
          deepestNodeIndex = i;
          continue;
        } // compare zIndex of siblings


        if (currentNodeParent === deepestNodeParent) {
          if (zIndexIsHigherThan(currentNode, deepestNode)) {
            deepestNodeIndex = i;
          }

          continue;
        } // populate the ancestry array for the latest deepest node


        deepestNodeParents = deepestNodeParents.length ? deepestNodeParents : getNodeParents(deepestNode);
        let ancestryStart; // if the deepest node is an HTMLElement and the current node is a non root svg element

        if (deepestNode instanceof utils_domObjects.HTMLElement && currentNode instanceof utils_domObjects.SVGElement && !(currentNode instanceof utils_domObjects.SVGSVGElement)) {
          // TODO: is this check necessary? Was this for HTML elements embedded in SVG?
          if (currentNode === deepestNodeParent) {
            continue;
          }

          ancestryStart = currentNode.ownerSVGElement;
        } else {
          ancestryStart = currentNode;
        }

        const currentNodeParents = getNodeParents(ancestryStart, deepestNode.ownerDocument);
        let commonIndex = 0; // get (position of closest common ancestor) + 1

        while (currentNodeParents[commonIndex] && currentNodeParents[commonIndex] === deepestNodeParents[commonIndex]) {
          commonIndex++;
        }

        const parents = [currentNodeParents[commonIndex - 1], currentNodeParents[commonIndex], deepestNodeParents[commonIndex]];
        let child = parents[0].lastChild;

        while (child) {
          if (child === parents[1]) {
            deepestNodeIndex = i;
            deepestNodeParents = currentNodeParents;
            break;
          } else if (child === parents[2]) {
            break;
          }

          child = child.previousSibling;
        }
      }

      return deepestNodeIndex;
    }

    function getNodeParents(node, limit) {
      const parents = [];
      let parent = node;
      let parentParent;

      while ((parentParent = getParent(parent)) && parent !== limit && parentParent !== parent.ownerDocument) {
        parents.unshift(parent);
        parent = parentParent;
      }

      return parents;
    }

    function zIndexIsHigherThan(higherNode, lowerNode) {
      const higherIndex = parseInt(getWindow(higherNode).getComputedStyle(higherNode).zIndex, 10) || 0;
      const lowerIndex = parseInt(getWindow(lowerNode).getComputedStyle(lowerNode).zIndex, 10) || 0;
      return higherIndex >= lowerIndex;
    }

    function matchesUpTo(element, selector, limit) {
      while (is.element(element)) {
        if (matchesSelector(element, selector)) {
          return true;
        }

        element = parentNode(element);

        if (element === limit) {
          return matchesSelector(element, selector);
        }
      }

      return false;
    }

    function getActualElement(element) {
      return element.correspondingUseElement || element;
    }

    function getScrollXY(relevantWindow) {
      relevantWindow = relevantWindow || win;
      return {
        x: relevantWindow.scrollX || relevantWindow.document.documentElement.scrollLeft,
        y: relevantWindow.scrollY || relevantWindow.document.documentElement.scrollTop
      };
    }

    function getElementClientRect(element) {
      const clientRect = element instanceof utils_domObjects.SVGElement ? element.getBoundingClientRect() : element.getClientRects()[0];
      return clientRect && {
        left: clientRect.left,
        right: clientRect.right,
        top: clientRect.top,
        bottom: clientRect.bottom,
        width: clientRect.width || clientRect.right - clientRect.left,
        height: clientRect.height || clientRect.bottom - clientRect.top
      };
    }

    function getElementRect(element) {
      const clientRect = getElementClientRect(element);

      if (!utils_browser.isIOS7 && clientRect) {
        const scroll = getScrollXY(getWindow(element));
        clientRect.left += scroll.x;
        clientRect.right += scroll.x;
        clientRect.top += scroll.y;
        clientRect.bottom += scroll.y;
      }

      return clientRect;
    }

    function getPath(node) {
      const path = [];

      while (node) {
        path.push(node);
        node = parentNode(node);
      }

      return path;
    }

    function trySelector(value) {
      if (!is.string(value)) {
        return false;
      } // an exception will be raised if it is invalid


      utils_domObjects.document.querySelector(value);
      return true;
    } // CONCATENATED MODULE: ./node_modules/@interactjs/utils/rect.js


    function getStringOptionResult(value, target, element) {
      if (value === 'parent') {
        return parentNode(element);
      }

      if (value === 'self') {
        return target.getRect(element);
      }

      return domUtils_closest(element, value);
    }

    function resolveRectLike(value, target, element, functionArgs) {
      let returnValue = value;

      if (is.string(returnValue)) {
        returnValue = getStringOptionResult(returnValue, target, element);
      } else if (is.func(returnValue)) {
        returnValue = returnValue(...functionArgs);
      }

      if (is.element(returnValue)) {
        returnValue = getElementRect(returnValue);
      }

      return returnValue;
    }

    function rectToXY(rect) {
      return rect && {
        x: 'x' in rect ? rect.x : rect.left,
        y: 'y' in rect ? rect.y : rect.top
      };
    }

    function xywhToTlbr(rect) {
      if (rect && !('left' in rect && 'top' in rect)) {
        rect = extend({}, rect);
        rect.left = rect.x || 0;
        rect.top = rect.y || 0;
        rect.right = rect.right || rect.left + rect.width;
        rect.bottom = rect.bottom || rect.top + rect.height;
      }

      return rect;
    }

    function tlbrToXywh(rect) {
      if (rect && !('x' in rect && 'y' in rect)) {
        rect = extend({}, rect);
        rect.x = rect.left || 0;
        rect.y = rect.top || 0;
        rect.width = rect.width || (rect.right || 0) - rect.x;
        rect.height = rect.height || (rect.bottom || 0) - rect.y;
      }

      return rect;
    }

    function addEdges(edges, rect, delta) {
      if (edges.left) {
        rect.left += delta.x;
      }

      if (edges.right) {
        rect.right += delta.x;
      }

      if (edges.top) {
        rect.top += delta.y;
      }

      if (edges.bottom) {
        rect.bottom += delta.y;
      }

      rect.width = rect.right - rect.left;
      rect.height = rect.bottom - rect.top;
    } // CONCATENATED MODULE: ./node_modules/@interactjs/utils/getOriginXY.js

    /* harmony default export */


    var getOriginXY = function (target, element, actionName) {
      const actionOptions = target.options[actionName];
      const actionOrigin = actionOptions && actionOptions.origin;
      const origin = actionOrigin || target.options.origin;
      const originRect = resolveRectLike(origin, target, element, [target && element]);
      return rectToXY(originRect) || {
        x: 0,
        y: 0
      };
    }; // CONCATENATED MODULE: ./node_modules/@interactjs/utils/hypot.js

    /* harmony default export */


    var hypot = (x, y) => Math.sqrt(x * x + y * y); // CONCATENATED MODULE: ./node_modules/@interactjs/core/BaseEvent.js


    class BaseEvent {
      constructor(interaction) {
        this.type = void 0;
        this.target = void 0;
        this.currentTarget = void 0;
        this.interactable = void 0;
        this._interaction = void 0;
        this.timeStamp = void 0;
        this.immediatePropagationStopped = false;
        this.propagationStopped = false;
        this._interaction = interaction;
      }

      preventDefault() {}
      /**
       * Don't call any other listeners (even on the current target)
       */


      stopPropagation() {
        this.propagationStopped = true;
      }
      /**
       * Don't call listeners on the remaining targets
       */


      stopImmediatePropagation() {
        this.immediatePropagationStopped = this.propagationStopped = true;
      }

    } // defined outside of class definition to avoid assignment of undefined during
    // construction
    // getters and setters defined here to support typescript 3.6 and below which
    // don't support getter and setters in .d.ts files


    Object.defineProperty(BaseEvent.prototype, 'interaction', {
      get() {
        return this._interaction._proxy;
      },

      set() {}

    }); // CONCATENATED MODULE: ./node_modules/@interactjs/core/defaultOptions.js
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    // export interface Options extends BaseDefaults, PerActionDefaults {}

    const defaultOptions_defaults = {
      base: {
        preventDefault: 'auto',
        deltaSource: 'page'
      },
      perAction: {
        enabled: false,
        origin: {
          x: 0,
          y: 0
        }
      },
      actions: {}
    }; // CONCATENATED MODULE: ./node_modules/@interactjs/core/InteractEvent.js

    class InteractEvent_InteractEvent extends BaseEvent {
      // resize

      /** */
      constructor(interaction, event, actionName, phase, element, preEnd, type) {
        super(interaction);
        this.target = void 0;
        this.currentTarget = void 0;
        this.relatedTarget = null;
        this.screenX = void 0;
        this.screenY = void 0;
        this.button = void 0;
        this.buttons = void 0;
        this.ctrlKey = void 0;
        this.shiftKey = void 0;
        this.altKey = void 0;
        this.metaKey = void 0;
        this.page = void 0;
        this.client = void 0;
        this.delta = void 0;
        this.rect = void 0;
        this.x0 = void 0;
        this.y0 = void 0;
        this.t0 = void 0;
        this.dt = void 0;
        this.duration = void 0;
        this.clientX0 = void 0;
        this.clientY0 = void 0;
        this.velocity = void 0;
        this.speed = void 0;
        this.swipe = void 0;
        this.timeStamp = void 0;
        this.axes = void 0;
        this.preEnd = void 0;
        element = element || interaction.element;
        const target = interaction.interactable;
        const deltaSource = (target && target.options || defaultOptions_defaults).deltaSource;
        const origin = getOriginXY(target, element, actionName);
        const starting = phase === 'start';
        const ending = phase === 'end';
        const prevEvent = starting ? this : interaction.prevEvent;
        const coords = starting ? interaction.coords.start : ending ? {
          page: prevEvent.page,
          client: prevEvent.client,
          timeStamp: interaction.coords.cur.timeStamp
        } : interaction.coords.cur;
        this.page = extend({}, coords.page);
        this.client = extend({}, coords.client);
        this.rect = extend({}, interaction.rect);
        this.timeStamp = coords.timeStamp;

        if (!ending) {
          this.page.x -= origin.x;
          this.page.y -= origin.y;
          this.client.x -= origin.x;
          this.client.y -= origin.y;
        }

        this.ctrlKey = event.ctrlKey;
        this.altKey = event.altKey;
        this.shiftKey = event.shiftKey;
        this.metaKey = event.metaKey;
        this.button = event.button;
        this.buttons = event.buttons;
        this.target = element;
        this.currentTarget = element;
        this.preEnd = preEnd;
        this.type = type || actionName + (phase || '');
        this.interactable = target;
        this.t0 = starting ? interaction.pointers[interaction.pointers.length - 1].downTime : prevEvent.t0;
        this.x0 = interaction.coords.start.page.x - origin.x;
        this.y0 = interaction.coords.start.page.y - origin.y;
        this.clientX0 = interaction.coords.start.client.x - origin.x;
        this.clientY0 = interaction.coords.start.client.y - origin.y;

        if (starting || ending) {
          this.delta = {
            x: 0,
            y: 0
          };
        } else {
          this.delta = {
            x: this[deltaSource].x - prevEvent[deltaSource].x,
            y: this[deltaSource].y - prevEvent[deltaSource].y
          };
        }

        this.dt = interaction.coords.delta.timeStamp;
        this.duration = this.timeStamp - this.t0; // velocity and speed in pixels per second

        this.velocity = extend({}, interaction.coords.velocity[deltaSource]);
        this.speed = hypot(this.velocity.x, this.velocity.y);
        this.swipe = ending || phase === 'inertiastart' ? this.getSwipe() : null;
      }

      getSwipe() {
        const interaction = this._interaction;

        if (interaction.prevEvent.speed < 600 || this.timeStamp - interaction.prevEvent.timeStamp > 150) {
          return null;
        }

        let angle = 180 * Math.atan2(interaction.prevEvent.velocityY, interaction.prevEvent.velocityX) / Math.PI;
        const overlap = 22.5;

        if (angle < 0) {
          angle += 360;
        }

        const left = 135 - overlap <= angle && angle < 225 + overlap;
        const up = 225 - overlap <= angle && angle < 315 + overlap;
        const right = !left && (315 - overlap <= angle || angle < 45 + overlap);
        const down = !up && 45 - overlap <= angle && angle < 135 + overlap;
        return {
          up,
          down,
          left,
          right,
          angle,
          speed: interaction.prevEvent.speed,
          velocity: {
            x: interaction.prevEvent.velocityX,
            y: interaction.prevEvent.velocityY
          }
        };
      }

      preventDefault() {}
      /**
       * Don't call listeners on the remaining targets
       */


      stopImmediatePropagation() {
        this.immediatePropagationStopped = this.propagationStopped = true;
      }
      /**
       * Don't call any other listeners (even on the current target)
       */


      stopPropagation() {
        this.propagationStopped = true;
      }

    } // getters and setters defined here to support typescript 3.6 and below which
    // don't support getter and setters in .d.ts files


    Object.defineProperties(InteractEvent_InteractEvent.prototype, {
      pageX: {
        get() {
          return this.page.x;
        },

        set(value) {
          this.page.x = value;
        }

      },
      pageY: {
        get() {
          return this.page.y;
        },

        set(value) {
          this.page.y = value;
        }

      },
      clientX: {
        get() {
          return this.client.x;
        },

        set(value) {
          this.client.x = value;
        }

      },
      clientY: {
        get() {
          return this.client.y;
        },

        set(value) {
          this.client.y = value;
        }

      },
      dx: {
        get() {
          return this.delta.x;
        },

        set(value) {
          this.delta.x = value;
        }

      },
      dy: {
        get() {
          return this.delta.y;
        },

        set(value) {
          this.delta.y = value;
        }

      },
      velocityX: {
        get() {
          return this.velocity.x;
        },

        set(value) {
          this.velocity.x = value;
        }

      },
      velocityY: {
        get() {
          return this.velocity.y;
        },

        set(value) {
          this.velocity.y = value;
        }

      }
    }); // CONCATENATED MODULE: ./node_modules/@interactjs/core/isNonNativeEvent.js

    function isNonNativeEvent(type, actions) {
      if (actions.phaselessTypes[type]) {
        return true;
      }

      for (const name in actions.map) {
        if (type.indexOf(name) === 0 && type.substr(name.length) in actions.phases) {
          return true;
        }
      }

      return false;
    } // CONCATENATED MODULE: ./node_modules/@interactjs/core/Interactable.js

    /* eslint-disable no-dupe-class-members */

    /** */


    class Interactable_Interactable {
      /** @internal */
      get _defaults() {
        return {
          base: {},
          perAction: {},
          actions: {}
        };
      }
      /** */


      constructor(target, options, defaultContext, scopeEvents) {
        this.options = void 0;
        this._actions = void 0;
        this.target = void 0;
        this.events = new Eventable_Eventable();
        this._context = void 0;
        this._win = void 0;
        this._doc = void 0;
        this._scopeEvents = void 0;
        this._rectChecker = void 0;
        this._actions = options.actions;
        this.target = target;
        this._context = options.context || defaultContext;
        this._win = getWindow(trySelector(target) ? this._context : target);
        this._doc = this._win.document;
        this._scopeEvents = scopeEvents;
        this.set(options);
      }

      setOnEvents(actionName, phases) {
        if (is.func(phases.onstart)) {
          this.on(`${actionName}start`, phases.onstart);
        }

        if (is.func(phases.onmove)) {
          this.on(`${actionName}move`, phases.onmove);
        }

        if (is.func(phases.onend)) {
          this.on(`${actionName}end`, phases.onend);
        }

        if (is.func(phases.oninertiastart)) {
          this.on(`${actionName}inertiastart`, phases.oninertiastart);
        }

        return this;
      }

      updatePerActionListeners(actionName, prev, cur) {
        if (is.array(prev) || is.object(prev)) {
          this.off(actionName, prev);
        }

        if (is.array(cur) || is.object(cur)) {
          this.on(actionName, cur);
        }
      }

      setPerAction(actionName, options) {
        const defaults = this._defaults; // for all the default per-action options

        for (const optionName_ in options) {
          const optionName = optionName_;
          const actionOptions = this.options[actionName];
          const optionValue = options[optionName]; // remove old event listeners and add new ones

          if (optionName === 'listeners') {
            this.updatePerActionListeners(actionName, actionOptions.listeners, optionValue);
          } // if the option value is an array


          if (is.array(optionValue)) {
            actionOptions[optionName] = from(optionValue);
          } // if the option value is an object
          else if (is.plainObject(optionValue)) {
            // copy the object
            actionOptions[optionName] = extend(actionOptions[optionName] || {}, clone(optionValue)); // set anabled field to true if it exists in the defaults

            if (is.object(defaults.perAction[optionName]) && 'enabled' in defaults.perAction[optionName]) {
              actionOptions[optionName].enabled = optionValue.enabled !== false;
            }
          } // if the option value is a boolean and the default is an object
          else if (is.bool(optionValue) && is.object(defaults.perAction[optionName])) {
            actionOptions[optionName].enabled = optionValue;
          } // if it's anything else, do a plain assignment
          else {
            actionOptions[optionName] = optionValue;
          }
        }
      }
      /**
       * The default function to get an Interactables bounding rect. Can be
       * overridden using {@link Interactable.rectChecker}.
       *
       * @param {Element} [element] The element to measure.
       * @return {Rect} The object's bounding rectangle.
       */


      getRect(element) {
        element = element || (is.element(this.target) ? this.target : null);

        if (is.string(this.target)) {
          element = element || this._context.querySelector(this.target);
        }

        return getElementRect(element);
      }
      /**
       * Returns or sets the function used to calculate the interactable's
       * element's rectangle
       *
       * @param {function} [checker] A function which returns this Interactable's
       * bounding rectangle. See {@link Interactable.getRect}
       * @return {function | object} The checker function or this Interactable
       */


      rectChecker(checker) {
        if (is.func(checker)) {
          this._rectChecker = checker;

          this.getRect = element => {
            const rect = extend({}, this._rectChecker(element));

            if (!('width' in rect)) {
              rect.width = rect.right - rect.left;
              rect.height = rect.bottom - rect.top;
            }

            return rect;
          };

          return this;
        }

        if (checker === null) {
          delete this.getRect;
          delete this._rectChecker;
          return this;
        }

        return this.getRect;
      }

      _backCompatOption(optionName, newValue) {
        if (trySelector(newValue) || is.object(newValue)) {
          this.options[optionName] = newValue;

          for (const action in this._actions.map) {
            this.options[action][optionName] = newValue;
          }

          return this;
        }

        return this.options[optionName];
      }
      /**
       * Gets or sets the origin of the Interactable's element.  The x and y
       * of the origin will be subtracted from action event coordinates.
       *
       * @param {Element | object | string} [origin] An HTML or SVG Element whose
       * rect will be used, an object eg. { x: 0, y: 0 } or string 'parent', 'self'
       * or any CSS selector
       *
       * @return {object} The current origin or this Interactable
       */


      origin(newValue) {
        return this._backCompatOption('origin', newValue);
      }
      /**
       * Returns or sets the mouse coordinate types used to calculate the
       * movement of the pointer.
       *
       * @param {string} [newValue] Use 'client' if you will be scrolling while
       * interacting; Use 'page' if you want autoScroll to work
       * @return {string | object} The current deltaSource or this Interactable
       */


      deltaSource(newValue) {
        if (newValue === 'page' || newValue === 'client') {
          this.options.deltaSource = newValue;
          return this;
        }

        return this.options.deltaSource;
      }
      /**
       * Gets the selector context Node of the Interactable. The default is
       * `window.document`.
       *
       * @return {Node} The context Node of this Interactable
       */


      context() {
        return this._context;
      }

      inContext(element) {
        return this._context === element.ownerDocument || nodeContains(this._context, element);
      }

      testIgnoreAllow(options, targetNode, eventTarget) {
        return !this.testIgnore(options.ignoreFrom, targetNode, eventTarget) && this.testAllow(options.allowFrom, targetNode, eventTarget);
      }

      testAllow(allowFrom, targetNode, element) {
        if (!allowFrom) {
          return true;
        }

        if (!is.element(element)) {
          return false;
        }

        if (is.string(allowFrom)) {
          return matchesUpTo(element, allowFrom, targetNode);
        } else if (is.element(allowFrom)) {
          return nodeContains(allowFrom, element);
        }

        return false;
      }

      testIgnore(ignoreFrom, targetNode, element) {
        if (!ignoreFrom || !is.element(element)) {
          return false;
        }

        if (is.string(ignoreFrom)) {
          return matchesUpTo(element, ignoreFrom, targetNode);
        } else if (is.element(ignoreFrom)) {
          return nodeContains(ignoreFrom, element);
        }

        return false;
      }
      /**
       * Calls listeners for the given InteractEvent type bound globally
       * and directly to this Interactable
       *
       * @param {InteractEvent} iEvent The InteractEvent object to be fired on this
       * Interactable
       * @return {Interactable} this Interactable
       */


      fire(iEvent) {
        this.events.fire(iEvent);
        return this;
      }

      _onOff(method, typeArg, listenerArg, options) {
        if (is.object(typeArg) && !is.array(typeArg)) {
          options = listenerArg;
          listenerArg = null;
        }

        const addRemove = method === 'on' ? 'add' : 'remove';
        const listeners = normalize(typeArg, listenerArg);

        for (let type in listeners) {
          if (type === 'wheel') {
            type = utils_browser.wheelEvent;
          }

          for (const listener of listeners[type]) {
            // if it is an action event type
            if (isNonNativeEvent(type, this._actions)) {
              this.events[method](type, listener);
            } // delegated event
            else if (is.string(this.target)) {
              this._scopeEvents[`${addRemove}Delegate`](this.target, this._context, type, listener, options);
            } // remove listener from this Interactable's element
            else {
              this._scopeEvents[addRemove](this.target, type, listener, options);
            }
          }
        }

        return this;
      }
      /**
       * Binds a listener for an InteractEvent, pointerEvent or DOM event.
       *
       * @param {string | array | object} types The types of events to listen
       * for
       * @param {function | array | object} [listener] The event listener function(s)
       * @param {object | boolean} [options] options object or useCapture flag for
       * addEventListener
       * @return {Interactable} This Interactable
       */


      on(types, listener, options) {
        return this._onOff('on', types, listener, options);
      }
      /**
       * Removes an InteractEvent, pointerEvent or DOM event listener.
       *
       * @param {string | array | object} types The types of events that were
       * listened for
       * @param {function | array | object} [listener] The event listener function(s)
       * @param {object | boolean} [options] options object or useCapture flag for
       * removeEventListener
       * @return {Interactable} This Interactable
       */


      off(types, listener, options) {
        return this._onOff('off', types, listener, options);
      }
      /**
       * Reset the options of this Interactable
       *
       * @param {object} options The new settings to apply
       * @return {object} This Interactable
       */


      set(options) {
        const defaults = this._defaults;

        if (!is.object(options)) {
          options = {};
        }

        this.options = clone(defaults.base);

        for (const actionName_ in this._actions.methodDict) {
          const actionName = actionName_;
          const methodName = this._actions.methodDict[actionName];
          this.options[actionName] = {};
          this.setPerAction(actionName, extend(extend({}, defaults.perAction), defaults.actions[actionName]));
          this[methodName](options[actionName]);
        }

        for (const setting in options) {
          if (is.func(this[setting])) {
            this[setting](options[setting]);
          }
        }

        return this;
      }
      /**
       * Remove this interactable from the list of interactables and remove it's
       * action capabilities and event listeners
       */


      unset() {
        if (is.string(this.target)) {
          // remove delegated events
          for (const type in this._scopeEvents.delegatedEvents) {
            const delegated = this._scopeEvents.delegatedEvents[type];

            for (let i = delegated.length - 1; i >= 0; i--) {
              const {
                selector,
                context,
                listeners
              } = delegated[i];

              if (selector === this.target && context === this._context) {
                delegated.splice(i, 1);
              }

              for (let l = listeners.length - 1; l >= 0; l--) {
                this._scopeEvents.removeDelegate(this.target, this._context, type, listeners[l][0], listeners[l][1]);
              }
            }
          }
        } else {
          this._scopeEvents.remove(this.target, 'all');
        }
      }

    } // CONCATENATED MODULE: ./node_modules/@interactjs/core/InteractableSet.js


    class InteractableSet_InteractableSet {
      // all set interactables
      constructor(scope) {
        this.list = [];
        this.selectorMap = {};
        this.scope = void 0;
        this.scope = scope;
        scope.addListeners({
          'interactable:unset': ({
            interactable
          }) => {
            const {
              target,
              _context: context
            } = interactable;
            const targetMappings = is.string(target) ? this.selectorMap[target] : target[this.scope.id];
            const targetIndex = findIndex(targetMappings, m => m.context === context);

            if (targetMappings[targetIndex]) {
              // Destroying mappingInfo's context and interactable
              targetMappings[targetIndex].context = null;
              targetMappings[targetIndex].interactable = null;
            }

            targetMappings.splice(targetIndex, 1);
          }
        });
      }

      new(target, options) {
        options = extend(options || {}, {
          actions: this.scope.actions
        });
        const interactable = new this.scope.Interactable(target, options, this.scope.document, this.scope.events);
        const mappingInfo = {
          context: interactable._context,
          interactable
        };
        this.scope.addDocument(interactable._doc);
        this.list.push(interactable);

        if (is.string(target)) {
          if (!this.selectorMap[target]) {
            this.selectorMap[target] = [];
          }

          this.selectorMap[target].push(mappingInfo);
        } else {
          if (!interactable.target[this.scope.id]) {
            Object.defineProperty(target, this.scope.id, {
              value: [],
              configurable: true
            });
          }

          target[this.scope.id].push(mappingInfo);
        }

        this.scope.fire('interactable:new', {
          target,
          options,
          interactable,
          win: this.scope._win
        });
        return interactable;
      }

      get(target, options) {
        const context = options && options.context || this.scope.document;
        const isSelector = is.string(target);
        const targetMappings = isSelector ? this.selectorMap[target] : target[this.scope.id];

        if (!targetMappings) {
          return null;
        }

        const found = find(targetMappings, m => m.context === context && (isSelector || m.interactable.inContext(target)));
        return found && found.interactable;
      }

      forEachMatch(node, callback) {
        for (const interactable of this.list) {
          let ret;

          if ((is.string(interactable.target) // target is a selector and the element matches
          ? is.element(node) && matchesSelector(node, interactable.target) : // target is the element
          node === interactable.target) && // the element is in context
          interactable.inContext(node)) {
            ret = callback(interactable);
          }

          if (ret !== undefined) {
            return ret;
          }
        }
      }

    } // CONCATENATED MODULE: ./node_modules/@interactjs/utils/pointerExtend.js


    function pointerExtend(dest, source) {
      for (const prop in source) {
        const prefixedPropREs = pointerExtend.prefixedPropREs;
        let deprecated = false; // skip deprecated prefixed properties

        for (const vendor in prefixedPropREs) {
          if (prop.indexOf(vendor) === 0 && prefixedPropREs[vendor].test(prop)) {
            deprecated = true;
            break;
          }
        }

        if (!deprecated && typeof source[prop] !== 'function') {
          dest[prop] = source[prop];
        }
      }

      return dest;
    }

    pointerExtend.prefixedPropREs = {
      webkit: /(Movement[XY]|Radius[XY]|RotationAngle|Force)$/,
      moz: /(Pressure)$/
    };
    /* harmony default export */

    var utils_pointerExtend = pointerExtend; // CONCATENATED MODULE: ./node_modules/@interactjs/utils/pointerUtils.js

    function copyCoords(dest, src) {
      dest.page = dest.page || {};
      dest.page.x = src.page.x;
      dest.page.y = src.page.y;
      dest.client = dest.client || {};
      dest.client.x = src.client.x;
      dest.client.y = src.client.y;
      dest.timeStamp = src.timeStamp;
    }

    function setCoordDeltas(targetObj, prev, cur) {
      targetObj.page.x = cur.page.x - prev.page.x;
      targetObj.page.y = cur.page.y - prev.page.y;
      targetObj.client.x = cur.client.x - prev.client.x;
      targetObj.client.y = cur.client.y - prev.client.y;
      targetObj.timeStamp = cur.timeStamp - prev.timeStamp;
    }

    function setCoordVelocity(targetObj, delta) {
      const dt = Math.max(delta.timeStamp / 1000, 0.001);
      targetObj.page.x = delta.page.x / dt;
      targetObj.page.y = delta.page.y / dt;
      targetObj.client.x = delta.client.x / dt;
      targetObj.client.y = delta.client.y / dt;
      targetObj.timeStamp = dt;
    }

    function setZeroCoords(targetObj) {
      targetObj.page.x = 0;
      targetObj.page.y = 0;
      targetObj.client.x = 0;
      targetObj.client.y = 0;
    }

    function isNativePointer(pointer) {
      return pointer instanceof utils_domObjects.Event || pointer instanceof utils_domObjects.Touch;
    } // Get specified X/Y coords for mouse or event.touches[0]


    function getXY(type, pointer, xy) {
      xy = xy || {};
      type = type || 'page';
      xy.x = pointer[type + 'X'];
      xy.y = pointer[type + 'Y'];
      return xy;
    }

    function getPageXY(pointer, page) {
      page = page || {
        x: 0,
        y: 0
      }; // Opera Mobile handles the viewport and scrolling oddly

      if (utils_browser.isOperaMobile && isNativePointer(pointer)) {
        getXY('screen', pointer, page);
        page.x += window.scrollX;
        page.y += window.scrollY;
      } else {
        getXY('page', pointer, page);
      }

      return page;
    }

    function getClientXY(pointer, client) {
      client = client || {};

      if (utils_browser.isOperaMobile && isNativePointer(pointer)) {
        // Opera Mobile handles the viewport and scrolling oddly
        getXY('screen', pointer, client);
      } else {
        getXY('client', pointer, client);
      }

      return client;
    }

    function getPointerId(pointer) {
      return is.number(pointer.pointerId) ? pointer.pointerId : pointer.identifier;
    }

    function setCoords(dest, pointers, timeStamp) {
      const pointer = pointers.length > 1 ? pointerAverage(pointers) : pointers[0];
      getPageXY(pointer, dest.page);
      getClientXY(pointer, dest.client);
      dest.timeStamp = timeStamp;
    }

    function getTouchPair(event) {
      const touches = []; // array of touches is supplied

      if (is.array(event)) {
        touches[0] = event[0];
        touches[1] = event[1];
      } // an event
      else {
        if (event.type === 'touchend') {
          if (event.touches.length === 1) {
            touches[0] = event.touches[0];
            touches[1] = event.changedTouches[0];
          } else if (event.touches.length === 0) {
            touches[0] = event.changedTouches[0];
            touches[1] = event.changedTouches[1];
          }
        } else {
          touches[0] = event.touches[0];
          touches[1] = event.touches[1];
        }
      }

      return touches;
    }

    function pointerAverage(pointers) {
      const average = {
        pageX: 0,
        pageY: 0,
        clientX: 0,
        clientY: 0,
        screenX: 0,
        screenY: 0
      };

      for (const pointer of pointers) {
        for (const prop in average) {
          average[prop] += pointer[prop];
        }
      }

      for (const prop in average) {
        average[prop] /= pointers.length;
      }

      return average;
    }

    function touchBBox(event) {
      if (!event.length) {
        return null;
      }

      const touches = getTouchPair(event);
      const minX = Math.min(touches[0].pageX, touches[1].pageX);
      const minY = Math.min(touches[0].pageY, touches[1].pageY);
      const maxX = Math.max(touches[0].pageX, touches[1].pageX);
      const maxY = Math.max(touches[0].pageY, touches[1].pageY);
      return {
        x: minX,
        y: minY,
        left: minX,
        top: minY,
        right: maxX,
        bottom: maxY,
        width: maxX - minX,
        height: maxY - minY
      };
    }

    function touchDistance(event, deltaSource) {
      const sourceX = deltaSource + 'X';
      const sourceY = deltaSource + 'Y';
      const touches = getTouchPair(event);
      const dx = touches[0][sourceX] - touches[1][sourceX];
      const dy = touches[0][sourceY] - touches[1][sourceY];
      return hypot(dx, dy);
    }

    function touchAngle(event, deltaSource) {
      const sourceX = deltaSource + 'X';
      const sourceY = deltaSource + 'Y';
      const touches = getTouchPair(event);
      const dx = touches[1][sourceX] - touches[0][sourceX];
      const dy = touches[1][sourceY] - touches[0][sourceY];
      const angle = 180 * Math.atan2(dy, dx) / Math.PI;
      return angle;
    }

    function getPointerType(pointer) {
      return is.string(pointer.pointerType) ? pointer.pointerType : is.number(pointer.pointerType) ? [undefined, undefined, 'touch', 'pen', 'mouse'][pointer.pointerType] // if the PointerEvent API isn't available, then the "pointer" must
      // be either a MouseEvent, TouchEvent, or Touch object
      : /touch/.test(pointer.type) || pointer instanceof utils_domObjects.Touch ? 'touch' : 'mouse';
    } // [ event.target, event.currentTarget ]


    function getEventTargets(event) {
      const path = is.func(event.composedPath) ? event.composedPath() : event.path;
      return [getActualElement(path ? path[0] : event.target), getActualElement(event.currentTarget)];
    }

    function newCoords() {
      return {
        page: {
          x: 0,
          y: 0
        },
        client: {
          x: 0,
          y: 0
        },
        timeStamp: 0
      };
    }

    function coordsToEvent(coords) {
      const event = {
        coords,

        get page() {
          return this.coords.page;
        },

        get client() {
          return this.coords.client;
        },

        get timeStamp() {
          return this.coords.timeStamp;
        },

        get pageX() {
          return this.coords.page.x;
        },

        get pageY() {
          return this.coords.page.y;
        },

        get clientX() {
          return this.coords.client.x;
        },

        get clientY() {
          return this.coords.client.y;
        },

        get pointerId() {
          return this.coords.pointerId;
        },

        get target() {
          return this.coords.target;
        },

        get type() {
          return this.coords.type;
        },

        get pointerType() {
          return this.coords.pointerType;
        },

        get buttons() {
          return this.coords.buttons;
        },

        preventDefault() {}

      };
      return event;
    } // CONCATENATED MODULE: ./node_modules/@interactjs/core/events.js


    function install(scope) {
      const targets = [];
      const delegatedEvents = {};
      const documents = [];
      const eventsMethods = {
        add,
        remove,
        addDelegate,
        removeDelegate,
        delegateListener,
        delegateUseCapture,
        delegatedEvents,
        documents,
        targets,
        supportsOptions: false,
        supportsPassive: false
      }; // check if browser supports passive events and options arg

      scope.document.createElement('div').addEventListener('test', null, {
        get capture() {
          return eventsMethods.supportsOptions = true;
        },

        get passive() {
          return eventsMethods.supportsPassive = true;
        }

      });
      scope.events = eventsMethods;

      function add(eventTarget, type, listener, optionalArg) {
        const options = getOptions(optionalArg);
        let target = find(targets, t => t.eventTarget === eventTarget);

        if (!target) {
          target = {
            eventTarget,
            events: {}
          };
          targets.push(target);
        }

        if (!target.events[type]) {
          target.events[type] = [];
        }

        if (eventTarget.addEventListener && !contains(target.events[type], listener)) {
          eventTarget.addEventListener(type, listener, eventsMethods.supportsOptions ? options : options.capture);
          target.events[type].push(listener);
        }
      }

      function remove(eventTarget, type, listener, optionalArg) {
        const options = getOptions(optionalArg);
        const targetIndex = findIndex(targets, t => t.eventTarget === eventTarget);
        const target = targets[targetIndex];

        if (!target || !target.events) {
          return;
        }

        if (type === 'all') {
          for (type in target.events) {
            if (target.events.hasOwnProperty(type)) {
              remove(eventTarget, type, 'all');
            }
          }

          return;
        }

        let typeIsEmpty = false;
        const typeListeners = target.events[type];

        if (typeListeners) {
          if (listener === 'all') {
            for (let i = typeListeners.length - 1; i >= 0; i--) {
              remove(eventTarget, type, typeListeners[i], options);
            }

            return;
          } else {
            for (let i = 0; i < typeListeners.length; i++) {
              if (typeListeners[i] === listener) {
                eventTarget.removeEventListener(type, listener, eventsMethods.supportsOptions ? options : options.capture);
                typeListeners.splice(i, 1);

                if (typeListeners.length === 0) {
                  delete target.events[type];
                  typeIsEmpty = true;
                }

                break;
              }
            }
          }
        }

        if (typeIsEmpty && !Object.keys(target.events).length) {
          targets.splice(targetIndex, 1);
        }
      }

      function addDelegate(selector, context, type, listener, optionalArg) {
        const options = getOptions(optionalArg);

        if (!delegatedEvents[type]) {
          delegatedEvents[type] = []; // add delegate listener functions

          for (const doc of documents) {
            add(doc, type, delegateListener);
            add(doc, type, delegateUseCapture, true);
          }
        }

        const delegates = delegatedEvents[type];
        let delegate = find(delegates, d => d.selector === selector && d.context === context);

        if (!delegate) {
          delegate = {
            selector,
            context,
            listeners: []
          };
          delegates.push(delegate);
        }

        delegate.listeners.push([listener, options]);
      }

      function removeDelegate(selector, context, type, listener, optionalArg) {
        const options = getOptions(optionalArg);
        const delegates = delegatedEvents[type];
        let matchFound = false;
        let index;

        if (!delegates) {
          return;
        } // count from last index of delegated to 0


        for (index = delegates.length - 1; index >= 0; index--) {
          const cur = delegates[index]; // look for matching selector and context Node

          if (cur.selector === selector && cur.context === context) {
            const {
              listeners
            } = cur; // each item of the listeners array is an array: [function, capture, passive]

            for (let i = listeners.length - 1; i >= 0; i--) {
              const [fn, {
                capture,
                passive
              }] = listeners[i]; // check if the listener functions and capture and passive flags match

              if (fn === listener && capture === options.capture && passive === options.passive) {
                // remove the listener from the array of listeners
                listeners.splice(i, 1); // if all listeners for this target have been removed
                // remove the target from the delegates array

                if (!listeners.length) {
                  delegates.splice(index, 1); // remove delegate function from context

                  remove(context, type, delegateListener);
                  remove(context, type, delegateUseCapture, true);
                } // only remove one listener


                matchFound = true;
                break;
              }
            }

            if (matchFound) {
              break;
            }
          }
        }
      } // bound to the interactable context when a DOM event
      // listener is added to a selector interactable


      function delegateListener(event, optionalArg) {
        const options = getOptions(optionalArg);
        const fakeEvent = new events_FakeEvent(event);
        const delegates = delegatedEvents[event.type];
        const [eventTarget] = getEventTargets(event);
        let element = eventTarget; // climb up document tree looking for selector matches

        while (is.element(element)) {
          for (let i = 0; i < delegates.length; i++) {
            const cur = delegates[i];
            const {
              selector,
              context
            } = cur;

            if (matchesSelector(element, selector) && nodeContains(context, eventTarget) && nodeContains(context, element)) {
              const {
                listeners
              } = cur;
              fakeEvent.currentTarget = element;

              for (const [fn, {
                capture,
                passive
              }] of listeners) {
                if (capture === options.capture && passive === options.passive) {
                  fn(fakeEvent);
                }
              }
            }
          }

          element = parentNode(element);
        }
      }

      function delegateUseCapture(event) {
        return delegateListener.call(this, event, true);
      } // for type inferrence


      return eventsMethods;
    }

    class events_FakeEvent {
      constructor(originalEvent) {
        this.currentTarget = void 0;
        this.originalEvent = void 0;
        this.type = void 0;
        this.originalEvent = originalEvent; // duplicate the event so that currentTarget can be changed

        utils_pointerExtend(this, originalEvent);
      }

      preventOriginalDefault() {
        this.originalEvent.preventDefault();
      }

      stopPropagation() {
        this.originalEvent.stopPropagation();
      }

      stopImmediatePropagation() {
        this.originalEvent.stopImmediatePropagation();
      }

    }

    function getOptions(param) {
      if (!is.object(param)) {
        return {
          capture: !!param,
          passive: false
        };
      }

      const options = extend({}, param);
      options.capture = !!param.capture;
      options.passive = !!param.passive;
      return options;
    }
    /* harmony default export */


    var events = {
      id: 'events',
      install
    }; // CONCATENATED MODULE: ./node_modules/@interactjs/utils/misc.js

    function warnOnce(method, message) {
      let warned = false;
      return function () {
        if (!warned) {
          win.console.warn(message);
          warned = true;
        }

        return method.apply(this, arguments);
      };
    }

    function copyAction(dest, src) {
      dest.name = src.name;
      dest.axis = src.axis;
      dest.edges = src.edges;
      return dest;
    } // CONCATENATED MODULE: ./node_modules/@interactjs/core/interactStatic.js

    /** @module interact */


    function createInteractStatic(scope) {
      /**
       * ```js
       * interact('#draggable').draggable(true)
       *
       * var rectables = interact('rect')
       * rectables
       *   .gesturable(true)
       *   .on('gesturemove', function (event) {
       *       // ...
       *   })
       * ```
       *
       * The methods of this variable can be used to set elements as interactables
       * and also to change various default settings.
       *
       * Calling it as a function and passing an element or a valid CSS selector
       * string returns an Interactable object which has various methods to configure
       * it.
       *
       * @global
       *
       * @param {Element | string} target The HTML or SVG Element to interact with
       * or CSS selector
       * @return {Interactable}
       */
      const interact = (target, options) => {
        let interactable = scope.interactables.get(target, options);

        if (!interactable) {
          interactable = scope.interactables.new(target, options);
          interactable.events.global = interact.globalEvents;
        }

        return interactable;
      }; // expose the functions used to calculate multi-touch properties


      interact.getPointerAverage = pointerAverage;
      interact.getTouchBBox = touchBBox;
      interact.getTouchDistance = touchDistance;
      interact.getTouchAngle = touchAngle;
      interact.getElementRect = getElementRect;
      interact.getElementClientRect = getElementClientRect;
      interact.matchesSelector = matchesSelector;
      interact.closest = domUtils_closest;
      interact.globalEvents = {}; // eslint-disable-next-line no-undef

      interact.version = "1.10.2";
      interact.scope = scope;
      /**
      * Use a plugin
      *
      * @alias module:interact.use
      *
       */

      interact.use = function (plugin, options) {
        this.scope.usePlugin(plugin, options);
        return this;
      };
      /**
       * Check if an element or selector has been set with the {@link interact}
       * function
       *
       * @alias module:interact.isSet
       *
       * @param {Target} target The Element or string being searched for
       * @param {object} options
       * @return {boolean} Indicates if the element or CSS selector was previously
       * passed to interact
       */


      interact.isSet = function (target, options) {
        return !!this.scope.interactables.get(target, options && options.context);
      };
      /**
       * @deprecated
       * Add a global listener for an InteractEvent or adds a DOM event to `document`
       *
       * @alias module:interact.on
       *
       * @param {string | array | object} type The types of events to listen for
       * @param {function} listener The function event (s)
       * @param {object | boolean} [options] object or useCapture flag for
       * addEventListener
       * @return {object} interact
       */


      interact.on = warnOnce(function on(type, listener, options) {
        if (is.string(type) && type.search(' ') !== -1) {
          type = type.trim().split(/ +/);
        }

        if (is.array(type)) {
          for (const eventType of type) {
            this.on(eventType, listener, options);
          }

          return this;
        }

        if (is.object(type)) {
          for (const prop in type) {
            this.on(prop, type[prop], listener);
          }

          return this;
        } // if it is an InteractEvent type, add listener to globalEvents


        if (isNonNativeEvent(type, this.scope.actions)) {
          // if this type of event was never bound
          if (!this.globalEvents[type]) {
            this.globalEvents[type] = [listener];
          } else {
            this.globalEvents[type].push(listener);
          }
        } // If non InteractEvent type, addEventListener to document
        else {
          this.scope.events.add(this.scope.document, type, listener, {
            options
          });
        }

        return this;
      }, 'The interact.on() method is being deprecated');
      /**
       * @deprecated
       * Removes a global InteractEvent listener or DOM event from `document`
       *
       * @alias module:interact.off
       *
       * @param {string | array | object} type The types of events that were listened
       * for
       * @param {function} listener The listener function to be removed
       * @param {object | boolean} options [options] object or useCapture flag for
       * removeEventListener
       * @return {object} interact
       */

      interact.off = warnOnce(function off(type, listener, options) {
        if (is.string(type) && type.search(' ') !== -1) {
          type = type.trim().split(/ +/);
        }

        if (is.array(type)) {
          for (const eventType of type) {
            this.off(eventType, listener, options);
          }

          return this;
        }

        if (is.object(type)) {
          for (const prop in type) {
            this.off(prop, type[prop], listener);
          }

          return this;
        }

        if (isNonNativeEvent(type, this.scope.actions)) {
          let index;

          if (type in this.globalEvents && (index = this.globalEvents[type].indexOf(listener)) !== -1) {
            this.globalEvents[type].splice(index, 1);
          }
        } else {
          this.scope.events.remove(this.scope.document, type, listener, options);
        }

        return this;
      }, 'The interact.off() method is being deprecated');

      interact.debug = function () {
        return this.scope;
      };
      /**
       * @alias module:interact.supportsTouch
       *
       * @return {boolean} Whether or not the browser supports touch input
       */


      interact.supportsTouch = function () {
        return utils_browser.supportsTouch;
      };
      /**
       * @alias module:interact.supportsPointerEvent
       *
       * @return {boolean} Whether or not the browser supports PointerEvents
       */


      interact.supportsPointerEvent = function () {
        return utils_browser.supportsPointerEvent;
      };
      /**
       * Cancels all interactions (end events are not fired)
       *
       * @alias module:interact.stop
       *
       * @return {object} interact
       */


      interact.stop = function () {
        for (const interaction of this.scope.interactions.list) {
          interaction.stop();
        }

        return this;
      };
      /**
       * Returns or sets the distance the pointer must be moved before an action
       * sequence occurs. This also affects tolerance for tap events.
       *
       * @alias module:interact.pointerMoveTolerance
       *
       * @param {number} [newValue] The movement from the start position must be greater than this value
       * @return {interact | number}
       */


      interact.pointerMoveTolerance = function (newValue) {
        if (is.number(newValue)) {
          this.scope.interactions.pointerMoveTolerance = newValue;
          return this;
        }

        return this.scope.interactions.pointerMoveTolerance;
      };

      interact.addDocument = function (doc, options) {
        this.scope.addDocument(doc, options);
      };

      interact.removeDocument = function (doc) {
        this.scope.removeDocument(doc);
      };

      return interact;
    } // CONCATENATED MODULE: ./node_modules/@interactjs/core/PointerInfo.js


    class PointerInfo {
      constructor(id, pointer, event, downTime, downTarget) {
        this.id = void 0;
        this.pointer = void 0;
        this.event = void 0;
        this.downTime = void 0;
        this.downTarget = void 0;
        this.id = id;
        this.pointer = pointer;
        this.event = event;
        this.downTime = downTime;
        this.downTarget = downTarget;
      }

    } // CONCATENATED MODULE: ./node_modules/@interactjs/core/Interaction.js


    let _ProxyValues;

    (function (_ProxyValues) {
      _ProxyValues["interactable"] = "";
      _ProxyValues["element"] = "";
      _ProxyValues["prepared"] = "";
      _ProxyValues["pointerIsDown"] = "";
      _ProxyValues["pointerWasMoved"] = "";
      _ProxyValues["_proxy"] = "";
    })(_ProxyValues || (_ProxyValues = {}));

    let _ProxyMethods;

    (function (_ProxyMethods) {
      _ProxyMethods["start"] = "";
      _ProxyMethods["move"] = "";
      _ProxyMethods["end"] = "";
      _ProxyMethods["stop"] = "";
      _ProxyMethods["interacting"] = "";
    })(_ProxyMethods || (_ProxyMethods = {}));

    let idCounter = 0;

    class Interaction_Interaction {
      // current interactable being interacted with
      // the target element of the interactable
      // action that's ready to be fired on next move event
      // keep track of added pointers
      // pointerdown/mousedown/touchstart event
      // previous action event

      /** @internal */
      get pointerMoveTolerance() {
        return 1;
      }
      /**
       * @alias Interaction.prototype.move
       */

      /** */


      constructor({
        pointerType,
        scopeFire
      }) {
        this.interactable = null;
        this.element = null;
        this.rect = void 0;
        this._rects = void 0;
        this.edges = void 0;
        this._scopeFire = void 0;
        this.prepared = {
          name: null,
          axis: null,
          edges: null
        };
        this.pointerType = void 0;
        this.pointers = [];
        this.downEvent = null;
        this.downPointer = {};
        this._latestPointer = {
          pointer: null,
          event: null,
          eventTarget: null
        };
        this.prevEvent = null;
        this.pointerIsDown = false;
        this.pointerWasMoved = false;
        this._interacting = false;
        this._ending = false;
        this._stopped = true;
        this._proxy = null;
        this.simulation = null;
        this.doMove = warnOnce(function (signalArg) {
          this.move(signalArg);
        }, 'The interaction.doMove() method has been renamed to interaction.move()');
        this.coords = {
          // Starting InteractEvent pointer coordinates
          start: newCoords(),
          // Previous native pointer move event coordinates
          prev: newCoords(),
          // current native pointer move event coordinates
          cur: newCoords(),
          // Change in coordinates and time of the pointer
          delta: newCoords(),
          // pointer velocity
          velocity: newCoords()
        };
        this._id = idCounter++;
        this._scopeFire = scopeFire;
        this.pointerType = pointerType;
        const that = this;
        this._proxy = {};

        for (const key in _ProxyValues) {
          Object.defineProperty(this._proxy, key, {
            get() {
              return that[key];
            }

          });
        }

        for (const key in _ProxyMethods) {
          Object.defineProperty(this._proxy, key, {
            value: (...args) => that[key](...args)
          });
        }

        this._scopeFire('interactions:new', {
          interaction: this
        });
      }

      pointerDown(pointer, event, eventTarget) {
        const pointerIndex = this.updatePointer(pointer, event, eventTarget, true);
        const pointerInfo = this.pointers[pointerIndex];

        this._scopeFire('interactions:down', {
          pointer,
          event,
          eventTarget,
          pointerIndex,
          pointerInfo,
          type: 'down',
          interaction: this
        });
      }
      /**
       * ```js
       * interact(target)
       *   .draggable({
       *     // disable the default drag start by down->move
       *     manualStart: true
       *   })
       *   // start dragging after the user holds the pointer down
       *   .on('hold', function (event) {
       *     var interaction = event.interaction
       *
       *     if (!interaction.interacting()) {
       *       interaction.start({ name: 'drag' },
       *                         event.interactable,
       *                         event.currentTarget)
       *     }
       * })
       * ```
       *
       * Start an action with the given Interactable and Element as tartgets. The
       * action must be enabled for the target Interactable and an appropriate
       * number of pointers must be held down - 1 for drag/resize, 2 for gesture.
       *
       * Use it with `interactable.<action>able({ manualStart: false })` to always
       * [start actions manually](https://github.com/taye/interact.js/issues/114)
       *
       * @param {object} action   The action to be performed - drag, resize, etc.
       * @param {Interactable} target  The Interactable to target
       * @param {Element} element The DOM Element to target
       * @return {Boolean} Whether the interaction was successfully started
       */


      start(action, interactable, element) {
        if (this.interacting() || !this.pointerIsDown || this.pointers.length < (action.name === 'gesture' ? 2 : 1) || !interactable.options[action.name].enabled) {
          return false;
        }

        copyAction(this.prepared, action);
        this.interactable = interactable;
        this.element = element;
        this.rect = interactable.getRect(element);
        this.edges = this.prepared.edges ? extend({}, this.prepared.edges) : {
          left: true,
          right: true,
          top: true,
          bottom: true
        };
        this._stopped = false;
        this._interacting = this._doPhase({
          interaction: this,
          event: this.downEvent,
          phase: 'start'
        }) && !this._stopped;
        return this._interacting;
      }

      pointerMove(pointer, event, eventTarget) {
        if (!this.simulation && !(this.modification && this.modification.endResult)) {
          this.updatePointer(pointer, event, eventTarget, false);
        }

        const duplicateMove = this.coords.cur.page.x === this.coords.prev.page.x && this.coords.cur.page.y === this.coords.prev.page.y && this.coords.cur.client.x === this.coords.prev.client.x && this.coords.cur.client.y === this.coords.prev.client.y;
        let dx;
        let dy; // register movement greater than pointerMoveTolerance

        if (this.pointerIsDown && !this.pointerWasMoved) {
          dx = this.coords.cur.client.x - this.coords.start.client.x;
          dy = this.coords.cur.client.y - this.coords.start.client.y;
          this.pointerWasMoved = hypot(dx, dy) > this.pointerMoveTolerance;
        }

        const pointerIndex = this.getPointerIndex(pointer);
        const signalArg = {
          pointer,
          pointerIndex,
          pointerInfo: this.pointers[pointerIndex],
          event,
          type: 'move',
          eventTarget,
          dx,
          dy,
          duplicate: duplicateMove,
          interaction: this
        };

        if (!duplicateMove) {
          // set pointer coordinate, time changes and velocity
          setCoordVelocity(this.coords.velocity, this.coords.delta);
        }

        this._scopeFire('interactions:move', signalArg);

        if (!duplicateMove && !this.simulation) {
          // if interacting, fire an 'action-move' signal etc
          if (this.interacting()) {
            signalArg.type = null;
            this.move(signalArg);
          }

          if (this.pointerWasMoved) {
            copyCoords(this.coords.prev, this.coords.cur);
          }
        }
      }
      /**
       * ```js
       * interact(target)
       *   .draggable(true)
       *   .on('dragmove', function (event) {
       *     if (someCondition) {
       *       // change the snap settings
       *       event.interactable.draggable({ snap: { targets: [] }})
       *       // fire another move event with re-calculated snap
       *       event.interaction.move()
       *     }
       *   })
       * ```
       *
       * Force a move of the current action at the same coordinates. Useful if
       * snap/restrict has been changed and you want a movement with the new
       * settings.
       */


      move(signalArg) {
        if (!signalArg || !signalArg.event) {
          setZeroCoords(this.coords.delta);
        }

        signalArg = extend({
          pointer: this._latestPointer.pointer,
          event: this._latestPointer.event,
          eventTarget: this._latestPointer.eventTarget,
          interaction: this
        }, signalArg || {});
        signalArg.phase = 'move';

        this._doPhase(signalArg);
      } // End interact move events and stop auto-scroll unless simulation is running


      pointerUp(pointer, event, eventTarget, curEventTarget) {
        let pointerIndex = this.getPointerIndex(pointer);

        if (pointerIndex === -1) {
          pointerIndex = this.updatePointer(pointer, event, eventTarget, false);
        }

        const type = /cancel$/i.test(event.type) ? 'cancel' : 'up';

        this._scopeFire(`interactions:${type}`, {
          pointer,
          pointerIndex,
          pointerInfo: this.pointers[pointerIndex],
          event,
          eventTarget,
          type: type,
          curEventTarget,
          interaction: this
        });

        if (!this.simulation) {
          this.end(event);
        }

        this.removePointer(pointer, event);
      }

      documentBlur(event) {
        this.end(event);

        this._scopeFire('interactions:blur', {
          event,
          type: 'blur',
          interaction: this
        });
      }
      /**
       * ```js
       * interact(target)
       *   .draggable(true)
       *   .on('move', function (event) {
       *     if (event.pageX > 1000) {
       *       // end the current action
       *       event.interaction.end()
       *       // stop all further listeners from being called
       *       event.stopImmediatePropagation()
       *     }
       *   })
       * ```
       *
       * @param {PointerEvent} [event]
       */


      end(event) {
        this._ending = true;
        event = event || this._latestPointer.event;
        let endPhaseResult;

        if (this.interacting()) {
          endPhaseResult = this._doPhase({
            event,
            interaction: this,
            phase: 'end'
          });
        }

        this._ending = false;

        if (endPhaseResult === true) {
          this.stop();
        }
      }

      currentAction() {
        return this._interacting ? this.prepared.name : null;
      }

      interacting() {
        return this._interacting;
      }
      /** */


      stop() {
        this._scopeFire('interactions:stop', {
          interaction: this
        });

        this.interactable = this.element = null;
        this._interacting = false;
        this._stopped = true;
        this.prepared.name = this.prevEvent = null;
      }

      getPointerIndex(pointer) {
        const pointerId = getPointerId(pointer); // mouse and pen interactions may have only one pointer

        return this.pointerType === 'mouse' || this.pointerType === 'pen' ? this.pointers.length - 1 : findIndex(this.pointers, curPointer => curPointer.id === pointerId);
      }

      getPointerInfo(pointer) {
        return this.pointers[this.getPointerIndex(pointer)];
      }

      updatePointer(pointer, event, eventTarget, down) {
        const id = getPointerId(pointer);
        let pointerIndex = this.getPointerIndex(pointer);
        let pointerInfo = this.pointers[pointerIndex];
        down = down === false ? false : down || /(down|start)$/i.test(event.type);

        if (!pointerInfo) {
          pointerInfo = new PointerInfo(id, pointer, event, null, null);
          pointerIndex = this.pointers.length;
          this.pointers.push(pointerInfo);
        } else {
          pointerInfo.pointer = pointer;
        }

        setCoords(this.coords.cur, this.pointers.map(p => p.pointer), this._now());
        setCoordDeltas(this.coords.delta, this.coords.prev, this.coords.cur);

        if (down) {
          this.pointerIsDown = true;
          pointerInfo.downTime = this.coords.cur.timeStamp;
          pointerInfo.downTarget = eventTarget;
          utils_pointerExtend(this.downPointer, pointer);

          if (!this.interacting()) {
            copyCoords(this.coords.start, this.coords.cur);
            copyCoords(this.coords.prev, this.coords.cur);
            this.downEvent = event;
            this.pointerWasMoved = false;
          }
        }

        this._updateLatestPointer(pointer, event, eventTarget);

        this._scopeFire('interactions:update-pointer', {
          pointer,
          event,
          eventTarget,
          down,
          pointerInfo,
          pointerIndex,
          interaction: this
        });

        return pointerIndex;
      }

      removePointer(pointer, event) {
        const pointerIndex = this.getPointerIndex(pointer);

        if (pointerIndex === -1) {
          return;
        }

        const pointerInfo = this.pointers[pointerIndex];

        this._scopeFire('interactions:remove-pointer', {
          pointer,
          event,
          eventTarget: null,
          pointerIndex,
          pointerInfo,
          interaction: this
        });

        this.pointers.splice(pointerIndex, 1);
        this.pointerIsDown = false;
      }

      _updateLatestPointer(pointer, event, eventTarget) {
        this._latestPointer.pointer = pointer;
        this._latestPointer.event = event;
        this._latestPointer.eventTarget = eventTarget;
      }

      destroy() {
        this._latestPointer.pointer = null;
        this._latestPointer.event = null;
        this._latestPointer.eventTarget = null;
      }

      _createPreparedEvent(event, phase, preEnd, type) {
        return new InteractEvent_InteractEvent(this, event, this.prepared.name, phase, this.element, preEnd, type);
      }

      _fireEvent(iEvent) {
        this.interactable.fire(iEvent);

        if (!this.prevEvent || iEvent.timeStamp >= this.prevEvent.timeStamp) {
          this.prevEvent = iEvent;
        }
      }

      _doPhase(signalArg) {
        const {
          event,
          phase,
          preEnd,
          type
        } = signalArg;
        const {
          rect
        } = this;

        if (rect && phase === 'move') {
          // update the rect changes due to pointer move
          addEdges(this.edges, rect, this.coords.delta[this.interactable.options.deltaSource]);
          rect.width = rect.right - rect.left;
          rect.height = rect.bottom - rect.top;
        }

        const beforeResult = this._scopeFire(`interactions:before-action-${phase}`, signalArg);

        if (beforeResult === false) {
          return false;
        }

        const iEvent = signalArg.iEvent = this._createPreparedEvent(event, phase, preEnd, type);

        this._scopeFire(`interactions:action-${phase}`, signalArg);

        if (phase === 'start') {
          this.prevEvent = iEvent;
        }

        this._fireEvent(iEvent);

        this._scopeFire(`interactions:after-action-${phase}`, signalArg);

        return true;
      }

      _now() {
        return Date.now();
      }

    }
    /* harmony default export */


    var core_Interaction = Interaction_Interaction; // CONCATENATED MODULE: ./node_modules/@interactjs/core/interactablePreventDefault.js

    function preventDefault(newValue) {
      if (/^(always|never|auto)$/.test(newValue)) {
        this.options.preventDefault = newValue;
        return this;
      }

      if (is.bool(newValue)) {
        this.options.preventDefault = newValue ? 'always' : 'never';
        return this;
      }

      return this.options.preventDefault;
    }

    function checkAndPreventDefault(interactable, scope, event) {
      const setting = interactable.options.preventDefault;

      if (setting === 'never') {
        return;
      }

      if (setting === 'always') {
        event.preventDefault();
        return;
      } // setting === 'auto'
      // if the browser supports passive event listeners and isn't running on iOS,
      // don't preventDefault of touch{start,move} events. CSS touch-action and
      // user-select should be used instead of calling event.preventDefault().


      if (scope.events.supportsPassive && /^touch(start|move)$/.test(event.type)) {
        const doc = getWindow(event.target).document;
        const docOptions = scope.getDocOptions(doc);

        if (!(docOptions && docOptions.events) || docOptions.events.passive !== false) {
          return;
        }
      } // don't preventDefault of pointerdown events


      if (/^(mouse|pointer|touch)*(down|start)/i.test(event.type)) {
        return;
      } // don't preventDefault on editable elements


      if (is.element(event.target) && matchesSelector(event.target, 'input,select,textarea,[contenteditable=true],[contenteditable=true] *')) {
        return;
      }

      event.preventDefault();
    }

    function onInteractionEvent({
      interaction,
      event
    }) {
      if (interaction.interactable) {
        interaction.interactable.checkAndPreventDefault(event);
      }
    }

    function interactablePreventDefault_install(scope) {
      /** @lends Interactable */
      const {
        Interactable
      } = scope;
      /**
       * Returns or sets whether to prevent the browser's default behaviour in
       * response to pointer events. Can be set to:
       *  - `'always'` to always prevent
       *  - `'never'` to never prevent
       *  - `'auto'` to let interact.js try to determine what would be best
       *
       * @param {string} [newValue] `'always'`, `'never'` or `'auto'`
       * @return {string | Interactable} The current setting or this Interactable
       */

      Interactable.prototype.preventDefault = preventDefault;

      Interactable.prototype.checkAndPreventDefault = function (event) {
        return checkAndPreventDefault(this, scope, event);
      }; // prevent native HTML5 drag on interact.js target elements


      scope.interactions.docEvents.push({
        type: 'dragstart',

        listener(event) {
          for (const interaction of scope.interactions.list) {
            if (interaction.element && (interaction.element === event.target || nodeContains(interaction.element, event.target))) {
              interaction.interactable.checkAndPreventDefault(event);
              return;
            }
          }
        }

      });
    }
    /* harmony default export */


    var interactablePreventDefault = {
      id: 'core/interactablePreventDefault',
      install: interactablePreventDefault_install,
      listeners: ['down', 'move', 'up', 'cancel'].reduce((acc, eventType) => {
        acc[`interactions:${eventType}`] = onInteractionEvent;
        return acc;
      }, {})
    }; // CONCATENATED MODULE: ./node_modules/@interactjs/core/interactionFinder.js

    const finder = {
      methodOrder: ['simulationResume', 'mouseOrPen', 'hasPointer', 'idle'],

      search(details) {
        for (const method of finder.methodOrder) {
          const interaction = finder[method](details);

          if (interaction) {
            return interaction;
          }
        }

        return null;
      },

      // try to resume simulation with a new pointer
      simulationResume({
        pointerType,
        eventType,
        eventTarget,
        scope
      }) {
        if (!/down|start/i.test(eventType)) {
          return null;
        }

        for (const interaction of scope.interactions.list) {
          let element = eventTarget;

          if (interaction.simulation && interaction.simulation.allowResume && interaction.pointerType === pointerType) {
            while (element) {
              // if the element is the interaction element
              if (element === interaction.element) {
                return interaction;
              }

              element = parentNode(element);
            }
          }
        }

        return null;
      },

      // if it's a mouse or pen interaction
      mouseOrPen({
        pointerId,
        pointerType,
        eventType,
        scope
      }) {
        if (pointerType !== 'mouse' && pointerType !== 'pen') {
          return null;
        }

        let firstNonActive;

        for (const interaction of scope.interactions.list) {
          if (interaction.pointerType === pointerType) {
            // if it's a down event, skip interactions with running simulations
            if (interaction.simulation && !hasPointerId(interaction, pointerId)) {
              continue;
            } // if the interaction is active, return it immediately


            if (interaction.interacting()) {
              return interaction;
            } // otherwise save it and look for another active interaction
            else if (!firstNonActive) {
              firstNonActive = interaction;
            }
          }
        } // if no active mouse interaction was found use the first inactive mouse
        // interaction


        if (firstNonActive) {
          return firstNonActive;
        } // find any mouse or pen interaction.
        // ignore the interaction if the eventType is a *down, and a simulation
        // is active


        for (const interaction of scope.interactions.list) {
          if (interaction.pointerType === pointerType && !(/down/i.test(eventType) && interaction.simulation)) {
            return interaction;
          }
        }

        return null;
      },

      // get interaction that has this pointer
      hasPointer({
        pointerId,
        scope
      }) {
        for (const interaction of scope.interactions.list) {
          if (hasPointerId(interaction, pointerId)) {
            return interaction;
          }
        }

        return null;
      },

      // get first idle interaction with a matching pointerType
      idle({
        pointerType,
        scope
      }) {
        for (const interaction of scope.interactions.list) {
          // if there's already a pointer held down
          if (interaction.pointers.length === 1) {
            const target = interaction.interactable; // don't add this pointer if there is a target interactable and it
            // isn't gesturable

            if (target && !(target.options.gesture && target.options.gesture.enabled)) {
              continue;
            }
          } // maximum of 2 pointers per interaction
          else if (interaction.pointers.length >= 2) {
            continue;
          }

          if (!interaction.interacting() && pointerType === interaction.pointerType) {
            return interaction;
          }
        }

        return null;
      }

    };

    function hasPointerId(interaction, pointerId) {
      return interaction.pointers.some(({
        id
      }) => id === pointerId);
    }
    /* harmony default export */


    var interactionFinder = finder; // CONCATENATED MODULE: ./node_modules/@interactjs/core/interactions.js

    const methodNames = ['pointerDown', 'pointerMove', 'pointerUp', 'updatePointer', 'removePointer', 'windowBlur'];

    function interactions_install(scope) {
      const listeners = {};

      for (const method of methodNames) {
        listeners[method] = doOnInteractions(method, scope);
      }

      const pEventTypes = utils_browser.pEventTypes;
      let docEvents;

      if (utils_domObjects.PointerEvent) {
        docEvents = [{
          type: pEventTypes.down,
          listener: releasePointersOnRemovedEls
        }, {
          type: pEventTypes.down,
          listener: listeners.pointerDown
        }, {
          type: pEventTypes.move,
          listener: listeners.pointerMove
        }, {
          type: pEventTypes.up,
          listener: listeners.pointerUp
        }, {
          type: pEventTypes.cancel,
          listener: listeners.pointerUp
        }];
      } else {
        docEvents = [{
          type: 'mousedown',
          listener: listeners.pointerDown
        }, {
          type: 'mousemove',
          listener: listeners.pointerMove
        }, {
          type: 'mouseup',
          listener: listeners.pointerUp
        }, {
          type: 'touchstart',
          listener: releasePointersOnRemovedEls
        }, {
          type: 'touchstart',
          listener: listeners.pointerDown
        }, {
          type: 'touchmove',
          listener: listeners.pointerMove
        }, {
          type: 'touchend',
          listener: listeners.pointerUp
        }, {
          type: 'touchcancel',
          listener: listeners.pointerUp
        }];
      }

      docEvents.push({
        type: 'blur',

        listener(event) {
          for (const interaction of scope.interactions.list) {
            interaction.documentBlur(event);
          }
        }

      }); // for ignoring browser's simulated mouse events

      scope.prevTouchTime = 0;
      scope.Interaction = class extends core_Interaction {
        get pointerMoveTolerance() {
          return scope.interactions.pointerMoveTolerance;
        }

        set pointerMoveTolerance(value) {
          scope.interactions.pointerMoveTolerance = value;
        }

        _now() {
          return scope.now();
        }

      };
      scope.interactions = {
        // all active and idle interactions
        list: [],

        new(options) {
          options.scopeFire = (name, arg) => scope.fire(name, arg);

          const interaction = new scope.Interaction(options);
          scope.interactions.list.push(interaction);
          return interaction;
        },

        listeners,
        docEvents,
        pointerMoveTolerance: 1
      };

      function releasePointersOnRemovedEls() {
        // for all inactive touch interactions with pointers down
        for (const interaction of scope.interactions.list) {
          if (!interaction.pointerIsDown || interaction.pointerType !== 'touch' || interaction._interacting) {
            continue;
          } // if a pointer is down on an element that is no longer in the DOM tree


          for (const pointer of interaction.pointers) {
            if (!scope.documents.some(({
              doc
            }) => nodeContains(doc, pointer.downTarget))) {
              // remove the pointer from the interaction
              interaction.removePointer(pointer.pointer, pointer.event);
            }
          }
        }
      }

      scope.usePlugin(interactablePreventDefault);
    }

    function doOnInteractions(method, scope) {
      return function (event) {
        const interactions = scope.interactions.list;
        const pointerType = getPointerType(event);
        const [eventTarget, curEventTarget] = getEventTargets(event);
        const matches = []; // [ [pointer, interaction], ...]

        if (/^touch/.test(event.type)) {
          scope.prevTouchTime = scope.now(); // @ts-expect-error

          for (const changedTouch of event.changedTouches) {
            const pointer = changedTouch;
            const pointerId = getPointerId(pointer);
            const searchDetails = {
              pointer,
              pointerId,
              pointerType,
              eventType: event.type,
              eventTarget,
              curEventTarget,
              scope
            };
            const interaction = getInteraction(searchDetails);
            matches.push([searchDetails.pointer, searchDetails.eventTarget, searchDetails.curEventTarget, interaction]);
          }
        } else {
          let invalidPointer = false;

          if (!utils_browser.supportsPointerEvent && /mouse/.test(event.type)) {
            // ignore mouse events while touch interactions are active
            for (let i = 0; i < interactions.length && !invalidPointer; i++) {
              invalidPointer = interactions[i].pointerType !== 'mouse' && interactions[i].pointerIsDown;
            } // try to ignore mouse events that are simulated by the browser
            // after a touch event


            invalidPointer = invalidPointer || scope.now() - scope.prevTouchTime < 500 || // on iOS and Firefox Mobile, MouseEvent.timeStamp is zero if simulated
            event.timeStamp === 0;
          }

          if (!invalidPointer) {
            const searchDetails = {
              pointer: event,
              pointerId: getPointerId(event),
              pointerType,
              eventType: event.type,
              curEventTarget,
              eventTarget,
              scope
            };
            const interaction = getInteraction(searchDetails);
            matches.push([searchDetails.pointer, searchDetails.eventTarget, searchDetails.curEventTarget, interaction]);
          }
        } // eslint-disable-next-line no-shadow


        for (const [pointer, eventTarget, curEventTarget, interaction] of matches) {
          interaction[method](pointer, event, eventTarget, curEventTarget);
        }
      };
    }

    function getInteraction(searchDetails) {
      const {
        pointerType,
        scope
      } = searchDetails;
      const foundInteraction = interactionFinder.search(searchDetails);
      const signalArg = {
        interaction: foundInteraction,
        searchDetails
      };
      scope.fire('interactions:find', signalArg);
      return signalArg.interaction || scope.interactions.new({
        pointerType
      });
    }

    function onDocSignal({
      doc,
      scope,
      options
    }, eventMethodName) {
      const {
        interactions: {
          docEvents
        },
        events
      } = scope;
      const eventMethod = events[eventMethodName];

      if (scope.browser.isIOS && !options.events) {
        options.events = {
          passive: false
        };
      } // delegate event listener


      for (const eventType in events.delegatedEvents) {
        eventMethod(doc, eventType, events.delegateListener);
        eventMethod(doc, eventType, events.delegateUseCapture, true);
      }

      const eventOptions = options && options.events;

      for (const {
        type,
        listener
      } of docEvents) {
        eventMethod(doc, type, listener, eventOptions);
      }
    }

    const interactions_interactions = {
      id: 'core/interactions',
      install: interactions_install,
      listeners: {
        'scope:add-document': arg => onDocSignal(arg, 'add'),
        'scope:remove-document': arg => onDocSignal(arg, 'remove'),
        'interactable:unset': ({
          interactable
        }, scope) => {
          // Stop and destroy related interactions when an Interactable is unset
          for (let i = scope.interactions.list.length - 1; i >= 0; i--) {
            const interaction = scope.interactions.list[i];

            if (interaction.interactable !== interactable) {
              continue;
            }

            interaction.stop();
            scope.fire('interactions:destroy', {
              interaction
            });
            interaction.destroy();

            if (scope.interactions.list.length > 2) {
              scope.interactions.list.splice(i, 1);
            }
          }
        }
      },
      onDocSignal,
      doOnInteractions,
      methodNames
    };
    /* harmony default export */

    var core_interactions = interactions_interactions; // CONCATENATED MODULE: ./node_modules/@interactjs/core/scope.js

    class scope_Scope {
      // main window
      // main document
      // main window
      // all documents being listened to
      constructor() {
        this.id = `__interact_scope_${Math.floor(Math.random() * 100)}`;
        this.isInitialized = false;
        this.listenerMaps = [];
        this.browser = utils_browser;
        this.defaults = clone(defaultOptions_defaults);
        this.Eventable = Eventable_Eventable;
        this.actions = {
          map: {},
          phases: {
            start: true,
            move: true,
            end: true
          },
          methodDict: {},
          phaselessTypes: {}
        };
        this.interactStatic = createInteractStatic(this);
        this.InteractEvent = InteractEvent_InteractEvent;
        this.Interactable = void 0;
        this.interactables = new InteractableSet_InteractableSet(this);
        this._win = void 0;
        this.document = void 0;
        this.window = void 0;
        this.documents = [];
        this._plugins = {
          list: [],
          map: {}
        };

        this.onWindowUnload = event => this.removeDocument(event.target);

        const scope = this;
        this.Interactable = class extends Interactable_Interactable {
          get _defaults() {
            return scope.defaults;
          }

          set(options) {
            super.set(options);
            scope.fire('interactable:set', {
              options,
              interactable: this
            });
            return this;
          }

          unset() {
            super.unset();
            scope.interactables.list.splice(scope.interactables.list.indexOf(this), 1);
            scope.fire('interactable:unset', {
              interactable: this
            });
          }

        };
      }

      addListeners(map, id) {
        this.listenerMaps.push({
          id,
          map
        });
      }

      fire(name, arg) {
        for (const {
          map: {
            [name]: listener
          }
        } of this.listenerMaps) {
          if (!!listener && listener(arg, this, name) === false) {
            return false;
          }
        }
      }

      init(window) {
        return this.isInitialized ? this : initScope(this, window);
      }

      pluginIsInstalled(plugin) {
        return this._plugins.map[plugin.id] || this._plugins.list.indexOf(plugin) !== -1;
      }

      usePlugin(plugin, options) {
        if (!this.isInitialized) {
          return this;
        }

        if (this.pluginIsInstalled(plugin)) {
          return this;
        }

        if (plugin.id) {
          this._plugins.map[plugin.id] = plugin;
        }

        this._plugins.list.push(plugin);

        if (plugin.install) {
          plugin.install(this, options);
        }

        if (plugin.listeners && plugin.before) {
          let index = 0;
          const len = this.listenerMaps.length;
          const before = plugin.before.reduce((acc, id) => {
            acc[id] = true;
            acc[pluginIdRoot(id)] = true;
            return acc;
          }, {});

          for (; index < len; index++) {
            const otherId = this.listenerMaps[index].id;

            if (before[otherId] || before[pluginIdRoot(otherId)]) {
              break;
            }
          }

          this.listenerMaps.splice(index, 0, {
            id: plugin.id,
            map: plugin.listeners
          });
        } else if (plugin.listeners) {
          this.listenerMaps.push({
            id: plugin.id,
            map: plugin.listeners
          });
        }

        return this;
      }

      addDocument(doc, options) {
        // do nothing if document is already known
        if (this.getDocIndex(doc) !== -1) {
          return false;
        }

        const window = getWindow(doc);
        options = options ? extend({}, options) : {};
        this.documents.push({
          doc,
          options
        });
        this.events.documents.push(doc); // don't add an unload event for the main document
        // so that the page may be cached in browser history

        if (doc !== this.document) {
          this.events.add(window, 'unload', this.onWindowUnload);
        }

        this.fire('scope:add-document', {
          doc,
          window,
          scope: this,
          options
        });
      }

      removeDocument(doc) {
        const index = this.getDocIndex(doc);
        const window = getWindow(doc);
        const options = this.documents[index].options;
        this.events.remove(window, 'unload', this.onWindowUnload);
        this.documents.splice(index, 1);
        this.events.documents.splice(index, 1);
        this.fire('scope:remove-document', {
          doc,
          window,
          scope: this,
          options
        });
      }

      getDocIndex(doc) {
        for (let i = 0; i < this.documents.length; i++) {
          if (this.documents[i].doc === doc) {
            return i;
          }
        }

        return -1;
      }

      getDocOptions(doc) {
        const docIndex = this.getDocIndex(doc);
        return docIndex === -1 ? null : this.documents[docIndex].options;
      }

      now() {
        return (this.window.Date || Date).now();
      }

    }

    function initScope(scope, window) {
      scope.isInitialized = true;
      window_init(window);
      utils_domObjects.init(window);
      utils_browser.init(window);
      raf.init(window);
      scope.window = window;
      scope.document = window.document;
      scope.usePlugin(core_interactions);
      scope.usePlugin(events);
      return scope;
    }

    function pluginIdRoot(id) {
      return id && id.replace(/\/.*$/, '');
    } // CONCATENATED MODULE: ./node_modules/@interactjs/interact/index.js


    const interact_scope = new scope_Scope();
    const interact_interact = interact_scope.interactStatic;
    /* harmony default export */

    var _interactjs_interact = interact_interact;

    const interact_init = win => interact_scope.init(win);

    if (typeof window === 'object' && !!window) {
      interact_init(window);
    } // CONCATENATED MODULE: ./node_modules/@interactjs/auto-start/InteractableMethods.js


    function InteractableMethods_install(scope) {
      const {
        /** @lends Interactable */
        Interactable // tslint:disable-line no-shadowed-variable

      } = scope;

      Interactable.prototype.getAction = function getAction(pointer, event, interaction, element) {
        const action = defaultActionChecker(this, event, interaction, element, scope);

        if (this.options.actionChecker) {
          return this.options.actionChecker(pointer, event, action, this, element, interaction);
        }

        return action;
      };
      /**
       * If the target of the `mousedown`, `pointerdown` or `touchstart` event or any
       * of it's parents match the given CSS selector or Element, no
       * drag/resize/gesture is started.
       *
       * @deprecated
       * Don't use this method. Instead set the `ignoreFrom` option for each action
       * or for `pointerEvents`
       *
       * ```js
       * interact(targett)
       *   .draggable({
       *     ignoreFrom: 'input, textarea, a[href]'',
       *   })
       *   .pointerEvents({
       *     ignoreFrom: '[no-pointer]',
       *   })
       * ```
       *
       * @param {string | Element | null} [newValue] a CSS selector string, an
       * Element or `null` to not ignore any elements
       * @return {string | Element | object} The current ignoreFrom value or this
       * Interactable
       */


      Interactable.prototype.ignoreFrom = warnOnce(function (newValue) {
        return this._backCompatOption('ignoreFrom', newValue);
      }, 'Interactable.ignoreFrom() has been deprecated. Use Interactble.draggable({ignoreFrom: newValue}).');
      /**
       *
       * A drag/resize/gesture is started only If the target of the `mousedown`,
       * `pointerdown` or `touchstart` event or any of it's parents match the given
       * CSS selector or Element.
       *
       * @deprecated
       * Don't use this method. Instead set the `allowFrom` option for each action
       * or for `pointerEvents`
       *
       * ```js
       * interact(targett)
       *   .resizable({
       *     allowFrom: '.resize-handle',
       *   .pointerEvents({
       *     allowFrom: '.handle',,
       *   })
       * ```
       *
       * @param {string | Element | null} [newValue] a CSS selector string, an
       * Element or `null` to allow from any element
       * @return {string | Element | object} The current allowFrom value or this
       * Interactable
       */

      Interactable.prototype.allowFrom = warnOnce(function (newValue) {
        return this._backCompatOption('allowFrom', newValue);
      }, 'Interactable.allowFrom() has been deprecated. Use Interactble.draggable({allowFrom: newValue}).');
      /**
       * ```js
       * interact('.resize-drag')
       *   .resizable(true)
       *   .draggable(true)
       *   .actionChecker(function (pointer, event, action, interactable, element, interaction) {
       *
       *     if (interact.matchesSelector(event.target, '.drag-handle')) {
       *       // force drag with handle target
       *       action.name = drag
       *     }
       *     else {
       *       // resize from the top and right edges
       *       action.name  = 'resize'
       *       action.edges = { top: true, right: true }
       *     }
       *
       *     return action
       * })
       * ```
       *
       * Returns or sets the function used to check action to be performed on
       * pointerDown
       *
       * @param {function | null} [checker] A function which takes a pointer event,
       * defaultAction string, interactable, element and interaction as parameters
       * and returns an object with name property 'drag' 'resize' or 'gesture' and
       * optionally an `edges` object with boolean 'top', 'left', 'bottom' and right
       * props.
       * @return {Function | Interactable} The checker function or this Interactable
       */

      Interactable.prototype.actionChecker = actionChecker;
      /**
       * Returns or sets whether the the cursor should be changed depending on the
       * action that would be performed if the mouse were pressed and dragged.
       *
       * @param {boolean} [newValue]
       * @return {boolean | Interactable} The current setting or this Interactable
       */

      Interactable.prototype.styleCursor = styleCursor;
    }

    function defaultActionChecker(interactable, event, interaction, element, scope) {
      const rect = interactable.getRect(element);
      const buttons = event.buttons || {
        0: 1,
        1: 4,
        3: 8,
        4: 16
      }[event.button];
      const arg = {
        action: null,
        interactable,
        interaction,
        element,
        rect,
        buttons
      };
      scope.fire('auto-start:check', arg);
      return arg.action;
    }

    function styleCursor(newValue) {
      if (is.bool(newValue)) {
        this.options.styleCursor = newValue;
        return this;
      }

      if (newValue === null) {
        delete this.options.styleCursor;
        return this;
      }

      return this.options.styleCursor;
    }

    function actionChecker(checker) {
      if (is.func(checker)) {
        this.options.actionChecker = checker;
        return this;
      }

      if (checker === null) {
        delete this.options.actionChecker;
        return this;
      }

      return this.options.actionChecker;
    }
    /* harmony default export */


    var InteractableMethods = {
      id: 'auto-start/interactableMethods',
      install: InteractableMethods_install
    }; // CONCATENATED MODULE: ./node_modules/@interactjs/auto-start/base.js

    function base_install(scope) {
      const {
        interactStatic: interact,
        defaults
      } = scope;
      scope.usePlugin(InteractableMethods);
      defaults.base.actionChecker = null;
      defaults.base.styleCursor = true;
      extend(defaults.perAction, {
        manualStart: false,
        max: Infinity,
        maxPerElement: 1,
        allowFrom: null,
        ignoreFrom: null,
        // only allow left button by default
        // see https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons#Return_value
        mouseButtons: 1
      });
      /**
       * Returns or sets the maximum number of concurrent interactions allowed.  By
       * default only 1 interaction is allowed at a time (for backwards
       * compatibility). To allow multiple interactions on the same Interactables and
       * elements, you need to enable it in the draggable, resizable and gesturable
       * `'max'` and `'maxPerElement'` options.
       *
       * @alias module:interact.maxInteractions
       *
       * @param {number} [newValue] Any number. newValue <= 0 means no interactions.
       */

      interact.maxInteractions = newValue => maxInteractions(newValue, scope);

      scope.autoStart = {
        // Allow this many interactions to happen simultaneously
        maxInteractions: Infinity,
        withinInteractionLimit,
        cursorElement: null
      };
    }

    function prepareOnDown({
      interaction,
      pointer,
      event,
      eventTarget
    }, scope) {
      if (interaction.interacting()) {
        return;
      }

      const actionInfo = getActionInfo(interaction, pointer, event, eventTarget, scope);
      prepare(interaction, actionInfo, scope);
    }

    function prepareOnMove({
      interaction,
      pointer,
      event,
      eventTarget
    }, scope) {
      if (interaction.pointerType !== 'mouse' || interaction.pointerIsDown || interaction.interacting()) {
        return;
      }

      const actionInfo = getActionInfo(interaction, pointer, event, eventTarget, scope);
      prepare(interaction, actionInfo, scope);
    }

    function startOnMove(arg, scope) {
      const {
        interaction
      } = arg;

      if (!interaction.pointerIsDown || interaction.interacting() || !interaction.pointerWasMoved || !interaction.prepared.name) {
        return;
      }

      scope.fire('autoStart:before-start', arg);
      const {
        interactable
      } = interaction;
      const actionName = interaction.prepared.name;

      if (actionName && interactable) {
        // check manualStart and interaction limit
        if (interactable.options[actionName].manualStart || !withinInteractionLimit(interactable, interaction.element, interaction.prepared, scope)) {
          interaction.stop();
        } else {
          interaction.start(interaction.prepared, interactable, interaction.element);
          setInteractionCursor(interaction, scope);
        }
      }
    }

    function clearCursorOnStop({
      interaction
    }, scope) {
      const {
        interactable
      } = interaction;

      if (interactable && interactable.options.styleCursor) {
        setCursor(interaction.element, '', scope);
      }
    } // Check if the current interactable supports the action.
    // If so, return the validated action. Otherwise, return null


    function validateAction(action, interactable, element, eventTarget, scope) {
      if (interactable.testIgnoreAllow(interactable.options[action.name], element, eventTarget) && interactable.options[action.name].enabled && withinInteractionLimit(interactable, element, action, scope)) {
        return action;
      }

      return null;
    }

    function validateMatches(interaction, pointer, event, matches, matchElements, eventTarget, scope) {
      for (let i = 0, len = matches.length; i < len; i++) {
        const match = matches[i];
        const matchElement = matchElements[i];
        const matchAction = match.getAction(pointer, event, interaction, matchElement);

        if (!matchAction) {
          continue;
        }

        const action = validateAction(matchAction, match, matchElement, eventTarget, scope);

        if (action) {
          return {
            action,
            interactable: match,
            element: matchElement
          };
        }
      }

      return {
        action: null,
        interactable: null,
        element: null
      };
    }

    function getActionInfo(interaction, pointer, event, eventTarget, scope) {
      let matches = [];
      let matchElements = [];
      let element = eventTarget;

      function pushMatches(interactable) {
        matches.push(interactable);
        matchElements.push(element);
      }

      while (is.element(element)) {
        matches = [];
        matchElements = [];
        scope.interactables.forEachMatch(element, pushMatches);
        const actionInfo = validateMatches(interaction, pointer, event, matches, matchElements, eventTarget, scope);

        if (actionInfo.action && !actionInfo.interactable.options[actionInfo.action.name].manualStart) {
          return actionInfo;
        }

        element = parentNode(element);
      }

      return {
        action: null,
        interactable: null,
        element: null
      };
    }

    function prepare(interaction, {
      action,
      interactable,
      element
    }, scope) {
      action = action || {
        name: null
      };
      interaction.interactable = interactable;
      interaction.element = element;
      copyAction(interaction.prepared, action);
      interaction.rect = interactable && action.name ? interactable.getRect(element) : null;
      setInteractionCursor(interaction, scope);
      scope.fire('autoStart:prepared', {
        interaction
      });
    }

    function withinInteractionLimit(interactable, element, action, scope) {
      const options = interactable.options;
      const maxActions = options[action.name].max;
      const maxPerElement = options[action.name].maxPerElement;
      const autoStartMax = scope.autoStart.maxInteractions;
      let activeInteractions = 0;
      let interactableCount = 0;
      let elementCount = 0; // no actions if any of these values == 0

      if (!(maxActions && maxPerElement && autoStartMax)) {
        return false;
      }

      for (const interaction of scope.interactions.list) {
        const otherAction = interaction.prepared.name;

        if (!interaction.interacting()) {
          continue;
        }

        activeInteractions++;

        if (activeInteractions >= autoStartMax) {
          return false;
        }

        if (interaction.interactable !== interactable) {
          continue;
        }

        interactableCount += otherAction === action.name ? 1 : 0;

        if (interactableCount >= maxActions) {
          return false;
        }

        if (interaction.element === element) {
          elementCount++;

          if (otherAction === action.name && elementCount >= maxPerElement) {
            return false;
          }
        }
      }

      return autoStartMax > 0;
    }

    function maxInteractions(newValue, scope) {
      if (is.number(newValue)) {
        scope.autoStart.maxInteractions = newValue;
        return this;
      }

      return scope.autoStart.maxInteractions;
    }

    function setCursor(element, cursor, scope) {
      const {
        cursorElement: prevCursorElement
      } = scope.autoStart;

      if (prevCursorElement && prevCursorElement !== element) {
        prevCursorElement.style.cursor = '';
      }

      element.ownerDocument.documentElement.style.cursor = cursor;
      element.style.cursor = cursor;
      scope.autoStart.cursorElement = cursor ? element : null;
    }

    function setInteractionCursor(interaction, scope) {
      const {
        interactable,
        element,
        prepared
      } = interaction;

      if (!(interaction.pointerType === 'mouse' && interactable && interactable.options.styleCursor)) {
        // clear previous target element cursor
        if (scope.autoStart.cursorElement) {
          setCursor(scope.autoStart.cursorElement, '', scope);
        }

        return;
      }

      let cursor = '';

      if (prepared.name) {
        const cursorChecker = interactable.options[prepared.name].cursorChecker;

        if (is.func(cursorChecker)) {
          cursor = cursorChecker(prepared, interactable, element, interaction._interacting);
        } else {
          cursor = scope.actions.map[prepared.name].getCursor(prepared);
        }
      }

      setCursor(interaction.element, cursor || '', scope);
    }

    const autoStart = {
      id: 'auto-start/base',
      before: ['actions'],
      install: base_install,
      listeners: {
        'interactions:down': prepareOnDown,
        'interactions:move': (arg, scope) => {
          prepareOnMove(arg, scope);
          startOnMove(arg, scope);
        },
        'interactions:stop': clearCursorOnStop
      },
      maxInteractions,
      withinInteractionLimit,
      validateAction
    };
    /* harmony default export */

    var base = autoStart; // CONCATENATED MODULE: ./node_modules/@interactjs/auto-start/dragAxis.js

    function beforeStart({
      interaction,
      eventTarget,
      dx,
      dy
    }, scope) {
      if (interaction.prepared.name !== 'drag') {
        return;
      } // check if a drag is in the correct axis


      const absX = Math.abs(dx);
      const absY = Math.abs(dy);
      const targetOptions = interaction.interactable.options.drag;
      const startAxis = targetOptions.startAxis;
      const currentAxis = absX > absY ? 'x' : absX < absY ? 'y' : 'xy';
      interaction.prepared.axis = targetOptions.lockAxis === 'start' ? currentAxis[0] // always lock to one axis even if currentAxis === 'xy'
      : targetOptions.lockAxis; // if the movement isn't in the startAxis of the interactable

      if (currentAxis !== 'xy' && startAxis !== 'xy' && startAxis !== currentAxis) {
        // cancel the prepared action
        interaction.prepared.name = null; // then try to get a drag from another ineractable

        let element = eventTarget;

        const getDraggable = function (interactable) {
          if (interactable === interaction.interactable) {
            return;
          }

          const options = interaction.interactable.options.drag;

          if (!options.manualStart && interactable.testIgnoreAllow(options, element, eventTarget)) {
            const action = interactable.getAction(interaction.downPointer, interaction.downEvent, interaction, element);

            if (action && action.name === 'drag' && checkStartAxis(currentAxis, interactable) && base.validateAction(action, interactable, element, eventTarget, scope)) {
              return interactable;
            }
          }
        }; // check all interactables


        while (is.element(element)) {
          const interactable = scope.interactables.forEachMatch(element, getDraggable);

          if (interactable) {
            interaction.prepared.name = 'drag';
            interaction.interactable = interactable;
            interaction.element = element;
            break;
          }

          element = parentNode(element);
        }
      }
    }

    function checkStartAxis(startAxis, interactable) {
      if (!interactable) {
        return false;
      }

      const thisAxis = interactable.options.drag.startAxis;
      return startAxis === 'xy' || thisAxis === 'xy' || thisAxis === startAxis;
    }
    /* harmony default export */


    var dragAxis = {
      id: 'auto-start/dragAxis',
      listeners: {
        'autoStart:before-start': beforeStart
      }
    }; // CONCATENATED MODULE: ./node_modules/@interactjs/auto-start/hold.js

    function hold_install(scope) {
      const {
        defaults
      } = scope;
      scope.usePlugin(base);
      defaults.perAction.hold = 0;
      defaults.perAction.delay = 0;
    }

    function getHoldDuration(interaction) {
      const actionName = interaction.prepared && interaction.prepared.name;

      if (!actionName) {
        return null;
      }

      const options = interaction.interactable.options;
      return options[actionName].hold || options[actionName].delay;
    }

    const hold = {
      id: 'auto-start/hold',
      install: hold_install,
      listeners: {
        'interactions:new': ({
          interaction
        }) => {
          interaction.autoStartHoldTimer = null;
        },
        'autoStart:prepared': ({
          interaction
        }) => {
          const hold = getHoldDuration(interaction);

          if (hold > 0) {
            interaction.autoStartHoldTimer = setTimeout(() => {
              interaction.start(interaction.prepared, interaction.interactable, interaction.element);
            }, hold);
          }
        },
        'interactions:move': ({
          interaction,
          duplicate
        }) => {
          if (interaction.autoStartHoldTimer && interaction.pointerWasMoved && !duplicate) {
            clearTimeout(interaction.autoStartHoldTimer);
            interaction.autoStartHoldTimer = null;
          }
        },
        // prevent regular down->move autoStart
        'autoStart:before-start': ({
          interaction
        }) => {
          const holdDuration = getHoldDuration(interaction);

          if (holdDuration > 0) {
            interaction.prepared.name = null;
          }
        }
      },
      getHoldDuration
    };
    /* harmony default export */

    var auto_start_hold = hold; // CONCATENATED MODULE: ./node_modules/@interactjs/auto-start/plugin.js

    /* harmony default export */

    var auto_start_plugin = {
      id: 'auto-start',

      install(scope) {
        scope.usePlugin(base);
        scope.usePlugin(auto_start_hold);
        scope.usePlugin(dragAxis);
      }

    }; // CONCATENATED MODULE: ./node_modules/@interactjs/auto-start/index.js

    /* eslint-disable import/order, no-console, eol-last */

    if (typeof window === 'object' && !!window) {
      interact_init(window);
    }

    _interactjs_interact.use(auto_start_plugin); // CONCATENATED MODULE: ./node_modules/@interactjs/auto-scroll/plugin.js


    function plugin_install(scope) {
      const {
        defaults,
        actions
      } = scope;
      scope.autoScroll = autoScroll;

      autoScroll.now = () => scope.now();

      actions.phaselessTypes.autoscroll = true;
      defaults.perAction.autoScroll = autoScroll.defaults;
    }

    const autoScroll = {
      defaults: {
        enabled: false,
        margin: 60,
        // the item that is scrolled (Window or HTMLElement)
        container: null,
        // the scroll speed in pixels per second
        speed: 300
      },
      now: Date.now,
      interaction: null,
      i: 0,
      // the handle returned by window.setInterval
      // Direction each pulse is to scroll in
      x: 0,
      y: 0,
      isScrolling: false,
      prevTime: 0,
      margin: 0,
      speed: 0,

      start(interaction) {
        autoScroll.isScrolling = true;
        raf.cancel(autoScroll.i);
        interaction.autoScroll = autoScroll;
        autoScroll.interaction = interaction;
        autoScroll.prevTime = autoScroll.now();
        autoScroll.i = raf.request(autoScroll.scroll);
      },

      stop() {
        autoScroll.isScrolling = false;

        if (autoScroll.interaction) {
          autoScroll.interaction.autoScroll = null;
        }

        raf.cancel(autoScroll.i);
      },

      // scroll the window by the values in scroll.x/y
      scroll() {
        const {
          interaction
        } = autoScroll;
        const {
          interactable,
          element
        } = interaction;
        const actionName = interaction.prepared.name;
        const options = interactable.options[actionName].autoScroll;
        const container = getContainer(options.container, interactable, element);
        const now = autoScroll.now(); // change in time in seconds

        const dt = (now - autoScroll.prevTime) / 1000; // displacement

        const s = options.speed * dt;

        if (s >= 1) {
          const scrollBy = {
            x: autoScroll.x * s,
            y: autoScroll.y * s
          };

          if (scrollBy.x || scrollBy.y) {
            const prevScroll = getScroll(container);

            if (is.window(container)) {
              container.scrollBy(scrollBy.x, scrollBy.y);
            } else if (container) {
              container.scrollLeft += scrollBy.x;
              container.scrollTop += scrollBy.y;
            }

            const curScroll = getScroll(container);
            const delta = {
              x: curScroll.x - prevScroll.x,
              y: curScroll.y - prevScroll.y
            };

            if (delta.x || delta.y) {
              interactable.fire({
                type: 'autoscroll',
                target: element,
                interactable,
                delta,
                interaction,
                container
              });
            }
          }

          autoScroll.prevTime = now;
        }

        if (autoScroll.isScrolling) {
          raf.cancel(autoScroll.i);
          autoScroll.i = raf.request(autoScroll.scroll);
        }
      },

      check(interactable, actionName) {
        var _options$actionName$a;

        const options = interactable.options;
        return (_options$actionName$a = options[actionName].autoScroll) == null ? void 0 : _options$actionName$a.enabled;
      },

      onInteractionMove({
        interaction,
        pointer
      }) {
        if (!(interaction.interacting() && autoScroll.check(interaction.interactable, interaction.prepared.name))) {
          return;
        }

        if (interaction.simulation) {
          autoScroll.x = autoScroll.y = 0;
          return;
        }

        let top;
        let right;
        let bottom;
        let left;
        const {
          interactable,
          element
        } = interaction;
        const actionName = interaction.prepared.name;
        const options = interactable.options[actionName].autoScroll;
        const container = getContainer(options.container, interactable, element);

        if (is.window(container)) {
          left = pointer.clientX < autoScroll.margin;
          top = pointer.clientY < autoScroll.margin;
          right = pointer.clientX > container.innerWidth - autoScroll.margin;
          bottom = pointer.clientY > container.innerHeight - autoScroll.margin;
        } else {
          const rect = getElementClientRect(container);
          left = pointer.clientX < rect.left + autoScroll.margin;
          top = pointer.clientY < rect.top + autoScroll.margin;
          right = pointer.clientX > rect.right - autoScroll.margin;
          bottom = pointer.clientY > rect.bottom - autoScroll.margin;
        }

        autoScroll.x = right ? 1 : left ? -1 : 0;
        autoScroll.y = bottom ? 1 : top ? -1 : 0;

        if (!autoScroll.isScrolling) {
          // set the autoScroll properties to those of the target
          autoScroll.margin = options.margin;
          autoScroll.speed = options.speed;
          autoScroll.start(interaction);
        }
      }

    };

    function getContainer(value, interactable, element) {
      return (is.string(value) ? getStringOptionResult(value, interactable, element) : value) || getWindow(element);
    }

    function getScroll(container) {
      if (is.window(container)) {
        container = window.document.body;
      }

      return {
        x: container.scrollLeft,
        y: container.scrollTop
      };
    }

    function getScrollSize(container) {
      if (is.window(container)) {
        container = window.document.body;
      }

      return {
        x: container.scrollWidth,
        y: container.scrollHeight
      };
    }

    function getScrollSizeDelta({
      interaction,
      element
    }, func) {
      const scrollOptions = interaction && interaction.interactable.options[interaction.prepared.name].autoScroll;

      if (!scrollOptions || !scrollOptions.enabled) {
        func();
        return {
          x: 0,
          y: 0
        };
      }

      const scrollContainer = getContainer(scrollOptions.container, interaction.interactable, element);
      const prevSize = getScroll(scrollContainer);
      func();
      const curSize = getScroll(scrollContainer);
      return {
        x: curSize.x - prevSize.x,
        y: curSize.y - prevSize.y
      };
    }

    const autoScrollPlugin = {
      id: 'auto-scroll',
      install: plugin_install,
      listeners: {
        'interactions:new': ({
          interaction
        }) => {
          interaction.autoScroll = null;
        },
        'interactions:destroy': ({
          interaction
        }) => {
          interaction.autoScroll = null;
          autoScroll.stop();

          if (autoScroll.interaction) {
            autoScroll.interaction = null;
          }
        },
        'interactions:stop': autoScroll.stop,
        'interactions:action-move': arg => autoScroll.onInteractionMove(arg)
      }
    };
    /* harmony default export */

    var auto_scroll_plugin = autoScrollPlugin; // CONCATENATED MODULE: ./node_modules/@interactjs/auto-scroll/index.js

    /* eslint-disable import/order, no-console, eol-last */

    if (typeof window === 'object' && !!window) {
      interact_init(window);
    }

    _interactjs_interact.use(auto_scroll_plugin); // CONCATENATED MODULE: ./node_modules/@interactjs/actions/drag/plugin.js


    function drag_plugin_install(scope) {
      const {
        actions,
        Interactable,
        defaults
      } = scope;
      Interactable.prototype.draggable = drag.draggable;
      actions.map.drag = drag;
      actions.methodDict.drag = 'draggable';
      defaults.actions.drag = drag.defaults;
    }

    function beforeMove({
      interaction
    }) {
      if (interaction.prepared.name !== 'drag') {
        return;
      }

      const axis = interaction.prepared.axis;

      if (axis === 'x') {
        interaction.coords.cur.page.y = interaction.coords.start.page.y;
        interaction.coords.cur.client.y = interaction.coords.start.client.y;
        interaction.coords.velocity.client.y = 0;
        interaction.coords.velocity.page.y = 0;
      } else if (axis === 'y') {
        interaction.coords.cur.page.x = interaction.coords.start.page.x;
        interaction.coords.cur.client.x = interaction.coords.start.client.x;
        interaction.coords.velocity.client.x = 0;
        interaction.coords.velocity.page.x = 0;
      }
    }

    function move({
      iEvent,
      interaction
    }) {
      if (interaction.prepared.name !== 'drag') {
        return;
      }

      const axis = interaction.prepared.axis;

      if (axis === 'x' || axis === 'y') {
        const opposite = axis === 'x' ? 'y' : 'x';
        iEvent.page[opposite] = interaction.coords.start.page[opposite];
        iEvent.client[opposite] = interaction.coords.start.client[opposite];
        iEvent.delta[opposite] = 0;
      }
    }
    /**
     * ```js
     * interact(element).draggable({
     *     onstart: function (event) {},
     *     onmove : function (event) {},
     *     onend  : function (event) {},
     *
     *     // the axis in which the first movement must be
     *     // for the drag sequence to start
     *     // 'xy' by default - any direction
     *     startAxis: 'x' || 'y' || 'xy',
     *
     *     // 'xy' by default - don't restrict to one axis (move in any direction)
     *     // 'x' or 'y' to restrict movement to either axis
     *     // 'start' to restrict movement to the axis the drag started in
     *     lockAxis: 'x' || 'y' || 'xy' || 'start',
     *
     *     // max number of drags that can happen concurrently
     *     // with elements of this Interactable. Infinity by default
     *     max: Infinity,
     *
     *     // max number of drags that can target the same element+Interactable
     *     // 1 by default
     *     maxPerElement: 2
     * })
     *
     * var isDraggable = interact('element').draggable(); // true
     * ```
     *
     * Get or set whether drag actions can be performed on the target
     *
     * @alias Interactable.prototype.draggable
     *
     * @param {boolean | object} [options] true/false or An object with event
     * listeners to be fired on drag events (object makes the Interactable
     * draggable)
     * @return {boolean | Interactable} boolean indicating if this can be the
     * target of drag events, or this Interctable
     */


    const plugin_draggable = function draggable(options) {
      if (is.object(options)) {
        this.options.drag.enabled = options.enabled !== false;
        this.setPerAction('drag', options);
        this.setOnEvents('drag', options);

        if (/^(xy|x|y|start)$/.test(options.lockAxis)) {
          this.options.drag.lockAxis = options.lockAxis;
        }

        if (/^(xy|x|y)$/.test(options.startAxis)) {
          this.options.drag.startAxis = options.startAxis;
        }

        return this;
      }

      if (is.bool(options)) {
        this.options.drag.enabled = options;
        return this;
      }

      return this.options.drag;
    };

    const drag = {
      id: 'actions/drag',
      install: drag_plugin_install,
      listeners: {
        'interactions:before-action-move': beforeMove,
        'interactions:action-resume': beforeMove,
        // dragmove
        'interactions:action-move': move,
        'auto-start:check': arg => {
          const {
            interaction,
            interactable,
            buttons
          } = arg;
          const dragOptions = interactable.options.drag;

          if (!(dragOptions && dragOptions.enabled) || // check mouseButton setting if the pointer is down
          interaction.pointerIsDown && /mouse|pointer/.test(interaction.pointerType) && (buttons & interactable.options.drag.mouseButtons) === 0) {
            return undefined;
          }

          arg.action = {
            name: 'drag',
            axis: dragOptions.lockAxis === 'start' ? dragOptions.startAxis : dragOptions.lockAxis
          };
          return false;
        }
      },
      draggable: plugin_draggable,
      beforeMove,
      move,
      defaults: {
        startAxis: 'xy',
        lockAxis: 'xy'
      },

      getCursor() {
        return 'move';
      }

    };
    /* harmony default export */

    var drag_plugin = drag; // CONCATENATED MODULE: ./node_modules/@interactjs/actions/drag/index.js

    /* eslint-disable import/order, no-console, eol-last */

    if (typeof window === 'object' && !!window) {
      interact_init(window);
    }

    _interactjs_interact.use(drag_plugin); // CONCATENATED MODULE: ./node_modules/@interactjs/actions/resize/plugin.js


    function resize_plugin_install(scope) {
      const {
        actions,
        browser,

        /** @lends Interactable */
        Interactable,
        // tslint:disable-line no-shadowed-variable
        defaults
      } = scope; // Less Precision with touch input

      resize.cursors = initCursors(browser);
      resize.defaultMargin = browser.supportsTouch || browser.supportsPointerEvent ? 20 : 10;
      /**
       * ```js
       * interact(element).resizable({
       *   onstart: function (event) {},
       *   onmove : function (event) {},
       *   onend  : function (event) {},
       *
       *   edges: {
       *     top   : true,       // Use pointer coords to check for resize.
       *     left  : false,      // Disable resizing from left edge.
       *     bottom: '.resize-s',// Resize if pointer target matches selector
       *     right : handleEl    // Resize if pointer target is the given Element
       *   },
       *
       *     // Width and height can be adjusted independently. When `true`, width and
       *     // height are adjusted at a 1:1 ratio.
       *     square: false,
       *
       *     // Width and height can be adjusted independently. When `true`, width and
       *     // height maintain the aspect ratio they had when resizing started.
       *     preserveAspectRatio: false,
       *
       *   // a value of 'none' will limit the resize rect to a minimum of 0x0
       *   // 'negate' will allow the rect to have negative width/height
       *   // 'reposition' will keep the width/height positive by swapping
       *   // the top and bottom edges and/or swapping the left and right edges
       *   invert: 'none' || 'negate' || 'reposition'
       *
       *   // limit multiple resizes.
       *   // See the explanation in the {@link Interactable.draggable} example
       *   max: Infinity,
       *   maxPerElement: 1,
       * })
       *
       * var isResizeable = interact(element).resizable()
       * ```
       *
       * Gets or sets whether resize actions can be performed on the target
       *
       * @param {boolean | object} [options] true/false or An object with event
       * listeners to be fired on resize events (object makes the Interactable
       * resizable)
       * @return {boolean | Interactable} A boolean indicating if this can be the
       * target of resize elements, or this Interactable
       */

      Interactable.prototype.resizable = function (options) {
        return resizable(this, options, scope);
      };

      actions.map.resize = resize;
      actions.methodDict.resize = 'resizable';
      defaults.actions.resize = resize.defaults;
    }

    function resizeChecker(arg) {
      const {
        interaction,
        interactable,
        element,
        rect,
        buttons
      } = arg;

      if (!rect) {
        return undefined;
      }

      const page = extend({}, interaction.coords.cur.page);
      const resizeOptions = interactable.options.resize;

      if (!(resizeOptions && resizeOptions.enabled) || // check mouseButton setting if the pointer is down
      interaction.pointerIsDown && /mouse|pointer/.test(interaction.pointerType) && (buttons & resizeOptions.mouseButtons) === 0) {
        return undefined;
      } // if using resize.edges


      if (is.object(resizeOptions.edges)) {
        const resizeEdges = {
          left: false,
          right: false,
          top: false,
          bottom: false
        };

        for (const edge in resizeEdges) {
          resizeEdges[edge] = checkResizeEdge(edge, resizeOptions.edges[edge], page, interaction._latestPointer.eventTarget, element, rect, resizeOptions.margin || resize.defaultMargin);
        }

        resizeEdges.left = resizeEdges.left && !resizeEdges.right;
        resizeEdges.top = resizeEdges.top && !resizeEdges.bottom;

        if (resizeEdges.left || resizeEdges.right || resizeEdges.top || resizeEdges.bottom) {
          arg.action = {
            name: 'resize',
            edges: resizeEdges
          };
        }
      } else {
        const right = resizeOptions.axis !== 'y' && page.x > rect.right - resize.defaultMargin;
        const bottom = resizeOptions.axis !== 'x' && page.y > rect.bottom - resize.defaultMargin;

        if (right || bottom) {
          arg.action = {
            name: 'resize',
            axes: (right ? 'x' : '') + (bottom ? 'y' : '')
          };
        }
      }

      return arg.action ? false : undefined;
    }

    function resizable(interactable, options, scope) {
      if (is.object(options)) {
        interactable.options.resize.enabled = options.enabled !== false;
        interactable.setPerAction('resize', options);
        interactable.setOnEvents('resize', options);

        if (is.string(options.axis) && /^x$|^y$|^xy$/.test(options.axis)) {
          interactable.options.resize.axis = options.axis;
        } else if (options.axis === null) {
          interactable.options.resize.axis = scope.defaults.actions.resize.axis;
        }

        if (is.bool(options.preserveAspectRatio)) {
          interactable.options.resize.preserveAspectRatio = options.preserveAspectRatio;
        } else if (is.bool(options.square)) {
          interactable.options.resize.square = options.square;
        }

        return interactable;
      }

      if (is.bool(options)) {
        interactable.options.resize.enabled = options;
        return interactable;
      }

      return interactable.options.resize;
    }

    function checkResizeEdge(name, value, page, element, interactableElement, rect, margin) {
      // false, '', undefined, null
      if (!value) {
        return false;
      } // true value, use pointer coords and element rect


      if (value === true) {
        // if dimensions are negative, "switch" edges
        const width = is.number(rect.width) ? rect.width : rect.right - rect.left;
        const height = is.number(rect.height) ? rect.height : rect.bottom - rect.top; // don't use margin greater than half the relevent dimension

        margin = Math.min(margin, Math.abs((name === 'left' || name === 'right' ? width : height) / 2));

        if (width < 0) {
          if (name === 'left') {
            name = 'right';
          } else if (name === 'right') {
            name = 'left';
          }
        }

        if (height < 0) {
          if (name === 'top') {
            name = 'bottom';
          } else if (name === 'bottom') {
            name = 'top';
          }
        }

        if (name === 'left') {
          return page.x < (width >= 0 ? rect.left : rect.right) + margin;
        }

        if (name === 'top') {
          return page.y < (height >= 0 ? rect.top : rect.bottom) + margin;
        }

        if (name === 'right') {
          return page.x > (width >= 0 ? rect.right : rect.left) - margin;
        }

        if (name === 'bottom') {
          return page.y > (height >= 0 ? rect.bottom : rect.top) - margin;
        }
      } // the remaining checks require an element


      if (!is.element(element)) {
        return false;
      }

      return is.element(value) // the value is an element to use as a resize handle
      ? value === element // otherwise check if element matches value as selector
      : matchesUpTo(element, value, interactableElement);
    }
    /* eslint-disable multiline-ternary */


    function initCursors(browser) {
      return browser.isIe9 ? {
        x: 'e-resize',
        y: 's-resize',
        xy: 'se-resize',
        top: 'n-resize',
        left: 'w-resize',
        bottom: 's-resize',
        right: 'e-resize',
        topleft: 'se-resize',
        bottomright: 'se-resize',
        topright: 'ne-resize',
        bottomleft: 'ne-resize'
      } : {
        x: 'ew-resize',
        y: 'ns-resize',
        xy: 'nwse-resize',
        top: 'ns-resize',
        left: 'ew-resize',
        bottom: 'ns-resize',
        right: 'ew-resize',
        topleft: 'nwse-resize',
        bottomright: 'nwse-resize',
        topright: 'nesw-resize',
        bottomleft: 'nesw-resize'
      };
    }
    /* eslint-enable multiline-ternary */


    function start({
      iEvent,
      interaction
    }) {
      if (interaction.prepared.name !== 'resize' || !interaction.prepared.edges) {
        return;
      }

      const resizeEvent = iEvent;
      const rect = interaction.rect;
      interaction._rects = {
        start: extend({}, rect),
        corrected: extend({}, rect),
        previous: extend({}, rect),
        delta: {
          left: 0,
          right: 0,
          width: 0,
          top: 0,
          bottom: 0,
          height: 0
        }
      };
      resizeEvent.edges = interaction.prepared.edges;
      resizeEvent.rect = interaction._rects.corrected;
      resizeEvent.deltaRect = interaction._rects.delta;
    }

    function plugin_move({
      iEvent,
      interaction
    }) {
      if (interaction.prepared.name !== 'resize' || !interaction.prepared.edges) {
        return;
      }

      const resizeEvent = iEvent;
      const resizeOptions = interaction.interactable.options.resize;
      const invert = resizeOptions.invert;
      const invertible = invert === 'reposition' || invert === 'negate';
      const current = interaction.rect;
      const {
        start: startRect,
        corrected,
        delta: deltaRect,
        previous
      } = interaction._rects;
      extend(previous, corrected);

      if (invertible) {
        // if invertible, copy the current rect
        extend(corrected, current);

        if (invert === 'reposition') {
          // swap edge values if necessary to keep width/height positive
          if (corrected.top > corrected.bottom) {
            const swap = corrected.top;
            corrected.top = corrected.bottom;
            corrected.bottom = swap;
          }

          if (corrected.left > corrected.right) {
            const swap = corrected.left;
            corrected.left = corrected.right;
            corrected.right = swap;
          }
        }
      } else {
        // if not invertible, restrict to minimum of 0x0 rect
        corrected.top = Math.min(current.top, startRect.bottom);
        corrected.bottom = Math.max(current.bottom, startRect.top);
        corrected.left = Math.min(current.left, startRect.right);
        corrected.right = Math.max(current.right, startRect.left);
      }

      corrected.width = corrected.right - corrected.left;
      corrected.height = corrected.bottom - corrected.top;

      for (const edge in corrected) {
        deltaRect[edge] = corrected[edge] - previous[edge];
      }

      resizeEvent.edges = interaction.prepared.edges;
      resizeEvent.rect = corrected;
      resizeEvent.deltaRect = deltaRect;
    }

    function end({
      iEvent,
      interaction
    }) {
      if (interaction.prepared.name !== 'resize' || !interaction.prepared.edges) {
        return;
      }

      const resizeEvent = iEvent;
      resizeEvent.edges = interaction.prepared.edges;
      resizeEvent.rect = interaction._rects.corrected;
      resizeEvent.deltaRect = interaction._rects.delta;
    }

    function updateEventAxes({
      iEvent,
      interaction
    }) {
      if (interaction.prepared.name !== 'resize' || !interaction.resizeAxes) {
        return;
      }

      const options = interaction.interactable.options;
      const resizeEvent = iEvent;

      if (options.resize.square) {
        if (interaction.resizeAxes === 'y') {
          resizeEvent.delta.x = resizeEvent.delta.y;
        } else {
          resizeEvent.delta.y = resizeEvent.delta.x;
        }

        resizeEvent.axes = 'xy';
      } else {
        resizeEvent.axes = interaction.resizeAxes;

        if (interaction.resizeAxes === 'x') {
          resizeEvent.delta.y = 0;
        } else if (interaction.resizeAxes === 'y') {
          resizeEvent.delta.x = 0;
        }
      }
    }

    const resize = {
      id: 'actions/resize',
      before: ['actions/drag'],
      install: resize_plugin_install,
      listeners: {
        'interactions:new': ({
          interaction
        }) => {
          interaction.resizeAxes = 'xy';
        },
        'interactions:action-start': arg => {
          start(arg);
          updateEventAxes(arg);
        },
        'interactions:action-move': arg => {
          plugin_move(arg);
          updateEventAxes(arg);
        },
        'interactions:action-end': end,
        'auto-start:check': resizeChecker
      },
      defaults: {
        square: false,
        preserveAspectRatio: false,
        axis: 'xy',
        // use default margin
        margin: NaN,
        // object with props left, right, top, bottom which are
        // true/false values to resize when the pointer is over that edge,
        // CSS selectors to match the handles for each direction
        // or the Elements for each handle
        edges: null,
        // a value of 'none' will limit the resize rect to a minimum of 0x0
        // 'negate' will alow the rect to have negative width/height
        // 'reposition' will keep the width/height positive by swapping
        // the top and bottom edges and/or swapping the left and right edges
        invert: 'none'
      },
      cursors: null,

      getCursor({
        edges,
        axis,
        name
      }) {
        const cursors = resize.cursors;
        let result = null;

        if (axis) {
          result = cursors[name + axis];
        } else if (edges) {
          let cursorKey = '';

          for (const edge of ['top', 'bottom', 'left', 'right']) {
            if (edges[edge]) {
              cursorKey += edge;
            }
          }

          result = cursors[cursorKey];
        }

        return result;
      },

      defaultMargin: null
    };
    /* harmony default export */

    var resize_plugin = resize; // CONCATENATED MODULE: ./node_modules/@interactjs/actions/resize/index.js

    /* eslint-disable import/order, no-console, eol-last */

    if (typeof window === 'object' && !!window) {
      interact_init(window);
    }

    _interactjs_interact.use(resize_plugin); // CONCATENATED MODULE: ./node_modules/@interactjs/snappers/edgeTarget.js

    /* harmony default export */


    var edgeTarget = () => {}; // CONCATENATED MODULE: ./node_modules/@interactjs/snappers/elements.js

    /* harmony default export */


    var snappers_elements = () => {}; // CONCATENATED MODULE: ./node_modules/@interactjs/snappers/grid.js

    /* harmony default export */


    var grid = grid => {
      const coordFields = [['x', 'y'], ['left', 'top'], ['right', 'bottom'], ['width', 'height']].filter(([xField, yField]) => xField in grid || yField in grid);

      const gridFunc = (x, y) => {
        const {
          range,
          limits = {
            left: -Infinity,
            right: Infinity,
            top: -Infinity,
            bottom: Infinity
          },
          offset = {
            x: 0,
            y: 0
          }
        } = grid;
        const result = {
          range,
          grid,
          x: null,
          y: null
        };

        for (const [xField, yField] of coordFields) {
          const gridx = Math.round((x - offset.x) / grid[xField]);
          const gridy = Math.round((y - offset.y) / grid[yField]);
          result[xField] = Math.max(limits.left, Math.min(limits.right, gridx * grid[xField] + offset.x));
          result[yField] = Math.max(limits.top, Math.min(limits.bottom, gridy * grid[yField] + offset.y));
        }

        return result;
      };

      gridFunc.grid = grid;
      gridFunc.coordFields = coordFields;
      return gridFunc;
    }; // CONCATENATED MODULE: ./node_modules/@interactjs/snappers/all.js
    // CONCATENATED MODULE: ./node_modules/@interactjs/snappers/plugin.js


    const snappersPlugin = {
      id: 'snappers',

      install(scope) {
        const {
          interactStatic: interact
        } = scope;
        interact.snappers = extend(interact.snappers || {}, all_namespaceObject);
        interact.createSnapGrid = interact.snappers.grid;
      }

    };
    /* harmony default export */

    var snappers_plugin = snappersPlugin; // CONCATENATED MODULE: ./node_modules/@interactjs/modifiers/Modification.js

    class Modification_Modification {
      constructor(interaction) {
        this.states = [];
        this.startOffset = {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        };
        this.startDelta = null;
        this.result = null;
        this.endResult = null;
        this.edges = void 0;
        this.interaction = void 0;
        this.interaction = interaction;
        this.result = createResult();
      }

      start({
        phase
      }, pageCoords) {
        const {
          interaction
        } = this;
        const modifierList = getModifierList(interaction);
        this.prepareStates(modifierList);
        this.edges = extend({}, interaction.edges);
        this.startOffset = getRectOffset(interaction.rect, pageCoords);
        this.startDelta = {
          x: 0,
          y: 0
        };
        const arg = {
          phase,
          pageCoords,
          preEnd: false
        };
        this.result = createResult();
        this.startAll(arg);
        const result = this.result = this.setAll(arg);
        return result;
      }

      fillArg(arg) {
        const {
          interaction
        } = this;
        arg.interaction = interaction;
        arg.interactable = interaction.interactable;
        arg.element = interaction.element;
        arg.rect = arg.rect || interaction.rect;
        arg.edges = this.edges;
        arg.startOffset = this.startOffset;
      }

      startAll(arg) {
        this.fillArg(arg);

        for (const state of this.states) {
          if (state.methods.start) {
            arg.state = state;
            state.methods.start(arg);
          }
        }
      }

      setAll(arg) {
        this.fillArg(arg);
        const {
          phase,
          preEnd,
          skipModifiers,
          rect: unmodifiedRect
        } = arg;
        arg.coords = extend({}, arg.pageCoords);
        arg.rect = extend({}, unmodifiedRect);
        const states = skipModifiers ? this.states.slice(skipModifiers) : this.states;
        const newResult = createResult(arg.coords, arg.rect);

        for (const state of states) {
          const {
            options
          } = state;
          const lastModifierCoords = extend({}, arg.coords);
          let returnValue = null;

          if (state.methods.set && this.shouldDo(options, preEnd, phase)) {
            arg.state = state;
            returnValue = state.methods.set(arg);
            addEdges(this.interaction.edges, arg.rect, {
              x: arg.coords.x - lastModifierCoords.x,
              y: arg.coords.y - lastModifierCoords.y
            });
          }

          newResult.eventProps.push(returnValue);
        }

        newResult.delta.x = arg.coords.x - arg.pageCoords.x;
        newResult.delta.y = arg.coords.y - arg.pageCoords.y;
        newResult.rectDelta.left = arg.rect.left - unmodifiedRect.left;
        newResult.rectDelta.right = arg.rect.right - unmodifiedRect.right;
        newResult.rectDelta.top = arg.rect.top - unmodifiedRect.top;
        newResult.rectDelta.bottom = arg.rect.bottom - unmodifiedRect.bottom;
        const prevCoords = this.result.coords;
        const prevRect = this.result.rect;

        if (prevCoords && prevRect) {
          const rectChanged = newResult.rect.left !== prevRect.left || newResult.rect.right !== prevRect.right || newResult.rect.top !== prevRect.top || newResult.rect.bottom !== prevRect.bottom;
          newResult.changed = rectChanged || prevCoords.x !== newResult.coords.x || prevCoords.y !== newResult.coords.y;
        }

        return newResult;
      }

      applyToInteraction(arg) {
        const {
          interaction
        } = this;
        const {
          phase
        } = arg;
        const curCoords = interaction.coords.cur;
        const startCoords = interaction.coords.start;
        const {
          result,
          startDelta
        } = this;
        const curDelta = result.delta;

        if (phase === 'start') {
          extend(this.startDelta, result.delta);
        }

        for (const [coordsSet, delta] of [[startCoords, startDelta], [curCoords, curDelta]]) {
          coordsSet.page.x += delta.x;
          coordsSet.page.y += delta.y;
          coordsSet.client.x += delta.x;
          coordsSet.client.y += delta.y;
        }

        const {
          rectDelta
        } = this.result;
        const rect = arg.rect || interaction.rect;
        rect.left += rectDelta.left;
        rect.right += rectDelta.right;
        rect.top += rectDelta.top;
        rect.bottom += rectDelta.bottom;
        rect.width = rect.right - rect.left;
        rect.height = rect.bottom - rect.top;
      }

      setAndApply(arg) {
        const {
          interaction
        } = this;
        const {
          phase,
          preEnd,
          skipModifiers
        } = arg;
        const result = this.setAll({
          preEnd,
          phase,
          pageCoords: arg.modifiedCoords || interaction.coords.cur.page
        });
        this.result = result; // don't fire an action move if a modifier would keep the event in the same
        // cordinates as before

        if (!result.changed && (!skipModifiers || skipModifiers < this.states.length) && interaction.interacting()) {
          return false;
        }

        if (arg.modifiedCoords) {
          const {
            page
          } = interaction.coords.cur;
          const adjustment = {
            x: arg.modifiedCoords.x - page.x,
            y: arg.modifiedCoords.y - page.y
          };
          result.coords.x += adjustment.x;
          result.coords.y += adjustment.y;
          result.delta.x += adjustment.x;
          result.delta.y += adjustment.y;
        }

        this.applyToInteraction(arg);
      }

      beforeEnd(arg) {
        const {
          interaction,
          event
        } = arg;
        const states = this.states;

        if (!states || !states.length) {
          return;
        }

        let doPreend = false;

        for (const state of states) {
          arg.state = state;
          const {
            options,
            methods
          } = state;
          const endPosition = methods.beforeEnd && methods.beforeEnd(arg);

          if (endPosition) {
            this.endResult = endPosition;
            return false;
          }

          doPreend = doPreend || !doPreend && this.shouldDo(options, true, arg.phase, true);
        }

        if (doPreend) {
          // trigger a final modified move before ending
          interaction.move({
            event,
            preEnd: true
          });
        }
      }

      stop(arg) {
        const {
          interaction
        } = arg;

        if (!this.states || !this.states.length) {
          return;
        }

        const modifierArg = extend({
          states: this.states,
          interactable: interaction.interactable,
          element: interaction.element,
          rect: null
        }, arg);
        this.fillArg(modifierArg);

        for (const state of this.states) {
          modifierArg.state = state;

          if (state.methods.stop) {
            state.methods.stop(modifierArg);
          }
        }

        this.states = null;
        this.endResult = null;
      }

      prepareStates(modifierList) {
        this.states = [];

        for (let index = 0; index < modifierList.length; index++) {
          const {
            options,
            methods,
            name
          } = modifierList[index];
          this.states.push({
            options,
            methods,
            index,
            name
          });
        }

        return this.states;
      }

      restoreInteractionCoords({
        interaction: {
          coords,
          rect,
          modification
        }
      }) {
        if (!modification.result) {
          return;
        }

        const {
          startDelta
        } = modification;
        const {
          delta: curDelta,
          rectDelta
        } = modification.result;
        const coordsAndDeltas = [[coords.start, startDelta], [coords.cur, curDelta]];

        for (const [coordsSet, delta] of coordsAndDeltas) {
          coordsSet.page.x -= delta.x;
          coordsSet.page.y -= delta.y;
          coordsSet.client.x -= delta.x;
          coordsSet.client.y -= delta.y;
        }

        rect.left -= rectDelta.left;
        rect.right -= rectDelta.right;
        rect.top -= rectDelta.top;
        rect.bottom -= rectDelta.bottom;
      }

      shouldDo(options, preEnd, phase, requireEndOnly) {
        if ( // ignore disabled modifiers
        !options || options.enabled === false || // check if we require endOnly option to fire move before end
        requireEndOnly && !options.endOnly || // don't apply endOnly modifiers when not ending
        options.endOnly && !preEnd || // check if modifier should run be applied on start
        phase === 'start' && !options.setStart) {
          return false;
        }

        return true;
      }

      copyFrom(other) {
        this.startOffset = other.startOffset;
        this.startDelta = other.startDelta;
        this.edges = other.edges;
        this.states = other.states.map(s => clone(s));
        this.result = createResult(extend({}, other.result.coords), extend({}, other.result.rect));
      }

      destroy() {
        for (const prop in this) {
          this[prop] = null;
        }
      }

    }

    function createResult(coords, rect) {
      return {
        rect,
        coords,
        delta: {
          x: 0,
          y: 0
        },
        rectDelta: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        },
        eventProps: [],
        changed: true
      };
    }

    function getModifierList(interaction) {
      const actionOptions = interaction.interactable.options[interaction.prepared.name];
      const actionModifiers = actionOptions.modifiers;

      if (actionModifiers && actionModifiers.length) {
        return actionModifiers;
      }

      return ['snap', 'snapSize', 'snapEdges', 'restrict', 'restrictEdges', 'restrictSize'].map(type => {
        const options = actionOptions[type];
        return options && options.enabled && {
          options,
          methods: options._methods
        };
      }).filter(m => !!m);
    }

    function getRectOffset(rect, coords) {
      return rect ? {
        left: coords.x - rect.left,
        top: coords.y - rect.top,
        right: rect.right - coords.x,
        bottom: rect.bottom - coords.y
      } : {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      };
    } // CONCATENATED MODULE: ./node_modules/@interactjs/modifiers/base.js


    function makeModifier(module, name) {
      const {
        defaults
      } = module;
      const methods = {
        start: module.start,
        set: module.set,
        beforeEnd: module.beforeEnd,
        stop: module.stop
      };

      const modifier = _options => {
        const options = _options || {};
        options.enabled = options.enabled !== false; // add missing defaults to options

        for (const prop in defaults) {
          if (!(prop in options)) {
            options[prop] = defaults[prop];
          }
        }

        const m = {
          options,
          methods,
          name,
          enable: () => {
            options.enabled = true;
            return m;
          },
          disable: () => {
            options.enabled = false;
            return m;
          }
        };
        return m;
      };

      if (name && typeof name === 'string') {
        // for backwrads compatibility
        modifier._defaults = defaults;
        modifier._methods = methods;
      }

      return modifier;
    }

    function addEventModifiers({
      iEvent,
      interaction: {
        modification: {
          result
        }
      }
    }) {
      if (result) {
        iEvent.modifiers = result.eventProps;
      }
    }

    const modifiersBase = {
      id: 'modifiers/base',
      before: ['actions'],
      install: scope => {
        scope.defaults.perAction.modifiers = [];
      },
      listeners: {
        'interactions:new': ({
          interaction
        }) => {
          interaction.modification = new Modification_Modification(interaction);
        },
        'interactions:before-action-start': arg => {
          const {
            modification
          } = arg.interaction;
          modification.start(arg, arg.interaction.coords.start.page);
          arg.interaction.edges = modification.edges;
          modification.applyToInteraction(arg);
        },
        'interactions:before-action-move': arg => arg.interaction.modification.setAndApply(arg),
        'interactions:before-action-end': arg => arg.interaction.modification.beforeEnd(arg),
        'interactions:action-start': addEventModifiers,
        'interactions:action-move': addEventModifiers,
        'interactions:action-end': addEventModifiers,
        'interactions:after-action-start': arg => arg.interaction.modification.restoreInteractionCoords(arg),
        'interactions:after-action-move': arg => arg.interaction.modification.restoreInteractionCoords(arg),
        'interactions:stop': arg => arg.interaction.modification.stop(arg)
      }
    };
    /* harmony default export */

    var modifiers_base = modifiersBase; // CONCATENATED MODULE: ./node_modules/@interactjs/modifiers/aspectRatio.js

    /**
     * @module modifiers/aspectRatio
     *
     * @description
     * This module forces elements to be resized with a specified dx/dy ratio.
     *
     * ```js
     * interact(target).resizable({
     *   modifiers: [
     *     interact.modifiers.snapSize({
     *       targets: [ interact.snappers.grid({ x: 20, y: 20 }) ],
     *     }),
     *     interact.aspectRatio({ ratio: 'preserve' }),
     *   ],
     * });
     * ```
     */

    const aspectRatio = {
      start(arg) {
        const {
          state,
          rect,
          edges: originalEdges,
          pageCoords: coords
        } = arg;
        let {
          ratio
        } = state.options;
        const {
          equalDelta,
          modifiers
        } = state.options;

        if (ratio === 'preserve') {
          ratio = rect.width / rect.height;
        }

        state.startCoords = extend({}, coords);
        state.startRect = extend({}, rect);
        state.ratio = ratio;
        state.equalDelta = equalDelta;
        const linkedEdges = state.linkedEdges = {
          top: originalEdges.top || originalEdges.left && !originalEdges.bottom,
          left: originalEdges.left || originalEdges.top && !originalEdges.right,
          bottom: originalEdges.bottom || originalEdges.right && !originalEdges.top,
          right: originalEdges.right || originalEdges.bottom && !originalEdges.left
        };
        state.xIsPrimaryAxis = !!(originalEdges.left || originalEdges.right);

        if (state.equalDelta) {
          state.edgeSign = (linkedEdges.left ? 1 : -1) * (linkedEdges.top ? 1 : -1);
        } else {
          const negativeSecondaryEdge = state.xIsPrimaryAxis ? linkedEdges.top : linkedEdges.left;
          state.edgeSign = negativeSecondaryEdge ? -1 : 1;
        }

        extend(arg.edges, linkedEdges);

        if (!modifiers || !modifiers.length) {
          return;
        }

        const subModification = new Modification_Modification(arg.interaction);
        subModification.copyFrom(arg.interaction.modification);
        subModification.prepareStates(modifiers);
        state.subModification = subModification;
        subModification.startAll({ ...arg
        });
      },

      set(arg) {
        const {
          state,
          rect,
          coords
        } = arg;
        const initialCoords = extend({}, coords);
        const aspectMethod = state.equalDelta ? setEqualDelta : setRatio;
        aspectMethod(state, state.xIsPrimaryAxis, coords, rect);

        if (!state.subModification) {
          return null;
        }

        const correctedRect = extend({}, rect);
        addEdges(state.linkedEdges, correctedRect, {
          x: coords.x - initialCoords.x,
          y: coords.y - initialCoords.y
        });
        const result = state.subModification.setAll({ ...arg,
          rect: correctedRect,
          edges: state.linkedEdges,
          pageCoords: coords,
          prevCoords: coords,
          prevRect: correctedRect
        });
        const {
          delta
        } = result;

        if (result.changed) {
          const xIsCriticalAxis = Math.abs(delta.x) > Math.abs(delta.y); // do aspect modification again with critical edge axis as primary

          aspectMethod(state, xIsCriticalAxis, result.coords, result.rect);
          extend(coords, result.coords);
        }

        return result.eventProps;
      },

      defaults: {
        ratio: 'preserve',
        equalDelta: false,
        modifiers: [],
        enabled: false
      }
    };

    function setEqualDelta({
      startCoords,
      edgeSign
    }, xIsPrimaryAxis, coords) {
      if (xIsPrimaryAxis) {
        coords.y = startCoords.y + (coords.x - startCoords.x) * edgeSign;
      } else {
        coords.x = startCoords.x + (coords.y - startCoords.y) * edgeSign;
      }
    }

    function setRatio({
      startRect,
      startCoords,
      ratio,
      edgeSign
    }, xIsPrimaryAxis, coords, rect) {
      if (xIsPrimaryAxis) {
        const newHeight = rect.width / ratio;
        coords.y = startCoords.y + (newHeight - startRect.height) * edgeSign;
      } else {
        const newWidth = rect.height * ratio;
        coords.x = startCoords.x + (newWidth - startRect.width) * edgeSign;
      }
    }
    /* harmony default export */


    var modifiers_aspectRatio = makeModifier(aspectRatio, 'aspectRatio'); // CONCATENATED MODULE: ./node_modules/@interactjs/modifiers/noop.js

    const noop = () => {};

    noop._defaults = {};
    /* harmony default export */

    var modifiers_noop = noop; // CONCATENATED MODULE: ./node_modules/@interactjs/modifiers/restrict/pointer.js

    function pointer_start({
      rect,
      startOffset,
      state,
      interaction,
      pageCoords
    }) {
      const {
        options
      } = state;
      const {
        elementRect
      } = options;
      const offset = extend({
        left: 0,
        top: 0,
        right: 0,
        bottom: 0
      }, options.offset || {});

      if (rect && elementRect) {
        const restriction = getRestrictionRect(options.restriction, interaction, pageCoords);

        if (restriction) {
          const widthDiff = restriction.right - restriction.left - rect.width;
          const heightDiff = restriction.bottom - restriction.top - rect.height;

          if (widthDiff < 0) {
            offset.left += widthDiff;
            offset.right += widthDiff;
          }

          if (heightDiff < 0) {
            offset.top += heightDiff;
            offset.bottom += heightDiff;
          }
        }

        offset.left += startOffset.left - rect.width * elementRect.left;
        offset.top += startOffset.top - rect.height * elementRect.top;
        offset.right += startOffset.right - rect.width * (1 - elementRect.right);
        offset.bottom += startOffset.bottom - rect.height * (1 - elementRect.bottom);
      }

      state.offset = offset;
    }

    function set({
      coords,
      interaction,
      state
    }) {
      const {
        options,
        offset
      } = state;
      const restriction = getRestrictionRect(options.restriction, interaction, coords);

      if (!restriction) {
        return;
      }

      const rect = xywhToTlbr(restriction);
      coords.x = Math.max(Math.min(rect.right - offset.right, coords.x), rect.left + offset.left);
      coords.y = Math.max(Math.min(rect.bottom - offset.bottom, coords.y), rect.top + offset.top);
    }

    function getRestrictionRect(value, interaction, coords) {
      if (is.func(value)) {
        return resolveRectLike(value, interaction.interactable, interaction.element, [coords.x, coords.y, interaction]);
      } else {
        return resolveRectLike(value, interaction.interactable, interaction.element);
      }
    }

    const pointer_defaults = {
      restriction: null,
      elementRect: null,
      offset: null,
      endOnly: false,
      enabled: false
    };
    const restrict = {
      start: pointer_start,
      set,
      defaults: pointer_defaults
    };
    /* harmony default export */

    var restrict_pointer = makeModifier(restrict, 'restrict'); // CONCATENATED MODULE: ./node_modules/@interactjs/modifiers/restrict/edges.js
    // This module adds the options.resize.restrictEdges setting which sets min and
    // max for the top, left, bottom and right edges of the target being resized.
    //
    // interact(target).resize({
    //   edges: { top: true, left: true },
    //   restrictEdges: {
    //     inner: { top: 200, left: 200, right: 400, bottom: 400 },
    //     outer: { top:   0, left:   0, right: 600, bottom: 600 },
    //   },
    // })

    const noInner = {
      top: +Infinity,
      left: +Infinity,
      bottom: -Infinity,
      right: -Infinity
    };
    const noOuter = {
      top: -Infinity,
      left: -Infinity,
      bottom: +Infinity,
      right: +Infinity
    };

    function edges_start({
      interaction,
      startOffset,
      state
    }) {
      const {
        options
      } = state;
      let offset;

      if (options) {
        const offsetRect = getRestrictionRect(options.offset, interaction, interaction.coords.start.page);
        offset = rectToXY(offsetRect);
      }

      offset = offset || {
        x: 0,
        y: 0
      };
      state.offset = {
        top: offset.y + startOffset.top,
        left: offset.x + startOffset.left,
        bottom: offset.y - startOffset.bottom,
        right: offset.x - startOffset.right
      };
    }

    function edges_set({
      coords,
      edges,
      interaction,
      state
    }) {
      const {
        offset,
        options
      } = state;

      if (!edges) {
        return;
      }

      const page = extend({}, coords);
      const inner = getRestrictionRect(options.inner, interaction, page) || {};
      const outer = getRestrictionRect(options.outer, interaction, page) || {};
      fixRect(inner, noInner);
      fixRect(outer, noOuter);

      if (edges.top) {
        coords.y = Math.min(Math.max(outer.top + offset.top, page.y), inner.top + offset.top);
      } else if (edges.bottom) {
        coords.y = Math.max(Math.min(outer.bottom + offset.bottom, page.y), inner.bottom + offset.bottom);
      }

      if (edges.left) {
        coords.x = Math.min(Math.max(outer.left + offset.left, page.x), inner.left + offset.left);
      } else if (edges.right) {
        coords.x = Math.max(Math.min(outer.right + offset.right, page.x), inner.right + offset.right);
      }
    }

    function fixRect(rect, defaults) {
      for (const edge of ['top', 'left', 'bottom', 'right']) {
        if (!(edge in rect)) {
          rect[edge] = defaults[edge];
        }
      }

      return rect;
    }

    const edges_defaults = {
      inner: null,
      outer: null,
      offset: null,
      endOnly: false,
      enabled: false
    };
    const restrictEdges = {
      noInner,
      noOuter,
      start: edges_start,
      set: edges_set,
      defaults: edges_defaults
    };
    /* harmony default export */

    var restrict_edges = makeModifier(restrictEdges, 'restrictEdges'); // CONCATENATED MODULE: ./node_modules/@interactjs/modifiers/restrict/rect.js

    const rect_defaults = extend({
      get elementRect() {
        return {
          top: 0,
          left: 0,
          bottom: 1,
          right: 1
        };
      },

      set elementRect(_) {}

    }, restrict.defaults);
    const restrictRect = {
      start: restrict.start,
      set: restrict.set,
      defaults: rect_defaults
    };
    /* harmony default export */

    var restrict_rect = makeModifier(restrictRect, 'restrictRect'); // CONCATENATED MODULE: ./node_modules/@interactjs/modifiers/restrict/size.js

    const noMin = {
      width: -Infinity,
      height: -Infinity
    };
    const noMax = {
      width: +Infinity,
      height: +Infinity
    };

    function size_start(arg) {
      return restrictEdges.start(arg);
    }

    function size_set(arg) {
      const {
        interaction,
        state,
        rect,
        edges
      } = arg;
      const {
        options
      } = state;

      if (!edges) {
        return;
      }

      const minSize = tlbrToXywh(getRestrictionRect(options.min, interaction, arg.coords)) || noMin;
      const maxSize = tlbrToXywh(getRestrictionRect(options.max, interaction, arg.coords)) || noMax;
      state.options = {
        endOnly: options.endOnly,
        inner: extend({}, restrictEdges.noInner),
        outer: extend({}, restrictEdges.noOuter)
      };

      if (edges.top) {
        state.options.inner.top = rect.bottom - minSize.height;
        state.options.outer.top = rect.bottom - maxSize.height;
      } else if (edges.bottom) {
        state.options.inner.bottom = rect.top + minSize.height;
        state.options.outer.bottom = rect.top + maxSize.height;
      }

      if (edges.left) {
        state.options.inner.left = rect.right - minSize.width;
        state.options.outer.left = rect.right - maxSize.width;
      } else if (edges.right) {
        state.options.inner.right = rect.left + minSize.width;
        state.options.outer.right = rect.left + maxSize.width;
      }

      restrictEdges.set(arg);
      state.options = options;
    }

    const size_defaults = {
      min: null,
      max: null,
      endOnly: false,
      enabled: false
    };
    const restrictSize = {
      start: size_start,
      set: size_set,
      defaults: size_defaults
    };
    /* harmony default export */

    var size = makeModifier(restrictSize, 'restrictSize'); // CONCATENATED MODULE: ./node_modules/@interactjs/modifiers/snap/pointer.js

    function snap_pointer_start(arg) {
      const {
        interaction,
        interactable,
        element,
        rect,
        state,
        startOffset
      } = arg;
      const {
        options
      } = state;
      const origin = options.offsetWithOrigin ? getOrigin(arg) : {
        x: 0,
        y: 0
      };
      let snapOffset;

      if (options.offset === 'startCoords') {
        snapOffset = {
          x: interaction.coords.start.page.x,
          y: interaction.coords.start.page.y
        };
      } else {
        const offsetRect = resolveRectLike(options.offset, interactable, element, [interaction]);
        snapOffset = rectToXY(offsetRect) || {
          x: 0,
          y: 0
        };
        snapOffset.x += origin.x;
        snapOffset.y += origin.y;
      }

      const {
        relativePoints
      } = options;
      state.offsets = rect && relativePoints && relativePoints.length ? relativePoints.map((relativePoint, index) => ({
        index,
        relativePoint,
        x: startOffset.left - rect.width * relativePoint.x + snapOffset.x,
        y: startOffset.top - rect.height * relativePoint.y + snapOffset.y
      })) : [extend({
        index: 0,
        relativePoint: null
      }, snapOffset)];
    }

    function pointer_set(arg) {
      const {
        interaction,
        coords,
        state
      } = arg;
      const {
        options,
        offsets
      } = state;
      const origin = getOriginXY(interaction.interactable, interaction.element, interaction.prepared.name);
      const page = extend({}, coords);
      const targets = [];

      if (!options.offsetWithOrigin) {
        page.x -= origin.x;
        page.y -= origin.y;
      }

      for (const offset of offsets) {
        const relativeX = page.x - offset.x;
        const relativeY = page.y - offset.y;

        for (let index = 0, len = options.targets.length; index < len; index++) {
          const snapTarget = options.targets[index];
          let target;

          if (is.func(snapTarget)) {
            target = snapTarget(relativeX, relativeY, interaction._proxy, offset, index);
          } else {
            target = snapTarget;
          }

          if (!target) {
            continue;
          }

          targets.push({
            x: (is.number(target.x) ? target.x : relativeX) + offset.x,
            y: (is.number(target.y) ? target.y : relativeY) + offset.y,
            range: is.number(target.range) ? target.range : options.range,
            source: snapTarget,
            index,
            offset
          });
        }
      }

      const closest = {
        target: null,
        inRange: false,
        distance: 0,
        range: 0,
        delta: {
          x: 0,
          y: 0
        }
      };

      for (const target of targets) {
        const range = target.range;
        const dx = target.x - page.x;
        const dy = target.y - page.y;
        const distance = hypot(dx, dy);
        let inRange = distance <= range; // Infinite targets count as being out of range
        // compared to non infinite ones that are in range

        if (range === Infinity && closest.inRange && closest.range !== Infinity) {
          inRange = false;
        }

        if (!closest.target || (inRange // is the closest target in range?
        ? closest.inRange && range !== Infinity // the pointer is relatively deeper in this target
        ? distance / range < closest.distance / closest.range // this target has Infinite range and the closest doesn't
        : range === Infinity && closest.range !== Infinity || // OR this target is closer that the previous closest
        distance < closest.distance : // The other is not in range and the pointer is closer to this target
        !closest.inRange && distance < closest.distance)) {
          closest.target = target;
          closest.distance = distance;
          closest.range = range;
          closest.inRange = inRange;
          closest.delta.x = dx;
          closest.delta.y = dy;
        }
      }

      if (closest.inRange) {
        coords.x = closest.target.x;
        coords.y = closest.target.y;
      }

      state.closest = closest;
      return closest;
    }

    function getOrigin(arg) {
      const {
        element
      } = arg.interaction;
      const optionsOrigin = rectToXY(resolveRectLike(arg.state.options.origin, null, null, [element]));
      const origin = optionsOrigin || getOriginXY(arg.interactable, element, arg.interaction.prepared.name);
      return origin;
    }

    const snap_pointer_defaults = {
      range: Infinity,
      targets: null,
      offset: null,
      offsetWithOrigin: true,
      origin: null,
      relativePoints: null,
      endOnly: false,
      enabled: false
    };
    const snap = {
      start: snap_pointer_start,
      set: pointer_set,
      defaults: snap_pointer_defaults
    };
    /* harmony default export */

    var snap_pointer = makeModifier(snap, 'snap'); // CONCATENATED MODULE: ./node_modules/@interactjs/modifiers/snap/size.js
    // This module allows snapping of the size of targets during resize
    // interactions.

    function snap_size_start(arg) {
      const {
        state,
        edges
      } = arg;
      const {
        options
      } = state;

      if (!edges) {
        return null;
      }

      arg.state = {
        options: {
          targets: null,
          relativePoints: [{
            x: edges.left ? 0 : 1,
            y: edges.top ? 0 : 1
          }],
          offset: options.offset || 'self',
          origin: {
            x: 0,
            y: 0
          },
          range: options.range
        }
      };
      state.targetFields = state.targetFields || [['width', 'height'], ['x', 'y']];
      snap.start(arg);
      state.offsets = arg.state.offsets;
      arg.state = state;
    }

    function snap_size_set(arg) {
      const {
        interaction,
        state,
        coords
      } = arg;
      const {
        options,
        offsets
      } = state;
      const relative = {
        x: coords.x - offsets[0].x,
        y: coords.y - offsets[0].y
      };
      state.options = extend({}, options);
      state.options.targets = [];

      for (const snapTarget of options.targets || []) {
        let target;

        if (is.func(snapTarget)) {
          target = snapTarget(relative.x, relative.y, interaction);
        } else {
          target = snapTarget;
        }

        if (!target) {
          continue;
        }

        for (const [xField, yField] of state.targetFields) {
          if (xField in target || yField in target) {
            target.x = target[xField];
            target.y = target[yField];
            break;
          }
        }

        state.options.targets.push(target);
      }

      const returnValue = snap.set(arg);
      state.options = options;
      return returnValue;
    }

    const snap_size_defaults = {
      range: Infinity,
      targets: null,
      offset: null,
      endOnly: false,
      enabled: false
    };
    const snapSize = {
      start: snap_size_start,
      set: snap_size_set,
      defaults: snap_size_defaults
    };
    /* harmony default export */

    var snap_size = makeModifier(snapSize, 'snapSize'); // CONCATENATED MODULE: ./node_modules/@interactjs/modifiers/snap/edges.js

    /**
     * @module modifiers/snapEdges
     *
     * @description
     * WOW> This module allows snapping of the edges of targets during resize
     * interactions.
     *
     * ```js
     * interact(target).resizable({
     *   snapEdges: {
     *     targets: [interact.snappers.grid({ x: 100, y: 50 })],
     *   },
     * })
     *
     * interact(target).resizable({
     *   snapEdges: {
     *     targets: [
     *       interact.snappers.grid({
     *        top: 50,
     *        left: 50,
     *        bottom: 100,
     *        right: 100,
     *       }),
     *     ],
     *   },
     * })
     * ```
     */

    function snap_edges_start(arg) {
      const {
        edges
      } = arg;

      if (!edges) {
        return null;
      }

      arg.state.targetFields = arg.state.targetFields || [[edges.left ? 'left' : 'right', edges.top ? 'top' : 'bottom']];
      return snapSize.start(arg);
    }

    const snapEdges = {
      start: snap_edges_start,
      set: snapSize.set,
      defaults: extend(clone(snapSize.defaults), {
        targets: null,
        range: null,
        offset: {
          x: 0,
          y: 0
        }
      })
    };
    /* harmony default export */

    var snap_edges = makeModifier(snapEdges, 'snapEdges'); // CONCATENATED MODULE: ./node_modules/@interactjs/modifiers/all.js

    /* eslint-disable node/no-extraneous-import */

    /* harmony default export */

    var modifiers_all = {
      aspectRatio: modifiers_aspectRatio,
      restrictEdges: restrict_edges,
      restrict: restrict_pointer,
      restrictRect: restrict_rect,
      restrictSize: size,
      snapEdges: snap_edges,
      snap: snap_pointer,
      snapSize: snap_size,
      spring: modifiers_noop,
      avoid: modifiers_noop,
      transform: modifiers_noop,
      rubberband: modifiers_noop
    }; // CONCATENATED MODULE: ./node_modules/@interactjs/modifiers/plugin.js

    const plugin_modifiers = {
      id: 'modifiers',

      install(scope) {
        const {
          interactStatic: interact
        } = scope;
        scope.usePlugin(modifiers_base);
        scope.usePlugin(snappers_plugin);
        interact.modifiers = modifiers_all; // for backwrads compatibility

        for (const type in modifiers_all) {
          const {
            _defaults,
            _methods
          } = modifiers_all[type];
          _defaults._methods = _methods;
          scope.defaults.perAction[type] = _defaults;
        }
      }

    };
    /* harmony default export */

    var modifiers_plugin = plugin_modifiers; // CONCATENATED MODULE: ./node_modules/@interactjs/modifiers/index.js

    /* eslint-disable import/order, no-console, eol-last */

    if (typeof window === 'object' && !!window) {
      interact_init(window);
    }

    _interactjs_interact.use(modifiers_plugin); // CONCATENATED MODULE: ./node_modules/@interactjs/dev-tools/plugin.js

    /* eslint-disable no-console */


    var CheckName;

    (function (CheckName) {
      CheckName["touchAction"] = "touchAction";
      CheckName["boxSizing"] = "boxSizing";
      CheckName["noListeners"] = "noListeners";
    })(CheckName || (CheckName = {}));

    const prefix = '[interact.js] ';
    const links = {
      touchAction: 'https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action',
      boxSizing: 'https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing'
    }; // eslint-disable-next-line no-undef

    const isProduction = "development" === 'production'; // eslint-disable-next-line no-restricted-syntax

    function dev_tools_plugin_install(scope, {
      logger
    } = {}) {
      const {
        Interactable,
        defaults
      } = scope;
      scope.logger = logger || console;
      defaults.base.devTools = {
        ignore: {}
      };

      Interactable.prototype.devTools = function (options) {
        if (options) {
          extend(this.options.devTools, options);
          return this;
        }

        return this.options.devTools;
      };
    }

    const checks = [{
      name: CheckName.touchAction,

      perform({
        element
      }) {
        return !parentHasStyle(element, 'touchAction', /pan-|pinch|none/);
      },

      getInfo({
        element
      }) {
        return [element, links.touchAction];
      },

      text: 'Consider adding CSS "touch-action: none" to this element\n'
    }, {
      name: CheckName.boxSizing,

      perform(interaction) {
        const {
          element
        } = interaction;
        return interaction.prepared.name === 'resize' && element instanceof utils_domObjects.HTMLElement && !hasStyle(element, 'boxSizing', /border-box/);
      },

      text: 'Consider adding CSS "box-sizing: border-box" to this resizable element',

      getInfo({
        element
      }) {
        return [element, links.boxSizing];
      }

    }, {
      name: CheckName.noListeners,

      perform(interaction) {
        const actionName = interaction.prepared.name;
        const moveListeners = interaction.interactable.events.types[`${actionName}move`] || [];
        return !moveListeners.length;
      },

      getInfo(interaction) {
        return [interaction.prepared.name, interaction.interactable];
      },

      text: 'There are no listeners set for this action'
    }];

    function hasStyle(element, prop, styleRe) {
      const value = element.style[prop] || win.getComputedStyle(element)[prop];
      return styleRe.test((value || '').toString());
    }

    function parentHasStyle(element, prop, styleRe) {
      let parent = element;

      while (is.element(parent)) {
        if (hasStyle(parent, prop, styleRe)) {
          return true;
        }

        parent = parentNode(parent);
      }

      return false;
    }

    const plugin_id = 'dev-tools';
    const defaultExport = isProduction ? {
      id: plugin_id,
      install: () => {}
    } : {
      id: plugin_id,
      install: dev_tools_plugin_install,
      listeners: {
        'interactions:action-start': ({
          interaction
        }, scope) => {
          for (const check of checks) {
            const options = interaction.interactable && interaction.interactable.options;

            if (!(options && options.devTools && options.devTools.ignore[check.name]) && check.perform(interaction)) {
              scope.logger.warn(prefix + check.text, ...check.getInfo(interaction));
            }
          }
        }
      },
      checks,
      CheckName,
      links,
      prefix
    };
    /* harmony default export */

    var dev_tools_plugin = defaultExport; // CONCATENATED MODULE: ./node_modules/@interactjs/dev-tools/index.js

    /* eslint-disable import/order, no-console, eol-last */

    if (typeof window === 'object' && !!window) {
      interact_init(window);
    }

    _interactjs_interact.use(dev_tools_plugin); // CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/GridItem.vue?vue&type=script&lang=js&


    function ownKeys(object, enumerableOnly) {
      var keys = Object.keys(object);

      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
        keys.push.apply(keys, symbols);
      }

      return keys;
    }

    function _objectSpread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};

        if (i % 2) {
          ownKeys(Object(source), true).forEach(function (key) {
            Object(defineProperty["a"
            /* default */
            ])(target, key, source[key]);
          });
        } else if (Object.getOwnPropertyDescriptors) {
          Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        } else {
          ownKeys(Object(source)).forEach(function (key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
          });
        }
      }

      return target;
    } //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //    var eventBus = require('./eventBus');

    /* harmony default export */


    var GridItemvue_type_script_lang_js_ = {
      name: "GridItem",
      props: {
        /*cols: {
         type: Number,
         required: true
         },*/

        /*containerWidth: {
         type: Number,
         required: true
           },
         rowHeight: {
         type: Number,
         required: true
         },
         margin: {
         type: Array,
         required: true
         },
         maxRows: {
         type: Number,
         required: true
         },*/
        isDraggable: {
          type: Boolean,
          required: false,
          default: null
        },
        isResizable: {
          type: Boolean,
          required: false,
          default: null
        },
        isBounded: {
          type: Boolean,
          required: false,
          default: null
        },

        /*useCssTransforms: {
         type: Boolean,
         required: true
         },
         */
        static: {
          type: Boolean,
          required: false,
          default: false
        },
        minH: {
          type: Number,
          required: false,
          default: 1
        },
        minW: {
          type: Number,
          required: false,
          default: 1
        },
        maxH: {
          type: Number,
          required: false,
          default: Infinity
        },
        maxW: {
          type: Number,
          required: false,
          default: Infinity
        },
        x: {
          type: Number,
          required: true
        },
        y: {
          type: Number,
          required: true
        },
        w: {
          type: Number,
          required: true
        },
        h: {
          type: Number,
          required: true
        },
        i: {
          required: true
        },
        dragIgnoreFrom: {
          type: String,
          required: false,
          default: 'a, button'
        },
        dragAllowFrom: {
          type: String,
          required: false,
          default: null
        },
        resizeIgnoreFrom: {
          type: String,
          required: false,
          default: 'a, button'
        },
        preserveAspectRatio: {
          type: Boolean,
          required: false,
          default: false
        },
        dragOption: {
          type: Object,
          required: false,
          default: function _default() {
            return {};
          }
        },
        resizeOption: {
          type: Object,
          required: false,
          default: function _default() {
            return {};
          }
        }
      },
      inject: ["eventBus", "layout"],
      data: function data() {
        return {
          cols: 1,
          containerWidth: 100,
          rowHeight: 30,
          margin: [10, 10],
          maxRows: Infinity,
          draggable: null,
          resizable: null,
          transformScale: 1,
          useCssTransforms: true,
          useStyleCursor: true,
          isDragging: false,
          dragging: null,
          isResizing: false,
          resizing: null,
          lastX: NaN,
          lastY: NaN,
          lastW: NaN,
          lastH: NaN,
          style: {},
          rtl: false,
          dragEventSet: false,
          resizeEventSet: false,
          previousW: null,
          previousH: null,
          previousX: null,
          previousY: null,
          innerX: this.x,
          innerY: this.y,
          innerW: this.w,
          innerH: this.h
        };
      },
      created: function created() {
        var _this = this;

        var self = this; // Accessible refernces of functions for removing in beforeDestroy

        self.updateWidthHandler = function (width) {
          self.updateWidth(width);
        };

        self.compactHandler = function (layout) {
          self.compact(layout);
        };

        self.setDraggableHandler = function (isDraggable) {
          if (self.isDraggable === null) {
            self.draggable = isDraggable;
          }
        };

        self.setResizableHandler = function (isResizable) {
          if (self.isResizable === null) {
            self.resizable = isResizable;
          }
        };

        self.setBoundedHandler = function (isBounded) {
          if (self.isBounded === null) {
            self.bounded = isBounded;
          }
        };

        self.setTransformScaleHandler = function (transformScale) {
          self.transformScale = transformScale;
        };

        self.setRowHeightHandler = function (rowHeight) {
          self.rowHeight = rowHeight;
        };

        self.setMaxRowsHandler = function (maxRows) {
          self.maxRows = maxRows;
        };

        self.directionchangeHandler = function () {
          _this.rtl = Object(DOM["b"
          /* getDocumentDir */
          ])() === 'rtl';

          _this.compact();
        };

        self.setColNum = function (colNum) {
          self.cols = parseInt(colNum);
        };

        this.eventBus.$on('updateWidth', self.updateWidthHandler);
        this.eventBus.$on('compact', self.compactHandler);
        this.eventBus.$on('setDraggable', self.setDraggableHandler);
        this.eventBus.$on('setResizable', self.setResizableHandler);
        this.eventBus.$on('setBounded', self.setBoundedHandler);
        this.eventBus.$on('setTransformScale', self.setTransformScaleHandler);
        this.eventBus.$on('setRowHeight', self.setRowHeightHandler);
        this.eventBus.$on('setMaxRows', self.setMaxRowsHandler);
        this.eventBus.$on('directionchange', self.directionchangeHandler);
        this.eventBus.$on('setColNum', self.setColNum);
        this.rtl = Object(DOM["b"
        /* getDocumentDir */
        ])() === 'rtl';
      },
      beforeDestroy: function beforeDestroy() {
        var self = this; //Remove listeners

        this.eventBus.$off('updateWidth', self.updateWidthHandler);
        this.eventBus.$off('compact', self.compactHandler);
        this.eventBus.$off('setDraggable', self.setDraggableHandler);
        this.eventBus.$off('setResizable', self.setResizableHandler);
        this.eventBus.$off('setBounded', self.setBoundedHandler);
        this.eventBus.$off('setTransformScale', self.setTransformScaleHandler);
        this.eventBus.$off('setRowHeight', self.setRowHeightHandler);
        this.eventBus.$off('setMaxRows', self.setMaxRowsHandler);
        this.eventBus.$off('directionchange', self.directionchangeHandler);
        this.eventBus.$off('setColNum', self.setColNum);

        if (this.interactObj) {
          this.interactObj.unset(); // destroy interact intance
        }
      },
      mounted: function mounted() {
        if (this.layout.responsive && this.layout.lastBreakpoint) {
          this.cols = Object(responsiveUtils["c"
          /* getColsFromBreakpoint */
          ])(this.layout.lastBreakpoint, this.layout.cols);
        } else {
          this.cols = this.layout.colNum;
        }

        this.rowHeight = this.layout.rowHeight;
        this.containerWidth = this.layout.width !== null ? this.layout.width : 100;
        this.margin = this.layout.margin !== undefined ? this.layout.margin : [10, 10];
        this.maxRows = this.layout.maxRows;

        if (this.isDraggable === null) {
          this.draggable = this.layout.isDraggable;
        } else {
          this.draggable = this.isDraggable;
        }

        if (this.isResizable === null) {
          this.resizable = this.layout.isResizable;
        } else {
          this.resizable = this.isResizable;
        }

        if (this.isBounded === null) {
          this.bounded = this.layout.isBounded;
        } else {
          this.bounded = this.isBounded;
        }

        this.transformScale = this.layout.transformScale;
        this.useCssTransforms = this.layout.useCssTransforms;
        this.useStyleCursor = this.layout.useStyleCursor;
        this.createStyle();
      },
      watch: {
        isDraggable: function isDraggable() {
          this.draggable = this.isDraggable;
        },
        static: function _static() {
          this.tryMakeDraggable();
          this.tryMakeResizable();
        },
        draggable: function draggable() {
          this.tryMakeDraggable();
        },
        isResizable: function isResizable() {
          this.resizable = this.isResizable;
        },
        isBounded: function isBounded() {
          this.bounded = this.isBounded;
        },
        resizable: function resizable() {
          this.tryMakeResizable();
        },
        rowHeight: function rowHeight() {
          this.createStyle();
          this.emitContainerResized();
        },
        cols: function cols() {
          this.tryMakeResizable();
          this.createStyle();
          this.emitContainerResized();
        },
        containerWidth: function containerWidth() {
          this.tryMakeResizable();
          this.createStyle();
          this.emitContainerResized();
        },
        x: function x(newVal) {
          this.innerX = newVal;
          this.createStyle();
        },
        y: function y(newVal) {
          this.innerY = newVal;
          this.createStyle();
        },
        h: function h(newVal) {
          this.innerH = newVal;
          this.createStyle(); // this.emitContainerResized();
        },
        w: function w(newVal) {
          this.innerW = newVal;
          this.createStyle(); // this.emitContainerResized();
        },
        renderRtl: function renderRtl() {
          // console.log("### renderRtl");
          this.tryMakeResizable();
          this.createStyle();
        },
        minH: function minH() {
          this.tryMakeResizable();
        },
        maxH: function maxH() {
          this.tryMakeResizable();
        },
        minW: function minW() {
          this.tryMakeResizable();
        },
        maxW: function maxW() {
          this.tryMakeResizable();
        },
        "$parent.margin": function $parentMargin(margin) {
          if (!margin || margin[0] == this.margin[0] && margin[1] == this.margin[1]) {
            return;
          }

          this.margin = margin.map(function (m) {
            return Number(m);
          });
          this.createStyle();
          this.emitContainerResized();
        }
      },
      computed: {
        classObj: function classObj() {
          return {
            'vue-resizable': this.resizableAndNotStatic,
            'static': this.static,
            'resizing': this.isResizing,
            'vue-draggable-dragging': this.isDragging,
            'cssTransforms': this.useCssTransforms,
            'render-rtl': this.renderRtl,
            'disable-userselect': this.isDragging,
            'no-touch': this.isAndroid && this.draggableOrResizableAndNotStatic
          };
        },
        resizableAndNotStatic: function resizableAndNotStatic() {
          return this.resizable && !this.static;
        },
        draggableOrResizableAndNotStatic: function draggableOrResizableAndNotStatic() {
          return (this.draggable || this.resizable) && !this.static;
        },
        isAndroid: function isAndroid() {
          return navigator.userAgent.toLowerCase().indexOf("android") !== -1;
        },
        renderRtl: function renderRtl() {
          return this.layout.isMirrored ? !this.rtl : this.rtl;
        },
        resizableHandleClass: function resizableHandleClass() {
          if (this.renderRtl) {
            return 'vue-resizable-handle vue-rtl-resizable-handle';
          } else {
            return 'vue-resizable-handle';
          }
        }
      },
      methods: {
        createStyle: function createStyle() {
          if (this.x + this.w > this.cols) {
            this.innerX = 0;
            this.innerW = this.w > this.cols ? this.cols : this.w;
          } else {
            this.innerX = this.x;
            this.innerW = this.w;
          }

          var pos = this.calcPosition(this.innerX, this.innerY, this.innerW, this.innerH);

          if (this.isDragging) {
            pos.top = this.dragging.top; //                    Add rtl support

            if (this.renderRtl) {
              pos.right = this.dragging.left;
            } else {
              pos.left = this.dragging.left;
            }
          }

          if (this.isResizing) {
            pos.width = this.resizing.width;
            pos.height = this.resizing.height;
          }

          var style; // CSS Transforms support (default)

          if (this.useCssTransforms) {
            //                    Add rtl support
            if (this.renderRtl) {
              style = Object(utils["k"
              /* setTransformRtl */
              ])(pos.top, pos.right, pos.width, pos.height);
            } else {
              style = Object(utils["j"
              /* setTransform */
              ])(pos.top, pos.left, pos.width, pos.height);
            }
          } else {
            // top,left (slow)
            //                    Add rtl support
            if (this.renderRtl) {
              style = Object(utils["i"
              /* setTopRight */
              ])(pos.top, pos.right, pos.width, pos.height);
            } else {
              style = Object(utils["h"
              /* setTopLeft */
              ])(pos.top, pos.left, pos.width, pos.height);
            }
          }

          this.style = style;
        },
        emitContainerResized: function emitContainerResized() {
          // this.style has width and height with trailing 'px'. The
          // resized event is without them
          var styleProps = {};

          for (var _i = 0, _arr = ['width', 'height']; _i < _arr.length; _i++) {
            var prop = _arr[_i];
            var val = this.style[prop];
            var matches = val.match(/^(\d+)px$/);
            if (!matches) return;
            styleProps[prop] = matches[1];
          }

          this.$emit("container-resized", this.i, this.h, this.w, styleProps.height, styleProps.width);
        },
        handleResize: function handleResize(event) {
          if (this.static) return;
          var position = getControlPosition(event); // Get the current drag point from the event. This is used as the offset.

          if (position == null) return; // not possible but satisfies flow

          var x = position.x,
              y = position.y;
          var newSize = {
            width: 0,
            height: 0
          };
          var pos;

          switch (event.type) {
            case "resizestart":
              {
                this.tryMakeResizable();
                this.previousW = this.innerW;
                this.previousH = this.innerH;
                pos = this.calcPosition(this.innerX, this.innerY, this.innerW, this.innerH);
                newSize.width = pos.width;
                newSize.height = pos.height;
                this.resizing = newSize;
                this.isResizing = true;
                break;
              }

            case "resizemove":
              {
                //                        console.log("### resize => " + event.type + ", lastW=" + this.lastW + ", lastH=" + this.lastH);
                var coreEvent = createCoreData(this.lastW, this.lastH, x, y);

                if (this.renderRtl) {
                  newSize.width = this.resizing.width - coreEvent.deltaX / this.transformScale;
                } else {
                  newSize.width = this.resizing.width + coreEvent.deltaX / this.transformScale;
                }

                newSize.height = this.resizing.height + coreEvent.deltaY / this.transformScale; ///console.log("### resize => " + event.type + ", deltaX=" + coreEvent.deltaX + ", deltaY=" + coreEvent.deltaY);

                this.resizing = newSize;
                break;
              }

            case "resizeend":
              {
                //console.log("### resize end => x=" +this.innerX + " y=" + this.innerY + " w=" + this.innerW + " h=" + this.innerH);
                pos = this.calcPosition(this.innerX, this.innerY, this.innerW, this.innerH);
                newSize.width = pos.width;
                newSize.height = pos.height; //                        console.log("### resize end => " + JSON.stringify(newSize));

                this.resizing = null;
                this.isResizing = false;
                break;
              }
          } // Get new WH


          pos = this.calcWH(newSize.height, newSize.width);

          if (pos.w < this.minW) {
            pos.w = this.minW;
          }

          if (pos.w > this.maxW) {
            pos.w = this.maxW;
          }

          if (pos.h < this.minH) {
            pos.h = this.minH;
          }

          if (pos.h > this.maxH) {
            pos.h = this.maxH;
          }

          if (pos.h < 1) {
            pos.h = 1;
          }

          if (pos.w < 1) {
            pos.w = 1;
          }

          this.lastW = x;
          this.lastH = y;

          if (this.innerW !== pos.w || this.innerH !== pos.h) {
            this.$emit("resize", this.i, pos.h, pos.w, newSize.height, newSize.width);
          }

          if (event.type === "resizeend" && (this.previousW !== this.innerW || this.previousH !== this.innerH)) {
            this.$emit("resized", this.i, pos.h, pos.w, newSize.height, newSize.width);
          }

          this.eventBus.$emit("resizeEvent", event.type, this.i, this.innerX, this.innerY, pos.h, pos.w);
        },
        handleDrag: function handleDrag(event) {
          if (this.static) return;
          if (this.isResizing) return;
          var position = getControlPosition(event); // Get the current drag point from the event. This is used as the offset.

          if (position === null) return; // not possible but satisfies flow

          var x = position.x,
              y = position.y; // let shouldUpdate = false;

          var newPosition = {
            top: 0,
            left: 0
          };

          switch (event.type) {
            case "dragstart":
              {
                this.previousX = this.innerX;
                this.previousY = this.innerY;
                var parentRect = event.target.offsetParent.getBoundingClientRect();
                var clientRect = event.target.getBoundingClientRect();
                var cLeft = clientRect.left / this.transformScale;
                var pLeft = parentRect.left / this.transformScale;
                var cRight = clientRect.right / this.transformScale;
                var pRight = parentRect.right / this.transformScale;
                var cTop = clientRect.top / this.transformScale;
                var pTop = parentRect.top / this.transformScale;

                if (this.renderRtl) {
                  newPosition.left = (cRight - pRight) * -1;
                } else {
                  newPosition.left = cLeft - pLeft;
                }

                newPosition.top = cTop - pTop;
                this.dragging = newPosition;
                this.isDragging = true;
                break;
              }

            case "dragend":
              {
                if (!this.isDragging) return;

                var _parentRect = event.target.offsetParent.getBoundingClientRect();

                var _clientRect = event.target.getBoundingClientRect();

                var _cLeft = _clientRect.left / this.transformScale;

                var _pLeft = _parentRect.left / this.transformScale;

                var _cRight = _clientRect.right / this.transformScale;

                var _pRight = _parentRect.right / this.transformScale;

                var _cTop = _clientRect.top / this.transformScale;

                var _pTop = _parentRect.top / this.transformScale; //                        Add rtl support


                if (this.renderRtl) {
                  newPosition.left = (_cRight - _pRight) * -1;
                } else {
                  newPosition.left = _cLeft - _pLeft;
                }

                newPosition.top = _cTop - _pTop; //                        console.log("### drag end => " + JSON.stringify(newPosition));
                //                        console.log("### DROP: " + JSON.stringify(newPosition));

                this.dragging = null;
                this.isDragging = false; // shouldUpdate = true;

                break;
              }

            case "dragmove":
              {
                var coreEvent = createCoreData(this.lastX, this.lastY, x, y); //                        Add rtl support

                if (this.renderRtl) {
                  newPosition.left = this.dragging.left - coreEvent.deltaX / this.transformScale;
                } else {
                  newPosition.left = this.dragging.left + coreEvent.deltaX / this.transformScale;
                }

                newPosition.top = this.dragging.top + coreEvent.deltaY / this.transformScale;

                if (this.bounded) {
                  var bottomBoundary = event.target.offsetParent.clientHeight - this.calcGridItemWHPx(this.h, this.rowHeight, this.margin[1]);
                  newPosition.top = this.clamp(newPosition.top, 0, bottomBoundary);
                  var colWidth = this.calcColWidth();
                  var rightBoundary = this.containerWidth - this.calcGridItemWHPx(this.w, colWidth, this.margin[0]);
                  newPosition.left = this.clamp(newPosition.left, 0, rightBoundary);
                } //                        console.log("### drag => " + event.type + ", x=" + x + ", y=" + y);
                //                        console.log("### drag => " + event.type + ", deltaX=" + coreEvent.deltaX + ", deltaY=" + coreEvent.deltaY);
                //                        console.log("### drag end => " + JSON.stringify(newPosition));


                this.dragging = newPosition;
                break;
              }
          } // Get new XY


          var pos;

          if (this.renderRtl) {
            pos = this.calcXY(newPosition.top, newPosition.left);
          } else {
            pos = this.calcXY(newPosition.top, newPosition.left);
          }

          this.lastX = x;
          this.lastY = y;

          if (this.innerX !== pos.x || this.innerY !== pos.y) {
            this.$emit("move", this.i, pos.x, pos.y);
          }

          if (event.type === "dragend" && (this.previousX !== this.innerX || this.previousY !== this.innerY)) {
            this.$emit("moved", this.i, pos.x, pos.y);
          }

          this.eventBus.$emit("dragEvent", event.type, this.i, pos.x, pos.y, this.innerH, this.innerW);
        },
        calcPosition: function calcPosition(x, y, w, h) {
          var colWidth = this.calcColWidth(); // add rtl support

          var out;

          if (this.renderRtl) {
            out = {
              right: Math.round(colWidth * x + (x + 1) * this.margin[0]),
              top: Math.round(this.rowHeight * y + (y + 1) * this.margin[1]),
              // 0 * Infinity === NaN, which causes problems with resize constriants;
              // Fix this if it occurs.
              // Note we do it here rather than later because Math.round(Infinity) causes deopt
              width: w === Infinity ? w : Math.round(colWidth * w + Math.max(0, w - 1) * this.margin[0]),
              height: h === Infinity ? h : Math.round(this.rowHeight * h + Math.max(0, h - 1) * this.margin[1])
            };
          } else {
            out = {
              left: Math.round(colWidth * x + (x + 1) * this.margin[0]),
              top: Math.round(this.rowHeight * y + (y + 1) * this.margin[1]),
              // 0 * Infinity === NaN, which causes problems with resize constriants;
              // Fix this if it occurs.
              // Note we do it here rather than later because Math.round(Infinity) causes deopt
              width: w === Infinity ? w : Math.round(colWidth * w + Math.max(0, w - 1) * this.margin[0]),
              height: h === Infinity ? h : Math.round(this.rowHeight * h + Math.max(0, h - 1) * this.margin[1])
            };
          }

          return out;
        },

        /**
         * Translate x and y coordinates from pixels to grid units.
         * @param  {Number} top  Top position (relative to parent) in pixels.
         * @param  {Number} left Left position (relative to parent) in pixels.
         * @return {Object} x and y in grid units.
         */
        // TODO check if this function needs change in order to support rtl.
        calcXY: function calcXY(top, left) {
          var colWidth = this.calcColWidth(); // left = colWidth * x + margin * (x + 1)
          // l = cx + m(x+1)
          // l = cx + mx + m
          // l - m = cx + mx
          // l - m = x(c + m)
          // (l - m) / (c + m) = x
          // x = (left - margin) / (coldWidth + margin)

          var x = Math.round((left - this.margin[0]) / (colWidth + this.margin[0]));
          var y = Math.round((top - this.margin[1]) / (this.rowHeight + this.margin[1])); // Capping

          x = Math.max(Math.min(x, this.cols - this.innerW), 0);
          y = Math.max(Math.min(y, this.maxRows - this.innerH), 0);
          return {
            x: x,
            y: y
          };
        },
        // Helper for generating column width
        calcColWidth: function calcColWidth() {
          var colWidth = (this.containerWidth - this.margin[0] * (this.cols + 1)) / this.cols; // console.log("### COLS=" + this.cols + " COL WIDTH=" + colWidth + " MARGIN " + this.margin[0]);

          return colWidth;
        },
        // This can either be called:
        // calcGridItemWHPx(w, colWidth, margin[0])
        // or
        // calcGridItemWHPx(h, rowHeight, margin[1])
        calcGridItemWHPx: function calcGridItemWHPx(gridUnits, colOrRowSize, marginPx) {
          // 0 * Infinity === NaN, which causes problems with resize contraints
          if (!Number.isFinite(gridUnits)) return gridUnits;
          return Math.round(colOrRowSize * gridUnits + Math.max(0, gridUnits - 1) * marginPx);
        },
        // Similar to _.clamp
        clamp: function clamp(num, lowerBound, upperBound) {
          return Math.max(Math.min(num, upperBound), lowerBound);
        },

        /**
         * Given a height and width in pixel values, calculate grid units.
         * @param  {Number} height Height in pixels.
         * @param  {Number} width  Width in pixels.
         * @param  {Boolean} autoSizeFlag  function autoSize identifier.
         * @return {Object} w, h as grid units.
         */
        calcWH: function calcWH(height, width) {
          var autoSizeFlag = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
          var colWidth = this.calcColWidth(); // width = colWidth * w - (margin * (w - 1))
          // ...
          // w = (width + margin) / (colWidth + margin)

          var w = Math.round((width + this.margin[0]) / (colWidth + this.margin[0]));
          var h = 0;

          if (!autoSizeFlag) {
            h = Math.round((height + this.margin[1]) / (this.rowHeight + this.margin[1]));
          } else {
            h = Math.ceil((height + this.margin[1]) / (this.rowHeight + this.margin[1]));
          } // Capping


          w = Math.max(Math.min(w, this.cols - this.innerX), 0);
          h = Math.max(Math.min(h, this.maxRows - this.innerY), 0);
          return {
            w: w,
            h: h
          };
        },
        updateWidth: function updateWidth(width, colNum) {
          this.containerWidth = width;

          if (colNum !== undefined && colNum !== null) {
            this.cols = colNum;
          }
        },
        compact: function compact() {
          this.createStyle();
        },
        tryMakeDraggable: function tryMakeDraggable() {
          var self = this;

          if (this.interactObj === null || this.interactObj === undefined) {
            this.interactObj = _interactjs_interact(this.$refs.item);

            if (!this.useStyleCursor) {
              this.interactObj.styleCursor(false);
            }
          }

          if (this.draggable && !this.static) {
            var opts = _objectSpread({
              ignoreFrom: this.dragIgnoreFrom,
              allowFrom: this.dragAllowFrom
            }, this.dragOption);

            this.interactObj.draggable(opts);
            /*this.interactObj.draggable({allowFrom: '.vue-draggable-handle'});*/

            if (!this.dragEventSet) {
              this.dragEventSet = true;
              this.interactObj.on('dragstart dragmove dragend', function (event) {
                self.handleDrag(event);
              });
            }
          } else {
            this.interactObj.draggable({
              enabled: false
            });
          }
        },
        tryMakeResizable: function tryMakeResizable() {
          var self = this;

          if (this.interactObj === null || this.interactObj === undefined) {
            this.interactObj = _interactjs_interact(this.$refs.item);

            if (!this.useStyleCursor) {
              this.interactObj.styleCursor(false);
            }
          }

          if (this.resizable && !this.static) {
            var maximum = this.calcPosition(0, 0, this.maxW, this.maxH);
            var minimum = this.calcPosition(0, 0, this.minW, this.minH); // console.log("### MAX " + JSON.stringify(maximum));
            // console.log("### MIN " + JSON.stringify(minimum));

            var opts = _objectSpread({
              // allowFrom: "." + this.resizableHandleClass.trim().replace(" ", "."),
              edges: {
                left: false,
                right: "." + this.resizableHandleClass.trim().replace(" ", "."),
                bottom: "." + this.resizableHandleClass.trim().replace(" ", "."),
                top: false
              },
              ignoreFrom: this.resizeIgnoreFrom,
              restrictSize: {
                min: {
                  height: minimum.height * this.transformScale,
                  width: minimum.width * this.transformScale
                },
                max: {
                  height: maximum.height * this.transformScale,
                  width: maximum.width * this.transformScale
                }
              }
            }, this.resizeOption);

            if (this.preserveAspectRatio) {
              opts.modifiers = [_interactjs_interact.modifiers.aspectRatio({
                ratio: 'preserve'
              })];
            }

            this.interactObj.resizable(opts);

            if (!this.resizeEventSet) {
              this.resizeEventSet = true;
              this.interactObj.on('resizestart resizemove resizeend', function (event) {
                self.handleResize(event);
              });
            }
          } else {
            this.interactObj.resizable({
              enabled: false
            });
          }
        },
        autoSize: function autoSize() {
          // ok here we want to calculate if a resize is needed
          this.previousW = this.innerW;
          this.previousH = this.innerH;
          var newSize = this.$slots.default[0].elm.getBoundingClientRect();
          var pos = this.calcWH(newSize.height, newSize.width, true);

          if (pos.w < this.minW) {
            pos.w = this.minW;
          }

          if (pos.w > this.maxW) {
            pos.w = this.maxW;
          }

          if (pos.h < this.minH) {
            pos.h = this.minH;
          }

          if (pos.h > this.maxH) {
            pos.h = this.maxH;
          }

          if (pos.h < 1) {
            pos.h = 1;
          }

          if (pos.w < 1) {
            pos.w = 1;
          } // this.lastW = x; // basically, this is copied from resizehandler, but shouldn't be needed
          // this.lastH = y;


          if (this.innerW !== pos.w || this.innerH !== pos.h) {
            this.$emit("resize", this.i, pos.h, pos.w, newSize.height, newSize.width);
          }

          if (this.previousW !== pos.w || this.previousH !== pos.h) {
            this.$emit("resized", this.i, pos.h, pos.w, newSize.height, newSize.width);
            this.eventBus.$emit("resizeEvent", "resizeend", this.i, this.innerX, this.innerY, pos.h, pos.w);
          }
        }
      }
    }; // CONCATENATED MODULE: ./src/components/GridItem.vue?vue&type=script&lang=js&

    /* harmony default export */

    var components_GridItemvue_type_script_lang_js_ = GridItemvue_type_script_lang_js_; // EXTERNAL MODULE: ./src/components/GridItem.vue?vue&type=style&index=0&lang=css&

    var GridItemvue_type_style_index_0_lang_css_ = __nested_webpack_require_155016__("5ed4"); // EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js


    var componentNormalizer = __nested_webpack_require_155016__("2877"); // CONCATENATED MODULE: ./src/components/GridItem.vue

    /* normalize component */


    var component = Object(componentNormalizer["a"
    /* default */
    ])(components_GridItemvue_type_script_lang_js_, render, staticRenderFns, false, null, null, null);
    /* harmony default export */

    var GridItem = __webpack_exports__["a"] = component.exports;
    /***/
  },

  /***/
  "be13":
  /***/
  function (module, exports) {
    // 7.2.1 RequireObjectCoercible(argument)
    module.exports = function (it) {
      if (it == undefined) throw TypeError("Can't call method on  " + it);
      return it;
    };
    /***/

  },

  /***/
  "c274":
  /***/
  function (module, exports, __nested_webpack_require_391176__) {
    "use strict";

    var utils = __nested_webpack_require_391176__("50bf");

    module.exports = function batchProcessorMaker(options) {
      options = options || {};
      var reporter = options.reporter;
      var asyncProcess = utils.getOption(options, "async", true);
      var autoProcess = utils.getOption(options, "auto", true);

      if (autoProcess && !asyncProcess) {
        reporter && reporter.warn("Invalid options combination. auto=true and async=false is invalid. Setting async=true.");
        asyncProcess = true;
      }

      var batch = Batch();
      var asyncFrameHandler;
      var isProcessing = false;

      function addFunction(level, fn) {
        if (!isProcessing && autoProcess && asyncProcess && batch.size() === 0) {
          // Since this is async, it is guaranteed to be executed after that the fn is added to the batch.
          // This needs to be done before, since we're checking the size of the batch to be 0.
          processBatchAsync();
        }

        batch.add(level, fn);
      }

      function processBatch() {
        // Save the current batch, and create a new batch so that incoming functions are not added into the currently processing batch.
        // Continue processing until the top-level batch is empty (functions may be added to the new batch while processing, and so on).
        isProcessing = true;

        while (batch.size()) {
          var processingBatch = batch;
          batch = Batch();
          processingBatch.process();
        }

        isProcessing = false;
      }

      function forceProcessBatch(localAsyncProcess) {
        if (isProcessing) {
          return;
        }

        if (localAsyncProcess === undefined) {
          localAsyncProcess = asyncProcess;
        }

        if (asyncFrameHandler) {
          cancelFrame(asyncFrameHandler);
          asyncFrameHandler = null;
        }

        if (localAsyncProcess) {
          processBatchAsync();
        } else {
          processBatch();
        }
      }

      function processBatchAsync() {
        asyncFrameHandler = requestFrame(processBatch);
      }

      function clearBatch() {
        batch = {};
        batchSize = 0;
        topLevel = 0;
        bottomLevel = 0;
      }

      function cancelFrame(listener) {
        // var cancel = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.clearTimeout;
        var cancel = clearTimeout;
        return cancel(listener);
      }

      function requestFrame(callback) {
        // var raf = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function(fn) { return window.setTimeout(fn, 20); };
        var raf = function (fn) {
          return setTimeout(fn, 0);
        };

        return raf(callback);
      }

      return {
        add: addFunction,
        force: forceProcessBatch
      };
    };

    function Batch() {
      var batch = {};
      var size = 0;
      var topLevel = 0;
      var bottomLevel = 0;

      function add(level, fn) {
        if (!fn) {
          fn = level;
          level = 0;
        }

        if (level > topLevel) {
          topLevel = level;
        } else if (level < bottomLevel) {
          bottomLevel = level;
        }

        if (!batch[level]) {
          batch[level] = [];
        }

        batch[level].push(fn);
        size++;
      }

      function process() {
        for (var level = bottomLevel; level <= topLevel; level++) {
          var fns = batch[level];

          for (var i = 0; i < fns.length; i++) {
            var fn = fns[i];
            fn();
          }
        }
      }

      function getSize() {
        return size;
      }

      return {
        add: add,
        process: process,
        size: getSize
      };
    }
    /***/

  },

  /***/
  "c366":
  /***/
  function (module, exports, __nested_webpack_require_395102__) {
    // false -> Array#indexOf
    // true  -> Array#includes
    var toIObject = __nested_webpack_require_395102__("6821");

    var toLength = __nested_webpack_require_395102__("9def");

    var toAbsoluteIndex = __nested_webpack_require_395102__("77f1");

    module.exports = function (IS_INCLUDES) {
      return function ($this, el, fromIndex) {
        var O = toIObject($this);
        var length = toLength(O.length);
        var index = toAbsoluteIndex(fromIndex, length);
        var value; // Array#includes uses SameValueZero equality algorithm
        // eslint-disable-next-line no-self-compare

        if (IS_INCLUDES && el != el) while (length > index) {
          value = O[index++]; // eslint-disable-next-line no-self-compare

          if (value != value) return true; // Array#indexOf ignores holes, Array#includes - not
        } else for (; length > index; index++) if (IS_INCLUDES || index in O) {
          if (O[index] === el) return IS_INCLUDES || index || 0;
        }
        return !IS_INCLUDES && -1;
      };
    };
    /***/

  },

  /***/
  "c5f6":
  /***/
  function (module, exports, __nested_webpack_require_396204__) {
    "use strict";

    var global = __nested_webpack_require_396204__("7726");

    var has = __nested_webpack_require_396204__("69a8");

    var cof = __nested_webpack_require_396204__("2d95");

    var inheritIfRequired = __nested_webpack_require_396204__("5dbc");

    var toPrimitive = __nested_webpack_require_396204__("6a99");

    var fails = __nested_webpack_require_396204__("79e5");

    var gOPN = __nested_webpack_require_396204__("9093").f;

    var gOPD = __nested_webpack_require_396204__("11e9").f;

    var dP = __nested_webpack_require_396204__("86cc").f;

    var $trim = __nested_webpack_require_396204__("aa77").trim;

    var NUMBER = 'Number';
    var $Number = global[NUMBER];
    var Base = $Number;
    var proto = $Number.prototype; // Opera ~12 has broken Object#toString

    var BROKEN_COF = cof(__nested_webpack_require_396204__("2aeb")(proto)) == NUMBER;
    var TRIM = ('trim' in String.prototype); // 7.1.3 ToNumber(argument)

    var toNumber = function (argument) {
      var it = toPrimitive(argument, false);

      if (typeof it == 'string' && it.length > 2) {
        it = TRIM ? it.trim() : $trim(it, 3);
        var first = it.charCodeAt(0);
        var third, radix, maxCode;

        if (first === 43 || first === 45) {
          third = it.charCodeAt(2);
          if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
        } else if (first === 48) {
          switch (it.charCodeAt(1)) {
            case 66:
            case 98:
              radix = 2;
              maxCode = 49;
              break;
            // fast equal /^0b[01]+$/i

            case 79:
            case 111:
              radix = 8;
              maxCode = 55;
              break;
            // fast equal /^0o[0-7]+$/i

            default:
              return +it;
          }

          for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
            code = digits.charCodeAt(i); // parseInt parses a string to a first unavailable symbol
            // but ToNumber should return NaN if a string contains unavailable symbols

            if (code < 48 || code > maxCode) return NaN;
          }

          return parseInt(digits, radix);
        }
      }

      return +it;
    };

    if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
      $Number = function Number(value) {
        var it = arguments.length < 1 ? 0 : value;
        var that = this;
        return that instanceof $Number // check on 1..constructor(foo) case
        && (BROKEN_COF ? fails(function () {
          proto.valueOf.call(that);
        }) : cof(that) != NUMBER) ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
      };

      for (var keys = __nested_webpack_require_396204__("9e1e") ? gOPN(Base) : ( // ES3:
      'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' + // ES6 (in case, if modules with ES6 Number statics required before):
      'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' + 'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger').split(','), j = 0, key; keys.length > j; j++) {
        if (has(Base, key = keys[j]) && !has($Number, key)) {
          dP($Number, key, gOPD(Base, key));
        }
      }

      $Number.prototype = proto;
      proto.constructor = $Number;

      __nested_webpack_require_396204__("2aba")(global, NUMBER, $Number);
    }
    /***/

  },

  /***/
  "c69a":
  /***/
  function (module, exports, __nested_webpack_require_399533__) {
    module.exports = !__nested_webpack_require_399533__("9e1e") && !__nested_webpack_require_399533__("79e5")(function () {
      return Object.defineProperty(__nested_webpack_require_399533__("230e")('div'), 'a', {
        get: function () {
          return 7;
        }
      }).a != 7;
    });
    /***/
  },

  /***/
  "c8ba":
  /***/
  function (module, exports) {
    var g; // This works in non-strict mode

    g = function () {
      return this;
    }();

    try {
      // This works if eval is allowed (see CSP)
      g = g || new Function("return this")();
    } catch (e) {
      // This works if the window reference is available
      if (typeof window === "object") g = window;
    } // g can still be undefined, but nothing to do about it...
    // We return undefined, instead of nothing here, so it's
    // easier to handle this case. if(!global) { ...}


    module.exports = g;
    /***/
  },

  /***/
  "c946":
  /***/
  function (module, exports, __nested_webpack_require_400488__) {
    "use strict";
    /**
     * Resize detection strategy that injects divs to elements in order to detect resize events on scroll events.
     * Heavily inspired by: https://github.com/marcj/css-element-queries/blob/master/src/ResizeSensor.js
     */

    var forEach = __nested_webpack_require_400488__("b770").forEach;

    module.exports = function (options) {
      options = options || {};
      var reporter = options.reporter;
      var batchProcessor = options.batchProcessor;
      var getState = options.stateHandler.getState;
      var hasState = options.stateHandler.hasState;
      var idHandler = options.idHandler;

      if (!batchProcessor) {
        throw new Error("Missing required dependency: batchProcessor");
      }

      if (!reporter) {
        throw new Error("Missing required dependency: reporter.");
      } //TODO: Could this perhaps be done at installation time?


      var scrollbarSizes = getScrollbarSizes();
      var styleId = "erd_scroll_detection_scrollbar_style";
      var detectionContainerClass = "erd_scroll_detection_container";

      function initDocument(targetDocument) {
        // Inject the scrollbar styling that prevents them from appearing sometimes in Chrome.
        // The injected container needs to have a class, so that it may be styled with CSS (pseudo elements).
        injectScrollStyle(targetDocument, styleId, detectionContainerClass);
      }

      initDocument(window.document);

      function buildCssTextString(rules) {
        var seperator = options.important ? " !important; " : "; ";
        return (rules.join(seperator) + seperator).trim();
      }

      function getScrollbarSizes() {
        var width = 500;
        var height = 500;
        var child = document.createElement("div");
        child.style.cssText = buildCssTextString(["position: absolute", "width: " + width * 2 + "px", "height: " + height * 2 + "px", "visibility: hidden", "margin: 0", "padding: 0"]);
        var container = document.createElement("div");
        container.style.cssText = buildCssTextString(["position: absolute", "width: " + width + "px", "height: " + height + "px", "overflow: scroll", "visibility: none", "top: " + -width * 3 + "px", "left: " + -height * 3 + "px", "visibility: hidden", "margin: 0", "padding: 0"]);
        container.appendChild(child);
        document.body.insertBefore(container, document.body.firstChild);
        var widthSize = width - container.clientWidth;
        var heightSize = height - container.clientHeight;
        document.body.removeChild(container);
        return {
          width: widthSize,
          height: heightSize
        };
      }

      function injectScrollStyle(targetDocument, styleId, containerClass) {
        function injectStyle(style, method) {
          method = method || function (element) {
            targetDocument.head.appendChild(element);
          };

          var styleElement = targetDocument.createElement("style");
          styleElement.innerHTML = style;
          styleElement.id = styleId;
          method(styleElement);
          return styleElement;
        }

        if (!targetDocument.getElementById(styleId)) {
          var containerAnimationClass = containerClass + "_animation";
          var containerAnimationActiveClass = containerClass + "_animation_active";
          var style = "/* Created by the element-resize-detector library. */\n";
          style += "." + containerClass + " > div::-webkit-scrollbar { " + buildCssTextString(["display: none"]) + " }\n\n";
          style += "." + containerAnimationActiveClass + " { " + buildCssTextString(["-webkit-animation-duration: 0.1s", "animation-duration: 0.1s", "-webkit-animation-name: " + containerAnimationClass, "animation-name: " + containerAnimationClass]) + " }\n";
          style += "@-webkit-keyframes " + containerAnimationClass + " { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }\n";
          style += "@keyframes " + containerAnimationClass + " { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }";
          injectStyle(style);
        }
      }

      function addAnimationClass(element) {
        element.className += " " + detectionContainerClass + "_animation_active";
      }

      function addEvent(el, name, cb) {
        if (el.addEventListener) {
          el.addEventListener(name, cb);
        } else if (el.attachEvent) {
          el.attachEvent("on" + name, cb);
        } else {
          return reporter.error("[scroll] Don't know how to add event listeners.");
        }
      }

      function removeEvent(el, name, cb) {
        if (el.removeEventListener) {
          el.removeEventListener(name, cb);
        } else if (el.detachEvent) {
          el.detachEvent("on" + name, cb);
        } else {
          return reporter.error("[scroll] Don't know how to remove event listeners.");
        }
      }

      function getExpandElement(element) {
        return getState(element).container.childNodes[0].childNodes[0].childNodes[0];
      }

      function getShrinkElement(element) {
        return getState(element).container.childNodes[0].childNodes[0].childNodes[1];
      }
      /**
       * Adds a resize event listener to the element.
       * @public
       * @param {element} element The element that should have the listener added.
       * @param {function} listener The listener callback to be called for each resize event of the element. The element will be given as a parameter to the listener callback.
       */


      function addListener(element, listener) {
        var listeners = getState(element).listeners;

        if (!listeners.push) {
          throw new Error("Cannot add listener to an element that is not detectable.");
        }

        getState(element).listeners.push(listener);
      }
      /**
       * Makes an element detectable and ready to be listened for resize events. Will call the callback when the element is ready to be listened for resize changes.
       * @private
       * @param {object} options Optional options object.
       * @param {element} element The element to make detectable
       * @param {function} callback The callback to be called when the element is ready to be listened for resize changes. Will be called with the element as first parameter.
       */


      function makeDetectable(options, element, callback) {
        if (!callback) {
          callback = element;
          element = options;
          options = null;
        }

        options = options || {};

        function debug() {
          if (options.debug) {
            var args = Array.prototype.slice.call(arguments);
            args.unshift(idHandler.get(element), "Scroll: ");

            if (reporter.log.apply) {
              reporter.log.apply(null, args);
            } else {
              for (var i = 0; i < args.length; i++) {
                reporter.log(args[i]);
              }
            }
          }
        }

        function isDetached(element) {
          function isInDocument(element) {
            var isInShadowRoot = element.getRootNode && element.getRootNode().contains(element);
            return element === element.ownerDocument.body || element.ownerDocument.body.contains(element) || isInShadowRoot;
          }

          if (!isInDocument(element)) {
            return true;
          } // FireFox returns null style in hidden iframes. See https://github.com/wnr/element-resize-detector/issues/68 and https://bugzilla.mozilla.org/show_bug.cgi?id=795520


          if (window.getComputedStyle(element) === null) {
            return true;
          }

          return false;
        }

        function isUnrendered(element) {
          // Check the absolute positioned container since the top level container is display: inline.
          var container = getState(element).container.childNodes[0];
          var style = window.getComputedStyle(container);
          return !style.width || style.width.indexOf("px") === -1; //Can only compute pixel value when rendered.
        }

        function getStyle() {
          // Some browsers only force layouts when actually reading the style properties of the style object, so make sure that they are all read here,
          // so that the user of the function can be sure that it will perform the layout here, instead of later (important for batching).
          var elementStyle = window.getComputedStyle(element);
          var style = {};
          style.position = elementStyle.position;
          style.width = element.offsetWidth;
          style.height = element.offsetHeight;
          style.top = elementStyle.top;
          style.right = elementStyle.right;
          style.bottom = elementStyle.bottom;
          style.left = elementStyle.left;
          style.widthCSS = elementStyle.width;
          style.heightCSS = elementStyle.height;
          return style;
        }

        function storeStartSize() {
          var style = getStyle();
          getState(element).startSize = {
            width: style.width,
            height: style.height
          };
          debug("Element start size", getState(element).startSize);
        }

        function initListeners() {
          getState(element).listeners = [];
        }

        function storeStyle() {
          debug("storeStyle invoked.");

          if (!getState(element)) {
            debug("Aborting because element has been uninstalled");
            return;
          }

          var style = getStyle();
          getState(element).style = style;
        }

        function storeCurrentSize(element, width, height) {
          getState(element).lastWidth = width;
          getState(element).lastHeight = height;
        }

        function getExpandChildElement(element) {
          return getExpandElement(element).childNodes[0];
        }

        function getWidthOffset() {
          return 2 * scrollbarSizes.width + 1;
        }

        function getHeightOffset() {
          return 2 * scrollbarSizes.height + 1;
        }

        function getExpandWidth(width) {
          return width + 10 + getWidthOffset();
        }

        function getExpandHeight(height) {
          return height + 10 + getHeightOffset();
        }

        function getShrinkWidth(width) {
          return width * 2 + getWidthOffset();
        }

        function getShrinkHeight(height) {
          return height * 2 + getHeightOffset();
        }

        function positionScrollbars(element, width, height) {
          var expand = getExpandElement(element);
          var shrink = getShrinkElement(element);
          var expandWidth = getExpandWidth(width);
          var expandHeight = getExpandHeight(height);
          var shrinkWidth = getShrinkWidth(width);
          var shrinkHeight = getShrinkHeight(height);
          expand.scrollLeft = expandWidth;
          expand.scrollTop = expandHeight;
          shrink.scrollLeft = shrinkWidth;
          shrink.scrollTop = shrinkHeight;
        }

        function injectContainerElement() {
          var container = getState(element).container;

          if (!container) {
            container = document.createElement("div");
            container.className = detectionContainerClass;
            container.style.cssText = buildCssTextString(["visibility: hidden", "display: inline", "width: 0px", "height: 0px", "z-index: -1", "overflow: hidden", "margin: 0", "padding: 0"]);
            getState(element).container = container;
            addAnimationClass(container);
            element.appendChild(container);

            var onAnimationStart = function () {
              getState(element).onRendered && getState(element).onRendered();
            };

            addEvent(container, "animationstart", onAnimationStart); // Store the event handler here so that they may be removed when uninstall is called.
            // See uninstall function for an explanation why it is needed.

            getState(element).onAnimationStart = onAnimationStart;
          }

          return container;
        }

        function injectScrollElements() {
          function alterPositionStyles() {
            var style = getState(element).style;

            if (style.position === "static") {
              element.style.setProperty("position", "relative", options.important ? "important" : "");

              var removeRelativeStyles = function (reporter, element, style, property) {
                function getNumericalValue(value) {
                  return value.replace(/[^-\d\.]/g, "");
                }

                var value = style[property];

                if (value !== "auto" && getNumericalValue(value) !== "0") {
                  reporter.warn("An element that is positioned static has style." + property + "=" + value + " which is ignored due to the static positioning. The element will need to be positioned relative, so the style." + property + " will be set to 0. Element: ", element);
                  element.style[property] = 0;
                }
              }; //Check so that there are no accidental styles that will make the element styled differently now that is is relative.
              //If there are any, set them to 0 (this should be okay with the user since the style properties did nothing before [since the element was positioned static] anyway).


              removeRelativeStyles(reporter, element, style, "top");
              removeRelativeStyles(reporter, element, style, "right");
              removeRelativeStyles(reporter, element, style, "bottom");
              removeRelativeStyles(reporter, element, style, "left");
            }
          }

          function getLeftTopBottomRightCssText(left, top, bottom, right) {
            left = !left ? "0" : left + "px";
            top = !top ? "0" : top + "px";
            bottom = !bottom ? "0" : bottom + "px";
            right = !right ? "0" : right + "px";
            return ["left: " + left, "top: " + top, "right: " + right, "bottom: " + bottom];
          }

          debug("Injecting elements");

          if (!getState(element)) {
            debug("Aborting because element has been uninstalled");
            return;
          }

          alterPositionStyles();
          var rootContainer = getState(element).container;

          if (!rootContainer) {
            rootContainer = injectContainerElement();
          } // Due to this WebKit bug https://bugs.webkit.org/show_bug.cgi?id=80808 (currently fixed in Blink, but still present in WebKit browsers such as Safari),
          // we need to inject two containers, one that is width/height 100% and another that is left/top -1px so that the final container always is 1x1 pixels bigger than
          // the targeted element.
          // When the bug is resolved, "containerContainer" may be removed.
          // The outer container can occasionally be less wide than the targeted when inside inline elements element in WebKit (see https://bugs.webkit.org/show_bug.cgi?id=152980).
          // This should be no problem since the inner container either way makes sure the injected scroll elements are at least 1x1 px.


          var scrollbarWidth = scrollbarSizes.width;
          var scrollbarHeight = scrollbarSizes.height;
          var containerContainerStyle = buildCssTextString(["position: absolute", "flex: none", "overflow: hidden", "z-index: -1", "visibility: hidden", "width: 100%", "height: 100%", "left: 0px", "top: 0px"]);
          var containerStyle = buildCssTextString(["position: absolute", "flex: none", "overflow: hidden", "z-index: -1", "visibility: hidden"].concat(getLeftTopBottomRightCssText(-(1 + scrollbarWidth), -(1 + scrollbarHeight), -scrollbarHeight, -scrollbarWidth)));
          var expandStyle = buildCssTextString(["position: absolute", "flex: none", "overflow: scroll", "z-index: -1", "visibility: hidden", "width: 100%", "height: 100%"]);
          var shrinkStyle = buildCssTextString(["position: absolute", "flex: none", "overflow: scroll", "z-index: -1", "visibility: hidden", "width: 100%", "height: 100%"]);
          var expandChildStyle = buildCssTextString(["position: absolute", "left: 0", "top: 0"]);
          var shrinkChildStyle = buildCssTextString(["position: absolute", "width: 200%", "height: 200%"]);
          var containerContainer = document.createElement("div");
          var container = document.createElement("div");
          var expand = document.createElement("div");
          var expandChild = document.createElement("div");
          var shrink = document.createElement("div");
          var shrinkChild = document.createElement("div"); // Some browsers choke on the resize system being rtl, so force it to ltr. https://github.com/wnr/element-resize-detector/issues/56
          // However, dir should not be set on the top level container as it alters the dimensions of the target element in some browsers.

          containerContainer.dir = "ltr";
          containerContainer.style.cssText = containerContainerStyle;
          containerContainer.className = detectionContainerClass;
          container.className = detectionContainerClass;
          container.style.cssText = containerStyle;
          expand.style.cssText = expandStyle;
          expandChild.style.cssText = expandChildStyle;
          shrink.style.cssText = shrinkStyle;
          shrinkChild.style.cssText = shrinkChildStyle;
          expand.appendChild(expandChild);
          shrink.appendChild(shrinkChild);
          container.appendChild(expand);
          container.appendChild(shrink);
          containerContainer.appendChild(container);
          rootContainer.appendChild(containerContainer);

          function onExpandScroll() {
            var state = getState(element);

            if (state && state.onExpand) {
              state.onExpand();
            } else {
              debug("Aborting expand scroll handler: element has been uninstalled");
            }
          }

          function onShrinkScroll() {
            var state = getState(element);

            if (state && state.onShrink) {
              state.onShrink();
            } else {
              debug("Aborting shrink scroll handler: element has been uninstalled");
            }
          }

          addEvent(expand, "scroll", onExpandScroll);
          addEvent(shrink, "scroll", onShrinkScroll); // Store the event handlers here so that they may be removed when uninstall is called.
          // See uninstall function for an explanation why it is needed.

          getState(element).onExpandScroll = onExpandScroll;
          getState(element).onShrinkScroll = onShrinkScroll;
        }

        function registerListenersAndPositionElements() {
          function updateChildSizes(element, width, height) {
            var expandChild = getExpandChildElement(element);
            var expandWidth = getExpandWidth(width);
            var expandHeight = getExpandHeight(height);
            expandChild.style.setProperty("width", expandWidth + "px", options.important ? "important" : "");
            expandChild.style.setProperty("height", expandHeight + "px", options.important ? "important" : "");
          }

          function updateDetectorElements(done) {
            var width = element.offsetWidth;
            var height = element.offsetHeight; // Check whether the size has actually changed since last time the algorithm ran. If not, some steps may be skipped.

            var sizeChanged = width !== getState(element).lastWidth || height !== getState(element).lastHeight;
            debug("Storing current size", width, height); // Store the size of the element sync here, so that multiple scroll events may be ignored in the event listeners.
            // Otherwise the if-check in handleScroll is useless.

            storeCurrentSize(element, width, height); // Since we delay the processing of the batch, there is a risk that uninstall has been called before the batch gets to execute.
            // Since there is no way to cancel the fn executions, we need to add an uninstall guard to all fns of the batch.

            batchProcessor.add(0, function performUpdateChildSizes() {
              if (!sizeChanged) {
                return;
              }

              if (!getState(element)) {
                debug("Aborting because element has been uninstalled");
                return;
              }

              if (!areElementsInjected()) {
                debug("Aborting because element container has not been initialized");
                return;
              }

              if (options.debug) {
                var w = element.offsetWidth;
                var h = element.offsetHeight;

                if (w !== width || h !== height) {
                  reporter.warn(idHandler.get(element), "Scroll: Size changed before updating detector elements.");
                }
              }

              updateChildSizes(element, width, height);
            });
            batchProcessor.add(1, function updateScrollbars() {
              // This function needs to be invoked event though the size is unchanged. The element could have been resized very quickly and then
              // been restored to the original size, which will have changed the scrollbar positions.
              if (!getState(element)) {
                debug("Aborting because element has been uninstalled");
                return;
              }

              if (!areElementsInjected()) {
                debug("Aborting because element container has not been initialized");
                return;
              }

              positionScrollbars(element, width, height);
            });

            if (sizeChanged && done) {
              batchProcessor.add(2, function () {
                if (!getState(element)) {
                  debug("Aborting because element has been uninstalled");
                  return;
                }

                if (!areElementsInjected()) {
                  debug("Aborting because element container has not been initialized");
                  return;
                }

                done();
              });
            }
          }

          function areElementsInjected() {
            return !!getState(element).container;
          }

          function notifyListenersIfNeeded() {
            function isFirstNotify() {
              return getState(element).lastNotifiedWidth === undefined;
            }

            debug("notifyListenersIfNeeded invoked");
            var state = getState(element); // Don't notify if the current size is the start size, and this is the first notification.

            if (isFirstNotify() && state.lastWidth === state.startSize.width && state.lastHeight === state.startSize.height) {
              return debug("Not notifying: Size is the same as the start size, and there has been no notification yet.");
            } // Don't notify if the size already has been notified.


            if (state.lastWidth === state.lastNotifiedWidth && state.lastHeight === state.lastNotifiedHeight) {
              return debug("Not notifying: Size already notified");
            }

            debug("Current size not notified, notifying...");
            state.lastNotifiedWidth = state.lastWidth;
            state.lastNotifiedHeight = state.lastHeight;
            forEach(getState(element).listeners, function (listener) {
              listener(element);
            });
          }

          function handleRender() {
            debug("startanimation triggered.");

            if (isUnrendered(element)) {
              debug("Ignoring since element is still unrendered...");
              return;
            }

            debug("Element rendered.");
            var expand = getExpandElement(element);
            var shrink = getShrinkElement(element);

            if (expand.scrollLeft === 0 || expand.scrollTop === 0 || shrink.scrollLeft === 0 || shrink.scrollTop === 0) {
              debug("Scrollbars out of sync. Updating detector elements...");
              updateDetectorElements(notifyListenersIfNeeded);
            }
          }

          function handleScroll() {
            debug("Scroll detected.");

            if (isUnrendered(element)) {
              // Element is still unrendered. Skip this scroll event.
              debug("Scroll event fired while unrendered. Ignoring...");
              return;
            }

            updateDetectorElements(notifyListenersIfNeeded);
          }

          debug("registerListenersAndPositionElements invoked.");

          if (!getState(element)) {
            debug("Aborting because element has been uninstalled");
            return;
          }

          getState(element).onRendered = handleRender;
          getState(element).onExpand = handleScroll;
          getState(element).onShrink = handleScroll;
          var style = getState(element).style;
          updateChildSizes(element, style.width, style.height);
        }

        function finalizeDomMutation() {
          debug("finalizeDomMutation invoked.");

          if (!getState(element)) {
            debug("Aborting because element has been uninstalled");
            return;
          }

          var style = getState(element).style;
          storeCurrentSize(element, style.width, style.height);
          positionScrollbars(element, style.width, style.height);
        }

        function ready() {
          callback(element);
        }

        function install() {
          debug("Installing...");
          initListeners();
          storeStartSize();
          batchProcessor.add(0, storeStyle);
          batchProcessor.add(1, injectScrollElements);
          batchProcessor.add(2, registerListenersAndPositionElements);
          batchProcessor.add(3, finalizeDomMutation);
          batchProcessor.add(4, ready);
        }

        debug("Making detectable...");

        if (isDetached(element)) {
          debug("Element is detached");
          injectContainerElement();
          debug("Waiting until element is attached...");

          getState(element).onRendered = function () {
            debug("Element is now attached");
            install();
          };
        } else {
          install();
        }
      }

      function uninstall(element) {
        var state = getState(element);

        if (!state) {
          // Uninstall has been called on a non-erd element.
          return;
        } // Uninstall may have been called in the following scenarios:
        // (1) Right between the sync code and async batch (here state.busy = true, but nothing have been registered or injected).
        // (2) In the ready callback of the last level of the batch by another element (here, state.busy = true, but all the stuff has been injected).
        // (3) After the installation process (here, state.busy = false and all the stuff has been injected).
        // So to be on the safe side, let's check for each thing before removing.
        // We need to remove the event listeners, because otherwise the event might fire on an uninstall element which results in an error when trying to get the state of the element.


        state.onExpandScroll && removeEvent(getExpandElement(element), "scroll", state.onExpandScroll);
        state.onShrinkScroll && removeEvent(getShrinkElement(element), "scroll", state.onShrinkScroll);
        state.onAnimationStart && removeEvent(state.container, "animationstart", state.onAnimationStart);
        state.container && element.removeChild(state.container);
      }

      return {
        makeDetectable: makeDetectable,
        addListener: addListener,
        uninstall: uninstall,
        initDocument: initDocument
      };
    };
    /***/

  },

  /***/
  "ca5a":
  /***/
  function (module, exports) {
    var id = 0;
    var px = Math.random();

    module.exports = function (key) {
      return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
    };
    /***/

  },

  /***/
  "cadf":
  /***/
  function (module, exports, __nested_webpack_require_428580__) {
    "use strict";

    var addToUnscopables = __nested_webpack_require_428580__("9c6c");

    var step = __nested_webpack_require_428580__("d53b");

    var Iterators = __nested_webpack_require_428580__("84f2");

    var toIObject = __nested_webpack_require_428580__("6821"); // 22.1.3.4 Array.prototype.entries()
    // 22.1.3.13 Array.prototype.keys()
    // 22.1.3.29 Array.prototype.values()
    // 22.1.3.30 Array.prototype[@@iterator]()


    module.exports = __nested_webpack_require_428580__("01f9")(Array, 'Array', function (iterated, kind) {
      this._t = toIObject(iterated); // target

      this._i = 0; // next index

      this._k = kind; // kind
      // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
    }, function () {
      var O = this._t;
      var kind = this._k;
      var index = this._i++;

      if (!O || index >= O.length) {
        this._t = undefined;
        return step(1);
      }

      if (kind == 'keys') return step(0, index);
      if (kind == 'values') return step(0, O[index]);
      return step(0, [index, O[index]]);
    }, 'values'); // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)

    Iterators.Arguments = Iterators.Array;
    addToUnscopables('keys');
    addToUnscopables('values');
    addToUnscopables('entries');
    /***/
  },

  /***/
  "cb7c":
  /***/
  function (module, exports, __nested_webpack_require_429891__) {
    var isObject = __nested_webpack_require_429891__("d3f4");

    module.exports = function (it) {
      if (!isObject(it)) throw TypeError(it + ' is not an object!');
      return it;
    };
    /***/

  },

  /***/
  "ce10":
  /***/
  function (module, exports, __nested_webpack_require_430165__) {
    var has = __nested_webpack_require_430165__("69a8");

    var toIObject = __nested_webpack_require_430165__("6821");

    var arrayIndexOf = __nested_webpack_require_430165__("c366")(false);

    var IE_PROTO = __nested_webpack_require_430165__("613b")('IE_PROTO');

    module.exports = function (object, names) {
      var O = toIObject(object);
      var i = 0;
      var result = [];
      var key;

      for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key); // Don't enum bug & hidden keys


      while (names.length > i) if (has(O, key = names[i++])) {
        ~arrayIndexOf(result, key) || result.push(key);
      }

      return result;
    };
    /***/

  },

  /***/
  "d3f4":
  /***/
  function (module, exports) {
    module.exports = function (it) {
      return typeof it === 'object' ? it !== null : typeof it === 'function';
    };
    /***/

  },

  /***/
  "d53b":
  /***/
  function (module, exports) {
    module.exports = function (done, value) {
      return {
        value: value,
        done: !!done
      };
    };
    /***/

  },

  /***/
  "d6eb":
  /***/
  function (module, exports, __webpack_require__) {
    "use strict";

    var prop = "_erd";

    function initState(element) {
      element[prop] = {};
      return getState(element);
    }

    function getState(element) {
      return element[prop];
    }

    function cleanState(element) {
      delete element[prop];
    }

    module.exports = {
      initState: initState,
      getState: getState,
      cleanState: cleanState
    };
    /***/
  },

  /***/
  "d8e8":
  /***/
  function (module, exports) {
    module.exports = function (it) {
      if (typeof it != 'function') throw TypeError(it + ' is not a function!');
      return it;
    };
    /***/

  },

  /***/
  "e11e":
  /***/
  function (module, exports) {
    // IE 8- don't enum bug keys
    module.exports = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');
    /***/
  },

  /***/
  "e279":
  /***/
  function (module, __webpack_exports__, __nested_webpack_require_432216__) {
    "use strict";
    /* harmony import */

    var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GridLayout_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_432216__("1156");
    /* harmony import */


    var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GridLayout_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__nested_webpack_require_432216__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_index_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GridLayout_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
    /* unused harmony reexport * */

    /***/

  },

  /***/
  "eec4":
  /***/
  function (module, exports, __nested_webpack_require_433872__) {
    "use strict";

    var forEach = __nested_webpack_require_433872__("b770").forEach;

    var elementUtilsMaker = __nested_webpack_require_433872__("5be5");

    var listenerHandlerMaker = __nested_webpack_require_433872__("49ad");

    var idGeneratorMaker = __nested_webpack_require_433872__("2cef");

    var idHandlerMaker = __nested_webpack_require_433872__("5058");

    var reporterMaker = __nested_webpack_require_433872__("abb4");

    var browserDetector = __nested_webpack_require_433872__("18e9");

    var batchProcessorMaker = __nested_webpack_require_433872__("c274");

    var stateHandler = __nested_webpack_require_433872__("d6eb"); //Detection strategies.


    var objectStrategyMaker = __nested_webpack_require_433872__("18d2");

    var scrollStrategyMaker = __nested_webpack_require_433872__("c946");

    function isCollection(obj) {
      return Array.isArray(obj) || obj.length !== undefined;
    }

    function toArray(collection) {
      if (!Array.isArray(collection)) {
        var array = [];
        forEach(collection, function (obj) {
          array.push(obj);
        });
        return array;
      } else {
        return collection;
      }
    }

    function isElement(obj) {
      return obj && obj.nodeType === 1;
    }
    /**
     * @typedef idHandler
     * @type {object}
     * @property {function} get Gets the resize detector id of the element.
     * @property {function} set Generate and sets the resize detector id of the element.
     */

    /**
     * @typedef Options
     * @type {object}
     * @property {boolean} callOnAdd    Determines if listeners should be called when they are getting added.
                                        Default is true. If true, the listener is guaranteed to be called when it has been added.
                                        If false, the listener will not be guarenteed to be called when it has been added (does not prevent it from being called).
     * @property {idHandler} idHandler  A custom id handler that is responsible for generating, setting and retrieving id's for elements.
                                        If not provided, a default id handler will be used.
     * @property {reporter} reporter    A custom reporter that handles reporting logs, warnings and errors.
                                        If not provided, a default id handler will be used.
                                        If set to false, then nothing will be reported.
     * @property {boolean} debug        If set to true, the the system will report debug messages as default for the listenTo method.
     */

    /**
     * Creates an element resize detector instance.
     * @public
     * @param {Options?} options Optional global options object that will decide how this instance will work.
     */


    module.exports = function (options) {
      options = options || {}; //idHandler is currently not an option to the listenTo function, so it should not be added to globalOptions.

      var idHandler;

      if (options.idHandler) {
        // To maintain compatability with idHandler.get(element, readonly), make sure to wrap the given idHandler
        // so that readonly flag always is true when it's used here. This may be removed next major version bump.
        idHandler = {
          get: function (element) {
            return options.idHandler.get(element, true);
          },
          set: options.idHandler.set
        };
      } else {
        var idGenerator = idGeneratorMaker();
        var defaultIdHandler = idHandlerMaker({
          idGenerator: idGenerator,
          stateHandler: stateHandler
        });
        idHandler = defaultIdHandler;
      } //reporter is currently not an option to the listenTo function, so it should not be added to globalOptions.


      var reporter = options.reporter;

      if (!reporter) {
        //If options.reporter is false, then the reporter should be quiet.
        var quiet = reporter === false;
        reporter = reporterMaker(quiet);
      } //batchProcessor is currently not an option to the listenTo function, so it should not be added to globalOptions.


      var batchProcessor = getOption(options, "batchProcessor", batchProcessorMaker({
        reporter: reporter
      })); //Options to be used as default for the listenTo function.

      var globalOptions = {};
      globalOptions.callOnAdd = !!getOption(options, "callOnAdd", true);
      globalOptions.debug = !!getOption(options, "debug", false);
      var eventListenerHandler = listenerHandlerMaker(idHandler);
      var elementUtils = elementUtilsMaker({
        stateHandler: stateHandler
      }); //The detection strategy to be used.

      var detectionStrategy;
      var desiredStrategy = getOption(options, "strategy", "object");
      var importantCssRules = getOption(options, "important", false);
      var strategyOptions = {
        reporter: reporter,
        batchProcessor: batchProcessor,
        stateHandler: stateHandler,
        idHandler: idHandler,
        important: importantCssRules
      };

      if (desiredStrategy === "scroll") {
        if (browserDetector.isLegacyOpera()) {
          reporter.warn("Scroll strategy is not supported on legacy Opera. Changing to object strategy.");
          desiredStrategy = "object";
        } else if (browserDetector.isIE(9)) {
          reporter.warn("Scroll strategy is not supported on IE9. Changing to object strategy.");
          desiredStrategy = "object";
        }
      }

      if (desiredStrategy === "scroll") {
        detectionStrategy = scrollStrategyMaker(strategyOptions);
      } else if (desiredStrategy === "object") {
        detectionStrategy = objectStrategyMaker(strategyOptions);
      } else {
        throw new Error("Invalid strategy name: " + desiredStrategy);
      } //Calls can be made to listenTo with elements that are still being installed.
      //Also, same elements can occur in the elements list in the listenTo function.
      //With this map, the ready callbacks can be synchronized between the calls
      //so that the ready callback can always be called when an element is ready - even if
      //it wasn't installed from the function itself.


      var onReadyCallbacks = {};
      /**
       * Makes the given elements resize-detectable and starts listening to resize events on the elements. Calls the event callback for each event for each element.
       * @public
       * @param {Options?} options Optional options object. These options will override the global options. Some options may not be overriden, such as idHandler.
       * @param {element[]|element} elements The given array of elements to detect resize events of. Single element is also valid.
       * @param {function} listener The callback to be executed for each resize event for each element.
       */

      function listenTo(options, elements, listener) {
        function onResizeCallback(element) {
          var listeners = eventListenerHandler.get(element);
          forEach(listeners, function callListenerProxy(listener) {
            listener(element);
          });
        }

        function addListener(callOnAdd, element, listener) {
          eventListenerHandler.add(element, listener);

          if (callOnAdd) {
            listener(element);
          }
        } //Options object may be omitted.


        if (!listener) {
          listener = elements;
          elements = options;
          options = {};
        }

        if (!elements) {
          throw new Error("At least one element required.");
        }

        if (!listener) {
          throw new Error("Listener required.");
        }

        if (isElement(elements)) {
          // A single element has been passed in.
          elements = [elements];
        } else if (isCollection(elements)) {
          // Convert collection to array for plugins.
          // TODO: May want to check so that all the elements in the collection are valid elements.
          elements = toArray(elements);
        } else {
          return reporter.error("Invalid arguments. Must be a DOM element or a collection of DOM elements.");
        }

        var elementsReady = 0;
        var callOnAdd = getOption(options, "callOnAdd", globalOptions.callOnAdd);
        var onReadyCallback = getOption(options, "onReady", function noop() {});
        var debug = getOption(options, "debug", globalOptions.debug);
        forEach(elements, function attachListenerToElement(element) {
          if (!stateHandler.getState(element)) {
            stateHandler.initState(element);
            idHandler.set(element);
          }

          var id = idHandler.get(element);
          debug && reporter.log("Attaching listener to element", id, element);

          if (!elementUtils.isDetectable(element)) {
            debug && reporter.log(id, "Not detectable.");

            if (elementUtils.isBusy(element)) {
              debug && reporter.log(id, "System busy making it detectable"); //The element is being prepared to be detectable. Do not make it detectable.
              //Just add the listener, because the element will soon be detectable.

              addListener(callOnAdd, element, listener);
              onReadyCallbacks[id] = onReadyCallbacks[id] || [];
              onReadyCallbacks[id].push(function onReady() {
                elementsReady++;

                if (elementsReady === elements.length) {
                  onReadyCallback();
                }
              });
              return;
            }

            debug && reporter.log(id, "Making detectable..."); //The element is not prepared to be detectable, so do prepare it and add a listener to it.

            elementUtils.markBusy(element, true);
            return detectionStrategy.makeDetectable({
              debug: debug,
              important: importantCssRules
            }, element, function onElementDetectable(element) {
              debug && reporter.log(id, "onElementDetectable");

              if (stateHandler.getState(element)) {
                elementUtils.markAsDetectable(element);
                elementUtils.markBusy(element, false);
                detectionStrategy.addListener(element, onResizeCallback);
                addListener(callOnAdd, element, listener); // Since the element size might have changed since the call to "listenTo", we need to check for this change,
                // so that a resize event may be emitted.
                // Having the startSize object is optional (since it does not make sense in some cases such as unrendered elements), so check for its existance before.
                // Also, check the state existance before since the element may have been uninstalled in the installation process.

                var state = stateHandler.getState(element);

                if (state && state.startSize) {
                  var width = element.offsetWidth;
                  var height = element.offsetHeight;

                  if (state.startSize.width !== width || state.startSize.height !== height) {
                    onResizeCallback(element);
                  }
                }

                if (onReadyCallbacks[id]) {
                  forEach(onReadyCallbacks[id], function (callback) {
                    callback();
                  });
                }
              } else {
                // The element has been unisntalled before being detectable.
                debug && reporter.log(id, "Element uninstalled before being detectable.");
              }

              delete onReadyCallbacks[id];
              elementsReady++;

              if (elementsReady === elements.length) {
                onReadyCallback();
              }
            });
          }

          debug && reporter.log(id, "Already detecable, adding listener."); //The element has been prepared to be detectable and is ready to be listened to.

          addListener(callOnAdd, element, listener);
          elementsReady++;
        });

        if (elementsReady === elements.length) {
          onReadyCallback();
        }
      }

      function uninstall(elements) {
        if (!elements) {
          return reporter.error("At least one element is required.");
        }

        if (isElement(elements)) {
          // A single element has been passed in.
          elements = [elements];
        } else if (isCollection(elements)) {
          // Convert collection to array for plugins.
          // TODO: May want to check so that all the elements in the collection are valid elements.
          elements = toArray(elements);
        } else {
          return reporter.error("Invalid arguments. Must be a DOM element or a collection of DOM elements.");
        }

        forEach(elements, function (element) {
          eventListenerHandler.removeAllListeners(element);
          detectionStrategy.uninstall(element);
          stateHandler.cleanState(element);
        });
      }

      function initDocument(targetDocument) {
        detectionStrategy.initDocument && detectionStrategy.initDocument(targetDocument);
      }

      return {
        listenTo: listenTo,
        removeListener: eventListenerHandler.removeListener,
        removeAllListeners: eventListenerHandler.removeAllListeners,
        uninstall: uninstall,
        initDocument: initDocument
      };
    };

    function getOption(options, name, defaultValue) {
      var value = options[name];

      if ((value === undefined || value === null) && defaultValue !== undefined) {
        return defaultValue;
      }

      return value;
    }
    /***/

  },

  /***/
  "f1ae":
  /***/
  function (module, exports, __nested_webpack_require_447417__) {
    "use strict";

    var $defineProperty = __nested_webpack_require_447417__("86cc");

    var createDesc = __nested_webpack_require_447417__("4630");

    module.exports = function (object, index, value) {
      if (index in object) $defineProperty.f(object, index, createDesc(0, value));else object[index] = value;
    };
    /***/

  },

  /***/
  "f6fd":
  /***/
  function (module, exports) {
    // document.currentScript polyfill by Adam Miller
    // MIT license
    (function (document) {
      var currentScript = "currentScript",
          scripts = document.getElementsByTagName('script'); // Live NodeList collection
      // If browser needs currentScript polyfill, add get currentScript() to the document object

      if (!(currentScript in document)) {
        Object.defineProperty(document, currentScript, {
          get: function () {
            // IE 6-10 supports script readyState
            // IE 10+ support stack trace
            try {
              throw new Error();
            } catch (err) {
              // Find the second match for the "at" string to get file src url from stack.
              // Specifically works with the format of stack traces in IE.
              var i,
                  res = (/.*at [^\(]*\((.*):.+:.+\)$/ig.exec(err.stack) || [false])[1]; // For all scripts on the page, if src matches or if ready state is interactive, return the script tag

              for (i in scripts) {
                if (scripts[i].src == res || scripts[i].readyState == "interactive") {
                  return scripts[i];
                }
              } // If no match, return null


              return null;
            }
          }
        });
      }
    })(document);
    /***/

  },

  /***/
  "f751":
  /***/
  function (module, exports, __nested_webpack_require_449206__) {
    // 19.1.3.1 Object.assign(target, source)
    var $export = __nested_webpack_require_449206__("5ca1");

    $export($export.S + $export.F, 'Object', {
      assign: __nested_webpack_require_449206__("7333")
    });
    /***/
  },

  /***/
  "fa5b":
  /***/
  function (module, exports, __nested_webpack_require_449491__) {
    module.exports = __nested_webpack_require_449491__("5537")('native-function-to-string', Function.toString);
    /***/
  },

  /***/
  "fab2":
  /***/
  function (module, exports, __nested_webpack_require_449683__) {
    var document = __nested_webpack_require_449683__("7726").document;

    module.exports = document && document.documentElement;
    /***/
  },

  /***/
  "fb15":
  /***/
  function (module, __webpack_exports__, __nested_webpack_require_449906__) {
    "use strict"; // ESM COMPAT FLAG

    __nested_webpack_require_449906__.r(__webpack_exports__); // EXPORTS


    __nested_webpack_require_449906__.d(__webpack_exports__, "install", function () {
      return (
        /* reexport */
        components["d"
        /* install */
        ]
      );
    });

    __nested_webpack_require_449906__.d(__webpack_exports__, "GridLayout", function () {
      return (
        /* reexport */
        components["b"
        /* GridLayout */
        ]
      );
    });

    __nested_webpack_require_449906__.d(__webpack_exports__, "GridItem", function () {
      return (
        /* reexport */
        components["a"
        /* GridItem */
        ]
      );
    }); // CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
    // This file is imported into lib/wc client bundles.


    if (typeof window !== 'undefined') {
      if (true) {
        __nested_webpack_require_449906__("f6fd");
      }

      var i;

      if ((i = window.document.currentScript) && (i = i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
        __nested_webpack_require_449906__.p = i[1]; // eslint-disable-line
      }
    } // Indicate to webpack that this file can be concatenated

    /* harmony default export */


    var setPublicPath = null; // EXTERNAL MODULE: ./src/components/index.js

    var components = __nested_webpack_require_449906__("2af9"); // CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js

    /* harmony default export */


    var entry_lib = __webpack_exports__["default"] = components["c"
    /* default */
    ];
    /***/
  },

  /***/
  "fca0":
  /***/
  function (module, exports, __nested_webpack_require_451535__) {
    // 20.1.2.2 Number.isFinite(number)
    var $export = __nested_webpack_require_451535__("5ca1");

    var _isFinite = __nested_webpack_require_451535__("7726").isFinite;

    $export($export.S, 'Number', {
      isFinite: function isFinite(it) {
        return typeof it == 'number' && _isFinite(it);
      }
    });
    /***/
  },

  /***/
  "fdef":
  /***/
  function (module, exports) {
    module.exports = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' + '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';
    /***/
  }
  /******/

})["default"];

/***/ }),

/***/ 6729:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(824);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(208)/* ["default"] */ .Z)
var update = add("adc4a6f2", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ 7915:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(2903);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(208)/* ["default"] */ .Z)
var update = add("5d3652fd", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ 7810:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(9968);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(208)/* ["default"] */ .Z)
var update = add("7ca0dda8", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ 3607:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(7936);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(208)/* ["default"] */ .Z)
var update = add("14132452", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ 6417:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(5595);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(208)/* ["default"] */ .Z)
var update = add("94699972", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ 4337:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(4865);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(208)/* ["default"] */ .Z)
var update = add("d0487028", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ 4309:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(2690);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(208)/* ["default"] */ .Z)
var update = add("9841da94", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ 5464:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(9154);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(208)/* ["default"] */ .Z)
var update = add("f95644d4", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ 9820:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(3515);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(208)/* ["default"] */ .Z)
var update = add("821d2472", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ 4738:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(181);
if(content.__esModule) content = content.default;
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = (__webpack_require__(208)/* ["default"] */ .Z)
var update = add("065ea200", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ 208:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": function() { return /* binding */ addStylesClient; }
});

;// CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/listToStyles.js
/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
function listToStyles(parentId, list) {
  var styles = [];
  var newStyles = {};

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = item[0];
    var css = item[1];
    var media = item[2];
    var sourceMap = item[3];
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    };

    if (!newStyles[id]) {
      styles.push(newStyles[id] = {
        id: id,
        parts: [part]
      });
    } else {
      newStyles[id].parts.push(part);
    }
  }

  return styles;
}
;// CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/addStylesClient.js
/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/



var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

function addStylesClient (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ 7203:
/***/ (function(module) {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE__7203__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	!function() {
/******/ 		__webpack_require__.nmd = function(module) {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		__webpack_require__.p = "";
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "DimpleLowcode": function() { return /* reexport */ DimpleLowcode; },
  "default": function() { return /* binding */ entry_lib; },
  "editTypes": function() { return /* reexport */ editTypes; },
  "valueTypes": function() { return /* reexport */ valueTypes; }
});

;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
/* eslint-disable no-var */
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (false) { var getCurrentScript; }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/dimple-lowcode/src/DimpleLowcode.vue?vue&type=template&id=e7bfadce&scoped=true&
var render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c('div', {
    directives: [{
      name: "loading",
      rawName: "v-loading",
      value: _vm.loading,
      expression: "loading"
    }],
    staticClass: "dimple-lowcode-conatiner"
  }, [!_vm.isPreview ? _c('Form', {
    staticClass: "header",
    attrs: {
      "margin-bottom": "0"
    }
  }, [_vm._t("logo", function () {
    return [_c('div', {
      staticClass: "title",
      staticStyle: {
        "flex": "1"
      }
    }, [_vm._v("DIMPLE表单设计器")])];
  }), _c('div', {
    staticStyle: {
      "display": "flex"
    }
  }, [_c('FormItem', {
    attrs: {
      "label": "栅格高度",
      "type": "number",
      "min": 10
    },
    model: {
      value: _vm.rowHeight,
      callback: function ($$v) {
        _vm.rowHeight = $$v;
      },
      expression: "rowHeight"
    }
  }), _c('FormItem', {
    attrs: {
      "label": "栅格数量",
      "type": "number",
      "min": 1,
      "max": 12
    },
    model: {
      value: _vm.gridNum,
      callback: function ($$v) {
        _vm.gridNum = $$v;
      },
      expression: "gridNum"
    }
  })], 1), _c('div', {
    staticStyle: {
      "flex": "1",
      "text-align": "right"
    }
  }, [_c('el-button', {
    attrs: {
      "type": "primary",
      "size": "mini",
      "icon": "el-icon-setting"
    },
    on: {
      "click": function ($event) {
        _vm.drawer = true;
      }
    }
  }, [_vm._v("表单配置")]), _c('el-button', {
    attrs: {
      "type": "primary",
      "size": "mini",
      "icon": "el-icon-upload"
    },
    on: {
      "click": _vm.toPreview
    }
  }, [_vm._v("预览")]), _c('el-button', {
    attrs: {
      "type": "primary",
      "size": "mini",
      "icon": "el-icon-success"
    },
    on: {
      "click": _vm.save
    }
  }, [_vm._v("保存")])], 1), _vm._t("header-append")], 2) : _vm._e(), _c('div', {
    staticClass: "selection"
  }, [!_vm.isPreview ? _c('div', {
    staticClass: "material",
    on: {
      "click": function ($event) {
        _vm.currentComponent = null;
      }
    }
  }, [_c('Materials', {
    attrs: {
      "materials": _vm.innerMaterials
    },
    on: {
      "drag": _vm.drag,
      "dragend": _vm.dragend
    }
  })], 1) : _vm._e(), _c('div', {
    ref: "content",
    staticClass: "content",
    on: {
      "click": function ($event) {
        _vm.currentComponent = null;
      }
    }
  }, [_c('Form', _vm._b({}, 'Form', _vm.formConfig.formProps, false), [_c('grid-layout', {
    ref: "gridlayout",
    attrs: {
      "layout": _vm.layout,
      "col-num": _vm.gridNum,
      "row-height": _vm.rowHeight,
      "is-draggable": true,
      "is-resizable": true,
      "vertical-compact": true,
      "use-css-transforms": true,
      "auto-size": true
    },
    on: {
      "update:layout": function ($event) {
        _vm.layout = $event;
      },
      "update:colNum": function ($event) {
        _vm.gridNum = $event;
      },
      "update:col-num": function ($event) {
        _vm.gridNum = $event;
      },
      "update:rowHeight": function ($event) {
        _vm.rowHeight = $event;
      },
      "update:row-height": function ($event) {
        _vm.rowHeight = $event;
      }
    }
  }, _vm._l(_vm.layout, function (item) {
    return _c('grid-item', {
      key: item.i,
      attrs: {
        "x": item.x,
        "y": item.y,
        "w": item.w,
        "h": item.h,
        "i": item.i,
        "static": _vm.innerPreview
      }
    }, [_c('div', {
      staticClass: "content-component-item",
      on: {
        "click": function ($event) {
          $event.stopPropagation();
          return _vm.componentItemClickHandle(item);
        }
      }
    }, [!_vm.isPreview ? _c('div', {
      staticClass: "content-component-item-mask",
      class: {
        'content-component-item-mask-active': _vm.currentComponent && _vm.currentComponent.i === item.i
      }
    }, [_c('i', {
      staticClass: "icon el-icon-delete",
      on: {
        "click": function ($event) {
          return _vm.removeItem(item);
        }
      }
    })]) : _vm._e(), (_vm.isPreview ? !item.config.hidden : true) ? [_c('Render', {
      attrs: {
        "value": item,
        "materials": _vm.innerMaterials
      }
    })] : _vm._e()], 2)]);
  }), 1), _vm.formConfig.submit.show ? _c('FormItem', {
    attrs: {
      "label-length": "9"
    }
  }, [_c('el-button', {
    attrs: {
      "type": "primary",
      "size": "mini"
    },
    on: {
      "click": _vm.submit
    }
  }, [_vm._v(_vm._s(_vm.formConfig.submit.submitText))])], 1) : _vm._e()], 1)], 1), !_vm.isPreview ? _c('div', {
    staticClass: "options"
  }, [_c('ComponentConfigs', {
    attrs: {
      "materials": _vm.innerMaterials
    },
    model: {
      value: _vm.currentComponent,
      callback: function ($$v) {
        _vm.currentComponent = $$v;
      },
      expression: "currentComponent"
    }
  })], 1) : _vm._e()]), _c('el-drawer', {
    attrs: {
      "title": "表单配置",
      "visible": _vm.drawer
    },
    on: {
      "update:visible": function ($event) {
        _vm.drawer = $event;
      }
    }
  }, [_c('FormConfigs', {
    model: {
      value: _vm.formConfig,
      callback: function ($$v) {
        _vm.formConfig = $$v;
      },
      expression: "formConfig"
    }
  })], 1)], 1);
};

var staticRenderFns = [];

// EXTERNAL MODULE: ./node_modules/vue-grid-layout/dist/vue-grid-layout.common.js
var vue_grid_layout_common = __webpack_require__(4910);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/dimple-lowcode/src/components/materials/Materials.vue?vue&type=template&id=08929ae5&scoped=true&
var Materialsvue_type_template_id_08929ae5_scoped_true_render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c('div', {
    staticClass: "dimple-lowcode-materials"
  }, [_c('el-tabs', {
    attrs: {
      "stretch": ""
    },
    model: {
      value: _vm.activeTab,
      callback: function ($$v) {
        _vm.activeTab = $$v;
      },
      expression: "activeTab"
    }
  }, [_vm._l(_vm.materials, function (item, index) {
    return [_c('el-tab-pane', {
      attrs: {
        "label": item.name,
        "name": item.key || index
      }
    })];
  })], 2), _c('div', {
    staticClass: "components"
  }, _vm._l(_vm.currentComponents, function (item, index) {
    return _c('div', {
      key: index,
      staticClass: "component-item",
      attrs: {
        "draggable": "true",
        "unselectable": "on"
      },
      on: {
        "drag": function ($event) {
          return _vm.drag($event, item);
        },
        "dragend": function ($event) {
          return _vm.dragend($event, item);
        }
      }
    }, [_vm._v(" " + _vm._s(item.name) + " ")]);
  }), 0)], 1);
};

var Materialsvue_type_template_id_08929ae5_scoped_true_staticRenderFns = [];

// EXTERNAL MODULE: ./node_modules/lodash/merge.js
var merge = __webpack_require__(2569);
var merge_default = /*#__PURE__*/__webpack_require__.n(merge);
// EXTERNAL MODULE: ./node_modules/lodash/uniqueId.js
var uniqueId = __webpack_require__(9483);
var uniqueId_default = /*#__PURE__*/__webpack_require__.n(uniqueId);
;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/utils/valueTypes.js
const valueTypes = {
  string: {
    value: 'string',
    label: '字符串'
  },
  number: {
    value: 'number',
    label: '数字'
  },
  boolean: {
    value: 'boolean',
    label: '布尔值'
  },
  array: {
    value: 'array',
    label: '数组'
  },
  object: {
    value: 'object',
    label: '对象'
  },
  date: {
    value: 'date',
    label: '日期(YYYY-MM-DD)'
  },
  dateRange: {
    value: 'daterange',
    label: '日期范围'
  },
  dateTime: {
    value: 'datetime',
    label: '日期时间(YYYY-MM-DD hh:mm:ss)'
  },
  dateTimeRange: {
    value: 'datetimerange',
    label: '日期时间范围'
  }
};

;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/utils/componentConfig.js


/* harmony default export */ var componentConfig = (() => {
  return {
    filedName: uniqueId_default()(`${+new Date()}_`),
    key: '',
    name: '',
    component: '',
    valueType: valueTypes.string.value,
    value: '',
    props: {},
    defaultProps: {},
    formItemDefaultProps: {
      label: '标签',
      alignItems: '',
      labelVisible: true,
      required: false
    },
    w: 1,
    h: 1,
    i: 'drop',
    config: {
      base: {
        show: true,
        name: '基础配置',
        defaultValue: {
          inputMode: 'default',
          urlParamName: ''
        }
      },
      validate: {
        show: true,
        visibility: true,
        name: '数据校验配置',
        disabled: false,
        requiredValidateMsg: '',
        min: null,
        minValidateMsg: '',
        max: null,
        maxValidateMsg: '',
        mode: 'and',
        rules: []
      },
      filter: {
        show: true,
        name: '数据收集配置',
        visible: false,
        type: ''
      }
    }
  };
});
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/dimple-lowcode/src/components/materials/Materials.vue?vue&type=script&lang=js&


/* harmony default export */ var Materialsvue_type_script_lang_js_ = ({
  props: {
    value: {},
    materials: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      activeTab: ''
    };
  },

  computed: {
    activeMaterialItem() {
      if (this.materials.length === 0) return;
      let item = this.materials.find((item, index) => this.activeTab === item.key || index);
      return item;
    },

    currentComponents() {
      const activeMaterialItem = this.activeMaterialItem;
      if (!activeMaterialItem) return [];
      return activeMaterialItem.components;
    }

  },
  methods: {
    drag(e, item) {
      this.$emit('drag', e, merge_default()(componentConfig(), item));
    },

    dragend(e, item) {
      this.$emit('dragend', merge_default()(componentConfig(), item));
    }

  },

  mounted() {
    this.activeTab = this.materials[0].key || 0;
  }

});
;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/components/materials/Materials.vue?vue&type=script&lang=js&
 /* harmony default export */ var materials_Materialsvue_type_script_lang_js_ = (Materialsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js??clonedRuleSet-54.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-54.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[2]!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/dimple-lowcode/src/components/materials/Materials.vue?vue&type=style&index=0&id=08929ae5&prod&scoped=true&lang=css&
var Materialsvue_type_style_index_0_id_08929ae5_prod_scoped_true_lang_css_ = __webpack_require__(9820);
;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/components/materials/Materials.vue?vue&type=style&index=0&id=08929ae5&prod&scoped=true&lang=css&

;// CONCATENATED MODULE: ./node_modules/@vue/vue-loader-v15/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent(
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */,
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options =
    typeof scriptExports === 'function' ? scriptExports.options : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) {
    // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
          injectStyles.call(
            this,
            (options.functional ? this.parent : this).$root.$options.shadowRoot
          )
        }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/components/materials/Materials.vue



;


/* normalize component */

var component = normalizeComponent(
  materials_Materialsvue_type_script_lang_js_,
  Materialsvue_type_template_id_08929ae5_scoped_true_render,
  Materialsvue_type_template_id_08929ae5_scoped_true_staticRenderFns,
  false,
  null,
  "08929ae5",
  null
  
)

/* harmony default export */ var Materials = (component.exports);
;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/components/materials/index.js


;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/dimple-lowcode/src/components/componentConfigs/Configs.vue?vue&type=template&id=caae7ab8&scoped=true&
var Configsvue_type_template_id_caae7ab8_scoped_true_render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c('div', {
    staticClass: "dimple-lowcode-configs"
  }, [_vm.value ? [_c('el-tabs', {
    attrs: {
      "stretch": ""
    },
    model: {
      value: _vm.activeTab,
      callback: function ($$v) {
        _vm.activeTab = $$v;
      },
      expression: "activeTab"
    }
  }, [_vm._l(_vm.tabs, function (item, index) {
    return [_c('el-tab-pane', {
      attrs: {
        "label": item.name,
        "name": item.key || index
      }
    })];
  })], 2), _c('div', {
    staticClass: "main"
  }, [_c('Form', {
    attrs: {
      "label-length": "7"
    }
  }, [_vm.activeTab === 'base' ? _c('ConfigsBase', {
    attrs: {
      "materials": _vm.materials
    },
    model: {
      value: _vm.value,
      callback: function ($$v) {
        _vm.value = $$v;
      },
      expression: "value"
    }
  }) : _vm._e(), _vm.activeTab === 'validate' ? _c('ConfigsValidate', {
    model: {
      value: _vm.value,
      callback: function ($$v) {
        _vm.value = $$v;
      },
      expression: "value"
    }
  }) : _vm._e(), _vm.activeTab === 'filter' ? _c('ConfigsFilter', {
    model: {
      value: _vm.value,
      callback: function ($$v) {
        _vm.value = $$v;
      },
      expression: "value"
    }
  }) : _vm._e()], 1)], 1)] : _c('div', {
    staticClass: "no-data"
  }, [_vm._v("请选择一个组件进行编辑")])], 2);
};

var Configsvue_type_template_id_caae7ab8_scoped_true_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/dimple-lowcode/src/components/form/Form.vue?vue&type=template&id=534e033c&scoped=true&
var Formvue_type_template_id_534e033c_scoped_true_render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c('div', [_vm._t("default")], 2);
};

var Formvue_type_template_id_534e033c_scoped_true_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/dimple-lowcode/src/components/form/Form.vue?vue&type=script&lang=js&
/* harmony default export */ var Formvue_type_script_lang_js_ = ({
  name: 'Form',
  props: {
    size: {
      type: String,
      default: ''
    },
    labelLength: {
      type: [String, Number],
      default: '5'
    },
    contentWidth: {
      type: [String, Number],
      default: '100%'
    },
    labelPosition: {
      type: String,
      default: ''
    },
    alignItems: {
      type: String,
      default: ''
    },
    marginBottom: {
      type: String,
      default: ''
    }
  }
});
;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/components/form/Form.vue?vue&type=script&lang=js&
 /* harmony default export */ var form_Formvue_type_script_lang_js_ = (Formvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/components/form/Form.vue





/* normalize component */
;
var Form_component = normalizeComponent(
  form_Formvue_type_script_lang_js_,
  Formvue_type_template_id_534e033c_scoped_true_render,
  Formvue_type_template_id_534e033c_scoped_true_staticRenderFns,
  false,
  null,
  "534e033c",
  null
  
)

/* harmony default export */ var Form = (Form_component.exports);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/dimple-lowcode/src/components/form/FormItem.vue?vue&type=template&id=18aae6bd&scoped=true&
var FormItemvue_type_template_id_18aae6bd_scoped_true_render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c('div', {
    staticClass: "ui-aiot-form-item",
    class: [_vm.type],
    style: {
      alignItems: _vm.computeAlignItems,
      marginBottom: _vm.computeMarginBottom ? _vm.computeMarginBottom : undefined
    }
  }, [_vm.computedLabelWidth !== '0px' ? _c('div', {
    staticClass: "label",
    class: [_vm.computeLabelPosition],
    style: {
      width: _vm.computedLabelWidth
    }
  }, [_vm.required ? _c('span', {
    staticClass: "required-icon"
  }, [_vm._v("*")]) : _vm._e(), _c('span', [_vm._v(_vm._s(_vm.label))]), _vm._t("label"), _vm.tip ? _c('el-tooltip', {
    staticClass: "item",
    attrs: {
      "effect": "dark",
      "content": _vm.tip,
      "placement": "top"
    }
  }, [_c('span', {
    staticClass: "tip-icon el-icon-warning"
  })]) : _vm._e()], 2) : _vm._e(), _c('div', {
    staticClass: "content",
    class: [_vm.computedSize],
    style: {
      width: _vm.computedContentWidth,
      flex: _vm.contentWidth === '100%' || _vm.form.contentWidth === '100%' ? '1' : ''
    }
  }, [_vm.type === _vm.types.input ? _c('el-input', _vm._b({
    attrs: {
      "type": _vm.inputType,
      "placeholder": _vm.placeholder,
      "size": _vm.computedSize,
      "disabled": _vm.disabled,
      "clearable": ""
    },
    on: {
      "input": _vm.handleInput,
      "change": _vm.change
    },
    model: {
      value: _vm.innerValue,
      callback: function ($$v) {
        _vm.innerValue = $$v;
      },
      expression: "innerValue"
    }
  }, 'el-input', _vm.$attrs, false)) : _vm._e(), _vm.type === _vm.types.number ? _c('el-input', _vm._b({
    attrs: {
      "placeholder": _vm.placeholder,
      "size": _vm.computedSize,
      "disabled": _vm.disabled,
      "clearable": ""
    },
    on: {
      "input": _vm.handleNumberInput,
      "change": _vm.change,
      "blur": _vm.handleNumberBlur
    },
    model: {
      value: _vm.innerValue,
      callback: function ($$v) {
        _vm.innerValue = $$v;
      },
      expression: "innerValue"
    }
  }, 'el-input', _vm.$attrs, false)) : _vm._e(), _vm.type === _vm.types.float ? _c('el-input', _vm._b({
    attrs: {
      "placeholder": _vm.placeholder,
      "size": _vm.computedSize,
      "disabled": _vm.disabled,
      "clearable": ""
    },
    on: {
      "input": _vm.handleFloatInput,
      "blur": _vm.handleNumberBlur
    },
    model: {
      value: _vm.innerValue,
      callback: function ($$v) {
        _vm.innerValue = $$v;
      },
      expression: "innerValue"
    }
  }, 'el-input', _vm.$attrs, false)) : _vm._e(), _vm.type === _vm.types.textarea ? _c('el-input', _vm._b({
    attrs: {
      "type": "textarea",
      "show-word-limit": "",
      "autosize": {
        minRows: 5,
        maxRows: 5
      },
      "maxlength": _vm.$attrs.maxlength || 50,
      "clearable": "",
      "placeholder": _vm.placeholder,
      "size": _vm.computedSize,
      "disabled": _vm.disabled
    },
    on: {
      "change": _vm.change
    },
    model: {
      value: _vm.innerValue,
      callback: function ($$v) {
        _vm.innerValue = $$v;
      },
      expression: "innerValue"
    }
  }, 'el-input', _vm.$attrs, false)) : _vm.type === _vm.types.switch ? _c('el-switch', _vm._b({
    attrs: {
      "placeholder": _vm.placeholder,
      "size": _vm.computedSize,
      "disabled": _vm.disabled
    },
    on: {
      "change": _vm.change
    },
    model: {
      value: _vm.innerValue,
      callback: function ($$v) {
        _vm.innerValue = $$v;
      },
      expression: "innerValue"
    }
  }, 'el-switch', _vm.$attrs, false)) : _vm.type === _vm.types.radio ? [_c('el-radio-group', {
    staticClass: "radio-group",
    attrs: {
      "disabled": _vm.disabled
    },
    on: {
      "change": _vm.change
    },
    model: {
      value: _vm.innerValue,
      callback: function ($$v) {
        _vm.innerValue = $$v;
      },
      expression: "innerValue"
    }
  }, _vm._l(_vm.computeOptions, function (item) {
    return _c('el-radio', {
      key: item[_vm.optionsValueKey],
      staticClass: "radio",
      style: _vm.horizontalRadio ? 'margin-bottom: 0' : '',
      attrs: {
        "disabled": _vm.disabled,
        "label": item[_vm.optionsValueKey]
      }
    }, [_vm._v(_vm._s(item[_vm.optionsLabelKey]))]);
  }), 1)] : _vm.type === _vm.types.select ? [_c('el-select', _vm._b({
    staticClass: "select",
    attrs: {
      "popper-class": "aiot-form-item-select",
      "placeholder": _vm.placeholder,
      "size": _vm.computedSize,
      "disabled": _vm.disabled,
      "clearable": ""
    },
    on: {
      "change": _vm.change
    },
    model: {
      value: _vm.innerValue,
      callback: function ($$v) {
        _vm.innerValue = $$v;
      },
      expression: "innerValue"
    }
  }, 'el-select', _vm.$attrs, false), _vm._l(_vm.computeOptions, function (item) {
    return _c('el-option', {
      key: item[_vm.optionsValueKey],
      attrs: {
        "label": item[_vm.optionsLabelKey],
        "value": item[_vm.optionsValueKey]
      }
    });
  }), 1)] : _vm.type === _vm.types['checkbox-group'] ? [_c('el-checkbox-group', {
    attrs: {
      "disabled": _vm.disabled
    },
    on: {
      "change": _vm.change
    },
    model: {
      value: _vm.innerValue,
      callback: function ($$v) {
        _vm.innerValue = $$v;
      },
      expression: "innerValue"
    }
  }, _vm._l(_vm.computeOptions, function (item) {
    return _c('el-checkbox', {
      key: item[_vm.optionsValueKey],
      staticClass: "checkbox",
      style: _vm.horizontalCheckbox ? 'margin-bottom: 0' : '',
      attrs: {
        "label": item[_vm.optionsValueKey],
        "disabled": _vm.disabled
      }
    }, [_vm._v(" " + _vm._s(item[_vm.optionsLabelKey]) + " ")]);
  }), 1)] : _vm.type === _vm.types['amount-input'] ? [_c('amount-input', {
    attrs: {
      "size": _vm.computedSize,
      "disabled": _vm.disabled,
      "placeholder": _vm.placeholder
    },
    on: {
      "change": _vm.change
    },
    model: {
      value: _vm.innerValue,
      callback: function ($$v) {
        _vm.innerValue = $$v;
      },
      expression: "innerValue"
    }
  })] : _vm.type === _vm.types['amount-text'] ? [_c('amount-text', {
    attrs: {
      "value": _vm.innerValue
    }
  })] : _vm.type === _vm.types['time'] ? [_c('el-time-select', _vm._b({
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "size": _vm.computedSize,
      "placeholder": _vm.placeholder || '时间',
      "value-format": _vm.$attrs['value-format'] || _vm.$attrs['valueFormat'] || 'timestamp'
    },
    on: {
      "change": _vm.change
    },
    model: {
      value: _vm.innerValue,
      callback: function ($$v) {
        _vm.innerValue = $$v;
      },
      expression: "innerValue"
    }
  }, 'el-time-select', _vm.$attrs, false))] : _vm.type === _vm.types['date'] ? [_c('el-date-picker', _vm._b({
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "type": "date",
      "size": _vm.computedSize,
      "placeholder": _vm.placeholder || '日期',
      "value-format": _vm.$attrs['value-format'] || _vm.$attrs['valueFormat'] || 'timestamp'
    },
    on: {
      "change": _vm.change
    },
    model: {
      value: _vm.innerValue,
      callback: function ($$v) {
        _vm.innerValue = $$v;
      },
      expression: "innerValue"
    }
  }, 'el-date-picker', _vm.$attrs, false))] : _vm.type === _vm.types['datetime'] ? [_c('el-date-picker', _vm._b({
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "type": "datetime",
      "size": _vm.computedSize,
      "placeholder": _vm.placeholder || '日期时间',
      "default-time": _vm.$attrs['default-time'] || _vm.$attrs['defaultTime'] || '23:59:59',
      "value-format": _vm.$attrs['value-format'] || _vm.$attrs['valueFormat'] || 'timestamp'
    },
    on: {
      "change": _vm.change
    },
    model: {
      value: _vm.innerValue,
      callback: function ($$v) {
        _vm.innerValue = $$v;
      },
      expression: "innerValue"
    }
  }, 'el-date-picker', _vm.$attrs, false))] : _vm.type === _vm.types['daterange'] ? [_c('el-date-picker', _vm._b({
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "type": "daterange",
      "size": _vm.computedSize,
      "placeholder": _vm.placeholder,
      "range-separator": _vm.$attrs['range-separator'] || _vm.$attrs['rangeSeparator'] || '至',
      "start-placeholder": _vm.$attrs['start-placeholder'] || _vm.$attrs['startPlaceholder'] || '开始日期',
      "end-placeholder": _vm.$attrs['end-placeholder'] || _vm.$attrs['endPlaceholder'] || '结束日期',
      "value-format": _vm.$attrs['value-format'] || _vm.$attrs['valueFormat'] || 'timestamp',
      "format": _vm.$attrs['format'] || 'yyyy-MM-dd'
    },
    on: {
      "change": _vm.change
    },
    model: {
      value: _vm.innerValue,
      callback: function ($$v) {
        _vm.innerValue = $$v;
      },
      expression: "innerValue"
    }
  }, 'el-date-picker', _vm.$attrs, false))] : _vm.type === _vm.types['datetimerange'] ? [_c('el-date-picker', _vm._b({
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "type": "datetimerange",
      "size": _vm.computedSize,
      "placeholder": _vm.placeholder,
      "range-separator": _vm.$attrs['range-separator'] || _vm.$attrs['rangeSeparator'] || '至',
      "start-placeholder": _vm.$attrs['start-placeholder'] || _vm.$attrs['startPlaceholder'] || '开始日期时间',
      "end-placeholder": _vm.$attrs['end-placeholder'] || _vm.$attrs['endPlaceholder'] || '结束日期时间',
      "default-time": _vm.$attrs['default-time'] || _vm.$attrs['defaultTime'] || ['00:00:00', '23:59:59'],
      "value-format": _vm.$attrs['value-format'] || _vm.$attrs['valueFormat'] || 'timestamp',
      "format": _vm.$attrs['format'] || 'yyyy-MM-dd HH:mm:ss'
    },
    on: {
      "change": _vm.change
    },
    model: {
      value: _vm.innerValue,
      callback: function ($$v) {
        _vm.innerValue = $$v;
      },
      expression: "innerValue"
    }
  }, 'el-date-picker', _vm.$attrs, false))] : _vm.type === _vm.types['text'] ? _vm._t("default", function () {
    return [_vm._v(" " + _vm._s(_vm.value) + " ")];
  }) : _vm.type === _vm.types['autocomplete'] ? _vm._t("default", function () {
    return [_c('el-autocomplete', _vm._g(_vm._b({
      staticStyle: {
        "width": "100%"
      },
      attrs: {
        "size": _vm.computedSize,
        "fetch-suggestions": _vm.querySearch,
        "placeholder": _vm.placeholder
      },
      on: {
        "select": _vm.autocompleteChange
      },
      scopedSlots: _vm._u([{
        key: "default",
        fn: function ({
          item
        }) {
          return [_c('span', [_vm._v(_vm._s(item[_vm.optionsLabelKey]))])];
        }
      }]),
      model: {
        value: _vm.innerValue,
        callback: function ($$v) {
          _vm.innerValue = $$v;
        },
        expression: "innerValue"
      }
    }, 'el-autocomplete', _vm.$attrs, false), _vm.$listeners))];
  }) : _vm._t("default"), _vm.innerError ? _c('div', {
    staticClass: "error-message",
    class: {
      block: _vm.blockMessage,
      inline: !_vm.blockMessage
    }
  }, [_c('i', {
    staticClass: "iconfont icontishixinxi error-message-icon"
  }), _vm._v(" " + _vm._s(_vm.innerError) + " ")]) : _vm._e(), _vm.$slots.append ? _c('div', {
    staticClass: "error-message inline"
  }, [_vm._t("append")], 2) : _vm._e()], 2)]);
};

var FormItemvue_type_template_id_18aae6bd_scoped_true_staticRenderFns = [];

;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/utils/resizeObserver.js
/**
 *
 * @param { (e: DOMRectReadOnly) => any } cb dom大小变化的回调
 * @param {HTMLElement} dom 检测的dom
 * @returns { ResizeObserver } 返回的监视器实例
 */
const resizeObserver = (cb, dom) => {
  const watchDom = dom || document.documentElement;
  const objResizeObserver = new ResizeObserver(entries => {
    const entry = entries[0];
    cb(entry.contentRect);
  });
  objResizeObserver.observe(watchDom);
  return objResizeObserver;
};


;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/dimple-lowcode/src/components/form/FormItem.vue?vue&type=script&lang=js&

const types = {
  text: 'text',
  input: 'input',
  autocomplete: 'autocomplete',
  number: 'number',
  float: 'float',
  textarea: 'textarea',
  switch: 'switch',
  radio: 'radio',
  select: 'select',
  'checkbox-group': 'checkbox-group',
  time: 'time',
  date: 'date',
  datetime: 'datetime',
  daterange: 'daterange',
  datetimerange: 'datetimerange'
};
/* harmony default export */ var FormItemvue_type_script_lang_js_ = ({
  name: 'FormItem',
  props: {
    type: {
      type: String,
      default: ''
    },
    inputType: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    labelVisible: {
      type: Boolean,
      default: true
    },
    labelLength: {
      type: [String, Number],
      default: ''
    },
    labelPosition: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    options: {
      type: [Array, Object],
      default: () => []
    },
    optionsLabelKey: {
      type: String,
      default: 'label'
    },
    optionsValueKey: {
      type: String,
      default: 'value'
    },
    value: {
      type: [String, Boolean, Number, Array],
      default: undefined
    },
    size: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    },
    tip: {
      type: String,
      default: ''
    },
    blockMessage: {
      type: Boolean,
      default: false
    },
    contentWidth: {
      type: [String, Number],
      default: ''
    },
    alignItems: {
      type: String,
      default: 'center'
    },
    marginBottom: {
      type: String,
      default: ''
    },
    horizontalRadio: {
      type: Boolean,
      default: false
    },
    horizontalCheckbox: {
      type: Boolean,
      default: false
    },
    inputFilterString: {
      type: Array,
      default: () => [',', '。', '，', '!', '$', '^', '`', '、']
    }
  },

  data() {
    return {
      clientWidth: document.documentElement.clientWidth,
      types,
      innerValue: '',
      innerError: ''
    };
  },

  computed: {
    form() {
      let parent = this.$parent;
      let parentName = parent.$options._componentTag;

      while (!['DimpleLowcodeForm', 'dimple-lowcode-form', 'Form'].includes(parentName)) {
        parent = parent.$parent;
        parentName = parent.$options._componentTag;
      }

      return parent;
    },

    computedSize() {
      return this.size || this.form.size || 'mini';
    },

    computedLabelWidth() {
      if (!this.labelVisible) return '0px';
      const labelUnitWidth = 14;
      const baseViewportWidth = 1920;
      let scaleLabelUnitWidth = labelUnitWidth * this.clientWidth / baseViewportWidth;
      if (scaleLabelUnitWidth < 12) scaleLabelUnitWidth = 12;
      const currentLabelLength = this.labelLength !== undefined && this.labelLength !== '' ? this.labelLength : this.form.labelLength;
      const labelLength = Number(currentLabelLength);
      const res = scaleLabelUnitWidth * labelLength + 'px';
      return res;
    },

    computedContentWidth() {
      return this.px2vw(this.contentWidth || this.form.contentWidth || '');
    },

    computeLabelPosition() {
      return this.labelPosition || this.form.labelPosition || 'right';
    },

    computeAlignItems() {
      if (this.blockMessage) return this.form.alignItems || 'flex-start';
      if (this.type === types.textarea) return this.form.alignItems || 'flex-start';
      return this.alignItems || this.form.alignItems || 'center';
    },

    computeMarginBottom() {
      return this.px2vw(this.marginBottom || this.form.marginBottom || '');
    },

    computeOptions() {
      if (Array.isArray(this.options)) return this.options;
      const res = [];

      for (const key in this.options) {
        const item = this.options[key];
        let pushItemKey = item[this.optionsValueKey] || key;
        if (!isNaN(pushItemKey)) pushItemKey = Number(pushItemKey);
        const pushItem = {
          [this.optionsValueKey]: pushItemKey,
          [this.optionsLabelKey]: item[this.optionsLabelKey] || item
        };
        res.push(pushItem);
      }

      return res;
    }

  },
  watch: {
    value: {
      handler: function (newValue) {
        if (newValue === this.innerValue) return;
        this.innerValue = newValue;
      },
      immediate: true
    },
    error: {
      handler: function (newValue) {
        if (newValue === this.innerError) return;
        this.innerError = newValue;
      },
      immediate: true
    },

    innerValue() {
      this.resetError();
    }

  },
  methods: {
    resetError() {
      this.innerError = '';
      this.$emit('update:error', '');
    },

    handleInput(value) {
      const inputFilterString = this.inputFilterString;
      let filterValue = value;
      filterValue = value.replace(/\s*/g, '');

      for (const item of inputFilterString) {
        filterValue = filterValue.replace(item, '');
      }

      this.innerValue = filterValue;
    },

    change(e) {
      this.resetError();
      this.$emit('change', e);
      this.$emit('input', e);
    },

    px2vw(px) {
      if (!px) return px;
      if (px.toString().indexOf('%') > -1) return;
      const pxNumber = Number(px.toString().replace('px', ''));
      if (Number.isNaN(pxNumber)) return px;
      return Number((100 * pxNumber / 1920).toFixed(3)) + 'vw';
    },

    handleNumberInput(value) {
      this.resetError();
      const {
        max = Number.MAX_SAFE_INTEGER,
        min = 0
      } = this.$attrs;
      const innerValue = value.toString().replace(/[^0-9-]+/, '').replace('.', '');
      if (value.toString().indexOf('.') > -1) return this.innerValue = innerValue;
      if (value.toString().indexOf('e') > -1) return this.innerValue = innerValue;
      if (Number.isNaN(Number(value))) return this.innerValue = innerValue;
      if (Number(value) > Number(max)) return this.innerValue = max;
      if (Number(value) < Number(min)) return this.innerValue = min;
    },

    handleNumberBlur() {
      let value = '';
      if (this.innerValue === '') value = '';
      if (this.innerValue !== '') value = Number(this.innerValue);
      this.$emit('input', value);
      this.$emit('change', value);
    },

    handleFloatInput(value) {
      this.resetError();
      const {
        max = Number.MAX_SAFE_INTEGER,
        min = 0
      } = this.$attrs;
      const innerValue = value.toString().replace(/[^0-9-]+/, '');
      if (value.toString().indexOf('e') > -1) return this.innerValue = innerValue;
      if (Number.isNaN(Number(value))) return this.innerValue = innerValue;
      if (Number(value) > Number(max)) return this.innerValue = max;
      if (Number(value) < Number(min)) return this.innerValue = min;
    },

    isEmpty(obj) {
      const reg = new RegExp('^[ ]+$');
      if (typeof obj === 'undefined' || obj === null || obj === '' || reg.test(obj)) return true;
      return false;
    },

    querySearch(queryString, cb) {
      const options = this.options || [];
      const text = queryString.toLowerCase();
      const results = queryString ? options.filter(item => {
        const label = item[this.optionsLabelKey].toLowerCase();
        const value = item[this.optionsValueKey].toLowerCase();
        return label.indexOf(text) > -1 || value.indexOf(text) > -1;
      }) : options;
      cb(results);
    },

    autocompleteChange(item) {
      this.change(item[this.optionsValueKey]);
    }

  },

  created() {
    if (this.type === types['checkbox-group']) this.innerValue = [];
    if (this.type === types['datetimerange']) this.innerValue = [];
  },

  mounted() {
    this.resizeObserver = resizeObserver(({
      width,
      height
    }) => {
      this.clientWidth = width;
      this.clientHeight = height;
    });
  },

  destroyed() {
    this.resizeObserver.disconnect();
  }

});
;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/components/form/FormItem.vue?vue&type=script&lang=js&
 /* harmony default export */ var form_FormItemvue_type_script_lang_js_ = (FormItemvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js??clonedRuleSet-54.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-54.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[2]!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/dimple-lowcode/src/components/form/FormItem.vue?vue&type=style&index=0&id=18aae6bd&prod&scoped=true&lang=css&
var FormItemvue_type_style_index_0_id_18aae6bd_prod_scoped_true_lang_css_ = __webpack_require__(4337);
;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/components/form/FormItem.vue?vue&type=style&index=0&id=18aae6bd&prod&scoped=true&lang=css&

// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js??clonedRuleSet-54.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-54.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[2]!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/dimple-lowcode/src/components/form/FormItem.vue?vue&type=style&index=1&id=18aae6bd&prod&lang=css&
var FormItemvue_type_style_index_1_id_18aae6bd_prod_lang_css_ = __webpack_require__(4309);
;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/components/form/FormItem.vue?vue&type=style&index=1&id=18aae6bd&prod&lang=css&

;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/components/form/FormItem.vue



;



/* normalize component */

var FormItem_component = normalizeComponent(
  form_FormItemvue_type_script_lang_js_,
  FormItemvue_type_template_id_18aae6bd_scoped_true_render,
  FormItemvue_type_template_id_18aae6bd_scoped_true_staticRenderFns,
  false,
  null,
  "18aae6bd",
  null
  
)

/* harmony default export */ var FormItem = (FormItem_component.exports);
;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/components/form/index.js



;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/dimple-lowcode/src/components/render/Render.vue?vue&type=template&id=77d2aa16&scoped=true&
var Rendervue_type_template_id_77d2aa16_scoped_true_render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c('div', [_c('FormItem', _vm._b({}, 'FormItem', _vm.value.formItemDefaultProps, false), [_vm.customComponent ? _c('RenderComponent', {
    attrs: {
      "component": _vm.customComponent,
      "props": _vm.componentProps
    },
    model: {
      value: _vm.value.value,
      callback: function ($$v) {
        _vm.$set(_vm.value, "value", $$v);
      },
      expression: "value.value"
    }
  }) : _vm._e()], 1)], 1);
};

var Rendervue_type_template_id_77d2aa16_scoped_true_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/dimple-lowcode/src/components/render/RenderComponent.vue?vue&type=script&lang=js&
/* harmony default export */ var RenderComponentvue_type_script_lang_js_ = ({
  props: {
    value: {},
    component: {},
    props: {}
  },

  render(h) {
    const self = this;
    if (!this.component) return;
    const props = this.props || {};
    return h(this.component, {
      props: {
        value: this.value,
        ...props
      },
      on: {
        input: function (data) {
          self.$emit('input', data);
        }
      }
    });
  }

});
;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/components/render/RenderComponent.vue?vue&type=script&lang=js&
 /* harmony default export */ var render_RenderComponentvue_type_script_lang_js_ = (RenderComponentvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/components/render/RenderComponent.vue
var RenderComponent_render, RenderComponent_staticRenderFns
;



/* normalize component */
;
var RenderComponent_component = normalizeComponent(
  render_RenderComponentvue_type_script_lang_js_,
  RenderComponent_render,
  RenderComponent_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var RenderComponent = (RenderComponent_component.exports);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/dimple-lowcode/src/components/render/Render.vue?vue&type=script&lang=js&


/* harmony default export */ var Rendervue_type_script_lang_js_ = ({
  components: {
    FormItem: FormItem,
    RenderComponent: RenderComponent
  },
  props: {
    value: {},
    materials: {}
  },
  computed: {
    customComponent() {
      let res = null;
      const materials = this.materials || [];

      for (const materialItem of materials) {
        const components = materialItem.components || [];
        const componentItem = components.find(item => item.key === this.value.key);
        res = componentItem && componentItem.component;
        if (res) break;
      }

      return res;
    },

    componentProps() {
      let res = {};
      Object.keys(this.value.props).forEach(key => {
        res[key] = this.value.props[key].value;
      });
      const defaultProps = this.value.defaultProps || {};
      return { ...defaultProps,
        ...res
      };
    }

  }
});
;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/components/render/Render.vue?vue&type=script&lang=js&
 /* harmony default export */ var render_Rendervue_type_script_lang_js_ = (Rendervue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/components/render/Render.vue





/* normalize component */
;
var Render_component = normalizeComponent(
  render_Rendervue_type_script_lang_js_,
  Rendervue_type_template_id_77d2aa16_scoped_true_render,
  Rendervue_type_template_id_77d2aa16_scoped_true_staticRenderFns,
  false,
  null,
  "77d2aa16",
  null
  
)

/* harmony default export */ var Render = (Render_component.exports);
;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/components/render/index.js


;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/dimple-lowcode/src/components/componentConfigs/ConfigsBase.vue?vue&type=template&id=cdc94b1a&scoped=true&
var ConfigsBasevue_type_template_id_cdc94b1a_scoped_true_render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c('div', [_c('FormItem', {
    attrs: {
      "label": "组件名称"
    }
  }, [_vm._v(_vm._s(_vm.value.name))]), [_c('FormItem', {
    attrs: {
      "label": "标签文本",
      "type": "input"
    },
    model: {
      value: _vm.value.formItemDefaultProps.label,
      callback: function ($$v) {
        _vm.$set(_vm.value.formItemDefaultProps, "label", $$v);
      },
      expression: "value.formItemDefaultProps.label"
    }
  }), _c('FormItem', {
    attrs: {
      "label": "标签方向",
      "type": "select",
      "options": _vm.labelPositionOptions
    },
    model: {
      value: _vm.value.formItemDefaultProps.labelPosition,
      callback: function ($$v) {
        _vm.$set(_vm.value.formItemDefaultProps, "labelPosition", $$v);
      },
      expression: "value.formItemDefaultProps.labelPosition"
    }
  }), _c('FormItem', {
    attrs: {
      "label": "标签对齐方式",
      "type": "select",
      "options": _vm.labelAlignItemsOptions
    },
    model: {
      value: _vm.value.formItemDefaultProps.alignItems,
      callback: function ($$v) {
        _vm.$set(_vm.value.formItemDefaultProps, "alignItems", $$v);
      },
      expression: "value.formItemDefaultProps.alignItems"
    }
  }), _c('FormItem', {
    attrs: {
      "label": "显示标签",
      "type": "switch"
    },
    model: {
      value: _vm.value.formItemDefaultProps.labelVisible,
      callback: function ($$v) {
        _vm.$set(_vm.value.formItemDefaultProps, "labelVisible", $$v);
      },
      expression: "value.formItemDefaultProps.labelVisible"
    }
  })], _c('FormItem', {
    attrs: {
      "label": "默认值设置"
    }
  }, [_c('el-button', {
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "size": "mini",
      "icon": "el-icon-edit"
    },
    on: {
      "click": function ($event) {
        _vm.defaultValueDialogVisible = true;
      }
    }
  }, [_vm._v("录入")])], 1), Object.keys(_vm.value.props).length ? _c('FormItem', {
    attrs: {
      "label": "组件参数",
      "align-items": "flex-start"
    }
  }, [_vm._l(_vm.value.props, function (item, key) {
    return [_c('div', {
      staticStyle: {
        "margin-bottom": "10px"
      }
    }, [_c('el-button', {
      staticStyle: {
        "width": "100%",
        "magirn-botton": "10px"
      },
      attrs: {
        "size": "mini",
        "icon": "el-icon-edit"
      },
      on: {
        "click": function ($event) {
          return _vm.showPropsItemEditor(item);
        }
      }
    }, [_vm._v(_vm._s(item.label))])], 1)];
  })], 2) : _vm._e(), _c('FormItem', {
    attrs: {
      "label": "隐藏该项",
      "type": "switch",
      "tip": "预览和发布时隐藏该项"
    },
    model: {
      value: _vm.value.config.hidden,
      callback: function ($$v) {
        _vm.$set(_vm.value.config, "hidden", $$v);
      },
      expression: "value.config.hidden"
    }
  }), _vm.value ? _c('el-dialog', {
    attrs: {
      "title": `${_vm.value.formItemDefaultProps.label}-默认值录入`,
      "visible": _vm.defaultValueDialogVisible
    },
    on: {
      "update:visible": function ($event) {
        _vm.defaultValueDialogVisible = $event;
      }
    }
  }, [_c('Form', [_c('FormItem', {
    attrs: {
      "label": "录入模式",
      "type": "select",
      "options": _vm.defaultValueInputOptions
    },
    model: {
      value: _vm.value.config.base.defaultValue.inputMode,
      callback: function ($$v) {
        _vm.$set(_vm.value.config.base.defaultValue, "inputMode", $$v);
      },
      expression: "value.config.base.defaultValue.inputMode"
    }
  }), _c('div', {
    staticStyle: {
      "max-height": "50vh",
      "overflow": "overlay"
    }
  }, [_vm.value.config.base.defaultValue.inputMode === 'default' ? [_c('Render', {
    attrs: {
      "materials": _vm.materials
    },
    model: {
      value: _vm.value,
      callback: function ($$v) {
        _vm.value = $$v;
      },
      expression: "value"
    }
  })] : _vm._e(), _vm.value.config.base.defaultValue.inputMode === 'input' ? [_c('FormItem', {
    attrs: {
      "label": "默认值",
      "type": "input"
    },
    model: {
      value: _vm.value.value,
      callback: function ($$v) {
        _vm.$set(_vm.value, "value", $$v);
      },
      expression: "value.value"
    }
  })] : _vm._e(), _vm.value.config.base.defaultValue.inputMode === 'urlParam' ? [_c('Form', [_c('FormItem', {
    attrs: {
      "label": "默认值映射",
      "type": "autocomplete",
      "tip": "请输入默认值对应的地址栏参数名称",
      "options": _vm.urlParamNameOptions
    },
    model: {
      value: _vm.value.config.base.defaultValue.urlParamName,
      callback: function ($$v) {
        _vm.$set(_vm.value.config.base.defaultValue, "urlParamName", $$v);
      },
      expression: "value.config.base.defaultValue.urlParamName"
    }
  }), _c('FormItem', {
    attrs: {
      "label": "默认值预览",
      "tip": "如果当前地址栏有关联参数会显示对应值"
    }
  }, [_vm._v(" " + _vm._s(_vm.getQueryByKey(_vm.value.config.base.defaultValue.urlParamName) || '-') + " ")])], 1)] : _vm._e()], 2)], 1), _c('div', {
    staticStyle: {
      "text-align": "right"
    }
  }, [_c('el-button', {
    attrs: {
      "size": "mini"
    },
    on: {
      "click": function ($event) {
        _vm.defaultValueDialogVisible = false;
      }
    }
  }, [_vm._v("取消")]), _c('el-button', {
    attrs: {
      "size": "mini",
      "type": "primary"
    },
    on: {
      "click": function ($event) {
        _vm.defaultValueDialogVisible = false;
      }
    }
  }, [_vm._v("确定")])], 1)], 1) : _vm._e(), _vm.value ? _c('el-dialog', {
    attrs: {
      "title": `${_vm.value.formItemDefaultProps.label}-${_vm.currentPropsItem && _vm.currentPropsItem.label}-参数编辑`,
      "visible": _vm.propsItemEditorDialogVisible
    },
    on: {
      "update:visible": function ($event) {
        _vm.propsItemEditorDialogVisible = $event;
      }
    }
  }, [_vm.currentPropsItem ? _c('Form', [_vm.currentPropsItem.editType === 'custom' ? [_c('Render', {
    attrs: {
      "materials": _vm.materials
    },
    model: {
      value: _vm.currentPropsItem,
      callback: function ($$v) {
        _vm.currentPropsItem = $$v;
      },
      expression: "currentPropsItem"
    }
  })] : [_vm.currentPropsItem.editType === 'options' ? _c('OptionsEditor', {
    model: {
      value: _vm.currentPropsItem,
      callback: function ($$v) {
        _vm.currentPropsItem = $$v;
      },
      expression: "currentPropsItem"
    }
  }) : _c('FormItem', _vm._b({
    attrs: {
      "label-length": 0,
      "type": _vm.currentPropsItem.editType
    },
    model: {
      value: _vm.currentPropsItem.value,
      callback: function ($$v) {
        _vm.$set(_vm.currentPropsItem, "value", $$v);
      },
      expression: "currentPropsItem.value"
    }
  }, 'FormItem', _vm.currentPropsItem.defaultProps || {}, false))]], 2) : _vm._e(), _c('div', {
    staticStyle: {
      "text-align": "right"
    }
  }, [_c('el-button', {
    attrs: {
      "size": "mini"
    },
    on: {
      "click": function ($event) {
        _vm.propsItemEditorDialogVisible = false;
      }
    }
  }, [_vm._v("取消")]), _c('el-button', {
    attrs: {
      "size": "mini",
      "type": "primary"
    },
    on: {
      "click": function ($event) {
        _vm.propsItemEditorDialogVisible = false;
      }
    }
  }, [_vm._v("确定")])], 1)], 1) : _vm._e()], 2);
};

var ConfigsBasevue_type_template_id_cdc94b1a_scoped_true_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/dimple-lowcode/src/components/options-editor/OptionsEditor.vue?vue&type=template&id=f7af5492&scoped=true&
var OptionsEditorvue_type_template_id_f7af5492_scoped_true_render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c('div', [_c('div', {
    staticClass: "options-editor"
  }, [!_vm.value.value.length ? _c('div', {
    staticClass: "no-data"
  }, [_vm._v("暂无选项")]) : _vm._e(), _vm._l(_vm.value.value, function (item, index) {
    return [_c('div', {
      staticClass: "options-editor-item"
    }, [_vm._v(" 显示标签: "), _c('el-input', {
      staticClass: "options-editor-item-input",
      attrs: {
        "size": "mini"
      },
      model: {
        value: item.label,
        callback: function ($$v) {
          _vm.$set(item, "label", $$v);
        },
        expression: "item.label"
      }
    }), _vm._v(" 代表实值: "), _c('el-input', {
      staticClass: "options-editor-item-input",
      attrs: {
        "size": "mini"
      },
      model: {
        value: item.value,
        callback: function ($$v) {
          _vm.$set(item, "value", $$v);
        },
        expression: "item.value"
      }
    }), _c('el-button', {
      attrs: {
        "icon": "el-icon-delete",
        "circle": "",
        "size": "mini",
        "type": "danger"
      },
      on: {
        "click": function ($event) {
          return _vm.value.value.splice(index, 1);
        }
      }
    })], 1)];
  })], 2), _c('div', {
    staticClass: "options-editor-add-btn"
  }, [_c('el-button', {
    attrs: {
      "icon": "el-icon-plus",
      "circle": "",
      "size": "mini",
      "type": "primary"
    },
    on: {
      "click": function ($event) {
        return _vm.value.value.push({
          label: '',
          value: ''
        });
      }
    }
  })], 1)]);
};

var OptionsEditorvue_type_template_id_f7af5492_scoped_true_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/dimple-lowcode/src/components/options-editor/OptionsEditor.vue?vue&type=script&lang=js&
/* harmony default export */ var OptionsEditorvue_type_script_lang_js_ = ({
  props: {
    value: {}
  }
});
;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/components/options-editor/OptionsEditor.vue?vue&type=script&lang=js&
 /* harmony default export */ var options_editor_OptionsEditorvue_type_script_lang_js_ = (OptionsEditorvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js??clonedRuleSet-54.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-54.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[2]!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/dimple-lowcode/src/components/options-editor/OptionsEditor.vue?vue&type=style&index=0&id=f7af5492&prod&scoped=true&lang=css&
var OptionsEditorvue_type_style_index_0_id_f7af5492_prod_scoped_true_lang_css_ = __webpack_require__(4738);
;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/components/options-editor/OptionsEditor.vue?vue&type=style&index=0&id=f7af5492&prod&scoped=true&lang=css&

;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/components/options-editor/OptionsEditor.vue



;


/* normalize component */

var OptionsEditor_component = normalizeComponent(
  options_editor_OptionsEditorvue_type_script_lang_js_,
  OptionsEditorvue_type_template_id_f7af5492_scoped_true_render,
  OptionsEditorvue_type_template_id_f7af5492_scoped_true_staticRenderFns,
  false,
  null,
  "f7af5492",
  null
  
)

/* harmony default export */ var OptionsEditor = (OptionsEditor_component.exports);
;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/utils/getQueryByKey.js
const getQuery = (str = '') => {
  if (!str) return {};
  if (str.split('?').length < 2) return {};
  let res = {};
  str.split('?')[1].split('&').forEach(item => {
    const key = item.split('=')[0];
    const value = item.split('=')[1];
    res[key] = value;
  });
  return res;
};

const getQueryByKey = key => {
  const hashQuery = getQuery(location.hash);
  const searchQuery = getQuery(location.search);
  const res = { ...hashQuery,
    ...searchQuery
  };
  return res[key];
};


;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/dimple-lowcode/src/components/componentConfigs/ConfigsBase.vue?vue&type=script&lang=js&




/* harmony default export */ var ConfigsBasevue_type_script_lang_js_ = ({
  components: {
    FormItem: FormItem,
    Render: Render,
    OptionsEditor: OptionsEditor
  },
  props: {
    value: {},
    materials: {}
  },

  data() {
    return {
      labelPositionOptions: [{
        value: 'left',
        label: '左对齐'
      }, {
        value: 'right',
        label: '右对齐'
      }],
      labelAlignItemsOptions: [{
        value: 'center',
        label: '居中对齐'
      }, {
        value: 'flex-start',
        label: '顶部对齐'
      }, {
        value: 'flex-end',
        label: '底部对齐'
      }],
      defaultValueInputOptions: [{
        value: 'default',
        label: '组件交互录入'
      }, {
        value: 'input',
        label: '输入框录入'
      }, {
        value: 'urlParam',
        label: '从地址栏参数获取'
      }],
      urlParamNameOptions: [{
        value: 'mobile',
        label: 'mobile（手机号）'
      }, {
        value: 'username',
        label: 'username（用户名）'
      }, {
        value: 'projectId',
        label: 'projectId（项目id）'
      }, {
        value: 'projectName',
        label: 'projectName（项目名）'
      }, {
        value: 'projectCode',
        label: 'projectCode（项目编号）'
      }],
      defaultValueDialogVisible: false,
      propsItemEditorDialogVisible: false,
      currentPropsItem: null
    };
  },

  methods: {
    showPropsItemEditor(item) {
      this.propsItemEditorDialogVisible = true;
      this.currentPropsItem = item;
    },

    getQueryByKey: getQueryByKey
  }
});
;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/components/componentConfigs/ConfigsBase.vue?vue&type=script&lang=js&
 /* harmony default export */ var componentConfigs_ConfigsBasevue_type_script_lang_js_ = (ConfigsBasevue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/components/componentConfigs/ConfigsBase.vue





/* normalize component */
;
var ConfigsBase_component = normalizeComponent(
  componentConfigs_ConfigsBasevue_type_script_lang_js_,
  ConfigsBasevue_type_template_id_cdc94b1a_scoped_true_render,
  ConfigsBasevue_type_template_id_cdc94b1a_scoped_true_staticRenderFns,
  false,
  null,
  "cdc94b1a",
  null
  
)

/* harmony default export */ var ConfigsBase = (ConfigsBase_component.exports);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/dimple-lowcode/src/components/componentConfigs/ConfigsValidate.vue?vue&type=template&id=78fb8f85&scoped=true&
var ConfigsValidatevue_type_template_id_78fb8f85_scoped_true_render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c('div', [_c('FormItem', {
    attrs: {
      "label": "字段名",
      "type": "input"
    },
    model: {
      value: _vm.value.filedName,
      callback: function ($$v) {
        _vm.$set(_vm.value, "filedName", $$v);
      },
      expression: "value.filedName"
    }
  }), _c('FormItem', {
    attrs: {
      "label": "数据类型",
      "type": "select",
      "options": _vm.valueTypeOptions
    },
    model: {
      value: _vm.value.valueType,
      callback: function ($$v) {
        _vm.$set(_vm.value, "valueType", $$v);
      },
      expression: "value.valueType"
    }
  }), _c('FormItem', {
    attrs: {
      "label": "必填",
      "type": "switch"
    },
    model: {
      value: _vm.value.formItemDefaultProps.required,
      callback: function ($$v) {
        _vm.$set(_vm.value.formItemDefaultProps, "required", $$v);
      },
      expression: "value.formItemDefaultProps.required"
    }
  }), _c('FormItem', {
    attrs: {
      "label": "必填校验提示",
      "type": "input"
    },
    model: {
      value: _vm.value.config.validate.requiredValidateMsg,
      callback: function ($$v) {
        _vm.$set(_vm.value.config.validate, "requiredValidateMsg", $$v);
      },
      expression: "value.config.validate.requiredValidateMsg"
    }
  }), _c('FormItem', {
    attrs: {
      "label": "min",
      "type": "number",
      "min": 0,
      "tip": "最小长度或最小值"
    },
    model: {
      value: _vm.value.config.validate.min,
      callback: function ($$v) {
        _vm.$set(_vm.value.config.validate, "min", $$v);
      },
      expression: "value.config.validate.min"
    }
  }), _c('FormItem', {
    attrs: {
      "label": "min校验提示",
      "type": "input"
    },
    model: {
      value: _vm.value.config.validate.minValidateMsg,
      callback: function ($$v) {
        _vm.$set(_vm.value.config.validate, "minValidateMsg", $$v);
      },
      expression: "value.config.validate.minValidateMsg"
    }
  }), _c('FormItem', {
    attrs: {
      "label": "max",
      "type": "number",
      "min": 0,
      "tip": "最大长度或最大值"
    },
    model: {
      value: _vm.value.config.validate.max,
      callback: function ($$v) {
        _vm.$set(_vm.value.config.validate, "max", $$v);
      },
      expression: "value.config.validate.max"
    }
  }), _c('FormItem', {
    attrs: {
      "label": "max校验提示",
      "type": "input"
    },
    model: {
      value: _vm.value.config.validate.maxValidateMsg,
      callback: function ($$v) {
        _vm.$set(_vm.value.config.validate, "maxValidateMsg", $$v);
      },
      expression: "value.config.validate.maxValidateMsg"
    }
  }), _c('FormItem', {
    attrs: {
      "label": "校验规则"
    }
  }, [_c('el-button', {
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "size": "mini",
      "icon": "el-icon-edit"
    },
    on: {
      "click": function ($event) {
        _vm.rulesEditorDialogVisible = true;
      }
    }
  }, [_vm._v(_vm._s(_vm.value.config.validate.rules.length) + "条校验规则")])], 1), _c('FormItem', {
    attrs: {
      "label": "禁用校验",
      "type": "switch"
    },
    model: {
      value: _vm.value.config.validate.disabled,
      callback: function ($$v) {
        _vm.$set(_vm.value.config.validate, "disabled", $$v);
      },
      expression: "value.config.validate.disabled"
    }
  }), _c('el-dialog', {
    attrs: {
      "title": `校验规则列表(共${_vm.value.config.validate.rules.length}条)`,
      "visible": _vm.rulesEditorDialogVisible
    },
    on: {
      "update:visible": function ($event) {
        _vm.rulesEditorDialogVisible = $event;
      }
    }
  }, [_c('Form', {
    attrs: {
      "margin-bottom": "0",
      "label-length": "6"
    }
  }, [_vm.value.config.validate.rules.length ? _c('FormItem', {
    attrs: {
      "label": "校验模式",
      "type": "select",
      "options": _vm.validateModeOptions,
      "margin-bottom": "20px"
    },
    model: {
      value: _vm.value.config.validate.mode,
      callback: function ($$v) {
        _vm.$set(_vm.value.config.validate, "mode", $$v);
      },
      expression: "value.config.validate.mode"
    }
  }) : _vm._e(), _c('div', {
    staticClass: "rules-editor"
  }, [!_vm.value.config.validate.rules.length ? _c('div', {
    staticClass: "no-data"
  }, [_vm._v("暂无校验规则")]) : _vm._e(), _vm._l(_vm.value.config.validate.rules, function (item, index) {
    return [_c('div', {
      staticClass: "rules-editor-item"
    }, [_c('FormItem', {
      staticClass: "rules-editor-item-type",
      attrs: {
        "label": "校验规则",
        "type": "select",
        "options": _vm.validateRules
      },
      model: {
        value: item.key,
        callback: function ($$v) {
          _vm.$set(item, "key", $$v);
        },
        expression: "item.key"
      }
    }), _c('FormItem', {
      staticClass: "rules-editor-item-input",
      attrs: {
        "label": "校验提示",
        "tip": "校验提示文本前会自动加上当前标签"
      }
    }, [_c('el-autocomplete', {
      staticStyle: {
        "width": "100%"
      },
      attrs: {
        "size": "mini",
        "fetch-suggestions": _vm.querySearch,
        "clearable": ""
      },
      scopedSlots: _vm._u([{
        key: "default",
        fn: function ({
          item
        }) {
          return [_c('span', [_vm._v(_vm._s(item.value))])];
        }
      }], null, true),
      model: {
        value: item.validateMsg,
        callback: function ($$v) {
          _vm.$set(item, "validateMsg", $$v);
        },
        expression: "item.validateMsg"
      }
    })], 1), _c('el-button', {
      attrs: {
        "icon": "el-icon-delete",
        "circle": "",
        "size": "mini",
        "type": "danger"
      },
      on: {
        "click": function ($event) {
          return _vm.value.config.validate.rules.splice(index, 1);
        }
      }
    })], 1)];
  })], 2), _c('div', {
    staticClass: "rules-editor-add-btn"
  }, [_c('el-button', {
    attrs: {
      "icon": "el-icon-plus",
      "circle": "",
      "size": "mini",
      "type": "primary"
    },
    on: {
      "click": _vm.addValidateRule
    }
  })], 1)], 1), _c('div', {
    staticStyle: {
      "text-align": "right"
    }
  }, [_c('el-button', {
    attrs: {
      "size": "mini"
    },
    on: {
      "click": function ($event) {
        _vm.rulesEditorDialogVisible = false;
      }
    }
  }, [_vm._v("取消")]), _c('el-button', {
    attrs: {
      "size": "mini",
      "type": "primary"
    },
    on: {
      "click": function ($event) {
        _vm.rulesEditorDialogVisible = false;
      }
    }
  }, [_vm._v("确定")])], 1)], 1)], 1);
};

var ConfigsValidatevue_type_template_id_78fb8f85_scoped_true_staticRenderFns = [];

;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/utils/validateRegExps.js
const validateRegExps = {
  number: {
    value: 'number',
    label: '纯数字',
    regExp: /^[0-9]*$/
  },
  letter: {
    value: 'letter',
    label: '纯字母',
    regExp: /^[A-Za-z]+$/
  },
  upperCaseLetter: {
    value: 'upperCaseLetter',
    label: '纯大写字母',
    regExp: /^[A-Z]+$/
  },
  lowerCaseLetter: {
    value: 'lowerCaseLetter',
    label: '纯小写字母',
    regExp: /^[a-z]+$/
  },
  chiness: {
    value: 'chiness',
    label: '纯汉字',
    regExp: /^[\u4e00-\u9fa5]{0,}$/
  },
  numberLetter: {
    value: 'numberLetter',
    label: '数字加字母',
    regExp: /^[A-Za-z0-9]+$/
  },
  mobilePhone: {
    value: 'mobilePhone',
    label: '手机号码',
    regExp: /^\d{11}$/
  },
  emile: {
    value: 'emile',
    label: '邮箱',
    regExp: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
  },
  carNumber: {
    value: 'carNumber',
    label: '车牌号',
    regExp: /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/
  },
  link: {
    value: 'link',
    label: '网址',
    regExp: /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
  }
};

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/dimple-lowcode/src/components/componentConfigs/ConfigsValidate.vue?vue&type=script&lang=js&



/* harmony default export */ var ConfigsValidatevue_type_script_lang_js_ = ({
  components: {
    Form: Form,
    FormItem: FormItem
  },
  props: {
    value: {},
    materials: {}
  },

  data() {
    return {
      rulesEditorDialogVisible: false,
      validateModeOptions: [{
        label: '与模式（全部规则满足）',
        value: 'and'
      }, {
        label: '或模式（任一规则满足）'
      }]
    };
  },

  computed: {
    valueTypeOptions() {
      return Object.values(valueTypes);
    },

    validateRules() {
      return Object.values(validateRegExps);
    }

  },
  methods: {
    validateRuleChange(key) {
      const item = this.validateRules.find(item => item.value === key);
    },

    addValidateRule() {
      this.value.config.validate.rules.push({
        key: '',
        validateMsg: ''
      });
    },

    querySearch(queryString, cb) {
      const options = (this.validateRules || []).map(item => ({
        value: `必须是${item.label}格式`
      }));
      const text = queryString.toLowerCase();
      const results = queryString ? options.filter(item => {
        const value = item.value.toLowerCase();
        return value.indexOf(text) > -1;
      }) : options;
      cb(results);
    }

  }
});
;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/components/componentConfigs/ConfigsValidate.vue?vue&type=script&lang=js&
 /* harmony default export */ var componentConfigs_ConfigsValidatevue_type_script_lang_js_ = (ConfigsValidatevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js??clonedRuleSet-54.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-54.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[2]!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/dimple-lowcode/src/components/componentConfigs/ConfigsValidate.vue?vue&type=style&index=0&id=78fb8f85&prod&scoped=true&lang=css&
var ConfigsValidatevue_type_style_index_0_id_78fb8f85_prod_scoped_true_lang_css_ = __webpack_require__(3607);
;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/components/componentConfigs/ConfigsValidate.vue?vue&type=style&index=0&id=78fb8f85&prod&scoped=true&lang=css&

;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/components/componentConfigs/ConfigsValidate.vue



;


/* normalize component */

var ConfigsValidate_component = normalizeComponent(
  componentConfigs_ConfigsValidatevue_type_script_lang_js_,
  ConfigsValidatevue_type_template_id_78fb8f85_scoped_true_render,
  ConfigsValidatevue_type_template_id_78fb8f85_scoped_true_staticRenderFns,
  false,
  null,
  "78fb8f85",
  null
  
)

/* harmony default export */ var ConfigsValidate = (ConfigsValidate_component.exports);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/dimple-lowcode/src/components/componentConfigs/ConfigsFilter.vue?vue&type=template&id=200de4bc&scoped=true&
var ConfigsFiltervue_type_template_id_200de4bc_scoped_true_render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c('div', [_c('FormItem', {
    attrs: {
      "label": "启用搜索",
      "type": "switch"
    },
    model: {
      value: _vm.value.config.filter.visible,
      callback: function ($$v) {
        _vm.$set(_vm.value.config.filter, "visible", $$v);
      },
      expression: "value.config.filter.visible"
    }
  }), _c('FormItem', {
    attrs: {
      "label": "搜索方式",
      "type": "select",
      "options": _vm.filterOptions
    },
    model: {
      value: _vm.value.config.filter.type,
      callback: function ($$v) {
        _vm.$set(_vm.value.config.filter, "type", $$v);
      },
      expression: "value.config.filter.type"
    }
  })], 1);
};

var ConfigsFiltervue_type_template_id_200de4bc_scoped_true_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/dimple-lowcode/src/components/componentConfigs/ConfigsFilter.vue?vue&type=script&lang=js&

/* harmony default export */ var ConfigsFiltervue_type_script_lang_js_ = ({
  components: {
    FormItem: FormItem
  },
  props: {
    value: {}
  },
  computed: {
    filterOptions() {
      let res = [{
        label: '按文本模糊搜索',
        value: 'text'
      }, {
        label: '按文本准确搜索',
        value: 'strict-text'
      }, {
        label: '按日期格式搜索',
        value: 'date'
      }, {
        label: '按日期范围格式搜索',
        value: 'daterange'
      }, {
        label: '按手机号格式搜索',
        value: 'mobile'
      }, {
        label: '按选项搜索',
        value: 'select'
      }];
      return res;
    }

  }
});
;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/components/componentConfigs/ConfigsFilter.vue?vue&type=script&lang=js&
 /* harmony default export */ var componentConfigs_ConfigsFiltervue_type_script_lang_js_ = (ConfigsFiltervue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/components/componentConfigs/ConfigsFilter.vue





/* normalize component */
;
var ConfigsFilter_component = normalizeComponent(
  componentConfigs_ConfigsFiltervue_type_script_lang_js_,
  ConfigsFiltervue_type_template_id_200de4bc_scoped_true_render,
  ConfigsFiltervue_type_template_id_200de4bc_scoped_true_staticRenderFns,
  false,
  null,
  "200de4bc",
  null
  
)

/* harmony default export */ var ConfigsFilter = (ConfigsFilter_component.exports);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/dimple-lowcode/src/components/componentConfigs/Configs.vue?vue&type=script&lang=js&





/* harmony default export */ var Configsvue_type_script_lang_js_ = ({
  components: {
    Form: Form,
    FormItem: FormItem,
    Render: Render,
    ConfigsBase: ConfigsBase,
    ConfigsValidate: ConfigsValidate,
    ConfigsFilter: ConfigsFilter
  },
  props: {
    value: {
      type: Object,
      default: () => null
    },
    materials: {}
  },

  data() {
    return {
      activeTab: 'base'
    };
  },

  computed: {
    tabs() {
      return Object.keys(this.value.config).map(key => {
        return {
          key,
          ...this.value.config[key]
        };
      }).filter(item => !!item.show);
    }

  }
});
;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/components/componentConfigs/Configs.vue?vue&type=script&lang=js&
 /* harmony default export */ var componentConfigs_Configsvue_type_script_lang_js_ = (Configsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js??clonedRuleSet-54.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-54.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[2]!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/dimple-lowcode/src/components/componentConfigs/Configs.vue?vue&type=style&index=0&id=caae7ab8&prod&scoped=true&lang=css&
var Configsvue_type_style_index_0_id_caae7ab8_prod_scoped_true_lang_css_ = __webpack_require__(7810);
;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/components/componentConfigs/Configs.vue?vue&type=style&index=0&id=caae7ab8&prod&scoped=true&lang=css&

;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/components/componentConfigs/Configs.vue



;


/* normalize component */

var Configs_component = normalizeComponent(
  componentConfigs_Configsvue_type_script_lang_js_,
  Configsvue_type_template_id_caae7ab8_scoped_true_render,
  Configsvue_type_template_id_caae7ab8_scoped_true_staticRenderFns,
  false,
  null,
  "caae7ab8",
  null
  
)

/* harmony default export */ var Configs = (Configs_component.exports);
;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/components/componentConfigs/index.js


;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/dimple-lowcode/src/components/formConfigs/FormConfigs.vue?vue&type=template&id=5958cc28&scoped=true&
var FormConfigsvue_type_template_id_5958cc28_scoped_true_render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c('div', {
    staticClass: "dimple-lowcode-form-configs"
  }, [_c('el-tabs', {
    attrs: {
      "stretch": ""
    },
    model: {
      value: _vm.activeTab,
      callback: function ($$v) {
        _vm.activeTab = $$v;
      },
      expression: "activeTab"
    }
  }, [_vm._l(_vm.tabs, function (item, index) {
    return [_c('el-tab-pane', {
      attrs: {
        "label": item.name,
        "name": item.key || index
      }
    })];
  })], 2), _c('div', {
    staticClass: "main"
  }, [_vm.activeTab === 'base' ? _c('FormConfigsBase', {
    model: {
      value: _vm.value,
      callback: function ($$v) {
        _vm.value = $$v;
      },
      expression: "value"
    }
  }) : _vm._e(), _vm.activeTab === 'submit' ? _c('FormConfigsSubmit', {
    model: {
      value: _vm.value,
      callback: function ($$v) {
        _vm.value = $$v;
      },
      expression: "value"
    }
  }) : _vm._e(), _vm.activeTab === 'save' ? _c('FormConfigsSave', {
    model: {
      value: _vm.value,
      callback: function ($$v) {
        _vm.value = $$v;
      },
      expression: "value"
    }
  }) : _vm._e()], 1)], 1);
};

var FormConfigsvue_type_template_id_5958cc28_scoped_true_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/dimple-lowcode/src/components/formConfigs/FormConfigsBase.vue?vue&type=template&id=534a9456&scoped=true&
var FormConfigsBasevue_type_template_id_534a9456_scoped_true_render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c('div', [_c('Form', {
    attrs: {
      "label-length": "10"
    }
  }, [_c('FormItem', {
    attrs: {
      "label": "表单ID"
    }
  }, [_vm._v(_vm._s(_vm.value.id))]), _c('FormItem', {
    attrs: {
      "label": "表单标签长度",
      "type": "input"
    },
    model: {
      value: _vm.value.formProps.labelLength,
      callback: function ($$v) {
        _vm.$set(_vm.value.formProps, "labelLength", $$v);
      },
      expression: "value.formProps.labelLength"
    }
  }), _c('FormItem', {
    attrs: {
      "label": "标签方向",
      "type": "select",
      "options": _vm.labelPositionOptions,
      "tip": "组件内的标签方向优先"
    },
    model: {
      value: _vm.value.formProps.labelPosition,
      callback: function ($$v) {
        _vm.$set(_vm.value.formProps, "labelPosition", $$v);
      },
      expression: "value.formProps.labelPosition"
    }
  }), _c('FormItem', {
    attrs: {
      "label": "标签对齐方式",
      "type": "select",
      "options": _vm.labelAlignItemsOptions,
      "tip": "组件内的对齐方式优先"
    },
    model: {
      value: _vm.value.formProps.alignItems,
      callback: function ($$v) {
        _vm.$set(_vm.value.formProps, "alignItems", $$v);
      },
      expression: "value.formProps.alignItems"
    }
  })], 1)], 1);
};

var FormConfigsBasevue_type_template_id_534a9456_scoped_true_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/dimple-lowcode/src/components/formConfigs/FormConfigsBase.vue?vue&type=script&lang=js&

/* harmony default export */ var FormConfigsBasevue_type_script_lang_js_ = ({
  components: {
    Form: Form,
    FormItem: FormItem
  },
  props: {
    value: {}
  },

  data() {
    return {
      labelPositionOptions: [{
        value: 'left',
        label: '左对齐'
      }, {
        value: 'right',
        label: '右对齐'
      }],
      labelAlignItemsOptions: [{
        value: 'center',
        label: '居中对齐'
      }, {
        value: 'flex-start',
        label: '顶部对齐'
      }, {
        value: 'flex-end',
        label: '底部对齐'
      }]
    };
  }

});
;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/components/formConfigs/FormConfigsBase.vue?vue&type=script&lang=js&
 /* harmony default export */ var formConfigs_FormConfigsBasevue_type_script_lang_js_ = (FormConfigsBasevue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/components/formConfigs/FormConfigsBase.vue





/* normalize component */
;
var FormConfigsBase_component = normalizeComponent(
  formConfigs_FormConfigsBasevue_type_script_lang_js_,
  FormConfigsBasevue_type_template_id_534a9456_scoped_true_render,
  FormConfigsBasevue_type_template_id_534a9456_scoped_true_staticRenderFns,
  false,
  null,
  "534a9456",
  null
  
)

/* harmony default export */ var FormConfigsBase = (FormConfigsBase_component.exports);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/dimple-lowcode/src/components/formConfigs/FormConfigsSubmit.vue?vue&type=template&id=3b1d3ebe&scoped=true&
var FormConfigsSubmitvue_type_template_id_3b1d3ebe_scoped_true_render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c('div', [_c('Form', {
    attrs: {
      "label-length": "10"
    }
  }, [_c('FormItem', {
    attrs: {
      "label": "显示操作按钮",
      "type": "switch"
    },
    model: {
      value: _vm.value.submit.show,
      callback: function ($$v) {
        _vm.$set(_vm.value.submit, "show", $$v);
      },
      expression: "value.submit.show"
    }
  }), _c('FormItem', {
    attrs: {
      "label": "操作按钮文本",
      "type": "input"
    },
    model: {
      value: _vm.value.submit.submitText,
      callback: function ($$v) {
        _vm.$set(_vm.value.submit, "submitText", $$v);
      },
      expression: "value.submit.submitText"
    }
  }), _c('FormItem', {
    attrs: {
      "label": "操作行为",
      "type": "select",
      "options": _vm.submitTypeOptions
    },
    model: {
      value: _vm.value.submit.submitType,
      callback: function ($$v) {
        _vm.$set(_vm.value.submit, "submitType", $$v);
      },
      expression: "value.submit.submitType"
    }
  }), _vm.value.submit.submitType === 'request' ? [_c('FormItem', {
    attrs: {
      "label": "网络接口地址",
      "type": "input"
    },
    model: {
      value: _vm.value.submit.api,
      callback: function ($$v) {
        _vm.$set(_vm.value.submit, "api", $$v);
      },
      expression: "value.submit.api"
    }
  }), _c('FormItem', {
    attrs: {
      "label": "表单字段名称",
      "type": "input"
    },
    model: {
      value: _vm.value.submit.formDataFiledName,
      callback: function ($$v) {
        _vm.$set(_vm.value.submit, "formDataFiledName", $$v);
      },
      expression: "value.submit.formDataFiledName"
    }
  }), _c('FormItem', {
    attrs: {
      "label": "请求头"
    }
  }, [_c('FiledEditor', {
    attrs: {
      "title": `请求头配置(共${_vm.value.submit.headers.length}字段)`
    },
    model: {
      value: _vm.value.submit.headers,
      callback: function ($$v) {
        _vm.$set(_vm.value.submit, "headers", $$v);
      },
      expression: "value.submit.headers"
    }
  }, [_c('el-button', {
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "size": "mini",
      "icon": "el-icon-edit"
    }
  }, [_vm._v(_vm._s(_vm.value.submit.headers.length) + "个字段")])], 1)], 1), _c('FormItem', {
    attrs: {
      "label": "请求体"
    }
  }, [_c('FiledEditor', {
    attrs: {
      "title": `请求体配置(共${_vm.value.submit.body.length}字段)`
    },
    model: {
      value: _vm.value.submit.body,
      callback: function ($$v) {
        _vm.$set(_vm.value.submit, "body", $$v);
      },
      expression: "value.submit.body"
    }
  }, [_c('el-button', {
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "size": "mini",
      "icon": "el-icon-edit"
    }
  }, [_vm._v(_vm._s(_vm.value.submit.body.length) + "个字段")])], 1)], 1)] : _vm._e(), _vm.value.submit.submitType === 'link' ? [_c('FormItem', {
    attrs: {
      "label": "跳转链接地址",
      "type": "input"
    },
    model: {
      value: _vm.value.submit.url,
      callback: function ($$v) {
        _vm.$set(_vm.value.submit, "url", $$v);
      },
      expression: "value.submit.url"
    }
  })] : _vm._e()], 2)], 1);
};

var FormConfigsSubmitvue_type_template_id_3b1d3ebe_scoped_true_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/dimple-lowcode/src/components/filedEditor/FiledEditor.vue?vue&type=template&id=e39386b0&scoped=true&
var FiledEditorvue_type_template_id_e39386b0_scoped_true_render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c('div', [_c('div', {
    on: {
      "click": function ($event) {
        _vm.visible = true;
      }
    }
  }, [_vm._t("default")], 2), _c('el-dialog', {
    attrs: {
      "title": _vm.title,
      "visible": _vm.visible,
      "append-to-body": "",
      "width": "1000px"
    },
    on: {
      "update:visible": function ($event) {
        _vm.visible = $event;
      }
    }
  }, [_c('div', {
    staticClass: "options-editor"
  }, [!_vm.value.length ? _c('div', {
    staticClass: "no-data"
  }, [_vm._v("暂无数据")]) : _vm._e(), _vm._l(_vm.value, function (item, index) {
    return [_c('Form', {
      attrs: {
        "margin-bottom": "0"
      }
    }, [_c('div', {
      staticClass: "options-editor-item"
    }, [_c('FormItem', {
      staticStyle: {
        "width": "30%"
      },
      attrs: {
        "label": "字段名称",
        "type": "autocomplete",
        "options": _vm.urlParamNameOptions
      },
      model: {
        value: item.name,
        callback: function ($$v) {
          _vm.$set(item, "name", $$v);
        },
        expression: "item.name"
      }
    }), _c('FormItem', {
      staticStyle: {
        "flex": "1"
      },
      attrs: {
        "label": "录入模式",
        "type": "select",
        "options": _vm.modeOptions
      },
      model: {
        value: item.mode,
        callback: function ($$v) {
          _vm.$set(item, "mode", $$v);
        },
        expression: "item.mode"
      }
    }), item.mode === 'input' ? _c('FormItem', {
      staticStyle: {
        "flex": "1"
      },
      attrs: {
        "label": "字段值",
        "type": "input"
      },
      model: {
        value: item.value,
        callback: function ($$v) {
          _vm.$set(item, "value", $$v);
        },
        expression: "item.value"
      }
    }) : _vm._e(), _c('el-button', {
      staticStyle: {
        "margin-left": "1%"
      },
      attrs: {
        "icon": "el-icon-delete",
        "circle": "",
        "size": "mini",
        "type": "danger"
      },
      on: {
        "click": function ($event) {
          return _vm.value.splice(index, 1);
        }
      }
    })], 1)])];
  })], 2), _c('div', {
    staticClass: "options-editor-add-btn"
  }, [_c('el-button', {
    attrs: {
      "icon": "el-icon-plus",
      "circle": "",
      "size": "mini",
      "type": "primary"
    },
    on: {
      "click": function ($event) {
        return _vm.value.push({
          name: '',
          mode: '',
          value: ''
        });
      }
    }
  })], 1), _c('div', {
    staticStyle: {
      "text-align": "right"
    }
  }, [_c('el-button', {
    attrs: {
      "size": "mini"
    },
    on: {
      "click": function ($event) {
        _vm.visible = false;
      }
    }
  }, [_vm._v("取消")]), _c('el-button', {
    attrs: {
      "size": "mini",
      "type": "primary"
    },
    on: {
      "click": function ($event) {
        _vm.visible = false;
      }
    }
  }, [_vm._v("确定")])], 1)])], 1);
};

var FiledEditorvue_type_template_id_e39386b0_scoped_true_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/dimple-lowcode/src/components/filedEditor/FiledEditor.vue?vue&type=script&lang=js&

/* harmony default export */ var FiledEditorvue_type_script_lang_js_ = ({
  components: {
    Form: Form,
    FormItem: FormItem
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    title: {}
  },

  data() {
    return {
      visible: false,
      modeOptions: [{
        value: 'input',
        label: '输入框录入'
      }, {
        value: 'urlParam',
        label: '从地址栏获取'
      }],
      urlParamNameOptions: [{
        value: 'accessToken',
        label: 'accessToken（认证令牌）'
      }, {
        value: 'token',
        label: 'token（认证令牌）'
      }, {
        value: 'mobile',
        label: 'mobile（手机号）'
      }, {
        value: 'username',
        label: 'username（用户名）'
      }, {
        value: 'projectId',
        label: 'projectId（项目id）'
      }, {
        value: 'projectName',
        label: 'projectName（项目名）'
      }, {
        value: 'projectCode',
        label: 'projectCode（项目编号）'
      }]
    };
  }

});
;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/components/filedEditor/FiledEditor.vue?vue&type=script&lang=js&
 /* harmony default export */ var filedEditor_FiledEditorvue_type_script_lang_js_ = (FiledEditorvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js??clonedRuleSet-54.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-54.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[2]!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/dimple-lowcode/src/components/filedEditor/FiledEditor.vue?vue&type=style&index=0&id=e39386b0&prod&scoped=true&lang=css&
var FiledEditorvue_type_style_index_0_id_e39386b0_prod_scoped_true_lang_css_ = __webpack_require__(6417);
;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/components/filedEditor/FiledEditor.vue?vue&type=style&index=0&id=e39386b0&prod&scoped=true&lang=css&

;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/components/filedEditor/FiledEditor.vue



;


/* normalize component */

var FiledEditor_component = normalizeComponent(
  filedEditor_FiledEditorvue_type_script_lang_js_,
  FiledEditorvue_type_template_id_e39386b0_scoped_true_render,
  FiledEditorvue_type_template_id_e39386b0_scoped_true_staticRenderFns,
  false,
  null,
  "e39386b0",
  null
  
)

/* harmony default export */ var FiledEditor = (FiledEditor_component.exports);
;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/components/filedEditor/index.js


;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/dimple-lowcode/src/components/formConfigs/FormConfigsSubmit.vue?vue&type=script&lang=js&


/* harmony default export */ var FormConfigsSubmitvue_type_script_lang_js_ = ({
  components: {
    Form: Form,
    FormItem: FormItem,
    FiledEditor: FiledEditor
  },
  props: {
    value: {}
  },

  data() {
    return {
      submitTypeOptions: [{
        value: 'request',
        label: '发送网络请求'
      }, {
        value: 'link',
        label: '跳转链接'
      }]
    };
  }

});
;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/components/formConfigs/FormConfigsSubmit.vue?vue&type=script&lang=js&
 /* harmony default export */ var formConfigs_FormConfigsSubmitvue_type_script_lang_js_ = (FormConfigsSubmitvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/components/formConfigs/FormConfigsSubmit.vue





/* normalize component */
;
var FormConfigsSubmit_component = normalizeComponent(
  formConfigs_FormConfigsSubmitvue_type_script_lang_js_,
  FormConfigsSubmitvue_type_template_id_3b1d3ebe_scoped_true_render,
  FormConfigsSubmitvue_type_template_id_3b1d3ebe_scoped_true_staticRenderFns,
  false,
  null,
  "3b1d3ebe",
  null
  
)

/* harmony default export */ var FormConfigsSubmit = (FormConfigsSubmit_component.exports);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/templateLoader.js??ruleSet[1].rules[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/dimple-lowcode/src/components/formConfigs/FormConfigsSave.vue?vue&type=template&id=cd680fe2&scoped=true&
var FormConfigsSavevue_type_template_id_cd680fe2_scoped_true_render = function render() {
  var _vm = this,
      _c = _vm._self._c;

  return _c('div', [_c('Form', {
    attrs: {
      "label-length": "10"
    }
  }, [_c('FormItem', {
    attrs: {
      "label": "网络接口地址",
      "type": "input"
    },
    model: {
      value: _vm.value.save.api,
      callback: function ($$v) {
        _vm.$set(_vm.value.save, "api", $$v);
      },
      expression: "value.save.api"
    }
  }), _c('FormItem', {
    attrs: {
      "label": "请求头"
    }
  }, [_c('FiledEditor', {
    attrs: {
      "title": `请求头配置(共${_vm.value.save.headers.length}字段)`
    },
    model: {
      value: _vm.value.save.headers,
      callback: function ($$v) {
        _vm.$set(_vm.value.save, "headers", $$v);
      },
      expression: "value.save.headers"
    }
  }, [_c('el-button', {
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "size": "mini",
      "icon": "el-icon-edit"
    }
  }, [_vm._v(_vm._s(_vm.value.save.headers.length) + "个字段")])], 1)], 1), _c('FormItem', {
    attrs: {
      "label": "请求体"
    }
  }, [_c('FiledEditor', {
    attrs: {
      "title": `请求体配置(共${_vm.value.save.body.length}字段)`
    },
    model: {
      value: _vm.value.save.body,
      callback: function ($$v) {
        _vm.$set(_vm.value.save, "body", $$v);
      },
      expression: "value.save.body"
    }
  }, [_c('el-button', {
    staticStyle: {
      "width": "100%"
    },
    attrs: {
      "size": "mini",
      "icon": "el-icon-edit"
    }
  }, [_vm._v(_vm._s(_vm.value.save.body.length) + "个字段")])], 1)], 1)], 1)], 1);
};

var FormConfigsSavevue_type_template_id_cd680fe2_scoped_true_staticRenderFns = [];

;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/dimple-lowcode/src/components/formConfigs/FormConfigsSave.vue?vue&type=script&lang=js&


/* harmony default export */ var FormConfigsSavevue_type_script_lang_js_ = ({
  components: {
    Form: Form,
    FormItem: FormItem,
    FiledEditor: FiledEditor
  },
  props: {
    value: {}
  },

  data() {
    return {};
  }

});
;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/components/formConfigs/FormConfigsSave.vue?vue&type=script&lang=js&
 /* harmony default export */ var formConfigs_FormConfigsSavevue_type_script_lang_js_ = (FormConfigsSavevue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/components/formConfigs/FormConfigsSave.vue





/* normalize component */
;
var FormConfigsSave_component = normalizeComponent(
  formConfigs_FormConfigsSavevue_type_script_lang_js_,
  FormConfigsSavevue_type_template_id_cd680fe2_scoped_true_render,
  FormConfigsSavevue_type_template_id_cd680fe2_scoped_true_staticRenderFns,
  false,
  null,
  "cd680fe2",
  null
  
)

/* harmony default export */ var FormConfigsSave = (FormConfigsSave_component.exports);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/dimple-lowcode/src/components/formConfigs/FormConfigs.vue?vue&type=script&lang=js&



/* harmony default export */ var FormConfigsvue_type_script_lang_js_ = ({
  components: {
    FormConfigsBase: FormConfigsBase,
    FormConfigsSubmit: FormConfigsSubmit,
    FormConfigsSave: FormConfigsSave
  },
  props: {
    value: {}
  },

  data() {
    return {
      activeTab: 'base'
    };
  },

  computed: {
    tabs() {
      return [{
        key: 'base',
        name: '基本配置'
      }, {
        key: 'submit',
        name: '操作按钮配置'
      }, {
        key: 'save',
        name: '保存配置'
      }];
    }

  }
});
;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/components/formConfigs/FormConfigs.vue?vue&type=script&lang=js&
 /* harmony default export */ var formConfigs_FormConfigsvue_type_script_lang_js_ = (FormConfigsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js??clonedRuleSet-54.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-54.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[2]!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/dimple-lowcode/src/components/formConfigs/FormConfigs.vue?vue&type=style&index=0&id=5958cc28&prod&scoped=true&lang=css&
var FormConfigsvue_type_style_index_0_id_5958cc28_prod_scoped_true_lang_css_ = __webpack_require__(5464);
;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/components/formConfigs/FormConfigs.vue?vue&type=style&index=0&id=5958cc28&prod&scoped=true&lang=css&

;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/components/formConfigs/FormConfigs.vue



;


/* normalize component */

var FormConfigs_component = normalizeComponent(
  formConfigs_FormConfigsvue_type_script_lang_js_,
  FormConfigsvue_type_template_id_5958cc28_scoped_true_render,
  FormConfigsvue_type_template_id_5958cc28_scoped_true_staticRenderFns,
  false,
  null,
  "5958cc28",
  null
  
)

/* harmony default export */ var FormConfigs = (FormConfigs_component.exports);
;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/components/formConfigs/index.js


;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/dimple-lowcode/src/materials/system/components/FormItem.vue?vue&type=script&lang=js&

/* harmony default export */ var components_FormItemvue_type_script_lang_js_ = ({
  extends: FormItem,
  props: { ...FormItem.props,
    label: {
      type: String,
      default: ''
    },
    labelLength: {
      type: [Number, String],
      default: 0
    },
    marginBottom: {
      type: [Number, String],
      default: '0px'
    }
  }
});
;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/materials/system/components/FormItem.vue?vue&type=script&lang=js&
 /* harmony default export */ var system_components_FormItemvue_type_script_lang_js_ = (components_FormItemvue_type_script_lang_js_); 
;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/materials/system/components/FormItem.vue
var FormItem_render, FormItem_staticRenderFns
;



/* normalize component */
;
var components_FormItem_component = normalizeComponent(
  system_components_FormItemvue_type_script_lang_js_,
  FormItem_render,
  FormItem_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var components_FormItem = (components_FormItem_component.exports);
;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/utils/editTypes.js
const editTypes = {
  options: 'options',
  text: 'text',
  input: 'input',
  autocomplete: 'autocomplete',
  number: 'number',
  float: 'float',
  textarea: 'textarea',
  switch: 'switch',
  radio: 'radio',
  select: 'select',
  'checkbox-group': 'checkbox-group',
  time: 'time',
  date: 'date',
  datetime: 'datetime',
  daterange: 'daterange',
  datetimerange: 'datetimerange'
};

;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/materials/system/index.js



/* harmony default export */ var system = (() => [{
  key: 'system',
  name: '系统库',
  components: [{
    key: 'system.input',
    name: '输入框',
    component: components_FormItem,
    defaultProps: {
      type: 'input'
    }
  }, {
    key: 'system.text',
    name: '纯文本',
    component: components_FormItem,
    defaultProps: {
      type: 'text'
    }
  }, {
    key: 'system.textarea',
    name: '文本域',
    component: components_FormItem,
    defaultProps: {
      type: 'textarea'
    },
    h: 3
  }, {
    key: 'system.select',
    name: '下拉选择器',
    component: components_FormItem,
    defaultProps: {
      type: 'select'
    },
    props: {
      options: {
        label: '选项列表',
        value: [],
        editType: editTypes.options
      }
    }
  }, {
    key: 'system.radio',
    name: '单选框',
    component: components_FormItem,
    defaultProps: {
      type: 'radio',
      horizontalRadio: true
    },
    props: {
      options: {
        label: '选项列表',
        value: [],
        editType: editTypes.options
      }
    }
  }, {
    key: 'system.checkbox-group',
    name: '多选框',
    component: components_FormItem,
    valueType: valueTypes.array.value,
    defaultProps: {
      type: 'checkbox-group',
      horizontalCheckbox: true
    },
    props: {
      options: {
        label: '选项列表',
        value: [],
        editType: editTypes.options
      }
    }
  }, {
    key: 'system.switch',
    name: '开关',
    component: components_FormItem,
    valueType: valueTypes.boolean.value,
    defaultProps: {
      type: 'switch'
    }
  }, {
    key: 'system.time',
    name: '时间选择器',
    component: components_FormItem,
    defaultProps: {
      type: 'time'
    }
  }, {
    key: 'system.date',
    name: '日期选择器',
    component: components_FormItem,
    valueType: valueTypes.date.value,
    defaultProps: {
      type: 'date'
    }
  }, {
    key: 'system.datetime',
    name: '日期时间选择',
    component: components_FormItem,
    valueType: valueTypes.dateTime.value,
    defaultProps: {
      type: 'datetime'
    }
  }, {
    key: 'system.daterange',
    name: '日期范围选择',
    component: components_FormItem,
    valueType: valueTypes.dateRange.value,
    defaultProps: {
      type: 'daterange'
    }
  }, {
    key: 'system.datetimerange',
    name: '日期时间范围',
    component: components_FormItem,
    valueType: valueTypes.dateTimeRange.value,
    defaultProps: {
      type: 'datetimerange'
    }
  }]
}]);
;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/utils/is.js
const http = o => /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(o);

const is = {
  http
};

;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/utils/validate.js



const required = (value, valueType) => {
  if (value === '' || value === null || value === undefined) return false;
  const isArray = [valueTypes.array.value, valueTypes.dateRange.value, valueTypes.dateTimeRange.value].includes(valueType);
  if (isArray) return value.length > 0;
  return true;
};

const min = (value, length, valueType) => {
  if (value === '' || value === null || value === undefined) return true;
  if (length === '' || length === null || length === undefined) return true;
  const isString = valueType === valueTypes.string.value;
  if (isString) return value.length >= length;
  const isArray = [valueTypes.array.value, valueTypes.dateRange.value, valueTypes.dateTimeRange.value].includes(valueType);
  if (isArray) return value.length >= length;
  const isNumber = [valueTypes.number.value, valueTypes.date.value].includes(valueType);
  if (isNumber) return value >= length;
  return true;
};

const max = (value, length, valueType) => {
  if (value === '' || value === null || value === undefined) return true;
  if (length === '' || length === null || length === undefined) return true;
  const isString = valueType === valueTypes.string.value;
  if (isString) return value.length <= length;
  const isArray = [valueTypes.array.value, valueTypes.dateRange.value, valueTypes.dateTimeRange.value].includes(valueType);
  if (isArray) return value.length <= length;
  const isNumber = [valueTypes.number.value, valueTypes.date.value].includes(valueType);
  if (isNumber) return value <= length;
  return true;
};

const regExp = (value, regExpKey) => {
  if (!validateRegExps[regExpKey]) return true;
  return validateRegExps[regExpKey].regExp.test(value);
};

const validate = {
  required,
  min,
  max,
  regExp
};

// EXTERNAL MODULE: ./node_modules/axios/index.js
var axios = __webpack_require__(2084);
var axios_default = /*#__PURE__*/__webpack_require__.n(axios);
;// CONCATENATED MODULE: ./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib/index.js??clonedRuleSet-82.use[1]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/dimple-lowcode/src/DimpleLowcode.vue?vue&type=script&lang=js&













const ajax = axios_default().create();
/* harmony default export */ var DimpleLowcodevue_type_script_lang_js_ = ({
  name: 'DimpleLowcode',
  components: {
    GridLayout: vue_grid_layout_common.GridLayout,
    GridItem: vue_grid_layout_common.GridItem,
    Materials: Materials,
    ComponentConfigs: Configs,
    FormConfigs: FormConfigs,
    Render: Render,
    Form: Form,
    FormItem: FormItem
  },
  props: {
    materials: {
      type: Array,
      default: () => []
    },
    config: {
      type: Object,
      default: () => {}
    },
    data: {
      type: Array,
      default: () => []
    },
    preview: {
      type: Boolean,
      default: null
    }
  },

  data() {
    return {
      gridNum: 1,
      rowHeight: 40,
      innerMaterials: system(),
      layout: [],
      formConfig: {
        id: uniqueId_default()(`${+new Date()}_`),
        formProps: {
          labelLength: 8,
          alignItems: 'center',
          labelPosition: 'right'
        },
        submit: {
          show: true,
          submitText: '提交',
          submitType: 'request',
          api: '',
          link: '',
          formDataFiledName: 'form',
          successMsg: '',
          errorMsg: '',
          headers: [],
          body: []
        },
        save: {
          api: '',
          successMsg: '',
          errorMsg: '',
          headers: [],
          body: []
        }
      },
      mouseX: null,
      mouseY: null,
      drageData: null,
      currentComponent: null,
      drawer: false,
      innerPreview: false,
      loading: false
    };
  },

  computed: {
    isPreview() {
      if (this.preview === true) return true;
      if (this.preview === false) return false;
      if (this.data.length > 0) return true;
      return this.innerPreview;
    },

    mouseInGrid() {
      if (!this.$refs.content) return;
      const parentRect = this.$refs.content.getBoundingClientRect();
      let mouseInGrid = false;
      const {
        mouseX,
        mouseY
      } = this;

      if (mouseX > parentRect.left && mouseX < parentRect.right && mouseY > parentRect.top && mouseY < parentRect.bottom) {
        mouseInGrid = true;
      }

      return mouseInGrid;
    }

  },
  watch: {
    data: {
      handler: function (value) {
        this.$set(this.layout, 'layout', value || []);
      },
      deep: true,
      immediate: true
    },
    config: {
      handler: function (value) {
        this.formConfig = merge_default()(JSON.parse(JSON.stringify(this.formConfig)), value);
      },
      deep: true,
      immediate: true
    },
    materials: {
      handler: function (value) {
        this.innerMaterials.push(...(value || []));
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    drag(e, item) {
      this.currentComponent = null;
      if (!this.mouseInGrid) return;
      const index = this.layout.findIndex(item => item.i === 'drop');
      let {
        w = 1,
        h = 1,
        x = this.layout.length * 2 % (this.colNum || 12),
        y = this.layout.length + (this.colNum || 12),
        i = 'drop'
      } = item;

      if (index > -1) {
        i = index + '';
        x = this.layout[index].x;
        y = this.layout[index].y;
      }

      this.drageData = { ...item,
        x,
        y,
        w,
        h,
        i,
        id: +new Date()
      };
      delete this.drageData.component;
      if (index === -1) return this.layout.push(this.drageData);
      const parentRect = this.$refs.content.getBoundingClientRect();

      try {
        this.$refs.gridlayout.$children[this.layout.length].$refs.item.style.display = 'none';
      } catch {}

      let el = this.$refs.gridlayout.$children[index];
      el.dragging = {
        top: this.mouseY - parentRect.top,
        left: this.mouseX - parentRect.left
      };
      let new_pos = el.calcXY(this.mouseY - parentRect.top, this.mouseX - parentRect.left);

      if (this.mouseInGrid === true) {
        this.$refs.gridlayout.dragEvent('dragstart', 'drop', new_pos.x, new_pos.y, 1, 1);
      }

      if (this.mouseInGrid === false) {
        this.$refs.gridlayout.dragEvent('dragend', 'drop', new_pos.x, new_pos.y, 1, 1);
        this.layout = this.layout.filter(obj => obj.i !== 'drop');
      }
    },

    dragend() {
      this.layout = this.layout.filter(obj => obj.i !== 'drop');
      if (!this.mouseInGrid) return;
      const {
        x,
        y,
        w,
        h,
        i
      } = this.drageData;
      this.$refs.gridlayout.dragEvent('dragend', 'drop', x, y, w, h);
      this.layout.push(this.drageData);

      try {
        this.$refs.gridLayout.$children[this.layout.length].$refs.item.style.display = 'block';
      } catch {}
    },

    removeItem(item) {
      const index = this.layout.findIndex(v => v.i === item.i);
      if (index < 0) return;
      this.layout.splice(index, 1);
    },

    componentItemClickHandle(item) {
      if (this.currentComponent && this.currentComponent.i === item.i) return this.currentComponent = null;
      this.currentComponent = item;
    },

    toPreview() {
      this.innerPreview = true;
      this.$message.success('按下ESC键可以退出预览');
    },

    save() {
      let api = '';
      const headers = {};
      const body = {};
      let successMsg = '';
      let errorMsg = '';

      try {
        const config = this.formConfig.save;
        api = config.api;
        successMsg = config.successMsg;
        errorMsg = config.errorMsg;
        if (!is.http(api)) return this.$message.warning('保存的接口地址不符合网络接口格式，无法发起保存操作');

        for (const item of config.headers) {
          headers[item.name] = item.mode === 'urlParam' ? getQueryByKey(item.name) : item.value;
        }

        for (const item of config.body) {
          body[item.name] = item.mode === 'urlParam' ? getQueryByKey(item.name) : item.value;
        }

        body.data = this.layout;
        body.config = this.formConfig;
      } catch (error) {
        console.error('保存配置填写错误', error);
        return this.$message.error('保存配置填写错误');
      }

      this.loading = true;
      ajax({
        url: api,
        method: 'post',
        headers,
        data: body
      }).then(res => {
        this.$message.success(successMsg || '保存成功');
        this.$emit('afterSave', res);
      }).catch(err => {
        this.$message.error(errorMsg || '保存失败');
        this.$emit('afterSaveError', err);
      }).finally(() => {
        this.loading = false;
      });
    },

    submit() {
      let submitType = '';
      let api = '';
      const headers = {};
      const body = {};
      let successMsg = '';
      let errorMsg = '';
      let link = '';
      let isLink = false;
      let isRequest = false;
      const formData = {};

      try {
        const config = this.formConfig.submit;
        submitType = config.submitType;
        link = config.link;
        api = config.api;
        successMsg = config.successMsg;
        errorMsg = config.errorMsg;
        isLink = submitType === 'link';
        isRequest = submitType === 'request';
        body.id = this.formConfig.id;
        if (isLink && !is.http(api)) return this.$message.warning('跳转地址不符合网络地址格式，无法执行跳转操作');
        if (isRequest && !is.http(api)) return this.$message.warning('提交的接口地址不符合网络接口格式，无法发起提交操作');

        for (const item of config.headers) {
          headers[item.name] = item.mode === 'urlParam' ? getQueryByKey(item.name) : item.value;
        }

        for (const item of config.body) {
          body[item.name] = item.mode === 'urlParam' ? getQueryByKey(item.name) : item.value;
        }

        let validateMsg = '';

        for (const item of this.layout) {
          if (!item.config.validate.disabled) {
            if (item.formItemDefaultProps.required) {
              if (!validate.required(item.value, item.valueType)) validateMsg = item.config.validate.requiredValidateMsg;
            }

            if (!validate.min(item.value, item.config.validate.min, item.valueType)) validateMsg = item.config.validate.minValidateMsg;
            if (!validate.max(item.value, item.config.validate.max, item.valueType)) validateMsg = item.config.validate.maxValidateMsg; // 校验自定义添加的规则

            let validateRuleMsg = '';
            let validateRuleResults = [];

            for (const ruleitem of item.config.validate.rules) {
              validateRuleResults.push({
                validateMsg: ruleitem.validateMsg,
                result: validate.regExp(item.value, ruleitem.key)
              });
            }

            if (validateRuleResults.length > 0) {
              const validateSuccessItem = validateRuleResults.find(o => !!o.result);
              const validateFailItem = validateRuleResults.find(o => !o.result);

              if (item.config.validate.mode === 'or') {
                if (!validateSuccessItem) validateRuleMsg = validateFailItem.validateMsg;
              }

              if (item.config.validate.mode === 'and') {
                if (validateFailItem) validateRuleMsg = validateFailItem.validateMsg;
              }
            }

            if (!validateMsg) validateMsg = validateRuleMsg;

            if (validateMsg) {
              validateMsg = item.formItemDefaultProps.label + validateMsg;
              break;
            }
          }

          formData[item.filedName] = item.value;
        }

        if (validateMsg) return this.$message.error(validateMsg);
        body[this.formConfig.submit.formDataFiledName || 'form'] = formData;
      } catch (error) {
        console.error('提交配置填写错误', error);
        return this.$message.error('提交配置填写错误');
      }

      if (isLink) return window.location.href = link;

      if (isRequest) {
        this.loading = true;
        ajax({
          url: api,
          method: 'post',
          headers,
          data: body
        }).then(res => {
          this.$message.success(successMsg || '提交成功');
          this.$emit('afterSubmit', res);
        }).catch(err => {
          this.$message.error(errorMsg || '提交失败');
          this.$emit('afterSubmitError', err);
        }).finally(() => {
          this.loading = false;
        });
      }
    }

  },

  mounted() {
    this.dragoverHandle = e => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
    };

    document.addEventListener('dragover', this.dragoverHandle, false);

    this.escHandle = e => {
      const isEsc = e.keyCode === 27;
      if (!isEsc) return;
      this.innerPreview = false;
    };

    document.addEventListener('keydown', this.escHandle, false);
  },

  beforeDestroy() {
    document.removeEventListener('dragover', this.dragoverHandle, false);
    document.removeEventListener('keydown', this.escHandle, false);
  }

});
;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/DimpleLowcode.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_DimpleLowcodevue_type_script_lang_js_ = (DimpleLowcodevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js??clonedRuleSet-54.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-54.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[2]!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/dimple-lowcode/src/DimpleLowcode.vue?vue&type=style&index=0&id=e7bfadce&prod&scoped=true&lang=css&
var DimpleLowcodevue_type_style_index_0_id_e7bfadce_prod_scoped_true_lang_css_ = __webpack_require__(6729);
;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/DimpleLowcode.vue?vue&type=style&index=0&id=e7bfadce&prod&scoped=true&lang=css&

// EXTERNAL MODULE: ./node_modules/vue-style-loader/index.js??clonedRuleSet-54.use[0]!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-54.use[1]!./node_modules/@vue/vue-loader-v15/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[2]!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-54.use[3]!./node_modules/@vue/vue-loader-v15/lib/index.js??vue-loader-options!./src/package/dimple-lowcode/src/DimpleLowcode.vue?vue&type=style&index=1&id=e7bfadce&prod&lang=css&
var DimpleLowcodevue_type_style_index_1_id_e7bfadce_prod_lang_css_ = __webpack_require__(7915);
;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/DimpleLowcode.vue?vue&type=style&index=1&id=e7bfadce&prod&lang=css&

;// CONCATENATED MODULE: ./src/package/dimple-lowcode/src/DimpleLowcode.vue



;



/* normalize component */

var DimpleLowcode_component = normalizeComponent(
  src_DimpleLowcodevue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "e7bfadce",
  null
  
)

/* harmony default export */ var DimpleLowcode = (DimpleLowcode_component.exports);
;// CONCATENATED MODULE: ./src/package/dimple-lowcode/index.js


 // import ElementUI from '../../plugins/element-ui';

DimpleLowcode.install = Vue => {
  // Vue.use(ElementUI)
  Vue.component(DimpleLowcode.name, DimpleLowcode);
};


/* harmony default export */ var dimple_lowcode = (DimpleLowcode);
;// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = (dimple_lowcode);


}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=dimple-lowcode.umd.js.map