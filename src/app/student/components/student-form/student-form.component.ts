import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { StudentService } from '../../student.service';

export interface Student {
  id: number;
  name: string;
  age: number;
  email: string;
}

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent {
  studentForm: FormGroup;
 
  subjects: string[] = ['Math', 'Science', 'History', 'Art'];
  constructor(private fb: FormBuilder, 
    public dialogRef: MatDialogRef<StudentFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private studentService:StudentService) {
      console.log(data)
    this.studentForm = this.fb.group({
      firstName: [data.firstName, [Validators.required]],
      lastName: [data.lastName, [Validators.required]],
      age: [data.age, [Validators.required, Validators.min(1)]],
      email: [data.email, [Validators.required, Validators.email]],
      favoriteSubject: [data.favoriteSubject, Validators.required],
      gender: [data.gender, Validators.required],
      agree: [data.agree, Validators.requiredTrue],
      id:[data.id]
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      console.log(this.studentForm.value);
      if(this.data.type=='Add'){
        this.studentService.addStudent(this.studentForm.value);
      }else{
        this.studentService.updateStudent(this.studentForm.value);
      }
      this.dialogRef.close(1)
    }
  }
  closeDialog(){
    this.dialogRef.close()
  }
}
