webpackHotUpdate("static/development/pages/calendar.js",{

/***/ "./components/DndColumn.js":
/*!*********************************!*\
  !*** ./components/DndColumn.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_beautiful_dnd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-beautiful-dnd */ "./node_modules/react-beautiful-dnd/dist/react-beautiful-dnd.esm.js");
/* harmony import */ var _DndItem__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DndItem */ "./components/DndItem.js");
/* harmony import */ var _DndColumn_module_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DndColumn.module.scss */ "./components/DndColumn.module.scss");
/* harmony import */ var _DndColumn_module_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_DndColumn_module_scss__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var classnames_bind__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! classnames/bind */ "./node_modules/classnames/bind.js");
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

/***/ })

})
//# sourceMappingURL=calendar.js.e3b2d0f6b6e06c258288.hot-update.js.map