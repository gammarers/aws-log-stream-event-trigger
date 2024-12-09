# AWS Log Stram Event Trigger

[![GitHub](https://img.shields.io/github/license/gammarers/aws-log-stream-event-trigger?style=flat-square)](https://github.com/gammarers/aws-log-stream-event-trigger/blob/main/LICENSE)
[![npm (scoped)](https://img.shields.io/npm/v/@gammarers/aws-log-stream-event-trigger?style=flat-square)](https://www.npmjs.com/package/@gammarers/aws-log-stream-event-trigger)
[![GitHub Workflow Status (branch)](https://img.shields.io/github/actions/workflow/status/gammarers/aws-log-stream-event-trigger/release.yml?branch=main&label=release&style=flat-square)](https://github.com/gammarers/aws-log-stream-event-trigger/actions/workflows/release.yml)
[![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/gammarers/aws-log-stream-event-trigger?sort=semver&style=flat-square)](https://github.com/gammarers/aws-log-stream-event-trigger/releases)

This AWS CDK Construct is a function that serves as a subscription destination for logs output to CloudWatch Logs by a Node.js-based Lambda function. It simply decompresses and parses the received logs as JSON, then outputs the result as a success action of the Lambda function.

## Install

### TypeScript

#### install by npm

```shell
npm install @gammarers/aws-log-stream-event-trigger
```

#### install by yarn

```shell
yarn add @gammarers/aws-log-stream-event-trigger
```

## Example

```typescript
import { LogStreamEventTrigger } from '@gammarers/aws-log-stream-event-trigger';

new LogStreamEventTrigger(stack, 'LogStreamEventTrigger');

```

## License

This project is licensed under the Apache-2.0 License.



