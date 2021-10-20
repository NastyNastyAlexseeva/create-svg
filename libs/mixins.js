export const mixins = (...mixins) => {
    class Base {
        constructor (selector, params) {
            this.svgSelector = params.id ?? selector;
            this.svg = params;
            this.elements = params.elements ?? [];

            mixins.forEach((mixin) => {
                copyProps(this, mixin.prototype);
            });
        }
    }

    let copyProps = (target, source) => {
        Object.getOwnPropertyNames(source)
            .forEach((prop) => {
                Object.defineProperty(target, prop, Object.getOwnPropertyDescriptor(source, prop));
            }); 
    };
    
    return Base;
}