import React, { useState } from 'react';
import "../styles/create.css"; // Import CSS file for styling
import { useNavigate } from 'react-router-dom';
const port = "http://localhost:5000"

const Create = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        position: '',
        level: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log('Submitted:', formData);
        // You can reset the form fields here if needed

        async function SendData() {
            try {

                const response = await fetch(`${port}/record/add`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    // You can pass any data payload here
                    body: JSON.stringify({ ...formData }) // Replace with your actual data object
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                alert("record created successfully")
                navigate("/")
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        SendData()

        setFormData({
            name: '',
            position: '',
            level: ''
        });
    };

    return (
        <div className="container">
            <h2>Create Employee</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Position:</label>
                    <input
                        type="text"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Level:</label>
                    <div className="radio-group">
                        <label>
                            <input
                                type="radio"
                                name="level"
                                value="intern"
                                checked={formData.level === 'intern'}
                                onChange={handleChange}
                            />
                            Intern
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="level"
                                value="developer"
                                checked={formData.level === 'developer'}
                                onChange={handleChange}
                            />
                            Developer
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="level"
                                value="manager"
                                checked={formData.level === 'manager'}
                                onChange={handleChange}
                            />
                            Manager
                        </label>
                    </div>
                </div>
                <button type="submit" className="btn-submit">Submit</button>
            </form>
        </div>
    );
};

export default Create;
