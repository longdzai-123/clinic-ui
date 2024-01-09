import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./RemedyModal.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import { toast } from "react-toastify";
import moment from "moment";
import localization from "moment/locale/vi"; //su dung chung cho cai mac dinh la tieng viet
import { CommonUtils } from "../../../utils";

class RemedyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      imgBase64: "",
      description: "",
    };
  }

  async componentDidMount() {
    if (
      this.props.dataModal &&
      this.props.dataModal.imageRemedy &&
      this.props.dataModal.email
    ) {
      let base64data = new Buffer(
        this.props.dataModal.imageRemedy,
        "base64"
      ).toString("binary");
      this.setState({
        imgBase64: base64data,
        email: this.props.dataModal.email,
      });
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.dataModal.imageRemedy !== prevProps.dataModal.imageRemedy) {
      if (
        this.props.dataModal &&
        this.props.dataModal.imageRemedy &&
        this.props.dataModal.email
      ) {
        let base64dataImage = new Buffer(
          this.props.dataModal.imageRemedy,
          "base64"
        ).toString("binary");
        this.setState({
          imgBase64: base64dataImage,
          email: this.props.dataModal.email,
          isShowChooseOtherFile: false,
          isShowBtnChooseOtherFile: true,
        });
      }
    }
  }

  handleOnChangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];

    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      console.log("base64", base64);

      this.setState({
        imgBase64: base64,
      });
    }
  };

  handleSendRemedy = () => {
    this.props.sendRemedy(this.state);
  };

  handleOnChangeDescription = (event) => {
    this.setState({
      description: event.target.value
    });
  };
  render() {
    let { isOpenModal, closeRemedyModal, dataModal, sendRemedy } = this.props;
    let { email } = this.state

    return (
      <Modal
        isOpen={isOpenModal}
        className={"booking-modal-container"}
        size="md"
        centered
      >
        <div className="modal-header">
          <h5 className="modal-title"><FormattedMessage id={"manage-patient.send-prescriptions-to-patients"} /></h5>
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={closeRemedyModal}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <ModalBody>
          <div className="row">
            <div className="col-6 form-group">
              <label><FormattedMessage id={"manage-patient.email-patient"} /></label>
              <input
                className="form-control"
                type="email"
                value={dataModal.email}
                onChange={(event) => this.handleOnChangeEmail(event)}
              />
            </div>
            <div className="col-6 form-group">
              <label><FormattedMessage id={"manage-patient.select-the-prescription-file"} /></label>
              <input
                className="form-control-file"
                type="file"
                onChange={(event) => this.handleOnChangeImage(event)}
              />
            </div>
          </div>
          <div class="col-12 form-group my-5">
            <label>Chuẩn đoán bệnh</label>
            <textarea
              className="form-control"
              aria-label="With textarea"
              value={this.state.description}
              onChange={(event) => this.handleOnChangeDescription(event)}
            >
            </textarea>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => this.handleSendRemedy()}>
            <FormattedMessage id={"manage-patient.send"} />
          </Button>{" "}
          <Button color="secondary" onClick={closeRemedyModal}>
            <FormattedMessage id={"manage-patient.cancel"} />
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return { language: state.app.language, genders: state.admin.genders };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
