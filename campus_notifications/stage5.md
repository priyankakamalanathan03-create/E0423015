Stage 5 - Redesigning the Notification Delivery Process
Problems with the Current Approach
The current notify_all(student_ids, message) function sends notifications one by one. If the number of students is very large, the process becomes slow and consumes more resources.
Issues:
•	High response time
•	Poor scalability
•	Failure for one user may affect the entire process
•	Increased server load
Improved Design
Use a message queue system.
Steps:
1.	Notification request is added to a queue.
2.	Worker processes read messages from the queue.
3.	Notifications are sent asynchronously.
4.	Failed notifications can be retried without affecting other users.
Improved Pseudocode
def notify_all(student_ids, message):
    for student_id in student_ids:
        queue.publish(student_id, message)

worker():
    while True:
        task = queue.consume()
        send_notification(task.student_id, task.message)
Benefits
•	Better scalability
•	Faster processing
•	Supports retry mechanism
•	Reduced server load
•	Suitable for large numbers of users

