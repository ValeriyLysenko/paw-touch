import { createContext } from 'react';
import CanvasStore from 'stores/CanvasStore';

export interface AppContextProps {
    mainCanvas: CanvasStore;
    canvasStoreDefaults: CanvasStoreDefaults;
    auxCanvas: CanvasStore;
}

const AppContext = createContext({} as AppContextProps);

export const AppContextProvider = AppContext.Provider;

export default AppContext;
