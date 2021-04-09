import { nanoid } from 'nanoid';

export default {
    root: {
        id: nanoid(),
        name: 'Layout',
        url: 'layout',
    },
    children: {
        fullscreen: {
            id: nanoid(),
            name: 'Fullscreen',
            url: 'fullscreen',
        },
        hsplit: {
            id: nanoid(),
            name: 'Horizontal-split',
            url: 'horizontal-split',
        },
        vsplit: {
            id: nanoid(),
            name: 'Vertical-split',
            url: 'vertical-split',
        },
    },
};
