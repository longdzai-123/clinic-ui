import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Home extends Component {

    render() {
        const { isLoggedIn, userInfor } = this.props;
        let linkToRedirect;
        if (isLoggedIn) {
            if (userInfor.roleId === 'R1') {
                linkToRedirect = '/system/user-manage';
            }
            if (userInfor.roleId === 'R2') {
                linkToRedirect = '/doctor/manage-schedule';
            }
        }
        else {
            linkToRedirect = '/home';
        }

        return (
            <Redirect to={linkToRedirect} />
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfor: state.user.userInfor,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
