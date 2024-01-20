import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManageDrug.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import { getAllDrug, deleteDrug, filterDrugs } from "../../../services/drugService";
import { toast } from "react-toastify";
import { withRouter } from "react-router";


const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDrug extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            listDrug: []
        };
    }

    async componentDidMount() {
        await this.getAllDrugs()
    }

    getAllDrugs = async () => {
        let res = await getAllDrug()
        if (res && res.code === 200 && res.data) {
            let allDrugs = res.data.reverse()
            this.setState({
                listDrug: allDrugs
            })
            console.log("res", res)
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
    }

    handleOnChangeInput = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy,
        });
    };

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionHTML: html,
            descriptionMarkdown: text,
        });
    };

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);

            this.setState({
                imageBase64: base64,
            });
        }
    };

    // handleSaveNewSpecialty = async () => {
    //     let res = await createNewSpecialty(this.state);

    //     if (res && res.errCode === 0) {
    //         if (this.props.language == "en") {
    //             toast.success("Add new specialty succeeds!");
    //         } else {
    //             toast.success("Thêm chuyên khoa thành công!");
    //         }

    //         this.setState({
    //             name: "",
    //             imageBase64: "",
    //             descriptionHTML: "",
    //             descriptionMarkdown: "",
    //         });
    //     } else {
    //         if (this.props.language == "en") {
    //             toast.error("Something wrongs!");
    //         } else {
    //             toast.error("Lỗi!");
    //         }

    //     }
    // };

    handleDeleteDrug = async (drugId) => {
        let { language } = this.props;

        let res = await deleteDrug(drugId)
        console.log(res)
        if (res && res.code === 200 && res.data) {
            if (language === "en") {
                toast.success("Deleted!");
            } else {
                toast.success("Đã xóa!");
            }

            await this.getAllDrugs()
        } else {
            if (language === "en") {
                toast.error("Delete failed!");
            } else {
                toast.error("Xóa thất bại!");
            }

            await this.getAllDrugs()
        }
    }


    handleReset = async () => {
        this.setState({
            name: "",
        });

        await this.getAllDrugs()
    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state };

        copyState[id] = event.target.value;

        this.setState({
            ...copyState,
        });
    };

    toEditDrug = (id) => {
        if (this.props.history) {
            this.props.history.push(`/system/edit-drug/${id}`);
        }
    };
    toCreateDrug = () => {
        if (this.props.history) {
            this.props.history.push(`/system/create-drug`);
        }
    };

    handleFilterDrug = async () => {
        let {
            name
        } = this.state;

        let res = await filterDrugs(name)

        if (res && res.data) {
            let allDrug = res.data.reverse()
            this.setState({
                listDrug: allDrug
            })
        }
    }

    render() {
        let { listDrug } = this.state;

        return (
            <div className="manage-specialty-container">
                <div className="ms-title">
                    Quản lý thuốc
                </div>
                <div class="row">
                    <div class="col-12">
                        <h3><FormattedMessage id="medical-history.filters" /></h3>
                    </div>
                    <div class="col-3">
                        <div class="form-group">
                            <label for="exampleInputEmail1">
                                Tên thuốc
                            </label>
                            <input value={this.state.name} onChange={(event) =>
                                this.onChangeInput(event, "name")}
                                type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                                placeholder=""
                            />
                        </div>
                    </div>
                    <div class="col-12">
                        <button onClick={() => this.handleFilterDrug()} type="button" class="btn btn-primary my-3">
                            <FormattedMessage id="medical-history.apply" />
                        </button>
                        <button onClick={() => this.handleReset()} type="button" class="btn btn-warning mx-3">
                            <FormattedMessage id="medical-history.reset" />
                        </button>
                    </div>
                </div>

                <div class="row">
                    <div class="col-12 text-right mb-16">
                        <button type="submit" class="btn btn-primary pointer mx-4"
                            onClick={() => { this.toCreateDrug() }}
                        ><i class="fas fa-plus-circle mr-5"></i><FormattedMessage id="manage-user.btn-create" /></button>
                    </div>
                </div>

                <table class="table table-striped mt-30">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Tên thuốc</th>
                            <th scope="col">Đơn vị</th>
                            <th scope="col">Ngày tạo</th>
                            <th scope="col">Ngày cập nhật</th>
                            <th scope="col" class="text-right">&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listDrug.map((drug, index) => {
                                return (
                                    <tr>
                                        <td scope="row">{index + 1}</td>
                                        <td>{drug.name}</td>
                                        <td>{drug.unit.valueVi}</td>
                                        <td>{drug.createdAt}</td>
                                        <td>{drug.updatedAt}</td>
                                        <td class="text-right" colspan="2">
                                            <button
                                                className="btn-edit"
                                                onClick={() => { this.toEditDrug(drug.id) }}
                                            >
                                                <i className="fas fa-pencil-alt"></i>
                                            </button>
                                            <button
                                                className="btn-delete"
                                                onClick={() => this.handleDeleteDrug(drug.id)}
                                            >
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManageDrug));
