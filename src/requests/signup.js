export default async function signUpUser(firstname, lastname, email, pwd) {
    let response = await fetch ("http://localhost:3000/v1/users/signup", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Firstname: firstname,
            Surname: lastname,
            Email: email,
            Cryptedpassword: pwd})
      })

      let result = await response;
      return result;
}