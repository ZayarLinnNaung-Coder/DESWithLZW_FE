import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { LockPage } from './lock-page/lock.page';
import { UnlockPage } from './unlock-page/unlock.page';
import { LockFilePage } from './lock-file-page/lock.file.page';
import { UnlockFilePage } from './unlock-file-page/unlock.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, LockPage, LockFilePage, UnlockPage, UnlockFilePage]
})
export class HomePageModule {}
