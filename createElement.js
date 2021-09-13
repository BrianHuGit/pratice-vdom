export default (tagName, { attrs = {}, children = [] } = {}) => {
    return {
        tagName: tagName,
        attrs: attrs,
        children: children,
    };
};
