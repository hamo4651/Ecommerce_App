import { Component } from '@angular/core';
import { AuthService } from '../../../auth.service';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { SidebarComponent } from "../../sidebar/sidebar.component";

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [NgIf, SidebarComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  user: any;

  constructor(
    private userService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const userId = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getuser(userId).subscribe((data: any) => {
      this.user = data;

      console.log(this.user);
    })
  }
}
