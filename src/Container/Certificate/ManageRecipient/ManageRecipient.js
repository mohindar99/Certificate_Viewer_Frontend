import React, { useState, useRef, useEffect } from "react";
import { Table, Button, Modal, Spinner } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { IoIosSend } from "react-icons/io";
import "../../../Assets/Styles/manageReci.scss";
import "../../../Assets/Styles/global.scss";
import XLSX from "xlsx";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getReci,
  ResetUser,
  uploadUser,
  resendEmail,
} from "../../../Redux/Actions/user.action";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Backdrop from "@mui/material/Backdrop";
import Toast from "../../../Component/Toast";
import Loader from "../../../Component/Loader";
import Tooltip from "@mui/material/Tooltip";
import { BaseUrl } from "../../../Utililties/Config";
import axios from "axios";

const ManageRecipient = (props) => {
  const { certificate } = props.location.state;
  console.log(certificate);
  const history = useHistory();
  const csvRef = useRef();
  const user = useSelector((state) => state.user);

  console.log(user);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [limit, setLimit] = useState(4);
  const [total, setTotal] = useState();
  const [leftVis, setLeftVis] = useState(true);
  const [rightVis, setRightVis] = useState(true);
  const [data, setData] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [dataFile, setDataFile] = useState({});
  const [currentList, setCurrentList] = useState([]);
  const [errorCSV, setErrorCSV] = useState("");

  const [certificateId, setCertificateId] = useState(certificate._id);

  const lastPage = Math.ceil(total / limit);
  useEffect(() => {
    if (user.message) {
      setTimeout(() => {
        dispatch(ResetUser());
      }, 1000);
    }
    if (user.error) {
      setTimeout(() => {
        dispatch(ResetUser());
      }, 1000);
    }
  }, [user]);
  useEffect(() => {
    let data = {
      pageNo,
      limit,
      searchKey: search,
      certificateId,
    };
    dispatch(getReci(data));
  }, [pageNo, limit, search, certificateId]);
  useEffect(() => {
    if (search) {
      setPageNo(1);
    }
  }, [search]);

  useEffect(() => {
    setCurrentList(user.users);
  }, [user]);
  useEffect(() => {
    if (user.loading) {
      setShowLoader(true);
    } else {
      setShowLoader(false);
    }
  }, [user.loading]);

  useEffect(() => {
    if (user.paginationData) {
      setTotal(user.paginationData.total);
    }
  }, [user.paginationData]);

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

  const handleBackward = () => {
    setRightVis(true);
    setPageNo((prevState) => prevState - 1);
  };
  const handleForward = () => {
    setLeftVis(true);
    setPageNo((prevState) => prevState + 1);
  };

  const handleCSV = (e) => {
    setErrorCSV("");
    const file = e.target.files[0];
    setDataFile(file);
    const reader = new FileReader();
    reader.onload = function (e) {
      const binary = reader.result;
      const workBook = XLSX.read(binary, {
        type: "binary",
      });
      const workSheetName = workBook.SheetNames[0];
      const workSheet = workBook.Sheets[workSheetName];

      const data = XLSX.utils.sheet_to_json(workSheet, {
        haeder: 1,
        defval: "",
      });
      data.forEach(function (el) {
        Object.keys(el).forEach(function (property) {
          if (el[property] === "") {
            setErrorCSV("empty values found");
          }
        });
      });
    };
    reader.readAsText(file);
  };
  const handleEdit = (userData) => {
    history.push("/updateReci", { userData, certificate });
  };
  const handleResendEmail = (userData) => {
    console.log(userData);
    const token = localStorage.getItem("token");
    const fetch = async () => {
      let data = {
        email: userData.email,
        certificateId: certificateId,
      };
      const res = await axios.post(
        `${BaseUrl}user/send-certificate-link`,
        {
          ...data,
        },
        {
          headers: {
            authentication: `${token}`,
          },
        }
      );
      dispatch(resendEmail(res));
    };
    fetch();
  };
  const handleSearch = () => {
    let data = {
      pageNo: 1,
      limit: 5,
      certificateId,
      searchKey: search,
    };
    dispatch(getReci(data));
  };
  const handleDelete = (user) => {
    setShow(true);
    setData(user);
  };
  const deleteUserData = (id) => {
    dispatch(deleteUser(id, certificateId));
    handleClose();
  };

  const handleFileUpload = () => {
    if (errorCSV === "") {
    } else {
      dispatch(uploadUser(dataFile, certificateId));
    }
  };
  const renderList = () => {
    if (certificate.certAttrValue) {
      let str = [];
      certificate.certAttrValue.map((data) => {
        str.push(data.key);
      });
      return <p>{str.toString()}</p>;
    } else {
      return null;
    }
  };
  const downloadCSV = () => {
    let csvHeader = [];
    const user = [
      "name",
      "company",
      "email",
      "addressOne",
      "addressTwo",
      "country",
      "state",
      "city",
      "zipCode",
    ];

    const header = user.concat(certificate.attributes);
    csvHeader.push(header.join(","));
    const blob = new Blob([csvHeader], { type: "text/csv" });

    // Creating an object for downloading url
    const url = window.URL.createObjectURL(blob);

    // Creating an anchor(a) tag of HTML
    const a = document.createElement("a");

    // Passing the blob downloading url
    a.setAttribute("href", url);

    // Setting the anchor tag attribute for downloading
    // and passing the download file name
    a.setAttribute("download", "uploadDataTemplate.csv");

    // Performing a download with click
    a.click();
  };
  return (
    <div>
      <Toast success={user.message} error={user.error} />
      <Loader showLoader={showLoader} />
      <div className="Manage-Reci">
        <h3>Manage Recipient</h3>
        <div className="upper-panel">
          <div className="add-div">
            <label>Add Recipient</label>
            <Button
              className="search-icon"
              style={{ marginLeft: "10px" }}
              onClick={() =>
                history.push("/addReci", {
                  certificate,
                })
              }
            >
              Add
            </Button>
          </div>

          <div className="upload-div">
            <div className="div-upload-control">
              <label>Upload Recipient</label>
              <input
                type="file"
                accept=".csv"
                onChange={handleCSV}
                ref={csvRef}
                style={{ display: "none" }}
              />
              <Button
                className="SideBtn"
                variant="primary"
                onClick={() => csvRef.current.click()}
              >
                Select file to upload data..
              </Button>
              {dataFile ? <p>{dataFile.name}</p> : null}
              <Button
                className="SideBtn"
                variant="primary"
                onClick={() => handleFileUpload()}
              >
                Upload
              </Button>
            </div>
            {errorCSV ? (
              <p style={{ color: "#c94040" }}>
                There are some empty values in csv please fill them
              </p>
            ) : null}
            <div>
              <p>
                <a
                  style={{ color: "cornflowerblue", cursor: "pointer" }}
                  onClick={() => downloadCSV()}
                >
                  Click here
                </a>{" "}
                to download the Upload data Template CSV for uploading data.
                <br />
                Note: Do not change the csv heading and download each time
                <br />
                whenever new attributes adds in certificates because csv heading
                also adds.
                {renderList()}
              </p>
            </div>
          </div>
        </div>
        <div className="lower-panel">
          <div className="search-limit">
            <div className="search-div">
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
            </div>
            <div className="limit-div">
              <label>Limit of data to be display</label>
              <input
                type="number"
                value={limit}
                min="1"
                onChange={(e) => setLimit(e.target.value)}
              />
            </div>
          </div>
          <div className="responsive-table">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Recipient Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {currentList?.length !== 0 ? (
                  currentList?.map((user) => (
                    <tr>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td style={{ display: "flex" }}>
                        <Tooltip title="View" placement="top">
                          <div className="icon-div">
                            <AiFillEdit
                              className="icon-action"
                              onClick={() => handleEdit(user)}
                            />
                          </div>
                        </Tooltip>
                        <Tooltip title="Delete" placement="top">
                          <div className="icon-div">
                            <AiFillDelete
                              className="icon-action"
                              onClick={() => handleDelete(user)}
                            />
                          </div>
                        </Tooltip>

                        <Tooltip title="Resend-Email" placement="top">
                          <div className="icon-div">
                            <IoIosSend
                              className="icon-action"
                              onClick={() => handleResendEmail(user)}
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
            {currentList?.length !== 0 ? (
              <div className="btn-pag">
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
              </div>
            ) : null}
          </div>
          <Button
            type="submit"
            variant="primary"
            onClick={() => history.push("/certificate")}
            style={{ float: "right" }}
          >
            Back
          </Button>
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Recipient</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure, you want to delete {data.name}?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="danger" onClick={() => deleteUserData(data._id)}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default ManageRecipient;
