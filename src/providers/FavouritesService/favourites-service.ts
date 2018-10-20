import {NativeStorage} from '@ionic-native/native-storage';
import {Injectable} from '@angular/core';

@Injectable()
export class FavouritesService{
  private favourites: any[] = [];

    constructor (private nativeStorage: NativeStorage) {}

    addFavourite(station){
      this.favourites.push(station);
      this.nativeStorage.setItem('favourites', this.favourites);
    }

    getFavourites(){
        return this.nativeStorage.getItem('favourites')
          .then(
            (favourites) => {
              this.favourites = favourites == null ? [] : favourites;
              return this.favourites.slice();
            }
          )
    }


}
