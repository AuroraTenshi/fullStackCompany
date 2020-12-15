import { Component, Inject, Injector, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Site, Type } from '../core/site';

@Component({
  selector: 'app-site-editor',
  templateUrl: './site-editor.component.html',
  styleUrls: ['./site-editor.component.scss']
})
export class SiteEditorComponent implements OnInit {

  // site:Site={
  //   name: '',
  //   address: '',
  //   type:null
  // };
  // title:string='';
  // address:string='';
  // type:Type=null;

  editing: boolean = false;

  public form: FormGroup=this.fb.group({
    name: ['', Validators.required],
    address: ['', Validators.required],
    type: ['', Validators.required],
  });

  get name():AbstractControl{
    return this.form.get('name');
  }

  get address():AbstractControl{
    return this.form.get('address');
  }

  get type():AbstractControl{
    return this.form.get('type');
  }

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialogRef<SiteEditorComponent>,
    @Inject(MAT_DIALOG_DATA) private site: Site
  ) {
    if (site) {
      this.form.reset({
        name: this.site.name,
        address: this.site.address,
        type: this.site.type,
      });
      this.editing = true;
    }
  }

  ngOnInit(): void {
  }

  submit():void{
    if(!this.form.valid){
      return;
    }
    console.log(this.form.value);
    this.dialog.close(this.form.value);
  }

}
