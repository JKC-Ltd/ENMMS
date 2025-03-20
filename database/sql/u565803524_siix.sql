-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Mar 20, 2025 at 02:46 PM
-- Server version: 10.11.10-MariaDB
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u565803524_siix`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('admin@smartpowerph.com|119.94.167.83', 'i:1;', 1742467908),
('admin@smartpowerph.com|119.94.167.83:timer', 'i:1742467908;', 1742467908),
('daisy_effertz@clientcaf.info|212.102.63.50', 'i:2;', 1742322733),
('daisy_effertz@clientcaf.info|212.102.63.50:timer', 'i:1742322733;', 1742322733),
('isobel72@hotmail.com|212.102.63.50', 'i:2;', 1742322742),
('isobel72@hotmail.com|212.102.63.50:timer', 'i:1742322742;', 1742322742),
('sstokes81@yahoo.com|212.102.63.50', 'i:1;', 1742322739),
('sstokes81@yahoo.com|212.102.63.50:timer', 'i:1742322739;', 1742322739),
('test@example.com|180.190.121.92', 'i:1;', 1742463001),
('test@example.com|180.190.121.92:timer', 'i:1742463001;', 1742463001);

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `gateways`
--

CREATE TABLE `gateways` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `location_id` bigint(20) UNSIGNED NOT NULL,
  `customer_code` varchar(255) NOT NULL,
  `gateway` varchar(255) DEFAULT NULL,
  `gateway_code` varchar(255) NOT NULL,
  `description` longtext DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `gateways`
--

INSERT INTO `gateways` (`id`, `location_id`, `customer_code`, `gateway`, `gateway_code`, `description`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 18, 'SIIX', '1', 'GAT-01', 'Gateway on IIDA', '2025-03-20 22:26:56', '2025-03-20 22:26:56', NULL),
(2, 19, 'SIIX', '2', 'GAT-02', 'Gateway on Canteen', '2025-03-20 22:27:47', '2025-03-20 22:27:47', NULL),
(3, 24, 'SIIX', '3', 'GAT-03', 'Gateway on EOL', '2025-03-20 22:28:08', '2025-03-20 22:28:08', NULL),
(4, 25, 'SIIX', '4', 'GAT-04', 'Gateway on EE Room', '2025-03-20 22:28:37', '2025-03-20 22:28:37', NULL),
(5, 21, 'SIIX', '5', 'GAT-05', 'Gateway on SMT Area', '2025-03-20 22:29:02', '2025-03-20 22:29:02', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `locations`
--

CREATE TABLE `locations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `location_code` varchar(255) NOT NULL,
  `location_name` varchar(255) NOT NULL,
  `pid` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `locations`
--

INSERT INTO `locations` (`id`, `location_code`, `location_name`, `pid`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'SEP', 'SEP', NULL, '2025-03-02 01:26:56', '2025-03-02 01:26:56', NULL),
(2, 'EMS', 'EMS', '1', '2025-03-02 01:28:08', '2025-03-02 01:28:08', NULL),
(3, 'Injection', 'Injection', '1', '2025-03-02 01:28:59', '2025-03-02 01:28:59', NULL),
(4, 'CIP2', 'CIP2', '1', '2025-03-02 01:29:11', '2025-03-02 01:29:11', NULL),
(5, 'Building 4', 'Building 4', '1', '2025-03-02 01:30:20', '2025-03-02 01:30:20', NULL),
(6, 'Building 1', 'Building 1', '2', '2025-03-02 01:30:32', '2025-03-02 01:30:32', NULL),
(7, 'Building 2', 'Building 2', '2', '2025-03-02 01:31:51', '2025-03-02 01:31:51', NULL),
(8, 'Building 3', 'Building 3', '2', '2025-03-02 01:32:04', '2025-03-02 01:32:04', NULL),
(9, '1st Floor', '1st Floor', '3', '2025-03-02 01:32:30', '2025-03-02 01:32:30', NULL),
(10, '2nd Floor', '2nd Floor', '3', '2025-03-02 01:32:49', '2025-03-02 01:32:49', NULL),
(11, '1st Floor', '1st Floor', '6', '2025-03-02 01:32:49', '2025-03-02 01:32:49', NULL),
(12, '2nd Floor', '2nd Floor', '6', '2025-03-02 01:32:49', '2025-03-02 01:32:49', NULL),
(13, '1st Floor', '1st Floor', '7', '2025-03-02 01:32:30', '2025-03-02 01:32:30', NULL),
(14, '2nd Floor', '2nd Floor', '7', '2025-03-02 01:32:49', '2025-03-02 01:32:49', NULL),
(15, '1st Floor', '1st Floor', '8', '2025-03-02 01:32:30', '2025-03-02 01:32:30', NULL),
(16, '2nd Floor', '2nd Floor', '8', '2025-03-02 01:32:49', '2025-03-02 01:32:49', NULL),
(17, 'IIDA line', 'IIDA line', '11', '2025-03-02 01:32:49', '2025-03-02 01:32:49', NULL),
(18, 'IIDA Office', 'IIDA Office', '11', '2025-03-02 01:32:49', '2025-03-02 01:32:49', NULL),
(19, 'Canteen', 'Canteen', '12', NULL, NULL, NULL),
(20, 'General Office', 'General Office', '12', NULL, NULL, NULL),
(21, 'SMT Area', 'SMT Area', '13', NULL, NULL, NULL),
(22, 'A1 reflow', 'A1 reflow', '21', NULL, NULL, NULL),
(23, 'B5 reflow', 'B5 reflow', '21', NULL, NULL, NULL),
(24, 'EOL', 'EOL', '13', NULL, NULL, NULL),
(25, 'EE Room', 'EE Room', '11', '2025-03-20 21:16:10', '2025-03-20 21:16:10', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_01_29_090253_create_locations_table', 1),
(5, '2025_01_29_090317_create_gateways_table', 1),
(6, '2025_01_29_090335_create_sensor_types_table', 1),
(7, '2025_01_29_090336_create_sensor_models_table', 1),
(8, '2025_01_29_090340_create_sensors_table', 1),
(9, '2025_01_29_090520_create_sensor_logs_table', 1),
(10, '2025_01_30_050145_create_sensor_offlines_table', 1),
(11, '2025_02_14_042309_alter_sensor_offlines_table', 1),
(12, '2025_02_14_045008_alter_gateways_table', 1),
(13, '2025_02_17_071232_create_user_types_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sensors`
--

CREATE TABLE `sensors` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `slave_address` varchar(255) NOT NULL,
  `description` longtext DEFAULT NULL,
  `location_id` bigint(20) UNSIGNED NOT NULL,
  `gateway_id` bigint(20) UNSIGNED NOT NULL,
  `sensor_model_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sensors`
--

INSERT INTO `sensors` (`id`, `slave_address`, `description`, `location_id`, `gateway_id`, `sensor_model_id`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, '2', 'IIDA PP-100V', 17, 1, 1, '2025-03-20 22:32:53', '2025-03-20 22:37:17', NULL),
(2, '3', 'IIDA PP-200V', 17, 1, 1, '2025-03-20 22:33:12', '2025-03-20 22:37:24', NULL),
(3, '1', 'IIDA PP-220V', 17, 1, 1, '2025-03-20 22:33:31', '2025-03-20 22:37:32', NULL),
(4, '6', 'IIDA PP-HDA-AP', 17, 1, 1, '2025-03-20 22:33:52', '2025-03-20 22:37:40', NULL),
(5, '4', 'PP-CANTEEN', 19, 2, 1, '2025-03-20 22:37:03', '2025-03-20 22:37:03', NULL),
(6, '5', 'PP-SEP', 19, 2, 1, '2025-03-20 22:38:00', '2025-03-20 22:38:00', NULL),
(7, '7', 'PP-SLP', 19, 2, 1, '2025-03-20 22:38:20', '2025-03-20 22:38:20', NULL),
(8, '9', 'EOL MP-100V', 24, 3, 1, '2025-03-20 22:39:35', '2025-03-20 22:39:35', NULL),
(9, '8', 'EOL MP-2-2', 24, 3, 1, '2025-03-20 22:39:54', '2025-03-20 22:39:54', NULL),
(10, '10', 'SWS Reflow A4', 25, 4, 1, '2025-03-20 22:40:45', '2025-03-20 22:40:45', NULL),
(11, '11', 'B1 Reflow', 25, 4, 1, '2025-03-20 22:41:28', '2025-03-20 22:41:28', NULL),
(12, '12', 'A1 Reflow', 21, 5, 1, '2025-03-20 22:41:48', '2025-03-20 22:41:48', NULL),
(13, '13', 'A2 Reflow', 21, 5, 1, '2025-03-20 22:42:04', '2025-03-20 22:42:04', NULL),
(14, '14', 'A3 Reflow', 21, 5, 1, '2025-03-20 22:42:22', '2025-03-20 22:42:22', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sensor_logs`
--

CREATE TABLE `sensor_logs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `gateway_id` bigint(20) UNSIGNED NOT NULL,
  `sensor_id` bigint(20) UNSIGNED NOT NULL,
  `voltage_ab` double DEFAULT NULL,
  `voltage_bc` double DEFAULT NULL,
  `voltage_ca` double DEFAULT NULL,
  `current_a` double DEFAULT NULL,
  `current_b` double DEFAULT NULL,
  `current_c` double DEFAULT NULL,
  `real_power` double DEFAULT NULL,
  `apparent_power` double DEFAULT NULL,
  `energy` double DEFAULT NULL,
  `temperature` double DEFAULT NULL,
  `humidity` double DEFAULT NULL,
  `volume` double DEFAULT NULL,
  `flow` double DEFAULT NULL,
  `pressure` double DEFAULT NULL,
  `co2` double DEFAULT NULL,
  `pm25_pm10` double DEFAULT NULL,
  `o2` double DEFAULT NULL,
  `nox` double DEFAULT NULL,
  `co` double DEFAULT NULL,
  `s02` double DEFAULT NULL,
  `datetime_created` datetime NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sensor_models`
--

CREATE TABLE `sensor_models` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `sensor_model` varchar(255) NOT NULL,
  `sensor_brand` varchar(255) NOT NULL,
  `sensor_type_id` bigint(20) UNSIGNED NOT NULL,
  `sensor_reg_address` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sensor_models`
--

INSERT INTO `sensor_models` (`id`, `sensor_model`, `sensor_brand`, `sensor_type_id`, `sensor_reg_address`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'PM2120', 'Schneider', 1, '3020,3000,3060,3076,2700', '2025-03-19 01:33:52', '2025-03-19 01:33:52', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sensor_offlines`
--

CREATE TABLE `sensor_offlines` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `query` longtext NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `gateway_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sensor_types`
--

CREATE TABLE `sensor_types` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `description` varchar(255) NOT NULL,
  `sensor_type_code` varchar(255) NOT NULL,
  `sensor_type_parameter` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sensor_types`
--

INSERT INTO `sensor_types` (`id`, `description`, `sensor_type_code`, `sensor_type_parameter`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Single Phase Meter', 'SPM', 'voltage_ab,current_a,real_power,apparent_power,energy', '2025-02-14 01:04:41', '2025-02-14 01:06:28', NULL),
(2, 'Three Phase Meter', 'TPM', 'voltage_ab,voltage_bc,voltage_ca,current_a,current_b,current_c,real_power,apparent_power,energy', '2025-02-14 01:05:34', '2025-02-14 01:06:21', NULL),
(3, 'Temperature & Humidity Sensor', 'THS', 'temperature,humidity', '2025-02-14 01:06:13', '2025-02-14 01:06:13', NULL),
(4, 'Flow Meter', 'FVM', 'volume,flow', '2025-02-14 01:07:05', '2025-02-14 01:07:05', NULL),
(5, 'Pressure Meter Guage', 'PMG', 'pressure', '2025-02-14 01:07:28', '2025-02-14 01:07:28', NULL),
(6, 'Air Quality Meter', 'AQM', 'co2,pm25_pm10,o2,nox,co,s02', '2025-02-14 01:08:48', '2025-02-14 01:08:48', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('6y6giTxd1nB5RsiztdxEYD5W8j0L6QX5EfY8hCiK', 1, '2001:4451:4155:6000:1d68:eb05:680a:ccb1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoicVhYUzA1akVSMWlQZ1dGRDkzYTVMSGRQR29LZjk0SWZiZEtZN202cSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDc6Imh0dHBzOi8vc2lpeC5zbWFydHBvd2VycGguY29tL2xvY2F0aW9uRGFzaGJvYXJkIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTt9', 1742481746),
('ba7FuVYt705uWAnY6O7eHuilBkreaH2Nyg3SVBwq', NULL, '2001:4451:41e0:5a00:fc3c:dea0:7546:d728', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQk1lcUxEekFvRzdneXNIVEdtZFFuRVk4dXRHNWNscGN1aVFNWmd0QiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzU6Imh0dHBzOi8vc2lpeC5zbWFydHBvd2VycGguY29tL2xvZ2luIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1742479687);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `user_type_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `user_type_id`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Admin', 'Admin', 1, 'test@example.com', NULL, '$2y$12$F47rUVsa3edWbBRkM3RvxODjDKRgT.TMJiJjCoxoJ3.SA10ize7G.', NULL, '2025-03-18 05:48:11', '2025-03-18 05:48:11', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_types`
--

CREATE TABLE `user_types` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `deleted_by` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user_types`
--

INSERT INTO `user_types` (`id`, `name`, `created_by`, `updated_by`, `deleted_by`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 'Admin', NULL, NULL, NULL, '2025-03-18 05:48:11', '2025-03-18 05:48:11', NULL),
(2, 'User', NULL, NULL, NULL, '2025-03-18 05:48:11', '2025-03-18 05:48:11', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `gateways`
--
ALTER TABLE `gateways`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `gateways_gateway_code_unique` (`gateway_code`),
  ADD KEY `gateways_location_id_foreign` (`location_id`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `locations`
--
ALTER TABLE `locations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `sensors`
--
ALTER TABLE `sensors`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sensors_slave_address_unique` (`slave_address`),
  ADD KEY `sensors_location_id_foreign` (`location_id`),
  ADD KEY `sensors_gateway_id_foreign` (`gateway_id`),
  ADD KEY `sensors_sensor_model_id_foreign` (`sensor_model_id`);

--
-- Indexes for table `sensor_logs`
--
ALTER TABLE `sensor_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sensor_logs_gateway_id_foreign` (`gateway_id`),
  ADD KEY `sensor_logs_sensor_id_foreign` (`sensor_id`);

--
-- Indexes for table `sensor_models`
--
ALTER TABLE `sensor_models`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sensor_models_sensor_model_unique` (`sensor_model`),
  ADD KEY `sensor_models_sensor_type_id_foreign` (`sensor_type_id`);

--
-- Indexes for table `sensor_offlines`
--
ALTER TABLE `sensor_offlines`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sensor_offlines_gateway_id_foreign` (`gateway_id`);

--
-- Indexes for table `sensor_types`
--
ALTER TABLE `sensor_types`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sensor_types_sensor_type_code_unique` (`sensor_type_code`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `user_types`
--
ALTER TABLE `user_types`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `gateways`
--
ALTER TABLE `gateways`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `locations`
--
ALTER TABLE `locations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `sensors`
--
ALTER TABLE `sensors`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `sensor_logs`
--
ALTER TABLE `sensor_logs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sensor_models`
--
ALTER TABLE `sensor_models`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `sensor_offlines`
--
ALTER TABLE `sensor_offlines`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sensor_types`
--
ALTER TABLE `sensor_types`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_types`
--
ALTER TABLE `user_types`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `gateways`
--
ALTER TABLE `gateways`
  ADD CONSTRAINT `gateways_location_id_foreign` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`);

--
-- Constraints for table `sensors`
--
ALTER TABLE `sensors`
  ADD CONSTRAINT `sensors_gateway_id_foreign` FOREIGN KEY (`gateway_id`) REFERENCES `gateways` (`id`),
  ADD CONSTRAINT `sensors_location_id_foreign` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`),
  ADD CONSTRAINT `sensors_sensor_model_id_foreign` FOREIGN KEY (`sensor_model_id`) REFERENCES `sensor_models` (`id`);

--
-- Constraints for table `sensor_logs`
--
ALTER TABLE `sensor_logs`
  ADD CONSTRAINT `sensor_logs_gateway_id_foreign` FOREIGN KEY (`gateway_id`) REFERENCES `gateways` (`id`),
  ADD CONSTRAINT `sensor_logs_sensor_id_foreign` FOREIGN KEY (`sensor_id`) REFERENCES `sensors` (`id`);

--
-- Constraints for table `sensor_models`
--
ALTER TABLE `sensor_models`
  ADD CONSTRAINT `sensor_models_sensor_type_id_foreign` FOREIGN KEY (`sensor_type_id`) REFERENCES `sensor_types` (`id`);

--
-- Constraints for table `sensor_offlines`
--
ALTER TABLE `sensor_offlines`
  ADD CONSTRAINT `sensor_offlines_gateway_id_foreign` FOREIGN KEY (`gateway_id`) REFERENCES `gateways` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
