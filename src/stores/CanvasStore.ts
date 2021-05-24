import {
    makeObservable, makeAutoObservable, observable, action, computed, flow,
} from 'mobx';

class CanvasStore {
    canvasHistory: string[] = [];

    windowSize: number[] = [0, 0];

    mainCnavasSize: number[] = [0, 0];

    activeTool: ActiveTool = {
        type: 'pencil',
        spec: {
            color: '#000',
            size: 10,
            eraserRadius: 10,
        },
    };

    constructor() {
        makeAutoObservable(this);
        // makeObservable(this, {
        //     canvasHistory: observable,
        //     windowSize: observable,
        //     setWindowSize: action,
        //     addHistory: action,
        //     getHistory: computed,
        //     getWindowSize: computed,
        // });
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

    get getHistory(): string[] {
        return this.canvasHistory;
    }

    setActiveToolEraserRadius(radius: number): void {
        this.activeTool.spec.eraserRadius = radius;
    }

    setActiveToolColor(color: string): void {
        this.activeTool.spec.color = color;
    }

    setActiveToolType(type: string): void {
        this.activeTool = { ...this.activeTool, type };
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

    addHistory(item: string): void {
        this.canvasHistory.push(item);
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
