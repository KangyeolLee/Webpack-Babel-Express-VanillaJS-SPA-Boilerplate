import './styles';
import Component from '@/Core/Component';
import { html } from '@/utils/helper';
import TodoModel from '@/Model/TodoModel';

export default class Detail extends Component {
  model: any;

  setup() {
    //동일하게 TodoModel을 구독해봅시다.
    this.model = TodoModel;
    this.model.subscribe('todo', 'ANOTHER', this);
    this.$state = {
      todos: [...this.model.todos],
    };
  }

  template() {
    const { todos } = this.$state;
    return html`
      <div class="detail">여기는 디테일 페이지!</div>
      <div>앞서 추가한 항목과 동일한 내용 렌더링 합니다. (구독중)</div>
      <div class="render-model">
        ${todos
          ?.map(
            (todo: any) => `
            <div>${todo}</div>
          `
          )
          .join('')}
      </div>
    `;
  }
}
