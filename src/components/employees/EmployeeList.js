import React, { useEffect, useState } from "react"
import { useHistory } from "react-router"
import { Link } from "react-router-dom"


export const EmployeeList = () => {
    const [employees, changeEmployee] = useState([])
    const [specialties, setSpecialty] = useState("")
    const history = useHistory()

    useEffect(
        () => {
            fetch("http://localhost:8088/employees")
                .then(res => res.json())
                .then((data) => {
                    changeEmployee(data)
                })
        },
        []
    )

    useEffect(() => {
        /*
            1. Use .map() to get the specialty of each employee
            2. Then update a state variable to be a comma-separated string
                (e.g. "iPhone, Printers, ...")
        */
        const specialties = employees.map(employee => employee.specialty)
        setSpecialty(specialties.join(", "))
    }, [employees])

    return (
        <>
            <button onClick={() => history.push("/employee/create")}>New Hire</button>
            <div>
                Specialties: {specialties}
            </div>
            {
                employees.map(
                    (employee) => {
                        return <div key={`employee--${employee.id}`}><Link to={`/employees/${employee.id}`} key={`employee--${employee.id}`} >{employee.name}</Link></div>
                    }
                )
            }
        </>
    )
}