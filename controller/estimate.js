const Estimate = require("../models/estimate");
const EsAdmin = require("../models/estimateAdmin");
const sendEmail = require("../helper/nodeMalier");
const User = require("../models/user");

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
        if (!allEstimate > 0) {
            return res.status(404).send({
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
        const response = await new EsAdmin(req.body).populate({
            path:
                'EstimateId',
            select:
                'DesignName type userId'
        });
        // const response = await new EsAdmin()

        if (!response) {
            return res.status(404).send({
                success: false,
                message: "no data found"
            })
        };

        // console.log(response);

        const requestPerson = await User.find({ _id: response.EstimateId.userId });
        const name = requestPerson[0].firstname + " " + requestPerson[0].lastname;
        const userEmail = requestPerson[0].email;
        const Id = requestPerson[0]._id
        // console.log("name:", name)
        // console.log("email:", userEmail)
        // console.log("Id:", Id)
        const DesignName = response.EstimateId.DesignName
        const type = response.EstimateId.type
        const prices = response.prices
        const timeDuration = response.timeDuration
        // console.log(timeDuration)
        // console.log(prices)
        // console.log(DesignName)
        // console.log(type)

        const mail = sendEmail(name, userEmail, Id, DesignName, type, prices, timeDuration);
        // console.log(mail)
        await response.save()
        res.status(200).send({
            success: true,
            response,
        })
    } catch (error) {
        res.status(500).send({
            success: false, message: "SomeThing Went Wrong!", error
        })
    }
}

module.exports = { creatingEstimateRequest, getAllEstimate, AdminResponse }