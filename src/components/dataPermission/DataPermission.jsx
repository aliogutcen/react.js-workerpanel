import "./datapermission.scss";
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../dataPermission";
import { useState, useEffect } from "react";
import Modal from "../../pages/addpermission/Modal";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";
import Select from "react-select";
import WorkerService from "../../service/WorkerService";
import Cookies from "js-cookie";
import PermissionService from "../../service/PermissionService";
const DataPermission = () => {
  const token = Cookies.get("token");
  const [worker, setWorker] = useState({});
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

  const [data, setData] = useState(userRows);
  const [show, setShow] = useState(false);
  const [value, setValue] = useState([new Date(), new Date()]);
  const [days, setDays] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { value: "HOLIDAY", label: "Holiday" },
    { value: "FUNERAL", label: "Funeral" },
    { value: "ANNUAL", label: "Annual Leave" },
    { value: "MARRIAGE", label: "Marriage" },
  ];

  const showModal = () => {
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
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

  const handleDateChange = (val) => {
    requestAnimationFrame(() => {
      setValue(val);
      if (val[0] && val[1]) {
        const diffTime = Math.abs(val[1] - val[0]);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        setPermission((prevPermission) => ({
          ...prevPermission,
          numberOfDays: diffDays,
          startDate: val[0].toISOString().substring(0, 10),
          endDate: val[1].toISOString().substring(0, 10),
        }));
      }
    });
  };

  return (
    <div className="datatablee">
      <button
        className="button-data-permission"
        type="button"
        onClick={showModal}
      >
        Add Permission
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
        <h2 className="h2-modal">Send permission request</h2>
        <div className="modalForm">
          <label className="modalForm-label">Date Range For Permission</label>
          <DateRangePicker
            onChange={handleDateChange}
            value={value}
            className="select-modal"
            minDate={new Date()}
          />
          {days && <p>{days} gün seçildi.</p>}
        </div>
        <div className="modalForm">
          <label className="modalForm-label">Reason For Permission</label>
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
      </Modal>
    </div>
  );
};

export default DataPermission;
