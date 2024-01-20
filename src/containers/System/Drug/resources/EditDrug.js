import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { getDrugById, updateDrug } from "../../../../services/drugService";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../../utils";
import * as actions from "../../../../store/actions";
import { toast } from "react-toastify";
import Select from "react-select";
import _ from "lodash";



class EditDrug extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drugName: "",
            selectedUnit: {},
            units: []
        };
    }

    async componentDidMount() {
        this.props.getListUnit();
        await this.getDrugDetail()
    }

    getDrugDetail = async () => {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let drugId = this.props.match.params.id
            let res = await getDrugById(drugId);
            if (res && res.code === 200 && res.data) {
                this.setState({
                    drugName: res.data.name,
                    selectedUnit: {
                        label: res.data.unit.valueVi,
                        value: res.data.unit.id
                    }
                })
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.language !== prevProps.language) {
        }
        if (prevProps.units !== this.props.units) {
            let dataSelect = this.buildDataInputSelect(this.props.units);
            this.setState({
                units: dataSelect,
            });
        }
    }

    buildDataInputSelect = (inputData) => {
        let result = [];
        if (inputData && inputData.length > 0) {
            inputData.map((item, index) => {
                let object = {};
                object.label = item.valueVi;
                object.value = item.id;
                result.push(object);
            });
        }
        return result;
    };

    handleChangeSelectUnits = async (selectedOption) => {
        this.setState({ selectedUnit: selectedOption });
    };


    handleOnChangeInput = (e) => {
        this.setState({
            drugName: e.target.value,
        });
    };

    handleSaveNewDrug = async () => {
        let drugId = this.props.match.params.id
        let { language } = this.props;
        let { selectedUnit, drugName } = this.state;
        if (!drugName) {
            if (this.props.language == "en") {
                toast.error("Invalid date!");
            } else {
                toast.error("Chưa nhập tên thuốc!");
            }
            return;
        }
        if (selectedUnit && _.isEmpty(selectedUnit)) {
            if (this.props.language == "en") {
                toast.error("Invalid selected doctor!");
            } else {
                toast.error("Chưa chọn đơn vị!");
            }
            return;
        }

        let res = await updateDrug({
            id: drugId,
            name: drugName,
            unit: {
                id: selectedUnit.value
            }
        });

        if (res && res.code === 200 && res.data) {
            if (language === "en") {
                toast.success("Update drug succeed!");
            } else {
                toast.success("Cập nhật thuốc thành công!");
            }

            await this.getDrugDetail();
            setTimeout(function () { window.location.href = '/system/manage-drug' }, 1000);

        } else {
            if (language === "en") {
                toast.error("Something wrongs!");
            } else {
                toast.error("Lỗi!");
            }

            await this.getDrugDetail();
        }
    };

    render() {
        let { language } = this.props;
        let { units } = this.state;
        return (
            <div className="manage-specialty-container">
                <div className="ms-title">Chỉnh sửa thuốc</div>
                <div className="add-new-specialty row">
                    <div className="col-6 form-group">
                        <label>Tên thuốc</label>
                        <input
                            className="form-control"
                            type="text"
                            value={this.state.drugName}
                            onChange={(e) => this.handleOnChangeInput(e)}
                        />
                    </div>
                    <div className="col-6 form-group">
                        <label>Đơn vị</label>
                        <Select
                            value={this.state.selectedUnit}
                            onChange={(e) => this.handleChangeSelectUnits(e)}
                            options={units}
                        />
                    </div>
                    <div className="col-12">
                        <button
                            className="btn btn-warning mt-30 my-3"
                            onClick={() => this.handleSaveNewDrug()}
                        >
                            {language == "en" ? "Update" : "Cập nhật"}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        units: state.admin.allUnits,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getListUnit: () => dispatch(actions.fetchAllUnits()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditDrug);
