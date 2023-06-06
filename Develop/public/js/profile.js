document.addEventListener("DOMContentLoaded", (event) => {
  if (event) {
    console.info("DOM loaded");
  }

  const updateUserDetails = async (event) => {
    event.preventDefault();
  
    const weight = document.querySelector("#user-weight").value.trim();
    const height = document.querySelector("#user-height").value.trim();
    const goalWeight = document.querySelector("#user-goal-weight").value.trim();
    const activityLevel = document
      .querySelector("#user-activity-level")
      .value.trim();
    const fitnessGoal = document
      .querySelector("#user-fitness-goal")
      .value.trim();
    const dietaryPreference = document
      .querySelector("#user-dietary-preference")
      .value.trim();
    const restingHeartRate = document
      .querySelector("#user-resting-heart-rate")
      .value.trim();
    const bloodPressure = document
      .querySelector("#user-blood-pressure")
      .value.trim();
  
    if (
      weight &&
      height &&
      goalWeight &&
      activityLevel &&
      fitnessGoal &&
      dietaryPreference &&
      restingHeartRate &&
      bloodPressure
    ) {
      const userId = document.querySelector("#user-id").value.trim();
  
      // Create a weight history record
      const weightUpdateResponse = await fetch("/profile/weighthistory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: userId,
          weight: weight,
          date: new Date().toISOString().split("T")[0], // Get the current date in YYYY-MM-DD format
        }),
      });
  
      if (!weightUpdateResponse.ok) {
        alert("Failed to update weight history");
        return;
      }
  
      // Update the user details
      const userDetailsResponse = await fetch(`/profile/update/${userId}`, {
        method: "PUT",
        body: JSON.stringify({
          weight,
          height,
          goalWeight,
          activityLevel,
          fitnessGoal,
          dietaryPreference,
          restingHeartRate,
          bloodPressure,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (userDetailsResponse.ok) {
        // Close the modal and refresh the page
        const updateDetailsModal = bootstrap.Modal.getInstance(
          document.getElementById("updateDetailsModal")
        );
        updateDetailsModal.hide();
        document.location.reload();
      } else {
        alert("Failed to update user details");
      }
    }
  };
  // Add a click event handler to the "Save" button in your modal
  document
    .querySelector("#user-update-form")
    .addEventListener("submit", updateUserDetails);

  const newWorkoutFormHandler = async (event) => {
    event.preventDefault();

    const type = document.querySelector("#workout-type").value.trim();
    const description = document
      .querySelector("#workout-description")
      .value.trim();
    const duration = document.querySelector("#workout-duration").value.trim();
    const distance = document.querySelector("#workout-distance").value.trim();
    const sets = document.querySelector("#workout-sets").value.trim();
    const reps = document.querySelector("#workout-reps").value.trim();
    const weight = document.querySelector("#workout-weight").value.trim();
    const intensity = document.querySelector("#workout-intensity").value.trim();
    // const exercise_list = JSON.parse(document.querySelector('#workout-exercise-list').value.trim());
    const heart_rate = document
      .querySelector("#workout-heart-rate")
      .value.trim();
    const caloriesBurned = document
      .querySelector("#workout-calories")
      .value.trim();
    const rating = document.querySelector("#workout-rating").value.trim();
    const notes = document.querySelector("#workout-notes").value.trim();

    const response = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify({
        type,
        description,
        duration,
        distance,
        sets,
        reps,
        weight,
        intensity,
        heart_rate,
        caloriesBurned,
        rating,
        notes,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to create workout");
    }
  };

  const delButtonHandler = async (event) => {
    console.log("delete button clicked");
    event.preventDefault();

    if (event.target.classList.contains("delete-workout-btn")) {
      const id = event.target.getAttribute("data-id");

      const response = await fetch(`/api/workouts/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        document.location.replace("/profile");
      } else {
        alert("Failed to delete workout");
      }
    }
  };

  const deleteButtons = document.querySelectorAll(".delete-workout-btn");
  if (deleteButtons) {
    deleteButtons.forEach((button) =>
      button.addEventListener("click", delButtonHandler)
    );
  }

  const updateButton = document.querySelector(
    '.btn.btn-primary[data-toggle="modal"]'
  );
  if (updateButton) {
    updateButton.addEventListener("click", function () {
      const updateDetailsModal = new bootstrap.Modal(
        document.getElementById("updateDetailsModal")
      );
      updateDetailsModal.show();
    });
  }

  const updateUserDetailsForm = document.querySelector(
    ".update-user-details-form"
  );
  if (updateUserDetailsForm) {
    updateUserDetailsForm.addEventListener("submit", updateUserDetails);
  }

  const newWorkoutForm = document.querySelector(".new-workout-form");
  if (newWorkoutForm) {
    newWorkoutForm.addEventListener("submit", newWorkoutFormHandler);
  }

  const workoutList = document.querySelector(".workout-list");
  if (workoutList) {
    workoutList.addEventListener("click", delButtonHandler);
  }
}); // closing DOMContentLoaded
