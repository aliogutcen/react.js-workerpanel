import "./datapermission.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../dataPermission";
import { Link } from "react-router-dom";
import { useState } from "react";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import Modal from "../../pages/addpermission/Modal";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css";
import "react-calendar/dist/Calendar.css";
import Select from "react-select";
const DataPermission = () => {
  const [data, setData] = useState(userRows);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [show, setShow] = useState(false);
  const [days, setDays] = useState(null);
  const options = [
    { value: "holiday", label: "Holiday" },
    { value: "disease", label: "Disease" },
    { value: "annualleave", label: "Annual Leave" },
  ];
  const [value, onChange] = useState([new Date(), new Date()]);
  const showModal = () => {
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value[0] && value[1]) {
      const diffTime = Math.abs(value[1] - value[0]);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDays(diffDays);
    }
    console.log(value);
    console.log(selectedOption);
    hideModal();
  };

  const [selectedOption, setSelectedOption] = useState(null);
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
        rows={data}
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
            onChange={onChange}
            value={value}
            className="select-modal"
          />
        </div>
        <div className="modalForm">
          <label className="modalForm-label">Date Range For Permission</label>
          <Select
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
            className="select-modal"
          />
        </div>
      </Modal>
      <DateRangePicker onChange={onChange} value={value} />
    </div>
  );
};

export default DataPermission;
