import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../core/project';
import { ProjectService } from '../core/project.service';

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

  @Output()
  editProject:EventEmitter<Project>=new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
   if(!this.project){
     const projectId=parseInt(this.route.snapshot.paramMap.get('id'), 10);
     this.project = this.projectService.getProject(projectId);
   }
  }

  edit():void{
    this.editProject.emit(this.project);
  }
}