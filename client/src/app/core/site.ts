import { Worker } from './worker';

export interface Site{
    id: number;
    name: string;
    address: string;
    type: Type;
}

export enum Type{
    HR='HR',
    INFORMATICS='INFORMATICS',
    FACTORY='FACTORY'
}