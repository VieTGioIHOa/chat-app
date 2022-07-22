import React from 'react'
import { formatRelative } from 'date-fns/esm';
import useFireStore from '../../../hooks/useFireStore';
import { AppContext } from '../../../context/AppProvider'
import { AuthContext } from '../../../context/AuthProvider'
import NotChatWithUser from '../../NotChatWithUser'
import { addDocument } from '../../../firebase/service';
import { collection } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional

function ChatWithUser() {
    const { selectedRoomId, selectedUserId, userOnline } = React.useContext(AppContext)

    const [messageWithUser, setMessageWithUser] = React.useState('')

    const nameUserChating = userOnline.filter(user => user.uid === selectedUserId)[0]?.displayName

    const photoUserChating = userOnline.filter(user => user.uid === selectedUserId)[0]?.photoURL

    const idUserChating = userOnline.filter(user => user.uid === selectedUserId)[0]?.uid

    const { displayName, photoURL, uid } = React.useContext(AuthContext)

    // const collectionName = (idUserChating + uid).split('').sort().join('')

    const inputRef = React.useRef()

    function formatDate(seconds) {
        let formattedDate = '';

        if (seconds) {
            formattedDate = formatRelative(new Date(seconds * 1000), new Date());

            return formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault()

        if (messageWithUser) {
            addDocument(collection(db, 'chatWithUser'),
                {
                    text: messageWithUser,
                    photoURL,
                    roomId: `${nameUserChating?.replace(' ', '')}${displayName.replace(' ', '')}`,
                    displayName,
                    uid,
                    uids: [uid, idUserChating]
                }
            )
        }
        setMessageWithUser('')
        inputRef.current.focus()
    }

    const messageWithUserCondition = React.useMemo(() => ({
        fieldName: 'uids',
        operator: 'array-contains',
        compareValue: selectedUserId, uid
    }), [selectedUserId])

    const chatWithUser = useFireStore('chatWithUser', messageWithUserCondition)
    return (
        selectedUserId ?
            <div>
                <div className="flex flex-col h-screen pt-5 px-10 pb-7">
                    <div className="border-b border-solid border-stone-700 pb-4">
                        <div className="flex items-center cursor-pointer ">
                            {photoUserChating ? <img className="inline-block h-8 w-8 rounded-full" src={photoUserChating} alt="Avata" />
                                : <div className=" h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center text-white">{nameUserChating.charAt(0).toUpperCase()}</div>}
                            <span className="text-black text-xl ml-1 line-clamp-1">{nameUserChating}</span>
                        </div>
                    </div>
                    <div className="overflow-y-auto flex-1 flex flex-col-reverse">
                        <div className="flex flex-col justify-end">
                            {
                                chatWithUser.map((ele, id) => (
                                    ele.uid === uid ?
                                        <Tippy
                                            key={ele.createAt}
                                            placement='left'
                                            content={
                                                <p className="text-[12px] text-slate-400">{formatDate(ele.createAt?.seconds)}</p>
                                            }
                                        >
                                            <div className="mt-1 ml-auto mr-3 bg-blue-200 py-2 px-3 rounded-lg" >
                                                <div className="flex items-center">
                                                    {ele.photoURL ? <img alt='noimg' className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src={ele.photoURL} />
                                                        : <div className="h-8 w-8 rounded-full text-white flex items-center justify-center bg-orange-500">{ele.displayName.charAt(0).toUpperCase()}</div>}
                                                    <p className="font-bold text-base ml-[6px]">{ele.displayName}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[#333] text-sm ml-10">{ele.text}</p>
                                                </div>
                                            </div>
                                        </Tippy>
                                        : <Tippy
                                            placement='right'
                                            content={
                                                <p className="text-[12px] text-slate-400 ml-3">{formatDate(ele.createAt?.seconds)}</p>
                                            }>
                                            <div className="mt-1 mr-auto bg-slate-200 py-2 px-3 rounded-lg" key={ele.createAt}>
                                                <div className="flex items-center">
                                                    {ele.photoURL ? <img alt='noimg' className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src={ele.photoURL} />
                                                        : <div className="h-8 w-8 rounded-full text-white flex items-center justify-center bg-orange-500">{ele.displayName.charAt(0).toUpperCase()}</div>}
                                                    <p className="font-bold text-base ml-[6px]">{ele.displayName}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[#333] text-sm ml-10">{ele.text}</p>
                                                </div>
                                            </div>
                                        </Tippy>
                                ))
                            }
                        </div>
                    </div>
                    <div className="mt-4">
                        <form className="flex">
                            <input
                                ref={inputRef}
                                value={messageWithUser}
                                onChange={(e) => setMessageWithUser(e.target.value)}
                                className="border-solid border border-grey p-2 flex-1"
                                placeholder="Mời nhập tin nhắn"
                            />
                            <button type="text"
                                className="p-[8px] border-solid border ml-[30px] border-grey rounded"
                                onClick={handleSubmit}
                            >
                                Gửi
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            : selectedRoomId ? '' : <NotChatWithUser />
    )
}

export default ChatWithUser