import React, { useEffect, useState } from "react";
import { BaseUrl } from "../Utililties/Config";
import axios from "axios";

// react-bootstrap components
import { Card, Container, Row, Col } from "react-bootstrap";
// import { useSelector, useDispatch } from "react-redux";
// import { getDashboard } from "../Redux/Actions/auth.action";

function Dashboard() {
  // const dispatch = useDispatch()
  const token = localStorage.getItem("token")
  // const auth = useSelector((state) => state.auth)
  const [dataDashboard, setDataDashboard] = useState({})

  useEffect(() => {
    async function fetch() {
      const res = await axios.get(`${BaseUrl}admin/dashboard`, {
        headers: {
          authentication: `${token}`,
        },
      });
      const { data } = res.data;
      setDataDashboard(data);
    }
    fetch();
  }, []);

  return (
    <>
      <Container fluid>
        <h3>Dashboard</h3>
        <Row>
          <Col lg="6" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <div className="numbers">
                  <p className="card-category">Number of Certificates</p>
                  <Card.Title as="h4">
                    {dataDashboard ? dataDashboard.totalCertificate : 0}
                  </Card.Title>
                </div>
                {/* <Row>
                <Col xs="5">
                    <div className="icon-big icon-warning">
                      <i className="nc-icon nc-credit-card text-warning"></i>
                    </div>
                  </Col>
                <Col xs="12">

                  </Col>
                </Row> */}
              </Card.Body>
            </Card>
          </Col>
          <Col lg="6" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <div className="numbers">
                  <p className="card-category">Number of Organization</p>
                  <Card.Title as="h4">
                    {" "}
                    {dataDashboard ? dataDashboard.totalOrg : 0}
                  </Card.Title>
                </div>
                {/* <Row>
                  <Col xs="5">
                    <div className="icon-big icon-warning">
                      <i className="nc-icon nc-vector text-success"></i>
                    </div>
                  </Col>
                  <Col xs="12">

                  </Col>
                </Row> */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="6" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <div className="numbers">
                  <p className="card-category">Number of Recipients</p>
                  <Card.Title as="h4">
                    {dataDashboard ? dataDashboard.usersCount : 0}
                  </Card.Title>
                </div>
                {/* <Row>
                  <Col xs="5">
                    <div className="icon-big icon-warning">
                      <i className="nc-icon text-danger">
                        <RiUserReceivedFill />
                      </i>
                    </div>
                  </Col>
                  <Col xs="12">
                  </Col>
                </Row> */}
              </Card.Body>
            </Card>
          </Col>
          <Col lg="6" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <div className="numbers">
                  <p className="card-category">Number of Issued Certificates</p>
                  <Card.Title as="h4">
                    {dataDashboard ? dataDashboard.issuedUsers : 0}
                  </Card.Title>
                </div>
                {/* <Row>
                  <Col xs="5">
                    <div className="icon-big icon-warning">
                      <i className="nc-icon text-primary">
                        <GoVerified />
                      </i>
                    </div>
                  </Col>
                  <Col xs="12">
                  </Col>
                </Row> */}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
