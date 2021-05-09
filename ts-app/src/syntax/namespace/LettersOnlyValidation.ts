// / <reference path="Validation.ts" />
import { Validation as va } from './Validation'

export namespace Validation {
  const letterRegexp = /^[A-Za-z]+$/;
  export class LettersOnlyValidation implements va.StringValidator {
    isAcceptable(s: string) {
      return letterRegexp.test(s)
    }
  }
}