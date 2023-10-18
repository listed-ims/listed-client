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

export interface MetaData {
  product?: ProductResponse;
  quantity?: number;
  store?: StoreResponse;
  expirationDate?: Date;
  sender?: UserResponse;
  recipient?: UserResponse;
  invitee?: UserResponse;
  status?: MembershipStatus;
}

export interface NotificationResponse {
  id: number;
  receiver: UserResponse;
  sender: UserResponse;
  metaData: string;
  status: NotificationStatus;
  type: NotificationType;
  dateCreated: Date;
}
