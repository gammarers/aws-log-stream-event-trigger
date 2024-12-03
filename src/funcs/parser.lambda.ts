import { gunzipSync } from 'zlib';
import { CloudWatchLogsDecodedData, CloudWatchLogsEvent, Context } from 'aws-lambda';

export const handler = async (event: CloudWatchLogsEvent, context: Context): Promise<CloudWatchLogsDecodedData | Error> => {
  console.log({ event: event });
  console.log({ context: context });

  // decode base64
  const payload = Buffer.from(event.awslogs.data, 'base64');

  // gunzip
  const result = gunzipSync(payload);

  // parse json
  return JSON.parse(result.toString('utf8'));
};