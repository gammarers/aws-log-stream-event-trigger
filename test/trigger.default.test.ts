import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { LogStreamEventTrigger } from '../src';

describe('LogStreamEventTrigger default Testing', () => {

  const app = new App();

  const stack = new Stack(app, 'Stack');

  new LogStreamEventTrigger(stack, 'LogStreamEventTrigger');

  const template = Template.fromStack(stack);

  it('Should have one iam role existing', async () => {
    template.resourceCountIs('AWS::IAM::Role', 1);
  });

  it('Should have one lambda function existing', async () => {
    template.resourceCountIs('AWS::Lambda::Function', 1);
  });

  it('Should have one log group existing', async () => {
    template.resourceCountIs('AWS::Logs::LogGroup', 1);
  });

  it('Should match snapshot', () => {
    expect(template.toJSON()).toMatchSnapshot();
  });
});
