import type { Metadata } from 'next'
import TermsPage from './TermsClient'

export const metadata: Metadata = {
    title: 'Terms & Conditions',
    description:
        'Read Sarwa Studio\'s Terms & Conditions to understand the agreement between you and Sarwa Studio when engaging our services.',
    alternates: {
        canonical: 'https://sarwastudio.com/terms-conditions',
    },
    robots: {
        index: true,
        follow: false,
    },
}

export default function Page() {
    return <TermsPage />
}
