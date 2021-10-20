import { Attributes, Create } from "./mixins";
import { mixins, mutationObserver } from "./libs";

export class Svg extends mixins(Attributes, Create) {
    constructor(selector, params) {
        super(selector, params);
        this.selector = selector;

        this.render();
    }

    render() {
        this.init();
    }

    init() {
        this.observer(this.svg.parrentId ?`#${this.svg.parrentId}` : this.selector);
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