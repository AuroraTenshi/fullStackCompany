import { Component, OnInit } from '@angular/core';
import { Project } from '../core/project';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})

export class ProjectsComponent implements OnInit {

  constructor() { }

  projects: Project[]=[
    {
      // id: 1,
      name: 'Hálózat kifejlesztés',
      pretender: 'Telekom',
      deadline: new Date('2020-12-31')
    },
    {
      // id: 2,
      name: 'Játékfejlesztés',
      pretender: 'Origin',
      deadline: new Date()
    }
  ];

  ngOnInit(): void {
  }

}
