import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { take, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import {
  Character,
  DataResponse,
  Episodes,
} from '../interfaces/data.interface';

const QUERY = gql`
  {
    episodes {
      results {
        name
        episode
      }
    }
    characters {
      results {
        id
        name
        status
        species
        gender
        image
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private episodesSubject = new BehaviorSubject<Episodes[]>(null);
  episodes$ = this.episodesSubject.asObservable();

  private charactersSubject = new BehaviorSubject<Character[]>(null);
  characters$ = this.charactersSubject.asObservable();

  constructor(private apollo: Apollo) {
    this.getDataApi();
  }

  private getDataApi(): void {
    this.apollo
      .watchQuery<DataResponse>({ query: QUERY })
      .valueChanges.pipe(
        take(1),
        tap(({ data }) => {
          const { characters, episodes } = data;
          this.charactersSubject.next(characters.results);
          this.episodesSubject.next(episodes.results);
        })
      )
      .subscribe();
  }
}
