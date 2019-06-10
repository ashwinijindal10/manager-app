import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CoreRoutingModule } from './core-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SharedModule } from '../shared/shared.module';
import { CoreComponent } from './core.component';
import { TmpUserValidateComponent } from './tmp-user-validate/tmp-user-validate.component';

@NgModule({
  declarations: [
    CoreComponent,
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    TmpUserValidateComponent
  ],
  imports: [FlexLayoutModule, SharedModule, CoreRoutingModule],
  exports: [CoreComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [TmpUserValidateComponent]
})
export class CoreModule {}
