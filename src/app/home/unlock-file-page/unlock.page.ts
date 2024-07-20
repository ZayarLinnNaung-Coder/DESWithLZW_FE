import { HttpClient } from '@angular/common/http';
import {Component, ElementRef, ViewChild } from '@angular/core';
import { UrlConstants } from 'src/app/constants/UrlConstants';

@Component({
  selector: 'app-unlock-file',
  templateUrl: 'unlock.page.html',
  styleUrls: ['unlock.page.scss'],
})
export class UnlockFilePage{
  

  lzwResponse: string = ''
  desResponse: string = ''

  constructor(private http: HttpClient){}
  
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  
  decryptMessage(key: string) {

    let selectedFile = this.fileInput.nativeElement.files[0];

    let formData = new FormData();
    formData.append('key', key)
    formData.append('file', selectedFile)
    
    const url = UrlConstants.BASE_URL + "/des/decrypt/file";
    this.http.post(url, formData, { responseType: 'blob' }).subscribe(blob => {
      
      const decryptedFile = new File([blob], selectedFile.name);

      let formData = new FormData();
      formData.append('file', decryptedFile)
      const url = UrlConstants.BASE_URL + "/lzw/decompress/file";
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