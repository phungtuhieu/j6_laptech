CREATE DATABASE laptech
GO 

USE laptech
GO

CREATE TABLE Users (
    username NVARCHAR(50) NOT NULL,
    [password] NVARCHAR(50) NOT NULL,
    fullname NVARCHAR(50) NOT NULL,
    phone NVARCHAR(15),
    email NVARCHAR(100) NOT NULL,
    [address] NVARCHAR(200) NOT NULL,
    [admin] BIT NOT NULL,
    active BIT NOT NULL

) 
GO

CREATE TABLE Verification (
    id BIGINT IDENTITY(1,1) NOT NULL,
    user_id NVARCHAR(50) NOT NULL,
    code NVARCHAR(8) NOT NULL,
    create_at DATETIME NOT NULL,
    expiration_at DATETIME NOT NULL,
    [status] BIT NOT NULL
) 
GO

CREATE TABLE Avartars (
    user_id NVARCHAR(50) NOT NULL,
    [image] NVARCHAR(100) NOT NULL,
    is_selected BIT
)
GO

CREATE TABLE CPU(
    id BIGINT IDENTITY(1,1) NOT NULL,
    [name] NVARCHAR(100) NOT NULL,
    cores INT NOT NULL,
    threads INT NOT NULL,
    socket NVARCHAR(50) NOT NULL,
    clock_speed FLOAT NOT NULL,
    turbo_speed FLOAT NOT NULL,
    cache INT NOT NULL,
    manufacturer NVARCHAR(200) NOT NULL
)
GO

CREATE TABLE RAM(
    id BIGINT IDENTITY(1,1) NOT NULL,
    [name] NVARCHAR(100) NOT NULL,
    capacity INT NOT NULL,
    [type] NVARCHAR(10) NOT NULL,
    manufacturer NVARCHAR(200) NOT NULL
)
GO

CREATE TABLE Storage (
    id BIGINT IDENTITY(1,1) NOT NULL,
    [name] NVARCHAR(100) NOT NULL,
    capacity INT NOT NULL,
    [type] NVARCHAR(10) NOT NULL,
    manufacturer NVARCHAR(200) NOT NULL
)
GO
CREATE TABLE Screen_Size(
    id BIGINT IDENTITY(1,1) NOT NULL,
    size FLOAT NOT NULL
)
GO

CREATE TABLE Graphics_Card (
    id BIGINT IDENTITY(1,1) NOT NULL,
    [name] NVARCHAR(100) NOT NULL,
    cores INT NOT NULL,
    memory_size INT NOT NULL,
    base_clock INT NOT NULL,
    boost_clock INT NOT NULL,
    manufacturer NVARCHAR(200) NOT NULL
)
GO 

CREATE TABLE Operating_System(
    id BIGINT IDENTITY(1,1) NOT NULL,
    [name] NVARCHAR(100) NOT NULL
)
GO

CREATE TABLE Categories(
    id BIGINT IDENTITY(1,1) NOT NULL,
    [name] NVARCHAR(100) NOT NULL,
    [description] NVARCHAR(200) 
)
GO

CREATE TABLE Brands (
    id BIGINT IDENTITY(1,1) NOT NULL,
    [name] NVARCHAR(100) NOT NULL,
    logo  NVARCHAR(100) NOT NULL,
    email NVARCHAR(100) NOT NULL,
    phone NVARCHAR(15)  NOT NULL,
    website NVARCHAR(200) NOT NULL,
    country NVARCHAR(5) NOT NULL,
    [description] NVARCHAR(200) 
)
GO

CREATE TABLE Products (
    id BIGINT IDENTITY(1000,1) NOT NULL,
    [name] NVARCHAR(200) NOT NULL,
    create_date DATE NOT NULL,
    quantity INT NOT NULL,
    [description] NVARCHAR(MAX),
    [status] INT NOT NULL,
    ram_id INT NOT NULL,
    cpu_id INT  NOT NULL,
    storage_id INT NOT NULL,
    screen_size_id INT NOT NULL,
    graphics_card_id INT NOT NULL,
    operating_system_id INT NOT NULL,
    category_id INT NOT NULL,
    brand_id INT NOT NULL
)
GO

CREATE TABLE Product_Images (
    id BIGINT IDENTITY(1,1) NOT NULL,
    [name] NVARCHAR(100) NOT NULL,
    product_id BIGINT NOT NULL,
    isMain BIT NOT NULL
)
GO 

CREATE TABLE Price (
    id BIGINT IDENTITY(1,1) NOT NULL,
    price FLOAT NOT NULL,
    product_id BIGINT NOT NULL,
    [start_date] DATE NOT NULL,
    [end_date] DATE NOT NULL
)
GO 

CREATE TABLE Discount (
    id BIGINT IDENTITY(1,1) NOT NULL,
    title NVARCHAR(200) NOT NULL,
    [percentage] INT NOT NULL,
    [start_date] DATE NOT NULL,
    [end_date] DATE NOT NULL,
    active BIT NOT NULL,
    [description] NVARCHAR(200) 
)
GO 

CREATE TABLE Discount_Price (
    discount_id BIGINT NOT NULL,
    price_id BIGINT NOT NULL
)
GO 

CREATE TABLE Cart (
    id BIGINT IDENTITY(1,1) NOT NULL,
    user_id NVARCHAR(50) NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL
)
GO 

CREATE TABLE Orders (
    id NVARCHAR(10) NOT NULL,
    user_id NVARCHAR(50) NOT NULL,
    order_date DATETIME NOT NULL,
    completion_date DATETIME NOT NULL,
    delivery_date DATETIME NOT NULL,
    cancellation_date DATETIME NOT NULL,
    cancellation_reason NVARCHAR(200),
    payment_method NVARCHAR(200),
    [status] INT NOT NULL
)
GO 

CREATE TABLE Order_Details (
    id BIGINT IDENTITY(1,1) NOT NULL,
    order_id NVARCHAR(10) NOT NULL,
    product_id BIGINT NOT NULL,
    quantity INT NOT NULL
)
GO 

CREATE TABLE Favorites (
    id BIGINT IDENTITY(1,1) NOT NULL,
    user_id NVARCHAR(50) NOT NULL,
    product_id BIGINT NOT NULL,
    liked_date DATE NOT NULL
)
GO 

