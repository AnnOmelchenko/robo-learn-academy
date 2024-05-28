import "@wokwi/elements";
import { Buffer } from 'buffer';
import { useParams } from 'react-router-dom'

import "./ArduinoPage.styled.scss";
import { usePreviewLesson } from '../../api/lessons/queries/usePreviewLesson'

// @ts-ignore
window.Buffer = Buffer;

export const ArduinoPage = () => {
  const { id } = useParams<{ id: string }>()
  const data = usePreviewLesson(id!);

  return (
      <div className="arduinoPage">
        <>
          <h3 className="title">ARDUINO SIMULATOR</h3>
          {data?.arduinoPage}
        </>
      </div>
  );
};
