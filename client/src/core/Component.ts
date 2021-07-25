export default class Component {
  $target: HTMLElement;
  $state: any;
  $props?: any;

  constructor($target: HTMLElement, $props?: any) {
    this.$target = $target;
    this.$props = $props;
  }

  setup() {}

  template() {
    return ``;
  }

  addEvet(eventType: string, selector: string, callback: Function) {
    const children: Element[] = [...this.$target.querySelectorAll(selector)];
    const isTarget = (target: Element) =>
      children.includes(target) || target.closest(selector);

    this.$target.addEventListener(eventType, (event: Event) => {
      if (!isTarget(event.target as Element)) return false;
      callback(event);
    });
  }

  setEvent() {}

  setState() {}

  render() {
    const template = this.template();

    if (template) {
      this.$target.innerHTML = template;
    }

    this.mounted();
  }

  mounted() {}
}