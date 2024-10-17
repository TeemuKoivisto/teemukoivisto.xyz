import { get as storeGet } from 'svelte/store'
import { credentials } from '$stores/auth'

import { type Result, wrappedFetch } from '@teemukoivisto.xyz/lib'

export const DEFAULT_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

export const getAuthHeader = () =>
  storeGet(credentials) && { Authorization: storeGet(credentials)?.token }

export const get = <T>(
  path: string,
  parse?: (data: any) => T,
  headers: Record<string, string> = { ...DEFAULT_HEADERS, ...getAuthHeader() }
): Promise<Result<T>> =>
  wrappedFetch<any>(`/${path}`, {
    method: 'GET',
    headers,
  }).then(resp => ('data' in resp && parse ? { data: parse(resp.data) } : resp))

export const patch = <T>(
  path: string,
  payload: any,
  parse?: (data: any) => T,
  headers: Record<string, string> = { ...DEFAULT_HEADERS, ...getAuthHeader() }
): Promise<Result<T>> =>
  wrappedFetch<any>(`/${path}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(payload),
  }).then(resp => ('data' in resp && parse ? { data: parse(resp.data) } : resp))

export const post = <T>(
  path: string,
  payload: any,
  parse?: (data: any) => T,
  headers: Record<string, string> = { ...DEFAULT_HEADERS, ...getAuthHeader() }
): Promise<Result<T>> =>
  wrappedFetch<any>(`/${path}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  }).then(resp => ('data' in resp && parse ? { data: parse(resp.data) } : resp))

export const del = <T>(
  path: string,
  parse?: (data: any) => T,
  headers: Record<string, string> = { ...DEFAULT_HEADERS, ...getAuthHeader() }
): Promise<Result<T>> =>
  wrappedFetch<any>(`/${path}`, {
    method: 'DELETE',
    headers,
  }).then(resp => ('data' in resp && parse ? { data: parse(resp.data) } : resp))
