const Estimate = require("../models/estimate");
const EsAdmin = require("../models/estimateAdmin");

const creatingEstimateRequest = async (req, res) => {
    try {
        const newEstimate = new Estimate(req.body)
        if (!newEstimate) {
            res.status(404).send({
                success: false,
                message: "no data found"
            });
        }
        await newEstimate.save()
        res.status(200).send({
            success: true,
            newEstimate
        })
    }
    catch (error) {
        res.status(500).send({
            success: false, message: "SomeThing Went Wrong!"
        })
    }
}

const getAllEstimate = async (req, res) => {
    try {
        const allEstimate = await Estimate.find()
        console.log("estimate", allEstimate)
        if (!allEstimate > 0) {
            res.status(404).send({
                success: false,
                message: "no data found"
            })

        }
        res.status(200).send(allEstimate)
    } catch (error) {
        res.status(500).send({
            success: false, message: "SomeThing Went Wrong!"
        })
    }
}

const AdminResponse = async (req, res) => {
    try {
        // const estimateRes = await Estimate.find().populate('EstimateId')
        const response = await new EsAdmin(req.body).populate({ path: 'EstimateId', select: 'DesignName type' })
        console.log(response);
        if (!response) {
            res.status(404).send({
                success: false,
                message: "no data found"
            })
        };
        await response.save()
        res.status(200).send({
            success: true,
            response
        })

    } catch (error) {
        res.status(500).send({
            success: false, message: "SomeThing Went Wrong!"
        })
    }
}


module.exports = { creatingEstimateRequest, getAllEstimate, AdminResponse }