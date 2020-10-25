import React from "react";
import NoteItem from "./NoteItem";

export default function NoteList({ items }) {
  return items.map((item) => <NoteItem key={item.id} {...item} />);
}
