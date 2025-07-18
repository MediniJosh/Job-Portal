import {Company} from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
// company.controller.js
import { cloudinary } from "../utils/cloudinary.js";

export const registerCompany=async(req,res)=>{
    try{
        const{companyName}=req.body;
        if(!companyName){
            return res.status(400).json({
                message:"Company name is required",
                success:false
            });
        }
        let company=await Company.findOne({name:companyName})
        if(company){
            return res.status(400).json({
                message:"You can't register same company ",
                success:false
            })
        };
        company=await Company.create({
            name:companyName,
            userId:req.id
        })
        return res.status(201).json({
            message:"Company registered successfully",
            company,
            success:true
        })
    }catch(error){
        console.log(error);
    }
}

export const getCompany=async(req,res)=>{
    try{
        const userId=req.id; //logged in user id
        const companies=await Company.find({userId});
        if(!companies){
            return res.status(404).json({
                message:"Companies not found",
                success:false
            })
        }
        return res.status(200).json({
            companies,
            success:true
        })
    }
    catch(error){
        console.log(error);
    }
}
//get company by id 

export const getCompanyById = async (req,res)=>{
    try{
        const companyId=req.params.id;
        const company=await Company.findById(companyId);
        if(!company){
            return res.status(404).json({
                message:"Company not found",
                success:false
            })
        }
        return res.status(200).json({
            company,
            success:true
        })
    }catch(error){
        console.log(error);
    }
}
export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const file = req.file;

        // Get the current company
        const company = await Company.findById(req.params.id);
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            });
        }

        // 🔐 Check if name is being changed AND is already taken by another company
        if (name && name !== company.name) {
            const existing = await Company.findOne({ name });
            if (existing && existing._id.toString() !== req.params.id) {
                return res.status(400).json({
                    message: "Another company with this name already exists.",
                    success: false
                });
            }
        }

        // Upload new logo if a file is provided
        let logo = company.logo;
        if (file) {
            const fileUri = getDataUri(file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            logo = cloudResponse.secure_url;
        }

        // Update fields
        company.name = name || company.name;
        company.description = description || company.description;
        company.website = website || company.website;
        company.location = location || company.location;
        company.logo = logo;

        await company.save();

        return res.status(200).json({
            message: "Company information updated.",
            company,
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error.",
            success: false
        });
    }
};
