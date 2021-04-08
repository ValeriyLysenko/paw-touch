interface NavLinkObj {
    id: string;
    name: string;
    url: string;
}

interface NavRouterObj {
    root: NavLinkObj;
    children?: {
        [route:string]: NavLinkObj,
    };
}
