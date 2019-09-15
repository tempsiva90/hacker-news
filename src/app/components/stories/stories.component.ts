import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/providers/api.service';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.scss']
})
export class StoriesComponent implements OnInit {

  storiesId=[]
  stories ={}
  loading=true;

  constructor(private api:ApiService) { }

  ngOnInit() {

    this.api.getTopStories().subscribe(d => {
    this.storiesId=this.api.topStoreisId
    this.stories = this.api.topStories
    this.loading=false;


    });
  }

}
