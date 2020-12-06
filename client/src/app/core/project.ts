import {Worker} from './worker';

export interface Project{
    id: number;
    name: string;
    pretender: string;
    deadline: Date;
    workers?:Worker[];
}