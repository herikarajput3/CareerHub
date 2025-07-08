const CompanySchema = require("../Models/CompanySchema");

exports.companyRegister = async (req, res) => {
    try {
        const { companyName } = req.body;


        if (!companyName) {
            return res.status(400).json({
                message: 'Company name is required',
                success: false
            });
        };

        let company = await CompanySchema.findOne({ name: companyName });

        if (company) {
            return res.status(400).json({
                message: 'Company already exists',
                success: false
            });
        };

        company = await CompanySchema.create({
            name: companyName,
            userId: req.user.id
        });

        return res.status(201).json({
            message: 'Company registered successfully',
            success: true,
            company
        })

    } catch (error) {
        console.error(error, "error");
        res.status(500).json({
            message: 'Internal server error',
            success: false
        })
    }
}

exports.getCompanies = async (req, res) => {
    try {
        const companies = await CompanySchema.find({ userId: req.id });

        if (!companies) {
            return res.status(400).json({
                message: 'No companies found',
                success: false
            });
        };

        return res.status(200).json({
            message: 'Companies fetched successfully',
            success: true,
            companies: companies
        })
    } catch (error) {
        console.error(error, "error");
        res.status(500).json({
            message: 'Internal server error',
            success: false
        })
    }
}

exports.getCompany = async (req, res) => {
    try {
        const company = await CompanySchema.findById(req.params.id);

        if (!company) {
            return res.status(400).json({
                message: 'Company not found',
                success: false
            });
        };

        return res.status(200).json({
            message: 'Company fetched successfully',
            success: true,
            company
        })
    } catch (error) {
        console.error(error, "error");
        res.status(500).json({
            message: 'Internal server error',
            success: false
        })
    }
}

exports.updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const file = req.file;

        const company = await CompanySchema.findByIdAndUpdate(
            req.params.id,
            { name, description, website, location },
            { new: true, runValidators: true }
        );

        if (!company) {
            return res.status(400).json({
                message: 'Company not found',
                success: false
            });
        };

        return res.status(200).json({
            message: 'Company updated successfully',
            success: true,
            company
        })
    } catch (error) {
        console.error(error, "error");
        res.status(500).json({
            message: 'Internal server error',
            success: false
        })
    }
}