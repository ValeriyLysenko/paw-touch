import {
    makeObservable, observable, action, computed,
} from 'mobx';

class CanvasStore {
    history: HistoryObj[][] = [];

    historySpec: HistorySpec = {
        position: 0,
    };

    windowSize: number[] = [0, 0];

    mainCnavasSize: number[] = [0, 0];

    activeTool: ActiveTool = {
        type: 'pencil',
        spec: {
            color: '#000',
            size: 10,
        },
        scale: {
            initScale: 1,
            currentScale: 1,
            canvasCache: null,
            scaleStep: 0.1,
            scaleHistory: [],
            scaledPosRatio: [],
        },
    };

    auxData: AuxProps = {
        ctrlKey: false,
    };

    constructor() {
        // makeAutoObservable(this);
        makeObservable(this, {
            historySpec: observable,
            history: observable.shallow,
            windowSize: observable,
            mainCnavasSize: observable,
            activeTool: observable,
            auxData: observable,

            getAuxData: computed,
            getActiveTool: computed,
            getMainCanvasSize: computed,
            getWindowSize: computed,
            getHistory: computed,
            getHistorySpec: computed,

            setScaledPosRatio: action,
            resetScale: action,
            setAuxDataCtrlKey: action,
            setActiveToolZoom: action,
            setActiveToolColor: action,
            setActiveToolType: action,
            setActiveToolSize: action,
            setMainCanvasSize: action,
            setWindowSize: action,
            setHistory: action,
            setHistoryItem: action,
            setHistorySpecPos: action,
        });
    }

    get getAuxData(): AuxProps {
        return this.auxData;
    }

    get getActiveTool(): ActiveTool {
        return this.activeTool;
    }

    get getMainCanvasSize(): number[] {
        return this.mainCnavasSize;
    }

    get getWindowSize(): number[] {
        return this.windowSize;
    }

    get getHistory(): HistoryObj[][] {
        return this.history;
    }

    get getHistorySpec(): HistorySpec {
        return this.historySpec;
    }

    setScaledPosRatio(scaledPosRatio: number[]): void {
        this.activeTool.scale.scaledPosRatio = scaledPosRatio;
    }

    resetScale(): void {
        const { scale } = this.activeTool;
        this.activeTool.scale = {
            ...scale,
            currentScale: 1,
            scaleHistory: [],
        };
    }

    setAuxDataCtrlKey(ctrlKey: boolean): void {
        this.auxData.ctrlKey = ctrlKey;
    }

    setActiveToolZoom(
        zoomObj: ScaleToolHistory,
        currentScale: number,
        scaledPosRatio: number[],
    ): void {
        const { scale } = this.activeTool;
        this.activeTool = {
            ...this.activeTool,
            scale: {
                ...scale,
                currentScale,
                scaleHistory: [...scale.scaleHistory, zoomObj],
                scaledPosRatio,
            },
        };
    }

    setActiveToolColor(color: string): void {
        this.activeTool.spec.color = color;
    }

    setActiveToolType(
        type: string,
        canvasCache: ImageData | null,
    ): void {
        this.activeTool = {
            ...this.activeTool,
            type,
            scale: {
                ...this.activeTool.scale,
                canvasCache,
            },

        };
    }

    setActiveToolSize(size: number): void {
        this.activeTool.spec.size = size;
    }

    setMainCanvasSize(size: number[]): void {
        this.mainCnavasSize = size;
    }

    setWindowSize(size: number[]): void {
        this.windowSize = size;
    }

    setHistorySpecPos(pos: number): void {
        this.historySpec.position = pos;
    }

    setHistoryItem(item: HistoryObj[]): void {
        this.history.push(item);
    }

    setHistory(history: HistoryObj[][]): void {
        this.history = history;
    }

}

// class CanvasStore {
//     value

//     constructor(value) {
//         makeObservable(this, {
//             value: observable,
//             double: computed,
//             increment: action,
//             fetch: flow,
//         });
//         this.value = value;
//     }

//     get double() {
//         return this.value * 2;
//     }

//     increment() {
//         this.value++;
//     }

//     * fetch() {
//         const response = yield fetch('/api/value');
//         this.value = response.json();
//     }
// }

export default CanvasStore;
