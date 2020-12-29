import { Injectable } from '@angular/core';
import { Site, Type } from './site';
import { Role } from './worker';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  sites: Site[] = [{
    id: 1,
    name: 'Keleti pályaudvar',
    address: 'Budapest, Kerepesi út 2-4',
    type: Type.FACTORY,
  }, {
      id: 2,
      name: 'Nyugati szárny',
      address: 'Győr, Dér utca 3/e',
      type: Type.HR,
      workers: [{
        id: 1,
        name: 'Kovács Miklós',
        email: 'kovos@example.com',
        password: 'asdasd',
        payment: 20000,
        role: Role.Employee
      }, {
        id: 2,
        name: 'Tavaszi Katalin',
        email: 'tavasz@example.com',
        password: 'spring',
        payment: 30000,
        role: Role.Employer
      }],
      materials:[{
        id: 1,
        name:'Laptop',
        quantity: 10,
      },{
        id: 2,
        name: 'Tégla',
        quantity: 15000
      }]
  }]

  constructor() { }

  getSites():Site[]{
    return this.sites;
  }

  getSite(id: number){
    return this.sites.find(site => site.id === id);
  }
  
  createSite(site:Site):void{
    this.sites.push(site);
  }
}
