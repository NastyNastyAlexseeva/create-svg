import { createSvgNode } from "../libs";
import { NS } from '../libs/constants';

export class CreateElements {
    constructor(svg) {

    }

    create() {
        this.setCreateSvg(this.svg);
        this.setCreateElements(this.svg);
        this.setCreateDefsNode(this.svg.id);
    }

    setCreateSvg(svg) {
        const { id, wrapper } = svg;
        if(id && wrapper) {
            createSvgNode(id, 'svg', wrapper);
        }
    }

    setCreateElements(svg) {
        const { elements } = svg;

        if(elements && Array.isArray(elements) && elements.length) {
            const watchElements = (list) => {
                list.forEach(item => {
                    const { isCreate, elements, id, tag } = item;
                    const parrentId = CreateElements.searchParentId(svg);

                    if(isCreate) {
                        if(elements && elements.length) {
                            createSvgNode(id, tag, parrentId);
                            watchElements(elements);
                        } else {
                            createSvgNode(id, tag, parrentId);
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

    setCreateDefsNode(id) {
        const $svg = document.getElementById(id);
        const $isNotDefs = !$svg.getElementsByTagNameNS(NS, 'defs') || !$svg.getElementsByTagNameNS(NS, 'defs').length;
        const $defs = document.createElementNS(NS, 'defs');
        
        if($svg && $isNotDefs) {
            $svg.prepend($defs);
        };
    }

    static searchParentId(childId) {
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

        watchElements(childId);
        return parrentId;
    }
}