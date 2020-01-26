import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { ITag } from 'app/shared/model/tag.model';
import { IListing, ListingType } from 'app/shared/model/listing.model';
import { AccountService } from 'app/core';

import { ITEMS_PER_PAGE } from 'app/shared';
import { ListingService } from './listing.service';
import { TagService } from '../tag';

@Component({
  selector: 'jhi-listing',
  templateUrl: './listing.component.html'
})
export class ListingComponent implements OnInit, OnDestroy {
  listings: IListing[];
  currentAccount: any;
  eventSubscriber: Subscription;
  itemsPerPage: number;
  links: any;
  page: any;
  predicate: any;
  reverse: any;
  totalItems: number;
  listingType = ListingType;

  currentSearch: string;

  constructor(
    protected listingService: ListingService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected parseLinks: JhiParseLinks,
    protected activatedRoute: ActivatedRoute,
    protected accountService: AccountService,
    protected tagService: TagService
  ) {
    this.listings = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0
    };
    this.predicate = 'id';
    this.reverse = true;
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search'] ? this.activatedRoute.snapshot.params['search'] : '';
  }

  loadAll() {
    if (this.currentSearch) {
      this.tagService.query({ 'name.contains': this.currentSearch }).subscribe(
        (res: HttpResponse<ITag[]>) => {
          const criteria = {
            'rsn.contains': this.currentSearch,
            page: this.page,
            size: this.itemsPerPage,
            sort: this.sort()
          };
          if (res.body.length > 0) {
            criteria['tagsId.in'] = res.body.map(tag => tag.id);
          }
          this.listingService
            .query(criteria)
            .subscribe(
              (listingRes: HttpResponse<IListing[]>) => this.paginateListings(listingRes.body, listingRes.headers),
              (listingRes: HttpErrorResponse) => this.onError(listingRes.message)
            );
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
      return;
    }
    this.listingService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<IListing[]>) => this.paginateListings(res.body, res.headers),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  reset() {
    this.page = 0;
    this.listings = [];
    this.loadAll();
  }

  loadPage(page) {
    this.page = page;
    this.loadAll();
  }

  clear() {
    this.listings = [];
    this.links = {
      last: 0
    };
    this.page = 0;
    this.predicate = 'id';
    this.reverse = true;
    this.currentSearch = '';
    this.loadAll();
  }

  search(query) {
    if (!query) {
      return this.clear();
    }
    this.listings = [];
    this.links = {
      last: 0
    };
    this.page = 0;
    this.reverse = false;
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInListings();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IListing) {
    return item.id;
  }

  registerChangeInListings() {
    this.eventSubscriber = this.eventManager.subscribe('listingListModification', response => this.reset());
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateListings(data: IListing[], headers: HttpHeaders) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = parseInt(headers.get('X-Total-Count'), 10);
    for (let i = 0; i < data.length; i++) {
      this.listings.push(data[i]);
    }
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
