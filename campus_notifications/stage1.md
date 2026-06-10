Stage 1 - Notification System API Design
Get Notifications
Endpoint:
GET /notifications
Response:
{
  "notifications": [
    {
      "id": "123",
      "type": "Placement",
      "message": "Google hiring",
      "timestamp": "2026-06-10T10:00:00Z"
    }
  ]
}
Create Notification
Endpoint:
POST /notifications
Request:
{
  "type": "Placement",
  "message": "Google hiring"
}
Response:
{
  "success": true,
  "notificationId": "123"
}
Mark Notification as Read
Endpoint:
PUT /notifications/{id}/read
Response:
{
  "success": true
}
Delete Notification
Endpoint:
DELETE /notifications/{id}
Response:
{
  "success": true
}
Real-Time Notification Mechanism
WebSockets can be used to push notifications instantly to connected users. Push notifications can be used for mobile devices when the application is not active.

