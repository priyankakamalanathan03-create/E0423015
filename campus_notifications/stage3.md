Stage 3 - Query Optimization
Given Query
SELECT * FROM notifications
WHERE studentID = 1042
AND isRead = false
ORDER BY createdAt DESC;
Why the Query Becomes Slow
As the number of notifications increases, the database must scan a large number of rows to find unread notifications for a specific student. Sorting the results by createdAt also increases query execution time.
Indexing Strategy
Create a composite index on:
(studentID, isRead, createdAt)
This allows the database to quickly locate unread notifications for a student and return them in sorted order.
Optimized Query Performance
With proper indexing:
•	Faster filtering by studentID
•	Faster filtering by isRead
•	Reduced sorting overhead
•	Improved response time for large datasets
Cost Estimation
Without indexes:
•	Full table scan
•	High CPU and I/O usage
•	Query cost increases as data grows
With indexes:
•	Index lookup instead of full scan
•	Lower CPU usage
•	Faster response time
•	Better scalability

