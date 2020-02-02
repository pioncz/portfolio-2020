/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ \"./style.scss\");\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_scss__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\nconst math = {\r\n  lerp: (a, b, n) => (1 - n) * a + n * b,\r\n  norm: (value, min, max) => {\r\n    return (value - min) / (max - min)\r\n  },\r\n  map: (x, a, b, c, d) => (x - a) * (d - c) / (b - a) + c,\r\n};\r\n\r\nconst config = {\r\n  height: window.innerHeight,\r\n  width: window.innerWidth\r\n}\r\n\r\nclass Item {\r\n  constructor(element) {\r\n    this.element = element;\r\n    this.image = element.querySelector('.item__content');\r\n    this.imageWrapper = element.querySelector('.item__wrapper');\r\n    this.lastProgress = null;\r\n\r\n    this.overflow = parseInt(getComputedStyle(this.image).getPropertyValue('--overflow'), 10);\r\n\r\n    this.boundingRect;\r\n    this.fromDirection = element.dataset.from || 'left';\r\n    this.resize();\r\n  }\r\n  resize() {\r\n    this.boundingRect = this.element.getBoundingClientRect();\r\n    const imageWrapperRect = this.imageWrapper && this.imageWrapper.getBoundingClientRect();\r\n\r\n    this.height = imageWrapperRect ? imageWrapperRect.height : this.boundingRect.height;\r\n    this.width = imageWrapperRect ? imageWrapperRect.width : this.boundingRect.width;\r\n    this.offsetY = this.boundingRect.top + window.scrollY;\r\n  }\r\n  render(scrollY, winsize) {\r\n    const maxValue = 1;\r\n    const minValue = 0;\r\n    const map = (scrollY - this.offsetY) / winsize.height + 1;\r\n    const progress = Math.max(\r\n      Math.min(\r\n        map,\r\n        maxValue,\r\n      ), \r\n      minValue,\r\n    );\r\n    if (progress <= 0 || progress > 1 || progress < this.lastProgress) return;\r\n    this.lastProgress = progress;\r\n\r\n    const progress2 = Math.min(\r\n      progress * 10/7,\r\n      maxValue,\r\n    );\r\n    this.image.style.opacity = progress2;\r\n    if (this.fromDirection === 'bottom') {\r\n      const progress3 = Math.min(\r\n        progress * 10/4,\r\n        maxValue,\r\n      );\r\n      const translateX = 0;\r\n      const translateY = (1 - progress3) * (this.overflow);\r\n      const scale = 0.95 + (0.05 * progress3);\r\n\r\n      this.image.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`;\r\n      this.image.style.scale = scale;\r\n    } else {\r\n      const translateX =  (this.fromDirection === 'left' ? 1 : -1) * ((progress * 0.8 + 0.2) - 1) * this.width; // 0.4 - 1\r\n      const translateY = progress * (this.overflow);\r\n      \r\n      this.image.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;\r\n    }\r\n  }\r\n}\r\n\r\nlet lastTick = Date.now();\r\n\r\nclass Smooth {\r\n  constructor() {\r\n    this.bindMethods()\r\n\r\n    this.data = {\r\n      ease: 0.05,\r\n      current: 0,\r\n      last: 0,\r\n      which: 0,\r\n      lastSkew: null,\r\n      lastNavProgress: null,\r\n    };\r\n\r\n    this.sectionPositions = [];\r\n\r\n    this.dom = {\r\n      el: document.querySelector('[data-scroll]'),\r\n      content: document.querySelector('[data-scroll-content]'),\r\n      navBackground: document.querySelector('.nav__background'),\r\n      contactImage: document.querySelector('.contact__image'),\r\n    }\r\n\r\n    this.items = [];\r\n\r\n    this.dom.content.querySelectorAll('.item').forEach(item => this.items.push(new Item(item)));\r\n\r\n    this.rAF = null\r\n\r\n    this.winsize;\r\n\r\n    setTimeout(() => this.init(), 150);\r\n  }\r\n\r\n  bindMethods() {\r\n  ['scroll', 'run', 'resize']\r\n  .forEach((fn) => this[fn] = this[fn].bind(this))\r\n  }\r\n\r\n  setStyles() {\r\n    Object.assign(this.dom.el.style, {\r\n      position: 'fixed',\r\n      top: 0,\r\n      left: 0,\r\n      height: '100vh',\r\n      width: '100%',\r\n      overflow: 'hidden',\r\n    });\r\n  }\r\n\r\n  setHeight() {\r\n    document.body.style.height = `${this.dom.content.offsetHeight}px`;\r\n  }\r\n\r\n  scroll() {\r\n    this.data.current = window.scrollY\r\n  }\r\n\r\n  setActiveLink(which) {\r\n    if (this.dom.el.querySelectorAll('.nav a')[this.data.which]) {\r\n      this.dom.el.querySelectorAll('.nav a')[this.data.which].classList.remove('active');\r\n    }\r\n    this.data.which = which;\r\n    if (this.dom.el.querySelectorAll('.nav a')[which]) {\r\n      this.dom.el.querySelectorAll('.nav a')[which].classList.add('active');\r\n    }\r\n  }\r\n\r\n  run() {\r\n    const now = Date.now();\r\n\r\n    if (now - lastTick > 6) {\r\n      lastTick = now;\r\n\r\n      this.data.last = math.lerp(this.data.last, this.data.current, this.data.ease)\r\n      if (this.data.last < .1) {\r\n        this.data.last = 0\r\n      }\r\n\r\n      const navProgress = Math.min((this.data.last / this.winsize.height) * 4, 1); // between 1.0 - 1.2 * winSizeHeight\r\n      \r\n      if (navProgress < 1 || !this.data.lastNavProgress || this.data.lastNavProgress < 1) {\r\n        this.data.lastNavProgress = navProgress;\r\n        this.dom.navBackground.style.transform = `translate3d(0px,${(1-navProgress) * 58}px,0px)`\r\n      }\r\n\r\n      const diff = this.data.current - this.data.last;\r\n      const acc = diff / config.width;\r\n      const velo =+ acc;\r\n      let skew = velo * 7.5;\r\n      skew = Math.min(Math.max(-20, skew), 20);\r\n\r\n      if (skew !== 0 || this.data.lastSkew !== 0) {\r\n        this.dom.content.style.transform = `translate3d(0, -${this.data.last}px, 0) skewY(${skew}deg)`\r\n    \r\n        this.items.forEach((item, i) => item.render(this.data.last, this.winsize));\r\n\r\n        const which = this.sectionPositions.findIndex(pos => pos >= (this.data.current + this.winsize.height / 2));\r\n\r\n        if (which !== this.data.which) {\r\n          this.setActiveLink(which);\r\n        }\r\n      }\r\n    }\r\n\r\n    this.requestAnimationFrame();\r\n  }\r\n\r\n  requestAnimationFrame() {\r\n    this.rAF = requestAnimationFrame(this.run)\r\n  }\r\n\r\n  resize() {\r\n    this.scroll();\r\n    this.setHeight();\r\n    this.calcWinsize();\r\n    this.calcSectionPosition();\r\n    this.items.forEach(item => item.resize());\r\n  }\r\n\r\n  addEvents() {\r\n    window.addEventListener('resize', this.resize, { passive: true })\r\n    window.addEventListener('scroll', this.scroll, { passive: true })\r\n  }\r\n\r\n  removeEvents() {\r\n    window.removeEventListener('resize', this.resize, { passive: true })\r\n    window.removeEventListener('scroll', this.scroll, { passive: true })\r\n  }\r\n\r\n  calcWinsize(){\r\n    let boundingRect = this.dom.el.getBoundingClientRect();\r\n\r\n    this.winsize = {\r\n      width: boundingRect.width, \r\n      height: boundingRect.height,\r\n    };\r\n  }\r\n\r\n  calcSectionPosition() {\r\n    this.sectionPositions = [];\r\n    const sections = this.dom.content.querySelectorAll('section');\r\n    const correction = -sections[0].getBoundingClientRect().top;\r\n    let boundingRect;\r\n\r\n    for (let i = 1; i < (sections.length - 1); i++) {\r\n      boundingRect = sections[i].getBoundingClientRect();\r\n      this.sectionPositions.push(boundingRect.top + correction);\r\n    }\r\n    let projectsPosition = boundingRect.top + correction + boundingRect.height;\r\n    boundingRect = sections[sections.length - 1].getBoundingClientRect();\r\n    projectsPosition += boundingRect.height;\r\n\r\n    this.sectionPositions.push(projectsPosition);\r\n  }\r\n\r\n  init() {\r\n    this.setHeight();\r\n    this.setStyles();\r\n    window.scroll(window.scrollX, 0);\r\n    this.data.current = 0;\r\n    this.addEvents();\r\n    this.calcWinsize();\r\n    this.calcSectionPosition();\r\n    this.data.last = this.data.current; // don't animate for the first time\r\n    this.items.forEach(item => item.render(0, this.winsize));\r\n    this.run();\r\n\r\n    this.dom.el.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', (e) => {\r\n      const el = document.querySelector(e.target.hash);\r\n      const boundingRect = el.getBoundingClientRect();\r\n      const containerBoundingRect = this.dom.content.getBoundingClientRect();\r\n      const scrollToY = boundingRect.top - containerBoundingRect.top;\r\n      this.data.current = scrollToY\r\n      window.scroll(window.scrollX, scrollToY);\r\n      e.preventDefault();\r\n      e.stopPropagation();\r\n    }));\r\n  }\r\n}\r\n\r\nnew Smooth();\r\n\n\n//# sourceURL=webpack:///./main.js?");

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js!./style.scss":
/*!*****************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js??ref--4-2!./node_modules/sass-loader/dist/cjs.js!./style.scss ***!
  \*****************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./style.scss?./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js??ref--4-2!./node_modules/sass-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar isOldIE = function isOldIE() {\n  var memo;\n  return function memorize() {\n    if (typeof memo === 'undefined') {\n      // Test for IE <= 9 as proposed by Browserhacks\n      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n      // Tests for existence of standard globals is to allow style-loader\n      // to operate correctly into non-standard environments\n      // @see https://github.com/webpack-contrib/style-loader/issues/177\n      memo = Boolean(window && document && document.all && !window.atob);\n    }\n\n    return memo;\n  };\n}();\n\nvar getTarget = function getTarget() {\n  var memo = {};\n  return function memorize(target) {\n    if (typeof memo[target] === 'undefined') {\n      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n        try {\n          // This will throw an exception if access to iframe is blocked\n          // due to cross-origin restrictions\n          styleTarget = styleTarget.contentDocument.head;\n        } catch (e) {\n          // istanbul ignore next\n          styleTarget = null;\n        }\n      }\n\n      memo[target] = styleTarget;\n    }\n\n    return memo[target];\n  };\n}();\n\nvar stylesInDom = {};\n\nfunction modulesToDom(moduleId, list, options) {\n  for (var i = 0; i < list.length; i++) {\n    var part = {\n      css: list[i][1],\n      media: list[i][2],\n      sourceMap: list[i][3]\n    };\n\n    if (stylesInDom[moduleId][i]) {\n      stylesInDom[moduleId][i](part);\n    } else {\n      stylesInDom[moduleId].push(addStyle(part, options));\n    }\n  }\n}\n\nfunction insertStyleElement(options) {\n  var style = document.createElement('style');\n  var attributes = options.attributes || {};\n\n  if (typeof attributes.nonce === 'undefined') {\n    var nonce =  true ? __webpack_require__.nc : undefined;\n\n    if (nonce) {\n      attributes.nonce = nonce;\n    }\n  }\n\n  Object.keys(attributes).forEach(function (key) {\n    style.setAttribute(key, attributes[key]);\n  });\n\n  if (typeof options.insert === 'function') {\n    options.insert(style);\n  } else {\n    var target = getTarget(options.insert || 'head');\n\n    if (!target) {\n      throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n    }\n\n    target.appendChild(style);\n  }\n\n  return style;\n}\n\nfunction removeStyleElement(style) {\n  // istanbul ignore if\n  if (style.parentNode === null) {\n    return false;\n  }\n\n  style.parentNode.removeChild(style);\n}\n/* istanbul ignore next  */\n\n\nvar replaceText = function replaceText() {\n  var textStore = [];\n  return function replace(index, replacement) {\n    textStore[index] = replacement;\n    return textStore.filter(Boolean).join('\\n');\n  };\n}();\n\nfunction applyToSingletonTag(style, index, remove, obj) {\n  var css = remove ? '' : obj.css; // For old IE\n\n  /* istanbul ignore if  */\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = replaceText(index, css);\n  } else {\n    var cssNode = document.createTextNode(css);\n    var childNodes = style.childNodes;\n\n    if (childNodes[index]) {\n      style.removeChild(childNodes[index]);\n    }\n\n    if (childNodes.length) {\n      style.insertBefore(cssNode, childNodes[index]);\n    } else {\n      style.appendChild(cssNode);\n    }\n  }\n}\n\nfunction applyToTag(style, options, obj) {\n  var css = obj.css;\n  var media = obj.media;\n  var sourceMap = obj.sourceMap;\n\n  if (media) {\n    style.setAttribute('media', media);\n  } else {\n    style.removeAttribute('media');\n  }\n\n  if (sourceMap && btoa) {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = css;\n  } else {\n    while (style.firstChild) {\n      style.removeChild(style.firstChild);\n    }\n\n    style.appendChild(document.createTextNode(css));\n  }\n}\n\nvar singleton = null;\nvar singletonCounter = 0;\n\nfunction addStyle(obj, options) {\n  var style;\n  var update;\n  var remove;\n\n  if (options.singleton) {\n    var styleIndex = singletonCounter++;\n    style = singleton || (singleton = insertStyleElement(options));\n    update = applyToSingletonTag.bind(null, style, styleIndex, false);\n    remove = applyToSingletonTag.bind(null, style, styleIndex, true);\n  } else {\n    style = insertStyleElement(options);\n    update = applyToTag.bind(null, style, options);\n\n    remove = function remove() {\n      removeStyleElement(style);\n    };\n  }\n\n  update(obj);\n  return function updateStyle(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {\n        return;\n      }\n\n      update(obj = newObj);\n    } else {\n      remove();\n    }\n  };\n}\n\nmodule.exports = function (moduleId, list, options) {\n  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n  // tags it will allow on a page\n\n  if (!options.singleton && typeof options.singleton !== 'boolean') {\n    options.singleton = isOldIE();\n  }\n\n  moduleId = options.base ? moduleId + options.base : moduleId;\n  list = list || [];\n\n  if (!stylesInDom[moduleId]) {\n    stylesInDom[moduleId] = [];\n  }\n\n  modulesToDom(moduleId, list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    if (Object.prototype.toString.call(newList) !== '[object Array]') {\n      return;\n    }\n\n    if (!stylesInDom[moduleId]) {\n      stylesInDom[moduleId] = [];\n    }\n\n    modulesToDom(moduleId, newList, options);\n\n    for (var j = newList.length; j < stylesInDom[moduleId].length; j++) {\n      stylesInDom[moduleId][j]();\n    }\n\n    stylesInDom[moduleId].length = newList.length;\n\n    if (stylesInDom[moduleId].length === 0) {\n      delete stylesInDom[moduleId];\n    }\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./style.scss":
/*!********************!*\
  !*** ./style.scss ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var api = __webpack_require__(/*! ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n            var content = __webpack_require__(/*! !./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js??ref--4-2!./node_modules/sass-loader/dist/cjs.js!./style.scss */ \"./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js!./style.scss\");\n\n            content = content.__esModule ? content.default : content;\n\n            if (typeof content === 'string') {\n              content = [[module.i, content, '']];\n            }\n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = api(module.i, content, options);\n\nvar exported = content.locals ? content.locals : {};\n\n\n\nmodule.exports = exported;\n\n//# sourceURL=webpack:///./style.scss?");

/***/ })

/******/ });