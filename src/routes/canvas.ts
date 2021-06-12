import { nanoid } from 'nanoid';

const config: NavRouterObj = {
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
            dataType: 'new-canvas',
            handler: 'newCanvas',
        },
        save: {
            id: nanoid(),
            name: 'Download',
            title: '',
            url: '',
            dataType: 'download',
            handler: 'downloadCanvas',
        },
        'save-as': {
            id: nanoid(),
            name: 'Save to gallery',
            title: '',
            url: '',
            dataType: 'save',
            handler: 'saveToGallery',
        },
        clear: {
            id: nanoid(),
            name: 'Clear',
            title: '',
            url: '',
            dataType: 'clear',
            handler: 'clearCanvas',
        },
        exit: {
            id: nanoid(),
            name: 'Exit',
            title: '',
            url: '',
        },
    },
};

export default config;
