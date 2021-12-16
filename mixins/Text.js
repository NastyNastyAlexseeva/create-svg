import { createSvgNode, NS } from "../libs";

export class Text {
    constructor(svg) {

    }

    text() {
        this.setCreateText(this.textList);
    }

    setCreateText(list) {
        if (list && Array.isArray(list) && list.length) {
            list.forEach(item => {
                const { id, wrapper, text } = item;

                const $svg = document.getElementById(this.svg.id);

                // const $defs = $svg.getElementsByTagNameNS(NS, 'defs');
                // createSvgNode(id, 'text', $defs);
                // createSvgNode(id, 'tref', wrapper).setAttribute('xlink:href', `#${id}`);

                // if(text) {
                //     const $text = document.getElementById(id);
                //     $text.innerHTML = text;
                // }
            })
        }
    }
};