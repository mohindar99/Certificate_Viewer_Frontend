import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Table, Row, Col, Button, Modal } from "react-bootstrap";
import { BiEdit } from "react-icons/bi";
import "../../Assets/Styles/user.scss";
import "../../Assets/Styles/global.scss";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

import Loader from "../../Component/Loader";
import {
  createRequest,
  requestList,
} from "../../Redux/Actions/certificate.action";
import Toast from "../../Component/Toast";
// import axios from "axios";
import { fontMaster } from "../../Utililties/service";
import { getCertDetails } from "../../Utililties/service";
import { userCerificate } from "../../Redux/Actions/certificate.action";
// import { data } from "jquery";
import { userDetails } from "../../Redux/Actions/user.action";
import Tooltip from '@mui/material/Tooltip';
import axios from "axios";
import { BaseUrl } from "../../Utililties/Config";
import Spinner from 'react-bootstrap/Spinner'

const UserView = (props) => {
  const { certData, currentPosts, token } = props.location.state;
  const [downloadButtonDisabled, setDownloadButtonDisabled] = useState(false)
  const { certName, data: dataI, organizationData } = certData
  const dispatch = useDispatch();
  // const history = useHistory();
  
  const cert = useSelector((state) => state.cert);
  const [list, setList] = useState([]);
  const [changeError, setChangeError] = useState("");
  const [field, setField] = useState({});
  const [changeValue, setChangeValue] = useState("");
  const [show, setShow] = useState(false);
  const [newData, setNewData] = useState({});
  const [showLoader, setShowLoader] = useState(false);
  const [divDisplay, setDivDisplay] = useState(false);
  // const [certDetails, setCertDetails] = useState(null);
  const[userInfo, setUserInfo] = useState()
  const certificateList = cert.certificates;
  const data = cert.certificates;
  const [attr, setAttr] = useState([]);
  localStorage.setItem("token", token);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [dataMap, setDataMap] = useState(null);
  const requests = cert.requestsList;
  //loading font from font master API
  useEffect(() => {
    if (token) {
      dispatch(userDetails(token));
    }
  }, [token]);
  useEffect(() => {
    if (data) {
      data.map((data) => {
        if (data.certificateId === certData._id) {

          setUserInfo(data)
        }
      })
    }
  },[data])
  useEffect(() => {
    const fetch = async () => {
      let dataFont = {
        pageNo: 1,
        limit: 1000,
      };
      const res = await fontMaster(dataFont)
      if (res.data.statusCode === 200) {
        const fontData = res.data.data

        fontData.map(async (data) => {
          const font = new FontFace(data.name, `url(${data.url})`)
          await font.load()
          document.fonts.add(font)
        })
      }
    }
    fetch()
  }, [])

  useEffect(() => {
    certificateList.map((data) => {
      if (data.certificateId === certData._id) {
        setAttr(data.certAttrValue)
      }
    })
  }, [certificateList])

  useEffect(() => {
    let data = {
      limit: 5000,
      pageNo: 1,
      searchKey: "",
    };
    dispatch(userCerificate(data));
  }, [])
  
  useEffect(() => {
    const getCertificate = async (id) => {
      const res = await getCertDetails(id)
      let dataOne = null
      if (res.status === 200) {
        dataOne = res.data.data
        setDataMap(res.data.data.data)
      }
      return dataOne;
    }
    const data = getCertificate(certData._id)
  }, [])

  useEffect(() => {
    let dataOne = {
      certId: certData._id,
      email: currentPosts[0].email,
      pageNo: 1,
      limit: 100,
    };
    dispatch(requestList(dataOne));
  }, [certData]);
  useEffect(() => {
    if (cert.loading) {
      setShowLoader(true);
    } else {
      setShowLoader(false);
    }
  }, [cert.loading]);
  const getStatus = (value) => {
    let status = "";

    requests.map((data) => {
      if (value === data.attributeKey) {
        status = data.status;
      }
    });
    if (!status) {
      status = "No status";
    }
    return status;
  };
  useEffect(() => {
    if (dataMap) {
      let arr = [];
      dataMap.map((data) => {
        if (data.tagName === "INPUT") {
          let xy = null;
          let name = null;
          if (data.isProtected === true) {
            attr.map((dataKey) => {
              const x = dataKey.key.replace(/ /g, "");
              if (x.toLowerCase().includes(data.value.toLowerCase())) {
                name = dataKey.key;
                xy = dataKey.value;
              }
            });

            arr.push({
              key: name,
              value: xy,
              status: getStatus(name),
            });
          }
        }
      });
      setList(arr);
    }
  }, [dataMap, requests]);

  const handleSubmitDetails = (e) => {
    e.preventDefault();
    setChangeError("");
    if (changeValue) {
      let dataSubmit = {
        userId: currentPosts[0]._id,
        certificateId: certData._id,
        email: currentPosts[0].email,
        attributeKey: field.fieldName,
        name: currentPosts[0].name,
        oldValue: field.value,
        newValue: changeValue,
      };
      setNewData(dataSubmit);
      setShow(true);
    } else {
      setChangeError("Please enter valid value...");
    }
  };



  const renderDiv = () => {
    return dataI.map((valuee, index) => {
      let Attrvalue;
      if (valuee.tagName === "INPUT" && valuee.value === 'issuerName') {
        certData.certAttrValue.map((val) => { 
          if (val.key === "Issuer Name") { 
            Attrvalue = val.value;
            
          }
        })
        return (
          <div key={`input-preview-${index}`} style={valuee.properties} id={valuee.id}>
            {Attrvalue}
          </div>
        );
      }
      if (valuee.tagName === "INPUT" && valuee.value === 'issuerEmail') {
        certData.certAttrValue.map((val) => { 
          if (val.key === "Issuer Email") { 
            Attrvalue = val.value;
          }
        })
        return (
          <div key={`input-preview-${index}`} style={valuee.properties} id={valuee.id}>
            {Attrvalue}
          </div>
        );
      }
      if (valuee.tagName === "INPUT" && valuee.value === 'certificateId') {
        certData.certAttrValue.map((val) => { 
          if (val.key === "Certificate Id") { 
            Attrvalue = val.value;
          }
        })
        return (
          <div key={`input-preview-${index}`} style={valuee.properties} id={valuee.id}>
            {Attrvalue}
          </div>
        );
      }
      if (valuee.tagName === "INPUT" && valuee.value === 'issueDate') {
        certData.certAttrValue.map((val) => { 
          if (val.key === "Issue Date") { 
            Attrvalue = val.value;
          }
        })
        return (
          <div key={`input-preview-${index}`} style={valuee.properties} id={valuee.id}>
            {Attrvalue}
          </div>
        );
      }
      if (valuee.tagName === "INPUT" && valuee.value === 'expiryDate') {
        certData.certAttrValue.map((val) => { 
          if (val.key === "Expiry Date") { 
            Attrvalue = val.value;
          }
        })
        return (
          <div key={`input-preview-${index}`} style={valuee.properties} id={valuee.id}>
            {Attrvalue}
          </div>
        );
      }
      if (valuee.tagName === "INPUT" && valuee.value === 'recipientName') {
        certData.certAttrValue.map((val) => { 
          if (val.key === "Recipient Name") { 
            Attrvalue = val.value;
          }
        })
        return (
          <div key={`input-preview-${index}`} style={valuee.properties} id={valuee.id}>
            {Attrvalue}
          </div>
        );
      }
      if (valuee.tagName === "INPUT" && valuee.value === 'recipientEmail') {
        certData.certAttrValue.map((val) => { 
          if (val.key === "Recipient Email") { 
            Attrvalue = val.value;
          }
        })
        return (
          <div key={`input-preview-${index}`} style={valuee.properties} id={valuee.id}>
            {Attrvalue}
          </div>
        );
      }
      if (valuee.tagName === "DIV" && valuee.id !== 'canvas-main-background') {
        return (
          <div key={`div-preview-${index}`} style={valuee.properties} id={valuee.id}>
            {valuee.value}
          </div>
        );
      }
      if (valuee.tagName === "IMG") {
        return (
          <img
            key={`image-preview-${index}`}
            style={valuee.properties}
            src={valuee.src}
            id={valuee.id}
            alt="certificateImages"
          />
        );
      }
    });
  };

  const handleEdit = (data) => {
    setChangeValue("");
    setField({
      fieldName: data.key,
      value: data.value,
    });
    setDivDisplay(true);
  };
  const handleSubmit = (newData) => {
    dispatch(createRequest(newData));
    handleClose();
  };


  const getHightAndWidth = () => {
    if (certData.format === "A4") {
      if (certData.orientation === "LandScape") {
        const width = 11.7;
        const height = 8.3;
        return [width, height];
      }
      if (certData.orientation === "Portrait") {
        const width = 8.3;
        const height = 11.7;
        return [width, height];
      }
    }
    if (certData.format === '8.5" x 11"') {
      if (certData.orientation === "LandScape") {
        const width = 11;
        const height = 8.5;
        return [width, height];
      }
      if (certData.orientation === "Portrait") {
        const width = 8.5;
        const height = 11;
        return [width, height];
      }
    }
    if (certData.format === '9" x 12"') {
      if (certData.orientation === "LandScape") {
        const width = 12;
        const height = 9;
        return [width, height];
      }
      if (certData.orientation === "Portrait") {
        const width = 9;
        const height = 12;
        return [width, height];
      }
    }
    if (certData.format === '9.5" x 12.5"') {
      if (certData.orientation === "LandScape") {
        const width = 12.5;
        const height = 9.5;
        return [width, height];
      }
      if (certData.orientation === "Portrait") {
        const width = 9.5;
        const height = 12.5;
        return [width, height];
      }
    }
    if (certData.format === '11" x 14"') {
      if (certData.orientation === "LandScape") {
        const width = 14;
        const height = 11;
        return [width, height];
      }
      if (certData.orientation === "Portrait") {
        const width = 11;
        const height = 14;
        return [width, height];
      }
    }
  }
    

  function toDataURL(url){
    return new Promise((resolve,reject) => {
      const token = localStorage.getItem("token")
      const customHeader = () => ({
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Headers': 'Content-Type,Authorization',
         authentication: `${token}`,
      })
      axios.get(`${BaseUrl}certificate/certificate-img-url?url=${url}`,
            {
              headers: customHeader(),
            }
        ).then(data=>{
          let imgData = '';
          if (data.data.statusCode === 200) {
            imgData = data.data.url;      
            resolve(imgData);  
          }
      }).catch(error => ({ error: 'Server Error' }))
    })
  }

  const handleDownloadCertificate = async () => {
    setDownloadButtonDisabled(true)
    let input = document.getElementById(dataI[0].id)
    
    const tracking = {}
    var srcNodeList = input.querySelectorAll('[src]')
    for (var i = 0; i < srcNodeList.length; i++) {
      var item = srcNodeList[i]
      if(item.getAttribute('src') !== null){
        tracking[item.id] = document.getElementById(item.id).src
        const newSRC = await toDataURL(document.getElementById(item.id).src)
        document.getElementById(item.id).src = newSRC        
      }
    }
    const background_url = input.style.backgroundImage
    input.style.backgroundImage = `url(${await toDataURL(input.style.backgroundImage.slice(5, -2))})`

    html2canvas(input, { allowTaint: true, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png")
      const [pdfWidth, pdfHeight] = getHightAndWidth()
      
      const pdf = new jsPDF({
        orientation: certData.orientation.toLowerCase(),
        unit: "in",
        format: [pdfWidth, pdfHeight]
      })

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("download.pdf")
      input.style.backgroundImage = background_url
      for (var i = 0; i < srcNodeList.length; i++) {
        var item = srcNodeList[i]
        if(item.getAttribute('src') !== null){
          document.getElementById(item.id).src = tracking[item.id]      
        }
      }
      setDownloadButtonDisabled(false)
    })
  }

  return (
    <div className="userView">
      <Loader showLoader={showLoader} />
      <Toast success={cert.message} error={cert.error} />
      <Row>
        {list.length !== 0 ? (<Col xs={12} >
          <h4>Certificate Information</h4>
          <div className="responsive-table">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Variable Name</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {dataMap
                  ? list.map((data, index) => (
                    <tr key={index}>
                      <th>{data.key}</th>
                      <th>{data.status}</th>
                      <th>
                        <Tooltip title="Edit" placement="right-start">
                          <div style={{ height: 'fit-content', width: 'fit-content' }}>
                            <BiEdit
                              className="icon-action"
                              onClick={() => handleEdit(data)}
                            />
                          </div>
                        </Tooltip>
                      </th>
                    </tr>
                  ))
                  : null}
              </tbody>
            </Table>
          </div>
        </Col>): null}
        <Col>
          {divDisplay ? (
            <div>
              <h4>Item Detail Request</h4>
              <div className="item-div">
                <form>
                  <h5>{field !== null ? field.fieldName : null}</h5>
                  <div className="info-controls">
                    <label>Original Value: </label>
                    <p>{field !== null ? field.value : null}</p>
                  </div>
                  <div className="info-controls">
                    <label>Changed Value: </label>
                    <input
                      className="inputStyle"
                      type="text"
                      value={changeValue}
                      onChange={(e) => setChangeValue(e.target.value)}
                    />
                    {changeError ? (
                      <p style={{ color: "#c94040" }}>{changeError}</p>
                    ) : null}
                  </div>

                  <Button
                    className="info-submit"
                    onClick={(e) => handleSubmitDetails(e)}
                  >
                    Submit Request
                  </Button>
                </form>
              </div>
            </div>
          ) : null}
        </Col>
      </Row>
      <Row>
        <Col className="col-lg-4 col-sm-4 col-xs-12 full-767">
          <div className="user-info">
            <h4>Delivery Address</h4>
            <br />
            <div className="info-controls">
              <label>Name: </label>
              <p>{userInfo?.name}</p>
            </div>
            <div className="info-controls">
              <label>Company: </label>
              <p>{userInfo?.company}</p>
            </div>
            <div className="info-controls">
              <label>Email: </label>
              <p>{userInfo?.email}</p>
            </div>
            <div className="info-controls">
              <label>Address One: </label>
              <p>{userInfo?.addressOne}</p>
            </div>
            <div className="info-controls">
              <label>Address Two: </label>
              <p>{userInfo?.addressTwo}</p>
            </div>
            <div className="info-controls">
              <label>Country: </label>
              <p>{userInfo?.country}</p>
            </div>
            <div className="info-controls">
              <label>State: </label>
              <p>{userInfo?.state}</p>
            </div>
            <div className="info-controls">
              <label>City: </label>
              <p>{userInfo?.city}</p>
            </div>
            <div className="info-controls">
              <label>ZipCode: </label>
              <p>{userInfo?.zipCode}</p>
            </div>
          </div>
        </Col>
        <Col className="col-lg-8 col-sm-8 col-xs-12 full-767">
          <div className="certificate__container">
            {dataMap !== null ? (
              <div style={dataMap[0].properties} id={dataMap[0].id}>
                {renderDiv()}
              </div>
            ) : null}
          </div>
          <br/> 
          {downloadButtonDisabled ?  <Button variant="primary" disabled>
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
          variant="primary"
        />
        <span style={{color: "#0d6efd"}}>&nbsp;&nbsp;Downloading...</span>
      </Button> :
      <Button onClick={() => handleDownloadCertificate()} variant="primary">
        Download
      </Button>}
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <div className="war">
            Before submitting, please check all details...
          </div>
          <div className="div-submit">
            <div>
              <label>Name : </label>
              <p>{newData.name}</p>
            </div>
            <div>
              <label>Field Name : </label>
              <p>{newData.attributeKey}</p>
            </div>
            <div>
              <label>Old Data : </label>
              <p>{newData.oldValue}</p>
            </div>
            <div>
              <label>New Value : </label>
              <p>{newData.newValue}</p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer style={{ display: 'flex',justifyContent: 'space-between'}}>
          <Button variant="primary"  onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleSubmit(newData)}>
            Submit Request
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserView;
