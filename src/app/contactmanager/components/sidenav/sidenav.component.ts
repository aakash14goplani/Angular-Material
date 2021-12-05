import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable, Subject, takeUntil } from 'rxjs';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {

  @ViewChild('sidenav') sidenav!: MatSidenav;
  isMobile: boolean = false;
  users!: Observable<User[]>;
  private readonly SMALL_WIDTH_BREAKPOINT: number = 720;
  private unsubscriber: Subject<void> = new Subject<void>();

  constructor(
    private breakPoint: BreakpointObserver,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.breakPoint.observe([
      `(max-width: ${this.SMALL_WIDTH_BREAKPOINT}px)`
    ]).pipe(
      takeUntil(this.unsubscriber)
    ).subscribe((state: BreakpointState) => {
      this.isMobile = state.matches;
    });

    this.users = this.userService.users;
    this.userService.loadAll();
  }

  close() {
    this.sidenav.close();
  }

  cloaseNavAfterClickForMobile() {
    if (this.isMobile) {
      this.sidenav.close();
    }
  }

  /* @HostListener('window:resize', ['$event'])
  detectScreenSize(event: Event): void {
    this.isMobile = window.innerWidth < 767;
  } */

  ngOnDestroy() {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

}
