const {dynamoDB} = require('../../config');


const updateApplicant = (obj, args, context, info) => {
    let params = {
      TableName: 'ApplicantTable',
      Key: {'Id': args.Id},
      UpdateExpression: "SET JobId = :jobId, CandidateId = :candidateId, CreatedAt = :createdAt, Stage = :stage",
      ExpressionAttributeNames:{
        "#Location":"Location",
        "#Status":"Status"
      },
      ExpressionAttributeValues:{
        ":jobId":args.input.JobId,
        ":candidateId":args.input.CandidateId,
        ":createdAt":args.input.CreatedAt,
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

module.exports = updateApplicant;