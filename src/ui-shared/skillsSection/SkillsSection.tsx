import './SkillsSection.styled.scss'
import { ISkillsSectionProps } from './models'

export const SkillsSection = ({ skills }: ISkillsSectionProps) => (
  <div>
    <h5 className='skillsTitle'>Skills:</h5>
    <ul>
      {skills.map((skill, index) => (
        <li className='skillsItem' key={index}>{skill}</li>
      ))}
    </ul>
  </div>
)
