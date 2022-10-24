import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RequestService } from './shared/services/request.service';
import { RouterTestingModule } from "@angular/router/testing";
import { routes } from './app-routing.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes), HttpClientTestingModule],
      declarations: [
        AppComponent
      ],
      providers: [
        RequestService
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'TestApp'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('TestApp');
  });

});
