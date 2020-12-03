import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../core/project';
import { ProjectEditorComponent } from '../project-editor/project-editor.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})

export class ProjectComponent implements OnInit {

  @Input()
  project: Project;

  @Input()
  showDetails:boolean=true;

  constructor() { }

  ngOnInit(): void {
    if(!this.project.workers){
      this.project.workers=[];
    }
  }

}
