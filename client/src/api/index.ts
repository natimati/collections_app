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

export function getAllUsers(): Promise<{
  id: string;
  username: string;
  email: string;
  is_admin: boolean;
  registration_time: string;
  last_login_time: string;
  collections: {}[]
}[]> {
  return fetch(baseUrl + "/api/users", {
    method: 'GET',
    headers: { "Authorization": localStorage.getItem("token") || "" }
  })
    .then((response) => {
      if (!response.ok) {
        if (response.status === 401) {
          window.location.href = "/login";
          localStorage.removeItem("token");
        }
        throw new Error('HTTP status ' + response.status)
      }
      return response.json();
    })
    .catch((e) => {
      console.log(e)
    });
};

export function changeUserRole(isAdmin: boolean, userIds: string[]) {
  return fetch(baseUrl + '/api/users/role-change', {
    method: 'POST',
    body: JSON.stringify({ isAdmin, userIds }),
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
    });
}

export function deleteUsers(userIds: string[]) {
  return fetch(baseUrl + "/api/users/delete", {
    method: 'DELETE',
    body: JSON.stringify({ userIds }),
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
    });
};

export function syncSearchResults() {
  return fetch(baseUrl + '/api/search/sync', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', "Authorization": localStorage.getItem("token") || "" }
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

export function getItemsByCollectionId(collection_id: string): Promise<{
  id: string,
  collection_id: string,
  author_id: string,
  name: string,
  image_url: string,
}[]> {
  return fetch(baseUrl + '/api/items/collection/' + collection_id, {
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

export function getCollectionById(collectionId: string) {
  return fetch(baseUrl + '/api/collections/' + collectionId, {
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
  return fetch(baseUrl + '/api/collections/update/' + id, {
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
    body: JSON.stringify({ collectionId }),
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

export function getUserCollections(author_id: string): Promise<{
  id: string,
  author_id: string,
  name: string,
  topic: string,
  image_url: string,
}[]> {
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

export function createItem({
  collection_id, author_id, name, image_url, item_properties,
}: {
  collection_id: string,
  author_id: string,
  name: string,
  image_url?: string,
  item_properties: {
    additional_field_id: string,
    collection_id: string,
    value: string,
  }[]
}) {

  return fetch(baseUrl + '/api/items/create', {
    method: 'POST',
    body: JSON.stringify({
      collection_id,
      author_id,
      name,
      image_url,
      item_properties
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

export function updateItem({
  id, collection_id, author_id, name, image_url, item_properties,
}: {
  id: string,
  collection_id: string,
  author_id: string,
  name?: string,
  image_url?: string,
  item_properties?: { value: string }[]
}) {
  return fetch(baseUrl + '/api/items/update/' + id, {
    method: 'POST',
    body: JSON.stringify({
      id,
      name,
      collection_id,
      author_id,
      image_url,
      item_properties,
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

export function getItemById(itemId: string): Promise<{
  id: string;
  collection_id: string;
  author_id: string;
  name: string;
  image_url: string;
  item_properties: {
    additional_field: {
      name: string;
      type: string;
    }
    additional_field_id: string;
    value: string;
    id: string;
  }[];
  author: {
    id: string;
    username: string;
  }
  collection: {
    id: string;
    name: string,
    additional_fields: {
      id: string;
      name: string;
      type: string;
    }[]
  }
  created_at: string;
  updated_at: string;
}> {
  return fetch(baseUrl + '/api/items/' + itemId, {
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