import { useEffect, useState } from "react";
import API from "../services/api";

function AdminDashboard() {

  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {

    try {

      const token =
        localStorage.getItem("token");

      const res = await API.get(
        "/admin/complaints",
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      setComplaints(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");

    window.location.href = "/login";

  };

  return (
    <div className="container mt-5">

      <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>Admin Dashboard</h2>

        <button
          className="btn btn-danger"
          onClick={logout}
        >
          Logout
        </button>

      </div>

      <div className="row mb-4">

        <div className="col-md-4">
          <div className="card text-center shadow">
            <div className="card-body">
              <h3>{complaints.length}</h3>
              <p>Total Complaints</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow">
            <div className="card-body">
              <h3>
                {
                  complaints.filter(
                    c => c.status !== "Resolved"
                  ).length
                }
              </h3>
              <p>Pending</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow">
            <div className="card-body">
              <h3>
                {
                  complaints.filter(
                    c => c.status === "Resolved"
                  ).length
                }
              </h3>
              <p>Resolved</p>
            </div>
          </div>
        </div>

      </div>

      {complaints.length === 0 ? (

        <p>No complaints found.</p>

      ) : (

        complaints.map((item) => (

          <div
            key={item._id}
            className="card shadow mb-3"
          >

            <div className="card-body">

              <h5>{item.title}</h5>

              <p>{item.description}</p>

              <p>
                <strong>Category:</strong>{" "}
                {item.category}
              </p>

              <p>
                <strong>User:</strong>{" "}
                {item.user?.name || "N/A"}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {item.user?.email || "N/A"}
              </p>

              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={
                    item.status === "Resolved"
                      ? "badge bg-success"
                      : "badge bg-warning text-dark"
                  }
                >
                  {item.status}
                </span>
              </p>

            </div>

          </div>

        ))

      )}

    </div>
  );
}

export default AdminDashboard;