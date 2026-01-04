"""
Text synthesis service using LLMs for hermetic text generation and transformation.
"""
from typing import Optional, List

from openai import AsyncOpenAI
from anthropic import AsyncAnthropic

from app.core.config import settings


class SynthesisEngine:
    """Engine for synthesizing and transforming hermetic texts using AI."""

    def __init__(self):
        self.openai_client = None
        self.anthropic_client = None

        if settings.openai_api_key:
            self.openai_client = AsyncOpenAI(api_key=settings.openai_api_key)

        if settings.anthropic_api_key:
            self.anthropic_client = AsyncAnthropic(api_key=settings.anthropic_api_key)

    async def synthesize_with_openai(
        self,
        prompt: str,
        model: Optional[str] = None,
        max_tokens: int = 2000,
    ) -> str:
        """
        Generate text using OpenAI models.

        Args:
            prompt: The synthesis prompt
            model: Model to use (defaults to config)
            max_tokens: Maximum tokens to generate

        Returns:
            Generated text
        """
        if not self.openai_client:
            raise ValueError("OpenAI API key not configured")

        model = model or settings.openai_model

        response = await self.openai_client.chat.completions.create(
            model=model,
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are a hermetic scholar and alchemist, skilled in synthesizing "
                        "ancient wisdom with modern understanding. Your task is to create "
                        "profound, meaningful text that honors the hermetic tradition."
                    ),
                },
                {"role": "user", "content": prompt},
            ],
            max_tokens=max_tokens,
            temperature=0.8,
        )

        return response.choices[0].message.content

    async def synthesize_with_anthropic(
        self,
        prompt: str,
        model: Optional[str] = None,
        max_tokens: int = 2000,
    ) -> str:
        """
        Generate text using Anthropic Claude models.

        Args:
            prompt: The synthesis prompt
            model: Model to use (defaults to config)
            max_tokens: Maximum tokens to generate

        Returns:
            Generated text
        """
        if not self.anthropic_client:
            raise ValueError("Anthropic API key not configured")

        model = model or settings.anthropic_model

        message = await self.anthropic_client.messages.create(
            model=model,
            max_tokens=max_tokens,
            temperature=0.8,
            system=(
                "You are a hermetic scholar and alchemist, skilled in synthesizing "
                "ancient wisdom with modern understanding. Your task is to create "
                "profound, meaningful text that honors the hermetic tradition."
            ),
            messages=[{"role": "user", "content": prompt}],
        )

        return message.content[0].text

    async def fuse_texts(
        self,
        texts: List[str],
        model_preference: str = "openai",
    ) -> str:
        """
        Fuse multiple texts into a coherent synthesis.

        Args:
            texts: List of text passages to fuse
            model_preference: Preferred model provider

        Returns:
            Fused text
        """
        prompt = (
            "Synthesize the following hermetic texts into a unified, coherent passage "
            "that preserves their essential wisdom while creating new insights:\n\n"
        )

        for i, text in enumerate(texts, 1):
            prompt += f"Text {i}:\n{text}\n\n"

        prompt += (
            "Create a synthesis that:\n"
            "1. Honors the original meanings\n"
            "2. Finds connections between the texts\n"
            "3. Generates new understanding\n"
            "4. Maintains the hermetic style and tone\n"
        )

        if model_preference == "anthropic" and self.anthropic_client:
            return await self.synthesize_with_anthropic(prompt)
        elif self.openai_client:
            return await self.synthesize_with_openai(prompt)
        else:
            raise ValueError("No AI model configured")

    async def transform_text(
        self,
        text: str,
        transformation_type: str,
        model_preference: str = "openai",
    ) -> str:
        """
        Transform text according to specified type.

        Args:
            text: Original text
            transformation_type: Type of transformation (modernize, archaize, simplify, etc.)
            model_preference: Preferred model provider

        Returns:
            Transformed text
        """
        transformations = {
            "modernize": (
                "Rewrite this hermetic text in modern language " "while preserving its meaning"
            ),
            "archaize": "Transform this text into archaic hermetic language",
            "simplify": "Simplify this hermetic text for easier understanding",
            "amplify": "Expand on this hermetic text with deeper insights",
            "poetic": "Transform this text into poetic hermetic verse",
        }

        if transformation_type not in transformations:
            raise ValueError(f"Unknown transformation type: {transformation_type}")

        prompt = f"{transformations[transformation_type]}:\n\n{text}"

        if model_preference == "anthropic" and self.anthropic_client:
            return await self.synthesize_with_anthropic(prompt)
        elif self.openai_client:
            return await self.synthesize_with_openai(prompt)
        else:
            raise ValueError("No AI model configured")

    async def generate_hermetic_text(
        self,
        theme: str,
        style: str = "alchemical",
        model_preference: str = "openai",
    ) -> str:
        """
        Generate original hermetic text on a theme.

        Args:
            theme: Theme or topic for generation
            style: Style (alchemical, masonic, kabbalistic)
            model_preference: Preferred model provider

        Returns:
            Generated text
        """
        style_instructions = {
            "alchemical": (
                "Write in the style of alchemical texts, using symbols of transformation"
            ),
            "masonic": ("Write in the style of masonic wisdom, emphasizing building and structure"),
            "kabbalistic": (
                "Write in the style of kabbalistic mysticism, exploring divine emanations"
            ),
        }

        prompt = (
            f"{style_instructions.get(style, style_instructions['alchemical'])}.\n\n"
            f"Theme: {theme}\n\n"
            "Create a profound hermetic passage that explores this theme with depth and wisdom."
        )

        if model_preference == "anthropic" and self.anthropic_client:
            return await self.synthesize_with_anthropic(prompt)
        elif self.openai_client:
            return await self.synthesize_with_openai(prompt)
        else:
            raise ValueError("No AI model configured")


# Global instance
_synthesis_engine: Optional[SynthesisEngine] = None


def get_synthesis_engine() -> SynthesisEngine:
    """Get or create the global synthesis engine instance."""
    global _synthesis_engine
    if _synthesis_engine is None:
        _synthesis_engine = SynthesisEngine()
    return _synthesis_engine
