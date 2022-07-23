import React from "react";
import { auth } from "../../../context/AuthProvider";
import { AuthContext } from "../../../context/AuthProvider"


function UserInfo() {
    const { displayName, photoURL } = React.useContext(AuthContext)
    return (
        <div className="flex items-center justify-between border-b-[1px] border-b-grey border-b-solid pb-[10px]">
            <div className="flex items-center cursor-pointer ">
                {photoURL ? <img className="inline-block h-8 w-8 rounded-full" src={photoURL} alt="Avata" />
                    : <div className=" h-8 w-8 rounded-full bg-orange-500 flex items-center justify-center text-white">{displayName.charAt(0).toUpperCase()}</div>}
                <span className="text-white text-xl ml-1 line-clamp-1">{displayName}</span>
            </div>
            <button type="button"
                onClick={() => auth.signOut()}
                className="w-[110px] py-1 px-2 border-solid shadow-sm rounded  text-lg text-white cursor-pointer hover:bg-indigo-500"
            >
                Đăng xuất
            </button>
        </div>
    )
}

export default UserInfo;