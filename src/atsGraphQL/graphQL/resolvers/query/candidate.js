const {dynamoDB} = require('../../config');

const candidate = (root, args, context, info) => {
  let params = {
    TableName: 'CandidateTable',
    Key: {'Id': args.Id}
  }
  return  dynamoDB
            .get(params)
            .promise()
            .then(data=>data.Item)
            .catch(err=>console.log(err));;
}

module.exports = candidate;