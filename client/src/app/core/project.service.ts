import { Injectable } from '@angular/core';
import { Project } from './project';

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
      workers: ['Kis János', 'Nagy Mihály']
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
      workers: ['én', 'te', 'ő', 'mi', 'ti', 'ők']
    },
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
