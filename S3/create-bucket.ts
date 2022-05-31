import { Bucket } from '@aws-cdk/aws-s3';
import aws, { S3 } from 'aws-sdk';


require("dotenv").config();
var params = {
    Bucket: 'test-bucket',
    ACL: 'private'
};

export async function createBucket() {
    const s3 = new S3();
    try {
        await s3.createBucket(params).promise();
        console.log("You successfully created a bucket");
        
    } catch (err) {
        return {
            statusCode: 400,
            headers: {},
            body: JSON.stringify("Woopsies! Cannot create bucket...")
        }
    }
};

