import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImageSelectionComponent } from './image-selection/image-selection.component';
import { PathtestComponent } from './pathtest/pathtest.component';
import { CryptoVolumeComponent } from './crypto-volume/crypto-volume.component';

const routes: Routes = [
  { path: 'bla', component: ImageSelectionComponent },
  { path: 'path', component: PathtestComponent },
  { path: 'crypto', component: CryptoVolumeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
