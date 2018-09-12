const { gql } = require('apollo-server-lambda');
const test = fn`

type
`

const typeDefs = gql`

  type Job {
    Id: ID
    Title: String
    Location: String
    Description: String
    Status: String
    Stage: String
    Postings: [Posting]
  }
  type JobConnection {
    Items: [Job]
    nextToken:String
  }
  type Candidate {
    Id: ID
    Firstname: String
    Lastname: String
    Occupation: String
  }
  type CandidateConnection {
    Items: [Candidate]
    nextToken:String
  }
  type Applicant {
    Id: ID
    JobId: ID
    CandidateId: ID
    Stage: String
    CreatedAt: String
    Candidate: Candidate
  }

  type ApplicantConnection {
    Items: [Applicant]
    nextToken:String
  }
  type Posting {
    id: ID
    jobID: ID
    platform: String
    link: String
    postedAt: String
    details: String
  }

  type Query {
    jobs(
      searchString: String
    ): [Job]
    job(
      Id: ID!,
    ): Job
    applicant(
      Id: ID!,
    ): Applicant
    candidate(
      id: ID!,
    ): Candidate
    getJobList(filter:JobFilterInput, limit:Int, nextToken:String ) : JobConnection
    getApplicantList(filter:ApplicantFilterInput, limit:Int, nextToken:String ) : ApplicantConnection
    getCandidateList(filter:CandidateFilterInput, limit:Int, nextToken:String) : CandidateConnection
  }
  input JobFilterInput {
    Title: StringFilterInput
    Location: StringFilterInput
    Description: StringFilterInput
    Status: StringFilterInput
    Stage: StringFilterInput
  }
  input ApplicantFilterInput {
    JobId: StringFilterInput
    CandidateId: StringFilterInput
    Stage: StringFilterInput
    CreatedAt: StringFilterInput
  }
  input CandidateFilterInput {
    Firstname: StringFilterInput
    Lastname: StringFilterInput
    Occupation: StringFilterInput
  }

  input StringFilterInput {
    ne: String
    eq: String
    le: String
    lt: String
    ge: String
    gt: String
    contains: String
    not_Contains: String
    between: [String]
    begins_With: String
  }
  
  input JobInput {
    Title: String
    Location: String
    Description: String
    Status: String,
    Stage:String
  }

  input ApplicantInput {
    JobId: ID
    CandidateId: ID
    Stage: String
    CreatedAt: String
  }

  input CandidateInput {
    Firstname: String
    Lastname: String
    Occupation: String
  }

  type Mutation {
    createJob(Id:ID): Job
    updateJob(
      Id: ID!,
      input: JobInput
    ): Job
    deleteJob(
      Id: ID!,
    ): Boolean
    createApplicant(Id:ID): Applicant
    updateApplicant(
      Id: ID!,
      input: ApplicantInput
    ): Applicant
    deleteApplicant(
      Id: ID!,
    ): Boolean
    createCandidate(Id:ID): Candidate
    updateCandidate(
      Id: ID!,
      input: CandidateInput
    ): Candidate
    deleteCandidate(
      Id: ID!,
    ): Boolean
  }

`;


module.exports = typeDefs;
