import { Duration, RemovalPolicy, Stack } from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as destinations from 'aws-cdk-lib/aws-lambda-destinations';
import * as logs from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';
import { ParserFunction } from './funcs/parser-function';

export class LogStreamEventTrigger extends Construct {

  public readonly logStreamSubscriptionFilterDestinationFunction: lambda.IFunction;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    // 👇 Get current account & region
    const account = Stack.of(this).account;
    const region = Stack.of(this).region;
    const partition = Stack.of(this).partition;

    // SubscriptionFilterLogParserFunction

    // 👇 parser Lambda Function
    this.logStreamSubscriptionFilterDestinationFunction = new ParserFunction(this, 'ParserFunction', {
      // functionName: undefined,
      architecture: lambda.Architecture.ARM_64,
      timeout: Duration.seconds(10),
      role: new iam.Role(this, 'ParserFunctionRole', {
        // roleName: `lambda-log-notification-func-${random}-exec-role`,
        assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
        managedPolicies: [
          iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
        ],
        inlinePolicies: {
          ['put-events-policy']: new iam.PolicyDocument({
            statements: [
              new iam.PolicyStatement({
                effect: iam.Effect.ALLOW,
                actions: ['events:PutEvents'],
                resources: [`arn:${partition}:events:${region}:${account}:event-bus/default`],
              }),
            ],
          }),
        },
      }),
      logGroup: new logs.LogGroup(this, 'ParserFunctionLogGroup', {
        //logGroupName: `/aws/lambda/${functionName}`,
        retention: logs.RetentionDays.THREE_MONTHS,
        removalPolicy: RemovalPolicy.RETAIN_ON_UPDATE_OR_DELETE,
      }),
      logFormat: lambda.LogFormat.JSON,
      systemLogLevel: lambda.SystemLogLevel.INFO,
      applicationLogLevel: lambda.ApplicationLogLevel.INFO,
      onSuccess: new destinations.EventBridgeDestination(),
      // onFailure: new lambdaDestinations.EventBridgeDestination(),
    });

  }
}
