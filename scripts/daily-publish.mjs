#!/usr/bin/env node
// scripts/daily-publish.mjs
// Run daily by GitHub Actions. Marks due gyms as published.
// Outputs "PUBLISHED=N" to stdout for the Action to read.

import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const CONFIG_PATH = join(ROOT, 'publish_config.json')
const QUEUE_PATH = join(ROOT, 'publish_queue.json')

const config = JSON.parse(readFileSync(CONFIG_PATH, 'utf-8'))
const queue = JSON.parse(readFileSync(QUEUE_PATH, 'utf-8'))

const now = new Date()
const due = queue.filter(g =>
  g.published_at === null && new Date(g.scheduled_at) <= now
)

const toPublish = due.slice(0, config.daily_count)

if (toPublish.length === 0) {
  console.log('PUBLISHED=0')
  console.log('No gyms due for publishing today.')
  process.exit(0)
}

const publishedAt = now.toISOString()
for (const entry of toPublish) {
  entry.published_at = publishedAt
}

writeFileSync(QUEUE_PATH, JSON.stringify(queue, null, 2), 'utf-8')

console.log(`PUBLISHED=${toPublish.length}`)
console.log('Published gyms:')
toPublish.forEach(g => console.log(`  - ${g.slug} (${g.review_count} reviews)`))

const remaining = queue.filter(g => g.published_at === null).length
console.log(`Remaining in queue: ${remaining}`)
