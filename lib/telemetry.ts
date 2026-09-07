export type SiteStatus = 'ACTIVE' | 'INACTIVE'
export type SensorReading = { timestamp: string; ph: number; temperature: number; waterLevelCm: number; solarVoltage: number; solarCurrent: number; batteryPercent: number }
export type Site = { id: string; name: string; location: string; status: SiteStatus; updatedAt: string; latest: SensorReading; history: SensorReading[] }

const seed = (site: string, index: number): SensorReading[] => Array.from({ length: 12 }, (_, i) => ({ timestamp: `${String(8 + Math.floor(i / 2)).padStart(2, '0')}:${i % 2 ? '30' : '00'}`, ph: Number((7.05 + Math.sin(i * .7 + index) * .18).toFixed(2)), temperature: Number((25.2 + Math.cos(i * .5) * .7 + index * .2).toFixed(1)), waterLevelCm: Number((82 + Math.sin(i * .6 + index) * 5).toFixed(1)), solarVoltage: Number((13.4 + Math.sin(i * .4) * .5).toFixed(1)), solarCurrent: Number((1.8 + Math.max(0, Math.sin(i * .45)) * 1.2).toFixed(1)), batteryPercent: Math.round(86 + Math.sin(i * .3 + index) * 5) }))
const historyA = seed('site-a', 0)
const historyB = seed('site-b', 1)
export const MOCK_SITES: Site[] = [
  { id: 'site-a', name: 'Dusun Sekar Putih', location: 'Sekar Putih, East Java', status: 'ACTIVE', updatedAt: '2026-08-20T08:30:00Z', latest: historyA.at(-1)!, history: historyA },
  { id: 'site-b', name: 'Dusun Jedong', location: 'Jedong, East Java', status: 'ACTIVE', updatedAt: '2026-08-20T08:30:00Z', latest: historyB.at(-1)!, history: historyB },
]
export const getMockSite = (id: string) => MOCK_SITES.find((site) => site.id === id) ?? MOCK_SITES[0]
export const toCsv = (site: Site) => ['timestamp,ph,temperature,waterLevelCm,solarVoltage,solarCurrent,batteryPercent', ...site.history.map((r) => [r.timestamp,r.ph,r.temperature,r.waterLevelCm,r.solarVoltage,r.solarCurrent,r.batteryPercent].join(','))].join('\n')

export function validateReading(input: unknown) {
  if (!input || typeof input !== 'object') return 'Payload must be a JSON object'
  const value = input as Record<string, unknown>
  if (typeof value.siteId !== 'string' || !/^site-[a-z]+$/.test(value.siteId)) return 'siteId must be a valid site identifier'
  const fields = ['ph','temperature','waterLevelCm','solarVoltage','solarCurrent','batteryPercent']
  if (fields.some((field) => typeof value[field] !== 'number' || !Number.isFinite(value[field] as number))) return 'All telemetry fields must be finite numbers'
  return null
}

export function parseReading(input: Record<string, unknown>): SensorReading { return { timestamp: new Date().toISOString(), ph: input.ph as number, temperature: input.temperature as number, waterLevelCm: input.waterLevelCm as number, solarVoltage: input.solarVoltage as number, solarCurrent: input.solarCurrent as number, batteryPercent: input.batteryPercent as number } }
