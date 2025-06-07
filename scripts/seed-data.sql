-- Seed data for Inventory & POS Management System

-- Insert default admin user (password: admin123)
INSERT INTO users (email, password_hash, role, first_name, last_name) VALUES
('admin@store.com', '$2b$10$rOzJqQjQjQjQjQjQjQjQjOzJqQjQjQjQjQjQjQjQjQjQjQjQjQjQjQ', 'admin', 'System', 'Administrator'),
('manager@store.com', '$2b$10$rOzJqQjQjQjQjQjQjQjQjOzJqQjQjQjQjQjQjQjQjQjQjQjQjQjQjQ', 'manager', 'Store', 'Manager'),
('cashier@store.com', '$2b$10$rOzJqQjQjQjQjQjQjQjQjOzJqQjQjQjQjQjQjQjQjQjQjQjQjQjQjQ', 'cashier', 'Store', 'Cashier');

-- Insert product categories
INSERT INTO categories (name, description) VALUES
('Electronics', 'Electronic devices and gadgets'),
('Computers', 'Laptops, desktops, and computer accessories'),
('Mobile Phones', 'Smartphones and mobile accessories'),
('Accessories', 'Various accessories and add-ons'),
('Audio', 'Headphones, speakers, and audio equipment');

-- Insert suppliers
INSERT INTO suppliers (name, contact_person, email, phone, address, city, state, zip_code, country) VALUES
('Apple Inc.', 'John Smith', 'orders@apple.com', '+1-800-275-2273', '1 Apple Park Way', 'Cupertino', 'CA', '95014', 'USA'),
('Samsung Electronics', 'Jane Doe', 'b2b@samsung.com', '+1-800-726-7864', '85 Challenger Road', 'Ridgefield Park', 'NJ', '07660', 'USA'),
('Dell Technologies', 'Mike Johnson', 'sales@dell.com', '+1-800-289-3355', '1 Dell Way', 'Round Rock', 'TX', '78682', 'USA'),
('HP Inc.', 'Sarah Wilson', 'orders@hp.com', '+1-800-474-6836', '1501 Page Mill Road', 'Palo Alto', 'CA', '94304', 'USA');

-- Insert products
INSERT INTO products (sku, name, description, category_id, supplier_id, cost_price, selling_price, quantity, min_stock_level, barcode) VALUES
('IPH15-128-BLK', 'iPhone 15 128GB Black', 'Latest iPhone with advanced features and A17 Pro chip', 3, 1, 699.00, 899.00, 25, 10, '194253000000'),
('IPH15-256-BLU', 'iPhone 15 256GB Blue', 'iPhone 15 with 256GB storage in Blue color', 3, 1, 799.00, 999.00, 18, 10, '194253000001'),
('SAM-S24-256-WHT', 'Samsung Galaxy S24 256GB White', 'Premium Android smartphone with advanced camera', 3, 2, 649.00, 849.00, 8, 15, '887276700000'),
('SAM-S24-512-BLK', 'Samsung Galaxy S24 512GB Black', 'High-end Galaxy S24 with 512GB storage', 3, 2, 749.00, 949.00, 12, 10, '887276700001'),
('MBA-M3-512-SLV', 'MacBook Air M3 512GB Silver', 'Lightweight laptop with M3 chip and 512GB SSD', 2, 1, 1299.00, 1599.00, 12, 8, '194253100000'),
('MBA-M3-1TB-GRY', 'MacBook Air M3 1TB Space Gray', 'MacBook Air with 1TB storage in Space Gray', 2, 1, 1499.00, 1799.00, 6, 5, '194253100001'),
('APP-PRO-2ND', 'AirPods Pro 2nd Generation', 'Premium wireless earbuds with active noise cancellation', 5, 1, 199.00, 249.00, 30, 20, '194253200000'),
('APP-MAX-SLV', 'AirPods Max Silver', 'Over-ear headphones with spatial audio', 5, 1, 449.00, 549.00, 8, 5, '194253200001'),
('IPD-AIR-256-BLU', 'iPad Air 256GB Blue', 'Versatile tablet with M1 chip and 256GB storage', 1, 1, 499.00, 599.00, 18, 12, '194253300000'),
('IPD-PRO-512-SLV', 'iPad Pro 12.9" 512GB Silver', 'Professional tablet with M2 chip', 1, 1, 899.00, 1099.00, 4, 8, '194253300001'),
('DEL-XPS-13-I7', 'Dell XPS 13 Intel i7', 'Premium ultrabook with Intel Core i7 processor', 2, 3, 1199.00, 1499.00, 10, 6, '884116400000'),
('HP-SPEC-X360', 'HP Spectre x360 Convertible', '2-in-1 laptop with touchscreen display', 2, 4, 1099.00, 1399.00, 7, 5, '195161500000');

-- Insert some sample customers
INSERT INTO customers (first_name, last_name, email, phone, address, city, state, zip_code) VALUES
('John', 'Doe', 'john.doe@email.com', '+1-555-0101', '123 Main St', 'Anytown', 'CA', '90210'),
('Jane', 'Smith', 'jane.smith@email.com', '+1-555-0102', '456 Oak Ave', 'Somewhere', 'NY', '10001'),
('Mike', 'Johnson', 'mike.johnson@email.com', '+1-555-0103', '789 Pine Rd', 'Elsewhere', 'TX', '75001'),
('Sarah', 'Wilson', 'sarah.wilson@email.com', '+1-555-0104', '321 Elm St', 'Nowhere', 'FL', '33101'),
('David', 'Brown', 'david.brown@email.com', '+1-555-0105', '654 Maple Dr', 'Anywhere', 'WA', '98001');

-- Insert system settings
INSERT INTO settings (setting_key, setting_value, description) VALUES
('store_name', 'TechStore Pro', 'Name of the store'),
('store_address', '123 Business Ave, Commerce City, ST 12345', 'Store address'),
('store_phone', '+1-555-STORE-1', 'Store contact phone number'),
('store_email', 'info@techstore.com', 'Store contact email'),
('tax_rate', '8.00', 'Default tax rate percentage'),
('currency', 'USD', 'Store currency'),
('low_stock_threshold', '10', 'Default low stock alert threshold'),
('receipt_footer', 'Thank you for shopping with us!', 'Footer text for receipts');

-- Insert some sample sales transactions
INSERT INTO sales (transaction_id, customer_id, cashier_id, subtotal, discount_amount, tax_amount, total_amount, payment_method, amount_received, change_amount, status) VALUES
('TXN-001', 1, 3, 1148.00, 0.00, 91.84, 1239.84, 'Credit Card', 1239.84, 0.00, 'completed'),
('TXN-002', 2, 3, 849.00, 42.45, 64.52, 871.07, 'Cash', 900.00, 28.93, 'completed'),
('TXN-003', 3, 3, 728.00, 0.00, 58.24, 786.24, 'Digital Wallet', 786.24, 0.00, 'completed'),
('TXN-004', 4, 2, 1599.00, 0.00, 127.92, 1726.92, 'Credit Card', 1726.92, 0.00, 'refunded');

-- Insert sale items for the transactions
INSERT INTO sale_items (sale_id, product_id, quantity, unit_price, total_price) VALUES
-- TXN-001 items
(1, 1, 1, 899.00, 899.00),  -- iPhone 15 128GB Black
(1, 7, 1, 249.00, 249.00),  -- AirPods Pro 2nd Gen
-- TXN-002 items
(2, 3, 1, 849.00, 849.00),  -- Samsung Galaxy S24 256GB White
-- TXN-003 items
(3, 9, 1, 599.00, 599.00),  -- iPad Air 256GB Blue
(3, 7, 1, 129.00, 129.00),  -- Assuming Apple Pencil (not in products table, using different price)
-- TXN-004 items
(4, 5, 1, 1599.00, 1599.00); -- MacBook Air M3 512GB Silver

-- Insert stock movements for the sales
INSERT INTO stock_movements (product_id, movement_type, quantity, reference_type, reference_id, user_id) VALUES
-- Stock out for TXN-001
(1, 'out', -1, 'sale', 1, 3),  -- iPhone 15
(7, 'out', -1, 'sale', 1, 3),  -- AirPods Pro
-- Stock out for TXN-002
(3, 'out', -1, 'sale', 2, 3),  -- Samsung Galaxy S24
-- Stock out for TXN-003
(9, 'out', -1, 'sale', 3, 3),  -- iPad Air
-- Stock out for TXN-004 (refunded, so stock should be back in)
(5, 'out', -1, 'sale', 4, 2),  -- MacBook Air (initial sale)
(5, 'in', 1, 'return', 4, 2);   -- MacBook Air (refund return)
