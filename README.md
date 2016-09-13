# angular2-input-masks
input masking for Angular 2

### Dependencies
"@angular/common": "2.0.0-rc.4",

"@angular/compiler": "2.0.0-rc.4",

"@angular/core": "2.0.0-rc.4",

"@angular/forms": "0.2.0"

## Usage
```javascript
import {Component} from '@angular/core';
import {MaskingDirective, MaskType, CustomMask, CustomMaskConfig, CustomMaskResult} from 'angular2-input-masks';

@Component({
  selector: 'my-component',
  template: `
    <input type="text" [(ngModel)]="username" [textMask]="{type: MaskType.Alphanumeric}" />
    <input type="text" [(ngModel)]="firstName" [textMask]="{type: MaskType.LettersOnly}" />
    <input type="text" [(ngModel)]="age" [textMask]="{type: MaskType.NumbersOnly}" />
    <input type="text" [(ngModel)]="password" [textMask]="{type: MaskType.Regex, regex:customRegex}" />
    <input type="text" [(ngModel)]="custom" [textMask]="{type: MaskType.Custom, regex:customMask}" />
  `,
  directives: [MaskingDirective]
})
export class MyComponent {
  MaskType = MaskType;
  
  customRegex = /[^a-z0-9!%&#]/
  
  customMask:CustomMask = (config:CustomMaskConfig) => {
    let result:CustomMaskResult = {
      maskedValue: '',
      newCaretPosition: 0
    };
    return result;
  }
}
```

---
Under Development
