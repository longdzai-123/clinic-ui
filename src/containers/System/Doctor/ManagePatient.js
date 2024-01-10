import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManagePatient.scss";
import DatePicker from "../../../components/Input/DatePicker";
import {
  cancelBooking,
  getAllPatientForDoctor,
  postCreateRemedy,
} from "../../../services/bookingService";
import { postSendRemedy } from "../../../services/remedyService";
import { getDoctorInforById } from "../../../services/doctorService";
import moment from "moment";
import { LANGUAGES } from "../../../utils";
import RemedyModal from "./RemedyModal";
//import CreateImageRemedyModal from "./CreateImageRemedyModal";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // This only needs to be imported once in your app
import { withRouter } from "react-router";

class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataPatient: [],
      isOpenRemedyModal: false,
      isOpenCreateImageRemedyModal: false,
      dataModal: {},
      dataModalCreateRemedy: {},
      isShowLoading: false,
      previewImgURL: ""
    };
  }

  async componentDidMount() {
    await this.getDataPatient();
  }

  getDataPatient = async () => {
    let { user } = this.props;
    let { currentDate } = this.state;
    console.log(currentDate)
    let formatedDate = moment(currentDate).format("YYYY-MM-DD");
    if (user && user.id) {
      let res = await getAllPatientForDoctor(user.id, formatedDate);
      if (res && res.code === 200) {
        this.setState({
          dataPatient: res.data,
        });
      }
    }
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.user !== prevProps.user) {
      await this.getDataPatient();
    }
  }

  handleOnChangeDatePicker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      async () => {
        await this.getDataPatient();
      }
    );
  };
  handleBtnConfirm = (item) => {
    let data = {
      email: item.patient.email,
      phoneNumber: item.patientPhoneNumber,
      patientId: item.patient.id,
      doctorId: item.doctor.id,
      bookingId: item.id,
      timeType: item.timeType.keyMap,
      date: item.date,
      patientName: item.patient.firstName,
    };
    this.setState({
      isOpenRemedyModal: true,
      dataModal: data,
    });
  };
  handleBtnCreateRemedy = (item) => {
    const navigateLink = `/doctor/create-remedy/${item.id}`;
    if (this.props.history) {
      this.props.history.push(navigateLink);
    }
  };

  handleBtnEditRemedy = (item) => {
    if (this.props.history) {
      this.props.history.push(`/doctor/edit-remedy/${item.id}`);
    }
  }

  // handleBtnCancel = async (item) => {
  //   this.setState({ isShowLoading: true });
  //   let res = await cancelBooking({
  //     doctorId: item.doctorId,
  //     patientId: item.patientId,
  //     timeType: item.timeType,
  //     date: item.date,
  //     statusId: item.statusId,
  //   });
  //   if (res && res.errCode === 0) {
  //     this.setState({ isShowLoading: false });
  //     if (this.props.language === "en") {
  //       toast.success("cancel appointment succeed!");
  //     } else {
  //       toast.success("Hủy cuộc hẹn thành công!");
  //     }
  //     await this.getDataPatient();
  //   } else {
  //     this.setState({ isShowLoading: true });
  //     if (this.props.language === "en") {
  //       toast.error("Something wrongs...!");
  //     } else {
  //       toast.error("Lỗi!");
  //     }
  //   }
  // };

  closeRemedyModal = () => {
    this.setState({
      isOpenRemedyModal: false,
      dataModal: {},
    });
  };
  closeCreateImageRemedyModal = () => {
    this.setState({
      isOpenCreateImageRemedyModal: false,
      dataModalCreateRemedy: {},
    });
  };

  sendRemedyImage = async (dataChild) => {
    let { dataModal } = this.state;
    this.setState({ isShowLoading: true });
    let res = await postSendRemedy({
      email: dataModal.email,
      phoneNumber: dataModal.phoneNumber,
      image: dataChild.imgBase64,
      doctor: {
        id: dataModal.doctorId
      },
      patient: {
        id: dataModal.patientId
      },
      booking: {
        id: dataModal.bookingId
      },
      description: dataChild.description,
      timeType: dataModal.timeType,
      date: dataModal.date,
    });
    if (res && res.code === 200) {
      this.setState({ isShowLoading: false });

      if (this.props.language == "en") {
        toast.success("Send Remedy succeed!");
      } else {
        toast.success("Gửi đơn thuốc thành công!");
      }
      this.closeRemedyModal();
      await this.getDataPatient();
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

  openPreviewImage = (item) => {
    if (item.imageRemedy) {
      this.setState({
        previewImgURL: item.imageRemedy,
        isOpen: true,
      })
    }
    else {
      console.log("this.props.language", this.props.language)
      if (this.props.language == "vi") {
        toast.info("Bác sĩ chưa tạo đơn thuốc cho bệnh nhân này!");
      } else {
        toast.info("The doctor has not created a prescription for this patient!");
      }
    }
  };

  render() {
    let {
      dataPatient,
      isOpenRemedyModal,
      isOpenCreateImageRemedyModal,
      dataModal,
      dataModalCreateRemedy,
    } = this.state;

    console.log(dataPatient)
    let { language } = this.props;

    return (
      <>
        <LoadingOverlay
          active={this.state.isShowLoading}
          spinner={<ClimbingBoxLoader color={"#86e7d4"} size={15} />}
        >
          <RemedyModal
            isOpenModal={isOpenRemedyModal}
            dataModal={dataModal}
            closeRemedyModal={this.closeRemedyModal}
            sendRemedy={this.sendRemedyImage}
          />
          <div className="manage-patient-container">
            <div className="m-p-title font-weight-bold"><FormattedMessage id={"manage-patient.title"} /> </div>
            <div className="manage-patient-body row">
              <div className="col-4 form-group">
                <label><FormattedMessage id={"manage-patient.choose-date"} /></label>
                <DatePicker
                  onChange={this.handleOnChangeDatePicker}
                  className="form-control"
                  value={this.state.currentDate}
                />
              </div>
              <div className="col-12 table-manage-patient">
                <table>
                  <tbody>
                    <tr>
                      <th>#</th>
                      <th style={{ textAlign: "center" }}><FormattedMessage id={"manage-patient.examination-time"} /></th>
                      <th style={{ textAlign: "center" }}><FormattedMessage id={"manage-patient.patient-name"} /></th>
                      <th style={{ textAlign: "center" }}><FormattedMessage id={"manage-patient.address"} /></th>
                      <th style={{ textAlign: "center" }}><FormattedMessage id={"manage-patient.phone-number"} /></th>
                      <th style={{ textAlign: "center" }}><FormattedMessage id={"manage-patient.gender"} /></th>
                      <th style={{ textAlign: "center" }}><FormattedMessage id={"manage-patient.reason"} /></th>
                      <th style={{ textAlign: "center" }}><FormattedMessage id={"manage-patient.prescription"} /></th>
                      <th style={{ textAlign: "center" }}>Gửi hình ảnh đơn thuốc</th>
                      <th style={{ textAlign: "center" }}>Tạo đơn thuốc</th>
                      <th style={{ textAlign: "center" }}>Xác nhận</th>
                    </tr>
                    {dataPatient && dataPatient.length > 0 ? (
                      dataPatient.map((item, index) => {
                        let time =
                          language === LANGUAGES.VI
                            ? item.timeType.valueVi
                            : item.timeType.valueEn;
                        let gender =
                          language === LANGUAGES.VI
                            ? (item.patientGender.keyMap == "M" ? "Nam" : "Nữ")
                            : (item.patientGender.keyMap == "M" ? "Male" : "Female")
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{time}</td>
                            <td>{item.patientName}</td>
                            <td>{item.patientAddress}</td>
                            <td>
                              {item.patientPhoneNumber ? item.patientPhoneNumber : ""}
                            </td>
                            <td>{gender}</td>
                            <td>{item.patientReason}</td>
                            <td>
                              <div
                                className="text-center pointer text-primary"
                                style={{
                                  backgroundImage: `url(${item.imageRemedy})`,
                                }}
                                onClick={() => this.openPreviewImage(item)}
                              ><FormattedMessage id={"manage-patient.view"} /></div>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item.imageRemedy ?
                                <>
                                  <button
                                    className="btn mx-3"
                                    style={{ backgroundColor: '#ded735' }}
                                    onClick={() => this.handleBtnConfirm(item)}
                                  >
                                    Gửi lại
                                  </button>
                                </>
                                :
                                <button
                                  className="btn btn-primary mx-3"
                                  onClick={() => this.handleBtnConfirm(item)}
                                >
                                  <FormattedMessage id={"manage-patient.send-prescriptions"} />
                                </button>
                              }
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item.isRemedy === true ?
                                <button
                                  className="btn btn-warning"
                                  onClick={() => this.handleBtnEditRemedy(item)}
                                >
                                  Xem chi tiết
                                </button>
                                :
                                < button
                                  className="btn btn-info"
                                  onClick={() => this.handleBtnCreateRemedy(item)}
                                >
                                  <FormattedMessage id={"manage-patient.create-prescriptions"} />
                                </button>

                              }
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {item.statusId === 'S2' ?
                                <>
                                  <button
                                    className="btn btn-warning mx-3"
                                    disabled="true"
                                  >
                                    chưa khám
                                  </button>
                                  <button
                                    className="btn btn-danger"
                                    onClick={() => this.handleBtnCancel(item)}
                                  >
                                    <FormattedMessage id={"manage-patient.cancel"} />
                                  </button>
                                </> :
                                <>
                                  <button
                                    className="btn btn-success"
                                    disabled="true"
                                  >
                                    Đã khám
                                  </button>
                                </>
                              }
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan="9" style={{ textAlign: "center" }}>
                          {language === LANGUAGES.VI ? "Không có bệnh nhân đặt lịch vào ngày này" : "No patients booked for this date"}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {this.state.isOpen === true && (
            <Lightbox
              mainSrc={this.state.previewImgURL}
              onCloseRequest={() => this.setState({ isOpen: false })}
            />
          )}

        </LoadingOverlay >
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return { language: state.app.language, user: state.user.userInfor };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManagePatient));
