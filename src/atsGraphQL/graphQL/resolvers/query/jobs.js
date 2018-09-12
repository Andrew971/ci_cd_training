

const jobs = (obj, args, context, info) => {
  const { searchString } = args;
  if (searchString) {
    // const allJobs = db
    //   .get('jobs')
    //   .value();
    //   var options = {
    //     shouldSort: true,
    //     threshold: 0.6,
    //     location: 0,
    //     distance: 100,
    //     maxPatternLength: 32,
    //     minMatchCharLength: 1,
    //     keys: [
    //       "title",
    //       "location"
    //   ]
    //   };
    //   var fuse = new Fuse(list, options); // "list" is the item array
    //   var result = fuse.search("");

    // return result;
    

    // good!
    return db
      .get('jobs')
      .filter(job => (
        // _.includes(
        //   _.lowerCase(job.status),
        //   _.lowerCase('Draft')
        // )
        job.status !== 'Draft'
      )) // this is a hack! okay..
      .filter(job => (
        _.includes(
          _.lowerCase(job.title),
          _.lowerCase(searchString)
        ) || 
        _.includes(
          _.lowerCase(job.location),
          _.lowerCase(searchString)
        )
      ))
      .value();
  } else {
    return db
      .get('jobs')
      .filter(job => (
        // _.includes(
        //   _.lowerCase(job.status),
        //   _.lowerCase('Draft')
        // )
        job.status !== 'Draft'
      )) // this is a hack! okay..
      .value(); // pagination later.
    }
}

module.exports = jobs;