import gql from "graphql-tag";

// userId
// name
// email
// nameConfirmed
// termsOfUse
// is2faEnabled
// roles
// hasEmailAuth
// state {
// 	contractBalance
// 	ethBalance
// 	date
// }




export const USER_RESULT = `
	accessFailedCount
	avatar
	birthday
	created
	deleted
	#deletedDate
	email
	emailConfirmed
	#ethAddress
	firstName
	hasEmailAuth
	is2faEnabled
	#kycComment
  #kycName
  kycStatus
  kycValid
	lastName
	#name
	#nameConfirmed
	phone
	#roles
	#state {
	#	contractBalance
	#	ethBalance
	#	euroBalance
	#	date
	#}
	termsOfUse
	updated
	userId
	#userType
	#valid
	#validationDate
`;


export const SETTINGS_RESULT = `
	companyKycFileDownloadUrl
	kycFileTypes {
		id
		index
		value
		required
		requiredBeneficiaryCount
	}
	maxFileSize
	maxFiles
	restrictMinAmounts
`;

export const LOGIN_RESULT = `
	authToken
	authTokenAction
	authTokenActionParam
	user {				
		${USER_RESULT}
	}
`;

export const gqlLogin = gql`
    mutation Login(
        $email: String,
        $password: String,
        $oAuthProvider: OAuthProvider,
        $oAuthToken: String,
        $recaptcha: String!
    ) {
        login (
            email:$email,
            password:$password,
            oAuthProvider: $oAuthProvider,
            oAuthToken: $oAuthToken,
            recaptcha: $recaptcha
        ) {
            ${LOGIN_RESULT}
        }
    }
`;

export const gqlVerify2faCode = gql`
    mutation Verify2faCode(
        $code: String!,
        #$token: String!
        #$recaptcha: String!,
    ) {
        verify2faCode (
            code: $code,
            #token: $token
            #recaptcha: $recaptcha,
        ) {
            ${LOGIN_RESULT}
        }
    }
`;

// export const gqlConfirmName = gql`
//     mutation ConfirmName(
//         $name: String!,
//         $recaptcha: String!,
//         $token: String!
//     ) {
//         confirmName (
//             name: $name,
//             recaptcha: $recaptcha,
//             token: $token
//         ) {
//             ${LOGIN_RESULT}
//         }
//     }
// `;

export const gqlSignup = gql`
    mutation Signup(
        $email: String!,
        $password: String,
        #$oAuthProvider: OAuthProvider,
        #$oAuthToken: String,
        $termsOfUse: Boolean!,
        #$name: String,
        # $givenReferralCode: String,
				$mode: UserMode!,
        $recaptcha: String!
    ) {
        signup (
            email:$email,
            password:$password,
            #oAuthProvider: $oAuthProvider,
            #oAuthToken: $oAuthToken,
            termsOfUse: $termsOfUse,
            #name : $name,
            # givenReferralCode: $givenReferralCode,
            recaptcha: $recaptcha
						mode: $mode
        ) {
            ${LOGIN_RESULT}
        }
    }
`;

// address: PostAddress,
// birthday: DateTime,
// countryCode2: String,
// countryCode3: String,
// email: String!,
// firstName: String,
// lastName: String,
// mode: UserMode!,
// password: String,
// phone: String,
// recaptcha: String!,
// termsOfUse: Boolean!

// authToken: String
// authTokenAction: String
// authTokenActionParam: String
// user: User
// {
// 	accessFailedCount: Int
// 	addressEndDate: DateTime
// 	addressStartDate: DateTime
// 	avatar: String
// 	birthday: DateTime
// 	buildingName: String
// 	buildingNumber: String
// 	changePasswordRequired: Boolean
// 	contacts: [UserContact!]
// 	countryCode2: String
// 	countryCode3: String
// 	created: DateTime
// 	deleted: DateTime
// 	email: String!
// 	emailConfirmed: DateTime
// 	firstName: String
// 	flatNumber: String
// 	hasEmailAuth: Boolean
// 	is2faEnabled: Boolean
// 	kycApplicantId: String
// 	kycPrivateComment: String
// 	kycProvider: String
// 	kycReviewComment: String
// 	kycReviewDate: DateTime
// 	kycReviewRejectedLabels: [String!]
// 	kycReviewRejectedType: String
// 	kycReviewResult: String
// 	kycStatus: String
// 	kycStatusDate: DateTime
// 	kycStatusUpdateRequired: Boolean
// 	kycValid: Boolean
// 	kycValidationTierId: String
// 	lastName: String
// 	mode: UserMode
// 	notificationSubscriptions: [UserNotificationSubscription!]
// 	permissions: [UserRolePermission!]
// 	phone: String
// 	postCode: String
// 	referralCode: Int
// 	roles: [UserRole!]
// 	stateName: String
// 	street: String
// 	subStreet: String
// 	systemUser: Boolean!
// 	termsOfUse: Boolean
// 	town: String
// 	updated: DateTime
// 	userId: ID!



// export const gqlSettings = gql`
//     query {
//         getSettings{
//             company {
//                 ${COMPANY_RESULT}
//             }
//             settings {
//                 ${SETTINGS_RESULT}
//             }
//             transactionParams {
//                 averageTransactionFee
//             }
//         }
//     }
// `;

