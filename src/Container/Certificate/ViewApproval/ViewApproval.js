import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Table, Modal } from "react-bootstrap";
import { BaseUrl } from "../../../Utililties/Config";
import "../../../Assets/Styles/approval.scss";
import "../../../Assets/Styles/global.scss";
import { useDispatch, useSelector } from "react-redux";
import { requestList } from "../../../Redux/Actions/certificate.action";
import { AiOutlineLeft, AiOutlineRight, AiFillEye } from "react-icons/ai";
import Loader from "../../../Component/Loader";
import Toast from "../../../Component/Toast";

import axios from "axios";
import { getDate } from "../../../Utililties/utilities";
import Tooltip from '@mui/material/Tooltip';
import { data } from "jquery";

const ViewApproval = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const cert = useSelector((state) => state.cert);
  const { certificate } = props.location.state;
  const [show, setShow] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [limit, setLimit] = useState(5);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [total, setTotal] = useState(0);
  const lastPage = Math.ceil(total / limit);
  const [leftVis, setLeftVis] = useState(true);
  const [rightVis, setRightVis] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const token = localStorage.getItem("token");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const handleView = () => {
    setShow(true);
  };
  useEffect(() => {
    if (!cert.loading) {
      setShowLoader(false);
    } else {
      setShowLoader(true);
    }
  }, [cert.loading]);
  useEffect(() => {
    if (pageNo === 1) {
      if (pageNo === lastPage) {
        setLeftVis(false);
        setRightVis(false);
      } else {
        setLeftVis(false);
        setRightVis(true);
      }
    }
    if (pageNo > 1) {
      if (pageNo >= lastPage) {
        setRightVis(false);
        setLeftVis(true);
      }
    }
  }, [pageNo, lastPage]);
  useEffect(() => {

    let data = {
      certId: certificate._id,
      pageNo,
      limit,
    };
    dispatch(requestList(data));
  }, [pageNo, limit]);
  useEffect(() => {
    if (cert.paginationData) {
      setTotal(cert.paginationData.total);
    }
  }, [cert.paginationData]);

  const handleBackward = () => {
    setRightVis(true);
    setPageNo((prevState) => prevState - 1);
  };
  const handleForward = () => {
    setLeftVis(true);
    setPageNo((prevState) => prevState + 1);
  };

  const handleExport = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    let data = {
      certId: certificate._id,
    };
    const res = await axios.post(
      `${BaseUrl}change-request/export-csv`,
      {
        ...data,
      },
      {
        headers: {
          authentication: `${token}`,
        },
      }
    );
    if (res.data.statusCode === 200) {
      const link = document.createElement("a");
      link.href = res.data.data;
      link.setAttribute("download", `FileName.pdf`);

      // Append to html link element page
      document.body.appendChild(link);

      // Start download
      link.click();

      // Clean up and remove the link
      link.parentNode.removeChild(link);
      setMessage(res.data.message);
    } else {
      setError(res.data.error);
    }
  };
  return (
    <div className="viewApproval">
      <Loader showLoader={showLoader} />
      <Toast success={cert.message} error={cert.error} />
      <Toast success={message} error={error} />
      <h3>{certificate.certName} / View Approvals</h3>
      <br />
      <h4>Certificate Approvals</h4>
      <div className="limit-div">
        <label>Limit of data to be display</label>
        <input
          type="number"
          min="1"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
        />
      </div>
      <div className="view_table__recipient">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email Address</th>
              <th>Action</th>
              <th>Approved On</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {cert.requestsList.length !== 0 
              ? cert.requestsList.map((data, index) => (
                  <tr key={index}>
                    <th>{data.name}</th>
                    <th>{data.email}</th>
                  <th>
                  <Tooltip title="Approvals" placement="top">
                      <div >
                      <AiFillEye
                        className="icon-action"
                        onClick={() =>
                          history.push("/viewRequest", { data, certificate })
                        }
                      />
                         
                        </div>
                      </Tooltip>
                     
                    </th>
                    <th>
                      {data.approvedAt
                        ? getDate(data.approvedAt)
                        : "Not Approved Yet"}
                    </th>
                    <th>{data.status}</th>
                  </tr>
                ))
              :(
                <tr style={{width: '100%', textAlign: 'center'}}><td colSpan={5}>No data so currently nothing to display</td></tr>
               )}
          </tbody>
        </Table>
      </div>
      {cert.requestsList.length !== 0 ?(<div className="btn-pag">
        <AiOutlineLeft
          className="btn-icon"
          visibility={leftVis ? "show" : "hidden"}
          onClick={() => handleBackward()}
        />
        Page {pageNo} - {lastPage}
        <AiOutlineRight
          className="btn-icon"
          visibility={rightVis ? "show" : "hidden"}
          onClick={() => handleForward()}
        />
      </div>): null}
      <h4>Approvals Details</h4>
      <p>
        You can export all the approval changes by clicking the below button.
        The CSV file will be downloaded with all the changes and original data.
      </p>

      <Button className="Export-Approval-Changes" disabled={cert.requestsList.length===0? true: false} style={{opacity: cert.requestsList.length===0? 0.2: 1 , color: '#002c72'}} onClick={(e) => handleExport(e)}>Export Approval Changes</Button>

      <Button
       className="backbtn"
        type="submit"
        variant="primary"
        onClick={() => history.push("/certificate")}
        style={{ float: "right" }}
      >
        Back
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Approval Change Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Form Field</th>
                <th>Data</th>
                <th>Change Data</th>
              </tr>
            </thead>

            <tbody></tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ViewApproval;
