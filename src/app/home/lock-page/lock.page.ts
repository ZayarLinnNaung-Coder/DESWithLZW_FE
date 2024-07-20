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

  constructor(private http: HttpClient){}
  
  encryptMessage(key: string, message: string) {

    let data = new FormData();
    data.append('message', message)

    this.http.post(UrlConstants.BASE_URL + "/lzw/compress/message", data).subscribe((response: any) => {
      
      this.lzwResponse = response.message

      let data = new FormData();
      data.append('message', this.lzwResponse)
      data.append('key', key)

      this.http.post(UrlConstants.BASE_URL + "/des/encrypt/message", data).subscribe((response: any) => {
        this.desResponse = response.message
      })

    })
  }
}