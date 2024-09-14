import { HttpClient } from '@angular/common/http';
import {Component, ElementRef, ViewChild } from '@angular/core';
import { UrlConstants } from 'src/app/constants/UrlConstants';

@Component({
  selector: 'app-lock',
  templateUrl: 'lock.page.html',
  styleUrls: ['lock.page.scss'],
})
export class LockPage{

  lzwResponse: string = ''
  desResponse: string = ''

  invalidKeyLength: boolean = false
  enableEncryptBtn: boolean = false

  @ViewChild('message', { static: false }) messageRef!: ElementRef;

  constructor(private http: HttpClient){}
  
  encryptMessage(key: string) {

    this.invalidKeyLength = false
    let data = new FormData();
    data.append('message', this.lzwResponse)
    data.append('key', key)

    console.log(data)
    this.http.post(UrlConstants.BASE_URL + "/des/encrypt/message", data).subscribe((response: any) => {
      this.desResponse = response.message
    }, error => {
      this.invalidKeyLength = true
    })
  }

  compressMessage(message: string) {

    this.invalidKeyLength = false
    let data = new FormData();
    data.append('message', message);
    this.lzwResponse = '';
    this.desResponse = '';

    this.http.post(UrlConstants.BASE_URL + "/lzw/compress/message", data).subscribe((response: any) => {

      this.lzwResponse = response.message
      this.enableEncryptBtn = true;

    })
  }

  insertFileData(fileData: any){

    const files = fileData[0]
    console.log(files)
    const reader = new FileReader();

    reader.addEventListener(
        "load",
        () => {
          this.messageRef.nativeElement.value = reader.result

        },
        false,
    );

    reader.readAsText(files)

  }

}