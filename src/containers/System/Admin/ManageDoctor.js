import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import * as actions from "../../../store/actions";

import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

import Select from "react-select";
import { getDetailInforDoctor, getDoctorInfor } from "../../../services/userService";


const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      position: "",
      positionArr: [],

      //save to markdown table
      contentMarkdown: "",
      contentHTML: "",
      selectedOption: "",
      description: "",
      listDoctors: [],
      listDoctorsRaw: [],
      hasOldData: false,

      //save to doctor_infor table
      listPrice: [],
      listPayment: [],
      listProvince: [],
      listClinic: [],
      listSpecialty: [],
      selectedPrice: "",
      selectedPayment: "",
      selectedProvice: "",
      selectedClinic: "",
      selectedSpecialty: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
      clinicId: "",
      specialtyId: "",
      hasInforData: false,
    };
  }

  componentDidMount = async () => {
    // this.props.getPositionStart();
    this.props.fetchAllDoctors();
    this.props.getAllRequiredDoctorInfor();
    // let res = await filterDoctors({})
    // if (res && res.errCode === 0) {
    //   this.setState({
    //     listDoctorsRaw: res.data
    //   })
    // }
  }

  buildDataInputSelect = (inputData, type) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      if (type === "USERS") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.lastName} ${item.firstName}`;
          let labelEn = `${item.firstName} ${item.lastName}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.id;
          result.push(object);
        });
      }
      if (type === "PRICE") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi}`;
          let labelEn = `${item.valueEn} USD`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
      if (type === "PAYMENT" || type === "PROVINCE") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.valueVi}`;
          let labelEn = `${item.valueEn}`;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
      if (type === "SPECIALTY") {
        inputData.map((item, index) => {
          let object = {};

          object.label = item.name;
          object.value = item.id;
          result.push(object);
        });
      }

      if (type === "CLINIC") {
        inputData.map((item, index) => {
          let object = {};

          object.label = item.name;
          object.value = item.id;
          result.push(object);
        });
      }
    }
    return result;
  };


  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPositions = this.props.positionRedux;
      this.setState({
        positionArr: arrPositions,
      });
    }

    if (prevProps.allDoctors !== this.props.allDoctors) {
      this.setState({
        listDoctorsRaw: this.props.allDoctors
      })
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors, "USERS");
      this.setState({
        listDoctors: dataSelect,
      });
    }

    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors, "USERS");
      this.setState({
        listDoctors: dataSelect,
      });
    }

    if (prevProps.allDoctors !== this.props.allDoctors) {
      this.setState({
        listDoctorsRaw: this.props.allDoctors
      })
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors, "USERS");
      this.setState({
        listDoctors: dataSelect,
      });
    }


    if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
      let { resPayment, resPrice, resProvince, resSpecialty, resClinic } = this.props.allRequiredDoctorInfor;
      console.log(resPayment, resPrice, resProvince)
      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = this.buildDataInputSelect(resProvince, "PROVINCE");
      let dataSelectSpecialty = this.buildDataInputSelect(resSpecialty, "SPECIALTY");
      let dataSelectClinic = this.buildDataInputSelect(resClinic, "CLINIC");
      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
        listSpecialty: dataSelectSpecialty,
        listClinic: dataSelectClinic,
      });
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  //save thong tin bác sỹ

  handleSaveContentMarkdown = () => {
    console.log(this.state.selectedPayment)
    let { hasOldData, hasInforData } = this.state;
    let dataMarkdown = {
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedOption.value,
      action: hasOldData === true ? 'put' : 'post',
    }
    let dataInfor = {
      doctorId: this.state.selectedOption.value,
      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvice: this.state.selectedProvice.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
      clinicId:
        this.state.selectedClinic && this.state.selectedClinic.value
          ? this.state.selectedClinic.value
          : "",
      specialtyId: this.state.selectedSpecialty.value,
      action: hasInforData === true ? 'put' : 'post',
    }
    console.log(dataInfor)
    this.props.saveDetailDoctorAction(dataMarkdown, dataInfor);
  };


  // onchange select doctor
  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedOption });
    let { listPayment, listPrice, listProvince, listSpecialty, listClinic } = this.state;
    let resMarkdown = await getDetailInforDoctor(selectedOption.value);
    let resInfor = await getDoctorInfor(selectedOption.value)
    if (resMarkdown && resMarkdown.code === 200 && resMarkdown.data && resMarkdown.data.markdownsDto.doctorId) {
      let markdown = resMarkdown.data.markdownsDto;
      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        hasOldData: true
      })
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false,
      })
    }

    if (resInfor && resInfor.data) {
      let addressClinic = "",
        nameClinic = "",
        note = "",
        paymentId = "",
        priceId = "",
        provinceId = "",
        specialtyId = "",
        clinicId = "",
        selectedPayment = "",
        selectedPrice = "",
        selectedProvice = "",
        selectedSpecialty = "",
        selectedClinic = "";

      addressClinic = resInfor.data.addressClinic;
      nameClinic = resInfor.data.nameClinic;
      note = resInfor.data.note;
      paymentId = resInfor.data.paymentId;
      priceId = resInfor.data.priceId;
      provinceId = resInfor.data.provinceId;
      specialtyId = resInfor.data.specialtyId;
      clinicId = resInfor.data.clinicId;


      if (paymentId) {
        selectedPayment = listPayment.find((item) => {
          return item && item.value === paymentId;
        });
      }
      if (priceId) {
        selectedPrice = listPrice.find((item) => {
          return item && item.value === priceId;
        });
      }

      if (provinceId) {
        selectedProvice = listProvince.find((item) => {
          return item && item.value === provinceId;
        });
      }
      if (specialtyId) {
        selectedSpecialty = listSpecialty.find((item) => {
          return item && item.value === specialtyId;
        });
      }
      if (clinicId) {
        selectedClinic = listClinic.find((item) => {
          return item && item.value === clinicId;
        });
      }

      this.setState({
        addressClinic: addressClinic,
        nameClinic: nameClinic,
        note: note,
        selectedPayment: selectedPayment,
        selectedPrice: selectedPrice,
        selectedProvice: selectedProvice,
        selectedSpecialty: selectedSpecialty,
        selectedClinic: selectedClinic,
        hasInforData: true
      })
    }
    else {
      this.setState({
        addressClinic: "",
        nameClinic: "",
        note: "",
        selectedPayment: "",
        selectedPrice: "",
        selectedProvice: "",
        selectedSpecialty: "",
        selectedClinic: "",
        hasInforData: false
      })
    }
  };

  handleChangeSelectDoctorInfor = async (selectedOption, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedOption;
    this.setState({
      ...stateCopy,
    });
  };

  handleOnChangeText = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  onChangeInput = (event, id) => {
    let copyState = { ...this.state };

    copyState[id] = event.target.value;

    this.setState({
      ...copyState,
    });
  };

  // handleReset = async () => {
  //   this.setState({
  //     firstName: "",
  //     lastName: "",
  //     position: "",
  //   })

  //   let res = await filterDoctors({})
  //   if (res && res.data) {
  //     this.setState({
  //       listDoctorsRaw: res.data
  //     })
  //   }

  // };

  // handleFilterDoctors = async () => {
  //   let {
  //     firstName,
  //     lastName,
  //     position,
  //   } = this.state;

  //   let data = {
  //     firstName: firstName,
  //     lastName: lastName,
  //     position: position,
  //   }

  //   let res = await filterDoctors(data)
  //   if (res && res.data) {
  //     this.setState({
  //       listDoctorsRaw: res.data
  //     })
  //   }

  // };

  render() {
    let { hasOldData, hasInforData, listSpecialty, listDoctorsRaw, firstName, lastName, position } = this.state;
    let positions = this.state.positionArr;
    let { language } = this.props;

    console.log("listDoctorsRaw", listDoctorsRaw)
    // let arrUsers = this.state.usersRedux;

    // selectedPrice: "",
    // selectedPayment: "",
    // selectedProvice: "",

    return (
      <div>
        <div className="manage-doctor-container">
          <div className="manage-doctor-title">
            <FormattedMessage id="admin.manage-doctor.title" />
          </div>
          <div className="more-infor">
            <div className="content-left form-group">
              <label>
                <FormattedMessage id="admin.manage-doctor.select-doctor" />
              </label>
              <Select
                value={this.state.selectedOption}
                onChange={this.handleChangeSelect}
                options={this.state.listDoctors}
                placeholder={
                  <FormattedMessage id="admin.manage-doctor.select-doctor" />
                }
              />
            </div>
            <div className="content-right form-group">
              <label>
                <FormattedMessage id="admin.manage-doctor.intro" />
              </label>
              <textarea
                className="form-control"
                onChange={(event) =>
                  this.handleOnChangeText(event, "description")
                }
                value={this.state.description}
              ></textarea>
            </div>
          </div>
          <div className="more-infor-extra row">
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="admin.manage-doctor.price" />
              </label>
              <Select
                value={this.state.selectedPrice}
                onChange={this.handleChangeSelectDoctorInfor}
                options={this.state.listPrice}
                placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
                name="selectedPrice"
              />
            </div>
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="admin.manage-doctor.payment" />
              </label>
              <Select
                value={this.state.selectedPayment}
                onChange={this.handleChangeSelectDoctorInfor}
                options={this.state.listPayment}
                placeholder={
                  <FormattedMessage id="admin.manage-doctor.payment" />
                }
                name="selectedPayment"
              />
            </div>
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="admin.manage-doctor.province" />
              </label>
              <Select
                value={this.state.selectedProvice}
                onChange={this.handleChangeSelectDoctorInfor}
                options={this.state.listProvince}
                placeholder={
                  <FormattedMessage id="admin.manage-doctor.province" />
                }
                name="selectedProvice"
              />
            </div>
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="admin.manage-doctor.nameClinic" />
              </label>
              <input
                className="form-control"
                onChange={(event) => this.handleOnChangeText(event, "nameClinic")}
                value={this.state.nameClinic}
              />
            </div>
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="admin.manage-doctor.addressClinic" />
              </label>
              <input
                className="form-control"
                onChange={(event) =>
                  this.handleOnChangeText(event, "addressClinic")
                }
                value={this.state.addressClinic}
              />
            </div>
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="admin.manage-doctor.note" />
              </label>
              <input
                className="form-control"
                onChange={(event) => this.handleOnChangeText(event, "note")}
                value={this.state.note}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="admin.manage-doctor.specialty" />
              </label>
              <Select
                value={this.state.selectedSpecialty}
                onChange={this.handleChangeSelectDoctorInfor}
                options={this.state.listSpecialty}
                placeholder={
                  <FormattedMessage id="admin.manage-doctor.specialty" />
                }
                name="selectedSpecialty"
              />
            </div>
            <div className="col-4 form-group">
              <label>
                <FormattedMessage id="admin.manage-doctor.select-clinic" />
              </label>
              <Select
                value={this.state.selectedClinic}
                onChange={this.handleChangeSelectDoctorInfor}
                options={this.state.listClinic}
                placeholder={
                  <FormattedMessage id="admin.manage-doctor.select-clinic" />
                }
                name="selectedClinic"
              />
            </div>
          </div>
          <div className="manage-doctor-editor">
            <MdEditor
              style={{ height: "300px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.contentMarkdown}
            />
          </div>

          <button
            onClick={() => this.handleSaveContentMarkdown()}
            className={
              hasOldData === true || hasInforData === true
                ? "save-content-doctor"
                : "create-content-doctor"
            }
          >
            {hasOldData === true || hasInforData === true ? (
              <span>
                <FormattedMessage id="admin.manage-doctor.save" />
              </span>
            ) : (
              <span>
                <FormattedMessage id="admin.manage-doctor.add" />
              </span>
            )}
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    positionRedux: state.admin.positions,
    language: state.app.language,
    allDoctors: state.admin.allDoctors,
    allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // getPositionStart: () => dispatch(actions.fetchPositionStart()),
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    getAllRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
    saveDetailDoctorAction: (dataMarkdown, dataInfor) => dispatch(actions.saveDetailDoctorAction(dataMarkdown, dataInfor)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
