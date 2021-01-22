import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { List } from 'src/app/models/list.model';
import { ActivatedRoute,Router } from '@angular/router';
import { TaskService } from '../task.service'


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit,AfterViewInit {

  list: List[];
  displayedColumns: string[]= ['position', 'name', 'type', 'amount', 'date', 'delete'];
  dataSource = new MatTableDataSource<List>();
  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { 
  }

  ngOnInit(){
    this.taskService.getList()
    .subscribe(list => this.dataSource.data = list);
  }

  deleteEntry(position: Number){
    console.log(position);
    this.taskService.deleteEntry(position)
    .subscribe((res:any) =>{
      this.taskService.getList()
    .subscribe(list => this.dataSource.data = list);
    });
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
