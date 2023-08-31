import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ResultpageComponent } from './resultpage/resultpage.component';
import { PostpropertyComponent } from './postproperty/postproperty.component';
import { PropertyviewComponent } from './propertyview/propertyview.component';
 import { EditpropComponent } from './editprop/editprop.component';
import { UserWhishlistComponent } from './user-whishlist/user-whishlist.component';
import { UsermoduleStructureComponent } from './usermodule-structure/usermodule-structure.component';
import { Userauthguard } from '../services/auth-user.guard';
 
const routes: Routes = [

  // {
  //   path: 'whishlist',
  //   component: UserWhishlistComponent,
  // },

  // {
  //   path: 'editproperty/:id',
  //   component: EditpropComponent,
  // },
  // {
  //     path: 'propertyview/:id',
  //  // path: 'propertyview',

  //   component: PropertyviewComponent,
  // },
  // {
  //   path: 'postproperty',
  //   component: PostpropertyComponent,
  // },
  // {
  //   path: 'serchresult',
  //   component: ResultpageComponent,
  // },
  // {
  //   path: 'profile',
  //   component: ProfileComponent,
  // },

  // {
  //   path: 'home',
  //   component: HomeComponent,
  // },
  {
    path: 'usermodule/profile',
    component: ProfileComponent,
    canActivate:[Userauthguard]

  },
  {
    path: 'usermodule/serchresult',
    component: ResultpageComponent,
  },
  {
    path: 'usermodule',
    component: UsermoduleStructureComponent,
    children:[

      {
        path: 'whishlist',
        component: UserWhishlistComponent,
    canActivate:[Userauthguard]

      },

      {
        path: 'editproperty/:id',
        component: EditpropComponent,
    canActivate:[Userauthguard]

      },
      {
          path: 'propertyview/:id',
       // path: 'propertyview',

        component: PropertyviewComponent,
      },
      {
        path: 'postproperty',
        component: PostpropertyComponent,
    canActivate:[Userauthguard]

      },
      {
        path: 'home',
        component: HomeComponent,
      },

    ]
  },
  {
    path: '',
    redirectTo: 'usermodule',
    pathMatch: 'full',
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsermmoduleRoutingModule {}
