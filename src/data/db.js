import siteJson from './db/site.json'
import usersJson from './db/users.json'
import programsJson from './db/programs.json'
import galleryJson from './db/gallery.json'
import messagesJson from './db/messages.json'
import dashboardJson from './db/dashboard.json'
import homeJson from './db/home.json'

const COLLECTIONS = ['site', 'users', 'programs', 'gallery', 'messages', 'dashboard', 'home']

const defaults = {
  site: siteJson,
  users: usersJson,
  programs: programsJson,
  gallery: galleryJson,
  messages: messagesJson,
  dashboard: dashboardJson,
  home: homeJson,
}

const STORAGE_PREFIX = 'yfr_db_'

const collections = {}

const hydrate = () => {
  COLLECTIONS.forEach((key) => {
    const raw = localStorage.getItem(STORAGE_PREFIX + key)
    if (raw) {
      try {
        collections[key] = JSON.parse(raw)
      } catch {
        collections[key] = JSON.parse(JSON.stringify(defaults[key]))
      }
    } else {
      collections[key] = JSON.parse(JSON.stringify(defaults[key]))
    }
  })
}
hydrate()

const persist = (key) => {
  try {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(collections[key]))
  } catch (err) {
    console.error('Persist failed for', key, err)
  }
}

const genId = (collection) =>
  `${collection}:${Date.now()}:${Math.random().toString(36).slice(2, 7)}`

export const db = {
  find(collection) {
    return collections[collection] ?? null
  },
  findById(collection, id) {
    const c = collections[collection]
    if (!Array.isArray(c)) return null
    return c.find((d) => d._id === id) ?? null
  },
  filter(collection, predicate) {
    const c = collections[collection]
    if (!Array.isArray(c)) return []
    return c.filter(predicate)
  },
  insert(collection, document) {
    const c = collections[collection]
    if (!Array.isArray(c)) return null
    const doc = { _id: genId(collection), ...document }
    c.push(doc)
    persist(collection)
    return doc
  },
  update(collection, id, patch) {
    const c = collections[collection]
    if (!Array.isArray(c)) return null
    const idx = c.findIndex((d) => d._id === id)
    if (idx === -1) return null
    c[idx] = { ...c[idx], ...patch }
    persist(collection)
    return c[idx]
  },
  remove(collection, id) {
    const c = collections[collection]
    if (!Array.isArray(c)) return false
    const idx = c.findIndex((d) => d._id === id)
    if (idx === -1) return false
    c.splice(idx, 1)
    persist(collection)
    return true
  },
  authenticate(email, password) {
    return (
      collections.users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      ) ?? null
    )
  },
  isAdmin(user) {
    return user?.role === 'admin'
  },
  reset() {
    COLLECTIONS.forEach((key) => {
      localStorage.removeItem(STORAGE_PREFIX + key)
      collections[key] = JSON.parse(JSON.stringify(defaults[key]))
    })
  },
}

export const site = collections.site
export const navItems = collections.site.nav
export const programs = collections.programs
export const gallery = collections.gallery
export const homeItems = collections.home
export const dashboardData = collections.dashboard
