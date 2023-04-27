import React, { useEffect, useState } from "react";
import "../../Assets/Styles/fontMaster.scss";
import { Card, Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Toast from "../../Component/Toast";
import Loader from "../../Component/Loader";
import axios from "axios";
import { uploadImage } from "../../Utililties/utilities";
import { useHistory } from "react-router-dom";
import { createFont } from "../../Redux/Actions/font.action";

const CreateFont = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const font = useSelector((state) => state.font);
  const [showLoader, setShowLoader] = useState(false);
  const [fontName, setFontName] = useState("");
  const [fontFile, setFontFile] = useState({});
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [errorFontName, setErrorFontName] = useState("");
  const [errorFontFile, setErrorFontFile] = useState("");
  const token = localStorage.getItem("token");
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    if (font.message) {
      history.push("/fontMaster");
    }
    if (font.error) {
    }
  }, [font.message, font.error]);
  useEffect(() => {
    if (font.loading) {
      setShowLoader(true);
    } else {
      setShowLoader(false);
    }
  }, [font.loading]);

  const onAdd = async (e) => {
    e.preventDefault();
    // to remove spaces in between the string 
    let newFontName = fontName.split(" ").join("");
    // console.log(newFontName);
    setMessage("");
    setError("");
    setErrorFontName("");
    setErrorFontFile("");
    if (newFontName) {
      if (flag === true) {
        setShowLoader(true);
        const fileUrl = await uploadImage(fontFile);
        let dataFont = {
          name: newFontName,
          url: encodeURI(fileUrl.location),
        };
        dispatch(createFont(dataFont));
        /*const res = await axios.post(
          `${BaseUrl}font-master/add`,
          {
            ...dataFont,
          },
          {
            headers: {
              authentication: `${token}`,
            },
          }
        );
        if (res.data.statusCode) {
          setShowLoader(false);
          setMessage(res.data.message);
        } else {
          setShowLoader(false);
          setError(res.data.message);
          setError(res.data.error);
        }*/
      } else {
        setErrorFontFile("Plaese select Font File..");
      }
    } else {
      setErrorFontName("Please enter Font Name");
    }
  };
  const handleFontFile = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setFontFile(file);
    setFlag(true);
  };
  return (
    <div>
      <Card>
        <Toast success={font.message} error={font.error} />
        <Loader showLoader={showLoader} />

        <Card.Header>
          <Card.Title as="h3">Add Custom Font</Card.Title>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={onAdd}>
            <Row>
              <Form.Group className="mb-3">
                <Form.Label>Font Name</Form.Label>
                <Form.Control
                  value={fontName}
                  placeholder="Enter font name"
                  onChange={(e) => setFontName(e.target.value)}
                />
                {errorFontName ? (
                  <p style={{ color: "#c94040" }}>{errorFontName}</p>
                ) : null}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Select Font File</Form.Label>
                <Form.Control
                  accept=".ttf,.otf,.fnt"
                  type="file"
                  onChange={handleFontFile}
                />
              </Form.Group>
              {errorFontFile ? (
                <p style={{ color: "#c94040" }}>{errorFontFile}</p>
              ) : null}
              <Form.Text>*please, only upload valid font file. </Form.Text>
            </Row>
            <br />
            <Button variant="primary" type="submit">
              Add Font
            </Button>
            <Button
              type="submit"
              variant="primary"
              onClick={() => history.push("/fontMaster")}
              style={{ float: "right" }}
            >
              Back
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CreateFont;
