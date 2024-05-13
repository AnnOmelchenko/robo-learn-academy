import { LessonDTO } from '../../types/lessons/lessons'

export interface ITabButtonProps {
  text: string
  id: string
  className: string
  handleClick: (e: React.MouseEvent) => void
}

export type ILessonDetailsProps = Pick<LessonDTO, 'description' | 'launchDate' | 'rating'>

