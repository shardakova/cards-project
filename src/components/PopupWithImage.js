import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._popupImage = this._popupElement.querySelector('.figure__image');
    this._popupImageText = this._popupElement.querySelector('.figure__caption');
  }

  open(imageTitle, imageSrc) {
    super.open();
    this._popupImage.alt = imageTitle;
    this._popupImage.src = imageSrc;
    this._popupImageText.textContent = imageTitle;
  }
}
