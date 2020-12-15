import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Site, Type } from '../core/site';
import { SiteService } from '../core/site.service';
import {  Role } from '../core/worker';
import { SiteEditorComponent } from '../site-editor/site-editor.component';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss']
})
export class SitesComponent implements OnInit {

  sites: Site[];

  constructor(
    private dialog: MatDialog,
    private siteService: SiteService
  ) { }

  ngOnInit(): void {
    this.sites=this.siteService.getSites();
  }

  startCreateSite():void{
    this.dialog.open(SiteEditorComponent, {
      width: '1000px',
    });
  }
}
