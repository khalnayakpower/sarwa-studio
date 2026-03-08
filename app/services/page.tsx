import type { Metadata } from 'next'
import ServicesPage from './ServicesClient'

export const metadata: Metadata = {
    title: 'Our Services',
    description:
        'Explore Sarwa Studio\'s full range of services — web development, 3D animation, video editing, software solutions, graphic design, and digital marketing.',
    alternates: {
        canonical: 'https://sarwastudio.com/services',
    },
    openGraph: {
        title: 'Our Services | Sarwa Studio',
        description:
            'Web development, 3D animation, video editing, software solutions, graphic design, and digital marketing — all under one roof.',
        url: 'https://sarwastudio.com/services',
    },
}

export default function Page() {
    return <ServicesPage />
}
