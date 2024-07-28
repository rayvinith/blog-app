import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function BlogCard({
  title,
  description,
  image,
  username,
  time,
  id,
  isUser,
}) {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/blog-details/${id}`);
  };

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`/api/v1/blog/delete-blog/${id}`);
      if (data?.success) {
        alert("Blog Deleted");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card
    className=" text-black"
      sx={{
        width: "100%",
        height:"60vh",
        backgroundColor:"#f0f0f0",
        margin:"12px",
        marginTop:"120px",
        borderRadius:"12px",
        padding: 2,
        color:"black",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
        ":hover:": {
          backgroundColor: '#263238',
          color:"white",
          
        },
      }}

      
    >
      {isUser && (
        <Box display={"flex"}>
          <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
            <ModeEditIcon color="info" />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }}  aria-label="recipe">
            {username}
          </Avatar>
        }
        title={username}
        subheader={time}
      />
      <CardMedia component="img" sx={{  height: '50%',maxWidth: 400 }} md={{height:"200vh"}} xs={{height:"200vh" }}  image={image} alt="blog-images" />
      <CardContent>
        <Typography variant="h6" className="text-black font-bold text-xs">
          Title : {title}
        </Typography>
        <Typography variant="h6" className="text-black">
          Description : {description}
        </Typography>
      </CardContent>
    </Card>
  );
}
