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
        [route:string]: NavRouterObj,
    };
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
    downStream$: Observable,
    upStream$: Observable,
    moveStream$: Observable,
    sub: Subscription,
}

type CanvasInstanceCreator = (type: string, canvasSpec: ActiveToolSpec) => Subscription;
