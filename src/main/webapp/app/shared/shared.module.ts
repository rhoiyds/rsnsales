import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RsnsalesSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';
import { ListingOfferComponent } from './components/listing-offer/listing-offer.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { OsrsCurrencyPipe } from './osrs-currency.pipe';

@NgModule({
  imports: [RsnsalesSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective, ListingOfferComponent, UserProfileComponent, OsrsCurrencyPipe],
  entryComponents: [JhiLoginModalComponent],
  exports: [
    RsnsalesSharedCommonModule,
    JhiLoginModalComponent,
    HasAnyAuthorityDirective,
    ListingOfferComponent,
    UserProfileComponent,
    OsrsCurrencyPipe
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RsnsalesSharedModule {
  static forRoot() {
    return {
      ngModule: RsnsalesSharedModule
    };
  }
}
