import React from 'react'

const Profile = () => {
  const token = localStorage.getItem('user'); // this is your JWT token

  let name = '';
  try {
    const payload = token.split('.')[1]; // get the middle part
    const decoded = JSON.parse(atob(payload)); // decode base64
    name = decoded.name; // now access name
  } catch (error) {
    console.error("Invalid token", error);
  }

  return (
    <div>
      <p>Name: {name}</p>
    </div>
  );
}


export default Profile

