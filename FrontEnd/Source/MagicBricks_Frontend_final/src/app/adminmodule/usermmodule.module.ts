import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { hidenumberpipe } from '../c.number_pipe';
import { IndianCurrency } from '../currency.pipe';
import { FooterComponent } from '../footer/footer.component';
import { ForgetpasswordComponent } from '../forgetpassword/forgetpassword.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { AdviceandtoolsComponent } from '../usermmodule/adviceandtools/adviceandtools.component';
import { EditpropComponent } from '../usermmodule/editprop/editprop.component';
import { HomeComponent } from '../usermmodule/home/home.component';
import { PostpropertyComponent } from '../usermmodule/postproperty/postproperty.component';
import { ProfileComponent } from '../usermmodule/profile/profile.component';
import { PropertyviewComponent } from '../usermmodule/propertyview/propertyview.component';
import { RealestateGuideComponent } from '../usermmodule/realestate-guide/realestate-guide.component';
import { ResultpageComponent } from '../usermmodule/resultpage/resultpage.component';
import { UserWhishlistComponent } from '../usermmodule/user-whishlist/user-whishlist.component';
import { UsermmoduleRoutingModule } from '../usermmodule/usermmodule-routing.module';
import { UsermoduleStructureComponent } from '../usermmodule/usermodule-structure/usermodule-structure.component';



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
    EditpropComponent,
    IndianCurrency,
    hidenumberpipe,
    ForgetpasswordComponent,
    UserWhishlistComponent,
    UsermoduleStructureComponent
  ],
  imports: [
    CommonModule,
    UsermmoduleRoutingModule,FormsModule,ReactiveFormsModule
  ]
})
export class UsermmoduleModule { }
