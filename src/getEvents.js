const AWS = require("aws-sdk");

const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.getEvents = async () => {
  try {
    const result = await dynamodb
      .scan({
        TableName: "aws-proyectoGrupal", // Tabla existente
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify(result.Items),
    };
  } catch (error) {
    console.error("Error fetching events:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error fetching events", details: error.message }),
    };
  }
};
