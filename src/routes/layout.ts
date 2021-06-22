import { nanoid } from 'nanoid';

const config: NavRouterObj = {
    id: nanoid(),
    name: 'Layout',
    title: '',
    url: 'layout',
    sublevel: {
        fullscreen: {
            id: nanoid(),
            name: 'Fullscreen',
            title: '',
            url: 'fullscreen',
            handler: 'layout',
        },
        hsplit: {
            id: nanoid(),
            name: 'Horizontal split',
            title: '',
            url: 'horizontal-split',
            handler: 'layout',
        },
        vsplit: {
            id: nanoid(),
            name: 'Vertical split',
            title: '',
            url: 'vertical-split',
            handler: 'layout',
        },
        rsplit: {
            id: nanoid(),
            name: 'Remove split',
            title: '',
            url: '',
        },
    },
};

export default config;
