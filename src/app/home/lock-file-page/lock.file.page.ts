import { HttpClient } from '@angular/common/http';
import {Component, ElementRef, ViewChild } from '@angular/core';
import { UrlConstants } from 'src/app/constants/UrlConstants';

@Component({
  selector: 'app-lock-file',
  templateUrl: 'lock.file.page.html',
  styleUrls: ['lock.file.page.scss'],
})
export class LockFilePage{

  lzwResponse: string = ''
  desResponse: string = ''

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  constructor(private http: HttpClient){}
  
  encryptMessage(key: string) {

    let selectedFile = this.fileInput.nativeElement.files[0];

    let formData = new FormData();
    formData.append('file', selectedFile);

    const url = UrlConstants.BASE_URL + "/lzw/compress/file";
    this.http.post(url, formData, { responseType: 'blob' }).subscribe(blob => {
      
      const compressedFile = new File([blob], selectedFile.name);

      const url = UrlConstants.BASE_URL + "/des/encrypt/file";

      let formData = new FormData();
      formData.append('key', key);
      formData.append('file', compressedFile);

      this.http.post(url, formData, { responseType: 'blob' }).subscribe(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = selectedFile.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

      })
    })

  }

}