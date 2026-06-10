Stage 2 - Database Schema Design
Relational Database Schema
Users Table
Column	Type
user_id	INT (PK)
name	VARCHAR(100)
email	VARCHAR(100)
role	VARCHAR(20)
Notifications Table
Column	Type
notification_id	INT (PK)
type	VARCHAR(50)
message	TEXT
created_at	TIMESTAMP
User_Notifications Table
Column	Type
id	INT (PK)
user_id	INT (FK)
notification_id	INT (FK)
is_read	BOOLEAN
Relationships
•	One user can receive many notifications.
•	One notification can be sent to many users.
•	User_Notifications acts as a junction table between Users and Notifications.
Scaling Issues
•	Large number of users can increase database size.
•	Frequent notification reads may create heavy database load.
•	Indexing is required on user_id and notification_id for faster queries.
NoSQL Alternative
A document database such as MongoDB can store notifications as documents.
Example:
{
  "userId": 1042,
  "notifications": [
    {
      "type": "Placement",
      "message": "Google hiring",
      "isRead": false
    }
  ]
}
NoSQL provides flexible schema design and better horizontal scalability for large notification systems.

