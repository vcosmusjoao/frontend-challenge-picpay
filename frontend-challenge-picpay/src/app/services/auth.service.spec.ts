import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from './auth.service'; 
import { Router } from '@angular/router';

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        AuthService,
        { provide: Router, useClass: MockRouter } 
      ]
    });
    
    service = TestBed.inject(AuthService); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
