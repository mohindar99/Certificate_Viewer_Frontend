import React, { useEffect, useState } from "react";
import "../../../Assets/Styles/organization.scss";
import { Tabs, Tab, Table, Button } from "react-bootstrap";
import { certificateList, userList } from "../../../Redux/Actions/org.action";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { Redirect, useHistory, useNavigate } from "react-router-dom";
import { getDate } from "../../../Utililties/utilities";

const OrganizationView = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const orgData = useSelector((state) => state.org);
  const [pageNoCert, setPageNoCert] = useState(1);
  const [limitCert, setLimitCert] = useState(5);
  const [pageNoUser, setPageNoUser] = useState(1);
  const [limitUser, setLimitUser] = useState(5);
  const [cert, setCert] = useState([]);
  const [user, setUser] = useState([]);
  const [userPageData, setUserPageData] = useState([]);
  const [certPageData, setCertPageData] = useState([]);
  const [leftVisCert, setLeftVisCert] = useState(true);
  const [rightVisCert, setRightVisCert] = useState(true);
  const [leftVisUser, setLeftVisUser] = useState(true);
  const [rightVisUser, setRightVisUser] = useState(true);
  
  const lastPageUser = Math.ceil(userPageData?.total / limitUser);
  const lastPageCert = Math.ceil(certPageData?.total / limitCert);
  let refresh = 0;
  
  if (refresh === null) {
    window.location.reload()
    refresh = 1
  }

  let org;
  if (props?.location?.state) {
    org = props?.location?.state?.org;
  }
  useEffect(() => {
    if (!orgData.loading && org) {
      let data = {
        id: org._id,
        pageNo: pageNoUser,
        limit: limitUser,
      };
      dispatch(userList(data));
    }
  }, [pageNoUser, limitUser, org]);
  useEffect(() => {
    if (!orgData.loading && org) {
      let data = {
        id: org._id,
        pageNo: pageNoCert,
        limit: limitCert,
      };
      dispatch(certificateList(data));
    }
  }, [pageNoCert, limitCert, org]);
  useEffect(() => {
    if (orgData) {
      setUser(orgData.users);
      setUserPageData(orgData.userPaginationData);
      setCert(orgData.certificates);
      setCertPageData(orgData.certPaginationData);
    }
  }, [orgData]);

  useEffect(() => {
    if (pageNoCert === 1) {
      if (pageNoCert === lastPageCert) {
        setLeftVisCert(false);
        setRightVisCert(false);
      } else {
        setLeftVisCert(false);
        setRightVisCert(true);
      }
    }
    if (pageNoCert > 1) {
      if (pageNoCert >= lastPageCert) {
        setRightVisCert(false);
        setLeftVisCert(true);
      }
    }
  }, [pageNoCert, lastPageCert]);
  useEffect(() => {
    if (pageNoUser === 1) {
      if (pageNoUser === lastPageUser) {
        setLeftVisUser(false);
        setRightVisUser(false);
      } else {
        setLeftVisUser(false);
        setRightVisUser(true);
      }
    }
    if (pageNoUser > 1) {
      if (pageNoUser >= lastPageUser) {
        setRightVisUser(false);
        setLeftVisUser(true);
      }
    }
  }, [pageNoUser, lastPageUser]);

  //Add function
  const handleBackwardCert = () => {
    setRightVisCert(true);
    setPageNoCert((prevState) => prevState - 1);
  };
  const handleForwardCert = () => {
    setLeftVisCert(true);
    setPageNoCert((prevState) => prevState + 1);
  };
  const handleBackwardUser = () => {
    setRightVisUser(true);
    setPageNoUser((prevState) => prevState - 1);
  };
  const handleForwardUser = () => {
    setLeftVisUser(true);
    setPageNoUser((prevState) => prevState + 1);
  };
  if (!props.location.state) return <Redirect to={`/`} />
  return (
    <div className="view">
      <h3>View Organization</h3>
      <div className="upper-panel">
        <div className="details">
          <div className="detail-control-left">
            <label>Name of Organization:</label>
            <h>{org.name}</h>
          </div>
          <div className="detail-control-right">
            <label>Email:</label>
            <h>{org.email}</h>
          </div>
        </div>
        <div className="details">
          <div className="detail-control-left">
            <label>Phone Number:</label>
            <h>{org.phoneNumber}</h>
          </div>
        </div>
      </div>
      <div className="lower-panel"></div>
      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="tabs-main"
      >
        <Tab className="tabs" eventKey="home" title="Certificates">
          <div className="limit-div">
            <label>Limit to display data</label>
            <input
              type="number"
              min="1"
              value={limitCert}
              onChange={(e) => setLimitCert(e.target.value)}
            />
          </div>
          <div className="responsive-table">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Certificates</th>
                  <th>Date</th>
                  <th>Participants Count</th>
                </tr>
              </thead>

              <tbody>
                {cert.length !==0
                  ? cert.map((data) => (
                      <tr>
                        <th>{data.certName}</th>
                        <th>{getDate(data.createdAt)}</th>
                        <th>{data.totalUsers}</th>
                      </tr>
                    ))
                  : (<tr style={{width: '100%', textAlign: 'center'}}><td colSpan={3}>No data so currently nothing to display</td></tr>)}
              </tbody>
            </Table>
          </div>
          {cert.length !== 0 ? (<div className="btn-pag">
            <AiOutlineLeft
              className="btn-icon"
              visibility={leftVisCert ? "show" : "hidden"}
              onClick={() => handleBackwardCert()}
            />
            Page {pageNoCert} - {lastPageCert}
            <AiOutlineRight
              className="btn-icon"
              visibility={rightVisCert ? "show" : "hidden"}
              onClick={() => handleForwardCert()}
            />
          </div>):null}
        </Tab>
        <Tab className="tabs" eventKey="profile" title="Recipient users">
          <div className="limit-div">
            <label>Limit to display data</label>
            <input
              type="number"
              value={limitUser}
              onChange={(e) => setLimitUser(e.target.value)}
            />
          </div>
          <div className="responsive-table">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Recipient Users</th>
                <th>Date</th>
                <th>Assigned certificates</th>
              </tr>
            </thead>

            <tbody>
              {user.length !==0
                ? user.map((data) => (
                    <tr>
                      <th>{data.name}</th>
                      <th>{getDate(data.createdAt)}</th>
                      <th>{data.certificateData.certName}</th>
                    </tr>
                  ))
                : (<tr style={{width: '100%', textAlign: 'center'}}><td colSpan={3}>No data so currently nothing to display</td></tr>)}
            </tbody>
          </Table>
          </div>
          {user.length !== 0 ? (<div className="btn-pag">
            <AiOutlineLeft
              className="btn-icon"
              visibility={leftVisUser ? "show" : "hidden"}
              onClick={() => handleBackwardUser()}
            />
            Page {pageNoUser} - {lastPageUser}
            <AiOutlineRight
              className="btn-icon"
              visibility={rightVisUser ? "show" : "hidden"}
              onClick={() => handleForwardUser()}
            />
          </div>) : null}
        </Tab>
      </Tabs>
      <Button
        type="submit"
        variant="primary"
        onClick={() => history.push("/organization")}
        style={{ float: "right" }}
      >
        Back
      </Button>
    </div>
  );
};

export default OrganizationView;
