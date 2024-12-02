import { Construct } from 'constructs';

export interface LogStreamEventTriggerProps {
}

export class LogStreamEventTrigger extends Construct {
  constructor(scope: Construct, id: string /** props?: LogStreamEventTriggerProps */ ) {
    super(scope, id);
  }
}
