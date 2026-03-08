import type { Metadata } from 'next'
import ContactPage from './ContactClient'

export const metadata: Metadata = {
    title: 'Contact Us',
    description:
        'Get in touch with Sarwa Studio. Tell us about your project and we\'ll get back to you within 24 hours with a tailored proposal.',
    alternates: {
        canonical: 'https://sarwastudio.com/contact',
    },
    openGraph: {
        title: 'Contact Us | Sarwa Studio',
        description:
            'Start your project with Sarwa Studio. Reach out for web development, 3D animation, video editing, and more.',
        url: 'https://sarwastudio.com/contact',
    },
}

export default function Page() {
    return <ContactPage />
}
