import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
import axios from "axios";


export default async function incrementWallet(incrementValue) {
  let user = cookies.get("user");
  try {
    // Retrieve the current wallet value
    const response = await axios.get(
      `http://localhost:3000/v1/users/${user.id}`
    );
    const wallet = response.data.wallet;

    // Increment the wallet value by the specified amount
    const newWalletValue = wallet + incrementValue;

    // Send a patch request to update the wallet value
    await axios.patch(`http://localhost:3000/v1/users/${user.id}`, {
      wallet: newWalletValue,
    });
  } catch (error) {
    console.error(error);
  }
}
