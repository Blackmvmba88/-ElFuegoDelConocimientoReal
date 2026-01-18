#!/usr/bin/env python3
"""
🔥 El Fuego del Conocimiento Real - Terminal Menu
Cross-platform interactive menu for Termux, Windows, Linux, macOS

This menu provides easy access to all project operations through a
terminal-based user interface (TUI).
"""

import os
import sys
import platform
import subprocess
import shutil
from typing import Optional, List, Tuple


class Colors:
    """ANSI color codes for terminal output"""
    # Check if terminal supports colors
    ENABLED = sys.stdout.isatty() and os.getenv('TERM') != 'dumb'
    
    if ENABLED:
        HEADER = '\033[95m'
        BLUE = '\033[94m'
        CYAN = '\033[96m'
        GREEN = '\033[92m'
        YELLOW = '\033[93m'
        RED = '\033[91m'
        ENDC = '\033[0m'
        BOLD = '\033[1m'
        UNDERLINE = '\033[4m'
        FIRE = '\033[91m🔥\033[0m'
    else:
        HEADER = BLUE = CYAN = GREEN = YELLOW = RED = ENDC = BOLD = UNDERLINE = ''
        FIRE = '🔥'


class PlatformAdapter:
    """Adapts commands for different platforms"""
    
    def __init__(self):
        self.system = platform.system().lower()
        self.is_termux = self._detect_termux()
        self.shell = self._detect_shell()
        
    def _detect_termux(self) -> bool:
        """Detect if running in Termux"""
        return os.path.exists('/data/data/com.termux') or \
               os.getenv('TERMUX_VERSION') is not None
    
    def _detect_shell(self) -> str:
        """Detect the appropriate shell to use"""
        if self.system == 'windows':
            # Check for PowerShell or cmd
            if shutil.which('powershell'):
                return 'powershell'
            return 'cmd'
        return 'bash'
    
    def get_clear_command(self) -> str:
        """Get platform-specific clear screen command"""
        if self.system == 'windows':
            return 'cls'
        return 'clear'
    
    def get_npm_command(self) -> str:
        """Get npm command (might be npm.cmd on Windows)"""
        if self.system == 'windows':
            return 'npm.cmd' if shutil.which('npm.cmd') else 'npm'
        return 'npm'
    
    def get_python_command(self) -> str:
        """Get Python command"""
        # Try python3 first, then python
        if shutil.which('python3'):
            return 'python3'
        elif shutil.which('python'):
            return 'python'
        return 'python3'
    
    def check_docker(self) -> bool:
        """Check if Docker is available"""
        return shutil.which('docker') is not None
    
    def check_docker_compose(self) -> str:
        """Check which docker-compose command is available"""
        if shutil.which('docker-compose'):
            return 'docker-compose'
        elif shutil.which('docker') and self._check_docker_compose_plugin():
            return 'docker compose'
        return ''
    
    def _check_docker_compose_plugin(self) -> bool:
        """Check if docker compose plugin is available"""
        try:
            result = subprocess.run(
                ['docker', 'compose', 'version'],
                capture_output=True,
                timeout=5
            )
            return result.returncode == 0
        except:
            return False


class Menu:
    """Interactive terminal menu for El Fuego del Conocimiento Real"""
    
    def __init__(self):
        self.adapter = PlatformAdapter()
        self.running = True
        self.root_dir = os.path.dirname(os.path.abspath(__file__))
        
    def clear_screen(self):
        """Clear the terminal screen"""
        os.system(self.adapter.get_clear_command())
    
    def print_header(self):
        """Print the menu header"""
        print(f"\n{Colors.BOLD}{Colors.FIRE}{'=' * 60}{Colors.ENDC}")
        print(f"{Colors.BOLD}{Colors.HEADER}  El Fuego del Conocimiento Real - Menu Principal{Colors.ENDC}")
        print(f"{Colors.BOLD}{Colors.CYAN}  Grado 33 - Constructor del Universo Interior{Colors.ENDC}")
        print(f"{Colors.BOLD}{Colors.FIRE}{'=' * 60}{Colors.ENDC}\n")
        
        # Show platform info
        platform_info = f"{self.adapter.system.title()}"
        if self.adapter.is_termux:
            platform_info += " (Termux)"
        print(f"{Colors.CYAN}Platform: {Colors.ENDC}{platform_info}")
        print(f"{Colors.CYAN}Shell: {Colors.ENDC}{self.adapter.shell}\n")
    
    def print_menu_options(self):
        """Print menu options"""
        options = [
            ("1", "🚀 Start Frontend", "Launch Next.js development server"),
            ("2", "⚙️  Start Backend", "Launch FastAPI backend with Docker"),
            ("3", "🔥 Start Full Stack", "Start both Frontend and Backend"),
            ("4", "🧪 Run Tests", "Execute test suite"),
            ("5", "💚 Check System Health", "Verify all services and dependencies"),
            ("6", "📚 View Documentation", "Open documentation in browser"),
            ("7", "🛠️  Development Tools", "Additional development utilities"),
            ("8", "ℹ️  System Information", "Show detailed system info"),
            ("0", "🚪 Exit", "Close the menu"),
        ]
        
        print(f"{Colors.BOLD}Options:{Colors.ENDC}\n")
        for key, title, desc in options:
            print(f"  {Colors.BOLD}{Colors.GREEN}[{key}]{Colors.ENDC} {Colors.BOLD}{title}{Colors.ENDC}")
            print(f"      {Colors.CYAN}{desc}{Colors.ENDC}")
        print()
    
    def get_user_input(self, prompt: str = "Select option") -> str:
        """Get user input with colored prompt"""
        return input(f"{Colors.BOLD}{Colors.YELLOW}{prompt}: {Colors.ENDC}").strip()
    
    def run_command(self, command: str, cwd: Optional[str] = None, shell: bool = True) -> int:
        """Run a command and return exit code"""
        try:
            print(f"\n{Colors.CYAN}Executing: {Colors.ENDC}{command}\n")
            
            process_cwd = cwd if cwd else self.root_dir
            
            if self.adapter.system == 'windows':
                # On Windows, use shell=True for better compatibility
                result = subprocess.run(
                    command,
                    shell=True,
                    cwd=process_cwd
                )
            else:
                # On Unix-like systems, use bash
                result = subprocess.run(
                    command,
                    shell=True,
                    cwd=process_cwd,
                    executable='/bin/bash' if not self.adapter.is_termux else None
                )
            
            return result.returncode
        except KeyboardInterrupt:
            print(f"\n{Colors.YELLOW}Command interrupted by user{Colors.ENDC}")
            return 130
        except Exception as e:
            print(f"\n{Colors.RED}Error executing command: {e}{Colors.ENDC}")
            return 1
    
    def wait_for_user(self):
        """Wait for user to press enter"""
        input(f"\n{Colors.YELLOW}Press Enter to continue...{Colors.ENDC}")
    
    def start_frontend(self):
        """Start the Next.js frontend"""
        self.clear_screen()
        print(f"{Colors.BOLD}{Colors.HEADER}🚀 Starting Frontend (Next.js){Colors.ENDC}\n")
        
        npm_cmd = self.adapter.get_npm_command()
        
        # Check if node_modules exists
        if not os.path.exists(os.path.join(self.root_dir, 'node_modules')):
            print(f"{Colors.YELLOW}Installing dependencies first...{Colors.ENDC}\n")
            self.run_command(f"{npm_cmd} install")
        
        print(f"\n{Colors.GREEN}Starting development server on http://localhost:3000{Colors.ENDC}\n")
        print(f"{Colors.YELLOW}Press Ctrl+C to stop the server{Colors.ENDC}\n")
        
        self.run_command(f"{npm_cmd} run dev")
        self.wait_for_user()
    
    def start_backend(self):
        """Start the FastAPI backend"""
        self.clear_screen()
        print(f"{Colors.BOLD}{Colors.HEADER}⚙️  Starting Backend (FastAPI){Colors.ENDC}\n")
        
        backend_dir = os.path.join(self.root_dir, 'backend')
        
        if not os.path.exists(backend_dir):
            print(f"{Colors.RED}Backend directory not found!{Colors.ENDC}")
            self.wait_for_user()
            return
        
        docker_compose = self.adapter.check_docker_compose()
        
        if docker_compose:
            print(f"{Colors.GREEN}Using Docker Compose{Colors.ENDC}\n")
            print(f"{Colors.YELLOW}Press Ctrl+C to stop the services{Colors.ENDC}\n")
            self.run_command(f"{docker_compose} up", cwd=backend_dir)
        else:
            print(f"{Colors.YELLOW}Docker Compose not found. Starting backend with uvicorn...{Colors.ENDC}\n")
            python_cmd = self.adapter.get_python_command()
            
            # Check if virtual environment should be created
            venv_path = os.path.join(backend_dir, 'venv')
            if not os.path.exists(venv_path):
                print(f"{Colors.CYAN}Creating virtual environment...{Colors.ENDC}\n")
                self.run_command(f"{python_cmd} -m venv venv", cwd=backend_dir)
            
            # Activate venv and install requirements
            if self.adapter.system == 'windows':
                activate_cmd = '.\\venv\\Scripts\\activate'
                pip_cmd = '.\\venv\\Scripts\\pip'
                python_cmd = '.\\venv\\Scripts\\python'
            else:
                activate_cmd = 'source venv/bin/activate'
                pip_cmd = './venv/bin/pip'
                python_cmd = './venv/bin/python'
            
            # Install dependencies
            print(f"{Colors.CYAN}Installing dependencies...{Colors.ENDC}\n")
            self.run_command(f"{pip_cmd} install -r requirements.txt", cwd=backend_dir)
            
            # Start server
            print(f"\n{Colors.GREEN}Starting FastAPI server on http://localhost:8000{Colors.ENDC}\n")
            self.run_command(f"{python_cmd} -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000", cwd=backend_dir)
        
        self.wait_for_user()
    
    def start_fullstack(self):
        """Start both frontend and backend"""
        self.clear_screen()
        print(f"{Colors.BOLD}{Colors.HEADER}🔥 Starting Full Stack{Colors.ENDC}\n")
        
        print(f"{Colors.YELLOW}This will start both frontend and backend.{Colors.ENDC}")
        print(f"{Colors.YELLOW}You'll need to open separate terminals for each service.{Colors.ENDC}\n")
        print(f"{Colors.CYAN}Recommended approach:{Colors.ENDC}")
        print(f"  1. Run this menu in one terminal and select option 2 (Backend)")
        print(f"  2. Open another terminal and run this menu, select option 1 (Frontend)\n")
        
        print(f"{Colors.CYAN}Alternative: Use tmux or screen to manage multiple sessions{Colors.ENDC}\n")
        
        self.wait_for_user()
    
    def run_tests(self):
        """Run test suite"""
        self.clear_screen()
        print(f"{Colors.BOLD}{Colors.HEADER}🧪 Running Tests{Colors.ENDC}\n")
        
        npm_cmd = self.adapter.get_npm_command()
        
        print(f"{Colors.CYAN}Running Frontend Tests...{Colors.ENDC}\n")
        frontend_result = self.run_command(f"{npm_cmd} test")
        
        print(f"\n{Colors.CYAN}Running Backend Tests...{Colors.ENDC}\n")
        backend_dir = os.path.join(self.root_dir, 'backend')
        if os.path.exists(backend_dir):
            python_cmd = self.adapter.get_python_command()
            backend_result = self.run_command(f"{python_cmd} -m pytest", cwd=backend_dir)
        else:
            print(f"{Colors.YELLOW}Backend directory not found, skipping backend tests{Colors.ENDC}")
            backend_result = 0
        
        print(f"\n{Colors.BOLD}Test Results:{Colors.ENDC}")
        if frontend_result == 0:
            print(f"{Colors.GREEN}✓ Frontend tests passed{Colors.ENDC}")
        else:
            print(f"{Colors.RED}✗ Frontend tests failed{Colors.ENDC}")
        
        if backend_result == 0:
            print(f"{Colors.GREEN}✓ Backend tests passed{Colors.ENDC}")
        else:
            print(f"{Colors.RED}✗ Backend tests failed{Colors.ENDC}")
        
        self.wait_for_user()
    
    def check_health(self):
        """Check system health and dependencies"""
        self.clear_screen()
        print(f"{Colors.BOLD}{Colors.HEADER}💚 System Health Check{Colors.ENDC}\n")
        
        checks = [
            ("Node.js", shutil.which('node')),
            ("npm", shutil.which(self.adapter.get_npm_command())),
            ("Python", shutil.which(self.adapter.get_python_command())),
            ("Docker", shutil.which('docker')),
            ("Docker Compose", bool(self.adapter.check_docker_compose())),
            ("Git", shutil.which('git')),
        ]
        
        print(f"{Colors.BOLD}Dependencies:{Colors.ENDC}\n")
        
        all_ok = True
        for name, available in checks:
            status = f"{Colors.GREEN}✓ Installed{Colors.ENDC}" if available else f"{Colors.RED}✗ Not found{Colors.ENDC}"
            print(f"  {name:20} {status}")
            if not available and name in ["Node.js", "npm", "Python"]:
                all_ok = False
        
        print(f"\n{Colors.BOLD}Project Structure:{Colors.ENDC}\n")
        
        structure_checks = [
            ("Frontend (package.json)", os.path.exists(os.path.join(self.root_dir, 'package.json'))),
            ("Backend (requirements.txt)", os.path.exists(os.path.join(self.root_dir, 'backend', 'requirements.txt'))),
            ("Node modules", os.path.exists(os.path.join(self.root_dir, 'node_modules'))),
            ("Next.js config", os.path.exists(os.path.join(self.root_dir, 'next.config.js'))),
        ]
        
        for name, exists in structure_checks:
            status = f"{Colors.GREEN}✓ Found{Colors.ENDC}" if exists else f"{Colors.YELLOW}⚠ Missing{Colors.ENDC}"
            print(f"  {name:30} {status}")
        
        print(f"\n{Colors.BOLD}Overall Status:{Colors.ENDC}")
        if all_ok:
            print(f"{Colors.GREEN}✓ System is ready for development!{Colors.ENDC}")
        else:
            print(f"{Colors.RED}⚠ Some dependencies are missing. Please install them.{Colors.ENDC}")
        
        self.wait_for_user()
    
    def view_documentation(self):
        """View documentation"""
        self.clear_screen()
        print(f"{Colors.BOLD}{Colors.HEADER}📚 Documentation{Colors.ENDC}\n")
        
        docs = [
            ("README.md", "Main project overview"),
            ("SETUP.md", "Setup and installation guide"),
            ("QUICKSTART.md", "Quick start guide"),
            ("ROADMAP.md", "Project roadmap"),
            ("CONTRIBUTING.md", "Contribution guidelines"),
        ]
        
        print(f"{Colors.CYAN}Available Documentation:{Colors.ENDC}\n")
        
        for filename, description in docs:
            filepath = os.path.join(self.root_dir, filename)
            exists = os.path.exists(filepath)
            status = f"{Colors.GREEN}✓{Colors.ENDC}" if exists else f"{Colors.RED}✗{Colors.ENDC}"
            print(f"  {status} {Colors.BOLD}{filename}{Colors.ENDC}")
            print(f"     {Colors.CYAN}{description}{Colors.ENDC}\n")
        
        print(f"\n{Colors.YELLOW}Tip: You can read these files with 'cat' or 'less' command{Colors.ENDC}")
        print(f"{Colors.YELLOW}API Documentation: http://localhost:8000/docs (when backend is running){Colors.ENDC}")
        
        self.wait_for_user()
    
    def development_tools(self):
        """Show development tools submenu"""
        while True:
            self.clear_screen()
            print(f"{Colors.BOLD}{Colors.HEADER}🛠️  Development Tools{Colors.ENDC}\n")
            
            tools = [
                ("1", "Install Dependencies", "Install all project dependencies"),
                ("2", "Build Frontend", "Build Next.js for production"),
                ("3", "Lint Code", "Run ESLint on the codebase"),
                ("4", "Format Code", "Format code with Prettier"),
                ("5", "Clean Build", "Remove build artifacts and cache"),
                ("0", "Back to Main Menu", "Return to main menu"),
            ]
            
            for key, title, desc in tools:
                print(f"  {Colors.BOLD}{Colors.GREEN}[{key}]{Colors.ENDC} {Colors.BOLD}{title}{Colors.ENDC}")
                print(f"      {Colors.CYAN}{desc}{Colors.ENDC}")
            
            print()
            choice = self.get_user_input("Select tool")
            
            if choice == "1":
                self.install_dependencies()
            elif choice == "2":
                self.build_frontend()
            elif choice == "3":
                self.lint_code()
            elif choice == "4":
                self.format_code()
            elif choice == "5":
                self.clean_build()
            elif choice == "0":
                break
            else:
                print(f"{Colors.RED}Invalid option{Colors.ENDC}")
                self.wait_for_user()
    
    def install_dependencies(self):
        """Install all dependencies"""
        self.clear_screen()
        print(f"{Colors.BOLD}{Colors.HEADER}📦 Installing Dependencies{Colors.ENDC}\n")
        
        npm_cmd = self.adapter.get_npm_command()
        
        print(f"{Colors.CYAN}Installing Frontend dependencies...{Colors.ENDC}\n")
        self.run_command(f"{npm_cmd} install")
        
        backend_dir = os.path.join(self.root_dir, 'backend')
        if os.path.exists(backend_dir):
            print(f"\n{Colors.CYAN}Installing Backend dependencies...{Colors.ENDC}\n")
            python_cmd = self.adapter.get_python_command()
            self.run_command(f"{python_cmd} -m pip install -r requirements.txt", cwd=backend_dir)
        
        self.wait_for_user()
    
    def build_frontend(self):
        """Build frontend for production"""
        self.clear_screen()
        print(f"{Colors.BOLD}{Colors.HEADER}🏗️  Building Frontend{Colors.ENDC}\n")
        
        npm_cmd = self.adapter.get_npm_command()
        result = self.run_command(f"{npm_cmd} run build")
        
        if result == 0:
            print(f"\n{Colors.GREEN}✓ Build successful!{Colors.ENDC}")
        else:
            print(f"\n{Colors.RED}✗ Build failed{Colors.ENDC}")
        
        self.wait_for_user()
    
    def lint_code(self):
        """Run linter"""
        self.clear_screen()
        print(f"{Colors.BOLD}{Colors.HEADER}🔍 Linting Code{Colors.ENDC}\n")
        
        npm_cmd = self.adapter.get_npm_command()
        self.run_command(f"{npm_cmd} run lint")
        
        self.wait_for_user()
    
    def format_code(self):
        """Format code"""
        self.clear_screen()
        print(f"{Colors.BOLD}{Colors.HEADER}✨ Formatting Code{Colors.ENDC}\n")
        
        print(f"{Colors.YELLOW}Note: Add Prettier to your project if not already installed{Colors.ENDC}\n")
        npm_cmd = self.adapter.get_npm_command()
        self.run_command(f"{npm_cmd} run format")
        
        self.wait_for_user()
    
    def clean_build(self):
        """Clean build artifacts"""
        self.clear_screen()
        print(f"{Colors.BOLD}{Colors.HEADER}🧹 Cleaning Build Artifacts{Colors.ENDC}\n")
        
        paths_to_clean = [
            '.next',
            'out',
            'node_modules/.cache',
            'backend/__pycache__',
            'backend/.pytest_cache',
        ]
        
        for path in paths_to_clean:
            full_path = os.path.join(self.root_dir, path)
            if os.path.exists(full_path):
                print(f"{Colors.CYAN}Removing {path}...{Colors.ENDC}")
                if os.path.isdir(full_path):
                    import shutil
                    shutil.rmtree(full_path)
                else:
                    os.remove(full_path)
                print(f"{Colors.GREEN}✓ Removed{Colors.ENDC}")
            else:
                print(f"{Colors.YELLOW}⚠ {path} not found{Colors.ENDC}")
        
        print(f"\n{Colors.GREEN}✓ Cleanup complete{Colors.ENDC}")
        self.wait_for_user()
    
    def system_info(self):
        """Show detailed system information"""
        self.clear_screen()
        print(f"{Colors.BOLD}{Colors.HEADER}ℹ️  System Information{Colors.ENDC}\n")
        
        print(f"{Colors.BOLD}Platform:{Colors.ENDC}")
        print(f"  OS: {platform.system()} {platform.release()}")
        print(f"  Architecture: {platform.machine()}")
        print(f"  Python: {platform.python_version()}")
        if self.adapter.is_termux:
            print(f"  Environment: Termux")
        
        print(f"\n{Colors.BOLD}Versions:{Colors.ENDC}")
        
        # Check Node version
        try:
            node_result = subprocess.run(['node', '--version'], capture_output=True, text=True, timeout=5)
            print(f"  Node.js: {node_result.stdout.strip()}")
        except:
            print(f"  Node.js: Not available")
        
        # Check npm version
        npm_cmd = self.adapter.get_npm_command()
        try:
            npm_result = subprocess.run([npm_cmd, '--version'], capture_output=True, text=True, timeout=5)
            print(f"  npm: {npm_result.stdout.strip()}")
        except:
            print(f"  npm: Not available")
        
        # Check Docker version
        try:
            docker_result = subprocess.run(['docker', '--version'], capture_output=True, text=True, timeout=5)
            print(f"  Docker: {docker_result.stdout.strip()}")
        except:
            print(f"  Docker: Not available")
        
        print(f"\n{Colors.BOLD}Paths:{Colors.ENDC}")
        print(f"  Project Root: {self.root_dir}")
        print(f"  Working Directory: {os.getcwd()}")
        
        self.wait_for_user()
    
    def run(self):
        """Main menu loop"""
        while self.running:
            self.clear_screen()
            self.print_header()
            self.print_menu_options()
            
            choice = self.get_user_input()
            
            if choice == "1":
                self.start_frontend()
            elif choice == "2":
                self.start_backend()
            elif choice == "3":
                self.start_fullstack()
            elif choice == "4":
                self.run_tests()
            elif choice == "5":
                self.check_health()
            elif choice == "6":
                self.view_documentation()
            elif choice == "7":
                self.development_tools()
            elif choice == "8":
                self.system_info()
            elif choice == "0":
                self.clear_screen()
                print(f"\n{Colors.BOLD}{Colors.FIRE} Gracias por usar El Fuego del Conocimiento Real {Colors.FIRE}{Colors.ENDC}")
                print(f"{Colors.CYAN}¡Que el fuego del conocimiento ilumine tu camino!{Colors.ENDC}\n")
                self.running = False
            else:
                print(f"{Colors.RED}Invalid option. Please try again.{Colors.ENDC}")
                self.wait_for_user()


def main():
    """Main entry point"""
    try:
        menu = Menu()
        menu.run()
    except KeyboardInterrupt:
        print(f"\n\n{Colors.YELLOW}Menu closed by user{Colors.ENDC}")
        sys.exit(0)
    except Exception as e:
        print(f"\n{Colors.RED}Error: {e}{Colors.ENDC}")
        sys.exit(1)


if __name__ == "__main__":
    main()
