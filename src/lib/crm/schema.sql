-- ============================================================================
-- MAHALAKSHMI TOUR & TRAVEL — POSTGRESQL / SUPABASE CRM SCHEMA
-- Production database script with indexes and foreign key structures
-- ============================================================================

-- 1. Create Enquiries & Leads Table
CREATE TABLE IF NOT EXISTS enquiries (
  id VARCHAR(64) PRIMARY KEY,
  reference_code VARCHAR(32) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255),
  origin VARCHAR(100) DEFAULT 'Madurai',
  destinations TEXT[] DEFAULT '{}',
  custom_destination VARCHAR(255),
  travel_date DATE,
  return_date DATE,
  duration VARCHAR(100),
  date_flexibility VARCHAR(50) DEFAULT 'flexible',
  traveller_count INT DEFAULT 1,
  group_type VARCHAR(50) DEFAULT 'family',
  vehicle_requirement VARCHAR(100) DEFAULT 'help-me-choose',
  notes TEXT,
  contact_preference VARCHAR(50) DEFAULT 'whatsapp',

  -- CRM Pipeline & Financial Tracking
  status VARCHAR(50) DEFAULT 'NEW_ENQUIRY',
  priority VARCHAR(20) DEFAULT 'HOT',
  estimated_value NUMERIC(12, 2) DEFAULT 25000.00,
  quoted_amount NUMERIC(12, 2),
  advance_received NUMERIC(12, 2) DEFAULT 0.00,
  balance_amount NUMERIC(12, 2),
  assigned_vehicle VARCHAR(255),
  assigned_driver VARCHAR(255),
  internal_notes TEXT,

  -- Ad Attribution & Marketing Context
  source VARCHAR(50) DEFAULT 'website',
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(150),
  utm_term VARCHAR(150),
  utm_content VARCHAR(150),
  gclid VARCHAR(255),
  fbclid VARCHAR(255),
  landing_page VARCHAR(255),

  -- WhatsApp Automation State
  whatsapp_sent BOOLEAN DEFAULT FALSE,
  whatsapp_last_sent_at TIMESTAMP WITH TIME ZONE,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create Activity Log & Audit Table
CREATE TABLE IF NOT EXISTS enquiry_activities (
  id VARCHAR(64) PRIMARY KEY,
  enquiry_id VARCHAR(64) REFERENCES enquiries(id) ON DELETE CASCADE,
  author VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL, -- 'status_change', 'note', 'whatsapp', 'call', 'quote', 'created'
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Indexes for Ultra-Fast CRM Searching and Filtering
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_source ON enquiries(source);
CREATE INDEX IF NOT EXISTS idx_enquiries_phone ON enquiries(phone);
CREATE INDEX IF NOT EXISTS idx_enquiries_ref ON enquiries(reference_code);
CREATE INDEX IF NOT EXISTS idx_enquiries_created ON enquiries(created_at DESC);
