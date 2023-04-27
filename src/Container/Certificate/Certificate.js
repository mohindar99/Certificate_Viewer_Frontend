import React, { useState, useEffect } from "react";
import { Table, Button, Spinner, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { AiFillEye } from "react-icons/ai";
import "../../Assets/Styles/global.scss"
import { HiBan, HiUserGroup } from "react-icons/hi";
import { GoVerified } from "react-icons/go";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { allCert, deleteCert, ResetCert } from "../../Redux/Actions/certificate.action";
import { Backdrop } from "@mui/material";
import "../../Assets/Styles/Certificate.scss";
import Loader from "../../Component/Loader";
import Toast from "../../Component/Toast";
import { getDate } from "../../Utililties/utilities";
import Tooltip from '@mui/material/Tooltip';

const Certificate = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const cert = useSelector((state) => state.cert);
  console.log(cert);
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState();
  const [showLoader, setShowLoader] = useState(false);
  const [leftVis, setLeftVis] = useState(true);
  const [rightVis, setRightVis] = useState(true);
  const [dataPerPage, setDataPerPage] = useState(5);
  const [currentList, setCurrentList] = useState([]);
  const [lastPage, setLastPage] = useState(0);
  const [data, setData] = useState({});
  const [show, setShow] = useState(false);
  const newData = cert.certificates;
  console.log(newData);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    let data = {
      pageNo: page,
      limit: dataPerPage,
      searchKey: search,
    };
    dispatch(allCert(data));
  }, [page, dataPerPage, search]);
  useEffect(() => {
    if (search) {
      setPage(1)
    }
  },[search])
  useEffect(() => {
    if (cert.message) {
      setTimeout(() => {
      dispatch(ResetCert())
      },1000)
    }
    if (cert.error) {
      setTimeout(() => {
        dispatch(ResetCert())
        },1000)
    }
    
  },[cert])
  useEffect(() => {
    if (cert.paginationData) {
      setTotal(cert.paginationData.total);
    }
  }, [cert.paginationData]);
  useEffect(() => {
    if (cert.loading) {
      setShowLoader(true);
    } else {
      setShowLoader(false);
    }
  }, [cert.loading]);
  useEffect(() => {
    setCurrentList(newData);
  }, [newData]);
  useEffect(() => {
    setLastPage(Math.ceil(total / dataPerPage));
  }, [total, dataPerPage]);
  useEffect(() => {
    if (page === 1) {
      if (page === lastPage) {
        setLeftVis(false);
        setRightVis(false);
      } else {
        setLeftVis(false);
        setRightVis(true);
      }
    }
    if (page > 1) {
      if (page >= lastPage) {
        setRightVis(false);
        setLeftVis(true);
      }
    }
  }, [page, lastPage]);

  const handleBackward = () => {
    setRightVis(true);
    setPage((prevState) => prevState - 1);
  };
  const handleForward = () => {
    setLeftVis(true);
    setPage((prevState) => prevState + 1);
  };
  const handleDelete = (value) => {
    setData(value);
    setShow(true);
  };
  const handleDeleteItem = (id) => {
    dispatch(deleteCert(id));
    handleClose();
  };
  return (
    <div>
      <Loader showLoader={showLoader} />
      <Toast success={cert.message} error={cert.error} />
      <div className="Cert">
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
            onClick={() => setSearch("")}
          >
            Clear Search
          </Button>
          <div className="button-bar">
            <Button className="btn" onClick={() => history.push("/addCert")}>
              Add Certificate
            </Button>
          </div>
        </div>
        <div className="lower-panel">
          <div className="limit-div">
            <label>Limit of data to be display</label>
            <input
              type="number"
              value={dataPerPage}
              min="1"
              onChange={(e) => setDataPerPage(e.target.value)}
            />
          </div>

          <div className="responsive-table">
         <Table striped bordered hover>
            <thead>
              <tr>
                <th>Certificates</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {currentList?.length !== 0 ? (
                currentList?.map((certificate, index) => (
                  <tr key={index}>
                    <th>{certificate.certName}</th>
                    <th>{getDate(certificate.createdAt)}</th>
                    <th>
                      <div className="icons">
                      <Tooltip title="View" placement="top">
                      <div className="icon-div">
                          
                          <AiFillEye
                            className="icon-action"
                            onClick={() =>
                              history.push("/prevCert", { certificate })
                            }
                          />
                         
                        </div>
                        </Tooltip>
                        <Tooltip title="Delete" placement="top">
                        <div className="icon-div">
                          <HiBan
                            className="icon-action"
                            onClick={() => handleDelete(certificate)}
                          />
                         
                        </div>
                      </Tooltip>
                      <Tooltip title="Edit" placement="top">
                      <div className="icon-div">
                          <BiEdit
                            className="icon-action"
                            onClick={() =>
                              history.push("/editCert", { certificate })
                            }
                          />
                         
                        </div>
                      </Tooltip>
                      <Tooltip title="Manage Recipient" placement="top">
                      <div className="icon-div">
                          <HiUserGroup
                            className="icon-action"
                            onClick={() =>
                              history.push("/manageReci", { certificate })
                            }
                          />
                         
                        </div>
                      </Tooltip>
                      <Tooltip title="Approvals" placement="top">
                      <div className="icon-div">
                          <GoVerified
                            className="icon-action"
                            onClick={() =>
                              history.push("/viewApproval", { certificate })
                            }
                          />
                         
                        </div>
                      </Tooltip>
                        
                        
                      </div>
                    </th>
                  </tr>
                ))
              ) : (
               <tr style={{width: '100%', textAlign: 'center'}}><td colSpan={3}>No data so currently nothing to display</td></tr>
              )}
            </tbody>
          </Table>
         </div>
        </div>
        {currentList?.length !== 0 ? (<div className="btn-pag">
          <AiOutlineLeft
            className="btn-icon"
            visibility={leftVis ? "show" : "hidden"}
            onClick={() => handleBackward()}
          />
          Page {page} - {lastPage}
          <AiOutlineRight
            className="btn-icon"
            visibility={rightVis ? "show" : "hidden"}
            onClick={() => handleForward()}
          />
        </div>) : null}
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure, you want to delete {data.certName}?
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
          <Button variant="danger" onClick={() => handleDeleteItem(data._id)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Certificate;
