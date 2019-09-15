import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';


describe('ApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],

  }));

  it('should be created', () => {
    const service: ApiService = TestBed.get(ApiService);
    expect(service).toBeTruthy();
  });

  it('getItem should call rest api', () => {
    const service: ApiService = TestBed.get(ApiService);

    const httpController:HttpTestingController = TestBed.get(HttpTestingController)

    service.getItem("topstories").subscribe((res:any) => {
      expect(res.length).toBe(3)
    })
    const url =`https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty`
    const req = httpController.expectOne(url)
    req.flush([ 20978055, 20977923, 20977788])
  });
});
