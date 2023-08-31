import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminStructureComponent } from './admin-structure/admin-structure.component';
import { AdminhomeComponent } from './adminhome/adminhome.component';
import { UserlistComponent } from './userlist/userlist.component';
import { PropertylistsComponent } from './propertylists/propertylists.component';
import { Adminauthguard } from '../services/auth-admin.guard';
import { EditpropertyComponent } from './editproperty/editproperty.component';

const routes: Routes = [
  {

    path:'adminmodule',
    component:AdminStructureComponent,
    canActivate:[Adminauthguard],
    children:[
      {
        path:'adminhome',
        component:AdminhomeComponent,
    canActivate:[Adminauthguard],

        children:[
          {
            path:'userlist',
            component:UserlistComponent,
    canActivate:[Adminauthguard],


          },
          {
            path:'propertylist',
            component:PropertylistsComponent,
    canActivate:[Adminauthguard],

          },

        //   {
        //     path: 'editproperty/:id',
        //     component: EditpropertyComponent,
        // canActivate:[Adminauthguard]

        //   },

          {
            path: 'editproperty',
            component: EditpropertyComponent,
        canActivate:[Adminauthguard]

          },
        ]
      }
    ]
  },

  {
    path: '',
    redirectTo: 'adminmodule',
    pathMatch: 'full',
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminmoduleRoutingModule { }
