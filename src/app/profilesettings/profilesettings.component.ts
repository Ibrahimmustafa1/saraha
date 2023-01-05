import { UserAuthService } from './../user-auth.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-profilesettings',
  templateUrl: './profilesettings.component.html',
  styleUrls: ['./profilesettings.component.css']
})
export class ProfilesettingsComponent implements OnInit {
  @ViewChild('closeModal') closeModal!: ElementRef


  name!: string
  messages!: Array<any>
  imgPreview: any
  img: any
  disable: boolean = true;
  editForm!: FormGroup
  activate: boolean = false
  constructor(private UserAuthService: UserAuthService,private toast: ToastrService) { }

  ngOnInit(): void {
    this.UserAuthService.getUserProfileData().subscribe((user: any) => {
      console.log(user);
      this.name = user.firstName + ' ' + user.lastName;
      this.img = user.profileImg
      this.imgPreview = user.profileImg
      this.editForm = new FormGroup({
        firstName: new FormControl(user.firstName, Validators.required),
        lastName: new FormControl(user.lastName, Validators.required),
        email: new FormControl(user.email, [Validators.required, Validators.email]),
      })
    })

  }

  edit(editField: HTMLInputElement) {
    editField.readOnly = false
    editField.focus()
  }
  changeImg(e: Event) {
    this.img = (e.target as HTMLInputElement).files![0];
    const fileReader = new FileReader();
    this.disable = !this.disable;
    fileReader.readAsDataURL(this.img)
    fileReader.onload = (evt: Event) => {
      this.imgPreview = fileReader.result;
    }
  }
  changeProfileImg() {
    this.disable = !this.disable;
    this.UserAuthService.updateProfileImg(this.img).subscribe(res => {
      this.disable = !this.disable;
      this.closeModal.nativeElement.click();
    }, err => {
      console.log(err);
    })
  }
  changeProfileData(form: FormGroup) {
    this.activate=!this.activate;
    let data = form.value
    data.profileImg = this.imgPreview
    this.UserAuthService.updateUserProfile(data).subscribe(res => {
      this.activate=!this.activate;
      this.toast.success('Profile data updated successfully')

    },err=>{
      this.activate=!this.activate;
      this.toast.success('Error In Updating Profile Data')
    })
  }
}
