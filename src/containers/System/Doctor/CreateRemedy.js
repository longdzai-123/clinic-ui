import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./CreateRemedy.scss";
import * as actions from "../../../store/actions";
import Select from "react-select";
import { postSendRemedy } from "../../../services/remedyService";

import { toast } from "react-toastify";
import moment from "moment";
import localization from "moment/locale/vi"; //su dung chung cho cai mac dinh la tieng viet
import { LANGUAGES, CommonUtils } from "../../../utils";
import {
  filterDrugs
} from "../../../services/drugService";
import { getBookingById, postCreateRemedy } from "../../../services/bookingService";
import LoadingOverlay from "react-loading-overlay";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { create } from "lodash";

class CreateRemedy extends Component {
  constructor(props) {
    super(props);
    this.state = {
     
      email: "",
      desciption: "",
      patientName: "",
      phoneNumber: "",
      bookingId: "",
      drugs: [],
      selectedDrug: {},
      isShowLoading: false,
      doctorId: "",
      patientId: "",
      date: "",
      timeType: "",
      doctorName: "",
      remedyDetails: {},
      listRemedyDetails: [],
      amount: 0,
      description_usage: ""

    };
  }

  async componentDidMount() {
    this.props.getListDrugs();
    await this.getDataPatient();
  }

  getDataPatient = async () => {
    if (this.props.match && this.props.match.params && this.props.match.params.id) {
      let bookingId = this.props.match.params.id;
      let patientInfo = await getBookingById(bookingId)
      if (patientInfo && patientInfo.data) {
        console.log("patientInfo", patientInfo)
        this.setState({
          
          date: patientInfo.data.date,
          email: patientInfo.data.patient.email,
          patientName: patientInfo.data.patientName,
          phoneNumber: patientInfo.data.patientPhoneNumber,
          timeType: patientInfo.data.timeType,
          isShowLoading: false,
          doctorId: patientInfo.data.doctor.id,
          patientId: patientInfo.data.patient.id,
          bookingId: patientInfo.data.id,
        });
      }
    }
  }

  buildDataInputSelect = (inputData) => {
    let result = [];
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        object.label = `${item.name} - đơn vị:${item.unit.valueVi}`;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };

  handleChangeSelectDrugs = async (selectedOption) => {
    this.setState({ selectedDrug: selectedOption });
  };


  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (prevProps.drugs !== this.props.drugs) {
      let dataSelect = this.buildDataInputSelect(this.props.drugs);
      this.setState({
        drugs: dataSelect,
      });
    }
    if (prevState.listRemedyDetails !== this.state.listRemedyDetails) {
      this.setState({
        listRemedyDetails: this.state.listRemedyDetails,
      });
    }
  }

  handleOnChangeDescriptionUsage = (event) => {
    this.setState({
      description_usage: event.target.value
    });
  };
  handleOnChangeDescription = (event) => {
    this.setState({
      description: event.target.value
    });
  };

  handleOnchangeAmountDrug = (event) => {
    this.setState({
      amount: event.target.value
    });
  };

  handleCreateRemedyDetails = () => {
    let remedyDetails = {
      drug: {
        id: this.state.selectedDrug.value,
        name: this.state.selectedDrug.label
      },
      amount: this.state.amount,
      description: this.state.description_usage
    }

    let listRemedyDetails = [...this.state.listRemedyDetails]
    listRemedyDetails.push(remedyDetails)
    this.setState({
      listRemedyDetails: listRemedyDetails,
    });
    console.log(this.state.listRemedyDetails)
  }

  handleBtnDeleteDrug = (item) => {
    let listRemedyDetails = [...this.state.listRemedyDetails];
    listRemedyDetails = listRemedyDetails.filter((element) => element !== item);
    this.setState({
      listRemedyDetails: listRemedyDetails,
    });
  }
  createRemedy = async () => {
    let dataCreateRemedy = this.state;
    this.setState({ isShowLoading: true });

    let res = await postSendRemedy({
      email: dataCreateRemedy.email,
      phoneNumber: dataCreateRemedy.phoneNumber,
      doctor: {
        id: dataCreateRemedy.doctorId
      },
      patient: {
        id: dataCreateRemedy.patientId
      },
      booking: {
        id: dataCreateRemedy.bookingId
      },
      timeType: dataCreateRemedy.timeType.keyMap,
      date: dataCreateRemedy.date,
      description: dataCreateRemedy.description,
      remedyDetails: dataCreateRemedy.listRemedyDetails
    });
    if (res && res.code === 200) {
      this.setState({ isShowLoading: false });
      if (this.props.language == "en") {
        toast.success("Create Remedy succeed!");
      } else {
        toast.success("Tạo đơn thuốc thành công!");
      }
      setTimeout(function () { window.location.href = '/doctor/manage-patient' }, 1000);
    } else {
      this.setState({ isShowLoading: true });
      if (this.props.language == "en") {
        toast.error("Something wrongs...!");
      } else {
        toast.error("Lỗi!");
      }
    }
    this.setState({ isShowLoading: false });
  };


  render() {
    let { isShowLoading, email, patientName, drugs, desciption, listRemedyDetails } = this.state
    let { language } = this.props
    console.log(drugs)
    return (
      <LoadingOverlay
        active={isShowLoading}
        spinner={< ClimbingBoxLoader color={"#86e7d4"} size={15} />}
      >
        <div className="create-remedy-container">
          <div className="m-s-title">
            <FormattedMessage id={"admin.manage-drug.create-prescription"} />
          </div>
        </div>
        <div className="row my-3">
          <div className="col-12">
            <div className="row">
              <div className="col-3 form-group">
                <label><FormattedMessage id={"admin.manage-drug.email-patient"} /></label>
                <input
                  className="form-control"
                  type="email"
                  value={email}
                  readonly="true"
                />
              </div>
              <div className="col-3 form-group">
                <label><FormattedMessage id={"admin.manage-drug.name-patient"} /></label>
                <input
                  className="form-control"
                  type="text"
                  value={patientName}
                  readonly="true"
                />
              </div>
              <div className="col-3 form-group">
                <label>
                  <FormattedMessage id={"admin.manage-drug.prescription"} />
                </label>
                <Select
                  value={this.state.selectedDrug}
                  onChange={(e) => this.handleChangeSelectDrugs(e)}
                  options={drugs}
                />
              </div>
              <div className="col-3 form-group">
                <label>
                  Số lượng
                </label>
                <input
                  className="form-control"
                  type="number"
                  onChange={(e) => this.handleOnchangeAmountDrug(e)}
                />
              </div>
            </div>
          </div>
          <div class="col-12 form-group">
            <label>Hướng dẫn sử dụng thuốc</label>
            <textarea
              className="form-control"
              aria-label="With textarea"
              value={this.state.description_usage}
              onChange={(event) => this.handleOnChangeDescriptionUsage(event)}
            ></textarea>
          </div>
        </div>

        <button
          onClick={() => this.handleCreateRemedyDetails()} type="button" class="btn btn-primary"
        >
          <FormattedMessage id={"admin.manage-drug.btn-create"} />
        </button>
        <div className="create-remedy-body">
          <div className="col-12 table-create-remedy">
            <div class="col-12 form-group my-5">
              <label>Chuẩn đoán bệnh :</label>
              <textarea
                className="form-control"
                aria-label="With textarea"
                value={this.state.description}
                onChange={(event) => this.handleOnChangeDescription(event)}
              >
              </textarea>
            </div>
            <div className="title-remedy">
              Đơn thuốc
            </div>
            <table>
              <tbody>
                <tr>
                  <th style={{ textAlign: "center" }}>#</th>
                  <th style={{ textAlign: "center" }}>Tên thuốc</th>
                  <th style={{ textAlign: "center" }}>Số lượng</th>
                  <th style={{ textAlign: "center" }}>Hướng dẫn sử dụng</th>
                  <th style={{ textAlign: "center" }}>Hành động</th>

                </tr>
                {listRemedyDetails && listRemedyDetails.length > 0 ? (
                  listRemedyDetails.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td style={{ textAlign: "center" }}>{index + 1}</td>
                        <td style={{ textAlign: "center" }}>{item.drug.name}</td>
                        <td style={{ textAlign: "center" }}>{item.amount}</td>
                        <td style={{ textAlign: "center" }}>{item.description}</td>
                        <td style={{ textAlign: "center" }}>
                          <button
                            className="btn btn-danger"
                            onClick={() => this.handleBtnDeleteDrug(item)}
                          >
                            Xóa
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="9" style={{ textAlign: "center" }}>
                      {language === LANGUAGES.VI ? "Không có đơn thuốc" : "No prescription"}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <button
          onClick={() => this.createRemedy()} type="button" class="btn btn-primary"
        >
          Tạo đơn thuốc và gửi
        </button>


      </LoadingOverlay >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
    drugs: state.admin.allDrugs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListDrugs: () => dispatch(actions.fetchAllDrugs()),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateRemedy);
