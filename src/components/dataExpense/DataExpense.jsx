import "./dataexpense.scss";
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../dataPermission";
import { useState, useEffect, useCallback } from "react";
import Modal from "../../pages/addpermission/Modal";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";
import Select from "react-select";
import WorkerService from "../../service/WorkerService";
import Cookies from "js-cookie";
import PermissionService from "../../service/PermissionService";
import { useDropzone } from "react-dropzone";
import pdfIcon from "../../assets/pdfIcon.png";
const DataExpense = () => {
  const token = Cookies.get("token");
  const [worker, setWorker] = useState({});
  const [images, setImages] = useState([]);
  const [value, setValue] = useState(0);
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("");

  const [permission, setPermission] = useState({
    managerid: "",
    workerid: "",
    typeOfPermit: "",
    startDate: "",
    endDate: "",
    numberOfDays: "",
    name: "",
    surname: "",
  });

  const [listPermission, setListPermission] = useState([
    {
      id: "",
      managerid: "",
      workerid: "",
      typeOfPermit: "",
      startDate: "",
      endDate: "",
      numberOfDays: "",
      replyDate: "",
      approvalStatus: "",
    },
  ]);
  useEffect(() => {
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
      .then((response) => response.json())
      .then((data) => {
        setCurrencies(Object.keys(data.rates));
      })
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    WorkerService.getInfoForWorker(token).then((response) => {
      console.log(response);
      setWorker({ ...worker, ...response.data });
    });
  }, []);
  useEffect(() => {
    if (worker.managerid && worker.id) {
      setPermission((prevPermission) => ({
        ...prevPermission,
        managerid: worker.managerid,
        workerid: worker.id,
        name: worker.name,
        surname: worker.surname,
      }));
    }
  }, [worker]);
  useEffect(() => {
    PermissionService.getPermissionForWorker(worker.id).then((response) => {
      setListPermission([...response.data]);
    });
    return () => {
      console.log("useEffect clean-up");
    };
  }, [worker]);

  const [show, setShow] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const options = [
    { value: "ABROAD", label: "Abroad" },
    { value: "DOMESTIC", label: "Domestic" },
    { value: "FOOD", label: "Food" },
    { value: "ACCOMMODATION", label: "Accommadation" },
  ];

  const showModal = () => {
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(permission);
    PermissionService.createPermission(permission).then(
      () => {
        alert("başarılı");
        window.location.replace("/permission");
      },
      () => {}
    );
    hideModal();
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (images.length + acceptedFiles.length > 5) {
        alert("You can select 5 files in total.");
        return;
      }
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onabort = () => console.log("Dosya okuma iptal edildi");
        reader.onerror = () => console.log("Dosya okuma hatalı");
        reader.onload = () => {
          const imgSrc = reader.result;
          setImages((oldImages) => [
            ...oldImages,
            { preview: imgSrc, name: file.name, type: file.type },
          ]);
        };
        reader.readAsDataURL(file);
      });
    },
    [images]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*,application/pdf",
    multiple: true,
  });

  const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: "2px",
    borderColor: "#eeeeee",
    borderStyle: "dashed",
    backgroundColor: "#fafafa",
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
    width: "386px",
  };

  const activeStyle = {
    borderColor: "#2196f3",
  };

  const style = isDragActive ? { ...baseStyle, ...activeStyle } : baseStyle;

  return (
    <div className="datatablee">
      <button
        className="button-data-permission"
        type="button"
        onClick={showModal}
      >
        Add Expense
      </button>
      <DataGrid
        className="datagrid"
        rows={listPermission}
        columns={userColumns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 6,
            },
          },
        }}
        pageSizeOptions={[7]}
        rowHeight={100}
      />
      <Modal show={show} handleClose={hideModal} onSubmit={handleSubmit}>
        <h2 className="h2-modal">Send Expense Request</h2>

        <div className="modalForm">
          <label className="modalForm-label">Reason For Expense</label>
          <Select
            defaultValue={selectedOption}
            onChange={(e) =>
              setPermission({
                ...permission,
                typeOfPermit: e.value,
              })
            }
            options={options}
            className="select-modal"
          />
        </div>
        <div className="modalForm">
          <label className="modalForm-label">Description</label>
          <textarea className="textAreaAdvance" cols="10" rows="3"></textarea>
        </div>
        <div className="modalForm">
          <label className="modalForm-label">Amount</label>
          <input
            type="number"
            style={{ width: "386px", lineHeight: "35px" }}
            min="0"
            value={value}
            onChange={handleInputChange}
          />
        </div>
        <div className="modalForm">
          <label className="modalForm-label">Currency</label>
          <select
            value={selectedCurrency}
            onChange={handleCurrencyChange}
            style={{
              width: "386px",
              fontSize: "12px",
              color: "gray",
              lineHeight: "35px",
            }}
          >
            <option
              value=""
              style={{ color: "gray", fontSize: "12px", lineHeight: "35px" }}
            >
              --Select a currency--
            </option>
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
          {selectedCurrency && <p>You have selected: {selectedCurrency}</p>}
        </div>
        <div className="modalForm">
          <label className="modalForm-label">Attach File </label>
          <div {...getRootProps({ style })}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Leave the files here...</p>
            ) : (
              <p>Drag and drop files into this area or click</p>
            )}
            <div>
              {images.map((file, index) =>
                file.type === "application/pdf" ? (
                  <div key={file.name}>
                    <a
                      href={file.preview}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(event) => event.stopPropagation()}
                    >
                      <img
                        src={pdfIcon}
                        alt="PDF icon"
                        style={{
                          maxWidth: "100px",
                          maxHeight: "100px",
                          objectFit: "contain",
                        }}
                      />
                    </a>
                  </div>
                ) : (
                  <a
                    href={file.preview}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <img
                      src={file.preview}
                      alt={`Preview ${index}`}
                      key={file.name}
                      style={{
                        maxWidth: "100px",
                        maxHeight: "100px",
                        objectFit: "contain",
                      }}
                    />
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DataExpense;
