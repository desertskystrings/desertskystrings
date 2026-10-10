// DOM utils

function createEl(localName, textContent = "", id = "") {
  const element = document.createElement(localName);
  element.id = id;
  setTextContent(element, textContent);
  return element;
}

function setTextContent(el, textContent) {
  if (!el) {
    return;
  }
  if (typeof el === "string") {
    const element = getElementById(el);
    if (element) {
      element.textContent = textContent;
    }
    return;
  }

  el.textContent = textContent;
}

function setSrc(el, src) {
  if (!el) {
    return;
  }
  if (typeof el === "string") {
    const element = getElementById(el);
    if (element) {
      element.src = src;
    }
    return;
  }

  el.src = src;
}

function setHref(el, href) {
  if (!el) {
    return;
  }
  if (typeof el === "string") {
    const element = getElementById(el);
    if (element) {
      element.href = href;
    }
    return;
  }

  el.href = href;
}

function getElementById(id = "") {
  return document.getElementById(id);
}

function addChild(el, child, prepend = false) {
  if (!el) {
    return;
  }
  if (prepend) {
    return el.prepend(child);
  }
  return el.appendChild(child);
}

function removeElById(id) {
  const el = getElementById(id);
  if (el) {
    el.remove();
  }
}

export {
  createEl,
  setTextContent,
  getElementById,
  addChild,
  removeElById,
  setSrc,
  setHref,
};