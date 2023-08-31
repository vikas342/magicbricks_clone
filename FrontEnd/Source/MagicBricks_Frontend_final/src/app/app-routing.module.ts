import { NgModule } from '@angular/core';
 import { StructureLogRegComponent } from './structure-log-reg/structure-log-reg.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LoginComponent } from './login/login.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { Routes, RouterModule } from '@angular/router';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes =
[


  {
    path: '',
    component: StructureLogRegComponent,

    children: [
      {
        path: '',

        component: LoginComponent,
      },
      {
        path: 'login',

        component: LoginComponent,
      },
      {
        path: 'signup',
        component: SignUpComponent,
      },
      {
        path: 'forgetpasword',
        component: ForgetpasswordComponent,
      },

    ],

  },
  {
    path:"usermodule",loadChildren:()=> import('./usermmodule/usermmodule.module').then(m=> m.UsermmoduleModule)
  },
  {
    path:"adminmodule",loadChildren:()=> import('./adminmodule/adminmodule.module').then(m=> m.AdminmoduleModule),
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
