import { GetArticle } from 'src/app/article';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(articles: GetArticle[], searchText: string): any[] {
    if (!articles) {
      return [];
    }
    if (!searchText) {
      return articles;
    }
    searchText = searchText.toLocaleLowerCase();

    return articles.filter(a => {
      return a.Title.toLocaleLowerCase().includes(searchText);
    });
  }
}
