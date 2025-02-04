import { Agent } from "@/types/playground";

import { APIRoutes } from "./routes";

export const getPlaygroundAgentsAPI = async (endpoint: string): Promise<Agent[]> => {
    const url = APIRoutes.GetPlaygroundAgents(endpoint);
    const response = await fetch(url, { method: 'GET' });
    if (!response.ok) {
        throw new Error(`Failed to fetch playground agents: ${response.statusText}`);
    }
    const data: Agent[] = await response.json();
    return data;
}
  