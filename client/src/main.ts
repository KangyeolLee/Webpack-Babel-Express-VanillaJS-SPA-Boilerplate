import './reset';
import { initRouter, Route } from '@/Core/Router';
import Home from '@/View/Home/index';
import Detail from '@/View/Detail';

const $app = document.getElementById('app') as HTMLElement;
const routes: Route[] = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home },
  { path: '/detail', component: Detail },
];

function init() {
  initRouter({ $app, routes });
}

init();
