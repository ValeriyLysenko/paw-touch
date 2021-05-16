import { nanoid } from 'nanoid';

export default {
    pencil: {
        id: nanoid(),
        className: 'pt-tools-panel-plate',
        ariaLabel: 'Pencil tool',
        role: 'presentation',
        type: 'pencil',
        linkClassName: 'fas fa-pencil-alt',
    },
    brush: {
        id: nanoid(),
        className: 'pt-tools-panel-plate',
        ariaLabel: 'Brush tool',
        role: 'presentation',
        type: 'brush',
        linkClassName: 'fas fa-paint-brush',
    },
    eraser: {
        id: nanoid(),
        className: 'pt-tools-panel-plate',
        ariaLabel: 'Eraser tool',
        role: 'presentation',
        type: 'eraser',
        linkClassName: 'fas fa-eraser',
    },

};
