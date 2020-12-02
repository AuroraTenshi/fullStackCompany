import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MaterialsComponent } from './materials/materials.component';
import { MenuComponent } from './menu/menu.component';
import { ProjectsComponent } from './projects/projects.component';
import { SitesComponent } from './sites/sites.component';

const routes: Routes = [

  {
    path: 'projects',
    component: ProjectsComponent
  },
  {
    path: 'sites',
    component: SitesComponent
  },
  {
    path: 'materials',
    component: MaterialsComponent
  },
  {
    path: '**',
    redirectTo: 'projects'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
