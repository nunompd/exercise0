import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface User {
  id: Number;
  username: string;
}

@Component({
  selector: 'app-promises-exe-1',
  templateUrl: './promises-exe-1.component.html',
  styleUrls: ['./promises-exe-1.component.css'],
})
export class PromisesExe1Component implements OnInit {
  constructor(private httpClient: HttpClient) {}

  ngOnInit() {
    const user = this.fetchUser(1);
    /**
     * what will be printed?
     * why the username is underlined in red?
     *
     */
    // console.log(user.username);
  }

  fetchUser(userId: Number): Promise<User> {
    return this.httpClient
      .get<User>(`https://dummyjson.com/users/${userId}`)
      .toPromise();
  }
}
