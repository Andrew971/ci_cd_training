const {dynamoDB} = require('../../config');

const deleteApplicant = (obj, args, context, info) => {
  let params = {
    TableName: 'ApplicantTable',
    Key: {'Id': args.Id},
  }

  return dynamoDB
            .delete(params)
            .promise()
            .then(()=>true)
            .catch(err=>console.log(err));
  // use try catch blocks here! - with ApolloError etc!
}

module.exports = deleteApplicant;