import {
    makeObservable, observable, action, computed, flow,
} from 'mobx';
import { sendBlobToServer } from 'libs/lib';
import {
    galleryDefaults, historyDefaults, historySpecDefaults,
    scaleDefaults, activeToolDefaults, auxDataDefaults, modalsDefaults,
} from './CanvasStoreDefaults';

const pawTouchItems = localStorage.getItem('paw-touch') || '{}';
const thisItems = JSON.parse(pawTouchItems);

class CanvasStore {
    modals: Modals = thisItems.modals || modalsDefaults;

    gallery: GalleryObj[] = thisItems.gallery || galleryDefaults;

    history: HistoryObj[][] = thisItems.history || historyDefaults;

    historySpec: HistorySpec = thisItems.historySpec || historySpecDefaults;

    scale: ScaleToolObject = thisItems.scale || scaleDefaults;

    activeTool: ActiveTool = thisItems.activeTool || activeToolDefaults;

    auxData: AuxProps = thisItems.auxData || auxDataDefaults;

    constructor() {
        // makeAutoObservable(this);
        makeObservable(this, {
            modals: observable,
            gallery: observable,
            history: observable.shallow,
            historySpec: observable,
            scale: observable,
            activeTool: observable,
            auxData: observable,

            getThis: computed,
            getModals: computed,
            getGallery: computed,
            getScale: computed,
            getAuxData: computed,
            getActiveTool: computed,
            getHistory: computed,
            getHistorySpec: computed,

            setModals: action,
            unsetModals: action,
            setGallery: action,
            setGalleryItem: action,
            resetScale: action,
            setAuxDataCtrlKey: action,
            setScaleZoom: action,
            setActiveToolColor: action,
            setActiveToolType: action,
            setActiveToolSize: action,
            setHistory: action,
            setHistoryItem: action,
            setHistorySpecPos: action,

            uploadImage: flow,
        });
    }

    get getThis(): {
            modals: Modals,
            gallery: GalleryObj[],
            history: HistoryObj[][],
            historySpec: HistorySpec,
            scale: ScaleToolObject,
            activeTool: ActiveTool,
            auxData: AuxProps,
            } {
        return {
            modals: this.modals,
            gallery: this.gallery,
            history: this.history,
            historySpec: this.historySpec,
            scale: this.scale,
            activeTool: this.activeTool,
            auxData: this.auxData,
        };
    }

    get getModals(): Modals {
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

    get getHistory(): HistoryObj[][] {
        return this.history;
    }

    get getHistorySpec(): HistorySpec {
        return this.historySpec;
    }

    setModals(name: string, spec: ModalObj): void {
        this.modals[name] = spec;
    }

    unsetModals(name: string): void {
        delete this.modals[name];
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
        const response: ServerResponse<{
            name: string;
        }> = yield sendBlobToServer(canvas, {
            imageType: 'image/png',
            imageQuality: 1,
        });
        const { body, error } = response;

        if (!error && body) {
            this.gallery.push({
                id: '',
                title: '',
                descr: '',
                image: body.name,
            });
        }
    }

}

export default CanvasStore;
