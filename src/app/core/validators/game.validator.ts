import { Injectable } from "@angular/core"
import { AsyncValidatorFn } from "@angular/forms"
import { map, debounceTime, distinctUntilChanged, switchMap, first } from "rxjs/operators"
import { GamesService } from "./../services/games.service"


@Injectable({
    providedIn: 'root'
})


export class GameValidator{

    constructor(
        private gamesService: GamesService
    ) { }
    
    validatorUniqueGameName(): AsyncValidatorFn{
        return control => control.valueChanges
        .pipe(
            debounceTime(400),
            distinctUntilChanged(),
            switchMap(value => this.gamesService.validatorUniqueGameName(value)) ,
            map((response) => {
                if (response['data'] == 0 && control.value != null && control.value != '') {
                    return null
                }else {
                    return {'gameNameAlreadyExists': true}
                }
            }),
            first()
        )
    }
}