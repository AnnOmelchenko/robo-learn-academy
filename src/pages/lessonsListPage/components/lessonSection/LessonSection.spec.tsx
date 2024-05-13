import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { MemoryRouter } from 'react-router-dom'

import { LessonSection } from './LessonSection'

describe('Lesson Section component', () => {
  const props = {
    id: '1',
    title: 'Test Lesson',
    skills: ['Skill 1', 'Skill 2'],
    videoUrl: 'https://example.com/video.mp4',
    rating: '4.5',
    description: 'description',
    launchDate: 'Mon 01 2022',
    previewImageLink: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Arduino_Uno_-_R3.jpg',
  };

  it('should render the lesson section with correct data', () => {
    render(
      <MemoryRouter>
        <LessonSection {...props} />
      </MemoryRouter>
    );

    expect(screen.getByText(props.title)).toBeInTheDocument()
    expect(screen.getByText(`Rating: ${props.rating}`)).toBeInTheDocument()
    expect(screen.getByTestId('star')).toBeInTheDocument()
    expect(screen.getByAltText('Test Lesson')).toBeInTheDocument()
    expect(screen.getByText(props.skills[0])).toBeInTheDocument()
    expect(screen.getByText(props.skills[1])).toBeInTheDocument()
  })

  it('should attach HLS media to the video element', () => {
    const attachHlsMediaMock = jest.spyOn(require('../../../../utils/attachHlsMedia'), 'attachHlsMedia');
    const { container } = render(
      <MemoryRouter>
        <LessonSection {...props} />
      </MemoryRouter>
    );

    const videoElement = container.querySelector('video');

    expect(attachHlsMediaMock).toHaveBeenCalledWith(videoElement);
  });
});
