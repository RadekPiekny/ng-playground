import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PathtestComponent } from './pathtest/pathtest.component';
import { CryptoVolumeComponent } from './crypto-volume/crypto-volume.component';
import { ThreeJSComponent } from './three-js/three-js.component';
import { LoadingComponent } from './loading/loading.component';
import { ObservableTestComponent } from './observable-test/observable-test.component';
import { LightDarkModeComponent } from './light-dark-mode/light-dark-mode.component';
import { HomeComponent } from './home/home.component';
import { RangeSliderComponent } from './range-slider/range-slider.component';
import { AngleShapeComponent } from './angle-shape/angle-shape.component';
import { AbscissaLineConvertorComponent } from './abscissa-line-convertor/abscissa-line-convertor.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'path', component: PathtestComponent },
  { path: 'crypto', component: CryptoVolumeComponent },
  { path: 'threeJS', component: ThreeJSComponent },
  { path: 'loading', component: LoadingComponent },
  { path: 'observable', component: ObservableTestComponent },
  { path: 'light-dark-mode', component: LightDarkModeComponent },
  { path: 'range-slider', component: RangeSliderComponent },
  { path: 'angle-shape', component: AngleShapeComponent },
  { path: 'abscissa-line-convertor', component: AbscissaLineConvertorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
