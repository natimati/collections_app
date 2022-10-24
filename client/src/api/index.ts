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

export function getLatestItems() {
  return fetch(baseUrl + '/api/items/latest', {
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

export function getItemsByCollectionId(collection_id: string) {
  return fetch(baseUrl + '/api/items/' + collection_id, {
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
}

export function getCollectionById(id: string) {
  return fetch(baseUrl + '/api/collections/' + id, {
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

export function createCollection({
  author_id, name, topic, description, image_url, additional_fields,
}: {
  author_id: string
  name: string,
  topic: string,
  description: string,
  image_url?: string,
  additional_fields: { name: string, type: string }[]
}) {

  return fetch(baseUrl + '/api/collections/create', {
    method: 'POST',
    body: JSON.stringify({
      author_id,
      name,
      topic,
      description,
      image_url,
      additional_fields
    }),
    headers: { 'Content-Type': 'application/json', "Authorization": localStorage.getItem("token") || "" }
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

export function updateCollection({
  id, name, topic, description, image_url, additional_fields,
}: {
  id: string
  name?: string,
  topic?: string,
  description?: string,
  image_url?: string,
  additional_fields?: { name: string, type: string }[]
}) {
  return fetch(baseUrl + '/api/collections/update', {
    method: 'POST',
    body: JSON.stringify({
      id,
      name,
      topic,
      description,
      image_url,
      additional_fields
    }),
    headers: { 'Content-Type': 'application/json', "Authorization": localStorage.getItem("token") || "" }
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

export function deleteCollection(collectionId: string) {
  return fetch(baseUrl + '/api/collections/delete', {
    method: 'DELETE',
    body: JSON.stringify({collectionId}),
    headers: { 'Content-Type': 'application/json', "Authorization": localStorage.getItem("token") || "" }
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

export function getUserCollections(author_id: string) {
  return fetch(baseUrl + '/api/collections/find/' + author_id, {
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