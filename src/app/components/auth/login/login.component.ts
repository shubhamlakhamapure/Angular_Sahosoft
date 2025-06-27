import { Component, ENVIRONMENT_INITIALIZER, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/components/auth/auth.service';
import { HttpService } from 'src/app/shared/services/http.service';
import { MustMatchValidator } from 'src/app/shared/validations/validations.validator';
import { Global } from '../../../shared/utility/global';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  registrationForm: FormGroup;
  submitted: boolean = false; //to show the validation when form submitted
  @ViewChild('nav') elnav :any;

  constructor(private _toaster: ToastrService,private _formBuilder: FormBuilder,private _httpService: HttpService,private _authService:AuthService)
  {

  }

  ngOnInit(): void {
    this.setLoginForm();
    this.setRegistrationForm();
  }

  setLoginForm() {
    this.loginForm = this._formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  /*
  // setRegistrationForm() {
  //   this.registrationForm = this._formBuilder.group(
  //     {
  //       firstName: [
  //         '',
  //        Validators.compose([ Validators.required,
  //         Validators.minLength(3),
  //         Validators.maxLength(10),])
  //       ],
  //       lastName: [
  //         '',
  //        Validators.compose([
  //         Validators.required,
  //         Validators.minLength(3),
  //         Validators.maxLength(10),
  //        ])
  //       ],
  //       email: [
  //         '',
  //         Validators.compose([Validators.required, Validators.pattern(
  //           /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  //         )]),
  //       ],
  //       userTypeId: [1],
  //       password: [
  //         '',
  //         Validators.compose([
  //           Validators.required,
  //           Validators.pattern(
  //             /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  //           ),
  //         ]),
  //       ],
  //       confirmPassword: ['', Validators.compose([Validators.required],)],
  //     },
  //     { validators: MustMatchValidator('password','confirmPassword')}
  //   );
  // }

  // setRegistrationForm() {
  //   this.registrationForm = new FormGroup(
  //     {
  //       firstName: new FormControl(
  //         '',
  //        Validators.compose([ Validators.required,
  //         Validators.minLength(3),
  //         Validators.maxLength(10),])
  //        ),
  //       lastName: new FormControl( 
  //         '',
  //        Validators.compose([
  //         Validators.required,
  //         Validators.minLength(3),
  //         Validators.maxLength(10),
  //        ])
  //       ),
  //       email: new FormControl(
  //         '',
  //         Validators.compose([Validators.required, Validators.pattern(
  //           /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  //         )]),
  //       ),
  //       userTypeId:new FormControl[1],
  //       password:new FormControl(
  //         '',
  //         Validators.compose([
  //           Validators.required,
  //           Validators.pattern(
  //             /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  //           ),
  //         ]),
  //       ),
  //       confirmPassword: new FormControl('', Validators.required)
  //     },
  //      MustMatchValidator('password','confirmPassword'));
  // }
  
*/
 

  // This is the more readable and maintainable way to set the registration form
  //corporate way to set the registration form
  setRegistrationForm() {
  this.registrationForm = new FormGroup(
    {
      firstName: new FormControl('',Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ])
      ), 
      lastName: new FormControl('',Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ])
      ),
      email: new FormControl('',Validators.compose([
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
        ])
      ),
      userTypeId: new FormControl(1), // Default value set to 1
      password: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          ),
        ])
      ),
      confirmPassword: new FormControl('', Validators.required),
    },
    { validators: MustMatchValidator('password', 'confirmPassword') } // Group-level validator
  );
}


//ctrl getter for easy access to form controls for sortingthe validation messages in html
  get ctrl() {
    return this.registrationForm.controls;
  }

  //no need to get the username and password from html form as its already available in ts file
  login() {
    if (this.loginForm.get('userName').value === '') {
      this._toaster.error('Username is required.!', 'Login');
    } else if (this.loginForm.get('password').value === '') {
      this._toaster.error('password is required.!', 'Login');
    } else {
      if (this.loginForm.valid) {
        //this._toaster.success('Login success','Login');
        //this._toaster.warning('Invalid credentials','Login');
        //Call API
        //console.log(this.loginForm.value);
        this._httpService.post(Global.BASE_API_PATH + 'UserMaster/Login/',this.loginForm.value)
          .subscribe((res) => {
            //console.log(this.loginForm.value);
            // console.log(res);
            // alert(res);
            if(res.isSuccess){
              this._authService.authLogin(res.data);//only data passed from response
              this._toaster.success('Login success','Login')
              this.loginForm.reset();
            }
            else{
              //console.log(res);
              this._toaster.error(res.errors[0],'Login');
            }
          });
          
      }
      else{
        this._toaster.error('Please fill all the required fields', 'Login');
      }
    }
  }

  register(formData: FormGroup) {
    this.submitted = true;
    if (this.registrationForm.invalid) {
      return;
    }
    this._httpService.post(Global.BASE_API_PATH+'UserMaster/Save/',formData.value).subscribe(res=>{
      if(res.isSuccess){
        this._toaster.success("Registraion has been successfully done.!", "Registration");
        //after successfully registration make all fields blank and userTypeId is 1(if not do the it will be null)
        this.registrationForm.reset(  {
          firstName: '',
          lastName: '',
          email: '',
          userTypeId: 1,
          password: '',
          confirmPassword: ''
        });
        this.submitted =false;
        this.elnav.select('loginTab');
      }
      else{
        this._toaster.error(res.errors[0],'Registration');
      }
    })
  }
}
  