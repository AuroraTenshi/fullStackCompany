import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Project } from '../core/project';
import { ProjectService } from '../core/project.service';
import { ProjectEditorComponent } from '../project-editor/project-editor.component';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})

export class ProjectsComponent implements OnInit {

  projects:Project[];

  constructor(
    private dialog: MatDialog,
    private projectService:ProjectService
  ) { }



  ngOnInit(): void {
    this.projects=this.projectService.getProjects();
  }

  startCreateProject(): void {
    this.dialog.open(ProjectEditorComponent, {
      width: '1000px',
    });
  }
}
