import { nanoid } from 'nanoid';

const config: NavRouterObj = {
    id: nanoid(),
    name: 'Tools',
    title: '',
    url: 'tools',
    sublevel: {
        ptools: {
            id: nanoid(),
            name: 'Paint tools',
            title: '',
            url: '',
            sublevel: {
                pencil: {
                    id: nanoid(),
                    name: 'Pencil',
                    title: '',
                    url: '',
                    dataType: 'pencil',
                    handler: 'tools',
                },
                paintbrush: {
                    id: nanoid(),
                    name: 'Paintbrush',
                    title: '',
                    url: '',
                    dataType: 'brush',
                    handler: 'tools',
                },
                eraser: {
                    id: nanoid(),
                    name: 'Eraser',
                    title: '',
                    url: '',
                    dataType: 'eraser',
                    handler: 'tools',
                },
            },
        },
        zoom: {
            id: nanoid(),
            name: 'Zoom',
            title: '',
            url: '',
            dataType: 'zoom',
            handler: 'tools',
        },
    },
};

export default config;
