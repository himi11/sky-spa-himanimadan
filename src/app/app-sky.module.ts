import { NgModule } from '@angular/core';
import { SkyAgGridModule } from '@skyux/ag-grid';
import { SkyAvatarModule } from '@skyux/avatar';
import { SkyDatepickerModule } from '@skyux/datetime';
import {
  SkyAlertModule,
  SkyKeyInfoModule,
  SkyStatusIndicatorModule
} from '@skyux/indicators';
import { SkyFluidGridModule, SkyToolbarModule } from '@skyux/layout';
import { SkySearchModule } from '@skyux/lookup';
import { SkyModalModule } from '@skyux/modals';
import { SkyNavbarModule } from '@skyux/navbar';
import { SkyPhoneFieldModule } from '@skyux/phone-field/';
import { SkyDropdownModule } from '@skyux/popovers';
import { SkyEmailValidationModule } from '@skyux/validation';

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
    SkyAgGridModule,
    SkyModalModule,
    SkyToolbarModule,
    SkySearchModule,
    SkyDropdownModule
  ]
})
export class AppSkyModule {}
