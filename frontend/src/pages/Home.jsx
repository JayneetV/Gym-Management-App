import { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

import DashboardStats from "../components/DashboardStats";

function Home() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    // Fetch when page or active search query changes
    useEffect(() => {
        getCustomers();
    }, [currentPage, searchQuery]);

    // Trigger to refresh dashboard stats when customers change (optional optimization, for now let's just render it)

    const getCustomers = () => {
        api
            .get(`/api/customers/?page=${currentPage}&search=${searchQuery}`)
            .then((res) => res.data)
            .then((data) => {
                setCustomers(data.results);
                setTotalPages(Math.ceil(data.count / 5));
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
                if (err.response) {
                    if (err.response.status === 403) {
                        alert("Your subscription is inactive. Please select a plan.");
                        navigate("/plans");
                    } else if (err.response.status === 404 && currentPage > 1) {
                        setCurrentPage(prev => prev - 1);
                    }
                }
            });
    };

    const deleteCustomer = (id) => {
        api
            .delete(`/api/customers/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Customer deleted!");
                else alert("Failed to delete customer.");
                getCustomers();
            })
            .catch((error) => console.log(error));
    };



    const logout = () => {
        localStorage.clear()
        navigate("/login")
    }

    return (
        <div className="container">
            {/* navbar */}
            <div className="header-flex">
                <h1 className="title">My Gym Customers</h1>

                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search customers..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button
                        className="btn-primary"
                        onClick={() => {
                            setSearchQuery(searchText);
                            setCurrentPage(1);
                        }}
                        style={{ padding: '0.5rem 1rem', width: 'auto', marginBottom: 0 }}
                    >
                        Search
                    </button>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button
                        onClick={() => navigate("/add-customer")}
                        className="btn-primary"
                        style={{ width: 'auto' }}
                    >
                        Add Customer
                    </button>
                    <button onClick={logout} className="btn-primary" style={{ width: 'auto', background: 'var(--error)' }}>
                        Logout
                    </button>
                </div>
            </div>

            <DashboardStats />

            <div className="main-grid">
                <div className="customer-list-container">
                    {/* Customer List */}
                    <div className="customer-grid">
                        {customers.map((customer) => (
                            <div key={customer.id} className="card customer-card-content" style={{ padding: '1.5rem' }}>
                                {customer.profile_picture ? (
                                    <img
                                        src={customer.profile_picture}
                                        alt={customer.name}
                                        className="customer-img"
                                    />
                                ) : (
                                    <div className="customer-img" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#334155', color: '#fff', fontSize: '1.2rem' }}>
                                        {customer.name.charAt(0)}
                                    </div>
                                )}

                                <div className="customer-info-grid">
                                    <div>
                                        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{customer.name}</h3>
                                        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{customer.email}</p>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Phone: {customer.phone}</p>
                                        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Age: {customer.age}</p>
                                    </div>
                                    <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: '0.25rem', marginTop: '0.5rem' }}>
                                        <span style={{ color: 'var(--success)', fontWeight: '600', fontSize: '0.95rem' }}>Fees Paid: ₹{customer.fees}</span>
                                        <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                            {customer.payment_date && <span>Paid: {new Date(customer.payment_date).toLocaleDateString("en-GB")}</span>}
                                            {customer.expiry_date && <span>Expires: {new Date(customer.expiry_date).toLocaleDateString("en-GB")}</span>}
                                        </div>
                                    </div>
                                </div>

                                <div className="customer-actions" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginLeft: 'auto' }}>
                                    <button
                                        onClick={() => navigate(`/edit-customer/${customer.id}`)}
                                        className="btn-edit"
                                        style={{ margin: 0, fontSize: '0.9rem' }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => deleteCustomer(customer.id)}
                                        className="btn-danger"
                                        style={{ margin: 0 }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                        {customers.length === 0 && (
                            <div style={{ width: '100%', textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>
                                No customers found.
                            </div>
                        )}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <div className="pagination">
                            <button
                                className="btn-primary pagination-button"
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                            <span className="pagination-info">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                className="btn-primary pagination-button"
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
