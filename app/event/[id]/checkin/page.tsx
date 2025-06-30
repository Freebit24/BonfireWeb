import CheckInClient from './checkin-client';
import { supabase } from '@/utils/supabase';

interface PageProps {
  params: { id: string };
}

// ✅ Must be async if using generateStaticParams
export default async function CheckInPageWrapper({ params }: PageProps) {
  return <CheckInClient eventId={params.id} />;
}

export async function generateStaticParams() {
  const { data, error } = await supabase.from('events').select('id');

  if (error || !data) {
    console.error('Error generating static params for check-in page:', error);
    return [];
  }

  return data.map((event) => ({
    id: event.id.toString(),
  }));
}