const priceingProject = require("../models/priceingProject");
const ProjectReq = require('../models/projectComplete')

const userPayment = async (req, res) => {
    try {
        const TaskId = req.body
        const project = await priceingProject.findOne(TaskId)

        // console.log(project);
        const prices = await project.prices

        const source = await ProjectReq.findOne({ SourceFile });

        console.log(source)
        if (prices && !isNaN(prices)) {

            const sourceFile = '/path/to/your/source-file.zip'; // Replace with the actual path to the source file
            res.json({ sourceFile, paymentAmount: amount });
        } else {
            // Customer did not provide payment amount, return prototype data
            res.json({ prototype: prototypeData });
        }
    } catch (err) {
        res.status(500).send(err)
    }
}

module.exports = {
    userPayment
}