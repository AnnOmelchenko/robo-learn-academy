import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import { usePreviewLesson } from '../../api/lessons/queries/usePreviewLesson'
import { LessonPage } from './LessonPage'

jest.mock('../../api/lessons/queries/usePreviewLesson')
const mockUsePreviewLesson = usePreviewLesson as jest.Mock

describe('Lesson Page component', () => {
    const lessons = {
        data: {
            id: '1',
            title: 'Test title',
            description: 'Test description',
            lessons: [
                { id: 'lesson1', title: 'Lesson 1', order: 1, status: 'unlocked', link: 'lesson1.mp4' },
                { id: 'lesson2', title: 'Lesson 2', order: 2, status: 'unlocked', link: 'lesson2.mp4' },
            ],
            tags: ['tag1', 'tag2'],
            meta: {
                skills: ['skill1', 'skill2']
            },
            launchDate: '2023-05-01T00:00:00.000Z',
            rating: 5,
        },
        isLoading: false,
    }

    beforeEach(() => {
        mockUsePreviewLesson.mockReturnValue(lessons)
    })

    test('should render lesson details when not loading', () => {
        render(
            <MemoryRouter>
                <LessonPage />
            </MemoryRouter>
        )

        expect(screen.getByText(lessons.data.title)).toBeInTheDocument()
        expect(screen.getByText(lessons.data.description)).toBeInTheDocument()
    })

    test('should render loader when loading', () => {
        mockUsePreviewLesson.mockReturnValue({
            isLoading: true,
        })

        render(
            <MemoryRouter>
                <LessonPage />
            </MemoryRouter>
        )

        expect(screen.getByTestId('loader')).toBeInTheDocument()
    })

    test('should render video and lesson list when lesson is loaded', () => {
        render(
            <MemoryRouter>
                <LessonPage />
            </MemoryRouter>
        )

        expect(screen.getByTestId('lesson-video')).toBeInTheDocument()
        expect(screen.getAllByRole('listitem')).toHaveLength(2)
    })
})
