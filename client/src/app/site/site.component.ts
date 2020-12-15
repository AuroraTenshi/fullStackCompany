import { Route } from '@angular/compiler/src/core';
import { Component, Input, OnInit } from '@angular/core';
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

  constructor(
    private route: ActivatedRoute,
    private siteService: SiteService
  ) { }

  ngOnInit(): void {
    if(!this.site){
      const siteId=parseInt(this.route.snapshot.paramMap.get('id'), 10);
      this.site=this.siteService.getSite(siteId);
    }
  }

}
