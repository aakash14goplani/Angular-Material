import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-new-contact-dialog',
  templateUrl: './new-contact-dialog.component.html',
  styleUrls: ['./new-contact-dialog.component.scss']
})
export class NewContactDialogComponent implements OnInit, OnDestroy {

  user!: User;
  avatars: string[] = ['svg-1', 'svg-2', 'svg-3', 'svg-4'];
  name = new FormControl('', [Validators.required]);
  isFormValid: boolean = false;
  private unsubscriber: Subject<void> = new Subject<void>();

  constructor(
    private dialogRef: MatDialogRef<NewContactDialogComponent>,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.user = new User();
    this.name.valueChanges.pipe(
      takeUntil(this.unsubscriber)
    ).subscribe(value => {
      if (!!value && value.length > 1) {
        this.isFormValid = true;
      }
    });
  }

  save() {
    this.user.name = this.name.value;
    if (!!this.user.name) {
      this.userService.addUser(this.user).then(() => {
        this.isFormValid = true;
        this.dialogRef.close(this.user);
      }).catch(() => {
        this.isFormValid = false;
      });
    }
  }

  getErrorMessage(): string {
    return (this.name.hasError('required')) ? 'You must enter a name' : '';
  }

  ngOnDestroy() {
    this.unsubscriber.next();
    this.unsubscriber.complete();
  }

}
