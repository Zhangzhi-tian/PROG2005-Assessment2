import { Routes } from '@angular/router';
import { AppComponent } from './app';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'manage', component: AppComponent },
  { path: 'search', component: AppComponent },
  { path: 'privacy', component: AppComponent },
  { path: 'help', component: AppComponent },
];