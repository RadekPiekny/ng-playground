import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImageSelectionComponent } from './image-selection/image-selection.component';
import { PathtestComponent } from './pathtest/pathtest.component';
import { CryptoVolumeComponent } from './crypto-volume/crypto-volume.component';
import { ThreeJSComponent } from './three-js/three-js.component';
import { LoadingComponent } from './loading/loading.component';
import { ObservableTestComponent } from './observable-test/observable-test.component';

const routes: Routes = [
  { path: 'bla', component: ImageSelectionComponent },
  { path: 'path', component: PathtestComponent },
  { path: 'crypto', component: CryptoVolumeComponent },
  { path: 'threeJS', component: ThreeJSComponent },
  { path: 'loading', component: LoadingComponent },
  { path: 'observable', component: ObservableTestComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
