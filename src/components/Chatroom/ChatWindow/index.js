import React from "react";


import { AppContext } from "../../../context/AppProvider"
import Header from "./Header";
import Content from "./Content";
import NotRoom from '../../NotRoom'
import NotChatWithser from '../../NotChatWithUser'
function ChatWindow() {

    const { selectedRoom, selectedUserId } = React.useContext(AppContext)

    return (
        selectedRoom ?
            <div className="h-screen px-5 pb-7 flex flex-col">
                <Header />
                <Content />
            </div>
            :
            selectedUserId ? '' : <>
                <NotRoom />
            </>
    )
}

export default ChatWindow