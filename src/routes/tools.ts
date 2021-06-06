import { nanoid } from 'nanoid';

export default {
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
                },
                paintbrush: {
                    id: nanoid(),
                    name: 'Paintbrush',
                    title: '',
                    url: '',
                },
                eraser: {
                    id: nanoid(),
                    name: 'Eraser',
                    title: '',
                    url: '',
                },
            },
        },
        zoom: {
            id: nanoid(),
            name: 'Zoom',
            title: '',
            url: '',
        },
    },
};
