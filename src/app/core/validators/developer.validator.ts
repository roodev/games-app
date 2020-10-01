import { Injectable } from "@angular/core"
import { AsyncValidatorFn, SelectMultipleControlValueAccessor } from "@angular/forms"
import { map, debounceTime, distinctUntilChanged, switchMap, first } from "rxjs/operators"
import { DevelopersService } from "./../services/developers.service"


@Injectable({
    providedIn: 'root'
})


export class DeveloperValidator{

    constructor(
        private developersService: DevelopersService
    ) { }
    
    validatorUniqueDeveloperName(): AsyncValidatorFn{
        return control => control.valueChanges
        .pipe(
            debounceTime(400),
            distinctUntilChanged(),
            switchMap(value => this.developersService.validatorUniqueDeveloperName(value)) ,
            map((response) => {
                if (response['data'] == 0 && control.value != null && control.value != '') {
                    return null
                }else {
                    return {'developerNameAlreadyExists': true}
                }
            }),
            first()
        )
    }
}