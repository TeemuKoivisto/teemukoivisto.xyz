import { get, derived, writable } from 'svelte/store'

import { persist } from './persist'

export type UserType = 'matti' | 'minna'

export const signedInUser = writable<UserType | undefined>()

export const actions = {
  signIn(user?: 'matti' | 'minna') {
    signedInUser.set(user)
  },
}
