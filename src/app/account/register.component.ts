import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AccountService, AlertService } from '../_services';

@Component({ templateUrl: 'register.component.html' })
export class RegisterComponent implements OnInit {
    form: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) { }

    // skill="";
    // set_skills="";
   
    // skills = [
    //   { id: 1, name: "java" },
    //   { id: 2, name: "Angular" },
    //   { id: 3, name: "C++" },
    //   { id: 4, name: "HTML" },
    //   { id: 5, name: "CSS" }
    // ];

    ngOnInit() {
        this.form = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
       // collegeName: ['', Validators.required],
           // skills: ['', Validators.required],
            username: ['', Validators.required],
            //mobile: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

    
        this.alertService.clear();

        
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.accountService.register(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Registration successful', { keepAfterRouteChange: true });
                    this.router.navigate(['../login'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }
}