const {
  // jobs,
  job,
  candidate,
  applicant,
  getNestedCandidate,
  getNestedPostings,
  getJobList,
  getApplicantList,
  getCandidateList
} = require('./query');
const {
  createJob,
  updateJob,
  deleteJob,
  createApplicant,
  updateApplicant,
  deleteApplicant,
  createCandidate,
  updateCandidate,
  deleteCandidate
} = require('./mutation')


const resolvers = {
  Query: {
    // jobs,
    job,
    applicant,
    candidate,
    getJobList,
    getApplicantList,
    getCandidateList
  },
  Mutation: {
    createJob,
    updateJob,
    deleteJob,
    createApplicant,
    updateApplicant,
    deleteApplicant,
    createCandidate,
    updateCandidate,
    deleteCandidate
  },
  Applicant:{
    Candidate: getNestedCandidate
  },
  Job:{
    Postings: getNestedPostings
  }
};

module.exports = resolvers;