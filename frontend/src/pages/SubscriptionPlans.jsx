import React from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import "./SubscriptionPlans.css";

function SubscriptionPlans() {
    const navigate = useNavigate();

    const handleSubscribe = async (planType) => {
        try {
            await api.post("/api/select-plan/", { plan_type: planType });
            alert("Subscription successful!");
            navigate("/");
        } catch (error) {
            alert("Failed to subscribe. Please try again.");
            console.error(error);
        }
    };

    const plans = [
        {
            id: "monthly",
            title: "Monthly",
            price: "₹1,000",
            duration: "per month",
            color: "from-blue-400 to-blue-600"
        },
        {
            id: "quarterly",
            title: "Quarterly",
            price: "₹3,000",
            duration: "per quarter",
            color: "from-purple-400 to-purple-600"
        },
        {
            id: "yearly",
            title: "Yearly",
            price: "₹10,000",
            duration: "per year",
            color: "from-pink-400 to-pink-600"
        }
    ];

    return (
        <div className="subscription-container">
            <div className="subscription-header">
                <h1>Choose Your Plan</h1>
                <p>Unlock the full potential of your gym management</p>
            </div>

            <div className="plans-grid">
                {plans.map((plan) => (
                    <div key={plan.id} className="plan-card" onClick={() => handleSubscribe(plan.id)}>
                        <div className="plan-title">{plan.title}</div>
                        <div className="plan-price">{plan.price}</div>
                        <div className="plan-duration">{plan.duration}</div>
                        <button className="subscribe-btn">Subscribe Now</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SubscriptionPlans;
