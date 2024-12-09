import { awscdk, javascript } from 'projen';
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'yicr',
  authorAddress: 'yicr@users.noreply.github.com',
  cdkVersion: '2.120.0',
  typescriptVersion: '5.5.x',
  jsiiVersion: '5.5.x',
  defaultReleaseBranch: 'main',
  name: '@gammarers/aws-log-stream-event-trigger',
  projenrcTs: true,
  repositoryUrl: 'https://github.com/gammarers/aws-log-stream-event-trigger.git',
  devDeps: [
    // require lambda
    '@types/aws-lambda@^8',
    // test snapshots filename renamer
    '@gammarers/jest-aws-cdk-asset-filename-renamer@^0.5.24',
  ],
  releaseToNpm: true,
  npmAccess: javascript.NpmAccess.PUBLIC,
  minNodeVersion: '18.0.0',
  jestOptions: {
    jestConfig: {
      snapshotSerializers: ['<rootDir>/node_modules/@gammarers/jest-aws-cdk-asset-filename-renamer'],
    },
    extraCliOptions: ['--silent'],
  },
  lambdaOptions: {
    runtime: awscdk.LambdaRuntime.NODEJS_20_X,
    bundlingOptions: {
      sourcemap: true,
    },
  },
  workflowNodeVersion: '22.4.x',
  depsUpgradeOptions: {
    workflowOptions: {
      labels: ['auto-approve', 'auto-merge'],
      schedule: javascript.UpgradeDependenciesSchedule.expressions(['29 16 * * 3']),
    },
  },
  autoApproveOptions: {
    secret: 'GITHUB_TOKEN',
    allowedUsernames: ['yicr'],
  },
});
project.synth();