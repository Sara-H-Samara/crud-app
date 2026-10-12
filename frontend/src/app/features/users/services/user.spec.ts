import { TestBed } from '@angular/core/testing';
import { UserService } from './user';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('adds a user', () => {
    service.save({ name: 'Lina', email: 'lina@example.com' });
    expect(service.count()).toBe(3);
  });
});
