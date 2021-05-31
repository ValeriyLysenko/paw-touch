interface ScaleToolHistory {
    type: string;
}
interface ScaleToolObject {
    initScale: number;
    canvasCache: ImageData | null;
    currentScale: number;
    scaleStep: number;
    scaleHistory: ScaleToolHistory[];
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
}

interface CanvasSpec {
    width: number;
    height: number;
}

interface ActiveTool {
    type: string;
    spec: ActiveToolSpec;
    scale: ScaleToolObject;
}

interface DrawToolObject {
    downStream$: Observable;
    upStream$: Observable;
    moveStream$: Observable;
    clickStream$: Observable;
    drawingSub: Subscription;
}

type CanvasInstanceCreator = (type: string, canvasSpec: ActiveToolSpec) => Subscription;
