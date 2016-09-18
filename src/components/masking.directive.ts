import {Directive, ElementRef, Input} from '@angular/core';
import {NgModel} from '@angular/forms';

export type CustomMaskConfig = {initialValue: string; currentCaretPosition: number};
export type CustomMaskResult = {maskedValue: string; newCaretPosition?: number};
export type CustomMask = (config: CustomMaskConfig) => CustomMaskResult;

export enum MaskType {
  LettersOnly,
  NumbersOnly,
  Alphanumeric,
  Regex,
  Custom
}

@Directive({
  selector: 'input[textMask]',
  host: {
    '(input)': 'onInput()'
  }
})
export class MaskingDirective {
  private inputElement: HTMLInputElement;

  @Input('textMask') textMaskConfig: {
    type: MaskType,
    regex: any,
    custom: CustomMask
  } = {
    type: null,
    regex: null,
    custom: null,
  };

  constructor(inputElement: ElementRef, private ngModel: NgModel) {
    this.inputElement = inputElement.nativeElement
  }

  ngOnInit() {
    setTimeout(() => this.onInput());
  }

  onInput() {
    let initialValue = this.inputElement.value;
    let caretPosition = this.inputElement.selectionStart;

    let mask: CustomMask;

    let regexMaskFactory = (regex: any): CustomMask => {
      let c: CustomMask = (config: CustomMaskConfig) => {
        let replace = (s: string) => s.replace(new RegExp(regex, 'g'), '');
        let textBeforeCaret = initialValue.slice(0, config.currentCaretPosition);
        let maskedValue = replace(config.initialValue);
        let newCaretPosition = replace(textBeforeCaret).length;

        let result: CustomMaskResult = {
          maskedValue: maskedValue,
          newCaretPosition: newCaretPosition
        };

        return result;
      }

      return c;
    }

    switch (this.textMaskConfig.type) {
      case MaskType.LettersOnly:
        mask = regexMaskFactory(/[^a-z]/ig);
        break;
      case MaskType.NumbersOnly:
        mask = regexMaskFactory(/[^0-9.\-]/ig);
        break;
      case MaskType.Alphanumeric:
        mask = regexMaskFactory(/[^a-z0-9.\-]/ig);
        break;
      case MaskType.Regex:
        if (!this.textMaskConfig.regex) {
          mask = null;
          break;
        }
        mask = regexMaskFactory(this.textMaskConfig.regex);
        break;
      case MaskType.Custom:
        if (!this.textMaskConfig.custom) {
          mask = null;
          break;
        }
        mask = this.textMaskConfig.custom;
        break;
      default:
        mask = null;
    }

    let result = mask({initialValue: initialValue, currentCaretPosition: caretPosition});
    if (result.maskedValue == initialValue) return;

    // TODO: Use setValue in RC6+
    this.ngModel.control.updateValue(result.maskedValue, {
      onlySelf: false,
      emitEvent: true,
      emitModelToViewChange: true
    });

    if (this.isInt(result.newCaretPosition)) this.inputElement.setSelectionRange(result.newCaretPosition, result.newCaretPosition);
  }

  isInt(value) {
    return !isNaN(value) && parseInt(Number(value) as any) == value && !isNaN(parseInt(value, 10));
  }
}
