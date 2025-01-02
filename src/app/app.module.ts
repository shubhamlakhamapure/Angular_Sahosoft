import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; //we dont required here,we required at feature module
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { FeatherIconComponent } from './feather-icon/feather-icon.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './components/auth/auth.module';
import { SharedModule } from './shared/shared.module';
//import { SharedModule } from './shared/shared.module';

@NgModule({
  // declarations: [AppComponent, FeatherIconComponent],
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    //NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      progressAnimation: 'decreasing',
      tapToDismiss: true,
    }),
    
    SharedModule,
    AuthModule,//FOR EAGER LOADING
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
