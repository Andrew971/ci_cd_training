const {dynamoDB} = require('../../config');

const applicant = (obj, args, context, info) => {
  let params = {
    TableName: 'ApplicantTable',
    Key: {'Id': args.Id}
  }
  return  dynamoDB
            .get(params)
            .promise()
            .then(data=>data.Item)
            .catch(err=>console.log(err));
}

module.exports = applicant;

