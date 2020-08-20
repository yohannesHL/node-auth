# Authentication examples in Node.js

Provides some simple examples that can be used as a starting point when building an authentication solution.


## Examples
> Disclamer: These examples are **not** production ready and should not be used without modification.

1. Hapi.js TypeORM Postgres Swagger: 
    * Password Login with Session cookie
    * Github login 
    > `$ cd examples/hapi-typeorm-postgres`
    >
    > `$ yarn install & yarn dev`

1. Express.js TypeORM and Passport.js:
    * Password login with session cookie
    * Github login
    > `$ cd examples/express-typeorm-postgres`
    >
    > `$ yarn install & yarn dev`

## Overview

Authentication is an important and often required part of a web product/service. When comming up with a authentication solution its critical to adopt [best security practices](#best-practices). UX considerations should also form an important part of the solution design. Password based logins are not the only (or ideal) approachs: Single Sign On (SSO) and passwordless logins could also be used. There are also decentralised solutions suchas DIDs and self sovern Idenity(SSI).

Common solutions|Details|Covered
-|-|-
passwordless |Achieved by sending a one-time (fast expiring) access token to a users' email/phone number which when used can grant access to the user for a predefined time. It's secure if the user has exclusive access to the device and the email/phone number is not hacked. Commonly used in reset password flows but can be a secure alternative to password logins.  |No
password| Users enter passwords and/or  access tokens to gain grant access. Tokens can be opaque (just a long string) or include additional information (JSON Web Tokens) such as authorization levels.|Yes
OAuth 2.0|Open standard for authentication and authorization|No
OpenID Connect| Builds on OAuth 2.0 standard to define an interoperable way to perform user authentication.|No
MFA|Involves the introduction of additional security steps to the login flow. Requiring a combination of the following information categories: <br/><br/>1. Something you know: password, pins, passphrase, etc<br/>2. Something you have: key, phone, cards, usb drives, token devices <br/>3. Something you are: fingerprint, facial recognition, retina, iris, voice verification<br/>4. Somewhere you are: location, ip|No


## Best practices
Refer to [OWASP guidelines](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html) 

Adopting an external IAM service is the best option for most new projects as you immediatly get a complete solution that can meet all your authentication/authorization needs whilst also complying with all regulatory and security requirements.

At the very least one must ensure that :
- HTTPS is used
- MD5/cleartext passwords are never stored (use bcrypt or argon for hashing - if you can't avoid storing passwords altogether)
- Access keys are not exposed in URLs and handled the same as passwords
- Application secrets are never included in the source code
- Rate limiting is in place on auth endpoints to prevent bruteforce attempts


## Identity and Access Management (IAM) service providers
There is an immediate advantage to this approach: you get managed identity service, improved security and additional features which you would have had to build. It give your business a competitive advantage by freeing up developers so that they can concentrate on core features. All IAM service providers provide a variety of authentication methods including SSO and MFA. Most provide additional benifits such as built in session tracking/management, granualar access control, and interopability with other identity providers (IdPs). 

Common providers include:
- [Auth0](https://auth0.com/user-management/)
- [AWS IAM](https://aws.amazon.com/single-sign-on/)
- [Okta](https://www.okta.com/customer-identity/)
- [Due Security](https://duo.com/product)
- [Google IAM](https://cloud.google.com/iam)
- [Gluu](https://www.gluu.org/)
- [One Login](https://www.onelogin.com/)
- [Microsoft Azure](https://azure.microsoft.com/en-gb/services/active-directory/)


## Custom Authentication Solution
 
 Before building your own solution its useful to ask:
- do you really need to store passwords 
- do you have the correct processes and capabilites to ensure the proper security of your system (session tracking, rate limiting, SecOps, AppSec)
- could you be better of delegating this responsibility to another service provider 
- could you/your client benifit from a SSO solution (better customer retention, reduced bounce rate) and would your customers/end-users prefer a SSO solution instead of having to remember another password


## Tools
- [AWS Amplify](https://github.com/aws-amplify/amplify-js)
- [Google Firebase](https://firebase.google.com/docs/auth)
- [Auth0 lock](https://github.com/auth0/lock)
- [Authpack](https://authpack.io/)






    
## Author
Yohannes Libanos

### References:
- https://searchsecurity.techtarget.com/definition/identity-access-management-IAM-system
- https://www.onelogin.com/learn/how-single-sign-on-works


    