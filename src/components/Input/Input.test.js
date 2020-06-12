import React, { createContext } from "react";
import renderer, { update, create, act } from "react-test-renderer";
import PropTypes from "prop-types"; // eslint-disable-line import/no-extraneous-dependencies
import { mount } from "enzyme";
import Input from "./index";
import Form from "../Form";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

/* eslint-disable react/jsx-filename-extension */
const defaultContext = {
  addField: jest.fn(),
  setFieldValue: jest.fn(),
  validateForm: jest.fn(),
  formData: {
    defaultClasses: {
      contClass: "default-contClass",
      fieldClass: "default-fieldClass",
      errorClass: "default-errorClass",
      labelClass: "default-labelClass",
    },
    fields: {
      email: {
        value: "",
      },
    },
  },
};
const contextTypes = {
  addField: PropTypes.func,
  setFieldValue: PropTypes.func,
  formData: PropTypes.object,
  validateForm: PropTypes.func,
};
const defaultInputArgs = {
  id: "email",
  type: "text",
  value: "123",
  onFieldChange: null,
  validate: "required",
  placeholder: "enter value",
  displayName: "Email",
  shouldUseDefaultClasses: true,
  classes: {
    contClass: "cont-class",
    fieldClass: "field-class",
    errorClass: "error-class",
    labelClass: "label-class",
  },
};

// Snapshot matching for Input Coponent
describe(">>> Input Container -- Snapshot Test", () => {
  it("Matches the snapshot with default props", () => {
    let tree;

    act(() => {
      tree = create(
        <Form>
          <Input id='email' />
        </Form>
      );
    });
    act(() => {
      tree.update(
        <Form>
          <Input id='email' />
        </Form>
      );
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
  it("Matches the snapshot with predefined value", () => {
    let tree;
    act(() => {
      tree = create(
        <Form>
          <Input id='email' />
        </Form>
      );
    });
    act(() => {
      tree.update(
        <Form>
          <Input id='email' value='test' />
        </Form>
      );
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("Matches the snapshot with custom props", () => {
    const customProps = { ...defaultInputArgs };

    customProps.placeholder = "custom placeholder";
    customProps.displayName = "custom display name";
    let tree;
    act(() => {
      tree = create(
        <Form defaultClasses={customProps.defaultClasses}>
          <Input {...customProps} />
        </Form>
      );
    });
    act(() => {
      tree.update(
        <Form defaultClasses={customProps.defaultClasses}>
          <Input {...customProps} />
        </Form>
      );
    });
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
// *************************************************************

/* eslint-enable */

// Check DOM Behaviour

describe(">>> Input Container -- Shallow Rendering", () => {
  let mountedScreen;
  const inputScreen = (customProps = {}, customContext = {}) => {
    const initialState = {
      id: "email",
      value: "",
    };

    if (!mountedScreen) {
      const updatedState = {
        ...initialState,
        ...customProps,
      };

      mountedScreen = mount(
        <Form>
          <Input {...updatedState} />
        </Form>
      );
    }

    return mountedScreen;
  };

  beforeEach(() => {
    mountedScreen = undefined;
  });

  it("Triggers input change function when input changed", () => {
    const props = {
      events: {
        onChange: jest.fn(),
      },
    };
    const tree = inputScreen(props);

    const input = tree.find("input").at(0);

    input.simulate("change", {
      target: {
        value: "test",
      },
    });

    expect(props.events.onChange).toHaveBeenCalled();
  });
});
//
