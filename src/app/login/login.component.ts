import { Component } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { FormsModule } from '@angular/forms';
import { tap } from 'rxjs';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  email: string = "";
  password: string = "";
  key: string = "token";

  constructor(private apiService: ApiServiceService) { }

  login(): void {
    if(this.email != "" && this.password != "") {
      this.apiService.verifyCredentials(this.email, this.password).subscribe({
        next: (res) => {
          console.log(res);
          this.apiService.login(res).subscribe({
            next: res => {
              localStorage.setItem(this.key, res.token);
              const token = localStorage.getItem(this.key);
              if(token != null) {
                const payload = JSON.parse(atob(token.split('.')[1]));
                console.log(payload);
              }
            }
          });
        },
        error: (e) => alert(e.message)
      });
    } else {
      console.log("Invalid credentials");
    }
  }
}

