const axios = require("axios").default;


// Load in top current workouts when page loads
async function loadTopWorkouts() {
  //Alternative key : AIzaSyDI57Lr3xsoJK_Rgd2QzXIZkx0fm2k_vsg
  const YouTubeapiKey = "AIzaSyDYbJRRhuu0m4CJmkTL6VegvwSbRiFtH5A";
  const youtubeUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=03&type=video&q=official%20trailer&order=viewCount&videoDefinition=high&publishedAfter=2022-01-01T00:00:00Z&key=${YouTubeapiKey}`;

  try {
    const youtubeResponse = await axios.get(youtubeUrl);
    const youtubeData = youtubeResponse.data;
    // displays the top 6 workout videos
    displayPopularWorkout(youtubeData.items);

  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// This will diplay the top 3 workouts on the page as thumbnails
function displayPopularWorkout(loadTopWorkouts) {
  const workoutContainer = document.getElementById("workouts-container");
  let workoutThumbnails = "";

  loadTopWorkouts.forEach((workout) => {
    workoutThumbnails += `
      <div style="display: inline-block; margin: 20px;">
        <a href="https://www.youtube.com/watch?v=${workout.id.videoId}" target="_blank">
          <img class="trailer-thumbnail" src="${workout.snippet.thumbnails.medium.url}" alt="${workout.snippet.title}">
        </a>
      </div>
    `;
  });

  workoutContainer.innerHTML = workoutThumbnails;
}

module.exports = axios;

// try {
//     const youtubeResponse = fetch(youtubeUrl);
//     const youtubeData = youtubeResponse.json();
//     displayPopularTrailers(youtubeData.items);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
