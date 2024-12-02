import { App, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { LogStreamEventTrigger } from '../src';

describe('LogStreamEventTrigger default Testing', () => {

  const app = new App();

  const stack = new Stack(app, 'Stack');

  new LogStreamEventTrigger(stack, 'LogStreamEventTrigger');

  const template = Template.fromStack(stack);

  it('Should match snapshot', () => {
    expect(template.toJSON()).toMatchSnapshot();
  });
});
