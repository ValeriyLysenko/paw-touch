import { nanoid } from 'nanoid';

export default {
    pencil: {
        id: nanoid(),
        className: 'pt-tools-panel-plate',
        ariaLabel: 'Pencil tool',
        title: 'Pencil',
        type: 'pencil',
        linkClassName: 'fas fa-pencil-alt',
    },
    brush: {
        id: nanoid(),
        className: 'pt-tools-panel-plate',
        ariaLabel: 'Brush tool',
        title: 'Brush',
        type: 'brush',
        linkClassName: 'fas fa-paint-brush',
    },
    eraser: {
        id: nanoid(),
        className: 'pt-tools-panel-plate',
        ariaLabel: 'Eraser tool',
        title: 'Eraser',
        type: 'eraser',
        linkClassName: 'fas fa-eraser',
    },
    zoom: {
        id: nanoid(),
        className: 'pt-tools-panel-plate',
        ariaLabel: 'Zoom tool',
        title: 'Zoom',
        type: 'zoom',
        linkClassName: 'fas fa-search',
    },

};
