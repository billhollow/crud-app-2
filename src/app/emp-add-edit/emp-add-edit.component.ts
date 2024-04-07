import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrl: './emp-add-edit.component.scss'
})
export class EmpAddEditComponent implements OnInit{

  employeForm: FormGroup;

  educationLevels: string[] = [
    'Beginner',
    'Mid level',
    'Advanced'
  ];

  constructor(
    private _fb: FormBuilder, 
    private _employeeService: EmployeeService, 
    private _matDialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService,
    ) {
    this.employeForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      educationLevel: '',
      workExperience: '',
      salary: '',
    });
  }

  ngOnInit(): void {
    this.employeForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.employeForm.valid){
      if (this.data) {
        this._employeeService
        .updateEmployee(this.data.id, this.employeForm.value)
        .subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar("Employee updated successfully")
            this._matDialogRef.close(true);
          },
          error: (err: any) => {
            console.error(">>>ERROR: "+err)
          }
        })
      } else {
        this._employeeService.addEmployee(this.employeForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar("Employee added successfully")
            this._matDialogRef.close(true);
          },
          error: (err: any) => {
            console.error(">>>ERROR: "+err)
          }
        })
      }
      
      console.log(this.employeForm.value);
    }
  }
}
