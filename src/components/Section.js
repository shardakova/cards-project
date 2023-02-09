export default class Section {
  constructor({items, renderer}, container) {
    this._items = items;
    this._renderer = renderer;
    this._container = container;
  }

  renderItems() {
    this._items.forEach(card => {
      this._container.append(this._renderer(card));
    });
  }

  addItem(card) {
    this._container.prepend(this._renderer(card));
  }
}
