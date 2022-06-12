import React, { useState } from 'react'
import { AppContext } from '../../context/AppProvider'
import { AuthContext } from '../../context/AuthProvider'
import { useForm } from 'react-hook-form'
import { db } from '../../firebase/config'
import { debounce } from 'lodash';
import { doc, updateDoc, collection } from 'firebase/firestore'
function DebounceSelect({
    fetchOptions,
    debounceTimeout = 300,
    curMembers,
    ...props
}) {
    // Search: abcddassdfasdf

    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);
    const { fetchUserList } = React.useContext(AppContext)

    const { register } = useForm();

    const debounceFetcher = React.useMemo(() => {
        const loadOptions = (value) => {
            setOptions([]);
            setFetching(true);

            fetchOptions(value, curMembers).then((newOptions) => {
                setOptions(newOptions);
                setFetching(false);
            });
        };

        return debounce(loadOptions, debounceTimeout);
    }, [debounceTimeout, fetchOptions, curMembers]);

    React.useEffect(() => {
        return () => {
            // clear when unmount
            setOptions([]);
        };
    }, []);

    const { setValueInviteMember } = React.useContext(AppContext)

    return (
        <div>
            <p>
                Tên thành viên
            </p>
            <input
                {...register("nameInvite")}
                onInput={debounceFetcher}
                className="border-solid border-[1px] border-slate-300 px-2 py-1 mt-2 mb-1"
                placeholder="Nhập tên thành viên"
                {...props}
            />
            <ul>
                {options.map(opt => (
                    <li key={opt.value} onClick={() => {
                        setValueInviteMember(opt.label)
                        opt.label = ''
                    }}>
                        <img src={opt.photoUrl} />
                        {opt.label}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default function InviteMemberModal() {

    const { isInviteMemberModalHide, setIsInviteMemberModalHide, selectedRoom, selectedRoomId } = React.useContext(AppContext)
    const { valueInviteMember, setValueInviteMember, fetchUserList } = React.useContext(AppContext)
    const { uid } = React.useContext(AuthContext)
    const { handleSubmit, register, resetField } = useForm()

    const handleOK = (data, e) => {
        fetchUserList(e, selectedRoom?.members)
            .then(data => {
                const id = data[0].value
                return id
            })
            .then(data => {
                updateDoc(doc(db, 'rooms', selectedRoomId), {
                    members: [...selectedRoom.members, data],
                })
            })

        setValueInviteMember('')

        setIsInviteMemberModalHide('hidden')
    }

    const handleCancel = () => {

        setValueInviteMember('');

        setIsInviteMemberModalHide('hidden')
    }

    return (
        <div className={isInviteMemberModalHide}>
            <div className="absolute top-0 left-0 h-screen w-screen flex justify-center items-center bg-[rgba(0,0,0,0.3)] ">
                <form onSubmit={handleSubmit(handleOK)} className="bg-white rounded p-5 w-[400px]" name='Form'>
                    <h2 className="font-bold text-[20px] mb-2">Mời thêm thành viên</h2>
                    <DebounceSelect
                        value={valueInviteMember}
                        onChange={(e) => setValueInviteMember(e.target.value)}
                        fetchOptions={fetchUserList}
                        style={{ width: '100%' }}
                        curMembers={selectedRoom?.members}
                    />
                    <button type="submit" className="p-2 rounded bg-sky-300 text-white pointer mr-3 mt-4 ">OK</button>
                    <button type="button" onClick={handleCancel} className="p-2 rounded bg-sky-300 text-white pointer mr-3 mt-4 ">Cancel</button>
                </form>
            </div>
        </div>
    )
}

