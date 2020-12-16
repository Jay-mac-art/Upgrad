//our root app component
import {Component, NgModule, VERSION} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'

interface IPosts {
  title : string;
  body : string;
  postedAt : Date;
  createdBy : string;
  numberOfVotes : number;
}

@Component({
  selector: 'my-app',
  template: `
    <div>
      <button (click)="newPost()">Generate new post</button>
      <button (click)="deletePost()">Delete most recent post</button>
      <h2>Hello {{name}}</h2>
      <h4>Welcome to Dreddit!</h4>
      <ul *ngFor="let post of posts;let i = index">
        <li>{{i+1}}.
        Votes : <strong>{{post.numberOfVotes}}</strong>
        {{post.title}}<br>
        <button (click)="vote(i, 'up')">Vote Up</button>
        <button (click)="vote(i, 'down')">Vote Down</button>
        <button (click)="updatePost(i)">Update Post</button>
        <h1 *ngIf="post.numberOfVotes<0">USER WAS BANNED FOR THIS POST</h1>
        </li>
      </ul>
    </div>
  `,
})
export class App {
  name:string;
  posts : IPosts[] = [];
  constructor() {
   this.posts.push({
     title: "My First Dreddit Post",
     body : "This is the body text of my first Dreddit post",
     postedAt : new Date(),
     createdBy : "Arswaw",
     numberOfVotes : 3
   });
   this.name = `Angular! v${VERSION.full}`
  }
  newPost() : void {
    this.posts.push({
      title: `Another Dreddit post with number ${Math.random()}`,
      body : 'Another Dreddit post body with number ${Math.random()}',
      postedAt : new Date().toDateString(),
      createdBy : "Somebody",
      numberOfVotes : 0
    })
  }
  deletePost() : void {
    this.posts.pop()
  }
  updatePost(index : nunmber) : void {
    this.posts[index].title = `Another Dreddit post with number ${Math.random()} that has been updated`;
  }
  vote(index : number, action : string) {
    action === "up" ? this.posts[index].numberOfVotes++ : this.posts[index].numberOfVotes--;
    this.posts.sort(function(a, b) {
    return parseFloat(b.numberOfVotes) - parseFloat(a.numberOfVotes);
});
  }
}

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ App ],
  bootstrap: [ App ]
})
export class AppModule {}