import { useState, useEffect } from "react";
import api from "../api";
import { useNavigate, useParams } from "react-router-dom";

function Edit() {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [fees, setFees] = useState("");
    const [paymentDate, setPaymentDate] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [profilePicture, setProfilePicture] = useState(null);
    const [currentImage, setCurrentImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCustomer();
    }, [id]);

    const fetchCustomer = async () => {
        try {
            const res = await api.get(`/api/customers/${id}/`);
            const data = res.data;
            setName(data.name);
            setAge(data.age);
            setEmail(data.email);
            setPhone(data.phone);
            setFees(data.fees);
            setPaymentDate(data.payment_date || "");
            setExpiryDate(data.expiry_date || "");
            setCurrentImage(data.profile_picture);
        } catch (error) {
            alert("Error fetching customer details.");
            console.error(error);
            navigate("/");
        }
    };

    const updateCustomer = (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('name', name);
        formData.append('age', age);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('fees', fees);
        if (paymentDate) formData.append('payment_date', paymentDate);
        if (expiryDate) formData.append('expiry_date', expiryDate);
        if (profilePicture) {
            formData.append('profile_picture', profilePicture);
        }

        api
            .put(`/api/customers/${id}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((res) => {
                if (res.status === 200) {
                    alert("Customer updated!");
                    navigate("/");
                } else alert("Failed to update customer.");
            })
            .catch((err) => {
                console.error("Error updating customer:", err.response?.data);
                alert(`Error: ${JSON.stringify(err.response?.data)}`);
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className="container">
            <h2 className="title">Edit Customer</h2>
            <div className="card glass-panel" style={{ maxWidth: "600px", margin: "0 auto" }}>
                <form onSubmit={updateCustomer}>
                    <div className="form-group">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Age</label>
                        <input
                            type="number"
                            required
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Phone</label>
                        <input
                            type="text"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Fees Paid</label>
                        <input
                            type="number"
                            required
                            value={fees}
                            onChange={(e) => setFees(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Payment Date</label>
                        <input
                            type="date"
                            value={paymentDate}
                            onChange={(e) => setPaymentDate(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Expiry Date</label>
                        <input
                            type="date"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Profile Picture</label>
                        {currentImage && (
                            <div style={{ marginBottom: "0.5rem" }}>
                                <img src={currentImage} alt="Current" style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover" }} />
                                <span style={{ marginLeft: "1rem", color: "var(--text-secondary)", fontSize: "0.9rem" }}>Current Image</span>
                            </div>
                        )}
                        <input
                            type="file"
                            onChange={(e) => setProfilePicture(e.target.files[0])}
                            style={{ padding: '0.5rem' }}
                        />
                    </div>
                    <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? "Updating..." : "Update Customer"}
                    </button>
                    <button
                        type="button"
                        className="btn-danger"
                        style={{ marginTop: "1rem" }}
                        onClick={() => navigate("/")}
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Edit;
