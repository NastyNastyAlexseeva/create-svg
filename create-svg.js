import { Attributes, CreateElements, Text } from "./mixins";
import { mixins, mutationObserver } from "./libs";

export class Svg extends mixins(Attributes, CreateElements, Text) {
    constructor(svg) {
        super(svg);
        this.svg = svg;
        this.render();
    }

    render() {
        this.observer(this.svg.id);
        this.init();
    }

    init() {
        this.attributes();
        this.create();
        this.text();
    }

    observer(id) {
        const $element = document.getElementById(id);
        mutationObserver($element, this.attributes.bind(this));
    }

    destroy() {

    }
}