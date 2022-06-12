import { collection } from "firebase/firestore";
import React from "react";
import { AppContext } from "../../../context/AppProvider";
import { AuthContext } from "../../../context/AuthProvider";
import { db } from "../../../firebase/config";
import { addDocument } from '../../../firebase/service'
import useFireStore from "../../../hooks/useFireStore";
import Message from "./Message";

function Content() {
    const [inputValue, setInputValue] = React.useState('')
    const { uid, photoURL, displayName } = React.useContext(AuthContext)
    const { selectedRoomId } = React.useContext(AppContext)
    const inputRef = React.useRef()

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue) {
            addDocument(collection(db, 'messages'), {
                text: inputValue,
                uid,
                photoURL: photoURL,
                roomId: selectedRoomId,
                displayName
            })
        }
        inputRef.current.focus()
        setInputValue('')
    }
    const messageCondition = React.useMemo(() => ({
        fieldName: 'roomId',
        operator: '==',
        compareValue: selectedRoomId
    }), [selectedRoomId])


    const messages = useFireStore('messages', messageCondition)

    return (
        <>
            <Message messages={messages} />
            <form className="flex w-full mt-3">
                <input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="border-solid border-[1px] border-grey p-[8px] flex-1"
                    placeholder="Mời nhập tin nhắn"
                    required
                />
                <button type="text"
                    className="p-[8px] border-solid border-[1px] ml-[30px] border-grey rounded"
                    onClick={handleSubmit}
                >
                    Gửi
                </button>
            </form>
        </>
    )
}


export default Content
