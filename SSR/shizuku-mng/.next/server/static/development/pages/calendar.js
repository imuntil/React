module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/AnimeSimCard.js":
/*!************************************!*\
  !*** ./components/AnimeSimCard.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var antd_lib_button_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd/lib/button/style/css */ "antd/lib/button/style/css");
/* harmony import */ var antd_lib_button_style_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd_lib_button_style_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd_lib_button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd/lib/button */ "antd/lib/button");
/* harmony import */ var antd_lib_button__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd_lib_button__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd_lib_checkbox_style_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd/lib/checkbox/style/css */ "antd/lib/checkbox/style/css");
/* harmony import */ var antd_lib_checkbox_style_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd_lib_checkbox_style_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var antd_lib_checkbox__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! antd/lib/checkbox */ "antd/lib/checkbox");
/* harmony import */ var antd_lib_checkbox__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd_lib_checkbox__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _AnimeSimCard_module_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./AnimeSimCard.module.scss */ "./components/AnimeSimCard.module.scss");
/* harmony import */ var _AnimeSimCard_module_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_AnimeSimCard_module_scss__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var classnames_bind__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! classnames/bind */ "classnames/bind");
/* harmony import */ var classnames_bind__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(classnames_bind__WEBPACK_IMPORTED_MODULE_7__);




var _jsxFileName = "/Users/imuntil/MY/learn/react/SSR/shizuku-mng/components/AnimeSimCard.js";




var cx = classnames_bind__WEBPACK_IMPORTED_MODULE_7___default.a.bind(_AnimeSimCard_module_scss__WEBPACK_IMPORTED_MODULE_6___default.a);
var Field = Object(react__WEBPACK_IMPORTED_MODULE_4__["memo"])(function Field(_ref) {
  var label = _ref.label,
      children = _ref.children,
      onChange = _ref.onChange,
      _ref$chooseAble = _ref.chooseAble,
      chooseAble = _ref$chooseAble === void 0 ? true : _ref$chooseAble,
      checked = _ref.checked;
  return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
    className: "components-___AnimeSimCard-module__wrap___3mbEP",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
    className: "components-___AnimeSimCard-module__label___209ng",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    },
    __self: this
  }, label), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
    className: "components-___AnimeSimCard-module__value___3FbWB",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    },
    __self: this
  }, children), !chooseAble ? null : react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
    className: "components-___AnimeSimCard-module__use___3wFnP",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(antd_lib_checkbox__WEBPACK_IMPORTED_MODULE_3___default.a, {
    checked: checked,
    onChange: onChange,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    },
    __self: this
  })));
});
var IDS = Object(react__WEBPACK_IMPORTED_MODULE_4__["memo"])(function IDS(_ref2) {
  var ids = _ref2.ids;
  return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 30
    },
    __self: this
  }, Object.entries(ids).map(function (v) {
    return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
      className: "components-___AnimeSimCard-module__line___23W29",
      key: v[0],
      __source: {
        fileName: _jsxFileName,
        lineNumber: 32
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("span", {
      className: "components-___AnimeSimCard-module__key___zC70d",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 33
      },
      __self: this
    }, v[0]), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("span", {
      className: "components-___AnimeSimCard-module__key-value___30vnD",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 34
      },
      __self: this
    }, v[1]));
  }));
});
var AnimeSimCard = Object(react__WEBPACK_IMPORTED_MODULE_4__["memo"])(function AnimeSimCard(props) {
  var _props$is = props.is,
      is = _props$is === void 0 ? '' : _props$is,
      _props$data = props.data,
      data = _props$data === void 0 ? {} : _props$data,
      onChoose = props.onChoose,
      onChange = props.onChange,
      _props$checks = props.checks,
      checks = _props$checks === void 0 ? {} : _props$checks;
  var chooseAble = is && is !== 'RESULT';

  var computeChecked = function computeChecked(key) {
    return Array.isArray(checks[key]) ? checks[key].indexOf(is) > -1 : checks[key] === is;
  };

  var handleChange = function handleChange(e, key) {
    onChange(e.target.checked, key, data[key], is, data.from);
  };

  return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
    className: cx('sim-card', is.toLowerCase()),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 52
    },
    __self: this
  }, is ? react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("h3", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53
    },
    __self: this
  }, is) : null, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(Field, {
    chooseAble: false,
    label: "\u6765\u6E90",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54
    },
    __self: this
  }, (data.from || '').toString()), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(Field, {
    chooseAble: false,
    label: "ID",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57
    },
    __self: this
  }, data.id), data.ids ? react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(Field, {
    chooseAble: false,
    label: "IDs",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(IDS, {
    ids: data.ids,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62
    },
    __self: this
  })) : null, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(Field, {
    chooseAble: chooseAble,
    label: "\u5C01\u9762",
    onChange: function onChange(e) {
      return handleChange(e, 'cover');
    },
    checked: computeChecked('cover'),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 65
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("img", {
    className: "components-___AnimeSimCard-module__cover___19XbU",
    src: "https://dummyimage.com/200x200?text=".concat(data.cover || 'NONE'),
    alt: "",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 71
    },
    __self: this
  })), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(Field, {
    chooseAble: chooseAble,
    label: "\u756A\u5267\u540D",
    onChange: function onChange(e) {
      return handleChange(e, 'name');
    },
    checked: computeChecked('name'),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 77
    },
    __self: this
  }, data.name), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(Field, {
    chooseAble: chooseAble,
    label: "\u653E\u9001\u65F6\u95F4",
    onChange: function onChange(e) {
      return handleChange(e, 'date');
    },
    checked: computeChecked('date'),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 85
    },
    __self: this
  }, data.date), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(Field, {
    chooseAble: chooseAble,
    label: "\u5176\u4ED6",
    onChange: function onChange(e) {
      return handleChange(e, 'some');
    },
    checked: computeChecked('some'),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 93
    },
    __self: this
  }, data.some), !is || is === 'RESULT' ? null : react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
    className: "components-___AnimeSimCard-module__btn___4z5qO",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 102
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(antd_lib_button__WEBPACK_IMPORTED_MODULE_1___default.a, {
    onClick: function onClick() {
      return onChoose(is);
    },
    icon: "check",
    size: "small",
    type: "primary",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 103
    },
    __self: this
  }, "Use This")));
});
AnimeSimCard.propTypes = {
  data: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.shape({
    from: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.string,
    cover: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.string,
    name: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.string,
    id: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.number])
  }),
  is: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.oneOf(['TARGET', 'ORIGIN', 'RESULT']),
  onChoose: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.func
};
/* harmony default export */ __webpack_exports__["default"] = (AnimeSimCard);

/***/ }),

/***/ "./components/AnimeSimCard.module.scss":
/*!*********************************************!*\
  !*** ./components/AnimeSimCard.module.scss ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
	"sim-card": "components-___AnimeSimCard-module__sim-card___3PPyh",
	"mark": "components-___AnimeSimCard-module__mark___1eeoJ",
	"active": "components-___AnimeSimCard-module__active___2atzS",
	"wrap": "components-___AnimeSimCard-module__wrap___3mbEP",
	"label": "components-___AnimeSimCard-module__label___209ng",
	"value": "components-___AnimeSimCard-module__value___3FbWB",
	"use": "components-___AnimeSimCard-module__use___3wFnP",
	"cover": "components-___AnimeSimCard-module__cover___19XbU",
	"line": "components-___AnimeSimCard-module__line___23W29",
	"key": "components-___AnimeSimCard-module__key___zC70d",
	"key-value": "components-___AnimeSimCard-module__key-value___30vnD",
	"btn": "components-___AnimeSimCard-module__btn___4z5qO"
};

/***/ }),

/***/ "./components/ConfirmModal.js":
/*!************************************!*\
  !*** ./components/ConfirmModal.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var antd_lib_modal_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd/lib/modal/style/css */ "antd/lib/modal/style/css");
/* harmony import */ var antd_lib_modal_style_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd_lib_modal_style_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd_lib_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd/lib/modal */ "antd/lib/modal");
/* harmony import */ var antd_lib_modal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd_lib_modal__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd_lib_message_style_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! antd/lib/message/style/css */ "antd/lib/message/style/css");
/* harmony import */ var antd_lib_message_style_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd_lib_message_style_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var antd_lib_message__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! antd/lib/message */ "antd/lib/message");
/* harmony import */ var antd_lib_message__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd_lib_message__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _AnimeSimCard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./AnimeSimCard */ "./components/AnimeSimCard.js");
/* harmony import */ var _ConfirmModal_module_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ConfirmModal.module.scss */ "./components/ConfirmModal.module.scss");
/* harmony import */ var _ConfirmModal_module_scss__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_ConfirmModal_module_scss__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var lodash_omit__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lodash.omit */ "lodash.omit");
/* harmony import */ var lodash_omit__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(lodash_omit__WEBPACK_IMPORTED_MODULE_8__);




var _jsxFileName = "/Users/imuntil/MY/learn/react/SSR/shizuku-mng/components/ConfirmModal.js";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





 // import { wdyu } from '../utils'
// wdyu(React)

/**
 * model 的 from 属性表示来源，
 * 当 from 属性为字符串时，则表示该 model 为单一数据来源，也就意味着该 model 没有 ids 属性
 * 反之，当之为数组时，则表示该 model 为多数据来源，即 merge 之后的结果，同时该 model 具有 ids 属性
 */

var getIds = function getIds(obj) {
  var id = obj.id,
      ids = obj.ids,
      from = obj.from;
  return ids ? ids : _defineProperty({}, from, id);
};

var ConfirmModal =
/*#__PURE__*/
function (_Component) {
  _inherits(ConfirmModal, _Component);

  function ConfirmModal() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ConfirmModal);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ConfirmModal)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      result: {},
      checks: {},
      ids: {}
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "shouldComponentUpdate", function (nextProps, nextState) {
      if (!nextProps.visible && !_this.props.visible) return false;
      return true;
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "componentDidUpdate", function (prevProps, prevState) {
      if (prevProps.visible && !_this.props.visible) {
        _this.setState({
          result: {},
          checks: {},
          ids: {}
        });
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleChosen", function (is) {
      var data = _this.props[is.toLowerCase()];

      var rest = lodash_omit__WEBPACK_IMPORTED_MODULE_8___default()(data, ['ids', 'from', '_stems']); // 将除了 ids， _stems, from 之外的其他属性， merge 到 result 中,
      // id 按理说已经没有意义了，因为 merge 之后有 ids 属性了。此时保留 id 属性仅仅是作为 dnd 的 draggableId & key。

      _this.setState(function (_ref2) {
        var result = _ref2.result,
            checks = _ref2.checks;
        return {
          result: _objectSpread({}, result, rest),
          checks: Object.keys(rest).reduce(function (prev, key) {
            return _objectSpread({}, prev, _defineProperty({}, key, is));
          }, checks)
        };
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onOk", function () {
      var _this$state$result = _this.state.result,
          ids = _this$state$result.ids,
          cover = _this$state$result.cover,
          name = _this$state$result.name;

      if (!ids || !cover || !name) {
        antd_lib_message__WEBPACK_IMPORTED_MODULE_3___default.a.warning('ids, 封面, 番剧名必选');

        return;
      }

      _this.props.handleOk(_this.state.result);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleChange", function (checked, key, value, obj) {
      console.log(checked, key, value, obj);
      var _this$state = _this.state,
          result = _this$state.result,
          checks = _this$state.checks;

      if (key !== 'id') {
        _this.setState({
          result: _objectSpread({}, result, _defineProperty({}, key, checked ? value : '')),
          checks: _objectSpread({}, checks, _defineProperty({}, key, checked ? obj : ''))
        });

        return;
      }
    });

    return _this;
  }

  _createClass(ConfirmModal, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          visible = _this$props.visible,
          handleCancel = _this$props.handleCancel,
          origin = _this$props.origin,
          target = _this$props.target;
      var _this$state2 = this.state,
          result = _this$state2.result,
          checks = _this$state2.checks;
      return react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(antd_lib_modal__WEBPACK_IMPORTED_MODULE_1___default.a, {
        title: "\u9009\u62E9\u5361\u7247",
        visible: visible,
        onOk: this.onOk,
        onCancel: handleCancel,
        width: 1000,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 114
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement("div", {
        className: "components-___ConfirmModal-module__body___CoyEv",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 121
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_AnimeSimCard__WEBPACK_IMPORTED_MODULE_6__["default"], {
        data: result,
        is: 'RESULT',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 122
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_AnimeSimCard__WEBPACK_IMPORTED_MODULE_6__["default"], {
        data: target,
        is: 'TARGET',
        onChoose: this.handleChosen,
        onChange: this.handleChange,
        checks: checks,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 123
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_AnimeSimCard__WEBPACK_IMPORTED_MODULE_6__["default"], {
        data: origin,
        is: 'ORIGIN',
        onChoose: this.handleChosen,
        onChange: this.handleChange,
        checks: checks,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 130
        },
        __self: this
      })));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var origin = nextProps.origin,
          target = nextProps.target,
          visible = nextProps.visible;
      var prevIds = prevState.ids;

      if (Object.keys(prevIds).length || !visible) {
        return null;
      }

      var ids = _objectSpread({}, getIds(origin), getIds(target));

      return {
        ids: ids,
        checks: {
          id: ['TARGET', 'ORIGIN']
        },
        result: {
          ids: ids,
          id: target.id,
          _stems: target._stems,
          from: Object.keys(ids)
        }
      };
    }
  }]);

  return ConfirmModal;
}(react__WEBPACK_IMPORTED_MODULE_4__["Component"]);

_defineProperty(ConfirmModal, "propTypes", {
  visible: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.bool.isRequired,
  handleCancel: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.func,
  handleOk: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.func,
  origin: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.object.isRequired,
  target: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.object.isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (ConfirmModal);

/***/ }),

/***/ "./components/ConfirmModal.module.scss":
/*!*********************************************!*\
  !*** ./components/ConfirmModal.module.scss ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
	"body": "components-___ConfirmModal-module__body___CoyEv",
	"divider": "components-___ConfirmModal-module__divider___1GanY"
};

/***/ }),

/***/ "./components/DndBoard.js":
/*!********************************!*\
  !*** ./components/DndBoard.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_beautiful_dnd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-beautiful-dnd */ "react-beautiful-dnd");
/* harmony import */ var react_beautiful_dnd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_beautiful_dnd__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _DndBoard_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DndBoard.module.scss */ "./components/DndBoard.module.scss");
/* harmony import */ var _DndBoard_module_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_DndBoard_module_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _DndColumn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DndColumn */ "./components/DndColumn.js");
var _jsxFileName = "/Users/imuntil/MY/learn/react/SSR/shizuku-mng/components/DndBoard.js";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }






var DndBoard = Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(function DndBoard(props) {
  var onDragEnd = props.onDragEnd,
      keys = props.keys,
      values = props.values,
      onPreview = props.onPreview;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_beautiful_dnd__WEBPACK_IMPORTED_MODULE_2__["DragDropContext"], {
    onDragEnd: onDragEnd,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_beautiful_dnd__WEBPACK_IMPORTED_MODULE_2__["Droppable"], {
    droppableId: "board",
    type: "COLUNN",
    direction: "horizontal",
    isCombineEnabled: false,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    },
    __self: this
  }, function (provided) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", _extends({
      ref: provided.innerRef
    }, provided.droppableProps, {
      className: "components-___DndBoard-module__container___2J_Nr",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 19
      },
      __self: this
    }), keys.map(function (v, i) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DndColumn__WEBPACK_IMPORTED_MODULE_4__["default"], {
        list: values[v],
        listId: v,
        title: v,
        index: i,
        key: v,
        onPreview: onPreview,
        className: "components-___DndBoard-module__dnd-item___NTPk1",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 25
        },
        __self: this
      });
    }));
  })));
});
DndBoard.propTypes = {
  onDragEnd: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  keys: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string).isRequired,
  values: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired
};
/* harmony default export */ __webpack_exports__["default"] = (DndBoard);

/***/ }),

/***/ "./components/DndBoard.module.scss":
/*!*****************************************!*\
  !*** ./components/DndBoard.module.scss ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
	"container": "components-___DndBoard-module__container___2J_Nr",
	"dnd-item": "components-___DndBoard-module__dnd-item___NTPk1"
};

/***/ }),

/***/ "./components/DndColumn.js":
/*!*********************************!*\
  !*** ./components/DndColumn.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_beautiful_dnd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-beautiful-dnd */ "react-beautiful-dnd");
/* harmony import */ var react_beautiful_dnd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_beautiful_dnd__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _DndItem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DndItem */ "./components/DndItem.js");
/* harmony import */ var _DndColumn_module_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DndColumn.module.scss */ "./components/DndColumn.module.scss");
/* harmony import */ var _DndColumn_module_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_DndColumn_module_scss__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var classnames_bind__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! classnames/bind */ "classnames/bind");
/* harmony import */ var classnames_bind__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(classnames_bind__WEBPACK_IMPORTED_MODULE_5__);
var _NAME_MAP,
    _jsxFileName = "/Users/imuntil/MY/learn/react/SSR/shizuku-mng/components/DndColumn.js";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







var cx = classnames_bind__WEBPACK_IMPORTED_MODULE_5___default.a.bind(_DndColumn_module_scss__WEBPACK_IMPORTED_MODULE_4___default.a);
var IQIYI = 'IQIYI';
var BILIBILI = 'BILIBILI';
var BANGUMI = 'BANGUMI';
var NAME_MAP = (_NAME_MAP = {}, _defineProperty(_NAME_MAP, IQIYI, '爱奇艺'), _defineProperty(_NAME_MAP, BILIBILI, '哔哩哔哩动画'), _defineProperty(_NAME_MAP, BANGUMI, '番组计划'), _NAME_MAP);

var Title = function Title(_ref) {
  var title = _ref.title;

  switch (title) {
    case BILIBILI:
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        style: {
          color: '#00a1d6'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 22
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("em", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 23
        },
        __self: this
      }, "from"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "iconfont icon-bilibili-logo",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 24
        },
        __self: this
      }));

    case IQIYI:
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        style: {
          color: '#00be06'
        },
        className: cx('big-icon'),
        __source: {
          fileName: _jsxFileName,
          lineNumber: 29
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("em", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 30
        },
        __self: this
      }, "from"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "iconfont icon-aiqiyi",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 31
        },
        __self: this
      }));

    default:
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        style: {
          color: '#fb7299'
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 36
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("em", {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 37
        },
        __self: this
      }, "from"), "\u756A\u7EC4\u8BA1\u5212");
  }
};

var DndColumn = Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(function DndColumn(props) {
  var list = props.list,
      listId = props.listId,
      title = props.title,
      index = props.index,
      _props$isCombineEnabl = props.isCombineEnabled,
      isCombineEnabled = _props$isCombineEnabl === void 0 ? true : _props$isCombineEnabl,
      onPreview = props.onPreview,
      rest = _objectWithoutProperties(props, ["list", "listId", "title", "index", "isCombineEnabled", "onPreview"]);

  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", _extends({}, rest, {
    className: "components-___DndColumn-module__column-box___3-e1z",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55
    },
    __self: this
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", {
    className: "components-___DndColumn-module__column-title___1Nh1a",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 56
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Title, {
    title: title,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57
    },
    __self: this
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_beautiful_dnd__WEBPACK_IMPORTED_MODULE_2__["Droppable"], {
    droppableId: listId,
    index: index,
    isCombineEnabled: isCombineEnabled,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59
    },
    __self: this
  }, function (provided, snapshot) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", _extends({
      ref: provided.innerRef
    }, provided.droppableProps, {
      className: cx('column-body', {
        'dragging-over': snapshot.isDraggingOver
      }),
      "data-simplebar": true,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 65
      },
      __self: this
    }), list.map(function (v, i) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_beautiful_dnd__WEBPACK_IMPORTED_MODULE_2__["Draggable"], {
        key: v.id,
        draggableId: v.id,
        index: i,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 74
        },
        __self: this
      }, function (dp, ds) {
        return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", _extends({
          ref: dp.innerRef
        }, dp.dragHandleProps, dp.draggableProps, {
          className: "components-___DndColumn-module__item-wrap___13a4u",
          __source: {
            fileName: _jsxFileName,
            lineNumber: 76
          },
          __self: this
        }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DndItem__WEBPACK_IMPORTED_MODULE_3__["default"], _extends({
          isDraggingOver: Boolean(ds.combineTargetFor),
          isDragging: ds.isDragging
        }, v, {
          onClick: function onClick() {
            return onPreview(v);
          },
          __source: {
            fileName: _jsxFileName,
            lineNumber: 82
          },
          __self: this
        })));
      });
    }), provided.placeholder);
  }));
});
DndColumn.propTypes = {
  list: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array,
  listId: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  title: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOf(Object.keys(NAME_MAP)),
  index: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number
};
/* harmony default export */ __webpack_exports__["default"] = (DndColumn);

/***/ }),

/***/ "./components/DndColumn.module.scss":
/*!******************************************!*\
  !*** ./components/DndColumn.module.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
	"column-title": "components-___DndColumn-module__column-title___1Nh1a",
	"big-icon": "components-___DndColumn-module__big-icon___2Vngd",
	"item-wrap": "components-___DndColumn-module__item-wrap___13a4u",
	"column-body": "components-___DndColumn-module__column-body___hM5E9",
	"column-box": "components-___DndColumn-module__column-box___3-e1z",
	"dragging-over": "components-___DndColumn-module__dragging-over___2BrWx"
};

/***/ }),

/***/ "./components/DndItem.js":
/*!*******************************!*\
  !*** ./components/DndItem.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _DndItem_module_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DndItem.module.scss */ "./components/DndItem.module.scss");
/* harmony import */ var _DndItem_module_scss__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_DndItem_module_scss__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames_bind__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames/bind */ "classnames/bind");
/* harmony import */ var classnames_bind__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames_bind__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "/Users/imuntil/MY/learn/react/SSR/shizuku-mng/components/DndItem.js";




var cx = classnames_bind__WEBPACK_IMPORTED_MODULE_3___default.a.bind(_DndItem_module_scss__WEBPACK_IMPORTED_MODULE_2___default.a);
var sorts = {
  bilibili: 0,
  iqiyi: 1,
  bangumi: 2
};

var Icon = function Icon(_ref) {
  var from = _ref.from;

  switch (from) {
    case 'bilibili':
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        style: {
          color: '#00a1d6'
        },
        className: "iconfont icon-bilibili components-___DndItem-module__icon-font___3eK8o",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 17
        },
        __self: this
      });

    case 'iqiyi':
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        style: {
          color: '#00be06',
          fontSize: '1.2rem'
        },
        className: "iconfont icon-iqiyi components-___DndItem-module__icon-font___3eK8o",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 25
        },
        __self: this
      });

    default:
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        style: {
          color: '#fb7299',
          fontSize: '1.2rem'
        },
        className: "iconfont icon-fanju components-___DndItem-module__icon-font___3eK8o",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 33
        },
        __self: this
      });
  }
};

var DndItem = Object(react__WEBPACK_IMPORTED_MODULE_0__["memo"])(function DndItem(props) {
  var from = Array.isArray(props.from) ? props.from.sort(function (a, b) {
    return sorts[a] - sorts[b];
  }) : [props.from];
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: cx('container', {
      dragging: props.isDragging,
      'dragging-over': props.isDraggingOver
    }),
    __source: {
      fileName: _jsxFileName,
      lineNumber: 47
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "components-___DndItem-module__cover___1TnmP",
    onClick: props.onClick,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: "https://dummyimage.com/120x120?text=".concat(props.cover),
    alt: "",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54
    },
    __self: this
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "components-___DndItem-module__box___19GuX",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "components-___DndItem-module__title___2jSOa",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60
    },
    __self: this
  }, props.name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "components-___DndItem-module__some___1IH16",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61
    },
    __self: this
  }, from.map(function (v) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Icon, {
      from: v,
      key: v,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 63
      },
      __self: this
    });
  }))));
});
DndItem.propTypes = {
  name: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  from: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string)]),
  isDragging: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  isDraggingOver: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  cover: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  onClick: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func
};
/* harmony default export */ __webpack_exports__["default"] = (DndItem);

/***/ }),

/***/ "./components/DndItem.module.scss":
/*!****************************************!*\
  !*** ./components/DndItem.module.scss ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
	"container": "components-___DndItem-module__container___20A5X",
	"dragging": "components-___DndItem-module__dragging___Kj5Vg",
	"dragging-over": "components-___DndItem-module__dragging-over___1FnHt",
	"cover": "components-___DndItem-module__cover___1TnmP",
	"icon-font": "components-___DndItem-module__icon-font___3eK8o",
	"font-wrap": "components-___DndItem-module__font-wrap___1r740",
	"box": "components-___DndItem-module__box___19GuX",
	"title": "components-___DndItem-module__title___2jSOa",
	"some": "components-___DndItem-module__some___1IH16"
};

/***/ }),

/***/ "./components/PreviewModal.js":
/*!************************************!*\
  !*** ./components/PreviewModal.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var antd_lib_modal_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd/lib/modal/style/css */ "antd/lib/modal/style/css");
/* harmony import */ var antd_lib_modal_style_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd_lib_modal_style_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd_lib_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd/lib/modal */ "antd/lib/modal");
/* harmony import */ var antd_lib_modal__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd_lib_modal__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _AnimeSimCard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AnimeSimCard */ "./components/AnimeSimCard.js");


var _jsxFileName = "/Users/imuntil/MY/learn/react/SSR/shizuku-mng/components/PreviewModal.js";



var PreviewModal = Object(react__WEBPACK_IMPORTED_MODULE_2__["memo"])(function PreviewModal(props) {
  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(antd_lib_modal__WEBPACK_IMPORTED_MODULE_1___default.a, {
    title: "\u8BE6\u60C5",
    visible: props.visible,
    footer: null,
    onCancel: props.hidePreview,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
    className: "f__center",
    style: {
      paddingBottom: '2rem'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    },
    __self: this
  }, react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_AnimeSimCard__WEBPACK_IMPORTED_MODULE_4__["default"], {
    data: props.data,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    },
    __self: this
  })));
});
PreviewModal.propTypes = {
  visible: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.bool,
  data: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.object,
  hidePreview: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.func
};
/* harmony default export */ __webpack_exports__["default"] = (PreviewModal);

/***/ }),

/***/ "./containers/DndBoardCt.js":
/*!**********************************!*\
  !*** ./containers/DndBoardCt.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_DndBoard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/DndBoard */ "./components/DndBoard.js");
/* harmony import */ var _components_ConfirmModal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/ConfirmModal */ "./components/ConfirmModal.js");
/* harmony import */ var _components_PreviewModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/PreviewModal */ "./components/PreviewModal.js");
/* harmony import */ var lodash_pick__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash.pick */ "lodash.pick");
/* harmony import */ var lodash_pick__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash_pick__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils */ "./utils/index.js");
var _jsxFileName = "/Users/imuntil/MY/learn/react/SSR/shizuku-mng/containers/DndBoardCt.js";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









var DndBoardCt =
/*#__PURE__*/
function (_Component) {
  _inherits(DndBoardCt, _Component);

  function DndBoardCt() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DndBoardCt);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DndBoardCt)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "isSameSource", false);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      BANGUMI: [{
        id: 1,
        from: 'bangumi',
        name: '兔女郎学姐',
        cover: 'xx1.png'
      }, {
        id: 2,
        from: 'bangumi',
        name: 'jojo',
        cover: 'xxj2.png'
      }, {
        id: 3,
        from: 'bangumi',
        name: '史莱姆',
        cover: 'xx2.png'
      }, {
        id: 4,
        from: 'bangumi',
        name: '风',
        cover: 'xxf2.png'
      }, {
        id: 5,
        from: 'bangumi',
        name: '哥杀',
        cover: 'xx2.png'
      }, {
        id: 6,
        from: 'bangumi',
        name: '啦啦啦啦',
        cover: 'xx2.png'
      }, {
        id: 7,
        from: 'bangumi',
        name: '想不起来了',
        cover: 'xx2.png'
      }, {
        id: 9,
        from: 'bangumi',
        name: '幸运星',
        cover: 'xx2.png'
      }, {
        id: 10,
        from: 'bangumi',
        name: '团长',
        cover: 'xx2.png'
      }],
      BILIBILI: [{
        id: 2414,
        from: 'bilibili',
        name: '青春兔女郎学姐',
        cover: 'bb1.png'
      }, {
        id: 7492,
        from: 'bilibili',
        name: 'ssss',
        cover: 'bb2.png'
      }, {
        id: 8344,
        from: 'bilibili',
        name: '全金属',
        cover: 'xxqq2.png'
      }],
      IQIYI: [{
        id: 145,
        from: 'iqiyi',
        name: '哥布林杀手',
        cover: 'ii1.png'
      }, {
        id: 144,
        from: 'iqiyi',
        name: '其他',
        cover: 'ii2.png'
      }],
      visible: false,
      target: {},
      origin: {},
      preivew: false,
      pvData: {}
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onDragEnd", function (result) {
      console.log(result);
      _this.cache = result;
      var combine = result.combine,
          source = result.source,
          destination = result.destination,
          type = result.type;

      if (combine) {
        _this.handleMerge(type, source, combine);

        return;
      }

      _this.handleSort(destination, source);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleMerge", function (type, source, combine) {
      if (type === 'COLUMN') {
        return;
      }

      _this.isSameSource = source.droppableId === combine.droppableId;
      var data = Object(_utils__WEBPACK_IMPORTED_MODULE_6__["combinedQuoteMap"])({
        quoteMap: _this.state,
        source: source,
        combine: combine
      });

      _this.setState(_objectSpread({}, data.quoteMap, {
        origin: data.origin,
        target: data.target,
        visible: true
      }), function () {
        console.log('this.state.origin', _this.state.origin);
        console.log('this.state.target', _this.state.target);
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleSort", function (destination, source) {
      if (!destination) return;

      if (source.droppableId === destination.droppableId && source.index === destination.index) {
        return;
      }

      var data = Object(_utils__WEBPACK_IMPORTED_MODULE_6__["reorderQuoteMap"])({
        quoteMap: _this.state,
        source: source,
        destination: destination
      });

      _this.setState(_objectSpread({}, data.quoteMap));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleOk", function (result) {
      var _this$setState2;

      // debugger
      // 需要区分 merge 的数据源是否一致，若不一致，则无影响
      // 若一致，则不能使用以下处理。因为在 combinedQuoteMap 操作中，会暂时删除 origin。
      // 可能会导致 _stems 记录的index 和 数据源 column 的 length 起冲突。针对同一数据源的 merge
      // 应当先 merge 在 del
      console.log('result', result);
      var _result$_stems = result._stems,
          index = _result$_stems.index,
          from = _result$_stems.from;
      delete result._stems;

      if (!_this.isSameSource) {
        var _this$setState;

        var prevList = _this.state[from];

        _this.setState((_this$setState = {}, _defineProperty(_this$setState, from, _toConsumableArray(prevList.slice(0, index)).concat([result], _toConsumableArray(prevList.slice(index + 1)))), _defineProperty(_this$setState, "origin", {}), _defineProperty(_this$setState, "target", {}), _defineProperty(_this$setState, "visible", false), _this$setState));

        return;
      }

      var original = _this.handleCancel(false);

      var _new = _toConsumableArray(original.slice(0, index)).concat([result], _toConsumableArray(original.slice(index + 1))).filter(function (v) {
        return !v._stems;
      });

      _this.setState((_this$setState2 = {}, _defineProperty(_this$setState2, from, _new), _defineProperty(_this$setState2, "origin", {}), _defineProperty(_this$setState2, "target", {}), _defineProperty(_this$setState2, "visible", false), _this$setState2));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleCancel", function () {
      var _this$setState3;

      var ss = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      // 取消 ‘暂时删除origin’ 的操作
      var origin = _this.state.origin;
      var _origin$_stems = origin._stems,
          index = _origin$_stems.index,
          from = _origin$_stems.from;
      var list = _this.state[from];

      var original = _toConsumableArray(list.slice(0, index)).concat([origin], _toConsumableArray(list.slice(index)));

      if (!ss) {
        return original;
      }

      delete origin._stems;

      _this.setState((_this$setState3 = {}, _defineProperty(_this$setState3, from, original), _defineProperty(_this$setState3, "origin", {}), _defineProperty(_this$setState3, "target", {}), _defineProperty(_this$setState3, "visible", false), _this$setState3));
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handlePreivew", function (data) {
      _this.setState({
        pvData: data,
        preview: true
      });
    });

    return _this;
  }

  _createClass(DndBoardCt, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var list = ['BANGUMI', 'BILIBILI', 'IQIYI'];
      var _this$state = this.state,
          visible = _this$state.visible,
          target = _this$state.target,
          origin = _this$state.origin,
          preview = _this$state.preview,
          pvData = _this$state.pvData;
      var values = lodash_pick__WEBPACK_IMPORTED_MODULE_5___default()(this.state, list);
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 167
        },
        __self: this
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_DndBoard__WEBPACK_IMPORTED_MODULE_2__["default"], {
        values: values,
        keys: list,
        onDragEnd: this.onDragEnd,
        onPreview: this.handlePreivew,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 168
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_ConfirmModal__WEBPACK_IMPORTED_MODULE_3__["default"], {
        visible: visible,
        target: target,
        origin: origin,
        handleOk: this.handleOk,
        handleCancel: this.handleCancel,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 174
        },
        __self: this
      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_PreviewModal__WEBPACK_IMPORTED_MODULE_4__["default"], {
        visible: preview,
        data: pvData,
        hidePreview: function hidePreview() {
          return _this2.setState({
            preview: false
          });
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 181
        },
        __self: this
      }));
    }
  }]);

  return DndBoardCt;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (DndBoardCt);

/***/ }),

/***/ "./pages/calendar.js":
/*!***************************!*\
  !*** ./pages/calendar.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "react-redux");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _calendar_module_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./calendar.module.scss */ "./pages/calendar.module.scss");
/* harmony import */ var _calendar_module_scss__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_calendar_module_scss__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_css_modules__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-css-modules */ "react-css-modules");
/* harmony import */ var react_css_modules__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_css_modules__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _containers_DndBoardCt__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../containers/DndBoardCt */ "./containers/DndBoardCt.js");
var _jsxFileName = "/Users/imuntil/MY/learn/react/SSR/shizuku-mng/pages/calendar.js";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var Calendar =
/*#__PURE__*/
function (_Component) {
  _inherits(Calendar, _Component);

  function Calendar() {
    _classCallCheck(this, Calendar);

    return _possibleConstructorReturn(this, _getPrototypeOf(Calendar).apply(this, arguments));
  }

  _createClass(Calendar, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_containers_DndBoardCt__WEBPACK_IMPORTED_MODULE_5__["default"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 14
        },
        __self: this
      });
    }
  }]);

  return Calendar;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

_defineProperty(Calendar, "propTypes", {// prop: PropTypes
});

var mapStateToProps = function mapStateToProps(state) {
  return {};
};

var mapDispatchToProps = {};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(Calendar));

/***/ }),

/***/ "./pages/calendar.module.scss":
/*!************************************!*\
  !*** ./pages/calendar.module.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = {
	"test": "pages-___calendar-module__test___1rUV3"
};

/***/ }),

/***/ "./utils/index.js":
/*!************************!*\
  !*** ./utils/index.js ***!
  \************************/
/*! exports provided: wdyu, reorder, reorderQuoteMap, combinedQuoteMap */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wdyu", function() { return wdyu; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reorder", function() { return reorder; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reorderQuoteMap", function() { return reorderQuoteMap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "combinedQuoteMap", function() { return combinedQuoteMap; });
/* harmony import */ var why_did_you_update__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! why-did-you-update */ "why-did-you-update");
/* harmony import */ var why_did_you_update__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(why_did_you_update__WEBPACK_IMPORTED_MODULE_0__);
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


var wdyu = function wdyu(React) {
  if (true) {
    Object(why_did_you_update__WEBPACK_IMPORTED_MODULE_0__["whyDidYouUpdate"])(React);
  }
};
var reorder = function reorder(list, startIndex, endIndex) {
  var result = Array.from(list);

  var _result$splice = result.splice(startIndex, 1),
      _result$splice2 = _slicedToArray(_result$splice, 1),
      removed = _result$splice2[0];

  result.splice(endIndex, 0, removed);
  return result;
};
var reorderQuoteMap = function reorderQuoteMap(_ref) {
  var _objectSpread3;

  var quoteMap = _ref.quoteMap,
      source = _ref.source,
      destination = _ref.destination;

  var current = _toConsumableArray(quoteMap[source.droppableId]);

  var next = _toConsumableArray(quoteMap[destination.droppableId]);

  var target = current[source.index]; // 同一list drag

  if (source.droppableId === destination.droppableId) {
    var reordered = reorder(current, source.index, destination.index);

    var _result = _objectSpread({}, quoteMap, _defineProperty({}, source.droppableId, reordered));

    return {
      quoteMap: _result
    };
  } // 不同list drag


  current.splice(source.index, 1);
  next.splice(destination.index, 0, target);

  var result = _objectSpread({}, quoteMap, (_objectSpread3 = {}, _defineProperty(_objectSpread3, source.droppableId, current), _defineProperty(_objectSpread3, destination.droppableId, next), _objectSpread3));

  return {
    quoteMap: result
  };
};
var combinedQuoteMap = function combinedQuoteMap(_ref2) {
  var quoteMap = _ref2.quoteMap,
      source = _ref2.source,
      combine = _ref2.combine;

  var originList = _toConsumableArray(quoteMap[source.droppableId]);

  var targetList = _toConsumableArray(quoteMap[combine.droppableId]);

  var origin = _objectSpread({}, originList[source.index]);

  var targetIndex = targetList.findIndex(function (v) {
    return v.id === combine.draggableId;
  });

  var target = _objectSpread({}, targetList[targetIndex]); // 保存来源，便于 merge 或者取消


  origin._stems = {
    index: source.index,
    from: source.droppableId
  };
  target._stems = {
    index: targetIndex,
    from: combine.droppableId // todo
    // 1> 暂时删除origin
    // 2> 返回target & origin

  };
  originList.splice(source.index, 1);
  var result = {};

  if (combine.droppableId !== source.droppableId) {
    var _objectSpread4;

    result = _objectSpread({}, quoteMap, (_objectSpread4 = {}, _defineProperty(_objectSpread4, combine.droppableId, targetList), _defineProperty(_objectSpread4, source.droppableId, originList), _objectSpread4));
  } else {
    result = _objectSpread({}, quoteMap, _defineProperty({}, combine.droppableId, originList));
  }

  return {
    quoteMap: result,
    origin: origin,
    target: target
  };
};

/***/ }),

/***/ 4:
/*!*********************************!*\
  !*** multi ./pages/calendar.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./pages/calendar.js */"./pages/calendar.js");


/***/ }),

/***/ "antd/lib/button":
/*!**********************************!*\
  !*** external "antd/lib/button" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("antd/lib/button");

/***/ }),

/***/ "antd/lib/button/style/css":
/*!********************************************!*\
  !*** external "antd/lib/button/style/css" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("antd/lib/button/style/css");

/***/ }),

/***/ "antd/lib/checkbox":
/*!************************************!*\
  !*** external "antd/lib/checkbox" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("antd/lib/checkbox");

/***/ }),

/***/ "antd/lib/checkbox/style/css":
/*!**********************************************!*\
  !*** external "antd/lib/checkbox/style/css" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("antd/lib/checkbox/style/css");

/***/ }),

/***/ "antd/lib/message":
/*!***********************************!*\
  !*** external "antd/lib/message" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("antd/lib/message");

/***/ }),

/***/ "antd/lib/message/style/css":
/*!*********************************************!*\
  !*** external "antd/lib/message/style/css" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("antd/lib/message/style/css");

/***/ }),

/***/ "antd/lib/modal":
/*!*********************************!*\
  !*** external "antd/lib/modal" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("antd/lib/modal");

/***/ }),

/***/ "antd/lib/modal/style/css":
/*!*******************************************!*\
  !*** external "antd/lib/modal/style/css" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("antd/lib/modal/style/css");

/***/ }),

/***/ "classnames/bind":
/*!**********************************!*\
  !*** external "classnames/bind" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("classnames/bind");

/***/ }),

/***/ "lodash.omit":
/*!******************************!*\
  !*** external "lodash.omit" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash.omit");

/***/ }),

/***/ "lodash.pick":
/*!******************************!*\
  !*** external "lodash.pick" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash.pick");

/***/ }),

/***/ "prop-types":
/*!*****************************!*\
  !*** external "prop-types" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-beautiful-dnd":
/*!**************************************!*\
  !*** external "react-beautiful-dnd" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-beautiful-dnd");

/***/ }),

/***/ "react-css-modules":
/*!************************************!*\
  !*** external "react-css-modules" ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-css-modules");

/***/ }),

/***/ "react-redux":
/*!******************************!*\
  !*** external "react-redux" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-redux");

/***/ }),

/***/ "why-did-you-update":
/*!*************************************!*\
  !*** external "why-did-you-update" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("why-did-you-update");

/***/ })

/******/ });
//# sourceMappingURL=calendar.js.map