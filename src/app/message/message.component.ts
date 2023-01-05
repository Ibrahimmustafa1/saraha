import { UserAuthService } from './../user-auth.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import openSocket from 'socket.io-client';
@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @ViewChild('closeModal')closeModal!:ElementRef
  name!: string
  messages!: Array<any>
  userId!: any
  imgPreview: any
  img: any
  disable:boolean = true;
  constructor(private UserAuthService: UserAuthService) { }

  ngOnInit(): void {
    const io = openSocket('http://localhost:3000');
    io.on('newMessgae',()=>{
      this.getMessages()
    })
    this.getMessages()
    this.UserAuthService.getUserProfileData().subscribe((user: any) => {
      this.userId = user._id;
      this.name = user.firstName + ' ' + user.lastName;
      this.img=user.profileImg
      this.imgPreview=user.profileImg
    })
  }
  changeImg(e: Event) {
    this.img = (e.target as HTMLInputElement).files![0];
    const fileReader = new FileReader();
    this.disable=!this.disable;
    fileReader.readAsDataURL(this.img)
    fileReader.onload = (evt: Event) => {
      this.imgPreview = fileReader.result;
    }
  }
  changeProfileImg() {
    this.disable=!this.disable;
    this.UserAuthService.updateProfileImg(this.img).subscribe(res => {
      this.disable=!this.disable;
      this.closeModal.nativeElement.click();
    })
  }
  getMessages(){
    this.UserAuthService.getUserMessage().subscribe(user => {
      this.messages = user.messages;
    })
  }
}
