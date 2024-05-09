import { usePreviewLessons } from './usePreviewLessons'

export const usePreviewLesson = (id: string) => {
  return usePreviewLessons().find(el => el.id === id);
}