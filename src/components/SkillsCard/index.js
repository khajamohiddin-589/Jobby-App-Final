import './index.css'

const SkillsCard = props => {
  const {skillDetails} = props
  const {name, imageUrl} = skillDetails
  return (
    <li className="skill-card">
      <img src={imageUrl} alt={name} className="skill-image" />
      <h1 className="skill-name">{name}</h1>
    </li>
  )
}

export default SkillsCard
