export default class Section {
  constructor({items, renderer}, container) {
    this._items = items;
    this._renderer = renderer;
    this._container = container;
  }

  render() {
    this._items.forEach(card => {
      this._container.prepend(this._renderer(card));
    });
  }

  addItem(card) {
    this._items.push(card);
    this._container.prepend(this._renderer(card));
  }
}
