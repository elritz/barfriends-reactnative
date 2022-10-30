import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Json: any;
};

export type Address = {
  __typename?: 'Address';
  AddressComponents: Array<AddressComponent>;
  createdAt: Scalars['DateTime'];
  formattedAddress: Scalars['String'];
  id: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};


export type AddressAddressComponentsArgs = {
  after?: InputMaybe<AddressComponentWhereUniqueInput>;
  before?: InputMaybe<AddressComponentWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type AddressComponent = {
  __typename?: 'AddressComponent';
  addressId?: Maybe<Scalars['String']>;
  h3Index15?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  long_name: Scalars['String'];
  short_name: Scalars['String'];
  types: Array<Scalars['String']>;
};

export type AddressComponentCreateManyAddressInput = {
  h3Index15?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
  long_name: Scalars['String'];
  short_name: Scalars['String'];
  types?: InputMaybe<AddressComponentCreateManytypesInput>;
};

export type AddressComponentCreateManyAddressInputEnvelope = {
  data?: InputMaybe<Array<AddressComponentCreateManyAddressInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type AddressComponentCreateManytypesInput = {
  set?: InputMaybe<Array<Scalars['String']>>;
};

export type AddressComponentCreateNestedManyWithoutAddressInput = {
  connect?: InputMaybe<Array<AddressComponentWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AddressComponentCreateOrConnectWithoutAddressInput>>;
  create?: InputMaybe<Array<AddressComponentCreateWithoutAddressInput>>;
  createMany?: InputMaybe<AddressComponentCreateManyAddressInputEnvelope>;
};

export type AddressComponentCreateOrConnectWithoutAddressInput = {
  create: AddressComponentCreateWithoutAddressInput;
  where: AddressComponentWhereUniqueInput;
};

export type AddressComponentCreatetypesInput = {
  set?: InputMaybe<Array<Scalars['String']>>;
};

export type AddressComponentCreateWithoutAddressInput = {
  h3Index15?: InputMaybe<Scalars['String']>;
  long_name: Scalars['String'];
  short_name: Scalars['String'];
  types?: InputMaybe<AddressComponentCreatetypesInput>;
};

export type AddressComponentListRelationFilter = {
  every?: InputMaybe<AddressComponentWhereInput>;
  none?: InputMaybe<AddressComponentWhereInput>;
  some?: InputMaybe<AddressComponentWhereInput>;
};

export type AddressComponentOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type AddressComponentScalarWhereInput = {
  addressId?: InputMaybe<StringNullableFilter>;
  AND?: InputMaybe<Array<AddressComponentScalarWhereInput>>;
  h3Index15?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<IntFilter>;
  long_name?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<AddressComponentScalarWhereInput>>;
  OR?: InputMaybe<Array<AddressComponentScalarWhereInput>>;
  short_name?: InputMaybe<StringFilter>;
  types?: InputMaybe<StringNullableListFilter>;
};

export type AddressComponentUpdateManyMutationInput = {
  h3Index15?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  long_name?: InputMaybe<StringFieldUpdateOperationsInput>;
  short_name?: InputMaybe<StringFieldUpdateOperationsInput>;
  types?: InputMaybe<AddressComponentUpdatetypesInput>;
};

export type AddressComponentUpdateManyWithoutAddressInput = {
  connect?: InputMaybe<Array<AddressComponentWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<AddressComponentCreateOrConnectWithoutAddressInput>>;
  create?: InputMaybe<Array<AddressComponentCreateWithoutAddressInput>>;
  createMany?: InputMaybe<AddressComponentCreateManyAddressInputEnvelope>;
  delete?: InputMaybe<Array<AddressComponentWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<AddressComponentScalarWhereInput>>;
  disconnect?: InputMaybe<Array<AddressComponentWhereUniqueInput>>;
  set?: InputMaybe<Array<AddressComponentWhereUniqueInput>>;
  update?: InputMaybe<Array<AddressComponentUpdateWithWhereUniqueWithoutAddressInput>>;
  updateMany?: InputMaybe<Array<AddressComponentUpdateManyWithWhereWithoutAddressInput>>;
  upsert?: InputMaybe<Array<AddressComponentUpsertWithWhereUniqueWithoutAddressInput>>;
};

export type AddressComponentUpdateManyWithWhereWithoutAddressInput = {
  data: AddressComponentUpdateManyMutationInput;
  where: AddressComponentScalarWhereInput;
};

export type AddressComponentUpdatetypesInput = {
  push?: InputMaybe<Scalars['String']>;
  set?: InputMaybe<Array<Scalars['String']>>;
};

export type AddressComponentUpdateWithoutAddressInput = {
  h3Index15?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  long_name?: InputMaybe<StringFieldUpdateOperationsInput>;
  short_name?: InputMaybe<StringFieldUpdateOperationsInput>;
  types?: InputMaybe<AddressComponentUpdatetypesInput>;
};

export type AddressComponentUpdateWithWhereUniqueWithoutAddressInput = {
  data: AddressComponentUpdateWithoutAddressInput;
  where: AddressComponentWhereUniqueInput;
};

export type AddressComponentUpsertWithWhereUniqueWithoutAddressInput = {
  create: AddressComponentCreateWithoutAddressInput;
  update: AddressComponentUpdateWithoutAddressInput;
  where: AddressComponentWhereUniqueInput;
};

export type AddressComponentWhereInput = {
  Address?: InputMaybe<AddressWhereInput>;
  addressId?: InputMaybe<StringNullableFilter>;
  AND?: InputMaybe<Array<AddressComponentWhereInput>>;
  h3Index15?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<IntFilter>;
  long_name?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<AddressComponentWhereInput>>;
  OR?: InputMaybe<Array<AddressComponentWhereInput>>;
  short_name?: InputMaybe<StringFilter>;
  types?: InputMaybe<StringNullableListFilter>;
};

export type AddressComponentWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
};

export type AddressCreateNestedOneWithoutLocationInput = {
  connect?: InputMaybe<AddressWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AddressCreateOrConnectWithoutLocationInput>;
  create?: InputMaybe<AddressCreateWithoutLocationInput>;
};

export type AddressCreateOrConnectWithoutLocationInput = {
  create: AddressCreateWithoutLocationInput;
  where: AddressWhereUniqueInput;
};

export type AddressCreateWithoutLocationInput = {
  AddressComponents?: InputMaybe<AddressComponentCreateNestedManyWithoutAddressInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  formattedAddress: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type AddressOrderByWithRelationInput = {
  AddressComponents?: InputMaybe<AddressComponentOrderByRelationAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  formattedAddress?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  Location?: InputMaybe<LocationOrderByRelationAggregateInput>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type AddressUpdateOneWithoutLocationInput = {
  connect?: InputMaybe<AddressWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AddressCreateOrConnectWithoutLocationInput>;
  create?: InputMaybe<AddressCreateWithoutLocationInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<AddressUpdateWithoutLocationInput>;
  upsert?: InputMaybe<AddressUpsertWithoutLocationInput>;
};

export type AddressUpdateWithoutLocationInput = {
  AddressComponents?: InputMaybe<AddressComponentUpdateManyWithoutAddressInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  formattedAddress?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type AddressUpsertWithoutLocationInput = {
  create: AddressCreateWithoutLocationInput;
  update: AddressUpdateWithoutLocationInput;
};

export type AddressWhereInput = {
  AddressComponents?: InputMaybe<AddressComponentListRelationFilter>;
  AND?: InputMaybe<Array<AddressWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  formattedAddress?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  Location?: InputMaybe<LocationListRelationFilter>;
  NOT?: InputMaybe<Array<AddressWhereInput>>;
  OR?: InputMaybe<Array<AddressWhereInput>>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type AddressWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export enum AppType {
  Barfriends = 'BARFRIENDS',
  Petfriends = 'PETFRIENDS'
}

export type AuthenticationProvider = {
  __typename?: 'AuthenticationProvider';
  emails: Array<Email>;
  id: Scalars['String'];
  Password?: Maybe<Password>;
  phones: Array<Phone>;
};


export type AuthenticationProviderEmailsArgs = {
  after?: InputMaybe<EmailWhereUniqueInput>;
  before?: InputMaybe<EmailWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type AuthenticationProviderPhonesArgs = {
  after?: InputMaybe<PhoneWhereUniqueInput>;
  before?: InputMaybe<PhoneWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type AuthenticationProviderCreateNestedOneWithoutCredentialsInput = {
  connect?: InputMaybe<AuthenticationProviderWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AuthenticationProviderCreateOrConnectWithoutCredentialsInput>;
  create?: InputMaybe<AuthenticationProviderCreateWithoutCredentialsInput>;
};

export type AuthenticationProviderCreateOrConnectWithoutCredentialsInput = {
  create: AuthenticationProviderCreateWithoutCredentialsInput;
  where: AuthenticationProviderWhereUniqueInput;
};

export type AuthenticationProviderCreateWithoutCredentialsInput = {
  codepassword?: InputMaybe<CodeCreateNestedOneWithoutAuthenticationProviderInput>;
  emails?: InputMaybe<EmailCreateNestedManyWithoutAuthenticationProviderInput>;
  id?: InputMaybe<Scalars['String']>;
  Password?: InputMaybe<PasswordCreateNestedOneWithoutAuthenticationProviderInput>;
  phones?: InputMaybe<PhoneCreateNestedManyWithoutAuthenticationProviderInput>;
};

export type AuthenticationProviderListRelationFilter = {
  every?: InputMaybe<AuthenticationProviderWhereInput>;
  none?: InputMaybe<AuthenticationProviderWhereInput>;
  some?: InputMaybe<AuthenticationProviderWhereInput>;
};

export type AuthenticationProviderOrderByWithRelationInput = {
  codepassword?: InputMaybe<CodeOrderByWithRelationInput>;
  Credentials?: InputMaybe<CredentialsOrderByWithRelationInput>;
  emails?: InputMaybe<EmailOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  Password?: InputMaybe<PasswordOrderByWithRelationInput>;
  phones?: InputMaybe<PhoneOrderByRelationAggregateInput>;
};

export type AuthenticationProviderUpdateOneWithoutCredentialsInput = {
  connect?: InputMaybe<AuthenticationProviderWhereUniqueInput>;
  connectOrCreate?: InputMaybe<AuthenticationProviderCreateOrConnectWithoutCredentialsInput>;
  create?: InputMaybe<AuthenticationProviderCreateWithoutCredentialsInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<AuthenticationProviderUpdateWithoutCredentialsInput>;
  upsert?: InputMaybe<AuthenticationProviderUpsertWithoutCredentialsInput>;
};

export type AuthenticationProviderUpdateWithoutCredentialsInput = {
  codepassword?: InputMaybe<CodeUpdateOneWithoutAuthenticationProviderInput>;
  emails?: InputMaybe<EmailUpdateManyWithoutAuthenticationProviderInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  Password?: InputMaybe<PasswordUpdateOneWithoutAuthenticationProviderInput>;
  phones?: InputMaybe<PhoneUpdateManyWithoutAuthenticationProviderInput>;
};

export type AuthenticationProviderUpsertWithoutCredentialsInput = {
  create: AuthenticationProviderCreateWithoutCredentialsInput;
  update: AuthenticationProviderUpdateWithoutCredentialsInput;
};

export type AuthenticationProviderWhereInput = {
  AND?: InputMaybe<Array<AuthenticationProviderWhereInput>>;
  codepassword?: InputMaybe<CodeWhereInput>;
  Credentials?: InputMaybe<CredentialsWhereInput>;
  emails?: InputMaybe<EmailListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<AuthenticationProviderWhereInput>>;
  OR?: InputMaybe<Array<AuthenticationProviderWhereInput>>;
  Password?: InputMaybe<PasswordWhereInput>;
  phones?: InputMaybe<PhoneListRelationFilter>;
};

export type AuthenticationProviderWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type Authenticators = {
  EmailInput?: InputMaybe<EmailInput>;
  PhoneInput?: InputMaybe<PhoneInput>;
  username?: InputMaybe<Scalars['String']>;
};

export type AuthorizedProfilesResponseUnion = ErrorProfiling | ProfileTypesResponse;

export type AuthorizedProfilesWhereInput = {
  Profiles?: InputMaybe<Array<InputMaybe<ProfileArgs>>>;
};

export type BoolFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['Boolean']>;
};

export type BoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type BoolNullableFilter = {
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<NestedBoolNullableFilter>;
};

export type ChatroomCreateNestedOneWithoutMessagesInput = {
  connect?: InputMaybe<ChatroomWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ChatroomCreateOrConnectWithoutMessagesInput>;
  create?: InputMaybe<ChatroomCreateWithoutMessagesInput>;
};

export type ChatroomCreateNestedOneWithoutProfilesInput = {
  connect?: InputMaybe<ChatroomWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ChatroomCreateOrConnectWithoutProfilesInput>;
  create?: InputMaybe<ChatroomCreateWithoutProfilesInput>;
};

export type ChatroomCreateOrConnectWithoutMessagesInput = {
  create: ChatroomCreateWithoutMessagesInput;
  where: ChatroomWhereUniqueInput;
};

export type ChatroomCreateOrConnectWithoutProfilesInput = {
  create: ChatroomCreateWithoutProfilesInput;
  where: ChatroomWhereUniqueInput;
};

export type ChatroomCreateWithoutMessagesInput = {
  id?: InputMaybe<Scalars['String']>;
  profiles?: InputMaybe<ProfileCreateNestedManyWithoutChatroomInput>;
};

export type ChatroomCreateWithoutProfilesInput = {
  id?: InputMaybe<Scalars['String']>;
  messages?: InputMaybe<MessageCreateNestedManyWithoutChatroomInput>;
};

export type ChatroomOrderByWithRelationInput = {
  id?: InputMaybe<SortOrder>;
  messages?: InputMaybe<MessageOrderByRelationAggregateInput>;
  profiles?: InputMaybe<ProfileOrderByRelationAggregateInput>;
};

export type ChatroomUpdateOneWithoutMessagesInput = {
  connect?: InputMaybe<ChatroomWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ChatroomCreateOrConnectWithoutMessagesInput>;
  create?: InputMaybe<ChatroomCreateWithoutMessagesInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<ChatroomUpdateWithoutMessagesInput>;
  upsert?: InputMaybe<ChatroomUpsertWithoutMessagesInput>;
};

export type ChatroomUpdateOneWithoutProfilesInput = {
  connect?: InputMaybe<ChatroomWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ChatroomCreateOrConnectWithoutProfilesInput>;
  create?: InputMaybe<ChatroomCreateWithoutProfilesInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<ChatroomUpdateWithoutProfilesInput>;
  upsert?: InputMaybe<ChatroomUpsertWithoutProfilesInput>;
};

export type ChatroomUpdateWithoutMessagesInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  profiles?: InputMaybe<ProfileUpdateManyWithoutChatroomInput>;
};

export type ChatroomUpdateWithoutProfilesInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  messages?: InputMaybe<MessageUpdateManyWithoutChatroomInput>;
};

export type ChatroomUpsertWithoutMessagesInput = {
  create: ChatroomCreateWithoutMessagesInput;
  update: ChatroomUpdateWithoutMessagesInput;
};

export type ChatroomUpsertWithoutProfilesInput = {
  create: ChatroomCreateWithoutProfilesInput;
  update: ChatroomUpdateWithoutProfilesInput;
};

export type ChatroomWhereInput = {
  AND?: InputMaybe<Array<ChatroomWhereInput>>;
  id?: InputMaybe<StringFilter>;
  messages?: InputMaybe<MessageListRelationFilter>;
  NOT?: InputMaybe<Array<ChatroomWhereInput>>;
  OR?: InputMaybe<Array<ChatroomWhereInput>>;
  profiles?: InputMaybe<ProfileListRelationFilter>;
};

export type ChatroomWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type Code = {
  __typename?: 'Code';
  code?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type CodeCreateNestedOneWithoutAuthenticationProviderInput = {
  connect?: InputMaybe<CodeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CodeCreateOrConnectWithoutAuthenticationProviderInput>;
  create?: InputMaybe<CodeCreateWithoutAuthenticationProviderInput>;
};

export type CodeCreateOrConnectWithoutAuthenticationProviderInput = {
  create: CodeCreateWithoutAuthenticationProviderInput;
  where: CodeWhereUniqueInput;
};

export type CodeCreateWithoutAuthenticationProviderInput = {
  canUseAsRecovery?: InputMaybe<Scalars['Boolean']>;
  code: Scalars['String'];
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type CodeData = {
  /** Length is the total numbers that you want the code to be. */
  length?: InputMaybe<Scalars['Int']>;
};

export type CodeOrderByWithRelationInput = {
  authenitcationProviderId?: InputMaybe<SortOrder>;
  AuthenticationProvider?: InputMaybe<AuthenticationProviderOrderByWithRelationInput>;
  canUseAsRecovery?: InputMaybe<SortOrder>;
  code?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

/** Any posibilities to a code response you will get from here */
export type CodeResponse = Code | ErrorProfiling;

export type CodeUpdateOneWithoutAuthenticationProviderInput = {
  connect?: InputMaybe<CodeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CodeCreateOrConnectWithoutAuthenticationProviderInput>;
  create?: InputMaybe<CodeCreateWithoutAuthenticationProviderInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<CodeUpdateWithoutAuthenticationProviderInput>;
  upsert?: InputMaybe<CodeUpsertWithoutAuthenticationProviderInput>;
};

export type CodeUpdateWithoutAuthenticationProviderInput = {
  canUseAsRecovery?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  code?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type CodeUpsertWithoutAuthenticationProviderInput = {
  create: CodeCreateWithoutAuthenticationProviderInput;
  update: CodeUpdateWithoutAuthenticationProviderInput;
};

export type CodeWhere = {
  Authenticators?: InputMaybe<Authenticators>;
};

export type CodeWhereInput = {
  AND?: InputMaybe<Array<CodeWhereInput>>;
  authenitcationProviderId?: InputMaybe<StringNullableFilter>;
  AuthenticationProvider?: InputMaybe<AuthenticationProviderWhereInput>;
  canUseAsRecovery?: InputMaybe<BoolNullableFilter>;
  code?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<CodeWhereInput>>;
  OR?: InputMaybe<Array<CodeWhereInput>>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type CodeWhereUniqueInput = {
  authenitcationProviderId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};

export type ContactInput = {
  type?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
};

export type CreatePersonalProfileDataInput = {
  birthday: Scalars['DateTime'];
  EmailInput?: InputMaybe<EmailInput>;
  emojimood?: InputMaybe<Scalars['Int']>;
  fullname?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  PhoneInput?: InputMaybe<PhoneInput>;
  photos?: InputMaybe<PhotoCreateManyProfileInputEnvelope>;
  PrivacyPolicyId: Scalars['ID'];
  ServicesId: Scalars['ID'];
  username: Scalars['String'];
};

export type CreateProfileResponse = {
  __typename?: 'CreateProfileResponse';
  Profile?: Maybe<Profile>;
};

export type CreateProfileResponseUnion = CreateProfileResponse | ErrorProfiling;

export type CreateVenueProfileDataInput = {
  address: Scalars['String'];
  birthday: Scalars['DateTime'];
  capacity: Scalars['String'];
  contacts?: InputMaybe<Array<InputMaybe<ContactInput>>>;
  description?: InputMaybe<Scalars['String']>;
  EmailInput?: InputMaybe<EmailInput>;
  established: Scalars['String'];
  ownername?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  PhoneInput?: InputMaybe<PhoneInput>;
  photos?: InputMaybe<PhotoCreateManyProfileInputEnvelope>;
  PrivacyPolicyId: Scalars['ID'];
  ServicesId: Scalars['ID'];
  venuelocalname?: InputMaybe<Scalars['String']>;
  venuename: Scalars['String'];
  venuetypes?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  venueusername: Scalars['String'];
};

export type CreateVenueStorageResponse = {
  __typename?: 'CreateVenueStorageResponse';
  profilingId?: Maybe<Scalars['String']>;
  storageId?: Maybe<Scalars['String']>;
};

export type Credentials = {
  __typename?: 'Credentials';
  AuthenticationProvider?: Maybe<AuthenticationProvider>;
  id: Scalars['String'];
};

export type CredentialsCreateNestedOneWithoutProfileInput = {
  connect?: InputMaybe<CredentialsWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CredentialsCreateOrConnectWithoutProfileInput>;
  create?: InputMaybe<CredentialsCreateWithoutProfileInput>;
};

export type CredentialsCreateOrConnectWithoutProfileInput = {
  create: CredentialsCreateWithoutProfileInput;
  where: CredentialsWhereUniqueInput;
};

export type CredentialsCreateWithoutProfileInput = {
  AuthenticationProvider?: InputMaybe<AuthenticationProviderCreateNestedOneWithoutCredentialsInput>;
  createdtAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  LegalAgreement?: InputMaybe<LegalAgreementCreateNestedManyWithoutCredentialsInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type CredentialsOrderByWithRelationInput = {
  AuthenticationProvider?: InputMaybe<AuthenticationProviderOrderByWithRelationInput>;
  authenticationProviderId?: InputMaybe<SortOrder>;
  createdtAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  LegalAgreement?: InputMaybe<LegalAgreementOrderByRelationAggregateInput>;
  Profile?: InputMaybe<ProfileOrderByWithRelationInput>;
  profileId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type CredentialsUpdateOneWithoutProfileInput = {
  connect?: InputMaybe<CredentialsWhereUniqueInput>;
  connectOrCreate?: InputMaybe<CredentialsCreateOrConnectWithoutProfileInput>;
  create?: InputMaybe<CredentialsCreateWithoutProfileInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<CredentialsUpdateWithoutProfileInput>;
  upsert?: InputMaybe<CredentialsUpsertWithoutProfileInput>;
};

export type CredentialsUpdateWithoutProfileInput = {
  AuthenticationProvider?: InputMaybe<AuthenticationProviderUpdateOneWithoutCredentialsInput>;
  createdtAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  LegalAgreement?: InputMaybe<LegalAgreementUpdateManyWithoutCredentialsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type CredentialsUpsertWithoutProfileInput = {
  create: CredentialsCreateWithoutProfileInput;
  update: CredentialsUpdateWithoutProfileInput;
};

export type CredentialsWhereInput = {
  AND?: InputMaybe<Array<CredentialsWhereInput>>;
  AuthenticationProvider?: InputMaybe<AuthenticationProviderWhereInput>;
  authenticationProviderId?: InputMaybe<StringNullableFilter>;
  createdtAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  LegalAgreement?: InputMaybe<LegalAgreementListRelationFilter>;
  NOT?: InputMaybe<Array<CredentialsWhereInput>>;
  OR?: InputMaybe<Array<CredentialsWhereInput>>;
  Profile?: InputMaybe<ProfileWhereInput>;
  profileId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type CredentialsWhereUniqueInput = {
  authenticationProviderId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  profileId?: InputMaybe<Scalars['String']>;
};

export type DateTimeFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['DateTime']>;
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type DateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type DetailInformation = {
  __typename?: 'DetailInformation';
  description?: Maybe<Scalars['String']>;
  established?: Maybe<Scalars['DateTime']>;
  id: Scalars['String'];
  Profile: Profile;
  profileId: Scalars['String'];
  Tags: Array<Tag>;
};


export type DetailInformationTagsArgs = {
  after?: InputMaybe<TagWhereUniqueInput>;
  before?: InputMaybe<TagWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type DetailInformationCreateNestedOneWithoutProfileInput = {
  connect?: InputMaybe<DetailInformationWhereUniqueInput>;
  connectOrCreate?: InputMaybe<DetailInformationCreateOrConnectWithoutProfileInput>;
  create?: InputMaybe<DetailInformationCreateWithoutProfileInput>;
};

export type DetailInformationCreateOrConnectWithoutProfileInput = {
  create: DetailInformationCreateWithoutProfileInput;
  where: DetailInformationWhereUniqueInput;
};

export type DetailInformationCreateWithoutProfileInput = {
  capacity?: InputMaybe<Scalars['Int']>;
  description?: InputMaybe<Scalars['String']>;
  established?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  Tags?: InputMaybe<TagCreateNestedManyWithoutDetailInformationInput>;
};

export type DetailInformationListRelationFilter = {
  every?: InputMaybe<DetailInformationWhereInput>;
  none?: InputMaybe<DetailInformationWhereInput>;
  some?: InputMaybe<DetailInformationWhereInput>;
};

export type DetailInformationOrderByWithRelationInput = {
  capacity?: InputMaybe<SortOrder>;
  description?: InputMaybe<SortOrder>;
  established?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  Profile?: InputMaybe<ProfileOrderByWithRelationInput>;
  profileId?: InputMaybe<SortOrder>;
  Tags?: InputMaybe<TagOrderByRelationAggregateInput>;
};

export type DetailInformationUpdateOneWithoutProfileInput = {
  connect?: InputMaybe<DetailInformationWhereUniqueInput>;
  connectOrCreate?: InputMaybe<DetailInformationCreateOrConnectWithoutProfileInput>;
  create?: InputMaybe<DetailInformationCreateWithoutProfileInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<DetailInformationUpdateWithoutProfileInput>;
  upsert?: InputMaybe<DetailInformationUpsertWithoutProfileInput>;
};

export type DetailInformationUpdateWithoutProfileInput = {
  capacity?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  description?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  established?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  Tags?: InputMaybe<TagUpdateManyWithoutDetailInformationInput>;
};

export type DetailInformationUpsertWithoutProfileInput = {
  create: DetailInformationCreateWithoutProfileInput;
  update: DetailInformationUpdateWithoutProfileInput;
};

export type DetailInformationWhereInput = {
  AND?: InputMaybe<Array<DetailInformationWhereInput>>;
  capacity?: InputMaybe<IntNullableFilter>;
  description?: InputMaybe<StringNullableFilter>;
  established?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<DetailInformationWhereInput>>;
  OR?: InputMaybe<Array<DetailInformationWhereInput>>;
  Profile?: InputMaybe<ProfileWhereInput>;
  profileId?: InputMaybe<StringFilter>;
  Tags?: InputMaybe<TagListRelationFilter>;
};

export type DetailInformationWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  profileId?: InputMaybe<Scalars['String']>;
};

export type Device = {
  __typename?: 'Device';
  deviceType?: Maybe<Scalars['String']>;
};

export type DeviceCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  DeviceManager: DeviceManagerCreateNestedOneWithoutDeviceInput;
  deviceType?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type DeviceManager = Node & {
  __typename?: 'DeviceManager';
  Device?: Maybe<Device>;
  DeviceProfile?: Maybe<DeviceProfile>;
  id: Scalars['String'];
};

export type DeviceManagerCreateNestedOneWithoutDeviceInput = {
  connect?: InputMaybe<DeviceManagerWhereUniqueInput>;
  connectOrCreate?: InputMaybe<DeviceManagerCreateOrConnectWithoutDeviceInput>;
  create?: InputMaybe<DeviceManagerCreateWithoutDeviceInput>;
};

export type DeviceManagerCreateOrConnectWithoutDeviceInput = {
  create: DeviceManagerCreateWithoutDeviceInput;
  where: DeviceManagerWhereUniqueInput;
};

export type DeviceManagerCreateWithoutDeviceInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  DeviceProfile?: InputMaybe<DeviceProfileCreateNestedManyWithoutDeviceManagerInput>;
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type DeviceManagerDeviceProfiles = {
  __typename?: 'DeviceManagerDeviceProfiles';
  DeviceProfiles?: Maybe<Array<Maybe<DeviceProfile>>>;
};

export type DeviceManagerDeviceProfilesResponseUnion = DeviceManagerDeviceProfiles | Error;

export type DeviceManagerWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type DeviceProfile = {
  __typename?: 'DeviceProfile';
  accesstoken?: Maybe<Scalars['String']>;
  AppType?: Maybe<AppType>;
  DeviceManager: DeviceManager;
  deviceManagerId: Scalars['String'];
  id: Scalars['Int'];
  isActive: Scalars['Boolean'];
  Profile?: Maybe<Profile>;
  refreshtoken?: Maybe<Scalars['String']>;
};

export type DeviceProfileCreateManyDeviceManagerInput = {
  accesstoken?: InputMaybe<Scalars['String']>;
  AppType?: InputMaybe<AppType>;
  id?: InputMaybe<Scalars['Int']>;
  isActive: Scalars['Boolean'];
  profileId?: InputMaybe<Scalars['String']>;
  ProfileType?: InputMaybe<ProfileType>;
};

export type DeviceProfileCreateManyDeviceManagerInputEnvelope = {
  data?: InputMaybe<Array<DeviceProfileCreateManyDeviceManagerInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type DeviceProfileCreateNestedManyWithoutDeviceManagerInput = {
  connect?: InputMaybe<Array<DeviceProfileWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<DeviceProfileCreateOrConnectWithoutDeviceManagerInput>>;
  create?: InputMaybe<Array<DeviceProfileCreateWithoutDeviceManagerInput>>;
  createMany?: InputMaybe<DeviceProfileCreateManyDeviceManagerInputEnvelope>;
};

export type DeviceProfileCreateOrConnectWithoutDeviceManagerInput = {
  create: DeviceProfileCreateWithoutDeviceManagerInput;
  where: DeviceProfileWhereUniqueInput;
};

export type DeviceProfileCreateWithoutDeviceManagerInput = {
  accesstoken?: InputMaybe<Scalars['String']>;
  AppType?: InputMaybe<AppType>;
  isActive: Scalars['Boolean'];
  profileId?: InputMaybe<Scalars['String']>;
  ProfileType?: InputMaybe<ProfileType>;
  RefreshToken?: InputMaybe<RefreshTokenCreateNestedOneWithoutDeviceProfileInput>;
};

export type DeviceProfileWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
};

export type DeviceWhereUniqueInput = {
  deviceManagerId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};

export type Document = {
  __typename?: 'Document';
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  TypeOfDocument: TypeOfDocument;
  updatedAt: Scalars['DateTime'];
};

export type DocumentCreateNestedOneWithoutLegalAgreementInput = {
  connect?: InputMaybe<DocumentWhereUniqueInput>;
  connectOrCreate?: InputMaybe<DocumentCreateOrConnectWithoutLegalAgreementInput>;
  create?: InputMaybe<DocumentCreateWithoutLegalAgreementInput>;
};

export type DocumentCreateOrConnectWithoutLegalAgreementInput = {
  create: DocumentCreateWithoutLegalAgreementInput;
  where: DocumentWhereUniqueInput;
};

export type DocumentCreateWithoutLegalAgreementInput = {
  content: Scalars['String'];
  createdAt?: InputMaybe<Scalars['DateTime']>;
  TypeOfDocument: TypeOfDocument;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type DocumentOrderByWithRelationInput = {
  content?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  LegalAgreement?: InputMaybe<LegalAgreementOrderByRelationAggregateInput>;
  TypeOfDocument?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type DocumentUpdateOneRequiredWithoutLegalAgreementInput = {
  connect?: InputMaybe<DocumentWhereUniqueInput>;
  connectOrCreate?: InputMaybe<DocumentCreateOrConnectWithoutLegalAgreementInput>;
  create?: InputMaybe<DocumentCreateWithoutLegalAgreementInput>;
  update?: InputMaybe<DocumentUpdateWithoutLegalAgreementInput>;
  upsert?: InputMaybe<DocumentUpsertWithoutLegalAgreementInput>;
};

export type DocumentUpdateWithoutLegalAgreementInput = {
  content?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  TypeOfDocument?: InputMaybe<EnumTypeOfDocumentFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type DocumentUpsertWithoutLegalAgreementInput = {
  create: DocumentCreateWithoutLegalAgreementInput;
  update: DocumentUpdateWithoutLegalAgreementInput;
};

export type DocumentWhereInput = {
  AND?: InputMaybe<Array<DocumentWhereInput>>;
  content?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IntFilter>;
  LegalAgreement?: InputMaybe<LegalAgreementListRelationFilter>;
  NOT?: InputMaybe<Array<DocumentWhereInput>>;
  OR?: InputMaybe<Array<DocumentWhereInput>>;
  TypeOfDocument?: InputMaybe<EnumTypeOfDocumentFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type DocumentWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
};

export type Email = {
  __typename?: 'Email';
  canUseAsRecovery?: Maybe<Scalars['Boolean']>;
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  id: Scalars['Int'];
  updatedAt: Scalars['DateTime'];
};

export type EmailCreateNestedManyWithoutAuthenticationProviderInput = {
  connect?: InputMaybe<Array<EmailWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<EmailCreateOrConnectWithoutAuthenticationProviderInput>>;
  create?: InputMaybe<Array<EmailCreateWithoutAuthenticationProviderInput>>;
};

export type EmailCreateOrConnectWithoutAuthenticationProviderInput = {
  create: EmailCreateWithoutAuthenticationProviderInput;
  where: EmailWhereUniqueInput;
};

export type EmailCreateWithoutAuthenticationProviderInput = {
  canUseAsRecovery?: InputMaybe<Scalars['Boolean']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  email: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type EmailInput = {
  /** Example: christian@barfriends.com */
  email?: InputMaybe<Scalars['String']>;
};

export type EmailListRelationFilter = {
  every?: InputMaybe<EmailWhereInput>;
  none?: InputMaybe<EmailWhereInput>;
  some?: InputMaybe<EmailWhereInput>;
};

export type EmailOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type EmailScalarWhereInput = {
  AND?: InputMaybe<Array<EmailScalarWhereInput>>;
  canUseAsRecovery?: InputMaybe<BoolNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  email?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  NOT?: InputMaybe<Array<EmailScalarWhereInput>>;
  OR?: InputMaybe<Array<EmailScalarWhereInput>>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type EmailUpdateManyMutationInput = {
  canUseAsRecovery?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type EmailUpdateManyWithoutAuthenticationProviderInput = {
  connect?: InputMaybe<Array<EmailWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<EmailCreateOrConnectWithoutAuthenticationProviderInput>>;
  create?: InputMaybe<Array<EmailCreateWithoutAuthenticationProviderInput>>;
  delete?: InputMaybe<Array<EmailWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<EmailScalarWhereInput>>;
  disconnect?: InputMaybe<Array<EmailWhereUniqueInput>>;
  set?: InputMaybe<Array<EmailWhereUniqueInput>>;
  update?: InputMaybe<Array<EmailUpdateWithWhereUniqueWithoutAuthenticationProviderInput>>;
  updateMany?: InputMaybe<Array<EmailUpdateManyWithWhereWithoutAuthenticationProviderInput>>;
  upsert?: InputMaybe<Array<EmailUpsertWithWhereUniqueWithoutAuthenticationProviderInput>>;
};

export type EmailUpdateManyWithWhereWithoutAuthenticationProviderInput = {
  data: EmailUpdateManyMutationInput;
  where: EmailScalarWhereInput;
};

export type EmailUpdateWithoutAuthenticationProviderInput = {
  canUseAsRecovery?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  email?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type EmailUpdateWithWhereUniqueWithoutAuthenticationProviderInput = {
  data: EmailUpdateWithoutAuthenticationProviderInput;
  where: EmailWhereUniqueInput;
};

export type EmailUpsertWithWhereUniqueWithoutAuthenticationProviderInput = {
  create: EmailCreateWithoutAuthenticationProviderInput;
  update: EmailUpdateWithoutAuthenticationProviderInput;
  where: EmailWhereUniqueInput;
};

export type EmailWhereInput = {
  AND?: InputMaybe<Array<EmailWhereInput>>;
  AuthenticationProvider?: InputMaybe<AuthenticationProviderListRelationFilter>;
  canUseAsRecovery?: InputMaybe<BoolNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  email?: InputMaybe<StringFilter>;
  id?: InputMaybe<IntFilter>;
  NOT?: InputMaybe<Array<EmailWhereInput>>;
  OR?: InputMaybe<Array<EmailWhereInput>>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type EmailWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
};

export type Emojimood = {
  __typename?: 'Emojimood';
  colors: Array<Scalars['String']>;
  emoji?: Maybe<Scalars['String']>;
  emojiname?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  Story: Array<Story>;
};


export type EmojimoodStoryArgs = {
  after?: InputMaybe<StoryWhereUniqueInput>;
  before?: InputMaybe<StoryWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type EmojimoodCreatecolorsInput = {
  set?: InputMaybe<Array<Scalars['String']>>;
};

export type EmojimoodCreateInput = {
  colors: Array<InputMaybe<Scalars['String']>>;
  emoji: Scalars['String'];
  emojiname: Scalars['String'];
};

export type EmojimoodCreateNestedManyWithoutStoryInput = {
  connect?: InputMaybe<Array<EmojimoodWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<EmojimoodCreateOrConnectWithoutStoryInput>>;
  create?: InputMaybe<Array<EmojimoodCreateWithoutStoryInput>>;
};

export type EmojimoodCreateOrConnectWithoutStoryInput = {
  create: EmojimoodCreateWithoutStoryInput;
  where: EmojimoodWhereUniqueInput;
};

export type EmojimoodCreateWithoutStoryInput = {
  colors?: InputMaybe<EmojimoodCreatecolorsInput>;
  emoji?: InputMaybe<Scalars['String']>;
  emojiname?: InputMaybe<Scalars['String']>;
};

export type EmojimoodListRelationFilter = {
  every?: InputMaybe<EmojimoodWhereInput>;
  none?: InputMaybe<EmojimoodWhereInput>;
  some?: InputMaybe<EmojimoodWhereInput>;
};

export type EmojimoodOrderByWithRelationInput = {
  colors?: InputMaybe<SortOrder>;
  emoji?: InputMaybe<SortOrder>;
  emojiname?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  Story?: InputMaybe<StoryOrderByRelationAggregateInput>;
};

export type EmojimoodScalarWhereInput = {
  AND?: InputMaybe<Array<EmojimoodScalarWhereInput>>;
  colors?: InputMaybe<StringNullableListFilter>;
  emoji?: InputMaybe<StringNullableFilter>;
  emojiname?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<IntFilter>;
  NOT?: InputMaybe<Array<EmojimoodScalarWhereInput>>;
  OR?: InputMaybe<Array<EmojimoodScalarWhereInput>>;
};

export type EmojimoodUpdatecolorsInput = {
  push?: InputMaybe<Scalars['String']>;
  set?: InputMaybe<Array<Scalars['String']>>;
};

export type EmojimoodUpdateManyMutationInput = {
  colors?: InputMaybe<EmojimoodUpdatecolorsInput>;
  emoji?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  emojiname?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type EmojimoodUpdateManyWithoutStoryInput = {
  connect?: InputMaybe<Array<EmojimoodWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<EmojimoodCreateOrConnectWithoutStoryInput>>;
  create?: InputMaybe<Array<EmojimoodCreateWithoutStoryInput>>;
  delete?: InputMaybe<Array<EmojimoodWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<EmojimoodScalarWhereInput>>;
  disconnect?: InputMaybe<Array<EmojimoodWhereUniqueInput>>;
  set?: InputMaybe<Array<EmojimoodWhereUniqueInput>>;
  update?: InputMaybe<Array<EmojimoodUpdateWithWhereUniqueWithoutStoryInput>>;
  updateMany?: InputMaybe<Array<EmojimoodUpdateManyWithWhereWithoutStoryInput>>;
  upsert?: InputMaybe<Array<EmojimoodUpsertWithWhereUniqueWithoutStoryInput>>;
};

export type EmojimoodUpdateManyWithWhereWithoutStoryInput = {
  data: EmojimoodUpdateManyMutationInput;
  where: EmojimoodScalarWhereInput;
};

export type EmojimoodUpdateWithoutStoryInput = {
  colors?: InputMaybe<EmojimoodUpdatecolorsInput>;
  emoji?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  emojiname?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type EmojimoodUpdateWithWhereUniqueWithoutStoryInput = {
  data: EmojimoodUpdateWithoutStoryInput;
  where: EmojimoodWhereUniqueInput;
};

export type EmojimoodUpsertWithWhereUniqueWithoutStoryInput = {
  create: EmojimoodCreateWithoutStoryInput;
  update: EmojimoodUpdateWithoutStoryInput;
  where: EmojimoodWhereUniqueInput;
};

export type EmojimoodWhereInput = {
  AND?: InputMaybe<Array<EmojimoodWhereInput>>;
  colors?: InputMaybe<StringNullableListFilter>;
  emoji?: InputMaybe<StringNullableFilter>;
  emojiname?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<IntFilter>;
  NOT?: InputMaybe<Array<EmojimoodWhereInput>>;
  OR?: InputMaybe<Array<EmojimoodWhereInput>>;
  Story?: InputMaybe<StoryListRelationFilter>;
};

export type EmojimoodWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
};

export type EnumPhotoTypeNullableFilter = {
  equals?: InputMaybe<PhotoType>;
  in?: InputMaybe<Array<PhotoType>>;
  not?: InputMaybe<NestedEnumPhotoTypeNullableFilter>;
  notIn?: InputMaybe<Array<PhotoType>>;
};

export type EnumProfileTypeFieldUpdateOperationsInput = {
  set?: InputMaybe<ProfileType>;
};

export type EnumProfileTypeFilter = {
  equals?: InputMaybe<ProfileType>;
  in?: InputMaybe<Array<ProfileType>>;
  not?: InputMaybe<NestedEnumProfileTypeFilter>;
  notIn?: InputMaybe<Array<ProfileType>>;
};

export type EnumStatusNullableListFilter = {
  equals?: InputMaybe<Array<Status>>;
  has?: InputMaybe<Status>;
  hasEvery?: InputMaybe<Array<Status>>;
  hasSome?: InputMaybe<Array<Status>>;
  isEmpty?: InputMaybe<Scalars['Boolean']>;
};

export type EnumTagTypeFieldUpdateOperationsInput = {
  set?: InputMaybe<TagType>;
};

export type EnumTagTypeFilter = {
  equals?: InputMaybe<TagType>;
  in?: InputMaybe<Array<TagType>>;
  not?: InputMaybe<NestedEnumTagTypeFilter>;
  notIn?: InputMaybe<Array<TagType>>;
};

export type EnumTypeOfDocumentFieldUpdateOperationsInput = {
  set?: InputMaybe<TypeOfDocument>;
};

export type EnumTypeOfDocumentFilter = {
  equals?: InputMaybe<TypeOfDocument>;
  in?: InputMaybe<Array<TypeOfDocument>>;
  not?: InputMaybe<NestedEnumTypeOfDocumentFilter>;
  notIn?: InputMaybe<Array<TypeOfDocument>>;
};

export type Error = {
  __typename?: 'Error';
  errorCode?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type ErrorProfiling = {
  __typename?: 'ErrorProfiling';
  errorCode?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type FloatFieldUpdateOperationsInput = {
  decrement?: InputMaybe<Scalars['Float']>;
  divide?: InputMaybe<Scalars['Float']>;
  increment?: InputMaybe<Scalars['Float']>;
  multiply?: InputMaybe<Scalars['Float']>;
  set?: InputMaybe<Scalars['Float']>;
};

export type FloatFilter = {
  equals?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<Scalars['Float']>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  not?: InputMaybe<NestedFloatFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']>>;
};

export type Geometry = {
  __typename?: 'Geometry';
  h3Index15?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  type: Scalars['String'];
};

export type GeometryCreateNestedOneWithoutLocationInput = {
  connect?: InputMaybe<GeometryWhereUniqueInput>;
  connectOrCreate?: InputMaybe<GeometryCreateOrConnectWithoutLocationInput>;
  create?: InputMaybe<GeometryCreateWithoutLocationInput>;
};

export type GeometryCreateOrConnectWithoutLocationInput = {
  create: GeometryCreateWithoutLocationInput;
  where: GeometryWhereUniqueInput;
};

export type GeometryCreateWithoutLocationInput = {
  h3Index15?: InputMaybe<Scalars['String']>;
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  type: Scalars['String'];
};

export type GeometryOrderByWithRelationInput = {
  h3Index15?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  latitude?: InputMaybe<SortOrder>;
  Location?: InputMaybe<LocationOrderByWithRelationInput>;
  longitude?: InputMaybe<SortOrder>;
  type?: InputMaybe<SortOrder>;
};

export type GeometryUpdateOneWithoutLocationInput = {
  connect?: InputMaybe<GeometryWhereUniqueInput>;
  connectOrCreate?: InputMaybe<GeometryCreateOrConnectWithoutLocationInput>;
  create?: InputMaybe<GeometryCreateWithoutLocationInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<GeometryUpdateWithoutLocationInput>;
  upsert?: InputMaybe<GeometryUpsertWithoutLocationInput>;
};

export type GeometryUpdateWithoutLocationInput = {
  h3Index15?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  latitude?: InputMaybe<FloatFieldUpdateOperationsInput>;
  longitude?: InputMaybe<FloatFieldUpdateOperationsInput>;
  type?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type GeometryUpsertWithoutLocationInput = {
  create: GeometryCreateWithoutLocationInput;
  update: GeometryUpdateWithoutLocationInput;
};

export type GeometryWhereInput = {
  AND?: InputMaybe<Array<GeometryWhereInput>>;
  h3Index15?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<IntFilter>;
  latitude?: InputMaybe<FloatFilter>;
  Location?: InputMaybe<LocationWhereInput>;
  longitude?: InputMaybe<FloatFilter>;
  NOT?: InputMaybe<Array<GeometryWhereInput>>;
  OR?: InputMaybe<Array<GeometryWhereInput>>;
  type?: InputMaybe<StringFilter>;
};

export type GeometryWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
};

export type GooglePlaceAutocompleteInput = {
  /** supported languages: https://developers.google.com/maps/faq#languagesupport */
  language?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  latitude?: InputMaybe<Scalars['Float']>;
  longitude?: InputMaybe<Scalars['Float']>;
  /** offset The position, in the input term, of the last character that the service uses to match predictions. For example, if the input is Google and the offset is 3, the service will match on Goo. The string determined by the offset is matched against the first word in the input term only. For example, if the input term is Google abc and the offset is 3, the service will attempt to match against Goo abc. If no offset is supplied, the service will use the whole term. The offset should generally be set to the position of the text caret. */
  offset?: InputMaybe<Scalars['Int']>;
  /** Defines the distance (in meters) within which to return place results. You may bias results to a specified circle by passing a location and a radius parameter. Autocomplete: 50,000 meters */
  radius?: InputMaybe<Scalars['Int']>;
  /**  ISO 3166-1 */
  region?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /**
   * A random string which identifies an autocomplete.
   *        This value also is returned and should be passed back through this input.
   *        Default value provided.
   */
  sessiontoken?: InputMaybe<Scalars['String']>;
  textinput: Scalars['String'];
  /**
   * For the value of the types parameter you can specify either:
   *
   *       Up to five values from Table 1 or Table 2. For multiple values, separate each value with a | (vertical bar). For example:
   *
   *       types=book_store|cafe
   *
   *       Any supported filter in Table 3. You can safely mix the geocode and establishment types. You cannot mix type collections (address, (cities) or (regions)) with any other type, or an error occurs.
   *       supported types: https://developers.google.com/maps/documentation/places/web-service/supported_types
   */
  types?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type GooglePlaceAutocompleteReturn = {
  __typename?: 'GooglePlaceAutocompleteReturn';
  data?: Maybe<Scalars['Json']>;
  sessiontoken: Scalars['String'];
};

export type GroupCreateNestedManyWithoutProfileInput = {
  connect?: InputMaybe<Array<GroupWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<GroupCreateOrConnectWithoutProfileInput>>;
  create?: InputMaybe<Array<GroupCreateWithoutProfileInput>>;
};

export type GroupCreateNestedOneWithoutPhotosInput = {
  connect?: InputMaybe<GroupWhereUniqueInput>;
  connectOrCreate?: InputMaybe<GroupCreateOrConnectWithoutPhotosInput>;
  create?: InputMaybe<GroupCreateWithoutPhotosInput>;
};

export type GroupCreateOrConnectWithoutPhotosInput = {
  create: GroupCreateWithoutPhotosInput;
  where: GroupWhereUniqueInput;
};

export type GroupCreateOrConnectWithoutProfileInput = {
  create: GroupCreateWithoutProfileInput;
  where: GroupWhereUniqueInput;
};

export type GroupCreateWithoutPhotosInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  Profile?: InputMaybe<ProfileCreateNestedManyWithoutGroupInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type GroupCreateWithoutProfileInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  photos?: InputMaybe<PhotoCreateNestedManyWithoutGroupInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type GroupListRelationFilter = {
  every?: InputMaybe<GroupWhereInput>;
  none?: InputMaybe<GroupWhereInput>;
  some?: InputMaybe<GroupWhereInput>;
};

export type GroupOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type GroupScalarWhereInput = {
  AND?: InputMaybe<Array<GroupScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<GroupScalarWhereInput>>;
  OR?: InputMaybe<Array<GroupScalarWhereInput>>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type GroupUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type GroupUpdateManyWithoutProfileInput = {
  connect?: InputMaybe<Array<GroupWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<GroupCreateOrConnectWithoutProfileInput>>;
  create?: InputMaybe<Array<GroupCreateWithoutProfileInput>>;
  delete?: InputMaybe<Array<GroupWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<GroupScalarWhereInput>>;
  disconnect?: InputMaybe<Array<GroupWhereUniqueInput>>;
  set?: InputMaybe<Array<GroupWhereUniqueInput>>;
  update?: InputMaybe<Array<GroupUpdateWithWhereUniqueWithoutProfileInput>>;
  updateMany?: InputMaybe<Array<GroupUpdateManyWithWhereWithoutProfileInput>>;
  upsert?: InputMaybe<Array<GroupUpsertWithWhereUniqueWithoutProfileInput>>;
};

export type GroupUpdateManyWithWhereWithoutProfileInput = {
  data: GroupUpdateManyMutationInput;
  where: GroupScalarWhereInput;
};

export type GroupUpdateOneWithoutPhotosInput = {
  connect?: InputMaybe<GroupWhereUniqueInput>;
  connectOrCreate?: InputMaybe<GroupCreateOrConnectWithoutPhotosInput>;
  create?: InputMaybe<GroupCreateWithoutPhotosInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<GroupUpdateWithoutPhotosInput>;
  upsert?: InputMaybe<GroupUpsertWithoutPhotosInput>;
};

export type GroupUpdateWithoutPhotosInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  Profile?: InputMaybe<ProfileUpdateManyWithoutGroupInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type GroupUpdateWithoutProfileInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  photos?: InputMaybe<PhotoUpdateManyWithoutGroupInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type GroupUpdateWithWhereUniqueWithoutProfileInput = {
  data: GroupUpdateWithoutProfileInput;
  where: GroupWhereUniqueInput;
};

export type GroupUpsertWithoutPhotosInput = {
  create: GroupCreateWithoutPhotosInput;
  update: GroupUpdateWithoutPhotosInput;
};

export type GroupUpsertWithWhereUniqueWithoutProfileInput = {
  create: GroupCreateWithoutProfileInput;
  update: GroupUpdateWithoutProfileInput;
  where: GroupWhereUniqueInput;
};

export type GroupWhereInput = {
  AND?: InputMaybe<Array<GroupWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<GroupWhereInput>>;
  OR?: InputMaybe<Array<GroupWhereInput>>;
  photos?: InputMaybe<PhotoListRelationFilter>;
  Profile?: InputMaybe<ProfileListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type GroupWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type IdentifiableInformation = {
  __typename?: 'IdentifiableInformation';
  birthday?: Maybe<Scalars['DateTime']>;
  currenttown?: Maybe<Scalars['String']>;
  firstname?: Maybe<Scalars['String']>;
  fullname?: Maybe<Scalars['String']>;
  gender?: Maybe<Scalars['String']>;
  hometown?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  lastname?: Maybe<Scalars['String']>;
  lookfor?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};

export type IdentifiableInformationCreateNestedOneWithoutProfileInput = {
  connect?: InputMaybe<IdentifiableInformationWhereUniqueInput>;
  connectOrCreate?: InputMaybe<IdentifiableInformationCreateOrConnectWithoutProfileInput>;
  create?: InputMaybe<IdentifiableInformationCreateWithoutProfileInput>;
};

export type IdentifiableInformationCreateOrConnectWithoutProfileInput = {
  create: IdentifiableInformationCreateWithoutProfileInput;
  where: IdentifiableInformationWhereUniqueInput;
};

export type IdentifiableInformationCreateWithoutProfileInput = {
  birthday?: InputMaybe<Scalars['DateTime']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  currenttown?: InputMaybe<Scalars['String']>;
  firstname?: InputMaybe<Scalars['String']>;
  fullname?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Scalars['String']>;
  hometown?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  lastname?: InputMaybe<Scalars['String']>;
  lookfor?: InputMaybe<Scalars['String']>;
  nickname?: InputMaybe<Scalars['String']>;
  storageId?: InputMaybe<Scalars['String']>;
  surname?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  username: Scalars['String'];
};

export type IdentifiableInformationOrderByWithRelationInput = {
  birthday?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  currenttown?: InputMaybe<SortOrder>;
  firstname?: InputMaybe<SortOrder>;
  fullname?: InputMaybe<SortOrder>;
  gender?: InputMaybe<SortOrder>;
  hometown?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  lastname?: InputMaybe<SortOrder>;
  lookfor?: InputMaybe<SortOrder>;
  nickname?: InputMaybe<SortOrder>;
  Profile?: InputMaybe<ProfileOrderByWithRelationInput>;
  profileId?: InputMaybe<SortOrder>;
  storageId?: InputMaybe<SortOrder>;
  surname?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  username?: InputMaybe<SortOrder>;
};

export type IdentifiableInformationUpdateOneWithoutProfileInput = {
  connect?: InputMaybe<IdentifiableInformationWhereUniqueInput>;
  connectOrCreate?: InputMaybe<IdentifiableInformationCreateOrConnectWithoutProfileInput>;
  create?: InputMaybe<IdentifiableInformationCreateWithoutProfileInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<IdentifiableInformationUpdateWithoutProfileInput>;
  upsert?: InputMaybe<IdentifiableInformationUpsertWithoutProfileInput>;
};

export type IdentifiableInformationUpdateWithoutProfileInput = {
  birthday?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  currenttown?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  firstname?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  fullname?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  gender?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  hometown?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  lastname?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  lookfor?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  nickname?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  storageId?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  surname?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  username?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type IdentifiableInformationUpsertWithoutProfileInput = {
  create: IdentifiableInformationCreateWithoutProfileInput;
  update: IdentifiableInformationUpdateWithoutProfileInput;
};

export type IdentifiableInformationWhereInput = {
  AND?: InputMaybe<Array<IdentifiableInformationWhereInput>>;
  birthday?: InputMaybe<DateTimeNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  currenttown?: InputMaybe<StringNullableFilter>;
  firstname?: InputMaybe<StringNullableFilter>;
  fullname?: InputMaybe<StringNullableFilter>;
  gender?: InputMaybe<StringNullableFilter>;
  hometown?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  lastname?: InputMaybe<StringNullableFilter>;
  lookfor?: InputMaybe<StringNullableFilter>;
  nickname?: InputMaybe<StringNullableFilter>;
  NOT?: InputMaybe<Array<IdentifiableInformationWhereInput>>;
  OR?: InputMaybe<Array<IdentifiableInformationWhereInput>>;
  Profile?: InputMaybe<ProfileWhereInput>;
  profileId?: InputMaybe<StringFilter>;
  storageId?: InputMaybe<StringNullableFilter>;
  surname?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  username?: InputMaybe<StringFilter>;
};

export type IdentifiableInformationWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  profileId?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type IntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type JoinedOut = {
  __typename?: 'JoinedOut';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  liveOutPersonalId?: Maybe<Scalars['String']>;
  LiveOutVenue?: Maybe<LiveOutVenue>;
  liveOutVenueId?: Maybe<Scalars['String']>;
  personalProfileId?: Maybe<Scalars['String']>;
  PersonalStats?: Maybe<PersonalStats>;
  updatedAt: Scalars['DateTime'];
  venueProfileId: Scalars['String'];
  VenueStats?: Maybe<VenueStats>;
  venueStatsId?: Maybe<Scalars['String']>;
};

export type JoinedOutCreateManyLiveOutPersonalInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  leftAt?: InputMaybe<Scalars['DateTime']>;
  liveOutVenueId?: InputMaybe<Scalars['String']>;
  personalProfileId?: InputMaybe<Scalars['String']>;
  personalStatsId?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  venueProfileId: Scalars['String'];
  venueStatsId?: InputMaybe<Scalars['String']>;
};

export type JoinedOutCreateManyLiveOutPersonalInputEnvelope = {
  data?: InputMaybe<Array<JoinedOutCreateManyLiveOutPersonalInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type JoinedOutCreateManyLiveOutVenueInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  leftAt?: InputMaybe<Scalars['DateTime']>;
  liveOutPersonalId?: InputMaybe<Scalars['String']>;
  personalProfileId?: InputMaybe<Scalars['String']>;
  personalStatsId?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  venueProfileId: Scalars['String'];
  venueStatsId?: InputMaybe<Scalars['String']>;
};

export type JoinedOutCreateManyLiveOutVenueInputEnvelope = {
  data?: InputMaybe<Array<JoinedOutCreateManyLiveOutVenueInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type JoinedOutCreateManyPersonalStatsInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  leftAt?: InputMaybe<Scalars['DateTime']>;
  liveOutPersonalId?: InputMaybe<Scalars['String']>;
  liveOutVenueId?: InputMaybe<Scalars['String']>;
  personalProfileId?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  venueProfileId: Scalars['String'];
  venueStatsId?: InputMaybe<Scalars['String']>;
};

export type JoinedOutCreateManyPersonalStatsInputEnvelope = {
  data?: InputMaybe<Array<JoinedOutCreateManyPersonalStatsInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type JoinedOutCreateManyVenueStatsInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  leftAt?: InputMaybe<Scalars['DateTime']>;
  liveOutPersonalId?: InputMaybe<Scalars['String']>;
  liveOutVenueId?: InputMaybe<Scalars['String']>;
  personalProfileId?: InputMaybe<Scalars['String']>;
  personalStatsId?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  venueProfileId: Scalars['String'];
};

export type JoinedOutCreateManyVenueStatsInputEnvelope = {
  data?: InputMaybe<Array<JoinedOutCreateManyVenueStatsInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type JoinedOutCreateNestedManyWithoutLiveOutPersonalInput = {
  connect?: InputMaybe<Array<JoinedOutWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<JoinedOutCreateOrConnectWithoutLiveOutPersonalInput>>;
  create?: InputMaybe<Array<JoinedOutCreateWithoutLiveOutPersonalInput>>;
  createMany?: InputMaybe<JoinedOutCreateManyLiveOutPersonalInputEnvelope>;
};

export type JoinedOutCreateNestedManyWithoutLiveOutVenueInput = {
  connect?: InputMaybe<Array<JoinedOutWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<JoinedOutCreateOrConnectWithoutLiveOutVenueInput>>;
  create?: InputMaybe<Array<JoinedOutCreateWithoutLiveOutVenueInput>>;
  createMany?: InputMaybe<JoinedOutCreateManyLiveOutVenueInputEnvelope>;
};

export type JoinedOutCreateNestedManyWithoutPersonalStatsInput = {
  connect?: InputMaybe<Array<JoinedOutWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<JoinedOutCreateOrConnectWithoutPersonalStatsInput>>;
  create?: InputMaybe<Array<JoinedOutCreateWithoutPersonalStatsInput>>;
  createMany?: InputMaybe<JoinedOutCreateManyPersonalStatsInputEnvelope>;
};

export type JoinedOutCreateNestedManyWithoutVenueStatsInput = {
  connect?: InputMaybe<Array<JoinedOutWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<JoinedOutCreateOrConnectWithoutVenueStatsInput>>;
  create?: InputMaybe<Array<JoinedOutCreateWithoutVenueStatsInput>>;
  createMany?: InputMaybe<JoinedOutCreateManyVenueStatsInputEnvelope>;
};

export type JoinedOutCreateOrConnectWithoutLiveOutPersonalInput = {
  create: JoinedOutCreateWithoutLiveOutPersonalInput;
  where: JoinedOutWhereUniqueInput;
};

export type JoinedOutCreateOrConnectWithoutLiveOutVenueInput = {
  create: JoinedOutCreateWithoutLiveOutVenueInput;
  where: JoinedOutWhereUniqueInput;
};

export type JoinedOutCreateOrConnectWithoutPersonalStatsInput = {
  create: JoinedOutCreateWithoutPersonalStatsInput;
  where: JoinedOutWhereUniqueInput;
};

export type JoinedOutCreateOrConnectWithoutVenueStatsInput = {
  create: JoinedOutCreateWithoutVenueStatsInput;
  where: JoinedOutWhereUniqueInput;
};

export type JoinedOutCreateWithoutLiveOutPersonalInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  leftAt?: InputMaybe<Scalars['DateTime']>;
  LiveOutVenue?: InputMaybe<LiveOutVenueCreateNestedOneWithoutJoinedInput>;
  personalProfileId?: InputMaybe<Scalars['String']>;
  PersonalStats?: InputMaybe<PersonalStatsCreateNestedOneWithoutJoinedVenueHistoryInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  venueProfileId: Scalars['String'];
  VenueStats?: InputMaybe<VenueStatsCreateNestedOneWithoutJoinedVenueHistoryInput>;
};

export type JoinedOutCreateWithoutLiveOutVenueInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  leftAt?: InputMaybe<Scalars['DateTime']>;
  LiveOutPersonal?: InputMaybe<LiveOutPersonalCreateNestedOneWithoutJoinedInput>;
  personalProfileId?: InputMaybe<Scalars['String']>;
  PersonalStats?: InputMaybe<PersonalStatsCreateNestedOneWithoutJoinedVenueHistoryInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  venueProfileId: Scalars['String'];
  VenueStats?: InputMaybe<VenueStatsCreateNestedOneWithoutJoinedVenueHistoryInput>;
};

export type JoinedOutCreateWithoutPersonalStatsInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  leftAt?: InputMaybe<Scalars['DateTime']>;
  LiveOutPersonal?: InputMaybe<LiveOutPersonalCreateNestedOneWithoutJoinedInput>;
  LiveOutVenue?: InputMaybe<LiveOutVenueCreateNestedOneWithoutJoinedInput>;
  personalProfileId?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  venueProfileId: Scalars['String'];
  VenueStats?: InputMaybe<VenueStatsCreateNestedOneWithoutJoinedVenueHistoryInput>;
};

export type JoinedOutCreateWithoutVenueStatsInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  leftAt?: InputMaybe<Scalars['DateTime']>;
  LiveOutPersonal?: InputMaybe<LiveOutPersonalCreateNestedOneWithoutJoinedInput>;
  LiveOutVenue?: InputMaybe<LiveOutVenueCreateNestedOneWithoutJoinedInput>;
  personalProfileId?: InputMaybe<Scalars['String']>;
  PersonalStats?: InputMaybe<PersonalStatsCreateNestedOneWithoutJoinedVenueHistoryInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  venueProfileId: Scalars['String'];
};

export type JoinedOutListRelationFilter = {
  every?: InputMaybe<JoinedOutWhereInput>;
  none?: InputMaybe<JoinedOutWhereInput>;
  some?: InputMaybe<JoinedOutWhereInput>;
};

export type JoinedOutOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type JoinedOutScalarWhereInput = {
  AND?: InputMaybe<Array<JoinedOutScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  leftAt?: InputMaybe<DateTimeNullableFilter>;
  liveOutPersonalId?: InputMaybe<StringNullableFilter>;
  liveOutVenueId?: InputMaybe<StringNullableFilter>;
  NOT?: InputMaybe<Array<JoinedOutScalarWhereInput>>;
  OR?: InputMaybe<Array<JoinedOutScalarWhereInput>>;
  personalProfileId?: InputMaybe<StringNullableFilter>;
  personalStatsId?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  venueProfileId?: InputMaybe<StringFilter>;
  venueStatsId?: InputMaybe<StringNullableFilter>;
};

export type JoinedOutUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  leftAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  personalProfileId?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  venueProfileId?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type JoinedOutUpdateManyWithoutLiveOutPersonalInput = {
  connect?: InputMaybe<Array<JoinedOutWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<JoinedOutCreateOrConnectWithoutLiveOutPersonalInput>>;
  create?: InputMaybe<Array<JoinedOutCreateWithoutLiveOutPersonalInput>>;
  createMany?: InputMaybe<JoinedOutCreateManyLiveOutPersonalInputEnvelope>;
  delete?: InputMaybe<Array<JoinedOutWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<JoinedOutScalarWhereInput>>;
  disconnect?: InputMaybe<Array<JoinedOutWhereUniqueInput>>;
  set?: InputMaybe<Array<JoinedOutWhereUniqueInput>>;
  update?: InputMaybe<Array<JoinedOutUpdateWithWhereUniqueWithoutLiveOutPersonalInput>>;
  updateMany?: InputMaybe<Array<JoinedOutUpdateManyWithWhereWithoutLiveOutPersonalInput>>;
  upsert?: InputMaybe<Array<JoinedOutUpsertWithWhereUniqueWithoutLiveOutPersonalInput>>;
};

export type JoinedOutUpdateManyWithoutLiveOutVenueInput = {
  connect?: InputMaybe<Array<JoinedOutWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<JoinedOutCreateOrConnectWithoutLiveOutVenueInput>>;
  create?: InputMaybe<Array<JoinedOutCreateWithoutLiveOutVenueInput>>;
  createMany?: InputMaybe<JoinedOutCreateManyLiveOutVenueInputEnvelope>;
  delete?: InputMaybe<Array<JoinedOutWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<JoinedOutScalarWhereInput>>;
  disconnect?: InputMaybe<Array<JoinedOutWhereUniqueInput>>;
  set?: InputMaybe<Array<JoinedOutWhereUniqueInput>>;
  update?: InputMaybe<Array<JoinedOutUpdateWithWhereUniqueWithoutLiveOutVenueInput>>;
  updateMany?: InputMaybe<Array<JoinedOutUpdateManyWithWhereWithoutLiveOutVenueInput>>;
  upsert?: InputMaybe<Array<JoinedOutUpsertWithWhereUniqueWithoutLiveOutVenueInput>>;
};

export type JoinedOutUpdateManyWithoutPersonalStatsInput = {
  connect?: InputMaybe<Array<JoinedOutWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<JoinedOutCreateOrConnectWithoutPersonalStatsInput>>;
  create?: InputMaybe<Array<JoinedOutCreateWithoutPersonalStatsInput>>;
  createMany?: InputMaybe<JoinedOutCreateManyPersonalStatsInputEnvelope>;
  delete?: InputMaybe<Array<JoinedOutWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<JoinedOutScalarWhereInput>>;
  disconnect?: InputMaybe<Array<JoinedOutWhereUniqueInput>>;
  set?: InputMaybe<Array<JoinedOutWhereUniqueInput>>;
  update?: InputMaybe<Array<JoinedOutUpdateWithWhereUniqueWithoutPersonalStatsInput>>;
  updateMany?: InputMaybe<Array<JoinedOutUpdateManyWithWhereWithoutPersonalStatsInput>>;
  upsert?: InputMaybe<Array<JoinedOutUpsertWithWhereUniqueWithoutPersonalStatsInput>>;
};

export type JoinedOutUpdateManyWithoutVenueStatsInput = {
  connect?: InputMaybe<Array<JoinedOutWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<JoinedOutCreateOrConnectWithoutVenueStatsInput>>;
  create?: InputMaybe<Array<JoinedOutCreateWithoutVenueStatsInput>>;
  createMany?: InputMaybe<JoinedOutCreateManyVenueStatsInputEnvelope>;
  delete?: InputMaybe<Array<JoinedOutWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<JoinedOutScalarWhereInput>>;
  disconnect?: InputMaybe<Array<JoinedOutWhereUniqueInput>>;
  set?: InputMaybe<Array<JoinedOutWhereUniqueInput>>;
  update?: InputMaybe<Array<JoinedOutUpdateWithWhereUniqueWithoutVenueStatsInput>>;
  updateMany?: InputMaybe<Array<JoinedOutUpdateManyWithWhereWithoutVenueStatsInput>>;
  upsert?: InputMaybe<Array<JoinedOutUpsertWithWhereUniqueWithoutVenueStatsInput>>;
};

export type JoinedOutUpdateManyWithWhereWithoutLiveOutPersonalInput = {
  data: JoinedOutUpdateManyMutationInput;
  where: JoinedOutScalarWhereInput;
};

export type JoinedOutUpdateManyWithWhereWithoutLiveOutVenueInput = {
  data: JoinedOutUpdateManyMutationInput;
  where: JoinedOutScalarWhereInput;
};

export type JoinedOutUpdateManyWithWhereWithoutPersonalStatsInput = {
  data: JoinedOutUpdateManyMutationInput;
  where: JoinedOutScalarWhereInput;
};

export type JoinedOutUpdateManyWithWhereWithoutVenueStatsInput = {
  data: JoinedOutUpdateManyMutationInput;
  where: JoinedOutScalarWhereInput;
};

export type JoinedOutUpdateWithoutLiveOutPersonalInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  leftAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  LiveOutVenue?: InputMaybe<LiveOutVenueUpdateOneWithoutJoinedInput>;
  personalProfileId?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  PersonalStats?: InputMaybe<PersonalStatsUpdateOneWithoutJoinedVenueHistoryInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  venueProfileId?: InputMaybe<StringFieldUpdateOperationsInput>;
  VenueStats?: InputMaybe<VenueStatsUpdateOneWithoutJoinedVenueHistoryInput>;
};

export type JoinedOutUpdateWithoutLiveOutVenueInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  leftAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  LiveOutPersonal?: InputMaybe<LiveOutPersonalUpdateOneWithoutJoinedInput>;
  personalProfileId?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  PersonalStats?: InputMaybe<PersonalStatsUpdateOneWithoutJoinedVenueHistoryInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  venueProfileId?: InputMaybe<StringFieldUpdateOperationsInput>;
  VenueStats?: InputMaybe<VenueStatsUpdateOneWithoutJoinedVenueHistoryInput>;
};

export type JoinedOutUpdateWithoutPersonalStatsInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  leftAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  LiveOutPersonal?: InputMaybe<LiveOutPersonalUpdateOneWithoutJoinedInput>;
  LiveOutVenue?: InputMaybe<LiveOutVenueUpdateOneWithoutJoinedInput>;
  personalProfileId?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  venueProfileId?: InputMaybe<StringFieldUpdateOperationsInput>;
  VenueStats?: InputMaybe<VenueStatsUpdateOneWithoutJoinedVenueHistoryInput>;
};

export type JoinedOutUpdateWithoutVenueStatsInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  leftAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  LiveOutPersonal?: InputMaybe<LiveOutPersonalUpdateOneWithoutJoinedInput>;
  LiveOutVenue?: InputMaybe<LiveOutVenueUpdateOneWithoutJoinedInput>;
  personalProfileId?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  PersonalStats?: InputMaybe<PersonalStatsUpdateOneWithoutJoinedVenueHistoryInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  venueProfileId?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type JoinedOutUpdateWithWhereUniqueWithoutLiveOutPersonalInput = {
  data: JoinedOutUpdateWithoutLiveOutPersonalInput;
  where: JoinedOutWhereUniqueInput;
};

export type JoinedOutUpdateWithWhereUniqueWithoutLiveOutVenueInput = {
  data: JoinedOutUpdateWithoutLiveOutVenueInput;
  where: JoinedOutWhereUniqueInput;
};

export type JoinedOutUpdateWithWhereUniqueWithoutPersonalStatsInput = {
  data: JoinedOutUpdateWithoutPersonalStatsInput;
  where: JoinedOutWhereUniqueInput;
};

export type JoinedOutUpdateWithWhereUniqueWithoutVenueStatsInput = {
  data: JoinedOutUpdateWithoutVenueStatsInput;
  where: JoinedOutWhereUniqueInput;
};

export type JoinedOutUpsertWithWhereUniqueWithoutLiveOutPersonalInput = {
  create: JoinedOutCreateWithoutLiveOutPersonalInput;
  update: JoinedOutUpdateWithoutLiveOutPersonalInput;
  where: JoinedOutWhereUniqueInput;
};

export type JoinedOutUpsertWithWhereUniqueWithoutLiveOutVenueInput = {
  create: JoinedOutCreateWithoutLiveOutVenueInput;
  update: JoinedOutUpdateWithoutLiveOutVenueInput;
  where: JoinedOutWhereUniqueInput;
};

export type JoinedOutUpsertWithWhereUniqueWithoutPersonalStatsInput = {
  create: JoinedOutCreateWithoutPersonalStatsInput;
  update: JoinedOutUpdateWithoutPersonalStatsInput;
  where: JoinedOutWhereUniqueInput;
};

export type JoinedOutUpsertWithWhereUniqueWithoutVenueStatsInput = {
  create: JoinedOutCreateWithoutVenueStatsInput;
  update: JoinedOutUpdateWithoutVenueStatsInput;
  where: JoinedOutWhereUniqueInput;
};

export type JoinedOutWhereInput = {
  AND?: InputMaybe<Array<JoinedOutWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  leftAt?: InputMaybe<DateTimeNullableFilter>;
  LiveOutPersonal?: InputMaybe<LiveOutPersonalWhereInput>;
  liveOutPersonalId?: InputMaybe<StringNullableFilter>;
  LiveOutVenue?: InputMaybe<LiveOutVenueWhereInput>;
  liveOutVenueId?: InputMaybe<StringNullableFilter>;
  NOT?: InputMaybe<Array<JoinedOutWhereInput>>;
  OR?: InputMaybe<Array<JoinedOutWhereInput>>;
  personalProfileId?: InputMaybe<StringNullableFilter>;
  PersonalStats?: InputMaybe<PersonalStatsWhereInput>;
  personalStatsId?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  venueProfileId?: InputMaybe<StringFilter>;
  VenueStats?: InputMaybe<VenueStatsWhereInput>;
  venueStatsId?: InputMaybe<StringNullableFilter>;
};

export type JoinedOutWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type JsonNullableListFilter = {
  equals?: InputMaybe<Array<Scalars['Json']>>;
  has?: InputMaybe<Scalars['Json']>;
  hasEvery?: InputMaybe<Array<Scalars['Json']>>;
  hasSome?: InputMaybe<Array<Scalars['Json']>>;
  isEmpty?: InputMaybe<Scalars['Boolean']>;
};

export type LegalAgreement = {
  __typename?: 'LegalAgreement';
  aggreed: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type LegalAgreementCreateManyCredentialsInput = {
  aggreed?: InputMaybe<Scalars['Boolean']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  documentId: Scalars['Int'];
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type LegalAgreementCreateManyCredentialsInputEnvelope = {
  data?: InputMaybe<Array<LegalAgreementCreateManyCredentialsInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type LegalAgreementCreateNestedManyWithoutCredentialsInput = {
  connect?: InputMaybe<Array<LegalAgreementWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<LegalAgreementCreateOrConnectWithoutCredentialsInput>>;
  create?: InputMaybe<Array<LegalAgreementCreateWithoutCredentialsInput>>;
  createMany?: InputMaybe<LegalAgreementCreateManyCredentialsInputEnvelope>;
};

export type LegalAgreementCreateOrConnectWithoutCredentialsInput = {
  create: LegalAgreementCreateWithoutCredentialsInput;
  where: LegalAgreementWhereUniqueInput;
};

export type LegalAgreementCreateWithoutCredentialsInput = {
  aggreed?: InputMaybe<Scalars['Boolean']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  Document: DocumentCreateNestedOneWithoutLegalAgreementInput;
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type LegalAgreementListRelationFilter = {
  every?: InputMaybe<LegalAgreementWhereInput>;
  none?: InputMaybe<LegalAgreementWhereInput>;
  some?: InputMaybe<LegalAgreementWhereInput>;
};

export type LegalAgreementOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type LegalAgreementScalarWhereInput = {
  aggreed?: InputMaybe<BoolFilter>;
  AND?: InputMaybe<Array<LegalAgreementScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  credentialsId?: InputMaybe<StringNullableFilter>;
  documentId?: InputMaybe<IntFilter>;
  id?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<LegalAgreementScalarWhereInput>>;
  OR?: InputMaybe<Array<LegalAgreementScalarWhereInput>>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type LegalAgreementUpdateManyMutationInput = {
  aggreed?: InputMaybe<BoolFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type LegalAgreementUpdateManyWithoutCredentialsInput = {
  connect?: InputMaybe<Array<LegalAgreementWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<LegalAgreementCreateOrConnectWithoutCredentialsInput>>;
  create?: InputMaybe<Array<LegalAgreementCreateWithoutCredentialsInput>>;
  createMany?: InputMaybe<LegalAgreementCreateManyCredentialsInputEnvelope>;
  delete?: InputMaybe<Array<LegalAgreementWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<LegalAgreementScalarWhereInput>>;
  disconnect?: InputMaybe<Array<LegalAgreementWhereUniqueInput>>;
  set?: InputMaybe<Array<LegalAgreementWhereUniqueInput>>;
  update?: InputMaybe<Array<LegalAgreementUpdateWithWhereUniqueWithoutCredentialsInput>>;
  updateMany?: InputMaybe<Array<LegalAgreementUpdateManyWithWhereWithoutCredentialsInput>>;
  upsert?: InputMaybe<Array<LegalAgreementUpsertWithWhereUniqueWithoutCredentialsInput>>;
};

export type LegalAgreementUpdateManyWithWhereWithoutCredentialsInput = {
  data: LegalAgreementUpdateManyMutationInput;
  where: LegalAgreementScalarWhereInput;
};

export type LegalAgreementUpdateWithoutCredentialsInput = {
  aggreed?: InputMaybe<BoolFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Document?: InputMaybe<DocumentUpdateOneRequiredWithoutLegalAgreementInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type LegalAgreementUpdateWithWhereUniqueWithoutCredentialsInput = {
  data: LegalAgreementUpdateWithoutCredentialsInput;
  where: LegalAgreementWhereUniqueInput;
};

export type LegalAgreementUpsertWithWhereUniqueWithoutCredentialsInput = {
  create: LegalAgreementCreateWithoutCredentialsInput;
  update: LegalAgreementUpdateWithoutCredentialsInput;
  where: LegalAgreementWhereUniqueInput;
};

export type LegalAgreementWhereInput = {
  aggreed?: InputMaybe<BoolFilter>;
  AND?: InputMaybe<Array<LegalAgreementWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  Credentials?: InputMaybe<CredentialsWhereInput>;
  credentialsId?: InputMaybe<StringNullableFilter>;
  Document?: InputMaybe<DocumentWhereInput>;
  documentId?: InputMaybe<IntFilter>;
  id?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<LegalAgreementWhereInput>>;
  OR?: InputMaybe<Array<LegalAgreementWhereInput>>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type LegalAgreementWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type LiveOutPersonal = {
  __typename?: 'LiveOutPersonal';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  joined: Array<JoinedOut>;
  Personal: Personal;
  totaled: Array<TotaledOut>;
  updatedAt: Scalars['DateTime'];
};


export type LiveOutPersonalJoinedArgs = {
  after?: InputMaybe<JoinedOutWhereUniqueInput>;
  before?: InputMaybe<JoinedOutWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type LiveOutPersonalTotaledArgs = {
  after?: InputMaybe<TotaledOutWhereUniqueInput>;
  before?: InputMaybe<TotaledOutWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type LiveOutPersonalCreateNestedOneWithoutJoinedInput = {
  connect?: InputMaybe<LiveOutPersonalWhereUniqueInput>;
  connectOrCreate?: InputMaybe<LiveOutPersonalCreateOrConnectWithoutJoinedInput>;
  create?: InputMaybe<LiveOutPersonalCreateWithoutJoinedInput>;
};

export type LiveOutPersonalCreateNestedOneWithoutPersonalInput = {
  connect?: InputMaybe<LiveOutPersonalWhereUniqueInput>;
  connectOrCreate?: InputMaybe<LiveOutPersonalCreateOrConnectWithoutPersonalInput>;
  create?: InputMaybe<LiveOutPersonalCreateWithoutPersonalInput>;
};

export type LiveOutPersonalCreateNestedOneWithoutTotaledInput = {
  connect?: InputMaybe<LiveOutPersonalWhereUniqueInput>;
  connectOrCreate?: InputMaybe<LiveOutPersonalCreateOrConnectWithoutTotaledInput>;
  create?: InputMaybe<LiveOutPersonalCreateWithoutTotaledInput>;
};

export type LiveOutPersonalCreateOrConnectWithoutJoinedInput = {
  create: LiveOutPersonalCreateWithoutJoinedInput;
  where: LiveOutPersonalWhereUniqueInput;
};

export type LiveOutPersonalCreateOrConnectWithoutPersonalInput = {
  create: LiveOutPersonalCreateWithoutPersonalInput;
  where: LiveOutPersonalWhereUniqueInput;
};

export type LiveOutPersonalCreateOrConnectWithoutTotaledInput = {
  create: LiveOutPersonalCreateWithoutTotaledInput;
  where: LiveOutPersonalWhereUniqueInput;
};

export type LiveOutPersonalCreateWithoutJoinedInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  Personal: PersonalCreateNestedOneWithoutLiveOutPersonalInput;
  totaled?: InputMaybe<TotaledOutCreateNestedManyWithoutLiveOutPersonalInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type LiveOutPersonalCreateWithoutPersonalInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  joined?: InputMaybe<JoinedOutCreateNestedManyWithoutLiveOutPersonalInput>;
  totaled?: InputMaybe<TotaledOutCreateNestedManyWithoutLiveOutPersonalInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type LiveOutPersonalCreateWithoutTotaledInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  joined?: InputMaybe<JoinedOutCreateNestedManyWithoutLiveOutPersonalInput>;
  Personal: PersonalCreateNestedOneWithoutLiveOutPersonalInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type LiveOutPersonalOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  joined?: InputMaybe<JoinedOutOrderByRelationAggregateInput>;
  Personal?: InputMaybe<PersonalOrderByWithRelationInput>;
  personalId?: InputMaybe<SortOrder>;
  totaled?: InputMaybe<TotaledOutOrderByRelationAggregateInput>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type LiveOutPersonalUpdateOneWithoutJoinedInput = {
  connect?: InputMaybe<LiveOutPersonalWhereUniqueInput>;
  connectOrCreate?: InputMaybe<LiveOutPersonalCreateOrConnectWithoutJoinedInput>;
  create?: InputMaybe<LiveOutPersonalCreateWithoutJoinedInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<LiveOutPersonalUpdateWithoutJoinedInput>;
  upsert?: InputMaybe<LiveOutPersonalUpsertWithoutJoinedInput>;
};

export type LiveOutPersonalUpdateOneWithoutPersonalInput = {
  connect?: InputMaybe<LiveOutPersonalWhereUniqueInput>;
  connectOrCreate?: InputMaybe<LiveOutPersonalCreateOrConnectWithoutPersonalInput>;
  create?: InputMaybe<LiveOutPersonalCreateWithoutPersonalInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<LiveOutPersonalUpdateWithoutPersonalInput>;
  upsert?: InputMaybe<LiveOutPersonalUpsertWithoutPersonalInput>;
};

export type LiveOutPersonalUpdateOneWithoutTotaledInput = {
  connect?: InputMaybe<LiveOutPersonalWhereUniqueInput>;
  connectOrCreate?: InputMaybe<LiveOutPersonalCreateOrConnectWithoutTotaledInput>;
  create?: InputMaybe<LiveOutPersonalCreateWithoutTotaledInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<LiveOutPersonalUpdateWithoutTotaledInput>;
  upsert?: InputMaybe<LiveOutPersonalUpsertWithoutTotaledInput>;
};

export type LiveOutPersonalUpdateWithoutJoinedInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  Personal?: InputMaybe<PersonalUpdateOneRequiredWithoutLiveOutPersonalInput>;
  totaled?: InputMaybe<TotaledOutUpdateManyWithoutLiveOutPersonalInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type LiveOutPersonalUpdateWithoutPersonalInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  joined?: InputMaybe<JoinedOutUpdateManyWithoutLiveOutPersonalInput>;
  totaled?: InputMaybe<TotaledOutUpdateManyWithoutLiveOutPersonalInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type LiveOutPersonalUpdateWithoutTotaledInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  joined?: InputMaybe<JoinedOutUpdateManyWithoutLiveOutPersonalInput>;
  Personal?: InputMaybe<PersonalUpdateOneRequiredWithoutLiveOutPersonalInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type LiveOutPersonalUpsertWithoutJoinedInput = {
  create: LiveOutPersonalCreateWithoutJoinedInput;
  update: LiveOutPersonalUpdateWithoutJoinedInput;
};

export type LiveOutPersonalUpsertWithoutPersonalInput = {
  create: LiveOutPersonalCreateWithoutPersonalInput;
  update: LiveOutPersonalUpdateWithoutPersonalInput;
};

export type LiveOutPersonalUpsertWithoutTotaledInput = {
  create: LiveOutPersonalCreateWithoutTotaledInput;
  update: LiveOutPersonalUpdateWithoutTotaledInput;
};

export type LiveOutPersonalWhereInput = {
  AND?: InputMaybe<Array<LiveOutPersonalWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  joined?: InputMaybe<JoinedOutListRelationFilter>;
  NOT?: InputMaybe<Array<LiveOutPersonalWhereInput>>;
  OR?: InputMaybe<Array<LiveOutPersonalWhereInput>>;
  Personal?: InputMaybe<PersonalWhereInput>;
  personalId?: InputMaybe<StringFilter>;
  totaled?: InputMaybe<TotaledOutListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type LiveOutPersonalWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  personalId?: InputMaybe<Scalars['String']>;
};

export type LiveOutVenue = {
  __typename?: 'LiveOutVenue';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  joined: Array<JoinedOut>;
  totaled: Array<TotaledOut>;
  updatedAt: Scalars['DateTime'];
  venueId: Scalars['String'];
};


export type LiveOutVenueJoinedArgs = {
  after?: InputMaybe<JoinedOutWhereUniqueInput>;
  before?: InputMaybe<JoinedOutWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type LiveOutVenueTotaledArgs = {
  after?: InputMaybe<TotaledOutWhereUniqueInput>;
  before?: InputMaybe<TotaledOutWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type LiveOutVenueCreateNestedOneWithoutJoinedInput = {
  connect?: InputMaybe<LiveOutVenueWhereUniqueInput>;
  connectOrCreate?: InputMaybe<LiveOutVenueCreateOrConnectWithoutJoinedInput>;
  create?: InputMaybe<LiveOutVenueCreateWithoutJoinedInput>;
};

export type LiveOutVenueCreateNestedOneWithoutTotaledInput = {
  connect?: InputMaybe<LiveOutVenueWhereUniqueInput>;
  connectOrCreate?: InputMaybe<LiveOutVenueCreateOrConnectWithoutTotaledInput>;
  create?: InputMaybe<LiveOutVenueCreateWithoutTotaledInput>;
};

export type LiveOutVenueCreateNestedOneWithoutVenueInput = {
  connect?: InputMaybe<LiveOutVenueWhereUniqueInput>;
  connectOrCreate?: InputMaybe<LiveOutVenueCreateOrConnectWithoutVenueInput>;
  create?: InputMaybe<LiveOutVenueCreateWithoutVenueInput>;
};

export type LiveOutVenueCreateOrConnectWithoutJoinedInput = {
  create: LiveOutVenueCreateWithoutJoinedInput;
  where: LiveOutVenueWhereUniqueInput;
};

export type LiveOutVenueCreateOrConnectWithoutTotaledInput = {
  create: LiveOutVenueCreateWithoutTotaledInput;
  where: LiveOutVenueWhereUniqueInput;
};

export type LiveOutVenueCreateOrConnectWithoutVenueInput = {
  create: LiveOutVenueCreateWithoutVenueInput;
  where: LiveOutVenueWhereUniqueInput;
};

export type LiveOutVenueCreateWithoutJoinedInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  totaled?: InputMaybe<TotaledOutCreateNestedManyWithoutLiveOutVenueInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  Venue: VenueCreateNestedOneWithoutLiveOutVenueInput;
};

export type LiveOutVenueCreateWithoutTotaledInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  joined?: InputMaybe<JoinedOutCreateNestedManyWithoutLiveOutVenueInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  Venue: VenueCreateNestedOneWithoutLiveOutVenueInput;
};

export type LiveOutVenueCreateWithoutVenueInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  joined?: InputMaybe<JoinedOutCreateNestedManyWithoutLiveOutVenueInput>;
  totaled?: InputMaybe<TotaledOutCreateNestedManyWithoutLiveOutVenueInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type LiveOutVenueOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  joined?: InputMaybe<JoinedOutOrderByRelationAggregateInput>;
  totaled?: InputMaybe<TotaledOutOrderByRelationAggregateInput>;
  updatedAt?: InputMaybe<SortOrder>;
  Venue?: InputMaybe<VenueOrderByWithRelationInput>;
  venueId?: InputMaybe<SortOrder>;
};

export type LiveOutVenueUpdateOneWithoutJoinedInput = {
  connect?: InputMaybe<LiveOutVenueWhereUniqueInput>;
  connectOrCreate?: InputMaybe<LiveOutVenueCreateOrConnectWithoutJoinedInput>;
  create?: InputMaybe<LiveOutVenueCreateWithoutJoinedInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<LiveOutVenueUpdateWithoutJoinedInput>;
  upsert?: InputMaybe<LiveOutVenueUpsertWithoutJoinedInput>;
};

export type LiveOutVenueUpdateOneWithoutTotaledInput = {
  connect?: InputMaybe<LiveOutVenueWhereUniqueInput>;
  connectOrCreate?: InputMaybe<LiveOutVenueCreateOrConnectWithoutTotaledInput>;
  create?: InputMaybe<LiveOutVenueCreateWithoutTotaledInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<LiveOutVenueUpdateWithoutTotaledInput>;
  upsert?: InputMaybe<LiveOutVenueUpsertWithoutTotaledInput>;
};

export type LiveOutVenueUpdateOneWithoutVenueInput = {
  connect?: InputMaybe<LiveOutVenueWhereUniqueInput>;
  connectOrCreate?: InputMaybe<LiveOutVenueCreateOrConnectWithoutVenueInput>;
  create?: InputMaybe<LiveOutVenueCreateWithoutVenueInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<LiveOutVenueUpdateWithoutVenueInput>;
  upsert?: InputMaybe<LiveOutVenueUpsertWithoutVenueInput>;
};

export type LiveOutVenueUpdateWithoutJoinedInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  totaled?: InputMaybe<TotaledOutUpdateManyWithoutLiveOutVenueInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Venue?: InputMaybe<VenueUpdateOneRequiredWithoutLiveOutVenueInput>;
};

export type LiveOutVenueUpdateWithoutTotaledInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  joined?: InputMaybe<JoinedOutUpdateManyWithoutLiveOutVenueInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Venue?: InputMaybe<VenueUpdateOneRequiredWithoutLiveOutVenueInput>;
};

export type LiveOutVenueUpdateWithoutVenueInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  joined?: InputMaybe<JoinedOutUpdateManyWithoutLiveOutVenueInput>;
  totaled?: InputMaybe<TotaledOutUpdateManyWithoutLiveOutVenueInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type LiveOutVenueUpsertWithoutJoinedInput = {
  create: LiveOutVenueCreateWithoutJoinedInput;
  update: LiveOutVenueUpdateWithoutJoinedInput;
};

export type LiveOutVenueUpsertWithoutTotaledInput = {
  create: LiveOutVenueCreateWithoutTotaledInput;
  update: LiveOutVenueUpdateWithoutTotaledInput;
};

export type LiveOutVenueUpsertWithoutVenueInput = {
  create: LiveOutVenueCreateWithoutVenueInput;
  update: LiveOutVenueUpdateWithoutVenueInput;
};

export type LiveOutVenueWhereInput = {
  AND?: InputMaybe<Array<LiveOutVenueWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  joined?: InputMaybe<JoinedOutListRelationFilter>;
  NOT?: InputMaybe<Array<LiveOutVenueWhereInput>>;
  OR?: InputMaybe<Array<LiveOutVenueWhereInput>>;
  totaled?: InputMaybe<TotaledOutListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  Venue?: InputMaybe<VenueWhereInput>;
  venueId?: InputMaybe<StringFilter>;
};

export type LiveOutVenueWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  venueId?: InputMaybe<Scalars['String']>;
};

export type LiveVenueTotals = {
  __typename?: 'LiveVenueTotals';
  joined?: Maybe<Array<JoinedOut>>;
  totaled?: Maybe<Array<TotaledOut>>;
};

export type Location = {
  __typename?: 'Location';
  Address?: Maybe<Address>;
  createdAt: Scalars['DateTime'];
  Geometry?: Maybe<Geometry>;
  h3Index: Scalars['String'];
  id: Scalars['String'];
  plusCode?: Maybe<PluseCode>;
  updatedAt: Scalars['DateTime'];
};

export type LocationCreateNestedOneWithoutVenueInput = {
  connect?: InputMaybe<LocationWhereUniqueInput>;
  connectOrCreate?: InputMaybe<LocationCreateOrConnectWithoutVenueInput>;
  create?: InputMaybe<LocationCreateWithoutVenueInput>;
};

export type LocationCreateOrConnectWithoutVenueInput = {
  create: LocationCreateWithoutVenueInput;
  where: LocationWhereUniqueInput;
};

export type LocationCreateWithoutVenueInput = {
  Address?: InputMaybe<AddressCreateNestedOneWithoutLocationInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  Geometry?: InputMaybe<GeometryCreateNestedOneWithoutLocationInput>;
  h3Index: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  plusCode?: InputMaybe<PluseCodeCreateNestedOneWithoutLocationInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type LocationListRelationFilter = {
  every?: InputMaybe<LocationWhereInput>;
  none?: InputMaybe<LocationWhereInput>;
  some?: InputMaybe<LocationWhereInput>;
};

export type LocationOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type LocationOrderByWithRelationInput = {
  Address?: InputMaybe<AddressOrderByWithRelationInput>;
  addressId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  Geometry?: InputMaybe<GeometryOrderByWithRelationInput>;
  geometryId?: InputMaybe<SortOrder>;
  h3Index?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  plusCode?: InputMaybe<PluseCodeOrderByWithRelationInput>;
  pluseCodeId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  Venue?: InputMaybe<VenueOrderByWithRelationInput>;
  venueId?: InputMaybe<SortOrder>;
};

export type LocationUpdateOneWithoutVenueInput = {
  connect?: InputMaybe<LocationWhereUniqueInput>;
  connectOrCreate?: InputMaybe<LocationCreateOrConnectWithoutVenueInput>;
  create?: InputMaybe<LocationCreateWithoutVenueInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<LocationUpdateWithoutVenueInput>;
  upsert?: InputMaybe<LocationUpsertWithoutVenueInput>;
};

export type LocationUpdateWithoutVenueInput = {
  Address?: InputMaybe<AddressUpdateOneWithoutLocationInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Geometry?: InputMaybe<GeometryUpdateOneWithoutLocationInput>;
  h3Index?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  plusCode?: InputMaybe<PluseCodeUpdateOneWithoutLocationInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type LocationUpsertWithoutVenueInput = {
  create: LocationCreateWithoutVenueInput;
  update: LocationUpdateWithoutVenueInput;
};

export type LocationWhereInput = {
  Address?: InputMaybe<AddressWhereInput>;
  addressId?: InputMaybe<StringNullableFilter>;
  AND?: InputMaybe<Array<LocationWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  Geometry?: InputMaybe<GeometryWhereInput>;
  geometryId?: InputMaybe<IntNullableFilter>;
  h3Index?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<LocationWhereInput>>;
  OR?: InputMaybe<Array<LocationWhereInput>>;
  plusCode?: InputMaybe<PluseCodeWhereInput>;
  pluseCodeId?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  Venue?: InputMaybe<VenueWhereInput>;
  venueId?: InputMaybe<StringNullableFilter>;
};

export type LocationWhereUniqueInput = {
  geometryId?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  pluseCodeId?: InputMaybe<Scalars['String']>;
  venueId?: InputMaybe<Scalars['String']>;
};

export type MessageCreateManyChatroomInput = {
  id?: InputMaybe<Scalars['String']>;
  message: Scalars['String'];
  responseId?: InputMaybe<Scalars['String']>;
  senderId: Scalars['String'];
};

export type MessageCreateManyChatroomInputEnvelope = {
  data?: InputMaybe<Array<MessageCreateManyChatroomInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type MessageCreateManyResponseInput = {
  chatroomId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  message: Scalars['String'];
  senderId: Scalars['String'];
};

export type MessageCreateManyResponseInputEnvelope = {
  data?: InputMaybe<Array<MessageCreateManyResponseInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type MessageCreateNestedManyWithoutChatroomInput = {
  connect?: InputMaybe<Array<MessageWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MessageCreateOrConnectWithoutChatroomInput>>;
  create?: InputMaybe<Array<MessageCreateWithoutChatroomInput>>;
  createMany?: InputMaybe<MessageCreateManyChatroomInputEnvelope>;
};

export type MessageCreateNestedManyWithoutResponseInput = {
  connect?: InputMaybe<Array<MessageWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MessageCreateOrConnectWithoutResponseInput>>;
  create?: InputMaybe<Array<MessageCreateWithoutResponseInput>>;
  createMany?: InputMaybe<MessageCreateManyResponseInputEnvelope>;
};

export type MessageCreateNestedOneWithoutResponsesInput = {
  connect?: InputMaybe<MessageWhereUniqueInput>;
  connectOrCreate?: InputMaybe<MessageCreateOrConnectWithoutResponsesInput>;
  create?: InputMaybe<MessageCreateWithoutResponsesInput>;
};

export type MessageCreateOrConnectWithoutChatroomInput = {
  create: MessageCreateWithoutChatroomInput;
  where: MessageWhereUniqueInput;
};

export type MessageCreateOrConnectWithoutResponseInput = {
  create: MessageCreateWithoutResponseInput;
  where: MessageWhereUniqueInput;
};

export type MessageCreateOrConnectWithoutResponsesInput = {
  create: MessageCreateWithoutResponsesInput;
  where: MessageWhereUniqueInput;
};

export type MessageCreateWithoutChatroomInput = {
  id?: InputMaybe<Scalars['String']>;
  message: Scalars['String'];
  response?: InputMaybe<MessageCreateNestedOneWithoutResponsesInput>;
  responses?: InputMaybe<MessageCreateNestedManyWithoutResponseInput>;
  senderId: Scalars['String'];
};

export type MessageCreateWithoutResponseInput = {
  Chatroom?: InputMaybe<ChatroomCreateNestedOneWithoutMessagesInput>;
  id?: InputMaybe<Scalars['String']>;
  message: Scalars['String'];
  responses?: InputMaybe<MessageCreateNestedManyWithoutResponseInput>;
  senderId: Scalars['String'];
};

export type MessageCreateWithoutResponsesInput = {
  Chatroom?: InputMaybe<ChatroomCreateNestedOneWithoutMessagesInput>;
  id?: InputMaybe<Scalars['String']>;
  message: Scalars['String'];
  response?: InputMaybe<MessageCreateNestedOneWithoutResponsesInput>;
  senderId: Scalars['String'];
};

export type MessageListRelationFilter = {
  every?: InputMaybe<MessageWhereInput>;
  none?: InputMaybe<MessageWhereInput>;
  some?: InputMaybe<MessageWhereInput>;
};

export type MessageOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type MessageScalarWhereInput = {
  AND?: InputMaybe<Array<MessageScalarWhereInput>>;
  chatroomId?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  message?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<MessageScalarWhereInput>>;
  OR?: InputMaybe<Array<MessageScalarWhereInput>>;
  responseId?: InputMaybe<StringNullableFilter>;
  senderId?: InputMaybe<StringFilter>;
};

export type MessageUpdateManyMutationInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  message?: InputMaybe<StringFieldUpdateOperationsInput>;
  senderId?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type MessageUpdateManyWithoutChatroomInput = {
  connect?: InputMaybe<Array<MessageWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MessageCreateOrConnectWithoutChatroomInput>>;
  create?: InputMaybe<Array<MessageCreateWithoutChatroomInput>>;
  createMany?: InputMaybe<MessageCreateManyChatroomInputEnvelope>;
  delete?: InputMaybe<Array<MessageWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<MessageScalarWhereInput>>;
  disconnect?: InputMaybe<Array<MessageWhereUniqueInput>>;
  set?: InputMaybe<Array<MessageWhereUniqueInput>>;
  update?: InputMaybe<Array<MessageUpdateWithWhereUniqueWithoutChatroomInput>>;
  updateMany?: InputMaybe<Array<MessageUpdateManyWithWhereWithoutChatroomInput>>;
  upsert?: InputMaybe<Array<MessageUpsertWithWhereUniqueWithoutChatroomInput>>;
};

export type MessageUpdateManyWithoutResponseInput = {
  connect?: InputMaybe<Array<MessageWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<MessageCreateOrConnectWithoutResponseInput>>;
  create?: InputMaybe<Array<MessageCreateWithoutResponseInput>>;
  createMany?: InputMaybe<MessageCreateManyResponseInputEnvelope>;
  delete?: InputMaybe<Array<MessageWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<MessageScalarWhereInput>>;
  disconnect?: InputMaybe<Array<MessageWhereUniqueInput>>;
  set?: InputMaybe<Array<MessageWhereUniqueInput>>;
  update?: InputMaybe<Array<MessageUpdateWithWhereUniqueWithoutResponseInput>>;
  updateMany?: InputMaybe<Array<MessageUpdateManyWithWhereWithoutResponseInput>>;
  upsert?: InputMaybe<Array<MessageUpsertWithWhereUniqueWithoutResponseInput>>;
};

export type MessageUpdateManyWithWhereWithoutChatroomInput = {
  data: MessageUpdateManyMutationInput;
  where: MessageScalarWhereInput;
};

export type MessageUpdateManyWithWhereWithoutResponseInput = {
  data: MessageUpdateManyMutationInput;
  where: MessageScalarWhereInput;
};

export type MessageUpdateOneWithoutResponsesInput = {
  connect?: InputMaybe<MessageWhereUniqueInput>;
  connectOrCreate?: InputMaybe<MessageCreateOrConnectWithoutResponsesInput>;
  create?: InputMaybe<MessageCreateWithoutResponsesInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<MessageUpdateWithoutResponsesInput>;
  upsert?: InputMaybe<MessageUpsertWithoutResponsesInput>;
};

export type MessageUpdateWithoutChatroomInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  message?: InputMaybe<StringFieldUpdateOperationsInput>;
  response?: InputMaybe<MessageUpdateOneWithoutResponsesInput>;
  responses?: InputMaybe<MessageUpdateManyWithoutResponseInput>;
  senderId?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type MessageUpdateWithoutResponseInput = {
  Chatroom?: InputMaybe<ChatroomUpdateOneWithoutMessagesInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  message?: InputMaybe<StringFieldUpdateOperationsInput>;
  responses?: InputMaybe<MessageUpdateManyWithoutResponseInput>;
  senderId?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type MessageUpdateWithoutResponsesInput = {
  Chatroom?: InputMaybe<ChatroomUpdateOneWithoutMessagesInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  message?: InputMaybe<StringFieldUpdateOperationsInput>;
  response?: InputMaybe<MessageUpdateOneWithoutResponsesInput>;
  senderId?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type MessageUpdateWithWhereUniqueWithoutChatroomInput = {
  data: MessageUpdateWithoutChatroomInput;
  where: MessageWhereUniqueInput;
};

export type MessageUpdateWithWhereUniqueWithoutResponseInput = {
  data: MessageUpdateWithoutResponseInput;
  where: MessageWhereUniqueInput;
};

export type MessageUpsertWithoutResponsesInput = {
  create: MessageCreateWithoutResponsesInput;
  update: MessageUpdateWithoutResponsesInput;
};

export type MessageUpsertWithWhereUniqueWithoutChatroomInput = {
  create: MessageCreateWithoutChatroomInput;
  update: MessageUpdateWithoutChatroomInput;
  where: MessageWhereUniqueInput;
};

export type MessageUpsertWithWhereUniqueWithoutResponseInput = {
  create: MessageCreateWithoutResponseInput;
  update: MessageUpdateWithoutResponseInput;
  where: MessageWhereUniqueInput;
};

export type MessageWhereInput = {
  AND?: InputMaybe<Array<MessageWhereInput>>;
  Chatroom?: InputMaybe<ChatroomWhereInput>;
  chatroomId?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<StringFilter>;
  message?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<MessageWhereInput>>;
  OR?: InputMaybe<Array<MessageWhereInput>>;
  response?: InputMaybe<MessageWhereInput>;
  responseId?: InputMaybe<StringNullableFilter>;
  responses?: InputMaybe<MessageListRelationFilter>;
  senderId?: InputMaybe<StringFilter>;
};

export type MessageWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addPersonalJoinsVenue?: Maybe<Scalars['Boolean']>;
  addPersonalTotalsVenue?: Maybe<Scalars['Boolean']>;
  checkThePink?: Maybe<Scalars['Boolean']>;
  createADeviceManager?: Maybe<RefreshDeviceManagerResponseUnion>;
  createAVenue?: Maybe<CreateProfileResponseUnion>;
  createGuestProfile?: Maybe<CreateProfileResponseUnion>;
  createOneDevice: Device;
  createOneEmojimood: Emojimood;
  createPersonalProfile?: Maybe<CreateProfileResponseUnion>;
  refreshDeviceManager?: Maybe<RefreshDeviceManagerResponseUnion>;
  removeDeviceProfileFromDeviceManager?: Maybe<Scalars['Boolean']>;
  removePersonalJoinsVenue?: Maybe<Scalars['Boolean']>;
  removePersonalTotalsVenue?: Maybe<Scalars['Boolean']>;
  sendAuthenticatorDeviceOwnerCode?: Maybe<CodeResponse>;
  sendAuthenticatorForgotPasswordCode?: Maybe<CodeResponse>;
  storageCreateVenues?: Maybe<Array<Maybe<CreateVenueStorageResponse>>>;
  switchDeviceProfile?: Maybe<RefreshDeviceManagerResponseUnion>;
  updateOneProfile?: Maybe<Profile>;
  updateProfileIdentifiableInformation?: Maybe<UpdateProfileResponse>;
  updateStoryEmojimood?: Maybe<Scalars['Boolean']>;
  updateStoryPhotos?: Maybe<Scalars['Boolean']>;
  upsertTonightPathOrPath?: Maybe<Scalars['Boolean']>;
};


export type MutationAddPersonalJoinsVenueArgs = {
  profileIdPersonal: Scalars['String'];
  profileIdVenue: Scalars['String'];
};


export type MutationAddPersonalTotalsVenueArgs = {
  profileIdPersonal: Scalars['String'];
  profileIdVenue: Scalars['String'];
};


export type MutationCreateADeviceManagerArgs = {
  profileId: Scalars['String'];
};


export type MutationCreateAVenueArgs = {
  data: CreateVenueProfileDataInput;
};


export type MutationCreateOneDeviceArgs = {
  data: DeviceCreateInput;
};


export type MutationCreateOneEmojimoodArgs = {
  data: EmojimoodCreateInput;
};


export type MutationCreatePersonalProfileArgs = {
  data?: InputMaybe<CreatePersonalProfileDataInput>;
};


export type MutationRemoveDeviceProfileFromDeviceManagerArgs = {
  profileId: Scalars['String'];
};


export type MutationRemovePersonalJoinsVenueArgs = {
  profileIdPersonal: Scalars['String'];
  profileIdVenue: Scalars['String'];
};


export type MutationRemovePersonalTotalsVenueArgs = {
  profileIdPersonal: Scalars['String'];
  profileIdVenue: Scalars['String'];
};


export type MutationSendAuthenticatorDeviceOwnerCodeArgs = {
  data?: InputMaybe<CodeData>;
  where?: InputMaybe<CodeWhere>;
};


export type MutationSendAuthenticatorForgotPasswordCodeArgs = {
  data?: InputMaybe<CodeData>;
  where?: InputMaybe<CodeWhere>;
};


export type MutationStorageCreateVenuesArgs = {
  data?: InputMaybe<Array<InputMaybe<Scalars['Json']>>>;
};


export type MutationSwitchDeviceProfileArgs = {
  profileId: Scalars['String'];
};


export type MutationUpdateOneProfileArgs = {
  data: ProfileUpdateInput;
  where: ProfileWhereUniqueInput;
};


export type MutationUpdateProfileIdentifiableInformationArgs = {
  data: IdentifiableInformationUpdateWithoutProfileInput;
  where: IdentifiableInformationWhereUniqueInput;
};


export type MutationUpdateStoryEmojimoodArgs = {
  emojimoodId: Scalars['Int'];
  storyId?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateStoryPhotosArgs = {
  disconnectId: Scalars['String'];
  photos?: InputMaybe<PhotoCreateManyProfileInputEnvelope>;
  storyId?: InputMaybe<Scalars['String']>;
};


export type MutationUpsertTonightPathOrPathArgs = {
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  profileIdPersonal: Scalars['String'];
  tonightPathId?: InputMaybe<Scalars['String']>;
};

export enum MutationType {
  Created = 'CREATED',
  Deleted = 'DELETED',
  Updated = 'UPDATED'
}

export type NestedBoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type NestedBoolNullableFilter = {
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<NestedBoolNullableFilter>;
};

export type NestedDateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type NestedDateTimeNullableFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type NestedEnumPhotoTypeNullableFilter = {
  equals?: InputMaybe<PhotoType>;
  in?: InputMaybe<Array<PhotoType>>;
  not?: InputMaybe<NestedEnumPhotoTypeNullableFilter>;
  notIn?: InputMaybe<Array<PhotoType>>;
};

export type NestedEnumProfileTypeFilter = {
  equals?: InputMaybe<ProfileType>;
  in?: InputMaybe<Array<ProfileType>>;
  not?: InputMaybe<NestedEnumProfileTypeFilter>;
  notIn?: InputMaybe<Array<ProfileType>>;
};

export type NestedEnumTagTypeFilter = {
  equals?: InputMaybe<TagType>;
  in?: InputMaybe<Array<TagType>>;
  not?: InputMaybe<NestedEnumTagTypeFilter>;
  notIn?: InputMaybe<Array<TagType>>;
};

export type NestedEnumTypeOfDocumentFilter = {
  equals?: InputMaybe<TypeOfDocument>;
  in?: InputMaybe<Array<TypeOfDocument>>;
  not?: InputMaybe<NestedEnumTypeOfDocumentFilter>;
  notIn?: InputMaybe<Array<TypeOfDocument>>;
};

export type NestedFloatFilter = {
  equals?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<Scalars['Float']>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  not?: InputMaybe<NestedFloatFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']>>;
};

export type NestedIntFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type NestedIntNullableFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type NestedStringNullableFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type Node = {
  id?: Maybe<Scalars['String']>;
};

export type NullableBoolFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['Boolean']>;
};

export type NullableDateTimeFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['DateTime']>;
};

export type NullableEnumPhotoTypeFieldUpdateOperationsInput = {
  set?: InputMaybe<PhotoType>;
};

export type NullableIntFieldUpdateOperationsInput = {
  decrement?: InputMaybe<Scalars['Int']>;
  divide?: InputMaybe<Scalars['Int']>;
  increment?: InputMaybe<Scalars['Int']>;
  multiply?: InputMaybe<Scalars['Int']>;
  set?: InputMaybe<Scalars['Int']>;
};

export type NullableStringFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['String']>;
};

export type Password = {
  __typename?: 'Password';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  password: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type PasswordCreateNestedOneWithoutAuthenticationProviderInput = {
  connect?: InputMaybe<PasswordWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PasswordCreateOrConnectWithoutAuthenticationProviderInput>;
  create?: InputMaybe<PasswordCreateWithoutAuthenticationProviderInput>;
};

export type PasswordCreateOrConnectWithoutAuthenticationProviderInput = {
  create: PasswordCreateWithoutAuthenticationProviderInput;
  where: PasswordWhereUniqueInput;
};

export type PasswordCreateWithoutAuthenticationProviderInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type PasswordOrderByWithRelationInput = {
  authenitcationProviderId?: InputMaybe<SortOrder>;
  AuthenticationProvider?: InputMaybe<AuthenticationProviderOrderByWithRelationInput>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  password?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type PasswordUpdateOneWithoutAuthenticationProviderInput = {
  connect?: InputMaybe<PasswordWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PasswordCreateOrConnectWithoutAuthenticationProviderInput>;
  create?: InputMaybe<PasswordCreateWithoutAuthenticationProviderInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<PasswordUpdateWithoutAuthenticationProviderInput>;
  upsert?: InputMaybe<PasswordUpsertWithoutAuthenticationProviderInput>;
};

export type PasswordUpdateWithoutAuthenticationProviderInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  password?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type PasswordUpsertWithoutAuthenticationProviderInput = {
  create: PasswordCreateWithoutAuthenticationProviderInput;
  update: PasswordUpdateWithoutAuthenticationProviderInput;
};

export type PasswordWhereInput = {
  AND?: InputMaybe<Array<PasswordWhereInput>>;
  authenitcationProviderId?: InputMaybe<StringFilter>;
  AuthenticationProvider?: InputMaybe<AuthenticationProviderWhereInput>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<PasswordWhereInput>>;
  OR?: InputMaybe<Array<PasswordWhereInput>>;
  password?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type PasswordWhereUniqueInput = {
  authenitcationProviderId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};

export type Personal = {
  __typename?: 'Personal';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  LiveOutPersonal?: Maybe<LiveOutPersonal>;
  PersonalStats?: Maybe<PersonalStats>;
  Profile: Profile;
  profileId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type PersonalCreateNestedOneWithoutLiveOutPersonalInput = {
  connect?: InputMaybe<PersonalWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PersonalCreateOrConnectWithoutLiveOutPersonalInput>;
  create?: InputMaybe<PersonalCreateWithoutLiveOutPersonalInput>;
};

export type PersonalCreateNestedOneWithoutPersonalStatsInput = {
  connect?: InputMaybe<PersonalWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PersonalCreateOrConnectWithoutPersonalStatsInput>;
  create?: InputMaybe<PersonalCreateWithoutPersonalStatsInput>;
};

export type PersonalCreateNestedOneWithoutProfileInput = {
  connect?: InputMaybe<PersonalWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PersonalCreateOrConnectWithoutProfileInput>;
  create?: InputMaybe<PersonalCreateWithoutProfileInput>;
};

export type PersonalCreateOrConnectWithoutLiveOutPersonalInput = {
  create: PersonalCreateWithoutLiveOutPersonalInput;
  where: PersonalWhereUniqueInput;
};

export type PersonalCreateOrConnectWithoutPersonalStatsInput = {
  create: PersonalCreateWithoutPersonalStatsInput;
  where: PersonalWhereUniqueInput;
};

export type PersonalCreateOrConnectWithoutProfileInput = {
  create: PersonalCreateWithoutProfileInput;
  where: PersonalWhereUniqueInput;
};

export type PersonalCreateWithoutLiveOutPersonalInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  PersonalStats?: InputMaybe<PersonalStatsCreateNestedOneWithoutPersonalInput>;
  Profile: ProfileCreateNestedOneWithoutPersonalInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type PersonalCreateWithoutPersonalStatsInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  LiveOutPersonal?: InputMaybe<LiveOutPersonalCreateNestedOneWithoutPersonalInput>;
  Profile: ProfileCreateNestedOneWithoutPersonalInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type PersonalCreateWithoutProfileInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  LiveOutPersonal?: InputMaybe<LiveOutPersonalCreateNestedOneWithoutPersonalInput>;
  PersonalStats?: InputMaybe<PersonalStatsCreateNestedOneWithoutPersonalInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type PersonalOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  LiveOutPersonal?: InputMaybe<LiveOutPersonalOrderByWithRelationInput>;
  PersonalStats?: InputMaybe<PersonalStatsOrderByWithRelationInput>;
  personalStatsId?: InputMaybe<SortOrder>;
  Profile?: InputMaybe<ProfileOrderByWithRelationInput>;
  profileId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type PersonalStats = {
  __typename?: 'PersonalStats';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  joinedVenueHistory: Array<JoinedOut>;
  Personal?: Maybe<Personal>;
  totaledVenueHistory: Array<TotaledOut>;
  updatedAt: Scalars['DateTime'];
};


export type PersonalStatsJoinedVenueHistoryArgs = {
  after?: InputMaybe<JoinedOutWhereUniqueInput>;
  before?: InputMaybe<JoinedOutWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type PersonalStatsTotaledVenueHistoryArgs = {
  after?: InputMaybe<TotaledOutWhereUniqueInput>;
  before?: InputMaybe<TotaledOutWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type PersonalStatsCreateNestedOneWithoutJoinedVenueHistoryInput = {
  connect?: InputMaybe<PersonalStatsWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PersonalStatsCreateOrConnectWithoutJoinedVenueHistoryInput>;
  create?: InputMaybe<PersonalStatsCreateWithoutJoinedVenueHistoryInput>;
};

export type PersonalStatsCreateNestedOneWithoutPersonalInput = {
  connect?: InputMaybe<PersonalStatsWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PersonalStatsCreateOrConnectWithoutPersonalInput>;
  create?: InputMaybe<PersonalStatsCreateWithoutPersonalInput>;
};

export type PersonalStatsCreateNestedOneWithoutTotaledVenueHistoryInput = {
  connect?: InputMaybe<PersonalStatsWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PersonalStatsCreateOrConnectWithoutTotaledVenueHistoryInput>;
  create?: InputMaybe<PersonalStatsCreateWithoutTotaledVenueHistoryInput>;
};

export type PersonalStatsCreateOrConnectWithoutJoinedVenueHistoryInput = {
  create: PersonalStatsCreateWithoutJoinedVenueHistoryInput;
  where: PersonalStatsWhereUniqueInput;
};

export type PersonalStatsCreateOrConnectWithoutPersonalInput = {
  create: PersonalStatsCreateWithoutPersonalInput;
  where: PersonalStatsWhereUniqueInput;
};

export type PersonalStatsCreateOrConnectWithoutTotaledVenueHistoryInput = {
  create: PersonalStatsCreateWithoutTotaledVenueHistoryInput;
  where: PersonalStatsWhereUniqueInput;
};

export type PersonalStatsCreateWithoutJoinedVenueHistoryInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  Personal?: InputMaybe<PersonalCreateNestedOneWithoutPersonalStatsInput>;
  totaledVenueHistory?: InputMaybe<TotaledOutCreateNestedManyWithoutPersonalStatsInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type PersonalStatsCreateWithoutPersonalInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  joinedVenueHistory?: InputMaybe<JoinedOutCreateNestedManyWithoutPersonalStatsInput>;
  totaledVenueHistory?: InputMaybe<TotaledOutCreateNestedManyWithoutPersonalStatsInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type PersonalStatsCreateWithoutTotaledVenueHistoryInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  joinedVenueHistory?: InputMaybe<JoinedOutCreateNestedManyWithoutPersonalStatsInput>;
  Personal?: InputMaybe<PersonalCreateNestedOneWithoutPersonalStatsInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type PersonalStatsOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  joinedVenueHistory?: InputMaybe<JoinedOutOrderByRelationAggregateInput>;
  Personal?: InputMaybe<PersonalOrderByWithRelationInput>;
  totaledVenueHistory?: InputMaybe<TotaledOutOrderByRelationAggregateInput>;
  updatedAt?: InputMaybe<SortOrder>;
};

export type PersonalStatsUpdateOneWithoutJoinedVenueHistoryInput = {
  connect?: InputMaybe<PersonalStatsWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PersonalStatsCreateOrConnectWithoutJoinedVenueHistoryInput>;
  create?: InputMaybe<PersonalStatsCreateWithoutJoinedVenueHistoryInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<PersonalStatsUpdateWithoutJoinedVenueHistoryInput>;
  upsert?: InputMaybe<PersonalStatsUpsertWithoutJoinedVenueHistoryInput>;
};

export type PersonalStatsUpdateOneWithoutPersonalInput = {
  connect?: InputMaybe<PersonalStatsWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PersonalStatsCreateOrConnectWithoutPersonalInput>;
  create?: InputMaybe<PersonalStatsCreateWithoutPersonalInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<PersonalStatsUpdateWithoutPersonalInput>;
  upsert?: InputMaybe<PersonalStatsUpsertWithoutPersonalInput>;
};

export type PersonalStatsUpdateOneWithoutTotaledVenueHistoryInput = {
  connect?: InputMaybe<PersonalStatsWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PersonalStatsCreateOrConnectWithoutTotaledVenueHistoryInput>;
  create?: InputMaybe<PersonalStatsCreateWithoutTotaledVenueHistoryInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<PersonalStatsUpdateWithoutTotaledVenueHistoryInput>;
  upsert?: InputMaybe<PersonalStatsUpsertWithoutTotaledVenueHistoryInput>;
};

export type PersonalStatsUpdateWithoutJoinedVenueHistoryInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  Personal?: InputMaybe<PersonalUpdateOneWithoutPersonalStatsInput>;
  totaledVenueHistory?: InputMaybe<TotaledOutUpdateManyWithoutPersonalStatsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type PersonalStatsUpdateWithoutPersonalInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  joinedVenueHistory?: InputMaybe<JoinedOutUpdateManyWithoutPersonalStatsInput>;
  totaledVenueHistory?: InputMaybe<TotaledOutUpdateManyWithoutPersonalStatsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type PersonalStatsUpdateWithoutTotaledVenueHistoryInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  joinedVenueHistory?: InputMaybe<JoinedOutUpdateManyWithoutPersonalStatsInput>;
  Personal?: InputMaybe<PersonalUpdateOneWithoutPersonalStatsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type PersonalStatsUpsertWithoutJoinedVenueHistoryInput = {
  create: PersonalStatsCreateWithoutJoinedVenueHistoryInput;
  update: PersonalStatsUpdateWithoutJoinedVenueHistoryInput;
};

export type PersonalStatsUpsertWithoutPersonalInput = {
  create: PersonalStatsCreateWithoutPersonalInput;
  update: PersonalStatsUpdateWithoutPersonalInput;
};

export type PersonalStatsUpsertWithoutTotaledVenueHistoryInput = {
  create: PersonalStatsCreateWithoutTotaledVenueHistoryInput;
  update: PersonalStatsUpdateWithoutTotaledVenueHistoryInput;
};

export type PersonalStatsWhereInput = {
  AND?: InputMaybe<Array<PersonalStatsWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  joinedVenueHistory?: InputMaybe<JoinedOutListRelationFilter>;
  NOT?: InputMaybe<Array<PersonalStatsWhereInput>>;
  OR?: InputMaybe<Array<PersonalStatsWhereInput>>;
  Personal?: InputMaybe<PersonalWhereInput>;
  totaledVenueHistory?: InputMaybe<TotaledOutListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type PersonalStatsWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type PersonalUpdateOneRequiredWithoutLiveOutPersonalInput = {
  connect?: InputMaybe<PersonalWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PersonalCreateOrConnectWithoutLiveOutPersonalInput>;
  create?: InputMaybe<PersonalCreateWithoutLiveOutPersonalInput>;
  update?: InputMaybe<PersonalUpdateWithoutLiveOutPersonalInput>;
  upsert?: InputMaybe<PersonalUpsertWithoutLiveOutPersonalInput>;
};

export type PersonalUpdateOneWithoutPersonalStatsInput = {
  connect?: InputMaybe<PersonalWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PersonalCreateOrConnectWithoutPersonalStatsInput>;
  create?: InputMaybe<PersonalCreateWithoutPersonalStatsInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<PersonalUpdateWithoutPersonalStatsInput>;
  upsert?: InputMaybe<PersonalUpsertWithoutPersonalStatsInput>;
};

export type PersonalUpdateOneWithoutProfileInput = {
  connect?: InputMaybe<PersonalWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PersonalCreateOrConnectWithoutProfileInput>;
  create?: InputMaybe<PersonalCreateWithoutProfileInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<PersonalUpdateWithoutProfileInput>;
  upsert?: InputMaybe<PersonalUpsertWithoutProfileInput>;
};

export type PersonalUpdateWithoutLiveOutPersonalInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  PersonalStats?: InputMaybe<PersonalStatsUpdateOneWithoutPersonalInput>;
  Profile?: InputMaybe<ProfileUpdateOneRequiredWithoutPersonalInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type PersonalUpdateWithoutPersonalStatsInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  LiveOutPersonal?: InputMaybe<LiveOutPersonalUpdateOneWithoutPersonalInput>;
  Profile?: InputMaybe<ProfileUpdateOneRequiredWithoutPersonalInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type PersonalUpdateWithoutProfileInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  LiveOutPersonal?: InputMaybe<LiveOutPersonalUpdateOneWithoutPersonalInput>;
  PersonalStats?: InputMaybe<PersonalStatsUpdateOneWithoutPersonalInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type PersonalUpsertWithoutLiveOutPersonalInput = {
  create: PersonalCreateWithoutLiveOutPersonalInput;
  update: PersonalUpdateWithoutLiveOutPersonalInput;
};

export type PersonalUpsertWithoutPersonalStatsInput = {
  create: PersonalCreateWithoutPersonalStatsInput;
  update: PersonalUpdateWithoutPersonalStatsInput;
};

export type PersonalUpsertWithoutProfileInput = {
  create: PersonalCreateWithoutProfileInput;
  update: PersonalUpdateWithoutProfileInput;
};

export type PersonalWhereInput = {
  AND?: InputMaybe<Array<PersonalWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  LiveOutPersonal?: InputMaybe<LiveOutPersonalWhereInput>;
  NOT?: InputMaybe<Array<PersonalWhereInput>>;
  OR?: InputMaybe<Array<PersonalWhereInput>>;
  PersonalStats?: InputMaybe<PersonalStatsWhereInput>;
  personalStatsId?: InputMaybe<StringNullableFilter>;
  Profile?: InputMaybe<ProfileWhereInput>;
  profileId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type PersonalWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  personalStatsId?: InputMaybe<Scalars['String']>;
  profileId?: InputMaybe<Scalars['String']>;
};

export type Phone = {
  __typename?: 'Phone';
  canUseAsRecovery?: Maybe<Scalars['Boolean']>;
  completeNumber?: Maybe<Scalars['String']>;
  countryCallingCode?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  number: Scalars['String'];
  updatedAt: Scalars['DateTime'];
};

export type PhoneCreateNestedManyWithoutAuthenticationProviderInput = {
  connect?: InputMaybe<Array<PhoneWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PhoneCreateOrConnectWithoutAuthenticationProviderInput>>;
  create?: InputMaybe<Array<PhoneCreateWithoutAuthenticationProviderInput>>;
};

export type PhoneCreateOrConnectWithoutAuthenticationProviderInput = {
  create: PhoneCreateWithoutAuthenticationProviderInput;
  where: PhoneWhereUniqueInput;
};

export type PhoneCreateWithoutAuthenticationProviderInput = {
  canUseAsRecovery?: InputMaybe<Scalars['Boolean']>;
  completeNumber?: InputMaybe<Scalars['String']>;
  countryCallingCode?: InputMaybe<Scalars['String']>;
  countryCode?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  number: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type PhoneInput = {
  completeNumber?: InputMaybe<Scalars['String']>;
  countryCallingCode?: InputMaybe<Scalars['String']>;
  countryCode?: InputMaybe<Scalars['String']>;
  /** Example: 5193334444 or +15193334444 */
  number?: InputMaybe<Scalars['String']>;
};

export type PhoneListRelationFilter = {
  every?: InputMaybe<PhoneWhereInput>;
  none?: InputMaybe<PhoneWhereInput>;
  some?: InputMaybe<PhoneWhereInput>;
};

export type PhoneOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type PhoneScalarWhereInput = {
  AND?: InputMaybe<Array<PhoneScalarWhereInput>>;
  canUseAsRecovery?: InputMaybe<BoolNullableFilter>;
  completeNumber?: InputMaybe<StringNullableFilter>;
  countryCallingCode?: InputMaybe<StringNullableFilter>;
  countryCode?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IntFilter>;
  NOT?: InputMaybe<Array<PhoneScalarWhereInput>>;
  number?: InputMaybe<StringFilter>;
  OR?: InputMaybe<Array<PhoneScalarWhereInput>>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type PhoneUpdateManyMutationInput = {
  canUseAsRecovery?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  completeNumber?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  countryCallingCode?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  countryCode?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  number?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type PhoneUpdateManyWithoutAuthenticationProviderInput = {
  connect?: InputMaybe<Array<PhoneWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PhoneCreateOrConnectWithoutAuthenticationProviderInput>>;
  create?: InputMaybe<Array<PhoneCreateWithoutAuthenticationProviderInput>>;
  delete?: InputMaybe<Array<PhoneWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<PhoneScalarWhereInput>>;
  disconnect?: InputMaybe<Array<PhoneWhereUniqueInput>>;
  set?: InputMaybe<Array<PhoneWhereUniqueInput>>;
  update?: InputMaybe<Array<PhoneUpdateWithWhereUniqueWithoutAuthenticationProviderInput>>;
  updateMany?: InputMaybe<Array<PhoneUpdateManyWithWhereWithoutAuthenticationProviderInput>>;
  upsert?: InputMaybe<Array<PhoneUpsertWithWhereUniqueWithoutAuthenticationProviderInput>>;
};

export type PhoneUpdateManyWithWhereWithoutAuthenticationProviderInput = {
  data: PhoneUpdateManyMutationInput;
  where: PhoneScalarWhereInput;
};

export type PhoneUpdateWithoutAuthenticationProviderInput = {
  canUseAsRecovery?: InputMaybe<NullableBoolFieldUpdateOperationsInput>;
  completeNumber?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  countryCallingCode?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  countryCode?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  number?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type PhoneUpdateWithWhereUniqueWithoutAuthenticationProviderInput = {
  data: PhoneUpdateWithoutAuthenticationProviderInput;
  where: PhoneWhereUniqueInput;
};

export type PhoneUpsertWithWhereUniqueWithoutAuthenticationProviderInput = {
  create: PhoneCreateWithoutAuthenticationProviderInput;
  update: PhoneUpdateWithoutAuthenticationProviderInput;
  where: PhoneWhereUniqueInput;
};

export type PhoneWhereInput = {
  AND?: InputMaybe<Array<PhoneWhereInput>>;
  AuthenticationProvider?: InputMaybe<AuthenticationProviderListRelationFilter>;
  canUseAsRecovery?: InputMaybe<BoolNullableFilter>;
  completeNumber?: InputMaybe<StringNullableFilter>;
  countryCallingCode?: InputMaybe<StringNullableFilter>;
  countryCode?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IntFilter>;
  NOT?: InputMaybe<Array<PhoneWhereInput>>;
  number?: InputMaybe<StringFilter>;
  OR?: InputMaybe<Array<PhoneWhereInput>>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type PhoneWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
};

export type Photo = {
  __typename?: 'Photo';
  active: Scalars['Boolean'];
  blurhash?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  position?: Maybe<Scalars['Int']>;
  ratio?: Maybe<Scalars['String']>;
  type?: Maybe<PhotoType>;
  updatedAt: Scalars['DateTime'];
  url: Scalars['String'];
};

export type PhotoCreateManyGroupInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  blurhash?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  height?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  position?: InputMaybe<Scalars['Int']>;
  profileId?: InputMaybe<Scalars['String']>;
  ratio?: InputMaybe<Scalars['String']>;
  storyId?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<PhotoType>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  url: Scalars['String'];
  width?: InputMaybe<Scalars['Int']>;
};

export type PhotoCreateManyGroupInputEnvelope = {
  data?: InputMaybe<Array<PhotoCreateManyGroupInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type PhotoCreateManyProfileInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  blurhash?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  groupId?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  position?: InputMaybe<Scalars['Int']>;
  ratio?: InputMaybe<Scalars['String']>;
  storyId?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<PhotoType>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  url: Scalars['String'];
  width?: InputMaybe<Scalars['Int']>;
};

export type PhotoCreateManyProfileInputEnvelope = {
  data?: InputMaybe<Array<PhotoCreateManyProfileInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type PhotoCreateManyStoryInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  blurhash?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  groupId?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  position?: InputMaybe<Scalars['Int']>;
  profileId?: InputMaybe<Scalars['String']>;
  ratio?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<PhotoType>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  url: Scalars['String'];
  width?: InputMaybe<Scalars['Int']>;
};

export type PhotoCreateManyStoryInputEnvelope = {
  data?: InputMaybe<Array<PhotoCreateManyStoryInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type PhotoCreateNestedManyWithoutGroupInput = {
  connect?: InputMaybe<Array<PhotoWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PhotoCreateOrConnectWithoutGroupInput>>;
  create?: InputMaybe<Array<PhotoCreateWithoutGroupInput>>;
  createMany?: InputMaybe<PhotoCreateManyGroupInputEnvelope>;
};

export type PhotoCreateNestedManyWithoutProfileInput = {
  connect?: InputMaybe<Array<PhotoWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PhotoCreateOrConnectWithoutProfileInput>>;
  create?: InputMaybe<Array<PhotoCreateWithoutProfileInput>>;
  createMany?: InputMaybe<PhotoCreateManyProfileInputEnvelope>;
};

export type PhotoCreateNestedManyWithoutStoryInput = {
  connect?: InputMaybe<Array<PhotoWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PhotoCreateOrConnectWithoutStoryInput>>;
  create?: InputMaybe<Array<PhotoCreateWithoutStoryInput>>;
  createMany?: InputMaybe<PhotoCreateManyStoryInputEnvelope>;
};

export type PhotoCreateOrConnectWithoutGroupInput = {
  create: PhotoCreateWithoutGroupInput;
  where: PhotoWhereUniqueInput;
};

export type PhotoCreateOrConnectWithoutProfileInput = {
  create: PhotoCreateWithoutProfileInput;
  where: PhotoWhereUniqueInput;
};

export type PhotoCreateOrConnectWithoutStoryInput = {
  create: PhotoCreateWithoutStoryInput;
  where: PhotoWhereUniqueInput;
};

export type PhotoCreateWithoutGroupInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  blurhash?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  height?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  position?: InputMaybe<Scalars['Int']>;
  Profile?: InputMaybe<ProfileCreateNestedOneWithoutPhotosInput>;
  ratio?: InputMaybe<Scalars['String']>;
  Story?: InputMaybe<StoryCreateNestedOneWithoutPhotosInput>;
  type?: InputMaybe<PhotoType>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  url: Scalars['String'];
  width?: InputMaybe<Scalars['Int']>;
};

export type PhotoCreateWithoutProfileInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  blurhash?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  Group?: InputMaybe<GroupCreateNestedOneWithoutPhotosInput>;
  height?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  position?: InputMaybe<Scalars['Int']>;
  ratio?: InputMaybe<Scalars['String']>;
  Story?: InputMaybe<StoryCreateNestedOneWithoutPhotosInput>;
  type?: InputMaybe<PhotoType>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  url: Scalars['String'];
  width?: InputMaybe<Scalars['Int']>;
};

export type PhotoCreateWithoutStoryInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  blurhash?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  Group?: InputMaybe<GroupCreateNestedOneWithoutPhotosInput>;
  height?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['String']>;
  position?: InputMaybe<Scalars['Int']>;
  Profile?: InputMaybe<ProfileCreateNestedOneWithoutPhotosInput>;
  ratio?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<PhotoType>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  url: Scalars['String'];
  width?: InputMaybe<Scalars['Int']>;
};

export type PhotoListRelationFilter = {
  every?: InputMaybe<PhotoWhereInput>;
  none?: InputMaybe<PhotoWhereInput>;
  some?: InputMaybe<PhotoWhereInput>;
};

export type PhotoOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type PhotoScalarWhereInput = {
  active?: InputMaybe<BoolFilter>;
  AND?: InputMaybe<Array<PhotoScalarWhereInput>>;
  blurhash?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  groupId?: InputMaybe<StringNullableFilter>;
  height?: InputMaybe<IntNullableFilter>;
  id?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<PhotoScalarWhereInput>>;
  OR?: InputMaybe<Array<PhotoScalarWhereInput>>;
  position?: InputMaybe<IntNullableFilter>;
  profileId?: InputMaybe<StringNullableFilter>;
  ratio?: InputMaybe<StringNullableFilter>;
  storyId?: InputMaybe<StringNullableFilter>;
  type?: InputMaybe<EnumPhotoTypeNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  url?: InputMaybe<StringFilter>;
  width?: InputMaybe<IntNullableFilter>;
};

export enum PhotoType {
  Banner = 'BANNER',
  Logo = 'LOGO'
}

export type PhotoUpdateManyMutationInput = {
  active?: InputMaybe<BoolFieldUpdateOperationsInput>;
  blurhash?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  height?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  position?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  ratio?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  type?: InputMaybe<NullableEnumPhotoTypeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  url?: InputMaybe<StringFieldUpdateOperationsInput>;
  width?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
};

export type PhotoUpdateManyWithoutGroupInput = {
  connect?: InputMaybe<Array<PhotoWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PhotoCreateOrConnectWithoutGroupInput>>;
  create?: InputMaybe<Array<PhotoCreateWithoutGroupInput>>;
  createMany?: InputMaybe<PhotoCreateManyGroupInputEnvelope>;
  delete?: InputMaybe<Array<PhotoWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<PhotoScalarWhereInput>>;
  disconnect?: InputMaybe<Array<PhotoWhereUniqueInput>>;
  set?: InputMaybe<Array<PhotoWhereUniqueInput>>;
  update?: InputMaybe<Array<PhotoUpdateWithWhereUniqueWithoutGroupInput>>;
  updateMany?: InputMaybe<Array<PhotoUpdateManyWithWhereWithoutGroupInput>>;
  upsert?: InputMaybe<Array<PhotoUpsertWithWhereUniqueWithoutGroupInput>>;
};

export type PhotoUpdateManyWithoutProfileInput = {
  connect?: InputMaybe<Array<PhotoWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PhotoCreateOrConnectWithoutProfileInput>>;
  create?: InputMaybe<Array<PhotoCreateWithoutProfileInput>>;
  createMany?: InputMaybe<PhotoCreateManyProfileInputEnvelope>;
  delete?: InputMaybe<Array<PhotoWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<PhotoScalarWhereInput>>;
  disconnect?: InputMaybe<Array<PhotoWhereUniqueInput>>;
  set?: InputMaybe<Array<PhotoWhereUniqueInput>>;
  update?: InputMaybe<Array<PhotoUpdateWithWhereUniqueWithoutProfileInput>>;
  updateMany?: InputMaybe<Array<PhotoUpdateManyWithWhereWithoutProfileInput>>;
  upsert?: InputMaybe<Array<PhotoUpsertWithWhereUniqueWithoutProfileInput>>;
};

export type PhotoUpdateManyWithoutStoryInput = {
  connect?: InputMaybe<Array<PhotoWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<PhotoCreateOrConnectWithoutStoryInput>>;
  create?: InputMaybe<Array<PhotoCreateWithoutStoryInput>>;
  createMany?: InputMaybe<PhotoCreateManyStoryInputEnvelope>;
  delete?: InputMaybe<Array<PhotoWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<PhotoScalarWhereInput>>;
  disconnect?: InputMaybe<Array<PhotoWhereUniqueInput>>;
  set?: InputMaybe<Array<PhotoWhereUniqueInput>>;
  update?: InputMaybe<Array<PhotoUpdateWithWhereUniqueWithoutStoryInput>>;
  updateMany?: InputMaybe<Array<PhotoUpdateManyWithWhereWithoutStoryInput>>;
  upsert?: InputMaybe<Array<PhotoUpsertWithWhereUniqueWithoutStoryInput>>;
};

export type PhotoUpdateManyWithWhereWithoutGroupInput = {
  data: PhotoUpdateManyMutationInput;
  where: PhotoScalarWhereInput;
};

export type PhotoUpdateManyWithWhereWithoutProfileInput = {
  data: PhotoUpdateManyMutationInput;
  where: PhotoScalarWhereInput;
};

export type PhotoUpdateManyWithWhereWithoutStoryInput = {
  data: PhotoUpdateManyMutationInput;
  where: PhotoScalarWhereInput;
};

export type PhotoUpdateWithoutGroupInput = {
  active?: InputMaybe<BoolFieldUpdateOperationsInput>;
  blurhash?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  height?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  position?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  Profile?: InputMaybe<ProfileUpdateOneWithoutPhotosInput>;
  ratio?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  Story?: InputMaybe<StoryUpdateOneWithoutPhotosInput>;
  type?: InputMaybe<NullableEnumPhotoTypeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  url?: InputMaybe<StringFieldUpdateOperationsInput>;
  width?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
};

export type PhotoUpdateWithoutProfileInput = {
  active?: InputMaybe<BoolFieldUpdateOperationsInput>;
  blurhash?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Group?: InputMaybe<GroupUpdateOneWithoutPhotosInput>;
  height?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  position?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  ratio?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  Story?: InputMaybe<StoryUpdateOneWithoutPhotosInput>;
  type?: InputMaybe<NullableEnumPhotoTypeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  url?: InputMaybe<StringFieldUpdateOperationsInput>;
  width?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
};

export type PhotoUpdateWithoutStoryInput = {
  active?: InputMaybe<BoolFieldUpdateOperationsInput>;
  blurhash?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Group?: InputMaybe<GroupUpdateOneWithoutPhotosInput>;
  height?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  position?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
  Profile?: InputMaybe<ProfileUpdateOneWithoutPhotosInput>;
  ratio?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  type?: InputMaybe<NullableEnumPhotoTypeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  url?: InputMaybe<StringFieldUpdateOperationsInput>;
  width?: InputMaybe<NullableIntFieldUpdateOperationsInput>;
};

export type PhotoUpdateWithWhereUniqueWithoutGroupInput = {
  data: PhotoUpdateWithoutGroupInput;
  where: PhotoWhereUniqueInput;
};

export type PhotoUpdateWithWhereUniqueWithoutProfileInput = {
  data: PhotoUpdateWithoutProfileInput;
  where: PhotoWhereUniqueInput;
};

export type PhotoUpdateWithWhereUniqueWithoutStoryInput = {
  data: PhotoUpdateWithoutStoryInput;
  where: PhotoWhereUniqueInput;
};

export type PhotoUpsertWithWhereUniqueWithoutGroupInput = {
  create: PhotoCreateWithoutGroupInput;
  update: PhotoUpdateWithoutGroupInput;
  where: PhotoWhereUniqueInput;
};

export type PhotoUpsertWithWhereUniqueWithoutProfileInput = {
  create: PhotoCreateWithoutProfileInput;
  update: PhotoUpdateWithoutProfileInput;
  where: PhotoWhereUniqueInput;
};

export type PhotoUpsertWithWhereUniqueWithoutStoryInput = {
  create: PhotoCreateWithoutStoryInput;
  update: PhotoUpdateWithoutStoryInput;
  where: PhotoWhereUniqueInput;
};

export type PhotoWhereInput = {
  active?: InputMaybe<BoolFilter>;
  AND?: InputMaybe<Array<PhotoWhereInput>>;
  blurhash?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  Group?: InputMaybe<GroupWhereInput>;
  groupId?: InputMaybe<StringNullableFilter>;
  height?: InputMaybe<IntNullableFilter>;
  id?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<PhotoWhereInput>>;
  OR?: InputMaybe<Array<PhotoWhereInput>>;
  position?: InputMaybe<IntNullableFilter>;
  Profile?: InputMaybe<ProfileWhereInput>;
  profileId?: InputMaybe<StringNullableFilter>;
  ratio?: InputMaybe<StringNullableFilter>;
  Story?: InputMaybe<StoryWhereInput>;
  storyId?: InputMaybe<StringNullableFilter>;
  type?: InputMaybe<EnumPhotoTypeNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  url?: InputMaybe<StringFilter>;
  width?: InputMaybe<IntNullableFilter>;
};

export type PhotoWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type PluseCode = {
  __typename?: 'PluseCode';
  compoundCode?: Maybe<Scalars['String']>;
  globalCode: Scalars['String'];
  id: Scalars['String'];
};

export type PluseCodeCreateNestedOneWithoutLocationInput = {
  connect?: InputMaybe<PluseCodeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PluseCodeCreateOrConnectWithoutLocationInput>;
  create?: InputMaybe<PluseCodeCreateWithoutLocationInput>;
};

export type PluseCodeCreateOrConnectWithoutLocationInput = {
  create: PluseCodeCreateWithoutLocationInput;
  where: PluseCodeWhereUniqueInput;
};

export type PluseCodeCreateWithoutLocationInput = {
  compoundCode?: InputMaybe<Scalars['String']>;
  globalCode: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
};

export type PluseCodeOrderByWithRelationInput = {
  compoundCode?: InputMaybe<SortOrder>;
  globalCode?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  Location?: InputMaybe<LocationOrderByWithRelationInput>;
};

export type PluseCodeUpdateOneWithoutLocationInput = {
  connect?: InputMaybe<PluseCodeWhereUniqueInput>;
  connectOrCreate?: InputMaybe<PluseCodeCreateOrConnectWithoutLocationInput>;
  create?: InputMaybe<PluseCodeCreateWithoutLocationInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<PluseCodeUpdateWithoutLocationInput>;
  upsert?: InputMaybe<PluseCodeUpsertWithoutLocationInput>;
};

export type PluseCodeUpdateWithoutLocationInput = {
  compoundCode?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  globalCode?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type PluseCodeUpsertWithoutLocationInput = {
  create: PluseCodeCreateWithoutLocationInput;
  update: PluseCodeUpdateWithoutLocationInput;
};

export type PluseCodeWhereInput = {
  AND?: InputMaybe<Array<PluseCodeWhereInput>>;
  compoundCode?: InputMaybe<StringNullableFilter>;
  globalCode?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  Location?: InputMaybe<LocationWhereInput>;
  NOT?: InputMaybe<Array<PluseCodeWhereInput>>;
  OR?: InputMaybe<Array<PluseCodeWhereInput>>;
};

export type PluseCodeWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type Profile = Node & {
  __typename?: 'Profile';
  createdAt: Scalars['DateTime'];
  Credentials?: Maybe<Credentials>;
  DetailInformation?: Maybe<DetailInformation>;
  id: Scalars['String'];
  IdentifiableInformation?: Maybe<IdentifiableInformation>;
  Personal?: Maybe<Personal>;
  photos: Array<Photo>;
  ProfileSearchesService?: Maybe<ProfileSearchesService>;
  ProfileType?: Maybe<ProfileType>;
  Relationships: Array<Relationship>;
  Story?: Maybe<Story>;
  updatedAt: Scalars['DateTime'];
  Venue?: Maybe<Venue>;
};


export type ProfilePhotosArgs = {
  after?: InputMaybe<PhotoWhereUniqueInput>;
  before?: InputMaybe<PhotoWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type ProfileRelationshipsArgs = {
  after?: InputMaybe<RelationshipWhereUniqueInput>;
  before?: InputMaybe<RelationshipWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type ProfileArgs = {
  email?: InputMaybe<Scalars['String']>;
  Phone?: InputMaybe<PhoneInput>;
  username?: InputMaybe<Scalars['String']>;
};

export type ProfileCreateDeviceManagerInput = {
  set?: InputMaybe<Array<Scalars['String']>>;
};

export type ProfileCreateManyChatroomInput = {
  bfsprofileid?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  DeviceManager?: InputMaybe<ProfileCreateManyDeviceManagerInput>;
  id?: InputMaybe<Scalars['String']>;
  ProfileType?: InputMaybe<ProfileType>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ProfileCreateManyChatroomInputEnvelope = {
  data?: InputMaybe<Array<ProfileCreateManyChatroomInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type ProfileCreateManyDeviceManagerInput = {
  set?: InputMaybe<Array<Scalars['String']>>;
};

export type ProfileCreateNestedManyWithoutChatroomInput = {
  connect?: InputMaybe<Array<ProfileWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ProfileCreateOrConnectWithoutChatroomInput>>;
  create?: InputMaybe<Array<ProfileCreateWithoutChatroomInput>>;
  createMany?: InputMaybe<ProfileCreateManyChatroomInputEnvelope>;
};

export type ProfileCreateNestedManyWithoutGroupInput = {
  connect?: InputMaybe<Array<ProfileWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ProfileCreateOrConnectWithoutGroupInput>>;
  create?: InputMaybe<Array<ProfileCreateWithoutGroupInput>>;
};

export type ProfileCreateNestedOneWithoutPersonalInput = {
  connect?: InputMaybe<ProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ProfileCreateOrConnectWithoutPersonalInput>;
  create?: InputMaybe<ProfileCreateWithoutPersonalInput>;
};

export type ProfileCreateNestedOneWithoutPhotosInput = {
  connect?: InputMaybe<ProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ProfileCreateOrConnectWithoutPhotosInput>;
  create?: InputMaybe<ProfileCreateWithoutPhotosInput>;
};

export type ProfileCreateNestedOneWithoutStoryInput = {
  connect?: InputMaybe<ProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ProfileCreateOrConnectWithoutStoryInput>;
  create?: InputMaybe<ProfileCreateWithoutStoryInput>;
};

export type ProfileCreateNestedOneWithoutVenueInput = {
  connect?: InputMaybe<ProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ProfileCreateOrConnectWithoutVenueInput>;
  create?: InputMaybe<ProfileCreateWithoutVenueInput>;
};

export type ProfileCreateOrConnectWithoutChatroomInput = {
  create: ProfileCreateWithoutChatroomInput;
  where: ProfileWhereUniqueInput;
};

export type ProfileCreateOrConnectWithoutGroupInput = {
  create: ProfileCreateWithoutGroupInput;
  where: ProfileWhereUniqueInput;
};

export type ProfileCreateOrConnectWithoutPersonalInput = {
  create: ProfileCreateWithoutPersonalInput;
  where: ProfileWhereUniqueInput;
};

export type ProfileCreateOrConnectWithoutPhotosInput = {
  create: ProfileCreateWithoutPhotosInput;
  where: ProfileWhereUniqueInput;
};

export type ProfileCreateOrConnectWithoutStoryInput = {
  create: ProfileCreateWithoutStoryInput;
  where: ProfileWhereUniqueInput;
};

export type ProfileCreateOrConnectWithoutVenueInput = {
  create: ProfileCreateWithoutVenueInput;
  where: ProfileWhereUniqueInput;
};

export type ProfileCreateWithoutChatroomInput = {
  bfsprofileid?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  Credentials?: InputMaybe<CredentialsCreateNestedOneWithoutProfileInput>;
  DetailInformation?: InputMaybe<DetailInformationCreateNestedOneWithoutProfileInput>;
  DeviceManager?: InputMaybe<ProfileCreateDeviceManagerInput>;
  Group?: InputMaybe<GroupCreateNestedManyWithoutProfileInput>;
  id?: InputMaybe<Scalars['String']>;
  IdentifiableInformation?: InputMaybe<IdentifiableInformationCreateNestedOneWithoutProfileInput>;
  Personal?: InputMaybe<PersonalCreateNestedOneWithoutProfileInput>;
  photos?: InputMaybe<PhotoCreateNestedManyWithoutProfileInput>;
  ProfileSearchesService?: InputMaybe<ProfileSearchesServiceCreateNestedOneWithoutProfileInput>;
  ProfileType?: InputMaybe<ProfileType>;
  Relationships?: InputMaybe<RelationshipCreateNestedManyWithoutProfileInput>;
  Story?: InputMaybe<StoryCreateNestedManyWithoutProfileInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  Venue?: InputMaybe<VenueCreateNestedOneWithoutProfileInput>;
};

export type ProfileCreateWithoutGroupInput = {
  bfsprofileid?: InputMaybe<Scalars['String']>;
  Chatroom?: InputMaybe<ChatroomCreateNestedOneWithoutProfilesInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  Credentials?: InputMaybe<CredentialsCreateNestedOneWithoutProfileInput>;
  DetailInformation?: InputMaybe<DetailInformationCreateNestedOneWithoutProfileInput>;
  DeviceManager?: InputMaybe<ProfileCreateDeviceManagerInput>;
  id?: InputMaybe<Scalars['String']>;
  IdentifiableInformation?: InputMaybe<IdentifiableInformationCreateNestedOneWithoutProfileInput>;
  Personal?: InputMaybe<PersonalCreateNestedOneWithoutProfileInput>;
  photos?: InputMaybe<PhotoCreateNestedManyWithoutProfileInput>;
  ProfileSearchesService?: InputMaybe<ProfileSearchesServiceCreateNestedOneWithoutProfileInput>;
  ProfileType?: InputMaybe<ProfileType>;
  Relationships?: InputMaybe<RelationshipCreateNestedManyWithoutProfileInput>;
  Story?: InputMaybe<StoryCreateNestedManyWithoutProfileInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  Venue?: InputMaybe<VenueCreateNestedOneWithoutProfileInput>;
};

export type ProfileCreateWithoutPersonalInput = {
  bfsprofileid?: InputMaybe<Scalars['String']>;
  Chatroom?: InputMaybe<ChatroomCreateNestedOneWithoutProfilesInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  Credentials?: InputMaybe<CredentialsCreateNestedOneWithoutProfileInput>;
  DetailInformation?: InputMaybe<DetailInformationCreateNestedOneWithoutProfileInput>;
  DeviceManager?: InputMaybe<ProfileCreateDeviceManagerInput>;
  Group?: InputMaybe<GroupCreateNestedManyWithoutProfileInput>;
  id?: InputMaybe<Scalars['String']>;
  IdentifiableInformation?: InputMaybe<IdentifiableInformationCreateNestedOneWithoutProfileInput>;
  photos?: InputMaybe<PhotoCreateNestedManyWithoutProfileInput>;
  ProfileSearchesService?: InputMaybe<ProfileSearchesServiceCreateNestedOneWithoutProfileInput>;
  ProfileType?: InputMaybe<ProfileType>;
  Relationships?: InputMaybe<RelationshipCreateNestedManyWithoutProfileInput>;
  Story?: InputMaybe<StoryCreateNestedManyWithoutProfileInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  Venue?: InputMaybe<VenueCreateNestedOneWithoutProfileInput>;
};

export type ProfileCreateWithoutPhotosInput = {
  bfsprofileid?: InputMaybe<Scalars['String']>;
  Chatroom?: InputMaybe<ChatroomCreateNestedOneWithoutProfilesInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  Credentials?: InputMaybe<CredentialsCreateNestedOneWithoutProfileInput>;
  DetailInformation?: InputMaybe<DetailInformationCreateNestedOneWithoutProfileInput>;
  DeviceManager?: InputMaybe<ProfileCreateDeviceManagerInput>;
  Group?: InputMaybe<GroupCreateNestedManyWithoutProfileInput>;
  id?: InputMaybe<Scalars['String']>;
  IdentifiableInformation?: InputMaybe<IdentifiableInformationCreateNestedOneWithoutProfileInput>;
  Personal?: InputMaybe<PersonalCreateNestedOneWithoutProfileInput>;
  ProfileSearchesService?: InputMaybe<ProfileSearchesServiceCreateNestedOneWithoutProfileInput>;
  ProfileType?: InputMaybe<ProfileType>;
  Relationships?: InputMaybe<RelationshipCreateNestedManyWithoutProfileInput>;
  Story?: InputMaybe<StoryCreateNestedManyWithoutProfileInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  Venue?: InputMaybe<VenueCreateNestedOneWithoutProfileInput>;
};

export type ProfileCreateWithoutStoryInput = {
  bfsprofileid?: InputMaybe<Scalars['String']>;
  Chatroom?: InputMaybe<ChatroomCreateNestedOneWithoutProfilesInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  Credentials?: InputMaybe<CredentialsCreateNestedOneWithoutProfileInput>;
  DetailInformation?: InputMaybe<DetailInformationCreateNestedOneWithoutProfileInput>;
  DeviceManager?: InputMaybe<ProfileCreateDeviceManagerInput>;
  Group?: InputMaybe<GroupCreateNestedManyWithoutProfileInput>;
  id?: InputMaybe<Scalars['String']>;
  IdentifiableInformation?: InputMaybe<IdentifiableInformationCreateNestedOneWithoutProfileInput>;
  Personal?: InputMaybe<PersonalCreateNestedOneWithoutProfileInput>;
  photos?: InputMaybe<PhotoCreateNestedManyWithoutProfileInput>;
  ProfileSearchesService?: InputMaybe<ProfileSearchesServiceCreateNestedOneWithoutProfileInput>;
  ProfileType?: InputMaybe<ProfileType>;
  Relationships?: InputMaybe<RelationshipCreateNestedManyWithoutProfileInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  Venue?: InputMaybe<VenueCreateNestedOneWithoutProfileInput>;
};

export type ProfileCreateWithoutVenueInput = {
  bfsprofileid?: InputMaybe<Scalars['String']>;
  Chatroom?: InputMaybe<ChatroomCreateNestedOneWithoutProfilesInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  Credentials?: InputMaybe<CredentialsCreateNestedOneWithoutProfileInput>;
  DetailInformation?: InputMaybe<DetailInformationCreateNestedOneWithoutProfileInput>;
  DeviceManager?: InputMaybe<ProfileCreateDeviceManagerInput>;
  Group?: InputMaybe<GroupCreateNestedManyWithoutProfileInput>;
  id?: InputMaybe<Scalars['String']>;
  IdentifiableInformation?: InputMaybe<IdentifiableInformationCreateNestedOneWithoutProfileInput>;
  Personal?: InputMaybe<PersonalCreateNestedOneWithoutProfileInput>;
  photos?: InputMaybe<PhotoCreateNestedManyWithoutProfileInput>;
  ProfileSearchesService?: InputMaybe<ProfileSearchesServiceCreateNestedOneWithoutProfileInput>;
  ProfileType?: InputMaybe<ProfileType>;
  Relationships?: InputMaybe<RelationshipCreateNestedManyWithoutProfileInput>;
  Story?: InputMaybe<StoryCreateNestedManyWithoutProfileInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ProfileListRelationFilter = {
  every?: InputMaybe<ProfileWhereInput>;
  none?: InputMaybe<ProfileWhereInput>;
  some?: InputMaybe<ProfileWhereInput>;
};

export type ProfileOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type ProfileOrderByWithRelationInput = {
  bfsprofileid?: InputMaybe<SortOrder>;
  Chatroom?: InputMaybe<ChatroomOrderByWithRelationInput>;
  chatroomId?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  Credentials?: InputMaybe<CredentialsOrderByWithRelationInput>;
  DetailInformation?: InputMaybe<DetailInformationOrderByWithRelationInput>;
  DeviceManager?: InputMaybe<SortOrder>;
  Group?: InputMaybe<GroupOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  IdentifiableInformation?: InputMaybe<IdentifiableInformationOrderByWithRelationInput>;
  Personal?: InputMaybe<PersonalOrderByWithRelationInput>;
  photos?: InputMaybe<PhotoOrderByRelationAggregateInput>;
  ProfileSearchesService?: InputMaybe<ProfileSearchesServiceOrderByWithRelationInput>;
  ProfileType?: InputMaybe<SortOrder>;
  Relationships?: InputMaybe<RelationshipOrderByRelationAggregateInput>;
  Story?: InputMaybe<StoryOrderByRelationAggregateInput>;
  updatedAt?: InputMaybe<SortOrder>;
  Venue?: InputMaybe<VenueOrderByWithRelationInput>;
};

export type Profiles = {
  __typename?: 'Profiles';
  Profiles?: Maybe<Array<Maybe<Profile>>>;
};

export type ProfileScalarWhereInput = {
  AND?: InputMaybe<Array<ProfileScalarWhereInput>>;
  bfsprofileid?: InputMaybe<StringFilter>;
  chatroomId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  DeviceManager?: InputMaybe<StringNullableListFilter>;
  id?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<ProfileScalarWhereInput>>;
  OR?: InputMaybe<Array<ProfileScalarWhereInput>>;
  ProfileType?: InputMaybe<EnumProfileTypeFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type ProfileSearchesService = {
  __typename?: 'ProfileSearchesService';
  id: Scalars['String'];
  searches: Array<Scalars['Json']>;
};

export type ProfileSearchesServiceCreateNestedOneWithoutProfileInput = {
  connect?: InputMaybe<ProfileSearchesServiceWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ProfileSearchesServiceCreateOrConnectWithoutProfileInput>;
  create?: InputMaybe<ProfileSearchesServiceCreateWithoutProfileInput>;
};

export type ProfileSearchesServiceCreateOrConnectWithoutProfileInput = {
  create: ProfileSearchesServiceCreateWithoutProfileInput;
  where: ProfileSearchesServiceWhereUniqueInput;
};

export type ProfileSearchesServiceCreatesearchesInput = {
  set?: InputMaybe<Array<Scalars['Json']>>;
};

export type ProfileSearchesServiceCreateWithoutProfileInput = {
  id?: InputMaybe<Scalars['String']>;
  searches?: InputMaybe<ProfileSearchesServiceCreatesearchesInput>;
};

export type ProfileSearchesServiceOrderByWithRelationInput = {
  id?: InputMaybe<SortOrder>;
  Profile?: InputMaybe<ProfileOrderByWithRelationInput>;
  profileId?: InputMaybe<SortOrder>;
  searches?: InputMaybe<SortOrder>;
};

export type ProfileSearchesServiceUpdateOneWithoutProfileInput = {
  connect?: InputMaybe<ProfileSearchesServiceWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ProfileSearchesServiceCreateOrConnectWithoutProfileInput>;
  create?: InputMaybe<ProfileSearchesServiceCreateWithoutProfileInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<ProfileSearchesServiceUpdateWithoutProfileInput>;
  upsert?: InputMaybe<ProfileSearchesServiceUpsertWithoutProfileInput>;
};

export type ProfileSearchesServiceUpdatesearchesInput = {
  push?: InputMaybe<Scalars['Json']>;
  set?: InputMaybe<Array<Scalars['Json']>>;
};

export type ProfileSearchesServiceUpdateWithoutProfileInput = {
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  searches?: InputMaybe<ProfileSearchesServiceUpdatesearchesInput>;
};

export type ProfileSearchesServiceUpsertWithoutProfileInput = {
  create: ProfileSearchesServiceCreateWithoutProfileInput;
  update: ProfileSearchesServiceUpdateWithoutProfileInput;
};

export type ProfileSearchesServiceWhereInput = {
  AND?: InputMaybe<Array<ProfileSearchesServiceWhereInput>>;
  id?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<ProfileSearchesServiceWhereInput>>;
  OR?: InputMaybe<Array<ProfileSearchesServiceWhereInput>>;
  Profile?: InputMaybe<ProfileWhereInput>;
  profileId?: InputMaybe<StringFilter>;
  searches?: InputMaybe<JsonNullableListFilter>;
};

export type ProfileSearchesServiceWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  profileId?: InputMaybe<Scalars['String']>;
};

export enum ProfileType {
  Guest = 'GUEST',
  Personal = 'PERSONAL',
  Venue = 'VENUE'
}

export type ProfileTypesResponse = {
  __typename?: 'ProfileTypesResponse';
  email?: Maybe<Array<Maybe<Profile>>>;
  phone?: Maybe<Array<Maybe<Profile>>>;
  username?: Maybe<Array<Maybe<Profile>>>;
};

export type ProfileUpdateDeviceManagerInput = {
  push?: InputMaybe<Scalars['String']>;
  set?: InputMaybe<Array<Scalars['String']>>;
};

export type ProfileUpdateInput = {
  bfsprofileid?: InputMaybe<StringFieldUpdateOperationsInput>;
  Chatroom?: InputMaybe<ChatroomUpdateOneWithoutProfilesInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Credentials?: InputMaybe<CredentialsUpdateOneWithoutProfileInput>;
  DetailInformation?: InputMaybe<DetailInformationUpdateOneWithoutProfileInput>;
  DeviceManager?: InputMaybe<ProfileUpdateDeviceManagerInput>;
  Group?: InputMaybe<GroupUpdateManyWithoutProfileInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  IdentifiableInformation?: InputMaybe<IdentifiableInformationUpdateOneWithoutProfileInput>;
  Personal?: InputMaybe<PersonalUpdateOneWithoutProfileInput>;
  photos?: InputMaybe<PhotoUpdateManyWithoutProfileInput>;
  ProfileSearchesService?: InputMaybe<ProfileSearchesServiceUpdateOneWithoutProfileInput>;
  ProfileType?: InputMaybe<EnumProfileTypeFieldUpdateOperationsInput>;
  Relationships?: InputMaybe<RelationshipUpdateManyWithoutProfileInput>;
  Story?: InputMaybe<StoryUpdateManyWithoutProfileInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Venue?: InputMaybe<VenueUpdateOneWithoutProfileInput>;
};

export type ProfileUpdateManyMutationInput = {
  bfsprofileid?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  DeviceManager?: InputMaybe<ProfileUpdateDeviceManagerInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  ProfileType?: InputMaybe<EnumProfileTypeFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type ProfileUpdateManyWithoutChatroomInput = {
  connect?: InputMaybe<Array<ProfileWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ProfileCreateOrConnectWithoutChatroomInput>>;
  create?: InputMaybe<Array<ProfileCreateWithoutChatroomInput>>;
  createMany?: InputMaybe<ProfileCreateManyChatroomInputEnvelope>;
  delete?: InputMaybe<Array<ProfileWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ProfileScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ProfileWhereUniqueInput>>;
  set?: InputMaybe<Array<ProfileWhereUniqueInput>>;
  update?: InputMaybe<Array<ProfileUpdateWithWhereUniqueWithoutChatroomInput>>;
  updateMany?: InputMaybe<Array<ProfileUpdateManyWithWhereWithoutChatroomInput>>;
  upsert?: InputMaybe<Array<ProfileUpsertWithWhereUniqueWithoutChatroomInput>>;
};

export type ProfileUpdateManyWithoutGroupInput = {
  connect?: InputMaybe<Array<ProfileWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<ProfileCreateOrConnectWithoutGroupInput>>;
  create?: InputMaybe<Array<ProfileCreateWithoutGroupInput>>;
  delete?: InputMaybe<Array<ProfileWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<ProfileScalarWhereInput>>;
  disconnect?: InputMaybe<Array<ProfileWhereUniqueInput>>;
  set?: InputMaybe<Array<ProfileWhereUniqueInput>>;
  update?: InputMaybe<Array<ProfileUpdateWithWhereUniqueWithoutGroupInput>>;
  updateMany?: InputMaybe<Array<ProfileUpdateManyWithWhereWithoutGroupInput>>;
  upsert?: InputMaybe<Array<ProfileUpsertWithWhereUniqueWithoutGroupInput>>;
};

export type ProfileUpdateManyWithWhereWithoutChatroomInput = {
  data: ProfileUpdateManyMutationInput;
  where: ProfileScalarWhereInput;
};

export type ProfileUpdateManyWithWhereWithoutGroupInput = {
  data: ProfileUpdateManyMutationInput;
  where: ProfileScalarWhereInput;
};

export type ProfileUpdateOneRequiredWithoutPersonalInput = {
  connect?: InputMaybe<ProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ProfileCreateOrConnectWithoutPersonalInput>;
  create?: InputMaybe<ProfileCreateWithoutPersonalInput>;
  update?: InputMaybe<ProfileUpdateWithoutPersonalInput>;
  upsert?: InputMaybe<ProfileUpsertWithoutPersonalInput>;
};

export type ProfileUpdateOneRequiredWithoutVenueInput = {
  connect?: InputMaybe<ProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ProfileCreateOrConnectWithoutVenueInput>;
  create?: InputMaybe<ProfileCreateWithoutVenueInput>;
  update?: InputMaybe<ProfileUpdateWithoutVenueInput>;
  upsert?: InputMaybe<ProfileUpsertWithoutVenueInput>;
};

export type ProfileUpdateOneWithoutPhotosInput = {
  connect?: InputMaybe<ProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ProfileCreateOrConnectWithoutPhotosInput>;
  create?: InputMaybe<ProfileCreateWithoutPhotosInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<ProfileUpdateWithoutPhotosInput>;
  upsert?: InputMaybe<ProfileUpsertWithoutPhotosInput>;
};

export type ProfileUpdateOneWithoutStoryInput = {
  connect?: InputMaybe<ProfileWhereUniqueInput>;
  connectOrCreate?: InputMaybe<ProfileCreateOrConnectWithoutStoryInput>;
  create?: InputMaybe<ProfileCreateWithoutStoryInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<ProfileUpdateWithoutStoryInput>;
  upsert?: InputMaybe<ProfileUpsertWithoutStoryInput>;
};

export type ProfileUpdateWithoutChatroomInput = {
  bfsprofileid?: InputMaybe<StringFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Credentials?: InputMaybe<CredentialsUpdateOneWithoutProfileInput>;
  DetailInformation?: InputMaybe<DetailInformationUpdateOneWithoutProfileInput>;
  DeviceManager?: InputMaybe<ProfileUpdateDeviceManagerInput>;
  Group?: InputMaybe<GroupUpdateManyWithoutProfileInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  IdentifiableInformation?: InputMaybe<IdentifiableInformationUpdateOneWithoutProfileInput>;
  Personal?: InputMaybe<PersonalUpdateOneWithoutProfileInput>;
  photos?: InputMaybe<PhotoUpdateManyWithoutProfileInput>;
  ProfileSearchesService?: InputMaybe<ProfileSearchesServiceUpdateOneWithoutProfileInput>;
  ProfileType?: InputMaybe<EnumProfileTypeFieldUpdateOperationsInput>;
  Relationships?: InputMaybe<RelationshipUpdateManyWithoutProfileInput>;
  Story?: InputMaybe<StoryUpdateManyWithoutProfileInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Venue?: InputMaybe<VenueUpdateOneWithoutProfileInput>;
};

export type ProfileUpdateWithoutGroupInput = {
  bfsprofileid?: InputMaybe<StringFieldUpdateOperationsInput>;
  Chatroom?: InputMaybe<ChatroomUpdateOneWithoutProfilesInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Credentials?: InputMaybe<CredentialsUpdateOneWithoutProfileInput>;
  DetailInformation?: InputMaybe<DetailInformationUpdateOneWithoutProfileInput>;
  DeviceManager?: InputMaybe<ProfileUpdateDeviceManagerInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  IdentifiableInformation?: InputMaybe<IdentifiableInformationUpdateOneWithoutProfileInput>;
  Personal?: InputMaybe<PersonalUpdateOneWithoutProfileInput>;
  photos?: InputMaybe<PhotoUpdateManyWithoutProfileInput>;
  ProfileSearchesService?: InputMaybe<ProfileSearchesServiceUpdateOneWithoutProfileInput>;
  ProfileType?: InputMaybe<EnumProfileTypeFieldUpdateOperationsInput>;
  Relationships?: InputMaybe<RelationshipUpdateManyWithoutProfileInput>;
  Story?: InputMaybe<StoryUpdateManyWithoutProfileInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Venue?: InputMaybe<VenueUpdateOneWithoutProfileInput>;
};

export type ProfileUpdateWithoutPersonalInput = {
  bfsprofileid?: InputMaybe<StringFieldUpdateOperationsInput>;
  Chatroom?: InputMaybe<ChatroomUpdateOneWithoutProfilesInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Credentials?: InputMaybe<CredentialsUpdateOneWithoutProfileInput>;
  DetailInformation?: InputMaybe<DetailInformationUpdateOneWithoutProfileInput>;
  DeviceManager?: InputMaybe<ProfileUpdateDeviceManagerInput>;
  Group?: InputMaybe<GroupUpdateManyWithoutProfileInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  IdentifiableInformation?: InputMaybe<IdentifiableInformationUpdateOneWithoutProfileInput>;
  photos?: InputMaybe<PhotoUpdateManyWithoutProfileInput>;
  ProfileSearchesService?: InputMaybe<ProfileSearchesServiceUpdateOneWithoutProfileInput>;
  ProfileType?: InputMaybe<EnumProfileTypeFieldUpdateOperationsInput>;
  Relationships?: InputMaybe<RelationshipUpdateManyWithoutProfileInput>;
  Story?: InputMaybe<StoryUpdateManyWithoutProfileInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Venue?: InputMaybe<VenueUpdateOneWithoutProfileInput>;
};

export type ProfileUpdateWithoutPhotosInput = {
  bfsprofileid?: InputMaybe<StringFieldUpdateOperationsInput>;
  Chatroom?: InputMaybe<ChatroomUpdateOneWithoutProfilesInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Credentials?: InputMaybe<CredentialsUpdateOneWithoutProfileInput>;
  DetailInformation?: InputMaybe<DetailInformationUpdateOneWithoutProfileInput>;
  DeviceManager?: InputMaybe<ProfileUpdateDeviceManagerInput>;
  Group?: InputMaybe<GroupUpdateManyWithoutProfileInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  IdentifiableInformation?: InputMaybe<IdentifiableInformationUpdateOneWithoutProfileInput>;
  Personal?: InputMaybe<PersonalUpdateOneWithoutProfileInput>;
  ProfileSearchesService?: InputMaybe<ProfileSearchesServiceUpdateOneWithoutProfileInput>;
  ProfileType?: InputMaybe<EnumProfileTypeFieldUpdateOperationsInput>;
  Relationships?: InputMaybe<RelationshipUpdateManyWithoutProfileInput>;
  Story?: InputMaybe<StoryUpdateManyWithoutProfileInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Venue?: InputMaybe<VenueUpdateOneWithoutProfileInput>;
};

export type ProfileUpdateWithoutStoryInput = {
  bfsprofileid?: InputMaybe<StringFieldUpdateOperationsInput>;
  Chatroom?: InputMaybe<ChatroomUpdateOneWithoutProfilesInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Credentials?: InputMaybe<CredentialsUpdateOneWithoutProfileInput>;
  DetailInformation?: InputMaybe<DetailInformationUpdateOneWithoutProfileInput>;
  DeviceManager?: InputMaybe<ProfileUpdateDeviceManagerInput>;
  Group?: InputMaybe<GroupUpdateManyWithoutProfileInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  IdentifiableInformation?: InputMaybe<IdentifiableInformationUpdateOneWithoutProfileInput>;
  Personal?: InputMaybe<PersonalUpdateOneWithoutProfileInput>;
  photos?: InputMaybe<PhotoUpdateManyWithoutProfileInput>;
  ProfileSearchesService?: InputMaybe<ProfileSearchesServiceUpdateOneWithoutProfileInput>;
  ProfileType?: InputMaybe<EnumProfileTypeFieldUpdateOperationsInput>;
  Relationships?: InputMaybe<RelationshipUpdateManyWithoutProfileInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Venue?: InputMaybe<VenueUpdateOneWithoutProfileInput>;
};

export type ProfileUpdateWithoutVenueInput = {
  bfsprofileid?: InputMaybe<StringFieldUpdateOperationsInput>;
  Chatroom?: InputMaybe<ChatroomUpdateOneWithoutProfilesInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Credentials?: InputMaybe<CredentialsUpdateOneWithoutProfileInput>;
  DetailInformation?: InputMaybe<DetailInformationUpdateOneWithoutProfileInput>;
  DeviceManager?: InputMaybe<ProfileUpdateDeviceManagerInput>;
  Group?: InputMaybe<GroupUpdateManyWithoutProfileInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  IdentifiableInformation?: InputMaybe<IdentifiableInformationUpdateOneWithoutProfileInput>;
  Personal?: InputMaybe<PersonalUpdateOneWithoutProfileInput>;
  photos?: InputMaybe<PhotoUpdateManyWithoutProfileInput>;
  ProfileSearchesService?: InputMaybe<ProfileSearchesServiceUpdateOneWithoutProfileInput>;
  ProfileType?: InputMaybe<EnumProfileTypeFieldUpdateOperationsInput>;
  Relationships?: InputMaybe<RelationshipUpdateManyWithoutProfileInput>;
  Story?: InputMaybe<StoryUpdateManyWithoutProfileInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type ProfileUpdateWithWhereUniqueWithoutChatroomInput = {
  data: ProfileUpdateWithoutChatroomInput;
  where: ProfileWhereUniqueInput;
};

export type ProfileUpdateWithWhereUniqueWithoutGroupInput = {
  data: ProfileUpdateWithoutGroupInput;
  where: ProfileWhereUniqueInput;
};

export type ProfileUpsertWithoutPersonalInput = {
  create: ProfileCreateWithoutPersonalInput;
  update: ProfileUpdateWithoutPersonalInput;
};

export type ProfileUpsertWithoutPhotosInput = {
  create: ProfileCreateWithoutPhotosInput;
  update: ProfileUpdateWithoutPhotosInput;
};

export type ProfileUpsertWithoutStoryInput = {
  create: ProfileCreateWithoutStoryInput;
  update: ProfileUpdateWithoutStoryInput;
};

export type ProfileUpsertWithoutVenueInput = {
  create: ProfileCreateWithoutVenueInput;
  update: ProfileUpdateWithoutVenueInput;
};

export type ProfileUpsertWithWhereUniqueWithoutChatroomInput = {
  create: ProfileCreateWithoutChatroomInput;
  update: ProfileUpdateWithoutChatroomInput;
  where: ProfileWhereUniqueInput;
};

export type ProfileUpsertWithWhereUniqueWithoutGroupInput = {
  create: ProfileCreateWithoutGroupInput;
  update: ProfileUpdateWithoutGroupInput;
  where: ProfileWhereUniqueInput;
};

export type ProfileWhereInput = {
  AND?: InputMaybe<Array<ProfileWhereInput>>;
  bfsprofileid?: InputMaybe<StringFilter>;
  Chatroom?: InputMaybe<ChatroomWhereInput>;
  chatroomId?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  Credentials?: InputMaybe<CredentialsWhereInput>;
  DetailInformation?: InputMaybe<DetailInformationWhereInput>;
  DeviceManager?: InputMaybe<StringNullableListFilter>;
  Group?: InputMaybe<GroupListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  IdentifiableInformation?: InputMaybe<IdentifiableInformationWhereInput>;
  NOT?: InputMaybe<Array<ProfileWhereInput>>;
  OR?: InputMaybe<Array<ProfileWhereInput>>;
  Personal?: InputMaybe<PersonalWhereInput>;
  photos?: InputMaybe<PhotoListRelationFilter>;
  ProfileSearchesService?: InputMaybe<ProfileSearchesServiceWhereInput>;
  ProfileType?: InputMaybe<EnumProfileTypeFilter>;
  Relationships?: InputMaybe<RelationshipListRelationFilter>;
  Story?: InputMaybe<StoryListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  Venue?: InputMaybe<VenueWhereInput>;
};

export type ProfileWhereUniqueInput = {
  bfsprofileid?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  authorizedProfiles?: Maybe<AuthorizedProfilesResponseUnion>;
  checkEmailAvailable?: Maybe<Scalars['Int']>;
  checkPhoneNumberAvailable?: Maybe<Scalars['Int']>;
  checkUsername?: Maybe<Scalars['Boolean']>;
  device?: Maybe<Device>;
  documents: Array<Document>;
  Emails: Array<Email>;
  emojimood?: Maybe<Emojimood>;
  emojimoods: Array<Emojimood>;
  getADeviceManager?: Maybe<DeviceManagerDeviceProfilesResponseUnion>;
  getAllCitiesByState?: Maybe<Array<Maybe<Scalars['Json']>>>;
  getAllCountries?: Maybe<Array<Maybe<Scalars['Json']>>>;
  getAllStatesByCountry?: Maybe<Array<Maybe<Scalars['Json']>>>;
  getLiveVenueTotals?: Maybe<LiveVenueTotals>;
  H3IndexGrid?: Maybe<Array<Maybe<Scalars['String']>>>;
  H3IndexLatLng?: Maybe<Array<Maybe<Scalars['Float']>>>;
  IdentifiableInformations: Array<IdentifiableInformation>;
  loginPassword?: Maybe<Scalars['Boolean']>;
  Personals: Array<Personal>;
  Phones: Array<Phone>;
  profile?: Maybe<Profile>;
  profiles: Array<Profile>;
  searchAddressGoogleAutocomplete?: Maybe<GooglePlaceAutocompleteReturn>;
  searchAreaCity?: Maybe<Scalars['Json']>;
  sendDynamicTempalteDataEmail?: Maybe<Scalars['Boolean']>;
  story?: Maybe<Story>;
  venue?: Maybe<Venue>;
  venues: Array<Venue>;
  venuesNearby?: Maybe<Array<Maybe<Profile>>>;
};


export type QueryAuthorizedProfilesArgs = {
  where?: InputMaybe<AuthorizedProfilesWhereInput>;
};


export type QueryCheckEmailAvailableArgs = {
  email?: InputMaybe<Scalars['String']>;
};


export type QueryCheckPhoneNumberAvailableArgs = {
  number?: InputMaybe<Scalars['String']>;
};


export type QueryCheckUsernameArgs = {
  username: Scalars['String'];
};


export type QueryDeviceArgs = {
  where: DeviceWhereUniqueInput;
};


export type QueryDocumentsArgs = {
  after?: InputMaybe<DocumentWhereUniqueInput>;
  before?: InputMaybe<DocumentWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<DocumentOrderByWithRelationInput>>;
  where?: InputMaybe<DocumentWhereInput>;
};


export type QueryEmailsArgs = {
  after?: InputMaybe<EmailWhereUniqueInput>;
  before?: InputMaybe<EmailWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<EmailWhereInput>;
};


export type QueryEmojimoodArgs = {
  where: EmojimoodWhereUniqueInput;
};


export type QueryEmojimoodsArgs = {
  after?: InputMaybe<EmojimoodWhereUniqueInput>;
  before?: InputMaybe<EmojimoodWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<EmojimoodOrderByWithRelationInput>>;
  where?: InputMaybe<EmojimoodWhereInput>;
};


export type QueryGetAllCitiesByStateArgs = {
  country: Scalars['String'];
  state: Scalars['String'];
};


export type QueryGetAllStatesByCountryArgs = {
  country: Scalars['String'];
};


export type QueryGetLiveVenueTotalsArgs = {
  profileIdVenue: Scalars['String'];
};


export type QueryH3IndexGridArgs = {
  cell: Scalars['String'];
  ringSize?: InputMaybe<Scalars['Int']>;
};


export type QueryH3IndexLatLngArgs = {
  cell: Scalars['String'];
};


export type QueryIdentifiableInformationsArgs = {
  after?: InputMaybe<IdentifiableInformationWhereUniqueInput>;
  before?: InputMaybe<IdentifiableInformationWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<IdentifiableInformationWhereInput>;
};


export type QueryLoginPasswordArgs = {
  password: Scalars['String'];
  username: Scalars['String'];
};


export type QueryPersonalsArgs = {
  after?: InputMaybe<PersonalWhereUniqueInput>;
  before?: InputMaybe<PersonalWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PersonalWhereInput>;
};


export type QueryPhonesArgs = {
  after?: InputMaybe<PhoneWhereUniqueInput>;
  before?: InputMaybe<PhoneWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PhoneWhereInput>;
};


export type QueryProfileArgs = {
  where: ProfileWhereUniqueInput;
};


export type QueryProfilesArgs = {
  after?: InputMaybe<ProfileWhereUniqueInput>;
  before?: InputMaybe<ProfileWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<ProfileOrderByWithRelationInput>>;
  where?: InputMaybe<ProfileWhereInput>;
};


export type QuerySearchAddressGoogleAutocompleteArgs = {
  where: GooglePlaceAutocompleteInput;
};


export type QuerySearchAreaCityArgs = {
  country: Scalars['String'];
  search: Scalars['String'];
};


export type QueryStoryArgs = {
  where: StoryWhereUniqueInput;
};


export type QueryVenueArgs = {
  where: VenueWhereUniqueInput;
};


export type QueryVenuesArgs = {
  after?: InputMaybe<VenueWhereUniqueInput>;
  before?: InputMaybe<VenueWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<VenueOrderByWithRelationInput>>;
  where?: InputMaybe<VenueWhereInput>;
};


export type QueryVenuesNearbyArgs = {
  kRing?: InputMaybe<Scalars['Int']>;
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export type RefreshDeviceManagerResponseUnion = DeviceManager | Error | Success;

export type RefreshTokenCreateNestedOneWithoutDeviceProfileInput = {
  connect?: InputMaybe<RefreshTokenWhereUniqueInput>;
  connectOrCreate?: InputMaybe<RefreshTokenCreateOrConnectWithoutDeviceProfileInput>;
  create?: InputMaybe<RefreshTokenCreateWithoutDeviceProfileInput>;
};

export type RefreshTokenCreateOrConnectWithoutDeviceProfileInput = {
  create: RefreshTokenCreateWithoutDeviceProfileInput;
  where: RefreshTokenWhereUniqueInput;
};

export type RefreshTokenCreateWithoutDeviceProfileInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  token: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type RefreshTokenWhereUniqueInput = {
  DeviceProfileId?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['Int']>;
  token?: InputMaybe<Scalars['String']>;
};

export type Relationship = {
  __typename?: 'Relationship';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  Profile?: Maybe<Profile>;
  status: Array<Status>;
  updatedAt: Scalars['DateTime'];
  venueMetAt?: Maybe<Scalars['String']>;
};

export type RelationshipCreateManyProfileInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  friend: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<RelationshipCreateManystatusInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  venueMetAt?: InputMaybe<Scalars['String']>;
};

export type RelationshipCreateManyProfileInputEnvelope = {
  data?: InputMaybe<Array<RelationshipCreateManyProfileInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type RelationshipCreateManystatusInput = {
  set?: InputMaybe<Array<Status>>;
};

export type RelationshipCreateNestedManyWithoutProfileInput = {
  connect?: InputMaybe<Array<RelationshipWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<RelationshipCreateOrConnectWithoutProfileInput>>;
  create?: InputMaybe<Array<RelationshipCreateWithoutProfileInput>>;
  createMany?: InputMaybe<RelationshipCreateManyProfileInputEnvelope>;
};

export type RelationshipCreateOrConnectWithoutProfileInput = {
  create: RelationshipCreateWithoutProfileInput;
  where: RelationshipWhereUniqueInput;
};

export type RelationshipCreatestatusInput = {
  set?: InputMaybe<Array<Status>>;
};

export type RelationshipCreateWithoutProfileInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  friend: Scalars['String'];
  id?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<RelationshipCreatestatusInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  venueMetAt?: InputMaybe<Scalars['String']>;
};

export type RelationshipListRelationFilter = {
  every?: InputMaybe<RelationshipWhereInput>;
  none?: InputMaybe<RelationshipWhereInput>;
  some?: InputMaybe<RelationshipWhereInput>;
};

export type RelationshipOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type RelationshipScalarWhereInput = {
  AND?: InputMaybe<Array<RelationshipScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  friend?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<RelationshipScalarWhereInput>>;
  OR?: InputMaybe<Array<RelationshipScalarWhereInput>>;
  profileId?: InputMaybe<StringNullableFilter>;
  status?: InputMaybe<EnumStatusNullableListFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  venueMetAt?: InputMaybe<StringNullableFilter>;
};

export type RelationshipUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  friend?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  status?: InputMaybe<RelationshipUpdatestatusInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  venueMetAt?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type RelationshipUpdateManyWithoutProfileInput = {
  connect?: InputMaybe<Array<RelationshipWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<RelationshipCreateOrConnectWithoutProfileInput>>;
  create?: InputMaybe<Array<RelationshipCreateWithoutProfileInput>>;
  createMany?: InputMaybe<RelationshipCreateManyProfileInputEnvelope>;
  delete?: InputMaybe<Array<RelationshipWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<RelationshipScalarWhereInput>>;
  disconnect?: InputMaybe<Array<RelationshipWhereUniqueInput>>;
  set?: InputMaybe<Array<RelationshipWhereUniqueInput>>;
  update?: InputMaybe<Array<RelationshipUpdateWithWhereUniqueWithoutProfileInput>>;
  updateMany?: InputMaybe<Array<RelationshipUpdateManyWithWhereWithoutProfileInput>>;
  upsert?: InputMaybe<Array<RelationshipUpsertWithWhereUniqueWithoutProfileInput>>;
};

export type RelationshipUpdateManyWithWhereWithoutProfileInput = {
  data: RelationshipUpdateManyMutationInput;
  where: RelationshipScalarWhereInput;
};

export type RelationshipUpdatestatusInput = {
  push?: InputMaybe<Status>;
  set?: InputMaybe<Array<Status>>;
};

export type RelationshipUpdateWithoutProfileInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  friend?: InputMaybe<StringFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  status?: InputMaybe<RelationshipUpdatestatusInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  venueMetAt?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
};

export type RelationshipUpdateWithWhereUniqueWithoutProfileInput = {
  data: RelationshipUpdateWithoutProfileInput;
  where: RelationshipWhereUniqueInput;
};

export type RelationshipUpsertWithWhereUniqueWithoutProfileInput = {
  create: RelationshipCreateWithoutProfileInput;
  update: RelationshipUpdateWithoutProfileInput;
  where: RelationshipWhereUniqueInput;
};

export type RelationshipWhereInput = {
  AND?: InputMaybe<Array<RelationshipWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  friend?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<RelationshipWhereInput>>;
  OR?: InputMaybe<Array<RelationshipWhereInput>>;
  Profile?: InputMaybe<ProfileWhereInput>;
  profileId?: InputMaybe<StringNullableFilter>;
  status?: InputMaybe<EnumStatusNullableListFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  venueMetAt?: InputMaybe<StringNullableFilter>;
};

export type RelationshipWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export enum Status {
  Dating = 'DATING',
  Friends = 'FRIENDS'
}

export type Story = {
  __typename?: 'Story';
  createdAt: Scalars['DateTime'];
  emojimood: Array<Emojimood>;
  id: Scalars['String'];
  photos: Array<Photo>;
  updatedAt: Scalars['DateTime'];
};


export type StoryEmojimoodArgs = {
  after?: InputMaybe<EmojimoodWhereUniqueInput>;
  before?: InputMaybe<EmojimoodWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type StoryPhotosArgs = {
  after?: InputMaybe<PhotoWhereUniqueInput>;
  before?: InputMaybe<PhotoWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type StoryCreateManyProfileInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  date: Scalars['DateTime'];
  id?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type StoryCreateManyProfileInputEnvelope = {
  data?: InputMaybe<Array<StoryCreateManyProfileInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type StoryCreateNestedManyWithoutProfileInput = {
  connect?: InputMaybe<Array<StoryWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<StoryCreateOrConnectWithoutProfileInput>>;
  create?: InputMaybe<Array<StoryCreateWithoutProfileInput>>;
  createMany?: InputMaybe<StoryCreateManyProfileInputEnvelope>;
};

export type StoryCreateNestedOneWithoutPhotosInput = {
  connect?: InputMaybe<StoryWhereUniqueInput>;
  connectOrCreate?: InputMaybe<StoryCreateOrConnectWithoutPhotosInput>;
  create?: InputMaybe<StoryCreateWithoutPhotosInput>;
};

export type StoryCreateOrConnectWithoutPhotosInput = {
  create: StoryCreateWithoutPhotosInput;
  where: StoryWhereUniqueInput;
};

export type StoryCreateOrConnectWithoutProfileInput = {
  create: StoryCreateWithoutProfileInput;
  where: StoryWhereUniqueInput;
};

export type StoryCreateWithoutPhotosInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  date: Scalars['DateTime'];
  emojimood?: InputMaybe<EmojimoodCreateNestedManyWithoutStoryInput>;
  id?: InputMaybe<Scalars['String']>;
  Profile?: InputMaybe<ProfileCreateNestedOneWithoutStoryInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type StoryCreateWithoutProfileInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  date: Scalars['DateTime'];
  emojimood?: InputMaybe<EmojimoodCreateNestedManyWithoutStoryInput>;
  id?: InputMaybe<Scalars['String']>;
  photos?: InputMaybe<PhotoCreateNestedManyWithoutStoryInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type StoryListRelationFilter = {
  every?: InputMaybe<StoryWhereInput>;
  none?: InputMaybe<StoryWhereInput>;
  some?: InputMaybe<StoryWhereInput>;
};

export type StoryOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type StoryScalarWhereInput = {
  AND?: InputMaybe<Array<StoryScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  date?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<StoryScalarWhereInput>>;
  OR?: InputMaybe<Array<StoryScalarWhereInput>>;
  profileId?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type StoryUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  date?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type StoryUpdateManyWithoutProfileInput = {
  connect?: InputMaybe<Array<StoryWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<StoryCreateOrConnectWithoutProfileInput>>;
  create?: InputMaybe<Array<StoryCreateWithoutProfileInput>>;
  createMany?: InputMaybe<StoryCreateManyProfileInputEnvelope>;
  delete?: InputMaybe<Array<StoryWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<StoryScalarWhereInput>>;
  disconnect?: InputMaybe<Array<StoryWhereUniqueInput>>;
  set?: InputMaybe<Array<StoryWhereUniqueInput>>;
  update?: InputMaybe<Array<StoryUpdateWithWhereUniqueWithoutProfileInput>>;
  updateMany?: InputMaybe<Array<StoryUpdateManyWithWhereWithoutProfileInput>>;
  upsert?: InputMaybe<Array<StoryUpsertWithWhereUniqueWithoutProfileInput>>;
};

export type StoryUpdateManyWithWhereWithoutProfileInput = {
  data: StoryUpdateManyMutationInput;
  where: StoryScalarWhereInput;
};

export type StoryUpdateOneWithoutPhotosInput = {
  connect?: InputMaybe<StoryWhereUniqueInput>;
  connectOrCreate?: InputMaybe<StoryCreateOrConnectWithoutPhotosInput>;
  create?: InputMaybe<StoryCreateWithoutPhotosInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<StoryUpdateWithoutPhotosInput>;
  upsert?: InputMaybe<StoryUpsertWithoutPhotosInput>;
};

export type StoryUpdateWithoutPhotosInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  date?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  emojimood?: InputMaybe<EmojimoodUpdateManyWithoutStoryInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  Profile?: InputMaybe<ProfileUpdateOneWithoutStoryInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type StoryUpdateWithoutProfileInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  date?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  emojimood?: InputMaybe<EmojimoodUpdateManyWithoutStoryInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  photos?: InputMaybe<PhotoUpdateManyWithoutStoryInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type StoryUpdateWithWhereUniqueWithoutProfileInput = {
  data: StoryUpdateWithoutProfileInput;
  where: StoryWhereUniqueInput;
};

export type StoryUpsertWithoutPhotosInput = {
  create: StoryCreateWithoutPhotosInput;
  update: StoryUpdateWithoutPhotosInput;
};

export type StoryUpsertWithWhereUniqueWithoutProfileInput = {
  create: StoryCreateWithoutProfileInput;
  update: StoryUpdateWithoutProfileInput;
  where: StoryWhereUniqueInput;
};

export type StoryWhereInput = {
  AND?: InputMaybe<Array<StoryWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  date?: InputMaybe<DateTimeFilter>;
  emojimood?: InputMaybe<EmojimoodListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<StoryWhereInput>>;
  OR?: InputMaybe<Array<StoryWhereInput>>;
  photos?: InputMaybe<PhotoListRelationFilter>;
  Profile?: InputMaybe<ProfileWhereInput>;
  profileId?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type StoryWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type StringFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['String']>;
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type StringNullableListFilter = {
  equals?: InputMaybe<Array<Scalars['String']>>;
  has?: InputMaybe<Scalars['String']>;
  hasEvery?: InputMaybe<Array<Scalars['String']>>;
  hasSome?: InputMaybe<Array<Scalars['String']>>;
  isEmpty?: InputMaybe<Scalars['Boolean']>;
};

export type Success = {
  __typename?: 'Success';
  message?: Maybe<Scalars['String']>;
  successCode?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type SwitchLoginResponse = {
  __typename?: 'SwitchLoginResponse';
  authorization?: Maybe<Scalars['String']>;
  Profile?: Maybe<Profile>;
  refreshToken?: Maybe<Scalars['String']>;
};

export type Tag = {
  __typename?: 'Tag';
  emoji?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  name: Scalars['String'];
};

export type TagCreateNestedManyWithoutDetailInformationInput = {
  connect?: InputMaybe<Array<TagWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<TagCreateOrConnectWithoutDetailInformationInput>>;
  create?: InputMaybe<Array<TagCreateWithoutDetailInformationInput>>;
};

export type TagCreateOrConnectWithoutDetailInformationInput = {
  create: TagCreateWithoutDetailInformationInput;
  where: TagWhereUniqueInput;
};

export type TagCreateWithoutDetailInformationInput = {
  emoji?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  type: TagType;
};

export type TagListRelationFilter = {
  every?: InputMaybe<TagWhereInput>;
  none?: InputMaybe<TagWhereInput>;
  some?: InputMaybe<TagWhereInput>;
};

export type TagOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type TagScalarWhereInput = {
  AND?: InputMaybe<Array<TagScalarWhereInput>>;
  emoji?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<TagScalarWhereInput>>;
  OR?: InputMaybe<Array<TagScalarWhereInput>>;
  type?: InputMaybe<EnumTagTypeFilter>;
};

export enum TagType {
  Activity = 'ACTIVITY',
  Type = 'TYPE'
}

export type TagUpdateManyMutationInput = {
  emoji?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  type?: InputMaybe<EnumTagTypeFieldUpdateOperationsInput>;
};

export type TagUpdateManyWithoutDetailInformationInput = {
  connect?: InputMaybe<Array<TagWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<TagCreateOrConnectWithoutDetailInformationInput>>;
  create?: InputMaybe<Array<TagCreateWithoutDetailInformationInput>>;
  delete?: InputMaybe<Array<TagWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<TagScalarWhereInput>>;
  disconnect?: InputMaybe<Array<TagWhereUniqueInput>>;
  set?: InputMaybe<Array<TagWhereUniqueInput>>;
  update?: InputMaybe<Array<TagUpdateWithWhereUniqueWithoutDetailInformationInput>>;
  updateMany?: InputMaybe<Array<TagUpdateManyWithWhereWithoutDetailInformationInput>>;
  upsert?: InputMaybe<Array<TagUpsertWithWhereUniqueWithoutDetailInformationInput>>;
};

export type TagUpdateManyWithWhereWithoutDetailInformationInput = {
  data: TagUpdateManyMutationInput;
  where: TagScalarWhereInput;
};

export type TagUpdateWithoutDetailInformationInput = {
  emoji?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  name?: InputMaybe<StringFieldUpdateOperationsInput>;
  type?: InputMaybe<EnumTagTypeFieldUpdateOperationsInput>;
};

export type TagUpdateWithWhereUniqueWithoutDetailInformationInput = {
  data: TagUpdateWithoutDetailInformationInput;
  where: TagWhereUniqueInput;
};

export type TagUpsertWithWhereUniqueWithoutDetailInformationInput = {
  create: TagCreateWithoutDetailInformationInput;
  update: TagUpdateWithoutDetailInformationInput;
  where: TagWhereUniqueInput;
};

export type TagWhereInput = {
  AND?: InputMaybe<Array<TagWhereInput>>;
  DetailInformation?: InputMaybe<DetailInformationListRelationFilter>;
  emoji?: InputMaybe<StringNullableFilter>;
  id?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<TagWhereInput>>;
  OR?: InputMaybe<Array<TagWhereInput>>;
  type?: InputMaybe<EnumTagTypeFilter>;
};

export type TagWhereUniqueInput = {
  id?: InputMaybe<Scalars['Int']>;
};

export type TotaledOut = {
  __typename?: 'TotaledOut';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  LiveOutPersonal?: Maybe<LiveOutPersonal>;
  liveOutPersonalId?: Maybe<Scalars['String']>;
  LiveOutVenue?: Maybe<LiveOutVenue>;
  liveOutVenueId?: Maybe<Scalars['String']>;
  personalProfileId: Scalars['String'];
  PersonalStats?: Maybe<PersonalStats>;
  personalStatsId?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  venueProfileId: Scalars['String'];
  VenueStats?: Maybe<VenueStats>;
  venueStatsId?: Maybe<Scalars['String']>;
};

export type TotaledOutCreateManyLiveOutPersonalInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  leftAt?: InputMaybe<Scalars['DateTime']>;
  liveOutVenueId?: InputMaybe<Scalars['String']>;
  personalProfileId: Scalars['String'];
  personalStatsId?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  venueProfileId: Scalars['String'];
  venueStatsId?: InputMaybe<Scalars['String']>;
};

export type TotaledOutCreateManyLiveOutPersonalInputEnvelope = {
  data?: InputMaybe<Array<TotaledOutCreateManyLiveOutPersonalInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type TotaledOutCreateManyLiveOutVenueInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  leftAt?: InputMaybe<Scalars['DateTime']>;
  liveOutPersonalId?: InputMaybe<Scalars['String']>;
  personalProfileId: Scalars['String'];
  personalStatsId?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  venueProfileId: Scalars['String'];
  venueStatsId?: InputMaybe<Scalars['String']>;
};

export type TotaledOutCreateManyLiveOutVenueInputEnvelope = {
  data?: InputMaybe<Array<TotaledOutCreateManyLiveOutVenueInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type TotaledOutCreateManyPersonalStatsInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  leftAt?: InputMaybe<Scalars['DateTime']>;
  liveOutPersonalId?: InputMaybe<Scalars['String']>;
  liveOutVenueId?: InputMaybe<Scalars['String']>;
  personalProfileId: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  venueProfileId: Scalars['String'];
  venueStatsId?: InputMaybe<Scalars['String']>;
};

export type TotaledOutCreateManyPersonalStatsInputEnvelope = {
  data?: InputMaybe<Array<TotaledOutCreateManyPersonalStatsInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type TotaledOutCreateManyVenueStatsInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  leftAt?: InputMaybe<Scalars['DateTime']>;
  liveOutPersonalId?: InputMaybe<Scalars['String']>;
  liveOutVenueId?: InputMaybe<Scalars['String']>;
  personalProfileId: Scalars['String'];
  personalStatsId?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  venueProfileId: Scalars['String'];
};

export type TotaledOutCreateManyVenueStatsInputEnvelope = {
  data?: InputMaybe<Array<TotaledOutCreateManyVenueStatsInput>>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type TotaledOutCreateNestedManyWithoutLiveOutPersonalInput = {
  connect?: InputMaybe<Array<TotaledOutWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<TotaledOutCreateOrConnectWithoutLiveOutPersonalInput>>;
  create?: InputMaybe<Array<TotaledOutCreateWithoutLiveOutPersonalInput>>;
  createMany?: InputMaybe<TotaledOutCreateManyLiveOutPersonalInputEnvelope>;
};

export type TotaledOutCreateNestedManyWithoutLiveOutVenueInput = {
  connect?: InputMaybe<Array<TotaledOutWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<TotaledOutCreateOrConnectWithoutLiveOutVenueInput>>;
  create?: InputMaybe<Array<TotaledOutCreateWithoutLiveOutVenueInput>>;
  createMany?: InputMaybe<TotaledOutCreateManyLiveOutVenueInputEnvelope>;
};

export type TotaledOutCreateNestedManyWithoutPersonalStatsInput = {
  connect?: InputMaybe<Array<TotaledOutWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<TotaledOutCreateOrConnectWithoutPersonalStatsInput>>;
  create?: InputMaybe<Array<TotaledOutCreateWithoutPersonalStatsInput>>;
  createMany?: InputMaybe<TotaledOutCreateManyPersonalStatsInputEnvelope>;
};

export type TotaledOutCreateNestedManyWithoutVenueStatsInput = {
  connect?: InputMaybe<Array<TotaledOutWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<TotaledOutCreateOrConnectWithoutVenueStatsInput>>;
  create?: InputMaybe<Array<TotaledOutCreateWithoutVenueStatsInput>>;
  createMany?: InputMaybe<TotaledOutCreateManyVenueStatsInputEnvelope>;
};

export type TotaledOutCreateOrConnectWithoutLiveOutPersonalInput = {
  create: TotaledOutCreateWithoutLiveOutPersonalInput;
  where: TotaledOutWhereUniqueInput;
};

export type TotaledOutCreateOrConnectWithoutLiveOutVenueInput = {
  create: TotaledOutCreateWithoutLiveOutVenueInput;
  where: TotaledOutWhereUniqueInput;
};

export type TotaledOutCreateOrConnectWithoutPersonalStatsInput = {
  create: TotaledOutCreateWithoutPersonalStatsInput;
  where: TotaledOutWhereUniqueInput;
};

export type TotaledOutCreateOrConnectWithoutVenueStatsInput = {
  create: TotaledOutCreateWithoutVenueStatsInput;
  where: TotaledOutWhereUniqueInput;
};

export type TotaledOutCreateWithoutLiveOutPersonalInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  leftAt?: InputMaybe<Scalars['DateTime']>;
  LiveOutVenue?: InputMaybe<LiveOutVenueCreateNestedOneWithoutTotaledInput>;
  personalProfileId: Scalars['String'];
  PersonalStats?: InputMaybe<PersonalStatsCreateNestedOneWithoutTotaledVenueHistoryInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  venueProfileId: Scalars['String'];
  VenueStats?: InputMaybe<VenueStatsCreateNestedOneWithoutTotaledVenueHistoryInput>;
};

export type TotaledOutCreateWithoutLiveOutVenueInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  leftAt?: InputMaybe<Scalars['DateTime']>;
  LiveOutPersonal?: InputMaybe<LiveOutPersonalCreateNestedOneWithoutTotaledInput>;
  personalProfileId: Scalars['String'];
  PersonalStats?: InputMaybe<PersonalStatsCreateNestedOneWithoutTotaledVenueHistoryInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  venueProfileId: Scalars['String'];
  VenueStats?: InputMaybe<VenueStatsCreateNestedOneWithoutTotaledVenueHistoryInput>;
};

export type TotaledOutCreateWithoutPersonalStatsInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  leftAt?: InputMaybe<Scalars['DateTime']>;
  LiveOutPersonal?: InputMaybe<LiveOutPersonalCreateNestedOneWithoutTotaledInput>;
  LiveOutVenue?: InputMaybe<LiveOutVenueCreateNestedOneWithoutTotaledInput>;
  personalProfileId: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  venueProfileId: Scalars['String'];
  VenueStats?: InputMaybe<VenueStatsCreateNestedOneWithoutTotaledVenueHistoryInput>;
};

export type TotaledOutCreateWithoutVenueStatsInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  leftAt?: InputMaybe<Scalars['DateTime']>;
  LiveOutPersonal?: InputMaybe<LiveOutPersonalCreateNestedOneWithoutTotaledInput>;
  LiveOutVenue?: InputMaybe<LiveOutVenueCreateNestedOneWithoutTotaledInput>;
  personalProfileId: Scalars['String'];
  PersonalStats?: InputMaybe<PersonalStatsCreateNestedOneWithoutTotaledVenueHistoryInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  venueProfileId: Scalars['String'];
};

export type TotaledOutListRelationFilter = {
  every?: InputMaybe<TotaledOutWhereInput>;
  none?: InputMaybe<TotaledOutWhereInput>;
  some?: InputMaybe<TotaledOutWhereInput>;
};

export type TotaledOutOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type TotaledOutScalarWhereInput = {
  AND?: InputMaybe<Array<TotaledOutScalarWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  leftAt?: InputMaybe<DateTimeNullableFilter>;
  liveOutPersonalId?: InputMaybe<StringNullableFilter>;
  liveOutVenueId?: InputMaybe<StringNullableFilter>;
  NOT?: InputMaybe<Array<TotaledOutScalarWhereInput>>;
  OR?: InputMaybe<Array<TotaledOutScalarWhereInput>>;
  personalProfileId?: InputMaybe<StringFilter>;
  personalStatsId?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  venueProfileId?: InputMaybe<StringFilter>;
  venueStatsId?: InputMaybe<StringNullableFilter>;
};

export type TotaledOutUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  leftAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  personalProfileId?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  venueProfileId?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type TotaledOutUpdateManyWithoutLiveOutPersonalInput = {
  connect?: InputMaybe<Array<TotaledOutWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<TotaledOutCreateOrConnectWithoutLiveOutPersonalInput>>;
  create?: InputMaybe<Array<TotaledOutCreateWithoutLiveOutPersonalInput>>;
  createMany?: InputMaybe<TotaledOutCreateManyLiveOutPersonalInputEnvelope>;
  delete?: InputMaybe<Array<TotaledOutWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<TotaledOutScalarWhereInput>>;
  disconnect?: InputMaybe<Array<TotaledOutWhereUniqueInput>>;
  set?: InputMaybe<Array<TotaledOutWhereUniqueInput>>;
  update?: InputMaybe<Array<TotaledOutUpdateWithWhereUniqueWithoutLiveOutPersonalInput>>;
  updateMany?: InputMaybe<Array<TotaledOutUpdateManyWithWhereWithoutLiveOutPersonalInput>>;
  upsert?: InputMaybe<Array<TotaledOutUpsertWithWhereUniqueWithoutLiveOutPersonalInput>>;
};

export type TotaledOutUpdateManyWithoutLiveOutVenueInput = {
  connect?: InputMaybe<Array<TotaledOutWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<TotaledOutCreateOrConnectWithoutLiveOutVenueInput>>;
  create?: InputMaybe<Array<TotaledOutCreateWithoutLiveOutVenueInput>>;
  createMany?: InputMaybe<TotaledOutCreateManyLiveOutVenueInputEnvelope>;
  delete?: InputMaybe<Array<TotaledOutWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<TotaledOutScalarWhereInput>>;
  disconnect?: InputMaybe<Array<TotaledOutWhereUniqueInput>>;
  set?: InputMaybe<Array<TotaledOutWhereUniqueInput>>;
  update?: InputMaybe<Array<TotaledOutUpdateWithWhereUniqueWithoutLiveOutVenueInput>>;
  updateMany?: InputMaybe<Array<TotaledOutUpdateManyWithWhereWithoutLiveOutVenueInput>>;
  upsert?: InputMaybe<Array<TotaledOutUpsertWithWhereUniqueWithoutLiveOutVenueInput>>;
};

export type TotaledOutUpdateManyWithoutPersonalStatsInput = {
  connect?: InputMaybe<Array<TotaledOutWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<TotaledOutCreateOrConnectWithoutPersonalStatsInput>>;
  create?: InputMaybe<Array<TotaledOutCreateWithoutPersonalStatsInput>>;
  createMany?: InputMaybe<TotaledOutCreateManyPersonalStatsInputEnvelope>;
  delete?: InputMaybe<Array<TotaledOutWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<TotaledOutScalarWhereInput>>;
  disconnect?: InputMaybe<Array<TotaledOutWhereUniqueInput>>;
  set?: InputMaybe<Array<TotaledOutWhereUniqueInput>>;
  update?: InputMaybe<Array<TotaledOutUpdateWithWhereUniqueWithoutPersonalStatsInput>>;
  updateMany?: InputMaybe<Array<TotaledOutUpdateManyWithWhereWithoutPersonalStatsInput>>;
  upsert?: InputMaybe<Array<TotaledOutUpsertWithWhereUniqueWithoutPersonalStatsInput>>;
};

export type TotaledOutUpdateManyWithoutVenueStatsInput = {
  connect?: InputMaybe<Array<TotaledOutWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<TotaledOutCreateOrConnectWithoutVenueStatsInput>>;
  create?: InputMaybe<Array<TotaledOutCreateWithoutVenueStatsInput>>;
  createMany?: InputMaybe<TotaledOutCreateManyVenueStatsInputEnvelope>;
  delete?: InputMaybe<Array<TotaledOutWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<TotaledOutScalarWhereInput>>;
  disconnect?: InputMaybe<Array<TotaledOutWhereUniqueInput>>;
  set?: InputMaybe<Array<TotaledOutWhereUniqueInput>>;
  update?: InputMaybe<Array<TotaledOutUpdateWithWhereUniqueWithoutVenueStatsInput>>;
  updateMany?: InputMaybe<Array<TotaledOutUpdateManyWithWhereWithoutVenueStatsInput>>;
  upsert?: InputMaybe<Array<TotaledOutUpsertWithWhereUniqueWithoutVenueStatsInput>>;
};

export type TotaledOutUpdateManyWithWhereWithoutLiveOutPersonalInput = {
  data: TotaledOutUpdateManyMutationInput;
  where: TotaledOutScalarWhereInput;
};

export type TotaledOutUpdateManyWithWhereWithoutLiveOutVenueInput = {
  data: TotaledOutUpdateManyMutationInput;
  where: TotaledOutScalarWhereInput;
};

export type TotaledOutUpdateManyWithWhereWithoutPersonalStatsInput = {
  data: TotaledOutUpdateManyMutationInput;
  where: TotaledOutScalarWhereInput;
};

export type TotaledOutUpdateManyWithWhereWithoutVenueStatsInput = {
  data: TotaledOutUpdateManyMutationInput;
  where: TotaledOutScalarWhereInput;
};

export type TotaledOutUpdateWithoutLiveOutPersonalInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  leftAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  LiveOutVenue?: InputMaybe<LiveOutVenueUpdateOneWithoutTotaledInput>;
  personalProfileId?: InputMaybe<StringFieldUpdateOperationsInput>;
  PersonalStats?: InputMaybe<PersonalStatsUpdateOneWithoutTotaledVenueHistoryInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  venueProfileId?: InputMaybe<StringFieldUpdateOperationsInput>;
  VenueStats?: InputMaybe<VenueStatsUpdateOneWithoutTotaledVenueHistoryInput>;
};

export type TotaledOutUpdateWithoutLiveOutVenueInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  leftAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  LiveOutPersonal?: InputMaybe<LiveOutPersonalUpdateOneWithoutTotaledInput>;
  personalProfileId?: InputMaybe<StringFieldUpdateOperationsInput>;
  PersonalStats?: InputMaybe<PersonalStatsUpdateOneWithoutTotaledVenueHistoryInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  venueProfileId?: InputMaybe<StringFieldUpdateOperationsInput>;
  VenueStats?: InputMaybe<VenueStatsUpdateOneWithoutTotaledVenueHistoryInput>;
};

export type TotaledOutUpdateWithoutPersonalStatsInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  leftAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  LiveOutPersonal?: InputMaybe<LiveOutPersonalUpdateOneWithoutTotaledInput>;
  LiveOutVenue?: InputMaybe<LiveOutVenueUpdateOneWithoutTotaledInput>;
  personalProfileId?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  venueProfileId?: InputMaybe<StringFieldUpdateOperationsInput>;
  VenueStats?: InputMaybe<VenueStatsUpdateOneWithoutTotaledVenueHistoryInput>;
};

export type TotaledOutUpdateWithoutVenueStatsInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  leftAt?: InputMaybe<NullableDateTimeFieldUpdateOperationsInput>;
  LiveOutPersonal?: InputMaybe<LiveOutPersonalUpdateOneWithoutTotaledInput>;
  LiveOutVenue?: InputMaybe<LiveOutVenueUpdateOneWithoutTotaledInput>;
  personalProfileId?: InputMaybe<StringFieldUpdateOperationsInput>;
  PersonalStats?: InputMaybe<PersonalStatsUpdateOneWithoutTotaledVenueHistoryInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  venueProfileId?: InputMaybe<StringFieldUpdateOperationsInput>;
};

export type TotaledOutUpdateWithWhereUniqueWithoutLiveOutPersonalInput = {
  data: TotaledOutUpdateWithoutLiveOutPersonalInput;
  where: TotaledOutWhereUniqueInput;
};

export type TotaledOutUpdateWithWhereUniqueWithoutLiveOutVenueInput = {
  data: TotaledOutUpdateWithoutLiveOutVenueInput;
  where: TotaledOutWhereUniqueInput;
};

export type TotaledOutUpdateWithWhereUniqueWithoutPersonalStatsInput = {
  data: TotaledOutUpdateWithoutPersonalStatsInput;
  where: TotaledOutWhereUniqueInput;
};

export type TotaledOutUpdateWithWhereUniqueWithoutVenueStatsInput = {
  data: TotaledOutUpdateWithoutVenueStatsInput;
  where: TotaledOutWhereUniqueInput;
};

export type TotaledOutUpsertWithWhereUniqueWithoutLiveOutPersonalInput = {
  create: TotaledOutCreateWithoutLiveOutPersonalInput;
  update: TotaledOutUpdateWithoutLiveOutPersonalInput;
  where: TotaledOutWhereUniqueInput;
};

export type TotaledOutUpsertWithWhereUniqueWithoutLiveOutVenueInput = {
  create: TotaledOutCreateWithoutLiveOutVenueInput;
  update: TotaledOutUpdateWithoutLiveOutVenueInput;
  where: TotaledOutWhereUniqueInput;
};

export type TotaledOutUpsertWithWhereUniqueWithoutPersonalStatsInput = {
  create: TotaledOutCreateWithoutPersonalStatsInput;
  update: TotaledOutUpdateWithoutPersonalStatsInput;
  where: TotaledOutWhereUniqueInput;
};

export type TotaledOutUpsertWithWhereUniqueWithoutVenueStatsInput = {
  create: TotaledOutCreateWithoutVenueStatsInput;
  update: TotaledOutUpdateWithoutVenueStatsInput;
  where: TotaledOutWhereUniqueInput;
};

export type TotaledOutWhereInput = {
  AND?: InputMaybe<Array<TotaledOutWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  leftAt?: InputMaybe<DateTimeNullableFilter>;
  LiveOutPersonal?: InputMaybe<LiveOutPersonalWhereInput>;
  liveOutPersonalId?: InputMaybe<StringNullableFilter>;
  LiveOutVenue?: InputMaybe<LiveOutVenueWhereInput>;
  liveOutVenueId?: InputMaybe<StringNullableFilter>;
  NOT?: InputMaybe<Array<TotaledOutWhereInput>>;
  OR?: InputMaybe<Array<TotaledOutWhereInput>>;
  personalProfileId?: InputMaybe<StringFilter>;
  PersonalStats?: InputMaybe<PersonalStatsWhereInput>;
  personalStatsId?: InputMaybe<StringNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  venueProfileId?: InputMaybe<StringFilter>;
  VenueStats?: InputMaybe<VenueStatsWhereInput>;
  venueStatsId?: InputMaybe<StringNullableFilter>;
};

export type TotaledOutWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export enum TypeOfDocument {
  ProfilePrivacyPolicy = 'PROFILE_PRIVACY_POLICY',
  ProfileTermsOfService = 'PROFILE_TERMS_OF_SERVICE'
}

export type UpdateProfileResponse = ErrorProfiling | Profile;

export type Venue = {
  __typename?: 'Venue';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  LiveOutVenue?: Maybe<LiveOutVenue>;
  Location?: Maybe<Location>;
  Profile: Profile;
  profileId: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  VenueStats: VenueStats;
};

export type VenueCreateNestedOneWithoutLiveOutVenueInput = {
  connect?: InputMaybe<VenueWhereUniqueInput>;
  connectOrCreate?: InputMaybe<VenueCreateOrConnectWithoutLiveOutVenueInput>;
  create?: InputMaybe<VenueCreateWithoutLiveOutVenueInput>;
};

export type VenueCreateNestedOneWithoutProfileInput = {
  connect?: InputMaybe<VenueWhereUniqueInput>;
  connectOrCreate?: InputMaybe<VenueCreateOrConnectWithoutProfileInput>;
  create?: InputMaybe<VenueCreateWithoutProfileInput>;
};

export type VenueCreateNestedOneWithoutVenueStatsInput = {
  connect?: InputMaybe<VenueWhereUniqueInput>;
  connectOrCreate?: InputMaybe<VenueCreateOrConnectWithoutVenueStatsInput>;
  create?: InputMaybe<VenueCreateWithoutVenueStatsInput>;
};

export type VenueCreateOrConnectWithoutLiveOutVenueInput = {
  create: VenueCreateWithoutLiveOutVenueInput;
  where: VenueWhereUniqueInput;
};

export type VenueCreateOrConnectWithoutProfileInput = {
  create: VenueCreateWithoutProfileInput;
  where: VenueWhereUniqueInput;
};

export type VenueCreateOrConnectWithoutVenueStatsInput = {
  create: VenueCreateWithoutVenueStatsInput;
  where: VenueWhereUniqueInput;
};

export type VenueCreateWithoutLiveOutVenueInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  Location?: InputMaybe<LocationCreateNestedOneWithoutVenueInput>;
  name?: InputMaybe<Scalars['String']>;
  Profile: ProfileCreateNestedOneWithoutVenueInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  VenueStats: VenueStatsCreateNestedOneWithoutVenueInput;
};

export type VenueCreateWithoutProfileInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  LiveOutVenue?: InputMaybe<LiveOutVenueCreateNestedOneWithoutVenueInput>;
  Location?: InputMaybe<LocationCreateNestedOneWithoutVenueInput>;
  name?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  VenueStats: VenueStatsCreateNestedOneWithoutVenueInput;
};

export type VenueCreateWithoutVenueStatsInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  LiveOutVenue?: InputMaybe<LiveOutVenueCreateNestedOneWithoutVenueInput>;
  Location?: InputMaybe<LocationCreateNestedOneWithoutVenueInput>;
  name?: InputMaybe<Scalars['String']>;
  Profile: ProfileCreateNestedOneWithoutVenueInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type VenueOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  LiveOutVenue?: InputMaybe<LiveOutVenueOrderByWithRelationInput>;
  Location?: InputMaybe<LocationOrderByWithRelationInput>;
  name?: InputMaybe<SortOrder>;
  Profile?: InputMaybe<ProfileOrderByWithRelationInput>;
  profileId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  VenueStats?: InputMaybe<VenueStatsOrderByWithRelationInput>;
  venueStatsId?: InputMaybe<SortOrder>;
};

export type VenueStats = {
  __typename?: 'VenueStats';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  joinedVenueHistory: Array<JoinedOut>;
  totaledVenueHistory: Array<TotaledOut>;
  updatedAt: Scalars['DateTime'];
};


export type VenueStatsJoinedVenueHistoryArgs = {
  after?: InputMaybe<JoinedOutWhereUniqueInput>;
  before?: InputMaybe<JoinedOutWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type VenueStatsTotaledVenueHistoryArgs = {
  after?: InputMaybe<TotaledOutWhereUniqueInput>;
  before?: InputMaybe<TotaledOutWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};

export type VenueStatsCreateNestedOneWithoutJoinedVenueHistoryInput = {
  connect?: InputMaybe<VenueStatsWhereUniqueInput>;
  connectOrCreate?: InputMaybe<VenueStatsCreateOrConnectWithoutJoinedVenueHistoryInput>;
  create?: InputMaybe<VenueStatsCreateWithoutJoinedVenueHistoryInput>;
};

export type VenueStatsCreateNestedOneWithoutTotaledVenueHistoryInput = {
  connect?: InputMaybe<VenueStatsWhereUniqueInput>;
  connectOrCreate?: InputMaybe<VenueStatsCreateOrConnectWithoutTotaledVenueHistoryInput>;
  create?: InputMaybe<VenueStatsCreateWithoutTotaledVenueHistoryInput>;
};

export type VenueStatsCreateNestedOneWithoutVenueInput = {
  connect?: InputMaybe<VenueStatsWhereUniqueInput>;
  connectOrCreate?: InputMaybe<VenueStatsCreateOrConnectWithoutVenueInput>;
  create?: InputMaybe<VenueStatsCreateWithoutVenueInput>;
};

export type VenueStatsCreateOrConnectWithoutJoinedVenueHistoryInput = {
  create: VenueStatsCreateWithoutJoinedVenueHistoryInput;
  where: VenueStatsWhereUniqueInput;
};

export type VenueStatsCreateOrConnectWithoutTotaledVenueHistoryInput = {
  create: VenueStatsCreateWithoutTotaledVenueHistoryInput;
  where: VenueStatsWhereUniqueInput;
};

export type VenueStatsCreateOrConnectWithoutVenueInput = {
  create: VenueStatsCreateWithoutVenueInput;
  where: VenueStatsWhereUniqueInput;
};

export type VenueStatsCreateWithoutJoinedVenueHistoryInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  totaledVenueHistory?: InputMaybe<TotaledOutCreateNestedManyWithoutVenueStatsInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  Venue?: InputMaybe<VenueCreateNestedOneWithoutVenueStatsInput>;
};

export type VenueStatsCreateWithoutTotaledVenueHistoryInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  joinedVenueHistory?: InputMaybe<JoinedOutCreateNestedManyWithoutVenueStatsInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  Venue?: InputMaybe<VenueCreateNestedOneWithoutVenueStatsInput>;
};

export type VenueStatsCreateWithoutVenueInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  joinedVenueHistory?: InputMaybe<JoinedOutCreateNestedManyWithoutVenueStatsInput>;
  totaledVenueHistory?: InputMaybe<TotaledOutCreateNestedManyWithoutVenueStatsInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type VenueStatsOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  joinedVenueHistory?: InputMaybe<JoinedOutOrderByRelationAggregateInput>;
  totaledVenueHistory?: InputMaybe<TotaledOutOrderByRelationAggregateInput>;
  updatedAt?: InputMaybe<SortOrder>;
  Venue?: InputMaybe<VenueOrderByWithRelationInput>;
};

export type VenueStatsUpdateOneRequiredWithoutVenueInput = {
  connect?: InputMaybe<VenueStatsWhereUniqueInput>;
  connectOrCreate?: InputMaybe<VenueStatsCreateOrConnectWithoutVenueInput>;
  create?: InputMaybe<VenueStatsCreateWithoutVenueInput>;
  update?: InputMaybe<VenueStatsUpdateWithoutVenueInput>;
  upsert?: InputMaybe<VenueStatsUpsertWithoutVenueInput>;
};

export type VenueStatsUpdateOneWithoutJoinedVenueHistoryInput = {
  connect?: InputMaybe<VenueStatsWhereUniqueInput>;
  connectOrCreate?: InputMaybe<VenueStatsCreateOrConnectWithoutJoinedVenueHistoryInput>;
  create?: InputMaybe<VenueStatsCreateWithoutJoinedVenueHistoryInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<VenueStatsUpdateWithoutJoinedVenueHistoryInput>;
  upsert?: InputMaybe<VenueStatsUpsertWithoutJoinedVenueHistoryInput>;
};

export type VenueStatsUpdateOneWithoutTotaledVenueHistoryInput = {
  connect?: InputMaybe<VenueStatsWhereUniqueInput>;
  connectOrCreate?: InputMaybe<VenueStatsCreateOrConnectWithoutTotaledVenueHistoryInput>;
  create?: InputMaybe<VenueStatsCreateWithoutTotaledVenueHistoryInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<VenueStatsUpdateWithoutTotaledVenueHistoryInput>;
  upsert?: InputMaybe<VenueStatsUpsertWithoutTotaledVenueHistoryInput>;
};

export type VenueStatsUpdateWithoutJoinedVenueHistoryInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  totaledVenueHistory?: InputMaybe<TotaledOutUpdateManyWithoutVenueStatsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Venue?: InputMaybe<VenueUpdateOneWithoutVenueStatsInput>;
};

export type VenueStatsUpdateWithoutTotaledVenueHistoryInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  joinedVenueHistory?: InputMaybe<JoinedOutUpdateManyWithoutVenueStatsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  Venue?: InputMaybe<VenueUpdateOneWithoutVenueStatsInput>;
};

export type VenueStatsUpdateWithoutVenueInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  joinedVenueHistory?: InputMaybe<JoinedOutUpdateManyWithoutVenueStatsInput>;
  totaledVenueHistory?: InputMaybe<TotaledOutUpdateManyWithoutVenueStatsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type VenueStatsUpsertWithoutJoinedVenueHistoryInput = {
  create: VenueStatsCreateWithoutJoinedVenueHistoryInput;
  update: VenueStatsUpdateWithoutJoinedVenueHistoryInput;
};

export type VenueStatsUpsertWithoutTotaledVenueHistoryInput = {
  create: VenueStatsCreateWithoutTotaledVenueHistoryInput;
  update: VenueStatsUpdateWithoutTotaledVenueHistoryInput;
};

export type VenueStatsUpsertWithoutVenueInput = {
  create: VenueStatsCreateWithoutVenueInput;
  update: VenueStatsUpdateWithoutVenueInput;
};

export type VenueStatsWhereInput = {
  AND?: InputMaybe<Array<VenueStatsWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  joinedVenueHistory?: InputMaybe<JoinedOutListRelationFilter>;
  NOT?: InputMaybe<Array<VenueStatsWhereInput>>;
  OR?: InputMaybe<Array<VenueStatsWhereInput>>;
  totaledVenueHistory?: InputMaybe<TotaledOutListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  Venue?: InputMaybe<VenueWhereInput>;
};

export type VenueStatsWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type VenueUpdateOneRequiredWithoutLiveOutVenueInput = {
  connect?: InputMaybe<VenueWhereUniqueInput>;
  connectOrCreate?: InputMaybe<VenueCreateOrConnectWithoutLiveOutVenueInput>;
  create?: InputMaybe<VenueCreateWithoutLiveOutVenueInput>;
  update?: InputMaybe<VenueUpdateWithoutLiveOutVenueInput>;
  upsert?: InputMaybe<VenueUpsertWithoutLiveOutVenueInput>;
};

export type VenueUpdateOneWithoutProfileInput = {
  connect?: InputMaybe<VenueWhereUniqueInput>;
  connectOrCreate?: InputMaybe<VenueCreateOrConnectWithoutProfileInput>;
  create?: InputMaybe<VenueCreateWithoutProfileInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<VenueUpdateWithoutProfileInput>;
  upsert?: InputMaybe<VenueUpsertWithoutProfileInput>;
};

export type VenueUpdateOneWithoutVenueStatsInput = {
  connect?: InputMaybe<VenueWhereUniqueInput>;
  connectOrCreate?: InputMaybe<VenueCreateOrConnectWithoutVenueStatsInput>;
  create?: InputMaybe<VenueCreateWithoutVenueStatsInput>;
  delete?: InputMaybe<Scalars['Boolean']>;
  disconnect?: InputMaybe<Scalars['Boolean']>;
  update?: InputMaybe<VenueUpdateWithoutVenueStatsInput>;
  upsert?: InputMaybe<VenueUpsertWithoutVenueStatsInput>;
};

export type VenueUpdateWithoutLiveOutVenueInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  Location?: InputMaybe<LocationUpdateOneWithoutVenueInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  Profile?: InputMaybe<ProfileUpdateOneRequiredWithoutVenueInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  VenueStats?: InputMaybe<VenueStatsUpdateOneRequiredWithoutVenueInput>;
};

export type VenueUpdateWithoutProfileInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  LiveOutVenue?: InputMaybe<LiveOutVenueUpdateOneWithoutVenueInput>;
  Location?: InputMaybe<LocationUpdateOneWithoutVenueInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  VenueStats?: InputMaybe<VenueStatsUpdateOneRequiredWithoutVenueInput>;
};

export type VenueUpdateWithoutVenueStatsInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  LiveOutVenue?: InputMaybe<LiveOutVenueUpdateOneWithoutVenueInput>;
  Location?: InputMaybe<LocationUpdateOneWithoutVenueInput>;
  name?: InputMaybe<NullableStringFieldUpdateOperationsInput>;
  Profile?: InputMaybe<ProfileUpdateOneRequiredWithoutVenueInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type VenueUpsertWithoutLiveOutVenueInput = {
  create: VenueCreateWithoutLiveOutVenueInput;
  update: VenueUpdateWithoutLiveOutVenueInput;
};

export type VenueUpsertWithoutProfileInput = {
  create: VenueCreateWithoutProfileInput;
  update: VenueUpdateWithoutProfileInput;
};

export type VenueUpsertWithoutVenueStatsInput = {
  create: VenueCreateWithoutVenueStatsInput;
  update: VenueUpdateWithoutVenueStatsInput;
};

export type VenueWhereInput = {
  AND?: InputMaybe<Array<VenueWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  LiveOutVenue?: InputMaybe<LiveOutVenueWhereInput>;
  Location?: InputMaybe<LocationWhereInput>;
  name?: InputMaybe<StringNullableFilter>;
  NOT?: InputMaybe<Array<VenueWhereInput>>;
  OR?: InputMaybe<Array<VenueWhereInput>>;
  Profile?: InputMaybe<ProfileWhereInput>;
  profileId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  VenueStats?: InputMaybe<VenueStatsWhereInput>;
  venueStatsId?: InputMaybe<StringFilter>;
};

export type VenueWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  profileId?: InputMaybe<Scalars['String']>;
  venueStatsId?: InputMaybe<Scalars['String']>;
};

export type Credentials_FragmentFragment = { __typename?: 'Credentials', id: string, AuthenticationProvider?: { __typename?: 'AuthenticationProvider', id: string, phones: Array<{ __typename?: 'Phone', id: number, number: string, completeNumber?: string | null, countryCode?: string | null, canUseAsRecovery?: boolean | null, countryCallingCode?: string | null, createdAt: any, updatedAt: any }>, emails: Array<{ __typename?: 'Email', id: number, email: string, canUseAsRecovery?: boolean | null, createdAt: any, updatedAt: any }> } | null };

export type Detail_Information_FragmentFragment = { __typename?: 'DetailInformation', id: string, description?: string | null, established?: any | null, profileId: string, Tags: Array<{ __typename?: 'Tag', id: number, emoji?: string | null, name: string }> };

export type Error_FragmentFragment = { __typename?: 'Error', type?: string | null, errorCode?: string | null, message?: string | null };

export type Error_Profiling_FragmentFragment = { __typename?: 'ErrorProfiling', errorCode?: string | null, message?: string | null };

export type Success_FragmentFragment = { __typename?: 'Success', type?: string | null, successCode?: string | null, message?: string | null };

export type Indetifiable_Information_FragmentFragment = { __typename?: 'IdentifiableInformation', id: string, username: string, fullname?: string | null, nickname?: string | null, firstname?: string | null, lastname?: string | null, gender?: string | null, lookfor?: string | null, birthday?: any | null, hometown?: string | null, currenttown?: string | null };

export type Code_FragmentFragment = { __typename?: 'Code', id?: string | null, code?: string | null };

export type Location_FragmentFragment = { __typename?: 'Location', id: string, h3Index: string, createdAt: any, updatedAt: any, Geometry?: { __typename?: 'Geometry', id: number, h3Index15?: string | null, latitude: number, longitude: number, type: string } | null, plusCode?: { __typename?: 'PluseCode', compoundCode?: string | null, globalCode: string, id: string } | null, Address?: { __typename?: 'Address', id: string, formattedAddress: string, AddressComponents: Array<{ __typename?: 'AddressComponent', id: number, short_name: string, long_name: string, types: Array<string>, h3Index15?: string | null }> } | null };

export type Personal_FragmentFragment = { __typename?: 'Personal', id: string, updatedAt: any, createdAt: any, Profile: { __typename: 'Profile', id: string, ProfileType?: ProfileType | null, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, username: string, fullname?: string | null, nickname?: string | null, firstname?: string | null, lastname?: string | null, gender?: string | null, lookfor?: string | null, birthday?: any | null, hometown?: string | null, currenttown?: string | null } | null, DetailInformation?: { __typename?: 'DetailInformation', id: string, description?: string | null, established?: any | null, profileId: string, Tags: Array<{ __typename?: 'Tag', id: number, emoji?: string | null, name: string }> } | null, Relationships: Array<{ __typename?: 'Relationship', id: string, venueMetAt?: string | null, status: Array<Status>, createdAt: any, updatedAt: any }>, photos: Array<{ __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, position?: number | null, active: boolean, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any }>, Credentials?: { __typename?: 'Credentials', id: string, AuthenticationProvider?: { __typename?: 'AuthenticationProvider', id: string, phones: Array<{ __typename?: 'Phone', id: number, number: string, completeNumber?: string | null, countryCode?: string | null, canUseAsRecovery?: boolean | null, countryCallingCode?: string | null, createdAt: any, updatedAt: any }>, emails: Array<{ __typename?: 'Email', id: number, email: string, canUseAsRecovery?: boolean | null, createdAt: any, updatedAt: any }> } | null } | null, Personal?: { __typename?: 'Personal', id: string, profileId: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, PersonalStats?: { __typename?: 'PersonalStats', id: string, joinedVenueHistory: Array<{ __typename?: 'JoinedOut', id: string, personalProfileId?: string | null, venueProfileId: string, createdAt: any, updatedAt: any }>, totaledVenueHistory: Array<{ __typename?: 'TotaledOut', id: string, venueProfileId: string, personalProfileId: string, createdAt: any, updatedAt: any }> } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string, createdAt: any, updatedAt: any, joined: Array<{ __typename?: 'JoinedOut', id: string, venueProfileId: string, personalProfileId?: string | null }>, totaled: Array<{ __typename?: 'TotaledOut', id: string, venueProfileId: string, personalProfileId: string }> } | null } | null, Venue?: { __typename?: 'Venue', id: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string, joined: Array<{ __typename?: 'JoinedOut', id: string, venueProfileId: string, personalProfileId?: string | null }>, totaled: Array<{ __typename?: 'TotaledOut', id: string, venueProfileId: string, personalProfileId: string }> } | null, VenueStats: { __typename?: 'VenueStats', id: string, joinedVenueHistory: Array<{ __typename?: 'JoinedOut', id: string, venueProfileId: string, personalProfileId?: string | null, createdAt: any, updatedAt: any }>, totaledVenueHistory: Array<{ __typename?: 'TotaledOut', id: string, personalProfileId: string, venueProfileId: string, createdAt: any, updatedAt: any }> }, Location?: { __typename?: 'Location', id: string, h3Index: string, createdAt: any, updatedAt: any, Geometry?: { __typename?: 'Geometry', id: number, h3Index15?: string | null, latitude: number, longitude: number, type: string } | null, plusCode?: { __typename?: 'PluseCode', compoundCode?: string | null, globalCode: string, id: string } | null, Address?: { __typename?: 'Address', id: string, formattedAddress: string, AddressComponents: Array<{ __typename?: 'AddressComponent', id: number, short_name: string, long_name: string, types: Array<string>, h3Index15?: string | null }> } | null } | null } | null, Story?: { __typename?: 'Story', id: string, photos: Array<{ __typename?: 'Photo', id: string, position?: number | null, url: string }>, emojimood: Array<{ __typename: 'Emojimood', id: number, colors: Array<string>, emojiname?: string | null, emoji?: string | null }> } | null } };

export type Profile_FragmentFragment = { __typename: 'Profile', id: string, ProfileType?: ProfileType | null, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, username: string, fullname?: string | null, nickname?: string | null, firstname?: string | null, lastname?: string | null, gender?: string | null, lookfor?: string | null, birthday?: any | null, hometown?: string | null, currenttown?: string | null } | null, DetailInformation?: { __typename?: 'DetailInformation', id: string, description?: string | null, established?: any | null, profileId: string, Tags: Array<{ __typename?: 'Tag', id: number, emoji?: string | null, name: string }> } | null, Relationships: Array<{ __typename?: 'Relationship', id: string, venueMetAt?: string | null, status: Array<Status>, createdAt: any, updatedAt: any }>, photos: Array<{ __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, position?: number | null, active: boolean, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any }>, Credentials?: { __typename?: 'Credentials', id: string, AuthenticationProvider?: { __typename?: 'AuthenticationProvider', id: string, phones: Array<{ __typename?: 'Phone', id: number, number: string, completeNumber?: string | null, countryCode?: string | null, canUseAsRecovery?: boolean | null, countryCallingCode?: string | null, createdAt: any, updatedAt: any }>, emails: Array<{ __typename?: 'Email', id: number, email: string, canUseAsRecovery?: boolean | null, createdAt: any, updatedAt: any }> } | null } | null, Personal?: { __typename?: 'Personal', id: string, profileId: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, PersonalStats?: { __typename?: 'PersonalStats', id: string, joinedVenueHistory: Array<{ __typename?: 'JoinedOut', id: string, personalProfileId?: string | null, venueProfileId: string, createdAt: any, updatedAt: any }>, totaledVenueHistory: Array<{ __typename?: 'TotaledOut', id: string, venueProfileId: string, personalProfileId: string, createdAt: any, updatedAt: any }> } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string, createdAt: any, updatedAt: any, joined: Array<{ __typename?: 'JoinedOut', id: string, venueProfileId: string, personalProfileId?: string | null }>, totaled: Array<{ __typename?: 'TotaledOut', id: string, venueProfileId: string, personalProfileId: string }> } | null } | null, Venue?: { __typename?: 'Venue', id: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string, joined: Array<{ __typename?: 'JoinedOut', id: string, venueProfileId: string, personalProfileId?: string | null }>, totaled: Array<{ __typename?: 'TotaledOut', id: string, venueProfileId: string, personalProfileId: string }> } | null, VenueStats: { __typename?: 'VenueStats', id: string, joinedVenueHistory: Array<{ __typename?: 'JoinedOut', id: string, venueProfileId: string, personalProfileId?: string | null, createdAt: any, updatedAt: any }>, totaledVenueHistory: Array<{ __typename?: 'TotaledOut', id: string, personalProfileId: string, venueProfileId: string, createdAt: any, updatedAt: any }> }, Location?: { __typename?: 'Location', id: string, h3Index: string, createdAt: any, updatedAt: any, Geometry?: { __typename?: 'Geometry', id: number, h3Index15?: string | null, latitude: number, longitude: number, type: string } | null, plusCode?: { __typename?: 'PluseCode', compoundCode?: string | null, globalCode: string, id: string } | null, Address?: { __typename?: 'Address', id: string, formattedAddress: string, AddressComponents: Array<{ __typename?: 'AddressComponent', id: number, short_name: string, long_name: string, types: Array<string>, h3Index15?: string | null }> } | null } | null } | null, Story?: { __typename?: 'Story', id: string, photos: Array<{ __typename?: 'Photo', id: string, position?: number | null, url: string }>, emojimood: Array<{ __typename: 'Emojimood', id: number, colors: Array<string>, emojiname?: string | null, emoji?: string | null }> } | null };

export type Venue_FragmentFragment = { __typename?: 'Venue', id: string, createdAt: any, updatedAt: any, Profile: { __typename: 'Profile', id: string, ProfileType?: ProfileType | null, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, username: string, fullname?: string | null, nickname?: string | null, firstname?: string | null, lastname?: string | null, gender?: string | null, lookfor?: string | null, birthday?: any | null, hometown?: string | null, currenttown?: string | null } | null, DetailInformation?: { __typename?: 'DetailInformation', id: string, description?: string | null, established?: any | null, profileId: string, Tags: Array<{ __typename?: 'Tag', id: number, emoji?: string | null, name: string }> } | null, Relationships: Array<{ __typename?: 'Relationship', id: string, venueMetAt?: string | null, status: Array<Status>, createdAt: any, updatedAt: any }>, photos: Array<{ __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, position?: number | null, active: boolean, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any }>, Credentials?: { __typename?: 'Credentials', id: string, AuthenticationProvider?: { __typename?: 'AuthenticationProvider', id: string, phones: Array<{ __typename?: 'Phone', id: number, number: string, completeNumber?: string | null, countryCode?: string | null, canUseAsRecovery?: boolean | null, countryCallingCode?: string | null, createdAt: any, updatedAt: any }>, emails: Array<{ __typename?: 'Email', id: number, email: string, canUseAsRecovery?: boolean | null, createdAt: any, updatedAt: any }> } | null } | null, Personal?: { __typename?: 'Personal', id: string, profileId: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, PersonalStats?: { __typename?: 'PersonalStats', id: string, joinedVenueHistory: Array<{ __typename?: 'JoinedOut', id: string, personalProfileId?: string | null, venueProfileId: string, createdAt: any, updatedAt: any }>, totaledVenueHistory: Array<{ __typename?: 'TotaledOut', id: string, venueProfileId: string, personalProfileId: string, createdAt: any, updatedAt: any }> } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string, createdAt: any, updatedAt: any, joined: Array<{ __typename?: 'JoinedOut', id: string, venueProfileId: string, personalProfileId?: string | null }>, totaled: Array<{ __typename?: 'TotaledOut', id: string, venueProfileId: string, personalProfileId: string }> } | null } | null, Venue?: { __typename?: 'Venue', id: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string, joined: Array<{ __typename?: 'JoinedOut', id: string, venueProfileId: string, personalProfileId?: string | null }>, totaled: Array<{ __typename?: 'TotaledOut', id: string, venueProfileId: string, personalProfileId: string }> } | null, VenueStats: { __typename?: 'VenueStats', id: string, joinedVenueHistory: Array<{ __typename?: 'JoinedOut', id: string, venueProfileId: string, personalProfileId?: string | null, createdAt: any, updatedAt: any }>, totaledVenueHistory: Array<{ __typename?: 'TotaledOut', id: string, personalProfileId: string, venueProfileId: string, createdAt: any, updatedAt: any }> }, Location?: { __typename?: 'Location', id: string, h3Index: string, createdAt: any, updatedAt: any, Geometry?: { __typename?: 'Geometry', id: number, h3Index15?: string | null, latitude: number, longitude: number, type: string } | null, plusCode?: { __typename?: 'PluseCode', compoundCode?: string | null, globalCode: string, id: string } | null, Address?: { __typename?: 'Address', id: string, formattedAddress: string, AddressComponents: Array<{ __typename?: 'AddressComponent', id: number, short_name: string, long_name: string, types: Array<string>, h3Index15?: string | null }> } | null } | null } | null, Story?: { __typename?: 'Story', id: string, photos: Array<{ __typename?: 'Photo', id: string, position?: number | null, url: string }>, emojimood: Array<{ __typename: 'Emojimood', id: number, colors: Array<string>, emojiname?: string | null, emoji?: string | null }> } | null } };

export type CreateADeviceManagerMutationVariables = Exact<{
  profileId: Scalars['String'];
}>;


export type CreateADeviceManagerMutation = { __typename?: 'Mutation', createADeviceManager?: { __typename?: 'DeviceManager' } | { __typename?: 'Error', type?: string | null, errorCode?: string | null, message?: string | null } | { __typename?: 'Success', type?: string | null, successCode?: string | null, message?: string | null } | null };

export type SwitchDeviceProfileMutationVariables = Exact<{
  profileId: Scalars['String'];
}>;


export type SwitchDeviceProfileMutation = { __typename?: 'Mutation', switchDeviceProfile?: { __typename?: 'DeviceManager', id: string, DeviceProfile?: { __typename?: 'DeviceProfile', id: number, isActive: boolean, accesstoken?: string | null, refreshtoken?: string | null, deviceManagerId: string, Profile?: { __typename: 'Profile', id: string, ProfileType?: ProfileType | null, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, username: string, fullname?: string | null, nickname?: string | null, firstname?: string | null, lastname?: string | null, gender?: string | null, lookfor?: string | null, birthday?: any | null, hometown?: string | null, currenttown?: string | null } | null, DetailInformation?: { __typename?: 'DetailInformation', id: string, description?: string | null, established?: any | null, profileId: string, Tags: Array<{ __typename?: 'Tag', id: number, emoji?: string | null, name: string }> } | null, Relationships: Array<{ __typename?: 'Relationship', id: string, venueMetAt?: string | null, status: Array<Status>, createdAt: any, updatedAt: any }>, photos: Array<{ __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, position?: number | null, active: boolean, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any }>, Credentials?: { __typename?: 'Credentials', id: string, AuthenticationProvider?: { __typename?: 'AuthenticationProvider', id: string, phones: Array<{ __typename?: 'Phone', id: number, number: string, completeNumber?: string | null, countryCode?: string | null, canUseAsRecovery?: boolean | null, countryCallingCode?: string | null, createdAt: any, updatedAt: any }>, emails: Array<{ __typename?: 'Email', id: number, email: string, canUseAsRecovery?: boolean | null, createdAt: any, updatedAt: any }> } | null } | null, Personal?: { __typename?: 'Personal', id: string, profileId: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, PersonalStats?: { __typename?: 'PersonalStats', id: string, joinedVenueHistory: Array<{ __typename?: 'JoinedOut', id: string, personalProfileId?: string | null, venueProfileId: string, createdAt: any, updatedAt: any }>, totaledVenueHistory: Array<{ __typename?: 'TotaledOut', id: string, venueProfileId: string, personalProfileId: string, createdAt: any, updatedAt: any }> } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string, createdAt: any, updatedAt: any, joined: Array<{ __typename?: 'JoinedOut', id: string, venueProfileId: string, personalProfileId?: string | null }>, totaled: Array<{ __typename?: 'TotaledOut', id: string, venueProfileId: string, personalProfileId: string }> } | null } | null, Venue?: { __typename?: 'Venue', id: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string, joined: Array<{ __typename?: 'JoinedOut', id: string, venueProfileId: string, personalProfileId?: string | null }>, totaled: Array<{ __typename?: 'TotaledOut', id: string, venueProfileId: string, personalProfileId: string }> } | null, VenueStats: { __typename?: 'VenueStats', id: string, joinedVenueHistory: Array<{ __typename?: 'JoinedOut', id: string, venueProfileId: string, personalProfileId?: string | null, createdAt: any, updatedAt: any }>, totaledVenueHistory: Array<{ __typename?: 'TotaledOut', id: string, personalProfileId: string, venueProfileId: string, createdAt: any, updatedAt: any }> }, Location?: { __typename?: 'Location', id: string, h3Index: string, createdAt: any, updatedAt: any, Geometry?: { __typename?: 'Geometry', id: number, h3Index15?: string | null, latitude: number, longitude: number, type: string } | null, plusCode?: { __typename?: 'PluseCode', compoundCode?: string | null, globalCode: string, id: string } | null, Address?: { __typename?: 'Address', id: string, formattedAddress: string, AddressComponents: Array<{ __typename?: 'AddressComponent', id: number, short_name: string, long_name: string, types: Array<string>, h3Index15?: string | null }> } | null } | null } | null, Story?: { __typename?: 'Story', id: string, photos: Array<{ __typename?: 'Photo', id: string, position?: number | null, url: string }>, emojimood: Array<{ __typename: 'Emojimood', id: number, colors: Array<string>, emojiname?: string | null, emoji?: string | null }> } | null } | null } | null } | { __typename?: 'Error', type?: string | null, errorCode?: string | null, message?: string | null } | { __typename?: 'Success', type?: string | null, successCode?: string | null, message?: string | null } | null };

export type RefreshDeviceManagerMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshDeviceManagerMutation = { __typename?: 'Mutation', refreshDeviceManager?: { __typename: 'DeviceManager', id: string, DeviceProfile?: { __typename?: 'DeviceProfile', id: number, isActive: boolean, refreshtoken?: string | null, accesstoken?: string | null, AppType?: AppType | null, deviceManagerId: string, DeviceManager: { __typename?: 'DeviceManager', id: string }, Profile?: { __typename: 'Profile', id: string, ProfileType?: ProfileType | null, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, username: string, fullname?: string | null, nickname?: string | null, firstname?: string | null, lastname?: string | null, gender?: string | null, lookfor?: string | null, birthday?: any | null, hometown?: string | null, currenttown?: string | null } | null, DetailInformation?: { __typename?: 'DetailInformation', id: string, description?: string | null, established?: any | null, profileId: string, Tags: Array<{ __typename?: 'Tag', id: number, emoji?: string | null, name: string }> } | null, Relationships: Array<{ __typename?: 'Relationship', id: string, venueMetAt?: string | null, status: Array<Status>, createdAt: any, updatedAt: any }>, photos: Array<{ __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, position?: number | null, active: boolean, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any }>, Credentials?: { __typename?: 'Credentials', id: string, AuthenticationProvider?: { __typename?: 'AuthenticationProvider', id: string, phones: Array<{ __typename?: 'Phone', id: number, number: string, completeNumber?: string | null, countryCode?: string | null, canUseAsRecovery?: boolean | null, countryCallingCode?: string | null, createdAt: any, updatedAt: any }>, emails: Array<{ __typename?: 'Email', id: number, email: string, canUseAsRecovery?: boolean | null, createdAt: any, updatedAt: any }> } | null } | null, Personal?: { __typename?: 'Personal', id: string, profileId: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, PersonalStats?: { __typename?: 'PersonalStats', id: string, joinedVenueHistory: Array<{ __typename?: 'JoinedOut', id: string, personalProfileId?: string | null, venueProfileId: string, createdAt: any, updatedAt: any }>, totaledVenueHistory: Array<{ __typename?: 'TotaledOut', id: string, venueProfileId: string, personalProfileId: string, createdAt: any, updatedAt: any }> } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string, createdAt: any, updatedAt: any, joined: Array<{ __typename?: 'JoinedOut', id: string, venueProfileId: string, personalProfileId?: string | null }>, totaled: Array<{ __typename?: 'TotaledOut', id: string, venueProfileId: string, personalProfileId: string }> } | null } | null, Venue?: { __typename?: 'Venue', id: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string, joined: Array<{ __typename?: 'JoinedOut', id: string, venueProfileId: string, personalProfileId?: string | null }>, totaled: Array<{ __typename?: 'TotaledOut', id: string, venueProfileId: string, personalProfileId: string }> } | null, VenueStats: { __typename?: 'VenueStats', id: string, joinedVenueHistory: Array<{ __typename?: 'JoinedOut', id: string, venueProfileId: string, personalProfileId?: string | null, createdAt: any, updatedAt: any }>, totaledVenueHistory: Array<{ __typename?: 'TotaledOut', id: string, personalProfileId: string, venueProfileId: string, createdAt: any, updatedAt: any }> }, Location?: { __typename?: 'Location', id: string, h3Index: string, createdAt: any, updatedAt: any, Geometry?: { __typename?: 'Geometry', id: number, h3Index15?: string | null, latitude: number, longitude: number, type: string } | null, plusCode?: { __typename?: 'PluseCode', compoundCode?: string | null, globalCode: string, id: string } | null, Address?: { __typename?: 'Address', id: string, formattedAddress: string, AddressComponents: Array<{ __typename?: 'AddressComponent', id: number, short_name: string, long_name: string, types: Array<string>, h3Index15?: string | null }> } | null } | null } | null, Story?: { __typename?: 'Story', id: string, photos: Array<{ __typename?: 'Photo', id: string, position?: number | null, url: string }>, emojimood: Array<{ __typename: 'Emojimood', id: number, colors: Array<string>, emojiname?: string | null, emoji?: string | null }> } | null } | null } | null } | { __typename?: 'Error', errorCode?: string | null, message?: string | null, type?: string | null } | { __typename?: 'Success', type?: string | null, message?: string | null, successCode?: string | null } | null };

export type GetADeviceManagerQueryVariables = Exact<{ [key: string]: never; }>;


export type GetADeviceManagerQuery = { __typename?: 'Query', getADeviceManager?: { __typename?: 'DeviceManagerDeviceProfiles', DeviceProfiles?: Array<{ __typename?: 'DeviceProfile', id: number, AppType?: AppType | null, isActive: boolean, accesstoken?: string | null, refreshtoken?: string | null, Profile?: { __typename: 'Profile', id: string, ProfileType?: ProfileType | null, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, username: string, fullname?: string | null, nickname?: string | null, firstname?: string | null, lastname?: string | null, gender?: string | null, lookfor?: string | null, birthday?: any | null, hometown?: string | null, currenttown?: string | null } | null, DetailInformation?: { __typename?: 'DetailInformation', id: string, description?: string | null, established?: any | null, profileId: string, Tags: Array<{ __typename?: 'Tag', id: number, emoji?: string | null, name: string }> } | null, Relationships: Array<{ __typename?: 'Relationship', id: string, venueMetAt?: string | null, status: Array<Status>, createdAt: any, updatedAt: any }>, photos: Array<{ __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, position?: number | null, active: boolean, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any }>, Credentials?: { __typename?: 'Credentials', id: string, AuthenticationProvider?: { __typename?: 'AuthenticationProvider', id: string, phones: Array<{ __typename?: 'Phone', id: number, number: string, completeNumber?: string | null, countryCode?: string | null, canUseAsRecovery?: boolean | null, countryCallingCode?: string | null, createdAt: any, updatedAt: any }>, emails: Array<{ __typename?: 'Email', id: number, email: string, canUseAsRecovery?: boolean | null, createdAt: any, updatedAt: any }> } | null } | null, Personal?: { __typename?: 'Personal', id: string, profileId: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, PersonalStats?: { __typename?: 'PersonalStats', id: string, joinedVenueHistory: Array<{ __typename?: 'JoinedOut', id: string, personalProfileId?: string | null, venueProfileId: string, createdAt: any, updatedAt: any }>, totaledVenueHistory: Array<{ __typename?: 'TotaledOut', id: string, venueProfileId: string, personalProfileId: string, createdAt: any, updatedAt: any }> } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string, createdAt: any, updatedAt: any, joined: Array<{ __typename?: 'JoinedOut', id: string, venueProfileId: string, personalProfileId?: string | null }>, totaled: Array<{ __typename?: 'TotaledOut', id: string, venueProfileId: string, personalProfileId: string }> } | null } | null, Venue?: { __typename?: 'Venue', id: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string, joined: Array<{ __typename?: 'JoinedOut', id: string, venueProfileId: string, personalProfileId?: string | null }>, totaled: Array<{ __typename?: 'TotaledOut', id: string, venueProfileId: string, personalProfileId: string }> } | null, VenueStats: { __typename?: 'VenueStats', id: string, joinedVenueHistory: Array<{ __typename?: 'JoinedOut', id: string, venueProfileId: string, personalProfileId?: string | null, createdAt: any, updatedAt: any }>, totaledVenueHistory: Array<{ __typename?: 'TotaledOut', id: string, personalProfileId: string, venueProfileId: string, createdAt: any, updatedAt: any }> }, Location?: { __typename?: 'Location', id: string, h3Index: string, createdAt: any, updatedAt: any, Geometry?: { __typename?: 'Geometry', id: number, h3Index15?: string | null, latitude: number, longitude: number, type: string } | null, plusCode?: { __typename?: 'PluseCode', compoundCode?: string | null, globalCode: string, id: string } | null, Address?: { __typename?: 'Address', id: string, formattedAddress: string, AddressComponents: Array<{ __typename?: 'AddressComponent', id: number, short_name: string, long_name: string, types: Array<string>, h3Index15?: string | null }> } | null } | null } | null, Story?: { __typename?: 'Story', id: string, photos: Array<{ __typename?: 'Photo', id: string, position?: number | null, url: string }>, emojimood: Array<{ __typename: 'Emojimood', id: number, colors: Array<string>, emojiname?: string | null, emoji?: string | null }> } | null } | null } | null> | null } | { __typename?: 'Error' } | null };

export type SendAuthenticatorDeviceOwnerCodeMutationVariables = Exact<{
  data?: InputMaybe<CodeData>;
  where?: InputMaybe<CodeWhere>;
}>;


export type SendAuthenticatorDeviceOwnerCodeMutation = { __typename?: 'Mutation', sendAuthenticatorDeviceOwnerCode?: { __typename?: 'Code', id?: string | null, code?: string | null } | { __typename?: 'ErrorProfiling', errorCode?: string | null, message?: string | null } | null };

export type AuthorizedProfilesQueryVariables = Exact<{
  where: AuthorizedProfilesWhereInput;
}>;


export type AuthorizedProfilesQuery = { __typename?: 'Query', authorizedProfiles?: { __typename?: 'ErrorProfiling', errorCode?: string | null, message?: string | null } | { __typename?: 'ProfileTypesResponse', email?: Array<{ __typename?: 'Profile', id: string, ProfileType?: ProfileType | null } | null> | null, phone?: Array<{ __typename?: 'Profile', id: string, ProfileType?: ProfileType | null } | null> | null, username?: Array<{ __typename?: 'Profile', id: string, ProfileType?: ProfileType | null } | null> | null } | null };

export type DocumentsQueryVariables = Exact<{
  after?: InputMaybe<DocumentWhereUniqueInput>;
  before?: InputMaybe<DocumentWhereUniqueInput>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<DocumentOrderByWithRelationInput> | DocumentOrderByWithRelationInput>;
  where?: InputMaybe<DocumentWhereInput>;
}>;


export type DocumentsQuery = { __typename?: 'Query', documents: Array<{ __typename?: 'Document', id: number, TypeOfDocument: TypeOfDocument, content: string, createdAt: any, updatedAt: any }> };

export type LoginPasswordQueryVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginPasswordQuery = { __typename?: 'Query', loginPassword?: boolean | null };

export type CheckUsernameQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type CheckUsernameQuery = { __typename?: 'Query', checkUsername?: boolean | null };

export type EmojimoodsQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<EmojimoodWhereUniqueInput>;
  after?: InputMaybe<EmojimoodWhereUniqueInput>;
  where?: InputMaybe<EmojimoodWhereInput>;
}>;


export type EmojimoodsQuery = { __typename?: 'Query', emojimoods: Array<{ __typename?: 'Emojimood', id: number, colors: Array<string>, emoji?: string | null, emojiname?: string | null }> };

export type EmojimoodQueryVariables = Exact<{
  where: EmojimoodWhereUniqueInput;
}>;


export type EmojimoodQuery = { __typename?: 'Query', emojimood?: { __typename?: 'Emojimood', id: number, colors: Array<string>, emoji?: string | null, emojiname?: string | null } | null };

export type UpsertTonightPathOrPathMutationVariables = Exact<{
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  profileIdPersonal: Scalars['String'];
}>;


export type UpsertTonightPathOrPathMutation = { __typename?: 'Mutation', upsertTonightPathOrPath?: boolean | null };

export type AddPersonalTotalsVenueMutationVariables = Exact<{
  profileIdPersonal: Scalars['String'];
  profileIdVenue: Scalars['String'];
}>;


export type AddPersonalTotalsVenueMutation = { __typename?: 'Mutation', addPersonalTotalsVenue?: boolean | null };

export type RemovePersonalTotalsVenueMutationVariables = Exact<{
  profileIdVenue: Scalars['String'];
  profileIdPersonal: Scalars['String'];
}>;


export type RemovePersonalTotalsVenueMutation = { __typename?: 'Mutation', removePersonalTotalsVenue?: boolean | null };

export type AddPersonalJoinsVenueMutationVariables = Exact<{
  profileIdPersonal: Scalars['String'];
  profileIdVenue: Scalars['String'];
}>;


export type AddPersonalJoinsVenueMutation = { __typename?: 'Mutation', addPersonalJoinsVenue?: boolean | null };

export type RemovePersonalJoinsVenueMutationVariables = Exact<{
  profileIdPersonal: Scalars['String'];
  profileIdVenue: Scalars['String'];
}>;


export type RemovePersonalJoinsVenueMutation = { __typename?: 'Mutation', removePersonalJoinsVenue?: boolean | null };

export type CurrentVenueQueryVariables = Exact<{
  where: ProfileWhereUniqueInput;
}>;


export type CurrentVenueQuery = { __typename?: 'Query', profile?: { __typename: 'Profile', id: string, ProfileType?: ProfileType | null, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, username: string, fullname?: string | null, nickname?: string | null, firstname?: string | null, lastname?: string | null, gender?: string | null, lookfor?: string | null, birthday?: any | null, hometown?: string | null, currenttown?: string | null } | null, DetailInformation?: { __typename?: 'DetailInformation', id: string, description?: string | null, established?: any | null, profileId: string, Tags: Array<{ __typename?: 'Tag', id: number, emoji?: string | null, name: string }> } | null, Relationships: Array<{ __typename?: 'Relationship', id: string, venueMetAt?: string | null, status: Array<Status>, createdAt: any, updatedAt: any }>, photos: Array<{ __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, position?: number | null, active: boolean, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any }>, Credentials?: { __typename?: 'Credentials', id: string, AuthenticationProvider?: { __typename?: 'AuthenticationProvider', id: string, phones: Array<{ __typename?: 'Phone', id: number, number: string, completeNumber?: string | null, countryCode?: string | null, canUseAsRecovery?: boolean | null, countryCallingCode?: string | null, createdAt: any, updatedAt: any }>, emails: Array<{ __typename?: 'Email', id: number, email: string, canUseAsRecovery?: boolean | null, createdAt: any, updatedAt: any }> } | null } | null, Personal?: { __typename?: 'Personal', id: string, profileId: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, PersonalStats?: { __typename?: 'PersonalStats', id: string, joinedVenueHistory: Array<{ __typename?: 'JoinedOut', id: string, personalProfileId?: string | null, venueProfileId: string, createdAt: any, updatedAt: any }>, totaledVenueHistory: Array<{ __typename?: 'TotaledOut', id: string, venueProfileId: string, personalProfileId: string, createdAt: any, updatedAt: any }> } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string, createdAt: any, updatedAt: any, joined: Array<{ __typename?: 'JoinedOut', id: string, venueProfileId: string, personalProfileId?: string | null }>, totaled: Array<{ __typename?: 'TotaledOut', id: string, venueProfileId: string, personalProfileId: string }> } | null } | null, Venue?: { __typename?: 'Venue', id: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string, joined: Array<{ __typename?: 'JoinedOut', id: string, venueProfileId: string, personalProfileId?: string | null }>, totaled: Array<{ __typename?: 'TotaledOut', id: string, venueProfileId: string, personalProfileId: string }> } | null, VenueStats: { __typename?: 'VenueStats', id: string, joinedVenueHistory: Array<{ __typename?: 'JoinedOut', id: string, venueProfileId: string, personalProfileId?: string | null, createdAt: any, updatedAt: any }>, totaledVenueHistory: Array<{ __typename?: 'TotaledOut', id: string, personalProfileId: string, venueProfileId: string, createdAt: any, updatedAt: any }> }, Location?: { __typename?: 'Location', id: string, h3Index: string, createdAt: any, updatedAt: any, Geometry?: { __typename?: 'Geometry', id: number, h3Index15?: string | null, latitude: number, longitude: number, type: string } | null, plusCode?: { __typename?: 'PluseCode', compoundCode?: string | null, globalCode: string, id: string } | null, Address?: { __typename?: 'Address', id: string, formattedAddress: string, AddressComponents: Array<{ __typename?: 'AddressComponent', id: number, short_name: string, long_name: string, types: Array<string>, h3Index15?: string | null }> } | null } | null } | null, Story?: { __typename?: 'Story', id: string, photos: Array<{ __typename?: 'Photo', id: string, position?: number | null, url: string }>, emojimood: Array<{ __typename: 'Emojimood', id: number, colors: Array<string>, emojiname?: string | null, emoji?: string | null }> } | null } | null };

export type GetLiveVenueTotalsQueryVariables = Exact<{
  profileIdVenue: Scalars['String'];
}>;


export type GetLiveVenueTotalsQuery = { __typename?: 'Query', getLiveVenueTotals?: { __typename?: 'LiveVenueTotals', totaled?: Array<{ __typename?: 'TotaledOut', id: string, personalProfileId: string }> | null, joined?: Array<{ __typename?: 'JoinedOut', id: string, personalProfileId?: string | null }> | null } | null };

export type CreatePersonalProfileMutationVariables = Exact<{
  data?: InputMaybe<CreatePersonalProfileDataInput>;
}>;


export type CreatePersonalProfileMutation = { __typename?: 'Mutation', createPersonalProfile?: { __typename?: 'CreateProfileResponse', Profile?: { __typename: 'Profile', id: string, ProfileType?: ProfileType | null, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, username: string, fullname?: string | null, nickname?: string | null, firstname?: string | null, lastname?: string | null, gender?: string | null, lookfor?: string | null, birthday?: any | null, hometown?: string | null, currenttown?: string | null } | null, DetailInformation?: { __typename?: 'DetailInformation', id: string, description?: string | null, established?: any | null, profileId: string, Tags: Array<{ __typename?: 'Tag', id: number, emoji?: string | null, name: string }> } | null, Relationships: Array<{ __typename?: 'Relationship', id: string, venueMetAt?: string | null, status: Array<Status>, createdAt: any, updatedAt: any }>, photos: Array<{ __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, position?: number | null, active: boolean, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any }>, Credentials?: { __typename?: 'Credentials', id: string, AuthenticationProvider?: { __typename?: 'AuthenticationProvider', id: string, phones: Array<{ __typename?: 'Phone', id: number, number: string, completeNumber?: string | null, countryCode?: string | null, canUseAsRecovery?: boolean | null, countryCallingCode?: string | null, createdAt: any, updatedAt: any }>, emails: Array<{ __typename?: 'Email', id: number, email: string, canUseAsRecovery?: boolean | null, createdAt: any, updatedAt: any }> } | null } | null, Personal?: { __typename?: 'Personal', id: string, profileId: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, PersonalStats?: { __typename?: 'PersonalStats', id: string, joinedVenueHistory: Array<{ __typename?: 'JoinedOut', id: string, personalProfileId?: string | null, venueProfileId: string, createdAt: any, updatedAt: any }>, totaledVenueHistory: Array<{ __typename?: 'TotaledOut', id: string, venueProfileId: string, personalProfileId: string, createdAt: any, updatedAt: any }> } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string, createdAt: any, updatedAt: any, joined: Array<{ __typename?: 'JoinedOut', id: string, venueProfileId: string, personalProfileId?: string | null }>, totaled: Array<{ __typename?: 'TotaledOut', id: string, venueProfileId: string, personalProfileId: string }> } | null } | null, Venue?: { __typename?: 'Venue', id: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string, joined: Array<{ __typename?: 'JoinedOut', id: string, venueProfileId: string, personalProfileId?: string | null }>, totaled: Array<{ __typename?: 'TotaledOut', id: string, venueProfileId: string, personalProfileId: string }> } | null, VenueStats: { __typename?: 'VenueStats', id: string, joinedVenueHistory: Array<{ __typename?: 'JoinedOut', id: string, venueProfileId: string, personalProfileId?: string | null, createdAt: any, updatedAt: any }>, totaledVenueHistory: Array<{ __typename?: 'TotaledOut', id: string, personalProfileId: string, venueProfileId: string, createdAt: any, updatedAt: any }> }, Location?: { __typename?: 'Location', id: string, h3Index: string, createdAt: any, updatedAt: any, Geometry?: { __typename?: 'Geometry', id: number, h3Index15?: string | null, latitude: number, longitude: number, type: string } | null, plusCode?: { __typename?: 'PluseCode', compoundCode?: string | null, globalCode: string, id: string } | null, Address?: { __typename?: 'Address', id: string, formattedAddress: string, AddressComponents: Array<{ __typename?: 'AddressComponent', id: number, short_name: string, long_name: string, types: Array<string>, h3Index15?: string | null }> } | null } | null } | null, Story?: { __typename?: 'Story', id: string, photos: Array<{ __typename?: 'Photo', id: string, position?: number | null, url: string }>, emojimood: Array<{ __typename: 'Emojimood', id: number, colors: Array<string>, emojiname?: string | null, emoji?: string | null }> } | null } | null } | { __typename?: 'ErrorProfiling', errorCode?: string | null, message?: string | null } | null };

export type CreateGuestProfileMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateGuestProfileMutation = { __typename?: 'Mutation', createGuestProfile?: { __typename?: 'CreateProfileResponse', Profile?: { __typename: 'Profile', id: string, ProfileType?: ProfileType | null, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, username: string, fullname?: string | null, nickname?: string | null, firstname?: string | null, lastname?: string | null, gender?: string | null, lookfor?: string | null, birthday?: any | null, hometown?: string | null, currenttown?: string | null } | null, DetailInformation?: { __typename?: 'DetailInformation', id: string, description?: string | null, established?: any | null, profileId: string, Tags: Array<{ __typename?: 'Tag', id: number, emoji?: string | null, name: string }> } | null, Relationships: Array<{ __typename?: 'Relationship', id: string, venueMetAt?: string | null, status: Array<Status>, createdAt: any, updatedAt: any }>, photos: Array<{ __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, position?: number | null, active: boolean, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any }>, Credentials?: { __typename?: 'Credentials', id: string, AuthenticationProvider?: { __typename?: 'AuthenticationProvider', id: string, phones: Array<{ __typename?: 'Phone', id: number, number: string, completeNumber?: string | null, countryCode?: string | null, canUseAsRecovery?: boolean | null, countryCallingCode?: string | null, createdAt: any, updatedAt: any }>, emails: Array<{ __typename?: 'Email', id: number, email: string, canUseAsRecovery?: boolean | null, createdAt: any, updatedAt: any }> } | null } | null, Personal?: { __typename?: 'Personal', id: string, profileId: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, PersonalStats?: { __typename?: 'PersonalStats', id: string, joinedVenueHistory: Array<{ __typename?: 'JoinedOut', id: string, personalProfileId?: string | null, venueProfileId: string, createdAt: any, updatedAt: any }>, totaledVenueHistory: Array<{ __typename?: 'TotaledOut', id: string, venueProfileId: string, personalProfileId: string, createdAt: any, updatedAt: any }> } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string, createdAt: any, updatedAt: any, joined: Array<{ __typename?: 'JoinedOut', id: string, venueProfileId: string, personalProfileId?: string | null }>, totaled: Array<{ __typename?: 'TotaledOut', id: string, venueProfileId: string, personalProfileId: string }> } | null } | null, Venue?: { __typename?: 'Venue', id: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string, joined: Array<{ __typename?: 'JoinedOut', id: string, venueProfileId: string, personalProfileId?: string | null }>, totaled: Array<{ __typename?: 'TotaledOut', id: string, venueProfileId: string, personalProfileId: string }> } | null, VenueStats: { __typename?: 'VenueStats', id: string, joinedVenueHistory: Array<{ __typename?: 'JoinedOut', id: string, venueProfileId: string, personalProfileId?: string | null, createdAt: any, updatedAt: any }>, totaledVenueHistory: Array<{ __typename?: 'TotaledOut', id: string, personalProfileId: string, venueProfileId: string, createdAt: any, updatedAt: any }> }, Location?: { __typename?: 'Location', id: string, h3Index: string, createdAt: any, updatedAt: any, Geometry?: { __typename?: 'Geometry', id: number, h3Index15?: string | null, latitude: number, longitude: number, type: string } | null, plusCode?: { __typename?: 'PluseCode', compoundCode?: string | null, globalCode: string, id: string } | null, Address?: { __typename?: 'Address', id: string, formattedAddress: string, AddressComponents: Array<{ __typename?: 'AddressComponent', id: number, short_name: string, long_name: string, types: Array<string>, h3Index15?: string | null }> } | null } | null } | null, Story?: { __typename?: 'Story', id: string, photos: Array<{ __typename?: 'Photo', id: string, position?: number | null, url: string }>, emojimood: Array<{ __typename: 'Emojimood', id: number, colors: Array<string>, emojiname?: string | null, emoji?: string | null }> } | null } | null } | { __typename?: 'ErrorProfiling', errorCode?: string | null, message?: string | null } | null };

export type UpdateProfileIdentifiableInformationMutationVariables = Exact<{
  data: IdentifiableInformationUpdateWithoutProfileInput;
  where: IdentifiableInformationWhereUniqueInput;
}>;


export type UpdateProfileIdentifiableInformationMutation = { __typename?: 'Mutation', updateProfileIdentifiableInformation?: { __typename?: 'ErrorProfiling', errorCode?: string | null, message?: string | null } | { __typename: 'Profile', id: string, ProfileType?: ProfileType | null, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, username: string, fullname?: string | null, nickname?: string | null, firstname?: string | null, lastname?: string | null, gender?: string | null, lookfor?: string | null, birthday?: any | null, hometown?: string | null, currenttown?: string | null } | null, DetailInformation?: { __typename?: 'DetailInformation', id: string, description?: string | null, established?: any | null, profileId: string, Tags: Array<{ __typename?: 'Tag', id: number, emoji?: string | null, name: string }> } | null, Relationships: Array<{ __typename?: 'Relationship', id: string, venueMetAt?: string | null, status: Array<Status>, createdAt: any, updatedAt: any }>, photos: Array<{ __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, position?: number | null, active: boolean, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any }>, Credentials?: { __typename?: 'Credentials', id: string, AuthenticationProvider?: { __typename?: 'AuthenticationProvider', id: string, phones: Array<{ __typename?: 'Phone', id: number, number: string, completeNumber?: string | null, countryCode?: string | null, canUseAsRecovery?: boolean | null, countryCallingCode?: string | null, createdAt: any, updatedAt: any }>, emails: Array<{ __typename?: 'Email', id: number, email: string, canUseAsRecovery?: boolean | null, createdAt: any, updatedAt: any }> } | null } | null, Personal?: { __typename?: 'Personal', id: string, profileId: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, PersonalStats?: { __typename?: 'PersonalStats', id: string, joinedVenueHistory: Array<{ __typename?: 'JoinedOut', id: string, personalProfileId?: string | null, venueProfileId: string, createdAt: any, updatedAt: any }>, totaledVenueHistory: Array<{ __typename?: 'TotaledOut', id: string, venueProfileId: string, personalProfileId: string, createdAt: any, updatedAt: any }> } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string, createdAt: any, updatedAt: any, joined: Array<{ __typename?: 'JoinedOut', id: string, venueProfileId: string, personalProfileId?: string | null }>, totaled: Array<{ __typename?: 'TotaledOut', id: string, venueProfileId: string, personalProfileId: string }> } | null } | null, Venue?: { __typename?: 'Venue', id: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string, joined: Array<{ __typename?: 'JoinedOut', id: string, venueProfileId: string, personalProfileId?: string | null }>, totaled: Array<{ __typename?: 'TotaledOut', id: string, venueProfileId: string, personalProfileId: string }> } | null, VenueStats: { __typename?: 'VenueStats', id: string, joinedVenueHistory: Array<{ __typename?: 'JoinedOut', id: string, venueProfileId: string, personalProfileId?: string | null, createdAt: any, updatedAt: any }>, totaledVenueHistory: Array<{ __typename?: 'TotaledOut', id: string, personalProfileId: string, venueProfileId: string, createdAt: any, updatedAt: any }> }, Location?: { __typename?: 'Location', id: string, h3Index: string, createdAt: any, updatedAt: any, Geometry?: { __typename?: 'Geometry', id: number, h3Index15?: string | null, latitude: number, longitude: number, type: string } | null, plusCode?: { __typename?: 'PluseCode', compoundCode?: string | null, globalCode: string, id: string } | null, Address?: { __typename?: 'Address', id: string, formattedAddress: string, AddressComponents: Array<{ __typename?: 'AddressComponent', id: number, short_name: string, long_name: string, types: Array<string>, h3Index15?: string | null }> } | null } | null } | null, Story?: { __typename?: 'Story', id: string, photos: Array<{ __typename?: 'Photo', id: string, position?: number | null, url: string }>, emojimood: Array<{ __typename: 'Emojimood', id: number, colors: Array<string>, emojiname?: string | null, emoji?: string | null }> } | null } | null };

export type UpdateOneProfileMutationVariables = Exact<{
  data: ProfileUpdateInput;
  where: ProfileWhereUniqueInput;
}>;


export type UpdateOneProfileMutation = { __typename?: 'Mutation', updateOneProfile?: { __typename: 'Profile', id: string, ProfileType?: ProfileType | null, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, username: string, fullname?: string | null, nickname?: string | null, firstname?: string | null, lastname?: string | null, gender?: string | null, lookfor?: string | null, birthday?: any | null, hometown?: string | null, currenttown?: string | null } | null, DetailInformation?: { __typename?: 'DetailInformation', id: string, description?: string | null, established?: any | null, profileId: string, Tags: Array<{ __typename?: 'Tag', id: number, emoji?: string | null, name: string }> } | null, Relationships: Array<{ __typename?: 'Relationship', id: string, venueMetAt?: string | null, status: Array<Status>, createdAt: any, updatedAt: any }>, photos: Array<{ __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, position?: number | null, active: boolean, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any }>, Credentials?: { __typename?: 'Credentials', id: string, AuthenticationProvider?: { __typename?: 'AuthenticationProvider', id: string, phones: Array<{ __typename?: 'Phone', id: number, number: string, completeNumber?: string | null, countryCode?: string | null, canUseAsRecovery?: boolean | null, countryCallingCode?: string | null, createdAt: any, updatedAt: any }>, emails: Array<{ __typename?: 'Email', id: number, email: string, canUseAsRecovery?: boolean | null, createdAt: any, updatedAt: any }> } | null } | null, Personal?: { __typename?: 'Personal', id: string, profileId: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, PersonalStats?: { __typename?: 'PersonalStats', id: string, joinedVenueHistory: Array<{ __typename?: 'JoinedOut', id: string, personalProfileId?: string | null, venueProfileId: string, createdAt: any, updatedAt: any }>, totaledVenueHistory: Array<{ __typename?: 'TotaledOut', id: string, venueProfileId: string, personalProfileId: string, createdAt: any, updatedAt: any }> } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string, createdAt: any, updatedAt: any, joined: Array<{ __typename?: 'JoinedOut', id: string, venueProfileId: string, personalProfileId?: string | null }>, totaled: Array<{ __typename?: 'TotaledOut', id: string, venueProfileId: string, personalProfileId: string }> } | null } | null, Venue?: { __typename?: 'Venue', id: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string, joined: Array<{ __typename?: 'JoinedOut', id: string, venueProfileId: string, personalProfileId?: string | null }>, totaled: Array<{ __typename?: 'TotaledOut', id: string, venueProfileId: string, personalProfileId: string }> } | null, VenueStats: { __typename?: 'VenueStats', id: string, joinedVenueHistory: Array<{ __typename?: 'JoinedOut', id: string, venueProfileId: string, personalProfileId?: string | null, createdAt: any, updatedAt: any }>, totaledVenueHistory: Array<{ __typename?: 'TotaledOut', id: string, personalProfileId: string, venueProfileId: string, createdAt: any, updatedAt: any }> }, Location?: { __typename?: 'Location', id: string, h3Index: string, createdAt: any, updatedAt: any, Geometry?: { __typename?: 'Geometry', id: number, h3Index15?: string | null, latitude: number, longitude: number, type: string } | null, plusCode?: { __typename?: 'PluseCode', compoundCode?: string | null, globalCode: string, id: string } | null, Address?: { __typename?: 'Address', id: string, formattedAddress: string, AddressComponents: Array<{ __typename?: 'AddressComponent', id: number, short_name: string, long_name: string, types: Array<string>, h3Index15?: string | null }> } | null } | null } | null, Story?: { __typename?: 'Story', id: string, photos: Array<{ __typename?: 'Photo', id: string, position?: number | null, url: string }>, emojimood: Array<{ __typename: 'Emojimood', id: number, colors: Array<string>, emojiname?: string | null, emoji?: string | null }> } | null } | null };

export type ProfileQueryVariables = Exact<{
  where: ProfileWhereUniqueInput;
}>;


export type ProfileQuery = { __typename?: 'Query', profile?: { __typename: 'Profile', id: string, ProfileType?: ProfileType | null, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, username: string, fullname?: string | null, nickname?: string | null, firstname?: string | null, lastname?: string | null, gender?: string | null, lookfor?: string | null, birthday?: any | null, hometown?: string | null, currenttown?: string | null } | null, DetailInformation?: { __typename?: 'DetailInformation', id: string, description?: string | null, established?: any | null, profileId: string, Tags: Array<{ __typename?: 'Tag', id: number, emoji?: string | null, name: string }> } | null, Relationships: Array<{ __typename?: 'Relationship', id: string, venueMetAt?: string | null, status: Array<Status>, createdAt: any, updatedAt: any }>, photos: Array<{ __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, position?: number | null, active: boolean, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any }>, Credentials?: { __typename?: 'Credentials', id: string, AuthenticationProvider?: { __typename?: 'AuthenticationProvider', id: string, phones: Array<{ __typename?: 'Phone', id: number, number: string, completeNumber?: string | null, countryCode?: string | null, canUseAsRecovery?: boolean | null, countryCallingCode?: string | null, createdAt: any, updatedAt: any }>, emails: Array<{ __typename?: 'Email', id: number, email: string, canUseAsRecovery?: boolean | null, createdAt: any, updatedAt: any }> } | null } | null, Personal?: { __typename?: 'Personal', id: string, profileId: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, PersonalStats?: { __typename?: 'PersonalStats', id: string, joinedVenueHistory: Array<{ __typename?: 'JoinedOut', id: string, personalProfileId?: string | null, venueProfileId: string, createdAt: any, updatedAt: any }>, totaledVenueHistory: Array<{ __typename?: 'TotaledOut', id: string, venueProfileId: string, personalProfileId: string, createdAt: any, updatedAt: any }> } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string, createdAt: any, updatedAt: any, joined: Array<{ __typename?: 'JoinedOut', id: string, venueProfileId: string, personalProfileId?: string | null }>, totaled: Array<{ __typename?: 'TotaledOut', id: string, venueProfileId: string, personalProfileId: string }> } | null } | null, Venue?: { __typename?: 'Venue', id: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string, joined: Array<{ __typename?: 'JoinedOut', id: string, venueProfileId: string, personalProfileId?: string | null }>, totaled: Array<{ __typename?: 'TotaledOut', id: string, venueProfileId: string, personalProfileId: string }> } | null, VenueStats: { __typename?: 'VenueStats', id: string, joinedVenueHistory: Array<{ __typename?: 'JoinedOut', id: string, venueProfileId: string, personalProfileId?: string | null, createdAt: any, updatedAt: any }>, totaledVenueHistory: Array<{ __typename?: 'TotaledOut', id: string, personalProfileId: string, venueProfileId: string, createdAt: any, updatedAt: any }> }, Location?: { __typename?: 'Location', id: string, h3Index: string, createdAt: any, updatedAt: any, Geometry?: { __typename?: 'Geometry', id: number, h3Index15?: string | null, latitude: number, longitude: number, type: string } | null, plusCode?: { __typename?: 'PluseCode', compoundCode?: string | null, globalCode: string, id: string } | null, Address?: { __typename?: 'Address', id: string, formattedAddress: string, AddressComponents: Array<{ __typename?: 'AddressComponent', id: number, short_name: string, long_name: string, types: Array<string>, h3Index15?: string | null }> } | null } | null } | null, Story?: { __typename?: 'Story', id: string, photos: Array<{ __typename?: 'Photo', id: string, position?: number | null, url: string }>, emojimood: Array<{ __typename: 'Emojimood', id: number, colors: Array<string>, emojiname?: string | null, emoji?: string | null }> } | null } | null };

export type ProfilesQueryVariables = Exact<{
  where?: InputMaybe<ProfileWhereInput>;
}>;


export type ProfilesQuery = { __typename?: 'Query', profiles: Array<{ __typename: 'Profile', id: string, ProfileType?: ProfileType | null, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, username: string, fullname?: string | null, nickname?: string | null, firstname?: string | null, lastname?: string | null, gender?: string | null, lookfor?: string | null, birthday?: any | null, hometown?: string | null, currenttown?: string | null } | null, DetailInformation?: { __typename?: 'DetailInformation', id: string, description?: string | null, established?: any | null, profileId: string, Tags: Array<{ __typename?: 'Tag', id: number, emoji?: string | null, name: string }> } | null, Relationships: Array<{ __typename?: 'Relationship', id: string, venueMetAt?: string | null, status: Array<Status>, createdAt: any, updatedAt: any }>, photos: Array<{ __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, position?: number | null, active: boolean, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any }>, Credentials?: { __typename?: 'Credentials', id: string, AuthenticationProvider?: { __typename?: 'AuthenticationProvider', id: string, phones: Array<{ __typename?: 'Phone', id: number, number: string, completeNumber?: string | null, countryCode?: string | null, canUseAsRecovery?: boolean | null, countryCallingCode?: string | null, createdAt: any, updatedAt: any }>, emails: Array<{ __typename?: 'Email', id: number, email: string, canUseAsRecovery?: boolean | null, createdAt: any, updatedAt: any }> } | null } | null, Personal?: { __typename?: 'Personal', id: string, profileId: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, PersonalStats?: { __typename?: 'PersonalStats', id: string, joinedVenueHistory: Array<{ __typename?: 'JoinedOut', id: string, personalProfileId?: string | null, venueProfileId: string, createdAt: any, updatedAt: any }>, totaledVenueHistory: Array<{ __typename?: 'TotaledOut', id: string, venueProfileId: string, personalProfileId: string, createdAt: any, updatedAt: any }> } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string, createdAt: any, updatedAt: any, joined: Array<{ __typename?: 'JoinedOut', id: string, venueProfileId: string, personalProfileId?: string | null }>, totaled: Array<{ __typename?: 'TotaledOut', id: string, venueProfileId: string, personalProfileId: string }> } | null } | null, Venue?: { __typename?: 'Venue', id: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string, joined: Array<{ __typename?: 'JoinedOut', id: string, venueProfileId: string, personalProfileId?: string | null }>, totaled: Array<{ __typename?: 'TotaledOut', id: string, venueProfileId: string, personalProfileId: string }> } | null, VenueStats: { __typename?: 'VenueStats', id: string, joinedVenueHistory: Array<{ __typename?: 'JoinedOut', id: string, venueProfileId: string, personalProfileId?: string | null, createdAt: any, updatedAt: any }>, totaledVenueHistory: Array<{ __typename?: 'TotaledOut', id: string, personalProfileId: string, venueProfileId: string, createdAt: any, updatedAt: any }> }, Location?: { __typename?: 'Location', id: string, h3Index: string, createdAt: any, updatedAt: any, Geometry?: { __typename?: 'Geometry', id: number, h3Index15?: string | null, latitude: number, longitude: number, type: string } | null, plusCode?: { __typename?: 'PluseCode', compoundCode?: string | null, globalCode: string, id: string } | null, Address?: { __typename?: 'Address', id: string, formattedAddress: string, AddressComponents: Array<{ __typename?: 'AddressComponent', id: number, short_name: string, long_name: string, types: Array<string>, h3Index15?: string | null }> } | null } | null } | null, Story?: { __typename?: 'Story', id: string, photos: Array<{ __typename?: 'Photo', id: string, position?: number | null, url: string }>, emojimood: Array<{ __typename: 'Emojimood', id: number, colors: Array<string>, emojiname?: string | null, emoji?: string | null }> } | null }> };

export type VenueQueryVariables = Exact<{
  where: VenueWhereUniqueInput;
}>;


export type VenueQuery = { __typename?: 'Query', venue?: { __typename?: 'Venue', id: string, createdAt: any, updatedAt: any, Profile: { __typename: 'Profile', id: string, ProfileType?: ProfileType | null, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, username: string, fullname?: string | null, nickname?: string | null, firstname?: string | null, lastname?: string | null, gender?: string | null, lookfor?: string | null, birthday?: any | null, hometown?: string | null, currenttown?: string | null } | null, DetailInformation?: { __typename?: 'DetailInformation', id: string, description?: string | null, established?: any | null, profileId: string, Tags: Array<{ __typename?: 'Tag', id: number, emoji?: string | null, name: string }> } | null, Relationships: Array<{ __typename?: 'Relationship', id: string, venueMetAt?: string | null, status: Array<Status>, createdAt: any, updatedAt: any }>, photos: Array<{ __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, position?: number | null, active: boolean, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any }>, Credentials?: { __typename?: 'Credentials', id: string, AuthenticationProvider?: { __typename?: 'AuthenticationProvider', id: string, phones: Array<{ __typename?: 'Phone', id: number, number: string, completeNumber?: string | null, countryCode?: string | null, canUseAsRecovery?: boolean | null, countryCallingCode?: string | null, createdAt: any, updatedAt: any }>, emails: Array<{ __typename?: 'Email', id: number, email: string, canUseAsRecovery?: boolean | null, createdAt: any, updatedAt: any }> } | null } | null, Personal?: { __typename?: 'Personal', id: string, profileId: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, PersonalStats?: { __typename?: 'PersonalStats', id: string, joinedVenueHistory: Array<{ __typename?: 'JoinedOut', id: string, personalProfileId?: string | null, venueProfileId: string, createdAt: any, updatedAt: any }>, totaledVenueHistory: Array<{ __typename?: 'TotaledOut', id: string, venueProfileId: string, personalProfileId: string, createdAt: any, updatedAt: any }> } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string, createdAt: any, updatedAt: any, joined: Array<{ __typename?: 'JoinedOut', id: string, venueProfileId: string, personalProfileId?: string | null }>, totaled: Array<{ __typename?: 'TotaledOut', id: string, venueProfileId: string, personalProfileId: string }> } | null } | null, Venue?: { __typename?: 'Venue', id: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string, joined: Array<{ __typename?: 'JoinedOut', id: string, venueProfileId: string, personalProfileId?: string | null }>, totaled: Array<{ __typename?: 'TotaledOut', id: string, venueProfileId: string, personalProfileId: string }> } | null, VenueStats: { __typename?: 'VenueStats', id: string, joinedVenueHistory: Array<{ __typename?: 'JoinedOut', id: string, venueProfileId: string, personalProfileId?: string | null, createdAt: any, updatedAt: any }>, totaledVenueHistory: Array<{ __typename?: 'TotaledOut', id: string, personalProfileId: string, venueProfileId: string, createdAt: any, updatedAt: any }> }, Location?: { __typename?: 'Location', id: string, h3Index: string, createdAt: any, updatedAt: any, Geometry?: { __typename?: 'Geometry', id: number, h3Index15?: string | null, latitude: number, longitude: number, type: string } | null, plusCode?: { __typename?: 'PluseCode', compoundCode?: string | null, globalCode: string, id: string } | null, Address?: { __typename?: 'Address', id: string, formattedAddress: string, AddressComponents: Array<{ __typename?: 'AddressComponent', id: number, short_name: string, long_name: string, types: Array<string>, h3Index15?: string | null }> } | null } | null } | null, Story?: { __typename?: 'Story', id: string, photos: Array<{ __typename?: 'Photo', id: string, position?: number | null, url: string }>, emojimood: Array<{ __typename: 'Emojimood', id: number, colors: Array<string>, emojiname?: string | null, emoji?: string | null }> } | null } } | null };

export type VenuesQueryVariables = Exact<{
  where?: InputMaybe<VenueWhereInput>;
}>;


export type VenuesQuery = { __typename?: 'Query', venues: Array<{ __typename?: 'Venue', id: string, createdAt: any, updatedAt: any, Profile: { __typename: 'Profile', id: string, ProfileType?: ProfileType | null, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, username: string, fullname?: string | null, nickname?: string | null, firstname?: string | null, lastname?: string | null, gender?: string | null, lookfor?: string | null, birthday?: any | null, hometown?: string | null, currenttown?: string | null } | null, DetailInformation?: { __typename?: 'DetailInformation', id: string, description?: string | null, established?: any | null, profileId: string, Tags: Array<{ __typename?: 'Tag', id: number, emoji?: string | null, name: string }> } | null, Relationships: Array<{ __typename?: 'Relationship', id: string, venueMetAt?: string | null, status: Array<Status>, createdAt: any, updatedAt: any }>, photos: Array<{ __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, position?: number | null, active: boolean, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any }>, Credentials?: { __typename?: 'Credentials', id: string, AuthenticationProvider?: { __typename?: 'AuthenticationProvider', id: string, phones: Array<{ __typename?: 'Phone', id: number, number: string, completeNumber?: string | null, countryCode?: string | null, canUseAsRecovery?: boolean | null, countryCallingCode?: string | null, createdAt: any, updatedAt: any }>, emails: Array<{ __typename?: 'Email', id: number, email: string, canUseAsRecovery?: boolean | null, createdAt: any, updatedAt: any }> } | null } | null, Personal?: { __typename?: 'Personal', id: string, profileId: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, PersonalStats?: { __typename?: 'PersonalStats', id: string, joinedVenueHistory: Array<{ __typename?: 'JoinedOut', id: string, personalProfileId?: string | null, venueProfileId: string, createdAt: any, updatedAt: any }>, totaledVenueHistory: Array<{ __typename?: 'TotaledOut', id: string, venueProfileId: string, personalProfileId: string, createdAt: any, updatedAt: any }> } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string, createdAt: any, updatedAt: any, joined: Array<{ __typename?: 'JoinedOut', id: string, venueProfileId: string, personalProfileId?: string | null }>, totaled: Array<{ __typename?: 'TotaledOut', id: string, venueProfileId: string, personalProfileId: string }> } | null } | null, Venue?: { __typename?: 'Venue', id: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string, joined: Array<{ __typename?: 'JoinedOut', id: string, venueProfileId: string, personalProfileId?: string | null }>, totaled: Array<{ __typename?: 'TotaledOut', id: string, venueProfileId: string, personalProfileId: string }> } | null, VenueStats: { __typename?: 'VenueStats', id: string, joinedVenueHistory: Array<{ __typename?: 'JoinedOut', id: string, venueProfileId: string, personalProfileId?: string | null, createdAt: any, updatedAt: any }>, totaledVenueHistory: Array<{ __typename?: 'TotaledOut', id: string, personalProfileId: string, venueProfileId: string, createdAt: any, updatedAt: any }> }, Location?: { __typename?: 'Location', id: string, h3Index: string, createdAt: any, updatedAt: any, Geometry?: { __typename?: 'Geometry', id: number, h3Index15?: string | null, latitude: number, longitude: number, type: string } | null, plusCode?: { __typename?: 'PluseCode', compoundCode?: string | null, globalCode: string, id: string } | null, Address?: { __typename?: 'Address', id: string, formattedAddress: string, AddressComponents: Array<{ __typename?: 'AddressComponent', id: number, short_name: string, long_name: string, types: Array<string>, h3Index15?: string | null }> } | null } | null } | null, Story?: { __typename?: 'Story', id: string, photos: Array<{ __typename?: 'Photo', id: string, position?: number | null, url: string }>, emojimood: Array<{ __typename: 'Emojimood', id: number, colors: Array<string>, emojiname?: string | null, emoji?: string | null }> } | null } }> };

export type VenuesNearbyQueryVariables = Exact<{
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
}>;


export type VenuesNearbyQuery = { __typename?: 'Query', venuesNearby?: Array<{ __typename: 'Profile', id: string, ProfileType?: ProfileType | null, IdentifiableInformation?: { __typename?: 'IdentifiableInformation', id: string, username: string, fullname?: string | null, nickname?: string | null, firstname?: string | null, lastname?: string | null, gender?: string | null, lookfor?: string | null, birthday?: any | null, hometown?: string | null, currenttown?: string | null } | null, DetailInformation?: { __typename?: 'DetailInformation', id: string, description?: string | null, established?: any | null, profileId: string, Tags: Array<{ __typename?: 'Tag', id: number, emoji?: string | null, name: string }> } | null, Relationships: Array<{ __typename?: 'Relationship', id: string, venueMetAt?: string | null, status: Array<Status>, createdAt: any, updatedAt: any }>, photos: Array<{ __typename?: 'Photo', id: string, url: string, type?: PhotoType | null, position?: number | null, active: boolean, ratio?: string | null, blurhash?: string | null, createdAt: any, updatedAt: any }>, Credentials?: { __typename?: 'Credentials', id: string, AuthenticationProvider?: { __typename?: 'AuthenticationProvider', id: string, phones: Array<{ __typename?: 'Phone', id: number, number: string, completeNumber?: string | null, countryCode?: string | null, canUseAsRecovery?: boolean | null, countryCallingCode?: string | null, createdAt: any, updatedAt: any }>, emails: Array<{ __typename?: 'Email', id: number, email: string, canUseAsRecovery?: boolean | null, createdAt: any, updatedAt: any }> } | null } | null, Personal?: { __typename?: 'Personal', id: string, profileId: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, PersonalStats?: { __typename?: 'PersonalStats', id: string, joinedVenueHistory: Array<{ __typename?: 'JoinedOut', id: string, personalProfileId?: string | null, venueProfileId: string, createdAt: any, updatedAt: any }>, totaledVenueHistory: Array<{ __typename?: 'TotaledOut', id: string, venueProfileId: string, personalProfileId: string, createdAt: any, updatedAt: any }> } | null, LiveOutPersonal?: { __typename?: 'LiveOutPersonal', id: string, createdAt: any, updatedAt: any, joined: Array<{ __typename?: 'JoinedOut', id: string, venueProfileId: string, personalProfileId?: string | null }>, totaled: Array<{ __typename?: 'TotaledOut', id: string, venueProfileId: string, personalProfileId: string }> } | null } | null, Venue?: { __typename?: 'Venue', id: string, createdAt: any, updatedAt: any, Profile: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any }, LiveOutVenue?: { __typename?: 'LiveOutVenue', id: string, joined: Array<{ __typename?: 'JoinedOut', id: string, venueProfileId: string, personalProfileId?: string | null }>, totaled: Array<{ __typename?: 'TotaledOut', id: string, venueProfileId: string, personalProfileId: string }> } | null, VenueStats: { __typename?: 'VenueStats', id: string, joinedVenueHistory: Array<{ __typename?: 'JoinedOut', id: string, venueProfileId: string, personalProfileId?: string | null, createdAt: any, updatedAt: any }>, totaledVenueHistory: Array<{ __typename?: 'TotaledOut', id: string, personalProfileId: string, venueProfileId: string, createdAt: any, updatedAt: any }> }, Location?: { __typename?: 'Location', id: string, h3Index: string, createdAt: any, updatedAt: any, Geometry?: { __typename?: 'Geometry', id: number, h3Index15?: string | null, latitude: number, longitude: number, type: string } | null, plusCode?: { __typename?: 'PluseCode', compoundCode?: string | null, globalCode: string, id: string } | null, Address?: { __typename?: 'Address', id: string, formattedAddress: string, AddressComponents: Array<{ __typename?: 'AddressComponent', id: number, short_name: string, long_name: string, types: Array<string>, h3Index15?: string | null }> } | null } | null } | null, Story?: { __typename?: 'Story', id: string, photos: Array<{ __typename?: 'Photo', id: string, position?: number | null, url: string }>, emojimood: Array<{ __typename: 'Emojimood', id: number, colors: Array<string>, emojiname?: string | null, emoji?: string | null }> } | null } | null> | null };

export type GetAllCountriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCountriesQuery = { __typename?: 'Query', getAllCountries?: Array<any | null> | null };

export type GetAllStatesByCountryQueryVariables = Exact<{
  country: Scalars['String'];
}>;


export type GetAllStatesByCountryQuery = { __typename?: 'Query', getAllStatesByCountry?: Array<any | null> | null };

export type GetAllCitiesByStateQueryVariables = Exact<{
  country: Scalars['String'];
  state: Scalars['String'];
}>;


export type GetAllCitiesByStateQuery = { __typename?: 'Query', getAllCitiesByState?: Array<any | null> | null };

export type UpdateStoryPhotosMutationVariables = Exact<{
  disconnectId: Scalars['String'];
  photos?: InputMaybe<PhotoCreateManyProfileInputEnvelope>;
  storyId?: InputMaybe<Scalars['String']>;
}>;


export type UpdateStoryPhotosMutation = { __typename?: 'Mutation', updateStoryPhotos?: boolean | null };

export type UpdateStoryEmojimoodMutationVariables = Exact<{
  emojimoodId: Scalars['Int'];
  storyId?: InputMaybe<Scalars['String']>;
}>;


export type UpdateStoryEmojimoodMutation = { __typename?: 'Mutation', updateStoryEmojimood?: boolean | null };

export const Error_FragmentFragmentDoc = gql`
    fragment ERROR_FRAGMENT on Error {
  type
  errorCode
  message
}
    `;
export const Error_Profiling_FragmentFragmentDoc = gql`
    fragment ERROR_PROFILING_FRAGMENT on ErrorProfiling {
  errorCode
  message
}
    `;
export const Success_FragmentFragmentDoc = gql`
    fragment SUCCESS_FRAGMENT on Success {
  type
  successCode
  message
}
    `;
export const Code_FragmentFragmentDoc = gql`
    fragment CODE_FRAGMENT on Code {
  id
  code
}
    `;
export const Indetifiable_Information_FragmentFragmentDoc = gql`
    fragment INDETIFIABLE_INFORMATION_FRAGMENT on IdentifiableInformation {
  id
  username
  fullname
  nickname
  firstname
  lastname
  gender
  lookfor
  birthday
  hometown
  currenttown
}
    `;
export const Detail_Information_FragmentFragmentDoc = gql`
    fragment DETAIL_INFORMATION_FRAGMENT on DetailInformation {
  id
  Tags {
    id
    emoji
    name
  }
  description
  established
  profileId
}
    `;
export const Credentials_FragmentFragmentDoc = gql`
    fragment CREDENTIALS_FRAGMENT on Credentials {
  id
  AuthenticationProvider {
    id
    phones {
      id
      number
      completeNumber
      countryCode
      canUseAsRecovery
      countryCallingCode
      createdAt
      updatedAt
    }
    emails {
      id
      email
      canUseAsRecovery
      createdAt
      updatedAt
    }
  }
}
    `;
export const Location_FragmentFragmentDoc = gql`
    fragment LOCATION_FRAGMENT on Location {
  id
  h3Index
  Geometry {
    id
    h3Index15
    latitude
    longitude
    type
  }
  plusCode {
    compoundCode
    globalCode
    id
  }
  Address {
    id
    formattedAddress
    AddressComponents {
      id
      short_name
      long_name
      types
      h3Index15
    }
  }
  createdAt
  updatedAt
}
    `;
export const Profile_FragmentFragmentDoc = gql`
    fragment PROFILE_FRAGMENT on Profile {
  __typename
  id
  ProfileType
  IdentifiableInformation {
    ...INDETIFIABLE_INFORMATION_FRAGMENT
  }
  DetailInformation {
    ...DETAIL_INFORMATION_FRAGMENT
  }
  Relationships {
    id
    venueMetAt
    status
    createdAt
    updatedAt
  }
  photos {
    id
    url
    type
    position
    active
    ratio
    blurhash
    createdAt
    updatedAt
  }
  Credentials {
    ...CREDENTIALS_FRAGMENT
  }
  Personal {
    id
    Profile {
      id
      createdAt
      updatedAt
    }
    profileId
    PersonalStats {
      id
      joinedVenueHistory {
        id
        personalProfileId
        venueProfileId
        createdAt
        updatedAt
      }
      totaledVenueHistory {
        id
        venueProfileId
        personalProfileId
        createdAt
        updatedAt
      }
    }
    LiveOutPersonal {
      id
      joined {
        id
        venueProfileId
        personalProfileId
      }
      totaled {
        id
        venueProfileId
        personalProfileId
      }
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
  }
  Venue {
    id
    Profile {
      id
      createdAt
      updatedAt
    }
    LiveOutVenue {
      id
      joined {
        id
        venueProfileId
        personalProfileId
      }
      totaled {
        id
        venueProfileId
        personalProfileId
      }
    }
    VenueStats {
      id
      joinedVenueHistory {
        id
        venueProfileId
        personalProfileId
        createdAt
        updatedAt
      }
      totaledVenueHistory {
        id
        personalProfileId
        venueProfileId
        createdAt
        updatedAt
      }
    }
    Location {
      ...LOCATION_FRAGMENT
    }
    createdAt
    updatedAt
  }
  Story {
    id
    photos {
      id
      position
      url
    }
    emojimood {
      __typename
      id
      colors
      emojiname
      emoji
    }
  }
}
    ${Indetifiable_Information_FragmentFragmentDoc}
${Detail_Information_FragmentFragmentDoc}
${Credentials_FragmentFragmentDoc}
${Location_FragmentFragmentDoc}`;
export const Personal_FragmentFragmentDoc = gql`
    fragment PERSONAL_FRAGMENT on Personal {
  id
  Profile {
    ...PROFILE_FRAGMENT
  }
  updatedAt
  createdAt
}
    ${Profile_FragmentFragmentDoc}`;
export const Venue_FragmentFragmentDoc = gql`
    fragment VENUE_FRAGMENT on Venue {
  id
  Profile {
    ...PROFILE_FRAGMENT
  }
  createdAt
  updatedAt
}
    ${Profile_FragmentFragmentDoc}`;
export const CreateADeviceManagerDocument = gql`
    mutation createADeviceManager($profileId: String!) {
  createADeviceManager(profileId: $profileId) {
    ... on Success {
      type
      successCode
      message
    }
    ... on Error {
      type
      errorCode
      message
    }
  }
}
    `;
export type CreateADeviceManagerMutationFn = Apollo.MutationFunction<CreateADeviceManagerMutation, CreateADeviceManagerMutationVariables>;

/**
 * __useCreateADeviceManagerMutation__
 *
 * To run a mutation, you first call `useCreateADeviceManagerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateADeviceManagerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createADeviceManagerMutation, { data, loading, error }] = useCreateADeviceManagerMutation({
 *   variables: {
 *      profileId: // value for 'profileId'
 *   },
 * });
 */
export function useCreateADeviceManagerMutation(baseOptions?: Apollo.MutationHookOptions<CreateADeviceManagerMutation, CreateADeviceManagerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateADeviceManagerMutation, CreateADeviceManagerMutationVariables>(CreateADeviceManagerDocument, options);
      }
export type CreateADeviceManagerMutationHookResult = ReturnType<typeof useCreateADeviceManagerMutation>;
export type CreateADeviceManagerMutationResult = Apollo.MutationResult<CreateADeviceManagerMutation>;
export type CreateADeviceManagerMutationOptions = Apollo.BaseMutationOptions<CreateADeviceManagerMutation, CreateADeviceManagerMutationVariables>;
export const SwitchDeviceProfileDocument = gql`
    mutation switchDeviceProfile($profileId: String!) {
  switchDeviceProfile(profileId: $profileId) {
    ... on Success {
      type
      successCode
      message
    }
    ... on DeviceManager {
      id
      DeviceProfile {
        id
        isActive
        accesstoken
        refreshtoken
        deviceManagerId
        Profile {
          ...PROFILE_FRAGMENT
        }
      }
    }
    ... on Error {
      type
      errorCode
      message
    }
  }
}
    ${Profile_FragmentFragmentDoc}`;
export type SwitchDeviceProfileMutationFn = Apollo.MutationFunction<SwitchDeviceProfileMutation, SwitchDeviceProfileMutationVariables>;

/**
 * __useSwitchDeviceProfileMutation__
 *
 * To run a mutation, you first call `useSwitchDeviceProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSwitchDeviceProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [switchDeviceProfileMutation, { data, loading, error }] = useSwitchDeviceProfileMutation({
 *   variables: {
 *      profileId: // value for 'profileId'
 *   },
 * });
 */
export function useSwitchDeviceProfileMutation(baseOptions?: Apollo.MutationHookOptions<SwitchDeviceProfileMutation, SwitchDeviceProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SwitchDeviceProfileMutation, SwitchDeviceProfileMutationVariables>(SwitchDeviceProfileDocument, options);
      }
export type SwitchDeviceProfileMutationHookResult = ReturnType<typeof useSwitchDeviceProfileMutation>;
export type SwitchDeviceProfileMutationResult = Apollo.MutationResult<SwitchDeviceProfileMutation>;
export type SwitchDeviceProfileMutationOptions = Apollo.BaseMutationOptions<SwitchDeviceProfileMutation, SwitchDeviceProfileMutationVariables>;
export const RefreshDeviceManagerDocument = gql`
    mutation refreshDeviceManager {
  refreshDeviceManager {
    ... on Success {
      type
      message
      successCode
    }
    ... on DeviceManager {
      __typename
      id
      DeviceProfile {
        id
        isActive
        refreshtoken
        accesstoken
        AppType
        DeviceManager {
          id
        }
        deviceManagerId
        Profile {
          ...PROFILE_FRAGMENT
        }
      }
    }
    ... on Error {
      errorCode
      message
      type
    }
  }
}
    ${Profile_FragmentFragmentDoc}`;
export type RefreshDeviceManagerMutationFn = Apollo.MutationFunction<RefreshDeviceManagerMutation, RefreshDeviceManagerMutationVariables>;

/**
 * __useRefreshDeviceManagerMutation__
 *
 * To run a mutation, you first call `useRefreshDeviceManagerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshDeviceManagerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshDeviceManagerMutation, { data, loading, error }] = useRefreshDeviceManagerMutation({
 *   variables: {
 *   },
 * });
 */
export function useRefreshDeviceManagerMutation(baseOptions?: Apollo.MutationHookOptions<RefreshDeviceManagerMutation, RefreshDeviceManagerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshDeviceManagerMutation, RefreshDeviceManagerMutationVariables>(RefreshDeviceManagerDocument, options);
      }
export type RefreshDeviceManagerMutationHookResult = ReturnType<typeof useRefreshDeviceManagerMutation>;
export type RefreshDeviceManagerMutationResult = Apollo.MutationResult<RefreshDeviceManagerMutation>;
export type RefreshDeviceManagerMutationOptions = Apollo.BaseMutationOptions<RefreshDeviceManagerMutation, RefreshDeviceManagerMutationVariables>;
export const GetADeviceManagerDocument = gql`
    query getADeviceManager {
  getADeviceManager {
    ... on DeviceManagerDeviceProfiles {
      DeviceProfiles {
        id
        AppType
        isActive
        accesstoken
        refreshtoken
        Profile {
          ...PROFILE_FRAGMENT
        }
      }
    }
  }
}
    ${Profile_FragmentFragmentDoc}`;

/**
 * __useGetADeviceManagerQuery__
 *
 * To run a query within a React component, call `useGetADeviceManagerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetADeviceManagerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetADeviceManagerQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetADeviceManagerQuery(baseOptions?: Apollo.QueryHookOptions<GetADeviceManagerQuery, GetADeviceManagerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetADeviceManagerQuery, GetADeviceManagerQueryVariables>(GetADeviceManagerDocument, options);
      }
export function useGetADeviceManagerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetADeviceManagerQuery, GetADeviceManagerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetADeviceManagerQuery, GetADeviceManagerQueryVariables>(GetADeviceManagerDocument, options);
        }
export type GetADeviceManagerQueryHookResult = ReturnType<typeof useGetADeviceManagerQuery>;
export type GetADeviceManagerLazyQueryHookResult = ReturnType<typeof useGetADeviceManagerLazyQuery>;
export type GetADeviceManagerQueryResult = Apollo.QueryResult<GetADeviceManagerQuery, GetADeviceManagerQueryVariables>;
export const SendAuthenticatorDeviceOwnerCodeDocument = gql`
    mutation sendAuthenticatorDeviceOwnerCode($data: CodeData, $where: CodeWhere) {
  sendAuthenticatorDeviceOwnerCode(data: $data, where: $where) {
    ... on Code {
      ...CODE_FRAGMENT
    }
    ... on ErrorProfiling {
      ...ERROR_PROFILING_FRAGMENT
    }
  }
}
    ${Code_FragmentFragmentDoc}
${Error_Profiling_FragmentFragmentDoc}`;
export type SendAuthenticatorDeviceOwnerCodeMutationFn = Apollo.MutationFunction<SendAuthenticatorDeviceOwnerCodeMutation, SendAuthenticatorDeviceOwnerCodeMutationVariables>;

/**
 * __useSendAuthenticatorDeviceOwnerCodeMutation__
 *
 * To run a mutation, you first call `useSendAuthenticatorDeviceOwnerCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendAuthenticatorDeviceOwnerCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendAuthenticatorDeviceOwnerCodeMutation, { data, loading, error }] = useSendAuthenticatorDeviceOwnerCodeMutation({
 *   variables: {
 *      data: // value for 'data'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useSendAuthenticatorDeviceOwnerCodeMutation(baseOptions?: Apollo.MutationHookOptions<SendAuthenticatorDeviceOwnerCodeMutation, SendAuthenticatorDeviceOwnerCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendAuthenticatorDeviceOwnerCodeMutation, SendAuthenticatorDeviceOwnerCodeMutationVariables>(SendAuthenticatorDeviceOwnerCodeDocument, options);
      }
export type SendAuthenticatorDeviceOwnerCodeMutationHookResult = ReturnType<typeof useSendAuthenticatorDeviceOwnerCodeMutation>;
export type SendAuthenticatorDeviceOwnerCodeMutationResult = Apollo.MutationResult<SendAuthenticatorDeviceOwnerCodeMutation>;
export type SendAuthenticatorDeviceOwnerCodeMutationOptions = Apollo.BaseMutationOptions<SendAuthenticatorDeviceOwnerCodeMutation, SendAuthenticatorDeviceOwnerCodeMutationVariables>;
export const AuthorizedProfilesDocument = gql`
    query authorizedProfiles($where: AuthorizedProfilesWhereInput!) {
  authorizedProfiles(where: $where) {
    ... on ErrorProfiling {
      ...ERROR_PROFILING_FRAGMENT
    }
    ... on ProfileTypesResponse {
      email {
        id
        ProfileType
      }
      phone {
        id
        ProfileType
      }
      username {
        id
        ProfileType
      }
    }
  }
}
    ${Error_Profiling_FragmentFragmentDoc}`;

/**
 * __useAuthorizedProfilesQuery__
 *
 * To run a query within a React component, call `useAuthorizedProfilesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthorizedProfilesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthorizedProfilesQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useAuthorizedProfilesQuery(baseOptions: Apollo.QueryHookOptions<AuthorizedProfilesQuery, AuthorizedProfilesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AuthorizedProfilesQuery, AuthorizedProfilesQueryVariables>(AuthorizedProfilesDocument, options);
      }
export function useAuthorizedProfilesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AuthorizedProfilesQuery, AuthorizedProfilesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AuthorizedProfilesQuery, AuthorizedProfilesQueryVariables>(AuthorizedProfilesDocument, options);
        }
export type AuthorizedProfilesQueryHookResult = ReturnType<typeof useAuthorizedProfilesQuery>;
export type AuthorizedProfilesLazyQueryHookResult = ReturnType<typeof useAuthorizedProfilesLazyQuery>;
export type AuthorizedProfilesQueryResult = Apollo.QueryResult<AuthorizedProfilesQuery, AuthorizedProfilesQueryVariables>;
export const DocumentsDocument = gql`
    query documents($after: DocumentWhereUniqueInput, $before: DocumentWhereUniqueInput, $first: Int, $last: Int, $orderBy: [DocumentOrderByWithRelationInput!], $where: DocumentWhereInput) {
  documents(where: $where, orderBy: $orderBy, first: $first, last: $last, before: $before, after: $after) {
    id
    TypeOfDocument
    content
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useDocumentsQuery__
 *
 * To run a query within a React component, call `useDocumentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDocumentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDocumentsQuery({
 *   variables: {
 *      after: // value for 'after'
 *      before: // value for 'before'
 *      first: // value for 'first'
 *      last: // value for 'last'
 *      orderBy: // value for 'orderBy'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useDocumentsQuery(baseOptions?: Apollo.QueryHookOptions<DocumentsQuery, DocumentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DocumentsQuery, DocumentsQueryVariables>(DocumentsDocument, options);
      }
export function useDocumentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DocumentsQuery, DocumentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DocumentsQuery, DocumentsQueryVariables>(DocumentsDocument, options);
        }
export type DocumentsQueryHookResult = ReturnType<typeof useDocumentsQuery>;
export type DocumentsLazyQueryHookResult = ReturnType<typeof useDocumentsLazyQuery>;
export type DocumentsQueryResult = Apollo.QueryResult<DocumentsQuery, DocumentsQueryVariables>;
export const LoginPasswordDocument = gql`
    query loginPassword($username: String!, $password: String!) {
  loginPassword(username: $username, password: $password)
}
    `;

/**
 * __useLoginPasswordQuery__
 *
 * To run a query within a React component, call `useLoginPasswordQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginPasswordQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginPasswordQuery({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginPasswordQuery(baseOptions: Apollo.QueryHookOptions<LoginPasswordQuery, LoginPasswordQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoginPasswordQuery, LoginPasswordQueryVariables>(LoginPasswordDocument, options);
      }
export function useLoginPasswordLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginPasswordQuery, LoginPasswordQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoginPasswordQuery, LoginPasswordQueryVariables>(LoginPasswordDocument, options);
        }
export type LoginPasswordQueryHookResult = ReturnType<typeof useLoginPasswordQuery>;
export type LoginPasswordLazyQueryHookResult = ReturnType<typeof useLoginPasswordLazyQuery>;
export type LoginPasswordQueryResult = Apollo.QueryResult<LoginPasswordQuery, LoginPasswordQueryVariables>;
export const CheckUsernameDocument = gql`
    query checkUsername($username: String!) {
  checkUsername(username: $username)
}
    `;

/**
 * __useCheckUsernameQuery__
 *
 * To run a query within a React component, call `useCheckUsernameQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckUsernameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckUsernameQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useCheckUsernameQuery(baseOptions: Apollo.QueryHookOptions<CheckUsernameQuery, CheckUsernameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckUsernameQuery, CheckUsernameQueryVariables>(CheckUsernameDocument, options);
      }
export function useCheckUsernameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckUsernameQuery, CheckUsernameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckUsernameQuery, CheckUsernameQueryVariables>(CheckUsernameDocument, options);
        }
export type CheckUsernameQueryHookResult = ReturnType<typeof useCheckUsernameQuery>;
export type CheckUsernameLazyQueryHookResult = ReturnType<typeof useCheckUsernameLazyQuery>;
export type CheckUsernameQueryResult = Apollo.QueryResult<CheckUsernameQuery, CheckUsernameQueryVariables>;
export const EmojimoodsDocument = gql`
    query emojimoods($first: Int, $last: Int, $before: EmojimoodWhereUniqueInput, $after: EmojimoodWhereUniqueInput, $where: EmojimoodWhereInput) {
  emojimoods(where: $where, first: $first, last: $last, before: $before, after: $after) {
    id
    colors
    emoji
    emojiname
  }
}
    `;

/**
 * __useEmojimoodsQuery__
 *
 * To run a query within a React component, call `useEmojimoodsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEmojimoodsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEmojimoodsQuery({
 *   variables: {
 *      first: // value for 'first'
 *      last: // value for 'last'
 *      before: // value for 'before'
 *      after: // value for 'after'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useEmojimoodsQuery(baseOptions?: Apollo.QueryHookOptions<EmojimoodsQuery, EmojimoodsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EmojimoodsQuery, EmojimoodsQueryVariables>(EmojimoodsDocument, options);
      }
export function useEmojimoodsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EmojimoodsQuery, EmojimoodsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EmojimoodsQuery, EmojimoodsQueryVariables>(EmojimoodsDocument, options);
        }
export type EmojimoodsQueryHookResult = ReturnType<typeof useEmojimoodsQuery>;
export type EmojimoodsLazyQueryHookResult = ReturnType<typeof useEmojimoodsLazyQuery>;
export type EmojimoodsQueryResult = Apollo.QueryResult<EmojimoodsQuery, EmojimoodsQueryVariables>;
export const EmojimoodDocument = gql`
    query emojimood($where: EmojimoodWhereUniqueInput!) {
  emojimood(where: $where) {
    id
    colors
    emoji
    emojiname
  }
}
    `;

/**
 * __useEmojimoodQuery__
 *
 * To run a query within a React component, call `useEmojimoodQuery` and pass it any options that fit your needs.
 * When your component renders, `useEmojimoodQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEmojimoodQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useEmojimoodQuery(baseOptions: Apollo.QueryHookOptions<EmojimoodQuery, EmojimoodQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EmojimoodQuery, EmojimoodQueryVariables>(EmojimoodDocument, options);
      }
export function useEmojimoodLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EmojimoodQuery, EmojimoodQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EmojimoodQuery, EmojimoodQueryVariables>(EmojimoodDocument, options);
        }
export type EmojimoodQueryHookResult = ReturnType<typeof useEmojimoodQuery>;
export type EmojimoodLazyQueryHookResult = ReturnType<typeof useEmojimoodLazyQuery>;
export type EmojimoodQueryResult = Apollo.QueryResult<EmojimoodQuery, EmojimoodQueryVariables>;
export const UpsertTonightPathOrPathDocument = gql`
    mutation UpsertTonightPathOrPath($latitude: Float!, $longitude: Float!, $profileIdPersonal: String!) {
  upsertTonightPathOrPath(latitude: $latitude, longitude: $longitude, profileIdPersonal: $profileIdPersonal)
}
    `;
export type UpsertTonightPathOrPathMutationFn = Apollo.MutationFunction<UpsertTonightPathOrPathMutation, UpsertTonightPathOrPathMutationVariables>;

/**
 * __useUpsertTonightPathOrPathMutation__
 *
 * To run a mutation, you first call `useUpsertTonightPathOrPathMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertTonightPathOrPathMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertTonightPathOrPathMutation, { data, loading, error }] = useUpsertTonightPathOrPathMutation({
 *   variables: {
 *      latitude: // value for 'latitude'
 *      longitude: // value for 'longitude'
 *      profileIdPersonal: // value for 'profileIdPersonal'
 *   },
 * });
 */
export function useUpsertTonightPathOrPathMutation(baseOptions?: Apollo.MutationHookOptions<UpsertTonightPathOrPathMutation, UpsertTonightPathOrPathMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpsertTonightPathOrPathMutation, UpsertTonightPathOrPathMutationVariables>(UpsertTonightPathOrPathDocument, options);
      }
export type UpsertTonightPathOrPathMutationHookResult = ReturnType<typeof useUpsertTonightPathOrPathMutation>;
export type UpsertTonightPathOrPathMutationResult = Apollo.MutationResult<UpsertTonightPathOrPathMutation>;
export type UpsertTonightPathOrPathMutationOptions = Apollo.BaseMutationOptions<UpsertTonightPathOrPathMutation, UpsertTonightPathOrPathMutationVariables>;
export const AddPersonalTotalsVenueDocument = gql`
    mutation addPersonalTotalsVenue($profileIdPersonal: String!, $profileIdVenue: String!) {
  addPersonalTotalsVenue(profileIdPersonal: $profileIdPersonal, profileIdVenue: $profileIdVenue)
}
    `;
export type AddPersonalTotalsVenueMutationFn = Apollo.MutationFunction<AddPersonalTotalsVenueMutation, AddPersonalTotalsVenueMutationVariables>;

/**
 * __useAddPersonalTotalsVenueMutation__
 *
 * To run a mutation, you first call `useAddPersonalTotalsVenueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPersonalTotalsVenueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPersonalTotalsVenueMutation, { data, loading, error }] = useAddPersonalTotalsVenueMutation({
 *   variables: {
 *      profileIdPersonal: // value for 'profileIdPersonal'
 *      profileIdVenue: // value for 'profileIdVenue'
 *   },
 * });
 */
export function useAddPersonalTotalsVenueMutation(baseOptions?: Apollo.MutationHookOptions<AddPersonalTotalsVenueMutation, AddPersonalTotalsVenueMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddPersonalTotalsVenueMutation, AddPersonalTotalsVenueMutationVariables>(AddPersonalTotalsVenueDocument, options);
      }
export type AddPersonalTotalsVenueMutationHookResult = ReturnType<typeof useAddPersonalTotalsVenueMutation>;
export type AddPersonalTotalsVenueMutationResult = Apollo.MutationResult<AddPersonalTotalsVenueMutation>;
export type AddPersonalTotalsVenueMutationOptions = Apollo.BaseMutationOptions<AddPersonalTotalsVenueMutation, AddPersonalTotalsVenueMutationVariables>;
export const RemovePersonalTotalsVenueDocument = gql`
    mutation removePersonalTotalsVenue($profileIdVenue: String!, $profileIdPersonal: String!) {
  removePersonalTotalsVenue(profileIdVenue: $profileIdVenue, profileIdPersonal: $profileIdPersonal)
}
    `;
export type RemovePersonalTotalsVenueMutationFn = Apollo.MutationFunction<RemovePersonalTotalsVenueMutation, RemovePersonalTotalsVenueMutationVariables>;

/**
 * __useRemovePersonalTotalsVenueMutation__
 *
 * To run a mutation, you first call `useRemovePersonalTotalsVenueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemovePersonalTotalsVenueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removePersonalTotalsVenueMutation, { data, loading, error }] = useRemovePersonalTotalsVenueMutation({
 *   variables: {
 *      profileIdVenue: // value for 'profileIdVenue'
 *      profileIdPersonal: // value for 'profileIdPersonal'
 *   },
 * });
 */
export function useRemovePersonalTotalsVenueMutation(baseOptions?: Apollo.MutationHookOptions<RemovePersonalTotalsVenueMutation, RemovePersonalTotalsVenueMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemovePersonalTotalsVenueMutation, RemovePersonalTotalsVenueMutationVariables>(RemovePersonalTotalsVenueDocument, options);
      }
export type RemovePersonalTotalsVenueMutationHookResult = ReturnType<typeof useRemovePersonalTotalsVenueMutation>;
export type RemovePersonalTotalsVenueMutationResult = Apollo.MutationResult<RemovePersonalTotalsVenueMutation>;
export type RemovePersonalTotalsVenueMutationOptions = Apollo.BaseMutationOptions<RemovePersonalTotalsVenueMutation, RemovePersonalTotalsVenueMutationVariables>;
export const AddPersonalJoinsVenueDocument = gql`
    mutation addPersonalJoinsVenue($profileIdPersonal: String!, $profileIdVenue: String!) {
  addPersonalJoinsVenue(profileIdPersonal: $profileIdPersonal, profileIdVenue: $profileIdVenue)
}
    `;
export type AddPersonalJoinsVenueMutationFn = Apollo.MutationFunction<AddPersonalJoinsVenueMutation, AddPersonalJoinsVenueMutationVariables>;

/**
 * __useAddPersonalJoinsVenueMutation__
 *
 * To run a mutation, you first call `useAddPersonalJoinsVenueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPersonalJoinsVenueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPersonalJoinsVenueMutation, { data, loading, error }] = useAddPersonalJoinsVenueMutation({
 *   variables: {
 *      profileIdPersonal: // value for 'profileIdPersonal'
 *      profileIdVenue: // value for 'profileIdVenue'
 *   },
 * });
 */
export function useAddPersonalJoinsVenueMutation(baseOptions?: Apollo.MutationHookOptions<AddPersonalJoinsVenueMutation, AddPersonalJoinsVenueMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddPersonalJoinsVenueMutation, AddPersonalJoinsVenueMutationVariables>(AddPersonalJoinsVenueDocument, options);
      }
export type AddPersonalJoinsVenueMutationHookResult = ReturnType<typeof useAddPersonalJoinsVenueMutation>;
export type AddPersonalJoinsVenueMutationResult = Apollo.MutationResult<AddPersonalJoinsVenueMutation>;
export type AddPersonalJoinsVenueMutationOptions = Apollo.BaseMutationOptions<AddPersonalJoinsVenueMutation, AddPersonalJoinsVenueMutationVariables>;
export const RemovePersonalJoinsVenueDocument = gql`
    mutation removePersonalJoinsVenue($profileIdPersonal: String!, $profileIdVenue: String!) {
  removePersonalJoinsVenue(profileIdPersonal: $profileIdPersonal, profileIdVenue: $profileIdVenue)
}
    `;
export type RemovePersonalJoinsVenueMutationFn = Apollo.MutationFunction<RemovePersonalJoinsVenueMutation, RemovePersonalJoinsVenueMutationVariables>;

/**
 * __useRemovePersonalJoinsVenueMutation__
 *
 * To run a mutation, you first call `useRemovePersonalJoinsVenueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemovePersonalJoinsVenueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removePersonalJoinsVenueMutation, { data, loading, error }] = useRemovePersonalJoinsVenueMutation({
 *   variables: {
 *      profileIdPersonal: // value for 'profileIdPersonal'
 *      profileIdVenue: // value for 'profileIdVenue'
 *   },
 * });
 */
export function useRemovePersonalJoinsVenueMutation(baseOptions?: Apollo.MutationHookOptions<RemovePersonalJoinsVenueMutation, RemovePersonalJoinsVenueMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemovePersonalJoinsVenueMutation, RemovePersonalJoinsVenueMutationVariables>(RemovePersonalJoinsVenueDocument, options);
      }
export type RemovePersonalJoinsVenueMutationHookResult = ReturnType<typeof useRemovePersonalJoinsVenueMutation>;
export type RemovePersonalJoinsVenueMutationResult = Apollo.MutationResult<RemovePersonalJoinsVenueMutation>;
export type RemovePersonalJoinsVenueMutationOptions = Apollo.BaseMutationOptions<RemovePersonalJoinsVenueMutation, RemovePersonalJoinsVenueMutationVariables>;
export const CurrentVenueDocument = gql`
    query currentVenue($where: ProfileWhereUniqueInput!) {
  profile(where: $where) {
    ...PROFILE_FRAGMENT
  }
}
    ${Profile_FragmentFragmentDoc}`;

/**
 * __useCurrentVenueQuery__
 *
 * To run a query within a React component, call `useCurrentVenueQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentVenueQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentVenueQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useCurrentVenueQuery(baseOptions: Apollo.QueryHookOptions<CurrentVenueQuery, CurrentVenueQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentVenueQuery, CurrentVenueQueryVariables>(CurrentVenueDocument, options);
      }
export function useCurrentVenueLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentVenueQuery, CurrentVenueQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentVenueQuery, CurrentVenueQueryVariables>(CurrentVenueDocument, options);
        }
export type CurrentVenueQueryHookResult = ReturnType<typeof useCurrentVenueQuery>;
export type CurrentVenueLazyQueryHookResult = ReturnType<typeof useCurrentVenueLazyQuery>;
export type CurrentVenueQueryResult = Apollo.QueryResult<CurrentVenueQuery, CurrentVenueQueryVariables>;
export const GetLiveVenueTotalsDocument = gql`
    query getLiveVenueTotals($profileIdVenue: String!) {
  getLiveVenueTotals(profileIdVenue: $profileIdVenue) {
    totaled {
      id
      personalProfileId
    }
    joined {
      id
      personalProfileId
    }
  }
}
    `;

/**
 * __useGetLiveVenueTotalsQuery__
 *
 * To run a query within a React component, call `useGetLiveVenueTotalsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLiveVenueTotalsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLiveVenueTotalsQuery({
 *   variables: {
 *      profileIdVenue: // value for 'profileIdVenue'
 *   },
 * });
 */
export function useGetLiveVenueTotalsQuery(baseOptions: Apollo.QueryHookOptions<GetLiveVenueTotalsQuery, GetLiveVenueTotalsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLiveVenueTotalsQuery, GetLiveVenueTotalsQueryVariables>(GetLiveVenueTotalsDocument, options);
      }
export function useGetLiveVenueTotalsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLiveVenueTotalsQuery, GetLiveVenueTotalsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLiveVenueTotalsQuery, GetLiveVenueTotalsQueryVariables>(GetLiveVenueTotalsDocument, options);
        }
export type GetLiveVenueTotalsQueryHookResult = ReturnType<typeof useGetLiveVenueTotalsQuery>;
export type GetLiveVenueTotalsLazyQueryHookResult = ReturnType<typeof useGetLiveVenueTotalsLazyQuery>;
export type GetLiveVenueTotalsQueryResult = Apollo.QueryResult<GetLiveVenueTotalsQuery, GetLiveVenueTotalsQueryVariables>;
export const CreatePersonalProfileDocument = gql`
    mutation createPersonalProfile($data: CreatePersonalProfileDataInput) {
  createPersonalProfile(data: $data) {
    ... on ErrorProfiling {
      ...ERROR_PROFILING_FRAGMENT
    }
    ... on CreateProfileResponse {
      Profile {
        ...PROFILE_FRAGMENT
      }
    }
  }
}
    ${Error_Profiling_FragmentFragmentDoc}
${Profile_FragmentFragmentDoc}`;
export type CreatePersonalProfileMutationFn = Apollo.MutationFunction<CreatePersonalProfileMutation, CreatePersonalProfileMutationVariables>;

/**
 * __useCreatePersonalProfileMutation__
 *
 * To run a mutation, you first call `useCreatePersonalProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePersonalProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPersonalProfileMutation, { data, loading, error }] = useCreatePersonalProfileMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreatePersonalProfileMutation(baseOptions?: Apollo.MutationHookOptions<CreatePersonalProfileMutation, CreatePersonalProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePersonalProfileMutation, CreatePersonalProfileMutationVariables>(CreatePersonalProfileDocument, options);
      }
export type CreatePersonalProfileMutationHookResult = ReturnType<typeof useCreatePersonalProfileMutation>;
export type CreatePersonalProfileMutationResult = Apollo.MutationResult<CreatePersonalProfileMutation>;
export type CreatePersonalProfileMutationOptions = Apollo.BaseMutationOptions<CreatePersonalProfileMutation, CreatePersonalProfileMutationVariables>;
export const CreateGuestProfileDocument = gql`
    mutation createGuestProfile {
  createGuestProfile {
    ... on ErrorProfiling {
      ...ERROR_PROFILING_FRAGMENT
    }
    ... on CreateProfileResponse {
      Profile {
        ...PROFILE_FRAGMENT
      }
    }
  }
}
    ${Error_Profiling_FragmentFragmentDoc}
${Profile_FragmentFragmentDoc}`;
export type CreateGuestProfileMutationFn = Apollo.MutationFunction<CreateGuestProfileMutation, CreateGuestProfileMutationVariables>;

/**
 * __useCreateGuestProfileMutation__
 *
 * To run a mutation, you first call `useCreateGuestProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGuestProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGuestProfileMutation, { data, loading, error }] = useCreateGuestProfileMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateGuestProfileMutation(baseOptions?: Apollo.MutationHookOptions<CreateGuestProfileMutation, CreateGuestProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGuestProfileMutation, CreateGuestProfileMutationVariables>(CreateGuestProfileDocument, options);
      }
export type CreateGuestProfileMutationHookResult = ReturnType<typeof useCreateGuestProfileMutation>;
export type CreateGuestProfileMutationResult = Apollo.MutationResult<CreateGuestProfileMutation>;
export type CreateGuestProfileMutationOptions = Apollo.BaseMutationOptions<CreateGuestProfileMutation, CreateGuestProfileMutationVariables>;
export const UpdateProfileIdentifiableInformationDocument = gql`
    mutation updateProfileIdentifiableInformation($data: IdentifiableInformationUpdateWithoutProfileInput!, $where: IdentifiableInformationWhereUniqueInput!) {
  updateProfileIdentifiableInformation(data: $data, where: $where) {
    ... on ErrorProfiling {
      ...ERROR_PROFILING_FRAGMENT
    }
    ... on Profile {
      ...PROFILE_FRAGMENT
    }
  }
}
    ${Error_Profiling_FragmentFragmentDoc}
${Profile_FragmentFragmentDoc}`;
export type UpdateProfileIdentifiableInformationMutationFn = Apollo.MutationFunction<UpdateProfileIdentifiableInformationMutation, UpdateProfileIdentifiableInformationMutationVariables>;

/**
 * __useUpdateProfileIdentifiableInformationMutation__
 *
 * To run a mutation, you first call `useUpdateProfileIdentifiableInformationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileIdentifiableInformationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileIdentifiableInformationMutation, { data, loading, error }] = useUpdateProfileIdentifiableInformationMutation({
 *   variables: {
 *      data: // value for 'data'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUpdateProfileIdentifiableInformationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileIdentifiableInformationMutation, UpdateProfileIdentifiableInformationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileIdentifiableInformationMutation, UpdateProfileIdentifiableInformationMutationVariables>(UpdateProfileIdentifiableInformationDocument, options);
      }
export type UpdateProfileIdentifiableInformationMutationHookResult = ReturnType<typeof useUpdateProfileIdentifiableInformationMutation>;
export type UpdateProfileIdentifiableInformationMutationResult = Apollo.MutationResult<UpdateProfileIdentifiableInformationMutation>;
export type UpdateProfileIdentifiableInformationMutationOptions = Apollo.BaseMutationOptions<UpdateProfileIdentifiableInformationMutation, UpdateProfileIdentifiableInformationMutationVariables>;
export const UpdateOneProfileDocument = gql`
    mutation updateOneProfile($data: ProfileUpdateInput!, $where: ProfileWhereUniqueInput!) {
  updateOneProfile(data: $data, where: $where) {
    ...PROFILE_FRAGMENT
  }
}
    ${Profile_FragmentFragmentDoc}`;
export type UpdateOneProfileMutationFn = Apollo.MutationFunction<UpdateOneProfileMutation, UpdateOneProfileMutationVariables>;

/**
 * __useUpdateOneProfileMutation__
 *
 * To run a mutation, you first call `useUpdateOneProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOneProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOneProfileMutation, { data, loading, error }] = useUpdateOneProfileMutation({
 *   variables: {
 *      data: // value for 'data'
 *      where: // value for 'where'
 *   },
 * });
 */
export function useUpdateOneProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOneProfileMutation, UpdateOneProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOneProfileMutation, UpdateOneProfileMutationVariables>(UpdateOneProfileDocument, options);
      }
export type UpdateOneProfileMutationHookResult = ReturnType<typeof useUpdateOneProfileMutation>;
export type UpdateOneProfileMutationResult = Apollo.MutationResult<UpdateOneProfileMutation>;
export type UpdateOneProfileMutationOptions = Apollo.BaseMutationOptions<UpdateOneProfileMutation, UpdateOneProfileMutationVariables>;
export const ProfileDocument = gql`
    query profile($where: ProfileWhereUniqueInput!) {
  profile(where: $where) {
    ...PROFILE_FRAGMENT
  }
}
    ${Profile_FragmentFragmentDoc}`;

/**
 * __useProfileQuery__
 *
 * To run a query within a React component, call `useProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useProfileQuery(baseOptions: Apollo.QueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
      }
export function useProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
        }
export type ProfileQueryHookResult = ReturnType<typeof useProfileQuery>;
export type ProfileLazyQueryHookResult = ReturnType<typeof useProfileLazyQuery>;
export type ProfileQueryResult = Apollo.QueryResult<ProfileQuery, ProfileQueryVariables>;
export const ProfilesDocument = gql`
    query profiles($where: ProfileWhereInput) {
  profiles(where: $where) {
    ...PROFILE_FRAGMENT
  }
}
    ${Profile_FragmentFragmentDoc}`;

/**
 * __useProfilesQuery__
 *
 * To run a query within a React component, call `useProfilesQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfilesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfilesQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useProfilesQuery(baseOptions?: Apollo.QueryHookOptions<ProfilesQuery, ProfilesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfilesQuery, ProfilesQueryVariables>(ProfilesDocument, options);
      }
export function useProfilesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfilesQuery, ProfilesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfilesQuery, ProfilesQueryVariables>(ProfilesDocument, options);
        }
export type ProfilesQueryHookResult = ReturnType<typeof useProfilesQuery>;
export type ProfilesLazyQueryHookResult = ReturnType<typeof useProfilesLazyQuery>;
export type ProfilesQueryResult = Apollo.QueryResult<ProfilesQuery, ProfilesQueryVariables>;
export const VenueDocument = gql`
    query venue($where: VenueWhereUniqueInput!) {
  venue(where: $where) {
    ...VENUE_FRAGMENT
  }
}
    ${Venue_FragmentFragmentDoc}`;

/**
 * __useVenueQuery__
 *
 * To run a query within a React component, call `useVenueQuery` and pass it any options that fit your needs.
 * When your component renders, `useVenueQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVenueQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useVenueQuery(baseOptions: Apollo.QueryHookOptions<VenueQuery, VenueQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VenueQuery, VenueQueryVariables>(VenueDocument, options);
      }
export function useVenueLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VenueQuery, VenueQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VenueQuery, VenueQueryVariables>(VenueDocument, options);
        }
export type VenueQueryHookResult = ReturnType<typeof useVenueQuery>;
export type VenueLazyQueryHookResult = ReturnType<typeof useVenueLazyQuery>;
export type VenueQueryResult = Apollo.QueryResult<VenueQuery, VenueQueryVariables>;
export const VenuesDocument = gql`
    query venues($where: VenueWhereInput) {
  venues(where: $where) {
    ...VENUE_FRAGMENT
  }
}
    ${Venue_FragmentFragmentDoc}`;

/**
 * __useVenuesQuery__
 *
 * To run a query within a React component, call `useVenuesQuery` and pass it any options that fit your needs.
 * When your component renders, `useVenuesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVenuesQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useVenuesQuery(baseOptions?: Apollo.QueryHookOptions<VenuesQuery, VenuesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VenuesQuery, VenuesQueryVariables>(VenuesDocument, options);
      }
export function useVenuesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VenuesQuery, VenuesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VenuesQuery, VenuesQueryVariables>(VenuesDocument, options);
        }
export type VenuesQueryHookResult = ReturnType<typeof useVenuesQuery>;
export type VenuesLazyQueryHookResult = ReturnType<typeof useVenuesLazyQuery>;
export type VenuesQueryResult = Apollo.QueryResult<VenuesQuery, VenuesQueryVariables>;
export const VenuesNearbyDocument = gql`
    query venuesNearby($latitude: Float!, $longitude: Float!) {
  venuesNearby(latitude: $latitude, longitude: $longitude) {
    ...PROFILE_FRAGMENT
  }
}
    ${Profile_FragmentFragmentDoc}`;

/**
 * __useVenuesNearbyQuery__
 *
 * To run a query within a React component, call `useVenuesNearbyQuery` and pass it any options that fit your needs.
 * When your component renders, `useVenuesNearbyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVenuesNearbyQuery({
 *   variables: {
 *      latitude: // value for 'latitude'
 *      longitude: // value for 'longitude'
 *   },
 * });
 */
export function useVenuesNearbyQuery(baseOptions: Apollo.QueryHookOptions<VenuesNearbyQuery, VenuesNearbyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<VenuesNearbyQuery, VenuesNearbyQueryVariables>(VenuesNearbyDocument, options);
      }
export function useVenuesNearbyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VenuesNearbyQuery, VenuesNearbyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<VenuesNearbyQuery, VenuesNearbyQueryVariables>(VenuesNearbyDocument, options);
        }
export type VenuesNearbyQueryHookResult = ReturnType<typeof useVenuesNearbyQuery>;
export type VenuesNearbyLazyQueryHookResult = ReturnType<typeof useVenuesNearbyLazyQuery>;
export type VenuesNearbyQueryResult = Apollo.QueryResult<VenuesNearbyQuery, VenuesNearbyQueryVariables>;
export const GetAllCountriesDocument = gql`
    query getAllCountries {
  getAllCountries
}
    `;

/**
 * __useGetAllCountriesQuery__
 *
 * To run a query within a React component, call `useGetAllCountriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCountriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCountriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllCountriesQuery(baseOptions?: Apollo.QueryHookOptions<GetAllCountriesQuery, GetAllCountriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllCountriesQuery, GetAllCountriesQueryVariables>(GetAllCountriesDocument, options);
      }
export function useGetAllCountriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllCountriesQuery, GetAllCountriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllCountriesQuery, GetAllCountriesQueryVariables>(GetAllCountriesDocument, options);
        }
export type GetAllCountriesQueryHookResult = ReturnType<typeof useGetAllCountriesQuery>;
export type GetAllCountriesLazyQueryHookResult = ReturnType<typeof useGetAllCountriesLazyQuery>;
export type GetAllCountriesQueryResult = Apollo.QueryResult<GetAllCountriesQuery, GetAllCountriesQueryVariables>;
export const GetAllStatesByCountryDocument = gql`
    query getAllStatesByCountry($country: String!) {
  getAllStatesByCountry(country: $country)
}
    `;

/**
 * __useGetAllStatesByCountryQuery__
 *
 * To run a query within a React component, call `useGetAllStatesByCountryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllStatesByCountryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllStatesByCountryQuery({
 *   variables: {
 *      country: // value for 'country'
 *   },
 * });
 */
export function useGetAllStatesByCountryQuery(baseOptions: Apollo.QueryHookOptions<GetAllStatesByCountryQuery, GetAllStatesByCountryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllStatesByCountryQuery, GetAllStatesByCountryQueryVariables>(GetAllStatesByCountryDocument, options);
      }
export function useGetAllStatesByCountryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllStatesByCountryQuery, GetAllStatesByCountryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllStatesByCountryQuery, GetAllStatesByCountryQueryVariables>(GetAllStatesByCountryDocument, options);
        }
export type GetAllStatesByCountryQueryHookResult = ReturnType<typeof useGetAllStatesByCountryQuery>;
export type GetAllStatesByCountryLazyQueryHookResult = ReturnType<typeof useGetAllStatesByCountryLazyQuery>;
export type GetAllStatesByCountryQueryResult = Apollo.QueryResult<GetAllStatesByCountryQuery, GetAllStatesByCountryQueryVariables>;
export const GetAllCitiesByStateDocument = gql`
    query getAllCitiesByState($country: String!, $state: String!) {
  getAllCitiesByState(country: $country, state: $state)
}
    `;

/**
 * __useGetAllCitiesByStateQuery__
 *
 * To run a query within a React component, call `useGetAllCitiesByStateQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllCitiesByStateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllCitiesByStateQuery({
 *   variables: {
 *      country: // value for 'country'
 *      state: // value for 'state'
 *   },
 * });
 */
export function useGetAllCitiesByStateQuery(baseOptions: Apollo.QueryHookOptions<GetAllCitiesByStateQuery, GetAllCitiesByStateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllCitiesByStateQuery, GetAllCitiesByStateQueryVariables>(GetAllCitiesByStateDocument, options);
      }
export function useGetAllCitiesByStateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllCitiesByStateQuery, GetAllCitiesByStateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllCitiesByStateQuery, GetAllCitiesByStateQueryVariables>(GetAllCitiesByStateDocument, options);
        }
export type GetAllCitiesByStateQueryHookResult = ReturnType<typeof useGetAllCitiesByStateQuery>;
export type GetAllCitiesByStateLazyQueryHookResult = ReturnType<typeof useGetAllCitiesByStateLazyQuery>;
export type GetAllCitiesByStateQueryResult = Apollo.QueryResult<GetAllCitiesByStateQuery, GetAllCitiesByStateQueryVariables>;
export const UpdateStoryPhotosDocument = gql`
    mutation updateStoryPhotos($disconnectId: String!, $photos: PhotoCreateManyProfileInputEnvelope, $storyId: String) {
  updateStoryPhotos(disconnectId: $disconnectId, photos: $photos)
}
    `;
export type UpdateStoryPhotosMutationFn = Apollo.MutationFunction<UpdateStoryPhotosMutation, UpdateStoryPhotosMutationVariables>;

/**
 * __useUpdateStoryPhotosMutation__
 *
 * To run a mutation, you first call `useUpdateStoryPhotosMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStoryPhotosMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStoryPhotosMutation, { data, loading, error }] = useUpdateStoryPhotosMutation({
 *   variables: {
 *      disconnectId: // value for 'disconnectId'
 *      photos: // value for 'photos'
 *      storyId: // value for 'storyId'
 *   },
 * });
 */
export function useUpdateStoryPhotosMutation(baseOptions?: Apollo.MutationHookOptions<UpdateStoryPhotosMutation, UpdateStoryPhotosMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateStoryPhotosMutation, UpdateStoryPhotosMutationVariables>(UpdateStoryPhotosDocument, options);
      }
export type UpdateStoryPhotosMutationHookResult = ReturnType<typeof useUpdateStoryPhotosMutation>;
export type UpdateStoryPhotosMutationResult = Apollo.MutationResult<UpdateStoryPhotosMutation>;
export type UpdateStoryPhotosMutationOptions = Apollo.BaseMutationOptions<UpdateStoryPhotosMutation, UpdateStoryPhotosMutationVariables>;
export const UpdateStoryEmojimoodDocument = gql`
    mutation updateStoryEmojimood($emojimoodId: Int!, $storyId: String) {
  updateStoryEmojimood(emojimoodId: $emojimoodId)
}
    `;
export type UpdateStoryEmojimoodMutationFn = Apollo.MutationFunction<UpdateStoryEmojimoodMutation, UpdateStoryEmojimoodMutationVariables>;

/**
 * __useUpdateStoryEmojimoodMutation__
 *
 * To run a mutation, you first call `useUpdateStoryEmojimoodMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateStoryEmojimoodMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateStoryEmojimoodMutation, { data, loading, error }] = useUpdateStoryEmojimoodMutation({
 *   variables: {
 *      emojimoodId: // value for 'emojimoodId'
 *      storyId: // value for 'storyId'
 *   },
 * });
 */
export function useUpdateStoryEmojimoodMutation(baseOptions?: Apollo.MutationHookOptions<UpdateStoryEmojimoodMutation, UpdateStoryEmojimoodMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateStoryEmojimoodMutation, UpdateStoryEmojimoodMutationVariables>(UpdateStoryEmojimoodDocument, options);
      }
export type UpdateStoryEmojimoodMutationHookResult = ReturnType<typeof useUpdateStoryEmojimoodMutation>;
export type UpdateStoryEmojimoodMutationResult = Apollo.MutationResult<UpdateStoryEmojimoodMutation>;
export type UpdateStoryEmojimoodMutationOptions = Apollo.BaseMutationOptions<UpdateStoryEmojimoodMutation, UpdateStoryEmojimoodMutationVariables>;