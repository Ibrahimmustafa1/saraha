import { ValidationErrors, AbstractControl } from "@angular/forms";
export class Validator {

  static match(controlName: string, matchControlName: string) {


    return (group: AbstractControl): ValidationErrors | null => {
      let control = group.get(controlName);
      let matchControl = group.get(matchControlName);
      if (!control || !matchControl) {
        return { controlNotFound: false }
      }
      const error = control.value === matchControl.value ? null : { noMatch: true }
      matchControl.setErrors(error)
      return error
    }
  }
}
