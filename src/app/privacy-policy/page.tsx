'use client';

import { Shield } from 'lucide-react';
import { PolicyDocumentPage } from '@/components/PolicyDocumentPage';
import { privacyPolicyCopy } from '@/lib/legal-page-copy';

export default function PrivacyPolicyPage() {
  return <PolicyDocumentPage copy={privacyPolicyCopy} icon={Shield} />;
}
