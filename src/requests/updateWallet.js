import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
import axios from "axios";

let user = cookies.get("user");

export default async function updateWallet(value) {
  try {
    // Send a patch request to update the wallet value
    await axios.patch(`http://localhost:3000/v1/users/${user.id}`, {
      wallet: value,
    });
  } catch (error) {
    console.error(error);
  }
}
