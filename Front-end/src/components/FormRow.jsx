import React from "react";
import "../styles/formRow.css"
function FormRow({ name, labelText, type, defaultValue,palaceholder }) {
  return (
    <div className="form-row">
      <label htmlFor={name}>{labelText || name}</label>
      <input
        type={type}
        name={name}
        id={name}
        defaultValue={defaultValue || ""}
        placeholder={palaceholder || ""}
        required
      />
    </div>
  );
}
export default FormRow;
