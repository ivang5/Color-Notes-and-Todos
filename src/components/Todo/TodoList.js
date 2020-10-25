import React from "react";
import TodoItem from "./TodoItem";

export default function TodoList({ items }) {
  return items.map((item) => <TodoItem key={item.id} {...item} />);
}
