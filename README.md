# Socket Server Test

Playing around with Socket.IO

To debug logs, add DEBUG level in environment variable.

Ex: `export DEBUG=*`

mySQL table schema:

```sql
CREATE TABLE `notes` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `note` varchar(50) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
```
