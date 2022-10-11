const baseUrl = process.env.NODE_ENV === "development" ? "http://localhost:8080" : "";

export function login({ email, password }: { email: string, password: string }) {
  return fetch(baseUrl + '/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json' }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('HTTP status ' + response.status)
      }
      return response.json();
    })
    .then((data) => {
      localStorage.setItem("token", data.token);

      return data;
    })
    .catch((e) => {
      console.log(e)
    });
};

export function register({ username, email, password }: { username: string, email: string, password: string }) {
  return fetch(baseUrl + '/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      username,
      email,
      password
    }),
    headers: { 'Content-Type': 'application/json' }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('HTTP status ' + response.status)
      }
      return response.json();
    })
    .catch((e) => {
      console.log(e)
      throw e;
    });
};

export function search(value: string) {
  return fetch(baseUrl + '/api/search?searchPhrase=' + value, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('HTTP status ' + response.status)
      }
      return response.json();
    })
    .catch((e) => {
      console.log(e);
      throw e;
  })
};
