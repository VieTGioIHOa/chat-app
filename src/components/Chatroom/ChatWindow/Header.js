import React, { useContext } from 'react';
import { AppContext } from '../../../context/AppProvider'
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import TippyHeadless from '@tippyjs/react/headless';

function Header() {
    const { selectedRoom, members, setIsInviteMemberModalHide } = useContext(AppContext)


    const inviteMemberModal = () => {
        setIsInviteMemberModalHide('block')
    }

    return (
        <div className="flex justify-between items-center border-b-solid border-b border-b-stone-700 pr-[50px] h-28">
            <div>
                <p className="font-bold text-[24px]">{selectedRoom?.name}</p>
                <span className="text-[18px] text-black-200">{selectedRoom?.description}</span>
            </div>
            <div className="flex items-center">
                <button onClick={inviteMemberModal} className="flex items-center justify-center mt-4 p-2 border-solid border border-grey mr-5 hover:bg-indigo-500 rounded hover:text-white ">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    <span className="ml-1 pointer">Mời</span>
                </button>
                <div className="mt-5">
                    <div className="flex -space-x-2 mb-2">
                        {

                            members.filter((member, id) => id <= 2).map(member => {
                                return (
                                    <Tippy
                                        key={member.id}
                                        placement='top'
                                        content={member.displayName}
                                    >
                                        <div className="cursor-pointer ">
                                            {
                                                member.photoURL ?
                                                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white " src={member?.photoURL} alt="" />
                                                    : <span className="flex items-center justify-center h-8 w-8 rounded-full text-white ring-2 ring-white text-base bg-orange-500">{member.displayName.charAt(0).toUpperCase()}</span>
                                            }
                                        </div>
                                    </Tippy>
                                )
                            })
                        }
                    </div>
                    {
                        members.length > 3 ?
                            <TippyHeadless
                                placement='bottom-start'
                                delay={[200, 500]}
                                render={attrs => (
                                    <div className="box" tabIndex="-1" {...attrs}>
                                        <div className=" flex p-2 shadow-md bg-slate-200 ">
                                            {
                                                members.filter((mem, id) => id > 2).map(member => (
                                                    <Tippy
                                                        content={member.displayName}
                                                        inertia={true}
                                                    >
                                                        <div key={member.id} className="-space-x-2 mb-2">
                                                            {
                                                                member.photoURL ?
                                                                    <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white cursor-pointer" src={member?.photoURL} alt="" />
                                                                    : <span className="flex items-center justify-center h-8 w-8 rounded-full text-white ring-2 ring-white text-base bg-orange-500">{member.displayName.charAt(0).toUpperCase()}</span>
                                                            }
                                                        </div>
                                                    </Tippy>
                                                ))
                                            }
                                        </div>
                                    </div>
                                )}
                                interactive
                            >
                                <div className=" text-sm font-medium relative">
                                    <p href="#" className="text-blue-500 cursor-pointer">+{members.length - 3} Others</p>
                                </div>
                            </TippyHeadless>
                            : ''
                    }
                </div>
            </div>
        </div >
    )
}

export default Header