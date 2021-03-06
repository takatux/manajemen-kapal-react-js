import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import { postLogin } from "../../redux/actions";
import { Reducers } from "../../redux/types";
import { documentTitle } from "../../utils";
import { Card, Col, Container, Row } from "../../components";

const Component = () => {
  documentTitle("Login");
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();

  const authState = useSelector((state: Reducers) => state.auth);

  const _handleLogin = useCallback(
    (form) => {
      dispatch(postLogin(form));
    },
    [dispatch]
  );

  const _renderError = (isShow: boolean, message: string) =>
    isShow && <div className="invalid-feedback">{message}</div>;

  return (
    <Container className="login" isLoading={authState.login.isLoading}>
      <Row justifyContent="center" style={{ paddingTop: 200 }}>
        <Col size={3}>
          <Card title="Login">
            <Row>
              <Col>
                <Row>
                  <Col>
                    {authState.login.error && (
                      <div className="alert alert-danger" role="alert">
                        {authState.login.error}
                      </div>
                    )}
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <form onSubmit={handleSubmit(_handleLogin)}>
                      <div className="form-group" style={{ marginBottom: 20 }}>
                        <input
                          className={`form-control${
                            errors.username ? " is-invalid" : ""
                          }`}
                          type="text"
                          name="username"
                          placeholder="username"
                          ref={register({ required: true })}
                        />
                        {_renderError(errors.username, "Username is required")}
                      </div>

                      <div className="form-group">
                        <input
                          className={`form-control${
                            errors.password ? " is-invalid" : ""
                          }`}
                          type="password"
                          name="password"
                          placeholder="password"
                          ref={register({ required: true, minLength: 8 })}
                        />
                        {_renderError(errors.password, "Password min 8")}
                      </div>

                      <button
                        type="submit"
                        onClick={handleSubmit(_handleLogin)}
                        className="btn btn-primary"
                        style={{ width: "100%", marginTop: 20 }}
                      >
                        Login
                      </button>
                    </form>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Component;
