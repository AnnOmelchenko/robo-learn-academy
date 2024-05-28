import { LessonDTO } from "../../../types/lessons/lessons"
import { LessonOne } from "../../../pages/arduinoPage/components/LessonOne";
import { LessonTwo } from "../../../pages/arduinoPage/components/LessonTwo";

export const usePreviewLessons = (): LessonDTO[] => {
  return [
    {
      id: 'lesson1',
      title: 'LED Sequential Control',
      videoUrl: 'https://www.youtube.com/embed/e1FVSpkw6q4?si=TJnyAJ--KJSZEo51',
      rating: '4.8',
      description: "In this lesson, you will dive into the exciting world of Arduino programming and digital electronics by learning how to program LED sequential control in an Arduino simulator. You will start by understanding the basics of Arduino programming and the C/C++ language, which is used to write Arduino sketches. You will then explore the concept of digital electronics and how it relates to controlling LEDs. Through hands-on exercises, you will learn how to use the Arduino simulator to write code that controls the sequence of LEDs, creating various patterns such as blinking, fading, and sequential lighting. By the end of the lesson, you will have gained valuable skills in Arduino programming, digital electronics, and simulation, setting a solid foundation for further exploration in the world of embedded systems and IoT.",
      launchDate: 'Mon Jun 13 2022',
      previewImageLink: 'https://projects.arduinocontent.cc/cover-images/74121398-c43c-4b35-9b59-1224f73f10e0.blob',
      skills: [
        "Arduino programming",
        "C/C++ programming",
        "Understanding of digital electronics",
        "Problem-solving skills",
        "Logical thinking",
        "Understanding of sequential control",
        "Simulation skills"
      ],
      arduinoPage: LessonOne(),
    },
    {
      id: 'lesson2',
      title: 'Arduino Pulse-Width-Modulation',
      videoUrl: 'https://www.youtube.com/embed/7OYLakRyjTc?si=Y4N6w-xFqhT1yps9',
      rating: '4.5',
      description: 'Dive into the fascinating world of Pulse Width Modulation (PWM) with our comprehensive Arduino PWM lesson. This lesson is designed to equip you with the skills and knowledge to effectively utilize PWM in a variety of Arduino projects. Whether you`re a beginner or an experienced maker, you`ll find valuable insights and practical applications that will enhance your understanding and capabilities.',
      launchDate: 'Wed Oct 19 2023',
      previewImageLink: 'https://i0.wp.com/randomnerdtutorials.com/wp-content/uploads/2018/10/esp32-pwm-thumbnail.jpg?fit=1280%2C720&quality=100&strip=all&ssl=1',
      skills: [
        "Understanding PWM Concepts",
        "Arduino PWM Capabilities",
        "Generating PWM Signals",
        "Controlling LED Brightness",
        "Motor Speed Control",
        "Programming Skills",
        "Circuit Design"
    ],
      arduinoPage: LessonTwo(),
    }
  ]
}
