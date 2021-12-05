import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-contactmanager-app',
  template: `
    <app-sidenav></app-sidenav>
    <!-- <router-outlet></router-outlet> -->
  `,
  styles: [
  ]
})
export class ContactmanagerAppComponent implements OnInit {

  constructor(
    private matIcon: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {
    matIcon.addSvgIconSet(this.sanitizer.bypassSecurityTrustResourceUrl('assets/avatars.svg'))
  }

  ngOnInit(): void {
  }

}
