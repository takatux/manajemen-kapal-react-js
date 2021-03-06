import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { Reducers } from "../../../../redux/types";
import { getHistory } from "../../../../redux/actions";
import { Col, Container, Row } from "../../../../components";
import { maskedMoney } from "../../../../utils";

const Component = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const rabReparasiState = useSelector((state: Reducers) => state.rabReparasi);

  useEffect(() => {
    dispatch(getHistory(id!));
  }, [dispatch, id]);

  return (
    <Container isLoading={rabReparasiState.isLoading}>
      <Row style={{ marginBottom: 40, marginTop: 10 }}>
        <Col size={11}>
          <h1>History</h1>
        </Col>
        <Col size={1}>
          <button
            type="button"
            className="btn btn-outline-primary my-2 my-sm-0"
            onClick={() => history.goBack()}
            style={{ textDecoration: "underline" }}
          >
            Back
          </button>
        </Col>
      </Row>

      <Row>
        <Col>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th scope="col">No</th>
                <th scope="col">Total</th>
                <th scope="col">Update</th>
              </tr>
            </thead>
            <tbody>
              {rabReparasiState.listHistory.map((item, index) => (
                <tr
                  key={index}
                  onClick={() =>
                    history.push(
                      `/dashboard/rab-reparasi-kapal/history/detail/${id!}?id_history=${
                        item.id
                      }`
                    )
                  }
                >
                  <th scope="row">{`${index + 1}.`}</th>
                  <td>{maskedMoney(item.total)}</td>
                  <td>{moment(item.updatedAt).fromNow()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>
    </Container>
  );
};

export default Component;
