import { nanoid } from 'nanoid';

export default {
    id: nanoid(),
    name: 'Tools',
    title: '',
    url: 'tools',
    sublevel: {
        ptools: {
            id: nanoid(),
            name: 'Paint tools Paint tools',
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
                    sublevel: {
                        xxx: {
                            id: nanoid(),
                            name: 'XXX',
                            title: '',
                            url: '',
                            sublevel: {
                                xxx2: {
                                    id: nanoid(),
                                    name: 'XXX2',
                                    title: '',
                                    url: '',

                                },
                            },
                        },
                    },
                },
            },
        },
        zoom: {
            id: nanoid(),
            name: 'Zoom',
            title: '',
            url: '',
        },
        'color-picker': {
            id: nanoid(),
            name: 'Color picker',
            title: '',
            url: '',
        },
    },
};
