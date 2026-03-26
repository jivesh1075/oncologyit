-- OncologyIT Platform Schema
-- Target: Neon PostgreSQL
-- Run: psql $DATABASE_URL < schema.sql

-- ─── USERS ───
CREATE TABLE IF NOT EXISTS users (
  id            SERIAL PRIMARY KEY,
  email         VARCHAR(255) UNIQUE NOT NULL,
  name          VARCHAR(255),
  password_hash VARCHAR(255),           -- bcrypt hash
  role          VARCHAR(20) DEFAULT 'user',  -- 'user' | 'admin'
  stripe_customer_id VARCHAR(255),
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_stripe ON users(stripe_customer_id);

-- ─── COURSE PURCHASES ───
CREATE TABLE IF NOT EXISTS course_purchases (
  id                SERIAL PRIMARY KEY,
  user_id           INTEGER REFERENCES users(id) ON DELETE CASCADE,
  course_id         VARCHAR(100) NOT NULL,   -- e.g. 'ai-foundations'
  stripe_session_id VARCHAR(255),
  stripe_payment_id VARCHAR(255),
  amount_cents      INTEGER,
  status            VARCHAR(20) DEFAULT 'active',  -- 'active' | 'refunded'
  purchased_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_purchases_user ON course_purchases(user_id);

-- ─── COURSE PROGRESS ───
CREATE TABLE IF NOT EXISTS course_progress (
  id          SERIAL PRIMARY KEY,
  user_id     INTEGER REFERENCES users(id) ON DELETE CASCADE,
  course_id   VARCHAR(100) NOT NULL,
  module_id   VARCHAR(100) NOT NULL,
  completed   BOOLEAN DEFAULT FALSE,
  score       INTEGER,                   -- quiz score (percentage)
  completed_at TIMESTAMPTZ,
  UNIQUE(user_id, course_id, module_id)
);

CREATE INDEX idx_progress_user_course ON course_progress(user_id, course_id);

-- ─── CERTIFICATES ───
CREATE TABLE IF NOT EXISTS certificates (
  id              SERIAL PRIMARY KEY,
  user_id         INTEGER REFERENCES users(id) ON DELETE CASCADE,
  course_id       VARCHAR(100) NOT NULL,
  certificate_id  VARCHAR(36) UNIQUE NOT NULL,  -- UUID for verification
  name_on_cert    VARCHAR(255) NOT NULL,
  overall_score   INTEGER NOT NULL,
  issued_at       TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, course_id)
);

CREATE INDEX idx_certs_verify ON certificates(certificate_id);

-- ─── NEWSLETTER SUBSCRIBERS ───
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id              SERIAL PRIMARY KEY,
  email           VARCHAR(255) UNIQUE NOT NULL,
  name            VARCHAR(255),
  status          VARCHAR(20) DEFAULT 'active',  -- 'active' | 'unsubscribed' | 'bounced'
  source          VARCHAR(50),                    -- 'website' | 'course' | 'import'
  subscribed_at   TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ
);

CREATE INDEX idx_subs_status ON newsletter_subscribers(status);

-- ─── NEWSLETTER ISSUES ───
CREATE TABLE IF NOT EXISTS newsletter_issues (
  id            SERIAL PRIMARY KEY,
  subject       VARCHAR(500) NOT NULL,
  preview_text  VARCHAR(500),
  html_content  TEXT NOT NULL,
  markdown_src  TEXT,                       -- original markdown from bot
  status        VARCHAR(20) DEFAULT 'draft', -- 'draft' | 'scheduled' | 'sent'
  scheduled_for TIMESTAMPTZ,
  sent_at       TIMESTAMPTZ,
  send_count    INTEGER DEFAULT 0,
  open_count    INTEGER DEFAULT 0,
  click_count   INTEGER DEFAULT 0,
  created_by    VARCHAR(50),                -- 'alfred' | 'jarvis' | 'manual'
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ─── SITE ANALYTICS (lightweight) ───
CREATE TABLE IF NOT EXISTS page_views (
  id          SERIAL PRIMARY KEY,
  path        VARCHAR(500) NOT NULL,
  referrer    VARCHAR(500),
  user_agent  VARCHAR(500),
  country     VARCHAR(10),
  viewed_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_views_path ON page_views(path);
CREATE INDEX idx_views_date ON page_views(viewed_at);

-- ─── BOT ACTIVITY LOG ───
CREATE TABLE IF NOT EXISTS bot_activity (
  id          SERIAL PRIMARY KEY,
  bot_name    VARCHAR(50) NOT NULL,       -- 'alfred' | 'jarvis'
  action      VARCHAR(100) NOT NULL,       -- 'publish_article' | 'generate_newsletter' | etc.
  details     JSONB,
  status      VARCHAR(20) DEFAULT 'success',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_bot_activity_date ON bot_activity(created_at);
