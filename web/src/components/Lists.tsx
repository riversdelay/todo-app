import React, { useContext } from "react";
import { List } from "./List";
import { Form } from "./Form";
import { Toast } from "../utils";
import { ListFieldsFragment } from "../graphql";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TodosContext } from "../context";
import { client } from "../graphql/client";
import { locale, getCurrentLocale } from "../locale";

export const Lists = () => {
  const { lists, addList } = useContext(TodosContext);

  const currentLocale = locale[getCurrentLocale()];

  const handleAddList = async (name: ListFieldsFragment["name"]) => {
    if (!name.length) return;

    try {
      const { createList } = await client.CreateList({ name });

      addList(createList);

      document.getElementById("add-task")?.focus();

      Toast.fire({
        title: currentLocale.swalAddListSuccess,
        icon: "success"
      });
    } catch (err) {
      console.log(err);

      Toast.fire({
        title: currentLocale.swalAddListError,
        icon: "error"
      });
    }
  };

  return (
    <div className="card lists">
      <div className="card-header">
        <h2 className="card-title">
          {currentLocale.listsCardTitle}{" "}
          <small>
            <FontAwesomeIcon icon="list-ul" />
          </small>
        </h2>
      </div>
      <div className="card-body">
        <Form
          onSubmit={async value => await handleAddList(value)}
          placeholder={currentLocale.listsInputPlaceholder}
          id="add-list"
          aria-label={currentLocale.listsInputPlaceholder.replace("...", "")}
        />
        <ul className="list-group">
          {lists.map(({ id, name, tasks }) => (
            <List key={id} id={id} name={name} tasksLength={tasks.length} />
          ))}
        </ul>
      </div>
    </div>
  );
};
