interface NavLinkObj {
    id: string;
    name: string;
    title: string;
    url: string;
}

interface NavRouterObj {
    root: NavLinkObj;
    children?: {
        [route:string]: NavLinkObj,
    };
}
