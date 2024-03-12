import React from "react";
import './TeamMember.css';

const TeamMember = () => {
    return (
        <div className="container" id="team">
            <h1>Thành viên nhóm</h1>
            <div className="members-container">
                <div className="specific-member">
                    <img src="https://prodwebimage.ecomexpress.in/Rectangle_1_0deec69ea4.png" alt="" />
                    <div className="name-member">Đặng Tiếng Dũng</div>
                </div>
                <div className="specific-member">
                    <img src="https://prodwebimage.ecomexpress.in/Rectangle_1_0deec69ea4.png" alt="" />
                    <div className="name-member">Lê Minh Đạt</div>
                </div>
                <div className="specific-member">
                    <img src="https://prodwebimage.ecomexpress.in/Rectangle_1_0deec69ea4.png" alt="" />
                    <div className="name-member">Nguyễn Cao Đức</div>
                </div>
            </div>
        </div>
    )
}

export default TeamMember;
