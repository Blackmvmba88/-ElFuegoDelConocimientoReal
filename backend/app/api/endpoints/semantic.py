"""
Semantic analysis endpoints for hermetic text analysis.
"""
from fastapi import APIRouter

from app.schemas.schemas import SemanticAnalysisRequest, SemanticAnalysisResponse
from app.services.semantic_analysis.analyzer import get_semantic_analyzer

router = APIRouter()


@router.post("/analyze", response_model=SemanticAnalysisResponse)
async def analyze_text(request: SemanticAnalysisRequest):
    """
    Perform semantic analysis on text to detect hermetic symbols,
    elemental energy, and correspondences.
    """
    analyzer = get_semantic_analyzer()
    
    results = analyzer.analyze_text(
        text=request.text,
        analyze_symbols=request.analyze_symbols,
        analyze_energy=request.analyze_energy,
        analyze_correspondences=request.analyze_correspondences,
    )
    
    return SemanticAnalysisResponse(**results)


@router.get("/symbols")
async def list_symbols():
    """
    List all known hermetic symbols in the database.
    """
    analyzer = get_semantic_analyzer()
    
    return {
        "alchemical": list(analyzer.ALCHEMICAL_SYMBOLS.keys()),
        "masonic": list(analyzer.MASONIC_SYMBOLS.keys()),
        "kabbalistic": list(analyzer.KABBALISTIC_SYMBOLS.keys()),
    }


@router.get("/elements")
async def list_elements():
    """
    List elemental correspondences.
    """
    analyzer = get_semantic_analyzer()
    
    return {
        element: keywords
        for element, keywords in analyzer.ELEMENTAL_KEYWORDS.items()
    }
