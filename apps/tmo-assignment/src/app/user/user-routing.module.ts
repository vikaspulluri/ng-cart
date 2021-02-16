import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionComponent } from './collection/collection.component';

export const userRoutes: Routes = [
  { path: '', component: CollectionComponent },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(userRoutes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
