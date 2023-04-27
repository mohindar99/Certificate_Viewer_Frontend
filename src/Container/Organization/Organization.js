import React, { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import { AiFillEye } from "react-icons/ai";
import { HiBan } from "react-icons/hi";
import "../../Assets/Styles/organization.scss";
import { useHistory, Redirect } from "react-router-dom";
import { Modal, Form } from "react-bootstrap";
import { validate } from "../../Utililties/validator";
import validationRules from "../../Utililties/validation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "react-bootstrap";
import Backdrop from "@mui/material/Backdrop";
import {
  AiOutlineLeft,
  AiOutlineRight,
  AiFillEdit,
  AiFillDelete,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { AddOrg, allOrg, deleteOrg, ResetOrg } from "../../Redux/Actions/org.action";
import OrganizationView from "./OrganizationView/OrganizationView";
import OrganizationEdit from "./OrganizationEdit/OrganizationEdit";
import { authConstants } from "../../Redux/Actions/constants";
import Toast from "../../Component/Toast";
import Loader from "../../Component/Loader";
import Tooltip from '@mui/material/Tooltip';

const Organization = () => {
  const history = useHistory();
  const org = useSelector((state) => state.org)
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
  let data = org.orgs
  const lastPage = Math.ceil(total / dataPerPage);

  useEffect(() => {
    if (org.message) {
      setTimeout(() => {
      dispatch(ResetOrg())
      },1000)
    }
    if (org.error) {
      setTimeout(() => {
        dispatch(ResetOrg())
        },1000)
    }    
  }, [org])

  useEffect(() => {
    if (search) {
      setCurrentPage(1)
    }
  },[search])

  useEffect(() => {
    if (!org.loading) {
      let data = {
        limit: dataPerPage,
        pageNo: currentPage,
        searchKey: search,
      };
      dispatch(allOrg(data));
    
    }
  }, [currentPage, dataPerPage, search]);

  useEffect(() => {
    setCurrentPosts(data);
  }, [data]);

  useEffect(() => {
    if (org.loading) {
      setShowLoader(true);
    } else {
      setShowLoader(false);
    }
  }, [org.loading]);

  useEffect(() => {
    if (org.paginationData) {
      setTotal(org.paginationData.total);
    }
  }, [org.paginationData]);
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
  }, [currentPage, lastPage]);

  //Add function

  const handleSearch = () => {
    setSearch(search);
    let data = {
      pageNo: currentPage,
      limit: dataPerPage,
      searchKey: searchData,
    };
    dispatch(allOrg(data));
  };
  const handleBackward = () => {
    setRightVis(true);
    setCurrentPage((prevState) => prevState - 1);
  };
  const handleForward = () => {
    setLeftVis(true);
    setCurrentPage((prevState) => prevState + 1);
  };
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(total / dataPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleView = (org) => {
    history.push("/orgView", { org });
  };
  const handleDelete = (org) => {
    setDeleteData(org);
    setShowDelete(true);
  };
  const deleteOrgItem = (id) => {
    let data = {
      id: `${id}`,
    };
    dispatch(deleteOrg(data));
    handleCloseDelete();
  };
  const handleEdit = (org) => {
    history.push("/orgEdit", { org });
  };

  return (
    <div>
      <Toast success={org.message} error={org.error} />
      <Loader showLoader={showLoader} />
      <div className="Org">
        <h3>Manage Organization</h3>
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
            onClick={() => setSearch("")}
          >
            Clear Search
          </Button>

          <div className="button-bar">
            <Button className="btn" onClick={() => history.push("/orgAdd")}>
              Add Organization
            </Button>
          </div>
        </div>
        <div className="lower-panel">
          <div className="limit-div">
            <label>Limit of data to be display</label>
            <input
              type="number"
              min="1"
              value={dataPerPage}
              onChange={(e) => setDataPerPage(e.target.value)}
            />
          </div>
          <div className="responsive-table">
          <Table  striped bordered hover>
            <thead>
              <tr>
                <th>Organization</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {currentPosts?.length !==0 ? (
                currentPosts?.map((org, index) => (
                  <tr key={index}>
                    <td>{org.name}</td>
                    <td>{org.email}</td>
                    <td>{org.phoneNumber}</td>
                    <td style={{display:'flex'}}>
                    <Tooltip title="View" placement="top">
                        <div style={{height: 'fit-content', width: 'fit-content'}}>
                        <AiFillEye
                        className="icon-action"
                        onClick={() => handleView(org)}
                      />
                      </div>
                      </Tooltip>
                      <Tooltip title="Delete" placement="top">
                        <div style={{height: 'fit-content', width: 'fit-content'}}>
                        <HiBan
                        className="icon-action"
                        onClick={() => handleDelete(org)}
                      />
                      </div>
                      </Tooltip>
                      <Tooltip title="Edit" placement="top">
                        <div style={{height: 'fit-content', width: 'fit-content'}}>
                        <BiEdit
                        className="icon-action"
                        onClick={() => handleEdit(org)}
                      />
                      </div>
                    </Tooltip>
                     
                      
                      
                    </td>
                  </tr>
                ))
              ) : (
                <tr style={{width: '100%', textAlign: 'center'}}><td colSpan={3}>No data so currently nothing to display</td></tr>
              )}
            </tbody>
          </Table>
          </div>
         
        </div>
        {currentPosts?.length !== 0 ? (<div className="btn-pag">
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
        </div>) : null}
      </div>
      {/* Modal for Add */}

      {/* Modal for delete */}
      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure, you want to delete {deleteData.name}?
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleCloseDelete}>
            Close
          </Button> */}
          <Button
            variant="danger"
            onClick={() => deleteOrgItem(deleteData._id)}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Organization;
