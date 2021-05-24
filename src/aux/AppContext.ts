import { createContext } from 'react';
import { mainCanvas, auxCanvas } from './init';

export default createContext({
    mainCanvas,
    auxCanvas,
});
