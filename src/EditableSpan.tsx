import { ChangeEvent, useState } from "react";

type EditableSpanType = {
  value: string;
  onChange: (newTitle: string) => void;
};
export const EditableSpan = ({ value, onChange }: EditableSpanType) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(value);

  const activateEditMode = () => {
    setEditMode(true);
  };
  const deactivateEditMode = () => {
    setEditMode(false);
    onChange(title);
  };

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return (
    <>
      {editMode ? (
        <input value={title} onChange={onChangeTitleHandler} onBlur={deactivateEditMode} autoFocus />
      ) : (
        <span onDoubleClick={activateEditMode}>{value}</span>
      )}
    </>
  );
};
