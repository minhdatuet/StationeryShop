import React from "react";
import style from './TeamMember.module.scss';
import clsx from "clsx";

const TeamMember = () => {
    return (
        <div className={clsx(style.container)} id="team-member">
            <h1>Team Member</h1>
            <div className={clsx(style["members-container"])}>
                <div className={clsx(style["specific-member"])}>
                    <img src="https://prodwebimage.ecomexpress.in/Rectangle_1_0deec69ea4.png" alt="" />
                    <div className={clsx(style["name-member"])}>Đặng Tiếng Dũng</div>
                </div>
                <div className={clsx(style["specific-member"])}>
                    <img src="https://prodwebimage.ecomexpress.in/Rectangle_1_0deec69ea4.png" alt="" />
                    <div className={clsx(style["name-member"])}>Lê Minh Đạt</div>
                </div>
                <div className={clsx(style["specific-member"])}>
                    <img src="https://prodwebimage.ecomexpress.in/Rectangle_1_0deec69ea4.png" alt="" />
                    <div className={clsx(style["name-member"])}>Nguyễn Cao Đức</div>
                </div>
            </div>
        </div>
    )
}

export default TeamMember;
