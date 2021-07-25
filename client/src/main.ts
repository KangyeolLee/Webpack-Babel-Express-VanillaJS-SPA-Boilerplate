import './reset';
import { initRouter, Route } from './core/Router';
import Home from './Components/Home';
import Test from './Components/Test';

const $app = document.getElementById('app');
const routes: Route[] = [
  { path: '/', redirect: '/home' },
  { path: '/home', component: Home },
  { path: '/test', component: Test },
];

function init() {
  initRouter({ $app, routes });
}

init();
