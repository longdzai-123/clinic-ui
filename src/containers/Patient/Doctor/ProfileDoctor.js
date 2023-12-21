import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ProfileDoctor.scss";
import { getProfileDoctorById } from "../../../services/doctorService";
import { LANGUAGES } from "../../../utils";
import { NumericFormat } from "react-number-format";
import _ from "lodash";
import moment from "moment";
import localization from "moment/locale/vi"; //su dung chung cho cai mac dinh la tieng viet
import { Link } from "react-router-dom";

class ProfileDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataProfile: {},
        };
    }

    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId);
        this.setState({
            dataProfile: data,
        });
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
        if (this.props.doctorId !== prevProps.doctorId) {
            let data = await this.getInforDoctor(this.props.doctorId);
            this.setState({
                dataProfile: data,
            });
        }
    }

    getInforDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctorById(id);
            if (res && res.code === 200 && res.data) {
                result = res.data;
            }
        }
        return result;
    };

    renderTimeBooking = (dataTime) => {
        let { language } = this.props;
        console.log(dataTime)
        if (dataTime && !_.isEmpty(dataTime)) {
            let time = language === LANGUAGES.VI ? dataTime.valueVi : dataTime.valueEn;

            let date = language === LANGUAGES.VI
                ? moment(dataTime.date).format("dddd - DD/MM/YYYY")
                : moment(dataTime.date).locale("en").format("ddd - MM/DD/YYYY");
            return (
                <>
                    <div>
                        {time} - {date}
                    </div>
                    <div>
                        <FormattedMessage id="patient.booking-modal.priceBooking" />
                    </div>
                </>
            );
        }
        return <></>;
    };
    render() {
        let { dataProfile } = this.state;
        console.log(dataProfile)

        let {
            language,
            isShowDescriptionDoctor,
            dataTime,
            isShowLinkDetail,
            isShowPrice,
            doctorId,
        } = this.props;
        let nameVi = "",
            nameEn = "";
        if (dataProfile) {
            nameVi = `${dataProfile.positionVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
            nameEn = `${dataProfile.positionEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
        }
        return (
            <div className="profile-doctor-container">
                <div className="intro-doctor">
                    <div
                        className="content-left "
                        style={{
                            backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ""})`,
                        }}
                    ></div>
                    <div className="content-right">
                        <div className="up">
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                        </div>
                        <div className="down">
                            {isShowDescriptionDoctor === true ? (
                                <>
                                    {dataProfile && dataProfile.description && (
                                        <span>{dataProfile.description}</span>
                                    )}
                                </>
                            ) : (
                                <>{this.renderTimeBooking(dataTime)}</>
                            )}
                        </div>
                    </div>
                </div>
                {isShowLinkDetail === true && (
                    <div className="view-detail-doctor">
                        <Link to={`/detail-doctor/${doctorId}`}>Xem thêm</Link>
                    </div>
                )}
                {isShowPrice === true && (
                    <div className="price">
                        <FormattedMessage id="patient.booking-modal.price" />
                        {dataProfile && dataProfile.priceVi && language === LANGUAGES.VI && (
                            <NumericFormat
                                className="currency"
                                value={dataProfile.priceVi}
                                displayType={"text"}
                                thousandSeparator={true}
                                suffix={"VND"}
                            />
                        )}
                        {dataProfile && dataProfile.priceEn && language === LANGUAGES.EN && (
                            <NumericFormat
                                className="currency"
                                value={dataProfile.priceEn}
                                displayType={"text"}
                                thousandSeparator={true}
                                suffix={"$"}
                            />
                        )}
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
