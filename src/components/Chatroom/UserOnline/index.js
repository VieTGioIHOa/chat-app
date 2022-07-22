import React from 'react'

import { AuthContext } from '../../../context/AuthProvider';
import { AppContext } from '../../../context/AppProvider';


export default function UserOnline() {
    const { userOnline } = React.useContext(AppContext)


    const { uid } = React.useContext(AuthContext)
    const { setSelectedUserId, setSelectedRoomId } = React.useContext(AppContext)

    const handleChatWithUser = (user) => {
        setSelectedUserId(user.uid)
        setSelectedRoomId('')
    }

    return (
        <div className='p-5 border-l border-slate border-solid h-screen w-[300px]'>
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
