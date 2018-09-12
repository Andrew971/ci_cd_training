const {dynamoDB} = require('../../../config');


const getNestedCandidate = (root,args, context, info) => {
  console.log(root)

  let params = {
      TableName: 'CandidateTable',
      Key: {'Id': root.CandidateID}
    }
    return  dynamoDB
              .get(params)
              .promise()
              .then(data=>data.Item)
              .catch(err=>console.log(err));
}

module.exports = getNestedCandidate ;