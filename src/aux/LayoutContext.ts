import { createContext, MutableRefObject } from 'react';

export interface LayoutContextProps {
    canvasRef: MutableRefObject<HTMLCanvasElement | null>;
    modalsWrapperRef: MutableRefObject<HTMLDivElement | null>;
}

const LayoutContext = createContext({} as LayoutContextProps);

export const LayoutContextProvider = LayoutContext.Provider;

export default LayoutContext;
