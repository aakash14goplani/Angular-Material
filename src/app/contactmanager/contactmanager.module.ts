import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactmanagerAppComponent } from './contactmanager-app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { ContactManagerRoutingModule } from './contactmanager-routing.module';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { NotesComponent } from './components/notes/notes.component';

@NgModule({
  declarations: [
    ContactmanagerAppComponent,
    ToolbarComponent,
    MainContentComponent,
    SidenavComponent,
    NotesComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule,
    ContactManagerRoutingModule
  ],
  providers: [
    UserService
  ]
})
export class ContactManagerModule { }
