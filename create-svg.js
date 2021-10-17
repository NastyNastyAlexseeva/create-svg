import { Attributes } from "./attributes";
import { Constructor } from "./constructor";
import { mixins } from "./mixins";

export class Svg extends mixins(Constructor, Attributes) {
    constructor(wrapper, params) {
        super(wrapper, params);

        this.render();
    }

    render() {
        this.init();
    }

    init() {
        this.addAttributes();
    }

    destroy() {

    }
}