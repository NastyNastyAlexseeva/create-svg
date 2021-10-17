export class Constructor {
    constructor(wrapper, params) {
        const createSvg = this;
        this.svg = params.svg;
        this.elements = params.svg.elements;

        createSvg.$wrapper = document.querySelector(wrapper);
        createSvg.$svg = document.getElementById(createSvg.svg.id);

        createSvg.attrSvg = createSvg.svg.attributes;
    }
}