import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Material } from './material';
import { httpOptions} from './auth.service';
import { Site, Type } from './site';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  // materials:Material[]=[
  //   {
  //     id: 1,
  //     name: 'Notebook',
  //     quantity: 10,
  //     place: {
  //       id: 1,
  //       name: 'Kiss Zrt.',
  //       address: 'Szeged, Nagy utca 200/a',
  //       type: Type.FACTORY
  //     }
  //   },
  //   {
  //     id: 2,
  //     name: 'Asztal',
  //     quantity: 20
  //   }
  // ];

  private materialUrl='http://localhost:8080/materials';

  constructor(
    private httpClient: HttpClient
  ) { }

  getMaterials(): Promise<Material[]> {
    //return this.materials;
    return this.httpClient.get<Material[]>(`${this.materialUrl}`, httpOptions).toPromise();
  }

  getMaterial(id: number): Promise<Material> {
    //return this.materials.find(material => material.id === id);
    return this.httpClient.get<Material>(`${this.materialUrl}/${id}`, httpOptions).toPromise();
  }

  createMaterial(material: Material): Promise<Material>{
    //this.materials.push(material);
    return this.httpClient.post<Material>(`${this.materialUrl}`, material, httpOptions).toPromise();
  }

  editMaterial(id: number, material: Material): Promise<Material> {
    return this.httpClient.put<Material>(`${this.materialUrl}/${id}`, material, httpOptions).toPromise();
  }

  deleteMaterial(id:number):Promise<Material>{
    return this.httpClient.delete<Material>(`${this.materialUrl}/${id}`, httpOptions).toPromise();
  }

  getPlace(id: number):Promise<Site>{
    return this.httpClient.get<Site>(`${this.materialUrl}/${id}/place`, httpOptions).toPromise();
  }

}
