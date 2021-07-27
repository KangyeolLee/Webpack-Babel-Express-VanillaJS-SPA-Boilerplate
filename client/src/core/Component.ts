export default class Component {
  $target: HTMLElement;
  $state: any;
  $props?: any;

  constructor($target: HTMLElement, $state?: any, $props?: any) {
    this.$target = $target;
    this.$state = $state;
    this.$props = $props;
    this.setup();
    this.render();
    this.setEvent();
    this.setUnmountEvent();
  }

  setup() {}

  template() {
    return ``;
  }

  addEvent(eventType: string, selector: string, callback: Function) {
    const children: Element[] = [...this.$target.querySelectorAll(selector)];
    const isTarget = (target: Element) =>
      children.includes(target) || target.closest(selector);

    this.$target.addEventListener(eventType, (event: Event) => {
      if (!isTarget(event.target as Element)) return false;
      callback(event);
    });
  }

  setEvent() {}

  setState(nextState: any) {
    this.$state = { ...this.$state, ...nextState };
    this.render();
  }

  render() {
    const template = this.template();

    if (template) {
      this.$target.innerHTML = template;
    }

    this.mounted();
  }

  mounted() {}

  setUnmountEvent() {
    document.addEventListener(
      'willbeunmounted',
      this.willbeunmounted.bind(this)
    );
  }

  willbeunmounted() {}
}
