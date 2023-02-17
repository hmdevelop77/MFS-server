import "./ProfilePage.css";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";

function ProfilePage() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  const [errorMessage, setErrorMessage] = useState(undefined);

  const [newEmail, setnewEmail] = useState(user.email);
  const [newPassword, setnewPassword] = useState("");
  const [newUsername, setnewUsername] = useState(user.username);

  const navigate = useNavigate();

  const handleChangeEmail = (e) => setnewEmail(e.target.value);
  const handleChangePassword = (e) => setnewPassword(e.target.value);
  const handleChangeUsername = (e) => setnewUsername(e.target.value);

  // useEffect(()=>{
  //  async function handleChangeProfilSubmit(e) {
  //     e.preventDefault();

  //     const requestBody = { newEmail, newPassword, newUsername };

  //     authService
  //       .edit(requestBody)
  //       .then((response) => {
  //         // If the POST request is successful redirect to the login page
  //         navigate("/profile");
  //       })
  //       .catch((error) => {
  //         // If the request resolves with an error, set the error message in the state
  //         const errorDescription = error.response.data.message;
  //         setErrorMessage(errorDescription);
  //       });
  //   }
  //   handleChangeProfilSubmit()
  // },[])

  const handleChangeProfilSubmit = (e) => {
    e.preventDefault();
    const requestBody = { newEmail, newPassword, newUsername };
    authService
      .edit(requestBody)
      .then((response) => {
        // If the POST request is successful redirect to the login page
        navigate("/profile");
      })
      .catch((error) => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="SignupPage">
      <h1>Profile</h1>

      <form onSubmit={handleChangeProfilSubmit}>
        <label>Email:</label>
        <input
          type="email"
          name="newEmail"
          value={newEmail}
          onChange={handleChangeEmail}
        />

        <label>Name:</label>
        <input
          type="text"
          name="newUsername"
          value={newUsername}
          onChange={handleChangeUsername}
        />

        <label>Curent password:</label>
        <input
          type="password"
          name="password"
          onChange={handleChangePassword}
        />

        <label>New password:</label>
        <input
          type="password"
          name="newPassword"
          onChange={handleChangePassword}
        />

        <br></br>

        <button type="submit">Edit</button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}

export default ProfilePage;
