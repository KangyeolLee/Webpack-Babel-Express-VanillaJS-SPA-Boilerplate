import './styles';
import Component from '../../core/Component';
import { $router } from '../../core/Router';

export default class Home extends Component {
  template() {
    return `
      <div class="home">this is home area</div>
      <button>click</button>
    `;
  }

  setEvent() {
    this.addEvet('click', 'button', () => $router.push('/test'));
  }
}
