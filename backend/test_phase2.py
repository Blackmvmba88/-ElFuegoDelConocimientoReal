"""
Test script for backend services - demonstrating Phase 2 functionality.
"""
import sys
import json
from pathlib import Path

# Add backend to path
backend_path = Path(__file__).parent
sys.path.insert(0, str(backend_path))

from app.services.semantic_analysis.analyzer import get_semantic_analyzer


def test_semantic_analysis():
    """Test hermetic symbol detection and analysis."""
    print("=" * 70)
    print("🔥 Testing Semantic Analysis Service")
    print("=" * 70)
    
    analyzer = get_semantic_analyzer()
    
    # Sample hermetic text
    test_text = """
    The philosopher's stone represents the perfect union of mercury, sulfur, and salt.
    Through the process of alchemical transformation, the prima materia is purified
    by the sacred fire, ascending through the elemental stages from earth to ether.
    The all-seeing eye watches over the work, as the serpent consumes its own tail
    in the eternal ouroboros of creation and destruction.
    The Tree of Life connects Kether, the Crown, to Malkuth, the Kingdom,
    through the sacred geometry of the cosmos. The tetragrammaton YHWH
    represents the divine name, while the square and compass teach
    the lessons of the master mason.
    """
    
    print("\n📖 Sample Text:")
    print("-" * 70)
    print(test_text.strip())
    print()
    
    # Perform analysis
    print("\n🔍 Analyzing text...")
    results = analyzer.analyze_text(text=test_text)
    
    # Display results
    print("\n" + "=" * 70)
    print("📊 Analysis Results")
    print("=" * 70)
    
    # Hermetic symbols
    print("\n🔮 Hermetic Symbols Detected:")
    print("-" * 70)
    if results.get("hermetic_symbols"):
        for symbol in results["hermetic_symbols"]:
            print(f"  • {symbol['symbol']:20} [{symbol['category']}] - Count: {symbol['count']}")
    else:
        print("  No symbols detected")
    
    # Elemental energy
    print("\n⚡ Elemental Energy Distribution:")
    print("-" * 70)
    if results.get("elemental_energy"):
        for element, value in sorted(
            results["elemental_energy"].items(),
            key=lambda x: x[1],
            reverse=True
        ):
            bar = "█" * int(value * 50)
            print(f"  {element:8} {value:.3f} {bar}")
    
    # Correspondences
    print("\n🌟 Hermetic Correspondences:")
    print("-" * 70)
    if results.get("correspondences"):
        for corr in results["correspondences"]:
            print(f"  • {corr['symbol']:15} → {', '.join(corr['correspondences'])}")
    else:
        print("  No correspondences found")
    
    # Summary
    print("\n📝 Summary:")
    print("-" * 70)
    print(f"  {results.get('summary', 'No summary available')}")
    
    print("\n" + "=" * 70)
    print("✅ Test completed successfully!")
    print("=" * 70)
    
    return results


def test_database_connection():
    """Test database connection."""
    print("\n" + "=" * 70)
    print("🗄️  Testing Database Connection")
    print("=" * 70)
    
    try:
        from app.db.session import engine
        from sqlalchemy import text
        
        with engine.connect() as conn:
            result = conn.execute(text("SELECT 1"))
            print("✅ Database connection successful!")
            
            # Check tables
            result = conn.execute(text(
                "SELECT table_name FROM information_schema.tables "
                "WHERE table_schema = 'public'"
            ))
            tables = [row[0] for row in result]
            print(f"\n📋 Tables created ({len(tables)}):")
            for table in sorted(tables):
                print(f"  • {table}")
        
        return True
    except Exception as e:
        print(f"❌ Database connection failed: {e}")
        return False


def main():
    """Run all tests."""
    print("\n" + "=" * 70)
    print("🔥 EL FUEGO DEL CONOCIMIENTO REAL - PHASE 2 TESTS")
    print("=" * 70)
    
    # Test semantic analysis
    test_semantic_analysis()
    
    # Test database
    test_database_connection()
    
    print("\n" + "=" * 70)
    print("🎉 All tests completed!")
    print("=" * 70)
    print("\n💡 Next steps:")
    print("  1. Start the backend: uvicorn app.main:app --reload")
    print("  2. Visit API docs: http://localhost:8000/docs")
    print("  3. Test semantic endpoint: POST /api/semantic/analyze")
    print("  4. Search books: POST /api/search/search")
    print("  5. Ingest books: POST /api/ingest/gutenberg/{id}")
    print()


if __name__ == "__main__":
    main()
