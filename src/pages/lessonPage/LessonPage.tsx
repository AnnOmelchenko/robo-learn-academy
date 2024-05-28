import { useRef } from 'react'
import { useParams, Link } from 'react-router-dom'

import './LessonPage.styled.scss'

import { LessonDetails } from './components/lessonDetails/LessonDetails'
import { usePreviewLesson } from '../../api/lessons/queries/usePreviewLesson'
import { useUpdateVideoMeta } from '../../hooks/useUpdateVideoMeta'
import { RoutesManager } from '../../routesManager'
import { SkillsSection } from '../../ui-shared/skillsSection/SkillsSection'

export const LessonPage = () => {
  const videoRef = useRef<HTMLIFrameElement | null>(null)
  const { id } = useParams<{ id: string }>()
  const data = usePreviewLesson(id!);

  useUpdateVideoMeta(id, videoRef.current)

  return (
    <div className="lessonPage">
      {data && (
        <>
          <h3 className="title">{data.title}</h3>

          <div className="contentWrapper">
            <div className="videoWrapper">
              <iframe ref={videoRef} id={data.videoUrl} src={data.videoUrl} data-testid="lesson-video" />
            </div>

            <div className="skillsWrapper">
              <SkillsSection skills={data.skills} />
              <div className='arduinoWrapper'>
                <h3 className="subtitle">Improve your skills. Try to program it yourself in the Arduino simulator:</h3>
                <Link to={RoutesManager.arduino.root.getURL({ id })} className='buttonWrapper'>
                  <button className='arduinoButton'>Arduino playground</button>
                </Link>
              </div>
            </div>
          </div>

          <LessonDetails
            description={data.description}
            launchDate={data.launchDate}
            rating={data.rating}
          />
        </>
      )}
    </div>
  )
}
