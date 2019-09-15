import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpParams, HttpClient } from "@angular/common/http";
import { tap, map, switchMap } from "rxjs/operators";
import { forkJoin } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  topStoreisId = [];
  topStories = {};
  
  constructor(private http: HttpClient) {}

  /**Heps to get data from server based on items */
  getItem(id) {
    let params = new HttpParams();
    params = params.append("print", "pretty");
    return this.http.get(`${environment.url}${id}.json`, {
      params
    });
  }

  /** get top stories from server */
  getTopStories() {
    return this.getItem("topstories").pipe(
      tap((res: any) => {
        this.topStoreisId = res;
      }),
      map(stories => this.getChildrenData(stories))
    );
  }

  /** accept data from server by each item of story array */
  getChildrenData(children) {
    return children.map(storyID =>
      this.getItem(`item/${storyID}`)
        .pipe(map(story => story))
        .subscribe(story => {
          this.topStories[storyID] = story;
          return story;
        })
    );
  }
}
