import "./dataadvance.scss";
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../dataAdvance";
import { useState, useEffect } from "react";
import Modal from "../../pages/addpermission/Modal";
import Select from "react-select";
import WorkerService from "../../service/WorkerService";
import Cookies from "js-cookie";
import AdvanceService from "../../service/AdvanceService";

const DataAdvance = () => {
  const [rates, setRates] = useState({});
  const [selectedCurrency, setSelectedCurrency] = useState("TRY");
  const [tlSalary, setTlSalary] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [advance, setAdvance] = useState(0);
  useEffect(() => {
    fetch("https://api.exchangerate-api.com/v4/latest/TRY")
      .then((response) => response.json())
      .then((data) => setRates(data.rates))
      .catch((err) => console.error(err));
  }, []);
  const convertedSalary = tlSalary * (rates[selectedCurrency] || 1);
  const maxAdvance = convertedSalary * 3;

  const token = Cookies.get("token");
  const [worker, setWorker] = useState({});

  const [advances, setAdvances] = useState({
    managerid: "",
    workerid: "",
    advanceRequestType: "",
    advanceAmount: "",
    nameOfTheRequester: "",
    surnameOfTheRequester: "",
    currency: "",
    description: "",
  });

  const [listAdvance, setListAdvances] = useState([
    {
      id: "",
      approvalStatus: "",
      dateOfRequest: "",
      description: "",
      replyDate: "",
      advanceAmount: "",
      currency: "",
      advanceRequestType: "",
    },
  ]);

  useEffect(() => {
    WorkerService.getInfoForWorker(token).then((response) => {
      console.log(response);
      setWorker({ ...worker, ...response.data });
    });
  }, []);
  useEffect(() => {
    if (worker.managerid && worker.id) {
      setAdvances((prevAdvances) => ({
        ...prevAdvances,
        managerid: worker.managerid,
        workerid: worker.id,
        nameOfTheRequester: worker.name,
        surnameOfTheRequester: worker.surname,
      }));
      setTlSalary(worker.salary);
    }
  }, [worker]);
  useEffect(() => {
    AdvanceService.getAllAdvances(worker.id).then((response) => {
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

      setListAdvances([...response.data]);
    });
    return () => {
      console.log("useEffect clean-up");
    };
  }, [worker]);

  const [data, setData] = useState(userRows);
  const [show, setShow] = useState(false);
  const [value, setValue] = useState([new Date(), new Date()]);
  const [days, setDays] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { value: "EMERGENCY_SITUATIONS", label: "Emergency Situations" },
    { value: "TEMPORARY_CASH_SHORTAGE", label: "Temporary Cash Shortage" },
    { value: "PRE_PLANNED_EXPENSES", label: "Pre Planned Expenses" },
  ];

  const showModal = () => {
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    AdvanceService.createAdvance(advances).then(
      () => {
        alert("başarılı");
        window.location.replace("/advance");
      },
      () => {}
    );
    hideModal();
  };

  const handleSelectChange = (e) => {
    const selectedCurrency = e.target.value;
    setSelectedCurrency(selectedCurrency);
    setAdvances((prev) => ({ ...prev, currency: selectedCurrency }));
  };

  const handleInputChange = (e) => {
    let inputVal = e.target.value;

    if (inputVal > maxAdvance) {
      inputVal = maxAdvance;
      setErrorMessage(
        "The value you entered exceeds the max advance. The value is set to the max advance value."
      );
    } else {
      setErrorMessage("");
    }
    setAdvance(inputVal);
    setAdvances((prev) => ({ ...prev, advanceAmount: inputVal }));
  };

  return (
    <div className="datatablee">
      <button
        className="button-data-permission"
        type="button"
        onClick={showModal}
      >
        Add Advance
      </button>
      {listAdvance.length > 0 && (
        <DataGrid
          className="datagrid"
          rows={listAdvance}
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
      )}
      <Modal show={show} handleClose={hideModal} onSubmit={handleSubmit}>
        <h2 className="h2-modal">Send Advance Request</h2>
        <div className="modalForm">
          <label className="modalForm-label">Amount</label>
          <div className="inputArea">
            <span>
              Maaş ({selectedCurrency}): {convertedSalary.toFixed(2)}
            </span>
            <span>
              Max Avans ({selectedCurrency}): {maxAdvance.toFixed(2)}
            </span>
          </div>
          <div className="selectArea">
            <div className="selectAreaInput">
              <input
                type="number"
                min="0"
                value={advance}
                onChange={handleInputChange}
                className="price"
              />
              <select
                className="currency"
                value={selectedCurrency}
                onChange={handleSelectChange}
              >
                <option value="TRY">TL</option>
                <option value="USD">Dolar</option>
                <option value="EUR">Euro</option>
                <option value="GBP">Sterlin</option>
              </select>
            </div>
            <p className="errorsMessage">{errorMessage}</p>
          </div>
        </div>
        <div className="modalForm">
          <label className="modalForm-label">Reason For Advance</label>
          <Select
            defaultValue={selectedOption}
            onChange={(e) =>
              setAdvances({
                ...advances,
                advanceRequestType: e.value,
              })
            }
            options={options}
            className="select-modal"
          />
        </div>
        <div className="modalForm">
          <label className="modalForm-label">Description</label>
          <textarea
            onChange={(e) =>
              setAdvances({
                ...advances,
                description: e.target.value,
              })
            }
            className="textAreaAdvance"
            cols="10"
            rows="5"
          ></textarea>
        </div>
      </Modal>
    </div>
  );
};

export default DataAdvance;
