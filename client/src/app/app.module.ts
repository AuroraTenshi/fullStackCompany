import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { ProjectsComponent } from './projects/projects.component';
import { SitesComponent } from './sites/sites.component';
import { MaterialsComponent } from './materials/materials.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ProjectEditorComponent } from './project-editor/project-editor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from "@angular/material/input";
import {MatDialogModule} from '@angular/material/dialog';
import { ProjectComponent } from './project/project.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ProjectsComponent,
    SitesComponent,
    MaterialsComponent,
    ProjectEditorComponent,
    ProjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
