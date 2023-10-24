import { MembershipStatus } from "./collaborator";
import { ProductResponse } from "./product";
import { StoreResponse } from "./store";
import { UserResponse } from "./user";

export enum NotificationType {
  STORE_INVITE = "STORE_INVITE",
  COLLABORATOR_REMOVAL = "COLLABORATOR_REMOVAL",
  LOW_STOCK = "LOW_STOCK",
  EXPIRATION = "EXPIRATION",
  INVITE_REPLY = "INVITE_REPLY",
}

export enum NotificationStatus {
  UNREAD = "UNREAD",
  READ = "READ",
}

export interface NotificationMetaData {
  product: ProductResponse;
  quantity: number;
  store: StoreResponse;
  expirationDate: Date;
  recipient: UserResponse;
  invitee: UserResponse;
  status: MembershipStatus;
  membershipId: number;
}

export interface NotificationResponse {
  id: number;
  sender: UserResponse;
  metaData: NotificationMetaData;
  status: NotificationStatus;
  type: NotificationType;
  dateCreated: Date;
}
