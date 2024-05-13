import { MemoryRouter } from 'react-router-dom'
import { render, screen, fireEvent } from "@testing-library/react"
import '@testing-library/jest-dom'

import { LessonDetails } from "./LessonDetails"
import { ILessonDetailsProps } from "../../models"

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

describe('Lesson Details component', () => {
    const props: ILessonDetailsProps = {
        description: 'Test description',
        launchDate: '2023-05-01T00:00:00.000Z',
        rating: '3',
    };

    test('should render Lesson Details component with 3 tabs and description tab is active', () => {
        render(
            <MemoryRouter>
                <LessonDetails {...props} />
            </MemoryRouter>
        )

        const buttons = screen.getAllByRole('button')
        expect(buttons.length).toBe(3)

        const descriptionTab = screen.getByRole('button', { name: /description/i })
        expect(descriptionTab).toHaveClass('active')

        const descriptionContent = screen.getByText(props.description)
        expect(descriptionContent).toBeInTheDocument()
    })

    test('should switch tabs when clicked', () => {
        render(
            <MemoryRouter>
                <LessonDetails {...props} />
            </MemoryRouter>
        )

        const detailsTab = screen.getByRole('button', { name: /details/i })
        fireEvent.click(detailsTab)

        expect(detailsTab).toHaveClass('active')

        const launchDate = screen.getByText(/launch date/i)
        const rating = screen.getByText(/rating/i)
        expect(launchDate).toBeInTheDocument()
        expect(rating).toBeInTheDocument()

        const tagsTab = screen.getByRole('button', { name: /tags/i })
        fireEvent.click(tagsTab)

        expect(tagsTab).toHaveClass('active')

        const tags = screen.getByText(/tag1, tag2/i)
        expect(tags).toBeInTheDocument()
    })
})
