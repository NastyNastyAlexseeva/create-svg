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
            const watchElements = (element) => {
                element.map(nestedEl => {
                    const { attributes, elements, id } = nestedEl;

                    this.setValidationAttributesElement(attributes);

                    if(!elements || !elements.length) {
                        this.setAttributes(id, attributes);
                    } else {
                        watchElements(elements);
                    }
                });
            };

            watchElements(elements);
        }
    }

    setValidationAttributesSvg(attrs) {
        const { version, xmlns, viewBox, style, className,  width, height, fill, strokeWidth, strokeDasharray, strokeDashoffset, stroke } = attrs;

        Object.assign(attrs, {
            version: this.setValidation(version) ?? '1.1',
            xmlns: this.setValidation(xmlns) ?? "http://www.w3.org/2000/svg",
            viewBox: this.setValidation(viewBox),
            style: this.setValidation(style),
            class: this.setValidation(className),
            width: this.setValidation(width, ['string', 'number']),
            height: this.setValidation(height, ['string', 'number']),
            fill:  this.setValidation(fill),
            'stroke-width': this.setValidation(strokeWidth, ['string', 'number']),
            'stroke-dasharray': this.setValidation(strokeDasharray),
            'stroke-dashoffset': this.setValidation(strokeDashoffset, ['string', 'number']),
            stroke: this.setValidation(stroke),
        })

        delete attrs.strokeWidth;
        delete attrs.className;
        this.deleteInvalidAttributes(attrs);
    }

    setValidationAttributesElement(attrs) {
        const { style, className, width, height, fill, fillRule, strokeWidth, stroke, strokeDasharray, strokeDashoffset, x, y, cx, cy, r, d } = attrs;

        Object.assign(attrs, {
            style: this.setValidation(style),
            class: this.setValidation(className),
            width: this.setValidation(width, ['string', 'number']),
            height: this.setValidation(height, ['string', 'number']),
            fill:  this.setValidation(fill),
            'fill-rule': this.setValidation(fillRule, [], ['nonzero', 'evenodd']),
            'stroke-width': this.setValidation(strokeWidth, ['string', 'number']),
            'stroke-dasharray': this.setValidation(strokeDasharray),
            'stroke-dashoffset': this.setValidation(strokeDashoffset, ['string', 'number']),
            stroke: this.setValidation(stroke),
            x: this.setValidation(x, ['string', 'number']),
            y: this.setValidation(y, ['string', 'number']),
            cx: this.setValidation(cx, ['string', 'number']),
            cy: this.setValidation(cy, ['string', 'number']),
            r: this.setValidation(r, ['string', 'number']),
            d: this.setValidation(d),
        })

        delete attrs.fillRule;
        delete attrs.strokeDasharray;
        delete attrs.strokeDashoffset;
        this.deleteInvalidAttributes(attrs);
    }

    setValidation(value, types = ['string'], validValues = []) {
        let errorMessage = '';

        if(!types.length) types.push('string');

        const validType = types.some(type => {
            return typeof(value) === type;
        });

        const validValue = validValues.some(validValue => {
            return value === validValue;
        });

        if(value) {
            if(validType && validValue || validType && !validValues.length) {
                return value;
            } else {
                if(!validType) errorMessage = `Invalid type value attributes: expected ${types}`;
                if(!validValue) errorMessage = `Invalid value attributes: expected ${validValues}`;
                console.error(errorMessage);

                return null;
            };
        };

    }

    deleteInvalidAttributes(attrs) {
        for(const key in attrs) {
            if(!attrs[key]) delete attrs[key];
        }
    }
}