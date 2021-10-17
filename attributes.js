import { Constructor } from "./constructor";

export class Attributes extends Constructor {
    constructor(wrapper, params) {
        super(wrapper, params);
    }

    addAttributes() {
        const { elements, svg } = this;
        this.setAttributes(svg.id, svg.attributes);
        this.setElementsAttributes(elements);
    }

    setAttributes(id, attrs) {
        const $element = document.getElementById(id);

        if($element && attrs && Object.keys(attrs).length) {
            this.setValidationAttributesSvg(attrs);

            for(const key in attrs) {
                $element.setAttribute(key, attrs[key]);
            }
        }
    }

    setElementsAttributes(elements) {
        if(elements && elements.length) {
            const addAttributesElement = (element) => {
                element.map(nestedEl => {
                    const { attributes, elements, id } = nestedEl;

                    this.setValidationAttributesElement(attributes);

                    if(!elements || !elements.length) {
                        this.setAttributes(id, attributes);
                    } else {
                        addAttributesElement(elements);
                    }
                });
            };

            addAttributesElement(elements);
        }
    }

    setValidationAttributesSvg(attrs) {

        Object.assign(attrs, {
            version: this.setTypeValidation(attrs.version) ?? '1.1',
            xmlns: this.setTypeValidation(attrs.xmlns) ?? "http://www.w3.org/2000/svg",
            viewBox: this.setTypeValidation(attrs.viewBox),
            width: this.setTypeValidation(attrs.width, ['string', 'number']),
            height: this.setTypeValidation(attrs.height, ['string', 'number']),
            fill:  this.setTypeValidation(attrs.fill),
            'stroke-width': this.setTypeValidation(attrs.strokeWidth, ['string', 'number']),
            stroke: this.setTypeValidation(attrs.stroke),
        })

        delete attrs.strokeWidth;
        this.deleteInvalidAttributes(attrs);
    }

    setValidationAttributesElement(attrs) {

        Object.assign(attrs, {
            width: this.setTypeValidation(attrs.width, ['string', 'number']),
            height: this.setTypeValidation(attrs.height, ['string', 'number']),
            fill:  this.setTypeValidation(attrs.fill),
            'stroke-width': this.setTypeValidation(attrs.strokeWidth, ['string', 'number']),
            stroke: this.setTypeValidation(attrs.stroke),
            cx: this.setTypeValidation(attrs.cx, ['string', 'number']),
            cy: this.setTypeValidation(attrs.cy, ['string', 'number']),
            r: this.setTypeValidation(attrs.r, ['string', 'number']),
            d: this.setTypeValidation(attrs.d),
        })

        this.deleteInvalidAttributes(attrs);
    }

    setTypeValidation(value, types = ['string']) {
        const typesValid = types.some(type => {
            return typeof(value) === type;
        })

        return value && typesValid ? value : null;

    }

    deleteInvalidAttributes(attrs) {
        for(const key in attrs) {
            if(!attrs[key]) delete attrs[key];
        }
    }
}