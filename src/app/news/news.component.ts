import { Component, OnInit, NgModule, ViewChild, AfterViewInit, Renderer2, ElementRef, Directive, Injectable, Inject,EventEmitter  } from '@angular/core';
import { News } from '../models/news';
import { NewsService } from '../services/news.service';
import { MatTable, MatSort, MatCard, MatSortable, MatSelect, MatInput, MatPaginator, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSelectionList } from '@angular/material';
import { INews } from '../interfaces/news';
import { ICategory } from '../interfaces/category';
import { CategoryService } from '../services/category.service';
import { ActivatedRoute } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';
import { LocalStorageService } from 'angular-2-local-storage';
import { filter } from 'rxjs/operators';



@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  providers: [CategoryService, NewsService]
})


export class NewsComponent implements ICategory, INews, AfterViewInit, OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  
  displayedColumns: string[] = ['date', 'timestamp', 'headline', 'category'];
  dataSource;
  detailSource;
  categoryData;
  selected: string = '';

  constructor(
    private newsService: NewsService,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private localStorageService: LocalStorageService,

  ) { }


  ngOnInit() {
    this.getNewsData(this.selected);
  }
  ngAfterViewInit() {
    this.getCategoriesData();
  }

  getNewsData(selectedData: string) {
    this.newsService.getNews(selectedData)
      .subscribe(data => {
        if (!data) {
          return;
        }
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.filterPredicate = function (data, filter: string): boolean {
          return data.headline.toLowerCase().includes(filter) || data.headline.toString() === filter;
        };
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });

  }

  getCategoriesData() {
    this.categoryService.getCategory().subscribe(data => {
      this.categoryData = data
    })
  }

  getKeys(key) {
    let value = this.localStorageService.keys()
    for (let index = 0; index < value.length; index++) {
      const keyData = value[index];
      if(key==keyData){
        return keyData;
      }
    }
    return null;
  }

  openDialog(id: string, headline: string): void {
    this.newsService.getNewsDetail(id).subscribe(data => {
      this.detailSource = data;
      this.localStorageService.add(id, true);
      const dialogRef = this.dialog.open(ModalComponent, {
        width: '500px',
        data: { id: id, headline: headline, content: this.detailSource.content }
      });
      dialogRef.afterClosed().subscribe(result => {

      });
    })

  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
      this.dataSource.filter = filterValue;
    
  }
  

}

