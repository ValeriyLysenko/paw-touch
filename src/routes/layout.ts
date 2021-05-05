import { nanoid } from 'nanoid';

export default {
    root: {
        id: nanoid(),
        name: 'Layout',
        title: '',
        url: 'layout',
    },
    children: {
        fullscreen: {
            id: nanoid(),
            name: 'Fullscreen',
            title: '',
            url: 'fullscreen',
        },
        hsplit: {
            id: nanoid(),
            name: 'Horizontal split',
            title: '',
            url: 'horizontal-split',
        },
        vsplit: {
            id: nanoid(),
            name: 'Vertical split',
            title: '',
            url: 'vertical-split',
        },
        rsplit: {
            id: nanoid(),
            name: 'Remove split',
            title: '',
            url: '',
        },
    },
};
