#!/bin/bash
# TalentPlus - Complete Installation & Testing Script
# Run: bash install.sh

set -e  # Exit on any error

echo "🚀 TalentPlus Installation & Testing"
echo "===================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Step 1: Check Node.js version
echo "📦 Step 1: Checking Node.js version..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    echo "Please install Node.js 20+ from https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    echo -e "${RED}❌ Node.js version is too old ($NODE_VERSION)${NC}"
    echo "Please upgrade to Node.js 20 or higher"
    exit 1
fi

echo -e "${GREEN}✅ Node.js $(node -v) detected${NC}"
echo ""

# Step 2: Install dependencies
echo "📦 Step 2: Installing dependencies..."
npm install
echo -e "${GREEN}✅ Dependencies installed${NC}"
echo ""

# Step 3: Check environment variables
echo "🔐 Step 3: Checking environment variables..."

if [ ! -f ".env.local" ]; then
    echo -e "${YELLOW}⚠️  .env.local not found${NC}"
    echo "Creating from .env.example..."
    
    if [ -f ".env.example" ]; then
        cp .env.example .env.local
        echo -e "${YELLOW}📝 Please edit .env.local with your API keys${NC}"
        echo "   Required: OPENAI_API_KEY, NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY"
        echo ""
        read -p "Press Enter after you've configured .env.local..."
    else
        echo -e "${RED}❌ .env.example not found${NC}"
        exit 1
    fi
fi

# Verify required keys exist
MISSING_KEYS=()

if ! grep -q "OPENAI_API_KEY=sk-" .env.local; then
    MISSING_KEYS+=("OPENAI_API_KEY")
fi

if ! grep -q "NEXT_PUBLIC_SUPABASE_URL=https://" .env.local; then
    MISSING_KEYS+=("NEXT_PUBLIC_SUPABASE_URL")
fi

if ! grep -q "NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ" .env.local; then
    MISSING_KEYS+=("NEXT_PUBLIC_SUPABASE_ANON_KEY")
fi

if [ ${#MISSING_KEYS[@]} -gt 0 ]; then
    echo -e "${RED}❌ Missing or invalid API keys:${NC}"
    for key in "${MISSING_KEYS[@]}"; do
        echo "   - $key"
    done
    echo ""
    echo "Please configure these in .env.local and run the script again"
    exit 1
fi

echo -e "${GREEN}✅ Environment variables configured${NC}"
echo ""

# Step 4: Type check
echo "🔍 Step 4: Running type check..."
if npm run type-check; then
    echo -e "${GREEN}✅ Type check passed${NC}"
else
    echo -e "${RED}❌ Type check failed${NC}"
    echo "Please fix TypeScript errors and run again"
    exit 1
fi
echo ""

# Step 5: Build
echo "🏗️  Step 5: Building application..."
if npm run build; then
    echo -e "${GREEN}✅ Build successful${NC}"
else
    echo -e "${RED}❌ Build failed${NC}"
    exit 1
fi
echo ""

# Step 6: Database check
echo "🗄️  Step 6: Checking database connection..."
echo "Starting server to test database..."

# Start server in background
npm start &
SERVER_PID=$!
sleep 5

# Test database endpoint
if curl -s http://localhost:3000/api/candidates > /dev/null; then
    echo -e "${GREEN}✅ Database connection working${NC}"
else
    echo -e "${RED}❌ Database connection failed${NC}"
    kill $SERVER_PID 2>/dev/null
    exit 1
fi

# Stop server
kill $SERVER_PID 2>/dev/null
echo ""

# Step 7: Summary
echo "========================================"
echo -e "${GREEN}🎉 Installation Complete!${NC}"
echo "========================================"
echo ""
echo "Next steps:"
echo "  1. Ensure your Supabase database has the schema installed"
echo "     (Run database/schema.sql in Supabase SQL Editor)"
echo ""
echo "  2. Start the development server:"
echo "     ${BLUE}npm run dev${NC}"
echo ""
echo "  3. Open http://localhost:3000 in your browser"
echo ""
echo "  4. Upload a test resume in Library"
echo ""
echo "  5. Create a test job match"
echo ""
echo "Optional: Configure Apollo for external search"
echo "  Add APOLLO_API_KEY to .env.local"
echo ""
echo -e "${GREEN}✅ All checks passed - Ready for testing!${NC}"