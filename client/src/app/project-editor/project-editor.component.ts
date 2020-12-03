import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AbstractConstructor } from '@angular/material/core/common-behaviors/constructor';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-project-editor',
  templateUrl: './project-editor.component.html',
  styleUrls: ['./project-editor.component.scss']
})
export class ProjectEditorComponent implements OnInit {

  public form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    pretender: ['', Validators.required],
    deadline: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ProjectEditorComponent>
  ) { }

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
