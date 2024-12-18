---
layout: default
permalink: /create_account_stripe/
---

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Crear Cuenta Conectada</title>
  <script src="https://js.stripe.com/v3/"></script>
  <style>
    /* Add your CSS styles here */
    body {
      font-family: Arial, sans-serif;
      background-color: #f8f9fa;
      margin: 0;
      padding: 0;
    }

    .container {
      max-width: 400px;
      margin: 50px auto;
      padding: 20px;
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    h1 {
      text-align: center;
      color: #333;
    }

    input[type="text"],
    input[type="email"],
    button {
      width: 100%;
      padding: 10px;
      margin-bottom: 15px;
      border: 1px solid #ccc;
      border-radius: 5px;
      box-sizing: border-box;
    }

    button {
      background-color: #6699ff;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;
    }

    button:hover {
      background-color: #0056b3;
    }
  </style>
</head>
<body>

<div class="container">
  <h1>Crear Cuenta Conectada</h1>
  <form id="connected-account-form">
    <label for="email">Correo Electrónico:</label>
    <input type="email" id="email" name="email" required><br>
    <label for="business_name">Nombre del Negocio:</label>
    <input type="text" id="business_name" name="business_name" required><br>
    <input type="hidden" id="id" name="restaurant_id" />
    <button type="submit">Crear Cuenta</button>
  </form>
</div>

<script src="/assets/js/create-account.js"></script> <!-- Ensure the path matches the location of your JS file -->

<script>
  // Initialize Netlify Identity
  netlifyIdentity.init();

  document.addEventListener('DOMContentLoaded', function() {
    const user = netlifyIdentity.currentUser(); // Get the current user
    if (user) {
      console.log('Current user:', user);
      handleUserLogin(user);
    }

    // Netlify identity login event
    netlifyIdentity.on('login', user => {
      console.log('User logged in:', user); // Log the entire user object for debugging
      handleUserLogin(user);
    });

    // Netlify identity logout event
    netlifyIdentity.on('logout', () => {
      const usernameSpan = document.getElementById('username');
      if (usernameSpan) {
        usernameSpan.innerText = '';
      }
      console.log('User logged out.');
    });
  });

  function handleUserLogin(user) {
    console.log('User is logged in.');

    // Check if user_metadata exists
    if (user.user_metadata) {
      console.log('User Metadata:', user.user_metadata);

      // Populate the hidden restaurant ID input field
      const restaurantIdInput = document.getElementById('id');
      if (restaurantIdInput && user.user_metadata.id) {
        restaurantIdInput.value = user.user_metadata.id; // Set the restaurant ID
        console.log('Restaurant ID:', restaurantIdInput.value);
      } else {
        console.error('User is logged in, but restaurant ID not found in metadata.');
      }
    } else {
      console.error('User is logged in, but no user metadata found.');
    }
  }

  // Handle form submission
  document.getElementById('connected-account-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById('email').value;
    const businessName = document.getElementById('business_name').value;
    const restaurantId = document.getElementById('id').value; // Get restaurant ID

    // Validation
    if (!email || !businessName || !restaurantId) {
      console.error('All fields must be filled out.');
      return;
    }

    // Log the values for debugging
    console.log('Email:', email);
    console.log('Business Name:', businessName);
    console.log('Restaurant ID:', restaurantId);

    // Make a POST request to your serverless function or API to create the Stripe connected account
    fetch('/.netlify/functions/server', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'create_connected_account',
        email: email,
        business_name: businessName,
        restaurant_id: restaurantId // Send restaurant ID to your API
      }),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      // Handle success (e.g., show a message or redirect)
    })
    .catch((error) => {
      console.error('Error:', error);
      // Handle error (e.g., show an error message)
    });
  });
</script>


</body>
</html>
