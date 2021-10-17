export const mixins = (baseClass, ...addClasses) => {
    class Base extends baseClass {
        constructor(...args) {
            super(...args);
            this.args = args;
            addClasses.forEach((mixin) => {
                copyProps(this, mixin)
            })
        }
    }

    const copyProps = (target, mixin) => {
        Object.getOwnPropertyNames(mixin)
            .forEach((prop) => {
                Object.defineProperty(target, prop, Object.getOwnPropertyDescriptor(mixin, prop));
            })
    }

    addClasses.forEach((mixin) => {
        copyProps(Base.prototype, mixin.prototype);
        copyProps(Base, mixin);
    })

    return Base;
}

// mixins(attributes, constructor)