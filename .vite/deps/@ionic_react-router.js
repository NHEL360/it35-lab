import "./chunk-JTX3IHPO.js";
import {
  IonRoute,
  LocationHistory,
  NavManager,
  RouteManagerContext,
  StackContext,
  ViewLifeCycleManager,
  ViewStacks,
  __rest,
  generateId,
  getConfig
} from "./chunk-LYNIVKDG.js";
import "./chunk-7YD6DIQX.js";
import "./chunk-LYDS5F64.js";
import "./chunk-OAHRFN6U.js";
import "./chunk-G65NBABB.js";
import "./chunk-U5Z7IEQS.js";
import "./chunk-EKIGSOYZ.js";
import "./chunk-UBMGMN77.js";
import "./chunk-DQEVNWKW.js";
import "./chunk-5RQRUINC.js";
import "./chunk-GEC5RQRZ.js";
import "./chunk-PNM76LIE.js";
import "./chunk-F7JUQZHQ.js";
import "./chunk-2A5WUACF.js";
import "./chunk-43EAWSPA.js";
import "./chunk-7X7UJEGS.js";
import "./chunk-37HAPLRC.js";
import {
  Route,
  Router,
  createBrowserHistory,
  createHashHistory,
  matchPath,
  withRouter
} from "./chunk-MRIYC7KQ.js";
import {
  require_react
} from "./chunk-6ZP2ACR7.js";
import {
  __toESM
} from "./chunk-YTB4TACA.js";

// node_modules/@ionic/react-router/dist/index.js
var import_react = __toESM(require_react());
var IonRouteInner = class extends import_react.default.PureComponent {
  render() {
    return import_react.default.createElement(Route, Object.assign({ path: this.props.path, exact: this.props.exact, render: this.props.render }, this.props.computedMatch !== void 0 ? {
      computedMatch: this.props.computedMatch
    } : {}));
  }
};
var matchPath2 = ({ pathname, componentProps }) => {
  const { exact, component } = componentProps;
  const path = componentProps.path || componentProps.from;
  const matchProps = {
    exact,
    path,
    component
  };
  const match = matchPath(pathname, matchProps);
  if (!match) {
    return false;
  }
  return match;
};
var ReactRouterViewStack = class extends ViewStacks {
  constructor() {
    super();
    this.createViewItem = this.createViewItem.bind(this);
    this.findViewItemByRouteInfo = this.findViewItemByRouteInfo.bind(this);
    this.findLeavingViewItemByRouteInfo = this.findLeavingViewItemByRouteInfo.bind(this);
    this.getChildrenToRender = this.getChildrenToRender.bind(this);
    this.findViewItemByPathname = this.findViewItemByPathname.bind(this);
  }
  createViewItem(outletId, reactElement, routeInfo, page) {
    const viewItem = {
      id: generateId("viewItem"),
      outletId,
      ionPageElement: page,
      reactElement,
      mount: true,
      ionRoute: false
    };
    if (reactElement.type === IonRoute) {
      viewItem.ionRoute = true;
      viewItem.disableIonPageManagement = reactElement.props.disableIonPageManagement;
    }
    viewItem.routeData = {
      match: matchPath2({
        pathname: routeInfo.pathname,
        componentProps: reactElement.props
      }),
      childProps: reactElement.props
    };
    return viewItem;
  }
  getChildrenToRender(outletId, ionRouterOutlet, routeInfo) {
    const viewItems = this.getViewItemsForOutlet(outletId);
    import_react.default.Children.forEach(ionRouterOutlet.props.children, (child) => {
      const viewItem = viewItems.find((v) => {
        return matchComponent$1(child, v.routeData.childProps.path || v.routeData.childProps.from);
      });
      if (viewItem) {
        viewItem.reactElement = child;
      }
    });
    const children = viewItems.map((viewItem) => {
      let clonedChild;
      if (viewItem.ionRoute && !viewItem.disableIonPageManagement) {
        clonedChild = import_react.default.createElement(ViewLifeCycleManager, { key: `view-${viewItem.id}`, mount: viewItem.mount, removeView: () => this.remove(viewItem) }, import_react.default.cloneElement(viewItem.reactElement, {
          computedMatch: viewItem.routeData.match
        }));
      } else {
        const match = matchComponent$1(viewItem.reactElement, routeInfo.pathname);
        clonedChild = import_react.default.createElement(ViewLifeCycleManager, { key: `view-${viewItem.id}`, mount: viewItem.mount, removeView: () => this.remove(viewItem) }, import_react.default.cloneElement(viewItem.reactElement, {
          computedMatch: viewItem.routeData.match
        }));
        if (!match && viewItem.routeData.match) {
          viewItem.routeData.match = void 0;
          viewItem.mount = false;
        }
      }
      return clonedChild;
    });
    return children;
  }
  findViewItemByRouteInfo(routeInfo, outletId, updateMatch) {
    const { viewItem, match } = this.findViewItemByPath(routeInfo.pathname, outletId);
    const shouldUpdateMatch = updateMatch === void 0 || updateMatch === true;
    if (shouldUpdateMatch && viewItem && match) {
      viewItem.routeData.match = match;
    }
    return viewItem;
  }
  findLeavingViewItemByRouteInfo(routeInfo, outletId, mustBeIonRoute = true) {
    const { viewItem } = this.findViewItemByPath(routeInfo.lastPathname, outletId, mustBeIonRoute);
    return viewItem;
  }
  findViewItemByPathname(pathname, outletId) {
    const { viewItem } = this.findViewItemByPath(pathname, outletId);
    return viewItem;
  }
  /**
   * Returns the matching view item and the match result for a given pathname.
   */
  findViewItemByPath(pathname, outletId, mustBeIonRoute) {
    let viewItem;
    let match;
    let viewStack;
    if (outletId) {
      viewStack = this.getViewItemsForOutlet(outletId);
      viewStack.some(matchView);
      if (!viewItem) {
        viewStack.some(matchDefaultRoute);
      }
    } else {
      const viewItems = this.getAllViewItems();
      viewItems.some(matchView);
      if (!viewItem) {
        viewItems.some(matchDefaultRoute);
      }
    }
    return { viewItem, match };
    function matchView(v) {
      var _a, _b;
      if (mustBeIonRoute && !v.ionRoute) {
        return false;
      }
      match = matchPath2({
        pathname,
        componentProps: v.routeData.childProps
      });
      if (match) {
        const hasParameter = match.path.includes(":");
        if (!hasParameter || hasParameter && match.url === ((_b = (_a = v.routeData) === null || _a === void 0 ? void 0 : _a.match) === null || _b === void 0 ? void 0 : _b.url)) {
          viewItem = v;
          return true;
        }
      }
      return false;
    }
    function matchDefaultRoute(v) {
      if (!v.routeData.childProps.path && !v.routeData.childProps.from) {
        match = {
          path: pathname,
          url: pathname,
          isExact: true,
          params: {}
        };
        viewItem = v;
        return true;
      }
      return false;
    }
  }
};
function matchComponent$1(node, pathname) {
  return matchPath2({
    pathname,
    componentProps: node.props
  });
}
function clonePageElement(leavingViewHtml) {
  let html;
  if (typeof leavingViewHtml === "string") {
    html = leavingViewHtml;
  } else {
    html = leavingViewHtml.outerHTML;
  }
  if (document) {
    const newEl = document.createElement("div");
    newEl.innerHTML = html;
    newEl.style.zIndex = "";
    const ionBackButton = newEl.getElementsByTagName("ion-back-button");
    if (ionBackButton[0]) {
      ionBackButton[0].remove();
    }
    return newEl.firstChild;
  }
  return void 0;
}
var isViewVisible = (el) => !el.classList.contains("ion-page-invisible") && !el.classList.contains("ion-page-hidden");
var StackManager = class extends import_react.default.PureComponent {
  constructor(props) {
    super(props);
    this.stackContextValue = {
      registerIonPage: this.registerIonPage.bind(this),
      isInOutlet: () => true
    };
    this.pendingPageTransition = false;
    this.registerIonPage = this.registerIonPage.bind(this);
    this.transitionPage = this.transitionPage.bind(this);
    this.handlePageTransition = this.handlePageTransition.bind(this);
    this.id = generateId("routerOutlet");
    this.prevProps = void 0;
    this.skipTransition = false;
  }
  componentDidMount() {
    if (this.clearOutletTimeout) {
      clearTimeout(this.clearOutletTimeout);
    }
    if (this.routerOutletElement) {
      this.setupRouterOutlet(this.routerOutletElement);
      this.handlePageTransition(this.props.routeInfo);
    }
  }
  componentDidUpdate(prevProps) {
    const { pathname } = this.props.routeInfo;
    const { pathname: prevPathname } = prevProps.routeInfo;
    if (pathname !== prevPathname) {
      this.prevProps = prevProps;
      this.handlePageTransition(this.props.routeInfo);
    } else if (this.pendingPageTransition) {
      this.handlePageTransition(this.props.routeInfo);
      this.pendingPageTransition = false;
    }
  }
  componentWillUnmount() {
    this.clearOutletTimeout = this.context.clearOutlet(this.id);
  }
  async handlePageTransition(routeInfo) {
    var _a, _b;
    if (!this.routerOutletElement || !this.routerOutletElement.commit) {
      this.pendingPageTransition = true;
    } else {
      let enteringViewItem = this.context.findViewItemByRouteInfo(routeInfo, this.id);
      let leavingViewItem = this.context.findLeavingViewItemByRouteInfo(routeInfo, this.id);
      if (!leavingViewItem && routeInfo.prevRouteLastPathname) {
        leavingViewItem = this.context.findViewItemByPathname(routeInfo.prevRouteLastPathname, this.id);
      }
      if (leavingViewItem) {
        if (routeInfo.routeAction === "replace") {
          leavingViewItem.mount = false;
        } else if (!(routeInfo.routeAction === "push" && routeInfo.routeDirection === "forward")) {
          if (routeInfo.routeDirection !== "none" && enteringViewItem !== leavingViewItem) {
            leavingViewItem.mount = false;
          }
        } else if ((_a = routeInfo.routeOptions) === null || _a === void 0 ? void 0 : _a.unmount) {
          leavingViewItem.mount = false;
        }
      }
      const enteringRoute = matchRoute((_b = this.ionRouterOutlet) === null || _b === void 0 ? void 0 : _b.props.children, routeInfo);
      if (enteringViewItem) {
        enteringViewItem.reactElement = enteringRoute;
      } else if (enteringRoute) {
        enteringViewItem = this.context.createViewItem(this.id, enteringRoute, routeInfo);
        this.context.addViewItem(enteringViewItem);
      }
      if (enteringViewItem && enteringViewItem.ionPageElement) {
        if (enteringViewItem === leavingViewItem) {
          if (enteringViewItem.routeData.match.url !== routeInfo.pathname) {
            return;
          }
        }
        if (!leavingViewItem && this.props.routeInfo.prevRouteLastPathname) {
          leavingViewItem = this.context.findViewItemByPathname(this.props.routeInfo.prevRouteLastPathname, this.id);
        }
        if (isViewVisible(enteringViewItem.ionPageElement) && leavingViewItem !== void 0 && !isViewVisible(leavingViewItem.ionPageElement)) {
          return;
        }
        this.transitionPage(routeInfo, enteringViewItem, leavingViewItem);
      } else if (leavingViewItem && !enteringRoute && !enteringViewItem) {
        if (leavingViewItem.ionPageElement) {
          leavingViewItem.ionPageElement.classList.add("ion-page-hidden");
          leavingViewItem.ionPageElement.setAttribute("aria-hidden", "true");
        }
      }
      this.forceUpdate();
    }
  }
  registerIonPage(page, routeInfo) {
    const foundView = this.context.findViewItemByRouteInfo(routeInfo, this.id);
    if (foundView) {
      const oldPageElement = foundView.ionPageElement;
      foundView.ionPageElement = page;
      foundView.ionRoute = true;
      if (oldPageElement === page) {
        return;
      }
    }
    this.handlePageTransition(routeInfo);
  }
  async setupRouterOutlet(routerOutlet) {
    const canStart = () => {
      const config = getConfig();
      const swipeEnabled = config && config.get("swipeBackEnabled", routerOutlet.mode === "ios");
      if (!swipeEnabled) {
        return false;
      }
      const { routeInfo } = this.props;
      const propsToUse = this.prevProps && this.prevProps.routeInfo.pathname === routeInfo.pushedByRoute ? this.prevProps.routeInfo : { pathname: routeInfo.pushedByRoute || "" };
      const enteringViewItem = this.context.findViewItemByRouteInfo(propsToUse, this.id, false);
      return !!enteringViewItem && /**
       * The root url '/' is treated as
       * the first view item (but is never mounted),
       * so we do not want to swipe back to the
       * root url.
       */
      enteringViewItem.mount && /**
       * When on the first page (whatever view
       * you land on after the root url) it
       * is possible for findViewItemByRouteInfo to
       * return the exact same view you are currently on.
       * Make sure that we are not swiping back to the same
       * instances of a view.
       */
      enteringViewItem.routeData.match.path !== routeInfo.pathname;
    };
    const onStart = async () => {
      const { routeInfo } = this.props;
      const propsToUse = this.prevProps && this.prevProps.routeInfo.pathname === routeInfo.pushedByRoute ? this.prevProps.routeInfo : { pathname: routeInfo.pushedByRoute || "" };
      const enteringViewItem = this.context.findViewItemByRouteInfo(propsToUse, this.id, false);
      const leavingViewItem = this.context.findViewItemByRouteInfo(routeInfo, this.id, false);
      if (enteringViewItem && leavingViewItem) {
        await this.transitionPage(routeInfo, enteringViewItem, leavingViewItem, "back", true);
      }
      return Promise.resolve();
    };
    const onEnd = (shouldContinue) => {
      if (shouldContinue) {
        this.skipTransition = true;
        this.context.goBack();
      } else {
        const { routeInfo } = this.props;
        const propsToUse = this.prevProps && this.prevProps.routeInfo.pathname === routeInfo.pushedByRoute ? this.prevProps.routeInfo : { pathname: routeInfo.pushedByRoute || "" };
        const enteringViewItem = this.context.findViewItemByRouteInfo(propsToUse, this.id, false);
        const leavingViewItem = this.context.findViewItemByRouteInfo(routeInfo, this.id, false);
        if (enteringViewItem !== leavingViewItem && (enteringViewItem === null || enteringViewItem === void 0 ? void 0 : enteringViewItem.ionPageElement) !== void 0) {
          const { ionPageElement } = enteringViewItem;
          ionPageElement.setAttribute("aria-hidden", "true");
          ionPageElement.classList.add("ion-page-hidden");
        }
      }
    };
    routerOutlet.swipeHandler = {
      canStart,
      onStart,
      onEnd
    };
  }
  async transitionPage(routeInfo, enteringViewItem, leavingViewItem, direction, progressAnimation = false) {
    const runCommit = async (enteringEl, leavingEl) => {
      const skipTransition = this.skipTransition;
      if (skipTransition) {
        this.skipTransition = false;
      } else {
        enteringEl.classList.add("ion-page");
        enteringEl.classList.add("ion-page-invisible");
      }
      await routerOutlet.commit(enteringEl, leavingEl, {
        duration: skipTransition || directionToUse === void 0 ? 0 : void 0,
        direction: directionToUse,
        showGoBack: !!routeInfo.pushedByRoute,
        progressAnimation,
        animationBuilder: routeInfo.routeAnimation
      });
    };
    const routerOutlet = this.routerOutletElement;
    const routeInfoFallbackDirection = routeInfo.routeDirection === "none" || routeInfo.routeDirection === "root" ? void 0 : routeInfo.routeDirection;
    const directionToUse = direction !== null && direction !== void 0 ? direction : routeInfoFallbackDirection;
    if (enteringViewItem && enteringViewItem.ionPageElement && this.routerOutletElement) {
      if (leavingViewItem && leavingViewItem.ionPageElement && enteringViewItem === leavingViewItem) {
        const match = matchComponent(leavingViewItem.reactElement, routeInfo.pathname, true);
        if (match) {
          const newLeavingElement = clonePageElement(leavingViewItem.ionPageElement.outerHTML);
          if (newLeavingElement) {
            this.routerOutletElement.appendChild(newLeavingElement);
            await runCommit(enteringViewItem.ionPageElement, newLeavingElement);
            this.routerOutletElement.removeChild(newLeavingElement);
          }
        } else {
          await runCommit(enteringViewItem.ionPageElement, void 0);
        }
      } else {
        await runCommit(enteringViewItem.ionPageElement, leavingViewItem === null || leavingViewItem === void 0 ? void 0 : leavingViewItem.ionPageElement);
        if (leavingViewItem && leavingViewItem.ionPageElement && !progressAnimation) {
          leavingViewItem.ionPageElement.classList.add("ion-page-hidden");
          leavingViewItem.ionPageElement.setAttribute("aria-hidden", "true");
        }
      }
    }
  }
  render() {
    const { children } = this.props;
    const ionRouterOutlet = import_react.default.Children.only(children);
    this.ionRouterOutlet = ionRouterOutlet;
    const components = this.context.getChildrenToRender(this.id, this.ionRouterOutlet, this.props.routeInfo, () => {
      this.forceUpdate();
    });
    return import_react.default.createElement(StackContext.Provider, { value: this.stackContextValue }, import_react.default.cloneElement(ionRouterOutlet, {
      ref: (node) => {
        if (ionRouterOutlet.props.setRef) {
          ionRouterOutlet.props.setRef(node);
        }
        if (ionRouterOutlet.props.forwardedRef) {
          ionRouterOutlet.props.forwardedRef.current = node;
        }
        this.routerOutletElement = node;
        const { ref } = ionRouterOutlet;
        if (typeof ref === "function") {
          ref(node);
        }
      }
    }, components));
  }
  static get contextType() {
    return RouteManagerContext;
  }
};
function matchRoute(node, routeInfo) {
  let matchedNode;
  import_react.default.Children.forEach(node, (child) => {
    const match = matchPath2({
      pathname: routeInfo.pathname,
      componentProps: child.props
    });
    if (match) {
      matchedNode = child;
    }
  });
  if (matchedNode) {
    return matchedNode;
  }
  import_react.default.Children.forEach(node, (child) => {
    if (!(child.props.path || child.props.from)) {
      matchedNode = child;
    }
  });
  return matchedNode;
}
function matchComponent(node, pathname, forceExact) {
  return matchPath2({
    pathname,
    componentProps: Object.assign(Object.assign({}, node.props), { exact: forceExact })
  });
}
var IonRouterInner = class extends import_react.default.PureComponent {
  constructor(props) {
    super(props);
    this.exitViewFromOtherOutletHandlers = [];
    this.locationHistory = new LocationHistory();
    this.viewStack = new ReactRouterViewStack();
    this.routeMangerContextState = {
      canGoBack: () => this.locationHistory.canGoBack(),
      clearOutlet: this.viewStack.clear,
      findViewItemByPathname: this.viewStack.findViewItemByPathname,
      getChildrenToRender: this.viewStack.getChildrenToRender,
      goBack: () => this.handleNavigateBack(),
      createViewItem: this.viewStack.createViewItem,
      findViewItemByRouteInfo: this.viewStack.findViewItemByRouteInfo,
      findLeavingViewItemByRouteInfo: this.viewStack.findLeavingViewItemByRouteInfo,
      addViewItem: this.viewStack.add,
      unMountViewItem: this.viewStack.remove
    };
    const routeInfo = {
      id: generateId("routeInfo"),
      pathname: this.props.location.pathname,
      search: this.props.location.search
    };
    this.locationHistory.add(routeInfo);
    this.handleChangeTab = this.handleChangeTab.bind(this);
    this.handleResetTab = this.handleResetTab.bind(this);
    this.handleNativeBack = this.handleNativeBack.bind(this);
    this.handleNavigate = this.handleNavigate.bind(this);
    this.handleNavigateBack = this.handleNavigateBack.bind(this);
    this.props.registerHistoryListener(this.handleHistoryChange.bind(this));
    this.handleSetCurrentTab = this.handleSetCurrentTab.bind(this);
    this.state = {
      routeInfo
    };
  }
  handleChangeTab(tab, path, routeOptions) {
    if (!path) {
      return;
    }
    const routeInfo = this.locationHistory.getCurrentRouteInfoForTab(tab);
    const [pathname, search] = path.split("?");
    if (routeInfo) {
      this.incomingRouteParams = Object.assign(Object.assign({}, routeInfo), { routeAction: "push", routeDirection: "none" });
      if (routeInfo.pathname === pathname) {
        this.incomingRouteParams.routeOptions = routeOptions;
        this.props.history.push(routeInfo.pathname + (routeInfo.search || ""));
      } else {
        this.incomingRouteParams.pathname = pathname;
        this.incomingRouteParams.search = search ? "?" + search : void 0;
        this.incomingRouteParams.routeOptions = routeOptions;
        this.props.history.push(pathname + (search ? "?" + search : ""));
      }
    } else {
      this.handleNavigate(pathname, "push", "none", void 0, routeOptions, tab);
    }
  }
  handleHistoryChange(location, action) {
    var _a, _b, _c;
    let leavingLocationInfo;
    if (this.incomingRouteParams) {
      if (this.incomingRouteParams.routeAction === "replace") {
        leavingLocationInfo = this.locationHistory.previous();
      } else {
        leavingLocationInfo = this.locationHistory.current();
      }
    } else {
      leavingLocationInfo = this.locationHistory.current();
    }
    const leavingUrl = leavingLocationInfo.pathname + leavingLocationInfo.search;
    if (leavingUrl !== location.pathname) {
      if (!this.incomingRouteParams) {
        if (action === "REPLACE") {
          this.incomingRouteParams = {
            routeAction: "replace",
            routeDirection: "none",
            tab: this.currentTab
          };
        }
        if (action === "POP") {
          const currentRoute = this.locationHistory.current();
          if (currentRoute && currentRoute.pushedByRoute) {
            const prevInfo = this.locationHistory.findLastLocation(currentRoute);
            this.incomingRouteParams = Object.assign(Object.assign({}, prevInfo), { routeAction: "pop", routeDirection: "back" });
          } else {
            this.incomingRouteParams = {
              routeAction: "pop",
              routeDirection: "none",
              tab: this.currentTab
            };
          }
        }
        if (!this.incomingRouteParams) {
          this.incomingRouteParams = {
            routeAction: "push",
            routeDirection: ((_a = location.state) === null || _a === void 0 ? void 0 : _a.direction) || "forward",
            routeOptions: (_b = location.state) === null || _b === void 0 ? void 0 : _b.routerOptions,
            tab: this.currentTab
          };
        }
      }
      let routeInfo;
      if ((_c = this.incomingRouteParams) === null || _c === void 0 ? void 0 : _c.id) {
        routeInfo = Object.assign(Object.assign({}, this.incomingRouteParams), { lastPathname: leavingLocationInfo.pathname });
        this.locationHistory.add(routeInfo);
      } else {
        const isPushed = this.incomingRouteParams.routeAction === "push" && this.incomingRouteParams.routeDirection === "forward";
        routeInfo = Object.assign(Object.assign({ id: generateId("routeInfo") }, this.incomingRouteParams), { lastPathname: leavingLocationInfo.pathname, pathname: location.pathname, search: location.search, params: this.props.match.params, prevRouteLastPathname: leavingLocationInfo.lastPathname });
        if (isPushed) {
          routeInfo.tab = leavingLocationInfo.tab;
          routeInfo.pushedByRoute = leavingLocationInfo.pathname;
        } else if (routeInfo.routeAction === "pop") {
          const r = this.locationHistory.findLastLocation(routeInfo);
          routeInfo.pushedByRoute = r === null || r === void 0 ? void 0 : r.pushedByRoute;
        } else if (routeInfo.routeAction === "push" && routeInfo.tab !== leavingLocationInfo.tab) {
          const lastRoute = this.locationHistory.getCurrentRouteInfoForTab(routeInfo.tab);
          routeInfo.pushedByRoute = lastRoute === null || lastRoute === void 0 ? void 0 : lastRoute.pushedByRoute;
        } else if (routeInfo.routeAction === "replace") {
          const currentRouteInfo = this.locationHistory.current();
          const currentPushedBy = currentRouteInfo === null || currentRouteInfo === void 0 ? void 0 : currentRouteInfo.pushedByRoute;
          const pushedByRoute = currentPushedBy !== void 0 && currentPushedBy !== routeInfo.pathname ? currentPushedBy : routeInfo.pushedByRoute;
          routeInfo.lastPathname = (currentRouteInfo === null || currentRouteInfo === void 0 ? void 0 : currentRouteInfo.pathname) || routeInfo.lastPathname;
          routeInfo.prevRouteLastPathname = currentRouteInfo === null || currentRouteInfo === void 0 ? void 0 : currentRouteInfo.lastPathname;
          routeInfo.pushedByRoute = pushedByRoute;
          routeInfo.routeDirection = routeInfo.routeDirection || (currentRouteInfo === null || currentRouteInfo === void 0 ? void 0 : currentRouteInfo.routeDirection);
          routeInfo.routeAnimation = routeInfo.routeAnimation || (currentRouteInfo === null || currentRouteInfo === void 0 ? void 0 : currentRouteInfo.routeAnimation);
        }
        this.locationHistory.add(routeInfo);
      }
      this.setState({
        routeInfo
      });
    }
    this.incomingRouteParams = void 0;
  }
  /**
   * history@4.x uses goBack(), history@5.x uses back()
   * TODO: If support for React Router <=5 is dropped
   * this logic is no longer needed. We can just
   * assume back() is available.
   */
  handleNativeBack() {
    const history = this.props.history;
    const goBack = history.goBack || history.back;
    goBack();
  }
  handleNavigate(path, routeAction, routeDirection, routeAnimation, routeOptions, tab) {
    this.incomingRouteParams = Object.assign(this.incomingRouteParams || {}, {
      routeAction,
      routeDirection,
      routeOptions,
      routeAnimation,
      tab
    });
    if (routeAction === "push") {
      this.props.history.push(path);
    } else {
      this.props.history.replace(path);
    }
  }
  handleNavigateBack(defaultHref = "/", routeAnimation) {
    const config = getConfig();
    defaultHref = defaultHref ? defaultHref : config && config.get("backButtonDefaultHref");
    const routeInfo = this.locationHistory.current();
    if (routeInfo && routeInfo.pushedByRoute) {
      const prevInfo = this.locationHistory.findLastLocation(routeInfo);
      if (prevInfo) {
        const incomingAnimation = routeAnimation || routeInfo.routeAnimation;
        this.incomingRouteParams = Object.assign(Object.assign({}, prevInfo), { routeAction: "pop", routeDirection: "back", routeAnimation: incomingAnimation });
        if (routeInfo.lastPathname === routeInfo.pushedByRoute || /**
         * We need to exclude tab switches/tab
         * context changes here because tabbed
         * navigation is not linear, but router.back()
         * will go back in a linear fashion.
         */
        prevInfo.pathname === routeInfo.pushedByRoute && routeInfo.tab === "" && prevInfo.tab === "") {
          const history = this.props.history;
          const goBack = history.goBack || history.back;
          goBack();
        } else {
          this.handleNavigate(prevInfo.pathname + (prevInfo.search || ""), "pop", "back", incomingAnimation);
        }
      } else {
        this.handleNavigate(defaultHref, "pop", "back", routeAnimation);
      }
    } else {
      this.handleNavigate(defaultHref, "pop", "back", routeAnimation);
    }
  }
  handleResetTab(tab, originalHref, originalRouteOptions) {
    const routeInfo = this.locationHistory.getFirstRouteInfoForTab(tab);
    if (routeInfo) {
      const newRouteInfo = Object.assign({}, routeInfo);
      newRouteInfo.pathname = originalHref;
      newRouteInfo.routeOptions = originalRouteOptions;
      this.incomingRouteParams = Object.assign(Object.assign({}, newRouteInfo), { routeAction: "pop", routeDirection: "back" });
      this.props.history.push(newRouteInfo.pathname + (newRouteInfo.search || ""));
    }
  }
  handleSetCurrentTab(tab) {
    this.currentTab = tab;
    const ri = Object.assign({}, this.locationHistory.current());
    if (ri.tab !== tab) {
      ri.tab = tab;
      this.locationHistory.update(ri);
    }
  }
  render() {
    return import_react.default.createElement(
      RouteManagerContext.Provider,
      { value: this.routeMangerContextState },
      import_react.default.createElement(NavManager, { ionRoute: IonRouteInner, ionRedirect: {}, stackManager: StackManager, routeInfo: this.state.routeInfo, onNativeBack: this.handleNativeBack, onNavigateBack: this.handleNavigateBack, onNavigate: this.handleNavigate, onSetCurrentTab: this.handleSetCurrentTab, onChangeTab: this.handleChangeTab, onResetTab: this.handleResetTab, locationHistory: this.locationHistory }, this.props.children)
    );
  }
};
var IonRouter = withRouter(IonRouterInner);
IonRouter.displayName = "IonRouter";
var IonReactRouter = class extends import_react.default.Component {
  constructor(props) {
    super(props);
    const { history } = props, rest = __rest(props, ["history"]);
    this.history = history || createBrowserHistory(rest);
    this.history.listen(this.handleHistoryChange.bind(this));
    this.registerHistoryListener = this.registerHistoryListener.bind(this);
  }
  /**
   * history@4.x passes separate location and action
   * params. history@5.x passes location and action
   * together as a single object.
   * TODO: If support for React Router <=5 is dropped
   * this logic is no longer needed. We can just assume
   * a single object with both location and action.
   */
  handleHistoryChange(location, action) {
    const locationValue = location.location || location;
    const actionValue = location.action || action;
    if (this.historyListenHandler) {
      this.historyListenHandler(locationValue, actionValue);
    }
  }
  registerHistoryListener(cb) {
    this.historyListenHandler = cb;
  }
  render() {
    const _a = this.props, { children } = _a, props = __rest(_a, ["children"]);
    return import_react.default.createElement(
      Router,
      Object.assign({ history: this.history }, props),
      import_react.default.createElement(IonRouter, { registerHistoryListener: this.registerHistoryListener }, children)
    );
  }
};
var IonReactMemoryRouter = class extends import_react.default.Component {
  constructor(props) {
    super(props);
    this.history = props.history;
    this.history.listen(this.handleHistoryChange.bind(this));
    this.registerHistoryListener = this.registerHistoryListener.bind(this);
  }
  /**
   * history@4.x passes separate location and action
   * params. history@5.x passes location and action
   * together as a single object.
   * TODO: If support for React Router <=5 is dropped
   * this logic is no longer needed. We can just assume
   * a single object with both location and action.
   */
  handleHistoryChange(location, action) {
    const locationValue = location.location || location;
    const actionValue = location.action || action;
    if (this.historyListenHandler) {
      this.historyListenHandler(locationValue, actionValue);
    }
  }
  registerHistoryListener(cb) {
    this.historyListenHandler = cb;
  }
  render() {
    const _a = this.props, { children } = _a, props = __rest(_a, ["children"]);
    return import_react.default.createElement(
      Router,
      Object.assign({}, props),
      import_react.default.createElement(IonRouter, { registerHistoryListener: this.registerHistoryListener }, children)
    );
  }
};
var IonReactHashRouter = class extends import_react.default.Component {
  constructor(props) {
    super(props);
    const { history } = props, rest = __rest(props, ["history"]);
    this.history = history || createHashHistory(rest);
    this.history.listen(this.handleHistoryChange.bind(this));
    this.registerHistoryListener = this.registerHistoryListener.bind(this);
  }
  /**
   * history@4.x passes separate location and action
   * params. history@5.x passes location and action
   * together as a single object.
   * TODO: If support for React Router <=5 is dropped
   * this logic is no longer needed. We can just assume
   * a single object with both location and action.
   */
  handleHistoryChange(location, action) {
    const locationValue = location.location || location;
    const actionValue = location.action || action;
    if (this.historyListenHandler) {
      this.historyListenHandler(locationValue, actionValue);
    }
  }
  registerHistoryListener(cb) {
    this.historyListenHandler = cb;
  }
  render() {
    const _a = this.props, { children } = _a, props = __rest(_a, ["children"]);
    return import_react.default.createElement(
      Router,
      Object.assign({ history: this.history }, props),
      import_react.default.createElement(IonRouter, { registerHistoryListener: this.registerHistoryListener }, children)
    );
  }
};
export {
  IonReactHashRouter,
  IonReactMemoryRouter,
  IonReactRouter
};
//# sourceMappingURL=@ionic_react-router.js.map
