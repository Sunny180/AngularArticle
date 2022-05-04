import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { FilterPipe } from './filter.pipe';
import { TopbarComponent } from './topbar/topbar.component';
import { MyarticlesComponent } from './myarticles/myarticles.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { ArticleNewComponent } from './article-new/article-new.component';
import { AuthorListComponent } from './author-list/author-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ArticlesComponent,
    ArticleDetailComponent,
    ArticleNewComponent,
    ArticleEditComponent,
    LoginComponent,
    PageNotFoundComponent,
    AuthorListComponent,
    FilterPipe,
    TopbarComponent,
    MyarticlesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    NgbPaginationModule,
    NgbAlertModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
