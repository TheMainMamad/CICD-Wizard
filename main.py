"""CI/CD Wizard Application Entry Point"""

import uvicorn
from cicd_wizard.app import app


if __name__ == "__main__":
    uvicorn.run(
        "cicd_wizard.app:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )

