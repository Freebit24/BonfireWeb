import CheckInClient from './checkin-client';
import { supabase } from '@/utils/supabase';

// ✅ No custom `PageProps` type used
type CheckInPageProps = {
  params: {
    id: string;
  };
};

// ✅ Marked as async for static params to work correctly
export default async function CheckInPageWrapper({ params }: CheckInPageProps) {
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
