import React, { useState, useEffect } from "react";
import { CgEditFlipH, CgEditFlipV } from "react-icons/cg";
import { AiFillCopy, AiFillDelete } from "react-icons/ai";
import Tooltip from '@mui/material/Tooltip';
// import ToggleButton from '@mui/material/ToggleButton';

const ImagePalette = ({ handleCopy, handleDelete, id }) => {
  const [photoHeight, setPhotoHeight] = useState("");
  const [photoWidth, setPhotoWidth] = useState("");
  const [rotatePhoto, setRotatePhoto] = useState("");
  // const [hFlip, setHFlip] = useState(false)
  

  useEffect(() => {
    if (id) {
      if (document.getElementById(id)) {
        setPhotoHeight(document.getElementById(id).style.height);
        setPhotoWidth(document.getElementById(id).style.width);
        setRotatePhoto(document.getElementById(id).style.transform);
      }
    }
    
  }, [id]);
 
  useEffect(() => {
    if (id) {
      document.getElementById(id).style.width = photoWidth + "px";
      document.getElementById(id).style.height = photoHeight + "px";
      document.getElementById(id).style.transform =
        "rotate(" + rotatePhoto + ")";
    }
  }, [photoHeight, photoWidth, rotatePhoto]);
  
  return (
    <div className="textPalette">
      <div className="upper">
        <div className="control">
          <h>Height</h>
          <input
            style={{ marginLeft: "5px" }}
            value={photoHeight}
            onChange={(e) => setPhotoHeight(e.target.value)}
          />
        </div>
        <div className="control">
          <h>Width</h>
          <input
            style={{ marginLeft: "5px" }}
            value={photoWidth}
            onChange={(e) => setPhotoWidth(e.target.value)}
          />
        </div>
        <div className="control">
          <h>Rotation</h>
          <select
            name="rotation"
            id="rot"
            value={rotatePhoto}
            onChange={(e) => setRotatePhoto(e.target.value)}
          >
            <option value="0deg">0°</option>
            <option value="45deg">45°</option>
            <option value="90deg">90°</option>
            <option value="130deg">135°</option>
            <option value="180deg">180°</option>
            <option value="225deg">225°</option>
            <option value="270deg">270°</option>
            <option value="315deg">315°</option>
            <option value="360deg">360°</option>
          </select>
        </div>
        <div className="control">
        <Tooltip title="Horizontal flip" placement="top">
            <div>
            <CgEditFlipH
            className="icons"
            onClick={() =>
              (document.getElementById(id).style.transform = "scaleX(-1)")
            }
          />
           </div>
          </Tooltip>
          <Tooltip title="Vertical flip" placement="top">
            <div>
            <CgEditFlipV
            className="icons"
            onClick={() =>
              (document.getElementById(id).style.transform = "scaleY(-1)")
            }
          /></div></Tooltip>
          <Tooltip title="Copy" placement="top">
            <div><AiFillCopy className="icons" onClick={() => handleCopy(id)} /></div></Tooltip>
          
          <Tooltip title="Delete" placement="top">
            <div><AiFillDelete className="icons" onClick={() => handleDelete(id)} /></div></Tooltip>
          
        </div>
        <div>
          <p style={{ color: "red" }}>
            * please enter height and width without "px"
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImagePalette;
