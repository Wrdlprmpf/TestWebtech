import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from '../app/login/login.component';
import {RegisterComponent} from '../app/register/register.component';
import {HomeComponent} from '../app/home/home.component';
import {OverviewComponent} from '../app/overview/overview.component';

const routes: Routes = [
    {  path: 'login', component: LoginComponent },
    {  path: 'register', component: RegisterComponent },
    {  path: 'home', component: HomeComponent },
    {  path: 'overview', component: OverviewComponent},
    {  path: '' , redirectTo:'/home',pathMatch:'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule{

}