import React, { useEffect, useState } from "react";
import pb from "../../lib/pocketbase";
import query from "../../lib/query";
import GroupHistoryDetail from "../grouphistorydetail/GroupHistoryDetail";

const GroupHistory = () => {

    const [groups, setGroups] = useState([])

    useEffect(() => {

        const getGroups = async () => {
            let groups = await query.getGroups(pb.authStore.model.id)
            setGroups(groups)
        }
        
        getGroups()
    
    
    }, [])

    return (
        <section className="text-gray-400 bg-gray-900 body-font mt-8">
            <div className="container px-5 bg-gray-800 bg-opacity-40 rounded-lg py-10 mx-auto">
                <div className="flex items-center mb-3">
                    <h1 className="text-white text-2xl title-font font-medium w-full">Groups</h1>
                </div>
                <div className="flex flex-wrap -m-4  mt-4">
                    {
                        // props.attendanceHistory.total_absent.map(detail => (
                        //     <AttendanceHistoryDetail detail={detail} key={detail.id} absent={true} />
                        // ))
                        groups.map(group => (
                            <GroupHistoryDetail group={group} />
                        ))
                    }
                    {
                        // props.attendanceHistory.total_check_ins.map(detail => (
                        //     <AttendanceHistoryDetail detail={detail} key={detail.id} checkin={true}/>
                        // ))
                    }
                </div>
            </div>
        </section>
    )
}


export default GroupHistory;