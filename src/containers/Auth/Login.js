import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
            errMessage: ""
        }
    }

    handleOnChangeUsername = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    handleOnChangePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    handleLogin = async () => {
        try {
            let data = await handleLoginApi(this.state.username, this.state.password)
            console.log(data)
            if (data.code === 200) {
                this.props.userLoginSuccess(data.data)
            }
            if (data.code === 403001) {
                if (this.props.language === "vi") {
                    this.setState({
                        errMessage: "Tài khoản chưa được active!",
                    });
                } else {
                    this.setState({
                        errMessage: "Account has not been activated yet!",
                    });
                }
            }

            else {
                if (this.props.language === "vi") {
                    this.setState({
                        errMessage: "Những thông tin đăng nhập này không khớp với hồ sơ của chúng tôi.",
                    });
                } else {
                    this.setState({
                        errMessage: "These credentials do not match our records.",
                    });
                }
            }
        } catch (e) {
        }
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    handleKeyDown = (event) => {
        if (event.key === "Enter") {
            this.handleLogin();
        }
    };

    handleSignUp = () => {
        if (this.props.history) {
            this.props.history.push(`/sign-up`);
        }
    }



    render() {
        let { errMessage } = this.state
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>Username:</label>
                            <input type='text'
                                className='form-control'
                                placeholder='Enter your username'
                                value={this.state.username}
                                onChange={(e) => this.handleOnChangeUsername(e)}
                            />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password:</label>
                            <div className='custom-input-password'>
                                <input type={this.state.isShowPassword ? 'text' : 'password'}
                                    className='form-control'
                                    placeholder='Enter your password'
                                    value={this.state.password}
                                    onChange={(e) => this.handleOnChangePassword(e)}
                                    onKeyDown={(event) => this.handleKeyDown(event)}
                                />
                                <span onClick={() => { this.handleShowHidePassword() }}>
                                    <i className={this.state.isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                                </span>

                            </div>
                        </div>
                        <div className="col-12" style={{ color: "red" }}>
                            {errMessage}
                        </div>
                        <div className='col-12'>
                            <button className='btn-login' onClick={() => { this.handleLogin() }}>Login</button>
                        </div>
                        <div className="col-12 section-forgot-signup">
                            <span className="forgot-password pointer"
                            // onClick={() => {
                            //     history.push("/forgot-password");
                            // }}
                            >
                                <FormattedMessage id={"login.forgot-password"} />
                            </span>
                            <span
                                className="sign-up"
                                // onClick={() => {
                                //     history.push("/sign-up");
                                // }}
                                onClick={() => { this.handleSignUp() }}
                            >
                                <FormattedMessage id={"login.sign-up"} />
                            </span>
                        </div>

                        <div className='col-12'>
                            <span className='forgot-password'>Forgot your password?</span>
                        </div>
                        <div className='col-12 text-center mt-3'>
                            <span className='text-other-login'>Or Login with:</span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
