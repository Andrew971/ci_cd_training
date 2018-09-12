const {dynamoDB} = require('../../config');


const updateJob = (obj, args, context, info) => {
    let params = {
      TableName: 'JobsTable',
      Key: {'Id': args.Id},
      UpdateExpression: "SET Title = :title, #Location = :location, Description = :description, #Status = :status,Stage = :stage",
      ExpressionAttributeNames:{
        "#Location":"Location",
        "#Status":"Status"
      },
      ExpressionAttributeValues:{
        ":title":args.input.Title,
        ":location":args.input.Location,
        ":description":args.input.Description,
        ":status":args.input.Status,
        ":stage":args.input.Stage,
    },
      ReturnValues:"ALL_NEW"
    }


    return dynamoDB
            .update(params)
            .promise()
            .then(data=>{
              const {Id,info} = data.Attributes;
              return Object.assign({Id}, info)
            })
            .catch(err=>console.log(err));
}

module.exports = updateJob;