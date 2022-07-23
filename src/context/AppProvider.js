import React, { useContext, useMemo } from "react";
import { AuthContext } from './AuthProvider'
import useFireStore from '../hooks/useFireStore'
import { db } from '../firebase/config'
import { collection, getDocs, query, where } from 'firebase/firestore'
export const AppContext = React.createContext()

function AppProvider({ children }) {
    const [isAddRoomHide, setIsAddRoomHide] = React.useState('hidden')
    const [isInviteMemberModalHide, setIsInviteMemberModalHide] = React.useState('hidden')
    const [selectedRoomId, setSelectedRoomId] = React.useState('')
    const [valueInviteMember, setValueInviteMember] = React.useState([])
    const [selectedUserId, setSelectedUserId] = React.useState('')
    const { uid } = useContext(AuthContext)
    const roomCondition = React.useMemo(() => ({
        fieldName: 'members',
        operator: 'array-contains',
        compareValue: uid
    }), [uid])

    const rooms = useFireStore('rooms', roomCondition)

    const selectedRoom = useMemo(() => rooms.find(room => room.id === selectedRoomId), [rooms, selectedRoomId])

    const userCondition = React.useMemo(() => ({
        fieldName: 'uid',
        operator: 'in',
        compareValue: selectedRoom?.members
    }), [selectedRoom?.members])

    const members = useFireStore('users', userCondition)

    const userOnline = useFireStore('users')
    //CALL API KHI INVITE MEMBER
    const fetchUserList = async (search, curMembers) => {
        return getDocs(query(collection(db, "users"), where("keywords", "array-contains", search?.target[0]?.value.toLowerCase() || search?.target?.value.toLowerCase())))
            .then((snapshot) => {
                return snapshot.docs
                    .map((doc) => {
                        return {
                            label: doc.data().displayName,
                            value: doc.data().uid,
                            photoURL: doc.data().photoUrl,
                        }
                    })
                    .filter((opt) => !curMembers.includes(opt.value));
            });
    }
    return (
        <AppContext.Provider
            value={{
                selectedUserId,
                setSelectedUserId,
                userOnline,
                rooms,
                isAddRoomHide,
                setIsAddRoomHide,
                selectedRoomId,
                setSelectedRoomId,
                selectedRoom,
                members,
                isInviteMemberModalHide,
                setIsInviteMemberModalHide,
                fetchUserList,
                valueInviteMember,
                setValueInviteMember
            }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider