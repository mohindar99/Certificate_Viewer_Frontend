import React, { useState, useEffect } from "react";
import { uploadImage } from "../Utililties/utilities";

const POC = () => {
  const [file, setFile] = useState({});
  const [url, setUrl] = useState("");
  const [data, setData] = useState({});
  useEffect(() => {
    if (file) {
      async function fetch() {
        const url = await uploadImage(file);
        setUrl(url.location);
      }
      fetch();
    }
  }, [file]);
  useEffect(() => {
    async function fetch() {
      const font = new FontFace("Flow Circular", `url(${url})`);
      await font.load();
      document.fonts.add(font);
      setData({
        fontFamily: "Flow Circular",
      });
    }
    fetch();
  }, [url]);
  const handle = (e) => {
    e.preventDefault();
    e.preventDefault();
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.onload = function () {
    };
    fileReader.readAsDataURL(file);
    setFile(file);
  };
  return (
    <div>
      <input type="file" onChange={handle} />
      <h1 style={data}>font sample to display</h1>
    </div>
  );
};

export default POC;
