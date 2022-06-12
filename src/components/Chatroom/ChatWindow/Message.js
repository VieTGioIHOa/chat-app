import React from "react";
import { formatRelative } from 'date-fns/esm';
import { AuthContext } from '../../../context/AuthProvider'
function Message({ messages }) {

    const { uid } = React.useContext(AuthContext)

    function formatDate(seconds) {
        let formattedDate = '';

        if (seconds) {
            formattedDate = formatRelative(new Date(seconds * 1000), new Date());

            return formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
        }
    }
    return (
        <div className="overflow-auto flex-1 flex flex-col-reverse">
            <div className="flex flex-col justify-end">
                {messages.map((message, id) => (
                    message.uid === uid ?
                        <div key={id} className="mt-1 ml-auto mr-3 bg-blue-200 rounded-lg px-3 py-2">
                            <div className="flex items-center">
                                {message.photoURL ? <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" alt='n0image' src={message.photoURL} />
                                    : <div className="h-8 w-8 rounded-full text-white flex items-center justify-center bg-orange-500">{message.displayName.charAt(0).toUpperCase()}</div>}
                                <p className="font-bold text-[16px] ml-[6px]">{message.displayName}</p>
                                <p className="text-[12px] text-slate-400 ml-[12px]">{formatDate(message.createAt?.seconds)}</p>
                            </div>
                            <div>
                                <p className="text-[#333] text-[14px] ml-[38px]">{message.text}</p>
                            </div>
                        </div>
                        :
                        <div key={id} className="mt-1 mr-auto bg-slate-200 rounded-lg px-3 py-2">
                            <div className="flex items-center">
                                {message.photoURL ? <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" alt='n0image' src={message.photoURL} />
                                    : <div className="h-8 w-8 rounded-full text-white flex items-center justify-center bg-orange-500">{message.displayName.charAt(0).toUpperCase()}</div>}
                                <p className="font-bold text-[16px] ml-[6px]">{message.displayName}</p>
                                <p className="text-[12px] text-slate-400 ml-[12px]">{formatDate(message.createAt?.seconds)}</p>
                            </div>
                            <div>
                                <p className="text-[#333] text-[14px] ml-[38px]">{message.text}</p>
                            </div>
                        </div>
                ))}
            </div>
        </div>
    )
}

export default Message;