import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Material } from '../core/material';
import { MaterialService } from '../core/material.service';
import { Type } from '../core/site';
import { MaterialEditorComponent } from '../material-editor/material-editor.component';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.scss']
})
export class MaterialsComponent implements OnInit {

  materials:Material[];

  constructor(
    private dialog:MatDialog,
    private materialService: MaterialService
  ) { }

  ngOnInit(): void {
    this.materials=this.materialService.getMaterials();
  }

  startCreateMaterial():void{
    this.dialog.open(MaterialEditorComponent,{
      width: '1000px',
    });
  }

  startEditMaterial(material: Material):void{
    this.dialog.open(MaterialEditorComponent,{
      width: '1000px',
      data: material
    });
  }

}
