import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OsrsnamesSharedModule } from 'app/shared';
import {
  UserListingDetailComponent,
  UserListingUpdateComponent,
  UserListingDeletePopupComponent,
  UserListingDeleteDialogComponent,
  UserListingOfferDialogComponent,
  UserListingOfferPopupComponent,
  listingRoute,
  listingPopupRoute
} from '.';

const ENTITY_STATES = [...listingRoute, ...listingPopupRoute];

@NgModule({
  imports: [OsrsnamesSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    UserListingDetailComponent,
    UserListingUpdateComponent,
    UserListingDeleteDialogComponent,
    UserListingDeletePopupComponent,
    UserListingOfferDialogComponent,
    UserListingOfferPopupComponent
  ],
  entryComponents: [
    UserListingUpdateComponent,
    UserListingDeleteDialogComponent,
    UserListingDeletePopupComponent,
    UserListingOfferDialogComponent,
    UserListingOfferPopupComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OsrsnamesUserListingModule {}
