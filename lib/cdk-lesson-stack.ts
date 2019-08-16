import { Construct, Stack, StackProps, CfnOutput }  from '@aws-cdk/core';
import { Group, Policy, PolicyStatement, User, CfnAccessKey } from '@aws-cdk/aws-iam';

const account = process.env.ACCOUNT;
const repositoryName = process.env.REGISTRY_NAME;

const groupName = 'Group01';
const userNames = ['User01', 'User02', 'User03'];

export class CdkLessonStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // ポリシーステートメントの定義
    const policyStatement = new PolicyStatement({
      resources: [`arn:aws:ecr:ap-northeast-1:${account}:repository/${repositoryName}`],
      actions: [
        "ecr:GetDownloadUrlForLayer",
        "ecr:BatchGetImage",
        "ecr:DescribeImages",
        "ecr:BatchCheckLayerAvailability",
        "ecr:GetRepositoryPolicy",
      ],
    })
    // ポリシーの定義
    const policyName = 'AllowGetImagesFromECR';
    const policy = new Policy(this, policyName, { 
      policyName,
      statements: [policyStatement],
    });
    // グループの定義
    const group = new Group(this, groupName, { groupName });
    group.attachInlinePolicy(policy);

    // ユーザとアクセスキーの定義
    userNames.forEach((userName) => {
      const user = new User(this, userName, { userName, groups: [group] });
      const key = new CfnAccessKey(this, `${userName}Key`, { userName: user.userName });
      new CfnOutput(this, `${userName}AccessKey`, { value: key.ref });
      new CfnOutput(this, `${userName}SecretAccessKey`, { value: key.attrSecretAccessKey });
      console.log({ name: user.userName, key: key.ref, secret: key.attrSecretAccessKey});
    });
  }
}
