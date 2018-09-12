const {dynamoDB} = require('../../config');


const updateCandidate = (obj, args, context, info) => {
    let params = {
      TableName: 'CandidateTable',
      Key: {'Id': args.Id},
      UpdateExpression: "SET Firstname = :firstname, Lastname = :lastname, Occupation = :occupation",
      ExpressionAttributeNames:{
        "#Location":"Location",
        "#Status":"Status"
      },
      ExpressionAttributeValues:{
        ":firstname":args.input.Firstname,
        ":lastname":args.input.Lastname,
        ":occupation":args.input.Occupation
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

module.exports = updateCandidate;