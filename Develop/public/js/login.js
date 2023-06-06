const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && email && password) {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const userData = await response.json();
        const userId = userData.id;

        // Create a record in the UserDetail table
        await fetch(`/api/users/update/${userId}`, {
          method: 'PUT',
          body: JSON.stringify({
            user_id: userId,
            weight: 0,
            height: 0,
            bmi: 0,
            goal_weight: 0,
            activity_level: '',
            fitness_goal: '',
            dietary_preference: '',
            resting_heart_rate: 0,
            blood_pressure: '',
            sleep_data: null,
            body_measurements: null,
          }),
          headers: { 'Content-Type': 'application/json' },
        });

        document.location.replace('/profile');
      } else {
        const data = await response.json();
        throw new Error(data.message);
      }
    } catch (error) {
      console.log(error);
      // Display an error message to the user
      // For example, update the DOM with the error message
    }
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
