const renderElement = (vNode) => {
    const element = document.createElement(vNode.tagName);

    // set attr
    for (const [key, value] of Object.entries(vNode.attrs)) {
        element.setAttribute(key, value);
    }

    // set  children
    for (const child of vNode.children) {
        element.appendChild(render(child));
    }

    return element;
};

const render = (vNode) => {
    if (typeof vNode === "string") {
        return document.createTextNode(vNode);
    }
    return renderElement(vNode);
};

export default render;
