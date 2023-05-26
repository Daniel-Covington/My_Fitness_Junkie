const newFormHandler = async (event) => {
  event.preventDefault();

  const type = document.querySelector('#workout-type').value.trim();
  const duration = document.querySelector('#workout-duration').value.trim();
  const intensity = document.querySelector('#workout-intensity').value.trim();
  const caloriesBurned = document.querySelector('#workout-calories').value.trim();

  if (type && duration && intensity && caloriesBurned) {
    const response = await fetch(`/api/workouts`, {
      method: 'POST',
      body: JSON.stringify({ type, duration, intensity, caloriesBurned }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create workout');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/workouts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to delete workout');
    }
  }
};

document
  .querySelector('.new-workout-form')
  .addEventListener('submit', newFormHandler);

document
  .querySelector('.workout-list')
  .addEventListener('click', delButtonHandler);