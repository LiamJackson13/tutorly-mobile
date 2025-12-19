/**
 * Example usage of the API client
 *
 * This file demonstrates how to use the apiFetch and api helper functions
 * to make authenticated requests to your NestJS backend API.
 */

import { api, apiFetch, apiFetchJson } from './apiClient';

// Example 1: Using the api helper (recommended)
export async function exampleApiCalls() {
  try {
    // GET request
    const userData = await api.get('/test-auth');
    console.log('User data:', userData);

    // POST request
    const newItem = await api.post('/items', {
      name: 'New Item',
      description: 'Item description',
    });

    // PUT request
    const updatedItem = await api.put(`/items/${newItem.id}`, {
      name: 'Updated Item',
    });

    // DELETE request
    await api.delete(`/items/${updatedItem.id}`);
  } catch (error) {
    console.error('API call failed:', error);
  }
}

// Example 2: Using apiFetchJson directly
export async function exampleDirectFetch() {
  try {
    const response = await apiFetchJson('/test-auth');
    console.log('Response:', response);
  } catch (error) {
    console.error('Request failed:', error);
  }
}

// Example 3: Using apiFetch for custom handling
export async function exampleCustomFetch() {
  const response = await apiFetch('/test-auth', {
    method: 'GET',
  });

  if (response.ok) {
    const data = await response.json();
    console.log('Data:', data);
  } else {
    console.error('Request failed with status:', response.status);
  }
}
