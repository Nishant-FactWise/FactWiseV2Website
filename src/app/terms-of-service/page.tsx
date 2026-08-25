'use client';

import { Scale } from 'lucide-react';
import { PolicyDocumentPage } from '@/components/PolicyDocumentPage';
import { termsOfServiceCopy } from '@/lib/legal-page-copy';

export default function TermsOfServicePage() {
  return <PolicyDocumentPage copy={termsOfServiceCopy} icon={Scale} />;
}
