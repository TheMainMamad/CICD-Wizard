import axios, { AxiosError } from 'axios';

export interface WizardData {
  project_name: string;
  project_version: string;
  service: 'Jenkins' | 'Gitlab';
  app: 'Python' | 'PHP' | 'Java';
  build: BareBuild | DockerBuild;
  deploy: BareDeploy | DockerDeploy | KubernetesDeploy;
  additional?: AdditionalCI;
}

export interface BareBuild {
  language_version: string;
  builder_tool: string;
  full_command: string;
}

export interface DockerBuild {
  required_base_image: string;
  required_arguments?: string;
  dockerfile_name?: string;
}

export interface BareDeploy {
  ansible: boolean;
  project_path: string;
  service_name: string;
  reload_enabled?: boolean;
  commands_to_execute?: string;
}

export interface DockerDeploy {
  yaml_path: string;
  yaml_name?: string;
  graceful?: boolean;
}

export interface KubernetesDeploy {
  namespace?: string;
  yaml_name: string;
  rolling_update?: boolean;
}

export interface AutoTests {
  command: string;
}

export interface Lint {
  command: string;
}

export interface ArtifactManager {
  host: string;
  image_name: string;
  username?: string;
  password?: string;
}

export interface AdditionalCI {
  trivy?: object;
  test?: AutoTests;
  lint?: Lint;
  artifact_manager?: ArtifactManager;
}

const API_URL = 'http://localhost:8000/api/v1';

export const generateYAML = async (data: WizardData): Promise<{ success: boolean; service: string; project: string; version: string; yaml: string }> => {
  try {
    const response = await axios.post(`${API_URL}/generate/`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.detail || 'Failed to generate YAML');
    }
    throw error;
  }
};

export const downloadYAML = async (data: WizardData): Promise<string> => {
  try {
    const response = await axios.post(`${API_URL}/generate/download`, data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.detail || 'Failed to download YAML');
    }
    throw error;
  }
};
