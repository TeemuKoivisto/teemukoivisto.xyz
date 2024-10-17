import { get as storeGet } from 'svelte/store'
import { credentials } from '$stores/auth'

import { wrappedFetch } from '@teemukoivisto.xyz/lib'
import type { Result } from '@teemukoivisto.xyz/lib'

export const DEFAULT_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

export const getAuthHeader = () =>
  storeGet(credentials) && { Authorization: storeGet(credentials)?.token }

export function get<T>(
  path: string,
  defaultError?: string,
  headers: Record<string, string> = { ...DEFAULT_HEADERS, ...getAuthHeader() }
): Promise<Result<T>> {
  return wrappedFetch(
    `/${path}`,
    {
      method: 'GET',
      headers,
    },
    err => err || defaultError
  )
}

export function post<T>(
  path: string,
  payload: any,
  defaultError?: string,
  headers: Record<string, string> = { ...DEFAULT_HEADERS, ...getAuthHeader() }
): Promise<Result<T>> {
  return wrappedFetch(
    `/${path}`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    },
    err => err || defaultError
  )
}

export function put<T>(
  path: string,
  payload: any,
  defaultError?: string,
  headers: Record<string, string> = { ...DEFAULT_HEADERS, ...getAuthHeader() }
): Promise<Result<T>> {
  return wrappedFetch(
    `/${path}`,
    {
      method: 'PUT',
      headers,
      body: JSON.stringify(payload),
    },
    err => err || defaultError
  )
}

export function del<T>(
  path: string,
  defaultError?: string,
  headers: Record<string, string> = { ...DEFAULT_HEADERS, ...getAuthHeader() }
): Promise<Result<T>> {
  return wrappedFetch(
    `/${path}`,
    {
      method: 'DELETE',
      headers,
    },
    err => err || defaultError
  )
}
