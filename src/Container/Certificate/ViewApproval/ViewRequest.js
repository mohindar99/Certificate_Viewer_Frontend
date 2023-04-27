import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import { AiFillEye } from "react-icons/ai";
import "../../../Assets/Styles/approval.scss";
import { useDispatch, useSelector } from "react-redux";
import { changeStatus } from "../../../Redux/Actions/certificate.action";
import Toast from "../../../Component/Toast";
import Loader from "../../../Component/Loader";
import axios from "axios";
import { BaseUrl } from "../../../Utililties/Config";

const ViewRequest = (props) => {
  const cert = useSelector((state) => state.cert);
  const history = useHistory();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { data, certificate } = props.location.state;
  const [statusUpdate, setStatusUpdate] = useState("");
  const [statusUpdateError, setStatusUpdateError] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const token = localStorage.getItem("token");

  const handleUpdate = async (e) => {
    e.preventDefault();
    setStatusUpdateError("");
    setMessage("");
    if (statusUpdate) {
      setShowLoader(true);
      let updateData = {
        id: data._id,
        status: statusUpdate,
      };
      const res = await axios.post(
        `${BaseUrl}change-request/change-status`,
        {
          ...updateData,
        },
        {
          headers: {
            authentication: `${token}`,
          },
        }
      );

      if (res.data.statusCode === 200) {
        setShowLoader(false);
        setMessage(res.data.message);
      } else {
        setShowLoader(false);
        setError(res.data.error);
        setError(res.data.message);
      }
    } else {
      setStatusUpdateError("Please select status...");
    }
  };
  return (
    <div className="viewRequest">
      <Toast success={message} error={error} />
      <Loader showLoader={showLoader} />
      <h3>{certificate.certName} / View Approvals</h3>
      <br />
      <h4>Certificate Approvals</h4>
      <div className="View">
        <h4>Approval Change Details</h4>
        <div className="view_table__recipient">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Field Name</th>
              <th>Data</th>
              <th>Change Data</th>
              <th>Change Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <th>{data.attributeKey}</th>
              <th>{data.oldValue}</th>
              <th>{data.newValue}</th>
              <select
                className="selectUpdate"
                onChange={(e) => setStatusUpdate(e.target.value)}
              >
                <option value="Viewed">Viewed</option>
                <option value="Approved">Approved</option>
                <option value="Declined">Declined</option>
              </select>
            </tr>
          </tbody>
        </Table>
        </div>
       
        {statusUpdateError ? (
          <p style={{ color: "#c94040" }}>{statusUpdateError}</p>
        ) : null}
        <div className="buttonsStyle">
          
          <Button className="closeButton"  onClick={(e) => handleUpdate(e)}>
            Update Status
          </Button>
          <Button
            className="updateButton"
            onClick={() => history.push("/viewApproval", { certificate })}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewRequest;
