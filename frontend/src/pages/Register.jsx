import { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";

function Register() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
        gym_name: "",
        phone_number: "",
        address: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            await api.post("/api/user/register/", formData);
            navigate("/login");
        } catch (error) {
            alert("Registration failed. Please check your details.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container page-center">
            <div className="card" style={{ width: '100%', maxWidth: '500px' }}>
                <h1 className="title">Join GymManager</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="jdoe"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Gym Name</label>
                        <input
                            type="text"
                            name="gym_name"
                            value={formData.gym_name}
                            onChange={handleChange}
                            placeholder="Iron Paradise"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Phone Number</label>
                        <input
                            type="text"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                            placeholder="+1 234 567 890"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Address</label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="123 Fitness St."
                            required
                            rows="3"
                        />
                    </div>
                    <button className="btn-primary" type="submit" disabled={loading}>
                        {loading ? "Creating Account..." : "Register"}
                    </button>
                    <p style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--text-secondary)' }}>
                        Already have an account? <Link to="/login" style={{ color: 'var(--primary-color)' }}>Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Register;
