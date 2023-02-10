import React, { useContext, useEffect } from "react";
import { FormCtx } from "../Form";
import { ERROR, SUCCESS } from "../../constants";
// Generic component for input 
const Input = (props) => {
  const { id } = props;
  const {
    setFields,
    addField,
    fields,
    validateField,
    clearValidationField,
    errors,
    validateClasses,
  } = useContext(FormCtx);
  const field = fields[id] || {};
  const {
    name,
    rows,
    value,
    validate,
    isOnBlur,
    validation,
    placeholder,
    type = "text",
    events = {},
    classes = {},
  } = field;
  const fieldError = errors[id];
  const { onChange, onBlur, ...restEvents } = events;
  const {
    inputClass,
    fieldClass,
    errorClass,
    defaultClass,
    customClasses,
    customContainerClasses,
  } = classes;
  const handleChange = (event) => {
    try {
      setFields(event, field);
    } catch (error) {
      throw error;
    }

    if (typeof onChange === "function") {
      onChange({
        ...field,
        value: event.target.value,
      });
    }
  };
  const handleOnBlur = (event) => {
    try {
      setFields(event, field);
    } catch (error) {
      throw error;
    }
    if (field.isOnBlur && validation) {
      validateField(field.id);
    }
  };

  useEffect(() => {
    if (value !== undefined && !isOnBlur && validation) {
      validateField(id);
    }
    if (value !== undefined && validation) {
      clearValidationField(id);
    }
  }, [value, id]);

  useEffect(() => {
    addField({
      field: props,
      value,
    });
  }, []);

  const fieldProps = {
    ...restEvents,
    id,
    name,
    type,
    value,
    validate,
    placeholder,
    className: fieldClass,
    onChange: handleChange,
    onBlur: handleOnBlur,
  };

  if (type === "textarea") {
    delete fieldProps.type;
    delete fieldProps.value;

    fieldProps.defaultValue = value;
    fieldProps.rows = rows || 2;
  }
  return field && field.value !== undefined ? (
    <div className={`${defaultClass} ${customContainerClasses}`}>
      {type === "textarea" ? (
        <textarea {...fieldProps} />
      ) : (
        <input
          key={field.componentKey}
          {...fieldProps}
          className={`${inputClass} ${
            field && field.validation ? validateClasses[field.id] : ""
          }  ${customClasses}`}
        />
      )}
      <div className={errorClass}>{fieldError}</div>
    </div>
  ) : (
    ""
  );
};
Input.defaultProps = {
  events: {},
  classes: {
    defaultClass: "form-group",
    contClass: "",
    errorClass: "form-error-label",
    inputClass: "form-control",
    labelClass: "form-label",
    customContainerClasses: "",
    customClasses: "",
  },
};
export default Input;
