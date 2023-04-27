import moment from "moment";
import S3FileUpload from "react-s3";
const config = {
  bucketName: process.env.REACT_APP_BUCKET_NAME,
  region: process.env.REACT_APP_REGION,
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
};

const alphaOnly = (event) => {
  if (!/^[a-z A-Z]*$/.test(event.key)) {
    // alert("Please enter alphabet only");
    event.preventDefault();
  }
};

const alphaNumOnly = (event) => {
  if (/[^0-9a-zA-Z]/.test(event.key)) {
    event.preventDefault();
  }
};

const objectHasKey = (obj, key) => {
  if (
    obj !== undefined &&
    obj !== null &&
    Object.keys(obj).length > 0 &&
    obj.hasOwnProperty(key)
  ) {
    return true;
  }
  return false;
};

const objectHasKeys = (obj) => {
  if (obj !== undefined && obj !== null && Object.keys(obj).length > 0) {
    return true;
  }
  return false;
};

const arrayNotNull = (array) => {
  if (
    array !== undefined &&
    array !== null &&
    Array.isArray(array) &&
    array.length > 0
  ) {
    return true;
  }
  return false;
};

const notNull = (data) => {
  if (data !== undefined && data !== null && data !== "") {
    return true;
  }
  return false;
};

const defaultDate = (date) => {
  return moment(date).format("DD/MM/YYYY");
};

const defaultDateTime = (date) => {
  return moment(date).format("DD/MM/YYYY: hh:mm A");
};

const uploadImage = async (image) => {
  let uploadedUrl;
  try {
    uploadedUrl = await S3FileUpload.uploadFile(image, config);
  } catch (error) {}
  return uploadedUrl;
};

const globalSearch = (dataList, searchItem) => {
  let filterData;
  if (dataList && searchItem !== "") {
    let filteredData = dataList.filter((data) => {
      let retData;
      if (data.name) {
        if (data.name.toLowerCase().includes(searchItem.toLowerCase())) {
          retData = data;
        }
      } else if (data.recipientData) {
        if (
          data.recipientData.name
            .toLowerCase()
            .includes(searchItem.toLowerCase())
        ) {
          retData = data;
        }
      }
      return retData;
    });
    filterData = filteredData;
  } else {
    filterData = null;
  }
  return filterData;
};

export const getDate = (d) => {
  if (d) {
    var day, month, year;
    let result,
      dateSplitted,
      aux = "";
    result = d.match("[0-9]{2}([-/ .])[0-9]{2}[-/ .][0-9]{4}");
    if (null != result) {
      dateSplitted = result[0].split(result[1]);
      day = dateSplitted[0];
      month = dateSplitted[1];
      year = dateSplitted[2];
    }
    result = d.match("[0-9]{4}([-/ .])[0-9]{2}[-/ .][0-9]{2}");
    if (null != result) {
      dateSplitted = result[0].split(result[1]);
      day = dateSplitted[2];
      month = dateSplitted[1];
      year = dateSplitted[0];
    }

    if (month > 12) {
      aux = day;
      day = month;
      month = aux;
    }

    return day + "/" + month + "/" + year;
  }
};
export {
  alphaNumOnly,
  alphaOnly,
  objectHasKey,
  objectHasKeys,
  arrayNotNull,
  notNull,
  defaultDate,
  defaultDateTime,
  globalSearch,
  uploadImage,
};
export const fontData = [
  "Arial",
  "Arial Black",
  "Bradley Hand ITC",
  "Bahnschrift",
  "Calibri",
  "Cambria",
  "Cambria Math",
  "Candara",
  "Comic Sans MS",
  "Consolas",
  "Constantia",
  "Corbel",
  "Courier New",
  "Ebrima",
  "Franklin Gothic Medium",
  "Gabriola",
  "Georgia",
  "HoloLens MDL2 Assets",
  "Impact",
  "Ink Free",
  "Javanese Text",
  "Leelawadee UI",
  "Lucida Console",
  "Lucida Sans Unicode",
  "Malgun Gothic",
  "Nirmala UI",
  "Palatino Linotype",
  "Segoe MDL2 Assets",
  "Segoe Print",
  "Segoe Script",
  "Segoe UI",
  "Segoe UI Historic",
  "Segoe UI Emoji",
  "Segoe UI Symbol",
  "Sitka",
  "Sylfaen",
  "Symbol",
  "Tahoma",
  "Times New Roman",
  "Trebuchet MS",
  "Verdana",
];
