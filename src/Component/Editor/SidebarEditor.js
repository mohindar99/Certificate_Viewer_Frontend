import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import "../../Assets/Styles/editor.scss";
import {
  ButtonGroup,
  ToggleButton,
  Button,
  Modal,
  Form,
  Tab,
  Tabs,
  DropdownButton,
} from "react-bootstrap";
import MenuItem from '@mui/material/MenuItem';
import Switch from "@mui/material/Switch";
import { alpha, styled } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import XLSX from "xlsx";
import Loader from "../Loader";
import Toast from "../Toast";
import { Select } from "@mui/material";

const SidebarEditor = forwardRef(
  ({ data, certificate, dataFromCanvas }, ref) => {
    const [issuerName, setIssuerName] = useState(false);
    const [issuerEmail, setIssuerEmail] = useState(false);
    const [certificateId, setCertificateId] = useState(false);
    const [issueDate, setIssueDate] = useState(false);
    const [expiryDate, setExpiryDate] = useState(false);
    const [recipientEmail, setRecipientEmail] = useState(false);
    const [recipientName, setRecipientName] = useState(false);
    const [issuerNameProtected, setIssuerNameProtected] = useState(false);
    const [issuerEmailProtected, setIssuerEmailProtected] = useState(false);
    const [certificateIdProtected, setCertificateIdProtected] = useState(false);
    const [issueDateProtected, setIssueDateProtected] = useState(false);
    const [expiryDateProtected, setExpiryDateProtected] = useState(false);
    const [recipientEmailProtected, setRecipientEmailProtected] =
      useState(false);
    // const [fixedAttribute, setFixedAttribute] = useState([])
    const [recipientNameProtected, setRecipientNameProtected] = useState(false);
    const [textValue, setTextValue] = useState("text");
    const [paperValue, setPaperValue] = useState('8.5" x 11"');
    const [orienValue, setOrienValue] = useState("LandScape");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [text, setText] = useState("");
    const [imageList, setImageList] = useState([]);
    const [imageBakList, setImageBakList] = useState(null);
    const [textList, setTextList] = useState([]);
    // const [showIcon, setShowIcon] = useState("hidden");
    const [elements, setElements] = useState([]);
    const [dataSet, setDataSet] = useState({});
    const [attributes, setAttributes] = useState([]);
    const [allAttributes, setAllAttributes] = useState([]);
    const imageRef = useRef();
    const imageBakRef = useRef();
    const csvRef = useRef();
    let testImage = [];
    let testText = [];
    let testAttribute = [];
    // const [showFont, setShowFont] = useState(false);

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [showLoader, setShowLoader] = useState(false);
    // const token = localStorage.getItem("token");
    // const [certificateAtt, setCertificateAtt] = useState([]);

    const handleText = (e) => {
      e.preventDefault();
      setTextList([...textList, text]);
      handleClose();
      setText("");
    };
    useEffect(() => {
      if (dataFromCanvas) {
        if (dataFromCanvas.issuerNameFlag === false) {
          setIssuerName(false);
          setIssuerNameProtected(false);
        }
        if (dataFromCanvas.issuerEmailFlag === false) {
          setIssuerEmail(false);
          setIssuerEmailProtected(false);
        }
        if (dataFromCanvas.issueDateFlag === false) {
          setIssueDate(false);
          setIssueDateProtected(false);
        }
        if (dataFromCanvas.expiryDateFlag === false) {
          setExpiryDate(false);
          setExpiryDateProtected(false);
        }
        if (dataFromCanvas.certificateIdFlag === false) {
          setCertificateId(false);
          setCertificateIdProtected(false);
        }
        if (dataFromCanvas.recipientNameFlag === false) {
          setRecipientName(false);
          setRecipientNameProtected(false);
        }
        if (dataFromCanvas.recipientEmailFlag === false) {
          setRecipientEmail(false);
          setRecipientEmailProtected(false);
        }
      }
    }, [dataFromCanvas]);

    useEffect(() => {
      if (certificate) {
        if (certificate.data) {
          let newdata = certificate.data;

          setElements(newdata);
          setOrienValue(certificate.orientation);
          setPaperValue(certificate.format);
          setAllAttributes(certificate.attributes);
        }
      }
    }, [certificate]);

    useEffect(() => {
      let arr = []
      for (var i = 0; i < elements.length; i++) {
        const dataId = elements[i].id.replace(/\d+/g, "");

        if (elements[i].tagName === "INPUT") {
          if (dataId === "issuerNameId") {
            if (elements[i].isProtected === true) {
              setIssuerNameProtected(true);
            }
            setIssuerName(true);
          }
          if (dataId === "issuerEmailId") {
            if (elements[i].isProtected === true) {
              setIssuerEmailProtected(true);
            }
            setIssuerEmail(true);
           
          }
          if (dataId === "certificateIdId") {
            if (elements[i].isProtected === true) {
              setCertificateIdProtected(true);
            }
            setCertificateId(true);
          }
          if (dataId === "issueDateId") {
            if (elements[i].isProtected === true) {
              setIssueDateProtected(true);
            }
            setIssueDate(true);
           
          }
          if (dataId === "expiryDateId") {
            if (elements[i].isProtected === true) {
              setExpiryDateProtected(true);
            }
            setExpiryDate(true);
           
          }
          if (dataId === "recipientNameId") {
            if (elements[i].isProtected === true) {
              setRecipientNameProtected(true);
            }
            setRecipientName(true);
            
          }
          if (dataId === "recipientEmailId") {
            if (elements[i].isProtected === true) {
              setRecipientEmailProtected(true);
            }
            setRecipientEmail(true);
          }
          if (dataId === "attributeId") {
            testAttribute.push({
              data: elements[i].value,
              toggle: true,
              isProtected: elements[i].isProtected,
            });
          }
        }
      }
      for (var j = 0; j < elements.length; j++) {
        if (elements[j].tagName === "IMG") {
          testImage.push(elements[j].src);
        }
        // changed
        if (elements[j].id === "canvas-main-background") {
          setImageBakList(elements[j].src);
        }
      }
      for (var k = 0; k < elements.length; k++) {
        if (elements[k].tagName === "DIV") {
          testText.push(elements[k].value);
        }
      }
      let attrArr = [];
      let tempArr =['Recipient Name', 'Recipient Email', 'Issuer Name', 'Issuer Email', 'Certificate Id', 'Issue Date', 'Expiry Date']
      if (allAttributes) { 
      const x = allAttributes.filter((data) => !tempArr.includes(data))
        
       x.map((data) => {
          if (!testAttribute.find((item) => item.data === data)){
            attrArr.push({
              data: data,
              toggle: false,
              isProtected: false,
            })
          }
        })
      }
      testAttribute.push(...attrArr)
    
      setImageList(testImage);
      setTextList(testText);
      setAttributes(testAttribute);
    }, [elements]);
    useEffect(() => {
      let arr = [];
      if(issuerEmail) arr.push('Issuer Email')
      if(issuerName) arr.push('Issuer Name')
      if(expiryDate) arr.push('Expiry Date')
      if(issueDate) arr.push('Issue Date')
      if(recipientEmail) arr.push('Recipient Email')
      if(recipientName) arr.push(' Recipient Name')
      if (certificateId) arr.push('Certificate Id')
      const newArr = [...new Set([...arr, ...allAttributes])]
      allAttributes.push(...newArr)
      },[allAttributes, issuerEmail,issuerName,recipientEmail,recipientName,issueDate,expiryDate,certificateId])
    
    useEffect(() => {
      let dataSidebar = {
        paperValue,
        orienValue,
        imageList,
        imageBakList,
        textList,
        issuerName,
        issuerEmail,
        certificateId,
        issueDate,
        expiryDate,
        recipientName,
        recipientEmail,
        issuerNameProtected,
        issuerEmailProtected,
        certificateIdProtected,
        issueDateProtected,
        expiryDateProtected,
        recipientNameProtected,
        recipientEmailProtected,
        attributes,
        allAttributes,
      };
      data(dataSidebar);
    }, [
      allAttributes,
      paperValue,
      orienValue,
      imageList,
      imageBakList,
      textList,
      issuerEmail,
      certificateId,
      issueDate,
      expiryDate,
      recipientName,
      recipientEmail,
      issuerName,
      issuerNameProtected,
      issuerEmailProtected,
      certificateIdProtected,
      issueDateProtected,
      expiryDateProtected,
      recipientNameProtected,
      recipientEmailProtected,
      attributes,
    ]);

    useImperativeHandle(ref, () => ({
      deleteFromTextStack(data) {
        let list = [...textList];
        list.splice(data, 1);
        setTextList(list);
      },

      deleteFromImageStack(data) {
        let list = [...imageList];
        list.splice(data, 1);
        setImageList(list);
      },
      copyFromTextStack(data) {
        setTextList([...textList, data]);
      },
      copyFromImageStack(data) {
        setImageList([...imageList, data]);
      },
    }));
    const GreenSwitch = styled(Switch)(({ theme }) => ({
      "& .MuiSwitch-switchBase.Mui-checked": {
        color: green[600],
        "&:hover": {
          backgroundColor: alpha(green[600], theme.palette.action.hoverOpacity),
        },
      },
      "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
        backgroundColor: green[600],
      },
    }));

    const handleImage = (e) => {
      if (e.target.files) {
        const filesArray = Array.from(e.target.files).map((file) =>
          URL.createObjectURL(file)
        );

        setImageList((prevImages) => prevImages.concat(filesArray));
        Array.from(e.target.files).map(
          (file) => URL.revokeObjectURL(file) // avoid memory leak
        );
      }
    };
    const handleBackImage = (e) => {
      if (e.target.files[0]) {
        const file = URL.createObjectURL(e.target.files[0]);

        setImageBakList(file);

        URL.revokeObjectURL(e.target.files[0]); // avoid memory leak
      }
    };
    const renderImage = (image) => {
      return image.map((photo) => {
        return <img className="imagePreview" src={photo} alt="" key={photo} />;
      });
    };
    const renderImageBak = (image) => {
      if (image) {
        return <img className="imagePreview" src={image} alt="" />;
      } else {
        return null;
      }
    };
    const handleCSV = (e) => {
      const file = e.target.files[0];
      setDataSet(file);
      const reader = new FileReader();
      reader.onload = function (e) {
        //Use reader.result
        const binary = reader.result;
        const workBook = XLSX.read(binary, {
          type: "binary",
        });
        const workSheetName = workBook.SheetNames[0];
        const workSheet = workBook.Sheets[workSheetName];

        let attributeData = [...attributes];
        let attributeArr = [...allAttributes];

        const data = XLSX.utils.sheet_to_json(workSheet, {
          haeder: 1,
        });
        const columnCount = XLSX.utils.decode_range(workSheet["!ref"]).e.c + 1;
        for (let i = 0; i < columnCount; ++i) {
          if (!allAttributes.find((data)=> data.includes(workSheet[`${XLSX.utils.encode_col(i)}1`].v))) {
            attributeData.push({
              data: workSheet[`${XLSX.utils.encode_col(i)}1`].v,
              toogle: false,
              isProtected: false,
            });
  
            attributeArr.push(workSheet[`${XLSX.utils.encode_col(i)}1`].v);
          }
            
        }

        /*data.map((data) => {
          attributeData.push({
            attributeName: data.attributeName,
            attributeValue: data.attributeValue,
          });
        });*/
        attributeData.map((data) => {
          if (!attributeArr.find((item) => item.includes(data.data))) {
            attributeArr.push(data.data)
          }
        })
        setAttributes(attributeData);
        setAllAttributes(attributeArr);
      };
      reader.readAsText(file);
    };
    const handleToggle = (index, e) => {
      const toggle = [...attributes];
      toggle[index].toggle = !toggle[index].toggle;
      setAttributes(toggle);
    };
    const handleToggleProtected = (index, e) => {
      const toggle = [...attributes];
      toggle[index].isProtected = !toggle[index].isProtected;
      setAttributes(toggle);
    };

    const paperSizeList = ['8.5" x 11"', '9" x 12"', '9.5" x 12.5"', '11" x 14"', 'A4'];

    return (
      <div className="SideEditor">
        <Toast success={message} error={error} />
        <Loader showLoader={showLoader} />
        <Tabs
          defaultActiveKey="attribute"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="elements" title="Elements">
            <div className="side-control side-control-material">
              <FormControl component="fieldset">
                <h>Paper Size</h>
                <Select
                  id="demo-select-small"
                  value={paperValue}
                  onChange={(e) => setPaperValue(e.target.value)}
                >
                  {paperSizeList.map((size) => (
                    <MenuItem key={size} value={size}>{size}</MenuItem>
                      )
                    )}
                </Select>
              </FormControl>
            </div>
            <div className="side-control">
              <FormControl component="fieldset">
                <h>Orientation</h>
                <RadioGroup
                  aria-label="gender"
                  name="controlled-radio-buttons-group"
                  value={orienValue}
                  onChange={(e) => setOrienValue(e.target.value)}
                  row
                >
                  <FormControlLabel
                    value="Portrait"
                    control={<Radio />}
                    label="Portrait"
                  />
                  <FormControlLabel
                    value="LandScape"
                    control={<Radio />}
                    label="LandScape"
                  />
                </RadioGroup>
              </FormControl>
            </div>

            <div className="side-control-panel">
              <h>Text</h>
              <div className="text-panel">
                <div className="text-div">
                  {textList.map((text, index) => (
                    <div key={index} id={index}>
                      {text}
                    </div>
                  ))}
                </div>

                <Button className="SideBtn adtxtb" onClick={handleShow}>
                  Add Text Field
                </Button>
              </div>
            </div>

            <div className="side-control-panel">
              <h>Image</h>
              <div className="text-panel">
                <div className="image-preview-div">
                  {renderImage(imageList)}
                </div>

                <input
                  accept="image/*"
                  type="file"
                  onChange={handleImage}
                  ref={imageRef}
                  style={{ display: "none" }}
                  onClick={(event)=>{ 
                    event.target.value = null
               }}
                />
                <Button
                  className="SideBtn"
                  variant="primary"
                  onClick={() => imageRef.current.click()}
                >
                  Add Image
                </Button>
              </div>
            </div>
            <div className="side-control-panel">
              <h>Background Image</h>

              <div className="text-panel">
                <div className="image-preview-div">
                  {renderImageBak(imageBakList)}
                </div>
                <input
                  accept="image/*"
                  type="file"
                  ref={imageBakRef}
                  onChange={handleBackImage}
                  style={{ display: "none" }}
                />
                <Button
                  className="SideBtn"
                  variant="primary"
                  onClick={() => {imageBakRef.current.click()}}
                >
                  Add Background Image
                </Button>
              </div>
            </div>
          </Tab>
          {/*   tab for attributes */}
          <Tab eventKey="attribute" title="Attribute">
            <div className="control-panel-switch">
              <label>Issuer Name</label>
              <div className="switch">
                <GreenSwitch
                  checked={issuerName}
                  name="issuerName"
                  onChange={(e) => setIssuerName(e.target.checked)}
                  defaultChecked
                />
              </div>
            </div>
            <div className="control-panel-switch">
              <label>Issuer Email</label>
              <div className="switch">
                <GreenSwitch
                  checked={issuerEmail}
                  name="issuerEmail"
                  onChange={(e) => setIssuerEmail(e.target.checked)}
                  defaultChecked
                />
              </div>
            </div>
            <div className="control-panel-switch">
              <label>Certificate Id</label>
              <div className="switch">
                <GreenSwitch
                  checked={certificateId}
                  name="certificateId"
                  onChange={(e) => setCertificateId(e.target.checked)}
                  defaultChecked
                />
              </div>
            </div>
            <div className="control-panel-switch">
              <label>Issue Date</label>
              <div className="switch">
                <GreenSwitch
                  checked={issueDate}
                  name="issueDate"
                  onChange={(e) => setIssueDate(e.target.checked)}
                  defaultChecked
                />
              </div>
            </div>
            <div className="control-panel-switch">
              <label>Expiry Date</label>
              <div className="switch">
                <GreenSwitch
                  checked={expiryDate}
                  name="expiryDate"
                  onChange={(e) => setExpiryDate(e.target.checked)}
                  defaultChecked
                />
              </div>
            </div>
            <div className="control-panel-switch">
              <label>Recipient Name</label>
              <div className="switch">
                <GreenSwitch
                  checked={recipientName}
                  name="recipientName"
                  onChange={(e) => setRecipientName(e.target.checked)}
                  defaultChecked
                />
              </div>
            </div>
            <div className="control-panel-switch">
              <label>Recipient Email</label>
              <div className="switch">
                <GreenSwitch
                  checked={recipientEmail}
                  name="recipientEmail"
                  onChange={(e) => setRecipientEmail(e.target.checked)}
                />
              </div>
            </div>

            {attributes
              ? attributes.map((data, index) => (
                  <div className="control-panel-switch">
                    <label key={index}>{data.data}</label>
                    <div className="switch">
                      <GreenSwitch
                        checked={data.toggle}
                        name="attributes"
                        onChange={(e) => handleToggle(index, e)}
                      />
                    </div>
                  </div>
                ))
              : null}

            <div className="control-panel-switch">
              <input
                type="file"
                accept=".csv"
                onChange={handleCSV}
                ref={csvRef}
                style={{ display: "none" }}
              />
              <Button
                className="SideBtnAtt"
                variant="primary"
                onClick={() => csvRef.current.click()}
              >
                Add Attributes
              </Button>
            </div>
          </Tab>

          {/*   tab for Is protected */}

          <Tab eventKey="protected" title="Is Protected?">
            <div className="control-panel-switch">
              <label>Issuer Name</label>
              <div className="switch">
                <GreenSwitch
                  checked={issuerNameProtected}
                  name="issuerName"
                  onChange={(e) => setIssuerNameProtected(e.target.checked)}
                  defaultChecked
                />
              </div>
            </div>
            <div className="control-panel-switch">
              <label>Issuer Email</label>
              <div className="switch">
                <GreenSwitch
                  checked={issuerEmailProtected}
                  name="issuerEmail"
                  onChange={(e) => setIssuerEmailProtected(e.target.checked)}
                  defaultChecked
                />
              </div>
            </div>
            <div className="control-panel-switch">
              <label>Certificate Id</label>
              <div className="switch">
                <GreenSwitch
                  checked={certificateIdProtected}
                  name="certificateId"
                  onChange={(e) => setCertificateIdProtected(e.target.checked)}
                  defaultChecked
                />
              </div>
            </div>
            <div className="control-panel-switch">
              <label>Issue Date</label>
              <div className="switch">
                <GreenSwitch
                  checked={issueDateProtected}
                  name="issueDate"
                  onChange={(e) => setIssueDateProtected(e.target.checked)}
                  defaultChecked
                />
              </div>
            </div>
            <div className="control-panel-switch">
              <label>Expiry Date</label>
              <div className="switch">
                <GreenSwitch
                  checked={expiryDateProtected}
                  name="expiryDate"
                  onChange={(e) => setExpiryDateProtected(e.target.checked)}
                  defaultChecked
                />
              </div>
            </div>
            <div className="control-panel-switch">
              <label>Recipient Name</label>
              <div className="switch">
                <GreenSwitch
                  checked={recipientNameProtected}
                  name="recipientName"
                  onChange={(e) => setRecipientNameProtected(e.target.checked)}
                  defaultChecked
                />
              </div>
            </div>
            <div className="control-panel-switch">
              <label>Recipient Email</label>
              <div className="switch">
                <GreenSwitch
                  checked={recipientEmailProtected}
                  name="recipientEmail"
                  onChange={(e) => setRecipientEmailProtected(e.target.checked)}
                />
              </div>
            </div>

            {attributes
              ? attributes.map((data, index) => (
                  <div className="control-panel-switch">
                    <label key={index}>{data.data}</label>
                    <div className="switch">
                      <GreenSwitch
                        checked={data.isProtected}
                        name="attributes"
                        onChange={(e) => handleToggleProtected(index, e)}
                      />
                    </div>
                  </div>
                ))
              : null}
          </Tab>
        </Tabs>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Enter Text</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <RadioGroup
              aria-label="gender"
              name="controlled-radio-buttons-group"
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              row
            >
              <FormControlLabel value="text" control={<Radio />} label="Text" />
              <FormControlLabel
                value="textArea"
                control={<Radio />}
                label="Text Area"
              />
            </RadioGroup>
            <Form onSubmit={handleText}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                {textValue == "text" ? (
                  <Form.Control
                    value={text}
                    placeholder="Enter text here"
                    onChange={(e) => setText(e.target.value)}
                  />
                ) : (
                  <Form.Control
                    as="textarea"
                    value={text}
                    placeholder="Enter text here"
                    onChange={(e) => setText(e.target.value)}
                  />
                )}
              </Form.Group>

              <Button variant="primary" type="submit">
                Add
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
);

export default SidebarEditor;
