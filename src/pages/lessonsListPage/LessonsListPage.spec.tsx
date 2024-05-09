import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import LessonsListPage from './LessonsListPage'

const queryClient = new QueryClient()

describe('LessonsListPage', () => {
    it('should render the page correctly', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <LessonsListPage />
                </MemoryRouter>
            </QueryClientProvider>
        )

        const pageTitle = screen.getByText("Let's find the right lesson for you")
        const pageSubtitle = screen.getByText(
            'Invest in your future with our education platform. Your path to success starts here.'
        )
        const previewLessonsTitle = screen.getByText('Preview our most popular lessons')

        expect(pageTitle).toBeInTheDocument()
        expect(pageSubtitle).toBeInTheDocument()
        expect(previewLessonsTitle).toBeInTheDocument()
    })

    it('should render the home image and arrow icon correctly', () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <LessonsListPage />
                </MemoryRouter>
            </QueryClientProvider>

        )

        const homeImage = screen.getByAltText('HomeImage')
        expect(homeImage).toBeInTheDocument()
        expect(homeImage).toHaveAttribute('src', 'HomeImage.png')

        const arrowDownIcon = screen.getByTestId('arrowDown')
        expect(arrowDownIcon).toBeInTheDocument()
        expect(arrowDownIcon).toHaveClass('arrowDown')
    })
})
