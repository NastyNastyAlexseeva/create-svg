export const mixins = (...mixins) => {
    class Base {
        constructor (svg) {
            this.id = svg.id;
            this.svg = svg;
            this.elements = svg.elements ?? [];
            this.textList = svg.textList ?? [];

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