import CanvasStore from 'stores/CanvasStore';
import * as canvasStoreDefaults from 'stores/CanvasStoreDefaults';

const mainCanvas = new CanvasStore();
const auxCanvas = new CanvasStore();

export {
    mainCanvas,
    canvasStoreDefaults,
    auxCanvas,
};
