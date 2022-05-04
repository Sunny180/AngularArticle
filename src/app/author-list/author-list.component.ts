import { Author } from 'src/app/article';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleService } from 'src/app/article.service';
import { LoginService } from 'src/app/login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit, OnDestroy {
  private authors: Author[] = [];
  private author: Author = {
    Id: 0,
    Name: '',
    AdminId: 0
  };
  public page: number = 0;
  private pageSize: number = 0;
  private maxSize: number = 0;
  private userId: number = 0;
  private authorSubject!: Subscription;

  public get Authors(): Author[] {
    return this.authors;
  }
  public get Author(): Author {
    return this.author;
  }
  public get PageSize(): number {
    return this.pageSize;
  }
  public get MaxSize(): number {
    return this.maxSize;
  }
  public get UserId(): number {
    return this.userId;
  }
  private set Authors(authors: Author[]) {
    this.authors = authors;
  }
  private set Author(author: Author) {
    this.author = author;
  }
  private set Page(page: number) {
    this.page = page;
  }
  private set PageSize(pageSize: number) {
    this.pageSize = pageSize;
  }
  private set MaxSize(maxSize: number) {
    this.maxSize = maxSize;
  }
  private set UserId(userId: number) {
    this.userId = userId;
  }
  private set AdminId(adminId: number) {
    this.author.AdminId = adminId;
  }

  constructor(
    private articleService: ArticleService,
    private loginService: LoginService,
    private router: Router
  ) {
    this.Page = 1;
    this.PageSize = 3;
    this.MaxSize = 1;
    this.UserId = this.loginService.userId;
  }

  public ngOnInit(): void {
    this.getAuthors();
  }
  public ngOnDestroy(): void {
    this.authorSubject.unsubscribe();
  }

  public onEditAuthorname(author: Author): void {
    const edit = <HTMLInputElement>document.getElementById(`authorname${author.Id}`);
    edit.disabled = false;
    const save = <HTMLInputElement>document.getElementById(`save${author.Id}`);
    save.disabled = false;
  }

  public onSave(author: Author): void {
    this.Author = author;
    this.AdminId = this.loginService.userId;
    if (this.author) {
      this.articleService.updateAuthor(this.author)
        .subscribe(() => {
          if (this.author.Id === this.loginService.userId)
            this.loginService.userNameSubject.next(this.author.Name);
        });
    }
    const edit = <HTMLInputElement>document.getElementById(`authorname${author.Id}`);
    edit.disabled = true;
    const save = <HTMLInputElement>document.getElementById(`save${author.Id}`);
    save.disabled = true;
  }

  public onOnesArticles(authorId: number): void {
    this.articleService.set(authorId);
    this.router.navigateByUrl('/myarticles');
  }

  public onDelete(authorId: number): void {
    if (confirm('確定要刪除嗎?')) {
      this.articleService.deleteAuthor(authorId)
        .subscribe(() => {
          this.Authors = this.authors.filter(a => a.Id !== authorId);
        });
    }
    else { }
  }

  public onSetPage(page: number): void {
    this.setPage(page);
  }

  private getAuthors(): void {
    this.authorSubject = this.articleService.getAuthors()
      .subscribe((author) => {
        this.Authors = author;
        if (sessionStorage.getItem('page') === null) {
          sessionStorage.setItem('page', '1');
        } else {
          this.setPage(Number(sessionStorage.getItem('page')));
        }
      });
  }

  private setPage(page: number): void {
    sessionStorage.setItem('page', page.toString());
    this.Page = page;
    this.router.navigate(['/authorlist'], { queryParams: { page: this.page } });
  }


}
