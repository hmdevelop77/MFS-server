import "./Profile.css";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import EmailIcon from "@mui/icons-material/Email";

import WorkIcon from "@mui/icons-material/Work";
import AccountCircle from "@mui/icons-material/AccountCircle";

function Profile() {
  const { isLoggedIn, user, logOutUser, setUser } = useContext(AuthContext);

  const [errorMessage, setErrorMessage] = useState(undefined);

  const [newEmail, setnewEmail] = useState(user.email);
  const [newPassword, setnewPassword] = useState("");
  const [newUsername, setnewUsername] = useState(user.username);

  const navigate = useNavigate();

  const handleChangeEmail = (e) => setnewEmail(e.target.value);
  const handleChangePassword = (e) => setnewPassword(e.target.value);
  const handleChangeUsername = (e) => setnewUsername(e.target.value);

  const handleChangeProfilSubmit = (e) => {
    e.preventDefault();
    const requestBody = { newEmail, newPassword, newUsername };
    authService
      .edit(requestBody)
      .then((response) => {
        // If the POST request is successful redirect to the login page
        setUser(response.data);
        console.log("this is test",  setUser(response.data))
      })
      .catch((error) => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };
  const handleDeleteProfilSubmit = (e) => {
    e.preventDefault();

    authService
      .delete()
      .then((response) => {
        // If the Delete request is successful redirect to the home page
        navigate("/");
      })
      .catch((error) => {
        // If the request resolves with an error, set the error message in the state
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
    <div className="max-w-screen-xl sm:mx-auto ">
      <div className="grid grid-cols-1 gap-8 row-gap-4 lg:grid-cols-2">

      <h1>Profile</h1>

      <form onSubmit={handleChangeProfilSubmit}>
      <Box
          className="flex justify-center"
          sx={{
            display: "flex",
            alignItems: "center",
            "& > :not(style)": { m: 1 },
          }}
        >
          <TextField
            className="w-80 "
            InputLabelProps={{ style: { fontSize: 19, color: "#6495ED" } }}
            helperText=""
        
            label="Username"
            defaultValue={newUsername}
            type="text"
            name="newUsername"
            onChange={handleChangeUsername}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle style={{ color: "#6495ED" }} />
                </InputAdornment>
              ),
              style: { fontSize: 17, fontWeight: 450, fontStyle: "bold" },
            }}
          />
        </Box>

        <Box
          className="flex justify-center"
          sx={{
            display: "flex",
            alignItems: "center",
            "& > :not(style)": { m: 1 },
          }}
        >
          <TextField
            className="w-80"
            InputLabelProps={{ style: { fontSize: 19, color: "#6495ED" } }}
            helperText=""
            id="Email"
            label="Email"
            type="email"
            name="newEmail"
            value={newEmail}
            onChange={handleChangeEmail}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon style={{ color: "#6495ED" }} />
                </InputAdornment>
              ),
              style: { fontSize: 17, fontWeight: 450, fontStyle: "bold" },
            }}
          />
        </Box>

        
        <Box
          className="flex justify-center"
          sx={{
            display: "flex",
            alignItems: "center",
            "& > :not(style)": { m: 1 },
          }}
        >
          <TextField
            className="w-80 "
            InputLabelProps={{ style: { fontSize: 19, color: "#6495ED" } }}
            helperText=""
         
            label="Current password"
           
            type="password"
            name="password"
            onChange={handleChangePassword}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle style={{ color: "#6495ED" }} />
                </InputAdornment>
              ),
              style: { fontSize: 17, fontWeight: 450, fontStyle: "bold" },
            }}
          />
        </Box>

        <Box
          className="flex justify-center"
          sx={{
            display: "flex",
            alignItems: "center",
            "& > :not(style)": { m: 1 },
          }}
        >
          <TextField
            className="w-80 "
            InputLabelProps={{ style: { fontSize: 19, color: "#6495ED" } }}
            helperText=""
         
            label="New password"
           
            type="password"
            name="newPassword"
            onChange={handleChangePassword}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle style={{ color: "#6495ED" }} />
                </InputAdornment>
              ),
              style: { fontSize: 17, fontWeight: 450, fontStyle: "bold" },
            }}
          />
        </Box>


        <Box
            className="flex justify-center"
            sx={{
              display: "flex",
              alignItems: "center",
              "& > :not(style)": { m: 1 },
            }}
          >
            <TextField
              multiline={true}
              rows={8}
              className=" w-80   "
              InputLabelProps={{ style: { fontSize: 19, color: "#6495ED" } }}
              helperText=""
         
              label="Bio"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <WorkIcon style={{ color: "#6495ED" }} />
                  </InputAdornment>
                ),
                style: { fontSize: 17, fontWeight: 450, fontStyle: "bold" },
              }}
            />
          </Box>



        <label>Name:</label>
        <input
          type="text"
          name="newUsername"
          value={newUsername}
          onChange={handleChangeUsername}
        />
        <label>Email:</label>
        <input
          type="email"
          name="newEmail"
          value={newEmail}
          onChange={handleChangeEmail}
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
      <form onSubmit={handleDeleteProfilSubmit}>
        <button type="submit">Delete profile</button>
      </form>
    </div>
    </div>
    </div>
  
  );
}

export default Profile;