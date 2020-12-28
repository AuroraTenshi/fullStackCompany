import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AbstractConstructor } from '@angular/material/core/common-behaviors/constructor';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Material } from '../core/material';

@Component({
  selector: 'app-material-editor',
  templateUrl: './material-editor.component.html',
  styleUrls: ['./material-editor.component.scss']
})
export class MaterialEditorComponent implements OnInit {

  public form: FormGroup = this.fb.group({
    name: ['', Validators.required],
    quantity: [0, [Validators.required, Validators.min(1)]],
  });

  get name(): AbstractControl {
    return this.form.get('name');
  }

  get quantity(): AbstractControl {
    return this.form.get('quantity');
  }

  editing: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MaterialEditorComponent>,
    @Inject(MAT_DIALOG_DATA) private material: Material
  ) {
    if (material) {
      this.form.reset({
        name: material.name,
        quantity: material.quantity,
      });
      this.editing = true;
    }
  }

  ngOnInit(): void {
  }

  submit(): void {
    if (!this.form.valid) {
      return;
    }
    console.log(this.form.value);
    this.dialogRef.close(this.form.value)
  }
}
