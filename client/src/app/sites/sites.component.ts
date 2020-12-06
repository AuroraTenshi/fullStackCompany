import { Component, OnInit } from '@angular/core';
import { Site, Type } from '../core/site';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss']
})
export class SitesComponent implements OnInit {

  sites: Site[]=[{
    id: 1,
    name: 'Keleti pályaudvar',
    address: 'Budapest, Kerepesi út 2-4',
    type: Type.FACTORY
  },{
    id: 2,
    name: 'Nyugati szárny',
    address: 'Győr, Dér utca 3/e',
    type: Type.HR
  }]

  constructor() { }

  ngOnInit(): void {
  }

}
