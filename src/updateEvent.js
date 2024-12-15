const AWS = require("aws-sdk");

const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.updateEvent = async (event) => {
  const { id } = event.pathParameters;
  const { name, date, location, capacity, description } = JSON.parse(event.body);

  try {
    await dynamodb
      .update({
        TableName: "aws-proyectoGrupal", // Nombre de la tabla existente
        Key: { id },
        UpdateExpression:
          "set #name = :name, #date = :date, #location = :location, #capacity = :capacity, description = :description",
        ExpressionAttributeNames: {
          "#name": "name",       // Alias para 'name'
          "#date": "date",       // Alias para 'date'
          "#location": "location", // Alias para 'location'
          "#capacity": "capacity", // Alias para 'capacity'
        },
        ExpressionAttributeValues: {
          ":name": name,
          ":date": date,
          ":location": location,
          ":capacity": capacity,
          ":description": description,
        },
        ReturnValues: "ALL_NEW",
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Event updated successfully" }),
    };
  } catch (error) {
    console.error("Error updating event:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error updating event", details: error.message }),
    };
  }
};
