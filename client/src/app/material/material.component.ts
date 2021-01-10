import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Material } from '../core/material';
import { MaterialService } from '../core/material.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss']
})
export class MaterialComponent implements OnInit {

  @Input()
  material: Material;

  @Input()
  showDetails: boolean = true;

  @Output()
  editMaterial: EventEmitter<Material>=new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private materialService: MaterialService,
  ) { }

  async ngOnInit(): Promise<void> {
    if(!this.material)
    {
      const materialId=parseInt(this.route.snapshot.paramMap.get('id'), 10);
      this.material= await this.materialService.getMaterial(materialId);
    }
  }

  edit():void{
    this.editMaterial.emit(this.material);
  }
}
