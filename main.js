import createElement from "./createElement";
import render from "./render";
import mount from "./mount";
import diff from "./diff";

const createVApp = (count) => {
    if (count % 2 == 0) {
        return createElement("div", {
            attrs: { id: "react-app", dataCount: count },
            children: [
                createElement("input"),
                String(count),
                createElement("img", {
                    attrs: { src: "https://media.giphy.com/media/gtvCT49o1ThFHfPtRS/giphy.gif" },
                }),
            ],
        });
    } else {
        return createElement("div", {
            attrs: { id: "react-app", dataCount: count },
            children: [createElement("input"), String(count)],
        });
    }
};

let count = 0;
let vDom = createVApp(count);
const dom = render(vDom);
mount(dom, document.getElementById("react-app"));

setInterval(() => {
    count++;
    const newVDom = createVApp(count);
    const patch = diff(vDom, newVDom);
    patch(document.getElementById("react-app"));
    vDom = newVDom;
}, 1000);
