const { v4 } = require("uuid");
const AWS = require("aws-sdk");

const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.createEvent = async (event) => {
  const { name, date, location, capacity, description } = JSON.parse(event.body);

  const newEvent = {
    id: v4(),
    name,
    date,
    location,
    capacity,
    description,
    createdAt: new Date().toISOString(),
  };

  try {
    await dynamodb
      .put({
        TableName: "aws-proyectoGrupal", // Tabla existente
        Item: newEvent,
      })
      .promise();

    return {
      statusCode: 201,
      body: JSON.stringify(newEvent),
    };
  } catch (error) {
    console.error("Error creating event:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error creating event", details: error.message }),
    };
  }
};
