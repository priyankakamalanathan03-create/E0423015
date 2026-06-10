const axios = require("axios");


const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJwcml5YW5rYWthbWFsYW5hdGhhbjAzQGdtYWlsLmNvbSIsImV4cCI6MTc4MTA3NDM5MCwiaWF0IjoxNzgxMDczNDkwLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiYzlmOGIwZTYtZDc1Ny00NWJhLThjMDUtOTJlNTAzNGIwODZhIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoicHJpeWFua2EgayIsInN1YiI6Ijk3MGNlNTYzLTQ4NjAtNGZhZC04NDM1LTBlZTY0YzgwMGE4MiJ9LCJlbWFpbCI6InByaXlhbmtha2FtYWxhbmF0aGFuMDNAZ21haWwuY29tIiwibmFtZSI6InByaXlhbmthIGsiLCJyb2xsTm8iOiJlMDQyMzAxNSIsImFjY2Vzc0NvZGUiOiJEdndFRFoiLCJjbGllbnRJRCI6Ijk3MGNlNTYzLTQ4NjAtNGZhZC04NDM1LTBlZTY0YzgwMGE4MiIsImNsaWVudFNlY3JldCI6InJoamFRRHRzSGZ0QlNZUU0ifQ.IL-SpWT-4qj_v2fEp6HQePvJXs3_4w-Tjn5KoMBotYw";


const NOTIFICATIONS_API =
  "http://4.224.186.213/evaluation-service/notifications";

function getPriority(type) {
  switch (type.toLowerCase()) {
    case "placement":
      return 3;

    case "result":
      return 2;

    case "event":
      return 1;

    default:
      return 0;
  }
}


async function main() {
  try {
    const response = await axios.get(
      NOTIFICATIONS_API,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );

    const notifications =
      response.data.notifications;

    notifications.sort((a, b) => {
      const priorityDiff =
        getPriority(b.Type) -
        getPriority(a.Type);

      if (priorityDiff !== 0)
        return priorityDiff;

      return (
        new Date(b.Timestamp) -
        new Date(a.Timestamp)
      );
    });

    const top10 = notifications.slice(0, 10);

    console.log("\n====================");
    console.log("TOP 10 NOTIFICATIONS");
    console.log("====================\n");

    top10.forEach((item, index) => {
      console.log(
        `${index + 1}. ${item.Type} | ${
          item.Message
        } | ${item.Timestamp}`
      );
    });
  } catch (error) {
    console.log(
      "Error:",
      error.response?.data ||
        error.message
    );
  }
}

main();