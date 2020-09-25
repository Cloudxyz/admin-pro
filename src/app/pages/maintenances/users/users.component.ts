import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { SearchesService } from '../../../services/searches.service';

import Swal from 'sweetalert2';
import { ModalImageService } from '../../../services/modal-image.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [],
})
export class UsersComponent implements OnInit, OnDestroy {
  public totalUsers: number = 0;
  public users: User[] = [];
  public usersTemp: User[] = [];
  public from: number = 0;
  public loading: boolean = true;
  public imgSubs: Subscription;

  constructor(
    private userService: UserService,
    private searchService: SearchesService,
    private modalImageService: ModalImageService
  ) {}

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.loadUsers();
    this.imgSubs = this.modalImageService.imageChanged
      .pipe(delay(100))
      .subscribe((img) => this.loadUsers());
  }

  loadUsers() {
    this.loading = true;
    this.userService.getUsers(this.from).subscribe((res) => {
      this.totalUsers = res.total;
      if (res.users.length !== 0) {
        this.users = res.users;
        this.usersTemp = res.users;
        this.loading = false;
      }
    });
  }

  changePage(value: number) {
    this.from += value;

    if (this.from < 0) {
      this.from = 0;
    } else if (this.from > this.totalUsers) {
      this.from -= value;
    }
    this.loadUsers();
  }

  search(term: string) {
    if (term.length === 0) {
      return (this.users = this.usersTemp);
    }
    this.loading = true;
    this.searchService.search('users', term).subscribe((res) => {
      this.users = res;
      this.loading = false;
    });
  }

  delete(uid: string) {
    if (uid === this.userService.uid) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You cant delete yourself',
      });
    }
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.delete(uid).subscribe((res) => {
          this.loadUsers();
          Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
        });
      }
    });
  }

  changeRole(user: User) {
    this.userService.updateUser(user).subscribe((res) => {
      console.log(res);
    });
  }

  showModal(user: User) {
    this.modalImageService.showModal('users', user.uid, user.img);
  }
}
