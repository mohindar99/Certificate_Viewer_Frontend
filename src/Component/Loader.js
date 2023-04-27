import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import { Spinner } from "react-bootstrap";

const Loader = ({ showLoader }) => {
  const handleClose = () => {
    showLoader = false;
  };
  return (
    <div>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={showLoader}
        onClick={handleClose}
      >
        <Spinner
          animation="grow"
          variant="info"
          style={{ height: "60px", width: "60px" }}
        />
      </Backdrop>
    </div>
  );
};

export default Loader;
