import React, { useState, useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";
import "../components/css/Dashboard.css";
import Footer from "./Footer";
import Nav2 from "./Nav2";

const Dashboard = () => {
  const [user, setUser] = useState({ name: "", gradeLevel: "", profilePicture: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("auth-token");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const response = await axios.post("http://localhost:4000/api/auth/user", { token });
        setUser({
          name: response.data.user.name,
          gradeLevel: response.data.user.gradeLevel,
          profilePicture: response.data.user.profilePicture,
          email: response.data.user.email,
        });
      } catch (err) {
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserProfile();
  }, []);

  const downloadPDF = () => {
    const input = document.getElementById("chart-container");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10, 180, 100);
      pdf.save("chart.pdf");
    });
  };

  const sendEmail = async () => {
    try {
      const input = document.getElementById("chart-container");
      html2canvas(input).then(async (canvas) => {
        const imgData = canvas.toDataURL("image/png");
        await axios.post("http://localhost:4000/api/auth/send-graph-email", {
          image: imgData,
          email: user.email,
        });
        alert("Email sent successfully!");
      });
    } catch (error) {
      alert("Failed to send email");
    }
  };

  const printChart = () => {
    window.print();
  };

  return (
    <>
      <Nav2 />
      <div className="dashboard-container">
        <div className="profile-header">
        <div className="profile-info">
    <div className="profile-image-container">
      <img 
        src={user.profilePicture?.url || "path/to/default-avatar.png"} 
        alt="Profile" 
        className="profile-image"
      />
    </div>
    <div className="profile-text">
      <h2>{user.name || "Guest"}</h2>
      <p>Current Grade/Year: <strong>{user.gradeLevel || "Log in first"}</strong></p>
    </div>
  </div>
</div>

        <p className="description">Explore insightful predictions for your future strand, course, and career based on your profile.</p>

        <div className="charts-container" id="chart-container" ref={chartRef}>
          {user.name ? (
            <>
              <div className="chart">
                <h3>Academic Track</h3>
                <Bar data={{
                  labels: ["GAS", "ABM", "HUMSS", "STEM"],
                  datasets: [{ label: "Percentage", data: [40, 50, 60, 80], backgroundColor: ["#800000", "#B22222", "#DC143C", "#FF6347"] }]
                }} />
              </div>
             
            </>
          ) : (
            <div className="guest-message">
              <p>Please log in to see your personalized results and predictions.</p>
            </div>
          )}
        </div>

        <button onClick={downloadPDF} className="Button">Download PDF</button>
        <button onClick={sendEmail} className="Button">Send via Email</button>
        <button onClick={printChart} className="Button">Print</button>
        <button className="Button" onClick={() => window.location.href = '/portal'}>
            Start the Process
          </button>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
