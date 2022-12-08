export default async function loginUser(email, pwd) {
    let response = await fetch ("http://localhost:3000/v1/users/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Email: email,
          Cryptedpassword: pwd})
      })

      let result = await response;
      if (response.status === 400) {
        throw new Error("failed")
      }

      return result.json();
}
