import './styles';
import Component from '../../core/Component';
import { $router } from '../../core/Router';

export default class Test extends Component {
  template() {
    return `
      <div class="test">This is Test area</div>
      <button>back</button>
    `;
  }

  setEvent() {
    this.addEvet('click', 'button', () => $router.push('/home'));
  }
}
