import "./dataexpense.scss";
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../dataExpense";
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
import ExpenseService from "../../service/ExpenseService";
import { styled } from "@mui/system";
import axios from "axios";
const DataExpense = () => {
  const token = Cookies.get("token");
  const [worker, setWorker] = useState({});
  const [images, setImages] = useState([]);
  const [value, setValue] = useState(0);
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("");

  const [expense, setExpense] = useState({
    managerid: "",
    name: "",
    surname: "",
    workerid: "",
    expenditureType: "",
    amountOfExpenditure: "",
    currency: "",
    desc: "",
    file: [],
  });

  const [listPermission, setListPermission] = useState([
    {
      id: "",
      managerid: "",
      workerid: "",
      expenditureType: "",
      amountOfExpenditure: "",
      currency: "",
      replyDate: "",
      approvalStatus: "",
      file: [],
      requestDate: "",
      desc: "",
    },
  ]);
  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchCurrencies = async () => {
      try {
        const response = await axios.get(
          "https://api.exchangerate-api.com/v4/latest/USD",
          {
            cancelToken: source.token,
          }
        );
        setCurrencies(Object.keys(response.data.rates));
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          console.error(error);
        }
      }
    };

    fetchCurrencies();

    return () => {
      source.cancel();
    };
  }, []);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchWorkerInfo = async () => {
      try {
        const response = await WorkerService.getInfoForWorker(token, {
          cancelToken: source.token,
        });
        console.log(response);
        setWorker({ ...worker, ...response.data });
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          console.error(error);
        }
      }
    };

    fetchWorkerInfo();

    return () => {
      source.cancel();
    };
  }, []);

  useEffect(() => {
    if (worker.managerid && worker.id) {
      setExpense((prevExpense) => ({
        ...prevExpense,
        managerid: worker.managerid,
        workerid: worker.id,
        name: worker.name,
        surname: worker.surname,
      }));
    }
  }, [worker]);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchExpenses = async () => {
      try {
        const response = await ExpenseService.getallexpense(worker.id, {
          cancelToken: source.token,
        });
        const sortedPermissions = response.data.sort((a, b) => {
          if (
            a.approvalStatus === "PENDING_APPROVAL" &&
            b.approvalStatus !== "PENDING_APPROVAL"
          ) {
            return -1;
          }
          if (
            b.approvalStatus === "PENDING_APPROVAL" &&
            a.approvalStatus !== "PENDING_APPROVAL"
          ) {
            return 1;
          }
          return 0;
        });

        setListPermission([...response.data]);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          console.error(error);
        }
      }
    };

    if (worker.id) {
      fetchExpenses();
    }

    return () => {
      source.cancel();
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
    setExpense({ ...expense, currency: event.target.value });
  };

  const handleInputChange = (event) => {
    setValue(event.target.value);
    setExpense({ ...expense, amountOfExpenditure: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(expense);
    ExpenseService.createExpense(expense).then(
      () => {
        alert("başarılı");
        window.location.replace("/expense");
      },
      () => {}
    );
    hideModal();
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (images.length + acceptedFiles.length > 5) {
        alert("Toplamda 5 dosya seçebilirsiniz.");
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

          // expense nesnesinin file dizisine yeni eklenen dosyaları da ekleyin
          setExpense((oldExpense) => ({
            ...oldExpense,
            file: [...oldExpense.file, file],
          }));
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

  const StyledDataGrid = styled(DataGrid)({
    "& .MuiDataGrid-cell:focus": {
      backgroundColor: "inherit",
    },
  });

  return (
    <div className="datatablee">
      <button
        className="button-data-permission"
        type="button"
        onClick={showModal}
      >
        Add Expense
      </button>
      {listPermission.length > 0 && (
        <StyledDataGrid
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
          rowHeight={150}
        />
      )}
      <Modal show={show} handleClose={hideModal} onSubmit={handleSubmit}>
        <h2 className="h2-modal">Send Expense Request</h2>

        <div className="modalForm">
          <label className="modalForm-label">Reason For Expense</label>
          <Select
            defaultValue={selectedOption}
            onChange={(e) =>
              setExpense({
                ...expense,
                expenditureType: e.value,
              })
            }
            options={options}
            className="select-modal"
          />
        </div>
        <div className="modalForm">
          <label className="modalForm-label">Description</label>
          <textarea
            className="textAreaAdvance"
            cols="10"
            rows="3"
            onChange={(e) =>
              setExpense({
                ...expense,
                desc: e.target.value,
              })
            }
          ></textarea>
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
                    key={file.name} // Add the key prop here
                  >
                    <img
                      src={file.preview}
                      alt={`Preview ${index}`}
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
