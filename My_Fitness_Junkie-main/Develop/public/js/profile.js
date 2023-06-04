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
    // const bodyMeasurements = document.querySelector('#user-body-measurements').value.trim();    

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

      const response = await fetch(`/profile/update/${userId}`, {
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

      if (response.ok) {
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

////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////

// Variable declarations //
// x axis is a weekly prerecorded set of data//
const xValues = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
// y axis is a heart rate data set in beats per minute //
const yValues = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290, 300];

// week heartrate // 

// Heart Rate Chart Functionality //
new Chart("myChart", {
  type: "line",
  data: {
    // Labels for X & Y Axes //
    labels: xValues, yValues,
    datasets: [
      // Each represents a different Exercise's heart rate data per day per week  //
    {
      data: [],
      borderColor: "red",
      fill: false
    },
    {
      data: [],
      borderColor: "green",
      fill: false
    },
    {
      data: [],
      borderColor: "blue",
      fill: false
    },
  ]
  },
  options: {
    legend: {display: false}
  }
});