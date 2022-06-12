import React from "react";

import UserInfo from "./UserInfo";
import ListRoom from "./ListRoom";

function Sidebar() {

    return (
        <div className="bg-gradient-to-r from-indigo-500 to-pink-800  h-screen p-[20px] w-[400px]">
            <div>
                <UserInfo />
            </div>
            <div className="">
                <ListRoom />
            </div>
        </div>
    )
}

export default Sidebar;