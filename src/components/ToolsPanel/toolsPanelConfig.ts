import { nanoid } from 'nanoid';

export default {
    pencil: {
        id: nanoid(),
        className: 'pt-tools-panel-plate',
        ariaLabel: 'Pencil tool',
        type: 'pencil',
        linkClassName: 'fas fa-pencil-alt',
    },
    brush: {
        id: nanoid(),
        className: 'pt-tools-panel-plate',
        ariaLabel: 'Brush tool',
        type: 'brush',
        linkClassName: 'fas fa-paint-brush',
    },
    eraser: {
        id: nanoid(),
        className: 'pt-tools-panel-plate',
        ariaLabel: 'Eraser tool',
        type: 'eraser',
        linkClassName: 'fas fa-eraser',
    },
    zoom: {
        id: nanoid(),
        className: 'pt-tools-panel-plate',
        ariaLabel: 'Zoom tool',
        type: 'zoom',
        linkClassName: 'fas fa-search',
    },

};
