import { NgModule } from '@angular/core';
import { HomePage } from './home-page/home-page';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormCreateUserComponent } from './form-create-user-component/form-create-user-component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HomePage, FormCreateUserComponent],
  exports: [HomePage],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
})
export class HomePageModule {}
