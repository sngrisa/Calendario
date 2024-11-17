export interface IDocumentContent {
    id: number;
    title: string;
    icon: JSX.Element;
    desc?: string;
    steps: IStep[];
    finalstatus?: string;
    imgstatus?: string | any;
}

export interface IStep {
    id: number;
    step: string;
    img: string | any;
}

export interface IDoEvent {
    id: string | number;
    title: string;
    desc: string;
    icon: string | any;
    component: any;
}

export interface IDocumentContentLegal {
    id: number;
    title: string;
    icon: JSX.Element;
    desc?: string;
    steps: IStepLegal[];
    finalstatus?: string;
    imgstatus?: string | any;
}

export interface IStepLegal {
    id: number;
    title: string;
    desc: string;
    icon: string | any;
}