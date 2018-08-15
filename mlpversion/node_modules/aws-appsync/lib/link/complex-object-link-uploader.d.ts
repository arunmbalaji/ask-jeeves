import * as S3 from 'aws-sdk/clients/s3';
declare const _default: (fileField: any, { credentials }: {
    credentials: any;
}) => Promise<S3.ManagedUpload.SendData>;
export default _default;
