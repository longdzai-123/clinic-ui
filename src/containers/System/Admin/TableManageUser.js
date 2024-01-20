import React, { Component } from "react";
import { connect } from "react-redux";
import "./TableManageUser.scss";
import * as actions from "../../../store/actions";
import { activeAccount } from "../../../services/userService";
import { toast } from "react-toastify";


class TableManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersRedux: [],
        };
    }

    componentDidMount() {
        this.props.fetchUserRedux()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listUsers !== this.props.listUsers) {
            this.setState({
                usersRedux: this.props.listUsers,
            });
        }
    }

    handleDeleteUser = (user) => {
        this.props.deleteAUserRedux(user.id);
    };

    handleEditUser = (user) => {
        console.log("user", user)
        this.props.handleEditUserFromParentKey(user)
    };

    handleActive = async (item) => {
        this.setState({ isShowLoading: true });
        let res = await activeAccount(item.id)
        if (res && res.code === 200) {
            this.setState({ isShowLoading: false });

            if (this.props.language == "en") {
                if (res.data.isActive === true) {
                    toast.success("Active account successful!");
                } else {
                    toast.success("InActive account successful!");
                }
            } else {
                if (res.data.isActive === true) {
                    toast.success("Active tài khoản thành công!");
                } else {
                    toast.success("InActive tài khoản thành công");
                }
            }
            this.props.fetchUserRedux()
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
        let arrUsers = this.state.usersRedux;
        let language = this.props.language;

        return (
            <table id="TableManageUser">
                <tbody>
                    <tr>
                        <th>Email</th>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>Address</th>
                        <th>Active</th>
                        <th>Actions</th>
                    </tr>
                    {arrUsers && arrUsers.length > 0 && arrUsers.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.email}</td>
                                <td>{item.firstName}</td>
                                <td>{item.lastName}</td>
                                <td>{item.address}</td>
                                <td style={{ textAlign: "center" }}>
                                    {item.isActive === true ?
                                        <button
                                            className="btn"
                                            style={{ backgroundColor: 'rgb(52 231 146)' }}
                                            onClick={() => this.handleActive(item)}
                                        >
                                            Active
                                        </button>
                                        :
                                        < button
                                            className="btn"
                                            style={{ backgroundColor: '#ffc107' }}
                                            onClick={() => this.handleActive(item)}
                                        >
                                            Inactive
                                        </button>
                                    }
                                </td>
                                <td>
                                    <button
                                        onClick={() => this.handleEditUser(item)}
                                        className="btn-edit"
                                    >
                                        <i className="fas fa-pencil-alt"></i>
                                    </button>
                                    <button
                                        className="btn-delete"
                                        onClick={() => this.handleDeleteUser(item)}
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        listUsers: state.admin.users,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
