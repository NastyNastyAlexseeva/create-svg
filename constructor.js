export class Constructor {
    constructor(wrapper, params) {
        const { svg, svg: { elements }} = params;
        
        this.svg = svg;
        this.elements = elements;

        this.$wrapper = document.querySelector(wrapper);
    }
}