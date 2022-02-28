import React, { useState } from "react"
import { useHistory } from "react-router";

export const TicketForm = () => {
    // create initial state with useState
    const [ticket, update] = useState({
        description: "",
        emergency: false
    });

    const history = useHistory()


    const saveTicket = (event) => {
        // prevents default event after for submit to allow post and render /tickets
        event.preventDefault()
        // create new ticket object
        const newTicket = {
            description: ticket.description,
            emergency: ticket.emergency,
            customerId: parseInt(localStorage.getItem("honey_customer")),
            employeeId: 1,
            dateCompleted: ""
        }
        // use fetch method POST to send object into API
        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(newTicket)
        }
        return fetch("http://localhost:8088/serviceTickets", fetchOption)
            .then(() => {
                // changes browser url to /tickets
                history.push("/tickets")
            })
    }

    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">New Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Brief description of problem"
                        // listens for state change
                        onChange={
                            (evt) => {
                                // copy state
                                const copy = {...ticket}
                                // modify copy of state with user input value
                                copy.description = evt.target.value
                                // update state with new state
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Emergency:</label>
                    <input 
                        onChange={
                            (evt) => {
                                const copy = {...ticket}
                                // .checked to chck for checkbox 
                                copy.emergency = evt.target.checked
                                // update state with new state object
                                update(copy)
                            }
                            
                        }
                        type="checkbox" />
                </div>
            </fieldset>
            {/* button for submit with onClick event listener that calls saveTicket (POST to API) */}
            <button className="btn btn-primary" onClick={saveTicket}>
                Submit Ticket
            </button>
        </form>
    )
}