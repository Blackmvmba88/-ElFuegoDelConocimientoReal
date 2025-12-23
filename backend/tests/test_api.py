"""
Basic tests for the backend API endpoints.
"""
import pytest
from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_root_endpoint():
    """Test the root endpoint."""
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert "message" in data
    assert "version" in data


def test_health_endpoint():
    """Test the health check endpoint."""
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert "status" in data
    assert "version" in data
    assert "database" in data
    assert "redis" in data
    assert "qdrant" in data


def test_semantic_symbols_endpoint():
    """Test listing hermetic symbols."""
    response = client.get("/api/semantic/symbols")
    assert response.status_code == 200
    data = response.json()
    assert "alchemical" in data
    assert "masonic" in data
    assert "kabbalistic" in data


def test_semantic_elements_endpoint():
    """Test listing elemental correspondences."""
    response = client.get("/api/semantic/elements")
    assert response.status_code == 200
    data = response.json()
    assert "fire" in data
    assert "water" in data
    assert "air" in data
    assert "earth" in data
    assert "ether" in data


@pytest.mark.asyncio
async def test_semantic_analysis():
    """Test semantic analysis of text."""
    test_text = (
        "The alchemist sought the philosopher's stone, "
        "combining mercury, sulfur, and salt in the fire."
    )
    
    response = client.post(
        "/api/semantic/analyze",
        json={
            "text": test_text,
            "analyze_symbols": True,
            "analyze_energy": True,
            "analyze_correspondences": True,
        }
    )
    
    assert response.status_code == 200
    data = response.json()
    assert "hermetic_symbols" in data
    assert "elemental_energy" in data
    assert "correspondences" in data
    assert "summary" in data
    
    # Should detect alchemical symbols
    symbols = data["hermetic_symbols"]
    symbol_names = [s["symbol"] for s in symbols]
    assert "philosopher_stone" in symbol_names or len(symbols) > 0


def test_search_filters_endpoint():
    """Test getting available search filters."""
    response = client.get("/api/search/filters")
    assert response.status_code == 200
    data = response.json()
    assert "authors" in data
    assert "languages" in data
    assert "elements" in data
    assert "symbols" in data
