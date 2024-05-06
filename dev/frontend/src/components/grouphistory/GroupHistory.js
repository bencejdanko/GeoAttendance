import React, { useEffect, useState } from "react";
import pb from "../../lib/pocketbase";
import query from "../../lib/query";
import GroupHistoryDetail from "../grouphistorydetail/GroupHistoryDetail";
import bookIcon from "../../icons/book.png";

const GroupHistory = () => {

    const [groups, setGroups] = useState([])

    useEffect(() => {

        const getGroups = async () => {
            debugger
            let response = await query.getGroups(pb.authStore.model.id)
            if (JSON.stringify(response) !== JSON.stringify(groups)) {
                setGroups(response)
            }
        }
        getGroups()
    }, [groups])

    const updateGroup = (groupId) => {
        const updatedGroups = groups.filter(g => g.id !== groupId)
        setGroups(updatedGroups);
    }

    return (
        <section className="text-gray-400 bg-gray-900 body-font mt-8">
            <div className="container px-5 bg-gray-800 bg-opacity-40 rounded-lg py-10 mx-auto">
                <div className="flex items-center mb-3">
                    <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full text-white flex-shrink-0">
                        <img className="object-cover object-center rounded" src={bookIcon} alt="bookIcon" width={30} />
                    </div>
                    <h1 className="text-white text-2xl title-font font-medium w-full">Groups</h1>
                </div>
                {
                    groups.length > 0 && (
                        <div className="flex flex-wrap -m-4  mt-4">
                            {
                                // props.attendanceHistory.total_absent.map(detail => (
                                //     <AttendanceHistoryDetail detail={detail} key={detail.id} absent={true} />
                                // ))
                                groups.map(group => (
                                    <GroupHistoryDetail group={group} deleteGroup={updateGroup} />
                                ))
                            }
                            {
                                // props.attendanceHistory.total_check_ins.map(detail => (
                                //     <AttendanceHistoryDetail detail={detail} key={detail.id} checkin={true}/>
                                // ))
                            }
                        </div>
                    )
                }
                {
                    groups.length === 0 && (
                        <div className="flex flex-col text-center w-full">
                            <p className="lg:w-full mx-auto leading-relaxed text-lg">No group associated with this user.</p>
                        </div>
                    )
                }
            </div>

        </section>
    )
}


export default GroupHistory;