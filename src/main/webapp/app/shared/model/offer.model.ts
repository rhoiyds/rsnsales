import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';
import { IListing } from 'app/shared/model/listing.model';
import { IComment } from 'app/shared/model/comment.model';

export const enum OfferStatus {
  ACCEPTED = 'ACCEPTED',
  DECLINED = 'DECLINED',
  CANCELLED = 'CANCELLED',
  PENDING = 'PENDING'
}

export interface IOffer {
  id?: number;
  timestamp?: Moment;
  description?: string;
  status?: OfferStatus;
  owner?: IUser;
  listing?: IListing;
  comments?: IComment[];
}

export class Offer implements IOffer {
  constructor(
    public id?: number,
    public timestamp?: Moment,
    public description?: string,
    public status?: OfferStatus,
    public owner?: IUser,
    public listing?: IListing,
    public comments?: IComment[]
  ) {}
}
