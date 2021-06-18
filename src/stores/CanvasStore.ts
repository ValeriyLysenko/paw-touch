import {
    makeObservable, observable, action, computed, flow,
} from 'mobx';
import { sendBlobToServer } from 'libs/lib';
import {
    galleryDefaults, historyDefaults, historySpecDefaults,
    scaleDefaults, activeToolDefaults, auxDataDefaults,
} from './CanvasStoreDefaults';

class CanvasStore {
    // gallery: GalleryObj[] = galleryDefaults;
    gallery: GalleryObj[] = [{
        id: 'w_quF9g7rOFwxthXF9CH6',
        title: 'Title',
        descr: 'Description',
        image: '48e8fc29d0dac5d9e5fb1f5ff6705a25.png',
    },
    {
        id: 'w_quF9g7rOFwxthXF9CH3',
        title: 'Title 2',
        descr: 'Description 2',
        image: '48e8fc29d0dac5d9e5fb1f5ff6705a25.png',
    },
    ];

    history: HistoryObj[][] = historyDefaults;

    historySpec: HistorySpec = historySpecDefaults;

    windowSize: number[] = [0, 0];

    mainCnavasSize: number[] = [0, 0];

    scale: ScaleToolObject = scaleDefaults;

    activeTool: ActiveTool = activeToolDefaults;

    auxData: AuxProps = auxDataDefaults;

    constructor() {
        // makeAutoObservable(this);
        makeObservable(this, {
            gallery: observable,
            history: observable.shallow,
            historySpec: observable,
            windowSize: observable,
            mainCnavasSize: observable,
            scale: observable,
            activeTool: observable,
            auxData: observable,

            getGallery: computed,
            getScale: computed,
            getAuxData: computed,
            getActiveTool: computed,
            getMainCanvasSize: computed,
            getWindowSize: computed,
            getHistory: computed,
            getHistorySpec: computed,

            setGalleryItem: action,
            resetScale: action,
            setAuxDataCtrlKey: action,
            setScaleZoom: action,
            setActiveToolColor: action,
            setActiveToolType: action,
            setActiveToolSize: action,
            setWindowSize: action,
            setHistory: action,
            setHistoryItem: action,
            setHistorySpecPos: action,

            uploadImage: flow,
        });
    }

    get getGallery(): GalleryObj[] {
        return this.gallery;
    }

    get getScale(): ScaleToolObject {
        return this.scale;
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

    setGalleryItem(item: GalleryObj): void {
        this.gallery.push(item);
    }

    resetScale(): void {
        this.scale = scaleDefaults;
    }

    setAuxDataCtrlKey(ctrlKey: boolean): void {
        this.auxData.ctrlKey = ctrlKey;
    }

    setScaleZoom(
        zoomObj: ScaleToolHistory,
        currentScale: number,
        scaledPosRatio: number[],
    ): void {
        const { scale } = this;
        this.scale = {
            ...scale,
            currentScale,
            scaleHistory: [...scale.scaleHistory, zoomObj],
            scaledPosRatio,
        };
    }

    setActiveToolColor(color: string): void {
        this.activeTool.spec.color = color;
    }

    setActiveToolType(
        type: string,
    ): void {
        this.activeTool = {
            ...this.activeTool,
            type,
        };
    }

    setActiveToolSize(size: number): void {
        this.activeTool.spec.size = size;
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

    * uploadImage(canvas: HTMLCanvasElement) {
        const response: {
            name: string
        } = yield sendBlobToServer(canvas, {
            imageType: 'image/png',
            imageQuality: 1,
        });
        this.gallery.push({
            id: '',
            title: '',
            descr: '',
            image: response.name,
        });
    }

}

export default CanvasStore;
