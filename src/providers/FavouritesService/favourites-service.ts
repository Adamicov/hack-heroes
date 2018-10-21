import {Injectable} from '@angular/core';

@Injectable()
export class FavouritesService{
  private favourites: any[] = [];

    constructor () {}

    addFavourite(station){
      this.favourites.push(station);
    }

    getFavourites(){
        /*return this.nativeStorage.getItem('favourites')
          .then(
            (favourites) => {
              this.favourites = favourites == null ? [] : favourites;
              return this.favourites.slice();
            }
          )*/
    }


}
