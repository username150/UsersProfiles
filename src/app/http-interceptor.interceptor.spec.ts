import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { HttpInterceptorInterceptor } from './http-interceptor.interceptor';
import { RequestService } from './shared/services/request.service';

describe('HttpInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [
      HttpInterceptorInterceptor,
      RequestService
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpInterceptorInterceptor = TestBed.inject(HttpInterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
