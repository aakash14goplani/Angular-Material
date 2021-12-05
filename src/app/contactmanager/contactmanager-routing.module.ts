import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainContentComponent } from './components/main-content/main-content.component';
import { ContactmanagerAppComponent } from './contactmanager-app.component';

const routes: Routes = [
  {
    path: '', component: ContactmanagerAppComponent, children: [
      { path: ':id', component: MainContentComponent },
      { path: '', component: MainContentComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactManagerRoutingModule { }
