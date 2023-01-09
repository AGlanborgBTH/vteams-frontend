import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
import axios from "axios";

export default async function getWalletValue() {
  try {
    let user = cookies.get("user");
    // Retrieve the current wallet value
    const response = await axios.get(
      `http://localhost:3000/v1/users/${user.id}`
    );
    const wallet = response.data.wallet;

    return wallet;
  } catch (error) {
    console.error(error);
  }
}
