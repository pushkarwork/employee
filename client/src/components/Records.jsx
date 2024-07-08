import React, { useEffect, useState } from 'react';
import '../styles/records.css'; // Import CSS file for styling
import { Link } from 'react-router-dom';


const port = "https://employee-main.onrender.com"
const Employee = (props) => {
    const { employee, deleteById } = props
    return (
        <tr>
            <td>{employee.name}</td>
            <td>{employee.position}</td>
            <td>{employee.level}</td>
            <td >
                {/* Actions buttons (e.g., edit, delete) */}
                <Link to={`/edit/${employee._id}`} className="action-button">Edit</Link>
                <button onClick={() => { deleteById(employee._id) }} className="action-button">Delete</button>
            </td>
        </tr>
    )
}


const Records = () => {
    const [records, setRecords] = useState([])

    async function deleteById(idToDelete) {
        try {

            const response = await fetch(`${port}/${idToDelete}/`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            alert("record Deleted successfully")
            // navigate("/")
        } catch (error) {
            console.error('Error fetching data:', error);
        }


        // Filter out the element with the specified id
        const filteredElements = records.filter(element => element._id !== idToDelete);
        setRecords(filteredElements);
    }


    useEffect(() => {

        async function FetchData() {
            try {
                const response = await fetch(`${port}/record`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setRecords(data)
                console.log(records)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        FetchData()
    }, [records.length])

    return (
        <div>
            <h2 style={{ textAlign: 'center', margin: "15px" }}>Records</h2>
            <table className="records-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Level</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {records.map(employee => (
                        <Employee key={employee._id} employee={employee} deleteById={deleteById} />
                    ))}
                </tbody>
            </table>
        </div >
    );
};

export default Records;
