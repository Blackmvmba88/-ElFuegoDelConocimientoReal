"""
Synthesis endpoints for AI-powered text generation and transformation.
"""
from fastapi import APIRouter, HTTPException

from app.schemas.schemas import SynthesisRequest, SynthesisResponse
from app.services.synthesis.engine import get_synthesis_engine

router = APIRouter()


@router.post("/synthesize", response_model=dict)
async def synthesize_text(request: SynthesisRequest):
    """
    Synthesize new text from source books using AI.
    """
    engine = get_synthesis_engine()
    
    try:
        # TODO: Fetch source texts from database using source_book_ids
        # For now, return a placeholder
        
        if request.synthesis_type == "fusion":
            result = await engine.fuse_texts(
                texts=["Sample text 1", "Sample text 2"],  # TODO: Fetch from DB
                model_preference="openai",
            )
        elif request.synthesis_type == "transformation":
            result = await engine.transform_text(
                text="Sample text",  # TODO: Fetch from DB
                transformation_type=request.prompt or "modernize",
                model_preference="openai",
            )
        elif request.synthesis_type == "generation":
            result = await engine.generate_hermetic_text(
                theme=request.prompt or "wisdom",
                style="alchemical",
                model_preference="openai",
            )
        else:
            raise HTTPException(status_code=400, detail="Invalid synthesis type")
        
        return {
            "content": result,
            "synthesis_type": request.synthesis_type,
            "model_used": request.model or "openai",
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/transform")
async def transform_text(
    text: str,
    transformation_type: str = "modernize",
):
    """
    Transform a single text using AI.
    """
    engine = get_synthesis_engine()
    
    try:
        result = await engine.transform_text(
            text=text,
            transformation_type=transformation_type,
        )
        
        return {
            "original": text,
            "transformed": result,
            "transformation_type": transformation_type,
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/generate")
async def generate_text(
    theme: str,
    style: str = "alchemical",
):
    """
    Generate original hermetic text on a theme.
    """
    engine = get_synthesis_engine()
    
    try:
        result = await engine.generate_hermetic_text(
            theme=theme,
            style=style,
        )
        
        return {
            "content": result,
            "theme": theme,
            "style": style,
        }
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
