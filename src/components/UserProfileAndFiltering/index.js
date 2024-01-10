import UserProfile from '../UserProfile'
import './index.css'

const UserProfileAndFiltering = props => {
  const {employmentTypesList, salaryRangesList} = props
  return (
    <div className="user-profile-filtering-container">
      <UserProfile />
      <hr className="line" />
      <div className="filtering-container">
        <h1 className="filter-heading">Types of Employment</h1>
        <ul className="filter-list">
          {employmentTypesList.map(eachEmployee => {
            const {changeType} = props
            const onChangeCheckbox = event => {
              changeType(event.target.value)
            }
            return (
              <li
                key={eachEmployee.employmentTypeId}
                className="list-item-filter"
                onChange={onChangeCheckbox}
              >
                <input
                  type="checkbox"
                  id={eachEmployee.employmentTypeId}
                  className="checkbox-input"
                  value={eachEmployee.employmentTypeId}
                />
                <label
                  className="label-input"
                  htmlFor={eachEmployee.employmentTypeId}
                >
                  {eachEmployee.label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
      <hr className="line" />
      <div className="filtering-container">
        <h1 className="filter-heading">Salary Range</h1>
        <ul className="filter-list">
          {salaryRangesList.map(eachSalary => {
            const {changeRadio} = props
            const onChangeRadioButton = () => {
              changeRadio(eachSalary.salaryRangeId)
            }
            return (
              <li
                onChange={onChangeRadioButton}
                key={eachSalary.salaryRangeId}
                className="list-item-filter"
              >
                <input
                  type="radio"
                  name="salary"
                  id={eachSalary.salaryRangeId}
                  className="checkbox-input"
                />
                <label
                  className="label-input"
                  htmlFor={eachSalary.salaryRangeId}
                >
                  {eachSalary.label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default UserProfileAndFiltering
