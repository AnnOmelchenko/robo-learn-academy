import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import './LessonDetails.styled.scss'
import { TabButton } from './tabButton/TabButton'
import { ILessonDetailsProps } from '../../models'

export const LessonDetails = ({ description, launchDate, rating }: ILessonDetailsProps) => {
  const navigate = useNavigate()
  const { hash } = useLocation()
  const [currentTab, setCurrentTab] = useState(hash || '#description')
  const isDescriptionTab = currentTab === '#description'
  const isDetailsTab = currentTab === '#details'

  const handleTabChange = (e: React.MouseEvent) => {
    const id = (e.target as HTMLButtonElement).id
    navigate({ hash: `#${id}` })
    setCurrentTab(`#${id}`)
  }

  return (
    <div className="aboutWrapper">
      <div className="buttonsWrapper">
        <TabButton
          id="description"
          className={isDescriptionTab ? 'active' : ''}
          handleClick={handleTabChange}
          text="Description"
        />
        <TabButton
          id="details"
          className={isDetailsTab ? 'active' : ''}
          handleClick={handleTabChange}
          text="Details"
        />
      </div>

      {isDescriptionTab && (
        <div className="tab">
          <p>{description}</p>
        </div>
      )}

      {isDetailsTab && (
        <div className="tab">
          <div className="block">
            <h4>Launch Date: </h4>
            <p>{launchDate}</p>
          </div>
          <div className="block">
            <h4>Rating: </h4>
            <p>{rating}</p>
          </div>
        </div>
      )}
    </div>
  )
}
