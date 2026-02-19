"""Use case for generating CI/CD YAML files"""

from cicd_wizard.domain.models.wizard import WizardData
from cicd_wizard.service.generator.jenkins import JinjaGenerator, GeneratorError


class GenerateYAMLUseCase:
    """Use case for generating YAML configuration files"""

    def execute(self, wizard_data: WizardData) -> str:
        """
        Execute YAML generation for the specified service

        Args:
            wizard_data: Domain model containing CI/CD configuration

        Returns:
            Generated YAML content

        Raises:
            GeneratorError: If YAML generation fails
        """
        try:
            generator = JinjaGenerator(wizard_data.service)
            return generator.generate_yaml(wizard_data)
        except GeneratorError:
            raise
        except Exception as e:
            raise GeneratorError(
                f"Unexpected error during YAML generation: {e}"
            )
