"""FastAPI application factory"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from cicd_wizard.entrypoints.router import router


def create_app() -> FastAPI:
    """Create and configure FastAPI application instance"""
    app = FastAPI(
        title="CI/CD Wizard",
        description="Generate CI/CD configurations for various services",
        version="0.1.0"
    )

    # Configure CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Include routers
    app.include_router(router)

    # Health check endpoint
    @app.get("/health", tags=["health"])
    async def health_check() -> dict:
        """Health check endpoint"""
        return {"status": "healthy"}

    return app


app = create_app()
