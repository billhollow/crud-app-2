import { Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './services/employee.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { CoreService } from './core/core.service';
import { ConfirmationAlertComponent } from './core/confirmation-alert/confirmation-alert.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [
    'id', 'firstName', 'lastName', 'email', 
    'dob', 'gender', 'educationLevel', 'workExperience', 'salary', 'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog, 
    private _employeeService: EmployeeService,
    private _coreService: CoreService,
    ){}

  ngOnInit(): void {
    this.getEmployeeList()
  }

  openAddEditEmployeeForm() {
    const dialogRef = this._dialog.open(EmpAddEditComponent, {
      width: '1000px',
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      }
    });
  }

  getEmployeeList(){
    this._employeeService.getEmployees().subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmployee(id: number) {

    this._dialog.open(ConfirmationAlertComponent, {
      data: `Are you sure you want to delete that employee application?`,
    })
    .afterClosed()
    .subscribe((confirmed: Boolean) => {
      if (confirmed) {
        this._employeeService.deleteEmployee(id).subscribe({
          next: (res) => {
            this._coreService.openSnackBar('Employee deleted!', 'done');
            this.getEmployeeList();
          },
          error: console.log,
        })
      }
    });
    
  }

  openEditEmployeeForm(data: any) {
    const dialogRef = this._dialog.open(EmpAddEditComponent, {
      width: '1000px',
      data: data
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      }
    });
    
  }
}
