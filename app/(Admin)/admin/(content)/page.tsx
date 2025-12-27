// app/admin/page.tsx   (or pages/admin.tsx if you're using pages router)
'use client';

import { redirect } from 'next/navigation';

export default function Admin() {
  redirect('/admin/login');
}