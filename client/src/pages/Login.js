import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //state
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  //handle input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
//form handle anyone
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.post("/api/v1/user/login", {
      email: inputs.email,
      password: inputs.password,
    });
    if (data.success) {
      localStorage.setItem("userId", data?.user._id);
      dispatch(authActions.login());
      toast.success("User login Successfully");
      navigate("/");
    }
  } catch (error) {
    console.log(error);
  }
};

  //form handle ony admin 
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const { data } = await axios.post("/api/v1/user/login", {
  //       email: inputs.email,
  //       password: inputs.password,
  //     });
  //     if (data.success && inputs.email === "admin@gmail.com" && inputs.password === "admin") {
  //       localStorage.setItem("userId", "665c182cc9b788542e55136a"); // Set the specific user id
  //       dispatch(authActions.login());
  //       toast.success("User login Successfully");
  //       navigate("/");
  //     } else {
  //       toast.error("Invalid email or password");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <>
      <form onSubmit={handleSubmit} className=" justify-center">
        <Box
          maxWidth={450}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          margin="auto"
          marginTop={15}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          borderRadius={5}
        >
          <Typography
            variant="h4"
            sx={{ textTransform: "uppercase" }}
            padding={3}
            textAlign="center"
          >
           Admin Login
          </Typography>

          <TextField
            placeholder="email"
            value={inputs.email}
            name="email"
            margin="normal"
            type={"email"}
            required
            onChange={handleChange}
          />
          <TextField
            placeholder="password"
            value={inputs.password}
            name="password"
            margin="normal"
            type={"password"}
            required
            onChange={handleChange}
          />

          <Button
            type="submit"
            sx={{ bgcolor: "#263238", borderRadius: 3, marginTop: 3 ,'&:hover': {
              backgroundColor: '#263238',
              color:"white",
          },}}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
          <Button
            onClick={() => navigate("/register")}
            sx={{ bgcolor: "#263238", color:"white", borderRadius: 3, marginTop: 3 ,'&:hover': {
              backgroundColor: '#263238',
              color:"white",
          },}}
          >
            Not a user ? Please Register
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Login;




// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Box, Typography, TextField, Button } from "@mui/material";
// import axios from "axios";
// import { useDispatch } from "react-redux";
// import { authActions } from "../redux/store";
// import toast from "react-hot-toast";

// const Login = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
  
//   const adminEmail = "admin@teamfuture.in";
//   const adminPassword = "securepassword"; // Change this to your admin password
  
//   const [inputs, setInputs] = useState({
//     email: "",
//     password: "",
//   });

//   //handle input change
//   const handleChange = (e) => {
//     setInputs((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   //form handle
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (inputs.email === adminEmail && inputs.password === adminPassword) {
//       localStorage.setItem("userId", "admin");
//       dispatch(authActions.login());
//       toast.success("Admin login Successfully");
//       navigate("/");
//     } else {
//       toast.error("Invalid email or password");
//     }
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit} className=" justify-center">
//         <Box
//           maxWidth={450}
//           display="flex"
//           flexDirection={"column"}
//           alignItems="center"
//           justifyContent={"center"}
//           margin="auto"
//           marginTop={15}
//           boxShadow="10px 10px 20px #ccc"
//           padding={3}
//           borderRadius={5}
//         >
//           <Typography
//             variant="h4"
//             sx={{ textTransform: "uppercase" }}
//             padding={3}
//             textAlign="center"
//           >
//             Admin Login
//           </Typography>

//           <TextField
//             placeholder="email"
//             value={inputs.email}
//             name="email"
//             margin="normal"
//             type={"email"}
//             required
//             onChange={handleChange}
//           />
//           <TextField
//             placeholder="password"
//             value={inputs.password}
//             name="password"
//             margin="normal"
//             type={"password"}
//             required
//             onChange={handleChange}
//           />

//           <Button
//             type="submit"
//             sx={{ bgcolor: "#263238", borderRadius: 3, marginTop: 3 ,'&:hover': {
//               backgroundColor: '#263238',
//               color:"white",
//           },}}
//             variant="contained"
//             color="primary"
//           >
//             Submit
//           </Button>
//           <Button
//             onClick={() => navigate("/register")}
//             sx={{ bgcolor: "#263238", color:"white", borderRadius: 3, marginTop: 3 ,'&:hover': {
//               backgroundColor: '#263238',
//               color:"white",
//           },}}
//           >
//             Not a user ? Please Register
//           </Button>
//         </Box>
//       </form>
//     </>
//   );
// };

// export default Login;

