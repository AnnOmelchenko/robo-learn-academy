import { Link } from 'react-router-dom'

import './LessonSection.styled.scss'

import { RoutesManager } from '../../../../routesManager'
import { Star } from '../../../../ui-base/svg/Star'
import { SkillsSection } from '../../../../ui-shared/skillsSection/SkillsSection'
import { LessonDTO } from '../../../../types/lessons/lessons'

export const LessonSection = ({
  id,
  title,
  rating,
  skills,
  previewImageLink,
}: LessonDTO) => {

  return (
    <Link to={RoutesManager.view.root.getURL({ id })} className="lesson">
      <div>
        <div className="video">
            <img
              src={previewImageLink}
              alt={title}
              style={{
                width: '360px',
                height: '260px',
                objectFit: 'cover',
              }}
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
