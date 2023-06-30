import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FetchUserList, Removeuser } from "../Redux/Action";

const Userlisting = (props) => {
  const [search, setSearch] = useState("");
  const [selectedRole, setSelectedRole] = useState("All"); // State to hold the selected role
  const [filteredUsers, setFilteredUsers] = useState(props.user.userlist); // State to hold the filtered array
  useEffect(() => {
    props.loaduser();
  }, []);
  const handledelete = (code) => {
    if (window.confirm("Do you want to remove?")) {
      props.removeuser(code);
      props.loaduser();
      toast.success("User removed successfully.");
    }
  };

  useEffect(() => {
    setFilteredUsers(props.user.userlist);
  }, [props.user.userlist]);
  const handleRoleChange = (event) => {
    const role = event.target.value; // Get the selected role
    setSelectedRole(role); // Update the selected role state

    // Filter the array based on the selected role
    if (role === "All") {
      setFilteredUsers(props.user.userlist);
    } else {
      const filteredArray = props.user.userlist.filter(
        (user) => user.role === role
      );
      setFilteredUsers(filteredArray);
    } //} Update the filtered array state
  };
  return props.user.loading ? (
    <div>
      <h2>Loading...</h2>
    </div>
  ) : props.user.errmessage ? (
    <div>
      <h2>{props.user.errmessage}</h2>
    </div>
  ) : (
    <div>
      <div className="card">
        <div className="card-header">
          <input
            type="search"
            placeholder="Search Products"
            className="me-2"
            aria-label="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="form-control"
            value={selectedRole}
            onChange={handleRoleChange}
          >
            <option value="All">All</option>
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
          </select>
          <Link to={"/user/add"} className="btn btn-success">
            Add User [+]
          </Link>
        </div>
        <div className="card-body">
          <table className="table table-bordered">
            <thead className="bg-dark text-white">
              <tr>
                <td>Code</td>
                <td>Title</td>
                <td>Email</td>
                <td>Phone</td>
                <td>Role</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {filteredUsers
                .filter((val) => {
                  if (
                    val.name.toLowerCase().includes(search.toLocaleLowerCase())
                  ) {
                    return val;
                  } else if (search === "") {
                    return val;
                  }
                })
                .map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.role}</td>
                    <td>
                      <Link
                        to={"/user/edit/" + item.id}
                        className="btn btn-primary"
                      >
                        Edit
                      </Link>{" "}
                      |
                      <button
                        onClick={() => {
                          handledelete(item.id);
                        }}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loaduser: () => dispatch(FetchUserList()),
    removeuser: (code) => dispatch(Removeuser(code)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Userlisting);
