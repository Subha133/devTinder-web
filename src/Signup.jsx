import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profilePic: "",
  });
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePic" && files.length > 0) {
      setFormData({ ...formData, profilePic: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Upload to Cloudinary
  const uploadImage = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "your_upload_preset_here"); // replace with your Cloudinary preset
    data.append("cloud_name", "your_cloud_name_here"); // replace with your Cloudinary cloud name

    const res = await fetch("https://api.cloudinary.com/v1_1/your_cloud_name_here/image/upload", {
      method: "POST",
      body: data,
    });

    const json = await res.json();
    return json.url; // Cloudinary image URL
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = "";
      if (formData.profilePic) {
        imageUrl = await uploadImage(formData.profilePic);
      }

      const newUser = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        profilePic: imageUrl,
      };

      const response = await axios.post("http://localhost:5000/api/signup", newUser);

      alert("Signup successful!");
      console.log(response.data);
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Something went wrong during signup.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-amber-100">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 bg-amber-400 p-8 rounded-2xl shadow-lg w-80"
      >
        <h2 className="text-2xl font-semibold text-center mb-2">Create Account</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="border p-2 rounded-lg"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="border p-2 rounded-lg"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="border p-2 rounded-lg"
        />

        <input
          type="file"
          name="profilePic"
          accept="image/*"
          onChange={handleChange}
          className="border p-2 rounded-lg"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-amber-500 text-white py-2 rounded-lg hover:bg-amber-600 disabled:opacity-60"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
