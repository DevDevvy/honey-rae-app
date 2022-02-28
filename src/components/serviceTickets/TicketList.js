import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import "./Tickets.css"
import { Link } from "react-router-dom"


export const TicketList = () => {
    // create state
    const [tickets, updateTickets] = useState([])
    // access browser history
    const history = useHistory()

    useEffect(
        () => {
            update()
        },
        []
    )
    const deleteTicket = (id) => {
        fetch(`http://localhost:8088/serviceTickets/${id}`, {
            method: "DELETE"
        })
        .then(update)
    }
    
    const update = () => {
        return fetch("http://localhost:8088/serviceTickets?_expand=employee&_expand=customer")
                    .then(res => res.json())
                    .then((data) => {
                        updateTickets(data)
                    })
    }
    return (
        <>
            <div>
                {/* create ticket button */}
                <button onClick={() => history.push("/ticket/create")}>Create Ticket</button>
        </div>
            {
                tickets.map(
                    (ticket) => {
                        return <div key={`ticket--${ticket.id}`}>
                            {/* ternaries to switch class name to show emergency tickets */}
                            <p className={`${ticket.emergency ? "emergency" : "ticket"}`}>
                                <Link key={`ticket--${ticket.id}`} to={`/tickets/${ticket.id}`}>{ticket.description}</Link>
                                {/* DELETE button */}
                                <button onClick={() => {
                                    deleteTicket(ticket.id)
                                }}>Delete</button>
                            </p>
                            
                        </div>
                    }
                )
            }
            
        </>
    )
}
