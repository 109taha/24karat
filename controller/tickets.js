const Ticket = require("../models/tickets");
const Task = require("../models/asignTask")

// create tickets
const createTickets = async (req, res) => {
    try {
        const Order = await Task.findById(req.body.Order)
        if (!Order) {
            return res.send(404).send("need an order for the ticket")
        };
        const tickets = new Ticket(req.body);
        const { Subject, Priorty, Message } = req.body
        if (!Subject) {
            return res.status(404).send("need an Sucject for the ticket")
        };
        if (!Priorty) {
            return res.status(404).send("need an Priorty for the ticket")
        };
        if (!Message) {
            return res.status(404).send("need an Message for the ticket")
        }
        console.log(tickets)
        await tickets.save();
        res.status(200).send({ success: true, tickets })

    } catch (err) {
        res.status(500).send("internal server error")
    }
}

//get all tickets
const getTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find()
        if (!tickets) {
            res.status(404).snd({ success: false, message: "No Tickets Found!" });
        };
        res.status(200).send({ success: true, tickets })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: "something went worng"
        })
    }
}

//get tickets by id 
const getUserTickets = async (req, res) => {
    try {
        const userID = req.params.id;
        const tickets = await Ticket.find({ userID })
        if (!tickets) {
            res.status(400).send({ success: false, message: "no tickets found!" })
        }
        res.status(200).send({ success: true, tickets })
    } catch (err) {
        res.status(500).send({
            success: false,
            message: "something went worng"
        })
    }
}


module.exports = {
    createTickets,
    getTickets,
    getUserTickets
}