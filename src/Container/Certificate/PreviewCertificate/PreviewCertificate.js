import React, { useEffect, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Button } from "react-bootstrap";
import "../../../Assets/Styles/Certificate.scss";
import axios from "axios";
import { useHistory, Redirect } from "react-router-dom";
import { BaseUrl } from "../../../Utililties/Config";
import Spinner from 'react-bootstrap/Spinner'

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

const PreviewCertificate = (props) => {
  const history = useHistory()
  const token = localStorage.getItem("token")
  const [downloadButtonDisabled, setDownloadButtonDisabled] = useState(false)


  useEffect(() => {
    const fetch = async () => {
      let dataFont = {
        pageNo: 1,
        limit: 1000,
      };
      const res = await axios.post(`${BaseUrl}font-master/list`,
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

        fontData.map(async (data) => {
          const font = new FontFace(data.name, `url(${data.url})`);
          await font.load();
          document.fonts.add(font);
        });
      }
    };
    fetch();
  }, []);
  

  // @update
  if(!props.location.state) {
    return <Redirect to={`/`} />
  }
  
  const { certificate } = props.location.state
  const { certName, data, organizationData } = certificate

  const getHightAndWidth = () => {
  if (certificate.format === "A4") {
    if (certificate.orientation === "LandScape") {
      const width = 11.7;
      const height = 8.3;
      return [width, height];
    }
    if (certificate.orientation === "Portrait") {
      const width = 8.3;
      const height = 11.7;
      return [width, height];
    }
  }
  if (certificate.format === '8.5" x 11"') {
    if (certificate.orientation === "LandScape") {
      const width = 11;
      const height = 8.5;
      return [width, height];
    }
    if (certificate.orientation === "Portrait") {
      const width = 8.5;
      const height = 11;
      return [width, height];
    }
  }
  if (certificate.format === '9" x 12"') {
    if (certificate.orientation === "LandScape") {
      const width = 12;
      const height = 9;
      return [width, height];
    }
    if (certificate.orientation === "Portrait") {
      const width = 9;
      const height = 12;
      return [width, height];
    }
  }
  if (certificate.format === '9.5" x 12.5"') {
    if (certificate.orientation === "LandScape") {
      const width = 12.5;
      const height = 9.5;
      return [width, height];
    }
    if (certificate.orientation === "Portrait") {
      const width = 9.5;
      const height = 12.5;
      return [width, height];
    }
  }
  if (certificate.format === '11" x 14"') {
    if (certificate.orientation === "LandScape") {
      const width = 14;
      const height = 11;
      return [width, height];
    }
    if (certificate.orientation === "Portrait") {
      const width = 11;
      const height = 14;
      return [width, height];
    }
  }
}
  
  const handleDownloadCertificate = async () => {
    setDownloadButtonDisabled(true)

    let input = document.getElementById(data[0].id)
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
    if (background_url) {
      input.style.backgroundImage = `url(${await toDataURL(input.style.backgroundImage.slice(5, -2))})`
    } else {
      // Need To Call ToDataURL To Stop CORS Issue...
      await toDataURL(process.env.REACT_APP_DOWNLOAD_URL)
      input.style.backgroundImage = ``
    }

    html2canvas(input, { allowTaint: true, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png")
      const [pdfWidth, pdfHeight] = getHightAndWidth()
      
      const pdf = new jsPDF({
        orientation: certificate.orientation.toLowerCase(),
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

  const ImagetoDataURL = (url) => {
    fetch(url, {
      mode: "no-cors",
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.blob())
      .then(
        (blob) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          })
      );
  };

  const renderDiv = () => {
    return data.map((data, index) => {
      if (data.tagName === "INPUT") {
        return (
          <div key={`input-preview-${index}`} style={data.properties} id={data.id}>
            {data.value}
          </div>
        );
      }
      if (data.tagName === "DIV" && data.id !== 'canvas-main-background') {
        return (
          <div key={`div-preview-${index}`} style={data.properties} id={data.id}>
            {data.value}
          </div>
        );
      }
      if (data.tagName === "IMG") {
        return (
          <img
            key={`image-preview-${index}`}
            style={data.properties}
            src={data.src}
            id={data.id}
            alt="certificateImages"
          />
        );
      }
    });
  };
  return (
    <div className="viewCert">
      <h3>Certificate Preview</h3>
      <div className="upper-panel">
        <div className="details">
          <div className="detail-control-left">
            <label>Name of organization:</label>
            <h>{organizationData[0].name}</h>
          </div>
          <div className="detail-control-right">
            <label>Name of Certificate:</label>
            <h>{certName}</h>
          </div>
        </div>
      </div>
      <div className="lower-panel">
        <div className="canvas-main_container" >
          <div style={data[0].properties} id={data[0].id}>
            {renderDiv()}
          </div>
        </div>
      </div>
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
      </Button>:
      <Button onClick={() => handleDownloadCertificate()} variant="primary">
        Download
      </Button>}
      <Button
        type="submit"
        variant="primary"
        onClick={() => history.push("/certificate")}
        style={{ float: "right" }}
      >
        Back
      </Button>
    </div>
  )
};

export default PreviewCertificate;