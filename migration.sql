-- PIYUSH RAVAL PORTFOLIO: SKILLS & TESTIMONIALS MIGRATION
-- Copy and run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/_/sql)

-- 1. Create Skills Table
CREATE TABLE IF NOT EXISTS skills (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    level INTEGER NOT NULL CHECK (level >= 0 AND level <= 100),
    category TEXT NOT NULL CHECK (category IN ('frontend', 'backend', 'tools')),
    icon TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    image TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Migrate Current Skills Data
INSERT INTO skills (name, level, category, icon) VALUES
('HTML5', 95, 'frontend', 'html'),
('CSS3', 90, 'frontend', 'css'),
('Tailwindcss', 85, 'frontend', 'tailwind'),
('JavaScript', 90, 'frontend', 'javascript'),
('React', 90, 'frontend', 'react'),
('Next.js', 75, 'frontend', 'nextjs'),
('Node.js', 90, 'backend', 'nodejs'),
('Express', 85, 'backend', 'express'),
('MongoDB', 90, 'backend', 'mongodb'),
('Git', 90, 'tools', 'git'),
('GitHub', 90, 'tools', 'github'),
('VS Code', 95, 'tools', 'vscode'),
('Cleark', 90, 'tools', 'cleark'),
('SQL', 90, 'tools', 'sql'),
('MySQL', 90, 'tools', 'mysql')
ON CONFLICT DO NOTHING;

-- 4. Migrate Current Testimonials Data
INSERT INTO testimonials (name, role, content, rating, image) VALUES
('Alex Johnson', 'Product Director at TechCorp', 'Working with Piyush was seamless from day one. Not only did they deliver a full-stack solution ahead of schedule, but they also communicated clearly throughout the project. It''s rare to find a developer who understands both the tech and the business side so well', 5, '/testimonials/alex-johnson.png'),
('Maria Chen', 'Senior UX Designer at DesignHub', 'I''ve reviewed hundreds of portfolios, and his work is truly exceptional. Tway the animations guide attention while maintaining performance is masterful. The gradient elements add depth without overwhelming.', 5, '/testimonials/maria-chen.png'),
('David Wilson', 'CTO at Startup Ventures', 'From wireframes to deployment, Piyush owned the entire stack with confidence and creativity. The final product is fast, reliable, and looks incredible. I wouldn''t hesitate to work with them again.', 5, '/testimonials/David Wilson.png')
ON CONFLICT DO NOTHING;
