import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";


class HandBook extends Component {


    render() {

        return (
            <div className='section-share section-handBook'>
                <div className='section-container'>
                    <div className="section-header">
                        <span className='title-section'>Cẩm nang</span>
                        <button className='btn-section'>Xem thêm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            <a target="_blank" href="https://bookingcare.vn/cam-nang/xoa-quang-tham-mat-gia-bao-nhieu-tai-tphcm-p5954.html" style={{ color: 'green' }}>
                                <div className='section-customize'>
                                    <div className='bg-img section-handbook-1' />
                                    <div>Xóa quầng thâm mắt giá bao nhiêu tại TPHCM?</div>
                                </div>
                            </a>
                            <a target="_blank" href="https://bookingcare.vn/cam-nang/lieu-trinh-tri-mun-lung-bao-nhieu-tien-chi-phi-tri-mun-lung-tphcm-p5943.html">
                                <div className='section-customize'>
                                    <div className='bg-img section-handbook-2' />
                                    <div>Liệu trình trị mụn lưng bao nhiêu tiền?</div>
                                </div>
                            </a>

                            <a target="_blank" href="https://bookingcare.vn/cam-nang/xet-nghiem-nipt-tai-ha-noi-bao-nhieu-tien-review-chi-tiet-bang-gia-p4154.html">
                                <div className='section-customize'>
                                    <div className='bg-img section-handbook-3' />
                                    <div>Xét nghiệm NIPT tại Hà Nội bao nhiêu tiền?</div>
                                </div>
                            </a>

                            <a target="_blank" href="https://bookingcare.vn/cam-nang/tre-hoa-da-mat-bang-cong-nghe-cao-la-gi-diem-danh-7-dia-chi-tre-hoa-da-mat-uy-tin-tai-tp-hcm-p5916.html">
                                <div className='section-customize'>
                                    <div className='bg-img section-handbook-4' />
                                    <div>Trẻ hóa da mặt bằng công nghệ cao là gì?</div>
                                </div>
                            </a>

                            <a target="_blank" href="https://bookingcare.vn/cam-nang/tre-hoa-ban-tay-co-nhung-phuong-phap-nao-top-6-dia-chi-tre-hoa-tay-uy-tin-tai-tp-hcm-p5917.html">
                                <div className='section-customize'>
                                    <div className='bg-img section-handbook-5' />
                                    <div>Trẻ hoá bàn tay có những phương pháp nào?</div>
                                </div>
                            </a>
                            <a target="_blank" href="https://bookingcare.vn/cam-nang/tre-hoa-da-vung-co-bang-cong-nghe-nao-dia-chi-tre-hoa-da-vung-co-uy-tin-tai-tphcm-p5951.html">
                                <div className='section-customize'>
                                    <div className='bg-img section-handbook-6' />
                                    <div>Trẻ hoá da vùng cổ bằng công nghệ nào? </div>
                                </div>
                            </a>
                        </Slider>
                    </div>

                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
