import ky from 'ky';

const baseUrl = process.env.NODE_ENV === "development" ? "http://localhost:8080" : "/";

const api = ky.extend({
  prefixUrl: baseUrl,
  hooks: {
    beforeRequest: [
      request => {
        request.headers.set('Authorization', localStorage.getItem("token") || "");
      }
    ],
    afterResponse: [
      async (request, options, response) => {
        if (response.status === 401) {
          localStorage.removeItem("token");
          document.location.href = "/login";
        }
      }
    ]
  }
});

export function login({ email, password }: { email: string, password: string }) {
  return api.post('api/auth/login', {
    json: { email, password },
  })
    .json<{ id: string; token: string }>()
    .then((data) => {
      localStorage.setItem("token", data.token);
      return data;
    })
};

export function register({ username, email, password }: { username: string, email: string, password: string }) {
  return api.post('api/auth/register', {
    json: {
      username,
      email,
      password
    }
  })
    .json<{ message: string; data: { id: string, username: string, email: string } }>()
};

export function getAllUsers() {
  return api.get("api/users").json<{
    id: string;
    username: string;
    email: string;
    is_admin: boolean;
    registration_time: string;
    last_login_time: string;
    collections: {}[]
  }[]>()
};

export function changeUserRole(isAdmin: boolean, userIds: string[]) {
  return api.post('api/users/role-change', { json: { isAdmin, userIds } }).json<{ message: string }>()
}

export function deleteUsers(userIds: string[]) {
  return api.delete('api/users/delete', { json: { userIds } }).json<{ message: string }>()
};

export function syncSearchResults() {
  return api.post('api/search/sync').json<{ message: string }>();
};

export function getItemsByCollectionId(collection_id: string) {
  return api.get(`api/items/collection/${collection_id}`).json<{
    id: string,
    collection_id: string,
    author_id: string,
    name: string,
    image_url: string,
    comments: {
      id: string;
    }[]
  }[]>()
}

export function getCollectionById(collectionId: string) {
  return api.get(`api/collections/${collectionId}`).json<{
    id: string;
    author_id: string;
    name: string;
    topic: string;
    description: string;
    image_url: string;
    created_at: string;
    additional_fields: {
      id: string;
      name: string;
      type: string;
      collection_id: string;
    }[],
    author: {
      id: string;
      username: string;
    }
  }>();
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
  return api.post('api/collections/create', {
    json: {
      author_id,
      name,
      topic,
      description,
      image_url,
      additional_fields
    }
  }).json<{ message: string }>();
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
  return api.post('api/collections/update/' + id, {
    json: {
      id,
      name,
      topic,
      description,
      image_url,
      additional_fields
    }
  }).json<{ message: string }>()
};

export function deleteCollection(collectionId: string) {
  return api.delete('api/collections/delete', { json: { collectionId } }).json<{ message: string }>();
};

export function getUserCollections(author_id: string) {
  return api.get('api/collections/find/' + author_id).json<{
    id: string,
    author_id: string,
    name: string,
    topic: string,
    image_url: string,
  }[]>()

};

export function getLargestCollections() {
  return api.get('api/collections/largest').json<{
    id: string;
    name: string;
    topic: string;
    image_url: string;
    itemsCount: number;
    author: {
      id: string;
      username: string;
    }
  }[]>();
};

export function getLatestItems() {
  return api.get('api/items/latest').json<{
    id: string;
    collection_id: string;
    author_id: string;
    name: string;
    image_url: string;
    collection: {
      id: string;
      name: string;
    },
    author: {
      id: string;
      username: string;
    }
  }[]>();
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
  return api.post('api/items/create', {
    json: {
      collection_id,
      author_id,
      name,
      image_url,
      item_properties
    }
  }).json<{ message: string; }>()
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
  return api.post(`api/items/update/${id}`, {
    json: {
      id,
      name,
      collection_id,
      author_id,
      image_url,
      item_properties,
    }
  }).json<{
    message: string
  }>()
};

export function deleteItem(itemId: string) {
  return api.delete('api/items/delete', { json: { itemId } }).json<{ message: string }>()
};

export function getItemById(itemId: string) {
  return api.get(`api/items/${itemId}`).json<{
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
  }>()
};

export function createComment({ item_id, author_id, body }:
  { item_id: string, author_id: string, body: string }) {
  return api.post('api/comments/create', {
    json: {
      item_id,
      author_id,
      body
    }
  })
    .json<{ message: string; data: { id: string, username: string, email: string } }>()
};

export function getCommentsByItemId(item_id: string) {
  return api.get(`api/comments/item/${item_id}`).json<{
    id: string,
    item_id: string,
    author_id: string,
    body: string,
    created_at: string,
    author: {
      id: string;
      username:string
    }
  }[]>()
}