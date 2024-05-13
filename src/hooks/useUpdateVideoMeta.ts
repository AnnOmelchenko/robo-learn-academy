import { useCallback, useEffect } from 'react'
import { LessonDTO } from '../types/lessons/lessons'

export const useUpdateVideoMeta = (id?: LessonDTO['id'], videoRefCurrent?: HTMLIFrameElement | null) => {
    const updateVideoMeta = useCallback(
        (video: HTMLIFrameElement) => {
            if (id) {
                const videoMeta = {
                    id,
                    currentTime: video,
                }
                window.localStorage.setItem(id, JSON.stringify(videoMeta))
            }
        },
        [id],
    )

    useEffect(() => {
        if (videoRefCurrent) {

            videoRefCurrent.addEventListener('timeupdate', () =>
                updateVideoMeta(videoRefCurrent as HTMLIFrameElement),
            )

            return () =>
                videoRefCurrent?.removeEventListener('timeupdate', () =>
                    updateVideoMeta(videoRefCurrent as HTMLIFrameElement),
                )
        }
    }, [updateVideoMeta, videoRefCurrent])
}
