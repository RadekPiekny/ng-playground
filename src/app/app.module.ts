import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ImageSelectionComponent } from './image-selection/image-selection.component';
import { PathtestComponent } from './pathtest/pathtest.component';
import { CryptoVolumeComponent } from './crypto-volume/crypto-volume.component';
import { ThreeJSComponent } from './three-js/three-js.component';
import { LoadingComponent } from './loading/loading.component';
import { ObservableTestComponent } from './observable-test/observable-test.component';
import { LightDarkModeComponent } from './light-dark-mode/light-dark-mode.component';
import { HomeComponent } from './home/home.component';
import { RangeSliderComponent } from './range-slider/range-slider.component';
import { AngleShapeComponent } from './angle-shape/angle-shape.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AbscissaLineConvertorComponent } from './abscissa-line-convertor/abscissa-line-convertor.component';


@NgModule({
  declarations: [
    AppComponent,
    ImageSelectionComponent,
    PathtestComponent,
    CryptoVolumeComponent,
    ThreeJSComponent,
    LoadingComponent,
    ObservableTestComponent,
    LightDarkModeComponent,
    HomeComponent,
    RangeSliderComponent,
    AngleShapeComponent,
    AbscissaLineConvertorComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
