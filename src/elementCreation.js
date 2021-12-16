const ElementCreation = (() => {
  const createChildElementWithClass = (tag, className, parentElement) => {
    const element = document.createElement(tag);
    element.className = className;
    parentElement.appendChild(element);

    return element;
  };

  const createChildElementWithId = (tag, id, parentElement) => {
    const element = document.createElement(tag);
    element.id = id;
    parentElement.appendChild(element);

    return element;
  };

  const createChildElementWithClassAndId = (tag, className, id, parentElement) => {
    const element = document.createElement(tag);
    element.className = className;
    element.id = id;
    parentElement.appendChild(element);

    return element;
  };

  return {
    createChildElementWithClass,
    createChildElementWithId,
    createChildElementWithClassAndId,
  };
})();

export default ElementCreation;
