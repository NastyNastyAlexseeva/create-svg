export class Create {
    constructor(selector, params) {

    }

    create() {
        this.setCreateSvg(this.svg);
        this.setCreateElements(this.svg);
    }

    createNodeElement(id, tag, parrentId) {
        const ns = 'http://www.w3.org/2000/svg';

        const $newElement = document.createElementNS(ns, tag);
        const $parrent = document.getElementById(parrentId);
        $newElement.id = id;
        $parrent.appendChild($newElement);
    }

    setCreateSvg(svg) {
        const { id, parrentId } = svg;
        if(id && parrentId) {
            this.createNodeElement(id, 'svg', parrentId);
        }
    }

    setCreateElements(svg) {

        const { elements, id } = svg;

        if(elements && Array.isArray(elements) && elements.length) {
            const watchElements = (list) => {
                list.forEach(item => {
                    const { isCreate, elements, id, tag, attributes } = item;
                    const parrentId = this.searchParentId(this.svg, id);

                    if(isCreate) {
                        if(elements && elements.length) {
                            this.createNodeElement(id, tag, parrentId);
                            watchElements(elements);
                        } else {
                            this.createNodeElement(id, tag, parrentId);
                        }
                    } else {
                        if(elements && elements.length) {
                            watchElements(elements);
                        }
                    }
                });
            };

            watchElements(elements);
        }
    }

    searchParentId(svg, childId) {
        let parrentId = null;

        const watchElements = (list) => {
            if (list.elements && list.elements.length) {
                list.elements.forEach(item => {
                    const { elements, id } = item;
                    
                    if(elements && elements.length) {
                        if (id === childId) {
                            parrentId = list.id;
                        } else {
                            elements.forEach(a => {
                                parrentId = id;
                                watchElements(a);
                            });
                        }
                    } else {
                        if (id === childId) parrentId = list.id;
                    }
                });
            }

        };

        watchElements(svg);
        return parrentId;
    }
}