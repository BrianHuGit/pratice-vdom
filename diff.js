import render from "./render";

const diff = (oldVNode, newVNode) => {
    // console.log(oldVNode, newVNode);
    if (newVNode === undefined) {
        return (node) => {
            node.replaceWith();
        };
    }

    // string -> element: replace with render
    // string -> string: replace with render
    // element -> string: replace with renders
    if (typeof oldVNode === "string" || typeof newVNode === "string") {
        if (oldVNode !== newVNode) {
            return (node) => {
                node.replaceWith(render(newVNode));
            };
        }
    }

    if (oldVNode.tagName !== newVNode.tagName) {
        return (node) => {
            node.replaceWith(render(newVNode));
        };
    }

    const patchAttrs = diffAttrs(oldVNode.attrs, newVNode.attrs);
    const patchChildren = diffChildren(oldVNode.children, newVNode.children);

    return (node) => {
        patchAttrs(node);
        patchChildren(node);
    };
};

const diffAttrs = (oldAttrs, newAttrs) => {
    const patches = [];

    // set new attr
    for (const [key, value] of Object.entries(newAttrs)) {
        patches.push((node) => node.setAttribute(key, value));
    }

    // remove old attr
    for (const key in oldAttrs) {
        if (!(key in newAttrs)) {
            patches.push((node) => node.removeAttrbute(key));
        }
    }

    return (node) => {
        for (const patch of patches) {
            patch(node);
        }
    };
};

const zip = (xs, ys) => {
    const zipped = [];

    for (let i = 0; i < Math.min(xs.length, ys.length); i++) {
        zipped.push([xs[i], ys[i]]);
    }

    return zipped;
};

const diffChildren = (oldChildren, newChildren) => {
    const patches = [];

    for (const [oldChild, newChild] of zip(oldChildren, newChildren)) {
        patches.push(diff(oldChild, newChild));
    }

    const appendPatches = [];
    for (const newChild of newChildren.slice(oldChildren.length)) {
        appendPatches.push((node) => node.appendChild(render(newChild)));
    }

    // if oldChildren.length grater than newChildren.length, it means we have to remove some node
    for (let i = 0; i < oldChildren.length - newChildren.length; i++) {
        patches.push((node) => node.replaceWith());
    }

    return (parent) => {
        for (const [child, patch] of zip(parent.childNodes, patches)) {
            patch(child);
        }
        for (const patch of appendPatches) {
            patch(parent);
        }
    };
};

export default diff;
