import axios from "axios";

export default async function deleteOneUser(id) {
  try {
    await axios.delete(
      `http://localhost:3000/v1/users/${id}`
    );
  } catch (error) {
    console.error(error);
  }
}