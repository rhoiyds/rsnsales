import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'listing',
        loadChildren: './listing/listing.module#RsnsalesListingModule'
      },
      {
        path: 'offer',
        loadChildren: './offer/offer.module#RsnsalesOfferModule'
      },
      {
        path: 'trade',
        loadChildren: './trade/trade.module#RsnsalesTradeModule'
      },
      {
        path: 'rating',
        loadChildren: './rating/rating.module#RsnsalesRatingModule'
      },
      {
        path: 'middleman-request',
        loadChildren: './middleman-request/middleman-request.module#RsnsalesMiddlemanRequestModule'
      },
      {
        path: 'comment',
        loadChildren: './comment/comment.module#RsnsalesCommentModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RsnsalesEntityModule {}
