import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  imports: [],
  templateUrl: './user-details.html',
})
export class UserDetails {
  private readonly route = inject(ActivatedRoute);

  readonly userId = this.route.snapshot.paramMap.get('id');
}
