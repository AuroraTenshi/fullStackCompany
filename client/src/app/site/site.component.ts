import { Route } from '@angular/compiler/src/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Site } from '../core/site';
import { SiteService } from '../core/site.service';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit {

  @Input()
  site:Site;

  @Input()
  showDetails:boolean=true;

  @Output()
  editSite: EventEmitter<Site> = new EventEmitter();

  constructor(
    private route: ActivatedRoute,
    private siteService: SiteService
  ) { }

  async ngOnInit(): Promise<void> {
    if (!this.site) {
      const siteId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
      this.site = await this.siteService.getSite(siteId);
    }
  }

  edit():void{
    this.editSite.emit(this.site);
  }
}
