import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, filter, Subject, takeUntil, tap } from 'rxjs';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit, OnDestroy {

  user!: User | undefined;
  private unsubscriber: Subject<void> = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    combineLatest([
      this.route.params,
      this.userService.users
    ]).pipe(
      filter(([param, users]) => !!param),
      tap(([param, users]) => {
        const id = +param['id'] || 1;
        this.user = undefined;
        if (users.length === 0) return;
        // this.user = this.userService.getUserById(id);
        setTimeout(() => {
          this.user = this.userService.getUserById(id);
        }, 500);
      }),
      takeUntil(this.unsubscriber)
    ).subscribe();
  }

  ngOnDestroy() {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

}
