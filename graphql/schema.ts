import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  enum Role {
    SUPER_ADMIN
    COORDINATOR
    USER
  }

  enum Status {
    ACTIVE
    INACTIVE
  }

  type User {
    id: ID!
    email: String!
    role: Role!
    status: Status!
    password: String!
    projects: [Project]
    profile: Profile
    createdAt: String!
    updatedAt: String!
    lastLogin: String
  }

  type Profile {
    id: ID!
    bio: String
    firstName: String!
    lastName: String!
    phone: String
    address: String
    city: String
    country: String
    image: String
    userId: String
    user: User
    createdAt: String!
    updatedAt: String!
  }

  enum ProjectType {
    DRAFT
    ONGOING
    COMPLETED
  }

  type Project {
    id: ID!
    name: String!
    content: String
    published: Boolean
    location: String
    coordinatorId: Int
    coordinator: User
    totalDonations: Int
    type: ProjectType
    progress: Int
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    users: [User]
    user(id: ID!): User
    profile(id: ID!): Profile
    projects: [Project]
    project(id: ID!): Project
  }

  type Mutation {
    createUser(email: String!, password: String!): User
    updateUser(
      id: ID!
      email: String
      password: String
      role: Role
      status: Status
    ): User
    deleteUser(id: ID!): User
    createProfile(
      firstName: String!
      lastName: String!
      phone: String
      address: String
      city: String
      country: String
      image: String
      userId: String
    ): Profile
    updateProfile(
      id: ID!
      bio: String
      firstName: String
      lastName: String
      phone: String
      address: String
      city: String
      country: String
      image: String
    ): Profile
    createProject(
      name: String!
      content: String
      published: Boolean
      location: String
      coordinatorId: Int
      type: ProjectType
      progress: Int
    ): Project
    updateProject(
      id: ID!
      name: String
      content: String
      published: Boolean
      location: String
      coordinatorId: Int
      type: ProjectType
      progress: Int
    ): Project
  }
`
