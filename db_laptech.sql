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
    ram_id BIGINT NOT NULL,
    cpu_id BIGINT  NOT NULL,
    storage_id BIGINT NOT NULL,
    screen_size_id BIGINT NOT NULL,
    graphics_card_id BIGINT NOT NULL,
    operating_system_id BIGINT NOT NULL,
    category_id BIGINT NOT NULL,
    brand_id BIGINT NOT NULL
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
    id BIGINT IDENTITY(10000,1) NOT NULL,
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
    order_id BIGINT NOT NULL,
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

-- TẠO KHOÁ CHÍNH
ALTER TABLE Users
ADD CONSTRAINT PK_Users PRIMARY KEY (username);
GO

ALTER TABLE Verification
ADD CONSTRAINT PK_Verification PRIMARY KEY (id);
GO

ALTER TABLE Avartars
ADD CONSTRAINT PK_Avartars PRIMARY KEY (id);
GO

ALTER TABLE Categories
ADD CONSTRAINT PK_Categories PRIMARY KEY (id);
GO

ALTER TABLE Orders
ADD CONSTRAINT PK_Orders PRIMARY KEY (id);
GO

ALTER TABLE Order_Details
ADD CONSTRAINT PK_Order_Details PRIMARY KEY (id);
GO

ALTER TABLE Favorites
ADD CONSTRAINT PK_Favorites PRIMARY KEY (id);
GO

ALTER TABLE Operating_System
ADD CONSTRAINT PK_Operating_System PRIMARY KEY (id);
GO

ALTER TABLE Graphics_Card
ADD CONSTRAINT PK_Graphics_Card PRIMARY KEY (id);
GO

ALTER TABLE Screen_Size
ADD CONSTRAINT PK_Screen_Size PRIMARY KEY (id);
GO

ALTER TABLE Storage
ADD CONSTRAINT PK_Storage PRIMARY KEY (id);
GO

ALTER TABLE CPU
ADD CONSTRAINT PK_CPU PRIMARY KEY (id);
GO

ALTER TABLE RAM
ADD CONSTRAINT PK_RAM PRIMARY KEY (id);
GO

ALTER TABLE Brands
ADD CONSTRAINT PK_Brands PRIMARY KEY (id);
GO

ALTER TABLE Product_Images
ADD CONSTRAINT PK_Product_Images PRIMARY KEY (id);
GO

ALTER TABLE Products
ADD CONSTRAINT PK_Products PRIMARY KEY (id);
GO

ALTER TABLE Price
ADD CONSTRAINT PK_Price PRIMARY KEY (id);
GO

ALTER TABLE Discount_Price
ADD CONSTRAINT PK_Discount_Price PRIMARY KEY (discount_id,price_id);
GO

ALTER TABLE Discount
ADD CONSTRAINT PK_Discount PRIMARY KEY (id);
GO

ALTER TABLE Cart
ADD CONSTRAINT PK_Cart PRIMARY KEY (id);
GO

-- TẠO KHOÁ NGOẠI

-- PRODUCTS
ALTER TABLE Products
ADD CONSTRAINT FK_Products_RAM
FOREIGN KEY (ram_id) REFERENCES RAM(id);
GO

ALTER TABLE Products
ADD CONSTRAINT FK_Products_CPU
FOREIGN KEY (cpu_id) REFERENCES CPU(id);
GO

ALTER TABLE Products
ADD CONSTRAINT FK_Products_Storage
FOREIGN KEY (storage_id) REFERENCES Storage(id);
GO

ALTER TABLE Products
ADD CONSTRAINT FK_Products_Screen_Size
FOREIGN KEY (screen_size_id) REFERENCES Screen_Size(id);
GO

ALTER TABLE Products
ADD CONSTRAINT FK_Products_Graphics_Card
FOREIGN KEY (graphics_card_id) REFERENCES Graphics_Card(id);
GO

ALTER TABLE Products
ADD CONSTRAINT FK_Products_Operating_System
FOREIGN KEY (operating_system_id) REFERENCES Operating_System(id);
GO

ALTER TABLE Products
ADD CONSTRAINT FK_Products_Categories
FOREIGN KEY (category_id) REFERENCES Categories(id);
GO

ALTER TABLE Products
ADD CONSTRAINT FK_Products_Brands
FOREIGN KEY (brand_id) REFERENCES Brands(id);
GO


-- /PRODUCTS


ALTER TABLE Avartars
ADD CONSTRAINT FK_Avartars_Users
FOREIGN KEY (user_id) REFERENCES Users(username);
GO

ALTER TABLE Verification
ADD CONSTRAINT FK_Verification_Users
FOREIGN KEY (user_id) REFERENCES Users(username);
GO

ALTER TABLE Orders
ADD CONSTRAINT FK_Orders_Users
FOREIGN KEY (user_id) REFERENCES Users(username);
GO

ALTER TABLE Product_Images
ADD CONSTRAINT FK_Product_Images_Products
FOREIGN KEY (product_id) REFERENCES Products(id);
GO

ALTER TABLE Price
ADD CONSTRAINT FK_Price_Products
FOREIGN KEY (product_id) REFERENCES Products(id);
GO

-- Cart
ALTER TABLE Cart
ADD CONSTRAINT FK_Cart_Products
FOREIGN KEY (product_id) REFERENCES Products(id);
GO
-- /Cart

ALTER TABLE Cart
ADD CONSTRAINT FK_Cart_Users
FOREIGN KEY (user_id) REFERENCES Users(username);
GO

-- Favorites
ALTER TABLE Favorites
ADD CONSTRAINT FK_Favorites_Products
FOREIGN KEY (product_id) REFERENCES Products(id);
GO

ALTER TABLE Favorites
ADD CONSTRAINT FK_Favorites_Users
FOREIGN KEY (user_id) REFERENCES Users(username);
GO
-- /Favorites

-- Order_Details
ALTER TABLE Order_Details
ADD CONSTRAINT FK_OrderDetails_Products
FOREIGN KEY (product_id) REFERENCES Products(id);
GO

ALTER TABLE Order_Details
ADD CONSTRAINT FK_OrderDetails_Orders
FOREIGN KEY (order_id) REFERENCES Orders(id);
GO

-- /Order_Details

-- Discount_Price
ALTER TABLE Discount_Price
ADD CONSTRAINT FK_DiscountPrice_Price
FOREIGN KEY (price_id) REFERENCES Price(id);
GO

ALTER TABLE Discount_Price
ADD CONSTRAINT FK_DiscountPrice_Discount
FOREIGN KEY (discount_id) REFERENCES Discount(id);
GO

-- /Discount_Price
