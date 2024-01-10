import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaStar, FaExternalLinkAlt} from 'react-icons/fa'
import {IoLocation} from 'react-icons/io5'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {Component} from 'react'

import SkillsCard from '../SkillsCard'
import SimilarJobCard from '../SimilarJobCard'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class JobCard extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobDetails: [],
    similarJobDetails: [],
  }

  componentDidMount() {
    this.getJobCard()
  }

  onClickRetry = () => {
    this.getJobCard()
  }

  camelCaseJobDetails = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    title: data.title,
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    skills: data.skills.map(eachSkill => ({
      name: eachSkill.name,
      imageUrl: eachSkill.image_url,
    })),
  })

  camelCaseSimilarJobs = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    rating: data.rating,
    title: data.title,
  })

  getJobCard = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const updatedJobDetails = this.camelCaseJobDetails(data.job_details)
      const updatedSimilarJobs = data.similar_jobs.map(each =>
        this.camelCaseSimilarJobs(each),
      )
      this.setState({
        apiStatus: apiStatusConstants.success,
        jobDetails: updatedJobDetails,
        similarJobDetails: updatedSimilarJobs,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  successView = () => {
    const {jobDetails, similarJobDetails} = this.state
    console.log(similarJobDetails)
    const {
      id,
      title,
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      skills,
      lifeAtCompany,
    } = jobDetails
    const {description, imageUrl} = lifeAtCompany
    return (
      <div className="job-card-container">
        <div className="job-card-main-container">
          <div className="job-item-main-container-card">
            <div className="logo-container-card">
              <img
                src={companyLogoUrl}
                alt={id}
                className="company-logo-job-card"
              />
              <div className="job-role-container-card">
                <h1 className="job-role-heading-card">{title}</h1>
                <div className="rating-icon-container-card">
                  <FaStar className="star-icon-card" />
                  <p className="rating-description-card">{rating}</p>
                </div>
              </div>
            </div>
            <div className="job-details-container-card">
              <div className="job-details-container-one-card">
                <div className="location-container-card">
                  <IoLocation className="location-icon-card" />
                  <p className="location-description-card">{location}</p>
                </div>
                <div className="location-container-card">
                  <BsFillBriefcaseFill className="location-icon-card" />
                  <p className="location-description-card">{employmentType}</p>
                </div>
              </div>
              <div className="job-details-container-two-card">
                <h1 className="salary-heading-card">{packagePerAnnum}</h1>
              </div>
            </div>
          </div>
          <hr className="line-job-item-card" />
          <div className="description-container-card">
            <div className="description-visit-link-container">
              <p className="description-card">Description</p>
              <a href={companyWebsiteUrl} className="link-container">
                <p className="visit-text">Visit</p>
                <FaExternalLinkAlt className="link-icon" />
              </a>
            </div>

            <p className="detailed-description-card">{jobDescription}</p>
          </div>
          <div className="skills-container">
            <h1 className="skills-heading">Skills</h1>
            <ul className="skills-main-container">
              {skills.map(eachSkill => (
                <SkillsCard key={eachSkill.name} skillDetails={eachSkill} />
              ))}
            </ul>
          </div>
          <div className="life-at-company-container">
            <h1 className="life-at-company-text">Life at Company</h1>
            <div className="life-at-company-inner-container">
              <p className="life-at-company-description">{description}</p>
              <img src={imageUrl} alt={id} className="life-at-company-image" />
            </div>
          </div>
        </div>
        <div className="similar-jobs-container">
          <h1 className="similar-jobs-heading">Similar Jobs</h1>
          <ul className="similar-jobs-unordered-list">
            {similarJobDetails.map(eachJob => (
              <SimilarJobCard similarJobDetails={eachJob} key={eachJob.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  failureView = () => (
    <div className="failure-container-job-card">
      <img
        className="failure-job-card-image"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <div className="failure-text-container">
        <h1 className="failure-heading">Oops! Something Went Wrong</h1>
        <p className="failure-description">
          We cannot seem to find the page you are looking for.
        </p>
      </div>

      <button
        onClick={this.onClickRetry}
        type="button"
        className="retry-button-job-card"
      >
        Retry
      </button>
    </div>
  )

  loadingView = () => (
    <div className="loading-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFinalResult = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.successView()
      case apiStatusConstants.failure:
        return this.failureView()
      case apiStatusConstants.inProgress:
        return this.loadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderFinalResult()}
      </>
    )
  }
}

export default JobCard
