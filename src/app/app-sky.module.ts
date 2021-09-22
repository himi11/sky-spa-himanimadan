import {
  NgModule
} from '@angular/core';

import {
  SkyAvatarModule
} from '@skyux/avatar';

import {
  SkyAlertModule,
  SkyKeyInfoModule,
  SkyStatusIndicatorModule
} from '@skyux/indicators';

import {
  SkyEmailValidationModule
} from '@skyux/validation';
import {
  SkyFluidGridModule
} from '@skyux/layout';

import {
  SkyNavbarModule
} from '@skyux/navbar';

import {
  SkyPhoneFieldModule
} from '@skyux/phone-field/';

import {
  SkyDatepickerModule
} from '@skyux/datetime';

import {
  SkyAgGridModule
} from '@skyux/ag-grid';



@NgModule({
  exports: [
    SkyAvatarModule,
    SkyAlertModule,
    SkyKeyInfoModule,
    SkyFluidGridModule,
    SkyNavbarModule,
    SkyPhoneFieldModule,
    SkyStatusIndicatorModule,
    SkyDatepickerModule,
    SkyEmailValidationModule,
    SkyAgGridModule
  ]
})
export class AppSkyModule { }
