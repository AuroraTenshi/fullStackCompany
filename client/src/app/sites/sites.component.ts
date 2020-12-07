import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Site, Type } from '../core/site';
import {  Role } from '../core/worker';
import { SiteEditorComponent } from '../site-editor/site-editor.component';

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
    type: Type.FACTORY,
  },{
    id: 2,
    name: 'Nyugati szárny',
    address: 'Győr, Dér utca 3/e',
    type: Type.HR,
  }]

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  startCreateSite():void{
    this.dialog.open(SiteEditorComponent, {
      width: '1000px',
    });
  }
}
