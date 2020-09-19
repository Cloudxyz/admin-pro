import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor() {}

  async updateProfileImage(
    file: File,
    type: 'users' | 'hospitals' | 'doctors',
    id: string
  ) {
    try {
      const url = `${base_url}/upload/${type}/${id}`;
      const formData = new FormData();
      formData.append('img', file);

      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || '',
        },
        body: formData,
      });

      const data = await res.json();
      if (data.ok) {
        return data.nameFile;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
