import React, {useState, useEffect} from "react";
import axios from "axios";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

const UserForm = ({ values, touched, errors, status }) => {
    const [users, setUsers] = useState([])
    useEffect(() => {
      status && setUsers(user => [...user, status])
    },[status])
    return (
      <div className="user-form">
          <div className="field-container">
        <Form>
          <Field type="text" name="name" placeholder="Name" />
          {touched.name && errors.name && (
            <p className="error">{errors.name}</p>
          )}
          <Field type="text" name="password" placeholder="password" />
          {touched.password && errors.password && (
            <p className="error">{errors.password}</p>
          )}
          <Field type="text" name="email" placeholder="email" />
          {touched.email && errors.email && (
            <p className="error">{errors.email}</p>
          )}
          <div className = "terms">
          <label className="checkbox-container">
            {" "}
            Terms of Service
            <Field
              type="checkbox"
              name="terms"
              checked={values.terms}
            />
                 {touched.terms && errors.terms && (
            <p className="error">{errors.terms}</p>
          )}
            <span className="checkmark" />
          </label>
          </div>
          <button type="submit">Submit!</button>
        </Form>
        </div>
        {users.map(users => (
          <ul key={users.id}>
            <li>Name: {users.name}</li>
            <li>Email: {users.email}</li>
            <li>Password: {users.password}</li>
          </ul>
        ))}
      </div>
    );
  };
  const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password, terms }) {
      return {
        name: name || "",
        password: password || "",
        email: email || "",
        terms: terms || false,
      };
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required(),
      password: Yup.string().required(),
      email: Yup.string().required(),
      terms: Yup.string().required(),
    }),
    handleSubmit(values, {setStatus}) { 
      axios.post('https://reqres.in/api/users/', values) 
            .then(res => { setStatus(res.data); console.log(values) }) 
            .catch(err => console.log(err.response));
      }
  })(UserForm);
  export default FormikUserForm;