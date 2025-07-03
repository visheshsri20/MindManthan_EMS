import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const AttendanceReport = () => {

    const [report , setReport] = React.useState([]);
    const [limit, setLimit] = React.useState(5);
    const [skip, setSkip] = React.useState(0);
    const today = new Date().toISOString().split('T')[0];
    const [dateFilter, setDateFilter] = React.useState(today);

    const fetchReport = async () => {
        try {
            const query = new URLSearchParams({limit,skip});
            if (dateFilter) {
                query.append('date', dateFilter);
            }
      const response = await axios.get(`https://employee-a0gcfmzec-visheshsri20s-projects.vercel.app//api/attendance/report?${query.toString()}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.data.success) {
        // Flatten groupData to a single array of records
        const groupData = response.data.groupData;
        let flatReport = [];
        Object.keys(groupData).forEach(date => {
          groupData[date].attendance.forEach(record => {
            flatReport.push({ date, ...record });
          });
        });
        setReport(flatReport);
       }
    } 
        catch (error) {
            alert(error.response?.data?.error || "Error fetching Attendance");
            console.log("Error", error);
        }
    }
    useEffect(() => {
        fetchReport();
    })

    return (
        <>
            <h2 className="text-center my-3 font-bold">Attendance Report</h2>
            <div>
                <h2 className="text-center my-3 font-bold">
                    Filter by Date:
                    <input
                        type='date'
                        className="border-2 border-gray-300 rounded-md p-2 mx-2"
                        value={dateFilter}
                        onChange={e => setDateFilter(e.target.value)}
                    />
                </h2>
            </div>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">S.No</th>
                        <th className="border px-4 py-2">Date</th>
                        <th className="border px-4 py-2">Employee ID</th>
                        <th className="border px-4 py-2">Employee Name</th>
                        <th className="border px-4 py-2">Department Name</th>
                        <th className="border px-4 py-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {report && report.length > 0 && report.map((row, idx) => (
                        <tr key={idx}>
                            <td className="border px-4 py-2">{skip + idx + 1}</td>
                            <td className="border px-4 py-2">{row.date}</td>
                            <td className="border px-4 py-2">{row.employeeId}</td>
                            <td className="border px-4 py-2">{row.employeeName}</td>
                            <td className="border px-4 py-2">{row.departmentName}</td>
                            <td className="border px-4 py-2">{row.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default AttendanceReport;