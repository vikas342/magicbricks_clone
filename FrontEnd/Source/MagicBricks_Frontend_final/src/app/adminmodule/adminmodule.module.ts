import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminhomeComponent } from './adminhome/adminhome.component';
import { AdminStructureComponent } from './admin-structure/admin-structure.component';
import { NavbarComponent } from './navbar/navbar.component';
 import { UserlistComponent } from './userlist/userlist.component';
import { PropertylistsComponent } from './propertylists/propertylists.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminmoduleRoutingModule } from './adminmodule-routing.module';
import { EditpropertyComponent } from './editproperty/editproperty.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AdminhomeComponent,
    AdminStructureComponent,
    NavbarComponent,
    UserlistComponent,
    PropertylistsComponent,
    EditpropertyComponent,
   ],
  imports: [
    CommonModule,
    AdminmoduleRoutingModule,ReactiveFormsModule,FormsModule,NgxPaginationModule

  ]
})
export class AdminmoduleModule { }
