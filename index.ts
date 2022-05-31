process.env.AWS_PROFILE = "metergram-internship"
import * as bucket from './S3/create-bucket'
import * as db from './DynamoDB/create-table'

async function createBucketAndTable(){
    await db.createTable();
    await bucket.createBucket();
}

createBucketAndTable();