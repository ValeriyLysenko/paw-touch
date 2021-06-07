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
    // canvasCache: ImageData | null;
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

interface CanvasSpec {
    width: number;
    height: number;
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

type CanvasInstanceCreator = (type: string, canvasSpec: ActiveToolSpec) => Subscription;
type TypeToToolMapMappedFunc = (
    ctx: CanvasRenderingContext2D,
    spec: DrawingSpec,
    // spec: DrawingSpec | Omit<DrawingSpec, 'color'>,
) => void;
type HandlerFunc = (e: React.MouseEvent) => void;
