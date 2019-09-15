import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
} from "@angular/common/http/testing";

import { StoryComponent } from "./story.component";
import { ApiService } from "src/app/providers/api.service";

describe("StoryComponent", () => {
  let component: StoryComponent;
  let fixture: ComponentFixture<StoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StoryComponent],
      imports: [HttpClientTestingModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should call loadComments when clicking comment button", async(() => {
    spyOn(component, "loadComments");

    let button = fixture.debugElement.nativeElement.querySelector("#comment");
    button.click();
    fixture.whenStable().then(() => {
      expect(component.loadComments).toHaveBeenCalled();
    });
  }));

  it("should change commentExpand field to true when clicking comment button", async(() => {
    let button = fixture.debugElement.nativeElement.querySelector("#comment");
    button.click();
    expect(component.commentExpand).toBeTruthy();
  }));

  it("should not call REST API when calling loadComments() with 0 kids comments", () => {
    const service: ApiService = TestBed.get(ApiService);
    spyOn(service, "getItem");
    component.loadComments(undefined);
    expect(service.getItem).not.toHaveBeenCalled();
  });
  it("should not call REST API when calling loadComments() by passing atleast 1 kid  in already expanded comments ", () => {
    component.commentExpand = true;
    const service: ApiService = TestBed.get(ApiService);
    spyOn(service, "getItem");
    component.loadComments([234354]);
    expect(service.getItem).not.toHaveBeenCalled();
  });
});
