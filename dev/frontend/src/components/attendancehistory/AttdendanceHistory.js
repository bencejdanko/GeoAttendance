import React from "react"
import bookIcon from "../../icons/book.png";
import AttendanceHistoryDetail from "../attendancehistorydetail/AttendanceHistoryDetail";

const AttendanceHistory = (props) => {
    console.log(props.attendanceHistory)
    return (
        <section className="text-gray-400 bg-gray-900 body-font mt-8">
            <div className="container px-5 bg-gray-800 bg-opacity-40 rounded-lg py-10 mx-auto">
                <div className="flex items-center mb-3">
                    <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full text-white flex-shrink-0">
                        <img className="object-cover object-center rounded" src={bookIcon} alt="bookIcon" width={30} />
                    </div>
                    <h1 className="text-white text-2xl title-font font-medium w-full">Attendance History</h1>
                </div>
                <div className="flex flex-wrap -m-4  mt-4">
                    {
                        props.attendanceHistory.total_absent.map(detail => (
                            <AttendanceHistoryDetail detail={detail} key={detail.id} absent={true} />
                        ))
                    }
                    {
                        props.attendanceHistory.total_check_ins.map(detail => {
                            const e = props.attendanceHistory.total_check_outs.filter(e => e.id === detail.id);
                            if (e.length > 0) {
                                return <AttendanceHistoryDetail detail={detail} key={detail.id} checkin={true} />
                            } else {
                                return <AttendanceHistoryDetail detail={detail} key={detail.id} absent={true} />                                
                            }

                        }
                        )
                    }
                </div>
            </div>
        </section>
    )
};

export default AttendanceHistory;
