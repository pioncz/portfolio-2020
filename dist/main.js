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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ \"./style.scss\");\n/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_scss__WEBPACK_IMPORTED_MODULE_0__);\n\n\nconst math = {\n  lerp: (a, b, n) => (1 - n) * a + n * b,\n  norm: (value, min, max) => {\n    return (value - min) / (max - min)\n  },\n  map: (x, a, b, c, d) => (x - a) * (d - c) / (b - a) + c,\n};\n\nconst config = {\n  height: window.innerHeight,\n  width: window.innerWidth\n}\n\nfunction throttle(callback, limit) {\n  var waiting = false;\n  return function () {\n      if (!waiting) {\n          callback.apply(this, arguments);\n          waiting = true;\n          setTimeout(function () {\n              waiting = false;\n          }, limit);\n      }\n  }\n}\n\nclass Item {\n  constructor(element) {\n    this.element = element;\n    this.image = element.querySelector('.item__content');\n    this.imageWrapper = element.querySelector('.item__wrapper');\n    this.lastProgress = null;\n\n    this.overflow = parseInt(getComputedStyle(this.image).getPropertyValue('--overflow'), 10);\n\n    this.boundingRect;\n    this.fromDirection = element.dataset.from || 'left';\n    this.resize();\n  }\n  resize() {\n    this.boundingRect = this.element.getBoundingClientRect();\n    const imageWrapperRect = this.imageWrapper && this.imageWrapper.getBoundingClientRect();\n\n    this.height = imageWrapperRect ? imageWrapperRect.height : this.boundingRect.height;\n    this.width = imageWrapperRect ? imageWrapperRect.width : this.boundingRect.width;\n    this.offsetY = this.boundingRect.top + window.scrollY;\n  }\n  render(scrollY, winsize) {\n    const map = (scrollY - this.offsetY) / winsize.height + 1;\n    const progress = Math.max(Math.min(map, 1,), 0);\n    \n    if (progress <= 0 || progress > 1) return;\n    this.lastProgress = progress;\n\n    this.image.style.opacity = Math.min(progress * 10/7, 1);\n    if (this.fromDirection === 'bottom') {\n      const progress3 = Math.min(progress * 10/4, 1);\n      const translateX = 0;\n      const translateY = (1 - progress3) * (this.overflow);\n      const scale = 0.95 + (0.05 * progress3);\n\n      this.image.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`;\n      this.image.style.scale = scale;\n    } else {\n      const progress2 = Math.max(Math.min(math.norm(progress, 0, 0.5), 1,), 0);\n      const translateX = (this.fromDirection === 'left' ? 1 : -1) * (progress2 - 1) * this.width;\n      const translateY = progress * (this.overflow);\n      \n      this.image.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;\n    }\n  }\n}\n\nlet MAX_SHIFT_X = 50 * 2 * Math.min(1, Math.max(0, math.norm(config.width, 20, 1920)));\nlet MAX_SHIFT_Y = 10 * 2 * Math.min(1, Math.max(0, math.norm(config.width, 20, 1920)));\n\nlet glitchActive = false;\nconst glitchItems = document.querySelectorAll('#about .avatar .img');\nconst glitchAvatar = (active, value) => {\n  glitchActive = active;\n\n  for(let i = 0; i < glitchItems.length; i++) {\n    let item = glitchItems[i];\n    \n    if (!active || !value) {\n      item.style = {};\n    } else {      \n      let shiftX = (MAX_SHIFT_X * (Math.random() - 0.5) * value).toPrecision(2);\n      let shiftY = (MAX_SHIFT_Y * (Math.random() - 0.5) * value).toPrecision(2);\n      item.style.transform = `translate3d(${shiftX}px, ${shiftY}px, 0)`;\n      let h = parseInt(Math.random() * 50);\n      let y = parseInt(Math.random() * (100 - h));\n      item.style.clipPath = `polygon(0 ${y}%, 100% ${y}%, 100% ${y+h}%, 0 ${y+h}%)`;\n      item.style.opacity = Math.random() * Math.max(value, 0.3);\n    }\n  }\n}\n\nconst glithAvatarThrottled = throttle(glitchAvatar, 50);\n\nlet lastTick = Date.now();\n\nclass Smooth {\n  constructor() {\n    this.bindMethods()\n\n    this.data = {\n      ease: 0.05,\n      current: 0,\n      last: 0,\n      which: 0,\n      lastSkew: 0,\n      lastNavProgress: null,\n    };\n\n    this.sectionPositions = [];\n\n    this.dom = {\n      el: document.querySelector('[data-scroll]'),\n      content: document.querySelector('[data-scroll-content]'),\n      navBackground: document.querySelector('.nav__background'),\n      contactImage: document.querySelector('.contact__image'),\n    }\n\n    this.items = [];\n\n    this.dom.content.querySelectorAll('.item').forEach(item => this.items.push(new Item(item)));\n\n    this.rAF = null\n\n    this.winsize;\n\n    setTimeout(() => this.init(), 150);\n  }\n\n  bindMethods() {\n    ['scroll', 'run', 'resize']\n      .forEach((fn) => this[fn] = this[fn].bind(this))\n  }\n\n  setStyles() {\n    Object.assign(this.dom.el.style, {\n      position: 'fixed',\n      top: 0,\n      left: 0,\n      height: '100vh',\n      width: '100%',\n      overflow: 'hidden',\n    });\n  }\n\n  setHeight() {\n    document.body.style.height = `${this.dom.content.offsetHeight}px`;\n  }\n\n  scroll() {\n    this.data.current = window.scrollY\n  }\n\n  setActiveLink(which) {\n    if (this.dom.el.querySelectorAll('.nav a')[this.data.which]) {\n      this.dom.el.querySelectorAll('.nav a')[this.data.which].classList.remove('active');\n    }\n    this.data.which = which;\n    if (this.dom.el.querySelectorAll('.nav a')[which]) {\n      this.dom.el.querySelectorAll('.nav a')[which].classList.add('active');\n    }\n  }\n\n  run() {\n    const now = Date.now();\n\n    if (now - lastTick > 6) {\n      lastTick = now;\n\n      this.data.last = math.lerp(this.data.last, this.data.current, this.data.ease)\n      if (this.data.last < .1) {\n        this.data.last = 0\n      }\n\n      const navProgress = Math.min((this.data.last / this.winsize.height) * 4, 1); // between 1.0 - 1.2 * winSizeHeight\n      \n      if (navProgress < 1 || !this.data.lastNavProgress || this.data.lastNavProgress < 1) {\n        this.data.lastNavProgress = navProgress;\n        this.dom.navBackground.style.transform = `translate3d(0px,${(1-navProgress) * 58}px,0px)`\n      }\n\n      const diff = this.data.current - this.data.last;\n      const acc = diff / config.width;\n      const velo =+ acc;\n      let skew = velo * 7.5;\n      if (Math.abs(skew) < 0.01) {\n        skew = 0;\n      }\n      skew = Math.min(Math.max(-20, skew), 20);\n      let skewAbs = Math.abs(skew);\n\n      if (skew !== 0 || this.data.lastSkew !== 0) {\n        if (this.data.last < this.winsize.height && skewAbs > 0) {\n          glithAvatarThrottled(true, Math.min(skewAbs, 1));\n        } else if (glitchActive) {\n          glithAvatarThrottled(false);\n        }\n        this.dom.content.style.transform = `translate3d(0, -${this.data.last}px, 0) skewY(${skew}deg)`\n        this.items.forEach((item, i) => item.render(this.data.last, this.winsize));\n\n        const which = this.sectionPositions.findIndex(pos => pos >= (this.data.current + this.winsize.height / 2));\n\n        if (which !== this.data.which) {\n          this.setActiveLink(which);\n        }\n\n        this.data.lastSkew = skew;\n      } else if (glitchActive) {\n        glithAvatarThrottled(false);\n      }\n    }\n\n    this.requestAnimationFrame();\n  }\n\n  requestAnimationFrame() {\n    this.rAF = requestAnimationFrame(this.run)\n  }\n\n  resize() {\n    if (config.width !== window.innerWidth) {\n      this.scroll();\n      this.setHeight();\n      this.calcWinsize();\n      this.calcSectionPosition();\n      this.items.forEach(item => item.resize());\n    }\n  }\n\n  addEvents() {\n    window.addEventListener('resize', this.resize, { passive: true })\n    window.addEventListener('scroll', this.scroll, { passive: true })\n  }\n\n  removeEvents() {\n    window.removeEventListener('resize', this.resize, { passive: true })\n    window.removeEventListener('scroll', this.scroll, { passive: true })\n  }\n\n  calcWinsize(){\n    let boundingRect = this.dom.el.getBoundingClientRect();\n\n    this.winsize = {\n      width: boundingRect.width, \n      height: boundingRect.height,\n    };\n  }\n\n  calcSectionPosition() {\n    this.sectionPositions = [];\n    const sections = this.dom.content.querySelectorAll('section');\n    const correction = -sections[0].getBoundingClientRect().top;\n    let boundingRect;\n\n    for (let i = 1; i < (sections.length - 1); i++) {\n      boundingRect = sections[i].getBoundingClientRect();\n      this.sectionPositions.push(boundingRect.top + correction);\n    }\n    let projectsPosition = boundingRect.top + correction + boundingRect.height;\n    boundingRect = sections[sections.length - 1].getBoundingClientRect();\n    projectsPosition += boundingRect.height;\n\n    this.sectionPositions.push(projectsPosition);\n  }\n\n  init() {\n    this.setHeight();\n    this.setStyles();\n    window.scroll(window.scrollX, 0);\n    this.data.current = 0;\n    this.addEvents();\n    this.calcWinsize();\n    this.calcSectionPosition();\n    this.data.last = this.data.current; // don't animate for the first time\n    this.items.forEach(item => item.render(0, this.winsize));\n    this.run();\n\n    this.dom.el.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', (e) => {\n      const el = document.querySelector(e.target.hash);\n      const boundingRect = el.getBoundingClientRect();\n      const containerBoundingRect = this.dom.content.getBoundingClientRect();\n      const scrollToY = boundingRect.top - containerBoundingRect.top;\n      this.data.current = scrollToY\n      window.scroll(window.scrollX, scrollToY);\n      e.preventDefault();\n      e.stopPropagation();\n    }));\n  }\n}\n\nnew Smooth();\n\n\n//# sourceURL=webpack:///./main.js?");

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
eval("\n\nvar isOldIE = function isOldIE() {\n  var memo;\n  return function memorize() {\n    if (typeof memo === 'undefined') {\n      // Test for IE <= 9 as proposed by Browserhacks\n      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n      // Tests for existence of standard globals is to allow style-loader\n      // to operate correctly into non-standard environments\n      // @see https://github.com/webpack-contrib/style-loader/issues/177\n      memo = Boolean(window && document && document.all && !window.atob);\n    }\n\n    return memo;\n  };\n}();\n\nvar getTarget = function getTarget() {\n  var memo = {};\n  return function memorize(target) {\n    if (typeof memo[target] === 'undefined') {\n      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n        try {\n          // This will throw an exception if access to iframe is blocked\n          // due to cross-origin restrictions\n          styleTarget = styleTarget.contentDocument.head;\n        } catch (e) {\n          // istanbul ignore next\n          styleTarget = null;\n        }\n      }\n\n      memo[target] = styleTarget;\n    }\n\n    return memo[target];\n  };\n}();\n\nvar stylesInDom = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDom.length; i++) {\n    if (stylesInDom[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var index = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3]\n    };\n\n    if (index !== -1) {\n      stylesInDom[index].references++;\n      stylesInDom[index].updater(obj);\n    } else {\n      stylesInDom.push({\n        identifier: identifier,\n        updater: addStyle(obj, options),\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction insertStyleElement(options) {\n  var style = document.createElement('style');\n  var attributes = options.attributes || {};\n\n  if (typeof attributes.nonce === 'undefined') {\n    var nonce =  true ? __webpack_require__.nc : undefined;\n\n    if (nonce) {\n      attributes.nonce = nonce;\n    }\n  }\n\n  Object.keys(attributes).forEach(function (key) {\n    style.setAttribute(key, attributes[key]);\n  });\n\n  if (typeof options.insert === 'function') {\n    options.insert(style);\n  } else {\n    var target = getTarget(options.insert || 'head');\n\n    if (!target) {\n      throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n    }\n\n    target.appendChild(style);\n  }\n\n  return style;\n}\n\nfunction removeStyleElement(style) {\n  // istanbul ignore if\n  if (style.parentNode === null) {\n    return false;\n  }\n\n  style.parentNode.removeChild(style);\n}\n/* istanbul ignore next  */\n\n\nvar replaceText = function replaceText() {\n  var textStore = [];\n  return function replace(index, replacement) {\n    textStore[index] = replacement;\n    return textStore.filter(Boolean).join('\\n');\n  };\n}();\n\nfunction applyToSingletonTag(style, index, remove, obj) {\n  var css = remove ? '' : obj.media ? \"@media \".concat(obj.media, \" {\").concat(obj.css, \"}\") : obj.css; // For old IE\n\n  /* istanbul ignore if  */\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = replaceText(index, css);\n  } else {\n    var cssNode = document.createTextNode(css);\n    var childNodes = style.childNodes;\n\n    if (childNodes[index]) {\n      style.removeChild(childNodes[index]);\n    }\n\n    if (childNodes.length) {\n      style.insertBefore(cssNode, childNodes[index]);\n    } else {\n      style.appendChild(cssNode);\n    }\n  }\n}\n\nfunction applyToTag(style, options, obj) {\n  var css = obj.css;\n  var media = obj.media;\n  var sourceMap = obj.sourceMap;\n\n  if (media) {\n    style.setAttribute('media', media);\n  } else {\n    style.removeAttribute('media');\n  }\n\n  if (sourceMap && typeof btoa !== 'undefined') {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = css;\n  } else {\n    while (style.firstChild) {\n      style.removeChild(style.firstChild);\n    }\n\n    style.appendChild(document.createTextNode(css));\n  }\n}\n\nvar singleton = null;\nvar singletonCounter = 0;\n\nfunction addStyle(obj, options) {\n  var style;\n  var update;\n  var remove;\n\n  if (options.singleton) {\n    var styleIndex = singletonCounter++;\n    style = singleton || (singleton = insertStyleElement(options));\n    update = applyToSingletonTag.bind(null, style, styleIndex, false);\n    remove = applyToSingletonTag.bind(null, style, styleIndex, true);\n  } else {\n    style = insertStyleElement(options);\n    update = applyToTag.bind(null, style, options);\n\n    remove = function remove() {\n      removeStyleElement(style);\n    };\n  }\n\n  update(obj);\n  return function updateStyle(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {\n        return;\n      }\n\n      update(obj = newObj);\n    } else {\n      remove();\n    }\n  };\n}\n\nmodule.exports = function (list, options) {\n  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n  // tags it will allow on a page\n\n  if (!options.singleton && typeof options.singleton !== 'boolean') {\n    options.singleton = isOldIE();\n  }\n\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    if (Object.prototype.toString.call(newList) !== '[object Array]') {\n      return;\n    }\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDom[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDom[_index].references === 0) {\n        stylesInDom[_index].updater();\n\n        stylesInDom.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack:///./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./style.scss":
/*!********************!*\
  !*** ./style.scss ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var api = __webpack_require__(/*! ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n            var content = __webpack_require__(/*! !./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js??ref--4-2!./node_modules/sass-loader/dist/cjs.js!./style.scss */ \"./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/dist/cjs.js?!./node_modules/sass-loader/dist/cjs.js!./style.scss\");\n\n            content = content.__esModule ? content.default : content;\n\n            if (typeof content === 'string') {\n              content = [[module.i, content, '']];\n            }\n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = api(content, options);\n\n\n\nmodule.exports = content.locals || {};\n\n//# sourceURL=webpack:///./style.scss?");

/***/ })

/******/ });