import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../core/auth.service';
import { Project } from '../core/project';
import { ProjectService } from '../core/project.service';
import { Role } from '../core/worker';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})

export class ProjectComponent implements OnInit {

  @Input()
  project: Project;

  @Input()
  showDetails: boolean = true;

  @Output()
  editProject: EventEmitter<Project> = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private authService: AuthService,
    private router:Router
  ) { }

  async ngOnInit(): Promise<void> {
    if (!this.project) {
      const projectId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
      this.project = await this.projectService.getProject(projectId);
    }
  }

  edit(): void {
    this.editProject.emit(this.project);
  }

  isEmployer():boolean{
    return this.authService.isEmployer();
  }

  async deleteProject(id: number):Promise<void>{
    await this.projectService.deleteProject(id);
    this.router.navigate(['/', 'projects']);
  }
}
