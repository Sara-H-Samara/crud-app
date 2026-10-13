import { TestBed } from '@angular/core/testing';
import { UserStore } from './user-store';

describe('UserService', () => {
  let service: UserStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('adds a user', () => {
    service.save({ name: 'Lina', email: 'lina@example.com' });
    expect(service.count()).toBe(3);
  });
});
