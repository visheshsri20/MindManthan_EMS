import {useNavigate} from 'react-router-dom';

export const columns =
[
    {
        name : 'S.No',
        selector: row => row.sno,
        width : '70px', 
     },
    // {
    //     name : 'Emp ID',
    //     selector: (row) => row.employeeId,
    //     width: '120px'
    // },
    {
        name : 'Name',
        selector: (row) => row.name,
        width : '150px',

    },
    {
        name: "Leave Type",
        selector : (row) => row.leaveType,
        width : "140px",
    },
    {
  name: "Start Date",
  selector: row => row.startDate,
   width : '100px', 
},
{
  name: "End Date",
  selector: row => row.endDate,
 width : '100px', 
},
    // {
    //     name : "Department",
    //     selector: (row) => row.dep_name,
    //     width : "170px",
    // },
    {
        name : "Days",
        selector : (row) => row.days,
        width : "80px"
    },
    {
        name : "Status",
        selector : (row) => row.status,
        width:"120px"
    },
    {
        name : "Action",
        selector : (row) => row.action,
        width:"120px"
    }

];

export const LeaveButtons = ({ _id }) => {
  const navigate = useNavigate();
  return (
    <button
      className="bg-teal-600 text-white px-4 py-1 rounded hover:bg-teal-700 transition"
      onClick={() => navigate(`/AdminDashboard/leaves/${_id}`)}
    >
      View
    </button>
  );
};