export default class Button {
  // valid types: icon, icon-solo, text, text-icon
  constructor(type, text, iconText) {
    this.icon;
    this.button = document.createElement("button");
    this.button.classList.add(type + "-button", "button");
    this.button.textContent = text;

    if (type == "icon" || type == "icon-solo") {
      this._makeIcon(this.button);
      this.button.textContent = iconText;
      this.button.ariaLabel = text;
    } else if (type == "text-icon") {
      this.icon = this._createIcon(iconText);
      this.button.append(this.icon);
    }

    return this.button;
  }

  // PRIVATE
  _makeIcon(container) {
    container.classList.add("material-symbols-outlined");
  }

  _createIcon(name) {
    const icon = document.createElement("i");
    this._makeIcon(icon);
    icon.textContent = name;
    return icon;
  }
}
