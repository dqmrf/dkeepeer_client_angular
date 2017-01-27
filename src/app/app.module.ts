import { BrowserModule }   from '@angular/platform-browser';
import { NgModule }        from '@angular/core';
import { FormsModule }     from '@angular/forms';
import { HttpModule }      from '@angular/http';
import { OAuthModule }     from 'angular-oauth2-oidc';
import { BASE_URL }        from "./app.tokens";
import { AppComponent }    from './app.component';
import { AppRoutingModule } from "./app.routes";
import { HomeComponent } from "./home/home.component";
import { AuthService } from "./auth/auth.service"
 
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    OAuthModule.forRoot()
  ],
  providers: [
    AuthService,
    { provide: BASE_URL, useValue: "https://localhost:3000" }
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }
