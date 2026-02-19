""" CI/CD Wizard models Implementation """

from typing import Optional
from enum import Enum

from pydantic import BaseModel



class Service(str, Enum):
    """ Service type declaration """
    JENKINS = "Jenkins"
    GITLAB = "Gitlab"


class App(str, Enum):
    """ App type declaration """
    PYTHON = "Python"
    PHP = "PHP"
    JAVA = "Java"


class DockerBuild(BaseModel):
    """ Docker build """
    required_base_image: Optional[str]
    required_arguments: Optional[str]
    dockerfile_name: str = "Dockerfile"


class BareBuild(BaseModel):
    """ Bare build """
    language_version: str
    builder_tool: str
    full_command: str


class KubernetesDeploy(BaseModel):
    """ Kubernetes Deploy """
    namespace: str = "default"
    yaml_name: str
    rolling_update: bool = True


class DockerDeploy(BaseModel):
    """ Docker Deploy """
    yaml_path: str
    yaml_name: str = "docker-compose.yml"
    graceful: bool = True


class BareDeploy(BaseModel):
    """ Bare Deploy """
    ansible: bool
    project_path: str
    service_name: str
    reload_enabled: bool = False
    commands_to_execute: Optional[str] = None


class Trivy(BaseModel):
    """ Use Trivy """
    enabled: bool = False


class AutoTests(BaseModel):
    """ Use auto tests """
    command: str


class Lint(BaseModel):
    """ Use Lint """
    command: str


class ArtifactManager(BaseModel):
    """ Use Artifact Manager """
    host: str
    image_name: str
    username: Optional[str]
    password: Optional[str]


class Branchs(BaseModel):
    """ Split branches """
    develop: str
    stage: str
    production: str


class Profiling(BaseModel):
    """ Split Environemnts """
    # Bare build commands
    develop_command: Optional[str]
    stage_command: Optional[str]
    production_command: Optional[str]
    # Dockerfile commands
    develop_dockerfile_command: Optional[str]
    stage_dockerfile_command: Optional[str]
    production_dockerfile_command: Optional[str]


class BranchPipeline(BaseModel):
    """ Aggregate branch pipeline """
    branchs: Branchs
    profiling: Profiling


class AdditionalCI(BaseModel):
    """ Additional CI/CD Features """
    trivy: Optional[Trivy] = None
    test: Optional[AutoTests] = None
    lint: Optional[Lint] = None
    artifact_manager: Optional[ArtifactManager] = None
    branch_pipeline: Optional[BranchPipeline] = None


class WizardData(BaseModel):
    """ Declare required data to process wizard """
    project_name: str
    project_version: str
    service: Service
    app: App
    build: BareBuild | DockerBuild
    deploy: BareDeploy | DockerDeploy | KubernetesDeploy
    additional: Optional[AdditionalCI] = None
