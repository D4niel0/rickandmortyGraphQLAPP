export interface APIResponse<T> {
  results: T;
}

export interface DataResponse {
  characters: APIResponse<Character[]>;
  episodes: APIResponse<Episodes[]>;
}

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  isFavorite?: boolean;
}

export interface Episodes {
  name: string;
  episode: string;
}
