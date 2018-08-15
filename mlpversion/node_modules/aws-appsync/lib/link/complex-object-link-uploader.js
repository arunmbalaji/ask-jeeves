"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*!
 * Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 * Licensed under the Amazon Software License (the "License"). You may not use this file except in compliance with the License. A copy of
 * the License is located at
 *     http://aws.amazon.com/asl/
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
var S3 = require("aws-sdk/clients/s3");
exports.default = (function (fileField, _a) {
    var credentials = _a.credentials;
    var Bucket = fileField.bucket, Key = fileField.key, region = fileField.region, ContentType = fileField.mimeType, Body = fileField.localUri;
    var s3 = new S3({
        credentials: credentials,
        region: region,
    });
    return s3.upload({
        Bucket: Bucket,
        Key: Key,
        Body: Body,
        ContentType: ContentType,
    }).promise();
});
