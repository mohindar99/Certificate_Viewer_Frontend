import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { AiFillEye } from "react-icons/ai";
import Tooltip from "@mui/material/Tooltip";
import { useHistory, Redirect, useLocation } from "react-router-dom";
import { Modal, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "react-bootstrap";
import Backdrop from "@mui/material/Backdrop";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { userCerificate } from "../../Redux/Actions/certificate.action";
import { userDetails } from "../../Redux/Actions/user.action";

import { getDate } from "../../Utililties/utilities";
import { getCertDetails } from "../../Utililties/service";

const UserDashBoard = (props) => {
  const history = useHistory();
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const cert = useSelector((state) => state.cert);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showLoader, setShowLoader] = useState(false);

  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(5);
  const [leftVis, setLeftVis] = useState(true);
  const [rightVis, setRightVis] = useState(true);
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState("");
  const [currentPosts, setCurrentPosts] = useState([]);
  const [deleteData, setDeleteData] = useState({});
  const [total, setTotal] = useState();
  let data = cert.certificates;
  const [list, setList] = useState([]);
  const [displayList, setDisplayList] = useState([]);
  const lastPage = Math.ceil(list.length / dataPerPage);

  const token = location.search.split("token=")[1];
  var refresh = window.localStorage.getItem("refresh");
  localStorage.setItem("token", token);

  if (!refresh) {
    window.location.reload();
    window.localStorage.setItem("refresh", "1");
  }
  useEffect(() => {
    if (token) {
      dispatch(userDetails(token));
    }
  }, [token]);
  useEffect(() => {
    let data = {
      limit: 5000,
      pageNo: 1,
      searchKey: "",
    };
    dispatch(userCerificate(data));
  }, [token]);

  useEffect(() => {
    if (data) {
      setCurrentPosts(cert.certificates);
    }
  }, [data]);

  const getCertificate = async (id) => {
    const res = await getCertDetails(id);
    let dataOne = null;
    if (res.status === 200) {
      dataOne = res.data.data;
    }
    return dataOne;
  };

  useEffect(() => {
    async function fetchData() {
      if (currentPosts) {
        setList([]);
        let arr = [];
        await Promise.all(
          currentPosts.map(async (post) => {
            const id = post.certificateId;
            const dataOne = await getCertificate(id);
            if (dataOne) {
              if (post.certAttrValue.length !== 0) {
                dataOne.certAttrValue = post.certAttrValue;
              }
              arr.push(dataOne);
            }
          })
        );
        setList(arr);
      }
    }
    fetchData();
  }, [currentPosts]);

  useEffect(() => {
    if (search) {
      setCurrentPage(1);
      setDisplayList(
        list.filter((x) => {
          return x?.certName.toLowerCase().includes(search.toLowerCase());
        })
      );
    } else {
      setDisplayList(list);
    }
  }, [search, list]);

  useEffect(() => {
    if (user.loading) {
      setShowLoader(true);
    } else {
      setShowLoader(false);
    }
  }, [user.loading]);
  useEffect(() => {
    if (currentPage === 1) {
      if (currentPage === lastPage) {
        setLeftVis(false);
        setRightVis(false);
      } else {
        setLeftVis(false);
        setRightVis(true);
      }
    }
    if (currentPage > 1) {
      if (currentPage >= lastPage) {
        setRightVis(false);
        setLeftVis(true);
      }
    }
    const indexOfLastPost = currentPage * dataPerPage;
    const indexOfFirstPost = indexOfLastPost - dataPerPage;
    const ls = list.slice(indexOfFirstPost, indexOfLastPost);
    setDisplayList(ls);
  }, [currentPage, lastPage, dataPerPage, list]);

  useEffect(() => {
    if (list) {
      setTotal(list.length);
    }
  }, [list, lastPage]);

  //Add function

  const handleSearch = () => {
    setSearch("");
  };
  const handleBackward = () => {
    setRightVis(true);
    setCurrentPage((prevState) => prevState - 1);
  };
  const handleForward = () => {
    setLeftVis(true);
    setCurrentPage((prevState) => prevState + 1);
  };

  const handleView = (certData) => {
    if (user.user) {
      history.push("/userCertificate", {
        certData,
        currentPosts,
        token,
      });
    }
  };

  const deleteuserItem = (id) => {
    let data = {
      id: `${id}`,
    };
  };

  return (
    <div>
      <ToastContainer />
      <div className="Org">
        <h4 style={{ textAlign: "center" }}>
          Here are the Certificates Assigned to You !!
        </h4>
        <br />
        <div className="upper-panel">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>
          <Button
            className="search-icon"
            style={{ marginLeft: "10px" }}
            onClick={() => handleSearch()}
          >
            Clear Search
          </Button>

          <div className="button-bar">
            <div className="limit-div">
              <label>Limit of data to be display</label>
              <input
                type="number"
                value={dataPerPage}
                onChange={(e) => setDataPerPage(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="lower-panel">
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={showLoader}
            onClick={handleClose}
          >
            <Spinner
              animation="grow"
              variant="info"
              style={{ height: "60px", width: "60px" }}
            />
          </Backdrop>
          <div className="responsive-table">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Certificate Name</th>
                  <th>Assigning Date</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {displayList?.length !== 0 ? (
                  displayList?.map((data, index) => (
                    <tr key={index}>
                      <td>{data?.certName}</td>
                      <td>{getDate(data?.createdAt)}</td>
                      <td>
                        <Tooltip title="View" placement="right-start">
                          <div
                            style={{
                              height: "fit-content",
                              width: "fit-content",
                            }}
                          >
                            <AiFillEye
                              className="icon-action"
                              onClick={() => handleView(data)}
                            />
                          </div>
                        </Tooltip>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr style={{ width: "100%", textAlign: "center" }}>
                    <td colSpan={3}>No data so currently nothing to display</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
        {displayList?.length !== 0 ? (
          <div className="btn-pag">
            <AiOutlineLeft
              className="btn-icon"
              visibility={leftVis ? "show" : "hidden"}
              onClick={() => handleBackward()}
            />
            Page {currentPage} - {lastPage}
            <AiOutlineRight
              className="btn-icon"
              visibility={rightVis ? "show" : "hidden"}
              onClick={() => handleForward()}
            />
          </div>
        ) : null}
      </div>
      {/* Modal for Add */}

      {/* Modal for delete */}
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete {deleteData.name}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDelete}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => deleteuserItem(deleteData._id)}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserDashBoard;
