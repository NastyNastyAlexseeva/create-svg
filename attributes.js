import { Constructor } from "./constructor";

export class Attributes extends Constructor {
    constructor(wrapper, params) {
        super(wrapper, params);
    }

    attributes() {
        this.setAttributes(this.$svg, this.attrSvg);
        this.setElementsAttributes(this.elements);
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
                    // this.validationAttributesElement(nested.attributes);

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
}