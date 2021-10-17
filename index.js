import { Svg } from "./create-svg";

const createCircle = () => {
    const circle = new Svg('.circle-svg', {
        svg: {
            id: 'circle',
            attributes: {
                width: 300,
                height: 300,
                fill: '#000',
                stroke: 'red',
                strokeWidth: 1,
                viewBox: '0 0 120 120',
            }
        },
    });

    const attrsCircle = new Svg('.attrs-svg', {
        svg: {
            id: 'attrs-circle',
            attributes: {
                version: '1.0',
                xmlns: "http://www.w3.org/2000/svg",
                width: 300,
                height: 300,
                fill: '#000',
                strokeWidth: 1,
                viewBox: '0 0 120 120',
            }
        },
    });

    const inlineStyle = new Svg('.inline-style', {
        svg: {
            id: 'circle-inline-style',
            attributes: {
                version: '1.1',
                xmlns: "http://www.w3.org/2000/svg",
                width: 300,
                height: 300,
                strokeWidth: 1,
                viewBox: '0 0 120 120',
                style: 'fill: blue; stroke: gold',
            }
        },
    });

    const elements = new Svg('.elements-svg', {
        svg: {
            id: 'elements-group',
            attributes: {
                version: '1.1',
                xmlns: "http://www.w3.org/2000/svg",
                width: 300,
                height: 300,
                fill: '#000',
                stroke: 'red',
                viewBox: '0 0 120 120',
            },
            elements: [
                {
                    id: 'circle',
                    type: 'circle',
                    attributes: {
                        cx: 60,
                        cy: 60,
                        r: 50,
                        fill: 'blue',
                        stroke: '#000',
                        strokeWidth: 2,
                    }
                },
                {
                    id: 'circle-min',
                    type: 'circle',
                    attributes: {
                        cx: 40,
                        cy: 40,
                        r: 40,
                        fill: 'red',
                        stroke: '#000',
                        strokeWidth: 1,
                    }
                },
                {
                    id: 'group-1',
                    type: 'group',
                    attributes: {
                        fill: 'blue',
                        stroke: '#000',
                        strokeWidth: 2,
                    },
                    elements: [
                        {
                            id: 'circle-3',
                            type: 'circle',
                            attributes: {
                                cx: 70,
                                cy: 70,
                                r: 60,
                                fill: 'violet',
                                stroke: '#000',
                                strokeWidth: 2,
                            }
                        },
                        {
                            id: 'group-2',
                            type: 'group',
                            attributes: {
                                fill: 'blue',
                                stroke: '#000',
                                strokeWidth: 10,
                            },
                            elements: [
                                {
                                    id: 'circle-4',
                                    type: 'circle',
                                    attributes: {
                                        cx: 10,
                                        cy: 10,
                                        r: 50,
                                        fill: 'green',
                                        stroke: '#000',
                                        strokeWidth: 1,
                                    },
                                },
                                {
                                    id: 'circle-5',
                                    type: 'circle',
                                    attributes: {
                                        cx: 20,
                                        cy: 20,
                                        r: 30,
                                        fill: 'gold',
                                        stroke: '#000',
                                        strokeWidth: 4,
                                    },
                                },
                            ],
                        },
                    ],
                }

            ]
            
        },
    });

    const bunny = new Svg('.bunny-svg', {
        svg: {
            id: 'bunny',
            attributes: {
                version: '1.1',
                xmlns: "http://www.w3.org/2000/svg",
                width: 400,
                height: 400,
                x: 0,
                y: 0,
                strokeWidth: 1,
                viewBox: '0 0 512 512',
                style: 'enable-background:new 0 0 512 512;',
                xmlSpace: 'preserve',
            },
            elements: [
                {   id: 'circle-1',
                    type: 'circle',
                    attributes: {
                        style: 'fill:#FC6F58;',
                        cx: "256",
                        cy: "256",
                        r: "256",
                    }
                },
                {   id: 'path-1',
                    type: 'path',
                    attributes: {
                        style: 'fill:#F1543F;',
                        d: "M292.374,509.416c119.443-16.993,212.325-116.412,219.203-238.828L309.198,68.21l-19.518,87.681l-73.888-73.888l12.69,123.942l-36.266,203.312L292.374,509.416z",
                    }
                },
                {   id: 'circle-2',
                    type: 'circle',
                    attributes: {
                        style: 'fill:#EDB9D7;',
                        cx: 256,
                        cy: "327.111",
                        r: "71.111",
                    }
                }
            ]
        },
    });

    const createCircle = new Svg('.create-svg', {
        svg: {
            id: 'create-circle',
            attributes: {
                version: '1.1',
                xmlns: "http://www.w3.org/2000/svg",
                width: 300,
                height: 300,
                fill: '#000',
                stroke: 'red',
                strokeWidth: 1,
                viewBox: '0 0 120 120',
            },
            elements: [
                {
                    id: 'circle-cr-1',
                    tag: 'circle',
                    attributes: {
                        cx: 60,
                        cy: 60,
                        r: 50,
                        fill: 'blue',
                        stroke: '#000',
                        strokeWidth: 2,
                    }
                },
                {
                    id: 'group-cr-1',
                    tag: 'g',
                    attributes: {
                        fill: 'blue',
                        stroke: '#000',
                        strokeWidth: 2,
                    },
                    elements: [
                        {
                            id: 'group-cr-2',
                            create: true,
                            tag: 'g',
                            attributes: {
                                fill: 'blue',
                                stroke: '#000',
                                strokeWidth: 10,
                            },
                            elements: [
                                {
                                    id: 'circle-cr-2',
                                    create: true,
                                    tag: 'circle',
                                    attributes: {
                                        cx: 10,
                                        cy: 10,
                                        r: 50,
                                        fill: 'green',
                                        stroke: '#000',
                                        strokeWidth: 1,
                                    },
                                },
                            ],
                        },
                    ],
                }

            ]
        },
    });

}

createCircle();