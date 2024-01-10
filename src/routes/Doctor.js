import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import ManageSchedule from "../containers/System/Doctor/ManageSchedule";
import Header from '../containers/Header/Header';
import ManagePatient from "../containers/System/Doctor/ManagePatient";
import CreateRemedy from '../containers/System/Doctor/CreateRemedy';
import EditRemedy from '../containers/System/Doctor/EditRemedy';

class Doctor extends Component {
    render() {

        const { isLoggedIn } = this.props;
        return (
            <>
                {isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/doctor/manage-schedule" component={ManageSchedule} />
                            <Route path="/doctor/manage-patient" component={ManagePatient} />
                            <Route path="/doctor/create-remedy/:id" component={CreateRemedy} />
                            <Route path="/doctor/edit-remedy/:id" component={EditRemedy} />
                        </Switch>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
