const {dynamoDB} = require('../../../config');

const getNestedPostings = (root,args, context, info) => {
  let params = {
    TableName: 'PostingTable',
    Index: { JobId: root.Id }
  }
  return dynamoDB
    .scan( params )
    .promise()
    .then( data => data.Item )
    .catch( err => console.log(err) );
}

module.exports = getNestedPostings;
