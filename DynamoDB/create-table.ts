import aws, { S3 } from 'aws-sdk';

var params = {
  AttributeDefinitions: [
    {
      AttributeName: "Artist",
      AttributeType: "S"
    },
    {
      AttributeName: "SongTitle",
      AttributeType: "S"
    }
  ],
  KeySchema: [
    {
      AttributeName: "Artist",
      KeyType: "HASH"
    },
    {
      AttributeName: "SongTitle",
      KeyType: "RANGE"
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 5,
    WriteCapacityUnits: 5
  },
  TableName: "Music"
};

export async function createTable() {
  const dynamodb = new aws.DynamoDB();
  try {
    await dynamodb.createTable(params).promise();
    console.log("You successfully created a table!");

  } catch (err) {
    return {
      statusCode: 400,
      headers: {},
      body: JSON.stringify("Woopsies! Cannot create table...")
    }
  }
};




