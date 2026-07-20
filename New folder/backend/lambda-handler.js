const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const {
  DynamoDBDocumentClient,
  PutCommand,
} = require('@aws-sdk/lib-dynamodb');

const client = new DynamoDBClient({ region: 'eu-north-1' });
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async (event) => {
  try {
    const body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body || {};
    const { email, password, name, roll, roll_no } = body;

    if (!email || !password || !name || (roll === undefined && roll_no === undefined)) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Please fill in all fields.' }),
      };
    }

    const rollValue = roll_no ?? roll;

    await docClient.send(
      new PutCommand({
        TableName: 'students',
        Item: {
          email,
          name,
          roll_no: Number(rollValue),
          password,
        },
      })
    );

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        message: 'Student Registered Successfully',
      }),
    };
  } catch (error) {
    console.error('Lambda registration error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: error.message }),
    };
  }
};
