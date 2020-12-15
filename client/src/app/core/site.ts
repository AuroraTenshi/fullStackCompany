import { Material } from './material';
import { Worker } from './worker';

export interface Site{
    id: number;
    name: string;
    address: string;
    type: Type;
    workers?: Worker[];
    materials?:Material[];
}

export enum Type{
    HR='HR',
    INFORMATICS='INFORMATICS',
    FACTORY='FACTORY'
}