import { UserAuthService } from './../user-auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from './../message.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  activate: boolean = true;
  constructor(private ActivatedRoute: ActivatedRoute, private MessageService: MessageService, private toastService: ToastrService,private userService: UserAuthService) { }
  userId!: string
  message!: string
  msgForm!: FormGroup
  userName!: string
  img!: string
  ngOnInit(): void {
    this.userId = this.ActivatedRoute.snapshot.params.id
    this.msgForm=new FormGroup({
      message:new FormControl('',[Validators.required,Validators.minLength(3)])
    })
    this.userService.userMetaData(this.userId).subscribe((user:any) =>{
      this.userName = user.firstName + ' ' + user.lastName;
      this.img = user.profileImg
    })
  }

  sendMessage(msgForm:FormGroup) {

    this.activate = !this.activate
    this.MessageService.sendMessage(msgForm.value.message, this.userId).subscribe(data => {
      this.toastService.success('Message sent successfully')
      this.activate = !this.activate
      this.msgForm.reset()
    },
      err => {
        this.toastService.error('Error in sending message')
        this.activate = !this.activate
      })
  }

}
