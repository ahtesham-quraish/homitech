import React, { createContext, Component } from "react";
import validations from "../../utils/validations";
import { isEmpty } from "lodash";
import { ERROR, SUCCESS } from "../../constants";

export const FormCtx = createContext({
  fields: {},
  errors: {},
  validateClasses: {},
  isFetching: false,
});

export default class Form extends Component {
  state = {
    fields: {},
    errors: {},
    validateClasses: {},
    isFetching: false,
  };
  render() {
    const { fields, errors, validateClasses, isFetching } = this.state;
    const formCtx = {
      fields,
      errors,
      validateClasses,
      isFetching,
      addField: (data) => {
        this.addField(data);
      },
      setFields: this.setFields,
      validateField: this.validateField,
      clearValidationField: this.clearValidationField,
      validateForm: this.validateForm,
      setFormData: this.setFormData,
    };
    const { formClass } = this.props.classes;
    return (
      <form action='' className={formClass} autoComplete='off'>
        <FormCtx.Provider value={formCtx}>
          {this.props.children}
        </FormCtx.Provider>
      </form>
    );
  }
  componentDidUpdate(preProps) {
    const { apiResponse } = this.props;
    if (preProps.apiResponse !== apiResponse && apiResponse === 200) {
      this.setState(
        {
          errors: {},
          validateClasses: {},
          isFetching: false,
        },
        this.clearFields
      );
    }
  }
  clearFields = () => {
    const { fields } = this.state;
    for (const unit in fields) {
      const field = fields[unit];
      if (field) {
        if (field.type === "file") {
          continue;
        }
        this.addField({
          field: {
            ...field,
            value: "",
          },
        });
      }
    }
  };

  setFields = (event, { id }) => {
    if (event && event.persist) {
      event.persist();
    }
    const { fields } = this.state;
    const field = fields[id];

    this.addField({
      field: {
        ...field,
        value: event && event.currentTarget ? event.currentTarget.value : event,
      },
    });
  };

  addField = ({ field }) => {
    const { id } = field;

    field = {
      value: "",
      ...field,
    };

    if (id) {
      this.setState((prevState) => {
        const defulatClasses =
          prevState.fields &&
          prevState.fields[id] &&
          prevState.fields[id].classes
            ? prevState.fields[id].classes
            : {};
        const classes = { ...defulatClasses, ...field.custom };
        if (!isEmpty(defulatClasses)) {
          field.classes = classes;
        }
        return {
          ...prevState,
          fields: {
            ...prevState.fields,
            [id]: field,
          },
        };
      });

      return;
    }

    throw new Error(`please add 'id' field to the input: ${field}`);
  };
  setFormData = (data) => {
    this.setState((prevState) => ({
      ...prevState,
      ...data,
    }));
  };
  clearValidationField = (id) => {
    const {
      value: fieldValue,
      validate,
      displayName,
      customRules = {},
    } = this.state.fields[id];
    let clearError = true;
    const rules = validate ? validate.split("|") : "";
    if (rules.length) {
      for (const rule in rules) {
        const ruleName = rules[rule];
        const ruleValue = this.state.fields[id][ruleName];
        const validation = validations[ruleName] || customRules[ruleName];
        const isRuleSatisfied =
          ruleName !== "required" && !fieldValue
            ? true
            : validation.rule(ruleValue).test(fieldValue.toString());
        if (!isRuleSatisfied) {
          clearError = false;
        }
      }
      this.setState((prevState) => ({
        ...prevState,
        errors: {
          ...prevState.errors,
          [id]: clearError ? "" : prevState.errors[id],
        },
        validateClasses: {
          ...prevState.validateClasses,
          [id]: clearError ? SUCCESS : prevState.validateClasses[id],
        },
      }));
    }
  };
  validateForm = (fieldName) => {
    const { shouldValidateForm, fields } = this.state;
    const field = fields[fieldName];
    if (field) {
      if (field.shouldValidateField) {
        this.validateField(field);
      }

      return;
    }

    for (const unit in fields) {
      const fieldData = fields[unit];

      if (fieldData && fieldData.validation) {
        this.validateField(unit);
      }
    }

    return;
  };
  validateField = (id) => {
    let error = "";
    const {
      value: fieldValue,
      validate,
      displayName,
      customRules = {},
    } = this.state.fields[id];
    const rules = validate ? validate.split("|") : "";

    if (rules.length) {
      for (const rule in rules) {
        const ruleName = rules[rule];
        const ruleValue = this.state.fields[id][ruleName];
        const validation = validations[ruleName] || customRules[ruleName];
        const isRuleSatisfied =
          ruleName !== "required" && !fieldValue
            ? true
            : validation.rule(ruleValue).test(fieldValue.toString());
        if (!isRuleSatisfied) {
          error = validation.formatter.apply(null, [displayName || id]);
        }
        if (error !== "") {
          break;
        }
      }
      this.setState((prevState) => ({
        ...prevState,
        errors: {
          ...prevState.errors,
          [id]: error,
        },
        validateClasses: {
          ...prevState.validateClasses,
          [id]: error !== "" ? ERROR : SUCCESS,
        },
      }));
    }
  };
}
Form.defaultProps = {
  events: {},
  classes: {
    formClass: "form",
  },
};
