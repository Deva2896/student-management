import { Component, OnInit } from '@angular/core';
import { StudentFormComponent } from '../student-form/student-form.component';
import { MatDialog } from '@angular/material';
import { StudentService } from '../../student.service';
import { DeletePopupComponent } from '../delete-popup/delete-popup.component';


export interface Student {
  id: number;
  firstName: string;
  lastName:string;
  age: number;
  email: string;
  favoriteSubject:string;
  gender:string;
  type?:string;
}
@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {
  students:Student[]=[]
  displayedColumns: string[] = ['firstName','lastName', 'age', 'email','favoriteSubject', 'actions'];
  constructor(private dialog: MatDialog, private studentService:StudentService) { }

  ngOnInit() {
    this.getStudentList()
    // localStorage.removeItem('students');
  }
  getStudentList(){
   this.students= this.studentService.getStudentList();
  }
  editStudent(student:Student){
    student.type='Edit'
    this.openStudentForm(student,'Edit')
  }
  deleteStudent(student:Student){
    const dialogRef = this.dialog.open(DeletePopupComponent, {
      width: '400px',
      data: {} 
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
       this.studentService.deleteStudent(student.id)
       this.getStudentList()
      }
    });
  }
  openStudentForm(item:Student,type:string){
    item.type=type
    const dialogRef = this.dialog.open(StudentFormComponent, {
      width: '700px',
      data: item?item:{} 
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getStudentList()
      }
    });
  }


}
