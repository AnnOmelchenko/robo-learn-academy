import { useRef, useEffect } from 'react'
import HoverVideoPlayer from 'react-hover-video-player'
import { Link } from 'react-router-dom'

import './LessonSection.styled.scss'

import { RoutesManager } from '../../../../routesManager'
import { Star } from '../../../../ui-base/svg/Star'
import { SkillsSection } from '../../../../ui-shared/skillsSection/SkillsSection'
import { attachHlsMedia } from '../../../../utils/attachHlsMedia'
import { LessonDTO } from '../../../../types/lessons/lessons'

export const LessonSection = ({
  id,
  title,
  videoUrl,
  rating,
  skills,
  previewImageLink,
}: LessonDTO) => {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    attachHlsMedia(videoRef.current)
  }, [videoRef])

  return (
    <Link to={RoutesManager.view.root.getURL({ id })} className="lesson">
      <div>
        <div className="video">
          <HoverVideoPlayer
            videoRef={videoRef}
            videoId={videoUrl}
            videoSrc={videoUrl}
            pausedOverlay={
              <img
                src={previewImageLink}
                alt={title}
                style={{
                  width: '360px',
                  height: '260px',
                  objectFit: 'cover',
                }}
              />
            }
          />
        </div>

        <div className="footer">
          <div className="rating">
            <p className='ratingTitle'>Rating: {rating}</p>
            <Star />
          </div>
        </div>
      </div>

      <div className="descriptionWrapper">
        <div>
          <h4 className='lessonTitle'>{title}</h4>
          {skills && <SkillsSection skills={skills} />}
        </div>
      </div>
    </Link>
  )
}
