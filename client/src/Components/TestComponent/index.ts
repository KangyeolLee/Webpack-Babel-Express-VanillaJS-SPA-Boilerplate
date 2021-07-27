import './styles';
import Component from '@/Core/Component';
import { html } from '@/utils/helper';
import TodoModel from '@/Model/TodoModel';
import { $router } from '@/Core/Router';

export default class TestComponent extends Component {
  model: any;

  setup() {
    this.model = TodoModel;
    this.model.subscribe('todo', 'TEST', this);
    this.$state = {
      todos: [...this.model.todos],
    };
  }

  template() {
    const { todos } = this.$state;
    console.log('re-rendering...');

    return html`
      <h1 class="title">이것은 컴포넌트 테스트 랍니다..!?</h1>
      <div class="model-test">
        ${todos
          ?.map(
            (todo: any) => `
              <div>${todo}</div>
            `
          )
          .join('')}
      </div>
      <div>${todos.length}</div>
      <button class="router">이동!</button>
    `;
  }

  setEvent() {
    this.addEvent('click', '.router', () => $router.push('/detail'));
  }
}
