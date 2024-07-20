import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { UnlockPage } from './unlock-page/unlock.page';
import { LockPage } from './lock-page/lock.page';
import { LockFilePage } from './lock-file-page/lock.file.page';
import { UnlockFilePage } from './unlock-file-page/unlock.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'compress-encrypt',
    component: LockPage,
  },
  {
    path: 'decrypt-decompress',
    component: UnlockPage,
  },
  {
    path: 'compress-encrypt-file',
    component: LockFilePage,
  },
  {
    path: 'decrypt-decompress-file',
    component: UnlockFilePage,
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
