/* tslint:ignore */
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Void: any;
  Byte: any;
};


export type ApiKey = {
  __typename?: 'ApiKey';
  apiKeyId: Scalars['ID'];
  created: Scalars['DateTime'];
  disabled?: Maybe<Scalars['DateTime']>;
};

export type ApiKeyListResult = {
  __typename?: 'ApiKeyListResult';
  count?: Maybe<Scalars['Int']>;
  list?: Maybe<Array<ApiKey>>;
};

export type ApiKeySecret = {
  __typename?: 'ApiKeySecret';
  apiKeyId: Scalars['ID'];
  created: Scalars['DateTime'];
  disabled?: Maybe<Scalars['DateTime']>;
  secret: Scalars['String'];
  userId: Scalars['String'];
};

export type AppState = {
  __typename?: 'AppState';
  isFullScreen?: Maybe<Scalars['Boolean']>;
  isProMode?: Maybe<Scalars['Boolean']>;
  isRealTrading?: Maybe<Scalars['Boolean']>;
  isSideBarCollapsed?: Maybe<Scalars['Boolean']>;
};


export enum CountryCodeType {
  Code2 = 'code2',
  Code3 = 'code3'
}


export type Feedback = {
  __typename?: 'Feedback';
  created?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  feedbackId: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type FeedbackInput = {
  description?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type FeedbackListResult = {
  __typename?: 'FeedbackListResult';
  count?: Maybe<Scalars['Int']>;
  list?: Maybe<Array<Feedback>>;
};

export type File = {
  __typename?: 'File';
  encoding?: Maybe<Scalars['String']>;
  fileSize?: Maybe<Scalars['Float']>;
  mimeType?: Maybe<Scalars['String']>;
  order?: Maybe<Scalars['Int']>;
  originFileName: Scalars['String'];
  path: Scalars['String'];
  type: FileType;
};

export type FileInfo = {
  order?: Maybe<Scalars['Int']>;
  type?: Maybe<FileType>;
};

export enum FileType {
  Avatar = 'Avatar',
  SupportTicket = 'SupportTicket'
}

export type KycApplicant = {
  __typename?: 'KycApplicant';
  birthday?: Maybe<Scalars['DateTime']>;
  countryCode2?: Maybe<Scalars['String']>;
  countryCode3?: Maybe<Scalars['String']>;
  details?: Maybe<Array<StringMap>>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

export type KycAppliedDocument = {
  __typename?: 'KycAppliedDocument';
  code: Scalars['String'];
  countryCode2?: Maybe<Scalars['String']>;
  countryCode3?: Maybe<Scalars['String']>;
  details?: Maybe<Array<StringMap>>;
  firstName?: Maybe<Scalars['String']>;
  issuedDate?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['String']>;
  validUntil?: Maybe<Scalars['String']>;
};

export type KycDocumentType = {
  __typename?: 'KycDocumentType';
  code?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  options?: Maybe<Array<Scalars['String']>>;
  subTypes?: Maybe<Array<KycDocumentType>>;
  type?: Maybe<Scalars['String']>;
};

export type KycInfo = {
  __typename?: 'KycInfo';
  applicant?: Maybe<KycApplicant>;
  appliedDocuments?: Maybe<Array<KycAppliedDocument>>;
  requiredInfo?: Maybe<KycRequiredInfo>;
};

export type KycInfoField = {
  __typename?: 'KycInfoField';
  name?: Maybe<Scalars['String']>;
  required?: Maybe<Scalars['Boolean']>;
};

export enum KycProvider {
  BlockPass = 'BlockPass',
  Local = 'Local',
  SumSub = 'SumSub'
}

export type KycRejectedLabel = {
  __typename?: 'KycRejectedLabel';
  code?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type KycRequiredInfo = {
  __typename?: 'KycRequiredInfo';
  documents?: Maybe<Array<KycDocumentType>>;
  fields?: Maybe<Array<KycInfoField>>;
};

export enum KycStatus {
  Completed = 'completed',
  Init = 'init',
  NotFound = 'notFound',
  OnHold = 'onHold',
  Pending = 'pending',
  Queued = 'queued',
  Unknown = 'unknown'
}

export type LoginResult = {
  __typename?: 'LoginResult';
  authToken?: Maybe<Scalars['String']>;
  authTokenAction?: Maybe<Scalars['String']>;
  authTokenActionParam?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addFeedback: Feedback;
  addMyContact?: Maybe<User>;
  addSettingsKyc: SettingsKyc;
  addSettingsKycLevel: SettingsKycLevel;
  assignRole?: Maybe<User>;
  changePassword: Scalars['Boolean'];
  confirmDevice: Scalars['Boolean'];
  confirmEmail: Scalars['Boolean'];
  createMyApiKey?: Maybe<ApiKeySecret>;
  createUserApiKey?: Maybe<ApiKeySecret>;
  deleteMyApiKey?: Maybe<ApiKey>;
  deleteMyContact?: Maybe<User>;
  deleteMyNotification?: Maybe<UserNotification>;
  deleteSettingsKyc: SettingsKyc;
  deleteSettingsKycLevel: SettingsKycLevel;
  deleteUser?: Maybe<User>;
  deleteUserApiKey?: Maybe<ApiKey>;
  deleteUserNotification?: Maybe<UserNotification>;
  disable2fa: LoginResult;
  enable2fa: LoginResult;
  foo: Scalars['String'];
  forgotPassword: Scalars['Boolean'];
  generate2faCode: TwoFactorAuthenticationResult;
  get2faQRCode: Scalars['String'];
  initLocalCache: Scalars['Boolean'];
  login: LoginResult;
  logout: Scalars['Boolean'];
  processInitLocalCache: Scalars['Boolean'];
  refreshToken: Scalars['String'];
  removeRole?: Maybe<User>;
  sendAdminNotification?: Maybe<UserNotification>;
  sendEmailCodePasswordChange: Scalars['Boolean'];
  setMyInfo: LoginResult;
  setPassword: Scalars['Boolean'];
  setUserInfo: LoginResult;
  signup: LoginResult;
  updateAppState: AppState;
  updateMe?: Maybe<User>;
  updateMyContact?: Maybe<User>;
  updateSettingsCommon: SettingsCommon;
  updateSettingsKyc: SettingsKyc;
  updateSettingsKycLevel: SettingsKycLevel;
  updateUser?: Maybe<User>;
  verify2faCode: LoginResult;
};


export type MutationAddFeedbackArgs = {
  feedback: FeedbackInput;
};


export type MutationAddMyContactArgs = {
  contact?: Maybe<UserContactInput>;
};


export type MutationAddSettingsKycArgs = {
  settings: SettingsKycInput;
};


export type MutationAddSettingsKycLevelArgs = {
  settingsLevel: SettingsKycLevelInput;
};


export type MutationAssignRoleArgs = {
  roleCodes?: Maybe<Array<Scalars['String']>>;
  userId: Scalars['ID'];
};


export type MutationChangePasswordArgs = {
  code2fa?: Maybe<Scalars['String']>;
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};


export type MutationConfirmDeviceArgs = {
  recaptcha: Scalars['String'];
  token: Scalars['String'];
};


export type MutationConfirmEmailArgs = {
  code?: Maybe<Scalars['Int']>;
  email?: Maybe<Scalars['String']>;
  recaptcha: Scalars['String'];
  token?: Maybe<Scalars['String']>;
};


export type MutationCreateUserApiKeyArgs = {
  userId?: Maybe<Scalars['String']>;
};


export type MutationDeleteMyApiKeyArgs = {
  apiKeyId?: Maybe<Scalars['String']>;
};


export type MutationDeleteMyContactArgs = {
  contactId: Scalars['ID'];
};


export type MutationDeleteMyNotificationArgs = {
  notificationId: Scalars['ID'];
};


export type MutationDeleteSettingsKycArgs = {
  settingsId: Scalars['ID'];
};


export type MutationDeleteSettingsKycLevelArgs = {
  settingsId: Scalars['ID'];
};


export type MutationDeleteUserArgs = {
  userId: Scalars['ID'];
};


export type MutationDeleteUserApiKeyArgs = {
  apiKeyId?: Maybe<Scalars['String']>;
};


export type MutationDeleteUserNotificationArgs = {
  notificationId: Scalars['ID'];
};


export type MutationDisable2faArgs = {
  code: Scalars['String'];
  password: Scalars['String'];
};


export type MutationEnable2faArgs = {
  code: Scalars['String'];
  password: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
  recaptcha: Scalars['String'];
};


export type MutationGet2faQrCodeArgs = {
  data: Scalars['String'];
};


export type MutationLoginArgs = {
  email?: Maybe<Scalars['String']>;
  oAuthProvider?: Maybe<OAuthProvider>;
  oAuthToken?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
  recaptcha: Scalars['String'];
};


export type MutationRemoveRoleArgs = {
  roleCodes?: Maybe<Array<Scalars['String']>>;
  userId: Scalars['ID'];
};


export type MutationSendAdminNotificationArgs = {
  level?: Maybe<UserNotificationLevel>;
  message?: Maybe<Scalars['String']>;
  notifiedUserId?: Maybe<Scalars['String']>;
};


export type MutationSetMyInfoArgs = {
  address?: Maybe<PostAddress>;
  birthday?: Maybe<Scalars['DateTime']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  recaptcha: Scalars['String'];
};


export type MutationSetPasswordArgs = {
  password: Scalars['String'];
  recaptcha: Scalars['String'];
  token: Scalars['String'];
};


export type MutationSetUserInfoArgs = {
  address?: Maybe<PostAddress>;
  birthday?: Maybe<Scalars['DateTime']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  userId: Scalars['String'];
};


export type MutationSignupArgs = {
  address?: Maybe<PostAddress>;
  birthday?: Maybe<Scalars['DateTime']>;
  countryCode2?: Maybe<Scalars['String']>;
  countryCode3?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  mode: UserMode;
  password?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  recaptcha: Scalars['String'];
  termsOfUse: Scalars['Boolean'];
};


export type MutationUpdateAppStateArgs = {
  isFullScreen?: Maybe<Scalars['Boolean']>;
  isProMode?: Maybe<Scalars['Boolean']>;
  isRealTrading?: Maybe<Scalars['Boolean']>;
  isSideBarCollapsed?: Maybe<Scalars['Boolean']>;
  currentMarketId?: Maybe<Scalars['String']>;
};


export type MutationUpdateMeArgs = {
  user?: Maybe<UserInput>;
};


export type MutationUpdateMyContactArgs = {
  contact?: Maybe<UserContactInput>;
  contactId: Scalars['String'];
};


export type MutationUpdateSettingsCommonArgs = {
  settings: SettingsCommonInput;
  settingsId: Scalars['ID'];
};


export type MutationUpdateSettingsKycArgs = {
  settings: SettingsKycInput;
  settingsId: Scalars['ID'];
};


export type MutationUpdateSettingsKycLevelArgs = {
  settingsLevel: SettingsKycLevelInput;
  settingsLevelId: Scalars['ID'];
};


export type MutationUpdateUserArgs = {
  user?: Maybe<UserInput>;
  userId: Scalars['ID'];
};


export type MutationVerify2faCodeArgs = {
  code: Scalars['String'];
};

export enum OAuthProvider {
  Facebook = 'facebook',
  Google = 'google',
  Microsoft = 'microsoft',
  Twitter = 'twitter'
}

export type OrderBy = {
  desc: Scalars['Boolean'];
  orderBy: Scalars['String'];
};

export type PostAddress = {
  addressEndDate?: Maybe<Scalars['DateTime']>;
  addressStartDate?: Maybe<Scalars['DateTime']>;
  buildingName?: Maybe<Scalars['String']>;
  buildingNumber?: Maybe<Scalars['String']>;
  flatNumber?: Maybe<Scalars['String']>;
  postCode?: Maybe<Scalars['String']>;
  stateName?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  subStreet?: Maybe<Scalars['String']>;
  town?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  appState: AppState;
  generateWebApiToken: Scalars['String'];
  getApiKeys?: Maybe<ApiKeyListResult>;
  getAppropriateSettingsKyc?: Maybe<SettingsKyc>;
  getFeedbacks?: Maybe<FeedbackListResult>;
  getNotifications?: Maybe<UserNotificationListResult>;
  getSettingsCommon?: Maybe<SettingsCommon>;
  getSettingsKyc?: Maybe<SettingsKycListResult>;
  getSettingsKycLevels?: Maybe<SettingsKycLevelListResult>;
  getSettingsKycShort?: Maybe<SettingsKycShortListResult>;
  getSupportTickets?: Maybe<SupportTicketListResult>;
  getUserActions: UserActionListResult;
  getUserContacts: UserContactListResult;
  getUserKycInfo?: Maybe<KycInfo>;
  getUserState: UserState;
  getUsers: UserListResult;
  me: User;
  myActions: UserActionListResult;
  myApiKeys?: Maybe<ApiKeyListResult>;
  myContacts: UserContactListResult;
  myKycInfo?: Maybe<KycInfo>;
  myKycStatus: Scalars['String'];
  myNotifications?: Maybe<UserNotificationListResult>;
  mySettingsKyc?: Maybe<SettingsKycShort>;
  mySettingsKycFull?: Maybe<SettingsKyc>;
  myState: UserState;
  mySupportTickets?: Maybe<SupportTicketListResult>;
  serverTime: Scalars['String'];
  userByEmail: User;
  userById: User;
  userByName: User;
  userByOAuthAppId: User;
  userByReferralCode: User;
  userCount?: Maybe<Scalars['Int']>;
  userKycInfo: KycInfo;
};


export type QueryGetApiKeysArgs = {
  filter?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<OrderBy>>;
  skip?: Maybe<Scalars['Int']>;
};


export type QueryGetAppropriateSettingsKycArgs = {
  filterType?: Maybe<SettingsKycTargetFilterType>;
  filterValue?: Maybe<Scalars['String']>;
  targetKycProvider: KycProvider;
  targetUserMode: UserMode;
};


export type QueryGetFeedbacksArgs = {
  filter?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<OrderBy>>;
  skip?: Maybe<Scalars['Int']>;
};


export type QueryGetNotificationsArgs = {
  filter?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<OrderBy>>;
  skip?: Maybe<Scalars['Int']>;
  unreadOnly?: Maybe<Scalars['Boolean']>;
  userId?: Maybe<Scalars['String']>;
};


export type QueryGetSettingsKycArgs = {
  filter?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<OrderBy>>;
  skip?: Maybe<Scalars['Int']>;
};


export type QueryGetSettingsKycLevelsArgs = {
  filter?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<OrderBy>>;
  skip?: Maybe<Scalars['Int']>;
};


export type QueryGetSettingsKycShortArgs = {
  filter?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<OrderBy>>;
  skip?: Maybe<Scalars['Int']>;
};


export type QueryGetSupportTicketsArgs = {
  filter?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<OrderBy>>;
  skip?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['String']>;
};


export type QueryGetUserActionsArgs = {
  filter?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<OrderBy>>;
  skip?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['String']>;
  withResult?: Maybe<UserActionResult>;
};


export type QueryGetUserContactsArgs = {
  filter?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<OrderBy>>;
  skip?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['String']>;
};


export type QueryGetUserKycInfoArgs = {
  userId?: Maybe<Scalars['String']>;
};


export type QueryGetUserStateArgs = {
  userId?: Maybe<Scalars['String']>;
};


export type QueryGetUsersArgs = {
  filter?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<OrderBy>>;
  skip?: Maybe<Scalars['Int']>;
};


export type QueryMyActionsArgs = {
  filter?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<OrderBy>>;
  skip?: Maybe<Scalars['Int']>;
  withResult?: Maybe<UserActionResult>;
};


export type QueryMyApiKeysArgs = {
  filter?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<OrderBy>>;
  skip?: Maybe<Scalars['Int']>;
};


export type QueryMyContactsArgs = {
  filter?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<OrderBy>>;
  skip?: Maybe<Scalars['Int']>;
};


export type QueryMyNotificationsArgs = {
  filter?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<OrderBy>>;
  skip?: Maybe<Scalars['Int']>;
  unreadOnly?: Maybe<Scalars['Boolean']>;
};


export type QueryMySupportTicketsArgs = {
  filter?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<OrderBy>>;
  skip?: Maybe<Scalars['Int']>;
};


export type QueryUserByEmailArgs = {
  email?: Maybe<Scalars['String']>;
};


export type QueryUserByIdArgs = {
  userId?: Maybe<Scalars['String']>;
};


export type QueryUserByNameArgs = {
  name?: Maybe<Scalars['String']>;
};


export type QueryUserByOAuthAppIdArgs = {
  oAuthAppId?: Maybe<Scalars['String']>;
  oAuthProvider?: Maybe<OAuthProvider>;
};


export type QueryUserByReferralCodeArgs = {
  referralCode?: Maybe<Scalars['Int']>;
};


export type QueryUserKycInfoArgs = {
  userId: Scalars['String'];
};

export type RequiredUserPermission = {
  fullAccess?: Maybe<Scalars['Boolean']>;
  objectCode?: Maybe<Scalars['String']>;
};

export type SettingsCommon = {
  __typename?: 'SettingsCommon';
  additionalSettings?: Maybe<Scalars['String']>;
  adminEmails?: Maybe<Array<Scalars['String']>>;
  custodyProvider?: Maybe<Scalars['String']>;
  kycBaseAddress?: Maybe<Scalars['String']>;
  kycProvider?: Maybe<Scalars['String']>;
  liquidityProvider?: Maybe<Scalars['String']>;
  settingsCommonId?: Maybe<Scalars['String']>;
};

export type SettingsCommonInput = {
  additionalSettings?: Maybe<Scalars['String']>;
  adminEmails?: Maybe<Array<Scalars['String']>>;
  custodyProvider?: Maybe<Scalars['String']>;
  kycProvider?: Maybe<Scalars['String']>;
  liquidityProvider?: Maybe<Scalars['String']>;
};

export type SettingsKyc = {
  __typename?: 'SettingsKyc';
  apiKey: Scalars['String'];
  deleted?: Maybe<Scalars['DateTime']>;
  serviceId?: Maybe<Scalars['String']>;
  serviceName: Scalars['String'];
  settingsKycId: Scalars['ID'];
  targetKycProviders?: Maybe<Array<KycProvider>>;
  targetUserModes?: Maybe<Array<UserMode>>;
};

export type SettingsKycInput = {
  apiKey: Scalars['String'];
  deleted?: Maybe<Scalars['DateTime']>;
  serviceId?: Maybe<Scalars['String']>;
  serviceName: Scalars['String'];
  targetKycProviders?: Maybe<Array<KycProvider>>;
  targetUserModes?: Maybe<Array<UserMode>>;
};

export type SettingsKycLevel = {
  __typename?: 'SettingsKycLevel';
  created?: Maybe<Scalars['DateTime']>;
  createdBy?: Maybe<Scalars['String']>;
  data?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  order?: Maybe<Scalars['Int']>;
  settingsKycLevelId: Scalars['ID'];
};

export type SettingsKycLevelInput = {
  data: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  order?: Maybe<Scalars['Int']>;
};

export type SettingsKycLevelListResult = {
  __typename?: 'SettingsKycLevelListResult';
  count?: Maybe<Scalars['Int']>;
  list?: Maybe<Array<SettingsKycLevel>>;
};

export type SettingsKycLevelShort = {
  __typename?: 'SettingsKycLevelShort';
  data?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  order?: Maybe<Scalars['Int']>;
  settingsKycLevelId: Scalars['ID'];
};

export type SettingsKycListResult = {
  __typename?: 'SettingsKycListResult';
  count?: Maybe<Scalars['Int']>;
  list?: Maybe<Array<SettingsKyc>>;
};

export type SettingsKycShort = {
  __typename?: 'SettingsKycShort';
  passed: Scalars['Boolean'];
  serviceId?: Maybe<Scalars['String']>;
  serviceName: Scalars['String'];
  settingsKycId: Scalars['ID'];
};

export type SettingsKycShortListResult = {
  __typename?: 'SettingsKycShortListResult';
  count?: Maybe<Scalars['Int']>;
  list?: Maybe<Array<SettingsKycShort>>;
};

export enum SettingsKycTargetFilterType {
  AccountId = 'AccountId',
  AffiliateId = 'AffiliateId',
  Country = 'Country',
  InitiateFrom = 'InitiateFrom',
  None = 'None'
}

export type StringMap = {
  __typename?: 'StringMap';
  key: Scalars['String'];
  value?: Maybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  newNotification?: Maybe<Scalars['Void']>;
};

export type SupportTicket = {
  __typename?: 'SupportTicket';
  category?: Maybe<SupportTicketCategory>;
  created?: Maybe<Scalars['DateTime']>;
  description?: Maybe<Scalars['String']>;
  files?: Maybe<Array<Scalars['String']>>;
  supportTicketId: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export enum SupportTicketCategory {
  Authorization = 'Authorization'
}

export type SupportTicketListResult = {
  __typename?: 'SupportTicketListResult';
  count?: Maybe<Scalars['Int']>;
  list?: Maybe<Array<SupportTicket>>;
};

export enum TokenAction {
  ApiKey = 'ApiKey',
  ConfirmDevice = 'ConfirmDevice',
  ConfirmEmail = 'ConfirmEmail',
  ConfirmPasswordChange = 'ConfirmPasswordChange',
  Default = 'Default',
  KycRequired = 'KycRequired',
  TwoFactorAuth = 'TwoFactorAuth',
  UserInfoRequired = 'UserInfoRequired'
}

export type TwoFactorAuthenticationResult = {
  __typename?: 'TwoFactorAuthenticationResult';
  code: Scalars['String'];
  otpauthUrl: Scalars['String'];
  qr: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  accessFailedCount?: Maybe<Scalars['Int']>;
  addressEndDate?: Maybe<Scalars['DateTime']>;
  addressStartDate?: Maybe<Scalars['DateTime']>;
  avatar?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['DateTime']>;
  buildingName?: Maybe<Scalars['String']>;
  buildingNumber?: Maybe<Scalars['String']>;
  changePasswordRequired?: Maybe<Scalars['Boolean']>;
  contacts?: Maybe<Array<UserContact>>;
  countryCode2?: Maybe<Scalars['String']>;
  countryCode3?: Maybe<Scalars['String']>;
  created?: Maybe<Scalars['DateTime']>;
  deleted?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  emailConfirmed?: Maybe<Scalars['DateTime']>;
  firstName?: Maybe<Scalars['String']>;
  flatNumber?: Maybe<Scalars['String']>;
  hasEmailAuth?: Maybe<Scalars['Boolean']>;
  is2faEnabled?: Maybe<Scalars['Boolean']>;
  kycApplicantId?: Maybe<Scalars['String']>;
  kycPrivateComment?: Maybe<Scalars['String']>;
  kycProvider?: Maybe<Scalars['String']>;
  kycReviewComment?: Maybe<Scalars['String']>;
  kycReviewDate?: Maybe<Scalars['DateTime']>;
  kycReviewRejectedLabels?: Maybe<Array<Scalars['String']>>;
  kycReviewRejectedType?: Maybe<Scalars['String']>;
  kycReviewResult?: Maybe<Scalars['String']>;
  kycServiceId?: Maybe<Scalars['String']>;
  kycStatus?: Maybe<Scalars['String']>;
  kycStatusDate?: Maybe<Scalars['DateTime']>;
  kycStatusUpdateRequired?: Maybe<Scalars['Boolean']>;
  kycValid?: Maybe<Scalars['Boolean']>;
  kycValidationTierId?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  mode?: Maybe<UserMode>;
  notificationSubscriptions?: Maybe<Array<UserNotificationSubscription>>;
  permissions?: Maybe<Array<UserRolePermission>>;
  phone?: Maybe<Scalars['String']>;
  postCode?: Maybe<Scalars['String']>;
  referralCode?: Maybe<Scalars['Int']>;
  roles?: Maybe<Array<UserRole>>;
  stateName?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  subStreet?: Maybe<Scalars['String']>;
  systemUser: Scalars['Boolean'];
  termsOfUse?: Maybe<Scalars['Boolean']>;
  town?: Maybe<Scalars['String']>;
  updated?: Maybe<Scalars['DateTime']>;
  userId: Scalars['ID'];
};

export type UserAction = {
  __typename?: 'UserAction';
  actionType?: Maybe<UserActionType>;
  date?: Maybe<Scalars['DateTime']>;
  info?: Maybe<Scalars['String']>;
  linkedIds?: Maybe<Array<Scalars['String']>>;
  objectId?: Maybe<Scalars['String']>;
  result?: Maybe<UserActionResult>;
  status?: Maybe<Scalars['String']>;
  userActionId: Scalars['ID'];
  userId: Scalars['String'];
};

export type UserActionListResult = {
  __typename?: 'UserActionListResult';
  count?: Maybe<Scalars['Int']>;
  list?: Maybe<Array<UserAction>>;
};

export enum UserActionResult {
  Canceled = 'canceled',
  Error = 'error',
  Failed = 'failed',
  Succeeded = 'succeeded',
  Unknown = 'unknown'
}

export enum UserActionType {
  Deposit = 'deposit',
  Exchange = 'exchange',
  Login = 'login',
  Logout = 'logout',
  Receive = 'receive',
  Send = 'send',
  Signup = 'signup',
  System = 'system',
  Transfer = 'transfer',
  Withdraw = 'withdraw'
}

export type UserContact = {
  __typename?: 'UserContact';
  address?: Maybe<Scalars['String']>;
  assetId?: Maybe<Scalars['String']>;
  contactEmail?: Maybe<Scalars['String']>;
  created?: Maybe<Scalars['DateTime']>;
  displayName?: Maybe<Scalars['String']>;
  userContactId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type UserContactInput = {
  address?: Maybe<Scalars['String']>;
  assetId?: Maybe<Scalars['String']>;
  contactEmail?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
};

export type UserContactListResult = {
  __typename?: 'UserContactListResult';
  count?: Maybe<Scalars['Int']>;
  list?: Maybe<Array<UserContact>>;
};

export type UserDevice = {
  __typename?: 'UserDevice';
  area?: Maybe<Scalars['Int']>;
  browser?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  countryCode2?: Maybe<Scalars['String']>;
  countryCode3?: Maybe<Scalars['String']>;
  created?: Maybe<Scalars['DateTime']>;
  device?: Maybe<Scalars['String']>;
  deviceConfirmed?: Maybe<Scalars['DateTime']>;
  eu?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  metro?: Maybe<Scalars['Int']>;
  region?: Maybe<Scalars['String']>;
  userDeviceId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type UserInput = {
  addressEndDate?: Maybe<Scalars['DateTime']>;
  addressStartDate?: Maybe<Scalars['DateTime']>;
  avatar?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['DateTime']>;
  buildingName?: Maybe<Scalars['String']>;
  buildingNumber?: Maybe<Scalars['String']>;
  changePasswordRequired?: Maybe<Scalars['Boolean']>;
  countryCode2?: Maybe<Scalars['String']>;
  countryCode3?: Maybe<Scalars['String']>;
  deleted?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  emailConfirmed?: Maybe<Scalars['DateTime']>;
  firstName?: Maybe<Scalars['String']>;
  flatNumber?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  mode?: Maybe<UserMode>;
  phone?: Maybe<Scalars['String']>;
  postCode?: Maybe<Scalars['String']>;
  stateName?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  subStreet?: Maybe<Scalars['String']>;
  termsOfUse?: Maybe<Scalars['Boolean']>;
  town?: Maybe<Scalars['String']>;
};

export type UserListResult = {
  __typename?: 'UserListResult';
  count?: Maybe<Scalars['Int']>;
  list?: Maybe<Array<User>>;
};

export type UserLogin = {
  __typename?: 'UserLogin';
  date: Scalars['DateTime'];
  ip?: Maybe<Scalars['String']>;
  result: Scalars['Int'];
  resultTokenAction?: Maybe<Scalars['String']>;
  userDeviceId?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  userLoginId?: Maybe<Scalars['String']>;
};

export enum UserMode {
  StandardUser = 'StandardUser'
}

export type UserNotification = {
  __typename?: 'UserNotification';
  created?: Maybe<Scalars['DateTime']>;
  linkedId?: Maybe<Scalars['String']>;
  linkedTable?: Maybe<Scalars['String']>;
  params?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
  userId?: Maybe<Scalars['String']>;
  userNotificationId: Scalars['ID'];
  userNotificationLevel?: Maybe<UserNotificationLevel>;
  userNotificationTypeCode: Scalars['String'];
  viewed?: Maybe<Scalars['DateTime']>;
};

export enum UserNotificationCodes {
  AdminToUserNotification = 'ADMIN_TO_USER_NOTIFICATION',
  KycStatusChanged = 'KYC_STATUS_CHANGED',
  TestNotification = 'TEST_NOTIFICATION'
}

export enum UserNotificationLevel {
  Debug = 'Debug',
  Error = 'Error',
  Info = 'Info',
  Warning = 'Warning'
}

export type UserNotificationListResult = {
  __typename?: 'UserNotificationListResult';
  count?: Maybe<Scalars['Int']>;
  list?: Maybe<Array<UserNotification>>;
};

export type UserNotificationSubscription = {
  __typename?: 'UserNotificationSubscription';
  emailNotification?: Maybe<Scalars['Boolean']>;
  siteNotification?: Maybe<Scalars['Boolean']>;
  userId?: Maybe<Scalars['String']>;
  userNotificationSubscriptionId: Scalars['ID'];
  userNotificationTypeCode: Scalars['String'];
};

export type UserNotificationSubscriptionInput = {
  emailNotification?: Maybe<Scalars['Boolean']>;
  siteNotification?: Maybe<Scalars['Boolean']>;
  userId?: Maybe<Scalars['String']>;
  userNotificationTypeCode: Scalars['String'];
};

export type UserNotificationSubscriptionListResult = {
  __typename?: 'UserNotificationSubscriptionListResult';
  count?: Maybe<Scalars['Int']>;
  list?: Maybe<Array<UserNotificationSubscription>>;
};

export type UserNotificationType = {
  __typename?: 'UserNotificationType';
  description?: Maybe<Scalars['String']>;
  emailNotificationDefault?: Maybe<Scalars['Boolean']>;
  emailNotificationImmutable?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  siteNotificationDefault?: Maybe<Scalars['Boolean']>;
  siteNotificationImmutable?: Maybe<Scalars['Boolean']>;
  userNotificationTypeCode: Scalars['ID'];
};

export type UserNotificationTypeInput = {
  description?: Maybe<Scalars['String']>;
  emailNotificationDefault?: Maybe<Scalars['Boolean']>;
  emailNotificationImmutable?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  siteNotificationDefault?: Maybe<Scalars['Boolean']>;
  siteNotificationImmutable?: Maybe<Scalars['Boolean']>;
};

export type UserNotificationTypeListResult = {
  __typename?: 'UserNotificationTypeListResult';
  count?: Maybe<Scalars['Int']>;
  list?: Maybe<Array<UserNotificationType>>;
};

export type UserRole = {
  __typename?: 'UserRole';
  code: Scalars['String'];
  immutable?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
};

export type UserRolePermission = {
  __typename?: 'UserRolePermission';
  fullAccess: Scalars['Boolean'];
  objectCode: Scalars['String'];
  objectDescription: Scalars['String'];
  objectName: Scalars['String'];
  roleCode: Scalars['String'];
  roleName: Scalars['String'];
};

export type UserShort = {
  __typename?: 'UserShort';
  avatar?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['DateTime']>;
  countryCode2?: Maybe<Scalars['String']>;
  countryCode3?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  firstName?: Maybe<Scalars['String']>;
  kycReviewComment?: Maybe<Scalars['String']>;
  kycStatus?: Maybe<Scalars['String']>;
  kycValid?: Maybe<Scalars['Boolean']>;
  lastName?: Maybe<Scalars['String']>;
};

export type UserState = {
  __typename?: 'UserState';
  date?: Maybe<Scalars['DateTime']>;
  notifications?: Maybe<UserNotificationListResult>;
};


export type UserStateNotificationsArgs = {
  first?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<OrderBy>>;
  skip?: Maybe<Scalars['Int']>;
  unreadOnly?: Maybe<Scalars['Boolean']>;
};

