import { Attributes, Create } from "./mixins";
import { mixins, mutationObserver } from "./libs";

export class Svg extends mixins(Attributes, Create) {
    constructor(selector, params) {
        super(selector, params);
        this.selector = selector;

        this.render();
    }

    render() {
        this.observer(this.svg.parrentId ?`#${this.svg.parrentId}` : this.selector);
        this.init();
    }

    init() {
        this.attributes();
        this.create();
    }

    observer(selector) {
        let $element = document.querySelector(selector);
        mutationObserver($element, this.attributes.bind(this));
    }

    destroy() {

    }
}