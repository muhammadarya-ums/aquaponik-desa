import { DetailDashboard } from '@/components/telemetry-dashboard'

export default async function SitePage({
  params,
}: {
  params: Promise<{ siteId: string }>
}) {
  const { siteId } = await params

  return <DetailDashboard siteId={siteId} />
}