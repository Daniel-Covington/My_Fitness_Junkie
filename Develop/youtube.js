// Load in top current workouts when page loads
async function loadTopWorkouts() {
     // Annalee Key: AIzaSyDYbJRRhuu0m4CJmkTL6VegvwSbRiFtH5A
  const YouTubeapiKey = "AIzaSyDI57Lr3xsoJK_Rgd2QzXIZkx0fm2k_vsg";
  const youtubeUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=03&type=video&q=gym%20workouts&order=viewCount&videoDefinition=high&publishedAfter=2022-01-01T00:00:00Z&key=${YouTubeapiKey}`;
  console.log("hello from loadTopWorkouts");
  try {
    const youtubeResponse = await axios.get(youtubeUrl);
    const youtubeData = youtubeResponse.data;
    // displays the top 3 workout videos
    displayPopularWorkout(youtubeData.items);

  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
loadTopWorkouts();

function displayPopularWorkout(workouts) {
    const workoutContainer = document.getElementById("workouts-container");
    let workoutsThumbnails = "";
  
    workouts.forEach((workout) => {
      trailerThumbnails += `
        <div style="display: inline-block; margin: 20px;">
          <a href="https://www.youtube.com/watch?v=${trailer.id.videoId}" target="_blank">
            <img class="trailer-thumbnail" src="${trailer.snippet.thumbnails.medium.url}" alt="${trailer.snippet.title}">
          </a>
        </div>
      `;
    });
  
    trailersContainer.innerHTML = trailerThumbnails;
    }
