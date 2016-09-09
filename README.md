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
import {MaskingDirective, MaskType} from 'angular2-input-masks';

@Component({
  selector: 'my-component',
  template: `
    <input type="text" [(ngModel)]="username" [textMask]="{type: MaskType.Alphanumeric}" />
    <input type="text" [(ngModel)]="firstName" [textMask]="{type: MaskType.LettersOnly}" />
    <input type="text" [(ngModel)]="age" [textMask]="{type: MaskType.NumbersOnly}" />    
  `,
  directives: [MaskingDirective]
})
export class MyComponent {
  MaskType = MaskType;
}
```

---
Under Development
