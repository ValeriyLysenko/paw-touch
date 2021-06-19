import {
    makeObservable, observable, action, computed, flow,
} from 'mobx';
import { sendBlobToServer } from 'libs/lib';
import {
    galleryDefaults, historyDefaults, historySpecDefaults,
    scaleDefaults, activeToolDefaults, auxDataDefaults, modalsDefaults,
} from './CanvasStoreDefaults';

class CanvasStore {
    modals: ModalsObj = modalsDefaults;

    gallery: GalleryObj[] = galleryDefaults;

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
            modals: observable,
            gallery: observable,
            history: observable.shallow,
            historySpec: observable,
            windowSize: observable,
            mainCnavasSize: observable,
            scale: observable,
            activeTool: observable,
            auxData: observable,

            getModals: computed,
            getGallery: computed,
            getScale: computed,
            getAuxData: computed,
            getActiveTool: computed,
            getMainCanvasSize: computed,
            getWindowSize: computed,
            getHistory: computed,
            getHistorySpec: computed,

            setModals: action,
            setGallery: action,
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

    get getModals(): ModalsObj {
        return this.modals;
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

    setModals(spec: ModalsObj): void {
        this.modals = spec;
    }

    setGallery(items: GalleryObj[]): void {
        this.gallery = items;
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
