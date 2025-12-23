// Backend API Configuration
const API_BASE_URL = 'http://localhost:8080'; // Update this to match your Spring Boot server

// API Service for all backend calls
export const api = {
  // ============ Admin APIs ============
  admin: {
    login: async (username: string, password: string) => {
      const response = await fetch(`${API_BASE_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (!response.ok) throw new Error('Login failed');
      return response.text();
    },

    createVoter: async (voterData: {
      voterCode: string;
      name: string;
      mobile: string;
      dob: string;
    }) => {
      const response = await fetch(`${API_BASE_URL}/api/admin/voters`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(voterData)
      });
      if (!response.ok) throw new Error('Failed to create voter');
      return response.json();
    },

    getAllVoters: async () => {
      const response = await fetch(`${API_BASE_URL}/api/admin/voters`);
      if (!response.ok) throw new Error('Failed to fetch voters');
      return response.json();
    },

    registerPalmTemplate: async (
      voterCode: string,
      leftTemplate?: string,
      rightTemplate?: string,
      sessionKey?: string
    ) => {
      const params = new URLSearchParams();
      if (leftTemplate) params.append('leftTemplate', leftTemplate);
      if (rightTemplate) params.append('rightTemplate', rightTemplate);
      if (sessionKey) params.append('sessionKey', sessionKey);

      const response = await fetch(
        `${API_BASE_URL}/api/admin/voters/${voterCode}/register-template?${params}`,
        { method: 'POST' }
      );
      if (!response.ok) throw new Error('Failed to register template');
      return response.json();
    },

    createElection: async (electionData: {
      title: string;
      startTime: string;
      endTime: string;
      status?: string;
    }) => {
      const response = await fetch(`${API_BASE_URL}/api/admin/elections`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(electionData)
      });
      if (!response.ok) throw new Error('Failed to create election');
      return response.json();
    },

    addCandidate: async (
      electionId: string,
      candidateData: {
        leaderName: string;
        partyName: string;
        city: string;
      }
    ) => {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/elections/${electionId}/candidates`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(candidateData)
        }
      );
      if (!response.ok) throw new Error('Failed to add candidate');
      return response.json();
    },

    getAllElections: async () => {
      const response = await fetch(`${API_BASE_URL}/api/admin/elections`);
      if (!response.ok) throw new Error('Failed to fetch elections');
      return response.json();
    }
  },

  // ============ Voter APIs ============
  voter: {
    login: async (voterCode: string) => {
      const response = await fetch(
        `${API_BASE_URL}/api/voter/login?voterCode=${voterCode}`,
        { method: 'POST' }
      );
      if (!response.ok) throw new Error('Voter not found');
      return response.json();
    },

    scanPalm: async (voterCode: string, encryptedTemplate: string) => {
      const response = await fetch(
        `${API_BASE_URL}/api/voter/scan?voterCode=${voterCode}&encryptedTemplate=${encryptedTemplate}`,
        { method: 'POST' }
      );
      if (!response.ok) throw new Error('Palm verification failed');
      return response.text();
    },

    castVote: async (voterCode: string, electionId: string, candidateId: string) => {
      const response = await fetch(
        `${API_BASE_URL}/api/voter/vote?voterCode=${voterCode}&electionId=${electionId}&candidateId=${candidateId}`,
        { method: 'POST' }
      );
      if (!response.ok) throw new Error('Vote casting failed');
      return response.text();
    },

    downloadVVPAT: async (ballotId: string) => {
      const response = await fetch(`${API_BASE_URL}/api/voter/ballot/${ballotId}/vvp`);
      if (!response.ok) throw new Error('VVPAT not found');
      return response.blob();
    }
  },

  // ============ Security/QKD APIs ============
  security: {
    getSessionKey: async () => {
      const response = await fetch(`${API_BASE_URL}/api/security/qkd/session-key`);
      if (!response.ok) throw new Error('Failed to generate session key');
      return response.text();
    }
  }
};

// Helper function to convert Date/Time to LocalDateTime format for backend
export const formatDateTime = (date: string, time: string): string => {
  return `${date}T${time}:00`;
};

// Helper to simulate palm template capture (mock base64)
export const generateMockPalmTemplate = (): string => {
  // In real implementation, this would come from Python OpenCV client
  const randomBytes = new Uint8Array(256);
  crypto.getRandomValues(randomBytes);
  return btoa(String.fromCharCode(...randomBytes));
};
