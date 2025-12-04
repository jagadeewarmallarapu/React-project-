import { useState } from "react";
a
function App() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [updateIndex, setupdateIndex] = useState(null);
  const [records, setRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const recordPerPage = 2;

  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const currentRecords = records.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(records.length / recordPerPage);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) return;

    if (updateIndex == null) {
      setRecords([...records, formData]);
    } else {
      // Update Logic
      const temp = [...records];
      temp[updateIndex] = formData;
      setRecords(temp);
      setupdateIndex(null);
    }

    setFormData({ name: "", email: "" });
  };

  const handleEdit = (indexToEdit) => {
    // ❗ FIXED → clone the object so editing does NOT modify the original record
    setFormData({ ...records[indexToEdit] });
    setupdateIndex(indexToEdit);
  };

  const handleDelete = (indexToDelete) => {
    setRecords(records.filter((_, i) => i !== indexToDelete));
  };

  return (
    <>
      <div className="w-50 mx-auto mt-5">
        <h3 className="text-center">Enter Details</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter Name"
            className="form-control"
            autoComplete="off"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Email"
            className="form-control my-3"
            value={formData.email}
            onChange={handleChange}
          />

          <button className="btn btn-primary w-100">
            {updateIndex === null ? "Submit" : "Update Record"}
          </button>

          <h3 className="text-center mt-5">Record Details</h3>

          <table className="table table-bordered table-primary">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {currentRecords.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center">
                    No Record Found
                  </td>
                </tr>
              ) : (
                currentRecords.map((rec, index) => {
                  const actualIndex = firstIndex + index;

                  return (
                    <tr key={actualIndex}>
                      <td>{rec.name}</td>
                      <td>{rec.email}</td>
                      <td>
                        {/* ❗ FIXED: Added type="button" */}
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={() => handleEdit(actualIndex)}
                        >
                          Edit
                        </button>

                        {/* ❗ FIXED: Added type="button" */}
                        <button
                          type="button"
                          className="btn btn-danger mx-2"
                          onClick={() => handleDelete(actualIndex)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <nav className="d-flex justify-content-center">
            <ul className="pagination">
              {Array.from({ length: totalPages }, (_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  <button
                    type="button"
                    className="page-link"
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </form>
      </div>
    </>
  );
}

export default App;
