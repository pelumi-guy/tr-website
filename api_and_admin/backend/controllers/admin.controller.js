import Admin from "../models/admin.js";
import Agency from "../models/agency.js";

const getAllAdmins = async(req, res) => {
    try {
        const admins = await Admin.find({}).limit(req.query._end);
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createAdmin = async(req, res) => {

    try {
        const { name, email, avatar, agency } = req.body;

        const adminExists = await Admin.findOne({ email });

        if (adminExists) return res.status(200).json(adminExists);

        const newAdmin = await Admin.create({
            name,
            email,
            avatar,
            agency
        });
        res.status(200).json(newAdmin);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAdminInfoById = async(req, res) => {
    try {
        const { id } = req.params;

        const admin = await Admin.findOne({ _id: id }).populate("allProperties");

        if (admin) {
            res.status(200).json(admin);
        } else {
            res.status(404).json({ message: "Admin not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export {
    getAllAdmins,
    createAdmin,
    getAdminInfoById
};