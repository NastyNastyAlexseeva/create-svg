export class Attributes {
    constructor(selector, params) {

    }

    attributes() {
        const { elements, svg, svgSelector } = this;

        this.setAddAttributes(svgSelector, svg.attributes);
        this.setAddElementsAttributes(elements);
    }

    setAddAttributes(selector, attrs) {
        const $element = document.querySelector(selector) ?? document.getElementById(selector);
        if($element && attrs && Object.keys(attrs).length) {
            this.setValidationAttributesSvg(attrs);

            for(const key in attrs) {
                $element.setAttribute(key, attrs[key]);
            };
        }
    }

    setAddElementsAttributes(elements) {
        if(elements && Array.isArray(elements) && elements.length) {
            const watchElements = (list) => {
                list.map(item => {
                    const { attributes, elements, id } = item;

                    this.setValidationAttributesElement(attributes);
                    this.setAddAttributes(id, attributes);
                    if(elements && elements.length) {
                        watchElements(elements);
                    }
                });
            };

            watchElements(elements);
        }
    }

    setValidationAttributes(attrs) {
        const {
            style, // css inline style
            className, // class name element
            width, // width element
            height, // height element
            fill, // background-color
            fillOpacity, // background opacity color
            fillRule, // inside part of a shape
            strokeWidth, // width border
            strokeDasharray, // border style
            strokeDashoffset, // offset on the rendering of the associated dash array
            strokeLinecap, // shape to be used at the end of open subpaths they are stroked
            strokeLinejoin, // shape to be used at the corners of paths when they are stroked
            strokeMiterlimit, // defining a limit on the ratio of the miter length to the stroke-width used to draw a miter join
            strokeOpacity, // border opacity
            stroke // border color
        } = attrs;

        Object.assign(attrs, {
            style: this.setValidation(style),
            class: this.setValidation(className),
            width: this.setValidation(width, ['string', 'number']),
            height: this.setValidation(height, ['string', 'number']),
            fill: this.setValidation(fill),
            'fill-opacity': this.setValidation(fillOpacity, ['string', 'number']),
            'fill-rule': this.setValidation(fillRule, [], ['nonzero', 'evenodd']),
            'stroke-width': this.setValidation(strokeWidth, ['string', 'number']),
            'stroke-dasharray': this.setValidation(strokeDasharray),
            'stroke-dashoffset': this.setValidation(strokeDashoffset, ['string', 'number']),
            'stroke-linecap': this.setValidation(strokeLinecap, [], ['butt', 'round', 'square']),
            'stroke-linejoin': this.setValidation(strokeLinejoin, [], ['arcs', 'bevel', 'miter', 'miter-clip', 'round']),
            'stroke-miterlimit': this.setValidation(strokeMiterlimit, ['number']),
            'stroke-opacity': this.setValidation(strokeOpacity),
            stroke: this.setValidation(stroke),
        })

        this.deleteInvalidAttributes(attrs);

        return attrs;
    }

    setValidationAttributesSvg(attrs) {
        const {
            version, // svg version, default 1.1
            xmlns, // svg path, default http://www.w3.org/2000/svg
            viewBox, // position and dimension, in user space, of an SVG viewport
        } = attrs;

        Object.assign(attrs, {
            version: this.setValidation(version) ?? '1.1',
            xmlns: this.setValidation(xmlns) ?? "http://www.w3.org/2000/svg",
            viewBox: this.setValidation(viewBox),
        }, this.setValidationAttributes(attrs));

        // delete CamelCase attributes
        delete attrs.strokeWidth;
        delete attrs.className;
        delete attrs.strokeLinecap;
        delete attrs.strokeLinejoin;
        delete attrs.strokeMiterlimit;
        delete attrs.fillRule;
        delete attrs.strokeDasharray;
        delete attrs.strokeDashoffset;
        delete attrs.strokeOpacity;
        delete attrs.fillOpacity;
        this.deleteInvalidAttributes(attrs);
    }

    setValidationAttributesElement(attrs) {
        const {
            x, // x-axis coordinate in the user coordinate system
            y, // y-axis coordinate in the user coordinate system
            cx, // circle and ellipse the x-axis coordinate of a center point
            cy, // circle and ellipse the y-axis coordinate of a center point
            r, // circle radius
            rx, // ellipse and rect radius on the x-axis
            ry, // ellipse and rect radius on the y-axis
            d // path coordinates
        } = attrs;

        Object.assign(attrs, {
            x: this.setValidation(x, ['string', 'number']),
            y: this.setValidation(y, ['string', 'number']),
            cx: this.setValidation(cx, ['string', 'number']),
            cy: this.setValidation(cy, ['string', 'number']),
            r: this.setValidation(r, ['string', 'number']),
            rx: this.setValidation(rx, ['string', 'number']),
            ry: this.setValidation(ry, ['string', 'number']),
            d: this.setValidation(d),
        }, this.setValidationAttributes(attrs));

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
            }
        }

    }

    deleteInvalidAttributes(attrs) {
        for(const key in attrs) {
            if(!attrs[key]) delete attrs[key];
        };
    }
}