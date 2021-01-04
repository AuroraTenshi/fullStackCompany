import { Project } from "./project";

export class Worker{
    id: number;
    name: string;
    password: string;
    email:string;
    payment: number;
    role: Role;
    projects?:Project[]=[];
}

export enum Role{
    Guest = 'GUEST',
    Employee = 'EMPLOYEE',
    Employer = 'EMPLOYER',
}