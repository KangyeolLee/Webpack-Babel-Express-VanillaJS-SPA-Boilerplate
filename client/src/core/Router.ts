import { isClass } from '../utils/types';

export type RouterType = {
  $app: any;
  routes: Route[];
  fallback?: string;
};

export type Route = {
  path: string;
  redirect?: string;
  component?: any;
};

class Router {
  $app: HTMLElement;
  routes: {
    [key: string]: Route;
  } = {};
  fallback: string = '/';

  constructor({ $app, routes, fallback = '/' }: RouterType) {
    this.$app = $app;
    this.fallback = fallback;
    this.generateRoutes(routes);
    this.initEvent();
  }

  generateRoutes(routes: Route[]) {
    routes.forEach((route: Route) => {
      this.routes[route.path] = route;
    });
  }

  initEvent() {
    window.addEventListener('hashchange', () => this.onHashChangeHandler());
  }

  getRoute(path: string) {
    const route: Route = this.routes[path];
    if (!route)
      throw new Error('[라우트 에러] 해당 경로 라우트를 찾을 수 없습니다.');

    return route;
  }

  hasRoute(path: string) {
    return typeof this.routes[path] !== 'undefined';
  }

  getComponent(route: Route) {
    const component = route.component;
    return component;
  }

  onHashChangeHandler() {
    this.$app.innerHTML = '';

    const hash = window.location.hash;
    const path = hash.substr(1);

    let route: Route;
    const regex = /\w{1,}$/;

    if (this.hasRoute(path)) {
      route = this.getRoute(path);
    } else if (regex.test(path)) {
      route = this.getRoute(path.replace(regex, ':id'));
    } else {
      route = this.getRoute(this.fallback);
    }

    if (route.redirect) {
      this.push(route.redirect);
      return;
    }

    const component = this.getComponent(route);
    if (component && isClass(component)) {
      new component(this.$app);
    } else {
      throw new Error('[라우터 에러] 유효한 형식의 라우터가 아닙니다.');
    }
  }

  push(path: string) {
    window.location.hash = path;
  }
}

export let $router: {
  push: (path: string) => void;
};

export function initRouter(options: RouterType) {
  const router = new Router(options);

  $router = {
    push: (path) => router.push(path),
  };

  router.onHashChangeHandler();
}
