import React, { useContext, useEffect } from "react";
import { FormCtx } from "../Form";
import { CountryDropdown } from "react-country-region-selector";
import { Field } from "formik";
const CountryList = (props) => {
  const { id } = props;
  const {
    setFields,
    addField,
    fields,
    validateField,
    clearValidationField,
    errors,
  } = useContext(FormCtx);
  const field = fields[id] || {};
  const {
    name,
    rows,
    value,
    validate,
    isOnBlur,
    placeholder,
    label = "",
    type = "text",
    events = {},
    classes = {},
  } = field;
  const fieldError = errors[id];

  const { onChange, onBlur, ...restEvents } = events;
  const { selectClass, fieldClass, errorClass, defaultClass } = classes;

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
    placeholder,
    className: fieldClass,
    onChange: handleChange,
  };
  return field && field.value !== undefined ? (
    <div className={`${defaultClass}`}>
      <CountryDropdown {...fieldProps} classes={`${selectClass}`} />
    </div>
  ) : (
    ""
  );
};
CountryList.defaultProps = {
  events: {},
  classes: {
    defaultClass: "form-group",
    selectClass: "form-control",
  },
};
export default CountryList;
