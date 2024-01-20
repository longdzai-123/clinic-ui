import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManagePatient.scss";
import { getAllInvoiceByDoctorId, confirmPayment } from "../../../services/invoiceService";
import { getDoctorInforById } from "../../../services/doctorService";
import moment from "moment";
import { LANGUAGES } from "../../../utils";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // This only needs to be imported once in your app
import { withRouter } from "react-router";


class StatisticInvoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataInvoice: [],
            isShowLoading: false,

        };
    }

    async componentDidMount() {
        await this.getDataInvoice();
    }

    getDataInvoice = async () => {
        let { user } = this.props;
        if (user && user.id) {
            let res = await getAllInvoiceByDoctorId(user.id);
            if (res && res.code === 200) {
                this.setState({
                    dataInvoice: res.data,
                });
            }
        }
    };

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
        if (this.props.user !== prevProps.user) {
            await this.getDataInvoice();
        }
    }

    handleConfirmPayment = async (item) => {
        this.setState({ isShowLoading: true });
        let res = await confirmPayment(item.id)
        if (res && res.code === 200) {
            this.setState({ isShowLoading: false });

            if (this.props.language == "en") {
                toast.success("Confirm successful payment!");
            } else {
                toast.success("Xác nhận thanh toán thành công!");
            }
            await this.getDataInvoice();
        } else {
            this.setState({ isShowLoading: true });
            if (this.props.language == "en") {
                toast.error("Something wrongs...!");
            } else {
                toast.error("Lỗi!");
            }
        }
        this.setState({ isShowLoading: false });
    }

    render() {
        let { dataInvoice } = this.state;
        let { language } = this.props;

        return (
            <>
                <LoadingOverlay
                    active={this.state.isShowLoading}
                    spinner={<ClimbingBoxLoader color={"#86e7d4"} size={15} />}
                >
                    <div className="manage-patient-container">
                        <div className="m-p-title font-weight-bold">
                            Thống kê hóa đơn khám bệnh
                        </div>
                        <div className="manage-patient-body row">
                            <div className="col-12 table-manage-patient">
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>#</th>
                                            <th style={{ textAlign: "center" }}>Ngày khám</th>
                                            <th style={{ textAlign: "center" }}><FormattedMessage id={"manage-patient.examination-time"} /></th>
                                            <th style={{ textAlign: "center" }}><FormattedMessage id={"manage-patient.patient-name"} /></th>
                                            <th style={{ textAlign: "center" }}><FormattedMessage id={"manage-patient.address"} /></th>
                                            <th style={{ textAlign: "center" }}><FormattedMessage id={"manage-patient.phone-number"} /></th>
                                            <th style={{ textAlign: "center" }}>Chuẩn đoán</th>
                                            <th style={{ textAlign: "center" }}>Thành tiền</th>
                                            <th style={{ textAlign: "center" }}>Trạng Thái</th>
                                            <th style={{ textAlign: "center" }}>Xác nhận thanh toán</th>
                                        </tr>
                                        {dataInvoice && dataInvoice.length > 0 ? (
                                            dataInvoice.map((item, index) => {

                                                return (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td style={{ textAlign: "center" }}>{item.remedy.date}</td>
                                                        <td style={{ textAlign: "center" }}>{item.time}</td>
                                                        <td style={{ textAlign: "center" }}>{item.patient.firstName}</td>
                                                        <td>{item.patient.address}</td>
                                                        <td style={{ textAlign: "center" }}>{item.remedy.phoneNumber}</td>
                                                        <td>{item.remedy.description}</td>
                                                        <td style={{ textAlign: "center" }}>
                                                            {
                                                                item.totalCost.toLocaleString('vi', { style: 'currency', currency: 'VND' })
                                                            }
                                                        </td>
                                                        <td style={{ textAlign: "center" }}>
                                                            {item.isPay === true ?
                                                                <button
                                                                    className="btn"
                                                                    style={{ backgroundColor: 'rgb(52 231 146)' }}
                                                                >
                                                                    Đã thanh toán
                                                                </button>
                                                                :
                                                                < button
                                                                    className="btn"
                                                                    style={{ backgroundColor: '#ffc107' }}
                                                                >
                                                                    Chưa thanh toán
                                                                </button>
                                                            }
                                                        </td>
                                                        <td style={{ textAlign: "center" }}>
                                                            {item.isPay === true ?
                                                                <button
                                                                    className="btn mx-3"
                                                                    style={{ color: "white", backgroundColor: '#0d6efd' }}
                                                                    disabled="true"
                                                                >
                                                                    Đã Xác nhận
                                                                </button>
                                                                : <button
                                                                    className="btn"
                                                                    style={{ color: "white", backgroundColor: '#0d6efd' }}
                                                                    onClick={() => this.handleConfirmPayment(item)}
                                                                >
                                                                    Xác nhận
                                                                </button>
                                                            }

                                                        </td>

                                                    </tr>
                                                );
                                            })
                                        ) : (
                                            <tr>
                                                <td colSpan="9" style={{ textAlign: "center" }}>
                                                    {language === LANGUAGES.VI ? "Không có hóa đơn khám bệnh" : "No medical bills"}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StatisticInvoice));
