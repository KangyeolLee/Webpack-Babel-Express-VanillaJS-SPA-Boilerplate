import './styles';
import Component from '@/Core/Component';
import { html, customEventEmitter } from '@/utils/helper';
import TestComponent from '@/Components/TestComponent';
import TodoModel from '@/Model/TodoModel';
import { addMint, tea } from '@/assets';
import TodoController from '@/Controller/TodoController';
import { $router } from '@/Core/Router';

export default class Home extends Component {
  model: any;
  controller: any;

  setup() {
    this.model = TodoModel;
    this.controller = TodoController;
    this.model.subscribe('todo', 'HOME', this);
    this.$state = {
      todos: [...this.model.todos],
    };
  }

  template() {
    const { todos } = this.$state;

    return html`
      <div class="class-test" id="id-test">
        <div class="title-wrapper">
          <img src=${tea} />
          <h1>ToDoList Test With Model-View Observer Pattern</h1>
        </div>
        <div class="button-area">
          <img class="add-data" src=${addMint}></img>
          <span>todo 추가</div>
        </div>
        <div class="todo-render">
          ${todos
            ?.map(
              (todo: any) => `
          <div>${todo}</div>
        `
            )
            .join('')}
        </div>
        <div>${todos.length}</div>
        <div class="component"></div>
      </div>
    `;
  }

  handleClick() {
    this.model.addTodo('todo', 'test');
  }

  mounted() {
    const $component = this.$target.querySelector('.component') as HTMLElement;
    new TestComponent($component);
  }

  setEvent() {
    // this.addEvent('click', '.add-data', () => this.handleClick());
    this.addEvent(
      'click',
      '.add-data',
      this.controller.handleClickAddBtn.bind(this)
    );
  }

  willbeunmounted() {
    console.log('this page will be unmounted : Home');
    console.log(this.$target);
    // const $new = this.$target.cloneNode(true);
    // this.$target.parentNode?.replaceChild($new, this.$target);
    // console.log(this.$target);
    // this.$target.innerHTML = '';
  }
}
