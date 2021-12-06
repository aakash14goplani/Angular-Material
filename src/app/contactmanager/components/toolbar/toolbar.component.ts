import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, EMPTY, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { NewContactDialogComponent } from '../new-contact-dialog/new-contact-dialog.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnDestroy {

  @Output() toggleSideNav = new EventEmitter<void>();
  @Output() toggleTheme = new EventEmitter<void>();
  @Output() toggleDirection = new EventEmitter<void>();
  @Input() isMobile: boolean = false;
  private unsubscriber: Subject<void> = new Subject<void>();

  constructor(
    private matDialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  openAddContactDialog(): void {
    const dialogRef: MatDialogRef<NewContactDialogComponent, any> = this.matDialog.open(NewContactDialogComponent, {
      width: '25rem'
    });

    let newUserId: number = 1;
    dialogRef.afterClosed().pipe(
      tap(result => newUserId = result.id),
      switchMap(_ => this.openSnackBar('Contact added', 'Navigate').onAction()),
      switchMap(_ => this.router.navigate(['/contactmanager', newUserId])),
      takeUntil(this.unsubscriber),
      catchError(_ => EMPTY)
    ).subscribe();
  }

  openSnackBar(message: string, action: string): MatSnackBarRef<SimpleSnackBar> {
    return this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  ngOnDestroy() {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

}
