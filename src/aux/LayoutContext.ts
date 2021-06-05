import { createContext, MutableRefObject } from 'react';

export interface LayoutContextProps {
    canvasRef: MutableRefObject<HTMLCanvasElement | null>;
}

const LayoutContext = createContext({} as LayoutContextProps);

export const LayoutContextProvider = LayoutContext.Provider;

export default LayoutContext;
