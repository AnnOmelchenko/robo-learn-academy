import { useState } from 'react'
import ReactPaginate from 'react-paginate'

import './LessonsList.styled.scss'

import { usePreviewLessons } from '../../../../api/lessons/queries/usePreviewLessons'
import { LessonSection } from '../lessonSection/LessonSection'

export const LessonsList = () => {
  const data = usePreviewLessons()
  const [startItemOffset, setStartItemOffset] = useState(0)
  const numberOfItems = 4
  const endItemOffset = startItemOffset + numberOfItems
  const paginatedLessonsList = data?.slice(startItemOffset, endItemOffset)
  const pageCount = Math.ceil(data?.length! / numberOfItems)

  const handlePageClick = (selectedItem: { selected: number }) => {
    const newOffset = (selectedItem.selected * numberOfItems) % data!.length
    setStartItemOffset(newOffset)
  }

  return (
    <div className="listWrapper" data-testid="Lessons-list">
      {paginatedLessonsList?.length &&
        paginatedLessonsList.map(({ id, title, videoUrl, rating, skills, description, launchDate, previewImageLink }) => (
          <LessonSection
            key={id}
            id={id}
            title={title}
            videoUrl={videoUrl}
            rating={rating}
            skills={skills}
            description={description}
            launchDate={launchDate}
            previewImageLink={previewImageLink}
          />
        ))}

      <ReactPaginate
        containerClassName="pagination"
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={numberOfItems}
        pageCount={pageCount}
        previousLabel="<"
      />
    </div>
  )
}
