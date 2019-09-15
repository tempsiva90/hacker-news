import { Component, Input } from "@angular/core";
import { ApiService } from "src/app/providers/api.service";
import { forkJoin } from "rxjs";

@Component({
  selector: "app-story",
  templateUrl: "./story.component.html",
  styleUrls: ["./story.component.scss"]
})
export class StoryComponent   {
  @Input() story = {};

  comments = [];
  commentExpand = false;
  loading = false;
  constructor(private api: ApiService) {}

  loadComments(ids) {
    this.commentExpand = !this.commentExpand;
    if (this.commentExpand && ids) {
      this.loading = true;

      forkJoin(ids.map(id => this.api.getItem(`item/${id}`))).subscribe(
        comments => {
          this.comments = comments;
          this.loading = false; 
        }
      );
    }
  }
}
