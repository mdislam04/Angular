import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  message: string = 'Welcome to profile page !!!';
  constructor(private service: DataService) { }

  ngOnInit() {
  }

  users: any;
  isVisible: boolean = false;
  isLoding: boolean = false;
  getUsers(): void {
    this.isLoding = true;
    this.isVisible = false;
    this.service.getData().subscribe(
      users => {
        console.log(JSON.stringify(users));
        this.isLoding = false;
        this.isVisible = true;
        this.users = users;
      }
    );
  }

}
