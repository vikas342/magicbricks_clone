import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsermmoduleRoutingModule } from './usermmodule-routing.module';
import { HomeComponent } from './home/home.component';
 import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdviceandtoolsComponent } from './adviceandtools/adviceandtools.component';
import { RealestateGuideComponent } from './realestate-guide/realestate-guide.component';
import { FooterComponent } from '../footer/footer.component';
import { ResultpageComponent } from './resultpage/resultpage.component';
import { PostpropertyComponent } from './postproperty/postproperty.component';
import { PropertyviewComponent } from './propertyview/propertyview.component';
import { IndianCurrency } from '../currency.pipe';
import { EditpropComponent } from './editprop/editprop.component';
import { hidenumberpipe } from '../c.number_pipe';
import { ForgetpasswordComponent } from '../forgetpassword/forgetpassword.component';
import { UserWhishlistComponent } from './user-whishlist/user-whishlist.component';
import { UsermoduleStructureComponent } from './usermodule-structure/usermodule-structure.component';
import { ProfileComponent } from './profile/profile.component';
import { DataService } from '../services/data.service';
import { RecomdationsComponent } from './recomdations/recomdations.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    HomeComponent,
    ProfileComponent,
    NavbarComponent,
    AdviceandtoolsComponent,
    RealestateGuideComponent,
    FooterComponent,
    ResultpageComponent,
    PostpropertyComponent,
    PropertyviewComponent,
    IndianCurrency,
    EditpropComponent,
    hidenumberpipe,
    ForgetpasswordComponent,
    UserWhishlistComponent,
    UsermoduleStructureComponent,
    RecomdationsComponent,
    ],  providers: [DataService],
  imports: [
    CommonModule,
    UsermmoduleRoutingModule,FormsModule,ReactiveFormsModule,NgxPaginationModule
  ]
})
export class UsermmoduleModule { }
