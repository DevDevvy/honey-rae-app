import React, { useState } from "react"
import { useHistory } from "react-router";

export const EmployeeForm = () => {
    // create initial state with useState
    const [employee, update] = useState({
        name: "",
        specialty: ""
    });

    const history = useHistory()


    const saveEmployee = (event) => {
        // prevents default event after for submit to allow post and render /employees
        event.preventDefault()
        // create new employee object
        const newEmployee = {
            name: employee.name,
            specialty: employee.specialty
        }
        // use fetch method POST to send object into API
        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(newEmployee)
        }
        return fetch("http://localhost:8088/employees", fetchOption)
            .then(() => {
                // changes browser url to /tickets
                history.push("/employees")
            })
    }

    return (
        <form className="employeeForm">
            <h2 className="employeeForm__title">New Employee</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Employee Name"
                        // listens for state change
                        onChange={
                            (evt) => {
                                // copy state
                                const copy = {...employee}
                                // modify copy of state with user input value
                                copy.name = evt.target.value
                                // update state with new state
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="specialty">Specialty:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Specialty"
                        // listens for state change
                        onChange={
                            (evt) => {
                                // copy state
                                const copy = {...employee}
                                // modify copy of state with user input value
                                copy.specialty = evt.target.value
                                // update state with new state
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            
            {/* button for submit with onClick event listener that calls saveTicket (POST to API) */}
            <button className="btn btn-primary" onClick={saveEmployee}>
                HIRE
            </button>
        </form>
    )
}