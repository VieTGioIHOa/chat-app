import React from "react";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import UserOnline from "./UserOnline";
import ChatWithUser from "./ChatWithUser";

function Chatroom() {

    return (
        <div className="flex w-[100%]">
            <div className="">
                <Sidebar />
            </div>
            <div className="flex-1">
                <ChatWindow />
                <ChatWithUser />
            </div>
            <div>
                <UserOnline />
            </div>
        </div>
    )

}

export default Chatroom

