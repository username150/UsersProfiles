import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ViewComponent } from './view/view.component';
import { LoaderComponent } from 'src/app/shared/loader/loader.component';


@NgModule({
  declarations: [
    HomeComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
