// import { Component } from '@angular/core';
// import { Routes } from '@angular/router';
// import { HomeComponent } from './pages/home/home.component';
// import { DashboardComponent } from './pages/dashboard/dashboard.component';
// import { TransactionsComponent } from './pages/transactions/transactions.component';
// import { HelpComponent } from './pages/help/help.component';
// import { LoginComponent } from './pages/login/login.component';

// export const routes: Routes = [
//     {path: 'home', component: HomeComponent},
//     {path: 'dashboard', component: DashboardComponent},
//     {path: 'transactions', component: TransactionsComponent},
//     {path: 'help', component: HelpComponent},
//     {path: 'login', component: LoginComponent},
//     {path:'', redirectTo:'/home'}
// ];

import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { HelpComponent } from './pages/help/help.component';
import { LoginComponent } from './pages/login/login.component';
import { AddComponent } from './pages/add/add.component';

const routeComponents = {
    home: HomeComponent,
    dashboard: DashboardComponent,
    transactions: TransactionsComponent,
    help: HelpComponent,
    login: LoginComponent,
    add: AddComponent
};

export const routes: Routes = [
    { path: 'home', component: routeComponents.home },
    { path: 'dashboard', component: routeComponents.dashboard },
    { path: 'transactions', component: routeComponents.transactions },
    { path: 'help', component: routeComponents.help },
    { path: 'login', component: routeComponents.login },
    { path: 'add', component: routeComponents.add },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
];
