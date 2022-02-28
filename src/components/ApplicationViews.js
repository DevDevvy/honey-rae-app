import React from "react"
import { Route } from "react-router-dom"
import { EmployeeList } from "./employees/EmployeeList"
import { TicketList } from "./serviceTickets/TicketList"
import { CustomerList } from "./customers/CustomerList"
import { TicketForm } from "./serviceTickets/TicketForm"
import { EmployeeForm } from "./employees/EmployeeForm"
import { Ticket } from "./serviceTickets/Ticket"
import { Employee } from "./employees/Employee"

export const ApplicationViews = () => {
    return (
        <>
            
            <Route path="/customers">
                <CustomerList />
            </Route>
            <Route path="/ticket/create">
                <TicketForm />
            </Route>
            <Route exact path="/tickets">
                <TicketList />
            </Route>
            <Route exact path="/employees">
                <EmployeeList />
            </Route>
            <Route path="/employee/create">
                <EmployeeForm />
            </Route>
            {/* dynamic rout to show single ticket when clicked */}
            <Route exact path="/tickets/:ticketId(\d+)">
                <Ticket />
            </Route>
            <Route path="/employees/:employeeId(\d+)">
                <Employee />
            </Route>
            
        </>
    )
}