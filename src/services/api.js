const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok || payload?.success === false) {
    const message = payload?.error?.message || payload?.message || `API request failed: ${response.status}`;
    throw new Error(message);
  }

  return payload?.data ?? payload;
}

function post(path, body) {
  return request(path, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export const themesApi = {
  list: () => request('/themes'),
  get: (themeId) => request(`/themes/${themeId}`),
};

export const gameApi = {
  getHint: ({ themeId, sequence, progress }) =>
    post('/game/hint', {
      theme_id: Number(themeId),
      sequence: Number(sequence),
      progress: Number(progress),
    }),
  verifyAnswer: ({ themeId, sequence, answer }) =>
    post('/game/verify', {
      theme_id: Number(themeId),
      sequence: Number(sequence),
      answer: String(answer),
    }),
  getAnswer: ({ themeId, sequence }) =>
    post('/game/answer', {
      theme_id: Number(themeId),
      sequence: Number(sequence),
    }),
};

export const ranksApi = {
  create: ({ themeId, userName, clearTime, hintCount, endingType }) =>
    post('/ranks', {
      theme_id: Number(themeId),
      user_name: userName,
      clear_time: Number(clearTime),
      hint_count: Number(hintCount),
      ending_type: endingType,
    }),
  listByTheme: (themeId) => request(`/ranks/${themeId}`),
};

export const guestbookApi = {
  create: ({ themeId, rankId, message }) =>
    post('/guestbook', {
      theme_id: Number(themeId),
      rank_id: Number(rankId),
      message,
    }),
  listByTheme: (themeId) => request(`/guestbook/${themeId}`),
};

export function getCurrentThemeId() {
  return Number(localStorage.getItem('themeId')) || 1;
}

export function setCurrentThemeId(themeId) {
  if (Number.isFinite(Number(themeId))) {
    localStorage.setItem('themeId', String(Number(themeId)));
  }
}
