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



  async ngOnInit(): Promise<void> {
    this.projects= await this.projectService.getProjects();
  }

  async startCreateProject(): Promise<void> {
    const createDialog=this.dialog.open(ProjectEditorComponent, {
      width: '1000px',
    });

    const projectToCreate=await createDialog.afterClosed().toPromise<Project>();
    const createdProject=await this.projectService.createProject(projectToCreate);
    this.projects.push(createdProject);
  }

  async startEditProject(project: Project): Promise<void>{
    const modifyDialog=this.dialog.open(ProjectEditorComponent, {
      width: '1000px',
      data: project
    });

    const projectToModify=await modifyDialog.afterClosed().toPromise<Project>();
    const modifiedProject=await this.projectService.editProject(project.id, projectToModify);
    const index = this.projects.indexOf(project);
    this.projects.splice(index, 1, modifiedProject);
  }
}
