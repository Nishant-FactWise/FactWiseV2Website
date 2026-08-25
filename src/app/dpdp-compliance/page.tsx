'use client';

import { ShieldCheck } from 'lucide-react';
import { PolicyDocumentPage } from '@/components/PolicyDocumentPage';
import { dpdpComplianceCopy } from '@/lib/legal-page-copy';

export default function DPDPCompliancePage() {
  return <PolicyDocumentPage copy={dpdpComplianceCopy} icon={ShieldCheck} />;
}
