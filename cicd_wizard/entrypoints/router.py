"""API routes for CI/CD Wizard"""

from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import PlainTextResponse
from pydantic import ValidationError

from cicd_wizard.domain.models.wizard import WizardData
from cicd_wizard.application.generate_yaml import GenerateYAMLUseCase
from cicd_wizard.service.generator.jenkins import GeneratorError

from cicd_wizard.config.log import logger


router = APIRouter(prefix="/api/v1", tags=["ci-cd"])
generate_yaml_use_case = GenerateYAMLUseCase()


@router.post("/generate/", response_model=dict)
async def generate_service_yaml(wizard_data: WizardData, request: Request) -> dict:
    """
    Generate YAML configuration for CI/CD pipeline

    Args:
        wizard_data: Complete CI/CD configuration from client

    Returns:
        Dictionary containing generated YAML output

    Raises:
        HTTPException: If validation or generation fails
    """
    logger().info(f"Received YAML generation request for service: {wizard_data.service.value} | IP: {request.client.host}")
    try:
        yaml_output = generate_yaml_use_case.execute(wizard_data)
        return {
            "success": True,
            "service": wizard_data.service.value,
            "project": wizard_data.project_name,
            "version": wizard_data.project_version,
            "yaml": yaml_output
        }
    except GeneratorError as e:
        raise HTTPException(
            status_code=400,
            detail=f"YAML generation failed: {str(e)}"
        )
    except ValidationError as e:
        raise HTTPException(
            status_code=422,
            detail=f"Invalid input data: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Unexpected error: {str(e)}"
        )


@router.post("/generate/download", response_class=PlainTextResponse)
async def download_service_yaml(wizard_data: WizardData, request: Request) -> str:
    """
    Generate and download YAML configuration as plain text file

    Args:
        wizard_data: Complete CI/CD configuration from client

    Returns:
        Plain text YAML output

    Raises:
        HTTPException: If validation or generation fails
    """
    logger().info(f"Received YAML download request for service: {wizard_data.service.value} | IP: {request.client.host}")
    try:
        yaml_output = generate_yaml_use_case.execute(wizard_data)
        return yaml_output
    except GeneratorError as e:
        raise HTTPException(
            status_code=400,
            detail=f"YAML generation failed: {str(e)}"
        )
    except ValidationError as e:
        raise HTTPException(
            status_code=422,
            detail=f"Invalid input data: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Unexpected error: {str(e)}"
        )
