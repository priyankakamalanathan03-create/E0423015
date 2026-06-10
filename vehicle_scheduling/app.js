const axios = require("axios");

// =======================
// YOUR ACCESS TOKEN
// =======================
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJwcml5YW5rYWthbWFsYW5hdGhhbjAzQGdtYWlsLmNvbSIsImV4cCI6MTc4MTA3MTkzMywiaWF0IjoxNzgxMDcxMDMzLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNjdlMTNlMjYtZjdlZi00MzNjLTg5OGYtYTgxOTI0NGZlYTA4IiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoicHJpeWFua2EgayIsInN1YiI6Ijk3MGNlNTYzLTQ4NjAtNGZhZC04NDM1LTBlZTY0YzgwMGE4MiJ9LCJlbWFpbCI6InByaXlhbmtha2FtYWxhbmF0aGFuMDNAZ21haWwuY29tIiwibmFtZSI6InByaXlhbmthIGsiLCJyb2xsTm8iOiJlMDQyMzAxNSIsImFjY2Vzc0NvZGUiOiJEdndFRFoiLCJjbGllbnRJRCI6Ijk3MGNlNTYzLTQ4NjAtNGZhZC04NDM1LTBlZTY0YzgwMGE4MiIsImNsaWVudFNlY3JldCI6InJoamFRRHRzSGZ0QlNZUU0ifQ._FJeSK3yqiuDxUqg1NG9PDnkGP2OGGuPy6f1eyERPrw";

// =======================
// API URLs
// =======================
const DEPOTS_API =
  "http://4.224.186.213/evaluation-service/depots";

const VEHICLES_API =
  "http://4.224.186.213/evaluation-service/vehicles";

// =======================
// KNAPSACK FUNCTION
// =======================
function knapsack(vehicles, maxHours) {
  const n = vehicles.length;

  const dp = Array(n + 1)
    .fill()
    .map(() => Array(maxHours + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    const duration = vehicles[i - 1].Duration;
    const impact = vehicles[i - 1].Impact;

    for (let w = 0; w <= maxHours; w++) {
      if (duration <= w) {
        dp[i][w] = Math.max(
          impact + dp[i - 1][w - duration],
          dp[i - 1][w]
        );
      } else {
        dp[i][w] = dp[i - 1][w];
      }
    }
  }

  let selectedVehicles = [];
  let w = maxHours;

  for (let i = n; i > 0; i--) {
    if (dp[i][w] !== dp[i - 1][w]) {
      selectedVehicles.push(vehicles[i - 1]);
      w -= vehicles[i - 1].Duration;
    }
  }

  return {
    maxImpact: dp[n][maxHours],
    selectedVehicles: selectedVehicles.reverse(),
  };
}

// =======================
// MAIN FUNCTION
// =======================
async function main() {
  try {
    const headers = {
      Authorization: `Bearer ${TOKEN}`,
    };

    const depotsResponse = await axios.get(DEPOTS_API, {
      headers,
    });

    const vehiclesResponse = await axios.get(VEHICLES_API, {
      headers,
    });

    const depots = depotsResponse.data.depots;
    const vehicles = vehiclesResponse.data.vehicles;

    console.log("\n=========================");
    console.log("VEHICLE SCHEDULER");
    console.log("=========================\n");

    for (const depot of depots) {
      const hours = depot.MechanicHours;

      const result = knapsack(vehicles, hours);

      const totalDuration =
        result.selectedVehicles.reduce(
          (sum, v) => sum + v.Duration,
          0
        );

      console.log(`Depot ID: ${depot.ID}`);
      console.log(`Mechanic Hours: ${hours}`);
      console.log(`Maximum Impact: ${result.maxImpact}`);
      console.log(`Total Duration: ${totalDuration}`);

      console.log("\nSelected Vehicles:");

      result.selectedVehicles.forEach((vehicle) => {
        console.log(
          `TaskID: ${vehicle.TaskID} | Duration: ${vehicle.Duration} | Impact: ${vehicle.Impact}`
        );
      });

      console.log("\n-------------------------\n");
    }
  } catch (error) {
    console.error(
      "Error:",
      error.response?.data || error.message
    );
  }
}

main();