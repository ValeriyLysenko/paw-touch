import { nanoid } from 'nanoid';

export default {
    root: {
        id: nanoid(),
        name: 'Canvas',
        title: 'Canvas',
        url: 'canvas',
    },
    children: {
        new: {
            id: nanoid(),
            name: 'New canvas',
            title: 'New canvas',
            url: 'new',
        },
        save: {
            id: nanoid(),
            name: 'Save',
            title: 'Save',
            url: '',
        },
        'save-as': {
            id: nanoid(),
            name: 'Save as...',
            title: 'Save as...',
            url: '',
        },
        clear: {
            id: nanoid(),
            name: 'Clear',
            title: 'Clear',
            url: '',
        },
        exit: {
            id: nanoid(),
            name: 'Exit',
            title: 'Exit',
            url: '',
        },
    },
};
