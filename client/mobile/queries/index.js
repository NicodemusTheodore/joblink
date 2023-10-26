import { gql } from "@apollo/client";

export const GET_JOBS = gql`
  query ExampleQuery {
    jobs {
      id
      title
      description
      Company {
        name
        companyLogo
        location
        email
        description
      }
      authorId
      Author {
        _id
        username
        email
        phoneNumber
        address
      }
      jobType
      Skills {
        id
        jobId
        name
        level
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_JOB_BY_ID = gql`
  query ExampleQuery($jobId: Int) {
    job(jobId: $jobId) {
      id
      title
      description
      Company {
        name
        companyLogo
        location
        email
        description
      }
      authorId
      Author {
        _id
        username
        email
        phoneNumber
        address
      }
      jobType
      Skills {
        id
        jobId
        name
        level
      }
      createdAt
      updatedAt
    }
  }
`;
