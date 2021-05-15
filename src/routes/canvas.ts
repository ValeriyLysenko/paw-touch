import { nanoid } from 'nanoid';

export default {
    id: nanoid(),
    name: 'Canvas',
    title: '',
    url: 'canvas',
    sublevel: {
        'new-canvas': {
            id: nanoid(),
            name: 'New canvas',
            title: '',
            url: 'new-canvas',
        },
        save: {
            id: nanoid(),
            name: 'Save',
            title: '',
            url: '',
        },
        'save-as': {
            id: nanoid(),
            name: 'Save as...',
            title: '',
            url: '',
        },
        clear: {
            id: nanoid(),
            name: 'Clear',
            title: '',
            url: '',
        },
        exit: {
            id: nanoid(),
            name: 'Exit',
            title: '',
            url: '',
        },
    },
};
