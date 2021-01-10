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
    private siteService: SiteService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.sites= await this.siteService.getSites();
  }

  async startCreateSite(): Promise<void> {
    const createDialog=this.dialog.open(SiteEditorComponent, {
      width: '1000px',
    });

    const siteToCreate=await createDialog.afterClosed().toPromise<Site>();
    const createdSite=await this.siteService.createSite(siteToCreate);
    this.sites.push(createdSite);
  }

  async startEditSite(site: Site): Promise<void>{
    const modifyDialog=this.dialog.open(SiteEditorComponent, {
      width: '1000px',
      data: site
    });

    const siteToModify=await modifyDialog.afterClosed().toPromise<Site>();
    const modifiedSite=await this.siteService.editSite(site.id, siteToModify);
    const index = this.sites.indexOf(site);
    this.sites.splice(index, 1, modifiedSite);
  }

}
