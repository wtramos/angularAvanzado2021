import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderComponent } from 'src/app/global/components/loader/loader.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: any;
  password: any;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.getCurrentUser().then(el => {
      if (el){
        // this.router.navigate(['home']);
        this.router.navigate(['home-shoppingcart']);
      }
    });
  }

  public async login() {
    this.dialog.open(LoaderComponent);
    setTimeout(async () => {
      const response = await this.authService.signIn(this.email, this.password);
      this.dialog.closeAll();
      if (response.success) {
        this.router.navigate(['home-shoppingcart']);
        // this.router.navigate(['home']);
        return;
      }
      console.log(response);
    }, 13000);
  }
}