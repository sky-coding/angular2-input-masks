import {Directive, ElementRef, Input} from '@angular/core';
import {NgModel} from '@angular/forms';

export enum MaskType {
  LettersOnly,
  NumbersOnly,
  Alphanumeric
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
    type: MaskType
  } = {
    type: null,
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
    let textBeforeCaret = initialValue.slice(0, caretPosition);

    let mask:(s:string) => string;

    console.log('this.textMaskConfig', this.textMaskConfig);

    switch (this.textMaskConfig.type) {
      case MaskType.LettersOnly:
        mask = (s:string) => s.replace(/[^a-z]/ig, '');
        break;
      case MaskType.NumbersOnly:
        mask = (s:string) => s.replace(/[^0-9.\-]/ig, '');
        break;
      case MaskType.Alphanumeric:
        mask = (s:string) => s.replace(/[^a-z0-9.\-]/ig, '');
        break;
      default:
        mask = (s:string) => s;
    }

    let maskedValue = mask(initialValue);
    let newCaretPosition = mask(textBeforeCaret).length;

    if (maskedValue == initialValue) return;

    this.ngModel.control.updateValue(maskedValue, {
      onlySelf: false,
      emitEvent: true,
      emitModelToViewChange: true
    });

    this.inputElement.setSelectionRange(newCaretPosition, newCaretPosition);

  }
}
