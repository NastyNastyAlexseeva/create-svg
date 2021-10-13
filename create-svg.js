export class CreateSvg {
    constructor(wrapper, params) {
        const createSvg = this;
        createSvg.svg = params.svg;
        createSvg.elements = createSvg.svg.elements;

        createSvg.$wrapper = document.querySelector(wrapper);
        createSvg.$svg = document.getElementById(createSvg.svg.id);

        createSvg.attrSvg = createSvg.svg.attributes;

        createSvg.render();

    }

    render() {
        this.init();
    }

    init() {
        this.attributes();
    }

    attributes() {
        this.setAttributes(this.$svg, this.attrSvg);
        this.setElementsAttributes(this.svg.elements);
    }

    setAttributes(elementNode, attrs) {
        if(elementNode && attrs && Object.keys(attrs).length) {
            this.validationAttributes(attrs);

            for(const key in attrs) {
                elementNode.setAttribute(key, attrs[key]);
            }
        }
    }

    setElementsAttributes(elements) {
        if(elements && elements.length) {
            const addAttributesElement = (element) => {
                element.map(nested => {
                    this.validationAttributesElement(nested.attributes);

                    if(!nested.elements || !nested.elements.length) {
                        const $element = document.getElementById(nested.id);
                        this.setAttributes($element, nested.attributes);
                    } else {
                        addAttributesElement(nested.elements);
                    }
                })
            }

            addAttributesElement(elements);
        }
    }

    createElement(parentId, element) {
        if(element.create) {
            const $parent = document.getElementById(parentId);
            const $newElement = document.createElement(element.tag);
            this.setAttributes($newElement, element.id);
            $parent.appendChild($newElement);
        }
    }

    validationAttributes(attrs) {

        Object.assign(attrs, {
            version: this.typeOfValidation(attrs.version) || '1.1',
            xmlns: this.typeOfValidation(attrs.xmlns) || "http://www.w3.org/2000/svg",
            viewBox: this.typeOfValidation(attrs.viewBox),
            width: this.typeOfValidation(attrs.width, ['string', 'number']),
            height: this.typeOfValidation(attrs.height, ['string', 'number']),
            fill:  this.typeOfValidation(attrs.fill),
            'stroke-width': this.typeOfValidation(attrs.strokeWidth, ['string', 'number']),
            stroke: this.typeOfValidation(attrs.stroke),
        })

        delete attrs.strokeWidth;
        this.deleteInValidAttributes(attrs);
    }

    validationAttributesElement(attrs) {

        Object.assign(attrs, {
            width: this.typeOfValidation(attrs.width, ['string', 'number']),
            height: this.typeOfValidation(attrs.height, ['string', 'number']),
            fill:  this.typeOfValidation(attrs.fill),
            'stroke-width': this.typeOfValidation(attrs.strokeWidth, ['string', 'number']),
            stroke: this.typeOfValidation(attrs.stroke),
            cx: this.typeOfValidation(attrs.cx, ['string', 'number']),
            cy: this.typeOfValidation(attrs.cy, ['string', 'number']),
            r: this.typeOfValidation(attrs.r, ['string', 'number']),
            d: this.typeOfValidation(attrs.d),
        })

        this.deleteInValidAttributes(attrs);
    }

    typeOfValidation(value, types = ['string']) {
        const typesValid = types.some(type => {
            return typeof(value) === type;
        })

        return value && typesValid ? value : '';
    }

    deleteInValidAttributes(attrs) {
        for(const key in attrs) {
            if(!attrs[key]) delete attrs[key];
        }
    }

    destroy() {

    }
}