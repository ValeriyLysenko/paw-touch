export const galleryDefaults: GalleryObj[] = [];

export const historyDefaults: HistoryObj[][] = [];

export const historySpecDefaults: HistorySpec = {
    position: 0,
};

export const scaleDefaults: ScaleToolObject = {
    initScale: 1,
    currentScale: 1,
    scaleStep: 0.1,
    scaleHistory: [],
    scaledPosRatio: [],
};

export const activeToolDefaults: ActiveTool = {
    type: 'pencil',
    spec: {
        color: '#000',
        size: 10,
    },
};

export const auxDataDefaults: AuxProps = {
    ctrlKey: false,
};
