# AWS CDK Sample of IAM User

A Sample of AWS CDK to create IAM Group and Users.
This cdk script is to create the following resources

- *AWS::IAM::Policy* which can pull images of ECR Registry
- *AWS::IAM::Group* which has the above policy
- *AWS::IAM::User* which blong to the above group

## Requirement

- Node.js 8.11 or later
- AWS account
- ECR Registry

## Usage

1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `npm run build` to build
4. Export the following environment variables
   - ACCOUNT : AWS account ID
   - REGISTRY_NAME : ECR Registry name
5. Run `npm run cdk:deploy` to create CFn stack and IAM resources

## License
[MIT](LICENSE)
