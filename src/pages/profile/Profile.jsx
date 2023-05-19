import React,{useState,useEffect} from "react";
import Cookies from "js-cookie";
import WorkerService from "../../service/WorkerService";
import "./profile.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import withAuth from "../../withAuth";
import axios from "axios";

const Profile = () => {

    const [worker,setWorker] = useState({});
    const [workerFormData,setWorkerFormData] = useState({});
    const token = Cookies.get("token");
    const source = axios.CancelToken.source();

    useEffect(()=>{
        const fetchInfo = async () => {
            try{
                const response = await WorkerService.getInfoForWorker(token,{
                    CancelToken: source.token,
                });
                console.log(response);
                setWorker({...response.data});
                setWorkerFormData({...response.data});
            }catch(error){
                if(axios.isCancel(error)){
                    console.log("Request canceled",error.message);
                }else{
                    console.log(error);
                }
            }
        };

        fetchInfo();
        return () => {
            source.cancel("Operation canceled by the user.");
        };
    },[]);

    const handleInputChange = (e) => {
        const {name,value} = e.target;
        setWorkerFormData((prevState) => ({
            ...prevState,
            [name]:value,
        }));
    };

    return (
       <div className="profile">
        <Sidebar/>
        <div className="profileContainer">
            <Navbar/>
            <div className="worker__info">
                <div className="top">
                    <h3>
                        {workerFormData.name + " " + workerFormData.surname}{" "}
                    </h3>
                </div>
                <div className="bottom">
                    <div className="bottom-top">
                        <img src={worker.image
                        ? worker.image
                        : "https://images.unsplash.com/photo-1683097504876-42a726767b16?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80"
                        } className="image" />
                    </div>
                    <div className="bottom-bot">
                        <div className="personal">
                            <div className="formInput">
                                <label>Email</label>
                                <input 
                                type="email"
                                name="email"
                                value={workerFormData.email || ""}
                                onChange={handleInputChange}
                                 />
                            </div>
                            <div className="formInput">
                                <label>First Name</label>
                                <input type="text"
                                name="name"
                                value={workerFormData.name || ""}
                                onChange={handleInputChange} />
                            </div>
                            <div className="formInput">
                                <label>Surname</label>
                                <input type="text"
                                name="surname" 
                                value={workerFormData.surname || ""}
                                onChange={handleInputChange}
                                />
                            </div>
                            <div className="formInput">
                                <label>Second Name</label>
                                <input type="text"
                                name="secondname" 
                                value={workerFormData.secondname || ""}
                                onChange={handleInputChange}
                                />
                            </div>
                            <div className="formInput">
                                <label>Second Surname</label>
                                <input type="text"
                                name="secondnameSurname" 
                                value={workerFormData.secondSurname || ""}
                                onChange={handleInputChange}
                                />
                            </div>
                            </div>
                            <div className="personal">
                            <div className="formInput">
                                <label>Birthday</label>
                                <input type="text"
                                name="birthDate"
                                value={workerFormData.birthDate || ""}
                                onChange={handleInputChange}
                                />
                            </div>
                            <div className="formInput">
                                <label>Birthday Place</label>
                                <input type="text"
                                name="birthPlace"
                                value={workerFormData.birthPlace || ""}
                                onChange={handleInputChange}
                                />
                            </div>
                            <div className="formInput">
                                <label>Identification Number</label>
                                <input type="text"
                                name="identificationNumber"
                                value={workerFormData.identificationNumber || ""}
                                onChange={handleInputChange}
                                />
                            </div>
                            
                            <div className="formInput">
                                <label>Date Of Employment</label>
                                <input type="text"
                                name="dateOfEmployment"
                                value={workerFormData.dateOfEmployment || ""}
                                onChange={handleInputChange}
                                />
                            </div>
                            <div className="formInput">
                                <label>Termination Date</label>
                                <input type="text"
                                name="terminationDate"
                                value={workerFormData.terminationDate || ""}
                                onChange={handleInputChange}
                                />
                            </div>
                            </div>
                            <div className="personal">
                            <div className="formInput">
                                <label>Activity</label>
                                <input type="text"
                                name="activity"
                                value={workerFormData.activity || ""}
                                onChange={handleInputChange}
                                />
                            </div>
                            <div className="formInput">
                                <label>Occupation</label>
                                <input type="text"
                                name="occupation"
                                value={workerFormData.occupation || ""}
                                onChange={handleInputChange}
                                />
                            </div>
                            <div className="formInput">
                                <label>Address</label>
                                <input type="text"
                                name="address"
                                value={workerFormData.address || ""}
                                onChange={handleInputChange}
                                />
                            </div>
                            <div className="formInput">
                                <label>Company Phone</label>
                                <input type="text"
                                name="companyPhone"
                                value={workerFormData.companyPhone || ""}
                                onChange={handleInputChange}
                                />
                            </div>
                            <div className="formInput">
                                <label>Salary</label>
                                <input type="text"
                                name="salary"
                                value={workerFormData.salary || ""}
                                onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       </div>
    )
};

export default withAuth(Profile);