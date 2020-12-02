import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Project } from '../core/project';
import { ProjectEditorComponent } from '../project-editor/project-editor.component';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})

export class ProjectsComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

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

  startCreateProject():void{
    this.dialog.open(ProjectEditorComponent,{
      width: '1000px',
    });
  }
}
