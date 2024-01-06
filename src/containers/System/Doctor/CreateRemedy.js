import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./CreateRemedy.scss";
import * as actions from "../../../store/actions";
import Select from "react-select";


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
      drugs: [],
      listSeletedDrugs: [],
      selectedDrug: {},
      isShowLoading: false,
      doctorId: "",
      patientId: "",
      date: "",
      token: "",
      timeType: "",
      doctorName: "",
      reason: "",
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
          email: patientInfo.data.patient.email,
          patientName: patientInfo.data.patientName,
          isShowLoading: false,
          doctorId: patientInfo.data.doctor.id,
          patientId: patientInfo.data.patient.id,
          date: patientInfo.data.date,
          token: patientInfo.data.token,
          timeType: patientInfo.data.timeType,
          doctorName: "",
          reason: patientInfo.data.patientReason,
        });
      }
    }
  }

  buildDataInputSelect = (inputData) => {
    let result = [];
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        object.label = item.name;
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


  handleOnChangeListMedicine = (event) => {
    this.setState({
      listMedicine: event.target.value,
    });
  };

  handleOnChangeDescription = (event) => {
    this.setState({
      description_usage: event.target.value
    });
  };

  handleOnchangeAmountDrug = (event) => {
    this.setState({
      amount: event.target.value
    });
  };

  handleCreateRemedyDetails = () => {
    let remedyDetails = {
      drugIdSelect: this.state.selectedDrug.value,
      drugNameSelect: this.state.selectedDrug.label,
      amount: this.state.amount,
      description: this.state.description_usage
    }

    let listRemedyDetails = [...this.state.listRemedyDetails]
    listRemedyDetails.push(remedyDetails)
    this.setState({
      listRemedyDetails: listRemedyDetails,
    });
    this.setState({
      selectedDrug: "",
      description_usage: ""
    })
    console.log(this.state.listRemedyDetails)
  }

  // const handleCreateRemedyImage = () => {
  //   createRemedyImage();
  // };

  // const createRemedyImage = async () => {
  //   console.log("reason", reason)
  //   setIsShowLoading(true)

  //   let res = await postCreateRemedy({
  //     email: email,
  //     listMedicine: listMedicine,
  //     desciption: desciption,
  //     doctorId: doctorId,
  //     patientId: patientId,
  //     timeType: timeType,
  //     date: date,
  //     token: token,
  //     language: language,
  //     patientName: patientName,
  //     doctorName: doctorName,
  //     listSeletedDrugs: listSeletedDrugs,
  //     patientReason: reason
  //   });

  //   if (res && res.errCode === 0) {
  //     setIsShowLoading(false)
  //     if (language == "en") {
  //       toast.success("Create Remedy succeed!");
  //     } else {
  //       toast.success("Tạo đơn thuốc thành công!");
  //     }
  //   } else {
  //     setIsShowLoading(true)
  //     if (language == "en") {
  //       toast.error("Something wrongs...!");
  //     } else {
  //       toast.error("Lỗi!");
  //     }
  //   }
  //   setIsShowLoading(false)
  // };


  render() {
    let { isShowLoading, email, patientName, listMedicine, listSeletedDrugs, units, queryDrug, drugs, listFilterDrugs, desciption, listRemedyDetails } = this.state
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
        <div className="row">
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
              onChange={(event) => this.handleOnChangeDescription(event)}
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
            <table>
              <tbody>
                <tr>
                  <th>#</th>
                  <th>tên thuốc</th>
                  <th>số lượng</th>
                  <th>hướng dẫn</th>
                  <th>hành động</th>

                </tr>
                {listRemedyDetails && listRemedyDetails.length > 0 ? (
                  listRemedyDetails.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.drugNameSelect}</td>
                        <td>{item.amount}</td>
                        <td>{item.description}</td>
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => this.handleBtnCancel(item)}
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
                      {language === LANGUAGES.VI ? "Không có đơn thuốc" : ""}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <button
          onClick={() => this.handleCreateRemedy()} type="button" class="btn btn-primary"
        >
          Tạo đơn thuốc
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
