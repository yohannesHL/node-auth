# Authentication examples in Node.js

Provides some simple examples that can be used as a starting point when building an authentication solution.


## Examples
> Disclamer: Although great care has been taken, these examples are **not** production ready.

1. Hapi.js TypeORM Postgres Swagger
    > `$ cd examples/hapi-typeorm-postgres`
    >
    > `$ yarn install & yarn dev`


## Overview

Authentication is an important and often required part of a web product/service. When comming up with a authentication solution its critical to adopt [best security practices](#best-practices). UX considerations should also form an important part of the solution design. Password based logins are not the only (or ideal) approachs: Single Sign On (SSO) and passwordless logins could also be used. There are also decentralised solutions suchas DIDs and self sovern Idenity(SSI).

Common solutions|Details|Covered
-|-|-
passwordless |Achieved by sending a one-time access token to a users' email/phone number which when used can grant access to the user for a predefined time. It's secure if the user has exclusive access to the device and the email/phone number is not hacked. Commonly used in reset password flows but can be a secure alternative to password logins.  |No
password|passwords and  access tokens can be treated the same as they are both secrets. JWTs use a combination of secrets and hashed metadata, Various storage, Generation and transport methods exist ( cookies,JWT,headers)|Yes
OpenID|open standard for federated login|No
Oauth2|open standard|No
MFA|Includes additional security steps to the login flow. What you know,have,are. Suchas OTC, SMS, biometric(fingerprint,iris), device/hardware authentication|No
device/key based|More common for enterprise scenarios. |No


## Best practices
Refer to [OWASP guidelines](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html) 

Adopting an external IAM service is probably the best option for most new projects as it avoids having to handle alot of security issues.

At the very least one must ensure that :
- HTTPS is used
- MD5/cleartext passwords are never stored (use bcrypt or argon for hashing - if you can't avoid storing passwords altogether)
- Rate limiting is in place on auth endpoints to prevent bruteforce attempts
- Access keys are not exposed in URLs and handled the same as passwords



## Identity and Access Management (IAM) service providers
There is an immediate advantage to this approach: you get managed identity service, improved security and additional features which you would have had to build. Freeing up developers to concentrate on core business concerns. All IAM service providers provide a variety of authentication methods including SSO. Most provide additional benifits such as built in session tracking/management. 

Common providers include:
- Auth0
- Okta
- Google Firebase
- AWS IAM and Amplify


## Custom Authentication Solution
 
 Before building your own solution its useful to ask:
- do you really need to store passwords 
- do you have the correct processes and capabilites to ensure the proper security of your system (session tracking, rate limiting, SecOps, AppSec)
- could you be better of delegating this responsibility to another service provider 

- could you/your client benifit from a SSO solution (better customer retention, reduced bounce rate) and would your customers/end-users prefer a SSO solution instead of having to remember another password















    
# TODO:
email based login?
SAML SSO vs ?
[ ] JWT
[ ] Integratwe github/google login