import './index.scss';
import { test } from './module';
import { logo } from './assets';

const $app = document.getElementById('app');
$app!.innerHTML = 'hello world';

const $back = document.createElement('div');
$back.classList.add('back');
$back.style.backgroundImage = `url(${logo})`;
$app?.append($back);

const arr = [1, 2, 3];
arr.includes(3);

console.log(test);
