const apiKey = "f753df43-120c-4ef2-9669-4bb7e8a8871c";
const seriesIdToFind = "bd830e89-3420-4df5-854d-82cfab3e1e04";
const apiUrl = `https://api.cricapi.com/v1/currentMatches?apikey=${apiKey}&offset=0`;

// Function to format team information
function formatTeamInfo(match) {
  return `
    <p>Teams: <b>${match.teams[1]}</b> vs <b>${match.teams[0]}</b></p>
  `;
}

// Function to format live score details
function formatLiveScore(match) {
  return `
    <p><b>Live Score:</b>
      <ul>
        <li>${match.teams[1]}: ${match.score[0].r}/${match.score[0].w} in ${match.score[0].o} overs</li>
        <li>${match.teams[0]}: ${match.score[1].r}/${match.score[1].w} in ${match.score[1].o} overs</li>
      </ul>
    </p>
    <p>Currently Playing: <b>${match.teams[0]}</b></p>
    <p>Status: <b>${match.status}</b></p>
  `;
}

function displayMatchData(matchDetails) {
  const matchDataElement = document.getElementById("matchData");
  matchDataElement.innerHTML = formatTeamInfo(matchDetails) + formatLiveScore(matchDetails);
}

// Fetch the JSON data from the API
fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    if (data && data.data) {
      const matchDetails = data.data.find((match) => match.series_id === seriesIdToFind);

      if (matchDetails) {
        displayMatchData(matchDetails);
      } else {
        document.getElementById("matchData").textContent = "Match with series_id " + seriesIdToFind + " not found.";
      }
    } else {
      document.getElementById("matchData").textContent = "Data not available.";
    }
  })
  .catch((error) => {
    document.getElementById("matchData").textContent = "Error fetching data: " + error;
  });
