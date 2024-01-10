import {FaStar} from 'react-icons/fa'
import {IoLocation} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobCard = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobDetails
  return (
    <li className="each-job-item-display-container-similar">
      <div className="job-item-main-container-similar">
        <div className="logo-container-similar">
          <img
            src={companyLogoUrl}
            alt={id}
            className="company-logo-job-similar"
          />
          <div className="job-role-container-similar">
            <h1 className="job-role-heading-similar">{title}</h1>
            <div className="rating-icon-container-similar">
              <FaStar className="star-icon-similar" />
              <p className="rating-description-similar">{rating}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="description-container-similar">
        <p className="description-similar">Description</p>
        <p className="detailed-description-similar">{jobDescription}</p>
        <div className="job-details-container-similar">
          <div className="job-details-container-one-similar">
            <div className="location-container-similar">
              <IoLocation className="location-icon-similar" />
              <p className="location-description-similar">{location}</p>
            </div>
            <div className="location-container-similar">
              <BsFillBriefcaseFill className="location-icon-similar" />
              <p className="location-description-similar">{employmentType}</p>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobCard
