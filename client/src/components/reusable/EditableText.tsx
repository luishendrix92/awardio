import React, { useEffect, useState } from "react";

interface EditableTextProps {
  size?: 'mini' | 'small' | 'large' | 'big';
  onChange: (newValue: string) => Promise<void>;
  fluid?: boolean;
  label: string;
  text: string;
}

function EditableText({ onChange, label, text, fluid = false, size = 'mini' }: EditableTextProps) {
  const [editedText, setEditedText] = useState(text);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setEditedText(text);
  }, [text]);

  const saveChangesHandler = () => {
    onChange(editedText).then(() => setIsEditing(false));
  };

  if (isEditing) {
    return (
      <div className={`ui input action labeled ${fluid ? 'fluid' : ''} ${size}`}>
        <div className="ui label">{label}</div>
        <input
          onChange={(e) => setEditedText(e.target.value)}
          type="text" autoFocus value={editedText}
        />
        <div className={`ui icon button red ${size}`} onClick={() => setIsEditing(false)}>
          <i className="icon cancel"></i>
        </div>
        <div className={`ui icon button green ${size}`} onClick={saveChangesHandler}>
          <i className="icon save"></i>
        </div>
      </div>
    );
  }

  return (
    <span onClick={() => setIsEditing(true)}>
      {text}
    </span>
  );
}

export default EditableText;