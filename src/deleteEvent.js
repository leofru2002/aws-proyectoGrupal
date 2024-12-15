const AWS = require("aws-sdk");

const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.deleteEvent = async (event) => {
  const { id } = event.pathParameters;

  try {
    await dynamodb
      .delete({
        TableName: "aws-proyectoGrupal", // Tabla existente
        Key: { id },
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Event deleted successfully" }),
    };
  } catch (error) {
    console.error("Error deleting event:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error deleting event", details: error.message }),
    };
  }
};
