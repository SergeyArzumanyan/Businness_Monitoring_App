import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from "@components/auth";
import { HeaderComponent } from '@components/header';
import { LargeHeaderComponent, SmallHeaderComponent } from '@components/header/components';

import { environment } from '../environments/environment';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { PasswordModule } from "primeng/password";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ButtonModule } from "primeng/button";
import { SweetsComponent } from './components/sweets/sweets.component';
import { LargeSweetsComponent } from './components/sweets/components/large-sweets/large-sweets.component';
import { SmallSweetsComponent } from './components/sweets/components/small-sweets/small-sweets.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent,
    LargeHeaderComponent,
    SmallHeaderComponent,
    SweetsComponent,
    LargeSweetsComponent,
    SmallSweetsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    PasswordModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase()),
    ButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {}
