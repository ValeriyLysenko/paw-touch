import { nanoid } from 'nanoid';

export default {
    root: {
        id: nanoid(),
        name: 'Canvas',
        url: 'canvas',
    },
    children: {
        'new-canvas': {
            id: nanoid(),
            name: 'New canvas',
            url: 'new-canvas',
        },
        save: {
            id: nanoid(),
            name: 'Save',
            url: '',
        },
        'save-as': {
            id: nanoid(),
            name: 'Save as...',
            url: '',
        },
        clear: {
            id: nanoid(),
            name: 'Clear',
            url: '',
        },
        exit: {
            id: nanoid(),
            name: 'Exit',
            url: '',
        },
    },
};
