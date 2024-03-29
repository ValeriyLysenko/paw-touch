interface ServerResponse<T> {
    error: any;
    body: T | null;
}

interface PopupProps {
    url: string;
    closeHandler: (e: React.MouseEvent) => void;
}
interface ModalsProps {
    callback?: Function;
}

interface ModalObj {
    type: string;
    parent: string;
    child: string;
}

interface Modals {
    [name:string]: ModalObj;
}

interface GalleryObj {
    id: string;
    title: string;
    descr: string;
    image: string;
}

interface AuxProps {
    ctrlKey: boolean;
}

interface HistorySpec {
    position: number;
}

interface DrawingSpec {
    x: number;
    y: number;
    color: string;
    size: number;
    ctrlKey?: boolean;
}

interface HistoryObj {
    type: string;
    spec: Partial<DrawingSpec>;
}

interface HistoryData {
    data: HistoryObj[][],
    spec: HistorySpec,
}

interface RawDrawingSpec {
    x: number;
    y: number;
    ctx: CanvasRenderingContext2D | null;
    ctrlKey: boolean;
}

interface ScaleToolHistory {
    type: string;
}

interface ScaleToolObject {
    initScale: number;
    currentScale: number;
    scaleStep: number;
    scaleHistory: ScaleToolHistory[];
    scaledPosRatio: number[];
}

interface ActiveToolSpec {
    color: string;
    size: number;
}

interface NavRouterObj {
    id: string;
    name: string;
    title: string;
    url: string;
    sublevel?: {
        [route:string]: NavRouterObj;
    };
    dataType?: string;
    handler?: string;
}

interface ActiveTool {
    type: string;
    spec: ActiveToolSpec;
}

interface DrawToolObject {
    downStream$: Observable;
    upStream$: Observable;
    moveStream$: Observable;
    clickStream$: Observable;
    drawingSub: Subscription;
}

interface CanvasStoreDefaults {
    historyDefaults: HistoryObj[][];
    historySpecDefaults: HistorySpec;
    scaleDefaults: ScaleToolObject;
    activeToolDefaults: ActiveTool;
    auxDataDefaults: AuxProps;
}

interface ToBlobSpec {
    imageType: string;
    imageQuality: number;
}

type TypeToToolMapMappedFunc = (
    ctx: CanvasRenderingContext2D,
    spec: DrawingSpec,
    // spec: DrawingSpec | Omit<DrawingSpec, 'color'>,
) => void;
type HandlerFunc = (e: React.MouseEvent) => void;
