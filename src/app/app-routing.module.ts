import { MyarticlesComponent } from './myarticles/myarticles.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleEditComponent } from './article-edit/article-edit.component';
import { ArticleNewComponent } from './article-new/article-new.component';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './guard/login.guard';
import { AuthorListComponent } from './author-list/author-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/articles', pathMatch: 'full' },
  { path: 'detail/:id', component: ArticleDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'new', component: ArticleNewComponent, canActivate: [LoginGuard] },
  { path: 'edit/:id', component: ArticleEditComponent, canActivate: [LoginGuard] },
  { path: 'myarticles', component: MyarticlesComponent, canActivate: [LoginGuard] },
  { path: 'authorlist', component: AuthorListComponent, canActivate: [LoginGuard] },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
