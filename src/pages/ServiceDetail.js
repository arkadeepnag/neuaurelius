// src/pages/ServiceDetail.js
import { useParams, Link } from "react-router-dom";
import services from "../data/services";

function ServiceDetail() {
    const { id } = useParams();
    const service = services.find((s) => s.id === id);

    if (!service) return <h2>Service Not Found</h2>;

    return (
        <div className="service-detail">
            <Link to="/" style={{ textDecoration: "none", fontSize: "14px" }}>
                ← Back to Services
            </Link>
            <img src={service.image} alt={service.title} className="detail-img" />
            <h1>{service.title}</h1>
            <p>{service.description}</p>
        </div>
    );
}

export default ServiceDetail;
