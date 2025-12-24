"""
Semantic analysis service for hermetic symbol detection and text energy analysis.
"""
from typing import Dict, List, Any, Optional
import re
from collections import Counter


class SemanticAnalyzer:
    """Analyzes text for hermetic symbols, elemental energy, and correspondences."""
    
    # Hermetic symbol patterns
    ALCHEMICAL_SYMBOLS = {
        "mercury": r"\b(mercury|quicksilver|hermes|mercurius)\b",
        "sulfur": r"\b(sulfur|sulphur|soul|spirit)\b",
        "salt": r"\b(salt|body|corpus)\b",
        "gold": r"\b(gold|sun|sol|aurum)\b",
        "silver": r"\b(silver|moon|luna|argentum)\b",
        "philosopher_stone": r"\b(philosopher'?s?\s+stone|lapis\s+philosophorum)\b",
        "prima_materia": r"\b(prima\s+materia|first\s+matter)\b",
        "ouroboros": r"\b(ouroboros|serpent.*tail)\b",
    }
    
    MASONIC_SYMBOLS = {
        "square_compass": r"\b(square\s+and\s+compass|compass\s+and\s+square)\b",
        "all_seeing_eye": r"\b(all[- ]seeing\s+eye|eye\s+of\s+providence)\b",
        "pillars": r"\b(boaz|jachin|pillars?\s+of.*temple)\b",
        "letter_g": r"\b(letter\s+g|geometry|gnosis)\b",
        "degree": r"\b(\d{1,2}°|\d{1,2}\s+degree|entered\s+apprentice|fellow\s+craft|master\s+mason)\b",
    }
    
    KABBALISTIC_SYMBOLS = {
        "tree_of_life": r"\b(tree\s+of\s+life|sephiroth|sefirot)\b",
        "ein_sof": r"\b(ein\s+sof|infinite)\b",
        "kether": r"\b(kether|crown)\b",
        "chokmah": r"\b(chokmah|wisdom)\b",
        "binah": r"\b(binah|understanding)\b",
        "tetragrammaton": r"\b(tetragrammaton|yhwh|yhvh)\b",
        "kabbalah": r"\b(kabbalah|qabalah|cabala)\b",
    }
    
    # Elemental keywords
    ELEMENTAL_KEYWORDS = {
        "fire": ["fire", "flame", "burn", "heat", "passion", "energy", "light", "sun", "transformation"],
        "water": ["water", "flow", "ocean", "river", "emotion", "feeling", "moon", "reflection", "depth"],
        "air": ["air", "wind", "breath", "thought", "mind", "communication", "intellect", "sky"],
        "earth": ["earth", "ground", "solid", "stable", "material", "body", "physical", "foundation"],
        "ether": ["ether", "spirit", "divine", "cosmic", "quintessence", "void", "space", "unity"],
    }
    
    def __init__(self):
        self.all_symbols = {
            "alchemical": self.ALCHEMICAL_SYMBOLS,
            "masonic": self.MASONIC_SYMBOLS,
            "kabbalistic": self.KABBALISTIC_SYMBOLS,
        }
    
    def detect_symbols(self, text: str) -> List[Dict[str, Any]]:
        """
        Detect hermetic symbols in text.
        
        Args:
            text: Input text to analyze
            
        Returns:
            List of detected symbols with their categories and positions
        """
        text_lower = text.lower()
        detected = []
        
        for category, symbols in self.all_symbols.items():
            for symbol_name, pattern in symbols.items():
                matches = list(re.finditer(pattern, text_lower, re.IGNORECASE))
                if matches:
                    detected.append({
                        "symbol": symbol_name,
                        "category": category,
                        "count": len(matches),
                        "positions": [match.start() for match in matches],
                    })
        
        return detected
    
    def analyze_elemental_energy(self, text: str) -> Dict[str, float]:
        """
        Analyze the elemental energy composition of text.
        
        Args:
            text: Input text to analyze
            
        Returns:
            Dictionary mapping elements to their relative presence (0-1)
        """
        text_lower = text.lower()
        words = re.findall(r'\b\w+\b', text_lower)
        
        element_counts = {element: 0 for element in self.ELEMENTAL_KEYWORDS}
        
        for word in words:
            for element, keywords in self.ELEMENTAL_KEYWORDS.items():
                if word in keywords:
                    element_counts[element] += 1
        
        # Normalize to percentages
        total = sum(element_counts.values())
        if total == 0:
            return {element: 0.0 for element in self.ELEMENTAL_KEYWORDS}
        
        return {
            element: round(count / total, 3)
            for element, count in element_counts.items()
        }
    
    def find_correspondences(self, text: str) -> List[Dict[str, Any]]:
        """
        Find hermetic correspondences in text.
        
        Args:
            text: Input text to analyze
            
        Returns:
            List of correspondences found
        """
        correspondences = []
        detected_symbols = self.detect_symbols(text)
        
        # Create correspondence map
        correspondence_map = {
            "mercury": ["air", "communication", "transformation"],
            "sulfur": ["fire", "passion", "spirit"],
            "salt": ["earth", "body", "material"],
            "gold": ["sun", "fire", "divine"],
            "silver": ["moon", "water", "reflection"],
        }
        
        for symbol in detected_symbols:
            symbol_name = symbol["symbol"]
            if symbol_name in correspondence_map:
                correspondences.append({
                    "symbol": symbol_name,
                    "category": symbol["category"],
                    "correspondences": correspondence_map[symbol_name],
                })
        
        return correspondences
    
    def analyze_text(
        self,
        text: str,
        analyze_symbols: bool = True,
        analyze_energy: bool = True,
        analyze_correspondences: bool = True,
    ) -> Dict[str, Any]:
        """
        Perform complete semantic analysis on text.
        
        Args:
            text: Input text to analyze
            analyze_symbols: Whether to detect hermetic symbols
            analyze_energy: Whether to analyze elemental energy
            analyze_correspondences: Whether to find correspondences
            
        Returns:
            Complete analysis results
        """
        result = {}
        
        if analyze_symbols:
            result["hermetic_symbols"] = self.detect_symbols(text)
        
        if analyze_energy:
            result["elemental_energy"] = self.analyze_elemental_energy(text)
        
        if analyze_correspondences:
            result["correspondences"] = self.find_correspondences(text)
        
        # Generate summary
        symbol_count = len(result.get("hermetic_symbols", []))
        dominant_element = max(
            result.get("elemental_energy", {}).items(),
            key=lambda x: x[1],
            default=("none", 0)
        )[0]
        
        result["summary"] = (
            f"Found {symbol_count} hermetic symbols. "
            f"Dominant elemental energy: {dominant_element}."
        )
        
        return result


# Global instance
_semantic_analyzer: Optional[SemanticAnalyzer] = None


def get_semantic_analyzer() -> SemanticAnalyzer:
    """Get or create the global semantic analyzer instance."""
    global _semantic_analyzer
    if _semantic_analyzer is None:
        _semantic_analyzer = SemanticAnalyzer()
    return _semantic_analyzer
