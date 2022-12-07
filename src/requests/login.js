export default async function getUser(email, pwd) {
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
      return result.json();
}
