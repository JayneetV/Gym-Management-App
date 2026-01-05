import { useEffect, useState } from "react";
import api from "../api";

function DashboardStats() {
    const [stats, setStats] = useState({
        total_members: 0,
        total_revenue: 0,
        active_members: 0,
        expiring_soon: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
        // Refresh stats every 60 seconds or on mount
        const interval = setInterval(fetchStats, 60000);
        return () => clearInterval(interval);
    }, []);

    const fetchStats = () => {
        api.get("/api/dashboard-stats/")
            .then((res) => {
                setStats(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching stats:", err);
                setLoading(false);
            });
    };

    if (loading) return null;

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            <div className="card glass-panel" style={{ padding: '1.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: '500' }}>Total Members</h3>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)', margin: 0 }}>{stats.total_members}</p>
            </div>

            <div className="card glass-panel" style={{ padding: '1.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: '500' }}>Active Members</h3>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--success)', margin: 0 }}>{stats.active_members}</p>
            </div>

            <div className="card glass-panel" style={{ padding: '1.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: '500' }}>Expiring Soon (3 Days)</h3>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--warning)', margin: 0 }}>{stats.expiring_soon}</p>
            </div>

            <div className="card glass-panel" style={{ padding: '1.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontWeight: '500' }}>Total Revenue</h3>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary-color)', margin: 0 }}>₹{stats.total_revenue}</p>
            </div>
        </div>
    );
}

export default DashboardStats;
