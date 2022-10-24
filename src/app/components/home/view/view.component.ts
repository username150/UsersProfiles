import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, Subscription } from 'rxjs';
import { Posts } from 'src/app/shared/models/posts';
import { User } from 'src/app/shared/models/user';
import { RequestService } from 'src/app/shared/services/request.service';
import { TransferService } from 'src/app/shared/services/transfer.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit, OnDestroy {
  user!: User;
  posts: any = [];
  subscription: Subscription | undefined;
  constructor(private transfer: TransferService,
              private request: RequestService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService) {
    
   }

  ngOnInit(): void {
    this.subscription =  this.transfer.posts.subscribe(res=> {
      if (res) {
        this.user = res;
        this.posts = this.user?.posts;
      }else {
        this.getUsersAndPosts(environment.getUsers, environment.getPosts);
      }
    });
  }

  getUsersAndPosts(usersUrl: string, postsUrl: string) {

    let users = this.request.getConfigResponse(usersUrl);
    let posts = this.request.getConfigResponse(postsUrl);

    forkJoin(
      [users, posts]
    ).subscribe(res => {
        let users: any = res[0];
        let posts: any = res[1];
        let usersList = users.map((el: User)=> {
            return {
              ...el,
              posts: posts.filter((el1: Posts) => el.id == el1.userId)
            }
        });
        this.route.paramMap.subscribe(param => {
          let id = param.get('id');
          this.user = usersList.filter((res: User) => res.id == +(id as string))[0];
          this.posts = this.user?.posts;
          if (!this.user){
            this.toastr.error('No such user exists', 'Error',{
              timeOut: 3000,
            });
            this.router.navigateByUrl('home');
          }

        });
    });
  }

  ngOnDestroy(): void {
    if (this.subscription){
      this.subscription.unsubscribe();
    }
  }

}
