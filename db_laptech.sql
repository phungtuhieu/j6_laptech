USE [master];
-- DROP DATABASE laptech

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
    active BIT NOT NULL,
    [image] NVARCHAR(200) NOT NULL
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
    id BIGINT IDENTITY(1,1) NOT NULL,
    user_id NVARCHAR(50) NOT NULL,
    [image] NVARCHAR(100) NOT NULL,
    selected BIT
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
    [type] NVARCHAR(10) NOT NULL,
    capacity INT NOT NULL,
    manufacturer NVARCHAR(200) NOT NULL
)
GO
CREATE TABLE Screen_Size(
    id BIGINT IDENTITY(1,1) NOT NULL,
    size FLOAT NOT NULL,
    resolution NVARCHAR(50) NOT NULL,
    panel_type NVARCHAR(50) NOT NULL,
    touch_screen BIT NOT NULL,
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
    main BIT NOT NULL
)
GO 

CREATE TABLE Price (
    id BIGINT IDENTITY(1,1) NOT NULL,
    price FLOAT NOT NULL,
    product_id BIGINT NOT NULL,
    [start_date] DATETIME NOT NULL,
    [end_date] DATETIME  
)
GO 

CREATE TABLE Discount (
    id NVARCHAR(20) NOT NULL,
    title NVARCHAR(200) NOT NULL,
    [percentage] INT NOT NULL,
    [start_date] DATETIME NOT NULL,
    [end_date] DATETIME NOT NULL,
    active BIT NOT NULL,
    [description] NVARCHAR(200) 
)
GO 

CREATE TABLE Discount_Price (
    discount_id NVARCHAR(20) NOT NULL,
    price_id BIGINT NOT NULL
)
GO 

CREATE TABLE Cart (
    id BIGINT IDENTITY(1,1) NOT NULL,
    user_id NVARCHAR(50) NOT NULL,
    product_id BIGINT NOT NULL,
	price FLOAT NOT NULL,
    quantity INT NOT NULL
)
GO 

CREATE TABLE Orders (
    id BIGINT IDENTITY(10000,1) NOT NULL,
    user_id NVARCHAR(50) NOT NULL,
    order_date DATETIME NOT NULL,
    completion_date DATETIME ,
    delivery_date DATETIME ,
    cancellation_date DATETIME ,
    cancellation_reason NVARCHAR(200),
    payment_method BIT NOT NULL,
    [status] INT NOT NULL
)
GO 

CREATE TABLE Order_Details (
    id BIGINT IDENTITY(1,1) NOT NULL,
    order_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
	price FLOAT NOT NULL,
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
FOREIGN KEY (ram_id) REFERENCES RAM(id) ON UPDATE CASCADE ON DELETE NO ACTION ;
GO

ALTER TABLE Products
ADD CONSTRAINT FK_Products_CPU
FOREIGN KEY (cpu_id) REFERENCES CPU(id) ON UPDATE CASCADE ON DELETE NO ACTION ;
GO

ALTER TABLE Products
ADD CONSTRAINT FK_Products_Storage
FOREIGN KEY (storage_id) REFERENCES Storage(id) ON UPDATE CASCADE ON DELETE NO ACTION ;
GO

ALTER TABLE Products
ADD CONSTRAINT FK_Products_Screen_Size
FOREIGN KEY (screen_size_id) REFERENCES Screen_Size(id) ON UPDATE CASCADE ON DELETE NO ACTION ;
GO

ALTER TABLE Products
ADD CONSTRAINT FK_Products_Graphics_Card
FOREIGN KEY (graphics_card_id) REFERENCES Graphics_Card(id) ON UPDATE CASCADE ON DELETE NO ACTION ;
GO

ALTER TABLE Products
ADD CONSTRAINT FK_Products_Operating_System
FOREIGN KEY (operating_system_id) REFERENCES Operating_System(id) ON UPDATE CASCADE ON DELETE NO ACTION ;
GO

ALTER TABLE Products
ADD CONSTRAINT FK_Products_Categories
FOREIGN KEY (category_id) REFERENCES Categories(id) ON UPDATE CASCADE ON DELETE NO ACTION ;
GO

ALTER TABLE Products
ADD CONSTRAINT FK_Products_Brands
FOREIGN KEY (brand_id) REFERENCES Brands(id) ON UPDATE CASCADE ON DELETE NO ACTION ;
GO


-- /PRODUCTS


ALTER TABLE Avartars
ADD CONSTRAINT FK_Avartars_Users
FOREIGN KEY (user_id) REFERENCES Users(username) ON UPDATE CASCADE ON DELETE NO ACTION ;
GO

ALTER TABLE Verification
ADD CONSTRAINT FK_Verification_Users
FOREIGN KEY (user_id) REFERENCES Users(username) ON UPDATE CASCADE ON DELETE NO ACTION ;
GO

ALTER TABLE Orders
ADD CONSTRAINT FK_Orders_Users
FOREIGN KEY (user_id) REFERENCES Users(username) ON UPDATE CASCADE ON DELETE NO ACTION ;
GO

ALTER TABLE Product_Images
ADD CONSTRAINT FK_Product_Images_Products
FOREIGN KEY (product_id) REFERENCES Products(id) ON UPDATE CASCADE ON DELETE NO ACTION ;
GO

ALTER TABLE Price
ADD CONSTRAINT FK_Price_Products
FOREIGN KEY (product_id) REFERENCES Products(id) ON UPDATE CASCADE ON DELETE NO ACTION ;
GO

-- Cart
ALTER TABLE Cart
ADD CONSTRAINT FK_Cart_Products
FOREIGN KEY (product_id) REFERENCES Products(id) ON UPDATE CASCADE ON DELETE NO ACTION ;
GO
-- /Cart

ALTER TABLE Cart
ADD CONSTRAINT FK_Cart_Users
FOREIGN KEY (user_id) REFERENCES Users(username) ON UPDATE CASCADE ON DELETE NO ACTION ;
GO

-- Favorites
ALTER TABLE Favorites
ADD CONSTRAINT FK_Favorites_Products
FOREIGN KEY (product_id) REFERENCES Products(id) ON UPDATE CASCADE ON DELETE NO ACTION ;
GO

ALTER TABLE Favorites
ADD CONSTRAINT FK_Favorites_Users
FOREIGN KEY (user_id) REFERENCES Users(username) ON UPDATE CASCADE ON DELETE NO ACTION ;
GO
-- /Favorites

-- Order_Details
ALTER TABLE Order_Details
ADD CONSTRAINT FK_OrderDetails_Products
FOREIGN KEY (product_id) REFERENCES Products(id) ON UPDATE CASCADE ON DELETE NO ACTION ;
GO

ALTER TABLE Order_Details
ADD CONSTRAINT FK_OrderDetails_Orders
FOREIGN KEY (order_id) REFERENCES Orders(id) ON UPDATE CASCADE ON DELETE NO ACTION ;
GO

-- /Order_Details

-- Discount_Price
ALTER TABLE Discount_Price
ADD CONSTRAINT FK_DiscountPrice_Price
FOREIGN KEY (price_id) REFERENCES Price(id) ON UPDATE CASCADE ON DELETE NO ACTION ;
GO

ALTER TABLE Discount_Price
ADD CONSTRAINT FK_DiscountPrice_Discount
FOREIGN KEY (discount_id) REFERENCES Discount(id) ON UPDATE CASCADE ON DELETE NO ACTION ;
GO
-- /Discount_Price

-- TẠO DỮ LIỆU MẪU

SELECT * FROM Users
SELECT * FROM Verification;
SELECT * FROM Avartars;
SELECT * FROM CPU;
SELECT * FROM RAM;
SELECT * FROM Storage;
SELECT * FROM Screen_Size;
SELECT * FROM Graphics_Card;
SELECT * FROM Operating_System;
SELECT * FROM Categories;
SELECT * FROM Brands;
SELECT * FROM Products;
SELECT * FROM Product_Images;
SELECT * FROM Price;
SELECT * FROM Discount;
SELECT * FROM Discount_Price;
SELECT * FROM Cart;
SELECT * FROM Orders;
SELECT * FROM Order_Details;
SELECT * FROM Favorites;




INSERT INTO Users (username, [password], fullname, phone, email, [address], [admin],active, [image])
VALUES
    ('ngocanh01', '123456', N'Ngọc Anh', '0909123456', 'ngocanh01@example.com', N'Hồ Chí Minh', 0, 1,"avt.png"),
    ('thanhnam87', '654321', N'Thanh Nam', '0918234567', 'nam87@example.com', N'Hà Nội', 1, 1,"avt.png"),
    ('minhchau02', 'abc123', N'Minh Châu', '0987123456', 'chau02@example.com', N'Đà Nẵng', 0, 1,"avt.png"),
    ('trungkien11', 'def456', N'Trung Kiên', '0967123456', 'kien11@example.com', N'Bình Dương', 0, 1,"avt.png"),
    ('thuytrang9x', 'ghj789', N'Thúy Trang', '0978123456', 'trang9x@example.com', N'Hải Phòng', 0, 1,"avt.png"),
    
    ('tuhieu', '12345678', N'Phùng Tự Hiếu', '0978123456', 'tuhieu@example.com', N'Hải Phòng', 1, 1,"avt.png"),
    ('minhkhoi', '12345678', N'Nguyễn Minh Khôi', '0978123456', 'minhkhoi@example.com', N'Hải Phòng', 1, 1,"7d817a18.jpg"),
    ('huutai', '12345678', N'Nguyễn Văn Hữu Tài', '0978123456', 'huutai@example.com', N'Hải Phòng', 1, 1,"avt.png");

GO

-- DELETE Verification
-- DBCC CHECKIDENT ('Verification', RESEED, 0);

INSERT INTO Verification (user_id, code, create_at, expiration_at, [status])
VALUES
    ('ngocanh01', 'ABCD1234', '2023-07-15 08:00:00', '2023-07-20 08:00:00', 1),
    ('thanhnam87', 'EFGH5678', '2023-07-16 09:00:00', '2023-07-21 09:00:00', 1),
    ('minhchau02', 'IJKL9012', '2023-07-17 10:00:00', '2023-07-22 10:00:00', 1),
    ('trungkien11', 'MNOP3456', '2023-07-18 11:00:00', '2023-07-23 11:00:00', 1),
    ('thuytrang9x', 'QRST7890', '2023-07-19 12:00:00', '2023-07-24 12:00:00', 1)
GO



-- DELETE Avartars
-- DBCC CHECKIDENT ('Avartars', RESEED, 0);
INSERT INTO Avartars (user_id, [image], selected)
VALUES
    ('ngocanh01', 'https://example.com/avatars/ngocanh01.jpg', 1),
    ('thanhnam87', 'https://example.com/avatars/thanhnam87.jpg', 1),
    ('minhchau02', 'https://example.com/avatars/minhchau02.jpg', 1),
    ('trungkien11', 'https://example.com/avatars/trungkien11.jpg', 1),
    ('thuytrang9x', 'https://example.com/avatars/thuytrang9x.jpg', 1);

GO




-- DELETE CPU
-- DBCC CHECKIDENT ('CPU', RESEED, 0);
INSERT INTO CPU ([name], cores, threads, socket, clock_speed, turbo_speed, cache, manufacturer)
VALUES
    (N'Intel Core i5 10th Gen', 4, 8, N'LGA 1200', 2.9, 4.1, 8, N'Intel'),
    (N'AMD Ryzen 7 5000', 8, 16, N'Socket AM4', 3.6, 4.4, 16, N'AMD'),
    (N'Intel Core i7 11th Gen', 6, 12, N'LGA 1200', 3.1, 4.8, 12, N'Intel'),
    (N'AMD Ryzen 5 4000', 6, 12, N'Socket AM4', 2.9, 4.2, 8, N'AMD'),
    (N'Intel Core i9 12th Gen', 8, 16, N'LGA 1700', 3.2, 5.0, 24, N'Intel');

GO



-- DELETE RAM
-- DBCC CHECKIDENT ('RAM', RESEED, 0);
INSERT INTO RAM ([name], capacity, [type], manufacturer)
VALUES
    (N'Kingston DDR4 8GB', 8, N'DDR4', N'Kingston'),
    (N'Crucial DDR4 16GB', 16, N'DDR4', N'Crucial'),
    (N'Corsair DDR4 32GB', 32, N'DDR4', N'Corsair'),
    (N'G.Skill DDR4 16GB', 16, N'DDR4', N'G.Skill'),
    (N'ADATA DDR4 8GB', 8, N'DDR4', N'ADATA');

GO


-- DELETE Storage
-- DBCC CHECKIDENT ('Storage', RESEED, 0);
INSERT INTO Storage ([type], capacity, manufacturer)
VALUES
    (N'SSD', 256, N'Samsung'),
    (N'HDD', 1000, N'Western Digital'),
    (N'SSD', 512, N'Crucial'),
    (N'HDD', 2000, N'Seagate'),
    (N'SSD', 128, N'Kingston');

GO

-- DELETE Screen_Size
-- DBCC CHECKIDENT ('Screen_Size', RESEED, 0);
INSERT INTO Screen_Size (size,resolution,panel_type,touch_screen) 
VALUES
    (13.3,'1928x1080','IPS',0),
    (14,'2560x1440','IPS',0),
    (15.6,'1920x1080','OLED',0),
    (17.3,'3840x2160','IPS',1),
    (13,'1920x1080','TN',0);

GO

-- DELETE Graphics_Card
-- DBCC CHECKIDENT ('Graphics_Card', RESEED, 0);
INSERT INTO Graphics_Card ([name], cores, memory_size, base_clock, boost_clock, manufacturer)
VALUES
    (N'NVIDIA GeForce GTX 1650', 896, 4, 1485, 1665, N'NVIDIA'),
    (N'AMD Radeon RX 6700 XT', 2560, 12, 2321, 2581, N'AMD'),
    (N'NVIDIA GeForce RTX 3060', 3584, 6, 1320, 1777, N'NVIDIA'),
    (N'AMD Radeon RX 5500 XT', 1408, 8, 1670, 1845, N'AMD'),
    (N'NVIDIA GeForce RTX 3080', 8704, 10, 1440, 1710, N'NVIDIA');

GO

-- DELETE Operating_System
-- DBCC CHECKIDENT ('Operating_System', RESEED, 0);
INSERT INTO Operating_System ([name])
VALUES
    (N'Windows 10 Home'),
    (N'Windows 11 Pro'),
    (N'Ubuntu 20.04 LTS'),
    (N'MacOS Big Sur'),
    (N'ChromeOS');

GO


-- DELETE Categories
-- DBCC CHECKIDENT ('Categories', RESEED, 0);
INSERT INTO Categories ([name], [description])
VALUES
    (N'Laptop Gaming', N'Điện thoại di động dành cho game thủ'),
    (N'Ultrabook', N'Laptop mỏng nhẹ, di động cao'),
    (N'Laptop Workstation', N'Laptop chuyên dụng cho đồ họa, kỹ thuật số'),
    (N'Chromebook', N'Laptop chạy ChromeOS'),
    (N'Laptop Doanh Nhân', N'Laptop dành cho doanh nhân');

GO



INSERT INTO Brands ([name], logo, email, phone, website, country, [description])
VALUES
    (N'Dell',       N'https://laptopxachtayshop.com/uploads/2022/04/dell.png',       N'support@dell.com',    '1800 1999', N'https://www.dell.com', N'USA', N'Hãng sản xuất laptop nổi tiếng'),
    (N'Asus',       N'https://laptopxachtayshop.com/uploads/2022/04/asus.png',       N'info@asus.com',       '1900 2999', N'https://www.asus.com', N'TW', N'Hãng sản xuất laptop và linh kiện điện tử'),
    (N'Lenovo',     N'https://laptopxachtayshop.com/uploads/2022/04/lenovo.png',     N'contact@lenovo.com',  '1700 3999', N'https://www.lenovo.com', N'CN', N'Hãng sản xuất laptop và thiết bị điện tử'),
    (N'Acer',       N'https://laptopxachtayshop.com/uploads/2022/04/acer.png',       N'support@acer.com',    '1600 4999', N'https://www.acer.com', N'TW', N'Hãng sản xuất laptop, máy tính, và smartphone'),
    (N'HP',         N'https://laptopxachtayshop.com/uploads/2022/04/hp.png',         N'info@hp.com',         '1500 5999', N'https://www.hp.com', N'USA', N'Hãng sản xuất laptop và máy in'),
    (N'Thinkpad',   N'https://laptopxachtayshop.com/uploads/2022/04/thinkpad.png',         N'info@hp.com',         '1500 5999', N'https://www.Thinkpad.com', N'USA', N'Hãng sản xuất laptop và máy in'),
    (N'MSI',        N'https://laptopxachtayshop.com/uploads/2022/04/msi.png',         N'info@hp.com',         '1500 5999', N'https://www.MSI.com', N'USA', N'Hãng sản xuất laptop và máy in'),
    (N'Gigabyte',   N'https://laptopxachtayshop.com/uploads/2022/11/GIGABYTE.png',         N'info@hp.com',         '1500 5999', N'https://www.Gigabyte.com', N'USA', N'Hãng sản xuất laptop và máy in'),
    (N'Apple',      N'https://laptopxachtayshop.com/uploads/2022/04/apple.png',         N'info@hp.com',         '1500 5999', N'https://www.Apple.com', N'USA', N'Hãng sản xuất laptop và máy in');
GO

-- DELETE Products
-- DBCC CHECKIDENT ('Products', RESEED, 999);
INSERT INTO Products ([name], create_date, quantity, [description], [status], ram_id, cpu_id, storage_id, screen_size_id, graphics_card_id, operating_system_id, category_id, brand_id)
VALUES
        -- dell 1
    (N'Laptop Dell Vostro 16 5630',         '2023-07-10', 100, N'Laptop Gaming mạnh mẽ với CPU Intel Core i7 11th Gen và GPU NVIDIA GeForce RTX 3060', 1, 2, 3, 1, 3, 3, 1, 1, 1),
    (N'Laptop Dell Inspiron 14 5430',       '2023-07-10', 100, N'Laptop Gaming mạnh mẽ với CPU Intel Core i7 11th Gen và GPU NVIDIA GeForce RTX 3060', 1, 2, 3, 1, 3, 3, 1, 1, 1),
    (N'Laptop Dell Inspiron 14 7430',       '2023-07-10', 100, N'Laptop Gaming mạnh mẽ với CPU Intel Core i7 11th Gen và GPU NVIDIA GeForce RTX 3060', 1, 2, 3, 1, 3, 3, 1, 1, 1),
    (N'Laptop Dell Vostro 14 3430 - 60YGM', '2023-07-10', 100, N'Laptop Gaming mạnh mẽ với CPU Intel Core i7 11th Gen và GPU NVIDIA GeForce RTX 3060', 1, 2, 3, 1, 3, 3, 1, 1, 1),
    (N'Laptop Dell Vostro 3510',            '2023-07-10', 100, N'Laptop Gaming mạnh mẽ với CPU Intel Core i7 11th Gen và GPU NVIDIA GeForce RTX 3060', 1, 2, 3, 1, 3, 3, 1, 1, 1),
        -- asus 2
    (N'Laptop ASUS ROG Flow X16 GV601VV-NL016W',           '2023-07-11', 80, N'Laptop Ultrabook cao cấp với CPU Intel Core i5 10th Gen và RAM 16GB', 1, 3, 1, 2, 4, 1, 2, 1, 2),
    (N'Laptop ASUS TUF Gaming F15 FX507ZC4-HN074W',        '2023-07-11', 80, N'Laptop Ultrabook cao cấp với CPU Intel Core i5 10th Gen và RAM 16GB', 1, 3, 1, 2, 4, 1, 2, 1, 2),
    (N'Laptop ASUS Vivobook 14X OLED A1403ZA-KM066W',      '2023-07-11', 80, N'Laptop Ultrabook cao cấp với CPU Intel Core i5 10th Gen và RAM 16GB', 1, 3, 1, 2, 4, 1, 2, 1, 2),
    (N'Laptop ASUS Zenbook 14 OLED UX3402VA-KM068W',       '2023-07-11', 80, N'Laptop Ultrabook cao cấp với CPU Intel Core i5 10th Gen và RAM 16GB', 1, 3, 1, 2, 4, 1, 2, 1, 2),
    (N'Laptop ASUS Zenbook UX5304VA-NQ125W',               '2023-07-11', 80, N'Laptop Ultrabook cao cấp với CPU Intel Core i5 10th Gen và RAM 16GB', 1, 3, 1, 2, 4, 1, 2, 1, 2),
	    -- lenovo 3
    (N'Laptop Lenovo IdeaPad 5 14IAH8 - 83BF002NVN',         '2023-07-12', 50, N'Laptop Workstation chuyên dụng cho đồ họa và kỹ thuật số', 1, 1, 5, 1, 2, 4, 3, 3, 3),
    (N'Laptop Lenovo IdeaPad Gaming 3 15IHU6-82K101HGVN',    '2023-07-12', 50, N'Laptop Workstation chuyên dụng cho đồ họa và kỹ thuật số', 1, 1, 5, 1, 2, 4, 3, 3, 3),
    (N'Laptop Lenovo Ideapad Slim 5 Light',                  '2023-07-12', 50, N'Laptop Workstation chuyên dụng cho đồ họa và kỹ thuật số', 1, 1, 5, 1, 2, 4, 3, 3, 3),
    (N'Laptop Lenovo Legion 5 15IAH7-82RC0036VN',            '2023-07-12', 50, N'Laptop Workstation chuyên dụng cho đồ họa và kỹ thuật số', 1, 1, 5, 1, 2, 4, 3, 3, 3),
    (N'Laptop Lenovo LOQ 15IRH8 - 82XV000PVN',               '2023-07-12', 50, N'Laptop Workstation chuyên dụng cho đồ họa và kỹ thuật số', 1, 1, 5, 1, 2, 4, 3, 3, 3),
            
        -- acer 4

    (N'Laptop ACER Nitro 16 Phoenix AN16-41-R5M4',      '2023-07-13', 30, N'Laptop Chromebook giá rẻ với màn hình 14 inch', 1, 5, 4, 3, 5, 2, 5, 4, 4),
    (N'Laptop ACER Nitro 17 Phoenix AN17-51-50B9',      '2023-07-13', 30, N'Laptop Chromebook giá rẻ với màn hình 14 inch', 1, 5, 4, 3, 5, 2, 5, 4, 4),
    (N'Laptop ACER Predator Helios 300 PH315-55-751D',  '2023-07-13', 30, N'Laptop Chromebook giá rẻ với màn hình 14 inch', 1, 5, 4, 3, 5, 2, 5, 4, 4),
    (N'Laptop ACER Aspire 7 A715 42G R05G',             '2023-07-13', 30, N'Laptop Chromebook giá rẻ với màn hình 14 inch', 1, 5, 4, 3, 5, 2, 5, 4, 4),
    (N'Laptop Acer Predator Helios Neo PHN16 71 54CD',  '2023-07-13', 30, N'Laptop Chromebook giá rẻ với màn hình 14 inch', 1, 5, 4, 3, 5, 2, 5, 4, 4),
       
        -- hp 5
    (N'Laptop HP 15s-fq5161TU',         '2023-07-14', 20, N'Laptop chất lượng cao dành cho doanh nhân với CPU Intel Core i9 12th Gen', 1, 4, 2, 4, 1, 5, 4, 5, 5),
    (N'Laptop HP Pavilion 15-eg2081TU', '2023-07-14', 20, N'Laptop chất lượng cao dành cho doanh nhân với CPU Intel Core i9 12th Gen', 1, 4, 2, 4, 1, 5, 4, 5, 5),
    (N'Laptop HP Pavilion 15-eg3093TU', '2023-07-14', 20, N'Laptop chất lượng cao dành cho doanh nhân với CPU Intel Core i9 12th Gen', 1, 4, 2, 4, 1, 5, 4, 5, 5),
    (N'Laptop HP Pavilion X360',        '2023-07-14', 20, N'Laptop chất lượng cao dành cho doanh nhân với CPU Intel Core i9 12th Gen', 1, 4, 2, 4, 1, 5, 4, 5, 5),
    (N'Laptop HP Victus 16-d1185TX',    '2023-07-14', 20, N'Laptop chất lượng cao dành cho doanh nhân với CPU Intel Core i9 12th Gen', 1, 4, 2, 4, 1, 5, 4, 5, 5),
       
        -- thinkpad 6
    (N'Laptop Lenovo ThinkPad X1 Carbon Gen 10',    '2023-07-14', 20, N'Laptop chất lượng cao dành cho doanh nhân với CPU Intel Core i9 12th Gen', 1, 4, 2, 4, 1, 5, 4, 5, 6),
    (N'Laptop Lenovo ThinkBook 14 G3 ACL R3',       '2023-07-14', 20, N'Laptop chất lượng cao dành cho doanh nhân với CPU Intel Core i9 12th Gen', 1, 4, 2, 4, 1, 5, 4, 5, 6),
        
        -- msi 7
    (N'Laptop MSI Alpha 15 B5EEK-205VN',        '2023-07-14', 20, N'Laptop chất lượng cao dành cho doanh nhân với CPU Intel Core i9 12th Gen', 1, 4, 2, 4, 1, 5, 4, 5, 7),
    (N'Laptop MSI GF63 Thin 11UC-1230VN',       '2023-07-14', 20, N'Laptop chất lượng cao dành cho doanh nhân với CPU Intel Core i9 12th Gen', 1, 4, 2, 4, 1, 5, 4, 5, 7),
    (N'Laptop MSI GF63 Thin 12VE-460VN',        '2023-07-14', 20, N'Laptop chất lượng cao dành cho doanh nhân với CPU Intel Core i9 12th Gen', 1, 4, 2, 4, 1, 5, 4, 5, 7),
    (N'Laptop MSI Katana GF66 12UDK-814VN',     '2023-07-14', 20, N'Laptop chất lượng cao dành cho doanh nhân với CPU Intel Core i9 12th Gen', 1, 4, 2, 4, 1, 5, 4, 5, 7),
    (N'Laptop MSI Modern 14 C13M-607VN',        '2023-07-14', 20, N'Laptop chất lượng cao dành cho doanh nhân với CPU Intel Core i9 12th Gen', 1, 4, 2, 4, 1, 5, 4, 5, 7),
       
        -- gigabyte 8
    (N'Laptop GIGABYTE AERO 16 XE5-73VN938AH',    '2023-07-14', 20, N'Laptop chất lượng cao dành cho doanh nhân với CPU Intel Core i9 12th Gen', 1, 4, 2, 4, 1, 5, 4, 5, 8),
    (N'Laptop GIGABYTE Aorus 17 XE5-73VN534GH',    '2023-07-14', 20, N'Laptop chất lượng cao dành cho doanh nhân với CPU Intel Core i9 12th Gen', 1, 4, 2, 4, 1, 5, 4, 5, 8),
    (N'Laptop GIGABYTE G5 GE-51VN263SH',    '2023-07-14', 20, N'Laptop chất lượng cao dành cho doanh nhân với CPU Intel Core i9 12th Gen', 1, 4, 2, 4, 1, 5, 4, 5, 8),
    (N'Laptop GIGABYTE G5 KD-52VN123SO',    '2023-07-14', 20, N'Laptop chất lượng cao dành cho doanh nhân với CPU Intel Core i9 12th Gen', 1, 4, 2, 4, 1, 5, 4, 5, 8),
    (N'Laptop GIGABYTE G5 MF-F2VN333SH',    '2023-07-14', 20, N'Laptop chất lượng cao dành cho doanh nhân với CPU Intel Core i9 12th Gen', 1, 4, 2, 4, 1, 5, 4, 5, 8),
        
        -- apple 9
    (N'Laptop APPLE MacBook Air 2023',    '2023-07-14', 20, N'Laptop chất lượng cao dành cho doanh nhân với CPU Intel Core i9 12th Gen', 1, 4, 2, 4, 1, 5, 4, 5, 9),
    (N'Laptop APPLE MacBook Pro 13',    '2023-07-14', 20, N'Laptop chất lượng cao dành cho doanh nhân với CPU Intel Core i9 12th Gen', 1, 4, 2, 4, 1, 5, 4, 5, 9),
    (N'Laptop APPLE MacBook Pro 14 2023',    '2023-07-14', 20, N'Laptop chất lượng cao dành cho doanh nhân với CPU Intel Core i9 12th Gen', 1, 4, 2, 4, 1, 5, 4, 5, 9),
    (N'MacBook Air 2022 13.6 inch Z15X0003L',    '2023-07-14', 20, N'Laptop chất lượng cao dành cho doanh nhân với CPU Intel Core i9 12th Gen', 1, 4, 2, 4, 1, 5, 4, 5, 9);
        
GO

-- DELETE Product_Images
-- DBCC CHECKIDENT ('Product_Images', RESEED, 0);
INSERT INTO Product_Images ([name], product_id, main)
VALUES
    -- dell
    (N'Laptop Dell Vostro 16 5630 anh1.webp', 1000, 1),
    (N'Laptop Dell Vostro 16 5630 anh2.webp', 1000, 0),
    (N'Laptop Dell Vostro 16 5630 anh3.webp', 1000, 0),
    (N'Laptop Dell Vostro 16 5630 anh4.webp', 1000, 0),
    (N'Laptop Dell Vostro 16 5630 anh5.webp', 1000, 0),

    (N'Laptop Dell Inspiron 14 5430 anh1.webp', 1001, 1),
    (N'Laptop Dell Inspiron 14 5430 anh2.webp', 1001, 0),
    (N'Laptop Dell Inspiron 14 5430 anh3.webp', 1001, 0),
    (N'Laptop Dell Inspiron 14 5430 anh4.webp', 1001, 0),
    (N'Laptop Dell Inspiron 14 5430 anh5.webp', 1001, 0),

    (N'Laptop Dell Inspiron 14 7430 anh1.webp', 1002, 1),
    (N'Laptop Dell Inspiron 14 7430 anh2.webp', 1002, 0),
    (N'Laptop Dell Inspiron 14 7430 anh3.webp', 1002, 0),
    (N'Laptop Dell Inspiron 14 7430 anh4.webp', 1002, 0),
    (N'Laptop Dell Inspiron 14 7430 anh5.webp', 1002, 0),

    (N'Laptop Dell Vostro 14 3430 - 60YGM anh1.webp', 1003, 1),
    (N'Laptop Dell Vostro 14 3430 - 60YGM anh2.webp', 1003, 0),
    (N'Laptop Dell Vostro 14 3430 - 60YGM anh3.webp', 1003, 0),
    (N'Laptop Dell Vostro 14 3430 - 60YGM anh4.webp', 1003, 0),
    (N'Laptop Dell Vostro 14 3430 - 60YGM anh5.webp', 1003, 0),

    (N'Laptop Dell Vostro 3510 anh1.webp', 1004, 1),
    (N'Laptop Dell Vostro 3510 anh2.webp', 1004, 0),
    (N'Laptop Dell Vostro 3510 anh3.webp', 1004, 0),
    (N'Laptop Dell Vostro 3510 anh4.webp', 1004, 0),
    (N'Laptop Dell Vostro 3510 anh5.webp', 1004, 0),

    -- asus 2
    (N'Laptop ASUS ROG Flow X16 GV601VV-NL016W anh1.webp', 1005, 1),
    (N'Laptop ASUS ROG Flow X16 GV601VV-NL016W anh2.webp', 1005, 0),
    (N'Laptop ASUS ROG Flow X16 GV601VV-NL016W anh3.webp', 1005, 0),
    (N'Laptop ASUS ROG Flow X16 GV601VV-NL016W anh4.webp', 1005, 0),
    (N'Laptop ASUS ROG Flow X16 GV601VV-NL016W anh5.webp', 1005, 0),

    (N'Laptop ASUS TUF Gaming F15 FX507ZC4-HN074W anh1.webp', 1006, 1),
    (N'Laptop ASUS TUF Gaming F15 FX507ZC4-HN074W anh2.webp', 1006, 0),
    (N'Laptop ASUS TUF Gaming F15 FX507ZC4-HN074W anh3.webp', 1006, 0),
    (N'Laptop ASUS TUF Gaming F15 FX507ZC4-HN074W anh4.webp', 1006, 0),
    (N'Laptop ASUS TUF Gaming F15 FX507ZC4-HN074W anh5.webp', 1006, 0),

    (N'Laptop ASUS Vivobook 14X OLED A1403ZA-KM066W anh1.webp', 1007, 1),
    (N'Laptop ASUS Vivobook 14X OLED A1403ZA-KM066W anh2.webp', 1007, 0),
    (N'Laptop ASUS Vivobook 14X OLED A1403ZA-KM066W anh3.webp', 1007, 0),
    (N'Laptop ASUS Vivobook 14X OLED A1403ZA-KM066W anh4.webp', 1007, 0),
    (N'Laptop ASUS Vivobook 14X OLED A1403ZA-KM066W anh5.webp', 1007, 0),

    (N'Laptop ASUS Zenbook 14 OLED UX3402VA-KM068W anh1.webp', 1008, 1),
    (N'Laptop ASUS Zenbook 14 OLED UX3402VA-KM068W anh2.webp', 1008, 0),
    (N'Laptop ASUS Zenbook 14 OLED UX3402VA-KM068W anh3.webp', 1008, 0),
    (N'Laptop ASUS Zenbook 14 OLED UX3402VA-KM068W anh4.webp', 1008, 0),
    (N'Laptop ASUS Zenbook 14 OLED UX3402VA-KM068W anh5.webp', 1008, 0),

    (N'Laptop ASUS Zenbook UX5304VA-NQ125W anh1.webp', 1009, 1),
    (N'Laptop ASUS Zenbook UX5304VA-NQ125W anh2.webp', 1009, 0),
    (N'Laptop ASUS Zenbook UX5304VA-NQ125W anh3.webp', 1009, 0),
    (N'Laptop ASUS Zenbook UX5304VA-NQ125W anh4.webp', 1009, 0),
    (N'Laptop ASUS Zenbook UX5304VA-NQ125W anh5.webp', 1009, 0),
    
    -- lenovo 3
    (N'Laptop Lenovo IdeaPad 5 14IAH8 - 83BF002NVN anh1.webp', 1010, 1),
    (N'Laptop Lenovo IdeaPad 5 14IAH8 - 83BF002NVN anh2.webp', 1010, 0),
    (N'Laptop Lenovo IdeaPad 5 14IAH8 - 83BF002NVN anh3.webp', 1010, 0),
    (N'Laptop Lenovo IdeaPad 5 14IAH8 - 83BF002NVN anh4.webp', 1010, 0),
    (N'Laptop Lenovo IdeaPad 5 14IAH8 - 83BF002NVN anh5.webp', 1010, 0),

    (N'Laptop Lenovo IdeaPad Gaming 3 15IHU6-82K101HGVN anh1.webp', 1011, 1),
    (N'Laptop Lenovo IdeaPad Gaming 3 15IHU6-82K101HGVN anh2.webp', 1011, 0),
    (N'Laptop Lenovo IdeaPad Gaming 3 15IHU6-82K101HGVN anh3.webp', 1011, 0),
    (N'Laptop Lenovo IdeaPad Gaming 3 15IHU6-82K101HGVN anh4.webp', 1011, 0),
    (N'Laptop Lenovo IdeaPad Gaming 3 15IHU6-82K101HGVN anh5.webp', 1011, 0),

    (N'Laptop Lenovo Ideapad Slim 5 Light anh1.webp', 1012, 1),
    (N'Laptop Lenovo Ideapad Slim 5 Light anh2.webp', 1012, 0),
    (N'Laptop Lenovo Ideapad Slim 5 Light anh3.webp', 1012, 0),
    (N'Laptop Lenovo Ideapad Slim 5 Light anh4.webp', 1012, 0),
    (N'Laptop Lenovo Ideapad Slim 5 Light anh5.webp', 1012, 0),

    (N'Laptop Lenovo Legion 5 15IAH7-82RC0036VN anh1.webp', 1013, 1),
    (N'Laptop Lenovo Legion 5 15IAH7-82RC0036VN anh2.webp', 1013, 0),
    (N'Laptop Lenovo Legion 5 15IAH7-82RC0036VN anh3.webp', 1013, 0),
    (N'Laptop Lenovo Legion 5 15IAH7-82RC0036VN anh4.webp', 1013, 0),
    (N'Laptop Lenovo Legion 5 15IAH7-82RC0036VN anh5.webp', 1013, 0),

    (N'Laptop Lenovo LOQ 15IRH8 - 82XV000PVN anh1.webp', 1014, 1),
    (N'Laptop Lenovo LOQ 15IRH8 - 82XV000PVN anh2.webp', 1014, 0),
    (N'Laptop Lenovo LOQ 15IRH8 - 82XV000PVN anh3.webp', 1014, 0),
    (N'Laptop Lenovo LOQ 15IRH8 - 82XV000PVN anh4.webp', 1014, 0),
    (N'Laptop Lenovo LOQ 15IRH8 - 82XV000PVN anh5.webp', 1014, 0),

    -- acer 4
    (N'Laptop ACER Nitro 16 Phoenix AN16-41-R5M4 anh1.webp', 1015, 1),
    (N'Laptop ACER Nitro 16 Phoenix AN16-41-R5M4 anh2.webp', 1015, 0),
    (N'Laptop ACER Nitro 16 Phoenix AN16-41-R5M4 anh3.webp', 1015, 0),
    (N'Laptop ACER Nitro 16 Phoenix AN16-41-R5M4 anh4.webp', 1015, 0),
    (N'Laptop ACER Nitro 16 Phoenix AN16-41-R5M4 anh5.webp', 1015, 0),

    (N'Laptop ACER Nitro 17 Phoenix AN17-51-50B9 anh1.webp', 1016, 1),
    (N'Laptop ACER Nitro 17 Phoenix AN17-51-50B9 anh2.webp', 1016, 0),
    (N'Laptop ACER Nitro 17 Phoenix AN17-51-50B9 anh3.webp', 1016, 0),
    (N'Laptop ACER Nitro 17 Phoenix AN17-51-50B9 anh4.webp', 1016, 0),
    (N'Laptop ACER Nitro 17 Phoenix AN17-51-50B9 anh5.webp', 1016, 0),

    (N'Laptop ACER Predator Helios 300 PH315-55-751D anh1.webp', 1017, 1),
    (N'Laptop ACER Predator Helios 300 PH315-55-751D anh2.webp', 1017, 0),
    (N'Laptop ACER Predator Helios 300 PH315-55-751D anh3.webp', 1017, 0),
    (N'Laptop ACER Predator Helios 300 PH315-55-751D anh4.webp', 1017, 0),
    (N'Laptop ACER Predator Helios 300 PH315-55-751D anh5.webp', 1017, 0),

    (N'Laptop ACER Aspire 7 A715 42G R05G anh1.webp', 1018, 1),
    (N'Laptop ACER Aspire 7 A715 42G R05G anh2.webp', 1018, 0),
    (N'Laptop ACER Aspire 7 A715 42G R05G anh3.webp', 1018, 0),
    (N'Laptop ACER Aspire 7 A715 42G R05G anh4.webp', 1018, 0),
    (N'Laptop ACER Aspire 7 A715 42G R05G anh5.webp', 1018, 0),

    (N'Laptop Acer Predator Helios Neo PHN16 71 54CD anh1.webp', 1019, 1),
    (N'Laptop Acer Predator Helios Neo PHN16 71 54CD anh2.webp', 1019, 0),
    (N'Laptop Acer Predator Helios Neo PHN16 71 54CD anh3.webp', 1019, 0),
    (N'Laptop Acer Predator Helios Neo PHN16 71 54CD anh4.webp', 1019, 0),
    (N'Laptop Acer Predator Helios Neo PHN16 71 54CD anh5.webp', 1019, 0),

    -- hp 5
    (N'Laptop HP 15s-fq5161TU anh1.webp', 1020, 1),
    (N'Laptop HP 15s-fq5161TU anh2.webp', 1020, 0),
    (N'Laptop HP 15s-fq5161TU anh3.webp', 1020, 0),
    (N'Laptop HP 15s-fq5161TU anh4.webp', 1020, 0),
    (N'Laptop HP 15s-fq5161TU anh5.webp', 1020, 0),

    (N'Laptop HP Pavilion 15-eg2081TU anh1.webp', 1021, 1),
    (N'Laptop HP Pavilion 15-eg2081TU anh2.webp', 1021, 0),
    (N'Laptop HP Pavilion 15-eg2081TU anh3.webp', 1021, 0),
    (N'Laptop HP Pavilion 15-eg2081TU anh4.webp', 1021, 0),
    (N'Laptop HP Pavilion 15-eg2081TU anh5.webp', 1021, 0),

    (N'Laptop HP Pavilion 15-eg3093TU anh1.webp', 1022, 1),
    (N'Laptop HP Pavilion 15-eg3093TU anh2.webp', 1022, 0),
    (N'Laptop HP Pavilion 15-eg3093TU anh3.webp', 1022, 0),
    (N'Laptop HP Pavilion 15-eg3093TU anh4.webp', 1022, 0),
    (N'Laptop HP Pavilion 15-eg3093TU anh5.webp', 1022, 0),

    (N'Laptop HP Pavilion X360 anh1.webp', 1023, 1),
    (N'Laptop HP Pavilion X360 anh2.webp', 1023, 0),
    (N'Laptop HP Pavilion X360 anh3.webp', 1023, 0),
    (N'Laptop HP Pavilion X360 anh4.webp', 1023, 0),
    (N'Laptop HP Pavilion X360 anh5.webp', 1023, 0),

    (N'Laptop HP Victus 16-d1185TX anh1.webp', 1024, 1),
    (N'Laptop HP Victus 16-d1185TX anh2.webp', 1024, 0),
    (N'Laptop HP Victus 16-d1185TX anh3.webp', 1024, 0),
    (N'Laptop HP Victus 16-d1185TX anh4.webp', 1024, 0),
    (N'Laptop HP Victus 16-d1185TX anh5.webp', 1024, 0),

    -- thinkpad 6
    (N'Laptop Lenovo ThinkPad X1 Carbon Gen 10 anh1.jpg', 1025, 1),
    (N'Laptop Lenovo ThinkPad X1 Carbon Gen 10 anh2.jpg', 1025, 0),
    (N'Laptop Lenovo ThinkPad X1 Carbon Gen 10 anh3.jpg', 1025, 0),
    (N'Laptop Lenovo ThinkPad X1 Carbon Gen 10 anh4.jpg', 1025, 0),
    (N'Laptop Lenovo ThinkPad X1 Carbon Gen 10 anh5.jpg', 1025, 0),
    
    (N'Laptop Lenovo ThinkBook 14 G3 ACL R3 anh1.jpg', 1026, 1),
    (N'Laptop Lenovo ThinkBook 14 G3 ACL R3 anh2.jpg', 1026, 0),
    (N'Laptop Lenovo ThinkBook 14 G3 ACL R3 anh3.jpg', 1026, 0),
    (N'Laptop Lenovo ThinkBook 14 G3 ACL R3 anh4.jpg', 1026, 0),
    (N'Laptop Lenovo ThinkBook 14 G3 ACL R3 anh5.jpg', 1026, 0),

    -- msi 7
    (N'Laptop MSI Alpha 15 B5EEK-205VN anh1.webp', 1027, 1),
    (N'Laptop MSI Alpha 15 B5EEK-205VN anh2.webp', 1027, 0),
    (N'Laptop MSI Alpha 15 B5EEK-205VN anh3.webp', 1027, 0),
    (N'Laptop MSI Alpha 15 B5EEK-205VN anh4.webp', 1027, 0),
    (N'Laptop MSI Alpha 15 B5EEK-205VN anh5.webp', 1027, 0),

    (N'Laptop MSI GF63 Thin 11UC-1230VN anh1.webp', 1028, 1),
    (N'Laptop MSI GF63 Thin 11UC-1230VN anh2.webp', 1028, 0),
    (N'Laptop MSI GF63 Thin 11UC-1230VN anh3.webp', 1028, 0),
    (N'Laptop MSI GF63 Thin 11UC-1230VN anh4.webp', 1028, 0),
    (N'Laptop MSI GF63 Thin 11UC-1230VN anh5.webp', 1028, 0),

    (N'Laptop MSI GF63 Thin 12VE-460VN anh1.webp', 1029, 1),
    (N'Laptop MSI GF63 Thin 12VE-460VN anh2.webp', 1029, 0),
    (N'Laptop MSI GF63 Thin 12VE-460VN anh3.webp', 1029, 0),
    (N'Laptop MSI GF63 Thin 12VE-460VN anh4.webp', 1029, 0),
    (N'Laptop MSI GF63 Thin 12VE-460VN anh5.webp', 1029, 0),

    (N'Laptop MSI Katana GF66 12UDK-814VN anh1.webp', 1030, 1),
    (N'Laptop MSI Katana GF66 12UDK-814VN anh2.webp', 1030, 0),
    (N'Laptop MSI Katana GF66 12UDK-814VN anh3.webp', 1030, 0),
    (N'Laptop MSI Katana GF66 12UDK-814VN anh4.webp', 1030, 0),
    (N'Laptop MSI Katana GF66 12UDK-814VN anh5.webp', 1030, 0),

    (N'Laptop MSI Modern 14 C13M-607VN anh1.webp', 1031, 1),
    (N'Laptop MSI Modern 14 C13M-607VN anh2.webp', 1031, 0),
    (N'Laptop MSI Modern 14 C13M-607VN anh3.webp', 1031, 0),
    (N'Laptop MSI Modern 14 C13M-607VN anh4.webp', 1031, 0),
    (N'Laptop MSI Modern 14 C13M-607VN anh5.webp', 1031, 0),

    -- gigabyte 8
    (N'Laptop GIGABYTE AERO 16 XE5-73VN938AH anh1.webp', 1032, 1),
    (N'Laptop GIGABYTE AERO 16 XE5-73VN938AH anh2.webp', 1032, 0),
    (N'Laptop GIGABYTE AERO 16 XE5-73VN938AH anh3.webp', 1032, 0),
    (N'Laptop GIGABYTE AERO 16 XE5-73VN938AH anh4.webp', 1032, 0),
    (N'Laptop GIGABYTE AERO 16 XE5-73VN938AH anh5.webp', 1032, 0),

    (N'Laptop GIGABYTE Aorus 17 XE5-73VN534GH anh1.webp', 1033, 1),
    (N'Laptop GIGABYTE Aorus 17 XE5-73VN534GH anh2.webp', 1033, 0),
    (N'Laptop GIGABYTE Aorus 17 XE5-73VN534GH anh3.webp', 1033, 0),
    (N'Laptop GIGABYTE Aorus 17 XE5-73VN534GH anh4.webp', 1033, 0),
    (N'Laptop GIGABYTE Aorus 17 XE5-73VN534GH anh5.webp', 1033, 0),

    (N'Laptop GIGABYTE G5 GE-51VN263SH anh1.webp', 1034, 1),
    (N'Laptop GIGABYTE G5 GE-51VN263SH anh2.webp', 1034, 0),
    (N'Laptop GIGABYTE G5 GE-51VN263SH anh3.webp', 1034, 0),
    (N'Laptop GIGABYTE G5 GE-51VN263SH anh4.webp', 1034, 0),
    (N'Laptop GIGABYTE G5 GE-51VN263SH anh5.webp', 1034, 0),

    (N'Laptop GIGABYTE G5 KD-52VN123SO anh1.webp', 1035, 1),
    (N'Laptop GIGABYTE G5 KD-52VN123SO anh2.webp', 1035, 0),
    (N'Laptop GIGABYTE G5 KD-52VN123SO anh3.webp', 1035, 0),
    (N'Laptop GIGABYTE G5 KD-52VN123SO anh4.webp', 1035, 0),
    (N'Laptop GIGABYTE G5 KD-52VN123SO anh5.webp', 1035, 0),

    (N'Laptop GIGABYTE G5 MF-F2VN333SH anh1.webp', 1036, 1),
    (N'Laptop GIGABYTE G5 MF-F2VN333SH anh2.webp', 1036, 0),
    (N'Laptop GIGABYTE G5 MF-F2VN333SH anh3.webp', 1036, 0),
    (N'Laptop GIGABYTE G5 MF-F2VN333SH anh4.webp', 1036, 0),
    (N'Laptop GIGABYTE G5 MF-F2VN333SH anh5.webp', 1036, 0),

    -- apple 9
    (N'Laptop APPLE MacBook Air 2023 anh1.webp', 1037, 1),
    (N'Laptop APPLE MacBook Air 2023 anh2.webp', 1037, 0),
    (N'Laptop APPLE MacBook Air 2023 anh3.webp', 1037, 0),
    (N'Laptop APPLE MacBook Air 2023 anh4.webp', 1037, 0),
    (N'Laptop APPLE MacBook Air 2023 anh5.webp', 1037, 0),

    (N'Laptop APPLE MacBook Pro 13 anh1.webp', 1038, 1),
    (N'Laptop APPLE MacBook Pro 13 anh2.webp', 1038, 0),
    (N'Laptop APPLE MacBook Pro 13 anh3.webp', 1038, 0),
    (N'Laptop APPLE MacBook Pro 13 anh4.webp', 1038, 0),
    (N'Laptop APPLE MacBook Pro 13 anh5.webp', 1038, 0),

    (N'Laptop APPLE MacBook Pro 14 2023 anh1.webp', 1039, 1),
    (N'Laptop APPLE MacBook Pro 14 2023 anh2.webp', 1039, 0),
    (N'Laptop APPLE MacBook Pro 14 2023 anh3.webp', 1039, 0),
    (N'Laptop APPLE MacBook Pro 14 2023 anh4.webp', 1039, 0),
    (N'Laptop APPLE MacBook Pro 14 2023 anh5.webp', 1039, 0),

    (N'MacBook Air 2022 13.6 inch Z15X0003L anh1.webp', 1040, 1),
    (N'MacBook Air 2022 13.6 inch Z15X0003L anh2.webp', 1040, 0),
    (N'MacBook Air 2022 13.6 inch Z15X0003L anh3.webp', 1040, 0),
    (N'MacBook Air 2022 13.6 inch Z15X0003L anh4.webp', 1040, 0),
    (N'MacBook Air 2022 13.6 inch Z15X0003L anh5.webp', 1040, 0);
    

GO


-- DELETE Price
-- DBCC CHECKIDENT ('Price', RESEED, 0);
INSERT INTO Price (price, product_id, [start_date], [end_date])
VALUES
    (25000000, 1000, '2023-07-10 07:00:00', '2023-08-11 08:00:00'),
    (18000000, 1001, '2023-07-11 07:00:00', '2023-08-11 08:00:00'),
    (30000000, 1002, '2023-07-12 07:00:00', '2023-08-12 08:00:00'),
    (8000000,  1003, '2023-07-13 07:00:00', '2023-08-13 08:00:00'),
    (12000000, 1004, '2023-07-14 07:00:00', '2023-08-14 08:00:00'),
    (35000000, 1005, '2023-07-14 07:00:00', '2023-08-14 08:00:00'),
    (42000000, 1006, '2023-07-14 07:00:00', '2023-08-14 08:00:00'),
    (54000000, 1007, '2023-07-14 07:00:00', '2023-08-14 08:00:00'),
    (23000000, 1008, '2023-07-14 07:00:00', '2023-08-14 08:00:00'),
    (41000000, 1009, '2023-07-14 07:00:00', '2023-08-14 08:00:00'),
    (23000000, 1010, '2023-07-14 07:00:00', '2023-08-14 08:00:00'),
    (25000000, 1011, '2023-07-14 07:00:00', '2023-08-14 08:00:00'),
    (41000000, 1012, '2023-07-14 07:00:00', '2023-08-14 08:00:00'),
    (31000000, 1013, '2023-07-14 07:00:00', '2023-08-14 08:00:00'),
    (35000000, 1014, '2023-07-14 07:00:00', '2023-08-14 08:00:00'),
    (23000000, 1015, '2023-07-14 07:00:00', '2023-08-14 08:00:00'),
    (18000000, 1016, '2023-07-14 07:00:00', '2023-08-14 08:00:00'),
    (38000000, 1017, '2023-07-14 07:00:00', '2023-08-14 08:00:00'),
    (41000000, 1018, '2023-07-14 07:00:00', '2023-08-14 08:00:00'),
    (38000000, 1019, '2023-07-14 07:00:00', '2023-08-14 08:00:00'),
    (25000000, 1020, '2023-07-14 07:00:00', '2023-08-14 08:00:00'),
    (28000000, 1021, '2023-07-14 07:00:00', '2023-08-14 08:00:00'),
    (29000000, 1022, '2023-07-14 07:00:00', '2023-08-14 08:00:00'),
    (23000000, 1023, '2023-07-14 07:00:00', '2023-08-14 08:00:00'),
    (32000000, 1024, '2023-07-14 07:00:00', '2023-08-14 08:00:00'),
    (31000000, 1025, '2023-07-14 07:00:00', '2023-08-14 08:00:00'),
    (43000000, 1026, '2023-07-14 07:00:00', '2023-08-14 08:00:00'),
    (35000000, 1027, '2023-07-14 07:00:00', '2023-08-14 08:00:00'),
    (36000000, 1028, '2023-07-14 07:00:00', '2023-08-14 08:00:00'),
    (38000000, 1029, '2023-07-14 07:00:00', '2023-08-14 08:00:00'),
    (32000000, 1030, '2023-07-14 07:00:00', '2023-08-14 08:00:00'),
    (13000000, 1031, '2023-07-14 07:00:00', '2023-08-14 08:00:00'),
    (12000000, 1032, '2023-07-14 07:00:00', '2023-08-14 08:00:00'),
    (32000000, 1033, '2023-07-14 07:00:00', '2023-08-14 08:00:00'),
    (53000000, 1034, '2023-07-14 07:00:00', '2023-08-14 08:00:00'),
    (17000000, 1035, '2023-07-14 07:00:00', '2023-08-14 08:00:00'),
    (34000000, 1036, '2023-07-14 07:00:00', '2023-08-14 08:00:00'),
    (23000000, 1037, '2023-07-14 07:00:00', '2023-08-14 08:00:00'),
    (52000000, 1038, '2023-07-14 07:00:00', '2023-08-14 08:00:00'),
    (32000000, 1039, '2023-07-14 07:00:00', '2023-08-14 08:00:00'),
    (30000000, 1040, '2023-07-14 07:00:00', '2023-08-14 08:00:00');
   

GO


-- DELETE Discount

INSERT INTO Discount (id, title, [percentage], [start_date], [end_date], active, [description])
VALUES
    (N'MAGIAMGIA001', N'Giảm giá mùa hè', 15, '2023-07-01 05:00:00', '2023-07-31 08:00:00', 1, N'Ưu đãi giảm giá dành cho mùa hè');
    -- (N'MAGIAMGIA002', N'Khuyến mãi đặc biệt', 20, '2023-08-10 05:00:00', '2023-08-20 08:00:00', 1, N'Khuyến mãi hấp dẫn dành cho quý khách hàng'),
    -- (N'MAGIAMGIA003', N'Giảm giá sản phẩm mới', 10, '2023-09-05 05:00:00', '2023-09-15 08:00:00', 1, N'Ưu đãi giảm giá đặc biệt cho sản phẩm mới'),
    -- (N'MAGIAMGIA004', N'Khuyến mãi sinh nhật', 25, '2023-10-01 05:00:00', '2023-10-31 08:00:00', 1, N'Chúc mừng sinh nhật, nhận ngay ưu đãi hấp dẫn'),
    -- (N'MAGIAMGIA005', N'Giảm giá cuối năm', 30, '2023-12-20 05:00:00', '2023-12-31 08:00:00', 1, N'Ưu đãi cuối năm, cơ hội để sở hữu những sản phẩm ưng ý');
GO




-- DELETE Orders
-- DBCC CHECKIDENT ('Orders', RESEED, 9999);
INSERT INTO Orders (user_id, order_date, completion_date, delivery_date, cancellation_date, cancellation_reason, payment_method, [status])
VALUES
    (N'ngocanh01', '2023-07-21 10:00:00', '2023-07-21 15:30:00', '2023-07-24 09:00:00', '2023-07-22 11:00:00', N'Hủy đơn hàng do không có hàng', 1, 1),
    (N'thanhnam87', '2023-07-22 13:30:00', '2023-07-22 17:45:00', '2023-07-25 11:30:00', NULL, NULL, 1, 2),
    (N'minhchau02', '2023-07-23 09:15:00', '2023-07-23 16:00:00', '2023-07-26 08:45:00', NULL, NULL, 0, 1),
    (N'trungkien11', '2023-07-24 14:00:00', NULL, NULL, NULL, NULL, 1, 3),
    (N'trungkien11', '2023-07-24 14:00:00', NULL, NULL, NULL, NULL, 1, 3),
    (N'thuytrang9x', '2023-07-25 11:45:00', NULL, NULL, NULL, NULL, 0, 1)
GO
SELECT * FROM Orders
-- DELETE Order_Details
-- DBCC CHECKIDENT ('Order_Details', RESEED, 0);
INSERT INTO Order_Details (order_id, product_id,price, quantity)
VALUES
    (10000, 1000,12000.0, 2),
    (10001, 1002,13000.0, 1),
    (10002, 1001,11000.0, 1),
    (10003, 1004,81000.0, 3),
    (10004, 1003,24000.0, 2);

GO




SELECT * FROM Users
SELECT * FROM Verification;
SELECT * FROM Avartars;
SELECT * FROM CPU;
SELECT * FROM RAM;
SELECT * FROM Storage;
SELECT * FROM Screen_Size;
SELECT * FROM Graphics_Card;
SELECT * FROM Operating_System;
SELECT * FROM Categories;
SELECT * FROM Brands;
SELECT * FROM Products;
SELECT * FROM Product_Images;
SELECT * FROM Price;
SELECT * FROM Discount;
SELECT * FROM Discount_Price;
SELECT * FROM Cart;
SELECT * FROM Orders;
SELECT * FROM Order_Details;
SELECT * FROM Favorites;
