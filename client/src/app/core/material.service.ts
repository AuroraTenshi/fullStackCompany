import { Injectable } from '@angular/core';
import { Material } from './material';
import { Type } from './site';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  materials:Material[]=[
    {
      id: 1,
      name: 'Notebook',
      quantity: 10,
      place: {
        id: 1,
        name: 'Kiss Zrt.',
        address: 'Szeged, Nagy utca 200/a',
        type: Type.FACTORY
      }
    },
    {
      id: 2,
      name: 'Asztal',
      quantity: 20
    }
  ];

  constructor() { }

  getMaterials():Material[]{
    return this.materials;
  }

  getMaterial(id: number):Material{
    return this.materials.find(material => material.id === id);
  }

  createMaterial(material: Material):void{
    this.materials.push(material);
  }
}
