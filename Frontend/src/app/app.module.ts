import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './services/login/login.component';
import { RegisterComponent } from './services/register/register.component';
import { HomeComponent } from './services/home/home.component';
import { NavbarComponent } from './services/navbar/navbar.component';

import {Routes,RouterModule} from '@angular/router';
import { PagenotfoundComponent } from './services/pagenotfound/pagenotfound.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CompoundsComponent } from './services/compounds/compounds.component';
import { ShowCompoundComponent } from './services/show-compound/show-compound.component';
import { EditCompoundComponent } from './services/edit-compound/edit-compound.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './guards/auth.guard';

const appRoutes: Routes =           
[
  {path:'',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:RegisterComponent},
  { path: 'compounds', component: CompoundsComponent,canActivate: [AuthGuard] }, 
  { path: 'compound/:id', component: ShowCompoundComponent ,canActivate: [AuthGuard]},
  {path: 'compound/:id/edit',component: EditCompoundComponent,canActivate: [AuthGuard]},
  { path: '**', pathMatch: 'full',  
    component: PagenotfoundComponent }, 
   
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    PagenotfoundComponent,
    CompoundsComponent,
    ShowCompoundComponent,
    EditCompoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [NavbarComponent]
})
export class AppModule { }
