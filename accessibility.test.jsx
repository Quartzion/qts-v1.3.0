import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import QTS_VERSION from './client/src/utils/env'

expect.extend(toHaveNoViolations);

// Optional helper to wrap components needing routing
const withProviders = (ui, route = '/') => (
    <MemoryRouter initialEntries={[route]}>
        <Routes>
            <Route path="*" element={ui} />
        </Routes>
    </MemoryRouter>
);

// Mock your environment
jest.mock('./client/src/utils/env', () => ({
    __esModule: true, // ← important for default export compatibility
    default: () => 'x.x.x', // ← mock for getQtsVersion
    isProd: () => false,
    getEnvMode: () => 'test',
    getApiBaseUrl: () => 'http://localhost:3000',
    getQtsVersion: () => 'x.x.x'
}));


// Import components
import AboutUs from './client/src/components/AboutUs';
import Blogs from './client/src/components/Blogs';
import Footer from './client/src/components/Footer';
import Header from './client/src/components/Header';
import Services from './client/src/components/Services';
import TeamSection from './client/src/components/TeamSection';
import WelcomeBanner from './client/src/components/WelcomeBanner';
import GeneralForm from './client/src/components/GeneralForm';
import ConnectWithUs from './client/src/components/ConnectWithUs';
import ConnectWithUsForm from './client/src/components/ConnectWithUsForm';

const mockFormFields = [
    {
        type: 'text',
        name: 'firstName',
        label: 'First Name',
        required: true
    },
    {
        type: 'email',
        name: 'email',
        label: 'Email',
        required: true
    },
    {
        type: 'radio',
        name: 'contactMethod',
        label: 'Preferred Contact Method',
        required: true,
        options: [
            { label: 'Email', value: 'email' },
            { label: 'Phone', value: 'phone' }
        ]
    }
];

const mockFormSubmit = () => console.log('Submitted test form');

// Array of named components
const componentsToTest = [
    { name: 'AboutUs', Component: AboutUs },
    {
        name: 'Blogs', Component: () => (
            (<Blogs />, '/?slug=sample-blog')

        )
    },
    { name: 'Footer', Component: Footer },
    { name: 'Header', Component: Header },
    { name: 'Services', Component: Services },
    { name: 'TeamSection', Component: TeamSection },
    { name: 'WelcomeBanner', Component: WelcomeBanner },
    {
        name: 'GeneralForm',
        Component: () => (
            <GeneralForm
                fields={[
                    { name: "firstName", label: "First Name", type: "text", required: true },
                    { name: "email", label: "Email", type: "email", required: true }
                ]}
                onSubmit={() => { }}
            />
        )
    },
    { name: 'ConnectWithUs', Component: ConnectWithUs },
    { name: 'ConnectWithUsForm', Component: ConnectWithUsForm },
];

// Accessibility test loop
describe('Accessibility tests (axe-core)', () => {
    componentsToTest.forEach(({ name, Component }) => {
        test(`${name} should have no accessibility violations`, async () => {
            const { container } = render(withProviders(<Component />));
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });
});
