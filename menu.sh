#!/bin/bash
# 🔥 El Fuego del Conocimiento Real - Menu Launcher (Unix/Linux/macOS/Termux)

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Change to the script directory
cd "$SCRIPT_DIR" || {
    echo -e "${RED}Error: Could not change to script directory${NC}"
    exit 1
}

# Check if Python is available
if command -v python3 &> /dev/null; then
    PYTHON_CMD="python3"
elif command -v python &> /dev/null; then
    PYTHON_CMD="python"
else
    echo -e "${RED}Error: Python is not installed${NC}"
    echo -e "${YELLOW}Please install Python 3.7 or higher to use this menu${NC}"
    exit 1
fi

# Check Python version
PYTHON_VERSION=$($PYTHON_CMD --version 2>&1 | awk '{print $2}')
MAJOR_VERSION=$(echo "$PYTHON_VERSION" | cut -d. -f1)
MINOR_VERSION=$(echo "$PYTHON_VERSION" | cut -d. -f2)

if (( MAJOR_VERSION < 3 )) || (( MAJOR_VERSION == 3 && MINOR_VERSION < 7 )); then
    echo -e "${RED}Error: Python 3.7 or higher is required${NC}"
    echo -e "${YELLOW}Current version: $PYTHON_VERSION${NC}"
    exit 1
fi

# Make menu.py executable if it isn't already
if [ -f "menu.py" ]; then
    chmod +x menu.py 2>/dev/null || true
fi

# Run the menu
echo -e "${GREEN}🔥 Starting El Fuego del Conocimiento Real Menu...${NC}"
echo ""

exec $PYTHON_CMD menu.py "$@"
