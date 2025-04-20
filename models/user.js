-- Azure SQL Table Script for Users
CREATE TABLE Users (
  id INT PRIMARY KEY IDENTITY(1,1),
  name NVARCHAR(100),
  email NVARCHAR(100) UNIQUE,
  password NVARCHAR(255)
);

-- Azure SQL Table Script for Vitals
CREATE TABLE Vitals (
  id INT PRIMARY KEY IDENTITY(1,1),
  user_id INT,
  bp NVARCHAR(20),
  sugar NVARCHAR(20),
  heart_rate NVARCHAR(20),
  temperature NVARCHAR(20),
  date DATETIME DEFAULT GETDATE(),
  FOREIGN KEY (user_id) REFERENCES Users(id)
);