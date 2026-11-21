/*
  @author jcoreaa@unah.hn 20231003748
  @author acxel.canales@unah.hn 20241000716
  @author janior.barahona@unah.hn 20221003748
  @author jose.inestroza@unah.edu.hn
  @version v0.2.0
  @date 20/11/26
 */
const createElement = (name, content, style = {}, action = () => null) => {
    const element = document.createElement(name);
    element.onclick = action;
    element.innerText = content;
    Object.assign(element.style, style);
    return element;
};

const createDialog = (id, buttonContent, dialogContent, buttonStyle = {}, dialogStyle = {}) => {
    const openButton = document.createElement('button');
    openButton.setAttribute('commandfor', id);
    openButton.setAttribute('command', 'show-modal');
    openButton.innerText = buttonContent;
    Object.assign(openButton.style, buttonStyle);

    const closeButton = document.createElement('button');
    closeButton.onclick = () => dialog.close();
    closeButton.innerText = 'Cerrar';
    Object.assign(closeButton.style, buttonStyle);

    const dialog = document.createElement('dialog');
    dialog.id = id;
    if (dialogContent != null) dialog.appendChild(dialogContent);
    dialog.appendChild(closeButton);
    Object.assign(dialog.style, dialogStyle);
    return [openButton, dialog];
};

export { createElement, createDialog };
