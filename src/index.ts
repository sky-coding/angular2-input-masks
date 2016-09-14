import '@angular/core';
import '@angular/common';
import '@angular/compiler';
import '@angular/forms';

import {NgModule} from '@angular/core'

import {MaskingDirective, MaskType} from './components/masking.directive';
export {MaskingDirective, MaskType} from './components/masking.directive';

@NgModule({
  declarations: [
    MaskingDirective
  ],
  exports: [
    MaskingDirective
  ],
  providers: []
})
export class MaskingModule {}
