import React, { useContext, useEffect } from "react";
import { FormCtx } from "../Form";
import PropTypes from "prop-types";

const Button = (props) => {
  const { id, loadingText, displayName, classes, sendRequest } = props;
  const {
    addField,
    fields,
    isFetching,
    setFormData,
    validateForm,
    errors,
  } = useContext(FormCtx);
  const field = fields[id] || {};
  const { value, events = {} } = field;

  const { onClick, ...restEvents } = events;
  const { fieldClass } = classes;

  useEffect(() => {
    addField({
      field: props,
      value,
    });
  }, []);

  return field && field.value !== undefined ? (
    <div className={`buttonArea `}>
      <input
        className={`${classes.buttonClass}`}
        {...restEvents}
        type='submit'
        value={`${isFetching ? loadingText : displayName}`}
        onClick={(event) => {
          event.preventDefault();

          if (!isFetching) {
            validateForm();

            if (errors && Object.values(errors).join("").length === 0) {
              setFormData({ isFetching: true });
              sendRequest();
            }
          }
        }}
      />
    </div>
  ) : (
    ""
  );
};
Button.propTypes = {
  displayName: PropTypes.string.isRequired,
  loadingText: PropTypes.string,
  loadingClass: PropTypes.string,
  shouldUseDefaultClasses: PropTypes.bool,
  events: PropTypes.shape({
    onClick: PropTypes.func,
  }),
  classes: PropTypes.shape({
    buttonClass: PropTypes.string,
    contClass: PropTypes.string,
  }),
};

Button.defaultProps = {
  events: {},
  classes: {
    buttonClass: "btn btn-start-order btn-primary btn-signup",
    contClass: "",
  },
  loadingText: "Loading...",
  loadingClass: "",
  shouldUseDefaultClasses: true,
};
export default Button;
