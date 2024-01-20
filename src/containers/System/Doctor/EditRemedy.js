import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./CreateRemedy.scss";
import * as actions from "../../../store/actions";
import Select from "react-select";
import { updateRemedyService, getRemedyByBookingId } from "../../../services/remedyService";

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
import _ from "lodash";

class EditRemedy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            email: "",
            description: "",
            note: "",
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
        await this.getDataRemedy();
    }

    getDataRemedy = async () => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let bookingId = this.props.match.params.id;
            let remedyInfo = await getRemedyByBookingId(bookingId)
            if (remedyInfo && remedyInfo.data) {
                console.log("remedyInfo", remedyInfo)
                this.setState({
                    id: remedyInfo.data.id,
                    date: remedyInfo.data.date,
                    email: remedyInfo.data.patient.email,
                    patientName: remedyInfo.data.patient.firstName,
                    phoneNumber: remedyInfo.data.patientPhoneNumber,
                    isShowLoading: false,
                    doctorId: remedyInfo.data.doctor.id,
                    patientId: remedyInfo.data.patient.id,
                    bookingId: remedyInfo.data.id,
                    listRemedyDetails: remedyInfo.data.remedyDetails,
                    description: remedyInfo.data.description,
                    note: remedyInfo.data.note
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

    handleOnChangeNote = (event) => {
        this.setState({
            note: event.target.value
        });
    };

    handleOnchangeAmountDrug = (event) => {
        this.setState({
            amount: event.target.value
        });
    };

    handleBtnDeleteDrug = (item) => {
        let listRemedyDetails = [...this.state.listRemedyDetails];
        listRemedyDetails = listRemedyDetails.filter((element) => element !== item);
        this.setState({
            listRemedyDetails: listRemedyDetails,
        });
    }

    handleCreateRemedyDetails = () => {
        let { selectedDrug, amount } = this.state;
        if (amount === 0) {
            if (this.props.language == "en") {
                toast.error("The quantity of medicine has not been entered!");
            } else {
                toast.error("Chưa nhập số lượng thuốc!");
            }
            return;
        }
        if (selectedDrug && _.isEmpty(selectedDrug)) {
            if (this.props.language == "en") {
                toast.error("Prescription not selected yet!");
            } else {
                toast.error("Chưa chọn đơn thuốc!");
            }
            return;
        }
        let remedyDetails = {
            drug: {
                id: this.state.selectedDrug.value,
                name: this.state.selectedDrug.label,
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

    updateRemedy = async () => {
        let { dataRemedy } = this.state;
        this.setState({ isShowLoading: true });
        if (dataRemedy.listRemedyDetails.length > 0) {
            let res = await updateRemedyService({
                id: dataRemedy.id,
                description: dataRemedy.description,
                remedyDetails: dataRemedy.listRemedyDetails,
                note: dataRemedy.note
            });
            if (res && res.code === 200) {
                this.setState({ isShowLoading: false });
                if (this.props.language == "en") {
                    toast.success("Edit Remedy succeed!");
                } else {
                    toast.success("Sửa đơn thuốc thành công!");
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
        } else {
            this.setState({ isShowLoading: false });
            if (this.props.language == "en") {
                toast.error("Prescription is empty!");
            } else {
                toast.error("Đơn thuốc rỗng!");
            }
        }
    };


    render() {
        let { isShowLoading, email, patientName, drugs, description, listRemedyDetails } = this.state
        let { language } = this.props
        console.log(drugs)
        return (
            <LoadingOverlay
                active={isShowLoading}
                spinner={< ClimbingBoxLoader color={"#86e7d4"} size={15} />}
            >
                <div className="create-remedy-container">
                    <div className="m-s-title">
                        Xem chi tiết đơn thuốc
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
                        <div class="col-12 form-group my-3">
                            <label>Chuẩn đoán bệnh:</label>
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
                                    <th>#</th>
                                    <th>Tên thuốc</th>
                                    <th>Đơn vị</th>
                                    <th>Hướng dẫn sử dụng</th>
                                    <th>Hành động</th>
                                </tr>
                                {listRemedyDetails && listRemedyDetails.length > 0 ? (
                                    listRemedyDetails.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.drug.name}</td>
                                                <td>{item.amount}</td>
                                                <td>{item.description}</td>
                                                <td>
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
                        <div class="col-12 form-group my-3">
                            <label>Ghi chú:</label>
                            <textarea
                                className="form-control"
                                aria-label="With textarea"
                                value={this.state.note}
                                onChange={(event) => this.handleOnChangeNote(event)}
                            >
                            </textarea>
                        </div>
                    </div>
                </div>

                <button
                    onClick={() => this.updateRemedy()}
                    type="button"
                    className="btn"
                    style={{ backgroundColor: '#ffc107' }}
                >
                    Sửa đơn thuốc và gửi lại
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

export default connect(mapStateToProps, mapDispatchToProps)(EditRemedy);
