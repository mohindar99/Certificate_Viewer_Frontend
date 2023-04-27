import React, { useEffect, useState } from "react"
import {
  FiAlignCenter,
  FiAlignLeft,
  FiAlignRight,
  FiAlignJustify,
  FiBold,
} from "react-icons/fi"
import { AiFillCopy, AiFillDelete } from "react-icons/ai"
import Slider from "@mui/material/Slider"
import "../../Assets/Styles/font.scss"
import { fontData, uploadImage } from "../../Utililties/utilities"
import Loader from "../Loader"
import Tooltip from "@mui/material/Tooltip"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import ButtonMui from '@mui/material/IconButton'

const TextPalette = ({ handleCopy, handleDelete, id, fontList }) => {
  const [color, setColor] = useState("")
  const [fontSize, setFontSize] = useState("")
  const [fontStyle, setFontStyle] = useState("")
  const [font, setFont] = useState("")
  const [rotate, setRotate] = useState("")
  const [show, setShow] = useState(false)
  const [showLoader, setShowLoader] = useState(false)
  const alignment = document.getElementById(id)?.style.textAlign
  const boldAlign = document.getElementById(id)?.style.fontWeight
  const [align, setAlign] = useState("")
  const [bold, setBold] = useState(false)
  useEffect(() => {
    if (id) {
      if (document.getElementById(id)) {
        setColor(document.getElementById(id).style.color);
        setFontSize(document.getElementById(id).style.fontSize);
        setFontStyle(document.getElementById(id).style.fontStyle);
        setFont(document.getElementById(id).style.fontFamily);
        setRotate(document.getElementById(id).style.transform);
      }
    }
  }, [id])

  useEffect(() => {
    if (alignment !== '' || alignment !== undefined) {
      setAlign(alignment);
    }
  }, [alignment]);

  // useEffect(() => {
  //   setAlign(alignment);
    
  // }, [alignment, document.getElementById(id).style.textAlign]);

  useEffect(() => {
    if (boldAlign === 'bold' || typeof parseInt(boldAlign) === 'number') {
      setBold(true)
    } else {
      setBold(false)
    }
  },[boldAlign]);

  useEffect(() => {
    if (id) {
      document.getElementById(id).style.fontFamily = font;
      document.getElementById(id).style.fontSize = fontSize + "px";
      document.getElementById(id).style.transform = "rotate(" + rotate + ")";
      document.getElementById(id).style.color = color;
      document.getElementById(id).style.fontStyle = fontStyle;
    }
  }, [color, fontSize, font, fontStyle, rotate]);

  useEffect(() => {
    if (bold) {
      document.getElementById(id).style.fontWeight = 'bold';
    } else {
      document.getElementById(id).style.fontWeight = 'normal';
    }
  },[bold]);

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      document.getElementById(id).style.textAlign = newAlignment;
      setAlign(newAlignment);
    }
  };

  return (
    <div className="textPalette">
      <Loader showLoader={showLoader} />

      <div className="upper">
        <div className="control">
          <h>Color</h>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <div className="control">
          <h>Rotation</h>
          <select
            name="rotation"
            id="rot"
            value={rotate}
            onChange={(e) => setRotate(e.target.value)}
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
          <h>Font Family</h>
          <select
            name="font"
            id="font"
            value={font}
            onChange={(e) => setFont(e.target.value)}
          >
            {fontData.map((data, index) => (
              <option key={`fontData-${index}`} value={data}>{data}</option>
            ))}
            <optgroup label="Custom Fonts"></optgroup>
            {fontList.map((data, index) => (
              <option key={`fontList-${index}`} value={data.name}>{data.name}</option>
            ))}
          </select>
        </div>
        <div className="control">
          <h>Font Style</h>
          <select
            name="rotation"
            id="rot"
            value={fontStyle}
            onChange={(e) => setFontStyle(e.target.value)}
          >
            <option value="italic">Italic</option>
            <option value="normal">Normal</option>
            <option value="oblique">Oblique</option>
          </select>
        </div>
        <div className="control">
          <h>Size</h>
          <div style={{ position: "", zIndex: "1000" }}>
            <Slider
              id="slider"
              aria-label="Temperature"
              defaultValue={10}
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              valueLabelDisplay="auto"
            />
          </div>
        </div>
      </div>
      <div className="lower">
        <div className="control">
          <ToggleButtonGroup
            value={align}
            exclusive
            onChange={handleAlignment}
            aria-label="device"
          >
            <ToggleButton value="center" className="tog-btn">
              <Tooltip title="Center" placement="top">
                <div>
                  <FiAlignCenter className="icons" />
                </div>
              </Tooltip>
            </ToggleButton>

            <ToggleButton value="justify" className="tog-btn">
              <Tooltip title="Justify" placement="top">
                <div>
                  <FiAlignJustify className="icons" />
                </div>
              </Tooltip>
            </ToggleButton>

            <ToggleButton value="left" className="tog-btn">
              <Tooltip title="Left" placement="top">
                <div>
                  <FiAlignLeft className="icons" />
                </div>
              </Tooltip>
            </ToggleButton>

            <ToggleButton value="right" className="tog-btn">
              <Tooltip title="Right" placement="top">
                <div>
                  <FiAlignRight className="icons" />
                </div>
              </Tooltip>
            </ToggleButton>
          </ToggleButtonGroup>
          <Tooltip title="Bold" placement="top">
            <ToggleButton
              value="check"
              className="tog-btn"
              selected={bold}
              onClick={() =>setBold(!bold)}>
              <FiBold className="icons" />
            </ToggleButton>
          </Tooltip>
        <ButtonMui className="tog-btn"><Tooltip title="Copy" placement="top">
            <div><AiFillCopy className="icons" onClick={() => handleCopy(id)} /></div>
          </Tooltip></ButtonMui>
          <ButtonMui className="tog-btn">
          <Tooltip title="Delete" placement="top">
            <div>
              <AiFillDelete className="icons" onClick={() => handleDelete(id)}/>
            </div>
          </Tooltip>
          </ButtonMui>
         
        </div>
      </div>
    </div>
  );
};

export default TextPalette;
