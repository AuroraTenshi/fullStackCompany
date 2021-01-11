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

  async ngOnInit(): Promise<void> {
    this.materials= await this.materialService.getMaterials();
  }

  async startCreateMaterial(): Promise<void> {
    const createDialog=this.dialog.open(MaterialEditorComponent, {
      width: '1000px',
    });

    const materialToCreate=await createDialog.afterClosed().toPromise<Material>();
    const createdMaterial=await this.materialService.createMaterial(materialToCreate);
    this.materials.push(createdMaterial);
  }

  async startEditMaterial(material: Material): Promise<void>{
    const modifyDialog=this.dialog.open(MaterialEditorComponent, {
      width: '1000px',
      data: material
    });

    const materialToModify = await modifyDialog.afterClosed().toPromise<Material>();
    const modifiedMaterial = await this.materialService.editMaterial(material.id, materialToModify);
    const index = this.materials.indexOf(material);
    this.materials.splice(index, 1, modifiedMaterial);
  }
}
