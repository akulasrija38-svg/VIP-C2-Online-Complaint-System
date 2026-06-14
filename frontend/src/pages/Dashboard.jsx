import { useState, useEffect } from "react";
import API from "../services/api";
import { toast } from "react-toastify";

function Dashboard() {

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: ""
  });

  const [complaints, setComplaints] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbackData, setFeedbackData] = useState({
  rating: "",
  comment: ""
});

  const token = localStorage.getItem("token");

  const fetchComplaints = async () => {
    try {

      const res = await API.get(
        "/complaints",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setComplaints(res.data);

    } catch (error) {
      console.log(error);
    }
  };

  const fetchFeedbacks = async () => {

  try {

    const res =
    await API.get("/feedback");

    setFeedbacks(res.data);

  } catch (error) {

    console.log(error);

  }

};

  useEffect(() => {
    fetchComplaints();
    fetchFeedbacks();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        "/complaints",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success("Complaint Submitted Successfully");

      setFormData({
        title: "",
        description: "",
        category: ""
      });

      fetchComplaints();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );

    }

  };

  const updateStatus = async (id) => {

    try {

      await API.put(
        `/complaints/${id}`,
        {
          status: "Resolved"
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      fetchComplaints();

    } catch (error) {

      console.log(error);

    }

  };

const submitFeedback = async (complaintId) => {

  try {

    await API.post(
      "/feedback",
      {
        complaint: complaintId,
        rating: feedbackData.rating,
        comment: feedbackData.comment
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    toast.success(
      "Feedback Submitted Successfully"
    );
fetchFeedbacks();
    setFeedbackData({
      rating: "",
      comment: ""
    });

  } catch (error) {

    console.log(error);

    toast.error(
      error.response?.data?.message ||
      "Failed to submit feedback"
    );

  }

};

  const logout = () => {

    localStorage.removeItem("token");

    window.location.href = "/login";

  };

  return (
    <div className="container mt-5">

      <div className="d-flex justify-content-between mb-4">

        <h2>Complaint Dashboard</h2>

        <button
          className="btn btn-danger"
          onClick={logout}
        >
          Logout
        </button>

      </div>

      <div className="card shadow p-4 mb-5">

        <h4 className="mb-3">
          Submit New Complaint
        </h4>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="title"
            placeholder="Complaint Title"
            className="form-control mb-3"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Complaint Description"
            className="form-control mb-3"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            className="form-control mb-3"
            value={formData.category}
            onChange={handleChange}
            required
          />

          <button
            className="btn btn-primary w-100"
          >
            Submit Complaint
          </button>

        </form>

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
      <h3 className="mb-4">
        My Complaints
      </h3>

      {complaints.length === 0 ? (
        <p>No complaints found.</p>
      ) : (
        complaints.map((item) => (

          <div
            key={item._id}
            className="card shadow-lg border-0 mb-3"
          >

            <div className="card-body">

              <h5 className="card-title">
                {item.title}
              </h5>

              <p className="card-text">
                {item.description}
              </p>

              <p>
                <strong>Category:</strong>
                {" "}
                {item.category}
              </p>

              <p>
                <strong>Status:</strong>
                {" "}
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

             {item.status !== "Resolved" ? (

  <button
    className="btn btn-success"
    onClick={() =>
      updateStatus(item._id)
    }
  >
    Mark Resolved
  </button>

) : (

  <>
    <div className="mt-3">

      <h6>Give Feedback</h6>

      <select
        className="form-control mb-2"
        onChange={(e) =>
          setFeedbackData({
            ...feedbackData,
            rating: e.target.value
          })
        }
      >
        <option value="">
          Select Rating
        </option>

        <option value="1">1 Star</option>
        <option value="2">2 Stars</option>
        <option value="3">3 Stars</option>
        <option value="4">4 Stars</option>
        <option value="5">5 Stars</option>

      </select>

      <textarea
        className="form-control mb-2"
        placeholder="Write feedback"
        onChange={(e) =>
          setFeedbackData({
            ...feedbackData,
            comment: e.target.value
          })
        }
      />

      <button
        className="btn btn-primary"
        onClick={() =>
          submitFeedback(item._id)
        }
      >
        Submit Feedback
      </button>

    </div>

    {
      feedbacks
        .filter(
          (f) => f.complaint === item._id
        )
        .map((f) => (

          <div
            key={f._id}
            className="alert alert-info mt-3"
          >

            <strong>Rating:</strong>{" "}
            {f.rating}/5

            <br />

            <strong>Feedback:</strong>{" "}
            {f.comment}

          </div>

        ))
    }

  </>

)}
            </div>

          </div>

        ))
      )}

    </div>
  );
}

export default Dashboard;