import {
  Router,
  _extends,
  _inheritsLoose,
  _objectWithoutPropertiesLoose,
  context,
  createBrowserHistory,
  createHashHistory,
  createLocation,
  createPath,
  invariant,
  matchPath,
  require_prop_types,
  tiny_warning_esm_default
} from "./chunk-MRIYC7KQ.js";
import {
  require_react
} from "./chunk-6ZP2ACR7.js";
import {
  __toESM
} from "./chunk-YTB4TACA.js";

// node_modules/react-router-dom/esm/react-router-dom.js
var import_react = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
var BrowserRouter = function(_React$Component) {
  _inheritsLoose(BrowserRouter2, _React$Component);
  function BrowserRouter2() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.history = createBrowserHistory(_this.props);
    return _this;
  }
  var _proto = BrowserRouter2.prototype;
  _proto.render = function render() {
    return import_react.default.createElement(Router, {
      history: this.history,
      children: this.props.children
    });
  };
  return BrowserRouter2;
}(import_react.default.Component);
if (true) {
  BrowserRouter.propTypes = {
    basename: import_prop_types.default.string,
    children: import_prop_types.default.node,
    forceRefresh: import_prop_types.default.bool,
    getUserConfirmation: import_prop_types.default.func,
    keyLength: import_prop_types.default.number
  };
  BrowserRouter.prototype.componentDidMount = function() {
    true ? tiny_warning_esm_default(!this.props.history, "<BrowserRouter> ignores the history prop. To use a custom history, use `import { Router }` instead of `import { BrowserRouter as Router }`.") : void 0;
  };
}
var HashRouter = function(_React$Component) {
  _inheritsLoose(HashRouter2, _React$Component);
  function HashRouter2() {
    var _this;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _React$Component.call.apply(_React$Component, [this].concat(args)) || this;
    _this.history = createHashHistory(_this.props);
    return _this;
  }
  var _proto = HashRouter2.prototype;
  _proto.render = function render() {
    return import_react.default.createElement(Router, {
      history: this.history,
      children: this.props.children
    });
  };
  return HashRouter2;
}(import_react.default.Component);
if (true) {
  HashRouter.propTypes = {
    basename: import_prop_types.default.string,
    children: import_prop_types.default.node,
    getUserConfirmation: import_prop_types.default.func,
    hashType: import_prop_types.default.oneOf(["hashbang", "noslash", "slash"])
  };
  HashRouter.prototype.componentDidMount = function() {
    true ? tiny_warning_esm_default(!this.props.history, "<HashRouter> ignores the history prop. To use a custom history, use `import { Router }` instead of `import { HashRouter as Router }`.") : void 0;
  };
}
var resolveToLocation = function resolveToLocation2(to, currentLocation) {
  return typeof to === "function" ? to(currentLocation) : to;
};
var normalizeToLocation = function normalizeToLocation2(to, currentLocation) {
  return typeof to === "string" ? createLocation(to, null, null, currentLocation) : to;
};
var forwardRefShim = function forwardRefShim2(C) {
  return C;
};
var forwardRef = import_react.default.forwardRef;
if (typeof forwardRef === "undefined") {
  forwardRef = forwardRefShim;
}
function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
var LinkAnchor = forwardRef(function(_ref, forwardedRef) {
  var innerRef = _ref.innerRef, navigate = _ref.navigate, _onClick = _ref.onClick, rest = _objectWithoutPropertiesLoose(_ref, ["innerRef", "navigate", "onClick"]);
  var target = rest.target;
  var props = _extends({}, rest, {
    onClick: function onClick(event) {
      try {
        if (_onClick)
          _onClick(event);
      } catch (ex) {
        event.preventDefault();
        throw ex;
      }
      if (!event.defaultPrevented && // onClick prevented default
      event.button === 0 && // ignore everything but left clicks
      (!target || target === "_self") && // let browser handle "target=_blank" etc.
      !isModifiedEvent(event)) {
        event.preventDefault();
        navigate();
      }
    }
  });
  if (forwardRefShim !== forwardRef) {
    props.ref = forwardedRef || innerRef;
  } else {
    props.ref = innerRef;
  }
  return import_react.default.createElement("a", props);
});
if (true) {
  LinkAnchor.displayName = "LinkAnchor";
}
var Link = forwardRef(function(_ref2, forwardedRef) {
  var _ref2$component = _ref2.component, component = _ref2$component === void 0 ? LinkAnchor : _ref2$component, replace = _ref2.replace, to = _ref2.to, innerRef = _ref2.innerRef, rest = _objectWithoutPropertiesLoose(_ref2, ["component", "replace", "to", "innerRef"]);
  return import_react.default.createElement(context.Consumer, null, function(context2) {
    !context2 ? true ? invariant(false, "You should not use <Link> outside a <Router>") : invariant(false) : void 0;
    var history = context2.history;
    var location = normalizeToLocation(resolveToLocation(to, context2.location), context2.location);
    var href = location ? history.createHref(location) : "";
    var props = _extends({}, rest, {
      href,
      navigate: function navigate() {
        var location2 = resolveToLocation(to, context2.location);
        var isDuplicateNavigation = createPath(context2.location) === createPath(normalizeToLocation(location2));
        var method = replace || isDuplicateNavigation ? history.replace : history.push;
        method(location2);
      }
    });
    if (forwardRefShim !== forwardRef) {
      props.ref = forwardedRef || innerRef;
    } else {
      props.innerRef = innerRef;
    }
    return import_react.default.createElement(component, props);
  });
});
if (true) {
  toType = import_prop_types.default.oneOfType([import_prop_types.default.string, import_prop_types.default.object, import_prop_types.default.func]);
  refType = import_prop_types.default.oneOfType([import_prop_types.default.string, import_prop_types.default.func, import_prop_types.default.shape({
    current: import_prop_types.default.any
  })]);
  Link.displayName = "Link";
  Link.propTypes = {
    innerRef: refType,
    onClick: import_prop_types.default.func,
    replace: import_prop_types.default.bool,
    target: import_prop_types.default.string,
    to: toType.isRequired
  };
}
var toType;
var refType;
var forwardRefShim$1 = function forwardRefShim3(C) {
  return C;
};
var forwardRef$1 = import_react.default.forwardRef;
if (typeof forwardRef$1 === "undefined") {
  forwardRef$1 = forwardRefShim$1;
}
function joinClassnames() {
  for (var _len = arguments.length, classnames = new Array(_len), _key = 0; _key < _len; _key++) {
    classnames[_key] = arguments[_key];
  }
  return classnames.filter(function(i) {
    return i;
  }).join(" ");
}
var NavLink = forwardRef$1(function(_ref, forwardedRef) {
  var _ref$ariaCurrent = _ref["aria-current"], ariaCurrent = _ref$ariaCurrent === void 0 ? "page" : _ref$ariaCurrent, _ref$activeClassName = _ref.activeClassName, activeClassName = _ref$activeClassName === void 0 ? "active" : _ref$activeClassName, activeStyle = _ref.activeStyle, classNameProp = _ref.className, exact = _ref.exact, isActiveProp = _ref.isActive, locationProp = _ref.location, sensitive = _ref.sensitive, strict = _ref.strict, styleProp = _ref.style, to = _ref.to, innerRef = _ref.innerRef, rest = _objectWithoutPropertiesLoose(_ref, ["aria-current", "activeClassName", "activeStyle", "className", "exact", "isActive", "location", "sensitive", "strict", "style", "to", "innerRef"]);
  return import_react.default.createElement(context.Consumer, null, function(context2) {
    !context2 ? true ? invariant(false, "You should not use <NavLink> outside a <Router>") : invariant(false) : void 0;
    var currentLocation = locationProp || context2.location;
    var toLocation = normalizeToLocation(resolveToLocation(to, currentLocation), currentLocation);
    var path = toLocation.pathname;
    var escapedPath = path && path.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
    var match = escapedPath ? matchPath(currentLocation.pathname, {
      path: escapedPath,
      exact,
      sensitive,
      strict
    }) : null;
    var isActive = !!(isActiveProp ? isActiveProp(match, currentLocation) : match);
    var className = typeof classNameProp === "function" ? classNameProp(isActive) : classNameProp;
    var style = typeof styleProp === "function" ? styleProp(isActive) : styleProp;
    if (isActive) {
      className = joinClassnames(className, activeClassName);
      style = _extends({}, style, activeStyle);
    }
    var props = _extends({
      "aria-current": isActive && ariaCurrent || null,
      className,
      style,
      to: toLocation
    }, rest);
    if (forwardRefShim$1 !== forwardRef$1) {
      props.ref = forwardedRef || innerRef;
    } else {
      props.innerRef = innerRef;
    }
    return import_react.default.createElement(Link, props);
  });
});
if (true) {
  NavLink.displayName = "NavLink";
  ariaCurrentType = import_prop_types.default.oneOf(["page", "step", "location", "date", "time", "true", "false"]);
  NavLink.propTypes = _extends({}, Link.propTypes, {
    "aria-current": ariaCurrentType,
    activeClassName: import_prop_types.default.string,
    activeStyle: import_prop_types.default.object,
    className: import_prop_types.default.oneOfType([import_prop_types.default.string, import_prop_types.default.func]),
    exact: import_prop_types.default.bool,
    isActive: import_prop_types.default.func,
    location: import_prop_types.default.object,
    sensitive: import_prop_types.default.bool,
    strict: import_prop_types.default.bool,
    style: import_prop_types.default.oneOfType([import_prop_types.default.object, import_prop_types.default.func])
  });
}
var ariaCurrentType;

export {
  BrowserRouter,
  HashRouter,
  Link,
  NavLink
};
//# sourceMappingURL=chunk-JTX3IHPO.js.map
