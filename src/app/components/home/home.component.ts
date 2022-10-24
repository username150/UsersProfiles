import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { Posts } from 'src/app/shared/models/posts';
import { User } from 'src/app/shared/models/user';
import { RequestService } from 'src/app/shared/services/request.service';
import { TransferService } from 'src/app/shared/services/transfer.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public usersList: User[] = [];
  constructor(private request: RequestService,
              private router: Router,
              private route: ActivatedRoute,
              private transfer: TransferService) { }

  ngOnInit(): void {
      this.getUsersAndPosts(`${environment.getUsers}`, `${environment.getPosts}`);
  }

  getUsersAndPosts(usersUrl: string, postsUrl: string) {

    let users = this.request.getConfigResponse(usersUrl);
    let posts = this.request.getConfigResponse(postsUrl);

    forkJoin(
      [users, posts]
    ).subscribe(res => {
        let users: any = res[0];
        let posts: any = res[1];
        this.usersList = users.map((el: User)=> {
            return {
              ...el,
              posts: posts.filter((el1: Posts) => el.id == el1.userId)
            }
        });

    });
  }

  navigate(user: User) {
    this.transfer.posts.next(user);
    this.router.navigate([user.id], {relativeTo:this.route});
  }
}
