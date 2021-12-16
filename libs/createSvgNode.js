import { NS } from "../libs/constants";

export const createSvgNode = (id, tag, wrapper) => {
    const $newElement = document.createElementNS(NS, tag);
    const $parrent = document.getElementById(wrapper);
    $newElement.id = id;
    $parrent.append($newElement);

    return $newElement;
};