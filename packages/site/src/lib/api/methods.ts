import { get as storeGet } from 'svelte/store'
import { credentials } from '$stores/auth'
import { COMMENT_API_URL } from '$config'

import { wrappedFetch } from '@teemukoivisto.xyz/utils'
import type { Result } from '@teemukoivisto.xyz/utils'

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
    `${COMMENT_API_URL}/${path}`,
    {
      method: 'GET',
      headers,
    },
    err => err
  )
}

export function post<T>(
  path: string,
  payload: any,
  defaultError?: string,
  headers: Record<string, string> = { ...DEFAULT_HEADERS, ...getAuthHeader() }
): Promise<Result<T>> {
  return wrappedFetch(
    `${COMMENT_API_URL}/${path}`,
    {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    },
    err => err
  )
}

export function put<T>(
  path: string,
  payload: any,
  defaultError?: string,
  headers: Record<string, string> = { ...DEFAULT_HEADERS, ...getAuthHeader() }
): Promise<Result<T>> {
  return wrappedFetch(
    `${COMMENT_API_URL}/${path}`,
    {
      method: 'PUT',
      headers,
      body: JSON.stringify(payload),
    },
    err => err
  )
}

export function del<T>(
  path: string,
  defaultError?: string,
  headers: Record<string, string> = { ...DEFAULT_HEADERS, ...getAuthHeader() }
): Promise<Result<T>> {
  return wrappedFetch(
    `${COMMENT_API_URL}/${path}`,
    {
      method: 'DELETE',
      headers,
    },
    err => err
  )
}
