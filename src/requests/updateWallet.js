import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
import axios from "axios";

let user = cookies.get("user");

export async function incrementWallet(incrementValue) {
  try {
    // Retrieve the current wallet value
    const response = await axios.get(
      `http://localhost:3000/v1/users/${user.id}`
    );
    const wallet = response.data.wallet;
    console.log(`Adding: ${incrementValue}`); // log the value being added

    // Increment the wallet value by the specified amount
    const newWalletValue = wallet + incrementValue;
    console.log(`Current wallet value: ${newWalletValue}`); // log the current wallet value

    // Send a patch request to update the wallet value
    await axios.patch(`http://localhost:3000/v1/users/${user.id}`, {
      wallet: newWalletValue,
    });
  } catch (error) {
    console.error(error);
  }
}
