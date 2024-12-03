import { CloudWatchLogsEvent, Context } from 'aws-lambda';
import { handler } from '../../src/funcs/parser.lambda';

describe('Lambda Function Handler Succeed testing', () => {

  // const ceClientMock = mockClient(CostExplorerClient);

  beforeEach(() => {
    // ceClientMock.reset();
    // Date.now = jest.fn(() => new Date(2023, 1, 23, 2, 2, 2).getTime());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Lambda Function handler', () => {

    const context = {
      callbackWaitsForEmptyEventLoop: true,
      functionVersion: '$LATEST',
      functionName: 'lambda-xxxx-func',
      memoryLimitInMB: '128',
      logGroupName: '/aws/lambda/lambda-xxxx-func',
      logStreamName: '2024/10/10/llambda-xxxx-func[$LATEST]aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      invokedFunctionArn: 'arn:aws:lambda:ap-northeast-1:999999999999:function:lambda-xxxx-func',
      awsRequestId: '00000000-0000-0000-0000-000000000000',
    };

    const event = {
      awslogs: {
        data: 'H4sIAAAAAAAAE51TYWvbMBD9K+LYhxac2HKabtG3QL0yWBkk/rQoBMW+pGps2ZXkNCbkvxfJThtGYGMPYcO7d8fp7ukIRbVN9qisAbY4gsyBwSj6L1AIoERjxBaBwZGDlSUaK8qaA+MQR/HdgEYDGqU0Yv4MKaW/OQQcCtxj4WXJbPZr5jmNrw0a+yP3/LrH4MrnDJ/Wt8CBHTmg1pVO2xp9jQdhxVoYTBzrxT7+9JHBwbTKigPxPBGWVJooFJpw7vScg08zVmS7VIvMJS36Moz8WzIhxAXDvdChFWYXSpXjYfhiGB1HUcxieimrdZWhMcP+n8psZ6Yqn+ELZlZWypAbVeXIpLKolSjCXuhLr14bbNCwyZiNby+rCtOqjMwa5XY0fBYqL1CTm2s9Te5GMRvdclj6PamtfebAJjTgoETZTQ0/Bmpwj1ra9o9dZlXeKe/i+6i7X10Z6S7g6dF44smNLPo9ZEINi84bUnUcpaOoc0bV2DPphAr1qm37Jk4nCD6tB4x+jb+N4/ieRpTS0zJwjn/UVVMDg1C8mbAQ5ToXIR5EWRc4OPQYbBqVgZfPrUZRAvMeDmnkzlX54svPaZrM06X4Cz6fijMnMHiYptPVUzKfTx8TCKB6U6iBweQCEIBp1ibTsnZz+y4Li9o9Wzj3chkebHwclqd3GRuijuQDAAA=',
      },
    };

    it('Should client succeed', async () => {

      const result = await handler(event as CloudWatchLogsEvent, context as Context);

      expect(result).toEqual({
        logEvents: [
          {
            id: '30000000000000000000000000000000000000000000000000000001',
            message: JSON.stringify({
              timestamp: '2024-10-10T10:10:10.111Z',
              level: 'ERROR',
              requestId: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
              message: {
                errorType: 'DatabaseError',
                errorMessage: 'syntax error at or near ","',
                stackTrace: [
                  'error: syntax error at or near ","',
                  '    at /var/task/index.js:15002:21',
                  '    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)',
                  '    at async Runtime.handler (/var/task/index.js:19432:3)',
                ],
                length: 91,
                name: 'error',
                severity: 'ERROR',
                code: '42601',
                position: '359',
                file: 'scan.l',
                line: '1130',
                routine: 'scanner_yyerror',
              },
            }),
            timestamp: 1728522610111,
          },
        ],
        logGroup: '/aws/lambda/example-xxxxxxxx-func',
        logStream: '2024/10/10/example-xxxxxxxx-func[$LATEST]aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        messageType: 'DATA_MESSAGE',
        owner: '999999999999',
        subscriptionFilters: [
          'example-subscription-filter',
        ],
      });
    });

  });

  //  describe('Error handling', () => {
  //    describe('Should Environment Variable Error handling', () => {
  //      it('Should error cause MissingEnvironmentVariableError(SLACK_WEBHOOK_URL)', async () => {
  //        process.env = {
  //          SLACK_CHANNEL: 'example-channel',
  //        };
  //        // await expect(handler({ Type: EventInputType.SERVICES }, {} as Context)).rejects.toThrow(MissingEnvironmentVariableError);
  //      });
  //      it('Should error cause MissingEnvironmentVariableError(SLACK_POST_CHANNEL)', async () => {
  //        process.env = {
  //          SLACK_TOKEN: 'xxxx-xxxxxxxxx-xxxx',
  //        };
  //        // await expect(handler({ Type: EventInputType.SERVICES }, {} as Context)).rejects.toThrow(MissingEnvironmentVariableError);
  //      });
  //    });
  //    describe('Should Event Input Variable Error handling', () => {
  //      it('Should error cause MissingInputVariableError(Type)', async () => {
  //        process.env = {
  //          SLACK_TOKEN: 'xxxx-xxxxxxxxx-xxxx',
  //          SLACK_CHANNEL: 'example-channel',
  //        };
  //        // await expect(handler({ Type: '' as EventInputType }, {} as Context)).rejects.toThrow(MissingInputVariableError);
  //      });
  //      it('Should error cause InvalidInputVariableError(Type)', async () => {
  //        process.env = {
  //          SLACK_TOKEN: 'xxxx-xxxxxxxxx-xxxx',
  //          SLACK_CHANNEL: 'example-channel',
  //        };
  //        // await expect(handler({ Type: 'Miss' as EventInputType }, {} as Context)).rejects.toThrow(InvalidInputVariableFormatError);
  //      });
  //    });
  //  });

});