"""Jenkins YAML generator service"""

from abc import ABC, abstractmethod
from pathlib import Path

from jinja2 import Template

from cicd_wizard.domain.models.wizard import Service, WizardData


class GeneratorError(Exception):
    """Raised when YAML generation fails"""
    pass


class AbstractGenerator(ABC):
    """Abstract base class for YAML generators"""

    def __init__(self, template_path: str) -> None:
        self._template_path = template_path
        self._validate_template_exists()

    def _validate_template_exists(self) -> None:
        """Validate that template file exists"""
        if not Path(self._template_path).exists():
            raise GeneratorError(
                f"Template file not found: {self._template_path}"
            )

    def load_file(self) -> str:
        """Load cicd template file"""
        try:
            with open(self._template_path, "r", encoding="utf-8") as file:
                return file.read()
        except IOError as e:
            raise GeneratorError(f"Failed to load template: {e}")

    @abstractmethod
    def generate_yaml(self, wizard_data: WizardData) -> str:
        """Generate YAML from template and wizard data"""


class JinjaGenerator(AbstractGenerator):
    """Jinja2-based YAML generator"""

    SERVICE_TEMPLATES = {
        Service.GITLAB: "templates/gitlab.j2",
        Service.JENKINS: "templates/jenkins.j2"
    }

    def __init__(self, service: Service) -> None:
        template_path = self.SERVICE_TEMPLATES.get(service)
        if not template_path:
            raise GeneratorError(
                f"Unsupported service: {service}. "
                f"Supported services: {list(self.SERVICE_TEMPLATES.keys())}"
            )
        super().__init__(template_path)
        self.service = service

    def generate_yaml(self, wizard_data: WizardData) -> str:
        """Generate YAML from template and wizard data"""
        try:
            raw_file = self.load_file()
            template = Template(raw_file)

            # Prepare context data for template rendering
            context = self._prepare_context(wizard_data)
            return template.render(**context)
        except Exception as e:
            raise GeneratorError(
                f"Failed to generate YAML for {self.service}: {e}"
            )

    @staticmethod
    def _prepare_context(wizard_data: WizardData) -> dict:
        """Prepare template context from wizard data"""
        build_dict = wizard_data.build.model_dump()
        deploy_dict = wizard_data.deploy.model_dump()

        # Add type hints for template conditionals
        build_dict["type"] = type(wizard_data.build).__name__
        deploy_dict["type"] = type(wizard_data.deploy).__name__

        return {
            "project_name": wizard_data.project_name,
            "project_version": wizard_data.project_version,
            "service": wizard_data.service.value,
            "app": wizard_data.app.value,
            "build": build_dict,
            "deploy": deploy_dict,
            "additional": wizard_data.additional.model_dump() if wizard_data.additional else None,
        }
