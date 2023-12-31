import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MedicalFacility.scss'
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils";
import { withRouter } from "react-router";
class OutStandingDoctor extends Component {

  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorsRedux,
      });
    }
  }

  handleOnClickSeeMoreDoctor = () => {
    if (this.props.history) {
      this.props.history.push(`/list-oustanding-doctor`);
    }
  };

  componentDidMount() {
    this.props.loadTopDoctors(10);
  }

  handleViewDetailDoctor = (doctor) => {
    if (this.props.history) {
      this.props.history.push(`/detail-doctor/${doctor.id}`);
    }
  };

  render() {
    let arrDoctors = this.state.arrDoctors;
    let { language } = this.props;
    return (
      <div className='section-share section-outstanding-doctor'>
        <div className='section-container'>
          <div className="section-header">
            <span className='title-section'><FormattedMessage id="homepage.outstanding-doctor" /></span>
            <button className='btn-section' onClick={() => this.handleOnClickSeeMoreDoctor()}>
              <FormattedMessage id="homepage.more-infor" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {arrDoctors && arrDoctors.length > 0 && arrDoctors.map((item, index) => {
                let imageBase64 = "";
                if (item.image) {
                  imageBase64 = item.image;
                }
                let nameVi = `${item.valueVi}, ${item.lastName} ${item.firstName}`;
                let nameEn = `${item.valueEn}, ${item.firstName} ${item.lastName}`;
                return (
                  <div className='section-customize'
                    key={index}
                    onClick={() => this.handleViewDetailDoctor(item)}
                  >
                    <div className="customize-border">
                      <div className='outer-bg'>
                        <div className='bg-img section-outstanding-doctor'
                          style={{
                            backgroundImage: `url(${imageBase64})`,
                          }}
                        />
                      </div>
                      <div className='position text-center'>
                        <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                        <div>{item.nameSpecialty}</div>
                      </div>
                    </div>
                  </div>
                )
              })
              }
            </Slider>
          </div>

        </div >
      </div >
    );
  }

}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    topDoctorsRedux: state.admin.topDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadTopDoctors: (limit) => dispatch(actions.fetchTopDoctor(limit)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor)
);
