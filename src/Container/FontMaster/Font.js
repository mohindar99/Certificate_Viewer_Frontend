import React, { useEffect, useState } from "react";
import { Modal, Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { HiBan } from "react-icons/hi";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import { fontList, fontDelete, ResetFont } from "../../Redux/Actions/font.action";
import Loader from "../../Component/Loader";
import Toast from "../../Component/Toast";
import Tooltip from '@mui/material/Tooltip';

const Font = () => {
  const [limit, setLimit] = useState(5);
  const [pageNo, setPageNo] = useState(1);
  const dispatch = useDispatch();
  const history = useHistory();
  const font = useSelector((state) => state.font);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const lastPage = Math.ceil(total / limit);
  const [leftVis, setLeftVis] = useState(true);
  const [rightVis, setRightVis] = useState(true);
  const [show, setShow] = useState(false);
  const [fontData, setFontData] = useState({});
  const Data = font.fontList;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (font.message) {
      setTimeout(() => {
      dispatch(ResetFont())
      },1000)
    }
    if (font.error) {
      setTimeout(() => {
        dispatch(ResetFont())
        },1000)
    }
  }, [font])
  
  useEffect(() => {
    let data = {
      pageNo,
      limit,
    };
    dispatch(fontList(data));
  }, [pageNo, limit]);

  useEffect(() => {
    if (!font.loading) {
      setShowLoader(false);
    } else {
      setShowLoader(true);
    }
  }, [font.loading]);

  useEffect(() => {
    if (Data) {
      setList(Data);
    }
  }, [Data]);
  
  useEffect(() => {
    if (pageNo === 1) {
      if (pageNo === lastPage) {
        setLeftVis(false);
        setRightVis(false);
      } else {
        setLeftVis(false);
        setRightVis(true);
      }
    }
    if (pageNo > 1) {
      if (pageNo >= lastPage) {
        setRightVis(false);
        setLeftVis(true);
      }
    }
  }, [pageNo, lastPage]);
  useEffect(() => {
    if (font.paginationData) {
      setTotal(font.paginationData.total);
    }
  }, [font.paginationData]);

  const handleBackward = () => {
    setRightVis(true);
    setPageNo((prevState) => prevState - 1);
  };
  const handleForward = () => {
    setLeftVis(true);
    setPageNo((prevState) => prevState + 1);
  };
  const handleDelete = (data) => {
    setShow(true);
    setFontData(data);
  };
  const deleteFontItem = (id) => {
    dispatch(fontDelete(id));
    handleClose();
  };
  return (
    <div className="Org">
      <Toast success={font.message} error={font.error} />
      <Loader showLoader={showLoader} />

      <h3>Font Master</h3>
      <br />
      <div className="upper-panel">
        <div className="button-bar">
          <Button className="btn" onClick={() => history.push("/fontCreate")}>
            Add New Custom Font
          </Button>
        </div>
      </div>
      <div className="lower-panel">
        <div className="limit-div">
          <label>Limit of data to be display</label>
          <input
            type="number"
            min="1"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
          />
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Font Name</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {list?.length !==0 ? (
              list?.map((data, index) => (
                <tr key={index}>
                  <td>{data.name}</td>
                  <td>
                  <Tooltip title="Approvals" placement="top">
                      <div className="icon-div">
                      <HiBan
                      className="icon-action"
                      onClick={() => handleDelete(data)}
                    />
                         
                        </div>
                      </Tooltip>
                   
                  </td>
                </tr>
              ))
            ) : (
              <tr style={{width: '100%', textAlign: 'center'}}><td colSpan={3}>No data so currently nothing to display</td></tr>
            )}
          </tbody>
        </Table>
      </div>
      {list?.length !== 0 ? (<div className="btn-pag">
        <AiOutlineLeft
          className="btn-icon"
          visibility={leftVis ? "show" : "hidden"}
          onClick={() => handleBackward()}
        />
        Page {pageNo} - {lastPage}
        <AiOutlineRight
          className="btn-icon"
          visibility={rightVis ? "show" : "hidden"}
          onClick={() => handleForward()}
        />
      </div>) : null}

      {/* Modal for Add */}

      {/* Modal for delete */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete {fontData.name}?</Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleCloseDelete}>
      Close
    </Button> */}
          <Button variant="danger" onClick={() => deleteFontItem(fontData._id)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Font;
