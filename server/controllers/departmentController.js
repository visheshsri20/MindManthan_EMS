import Department from "../models/Department.js";

const  addDepartment = async (req, res) => {
    try {
        const { dep_name, 
            description } = req.body;

     
        const newDepartment = new Department({
            dep_name,
            description
        });

        await newDepartment.save();
        console.log("Department added successfully:", newDepartment);
        return res.status(200).json({ success: true, department: newDepartment, message: "Department added successfully" });
    } 
    catch (error) {
        console.error("Error adding department:", error);
       return res.status(500).json({
            success: false,
            error: "Internal server error"
        });
    } 
};

export {addDepartment};