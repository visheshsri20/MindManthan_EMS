import Leave from '../models/Leave.js';

// Add a leave request
const addLeave = async (req, res) => {
    try {
        const { userId, leaveType, startDate, endDate, reason } = req.body;
        if (!userId || !leaveType || !startDate || !endDate || !reason) {
            return res.status(400).json({ success: false, error: "All fields are required" });
        }
        const newLeave = new Leave({
            userId,
            leaveType,
            startDate,
            endDate,
            reason
        });

        await newLeave.save();

        return res.status(200).json({ success: true, leave: newLeave });
    } catch (error) {
        console.error('Error adding leave:', error);
        return res.status(500).json({ success: false, error: "Leave request server error" });
    }
};

// Get all leaves for a user
// const getLeave = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const leaves = await Leave.find({ userId: id }).sort({ createdAt: -1 });
//         return res.status(200).json({ leaves });
//     } catch (error) {
//         console.error('Error fetching leaves:', error);
//         return res.status(500).json({ error: 'Server error' });
//     }
// };

const getLeave = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id).populate('userId');
    if (!leave) {
      return res.status(404).json({ success: false, message: 'Leave not found' });
    }
    res.json({ success: true, leave });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};


const getLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find()
            .populate('userId', 'name email') // Only populate fields that exist in User
            .sort({ createdAt: -1 });
        return res.status(200).json({ success: true, leaves });
    } catch (error) {
        console.error('Error fetching leaves:', error);
        return res.status(500).json({ error: 'Server error' });
    }
};


export { addLeave, getLeave, getLeaves };