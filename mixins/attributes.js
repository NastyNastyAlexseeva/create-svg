export class Attributes {
    constructor(svg) {

    }

    attributes() {
        const { elements, svg, id, textList } = this;

        this.setAddAttributes(id, svg.attributes);
        this.setAddElementsAttributes(elements);
        this.setAddTextAttributes(textList);
    }

    setAddAttributes(id, attrs) {
        const $element = document.getElementById(id);
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
    
    setAddTextAttributes(textList) {
        if(textList && Array.isArray(textList) && textList.length) {
            textList.forEach(text => {
                const { id, attributes, subTextList } = text;

                subTextList?.forEach(subText => {
                    const { id, attributes } = subText;

                    this.setValidationAttributesText(attributes);
                    this.setAddAttributes(id, attributes);
                })

                this.setValidationAttributesText(attributes);
                this.setAddAttributes(id, attributes);
            })
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

        const { setValidation, deleteInvalidAttributes } = Attributes;

        Object.assign(attrs, {
            style: setValidation(style),
            class: setValidation(className),
            width: setValidation(width, ['string', 'number']),
            height: setValidation(height, ['string', 'number']),
            fill: setValidation(fill),
            'fill-opacity': setValidation(fillOpacity, ['string', 'number']),
            'fill-rule': setValidation(fillRule, [], ['nonzero', 'evenodd']),
            'stroke-width': setValidation(strokeWidth, ['string', 'number']),
            'stroke-dasharray': setValidation(strokeDasharray),
            'stroke-dashoffset': setValidation(strokeDashoffset, ['string', 'number']),
            'stroke-linecap': setValidation(strokeLinecap, [], ['butt', 'round', 'square']),
            'stroke-linejoin': setValidation(strokeLinejoin, [], ['arcs', 'bevel', 'miter', 'miter-clip', 'round']),
            'stroke-miterlimit': setValidation(strokeMiterlimit, ['number']),
            'stroke-opacity': setValidation(strokeOpacity),
            stroke: setValidation(stroke),
        })

        deleteInvalidAttributes(attrs);

        return attrs;
    }

    setValidationAttributesSvg(attrs) {
        const {
            version, // svg version
            xmlns, // svg path
            viewBox, // position and dimension, in user space, of an SVG viewport
        } = attrs;

        const { setValidation, deleteInvalidAttributes } = Attributes;

        Object.assign(attrs, {
            version: setValidation(version),
            xmlns: setValidation(xmlns),
            viewBox: setValidation(viewBox),
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
        delete attrs.textAnchor;
        deleteInvalidAttributes(attrs);
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

        const { setValidation, deleteInvalidAttributes } = Attributes;

        Object.assign(attrs, {
            x: setValidation(x, ['string', 'number']),
            y: setValidation(y, ['string', 'number']),
            cx: setValidation(cx, ['string', 'number']),
            cy: setValidation(cy, ['string', 'number']),
            r: setValidation(r, ['string', 'number']),
            rx: setValidation(rx, ['string', 'number']),
            ry: setValidation(ry, ['string', 'number']),
            d: setValidation(d),
        }, this.setValidationAttributes(attrs));

        deleteInvalidAttributes(attrs);
    }

    setValidationAttributesText(attrs) {
        const {
            x, // x-axis coordinate in the user coordinate system
            y, // y-axis coordinate in the user coordinate system
            dx, // x-axis on the position of an element or its content
            dy, // y-axis on the position of an element or its content
            rotate, // animated element rotates
            textLength, // lets you specify the width of the space into which the text will draw
            textAnchor, // align
            lengthAdjust, // controls how the text is stretched into the length defined by the textLength
        } = attrs;

        const { setValidation, deleteInvalidAttributes } = Attributes;

        Object.assign(attrs, {
            x: setValidation(x, ['string', 'number']),
            y: setValidation(y, ['string', 'number']),
            dx: setValidation(dx, ['string', 'number']),
            dy: setValidation(dy, ['string', 'number']),
            rotate: setValidation(rotate, ['number'], ['auto', 'auto-reverse']),
            textLength: setValidation(textLength, ['number']),
            rotate: setValidation(rotate, ['number'], ['auto', 'auto-reverse']),
            'text-anchor': setValidation(textAnchor, [], ['start', 'middle', 'end', 'inherit']),
            lengthAdjust: setValidation(lengthAdjust, [], ['auto', 'spacing', 'spacingAndGlyphs']),
        }, this.setValidationAttributes(attrs));

        deleteInvalidAttributes(attrs);
    }

    static setValidation(value, types = ['string'], validValues = []) {
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

    static deleteInvalidAttributes(attrs) {
        for(const key in attrs) {
            if(!attrs[key]) delete attrs[key];
        };
    }
}