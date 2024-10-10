import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormGroup, ReactiveFormsModule, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { TextInputComponent } from '../../shared/components/text-input/text-input.component';
import { Observable, of, timer } from 'rxjs';
import { switchMap, map } from 'rxjs/operators'; // Importing operators

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, LoginComponent, TextInputComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  errors: string[] = [];

  constructor(private fb: FormBuilder, private accountService: AccountService, private router: Router) { }

  ngOnInit() {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      displayName: [null, [Validators.required]],
      email: [null, [Validators.required,
      Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$')], [this.validateEmailNotTaken()]], // Use the async validator
      password: [null, [Validators.required]]
    });
  }

  onSubmit() {
    this.accountService.register(this.registerForm.value).subscribe(
      response => {
        this.router.navigateByUrl('/shop');
      },
      error => {
        console.log(error);
        this.errors = error.errors || [];
      }
    );
  }

  validateEmailNotTaken(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return timer(500).pipe(
        switchMap(() => {
          if (!control.value) {
            return of(null);
          }
          return this.accountService.checkEmailExists(control.value).pipe(
            map((exists: boolean) => { // Adjusted to expect a boolean
              return exists ? { emailExists: true } : null; // Return validation error
            })
          );
        })
      );
    };
  }
}
