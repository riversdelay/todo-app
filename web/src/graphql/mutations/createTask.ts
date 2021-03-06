import gql from "graphql-tag";
import { taskFieldsFragment } from "../fragments/taskFields";

export const createTaskMutation = gql`
  mutation CreateTask($listId: Int!, $name: String!) {
    createTask(listId: $listId, name: $name) {
      ...TaskFields
    }
  }

  ${taskFieldsFragment}
`;
