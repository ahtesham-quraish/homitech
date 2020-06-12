import React from "react";
import Form, { Input, CountryList, Button } from "../../../components";

export default class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      apiResponse: null,
      isSubmitted: false,
    };
  }
  requestHandler = () => {
    setTimeout(
      () =>
        this.setState({ apiResponse: 200, isSubmitted: true }, () => {
          setTimeout(() => this.setState({ apiResponse: null }), 0);
          setTimeout(() => this.setState({ isSubmitted: false }), 5000);
        }),
      3000
    );
  };
  render() {
    const { apiResponse, isSubmitted } = this.state;
    return (
      <div className='registrationForm'>
        <div className='formWrapper reg'>
          <h2>Registration</h2>
          {isSubmitted && (
            <div className='alert'>
              <span
                className='closebtn'
                onclick="this.parentElement.style.display='none';"
              >
                &times;
              </span>
              <strong>Success!</strong> Form has been submitted
            </div>
          )}
          <Form className='form' apiResponse={apiResponse}>
            <Input
              id='fName'
              label='First Name'
              placeholder='First Name'
              validate='minLength|required'
              isOnBlur={true}
              validation={true}
              minLength='3'
            />
            <Input
              id='lName'
              label='Last Name'
              placeholder='Last Name'
              validate='minLength|required'
              isOnBlur={true}
              validation={true}
              minLength='3'
            />
            <Input
              id='email'
              label='Email'
              placeholder='Email'
              validate='email|required'
              isOnBlur={true}
              validation={true}
            />
            <Input
              id='password'
              label='Password'
              placeholder='Password'
              validate='password|required'
              isOnBlur={true}
              validation={true}
            />
            <Input
              id='phone'
              label='Phone#'
              placeholder='Phone#'
              validate='numeric|required'
              custom={{ customClasses: "DOB" }}
              isOnBlur={true}
              validation={true}
            />
            <Input id='dob' label='DOB' type='date' />
            <CountryList id='country' label='Country' />
            <Input
              id='avatar'
              label='Profile Image'
              componentKey='file'
              custom={{ customContainerClasses: "custom-file" }}
              type='file'
            />
            <Button
              id='button'
              displayName='Sign Up'
              defaultClasses='submit'
              sendRequest={this.requestHandler}
            />
          </Form>
        </div>
      </div>
    );
  }
}
