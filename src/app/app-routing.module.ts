import { IsAuthGuard } from './is-auth.guard';
import { ProfilesettingsComponent } from './profilesettings/profilesettings.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MessageComponent } from './message/message.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path:'register',component: RegisterComponent},
  { path:'message',
    component: MessageComponent,
    canActivate:[IsAuthGuard],
  },
  { path:'userprofile/:id',component: UserprofileComponent},
  { path:'editprofile',component: ProfilesettingsComponent,canActivate:[IsAuthGuard],}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
