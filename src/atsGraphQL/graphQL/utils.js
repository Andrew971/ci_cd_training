const jwt = require('jsonwebtoken');

const applyCustumScanFilter = (filter) => {

  if (filter) {
    let custumScanFilter = {}

    Object
      .keys(filter)
      .forEach((item, i) => {
        let key = Object.values(filter);
        let compareOp = Object.keys(filter[item]);
        const value = Object.values(key[i])

        return Object.assign(custumScanFilter, {
          [item]: {
            ComparisonOperator: compareOp[0].toUpperCase(),
            AttributeValueList: value
          }
        });
      })

    return custumScanFilter;
  } else {
    return null;
  };
}

const code = (process.env.NODE_ENV !== 'developement')
                ?process.env.JWT_SECRET
                :"00000";

const createToken = (data)=>{
  let token = jwt.sign(data,code);
  return token
}

const verifyToken =(token) =>{
  let verify = jwt.verify(token,code);

  return {Id:verify.Id}
}


module.exports = {
  applyCustumScanFilter,
  createToken,
  verifyToken
}