# angular2-input-masks
This input sanitization directive prevents the user from typing invalid characters into your inputs. It will later be extended to support masking, e.g. (xxx)xxx-xxxx for phone numbers.  

Supports 2.0.0.

## Usage
```javascript
import {Component} from '@angular/core';
import {MaskType, CustomMask, CustomMaskConfig, CustomMaskResult} from 'angular2-input-masks';

@Component({
  selector: 'my-component',
  template: `
    <input type="text" [(ngModel)]="username" [textMask]="{type: MaskType.Alphanumeric}" />
    <input type="text" [(ngModel)]="firstName" [textMask]="{type: MaskType.LettersOnly}" />
    <input type="text" [(ngModel)]="age" [textMask]="{type: MaskType.NumbersOnly}" />
    <input type="text" [(ngModel)]="password" [textMask]="{type: MaskType.Regex, regex:customRegex}" />
    <input type="text" [(ngModel)]="custom" [textMask]="{type: MaskType.Custom, custom:customMask}" />
  `
})
export class MyComponent {
  MaskType = MaskType;
  
  // anything matching this regex will be replaced. remember to use the negate flag (^) when whitelisting
  customRegex = /[^a-z0-9!%&#]/; 
  
  customMask:CustomMask = (config:CustomMaskConfig) => {
    let result:CustomMaskResult = {
      maskedValue: config.initialValue.toUpperCase(),
      newCaretPosition: config.currentCaretPosition
    };
    return result;
  }
}

// remember to import MaskingModule into your NgModule!
```

---
Under Development
