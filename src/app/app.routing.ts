import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { HistoryComponent } from './History/history.component';

const appRoutes: Routes = [
    {
        path: '',
        component:HomeComponent     
    },
    
    {
        path: 'home',
        component:HomeComponent     
    },
    {
        path: 'profile',
        component:ProfileComponent     
    },
    {
        path: 'history',
        component:HistoryComponent     
    }
];

export const RotingModule: ModuleWithProviders = RouterModule.forRoot(appRoutes);