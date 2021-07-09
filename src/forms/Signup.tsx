import React, { useState } from "react";
import axios from "axios";

import { useHistory } from "react-router";
import Error from "../components/Error";
import Form from "../components/Form";
import { Values } from "../func/valueType";
import * as regex from "../regex";
import Field from "../components/Field";
import useUser from "../hooks/user";
import Title from "../components/Title";
import { __API_URL__ } from "../const";

const arrToStr = (a: string[] | string) => {
  if (Array.isArray(a)) {
    return a.join("&nbsp;");
  }
  return a;
};

interface FormInf extends Values {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const Signup: React.FC<{}> = () => {
  const history = useHistory();
  const user = useUser();
  const [serverError, setServerError] = useState<null | string>(null);
  // useEffect(() => {
  //   if (error) {
  //     if (axios.isAxiosError(error)) {
  //       let data = error.response.data
  //       if ('non_field_error' in data) {
  //         setServerError(arrToStr(error.response.data.non_field_error))
  //       }
  //     }
  //   }
  // }, [error])

  return (
    <Form
      formClass="form"
      submitClass="btn btn-secondary signup-btn"
      initialValues={{
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      disable={user.loading}
      validate={{
        username: { required: true },
        email: { required: true, regex: regex.EMAIL },
        password: { required: true, equal: "confirmPassword", minLength: 8 },
        confirmPassword: { required: true },
      }}
      onSubmit={(
        {
          username,
          email,
          password: password1,
          confirmPassword: password2,
        }: FormInf,
        e
      ) => {
        setServerError(null);
        axios
          .post(`${__API_URL__}/check-user/`, {
            username: username,
            email: email,
          })
          .then(async (res) => {
            await user.actions.signup({
              username,
              email,
              password1,
              password2,
            });
            history.push("/login");
          })
          .catch((err) => {
            if (axios.isAxiosError(err)) {
              let data = err.response.data;
              if ("email" in data) {
                setServerError(arrToStr(data.email));
              }
              if ("username" in data) {
                setServerError(arrToStr(data.username));
              }
            }
          });
      }}
    >
      <Title>Signup - AT8</Title>
      {serverError && <Error>{serverError}</Error>}
      <legend className="mb-4">Signup</legend>
      <Field name="username" type="text" placeholder />
      <Field name="email" type="email" placeholder />
      <Field name="password" type="password" placeholder>
        <small>
          <ul>
            <li>Password must contain alteast 8 characters.</li>
          </ul>
        </small>
      </Field>
      <Field name="confirmPassword" type="password" placeholder />
    </Form>
  );
};

export default Signup;
