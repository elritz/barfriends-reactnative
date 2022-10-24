export type CreateAccountProfileFlow = 'CreateAccountProfileFlow'
// /**
//  *  @description This flow takes the client through the ACCOUNT PROFILE creation process
//  *  @see https://miro.com/welcomeonboard/f16rJghlpMT6ZrYatFRc6StpHcLaZoqT6dFKEv2f8ze55fnXwHH5UzlbCd7GFlie
//  *
//  *  @screen Terms and Services
//  *  @screen Birthday
//  *  @screen Phone or Email
//  *  @screen Code Confirmation
//  *  @screen Password
//  *  @screen Photo
//  *  @screen Emojimood
//  *
//  */

export type InitialFlow = 'InitialFlow'
/**
 * @description This flow takes the client through the login and/ profile creation
 *
 *  @screen Get Started
 *  @screen phone | Email Tab
 *  @screen Code Confirmation
 *  @screen Profiles || username
 *  @screen Profiles || username
 *  @screen Password || MainNavigator
 *
 */

export type TermsServicePrivacyFlow = 'TermsServicePrivacyFlow'
/**
 * @description This flow takes the client through the PROFILE login process
 *  @screen Terms
 *  @screen Services
 *
 */

export type LoginFlow = 'LoginFlow'
/**
 * @description This flow takes the client through the PROFILE login process
 *
 */

export type LocationPermissionFlow = 'LocationPermissionFlow'
/**
 * @description This flow takes the client through the permission flow
 *
 */
export type LogoutFlow = 'LogoutFlow'
/**
 * @description This flow takes the client through the logout flow
 * this will need to set the isActive to false for the Active Profile
 * and navigate the user to the Login or Credential screen
 *
 */
