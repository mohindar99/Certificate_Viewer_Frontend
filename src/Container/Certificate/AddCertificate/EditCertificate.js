import React, { useEffect, useState, useRef } from "react";
import SidebarEditor from "../../../Component/Editor/SidebarEditor";
import "../../../Assets/Styles/Certificate.scss";
import Canvas from "../../../Component/Editor/Canvas";
import { allOrg } from "../../../Redux/Actions/org.action";
import { useDispatch, useSelector } from "react-redux";
import { Button, Modal, ListGroup, Spinner } from "react-bootstrap";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useHistory } from "react-router-dom";
import { updateCertificate } from "../../../Redux/Actions/certificate.action";
import { uploadImage } from "../../../Utililties/utilities";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Toast from "../../../Component/Toast";
import Loader from "../../../Component/Loader";

const EditCertificate = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const org = useSelector((state) => state.org);
  const cert = useSelector((state) => state.cert);
  const [papSize, setPapSize] = useState();
  const [canData, setCanData] = useState([]);
  const [page, setPage] = useState(1);
  const [leftVis, setLeftVis] = useState(true);
  const [rightVis, setRightVis] = useState(true);
  const [certName, setCertName] = useState("");
  const [certNameError, setCertNameError] = useState("");
  const [currentPage, setCurrentPage] = useState("1");
  const [orgName, setOrgName] = useState("");
  const [orgId, setOrgId] = useState("");
  const [orgNameError, setOrgNameError] = useState("");
  const [show, setShow] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [total, setTotal] = useState();
  const [dataPerPage, setDataPerPage] = useState("5");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const lastPage = Math.ceil(total / dataPerPage);
  const [certificate, setCertificate] = useState({});
  const [dataForSideBar, setDataForSideBar] = useState({});
  const [organizationData, setOrganizationData] = useState([]);
  const [format, setFormat] = useState("");
  const [orientation, setOrientaion] = useState("");
  const [allAttributes, setAllAttributes] = useState([]);

  useEffect(() => {
    let data = {
      pageNo: page,
      limit: dataPerPage,
    };
    dispatch(allOrg(data));
  }, [page, dataPerPage]);
  useEffect(() => {
    if (org.paginationData) {
      setTotal(org.paginationData.total);
    }
  }, [org.paginationData]);
  useEffect(() => {
    if (props.location.state) {
      setCertificate(props.location.state.certificate);
      setOrganizationData(props.location.state.certificate.organizationData);
    }
  }, []);
  useEffect(() => {
    if (certificate) {
      setCertName(certificate.certName);
      organizationData.map((data, index) => {
        setOrgName(data.name);
        setOrgId(data._id);
      });
    }
  }, [certificate]);

  useEffect(() => {
    if (org.loading) {
      setShowLoader(true);
    } else {
      setShowLoader(false);
    }
  }, [org.loading]);

  useEffect(() => {
    if (cert.loading) {
      setShowLoader(true);
    } else {
      setShowLoader(false);
    }
  }, [cert.loading]);
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
  useEffect(() => {
    if (cert.message) {
      history.push("/certificate");
    }
    if (cert.error) {
    }
  }, [cert.message, cert.error]);

  const sideBarRef = useRef();
  const controlData = (data) => {
    setFormat(data.paperValue);
    setOrientaion(data.orienValue);
    setAllAttributes([...new Set(data.allAttributes)]);
    setCanData({
      paper: data.paperValue,
      Orient: data.orienValue,
      text: data.textList,
      image: data.imageList,
      bak: data.imageBakList,
      issuerName: data.issuerName,
      issuerEmail: data.issuerEmail,
      certificateId: data.certificateId,
      issueDate: data.issueDate,
      expiryDate: data.expiryDate,
      recipientName: data.recipientName,
      recipientEmail: data.recipientEmail,
      issuerNameProtected: data.issuerNameProtected,
      issuerEmailProtected: data.issuerEmailProtected,
      certificateIdProtected: data.certificateIdProtected,
      issueDateProtected: data.issueDateProtected,
      expiryDateProtected: data.expiryDateProtected,
      recipientNameProtected: data.recipientNameProtected,
      recipientEmailProtected: data.recipientEmailProtected,
      attributes: data.attributes,
      allAttributes: data.allAttributes,
    });
  };
  const handleOrgName = (value) => {
    setOrgName(value.name);
    setOrgId(value._id);
  };

  const handleBackward = () => {
    setRightVis(true);
    setPage((prevState) => prevState - 1);
  };
  const handleForward = () => {
    setLeftVis(true);
    setPage((prevState) => prevState + 1);
  };
  const copyTextValue = (data) => {
    sideBarRef.current.copyFromTextStack(data);
  };
  const deleteTextValue = (data) => {
    sideBarRef.current.deleteFromTextStack(data);
  };
  const deleteImageValue = (data) => {
    sideBarRef.current.deleteFromImageStack(data);
  };
  const copyImageValue = (data) => {
    sideBarRef.current.copyFromImageStack(data);
  };

  const dataFromPage = async (data) => {
    setCertNameError("");
    setOrgNameError("");
    let dataOfPage = {
      certName,
      organization: orgId,
      format,
      orientation,
      data,
      attributes: allAttributes,
    };
    const handleCheck = (certName, orgName) => {
      let isValid = true;
      if (!certName || certName === undefined) {
        setCertNameError("Certificate Name is required");
        isValid = false;
      }
      if (!orgName || orgName === undefined) {
        setOrgNameError("Organization Name is required");
        isValid = false;
      }
      return isValid;
    };
    let url = "";
    if (handleCheck(certName, orgName)) {
      setShowLoader(true);
      if (data) {
        for (var i = 0; i < data.length; i++) {
          if (data[i].src) {
            if (
              !data[i].src.includes("https://badgingsystem.s3.amazonaws.com/")
            ) {
              const response = await fetch(data[i].src);
              const blob = await response.blob();
              let r = (Math.random() + 1).toString(36).substring(7);
              const file = new File([blob], r + ".png", {
                type: blob.type,
              });
              const res = await uploadImage(file);
              url = res.location;
              if (data[i].id == "canvas-main-background") {
                data[i].properties.backgroundImage = `url("${url}")`;
              }
              if (data[i].tagName == "IMG") {
                data[i].src = url;
              }
            } else {
              if (data[i].id == "canvas-main-background") {
                data[i].properties.backgroundImage = `url("${data[i].src}")`;
              }
            }
          }
        }
        //history.push("/prevCert", { dataOfPage });
        dispatch(updateCertificate(dataOfPage, certificate._id));
      }
    }
  };
  const dataToSendToSideBar = (value) => {
    setDataForSideBar({
      issuerNameFlag: value.issuerNameFlag,
      issuerEmailFlag: value.issuerEmailFlag,
      certificateIdFlag: value.certificateIdFlag,
      issueDateFlag: value.issueDateFlag,
      expiryDateFlag: value.expiryDateFlag,
      recipientNameFlag: value.recipientNameFlag,
      recipientEmailFlag: value.recipientEmailFlag,
    });
  };

  return (
    <div className="certiAdd">
      <Toast success={cert.message} error={cert.error} />
      <Loader showLoader={showLoader} />

      <h3>Edit Certificate</h3>

      <div className="upper-panel">
        <div className="control-left">
          <div className="control">
            <label>Name of Certificate</label>
            <input
              placeholder="Certificate Name"
              value={certName}
              onChange={(e) => setCertName(e.target.value)}
            />
          </div>
          <div className="message">
            {certNameError ? (
              <p style={{ color: "#c94040" }}>{certNameError}</p>
            ) : null}
          </div>
        </div>
        <div className="control-right">
          <div className="control">
            <label>Name of Organization</label>
            {orgName ? <h>{orgName}</h> : null}
            <Button onClick={handleShow}>Select Organization</Button>
          </div>
          <div className="message">
            {orgNameError ? (
              <p style={{ color: "#c94040" }}>{orgNameError}</p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="lower-panel">
        <div className="sidebar-control">
          <SidebarEditor
            ref={sideBarRef}
            data={controlData}
            certificate={certificate}
            dataFromCanvas={dataForSideBar}
          />
        </div>
        <div className="canvas-control">
          <Canvas
            dataCanvas={canData}
            copyText={copyTextValue}
            deleteText={deleteTextValue}
            copyImage={copyImageValue}
            deleteImage={deleteImageValue}
            dataCords={dataFromPage}
            certificate={certificate}
            dataToSideBar={dataToSendToSideBar}
          />
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Organization list</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ margin: "10px" }}>
            <label>Number of rows</label>
            <input
              style={{ marginLeft: "10px" }}
              type="number"
              placeholder="Number of rows"
              value={dataPerPage}
              onChange={(e) => setDataPerPage(e.target.value)}
            />
          </div>
          <ListGroup as="ul">
            {org.orgs
              ? org.orgs.map((org, index) => (
                  <ListGroup.Item
                    as="li"
                    key={index}
                    onClick={() => {
                      handleOrgName(org);
                      handleClose();
                    }}
                  >
                    {org.name}
                  </ListGroup.Item>
                ))
              : null}
          </ListGroup>

          <div className="btn-pag">
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
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EditCertificate;
