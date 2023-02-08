import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }

  open(imageTitle, imageSrc) {
    super.open();
    const popupImage = this._popupElement.querySelector('.figure__image');
    popupImage.alt = imageTitle;
    popupImage.src = imageSrc;
    const popupImageText = this._popupElement.querySelector('.figure__caption');
    popupImageText.textContent = imageTitle;
  }
}
