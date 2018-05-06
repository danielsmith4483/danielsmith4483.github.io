module.exports =
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "JkW7");
/******/ })
/************************************************************************/
/******/ ({

/***/ "/QC5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "subscribers", function() { return subscribers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentUrl", function() { return getCurrentUrl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "route", function() { return route; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Router", function() { return Router; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Route", function() { return Route; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Link", function() { return Link; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact__ = __webpack_require__("KM04");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_preact___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_preact__);


var EMPTY$1 = {};

function assign(obj, props) {
	// eslint-disable-next-line guard-for-in
	for (var i in props) {
		obj[i] = props[i];
	}
	return obj;
}

function exec(url, route, opts) {
	var reg = /(?:\?([^#]*))?(#.*)?$/,
	    c = url.match(reg),
	    matches = {},
	    ret;
	if (c && c[1]) {
		var p = c[1].split('&');
		for (var i = 0; i < p.length; i++) {
			var r = p[i].split('=');
			matches[decodeURIComponent(r[0])] = decodeURIComponent(r.slice(1).join('='));
		}
	}
	url = segmentize(url.replace(reg, ''));
	route = segmentize(route || '');
	var max = Math.max(url.length, route.length);
	for (var i$1 = 0; i$1 < max; i$1++) {
		if (route[i$1] && route[i$1].charAt(0) === ':') {
			var param = route[i$1].replace(/(^\:|[+*?]+$)/g, ''),
			    flags = (route[i$1].match(/[+*?]+$/) || EMPTY$1)[0] || '',
			    plus = ~flags.indexOf('+'),
			    star = ~flags.indexOf('*'),
			    val = url[i$1] || '';
			if (!val && !star && (flags.indexOf('?') < 0 || plus)) {
				ret = false;
				break;
			}
			matches[param] = decodeURIComponent(val);
			if (plus || star) {
				matches[param] = url.slice(i$1).map(decodeURIComponent).join('/');
				break;
			}
		} else if (route[i$1] !== url[i$1]) {
			ret = false;
			break;
		}
	}
	if (opts.default !== true && ret === false) {
		return false;
	}
	return matches;
}

function pathRankSort(a, b) {
	return a.rank < b.rank ? 1 : a.rank > b.rank ? -1 : a.index - b.index;
}

// filter out VNodes without attributes (which are unrankeable), and add `index`/`rank` properties to be used in sorting.
function prepareVNodeForRanking(vnode, index) {
	vnode.index = index;
	vnode.rank = rankChild(vnode);
	return vnode.attributes;
}

function segmentize(url) {
	return url.replace(/(^\/+|\/+$)/g, '').split('/');
}

function rankSegment(segment) {
	return segment.charAt(0) == ':' ? 1 + '*+?'.indexOf(segment.charAt(segment.length - 1)) || 4 : 5;
}

function rank(path) {
	return segmentize(path).map(rankSegment).join('');
}

function rankChild(vnode) {
	return vnode.attributes.default ? 0 : rank(vnode.attributes.path);
}

var customHistory = null;

var ROUTERS = [];

var subscribers = [];

var EMPTY = {};

function isPreactElement(node) {
	return node.__preactattr_ != null || typeof Symbol !== 'undefined' && node[Symbol.for('preactattr')] != null;
}

function setUrl(url, type) {
	if (type === void 0) type = 'push';

	if (customHistory && customHistory[type]) {
		customHistory[type](url);
	} else if (typeof history !== 'undefined' && history[type + 'State']) {
		history[type + 'State'](null, null, url);
	}
}

function getCurrentUrl() {
	var url;
	if (customHistory && customHistory.location) {
		url = customHistory.location;
	} else if (customHistory && customHistory.getCurrentLocation) {
		url = customHistory.getCurrentLocation();
	} else {
		url = typeof location !== 'undefined' ? location : EMPTY;
	}
	return "" + (url.pathname || '') + (url.search || '');
}

function route(url, replace) {
	if (replace === void 0) replace = false;

	if (typeof url !== 'string' && url.url) {
		replace = url.replace;
		url = url.url;
	}

	// only push URL into history if we can handle it
	if (canRoute(url)) {
		setUrl(url, replace ? 'replace' : 'push');
	}

	return routeTo(url);
}

/** Check if the given URL can be handled by any router instances. */
function canRoute(url) {
	for (var i = ROUTERS.length; i--;) {
		if (ROUTERS[i].canRoute(url)) {
			return true;
		}
	}
	return false;
}

/** Tell all router instances to handle the given URL.  */
function routeTo(url) {
	var didRoute = false;
	for (var i = 0; i < ROUTERS.length; i++) {
		if (ROUTERS[i].routeTo(url) === true) {
			didRoute = true;
		}
	}
	for (var i$1 = subscribers.length; i$1--;) {
		subscribers[i$1](url);
	}
	return didRoute;
}

function routeFromLink(node) {
	// only valid elements
	if (!node || !node.getAttribute) {
		return;
	}

	var href = node.getAttribute('href'),
	    target = node.getAttribute('target');

	// ignore links with targets and non-path URLs
	if (!href || !href.match(/^\//g) || target && !target.match(/^_?self$/i)) {
		return;
	}

	// attempt to route, if no match simply cede control to browser
	return route(href);
}

function handleLinkClick(e) {
	if (e.button == 0) {
		routeFromLink(e.currentTarget || e.target || this);
		return prevent(e);
	}
}

function prevent(e) {
	if (e) {
		if (e.stopImmediatePropagation) {
			e.stopImmediatePropagation();
		}
		if (e.stopPropagation) {
			e.stopPropagation();
		}
		e.preventDefault();
	}
	return false;
}

function delegateLinkHandler(e) {
	// ignore events the browser takes care of already:
	if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.button !== 0) {
		return;
	}

	var t = e.target;
	do {
		if (String(t.nodeName).toUpperCase() === 'A' && t.getAttribute('href') && isPreactElement(t)) {
			if (t.hasAttribute('native')) {
				return;
			}
			// if link is handled by the router, prevent browser defaults
			if (routeFromLink(t)) {
				return prevent(e);
			}
		}
	} while (t = t.parentNode);
}

var eventListenersInitialized = false;

function initEventListeners() {
	if (eventListenersInitialized) {
		return;
	}

	if (typeof addEventListener === 'function') {
		if (!customHistory) {
			addEventListener('popstate', function () {
				routeTo(getCurrentUrl());
			});
		}
		addEventListener('click', delegateLinkHandler);
	}
	eventListenersInitialized = true;
}

var Router = function (Component$$1) {
	function Router(props) {
		Component$$1.call(this, props);
		if (props.history) {
			customHistory = props.history;
		}

		this.state = {
			url: props.url || getCurrentUrl()
		};

		initEventListeners();
	}

	if (Component$$1) Router.__proto__ = Component$$1;
	Router.prototype = Object.create(Component$$1 && Component$$1.prototype);
	Router.prototype.constructor = Router;

	Router.prototype.shouldComponentUpdate = function shouldComponentUpdate(props) {
		if (props.static !== true) {
			return true;
		}
		return props.url !== this.props.url || props.onChange !== this.props.onChange;
	};

	/** Check if the given URL can be matched against any children */
	Router.prototype.canRoute = function canRoute(url) {
		return this.getMatchingChildren(this.props.children, url, false).length > 0;
	};

	/** Re-render children with a new URL to match against. */
	Router.prototype.routeTo = function routeTo(url) {
		this._didRoute = false;
		this.setState({ url: url });

		// if we're in the middle of an update, don't synchronously re-route.
		if (this.updating) {
			return this.canRoute(url);
		}

		this.forceUpdate();
		return this._didRoute;
	};

	Router.prototype.componentWillMount = function componentWillMount() {
		ROUTERS.push(this);
		this.updating = true;
	};

	Router.prototype.componentDidMount = function componentDidMount() {
		var this$1 = this;

		if (customHistory) {
			this.unlisten = customHistory.listen(function (location) {
				this$1.routeTo("" + (location.pathname || '') + (location.search || ''));
			});
		}
		this.updating = false;
	};

	Router.prototype.componentWillUnmount = function componentWillUnmount() {
		if (typeof this.unlisten === 'function') {
			this.unlisten();
		}
		ROUTERS.splice(ROUTERS.indexOf(this), 1);
	};

	Router.prototype.componentWillUpdate = function componentWillUpdate() {
		this.updating = true;
	};

	Router.prototype.componentDidUpdate = function componentDidUpdate() {
		this.updating = false;
	};

	Router.prototype.getMatchingChildren = function getMatchingChildren(children, url, invoke) {
		return children.filter(prepareVNodeForRanking).sort(pathRankSort).map(function (vnode) {
			var matches = exec(url, vnode.attributes.path, vnode.attributes);
			if (matches) {
				if (invoke !== false) {
					var newProps = { url: url, matches: matches };
					assign(newProps, matches);
					delete newProps.ref;
					delete newProps.key;
					return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["cloneElement"])(vnode, newProps);
				}
				return vnode;
			}
		}).filter(Boolean);
	};

	Router.prototype.render = function render(ref, ref$1) {
		var children = ref.children;
		var onChange = ref.onChange;
		var url = ref$1.url;

		var active = this.getMatchingChildren(children, url, true);

		var current = active[0] || null;
		this._didRoute = !!current;

		var previous = this.previousUrl;
		if (url !== previous) {
			this.previousUrl = url;
			if (typeof onChange === 'function') {
				onChange({
					router: this,
					url: url,
					previous: previous,
					active: active,
					current: current
				});
			}
		}

		return current;
	};

	return Router;
}(__WEBPACK_IMPORTED_MODULE_0_preact__["Component"]);

var Link = function Link(props) {
	return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])('a', assign({ onClick: handleLinkClick }, props));
};

var Route = function Route(props) {
	return Object(__WEBPACK_IMPORTED_MODULE_0_preact__["h"])(props.component, props);
};

Router.subscribers = subscribers;
Router.getCurrentUrl = getCurrentUrl;
Router.route = route;
Router.Router = Router;
Router.Route = Route;
Router.Link = Link;

/* harmony default export */ __webpack_exports__["default"] = (Router);
//# sourceMappingURL=preact-router.es.js.map

/***/ }),

/***/ "B85+":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "FJnM":
/***/ (function(module, exports, __webpack_require__) {

exports.__esModule = true;

var _createClass = function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
}();

var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];for (var key in source) {
            if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
            }
        }
    }return target;
};

var _preact = __webpack_require__("KM04");

var _preactSideEffect = __webpack_require__("xToX");

var _preactSideEffect2 = _interopRequireDefault(_preactSideEffect);

var _deepEqual = __webpack_require__("koiw");

var _deepEqual2 = _interopRequireDefault(_deepEqual);

var _objectAssign = __webpack_require__("J4Nk");

var _objectAssign2 = _interopRequireDefault(_objectAssign);

var _HelmetConstants = __webpack_require__("Qxat");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
    } else {
        obj[key] = value;
    }return obj;
}

var HELMET_ATTRIBUTE = "data-preact-helmet";

var encodeSpecialCharacters = function encodeSpecialCharacters(str) {
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
};

var getInnermostProperty = function getInnermostProperty(propsList, property) {
    for (var i = propsList.length - 1; i >= 0; i--) {
        var props = propsList[i];

        if (props[property]) {
            return props[property];
        }
    }
    return null;
};

var getTitleFromPropsList = function getTitleFromPropsList(propsList) {
    var innermostTitle = getInnermostProperty(propsList, "title");
    var innermostTemplate = getInnermostProperty(propsList, "titleTemplate");

    if (innermostTemplate && innermostTitle) {
        // use function arg to avoid need to escape $ characters
        return innermostTemplate.replace(/%s/g, function () {
            return innermostTitle;
        });
    }

    var innermostDefaultTitle = getInnermostProperty(propsList, "defaultTitle");

    return innermostTitle || innermostDefaultTitle || "";
};

var getOnChangeClientState = function getOnChangeClientState(propsList) {
    return getInnermostProperty(propsList, "onChangeClientState") || function () {};
};

var getAttributesFromPropsList = function getAttributesFromPropsList(tagType, propsList) {
    return propsList.filter(function (props) {
        return typeof props[tagType] !== "undefined";
    }).map(function (props) {
        return props[tagType];
    }).reduce(function (tagAttrs, current) {
        return _extends({}, tagAttrs, current);
    }, {});
};

var getBaseTagFromPropsList = function getBaseTagFromPropsList(primaryAttributes, propsList) {
    return propsList.filter(function (props) {
        return typeof props[_HelmetConstants.TAG_NAMES.BASE] !== "undefined";
    }).map(function (props) {
        return props[_HelmetConstants.TAG_NAMES.BASE];
    }).reverse().reduce(function (innermostBaseTag, tag) {
        if (!innermostBaseTag.length) {
            var keys = Object.keys(tag);

            for (var i = 0; i < keys.length; i++) {
                var attributeKey = keys[i];
                var lowerCaseAttributeKey = attributeKey.toLowerCase();

                if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && tag[lowerCaseAttributeKey]) {
                    return innermostBaseTag.concat(tag);
                }
            }
        }

        return innermostBaseTag;
    }, []);
};

var getTagsFromPropsList = function getTagsFromPropsList(tagName, primaryAttributes, propsList) {
    // Calculate list of tags, giving priority innermost component (end of the propslist)
    var approvedSeenTags = {};

    return propsList.filter(function (props) {
        return typeof props[tagName] !== "undefined";
    }).map(function (props) {
        return props[tagName];
    }).reverse().reduce(function (approvedTags, instanceTags) {
        var instanceSeenTags = {};

        instanceTags.filter(function (tag) {
            var primaryAttributeKey = void 0;
            var keys = Object.keys(tag);
            for (var i = 0; i < keys.length; i++) {
                var attributeKey = keys[i];
                var lowerCaseAttributeKey = attributeKey.toLowerCase();

                // Special rule with link tags, since rel and href are both primary tags, rel takes priority
                if (primaryAttributes.indexOf(lowerCaseAttributeKey) !== -1 && !(primaryAttributeKey === _HelmetConstants.TAG_PROPERTIES.REL && tag[primaryAttributeKey].toLowerCase() === "canonical") && !(lowerCaseAttributeKey === _HelmetConstants.TAG_PROPERTIES.REL && tag[lowerCaseAttributeKey].toLowerCase() === "stylesheet")) {
                    primaryAttributeKey = lowerCaseAttributeKey;
                }
                // Special case for innerHTML which doesn't work lowercased
                if (primaryAttributes.indexOf(attributeKey) !== -1 && (attributeKey === _HelmetConstants.TAG_PROPERTIES.INNER_HTML || attributeKey === _HelmetConstants.TAG_PROPERTIES.CSS_TEXT || attributeKey === _HelmetConstants.TAG_PROPERTIES.ITEM_PROP)) {
                    primaryAttributeKey = attributeKey;
                }
            }

            if (!primaryAttributeKey || !tag[primaryAttributeKey]) {
                return false;
            }

            var value = tag[primaryAttributeKey].toLowerCase();

            if (!approvedSeenTags[primaryAttributeKey]) {
                approvedSeenTags[primaryAttributeKey] = {};
            }

            if (!instanceSeenTags[primaryAttributeKey]) {
                instanceSeenTags[primaryAttributeKey] = {};
            }

            if (!approvedSeenTags[primaryAttributeKey][value]) {
                instanceSeenTags[primaryAttributeKey][value] = true;
                return true;
            }

            return false;
        }).reverse().forEach(function (tag) {
            return approvedTags.push(tag);
        });

        // Update seen tags with tags from this instance
        var keys = Object.keys(instanceSeenTags);
        for (var i = 0; i < keys.length; i++) {
            var attributeKey = keys[i];
            var tagUnion = (0, _objectAssign2.default)({}, approvedSeenTags[attributeKey], instanceSeenTags[attributeKey]);

            approvedSeenTags[attributeKey] = tagUnion;
        }

        return approvedTags;
    }, []).reverse();
};

var updateTitle = function updateTitle(title, attributes) {
    document.title = title || document.title;
    updateAttributes(_HelmetConstants.TAG_NAMES.TITLE, attributes);
};

var updateAttributes = function updateAttributes(tagName, attributes) {
    var htmlTag = document.getElementsByTagName(tagName)[0];
    var helmetAttributeString = htmlTag.getAttribute(HELMET_ATTRIBUTE);
    var helmetAttributes = helmetAttributeString ? helmetAttributeString.split(",") : [];
    var attributesToRemove = [].concat(helmetAttributes);
    var attributeKeys = Object.keys(attributes);

    for (var i = 0; i < attributeKeys.length; i++) {
        var attribute = attributeKeys[i];
        var value = attributes[attribute] || "";
        htmlTag.setAttribute(attribute, value);

        if (helmetAttributes.indexOf(attribute) === -1) {
            helmetAttributes.push(attribute);
        }

        var indexToSave = attributesToRemove.indexOf(attribute);
        if (indexToSave !== -1) {
            attributesToRemove.splice(indexToSave, 1);
        }
    }

    for (var _i = attributesToRemove.length - 1; _i >= 0; _i--) {
        htmlTag.removeAttribute(attributesToRemove[_i]);
    }

    if (helmetAttributes.length === attributesToRemove.length) {
        htmlTag.removeAttribute(HELMET_ATTRIBUTE);
    } else {
        htmlTag.setAttribute(HELMET_ATTRIBUTE, helmetAttributes.join(","));
    }
};

var updateTags = function updateTags(type, tags) {
    var headElement = document.head || document.querySelector("head");
    var tagNodes = headElement.querySelectorAll(type + "[" + HELMET_ATTRIBUTE + "]");
    var oldTags = Array.prototype.slice.call(tagNodes);
    var newTags = [];
    var indexToDelete = void 0;

    if (tags && tags.length) {
        tags.forEach(function (tag) {
            var newElement = document.createElement(type);

            for (var attribute in tag) {
                if (tag.hasOwnProperty(attribute)) {
                    if (attribute === "innerHTML") {
                        newElement.innerHTML = tag.innerHTML;
                    } else if (attribute === "cssText") {
                        if (newElement.styleSheet) {
                            newElement.styleSheet.cssText = tag.cssText;
                        } else {
                            newElement.appendChild(document.createTextNode(tag.cssText));
                        }
                    } else {
                        var value = typeof tag[attribute] === "undefined" ? "" : tag[attribute];
                        newElement.setAttribute(attribute, value);
                    }
                }
            }

            newElement.setAttribute(HELMET_ATTRIBUTE, "true");

            // Remove a duplicate tag from domTagstoRemove, so it isn't cleared.
            if (oldTags.some(function (existingTag, index) {
                indexToDelete = index;
                return newElement.isEqualNode(existingTag);
            })) {
                oldTags.splice(indexToDelete, 1);
            } else {
                newTags.push(newElement);
            }
        });
    }

    oldTags.forEach(function (tag) {
        return tag.parentNode.removeChild(tag);
    });
    newTags.forEach(function (tag) {
        return headElement.appendChild(tag);
    });

    return {
        oldTags: oldTags,
        newTags: newTags
    };
};

var generateHtmlAttributesAsString = function generateHtmlAttributesAsString(attributes) {
    return Object.keys(attributes).reduce(function (str, key) {
        var attr = typeof attributes[key] !== "undefined" ? key + "=\"" + attributes[key] + "\"" : "" + key;
        return str ? str + " " + attr : attr;
    }, "");
};

var generateTitleAsString = function generateTitleAsString(type, title, attributes) {
    var attributeString = generateHtmlAttributesAsString(attributes);
    return attributeString ? "<" + type + " " + HELMET_ATTRIBUTE + " " + attributeString + ">" + encodeSpecialCharacters(title) + "</" + type + ">" : "<" + type + " " + HELMET_ATTRIBUTE + ">" + encodeSpecialCharacters(title) + "</" + type + ">";
};

var generateTagsAsString = function generateTagsAsString(type, tags) {
    return tags.reduce(function (str, tag) {
        var attributeHtml = Object.keys(tag).filter(function (attribute) {
            return !(attribute === "innerHTML" || attribute === "cssText");
        }).reduce(function (string, attribute) {
            var attr = typeof tag[attribute] === "undefined" ? attribute : attribute + "=\"" + encodeSpecialCharacters(tag[attribute]) + "\"";
            return string ? string + " " + attr : attr;
        }, "");

        var tagContent = tag.innerHTML || tag.cssText || "";

        var isSelfClosing = [_HelmetConstants.TAG_NAMES.NOSCRIPT, _HelmetConstants.TAG_NAMES.SCRIPT, _HelmetConstants.TAG_NAMES.STYLE].indexOf(type) === -1;

        return str + "<" + type + " " + HELMET_ATTRIBUTE + " " + attributeHtml + (isSelfClosing ? ">" : ">" + tagContent + "</" + type + ">");
    }, "");
};

var generateTitleAsPreactComponent = function generateTitleAsPreactComponent(type, title, attributes) {
    // assigning into an array to define toString function on it
    var initProps = _defineProperty({
        key: title
    }, HELMET_ATTRIBUTE, true);
    var props = Object.keys(attributes).reduce(function (obj, key) {
        obj[key] = attributes[key];
        return obj;
    }, initProps);

    return [(0, _preact.h)(_HelmetConstants.TAG_NAMES.TITLE, props, title)];
};

var generateTagsAsPreactComponent = function generateTagsAsPreactComponent(type, tags) {
    return tags.map(function (tag, i) {
        var mappedTag = _defineProperty({
            key: i
        }, HELMET_ATTRIBUTE, true);

        Object.keys(tag).forEach(function (attribute) {
            var mappedAttribute = attribute;

            if (mappedAttribute === "innerHTML" || mappedAttribute === "cssText") {
                var content = tag.innerHTML || tag.cssText;
                mappedTag.dangerouslySetInnerHTML = { __html: content };
            } else {
                mappedTag[mappedAttribute] = tag[attribute];
            }
        });

        return (0, _preact.h)(type, mappedTag);
    });
};

var getMethodsForTag = function getMethodsForTag(type, tags) {
    switch (type) {
        case _HelmetConstants.TAG_NAMES.TITLE:
            return {
                toComponent: function toComponent() {
                    return generateTitleAsPreactComponent(type, tags.title, tags.titleAttributes);
                },
                toString: function toString() {
                    return generateTitleAsString(type, tags.title, tags.titleAttributes);
                }
            };
        case _HelmetConstants.TAG_NAMES.HTML:
            return {
                toComponent: function toComponent() {
                    return tags;
                },
                toString: function toString() {
                    return generateHtmlAttributesAsString(tags);
                }
            };
        default:
            return {
                toComponent: function toComponent() {
                    return generateTagsAsPreactComponent(type, tags);
                },
                toString: function toString() {
                    return generateTagsAsString(type, tags);
                }
            };
    }
};

var mapStateOnServer = function mapStateOnServer(_ref) {
    var htmlAttributes = _ref.htmlAttributes,
        title = _ref.title,
        titleAttributes = _ref.titleAttributes,
        baseTag = _ref.baseTag,
        metaTags = _ref.metaTags,
        linkTags = _ref.linkTags,
        scriptTags = _ref.scriptTags,
        noscriptTags = _ref.noscriptTags,
        styleTags = _ref.styleTags;
    return {
        htmlAttributes: getMethodsForTag(_HelmetConstants.TAG_NAMES.HTML, htmlAttributes),
        title: getMethodsForTag(_HelmetConstants.TAG_NAMES.TITLE, { title: title, titleAttributes: titleAttributes }),
        base: getMethodsForTag(_HelmetConstants.TAG_NAMES.BASE, baseTag),
        meta: getMethodsForTag(_HelmetConstants.TAG_NAMES.META, metaTags),
        link: getMethodsForTag(_HelmetConstants.TAG_NAMES.LINK, linkTags),
        script: getMethodsForTag(_HelmetConstants.TAG_NAMES.SCRIPT, scriptTags),
        noscript: getMethodsForTag(_HelmetConstants.TAG_NAMES.NOSCRIPT, noscriptTags),
        style: getMethodsForTag(_HelmetConstants.TAG_NAMES.STYLE, styleTags)
    };
};

/**
 * @param {Object} htmlAttributes: {"lang": "en", "amp": undefined}
 * @param {String} title: "Title"
 * @param {String} defaultTitle: "Default Title"
 * @param {String} titleTemplate: "MySite.com - %s"
 * @param {Object} titleAttributes: {"itemprop": "name"}
 * @param {Object} base: {"target": "_blank", "href": "http://mysite.com/"}
 * @param {Array} meta: [{"name": "description", "content": "Test description"}]
 * @param {Array} link: [{"rel": "canonical", "href": "http://mysite.com/example"}]
 * @param {Array} script: [{"type": "text/javascript", "src": "http://mysite.com/js/test.js"}]
 * @param {Array} noscript: [{"innerHTML": "<img src='http://mysite.com/js/test.js'"}]
 * @param {Array} style: [{"type": "text/css", "cssText": "div{ display: block; color: blue; }"}]
 * @param {Function} onChangeClientState: "(newState) => console.log(newState)"
 */
var Helmet = function Helmet(WrappedComponent) {
    var _class, _temp;

    return _temp = _class = function (_Component) {
        _inherits(HelmetWrapper, _Component);

        function HelmetWrapper() {
            _classCallCheck(this, HelmetWrapper);

            return _possibleConstructorReturn(this, (HelmetWrapper.__proto__ || Object.getPrototypeOf(HelmetWrapper)).apply(this, arguments));
        }

        _createClass(HelmetWrapper, [{
            key: "shouldComponentUpdate",
            value: function shouldComponentUpdate(nextProps) {
                var props = _extends({}, nextProps);
                if (!props.children || !props.children.length) {
                    delete props.children;
                }
                return !(0, _deepEqual2.default)(this.props, props);
            }
        }, {
            key: "render",
            value: function render() {
                return (0, _preact.h)(WrappedComponent, this.props);
            }
        }], [{
            key: "canUseDOM",

            // WrappedComponent.peek comes from react-side-effect:
            // For testing, you may use a static peek() method available on the returned component.
            // It lets you get the current state without resetting the mounted instance stack.
            // Don’t use it for anything other than testing.
            set: function set(canUseDOM) {
                WrappedComponent.canUseDOM = canUseDOM;
            }
        }]);

        return HelmetWrapper;
    }(_preact.Component), _class.peek = WrappedComponent.peek, _class.rewind = function () {
        var mappedState = WrappedComponent.rewind();
        if (!mappedState) {
            // provide fallback if mappedState is undefined
            mappedState = mapStateOnServer({
                htmlAttributes: {},
                title: "",
                titleAttributes: {},
                baseTag: [],
                metaTags: [],
                linkTags: [],
                scriptTags: [],
                noscriptTags: [],
                styleTags: []
            });
        }

        return mappedState;
    }, _temp;
};

var reducePropsToState = function reducePropsToState(propsList) {
    return {
        htmlAttributes: getAttributesFromPropsList(_HelmetConstants.TAG_NAMES.HTML, propsList),
        title: getTitleFromPropsList(propsList),
        titleAttributes: getAttributesFromPropsList("titleAttributes", propsList),
        baseTag: getBaseTagFromPropsList([_HelmetConstants.TAG_PROPERTIES.HREF], propsList),
        metaTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.META, [_HelmetConstants.TAG_PROPERTIES.NAME, _HelmetConstants.TAG_PROPERTIES.CHARSET, _HelmetConstants.TAG_PROPERTIES.HTTPEQUIV, _HelmetConstants.TAG_PROPERTIES.PROPERTY, _HelmetConstants.TAG_PROPERTIES.ITEM_PROP], propsList),
        linkTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.LINK, [_HelmetConstants.TAG_PROPERTIES.REL, _HelmetConstants.TAG_PROPERTIES.HREF], propsList),
        scriptTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.SCRIPT, [_HelmetConstants.TAG_PROPERTIES.SRC, _HelmetConstants.TAG_PROPERTIES.INNER_HTML], propsList),
        noscriptTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.NOSCRIPT, [_HelmetConstants.TAG_PROPERTIES.INNER_HTML], propsList),
        styleTags: getTagsFromPropsList(_HelmetConstants.TAG_NAMES.STYLE, [_HelmetConstants.TAG_PROPERTIES.CSS_TEXT], propsList),
        onChangeClientState: getOnChangeClientState(propsList)
    };
};

var handleClientStateChange = function handleClientStateChange(newState) {
    var htmlAttributes = newState.htmlAttributes,
        title = newState.title,
        titleAttributes = newState.titleAttributes,
        baseTag = newState.baseTag,
        metaTags = newState.metaTags,
        linkTags = newState.linkTags,
        scriptTags = newState.scriptTags,
        noscriptTags = newState.noscriptTags,
        styleTags = newState.styleTags,
        onChangeClientState = newState.onChangeClientState;

    updateAttributes("html", htmlAttributes);

    updateTitle(title, titleAttributes);

    var tagUpdates = {
        baseTag: updateTags(_HelmetConstants.TAG_NAMES.BASE, baseTag),
        metaTags: updateTags(_HelmetConstants.TAG_NAMES.META, metaTags),
        linkTags: updateTags(_HelmetConstants.TAG_NAMES.LINK, linkTags),
        scriptTags: updateTags(_HelmetConstants.TAG_NAMES.SCRIPT, scriptTags),
        noscriptTags: updateTags(_HelmetConstants.TAG_NAMES.NOSCRIPT, noscriptTags),
        styleTags: updateTags(_HelmetConstants.TAG_NAMES.STYLE, styleTags)
    };

    var addedTags = {};
    var removedTags = {};

    Object.keys(tagUpdates).forEach(function (tagType) {
        var _tagUpdates$tagType = tagUpdates[tagType],
            newTags = _tagUpdates$tagType.newTags,
            oldTags = _tagUpdates$tagType.oldTags;

        if (newTags.length) {
            addedTags[tagType] = newTags;
        }
        if (oldTags.length) {
            removedTags[tagType] = tagUpdates[tagType].oldTags;
        }
    });

    onChangeClientState(newState, addedTags, removedTags);
};

var NullComponent = function NullComponent() {
    return null;
};

var HelmetSideEffects = (0, _preactSideEffect2.default)(reducePropsToState, handleClientStateChange, mapStateOnServer)(NullComponent);

exports.default = Helmet(HelmetSideEffects);
module.exports = exports["default"];

/***/ }),

/***/ "FryP":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/* Web Font Loader v1.6.28 - (c) Adobe Systems, Google. License: Apache 2.0 */(function () {
  function aa(a, b, c) {
    return a.call.apply(a.bind, arguments);
  }function ba(a, b, c) {
    if (!a) throw Error();if (2 < arguments.length) {
      var d = Array.prototype.slice.call(arguments, 2);return function () {
        var c = Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c, d);return a.apply(b, c);
      };
    }return function () {
      return a.apply(b, arguments);
    };
  }function p(a, b, c) {
    p = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? aa : ba;return p.apply(null, arguments);
  }var q = Date.now || function () {
    return +new Date();
  };function ca(a, b) {
    this.a = a;this.o = b || a;this.c = this.o.document;
  }var da = !!window.FontFace;function t(a, b, c, d) {
    b = a.c.createElement(b);if (c) for (var e in c) {
      c.hasOwnProperty(e) && ("style" == e ? b.style.cssText = c[e] : b.setAttribute(e, c[e]));
    }d && b.appendChild(a.c.createTextNode(d));return b;
  }function u(a, b, c) {
    a = a.c.getElementsByTagName(b)[0];a || (a = document.documentElement);a.insertBefore(c, a.lastChild);
  }function v(a) {
    a.parentNode && a.parentNode.removeChild(a);
  }
  function w(a, b, c) {
    b = b || [];c = c || [];for (var d = a.className.split(/\s+/), e = 0; e < b.length; e += 1) {
      for (var f = !1, g = 0; g < d.length; g += 1) {
        if (b[e] === d[g]) {
          f = !0;break;
        }
      }f || d.push(b[e]);
    }b = [];for (e = 0; e < d.length; e += 1) {
      f = !1;for (g = 0; g < c.length; g += 1) {
        if (d[e] === c[g]) {
          f = !0;break;
        }
      }f || b.push(d[e]);
    }a.className = b.join(" ").replace(/\s+/g, " ").replace(/^\s+|\s+$/, "");
  }function y(a, b) {
    for (var c = a.className.split(/\s+/), d = 0, e = c.length; d < e; d++) {
      if (c[d] == b) return !0;
    }return !1;
  }
  function ea(a) {
    return a.o.location.hostname || a.a.location.hostname;
  }function z(a, b, c) {
    function d() {
      m && e && f && (m(g), m = null);
    }b = t(a, "link", { rel: "stylesheet", href: b, media: "all" });var e = !1,
        f = !0,
        g = null,
        m = c || null;da ? (b.onload = function () {
      e = !0;d();
    }, b.onerror = function () {
      e = !0;g = Error("Stylesheet failed to load");d();
    }) : setTimeout(function () {
      e = !0;d();
    }, 0);u(a, "head", b);
  }
  function A(a, b, c, d) {
    var e = a.c.getElementsByTagName("head")[0];if (e) {
      var f = t(a, "script", { src: b }),
          g = !1;f.onload = f.onreadystatechange = function () {
        g || this.readyState && "loaded" != this.readyState && "complete" != this.readyState || (g = !0, c && c(null), f.onload = f.onreadystatechange = null, "HEAD" == f.parentNode.tagName && e.removeChild(f));
      };e.appendChild(f);setTimeout(function () {
        g || (g = !0, c && c(Error("Script load timeout")));
      }, d || 5E3);return f;
    }return null;
  };function B() {
    this.a = 0;this.c = null;
  }function C(a) {
    a.a++;return function () {
      a.a--;D(a);
    };
  }function E(a, b) {
    a.c = b;D(a);
  }function D(a) {
    0 == a.a && a.c && (a.c(), a.c = null);
  };function F(a) {
    this.a = a || "-";
  }F.prototype.c = function (a) {
    for (var b = [], c = 0; c < arguments.length; c++) {
      b.push(arguments[c].replace(/[\W_]+/g, "").toLowerCase());
    }return b.join(this.a);
  };function G(a, b) {
    this.c = a;this.f = 4;this.a = "n";var c = (b || "n4").match(/^([nio])([1-9])$/i);c && (this.a = c[1], this.f = parseInt(c[2], 10));
  }function fa(a) {
    return H(a) + " " + (a.f + "00") + " 300px " + I(a.c);
  }function I(a) {
    var b = [];a = a.split(/,\s*/);for (var c = 0; c < a.length; c++) {
      var d = a[c].replace(/['"]/g, "");-1 != d.indexOf(" ") || /^\d/.test(d) ? b.push("'" + d + "'") : b.push(d);
    }return b.join(",");
  }function J(a) {
    return a.a + a.f;
  }function H(a) {
    var b = "normal";"o" === a.a ? b = "oblique" : "i" === a.a && (b = "italic");return b;
  }
  function ga(a) {
    var b = 4,
        c = "n",
        d = null;a && ((d = a.match(/(normal|oblique|italic)/i)) && d[1] && (c = d[1].substr(0, 1).toLowerCase()), (d = a.match(/([1-9]00|normal|bold)/i)) && d[1] && (/bold/i.test(d[1]) ? b = 7 : /[1-9]00/.test(d[1]) && (b = parseInt(d[1].substr(0, 1), 10))));return c + b;
  };function ha(a, b) {
    this.c = a;this.f = a.o.document.documentElement;this.h = b;this.a = new F("-");this.j = !1 !== b.events;this.g = !1 !== b.classes;
  }function ia(a) {
    a.g && w(a.f, [a.a.c("wf", "loading")]);K(a, "loading");
  }function L(a) {
    if (a.g) {
      var b = y(a.f, a.a.c("wf", "active")),
          c = [],
          d = [a.a.c("wf", "loading")];b || c.push(a.a.c("wf", "inactive"));w(a.f, c, d);
    }K(a, "inactive");
  }function K(a, b, c) {
    if (a.j && a.h[b]) if (c) a.h[b](c.c, J(c));else a.h[b]();
  };function ja() {
    this.c = {};
  }function ka(a, b, c) {
    var d = [],
        e;for (e in b) {
      if (b.hasOwnProperty(e)) {
        var f = a.c[e];f && d.push(f(b[e], c));
      }
    }return d;
  };function M(a, b) {
    this.c = a;this.f = b;this.a = t(this.c, "span", { "aria-hidden": "true" }, this.f);
  }function N(a) {
    u(a.c, "body", a.a);
  }function O(a) {
    return "display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:" + I(a.c) + ";" + ("font-style:" + H(a) + ";font-weight:" + (a.f + "00") + ";");
  };function P(a, b, c, d, e, f) {
    this.g = a;this.j = b;this.a = d;this.c = c;this.f = e || 3E3;this.h = f || void 0;
  }P.prototype.start = function () {
    var a = this.c.o.document,
        b = this,
        c = q(),
        d = new Promise(function (d, e) {
      function f() {
        q() - c >= b.f ? e() : a.fonts.load(fa(b.a), b.h).then(function (a) {
          1 <= a.length ? d() : setTimeout(f, 25);
        }, function () {
          e();
        });
      }f();
    }),
        e = null,
        f = new Promise(function (a, d) {
      e = setTimeout(d, b.f);
    });Promise.race([f, d]).then(function () {
      e && (clearTimeout(e), e = null);b.g(b.a);
    }, function () {
      b.j(b.a);
    });
  };function Q(a, b, c, d, e, f, g) {
    this.v = a;this.B = b;this.c = c;this.a = d;this.s = g || "BESbswy";this.f = {};this.w = e || 3E3;this.u = f || null;this.m = this.j = this.h = this.g = null;this.g = new M(this.c, this.s);this.h = new M(this.c, this.s);this.j = new M(this.c, this.s);this.m = new M(this.c, this.s);a = new G(this.a.c + ",serif", J(this.a));a = O(a);this.g.a.style.cssText = a;a = new G(this.a.c + ",sans-serif", J(this.a));a = O(a);this.h.a.style.cssText = a;a = new G("serif", J(this.a));a = O(a);this.j.a.style.cssText = a;a = new G("sans-serif", J(this.a));a = O(a);this.m.a.style.cssText = a;N(this.g);N(this.h);N(this.j);N(this.m);
  }var R = { D: "serif", C: "sans-serif" },
      S = null;function T() {
    if (null === S) {
      var a = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);S = !!a && (536 > parseInt(a[1], 10) || 536 === parseInt(a[1], 10) && 11 >= parseInt(a[2], 10));
    }return S;
  }Q.prototype.start = function () {
    this.f.serif = this.j.a.offsetWidth;this.f["sans-serif"] = this.m.a.offsetWidth;this.A = q();U(this);
  };
  function la(a, b, c) {
    for (var d in R) {
      if (R.hasOwnProperty(d) && b === a.f[R[d]] && c === a.f[R[d]]) return !0;
    }return !1;
  }function U(a) {
    var b = a.g.a.offsetWidth,
        c = a.h.a.offsetWidth,
        d;(d = b === a.f.serif && c === a.f["sans-serif"]) || (d = T() && la(a, b, c));d ? q() - a.A >= a.w ? T() && la(a, b, c) && (null === a.u || a.u.hasOwnProperty(a.a.c)) ? V(a, a.v) : V(a, a.B) : ma(a) : V(a, a.v);
  }function ma(a) {
    setTimeout(p(function () {
      U(this);
    }, a), 50);
  }function V(a, b) {
    setTimeout(p(function () {
      v(this.g.a);v(this.h.a);v(this.j.a);v(this.m.a);b(this.a);
    }, a), 0);
  };function W(a, b, c) {
    this.c = a;this.a = b;this.f = 0;this.m = this.j = !1;this.s = c;
  }var X = null;W.prototype.g = function (a) {
    var b = this.a;b.g && w(b.f, [b.a.c("wf", a.c, J(a).toString(), "active")], [b.a.c("wf", a.c, J(a).toString(), "loading"), b.a.c("wf", a.c, J(a).toString(), "inactive")]);K(b, "fontactive", a);this.m = !0;na(this);
  };
  W.prototype.h = function (a) {
    var b = this.a;if (b.g) {
      var c = y(b.f, b.a.c("wf", a.c, J(a).toString(), "active")),
          d = [],
          e = [b.a.c("wf", a.c, J(a).toString(), "loading")];c || d.push(b.a.c("wf", a.c, J(a).toString(), "inactive"));w(b.f, d, e);
    }K(b, "fontinactive", a);na(this);
  };function na(a) {
    0 == --a.f && a.j && (a.m ? (a = a.a, a.g && w(a.f, [a.a.c("wf", "active")], [a.a.c("wf", "loading"), a.a.c("wf", "inactive")]), K(a, "active")) : L(a.a));
  };function oa(a) {
    this.j = a;this.a = new ja();this.h = 0;this.f = this.g = !0;
  }oa.prototype.load = function (a) {
    this.c = new ca(this.j, a.context || this.j);this.g = !1 !== a.events;this.f = !1 !== a.classes;pa(this, new ha(this.c, a), a);
  };
  function qa(a, b, c, d, e) {
    var f = 0 == --a.h;(a.f || a.g) && setTimeout(function () {
      var a = e || null,
          m = d || null || {};if (0 === c.length && f) L(b.a);else {
        b.f += c.length;f && (b.j = f);var h,
            l = [];for (h = 0; h < c.length; h++) {
          var k = c[h],
              n = m[k.c],
              r = b.a,
              x = k;r.g && w(r.f, [r.a.c("wf", x.c, J(x).toString(), "loading")]);K(r, "fontloading", x);r = null;if (null === X) if (window.FontFace) {
            var x = /Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent),
                xa = /OS X.*Version\/10\..*Safari/.exec(window.navigator.userAgent) && /Apple/.exec(window.navigator.vendor);
            X = x ? 42 < parseInt(x[1], 10) : xa ? !1 : !0;
          } else X = !1;X ? r = new P(p(b.g, b), p(b.h, b), b.c, k, b.s, n) : r = new Q(p(b.g, b), p(b.h, b), b.c, k, b.s, a, n);l.push(r);
        }for (h = 0; h < l.length; h++) {
          l[h].start();
        }
      }
    }, 0);
  }function pa(a, b, c) {
    var d = [],
        e = c.timeout;ia(b);var d = ka(a.a, c, a.c),
        f = new W(a.c, b, e);a.h = d.length;b = 0;for (c = d.length; b < c; b++) {
      d[b].load(function (b, d, c) {
        qa(a, f, b, d, c);
      });
    }
  };function ra(a, b) {
    this.c = a;this.a = b;
  }
  ra.prototype.load = function (a) {
    function b() {
      if (f["__mti_fntLst" + d]) {
        var c = f["__mti_fntLst" + d](),
            e = [],
            h;if (c) for (var l = 0; l < c.length; l++) {
          var k = c[l].fontfamily;void 0 != c[l].fontStyle && void 0 != c[l].fontWeight ? (h = c[l].fontStyle + c[l].fontWeight, e.push(new G(k, h))) : e.push(new G(k));
        }a(e);
      } else setTimeout(function () {
        b();
      }, 50);
    }var c = this,
        d = c.a.projectId,
        e = c.a.version;if (d) {
      var f = c.c.o;A(this.c, (c.a.api || "https://fast.fonts.net/jsapi") + "/" + d + ".js" + (e ? "?v=" + e : ""), function (e) {
        e ? a([]) : (f["__MonotypeConfiguration__" + d] = function () {
          return c.a;
        }, b());
      }).id = "__MonotypeAPIScript__" + d;
    } else a([]);
  };function sa(a, b) {
    this.c = a;this.a = b;
  }sa.prototype.load = function (a) {
    var b,
        c,
        d = this.a.urls || [],
        e = this.a.families || [],
        f = this.a.testStrings || {},
        g = new B();b = 0;for (c = d.length; b < c; b++) {
      z(this.c, d[b], C(g));
    }var m = [];b = 0;for (c = e.length; b < c; b++) {
      if (d = e[b].split(":"), d[1]) for (var h = d[1].split(","), l = 0; l < h.length; l += 1) {
        m.push(new G(d[0], h[l]));
      } else m.push(new G(d[0]));
    }E(g, function () {
      a(m, f);
    });
  };function ta(a, b) {
    a ? this.c = a : this.c = ua;this.a = [];this.f = [];this.g = b || "";
  }var ua = "https://fonts.googleapis.com/css";function va(a, b) {
    for (var c = b.length, d = 0; d < c; d++) {
      var e = b[d].split(":");3 == e.length && a.f.push(e.pop());var f = "";2 == e.length && "" != e[1] && (f = ":");a.a.push(e.join(f));
    }
  }
  function wa(a) {
    if (0 == a.a.length) throw Error("No fonts to load!");if (-1 != a.c.indexOf("kit=")) return a.c;for (var b = a.a.length, c = [], d = 0; d < b; d++) {
      c.push(a.a[d].replace(/ /g, "+"));
    }b = a.c + "?family=" + c.join("%7C");0 < a.f.length && (b += "&subset=" + a.f.join(","));0 < a.g.length && (b += "&text=" + encodeURIComponent(a.g));return b;
  };function ya(a) {
    this.f = a;this.a = [];this.c = {};
  }
  var za = { latin: "BESbswy", "latin-ext": "\xE7\xF6\xFC\u011F\u015F", cyrillic: "\u0439\u044F\u0416", greek: "\u03B1\u03B2\u03A3", khmer: "\u1780\u1781\u1782", Hanuman: "\u1780\u1781\u1782" },
      Aa = { thin: "1", extralight: "2", "extra-light": "2", ultralight: "2", "ultra-light": "2", light: "3", regular: "4", book: "4", medium: "5", "semi-bold": "6", semibold: "6", "demi-bold": "6", demibold: "6", bold: "7", "extra-bold": "8", extrabold: "8", "ultra-bold": "8", ultrabold: "8", black: "9", heavy: "9", l: "3", r: "4", b: "7" },
      Ba = { i: "i", italic: "i", n: "n", normal: "n" },
      Ca = /^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;
  function Da(a) {
    for (var b = a.f.length, c = 0; c < b; c++) {
      var d = a.f[c].split(":"),
          e = d[0].replace(/\+/g, " "),
          f = ["n4"];if (2 <= d.length) {
        var g;var m = d[1];g = [];if (m) for (var m = m.split(","), h = m.length, l = 0; l < h; l++) {
          var k;k = m[l];if (k.match(/^[\w-]+$/)) {
            var n = Ca.exec(k.toLowerCase());if (null == n) k = "";else {
              k = n[2];k = null == k || "" == k ? "n" : Ba[k];n = n[1];if (null == n || "" == n) n = "4";else var r = Aa[n],
                  n = r ? r : isNaN(n) ? "4" : n.substr(0, 1);k = [k, n].join("");
            }
          } else k = "";k && g.push(k);
        }0 < g.length && (f = g);3 == d.length && (d = d[2], g = [], d = d ? d.split(",") : g, 0 < d.length && (d = za[d[0]]) && (a.c[e] = d));
      }a.c[e] || (d = za[e]) && (a.c[e] = d);for (d = 0; d < f.length; d += 1) {
        a.a.push(new G(e, f[d]));
      }
    }
  };function Ea(a, b) {
    this.c = a;this.a = b;
  }var Fa = { Arimo: !0, Cousine: !0, Tinos: !0 };Ea.prototype.load = function (a) {
    var b = new B(),
        c = this.c,
        d = new ta(this.a.api, this.a.text),
        e = this.a.families;va(d, e);var f = new ya(e);Da(f);z(c, wa(d), C(b));E(b, function () {
      a(f.a, f.c, Fa);
    });
  };function Ga(a, b) {
    this.c = a;this.a = b;
  }Ga.prototype.load = function (a) {
    var b = this.a.id,
        c = this.c.o;b ? A(this.c, (this.a.api || "https://use.typekit.net") + "/" + b + ".js", function (b) {
      if (b) a([]);else if (c.Typekit && c.Typekit.config && c.Typekit.config.fn) {
        b = c.Typekit.config.fn;for (var e = [], f = 0; f < b.length; f += 2) {
          for (var g = b[f], m = b[f + 1], h = 0; h < m.length; h++) {
            e.push(new G(g, m[h]));
          }
        }try {
          c.Typekit.load({ events: !1, classes: !1, async: !0 });
        } catch (l) {}a(e);
      }
    }, 2E3) : a([]);
  };function Ha(a, b) {
    this.c = a;this.f = b;this.a = [];
  }Ha.prototype.load = function (a) {
    var b = this.f.id,
        c = this.c.o,
        d = this;b ? (c.__webfontfontdeckmodule__ || (c.__webfontfontdeckmodule__ = {}), c.__webfontfontdeckmodule__[b] = function (b, c) {
      for (var g = 0, m = c.fonts.length; g < m; ++g) {
        var h = c.fonts[g];d.a.push(new G(h.name, ga("font-weight:" + h.weight + ";font-style:" + h.style)));
      }a(d.a);
    }, A(this.c, (this.f.api || "https://f.fontdeck.com/s/css/js/") + ea(this.c) + "/" + b + ".js", function (b) {
      b && a([]);
    })) : a([]);
  };var Y = new oa(window);Y.a.c.custom = function (a, b) {
    return new sa(b, a);
  };Y.a.c.fontdeck = function (a, b) {
    return new Ha(b, a);
  };Y.a.c.monotype = function (a, b) {
    return new ra(b, a);
  };Y.a.c.typekit = function (a, b) {
    return new Ga(b, a);
  };Y.a.c.google = function (a, b) {
    return new Ea(b, a);
  };var Z = { load: p(Y.load, Y) }; true ? !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
    return Z;
  }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : "undefined" !== typeof module && module.exports ? module.exports = Z : (window.WebFont = Z, window.WebFontConfig && Y.load(window.WebFontConfig));
})();

/***/ }),

/***/ "J4Nk":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc'); // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(_extends({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

/***/ }),

/***/ "J4fV":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "JkW7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// EXTERNAL MODULE: ./style/index.css
var style_0 = __webpack_require__("rq4c");
var style_default = /*#__PURE__*/__webpack_require__.n(style_0);

// EXTERNAL MODULE: ../node_modules/preact/dist/preact.min.js
var preact_min = __webpack_require__("KM04");
var preact_min_default = /*#__PURE__*/__webpack_require__.n(preact_min);

// EXTERNAL MODULE: ../node_modules/preact-router/dist/preact-router.es.js
var preact_router_es = __webpack_require__("/QC5");

// EXTERNAL MODULE: ../node_modules/preact-helmet/lib/Helmet.js
var Helmet = __webpack_require__("FJnM");
var Helmet_default = /*#__PURE__*/__webpack_require__.n(Helmet);

// EXTERNAL MODULE: ../node_modules/preact-router/match.js
var match = __webpack_require__("sw5u");
var match_default = /*#__PURE__*/__webpack_require__.n(match);

// EXTERNAL MODULE: ./components/header/style.css
var header_style = __webpack_require__("u3et");
var header_style_default = /*#__PURE__*/__webpack_require__.n(header_style);

// CONCATENATED MODULE: ./components/header/index.js


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var _ref = Object(preact_min["h"])(
  "h1",
  null,
  "Daniel Smith"
);

var header_Header = function (_Component) {
  _inherits(Header, _Component);

  function Header() {
    _classCallCheck(this, Header);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Header.prototype.render = function render() {
    return Object(preact_min["h"])(
      "header",
      { "class": header_style_default.a.header },
      _ref
    );
  };

  return Header;
}(preact_min["Component"]);


// EXTERNAL MODULE: ./routes/home/style.css
var home_style = __webpack_require__("ZAL5");
var home_style_default = /*#__PURE__*/__webpack_require__.n(home_style);

// EXTERNAL MODULE: ./Containers/CardsContainer/style.css
var CardsContainer_style = __webpack_require__("J4fV");
var CardsContainer_style_default = /*#__PURE__*/__webpack_require__.n(CardsContainer_style);

// EXTERNAL MODULE: ./Containers/CardsContainer/cards.json
var cards = __webpack_require__("w03J");
var cards_default = /*#__PURE__*/__webpack_require__.n(cards);

// EXTERNAL MODULE: ./Containers/CardsContainer/projects.json
var projects = __webpack_require__("KIIH");
var projects_default = /*#__PURE__*/__webpack_require__.n(projects);

// EXTERNAL MODULE: ./Components/Card/style.css
var Card_style = __webpack_require__("NAku");
var Card_style_default = /*#__PURE__*/__webpack_require__.n(Card_style);

// CONCATENATED MODULE: ./Components/Card/index.js


function Card__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Card__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function Card__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var Card_Card = function (_Component) {
  Card__inherits(Card, _Component);

  function Card() {
    Card__classCallCheck(this, Card);

    return Card__possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Card.prototype.render = function render() {
    var style = {};
    if (this.props.colors) {
      style = {
        backgroundImage: "linear-gradient(150deg, " + (this.props.colors.backgroundStart + " 0%, ") + (this.props.colors.backgroundEnd + " 100%)"),
        color: this.props.colors.textColor
      };
    }

    return Object(preact_min["h"])(
      "div",
      { className: "card", style: style },
      Object(preact_min["h"])(
        "h1",
        { className: "title" },
        this.props.title
      ),
      Object(preact_min["h"])(
        "div",
        null,
        Object(preact_min["h"])(
          "div",
          null,
          this.props.children
        )
      )
    );
  };

  return Card;
}(preact_min["Component"]);


// EXTERNAL MODULE: ./Components/Project/style.css
var Project_style = __webpack_require__("zuNQ");
var Project_style_default = /*#__PURE__*/__webpack_require__.n(Project_style);

// CONCATENATED MODULE: ./Components/Project/index.js


function Project__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Project__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function Project__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var Project_Project = function (_Component) {
  Project__inherits(Project, _Component);

  function Project() {
    Project__classCallCheck(this, Project);

    return Project__possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Project.prototype.render = function render() {
    return Object(preact_min["h"])(
      "div",
      { className: "project" },
      Object(preact_min["h"])(
        "h2",
        null,
        this.props.projectData.title
      ),
      Object(preact_min["h"])(
        "p",
        null,
        this.props.projectData.description
      ),
      Object(preact_min["h"])(
        "p",
        null,
        Object(preact_min["h"])(
          "a",
          { href: this.props.projectData.url, target: "_blank" },
          "Website"
        )
      ),
      Object(preact_min["h"])(
        "p",
        null,
        Object(preact_min["h"])(
          "a",
          { href: this.props.projectData.repository, target: "_blank" },
          "Repository"
        )
      )
    );
  };

  return Project;
}(preact_min["Component"]);


// EXTERNAL MODULE: ./Containers/LinksContainer/style.css
var LinksContainer_style = __webpack_require__("hMec");
var LinksContainer_style_default = /*#__PURE__*/__webpack_require__.n(LinksContainer_style);

// EXTERNAL MODULE: ./Containers/LinksContainer/links.json
var links = __webpack_require__("bmMN");
var links_default = /*#__PURE__*/__webpack_require__.n(links);

// EXTERNAL MODULE: ./Components/SocialLink/style.css
var SocialLink_style = __webpack_require__("adLa");
var SocialLink_style_default = /*#__PURE__*/__webpack_require__.n(SocialLink_style);

// CONCATENATED MODULE: ./Components/SocialLink/index.js


function SocialLink__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function SocialLink__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function SocialLink__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var SocialLink_SocialLink = function (_Component) {
  SocialLink__inherits(SocialLink, _Component);

  function SocialLink() {
    SocialLink__classCallCheck(this, SocialLink);

    return SocialLink__possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  SocialLink.prototype.render = function render() {
    return Object(preact_min["h"])(
      "span",
      { className: "socialLink" },
      Object(preact_min["h"])(
        "a",
        { href: this.props.url, target: "_blank" },
        this.props.title
      )
    );
  };

  return SocialLink;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./Containers/LinksContainer/index.js


function LinksContainer__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function LinksContainer__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function LinksContainer__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }








var LinksContainer_LinksContainer = function (_Component) {
  LinksContainer__inherits(LinksContainer, _Component);

  function LinksContainer() {
    LinksContainer__classCallCheck(this, LinksContainer);

    return LinksContainer__possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  LinksContainer.prototype.render = function render() {
    return Object(preact_min["h"])(
      "div",
      { className: "linksContainer" },
      links_default.a.map(function (l) {
        return Object(preact_min["h"])(SocialLink_SocialLink, { url: l.url, title: l.title });
      })
    );
  };

  return LinksContainer;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./Containers/CardsContainer/index.js


function CardsContainer__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function CardsContainer__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function CardsContainer__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }












var colorsBright = {

  backgroundStart: "#519AF7",
  backgroundEnd: "#519AF7",
  textColor: "white"
};

var colorsDark = {
  backgroundStart: "#ffffff",
  backgroundEnd: "#ffffff",
  textColor: "black"
};

var CardsContainer__ref = Object(preact_min["h"])(
  "h2",
  null,
  "Strong points:"
);

var _ref2 = Object(preact_min["h"])(
  "ul",
  null,
  Object(preact_min["h"])(
    "li",
    null,
    "C++ (particularly with Qt)"
  ),
  Object(preact_min["h"])(
    "li",
    null,
    "Objective-C"
  ),
  Object(preact_min["h"])(
    "li",
    null,
    "ES6+"
  ),
  Object(preact_min["h"])(
    "li",
    null,
    "React"
  )
);

var _ref3 = Object(preact_min["h"])(
  "h2",
  null,
  "Other technologies, stacks, languages:"
);

var _ref4 = Object(preact_min["h"])(
  "ul",
  null,
  Object(preact_min["h"])(
    "li",
    null,
    "Python, Ruby, Java, C#"
  ),
  Object(preact_min["h"])(
    "li",
    null,
    "Docker, various PaaS solutions"
  ),
  Object(preact_min["h"])(
    "li",
    null,
    "MySQL"
  )
);

var _ref5 = Object(preact_min["h"])(
  "h2",
  null,
  "Naval Research Laboratory"
);

var _ref6 = Object(preact_min["h"])(
  "ul",
  null,
  Object(preact_min["h"])(
    "li",
    null,
    "Developing client applications using Qt C++."
  ),
  Object(preact_min["h"])(
    "li",
    null,
    "Implementing Java-based microservices to support said applications."
  ),
  Object(preact_min["h"])(
    "li",
    null,
    "Participating in daily scrum activities including backlog grooming, sprint planning, and daily standups."
  )
);

var _ref7 = Object(preact_min["h"])(
  "h2",
  null,
  "The University of Southern Mississippi"
);

var _ref8 = Object(preact_min["h"])(
  "ul",
  null,
  Object(preact_min["h"])(
    "li",
    null,
    "Designed and developed a content delivery framework for university department apps using Objective-C."
  ),
  Object(preact_min["h"])(
    "li",
    null,
    "Implemented networking libraries for background content updates for mobile apps."
  ),
  Object(preact_min["h"])(
    "li",
    null,
    "Created a content management web app using AngularJS."
  ),
  Object(preact_min["h"])(
    "li",
    null,
    "Helped manage app testing practices using TestFlight."
  ),
  Object(preact_min["h"])(
    "li",
    null,
    "Participated in the delivery of apps to the iTunes App Store."
  )
);

var _ref9 = Object(preact_min["h"])(
  Card_Card,
  { title: "My education", colors: colorsBright },
  Object(preact_min["h"])(
    "h2",
    null,
    "The University of Southern Mississippi (May 2013 - Aug. 2016)"
  ),
  Object(preact_min["h"])(
    "ul",
    null,
    Object(preact_min["h"])(
      "li",
      null,
      Object(preact_min["h"])(
        "strong",
        null,
        "Master of Science"
      ),
      " in Computer Science"
    ),
    Object(preact_min["h"])(
      "li",
      null,
      Object(preact_min["h"])(
        "strong",
        null,
        "Bachelor of Science"
      ),
      " in Computer Science"
    )
  ),
  Object(preact_min["h"])(
    "h2",
    null,
    "Jones County Junior College (Aug. 2011 - May 2013)"
  ),
  Object(preact_min["h"])(
    "ul",
    null,
    Object(preact_min["h"])(
      "li",
      null,
      Object(preact_min["h"])(
        "strong",
        null,
        "Associate of Applied Science"
      ),
      " in Information System Technology"
    )
  )
);

var _ref10 = Object(preact_min["h"])(
  Card_Card,
  { title: "Contact", colors: colorsBright },
  Object(preact_min["h"])(
    "p",
    null,
    "Please contact me by email at daniel@danielsmith.io."
  ),
  Object(preact_min["h"])(
    "p",
    null,
    "Alternatively, you can contact me using any of the platforms listed below."
  )
);

var CardsContainer_CardsContainer = function (_Component) {
  CardsContainer__inherits(CardsContainer, _Component);

  function CardsContainer(props) {
    CardsContainer__classCallCheck(this, CardsContainer);

    return CardsContainer__possibleConstructorReturn(this, _Component.call(this, props));
  }

  CardsContainer.prototype.render = function render() {
    return Object(preact_min["h"])(
      "div",
      { className: "cardsContainer" },
      Object(preact_min["h"])(
        Card_Card,
        {
          title: "Hello!",
          colors: colorsBright
        },
        Object(preact_min["h"])(
          "p",
          null,
          "I'm Daniel, a software engineer with a background in Computer\n            Science. I'm passionate about delivering a good user experience,\n            optimization, and web development. I currently work at the Stennis\n            Space Center for the Naval Research Laboratory. I love learning\n            everything I can about computer science and the various technologies at my disposal, like ES6 and React."
        ),
        CardsContainer__ref,
        _ref2,
        _ref3,
        _ref4
      ),
      Object(preact_min["h"])(
        Card_Card,
        { title: "My work", colors: colorsDark, ref: this.workRef },
        _ref5,
        _ref6,
        _ref7,
        _ref8
      ),
      _ref9,
      Object(preact_min["h"])(
        Card_Card,
        { title: "My projects", colors: colorsDark },
        projects_default.a.map(function (p) {
          return Object(preact_min["h"])(Project_Project, { projectData: p });
        })
      ),
      _ref10
    );
  };

  return CardsContainer;
}(preact_min["Component"]);


// EXTERNAL MODULE: ./Components/HeroImage/style.css
var HeroImage_style = __webpack_require__("B85+");
var HeroImage_style_default = /*#__PURE__*/__webpack_require__.n(HeroImage_style);

// CONCATENATED MODULE: ./Components/HeroImage/index.js


function HeroImage__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function HeroImage__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function HeroImage__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }




var HeroImage__ref = Object(preact_min["h"])(
  "div",
  { className: "hero" },
  "test"
);

var HeroImage = function (_Component) {
  HeroImage__inherits(HeroImage, _Component);

  function HeroImage() {
    HeroImage__classCallCheck(this, HeroImage);

    return HeroImage__possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  HeroImage.prototype.render = function render() {
    return HeroImage__ref;
  };

  return HeroImage;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./routes/home/index.js


function home__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function home__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function home__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }









var home__ref = Object(preact_min["h"])(CardsContainer_CardsContainer, null);

var home__ref2 = Object(preact_min["h"])(LinksContainer_LinksContainer, null);

var home_Home = function (_Component) {
  home__inherits(Home, _Component);

  function Home() {
    home__classCallCheck(this, Home);

    return home__possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Home.prototype.render = function render() {
    return Object(preact_min["h"])(
      "div",
      { "class": home_style_default.a.home },
      Object(preact_min["h"])("div", { "class": home_style_default.a.parallax }),
      Object(preact_min["h"])(
        "div",
        { "class": home_style_default.a.contents },
        home__ref
      ),
      home__ref2
    );
  };

  return Home;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./components/app.js


function app__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function app__possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function app__inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







// import Home from 'async!../routes/home';
// import Profile from 'async!../routes/profile';

if (false) {
	require('preact/debug');
}

var app__ref = Object(preact_min["h"])(header_Header, null);

var app__ref2 = Object(preact_min["h"])(home_Home, { path: '/' });

var app_App = function (_Component) {
	app__inherits(App, _Component);

	function App() {
		var _temp, _this, _ret;

		app__classCallCheck(this, App);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = app__possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.handleRoute = function (e) {
			console.log(e);

			_this.currentUrl = e.url;
		}, _temp), app__possibleConstructorReturn(_this, _ret);
	}

	/** Gets fired when the route changes.
  *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
  *	@param {string} event.url	The newly routed URL
  */


	App.prototype.render = function render() {
		return Object(preact_min["h"])(
			'div',
			{ id: 'app' },
			Object(preact_min["h"])(Helmet_default.a, {
				title: 'Daniel Smith',
				meta: [{ name: 'description', content: 'I\'m Daniel, a software engineer with a background in Computer Science. I\'m passionate about delivering a good user experience, optimization, and web development.' }, { property: 'og:type', content: 'article' }, { name: 'viewport', content: 'width=device-width, initial-scale=1' }, { name: 'keywords', content: 'danielsmith4483, Daniel Smith, software engineer, computer scientist' }]
			}),
			app__ref,
			Object(preact_min["h"])(
				preact_router_es["Router"],
				{ onChange: this.handleRoute },
				app__ref2
			)
		);
	};

	return App;
}(preact_min["Component"]);


// CONCATENATED MODULE: ./index.js



if (typeof window !== 'undefined') {
	var WebFont = __webpack_require__("FryP");

	WebFont.load({
		google: {
			families: ['Raleway', 'Open Sans']
		}
	});
}

/* harmony default export */ var index = __webpack_exports__["default"] = (app_App);

/***/ }),

/***/ "KIIH":
/***/ (function(module, exports) {

module.exports = [{"title":"This website","description":"Built on preact using preact-cli. Optimized for first meaningful paint and time to interactive. Hosted on Github Pages with SSL protection through Cloudflare.","url":"#","docs":"","repository":"https://github.com/danielsmith4483/danielsmith4483.github.io","coverage":"0"},{"title":"Barbell Ninja","description":"Progressive Web App to help optimize barbell plate unracking/reracking in a gym setting.","docs":"","url":"https://barbell.ninja","repository":"https://github.com/danielsmith4483/barbell-ninja","coverage":"0"},{"title":"rep-max","description":"A Node.js module that performs rep max calculations. Written in TypeScript, 100% coverage. Dependency for barbell.ninja.","docs":"","url":"https://www.npmjs.com/package/rep-max","repository":"https://github.com/danielsmith4483/rep-max","coverage":"0"}]

/***/ }),

/***/ "KM04":
/***/ (function(module, exports, __webpack_require__) {

!function () {
  "use strict";
  function e() {}function t(t, n) {
    var o,
        r,
        i,
        l,
        a = E;for (l = arguments.length; l-- > 2;) {
      W.push(arguments[l]);
    }n && null != n.children && (W.length || W.push(n.children), delete n.children);while (W.length) {
      if ((r = W.pop()) && void 0 !== r.pop) for (l = r.length; l--;) {
        W.push(r[l]);
      } else "boolean" == typeof r && (r = null), (i = "function" != typeof t) && (null == r ? r = "" : "number" == typeof r ? r += "" : "string" != typeof r && (i = !1)), i && o ? a[a.length - 1] += r : a === E ? a = [r] : a.push(r), o = i;
    }var u = new e();return u.nodeName = t, u.children = a, u.attributes = null == n ? void 0 : n, u.key = null == n ? void 0 : n.key, void 0 !== S.vnode && S.vnode(u), u;
  }function n(e, t) {
    for (var n in t) {
      e[n] = t[n];
    }return e;
  }function o(e, o) {
    return t(e.nodeName, n(n({}, e.attributes), o), arguments.length > 2 ? [].slice.call(arguments, 2) : e.children);
  }function r(e) {
    !e.__d && (e.__d = !0) && 1 == A.push(e) && (S.debounceRendering || P)(i);
  }function i() {
    var e,
        t = A;A = [];while (e = t.pop()) {
      e.__d && k(e);
    }
  }function l(e, t, n) {
    return "string" == typeof t || "number" == typeof t ? void 0 !== e.splitText : "string" == typeof t.nodeName ? !e._componentConstructor && a(e, t.nodeName) : n || e._componentConstructor === t.nodeName;
  }function a(e, t) {
    return e.__n === t || e.nodeName.toLowerCase() === t.toLowerCase();
  }function u(e) {
    var t = n({}, e.attributes);t.children = e.children;var o = e.nodeName.defaultProps;if (void 0 !== o) for (var r in o) {
      void 0 === t[r] && (t[r] = o[r]);
    }return t;
  }function _(e, t) {
    var n = t ? document.createElementNS("http://www.w3.org/2000/svg", e) : document.createElement(e);return n.__n = e, n;
  }function p(e) {
    var t = e.parentNode;t && t.removeChild(e);
  }function c(e, t, n, o, r) {
    if ("className" === t && (t = "class"), "key" === t) ;else if ("ref" === t) n && n(null), o && o(e);else if ("class" !== t || r) {
      if ("style" === t) {
        if (o && "string" != typeof o && "string" != typeof n || (e.style.cssText = o || ""), o && "object" == typeof o) {
          if ("string" != typeof n) for (var i in n) {
            i in o || (e.style[i] = "");
          }for (var i in o) {
            e.style[i] = "number" == typeof o[i] && !1 === V.test(i) ? o[i] + "px" : o[i];
          }
        }
      } else if ("dangerouslySetInnerHTML" === t) o && (e.innerHTML = o.__html || "");else if ("o" == t[0] && "n" == t[1]) {
        var l = t !== (t = t.replace(/Capture$/, ""));t = t.toLowerCase().substring(2), o ? n || e.addEventListener(t, f, l) : e.removeEventListener(t, f, l), (e.__l || (e.__l = {}))[t] = o;
      } else if ("list" !== t && "type" !== t && !r && t in e) s(e, t, null == o ? "" : o), null != o && !1 !== o || e.removeAttribute(t);else {
        var a = r && t !== (t = t.replace(/^xlink\:?/, ""));null == o || !1 === o ? a ? e.removeAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase()) : e.removeAttribute(t) : "function" != typeof o && (a ? e.setAttributeNS("http://www.w3.org/1999/xlink", t.toLowerCase(), o) : e.setAttribute(t, o));
      }
    } else e.className = o || "";
  }function s(e, t, n) {
    try {
      e[t] = n;
    } catch (e) {}
  }function f(e) {
    return this.__l[e.type](S.event && S.event(e) || e);
  }function d() {
    var e;while (e = D.pop()) {
      S.afterMount && S.afterMount(e), e.componentDidMount && e.componentDidMount();
    }
  }function h(e, t, n, o, r, i) {
    H++ || (R = null != r && void 0 !== r.ownerSVGElement, j = null != e && !("__preactattr_" in e));var l = m(e, t, n, o, i);return r && l.parentNode !== r && r.appendChild(l), --H || (j = !1, i || d()), l;
  }function m(e, t, n, o, r) {
    var i = e,
        l = R;if (null != t && "boolean" != typeof t || (t = ""), "string" == typeof t || "number" == typeof t) return e && void 0 !== e.splitText && e.parentNode && (!e._component || r) ? e.nodeValue != t && (e.nodeValue = t) : (i = document.createTextNode(t), e && (e.parentNode && e.parentNode.replaceChild(i, e), b(e, !0))), i.__preactattr_ = !0, i;var u = t.nodeName;if ("function" == typeof u) return U(e, t, n, o);if (R = "svg" === u || "foreignObject" !== u && R, u += "", (!e || !a(e, u)) && (i = _(u, R), e)) {
      while (e.firstChild) {
        i.appendChild(e.firstChild);
      }e.parentNode && e.parentNode.replaceChild(i, e), b(e, !0);
    }var p = i.firstChild,
        c = i.__preactattr_,
        s = t.children;if (null == c) {
      c = i.__preactattr_ = {};for (var f = i.attributes, d = f.length; d--;) {
        c[f[d].name] = f[d].value;
      }
    }return !j && s && 1 === s.length && "string" == typeof s[0] && null != p && void 0 !== p.splitText && null == p.nextSibling ? p.nodeValue != s[0] && (p.nodeValue = s[0]) : (s && s.length || null != p) && v(i, s, n, o, j || null != c.dangerouslySetInnerHTML), g(i, t.attributes, c), R = l, i;
  }function v(e, t, n, o, r) {
    var i,
        a,
        u,
        _,
        c,
        s = e.childNodes,
        f = [],
        d = {},
        h = 0,
        v = 0,
        y = s.length,
        g = 0,
        w = t ? t.length : 0;if (0 !== y) for (var C = 0; C < y; C++) {
      var x = s[C],
          N = x.__preactattr_,
          k = w && N ? x._component ? x._component.__k : N.key : null;null != k ? (h++, d[k] = x) : (N || (void 0 !== x.splitText ? !r || x.nodeValue.trim() : r)) && (f[g++] = x);
    }if (0 !== w) for (var C = 0; C < w; C++) {
      _ = t[C], c = null;var k = _.key;if (null != k) h && void 0 !== d[k] && (c = d[k], d[k] = void 0, h--);else if (!c && v < g) for (i = v; i < g; i++) {
        if (void 0 !== f[i] && l(a = f[i], _, r)) {
          c = a, f[i] = void 0, i === g - 1 && g--, i === v && v++;break;
        }
      }c = m(c, _, n, o), u = s[C], c && c !== e && c !== u && (null == u ? e.appendChild(c) : c === u.nextSibling ? p(u) : e.insertBefore(c, u));
    }if (h) for (var C in d) {
      void 0 !== d[C] && b(d[C], !1);
    }while (v <= g) {
      void 0 !== (c = f[g--]) && b(c, !1);
    }
  }function b(e, t) {
    var n = e._component;n ? L(n) : (null != e.__preactattr_ && e.__preactattr_.ref && e.__preactattr_.ref(null), !1 !== t && null != e.__preactattr_ || p(e), y(e));
  }function y(e) {
    e = e.lastChild;while (e) {
      var t = e.previousSibling;b(e, !0), e = t;
    }
  }function g(e, t, n) {
    var o;for (o in n) {
      t && null != t[o] || null == n[o] || c(e, o, n[o], n[o] = void 0, R);
    }for (o in t) {
      "children" === o || "innerHTML" === o || o in n && t[o] === ("value" === o || "checked" === o ? e[o] : n[o]) || c(e, o, n[o], n[o] = t[o], R);
    }
  }function w(e) {
    var t = e.constructor.name;(I[t] || (I[t] = [])).push(e);
  }function C(e, t, n) {
    var o,
        r = I[e.name];if (e.prototype && e.prototype.render ? (o = new e(t, n), T.call(o, t, n)) : (o = new T(t, n), o.constructor = e, o.render = x), r) for (var i = r.length; i--;) {
      if (r[i].constructor === e) {
        o.__b = r[i].__b, r.splice(i, 1);break;
      }
    }return o;
  }function x(e, t, n) {
    return this.constructor(e, n);
  }function N(e, t, n, o, i) {
    e.__x || (e.__x = !0, (e.__r = t.ref) && delete t.ref, (e.__k = t.key) && delete t.key, !e.base || i ? e.componentWillMount && e.componentWillMount() : e.componentWillReceiveProps && e.componentWillReceiveProps(t, o), o && o !== e.context && (e.__c || (e.__c = e.context), e.context = o), e.__p || (e.__p = e.props), e.props = t, e.__x = !1, 0 !== n && (1 !== n && !1 === S.syncComponentUpdates && e.base ? r(e) : k(e, 1, i)), e.__r && e.__r(e));
  }function k(e, t, o, r) {
    if (!e.__x) {
      var i,
          l,
          a,
          _ = e.props,
          p = e.state,
          c = e.context,
          s = e.__p || _,
          f = e.__s || p,
          m = e.__c || c,
          v = e.base,
          y = e.__b,
          g = v || y,
          w = e._component,
          x = !1;if (v && (e.props = s, e.state = f, e.context = m, 2 !== t && e.shouldComponentUpdate && !1 === e.shouldComponentUpdate(_, p, c) ? x = !0 : e.componentWillUpdate && e.componentWillUpdate(_, p, c), e.props = _, e.state = p, e.context = c), e.__p = e.__s = e.__c = e.__b = null, e.__d = !1, !x) {
        i = e.render(_, p, c), e.getChildContext && (c = n(n({}, c), e.getChildContext()));var U,
            T,
            M = i && i.nodeName;if ("function" == typeof M) {
          var W = u(i);l = w, l && l.constructor === M && W.key == l.__k ? N(l, W, 1, c, !1) : (U = l, e._component = l = C(M, W, c), l.__b = l.__b || y, l.__u = e, N(l, W, 0, c, !1), k(l, 1, o, !0)), T = l.base;
        } else a = g, U = w, U && (a = e._component = null), (g || 1 === t) && (a && (a._component = null), T = h(a, i, c, o || !v, g && g.parentNode, !0));if (g && T !== g && l !== w) {
          var E = g.parentNode;E && T !== E && (E.replaceChild(T, g), U || (g._component = null, b(g, !1)));
        }if (U && L(U), e.base = T, T && !r) {
          var P = e,
              V = e;while (V = V.__u) {
            (P = V).base = T;
          }T._component = P, T._componentConstructor = P.constructor;
        }
      }if (!v || o ? D.unshift(e) : x || (e.componentDidUpdate && e.componentDidUpdate(s, f, m), S.afterUpdate && S.afterUpdate(e)), null != e.__h) while (e.__h.length) {
        e.__h.pop().call(e);
      }H || r || d();
    }
  }function U(e, t, n, o) {
    var r = e && e._component,
        i = r,
        l = e,
        a = r && e._componentConstructor === t.nodeName,
        _ = a,
        p = u(t);while (r && !_ && (r = r.__u)) {
      _ = r.constructor === t.nodeName;
    }return r && _ && (!o || r._component) ? (N(r, p, 3, n, o), e = r.base) : (i && !a && (L(i), e = l = null), r = C(t.nodeName, p, n), e && !r.__b && (r.__b = e, l = null), N(r, p, 1, n, o), e = r.base, l && e !== l && (l._component = null, b(l, !1))), e;
  }function L(e) {
    S.beforeUnmount && S.beforeUnmount(e);var t = e.base;e.__x = !0, e.componentWillUnmount && e.componentWillUnmount(), e.base = null;var n = e._component;n ? L(n) : t && (t.__preactattr_ && t.__preactattr_.ref && t.__preactattr_.ref(null), e.__b = t, p(t), w(e), y(t)), e.__r && e.__r(null);
  }function T(e, t) {
    this.__d = !0, this.context = t, this.props = e, this.state = this.state || {};
  }function M(e, t, n) {
    return h(n, e, {}, !1, t, !1);
  }var S = {},
      W = [],
      E = [],
      P = "function" == typeof Promise ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout,
      V = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,
      A = [],
      D = [],
      H = 0,
      R = !1,
      j = !1,
      I = {};n(T.prototype, { setState: function setState(e, t) {
      var o = this.state;this.__s || (this.__s = n({}, o)), n(o, "function" == typeof e ? e(o, this.props) : e), t && (this.__h = this.__h || []).push(t), r(this);
    }, forceUpdate: function forceUpdate(e) {
      e && (this.__h = this.__h || []).push(e), k(this, 2);
    }, render: function render() {} });var $ = { h: t, createElement: t, cloneElement: o, Component: T, render: M, rerender: i, options: S }; true ? module.exports = $ : self.preact = $;
}();
//# sourceMappingURL=preact.min.js.map

/***/ }),

/***/ "NAku":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "OWwF":
/***/ (function(module, exports) {

var supportsArgumentsClass = function () {
  return Object.prototype.toString.call(arguments);
}() == '[object Arguments]';

exports = module.exports = supportsArgumentsClass ? supported : unsupported;

exports.supported = supported;
function supported(object) {
  return Object.prototype.toString.call(object) == '[object Arguments]';
};

exports.unsupported = unsupported;
function unsupported(object) {
  return object && typeof object == 'object' && typeof object.length == 'number' && Object.prototype.hasOwnProperty.call(object, 'callee') && !Object.prototype.propertyIsEnumerable.call(object, 'callee') || false;
};

/***/ }),

/***/ "Qxat":
/***/ (function(module, exports) {

exports.__esModule = true;
var TAG_NAMES = exports.TAG_NAMES = {
    HTML: "htmlAttributes",
    TITLE: "title",
    BASE: "base",
    META: "meta",
    LINK: "link",
    SCRIPT: "script",
    NOSCRIPT: "noscript",
    STYLE: "style"
};

var TAG_PROPERTIES = exports.TAG_PROPERTIES = {
    NAME: "name",
    CHARSET: "charset",
    HTTPEQUIV: "http-equiv",
    REL: "rel",
    HREF: "href",
    PROPERTY: "property",
    SRC: "src",
    INNER_HTML: "innerHTML",
    CSS_TEXT: "cssText",
    ITEM_PROP: "itemprop"
};

var PREACT_TAG_MAP = exports.PREACT_TAG_MAP = {
    "charset": "charSet",
    "http-equiv": "httpEquiv",
    "itemprop": "itemProp",
    "class": "className"
};

/***/ }),

/***/ "ZAL5":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"home":"home__2Q5nZ","parallax":"parallax__3THOL","contents":"contents__3U50R"};

/***/ }),

/***/ "adLa":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "bmMN":
/***/ (function(module, exports) {

module.exports = [{"title":"Github","url":"https://github.com/danielsmith4483"},{"title":"Linkedin","url":"https://www.linkedin.com/in/danielsmith4483/"},{"title":"Instagram","url":"https://www.instagram.com/danielsmith4483/"},{"title":"Twitter","url":"https://twitter.com/danielsmith4483"}]

/***/ }),

/***/ "hMec":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "koiw":
/***/ (function(module, exports, __webpack_require__) {

var pSlice = Array.prototype.slice;
var objectKeys = __webpack_require__("mbYX");
var isArguments = __webpack_require__("OWwF");

var deepEqual = module.exports = function (actual, expected, opts) {
  if (!opts) opts = {};
  // 7.1. All identical values are equivalent, as determined by ===.
  if (actual === expected) {
    return true;
  } else if (actual instanceof Date && expected instanceof Date) {
    return actual.getTime() === expected.getTime();

    // 7.3. Other pairs that do not both pass typeof value == 'object',
    // equivalence is determined by ==.
  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
    return opts.strict ? actual === expected : actual == expected;

    // 7.4. For all other Object pairs, including Array objects, equivalence is
    // determined by having the same number of owned properties (as verified
    // with Object.prototype.hasOwnProperty.call), the same set of keys
    // (although not necessarily the same order), equivalent values for every
    // corresponding key, and an identical 'prototype' property. Note: this
    // accounts for both named and indexed properties on Arrays.
  } else {
    return objEquiv(actual, expected, opts);
  }
};

function isUndefinedOrNull(value) {
  return value === null || value === undefined;
}

function isBuffer(x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') return false;
  return true;
}

function objEquiv(a, b, opts) {
  var i, key;
  if (isUndefinedOrNull(a) || isUndefinedOrNull(b)) return false;
  // an identical 'prototype' property.
  if (a.prototype !== b.prototype) return false;
  //~~~I've managed to break Object.keys through screwy arguments passing.
  //   Converting to array solves the problem.
  if (isArguments(a)) {
    if (!isArguments(b)) {
      return false;
    }
    a = pSlice.call(a);
    b = pSlice.call(b);
    return deepEqual(a, b, opts);
  }
  if (isBuffer(a)) {
    if (!isBuffer(b)) {
      return false;
    }
    if (a.length !== b.length) return false;
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  try {
    var ka = objectKeys(a),
        kb = objectKeys(b);
  } catch (e) {
    //happens when one is a string literal and the other isn't
    return false;
  }
  // having the same number of owned properties (keys incorporates
  // hasOwnProperty)
  if (ka.length != kb.length) return false;
  //the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  //~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i]) return false;
  }
  //equivalent values for every corresponding key, and
  //~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!deepEqual(a[key], b[key], opts)) return false;
  }
  return typeof a === typeof b;
}

/***/ }),

/***/ "mbYX":
/***/ (function(module, exports) {

exports = module.exports = typeof Object.keys === 'function' ? Object.keys : shim;

exports.shim = shim;
function shim(obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }return keys;
}

/***/ }),

/***/ "rq4c":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ "sw5u":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Link = exports.Match = undefined;

var _extends = Object.assign || function (target) {
	for (var i = 1; i < arguments.length; i++) {
		var source = arguments[i];for (var key in source) {
			if (Object.prototype.hasOwnProperty.call(source, key)) {
				target[key] = source[key];
			}
		}
	}return target;
};

var _preact = __webpack_require__("KM04");

var _preactRouter = __webpack_require__("/QC5");

function _objectWithoutProperties(obj, keys) {
	var target = {};for (var i in obj) {
		if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
	}return target;
}

function _classCallCheck(instance, Constructor) {
	if (!(instance instanceof Constructor)) {
		throw new TypeError("Cannot call a class as a function");
	}
}

function _possibleConstructorReturn(self, call) {
	if (!self) {
		throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	}return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
	}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

var Match = exports.Match = function (_Component) {
	_inherits(Match, _Component);

	function Match() {
		var _temp, _this, _ret;

		_classCallCheck(this, Match);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.update = function (url) {
			_this.nextUrl = url;
			_this.setState({});
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	Match.prototype.componentDidMount = function componentDidMount() {
		_preactRouter.subscribers.push(this.update);
	};

	Match.prototype.componentWillUnmount = function componentWillUnmount() {
		_preactRouter.subscribers.splice(_preactRouter.subscribers.indexOf(this.update) >>> 0, 1);
	};

	Match.prototype.render = function render(props) {
		var url = this.nextUrl || (0, _preactRouter.getCurrentUrl)(),
		    path = url.replace(/\?.+$/, '');
		this.nextUrl = null;
		return props.children[0] && props.children[0]({
			url: url,
			path: path,
			matches: path === props.path
		});
	};

	return Match;
}(_preact.Component);

var Link = function Link(_ref) {
	var activeClassName = _ref.activeClassName,
	    path = _ref.path,
	    props = _objectWithoutProperties(_ref, ['activeClassName', 'path']);

	return (0, _preact.h)(Match, { path: path || props.href }, function (_ref2) {
		var matches = _ref2.matches;
		return (0, _preact.h)(_preactRouter.Link, _extends({}, props, { 'class': [props.class || props.className, matches && activeClassName].filter(Boolean).join(' ') }));
	});
};

exports.Link = Link;
exports.default = Match;

Match.Link = Link;

/***/ }),

/***/ "u3et":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin
module.exports = {"header":"header__2MqSo","active":"active__27Q54"};

/***/ }),

/***/ "w03J":
/***/ (function(module, exports) {

module.exports = [{"title":"Contact","contents":"","colors":{"backgroundStart":"#F9FEA5","backgroundEnd":"#20E2D7","textColor":"black"}}]

/***/ }),

/***/ "xToX":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _preact = __webpack_require__("KM04");

function _objectWithoutProperties(obj, keys) {
  var target = {};for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;target[i] = obj[i];
  }return target;
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
} /** @jsx h */

module.exports = function withSideEffect(reducePropsToState, handleStateChangeOnClient, mapStateOnServer) {
  if (typeof reducePropsToState !== 'function') {
    throw new Error('Expected reducePropsToState to be a function.');
  }
  if (typeof handleStateChangeOnClient !== 'function') {
    throw new Error('Expected handleStateChangeOnClient to be a function.');
  }
  if (typeof mapStateOnServer !== 'undefined' && typeof mapStateOnServer !== 'function') {
    throw new Error('Expected mapStateOnServer to either be undefined or a function.');
  }

  function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
  }

  return function wrap(WrappedComponent) {
    if (typeof WrappedComponent !== 'function') {
      throw new Error('Expected WrappedComponent to be a React component.');
    }

    var mountedInstances = [];
    var state = void 0;

    function emitChange() {
      state = reducePropsToState(mountedInstances.map(function (instance) {
        return instance.props;
      }));

      if (SideEffect.canUseDOM) {
        handleStateChangeOnClient(state);
      } else if (mapStateOnServer) {
        state = mapStateOnServer(state);
      }
    }

    var SideEffect = function (_Component) {
      _inherits(SideEffect, _Component);

      function SideEffect() {
        _classCallCheck(this, SideEffect);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
      }

      // Try to use displayName of wrapped component
      SideEffect.peek = function peek() {
        return state;
      };

      // Expose canUseDOM so tests can monkeypatch it


      SideEffect.rewind = function rewind() {
        if (SideEffect.canUseDOM) {
          throw new Error('You may only call rewind() on the server. Call peek() to read the current state.');
        }

        var recordedState = state;
        state = undefined;
        mountedInstances = [];
        return recordedState;
      };

      SideEffect.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
        // preact-compat normally does this
        var children = nextProps.children,
            props = _objectWithoutProperties(nextProps, ['children']);

        if (children && children.length) props.children = children;
        return shallowDiffers(props, this.props);
      };

      SideEffect.prototype.componentWillMount = function componentWillMount() {
        mountedInstances.push(this);
        emitChange();
      };

      SideEffect.prototype.componentDidUpdate = function componentDidUpdate() {
        emitChange();
      };

      SideEffect.prototype.componentWillUnmount = function componentWillUnmount() {
        var index = mountedInstances.indexOf(this);
        mountedInstances.splice(index, 1);
        emitChange();
      };

      SideEffect.prototype.render = function render() {
        return (0, _preact.h)(WrappedComponent, this.props);
      };

      return SideEffect;
    }(_preact.Component);

    SideEffect.displayName = 'SideEffect(' + getDisplayName(WrappedComponent) + ')';
    SideEffect.canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

    return SideEffect;
  };

  // Pulled from react-compat
  function shallowDiffers(a, b) {
    for (var i in a) {
      if (!(i in b)) return true;
    }for (var _i in b) {
      if (a[_i] !== b[_i]) return true;
    }return false;
  }
};

/***/ }),

/***/ "zuNQ":
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })

/******/ });
//# sourceMappingURL=ssr-bundle.js.map