import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {IoLocation} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobItemDisplay = props => {
  const {jobItemDetails} = props
  const {
    title,
    rating,
    packagePerAnnum,
    location,
    jobDescription,
    id,
    employmentType,
    companyLogoUrl,
  } = jobItemDetails

  return (
    <Link className="nav-link" to={`/jobs/${id}`}>
      <li className="each-job-item-display-container">
        <div className="job-item-main-container">
          <div className="logo-container">
            <img src={companyLogoUrl} alt={id} className="company-logo-job" />
            <div className="job-role-container">
              <h1 className="job-role-heading">{title}</h1>
              <div className="rating-icon-container">
                <FaStar className="star-icon" />
                <p className="rating-description">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-details-container">
            <div className="job-details-container-one">
              <div className="location-container">
                <IoLocation className="location-icon" />
                <p className="location-description">{location}</p>
              </div>
              <div className="location-container">
                <BsFillBriefcaseFill className="location-icon" />
                <p className="location-description">{employmentType}</p>
              </div>
            </div>
            <div className="job-details-container-two">
              <h1 className="salary-heading">{packagePerAnnum}</h1>
            </div>
          </div>
        </div>
        <hr className="line-job-item" />
        <div className="description-container">
          <p className="description">Description</p>
          <p className="detailed-description">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobItemDisplay
