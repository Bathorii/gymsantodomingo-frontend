#!/usr/bin/env node
// scripts/generate-queue.mjs
// Run: node scripts/generate-queue.mjs
// Generates publish_queue.json from all gyms in the Railway API.

import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const CONFIG_PATH = join(ROOT, 'publish_config.json')
const QUEUE_PATH = join(ROOT, 'publish_queue.json')

const config = JSON.parse(readFileSync(CONFIG_PATH, 'utf-8'))

async function fetchAllGyms() {
  const perPage = 100
  let page = 1
  const allGyms = []

  while (true) {
    const url = `${config.api_url}/gyms/?page=${page}&per_page=${perPage}`
    console.log(`Fetching page ${page}… (${url})`)
    const res = await fetch(url)
    if (!res.ok) throw new Error(`API error ${res.status} on page ${page}`)
    const data = await res.json()
    allGyms.push(...data.items)
    if (page >= data.pages) break
    page++
  }

  console.log(`Total gyms fetched: ${allGyms.length}`)
  return allGyms
}

function randomWorkingTime(dateStr) {
  const { working_hours_start, working_hours_end, timezone_offset_hours } = config
  const rangeMinutes = (working_hours_end - working_hours_start) * 60
  const offsetMinutes = Math.floor(Math.random() * rangeMinutes)
  const totalMinutesFromMidnight = working_hours_start * 60 + offsetMinutes

  const hours = Math.floor(totalMinutesFromMidnight / 60)
  const minutes = totalMinutesFromMidnight % 60
  const pad = n => String(n).padStart(2, '0')
  const sign = timezone_offset_hours >= 0 ? '+' : '-'
  const absOffset = Math.abs(timezone_offset_hours)
  return `${dateStr}T${pad(hours)}:${pad(minutes)}:00${sign}${pad(absOffset)}:00`
}

function addDays(dateStr, n) {
  const d = new Date(dateStr + 'T12:00:00Z')
  d.setUTCDate(d.getUTCDate() + n)
  return d.toISOString().slice(0, 10)
}

async function main() {
  const gyms = await fetchAllGyms()

  gyms.sort((a, b) => (b.review_count ?? 0) - (a.review_count ?? 0))

  let existing = {}
  if (existsSync(QUEUE_PATH)) {
    const prev = JSON.parse(readFileSync(QUEUE_PATH, 'utf-8'))
    for (const entry of prev) {
      existing[entry.slug] = entry
    }
    console.log(`Loaded ${Object.keys(existing).length} existing queue entries`)
  }

  const { daily_count, start_date } = config
  const queue = []

  for (let i = 0; i < gyms.length; i++) {
    const gym = gyms[i]

    if (existing[gym.slug]) {
      queue.push(existing[gym.slug])
      continue
    }

    const dayIndex = Math.floor(i / daily_count)
    const dateStr = addDays(start_date, dayIndex)
    const scheduled_at = randomWorkingTime(dateStr)

    queue.push({
      slug: gym.slug,
      name: gym.name,
      review_count: gym.review_count ?? 0,
      localidad: gym.localidad,
      category: gym.category,
      scheduled_at,
      published_at: null,
    })
  }

  writeFileSync(QUEUE_PATH, JSON.stringify(queue, null, 2), 'utf-8')
  console.log(`✅ publish_queue.json written with ${queue.length} entries`)
  console.log(`   First publish date: ${config.start_date}`)
  console.log(`   Last publish date:  ${addDays(start_date, Math.ceil(gyms.length / daily_count) - 1)}`)
}

main().catch(err => { console.error(err); process.exit(1) })
