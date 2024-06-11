import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
} from 'reactstrap';

import Success from './Success';

import axios from 'axios';

const initialForm = {
  email: '',
  password: '',
  terms: false,
};

const errorMessages = {
  email: 'Please enter a valid email address',
  password: 'Password must be at least 4 characters long',
};

const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export default function Login() {
  const [form, setForm] = useState(initialForm);
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({});

  const history = useHistory();

  const handleChange = (event) => {
    let { name, value, type, checked } = event.target;
    value = type === 'checkbox' ? checked : value;
    setForm({ ...form, [name]: value });

    if (name === 'email') {
      if (validateEmail(value)) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }

    if (name === 'password') {
      if (value.replaceAll(' ', '').length >= 4) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }
  };

  useEffect(() => {
    if (
      validateEmail(form.email) &&
      form.password.replaceAll(' ', '').length >= 4 &&
      form.terms
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [form]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isValid) {
      return;
    }

    axios
      .post('https://reqres.in/api/users', form ) 
      .then((response) => {
        console.log('Success:', response.data);
        setForm(initialForm);
        history.push('/success');
      })
      .catch((error) => {
        console.error('Error:', error);
        history.push('/error');
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          id="exampleEmail"
          name="email"
          placeholder="Enter your email"
          type="email"
          onChange={handleChange}
          value={form.email}
          invalid={errors.email}
        />
        {errors.email && <FormFeedback>{errorMessages.email}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          id="examplePassword"
          name="password"
          placeholder="Enter your password "
          type="password"
          onChange={handleChange}
          value={form.password}
          invalid={errors.password}
        />
        {errors.password && (
          <FormFeedback>{errorMessages.password}</FormFeedback>
        )}
      </FormGroup>
      <FormGroup check>
        <Input
          id="terms"
          name="terms"
          checked={form.terms}
          type="checkbox"
          onChange={handleChange}
        />
        <Label htmlFor="terms" check>
          I agree to terms of service and privacy policy
        </Label>
      </FormGroup>
      <FormGroup className="text-center p-4">
        <Button color="primary" disabled={!isValid}>
          Sign In
        </Button>
      </FormGroup>
    </Form>
  );
}
