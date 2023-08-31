import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

 import { NavbarComponent } from './navbar/navbar.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { UsermmoduleModule } from './usermmodule/usermmodule.module';
import { AdminmoduleModule } from './adminmodule/adminmodule.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { StructureLogRegComponent } from './structure-log-reg/structure-log-reg.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { propertyreducer } from './state/propterty_store/reducer';
import { property_effects } from './state/propterty_store/effect';
import { apireducer } from './state/user_store/reducer';
import { dataeffect } from './state/user_store/effects';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    LoginComponent,
    StructureLogRegComponent,
    PagenotfoundComponent,

  ],
  imports: [
    BrowserModule,
     FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    UsermmoduleModule,
    AdminmoduleModule,
    StoreModule.forRoot({'data':apireducer,'data2':propertyreducer} ),
    StoreDevtoolsModule.instrument({ name:'magicbricks' }),
    EffectsModule.forRoot([dataeffect,property_effects])




  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
