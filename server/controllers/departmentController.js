import Department from "../models/Department.js";

const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        return res.status(200).json({ success: true, departments });
    }
    catch (error) {
        return res.status(500).json({success: false, error: "Internal server error"});
    }
}

const addDepartment = async (req, res) => {
    try {
        const { dep_name, description } = req.body;
        const newDepartment = new Department({ dep_name, description });
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

const getDepartmentById = async (req, res) => {
    try {
        const department = await Department.findById(req.params.id);
        if (!department) {
            return res.status(404).json({ success: false, error: "Department not found" });
        }
        return res.status(200).json({ success: true, department });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Internal server error" });
    }
};

const updateDepartment = async (req, res) => {
    try {
        const { dep_name, description } = req.body;
        const { id } = req.params;
        const department = await Department.findByIdAndUpdate(
            id,
            { dep_name, description },
            { new: true }
        );
        if (!department) {
            return res.status(404).json({ success: false, error: "Department not found" });
        }
        return res.status(200).json({ success: true, department });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Edit department server error" });
    }
}

const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const department = await Department.findByIdAndDelete(id);
        if (!department) {
            return res.status(404).json({ success: false, error: "Department not found" });
        }
        return res.status(200).json({ success: true, department,message: "Department deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Delete department server error" });
    }
};


export { addDepartment, getDepartments, updateDepartment, getDepartmentById, deleteDepartment };