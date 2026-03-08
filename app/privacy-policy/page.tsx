import type { Metadata } from 'next'
import PrivacyPolicy from './PrivacyClient'

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description:
        'Read Sarwa Studio\'s Privacy Policy to understand how we collect, use, and protect your personal information.',
    alternates: {
        canonical: 'https://sarwastudio.com/privacy-policy',
    },
    robots: {
        index: true,
        follow: false,
    },
}

export default function Page() {
    return <PrivacyPolicy />
}
