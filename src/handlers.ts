import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import AWS from 'aws-sdk'

const docClient = new AWS.DynamoDB.DocumentClient()
const TableName = 'UserTable'
export const createUser = async (event: APIGatewayProxyEvent) : Promise<APIGatewayProxyResult> => {
  const reqBody = JSON.parse(event.body as string)

  const user = {
    ...reqBody,
    productID: 'Id'
  }

  await docClient.put({
    TableName,
    Item: {
      user
    }
  })
    .promise()

  return {
    statusCode: 200,
    body: JSON.stringify(user)
  }
}

export const getUser = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters?.id

  const output = await docClient.get({
    TableName,
    Key: {
      userId: id
    }
  }).promise()

  if (!output.Item) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: 'not found' })
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(output.Item)
  }
}
