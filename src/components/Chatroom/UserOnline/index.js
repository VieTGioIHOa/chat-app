import React from 'react'

import useFireStore from '../../../hooks/useFireStore';
import { AuthContext } from '../../../context/AuthProvider';
import { AppContext } from '../../../context/AppProvider';
import { addDocument } from '../../../firebase/service';
import { db } from '../../../firebase/config';
import { collection } from 'firebase/firestore'


export default function UserOnline() {
    const { userOnline } = React.useContext(AppContext)

    console.log(userOnline)

    const chatWithUser = useFireStore('chatWithUser')

    const { uid } = React.useContext(AuthContext)
    const { selectedUserId, setSelectedUserId, setSelectedRoomId } = React.useContext(AppContext)

    const handleChatWithUser = (user) => {
        setSelectedUserId(user.uid)
        setSelectedRoomId('')
    }

    React.useEffect(() => {
        if (!chatWithUser.map((ele) => ele.uid).includes(selectedUserId) && selectedUserId)
            addDocument(collection(db, 'chatWithUser'), ...userOnline.filter(user => user.uid === selectedUserId))
        return
    }, [selectedUserId])

    return (
        <div className='p-5 border-l border-slate border-solid h-screen w-[340px]'>
            <div className="border-b border-b-solid border-b-stone-700 pb-5">
                <h2 className="font-bold text-xl">Đang hoạt động</h2>
            </div>
            <div className="overflow-y-auto">
                <ul>
                    {userOnline.filter(user => user.uid !== uid).length > 0
                        ? userOnline.filter(user => user.uid !== uid).map(user => {
                            return <li
                                onClick={() => handleChatWithUser(user)}
                                key={user.id}
                                className="flex items-center p-2 cursor-pointer my-1 hover:bg-slate-100 rounded-lg">
                                <div className="flex items-center">
                                    {user.photoURL ? <img className="inline-block h-6 w-6 rounded-full" src={user.photoURL} alt="Avata" />
                                        : <div className=" h-6 w-6 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm">{user.displayName.charAt(0).toUpperCase()}</div>}
                                </div>
                                <span className="ml-1 text-sm">{user.displayName}</span>
                            </li>
                        })
                        : <li className=" cursor-pointer my-2">Không có danh sách hoạt động</li>}
                </ul>
            </div>
        </div>
    )
}
