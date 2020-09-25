import { Component, OnInit } from '@angular/core';
import { ModalImageService } from '../../services/modal-image.service';
import { UploadService } from '../../services/upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [],
})
export class ModalImageComponent implements OnInit {
  public imageUpload: File;
  public imgTemp: any = '';

  constructor(
    public modalImageService: ModalImageService,
    public fileUploadService: UploadService
  ) {}

  ngOnInit(): void {}

  closeModal() {
    this.imgTemp = null;
    this.modalImageService.closeModal();
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
    const id = this.modalImageService.id;
    const type = this.modalImageService.type;
    this.fileUploadService
      .updateProfileImage(this.imageUpload, type, id)
      .then((img) => {
        this.closeModal();
        this.modalImageService.imageChanged.emit(img);
        Swal.fire({
          title: 'Success',
          text: 'Image Updated',
          icon: 'success',
          confirmButtonText: 'Confirm',
        });
      })
      .catch((error) => {
        this.closeModal();
        Swal.fire({
          title: 'Error',
          text: 'Image cant be uploaded',
          icon: 'error',
          confirmButtonText: 'Confirm',
        });
      });
  }
}
