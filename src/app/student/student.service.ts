import { Injectable } from '@angular/core';
export interface Student {
  id: number;
  firstName: string;
  lastName:string;
  age: number;
  email: string;
  favoriteSubject:string;
  gender:string;

}
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private localStorageKey:string = 'students';
  constructor() {

   }

   addStudent(student: Student): void {
    const students: Student[] = this.getStudentList();
    student.id = new Date().getTime();
    students.push(student);
    localStorage.setItem(this.localStorageKey, JSON.stringify(students));
  }

  updateStudent(student: Student): void {
    const students: Student[] = this.getStudentList();
    const index = students.findIndex((s) => s.id === student.id);
    if (index !== -1) {
      students[index] = student;
      localStorage.setItem(this.localStorageKey, JSON.stringify(students));
    }
  }

  deleteStudent(id: any): void {
    console.log(id,typeof(id))
    let students: Student[] = this.getStudentList();
    students = students.filter((s) => s.id !== id);
    localStorage.setItem(this.localStorageKey, JSON.stringify(students));
  }

  getStudentList(): Student[] {
    const studentsData = localStorage.getItem(this.localStorageKey);
    return studentsData ? JSON.parse(studentsData) : [];
  }
}
