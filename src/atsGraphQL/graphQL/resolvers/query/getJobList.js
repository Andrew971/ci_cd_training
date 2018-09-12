const {dynamoDB} = require('../../config');
const { applyCustumScanFilter, createToken, verifyToken } = require('../../utils');

const getJobList = (root, args, context, info) => {
  const nextToken = args.nextToken?verifyToken(args.nextToken):null
  let params = {
    TableName: 'JobsTable',
    ScanFilter: applyCustumScanFilter(args.filter),
    Limit:args.limit,
    ExclusiveStartKey: nextToken ? nextToken : null
  }

  return dynamoDB
    .scan(params)
    .promise()
    .then(data => {
      return {Items:data.Items,nextToken:createToken(data.LastEvaluatedKey)}
    }
    )
    .catch(err => console.log(err));
}

module.exports = getJobList;
