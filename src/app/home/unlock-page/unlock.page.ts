import { HttpClient } from '@angular/common/http';
import {Component } from '@angular/core';
import { UrlConstants } from 'src/app/constants/UrlConstants';

@Component({
  selector: 'app-unlock',
  templateUrl: 'unlock.page.html',
  styleUrls: ['unlock.page.scss'],
})
export class UnlockPage{

  lzwResponse: string = ''
  desResponse: string = ''

  enableDecompressBtn = false

  constructor(private http: HttpClient){}

  decompressMessage(message: string) {

    let data = new FormData();
    data.append('message', this.desResponse)
    this.http.post(UrlConstants.BASE_URL + "/lzw/decompress/message", data).subscribe((response: any) => {
      this.lzwResponse = response.message
    })

  }
  
  decryptMessage(key: string, message: string) {

    let data = new FormData();
    data.append('message', message)
    data.append('key', key)

    this.http.post(UrlConstants.BASE_URL + "/des/decrypt/message", data).subscribe((response: any) => {
      this.desResponse = response.message
      this.enableDecompressBtn = true
    })
  }

}