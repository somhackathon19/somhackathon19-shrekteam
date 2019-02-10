import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {LoginComponent} from './login/login.component';
import {RouterModule} from '@angular/router';
import {MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule, MatRadioModule} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SigninComponent} from './signin/signin.component';
import {HttpClient, HttpClientModule, HttpHandler} from '@angular/common/http';
import {IncidenciesDialogComponent, MainComponent, RouteDialogComponent} from './main/main.component';
import {LeafletModule} from '@asymmetrik/ngx-leaflet';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SigninComponent,
    MainComponent,
    IncidenciesDialogComponent,
    RouteDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatIconModule,
    MatDialogModule,
    FlexLayoutModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    LeafletModule.forRoot(),
    LeafletModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    IncidenciesDialogComponent,
    RouteDialogComponent
  ]
})
export class AppModule {
}
