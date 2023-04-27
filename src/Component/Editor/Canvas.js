import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import "../../Assets/Styles/canvas.scss";
import { Rnd } from "react-rnd";
import "../../Assets/Styles/font.scss";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import TextPalette from "./TextPalette";
import ImagePalette from "./ImagePalette";
import { BaseUrl } from "../../Utililties/Config";
import axios from "axios";
const Canvas = ({
  dataCanvas,
  copyText,
  deleteText,
  copyImage,
  deleteImage,
  dataCords,
  certificate,
  dataToSideBar,
}) => {
  const [heightSize, setHeight] = useState("");
  const [widthSize, setWidth] = useState("");
  const [value, setValue] = useState("image");
  const token = localStorage.getItem("token");
  const [id, setId] = useState("");
  const [type, setType] = useState("");
  const history = useHistory();
  const [dataArray, setDataArray] = useState([]);
  const [fontList, setFontList] = useState([]);
  const [arr, setArr] = useState([]);
  const [issuerNameProtected, setIssuerNameProtected] = useState(false);
  const [issuerEmailProtected, setIssuerEmailProtected] = useState(false);
  const [certificateIdProtected, setCertificateIdProtected] = useState(false);
  const [issueDateProtected, setIssueDateProtected] = useState(false);
  const [expiryDateProtected, setExpiryDateProtected] = useState(false);
  const [recipientEmailProtected, setRecipientEmailProtected] = useState(false);
  const [recipientNameProtected, setRecipientNameProtected] = useState(false);

  const [issuerName, setIssuerName] = useState([]);
  const [issuerEmail, setIssuerEmail] = useState([]);
  const [certificateId, setCertificateId] = useState([]);
  const [issueDate, setIssueDate] = useState([]);
  const [expiryDate, setExpiryDate] = useState([]);
  const [recipientName, setRecipientName] = useState([]);
  const [recipientEmail, setRecipientEmail] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [flag, setFlag] = useState(false);
  
  let testIssuerName = [];
  let testIssuerEmail = [];
  let testCertificateId = [];
  let testIssueDate = [];
  let testExpiryDate = [];
  let testRecipientName = [];
  let testRecipientEmail = [];

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const data = id.replace(/\d+/g, "");

    switch (data) {
      case "issuerNameId":
        const listIN = [...issuerName];
        listIN[index][name] = value;
        setIssuerName(listIN);
        break;
      case "issuerEmailId":
        const listIE = [...issuerEmail];
        listIE[index][name] = value;
        setIssuerEmail(listIE);
        break;
      case "certificateIdId":
        const listCI = [...certificateId];
        listCI[index][name] = value;
        setCertificateId(listCI);
        break;
      case "issueDateId":
        const listID = [...issueDate];
        listID[index][name] = value;
        setIssueDate(listID);
        break;
      case "expiryDateId":
        const listED = [...expiryDate];
        listED[index][name] = value;
        setExpiryDate(listED);
        break;
      case "recipientNameId":
        const listRN = [...recipientName];
        listRN[index][name] = value;
        setRecipientName(listRN);
        break;
      case "recipientEmailId":
        const listRE = [...recipientEmail];
        listRE[index][name] = value;
        setRecipientEmail(listRE);
        break;
      case "attributeId":
        const att = [...attributes];
        att[index][name] = value;
        setAttributes(att);
        break;
      default:
        break;
    }
  };
  const canvasRef = useRef();

  //loading font from font master API
  useEffect(() => {
    const fetch = async () => {
      let dataFont = {
        pageNo: 1,
        limit: 1000,
      };
      const res = await axios.post(
        `${BaseUrl}font-master/list`,
        {
          ...dataFont,
        },
        {
          headers: {
            authentication: `${token}`,
          },
        }
      );
      if (res.data.statusCode === 200) {
        const fontData = res.data.data;
        setFontList(fontData);
        fontData.map(async (data) => {
          const font = new FontFace(data.name, `url(${data.url})`);
          await font.load();
          document.fonts.add(font);
        });
      }
    };
    fetch();
  }, []);

  // set prevalues from the values cominng from side editor panel
  useEffect(() => {
    if (dataCanvas) {
      if (dataCanvas.paper === "A4") {
        if (dataCanvas.Orient === "LandScape") {
          setWidth("11.7in");
          setHeight("8.3in");
        }
        if (dataCanvas.Orient === "Portrait") {
          setWidth("8.3in");
          setHeight("11.7in");
        }
      }
      if (dataCanvas.paper === '8.5" x 11"') {
        if (dataCanvas.Orient === "LandScape") {
          setWidth("11in");
          setHeight("8.5in");
        }
        if (dataCanvas.Orient === "Portrait") {
          setWidth("8.5in");
          setHeight("11in");
        }
      }
      if (dataCanvas.paper === '9" x 12"') {
        if (dataCanvas.Orient === "LandScape") {
          setWidth("12in");
          setHeight("9in");
        }
        if (dataCanvas.Orient === "Portrait") {
          setWidth("9in");
          setHeight("12in");
        }
      }
      if (dataCanvas.paper === '9.5" x 12.5"') {
        if (dataCanvas.Orient === "LandScape") {
          setWidth("12.5in");
          setHeight("9.5in");
        }
        if (dataCanvas.Orient === "Portrait") {
          setWidth("9.5in");
          setHeight("12.5in");
        }
      }
      if (dataCanvas.paper === '11" x 14"') {
        if (dataCanvas.Orient === "LandScape") {
          setWidth("14in");
          setHeight("11in");
        }
        if (dataCanvas.Orient === "Portrait") {
          setWidth("11in");
          setHeight("14in");
        }
      }

      if (dataCanvas.attributes) {
        let att = [];
        dataCanvas.attributes.map((data) => {
          if (data.toggle === true) {
            att.push({ attributeName: data.data });
          }
        });
        setAttributes(att);
      }

      if (dataCanvas.bak) {
        canvasRef.current.style.background = `url(${dataCanvas.bak})`;
        canvasRef.current.style.backgroundSize = "cover";
        canvasRef.current.style.backgroundRepeat = "no-repeat";
      }

      if (dataCanvas.issuerNameProtected !== null) {
        setIssuerNameProtected(dataCanvas.issuerNameProtected);
      }

      if (dataCanvas.issuerEmailProtected !== null) {
        setIssuerEmailProtected(dataCanvas.issuerEmailProtected);
      }

      if (dataCanvas.certificateIdProtected !== null) {
        setCertificateIdProtected(dataCanvas.certificateIdProtected);
      }

      if (dataCanvas.issueDateProtected !== null) {
        setIssueDateProtected(dataCanvas.issueDateProtected);
      }

      if (dataCanvas.expiryDateProtected !== null) {
        setExpiryDateProtected(dataCanvas.expiryDateProtected);
      }

      if (dataCanvas.recipientNameProtected !== null) {
        setRecipientNameProtected(dataCanvas.recipientNameProtected);
      }

      if (dataCanvas.recipientEmailProtected !== null) {
        setRecipientEmailProtected(dataCanvas.recipientEmailProtected);
      }

      if (dataCanvas.issuerName === true) {
        if (issuerName.length === 0) {
          setIssuerName([...issuerName, { issuerNameId: "issuerName" }]);
        }
      } else {
        setIssuerName([]);
      }
      if (dataCanvas.issuerEmail === true) {
        if (issuerEmail.length === 0) {
          setIssuerEmail([...issuerEmail, { issuerEmailId: "issuerEmail" }]);
        }
      } else {
        setIssuerEmail([]);
      }
      if (dataCanvas.certificateId === true) {
        if (certificateId.length === 0) {
          setCertificateId([
            ...certificateId,
            { certificateIdId: "certificateId" },
          ]);
        }
      } else {
        setCertificateId([]);
      }
      if (dataCanvas.issueDate === true) {
        if (issueDate.length === 0) {
          setIssueDate([...issueDate, { issueDateId: "issueDate" }]);
        }
      } else {
        setIssueDate([]);
      }
      if (dataCanvas.expiryDate === true) {
        if (expiryDate.length === 0) {
          setExpiryDate([...expiryDate, { expiryDateId: "expiryDate" }]);
        }
      } else {
        setExpiryDate([]);
      }
      if (dataCanvas.recipientName === true) {
        if (recipientName.length === 0) {
          setRecipientName([
            ...recipientName,
            { recipientNameId: "recipientName" },
          ]);
        }
      } else {
        setRecipientName([]);
      }
      if (dataCanvas.recipientEmail === true) {
        if (recipientEmail.length === 0) {
          setRecipientEmail([
            ...recipientEmail,
            { recipientEmailId: "recipientEmail" },
          ]);
        }
      } else {
        setRecipientEmail([]);
      }
    }
  }, [dataCanvas]);

  useEffect(() => {
    if (certificate) {
      if (certificate.data) {
        setDataArray(certificate.data);
      }
    }
  }, [certificate]);
  ///get id and type from the jsx elements...

  const reflectData = () => {
    let Array = [];
    dataArray.map((data) => {
      const dataId = data.id.replace(/\d+/g, "");
      if (data.tagName === "INPUT") {
        if (dataId === "issuerNameId") {
          testIssuerName.push({ issuerNameId: data.value });
        }
        if (dataId === "issuerEmailId") {
          testIssuerEmail.push({ issuerEmailId: data.value });
        }
        if (dataId === "certificateIdId") {
          testCertificateId.push({ certificateIdId: data.value });
        }
        if (dataId === "issueDateId") {
          testIssueDate.push({ issueDateId: data.value });
        }
        if (dataId === "expiryDateId") {
          testExpiryDate.push({ expiryDateId: data.value });
        }
        if (dataId === "recipientNameId") {
          testRecipientName.push({ recipientNameId: data.value });
        }
        if (dataId === "recipientEmailId") {
          testRecipientEmail.push({ recipientEmailId: data.value });
        }
        if (dataId === "attributeId") {
          Array.push({ attributeName: data.value });
        }
      }
    });
    setIssuerName(testIssuerName);
    setIssuerEmail(testIssuerEmail);
    setCertificateId(testCertificateId);
    setIssueDate(testIssueDate);
    setExpiryDate(testExpiryDate);
    setRecipientName(testRecipientName);
    setRecipientEmail(testRecipientEmail);
    setAttributes(Array);
    return true;
  };
  useEffect(() => {
    if (dataArray) {
      async function fetchData() {
        const res = await reflectData();
        if (res === true) {
          setFlag(true);
        } else {
          alert(res);
        }
      }
      fetchData();
    }
  }, [dataArray]);

  /*const getCerticateElements = (mainDiv) => {
    let Ids = [];
    for (var i = 0; i < mainDiv.length; i++) {
      Ids.push(mainDiv[i].children[0].id);
    }

    for (var j = 0; j < dataArray.length; j++) {
      let data = document.getElementById(Ids[j]);
      let parentElement = document.getElementById(Ids[j]).parentElement;
      if (dataArray[j].tagName == "DIV") {
        data.style.color = dataArray[j].properties.color;
        data.style.transform = dataArray[j].properties.transform;
        data.style.fontFamily = dataArray[j].properties.fontFamily;
        data.style.fontStyle = dataArray[j].properties.fontStyle;
        data.style.fontSize = dataArray[j].properties.fontSize;
        data.style.fontWeight = dataArray[j].properties.fontWeight;
        data.style.textAlign = dataArray[j].properties.textAlign;
        parentElement.style.top = dataArray[j].properties.top;
        parentElement.style.left = dataArray[j].properties.left;
      }
      if (dataArray[j].tagName == "IMG") {
        if (dataArray[j].src === data.src) {
          data.style.transform = dataArray[j].properties.transform;
          data.style.height = dataArray[j].properties.height;
          data.style.width = dataArray[j].properties.width;
          parentElement.style.top = dataArray[j].properties.top;
          parentElement.style.left = dataArray[j].properties.left;
        }
      }
      if (dataArray[j].tagName == "INPUT") {
        if (dataArray[j].value === data.value) {
          data.style.background = "none";
          data.style.color = dataArray[j].properties.color;
          data.style.transform = dataArray[j].properties.transform;
          data.style.fontFamily = dataArray[j].properties.fontFamily;
          data.style.fontStyle = dataArray[j].properties.fontStyle;
          data.style.fontSize = dataArray[j].properties.fontSize;
          data.style.fontWeight = dataArray[j].properties.fontWeight;
          data.style.textAlign = dataArray[j].properties.textAlign;
          parentElement.style.top = dataArray[j].properties.top;
          parentElement.style.left = dataArray[j].properties.left;
        }
      }
    }
  };*/

  useEffect(() => {
    let Ids = [];
    for (var i = 0; i < arr.length; i++) {
      Ids.push(arr[i].children[0].id);
    }
    for (var j = 0; j < dataArray.length; j++) {
      let data = document.getElementById(Ids[j]);
      if (Ids[j]) {
        let parentElement = document.getElementById(Ids[j]).parentElement;
        if (dataArray[j].tagName === "DIV") {
          data.style.color = dataArray[j].properties.color;
          data.style.transform = dataArray[j].properties.transform;
          data.style.fontFamily = dataArray[j].properties.fontFamily;
          data.style.fontStyle = dataArray[j].properties.fontStyle;
          data.style.fontSize = dataArray[j].properties.fontSize;
          data.style.fontWeight = dataArray[j].properties.fontWeight;
          data.style.textAlign = dataArray[j].properties.textAlign;
          parentElement.style.top = dataArray[j].properties.top;
          parentElement.style.left = dataArray[j].properties.left;
        }
        if (dataArray[j].tagName === "IMG") {
          if (dataArray[j].src === data.src) {
            data.style.transform = dataArray[j].properties.transform;
            data.style.height = dataArray[j].properties.height;
            data.style.width = dataArray[j].properties.width;
            parentElement.style.top = dataArray[j].properties.top;
            parentElement.style.left = dataArray[j].properties.left;
          }
        }
        if (dataArray[j].tagName === "INPUT") {
          if (dataArray[j].value === data.value) {
            data.style.background = "none";
            data.style.color = dataArray[j].properties.color;
            data.style.transform = dataArray[j].properties.transform;
            data.style.fontFamily = dataArray[j].properties.fontFamily;
            data.style.fontStyle = dataArray[j].properties.fontStyle;
            data.style.fontSize = dataArray[j].properties.fontSize;
            data.style.fontWeight = dataArray[j].properties.fontWeight;
            data.style.textAlign = dataArray[j].properties.textAlign;
            parentElement.style.top = dataArray[j].properties.top;
            parentElement.style.left = dataArray[j].properties.left;
          }
        }
      }
    }
  }, [arr.length, dataArray]);

  useLayoutEffect(() => {
    if (flag === true) {
      async function fetchData() {
        const mainDiv = document.getElementById(
          "canvas-main-background"
        ).children;
        setArr(mainDiv);
        if (mainDiv.length > 1) {
          /*const res = await getCerticateElements(mainDiv);
          if (res === true) {
            let Ids = [];
            for (var i = 0; i < mainDiv.length; i++) {
              Ids.push(mainDiv[i].children[0].id);
            }
          }*/
        } else {
        }
      }
      fetchData();
    }
  }, [flag]);

  //handle get id and type
  const handleGetId = (id, type) => {
    setId(id);
    setType(type);
  };

  ///copying the particular element....

  const handleCopy = (id) => {
    if (type === "text") {
      const data = document.getElementById(id).innerText;
      copyText(data);
    }
    if (type === "image") {
      const data = document.getElementById(id).src;
      copyImage(data);
    }
    if (type === "input") {
      const data = id.replace(/\d+/g, "");
      const value = document.getElementById(id).value;

      switch (data) {
        case "issuerNameId":
          setIssuerName([...issuerName, { issuerNameId: value }]);
          break;
        case "issuerEmailId":
          setIssuerEmail([...issuerEmail, { issuerEmailId: value }]);
          break;
        case "certificateIdId":
          setCertificateId([...certificateId, { certificateIdId: value }]);
          break;
        case "issueDateId":
          setIssueDate([...issueDate, { issueDateId: value }]);
          break;
        case "exiryDateId":
          setExpiryDate([...expiryDate, { expiryDateId: value }]);
          break;
        case "recipientNameId":
          setRecipientName([...recipientName, { recipientNameId: value }]);
          break;
        case "recipientEmailId":
          setRecipientEmail([...recipientEmail, { recipientEmailId: value }]);
          break;
        case "attributeId":
          setAttributes([...attributes, { attributeName: value }]);
          break;
        default:
          break;
      }
    }
  };

  /// deleting the permanent element
  const handleDelete = (id) => {
    if (type === "text") {
      const data = id.slice(-1);
      deleteText(data);
    }
    if (type === "image") {
      const data = id.slice(-1);
      deleteImage(data);
    }
    if (type === "input") {
      const data = id.replace(/\d+/g, "");
      const index = id.slice(-1);

      switch (data) {
        case "issuerNameId":
          const listIN = [...issuerName];
          listIN.splice(index, 1);
          setIssuerName(listIN);
          break;
        case "issuerEmailId":
          const listIE = [...issuerEmail];
          listIE.splice(index, 1);
          setIssuerEmail(listIE);
          break;
        case "certificateIdId":
          const listCI = [...certificateId];
          listCI.splice(index, 1);
          setCertificateId(listCI);
          break;
        case "issueDateId":
          const listID = [...issueDate];
          listID.splice(index, 1);
          setIssueDate(listID);
          break;
        case "expiryDateId":
          const listED = [...expiryDate];
          listED.splice(index, 1);
          setExpiryDate(listED);
          break;
        case "recipientNameId":
          const listRN = [...recipientName];
          listRN.splice(index, 1);
          setRecipientName(listRN);
          break;
        case "recipientEmailId":
          const listRE = [...recipientEmail];
          listRE.splice(index, 1);
          setRecipientEmail(listRE);
          break;
        case "attributeId":
          const att = [...attributes];
          att.splice(index, 1);
          setAttributes(att);
          break;
        default:
          break;
      }
    }
  };

  //handle saving the design

  const handlePreview = async (e) => {
    e.preventDefault();

    var mainDiv = document.getElementById("canvas-main-background").children;
    var Ids = [];
    for (var i = 0; i < mainDiv.length; i++) {
      Ids.push(mainDiv[i].children[0].id);
    }
    let dataOfPage = [];
    var element = document.getElementById("canvas-main-background");

    dataOfPage.push({
      id: element.id,
      tagName: element.tagName,
      src: dataCanvas.bak,
      properties: {
        position: "relative",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: getComputedStyle(element).height,
        width: getComputedStyle(element).width,
        backgroundImage: "",
      },
    });

    for (var j = 0; j < Ids.length; j++) {
      var element = document.querySelector(`#${Ids[j]}`);

      var topValue =
        document.getElementById(Ids[j]).getBoundingClientRect().top -
        document.getElementById("canvas-main").getBoundingClientRect().top;
      var leftValue =
        document.getElementById(Ids[j]).getBoundingClientRect().left -
        document.getElementById("canvas-main").getBoundingClientRect().left;
      if (element.tagName === "INPUT") {
        let state = false;
        const data = Ids[j].replace(/\d+/g, "");
        switch (data) {
          case "issuerNameId":
            state = issuerNameProtected;
            break;

          case "issuerEmailId":
            state = issuerEmailProtected;
            break;

          case "certificateIdId":
            state = certificateIdProtected;
            break;

          case "issueDateId":
            state = issueDateProtected;
            break;

          case "expiryDateId":
            state = expiryDateProtected;
            break;

          case "recipientNameId":
            state = recipientNameProtected;
            break;

          case "recipientEmailId":
            state = recipientEmailProtected;
            break;
          case "attributeId":
            if (dataCanvas.attributes) {
              for (var k = 0; k < dataCanvas.attributes.length; k++) {
                if (element.value === dataCanvas.attributes[k].data) {
                  state = dataCanvas.attributes[k].isProtected;
                }
              }
            }
            break;
          default:
            break;
        }

        dataOfPage.push({
          id: Ids[j],
          tagName: element.tagName,
          value: element.value,
          isProtected: state,
          properties: {
            position: "absolute",
            background: "none",
            color: getComputedStyle(element).color,
            transform: getComputedStyle(element).transform,
            fontFamily: getComputedStyle(element).fontFamily,
            fontSize: getComputedStyle(element).fontSize,
            fontStyle: getComputedStyle(element).fontStyle,
            textAlign: getComputedStyle(element).textAlign,
            fontWeight: getComputedStyle(element).fontWeight,
            top: topValue + "px",
            left: leftValue + "px",
          },
        });
      }
      if (element.tagName === "DIV") {
        dataOfPage.push({
          id: Ids[j],
          tagName: element.tagName,
          value: element.innerHTML,
          properties: {
            position: "absolute",
            background: "none",
            color: getComputedStyle(element).color,
            transform: getComputedStyle(element).transform,
            fontFamily: getComputedStyle(element).fontFamily,
            fontSize: getComputedStyle(element).fontSize,
            fontStyle: getComputedStyle(element).fontStyle,
            textAlign: getComputedStyle(element).textAlign,
            fontWeight: getComputedStyle(element).fontWeight,
            whiteSpace: "pre-wrap",
            top: topValue + "px",
            left: leftValue + "px",
          },
        });
      }

      if (element.tagName === "IMG") {
        dataOfPage.push({
          id: Ids[j],
          tagName: element.tagName,
          src: element.src,
          properties: {
            position: "absolute",
            height: getComputedStyle(element).height,
            width: getComputedStyle(element).width,
            transform: getComputedStyle(element).transform,
            top: topValue + "px",
            left: leftValue + "px",
          },
        });
      }
    }

    // for (let i = 0; i < dataOfPage.length; i++) {
    //   if (dataOfPage[i].id === "canvas-main-background") {
    //     dataOfPage[i]["src"] = dataCanvas.bak;
    //   }
    // }
    dataCords(dataOfPage);
  };

  return (
    <div className="canvas">
      {dataCanvas.paper} {dataCanvas.Orient}
      <div className="palette">
        {value === "text" || value === "input" ? (
          <TextPalette
            fontList={fontList}
            handleCopy={handleCopy}
            handleDelete={handleDelete}
            id={id}
          />
        ) : (
          <ImagePalette
            handleCopy={handleCopy}
            handleDelete={handleDelete}
            id={id}
          />
        )}
      </div>
      <div className="canvas-main_container">
        <div
          className="canvas-control"
          id="canvas-main"
          style={{ height: heightSize, width: widthSize }}
        >
          <div
            ref={canvasRef}
            style={{
              height: heightSize,
              position: "relative",
              width: widthSize,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
            id="canvas-main-background"
          >
            {dataCanvas.text
              ? dataCanvas.text.map((text, index) => (
                  <Rnd
                    className="divDragInput"
                    bounds="parent"
                    onClick={() => setValue("text")}
                    key={"text" + index}
                  >
                    <div
                      onClick={() => handleGetId("text" + index, "text")}
                      id={`text${index}`}
                      className="textDiv"
                    >
                      {text}
                    </div>
                  </Rnd>
                ))
              : null}
            {dataCanvas.image
              ? dataCanvas.image.map((image, index) => (
                  <Rnd
                    className="divDrag"
                    onClick={() => setValue("image")}
                    bounds="parent"
                    key={"image" + index}
                  >
                    <img
                      style={{ height: 200 + "px", width: 200 + "px" }}
                      onClick={() => handleGetId("image" + index, "image")}
                      id={`image${index}`}
                      src={`${image}`}
                      alt="logoImg"
                    />
                  </Rnd>
                ))
              : null}
            {dataCanvas.issuerName === true
              ? issuerName.map((data, index) => (
                  <Rnd
                    className={"divDragInput text" + index}
                    style={{ height: "fit-content", width: "fit-content" }}
                    bounds="parent"
                    onClick={() => setValue("input")}
                    key={"data" + index}
                  >
                    <input
                      style={{ height: "fit-content", width: "fit-content" }}
                      type="text"
                      onClick={() =>
                        handleGetId("issuerNameId" + index, "input")
                      }
                      id={"issuerNameId" + index}
                      name="issuerNameId"
                      value={data.issuerNameId}
                      onChange={(e) => handleChange(index, e)}
                      className="attribute"
                    />
                  </Rnd>
                ))
              : null}
            {dataCanvas.issuerEmail === true
              ? issuerEmail.map((data, index) => (
                  <Rnd
                    style={{ height: "fit-content", width: "fit-content" }}
                    bounds="parent"
                    className="divDragInput"
                    onClick={() => setValue("input")}
                    key={"data" + index}
                  >
                    <input
                      onClick={() =>
                        handleGetId("issuerEmailId" + index, "input")
                      }
                      style={{ height: "fit-content", width: "fit-content" }}
                      id={"issuerEmailId" + index}
                      name="issuerEmailId"
                      value={data.issuerEmailId}
                      onChange={(e) => handleChange(index, e)}
                      className="attribute"
                    />
                  </Rnd>
                ))
              : null}
            {dataCanvas.certificateId === true
              ? certificateId.map((data, index) => (
                  <Rnd
                    style={{ height: "fit-content", width: "fit-content" }}
                    bounds="parent"
                    className="divDragInput"
                    onClick={() => setValue("input")}
                    key={"data" + index}
                  >
                    <input
                      onClick={() =>
                        handleGetId("certificateIdId" + index, "input")
                      }
                      style={{ height: "fit-content", width: "fit-content" }}
                      name="certificateIdId"
                      id={"certificateIdId" + index}
                      value={data.certificateIdId}
                      onChange={(e) => handleChange(index, e)}
                      className="attribute"
                    />
                  </Rnd>
                ))
              : null}
            {dataCanvas.issueDate === true
              ? issueDate.map((data, index) => (
                  <Rnd
                    style={{ height: "fit-content", width: "fit-content" }}
                    bounds="parent"
                    className="divDragInput"
                    onClick={() => setValue("input")}
                    key={"data" + index}
                  >
                    <input
                      onClick={() =>
                        handleGetId("issueDateId" + index, "input")
                      }
                      style={{ height: "fit-content", width: "fit-content" }}
                      name="issueDateId"
                      id={"issueDateId" + index}
                      value={data.issueDateId}
                      onChange={(e) => handleChange(index, e)}
                      className="attribute"
                    />
                  </Rnd>
                ))
              : null}
            {dataCanvas.expiryDate === true
              ? expiryDate.map((data, index) => (
                  <Rnd
                    style={{ height: "fit-content", width: "fit-content" }}
                    bounds="parent"
                    className="divDragInput"
                    onClick={() => setValue("input")}
                    key={"data" + index}
                  >
                    <input
                      style={{ height: "fit-content", width: "fit-content" }}
                      onClick={() =>
                        handleGetId("expiryDateId" + index, "input")
                      }
                      name="expiryDateId"
                      id={"expiryDateId" + index}
                      value={data.expiryDateId}
                      onChange={(e) => handleChange(index, e)}
                      className="attribute"
                    />
                  </Rnd>
                ))
              : null}
            {dataCanvas.recipientName === true
              ? recipientName.map((data, index) => (
                  <Rnd
                    style={{ height: "fit-content", width: "fit-content" }}
                    bounds="parent"
                    className="divDragInput"
                    onClick={() => setValue("input")}
                    key={"data" + index}
                  >
                    <input
                      style={{ height: "fit-content", width: "fit-content" }}
                      onClick={() =>
                        handleGetId("recipientNameId" + index, "input")
                      }
                      name="recipientNameId"
                      id={"recipientNameId" + index}
                      value={data.recipientNameId}
                      onChange={(e) => handleChange(index, e)}
                      className="attribute"
                    />
                  </Rnd>
                ))
              : null}
            {dataCanvas.recipientEmail === true
              ? recipientEmail.map((data, index) => (
                  <Rnd
                    style={{ height: "fit-content", width: "fit-content" }}
                    bounds="parent"
                    className="divDragInput"
                    onClick={() => setValue("input")}
                    key={"data" + index}
                  >
                    <input
                      style={{ height: "fit-content", width: "fit-content" }}
                      onClick={() =>
                        handleGetId("recipientEmailId" + index, "input")
                      }
                      name="recipientEmailId"
                      id={"recipientEmailId" + index}
                      value={data.recipientEmailId}
                      onChange={(e) => handleChange(index, e)}
                      className="attribute"
                    />
                  </Rnd>
                ))
              : null}

            {attributes
              ? attributes.map((data, index) => (
                  <Rnd
                    style={{ height: "fit-content", width: "fit-content" }}
                    bounds="parent"
                    className="divDragInput"
                    onClick={() => setValue("input")}
                    key={"data" + index}
                  >
                    <input
                      onClick={() =>
                        handleGetId("attributeId" + index, "input")
                      }
                      style={{ height: "fit-content", width: "fit-content" }}
                      name="attributeName"
                      id={"attributeId" + index}
                      value={data.attributeName}
                      onChange={(e) => handleChange(index, e)}
                      className="attribute"
                    />
                  </Rnd>
                ))
              : null}
          </div>
        </div>
      </div>
      <Button style={{ marginTop: "10px" }} onClick={(e) => handlePreview(e)}>
        Save Design
      </Button>
      <Button
        type="submit"
        variant="primary"
        onClick={() => history.push("/certificate")}
        style={{ float: "right", marginTop: "10px" }}
      >
        Back
      </Button>
    </div>
  );
};

export default Canvas;
