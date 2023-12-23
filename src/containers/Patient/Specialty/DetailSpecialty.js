import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./DetailSpecialty.scss";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import HomeHeader from "../../HomePage/HomeHeader";
import { getDoctorInforBySpecialtyAndProvince } from "../../../services/doctorService";
import { getAllcode } from "../../../services/userService";
import { getSpecialtyById } from "../../../services/specialtyService";
import _ from "lodash";
import { LANGUAGES } from "../../../utils";

class DetailSpecialty extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrDoctor: [],
            dataDetailSpecialty: {},
            listProvince: [],
        };
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let res = await getDoctorInforBySpecialtyAndProvince(id, "");
            let resProvince = await getAllcode("PROVINCE");
            let resSpecialty = await getSpecialtyById(id)
            if (res && res.code === 200 && resProvince && resProvince.code === 200) {
                let data = res.data;
                let arrDoctor = [];
                if (data && !_.isEmpty(data)) {
                    let arr = data;
                    if (arr && arr.length > 0) {
                        arr.map((item) => {
                            arrDoctor.push(item.user.id);
                        });
                    }
                }

                let dataProvince = resProvince.data;

                if (dataProvince && dataProvince.length > 0) {
                    dataProvince.unshift({
                        createdAt: null,
                        keyMap: "",
                        type: "PROVINCE",
                        valueEn: "ALL",
                        valueVi: "Toàn quốc",
                    });
                }

                this.setState({
                    dataDetailSpecialty: resSpecialty.data,
                    arrDoctor: arrDoctor,
                    listProvince: dataProvince ? dataProvince : [],
                });
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }
    handleOnChangeSelect = async (event) => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            let location = event.target.value;

            let res = await getDoctorInforBySpecialtyAndProvince(id, location);
            let resSpecialty = await getSpecialtyById(id)

            if (res && res.code === 200) {
                let data = res.data;
                let arrDoctor = [];
                if (data && !_.isEmpty(res.data)) {
                    let arr = data;
                    if (arr && arr.length > 0) {
                        arr.map((item) => {
                            arrDoctor.push(item.user.id);
                        });
                    }
                }

                this.setState({
                    dataDetailSpecialty: resSpecialty.data,
                    arrDoctor: arrDoctor,
                });
            }
        }
    };
    render() {
        let { arrDoctor, dataDetailSpecialty, listProvince } = this.state;
        let { language } = this.props;

        return (
            <div className="detail-specialty-container">
                <HomeHeader />
                <div className="detail-specialty-body">
                    <div className="description-specialty">
                        {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) && (
                            <div //neu khong co thuoc tinh nay se in ra noi dung HTML
                                dangerouslySetInnerHTML={{ __html: dataDetailSpecialty.descriptionHTML, }}
                            ></div>
                        )}
                    </div>
                    <div className="search-sp-doctor">
                        <select onChange={(event) => this.handleOnChangeSelect(event)}>
                            {listProvince &&
                                listProvince.length > 0 &&
                                listProvince.map((item, index) => {
                                    return (
                                        <option key={index} value={item.keyMap}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </option>
                                    );
                                })}
                        </select>
                    </div>
                    {arrDoctor &&
                        arrDoctor.length > 0 &&
                        arrDoctor.map((item, index) => {
                            return (
                                <div className="each-doctor" key={index}>
                                    <div className="dt-content-left">
                                        <div className="profile-doctor">
                                            <ProfileDoctor
                                                doctorId={item}
                                                isShowDescriptionDoctor={true}
                                                isShowLinkDetail={true}
                                                isShowPrice={false}
                                            //   dataTime={dataTime}
                                            />
                                        </div>
                                    </div>
                                    <div className="dt-content-right">
                                        <div className="doctor-schedule">
                                            <DoctorSchedule doctorIdFromParent={item} />
                                        </div>
                                        <div className="doctor-extra-infor">
                                            <DoctorExtraInfor doctorIdFromParent={item} />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { language: state.app.language };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);