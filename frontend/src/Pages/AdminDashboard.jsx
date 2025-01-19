import React from "react";
import "./AdminDashboard.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const MuseDashboard = () => {
  const navigate = useNavigate();

  const progressData = [
    { month: "Jan", bookings: 120, revenue: 8000 },
    { month: "Feb", bookings: 150, revenue: 12000 },
    { month: "Mar", bookings: 180, revenue: 15000 },
    { month: "Apr", bookings: 200, revenue: 18000 },
    { month: "May", bookings: 220, revenue: 20000 },
    { month: "Jun", bookings: 250, revenue: 25000 },
  ];

  const activeUsersData = [
  { day: "Monday", activeUsers: 300 },
  { day: "Tuesday", activeUsers: 450 },
  { day: "Wednesday", activeUsers: 600 },
  { day: "Thursday", activeUsers: 500 },
  { day: "Friday", activeUsers: 700 },
  { day: "Saturday", activeUsers: 900 },
  { day: "Sunday", activeUsers: 1100 },
];


  const handleCardClick = (path) => {
    navigate(path);
  };
  return (
    <div>
      <Navbar />
      <div className="muse-dashboard">
        {/* Main Content */}
        <main className="muse-main">
          {/* Top Bar */}

          {/* Dashboard Content */}
          <div className="dashboard-content">
            {/* Top Cards */}
            <div className="top-cards">
              <div
                className="card small-card"
                onClick={() => handleCardClick("/todays-sales")}
              >
                <p className="card-title">Today's Sales</p>
                <h3 className="card-value">Rs.53,000</h3>
                <p className="card-change">+50%</p>
              </div>

              <div
                className="card small-card"
                onClick={() => handleCardClick("/todays-users")}
              >
                <p className="card-title">Today’s Users</p>
                <h3 className="card-value">3,200</h3>
                <p className="card-change">+15%</p>
              </div>

              <div
                className="card small-card"
                onClick={() => handleCardClick("/new-clients")}
              >
                <p className="card-title">New Clients</p>
                <h3 className="card-value">+1,200</h3>
                <p className="card-change">+5%</p>
              </div>

              <div
                className="card small-card-b"
                onClick={() => handleCardClick("/appoinments")}
              >
                <p className="card-title">All</p>
                <h3 className="card-value">Bookings</h3>
                <p className="card-change"> </p>
              </div>

              <div
                className="card small-card-b"
                onClick={() => handleCardClick("/car")}
              >
                <p className="card-title">All</p>
                <h3 className="card-value">Cars List</h3>
                <p className="card-change"></p>
              </div>

              <div
                className="card small-card-b"
                onClick={() => handleCardClick("/create")}
              >
                <p className="card-title">.</p>
                <h3 className="card-value">Add Car</h3>
                <p className="card-change"></p>
              </div>
            </div>

            {/* Charts Row */}
            <div className="charts-row">
              <div className="card chart-card">
                <h4>Progress Graph</h4>
                <br />
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={progressData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="bookings" stroke="#8884d8" />
                    <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
                <div />
              </div>

              <div className="card chart-card">
                <h4>Active Users</h4>
                <br/>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart
                    data={activeUsersData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="activeUsers"
                      stroke="#8884d8"
                    />
                  </LineChart>
                </ResponsiveContainer>
                <div  />
              </div>
            </div>

            {/* Additional Cards Row */}
            <div className="cards-row">
              <div className="card info-card">
                <h4>Projects</h4>
                <div className="projects-list">
                  <div className="project-item">
                    <span className="project-name">
                      Soft UI Shopify Version
                    </span>
                    <span className="project-status success">Done</span>
                  </div>
                  <div className="project-item">
                    <span className="project-name">Progress Track</span>
                    <span className="project-status warning">In Progress</span>
                  </div>
                  <div className="project-item">
                    <span className="project-name">Flutter App</span>
                    <span className="project-status info">Pending</span>
                  </div>
                </div>
              </div>

              <div className="card info-card">
                <h4>Orders History</h4>
                <div className="orders-list">
                  <div className="order-item">
                    <span className="order-id">#24- Colombo</span>
                    <span className="order-status success">Completed</span>
                  </div>
                  <div className="order-item">
                    <span className="order-id">#31 - Galle</span>
                    <span className="order-status warning">Pending</span>
                  </div>
                  <div className="order-item">
                    <span className="order-id">#32 - Galle</span>
                    <span className="order-status info">In Review</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MuseDashboard;
