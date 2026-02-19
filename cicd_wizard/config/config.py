"""Application configuration"""

from pathlib import Path
from typing import Optional

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings"""

    # App settings
    app_name: str = "CI/CD Wizard"
    app_version: str = "0.1.0"
    debug: bool = False

    # Server settings
    host: str = "0.0.0.0"
    port: int = 8000
    reload: bool = True

    # Template settings
    template_dir: Path = Path(__file__).parent.parent.parent / "templates"

    # Logging
    log_level: str = "info"

    class Config:
        """Pydantic config"""
        env_file = ".env"
        case_sensitive = False


def get_settings() -> Settings:
    """Get application settings"""
    return Settings()
