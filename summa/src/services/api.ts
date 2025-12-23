// API Configuration
const API_BASE_URL = 'http://localhost:8080/api';

// Helper function for API calls
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };

  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    // Handle non-JSON responses (like plain text)
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }
      return data;
    } else {
      const text = await response.text();
      if (!response.ok) {
        throw new Error(text || 'API request failed');
      }
      return text as T;
    }
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// ==========================================
// ADMIN API
// ==========================================

export interface AdminLoginRequest {
  username: string;
  password: string;
}

export const adminLogin = async (data: AdminLoginRequest): Promise<string> => {
  return apiCall<string>('/admin/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export interface Voter {
  voterId?: string;
  voterCode: string;
  name: string;
  mobile: string;
  dob: string; // ISO date string
  registeredAt?: string;
  leftRegistered: boolean;
  rightRegistered: boolean;
  hasVoted: boolean;
  lastVotedAt?: string;
}

export const createVoter = async (voter: Voter): Promise<Voter> => {
  return apiCall<Voter>('/admin/voters', {
    method: 'POST',
    body: JSON.stringify(voter),
  });
};

export const getAllVoters = async (): Promise<Voter[]> => {
  return apiCall<Voter[]>('/admin/voters', {
    method: 'GET',
  });
};

export interface RegisterPalmRequest {
  voterCode: string;
  leftTemplate?: string;
  rightTemplate?: string;
  sessionKey?: string;
}

export const registerPalmTemplate = async (
  voterCode: string,
  leftTemplate?: string,
  rightTemplate?: string,
  sessionKey?: string
): Promise<Voter> => {
  const params = new URLSearchParams();
  if (leftTemplate) params.append('leftTemplate', leftTemplate);
  if (rightTemplate) params.append('rightTemplate', rightTemplate);
  if (sessionKey) params.append('sessionKey', sessionKey);

  return apiCall<Voter>(`/admin/voters/${voterCode}/register-template?${params.toString()}`, {
    method: 'POST',
  });
};

export interface Election {
  electionId?: string;
  title: string;
  startTime: string; // ISO date string
  endTime: string; // ISO date string
  status: 'ACTIVE' | 'CLOSED' | 'DRAFT';
  candidates?: Candidate[];
}

export const createElection = async (election: Election): Promise<Election> => {
  return apiCall<Election>('/admin/elections', {
    method: 'POST',
    body: JSON.stringify(election),
  });
};

export interface Candidate {
  candidateId?: string;
  leaderName: string;
  partyName: string;
  city: string;
  votesCount?: number;
}

export const addCandidateToElection = async (
  electionId: string,
  candidate: Candidate
): Promise<Candidate> => {
  return apiCall<Candidate>(`/admin/elections/${electionId}/candidates`, {
    method: 'POST',
    body: JSON.stringify(candidate),
  });
};

export const getAllElections = async (): Promise<Election[]> => {
  return apiCall<Election[]>('/admin/elections', {
    method: 'GET',
  });
};

// ==========================================
// QKD API
// ==========================================

export const getQKDSessionKey = async (): Promise<string> => {
  return apiCall<string>('/security/qkd/session-key', {
    method: 'GET',
  });
};

// ==========================================
// VOTER API
// ==========================================

export const voterLogin = async (voterCode: string): Promise<Voter> => {
  return apiCall<Voter>(`/voter/login?voterCode=${voterCode}`, {
    method: 'POST',
  });
};

export interface PalmScanRequest {
  voterCode: string;
  encryptedTemplate: string;
}

export const scanPalm = async (voterCode: string, encryptedTemplate: string): Promise<string> => {
  return apiCall<string>(`/voter/scan?voterCode=${voterCode}&encryptedTemplate=${encryptedTemplate}`, {
    method: 'POST',
  });
};

export interface VoteRequest {
  voterCode: string;
  electionId: string;
  candidateId: string;
}

export const castVote = async (
  voterCode: string,
  electionId: string,
  candidateId: string
): Promise<string> => {
  return apiCall<string>(
    `/voter/vote?voterCode=${voterCode}&electionId=${electionId}&candidateId=${candidateId}`,
    {
      method: 'POST',
    }
  );
};

export const downloadVVPAT = async (ballotId: string): Promise<Blob> => {
  const url = `${API_BASE_URL}/voter/ballot/${ballotId}/vvp`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Failed to download VVPAT');
  }
  
  return response.blob();
};

export const getActiveElections = async (): Promise<Election[]> => {
  return apiCall<Election[]>('/voter/elections', {
    method: 'GET',
  });
};
