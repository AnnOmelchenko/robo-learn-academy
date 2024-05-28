import { ReactElement } from 'react'

import { LessonPage } from './pages/lessonPage/LessonPage'
import LessonsListPage from './pages/lessonsListPage/LessonsListPage'
import { ArduinoPage } from './pages/arduinoPage/ArduinoPage'

interface AppRoute {
  component: ReactElement
  path: string
}

interface getURLParams {
  id?: string | number
}

export const RoutesManager = {
  home: {
    root: {
      pattern: '/home',
      getURL: () => '/home',
    },
  },
  lessons: {
    root: {
      pattern: '/lessons',
      getURL: () => '/lessons',
    },
  },
  view: {
    root: {
      pattern: '/lessons/view/:id/*',
      getURL: ({ id }: getURLParams) => `/lessons/view/${id}`,
    },
  },
  arduino: {
    root: {
      pattern: '/lessons/arduino/:id/*',
      getURL: ({ id }: getURLParams) => `/lessons/arduino/${id}`,
    },
  },
}

export const routes: AppRoute[] = [
  {
    component: <LessonsListPage />,
    path: RoutesManager.home.root.pattern,
  },
  {
    component: <LessonPage />,
    path: RoutesManager.view.root.pattern,
  },
  {
    component: <ArduinoPage />,
    path: RoutesManager.arduino.root.pattern,
  },
]
