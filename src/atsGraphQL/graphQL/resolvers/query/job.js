const {dynamoDB} = require('../../config');


const job = (root,args, context, info) => {
    let params = {
      TableName: 'JobsTable',
      Key: {'Id': args.Id}
    }
    return  dynamoDB
              .get(params)
              .promise()
              .then(data=>data.Item)
              .catch(err=>console.log(err));
}

module.exports = job ;