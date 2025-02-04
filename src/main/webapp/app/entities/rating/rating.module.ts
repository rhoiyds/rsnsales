import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OsrsnamesSharedModule } from 'app/shared';
import {
  RatingComponent,
  RatingDetailComponent,
  RatingUpdateComponent,
  RatingDeletePopupComponent,
  RatingDeleteDialogComponent,
  ratingRoute,
  ratingPopupRoute
} from './';

const ENTITY_STATES = [...ratingRoute, ...ratingPopupRoute];

@NgModule({
  imports: [OsrsnamesSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [RatingComponent, RatingDetailComponent, RatingUpdateComponent, RatingDeleteDialogComponent, RatingDeletePopupComponent],
  entryComponents: [RatingComponent, RatingUpdateComponent, RatingDeleteDialogComponent, RatingDeletePopupComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OsrsnamesRatingModule {}
