import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractConstructor } from '@angular/material/core/common-behaviors/constructor';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Project } from '../core/project';
import { ProjectService } from '../core/project.service';

@Component({
  selector: 'app-project-editor',
  templateUrl: './project-editor.component.html',
  styleUrls: ['./project-editor.component.scss']
})
export class ProjectEditorComponent implements OnInit {

  editing:boolean=false;

  public form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    pretender: ['', Validators.required],
    deadline: [null, Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProjectEditorComponent>,
    @Inject(MAT_DIALOG_DATA) private project: Project,
    private projectService: ProjectService
  ) {
    if(project){
      this.form.reset({
        name: this.project.name,
        pretender: this.project.pretender,
        deadline: this.project.deadline,
      });
      this.editing=true;
    }

   }

  get name(): AbstractControl{
    return this.form.get('name');
  }

  get pretender(): AbstractControl{
    return this.form.get('pretender');
  }

  get deadline(): AbstractControl{
    return this.form.get('deadline');
  }

  ngOnInit(): void {
  }

  submit(){
    if(!this.form.valid){
      return;
    }
    console.log(this.form.value);

    this.dialogRef.close(this.form.value);
  }
}
