import {
    makeObservable, observable, action, computed, flow,
} from 'mobx';

class CanvasStore {
    canvasHistory: string[] = [];

    constructor() {
        makeObservable(this, {
            canvasHistory: observable,
            addHistory: action,
            getHistory: computed,
        });
    }

    get getHistory(): string[] {
        return this.canvasHistory;
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
