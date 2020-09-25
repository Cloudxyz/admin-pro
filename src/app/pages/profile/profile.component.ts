import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import Swal from 'sweetalert2';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [],
})
export class ProfileComponent implements OnInit {
  public profileForm: FormGroup;
  public imageUpload: File;
  public user: User;
  public imgTemp: any = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private fileUploadService: UploadService
  ) {
    this.user = this.userService.user;
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
    });
  }

  updateProfile() {
    this.userService.updateProfile(this.profileForm.value).subscribe(
      (res) => {
        const { name, email } = this.profileForm.value;
        this.user.name = name;
        this.user.email = email;
        Swal.fire({
          title: 'Success',
          text: 'User Updated',
          icon: 'success',
          confirmButtonText: 'Confirm',
        });
      },
      (error) => {
        Swal.fire({
          title: 'Error',
          text: error.error.msg,
          icon: 'error',
          confirmButtonText: 'Confirm',
        });
      }
    );
  }

  changeImage(file: File) {
    this.imageUpload = file;

    if (!file) {
      return (this.imgTemp = null);
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    };
  }

  uploadImage() {
    this.fileUploadService
      .updateProfileImage(this.imageUpload, 'users', this.user.uid)
      .then((img) => {
        Swal.fire({
          title: 'Success',
          text: 'Image Updated',
          icon: 'success',
          confirmButtonText: 'Confirm',
        });
        console.log(this.user);
      })
      .catch((error) => {
        Swal.fire({
          title: 'Error',
          text: 'Image cant be uploaded',
          icon: 'error',
          confirmButtonText: 'Confirm',
        });
      });
  }
}
