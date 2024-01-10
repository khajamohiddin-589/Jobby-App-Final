import {IoIosSearch} from 'react-icons/io'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {Component} from 'react'
import './index.css'
import Header from '../Header'
import UserProfileAndFiltering from '../UserProfileAndFiltering'
import JobItemDisplay from '../JobItemDisplay'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    searchText: '',
    employeeType: [],
    radioValue: '',
  }

  componentDidMount() {
    this.getJobs()
  }

  changeType = type => {
    const {employeeType} = this.state
    let newList = []
    if (employeeType.includes(type)) {
      newList = employeeType.filter(each => each !== type)
    } else {
      newList = [...employeeType, type]
    }
    console.log(type in employeeType)
    this.setState({employeeType: newList}, this.getJobs)
  }

  changeRadio = value => {
    this.setState({radioValue: value}, this.getJobs)
  }

  onClickSearchIcon = () => {
    this.getJobs()
  }

  onClickJobSearch = event => {
    this.setState({searchText: event.target.value})
  }

  onClickRetry = () => {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {searchText, employeeType, radioValue} = this.state
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs?employment_type=${employeeType.join(
      ',',
    )}&minimum_package=${radioValue}&search=${searchText}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const {jobs} = data
      const updatedJobsList = jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        packagePerAnnum: eachJob.package_per_annum,
        employmentType: eachJob.employment_type,
        jobDescription: eachJob.job_description,
        id: eachJob.id,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsList: updatedJobsList,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobsList = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.jobsListContainer()
      case apiStatusConstants.inProgress:
        return this.renderLoading()
      case apiStatusConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  jobsListContainer = () => {
    const {jobsList} = this.state
    const emptyJobsList = jobsList.length === 0

    return emptyJobsList ? (
      this.renderNoJobs()
    ) : (
      <ul className="jobs-unordered-list">
        {jobsList.map(eachJob => (
          <JobItemDisplay key={eachJob.id} jobItemDetails={eachJob} />
        ))}
      </ul>
    )
  }

  renderLoading = () => (
    <div className="loading-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailure = () => (
    <div className="jobs-failure-view">
      <img
        className="failure-image"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <div className="failure-details-container">
        <h1 className="failure-heading">Oops! Something Went Wrong</h1>
        <p className="failure-details">
          We cannot seem to find the page you are looking for
        </p>
        <button
          onClick={this.onClickRetry}
          type="button"
          className="retry-button-jobs"
        >
          Retry
        </button>
      </div>
    </div>
  )

  renderNoJobs = () => (
    <div className="jobs-failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        className="failure-image"
        alt="no jobs"
      />
      <h1 className="failure-heading">No Jobs Found</h1>
      <p className="failure-details">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  render() {
    const {searchText, employeeType} = this.state

    console.log(employeeType)

    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="search-and-users-container">
            <div className="search-container-jobs">
              <input
                value={searchText}
                onChange={this.onClickJobSearch}
                placeholder="Search"
                type="search"
                className="search-jobs-page"
              />{' '}
              <button
                type="button"
                data-testid="searchButton"
                onClick={this.onClickSearchIcon}
                className="search-icon-container-jobs"
              >
                {' '}
                <IoIosSearch className="search-icon-jobs" />{' '}
              </button>
            </div>
            <UserProfileAndFiltering
              changeType={this.changeType}
              changeRadio={this.changeRadio}
              salaryRangesList={salaryRangesList}
              employmentTypesList={employmentTypesList}
            />
          </div>

          <div className="jobs-display">
            <div className="search-container-jobs large">
              <input
                onChange={this.onClickJobSearch}
                placeholder="Search"
                type="search"
                className="search-jobs-page"
              />{' '}
              <button
                type="button"
                data-testid="searchButton"
                onClick={this.onClickSearchIcon}
                className="search-icon-container-jobs"
              >
                {' '}
                <IoIosSearch className="search-icon-jobs" />{' '}
              </button>
            </div>
            {this.renderJobsList()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
