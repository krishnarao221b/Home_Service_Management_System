import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AccountService } from '../account.service';
import { error } from 'console';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from '../../shared/components/text-input/text-input.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, LoginComponent, TextInputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  returnUrl!: string;

  constructor(private accountService: AccountService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/shop';
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$') ]),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    this.accountService.login(this.loginForm.value).subscribe(() => {
      this.router.navigateByUrl(this.returnUrl);
    }, error => {
      console.log(error);
    });
  }


}
