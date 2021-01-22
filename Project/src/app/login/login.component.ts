import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common'; 
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../task.service';
import { Router } from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private accountservice:TaskService, private _router: Router){}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.formGroup = new FormGroup({
      username: new FormControl("",[Validators.required]),
      password: new FormControl("",[Validators.required])
    })
  }
  
  loginProcess(){
    if(this.formGroup.valid){
      this.accountservice.login(this.formGroup.value).subscribe(result=>{
        console.log(result)
        localStorage.setItem("token", result.token)
        this._router.navigate(["/overview"])
      }, err =>{
        console.log(err)
      })
    }
  }

/*
  loginProcess(){
    if(this.formGroup.valid){
      this.accountservice.login(this.formGroup.value).subscribe(response=>{
        if(response.result){
          console.log(response);
          alert(response.result);
        }else{
          alert(response.result);
        }
      });
    }
  }
  */
}

