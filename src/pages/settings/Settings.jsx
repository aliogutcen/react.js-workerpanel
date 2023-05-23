import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./settings.scss";
import { useContext, useState, useRef, useEffect } from "react";
import { SidebarContext } from "../../context/SidebarContext";
import PersonalInfo from "../../assets/personal-information.png";
import axios from "axios";
import Cookies from "js-cookie";
import WorkerService from "../../service/WorkerService";
import Swal from "sweetalert2";
import AuthService from "../../service/AuthService";
const Settings = () => {
  const { isSidebarVisible } = useContext(SidebarContext);
  const token = Cookies.get("token");
  const [worker, setWorker] = useState({});
  const [password, setPassword] = useState({
    current: "",
    newpass: "",
    repass: "",
    authid: "",
  });

  const [updateWorker, setUpdateWorker] = useState({
    token: "",
    name: "",
    surname: "",
    secondSurname: "",
    secondname: "",
    address: "",
    image: "",
    companyPhone: "",
  });

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchWorkerInfo = async () => {
      try {
        const response = await WorkerService.getInfoForWorker(token, {
          cancelToken: source.token,
        });
        const worker = response.data;

        const dateOfEmployment = new Date(worker.dateOfEmployment);
        const today = new Date();
        const diffTime = Math.abs(today - dateOfEmployment);
        const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
        worker.yearsOfEmployment = diffYears;
        setWorker(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          console.log("An error occurred: ", error);
        }
      }
    };

    fetchWorkerInfo();

    return () => {
      source.cancel();
    };
  }, [token]); //

  useEffect(() => {
    if (worker.managerid && worker.id) {
      setUpdateWorker((prevPermission) => ({
        ...prevPermission,
        name: worker.name,
        surname: worker.surname,
        secondSurname: worker.secondSurname,
        secondname: worker.secondname,
        address: worker.address,
        image: worker.image,
        companyPhone: worker.companyPhone,
        token: token,
        email: worker.email,
      }));

      setPassword((preventDefault) => ({
        ...preventDefault,
        authid: worker.authid,
      }));
    }
  }, [worker]);

  const handlePassword = (event) => {
    event.preventDefault();
    console.log(updateWorker);
    AuthService.changePassword(password).then(
      (response) => {
        if (response.data === true) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener("mouseenter", Swal.stopTimer);
              toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
          });
          Toast.fire({
            icon: "success",
            title: "Change password in successfully",
          });
          window.location.reload(true);
        }
      },
      () => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(updateWorker);
    WorkerService.updateWorker(updateWorker).then(
      () => {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
        Toast.fire({
          icon: "success",
          title: "Signed in successfully",
        });

        window.location.reload(true);
      },
      () => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    );
  };

  const inputFileRef = useRef(null);
  const [image, setImage] = useState("");
  // Fotoğrafı ayarlama Bölümü //

  const handleImageClick = () => {
    inputFileRef.current.click();
  };
  const onChangeImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div className="settings-main">
      {isSidebarVisible && <Sidebar />}
      <div className="settingsContainer">
        <Navbar />
        <div className="setting-bot-side">
          <form onSubmit={handleSubmit} className="setting-bot-left-side">
            <div className="button-settings-area">
              <img
                // src={image ? URL.createObjectURL(image) : { AvatarManager }}  düzenlenecek yer
                src={image ? URL.createObjectURL(image) : worker.image}
                alt=""
                className="setting-icon"
                onClick={handleImageClick}
              />
              <div className="avatar-area">
                <input
                  type="file"
                  id="file"
                  ref={inputFileRef}
                  onChange={onChangeImage}
                  className="formControlImage choose-file"
                />

                <span className="avatar-p">
                  Avatar helps your teammates get to know you.
                </span>
              </div>
            </div>
            <div className="personal-info">
              <div className="contact-info">
                <div className="personal-info-text">
                  <span className="span-first">Personal Information</span>
                </div>
                <div className="form-input-area">
                  <div className="form-area">
                    <label htmlFor="">First Name</label>
                    <input
                      type="text"
                      className="formControl"
                      placeholder="First Name"
                      onChange={(e) => {
                        setWorker((prevWorker) => ({
                          ...prevWorker,
                          name: e.target.value,
                        }));
                      }}
                      value={worker.name}
                    />
                  </div>
                  <div className="form-area">
                    <label htmlFor="">Surname</label>
                    <input
                      type="text"
                      className="formControl"
                      placeholder="Surname"
                      onChange={(e) => {
                        setWorker((prevWorker) => ({
                          ...prevWorker,
                          surname: e.target.value,
                        }));
                      }}
                      value={worker.surname}
                    />
                  </div>
                </div>
                <div className="form-input-area">
                  <div className="form-area">
                    <label htmlFor="">Second Name</label>
                    <input
                      type="text"
                      className="formControl"
                      placeholder="Second Name"
                      onChange={(e) => {
                        setWorker((prevWorker) => ({
                          ...prevWorker,
                          secondname: e.target.value,
                        }));
                      }}
                      value={worker.secondname}
                    />
                  </div>
                  <div className="form-area">
                    <label htmlFor="">Second Surname</label>
                    <input
                      type="text"
                      className="formControl"
                      onChange={(e) => {
                        setWorker((prevWorker) => ({
                          ...prevWorker,
                          secondSurname: e.target.value,
                        }));
                      }}
                      value={worker.secondSurname}
                    />
                  </div>
                </div>
              </div>
              <div className="contact-info">
                <div className="personal-info-text">
                  <span className="span-first">Personal Information</span>
                </div>
                <div className="form-input-area">
                  <div className="form-area">
                    <label htmlFor="">Email Address</label>
                    <input
                      type="email"
                      className="formControl"
                      placeholder="Email"
                      onChange={(e) => {
                        setWorker((prevWorker) => ({
                          ...prevWorker,
                          email: e.target.value,
                        }));
                      }}
                      value={worker.email}
                    />
                  </div>
                </div>
                <div className="form-input-area">
                  <div className="form-area">
                    <label htmlFor="">Address</label>
                    <input
                      type="text"
                      className="formControl"
                      placeholder="Address"
                      onChange={(e) => {
                        setWorker((prevWorker) => ({
                          ...prevWorker,
                          address: e.target.value,
                        }));
                      }}
                      value={worker.address}
                    />
                  </div>
                  <div className="form-area">
                    <label htmlFor="">Phone Number</label>
                    <input
                      type="text"
                      className="formControl"
                      placeholder="Phone Number"
                      onChange={(e) => {
                        setWorker((prevWorker) => ({
                          ...prevWorker,
                          companyPhone: e.target.value,
                        }));
                      }}
                      value={worker.companyPhone}
                    />
                  </div>
                </div>
              </div>
              <div className="send">
                <button
                  type="submit"
                  className="send-button"
                  onClick={(e) => {
                    if (image != "") {
                      setUpdateWorker({
                        ...updateWorker,
                        image: image,
                      });
                    } else {
                      setUpdateWorker({
                        ...updateWorker,
                        image: null,
                      });
                    }
                  }}
                >
                  UPDATE
                </button>
              </div>
            </div>
          </form>
          {/* PASSWORD AREA */}
          <form className="password-form-area" onSubmit={handlePassword}>
            <div className="personal-info">
              <div className="contact-info">
                <div className="personal-info-text">
                  <span className="span-first">Password Change</span>
                </div>
                <div className="form-input-area">
                  <div className="form-area">
                    <label htmlFor="">Current Password</label>
                    <input
                      type="password"
                      className="formControl"
                      onChange={(e) => {
                        setPassword((prevWorker) => ({
                          ...prevWorker,
                          current: e.target.value,
                        }));
                      }}
                    />
                  </div>
                </div>
                <div className="form-input-area">
                  <div className="form-area">
                    <label htmlFor="">New Password</label>
                    <input
                      type="password"
                      className="formControl"
                      onChange={(e) => {
                        setPassword((prevWorker) => ({
                          ...prevWorker,
                          newpass: e.target.value,
                        }));
                      }}
                    />
                  </div>
                  <div className="form-area">
                    <label htmlFor="">Confirm New Password</label>
                    <input
                      type="password"
                      className="formControl"
                      onChange={(e) => {
                        setPassword((prevWorker) => ({
                          ...prevWorker,
                          repass: e.target.value,
                        }));
                      }}
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="send-button">
                UPDATE
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
