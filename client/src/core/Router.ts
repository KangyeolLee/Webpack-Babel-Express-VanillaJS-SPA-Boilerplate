import { isClass } from '@/utils/types';
import { customEventEmitter } from '@/utils/helper';

export type RouterType = {
  $app: HTMLElement;
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
  fallback: string;

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
    document.addEventListener(
      'moveroutes',
      this.moveroutesHandler.bind(this) as EventListener
    );
    window.addEventListener('popstate', this.popstateHandler.bind(this));
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

  moveroutesHandler(event: CustomEvent) {
    const path: string = event.detail.path;
    history.pushState(event.detail, '', path);
    this.renderComponent(path, event.detail);
  }

  popstateHandler() {
    this.renderComponent(history.state.path, history.state);
  }

  renderComponent(path: string, detail: object) {
    let route: Route;

    if (this.hasRoute(path)) {
      route = this.getRoute(path);
    } else {
      route = this.getRoute(this.fallback);
    }

    if (route.redirect) {
      this.push(route.redirect);
      return;
    }

    console.log(route);

    const component = this.getComponent(route);
    if (component && isClass(component)) {
      this.unmountComponent();

      new component(this.$app, detail);
    } else {
      throw new Error('[라우터 에러] 유효한 형식의 라우터가 아닙니다.');
    }

    // console.log('현재 페이지를 언마운트(내용 초기화, 이벤트 제거)하고 나서');
    // console.log('해당하는 페이지로 history.pushState');
    // console.log('path에 해당하는 컴포넌트를 가져오고');
    // console.log('해당하는 컴포넌트를 화면에 렌더링!');
  }

  unmountComponent() {
    customEventEmitter('willbeunmounted');
  }

  push(path: string) {
    customEventEmitter('moveroutes', {
      ...history.state,
      path,
    });
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

  customEventEmitter(
    'moveroutes',
    history.state ?? {
      path: '/',
    }
  );
}
