import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HttpClient} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewsComponent } from './news/news.component';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatChipsModule,MatCardModule,MatTableModule,MatSelectModule,MatInputModule,MatSortModule,MatPaginatorModule,MatProgressSpinnerModule,MatDialogModule,MatButtonModule} from '@angular/material';
import { ModalComponent } from './modal/modal.component';
import { LocalStorageModule } from 'angular-2-local-storage';
import { MarkdownModule } from 'ngx-markdown';


@NgModule({
  declarations: [
    AppComponent,
    NewsComponent, 
    ModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatButtonModule,
    MatChipsModule,
    LocalStorageModule.forRoot({
      prefix: "storage",
      storageType: "localStorage"
    }),
    MarkdownModule.forRoot()
   
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent]
})
export class AppModule { }
