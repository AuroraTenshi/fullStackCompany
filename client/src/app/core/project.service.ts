import { Injectable } from '@angular/core';
import { Project } from './project';
import { Role } from './worker';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  projects: Project[] = [
    {
      id: 1,
      name: 'Hálózat',
      pretender: 'Telekom',
      deadline: new Date('2020-11-15'),
      // workers: ['Kis János', 'Nagy Mihály']
      workers: [{
        id: 1,
        name: 'Kis János',
        password: 'password',
        email: 'kis@example.com',
        payment: 300000,
        role: Role.Employer,
      },{
        id: 2,
        name: 'Nagy Mihály',
        email: 'nagy.misi@example.com',
        password: 'asd123',
        payment: 200000,
        role: Role.Employee
      }]
    }, {
      id: 2,
      name: 'Játékfejlesztés',
      pretender: 'Origin',
      deadline: new Date(),
      workers: []
    },
    {
      id: 3,
      name: 'Facipő készítés',
      pretender: 'Hollandia',
      deadline: new Date('3000-12-31'),
    },
    {
      id: 4,
      name: 'No name',
      pretender: 'Nobody',
      deadline: new Date('2022-12-11'),
      // workers: ['én', 'te', 'ő', 'mi', 'ti', 'ők']
      workers: [{
        id: 1,
        name: 'Kis János',
        password: 'password',
        email: 'kis@example.com',
        payment: 300000,
        role: Role.Employer,
      },{
        id: 3,
        name: 'Denem Tom',
        email: 'voldemort@example.com',
        password: 'harry_potter',
        payment: 200000,
        role: Role.Guest
      },{
        id: 4,
        name: 'Kovács Miklós Oszkár',
        email: 'k@example.com',
        password: 'hello_world',
        payment: 20000,
        role: Role.Employee
      }]
    }
  ];
  
  constructor() { }

  getProjects():Project[]{
    return this.projects;
  }

  getProject(index:number):Project{
    return this.projects.find(project => project.id === index);
  }

  createProject(project: Project):void{
    this.projects.push(project);
  }
}
