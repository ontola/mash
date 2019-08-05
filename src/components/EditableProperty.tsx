import { TextField } from "@material-ui/core";
import { Property } from "link-redux";
import { PropertyPropTypes } from "link-redux/dist/typings/components/Property";
import { ChangeEvent } from "react";
import * as React from "react";

export interface EditablePropertyProps extends PropertyPropTypes {
  onEdit: (e: ChangeEvent<any>) => any;
}

export const EditableProperty = ({
  children,
  onEdit,
  ...rest
}: EditablePropertyProps) => {
  const [ editing, setEditing ] = React.useState(false);
  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      setEditing(false);
    }
  };

  const child = !editing
    ? children
    : ([ value ]) => (
      <TextField
        autoFocus
        fullWidth
        id="name"
        label="Name"
        margin="dense"
        type="text"
        value={value ? value : ""}
        variant="outlined"
        onChange={onEdit}
        onKeyUp={handleKeyUp}
      />
    );

  return (
    <div onDoubleClick={() => setEditing(true)}>
      <Property {...rest}>
        {child}
      </Property>
    </div>
  );
};
