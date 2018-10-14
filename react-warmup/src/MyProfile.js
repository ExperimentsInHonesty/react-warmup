import React from "react";
import axios from "axios";

class MyProfile extends React.Component {
  state = {
    pageIndex: 0,
    totalPages: 0,
    recordsPerPage: 5,
    records: [],
    searchResults: [],
    editRecord: {},
    searchResultsPageIndex: 0,
    searchResultsTotalPages: 0,
    searchRecordsPerPage: 2,
    searchQuery: "",
    searchResultsActive: false,
    success: false,
    error: false,
    inputTitle: {
      value: "",
      isValid: false,
      messageText: ""
    },
    inputBio: {
      value: "",
      isValid: false,
      messageText: ""
    },
    inputSummary: {
      value: "",
      isValid: false,
      messageText: ""
    },
    inputHeadline: {
      value: "",
      isValid: false,
      messageText: ""
    },
    inputSlug: {
      value: "",
      isValid: false,
      messageText: ""
    },
    inputStatusId: {
      value: "",
      isValid: false,
      messageText: ""
    },
    inputId: {
      value: "",
      isValid: false,
      messageText: ""
    },
    inputImage: {
      value: "",
      isValid: false,
      messageText: ""
    },
    inputSkills: {
      value: "",
      isValid: false,
      messageText: ""
    }
  };

  componentDidMount() {
    this.handleDisplay(
      "/api/people/",
      0,
      5,
      "pageIndex",
      "totalPages",
      "records"
    );
  }

  validateFieldsForLength = (value, min, max) => {
    return {
      validStatus: value.length >= min && value.length <= max,
      notValidMessage: `must have at least ${min} and no more than ${max} characters`
    };
  };
  validateFieldNumberOnly = value => {
    console.log("validateFieldNumberOnly", value);
    console.log("parseInt", parseInt(value));
    console.log(parseInt(value) === value);
    return {
      // validStatus: typeof parseInt(value) === "number" ? true : false,
      validStatus:
        Number.isInteger(parseInt(value)) && parseInt(value) > -1
          ? true
          : false,
      notValidMessage: `This field is not required.  If provided it must be a number greater than -1`
    };
  };
  validateFieldForUrl = (value, min) => {
    return {
      validStatus:
        value.match(/https?:\/\//) && value.length >= min ? true : false,
      notValidMessage: `must start with http: or https: and have a valid domain and image name with extention`
    };
  };
  validateFieldForSkills = (value, min) => {
    return {
      validStatus: value.length >= min && value.match(/[,]/g) ? true : false,
      notValidMessage: `Skills should be one word (or hyphenated e.g., baking-deserts) and seperated by commas`
    };
  };
  validateAllFields = (typeOfItem, valueOfItem) => {
    console.log("validateAllFields", typeOfItem);
    const minNumber = 2;
    const minNumforImage = 17;
    const title = 120;
    const bio = 700;
    const summary = 255;
    const headline = 80;
    const slug = 100;
    let maxNumber = 0;

    if (typeOfItem === "inputTitle") {
      maxNumber = title;
    } else if (typeOfItem === "inputBio") {
      maxNumber = bio;
    } else if (typeOfItem === "inputSummary") {
      maxNumber = summary;
    } else if (typeOfItem === "inputHeadline") {
      maxNumber = headline;
    } else if (typeOfItem === "inputSlug") {
      maxNumber = slug;
    } else if (typeOfItem === "inputImage") {
      return this.validateFieldForUrl(valueOfItem, minNumforImage);
    } else if (typeOfItem === "inputStatusId") {
      return this.validateFieldNumberOnly(valueOfItem);
    } else if (typeOfItem === "inputSkills") {
      return this.validateFieldForSkills(valueOfItem, minNumber);
    } else {
      return {
        validStatus: true,
        notValidMessage: ""
      };
    }
    return this.validateFieldsForLength(valueOfItem, minNumber, maxNumber);
  };

  // updatePersonInput(event) {  // the reason this dosen't work is it dosen't bind this the below binds this because its an arrow function

  updatePersonInput = event => {
    const name = event.target.name;
    const value = event.target.value;
    console.log("name", name);
    console.log("value", value);
    let isValid = false;
    isValid = this.validateAllFields(name, value);
    console.log("isValid", isValid);
    this.setState({
      [name]: {
        ...this.state[name],
        value,
        isValid: isValid.validStatus,
        message: isValid.notValidMessage
      }
    });
  };

  updateSearchQuery = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value,
      searchResultsActive: true
    });
    console.log("state", this.state.searchQuery);
  };

  getSearchResults = () => {
    console.log(
      "in getSearchResults what is this.state.searchQuery",
      this.state.searchQuery
    );
    this.handleDisplay(
      "/api/people/search/",
      0,
      5,
      "searchResultsPageIndex",
      "searchResultsTotalPages",
      "searchResults",
      this.state.searchQuery
    );
  };

  searchBoxDisplay = () => {
    console.log("inside searchBoxDisplay");
    return (
      <div>
        <div id="header-search">
          <h1>Search</h1>
        </div>
        <div>
          <label htmlFor="searchQuery" />
          <input
            type="text"
            size="50"
            id="searchQuery"
            placeholder="type the text you want to search for in the profiles"
            name="searchQuery"
            value={this.state.searchQuery.value}
            onChange={this.updateSearchQuery}
          />
          {/* {this.state.searchQuery.value.length > 0 &&
            !this.state.searhQuery.isValid && (
              <span style={{ color: "red" }}>
                {this.state.searchQuerymessage}
              </span>
            )} */}
          <button
            disabled={!this.state.searchQuery.length > 2}
            onClick={this.getSearchResults}
          >
            {" "}
            Search
          </button>
        </div>
      </div>
    );
  };

  nextSearchResult = () => {
    this.handleSearchResultNavigationButtons(+1);
  };

  backSearchResult = () => {
    this.handleSearchResultNavigationButtons(-1);
  };

  handleSearchResultNavigationButtons = direction => {
    this.handleDisplay(
      "/api/people/search/",
      this.state.searchResultsPageIndex + direction,
      this.state.searchRecordsPerPage,
      "searchResultsPageIndex",
      "searchResultsTotalPages",
      "searchResults",
      this.state.searchQuery
    );
  };

  editProfile = event => {
    const name = event.target.name;
    this.handleEditProfile(name);
  };

  handleEditProfile = idNum => {
    axios
      .get("/api/people/" + idNum)
      .then(response => {
        // console.log("inside the then pIndex should equal pageIndex", pIndex);
        this.setState({
          inputTitle: {
            ...this.state.inputTitle,
            value: response.data.item.title,
            isValid: this.validateAllFields(
              this.state.inputTitle,
              this.state.inputTitle.value
            ),
            message: ""
          },
          inputBio: {
            ...this.state.inputBio,
            value: response.data.item.bio,
            message: "",
            isValid: this.validateAllFields(
              this.state.inputTitle,
              this.state.inputTitle.value
            )
          },
          inputSummary: {
            ...this.state.inputSummary,
            value: response.data.item.summary,
            message: ""
          },
          inputHeadline: {
            ...this.state.inputHeadline,
            value: response.data.item.headline,
            message: ""
          },
          inputSlug: {
            ...this.state.inputSlug,
            value: response.data.item.slug,
            message: ""
          },
          inputStatusId: {
            ...this.state.inputStatusId,
            value: response.data.item.statusId,
            message: ""
          },
          inputId: {
            ...this.state.inputId,
            value: response.data.item.id,
            message: ""
          },
          inputSkills: {
            ...this.state.inputSkills,
            value: response.data.item.skills.map(obj => obj.name).join(", "),
            message: ""
          },
          inputImage: {
            ...this.state.inputImage,
            value: response.data.item.primaryImage.imageUrl,
            message: ""
          },
          editing: true
        });
        //set state is done
      })
      .catch(error => {
        console.error(error);
        this.setState({ success: false, error: true });
      });
  };

  //invoked in render with search results and all records results (all records displays immediately since the get is invoked in componentDidMount, search results displays after search results are in state as searchResultsActive)
  dataToDisplay = data => data.map(profile => this.writeToDOM(profile));
  // invoked from writeToDOM to handle the array of skills, turning it into a string
  getSkillsFromObject = array => array.map(obj => obj.name).join(", ");

  //invoked by dataToDisplay
  writeToDOM = record => {
    return (
      <div className="col-md-12 border border-secondary" key={record.id}>
        <div className="row">
          <div className="col-md-4">
            {record.primaryImage &&
              record.primaryImage.imageUrl.match(/https?:\/\//) && (
                <img
                  src={record.primaryImage.imageUrl}
                  height="100"
                  alt={record.bio}
                  className="image"
                  align="left"
                  // name={record.id}
                />
              )}
          </div>
          <div className="col-md-8">
            <p>
              Title: <span className="title">{record.title}</span>
            </p>
            <p>
              Bio: <span className="bio">{record.bio}</span>
            </p>

            <p>
              Headline: <span className="headline">{record.headline}</span>
            </p>

            <p>
              Slug: <span className="slug">{record.slug}</span>
            </p>

            <p>
              Record ID: <span className="id">{record.id}</span>
            </p>
            <p>
              skills:{" "}
              <span className="skills">
                {record.skills !== null &&
                  this.getSkillsFromObject(record.skills)}
              </span>
              {/*  <span className="skills">{JSON.stringify(record.skills)}</span> */}
            </p>
            <button
              type="button"
              className="btn btn-outline-secondary"
              name={record.id}
              onClick={this.editProfile}
            >
              Edit
            </button>
          </div>{" "}
          {/* end of record */}
          <hr />
        </div>
      </div>
    );
  };
  // This is the set of buttons for the all profiles display
  nextAllProfileDisplay = () => {
    this.handleProfileDisplayNavigationButtons(+1);
  };

  backAllProfileDisplay = () => {
    this.handleProfileDisplayNavigationButtons(-1);
  };
  handleProfileDisplayNavigationButtons = direction => {
    this.handleDisplay(
      "/api/people/",
      this.state.pageIndex + direction,
      this.state.recordsPerPage,
      "pageIndex",
      "totalPages",
      "records"
    );
  };

  // post handler that UPDATES bios in the db
  // handleUpdateClicked = event => {
  //   event.preventDefault();
  //   axios
  //     .post("/api/people/", {
  //       title: this.state.inputTitle.value,
  //       bio: this.state.inputBio.value,
  //       summary: this.state.inputSummary.value,
  //       headline: this.state.inputHeadline.value,
  //       slug: this.state.inputSlug.value,
  //       statusId: this.state.inputStatusId.value,
  //       skills: this.state.inputSkills.value.split(","),
  //       primaryImage: this.state.inputImage.value
  //     })
  //     .then(response => {
  //       this.setState({ success: true, error: false });
  //       console.log("post sucessful");
  //     })
  //     .catch(error => {
  //       this.setState({ success: false, error: true });
  //       console.log("axios call failed");
  //     });
  // };
  // post handler that ADDS bios to the db
  handleAddBioClicked = event => {
    event.preventDefault();
    axios
      .post("/api/people/", {
        title: this.state.inputTitle.value,
        bio: this.state.inputBio.value,
        summary: this.state.inputSummary.value,
        headline: this.state.inputHeadline.value,
        slug: this.state.inputSlug.value,
        statusId: this.state.inputStatusId.value,
        skills: this.state.inputSkills.value.split(","),
        primaryImage: this.state.inputImage.value
      })
      .then(response => {
        this.setState({ success: true, error: false });
        console.log("post sucessful");
      })
      .catch(error => {
        this.setState({ success: false, error: true });
        console.log("axios call failed");
      });
  };

  handleEditBioClicked = event => {
    event.preventDefault();
    const id = this.state.inputId.value;
    const url = "/api/people/" + id;
    axios
      .put(url, {
        title: this.state.inputTitle.value,
        bio: this.state.inputBio.value,
        summary: this.state.inputSummary.value,
        headline: this.state.inputHeadline.value,
        slug: this.state.inputSlug.value,
        statusId: this.state.inputStatusId.value,
        id: this.state.inputId.value,
        skills: this.state.inputSkills.value.split(","),
        primaryImage: this.state.inputImage.value
      })
      .then(response => {
        this.setState({ success: true, error: false });
        console.log("post sucessful");
      })
      .catch(error => {
        this.setState({ success: false, error: true });
        console.log("axios call failed", error);
      });
  };

  //get handler that performs all the get calls
  handleDisplay = (endpoint, page, qty, pIndex, totalP, destination, sq) => {
    console.log("in handleDisplay searchQuery should be robots", sq);
    let url = "";
    if (endpoint === "/api/people/search/") {
      url = endpoint + page + "/" + qty + "?q=" + sq;
    } else {
      url = endpoint + page + "/" + qty;
    }

    axios
      .get(url)
      .then(response => {
        // console.log("inside the then pIndex should equal pageIndex", pIndex);
        this.setState(
          {
            [pIndex]: response.data.item.pageIndex,
            [totalP]: response.data.item.totalPages,
            // the above set the totalPages property to 0 and resets it every time a call is made in case the number of records increases.
            [destination]: response.data.item.pagedItems
            // puts the data into the state
          }
          // () => {
          //   console.log("state.records", this.state.records);
          // }
        );
      })
      .catch(error => this.setState({ success: false, error: true }));
  };

  render() {
    return (
      <div>
        <div>{this.searchBoxDisplay()}</div>
        <div id="frmContainer">
          <div id="header-profile">
            <h1>Profile</h1>
          </div>

          <form>
            <div id="divThatWrapsAroundAllFormFields">
              <div>
                <label htmlFor="title" />
                {/* <label htmlfor"title">Title </label> */}
                <input
                  type="text"
                  size="35"
                  id="title"
                  placeholder="Title"
                  name="inputTitle"
                  value={this.state.inputTitle.value}
                  onChange={this.updatePersonInput}
                />
                {this.state.inputTitle.value.length > 0 &&
                  !this.state.inputTitle.isValid && (
                    <span style={{ color: "red" }}>
                      {this.state.inputTitle.message}
                    </span>
                  )}
              </div>

              <div>
                <p />
                <label htmlFor="bio" />
                <textarea
                  rows="4"
                  // size="35"
                  cols="32"
                  type="text"
                  align="bottom"
                  id="bio"
                  placeholder="Bio"
                  name="inputBio"
                  value={this.state.inputBio.value}
                  onChange={this.updatePersonInput}
                />
                {this.state.inputBio.value.length > 0 &&
                  !this.state.inputBio.isValid && (
                    <span style={{ color: "red" }}>
                      {this.state.inputBio.message}
                    </span>
                  )}
              </div>

              <div>
                <label htmlFor="summary" />
                <input
                  type="text"
                  size="35"
                  id="summary"
                  placeholder="Summary"
                  name="inputSummary"
                  value={this.state.inputSummary.value}
                  onChange={this.updatePersonInput}
                />
                {this.state.inputSummary.value.length > 0 &&
                  !this.state.inputSummary.isValid && (
                    <span style={{ color: "red" }}>
                      {this.state.inputSummary.message}
                    </span>
                  )}
              </div>

              <div>
                <label htmlFor="headline" />
                <input
                  type="text"
                  size="35"
                  id="headline"
                  placeholder="Headline"
                  name="inputHeadline"
                  value={this.state.inputHeadline.value}
                  onChange={this.updatePersonInput}
                />
                {this.state.inputHeadline.value.length > 0 &&
                  !this.state.inputHeadline.isValid && (
                    <span style={{ color: "red" }}>
                      {this.state.inputHeadline.message}
                    </span>
                  )}
              </div>

              <div>
                <label htmlFor="slug" />
                <input
                  type="text"
                  size="35"
                  id="slug"
                  placeholder="Slug"
                  name="inputSlug"
                  value={this.state.inputSlug.value}
                  onChange={this.updatePersonInput}
                />
                {this.state.inputSlug.value.length > 0 &&
                  !this.state.inputSlug.isValid && (
                    <span style={{ color: "red" }}>
                      {this.state.inputSlug.message}
                    </span>
                  )}
              </div>

              <div>
                <label htmlFor="skills"> </label>
                <input
                  type="text"
                  size="35"
                  id="skills"
                  placeholder="Skills"
                  name="inputSkills"
                  value={this.state.inputSkills.value}
                  onChange={this.updatePersonInput}
                />
                {this.state.inputSkills.value.length > 0 &&
                  !this.state.inputSkills.isValid && (
                    <span style={{ color: "red" }}>
                      {this.state.inputSkills.message}
                    </span>
                  )}
              </div>
              <div>
                <label htmlFor="statusId" />
                <input
                  type="number"
                  width="35"
                  min="980"
                  id="statusId"
                  placeholder="Status Id"
                  name="inputStatusId"
                  value={this.state.inputStatusId.value}
                  onChange={this.updatePersonInput}
                />
                {this.state.inputStatusId.value.length > 0 &&
                  !this.state.inputStatusId.isValid && (
                    <span style={{ color: "red" }}>
                      {this.state.inputStatusId.message}
                    </span>
                  )}
              </div>
              <div>
                <label htmlFor="picture"> </label>
                <input
                  type="text"
                  size="35"
                  id="picture"
                  placeholder="Upload Picture"
                  name="inputImage"
                  value={this.state.inputImage.value}
                  onChange={this.updatePersonInput}
                />
                {this.state.inputImage.value.length > 0 &&
                  !this.state.inputImage.isValid && (
                    <span style={{ color: "red" }}>
                      {this.state.inputImage.message}
                    </span>
                  )}
              </div>
              {!this.state.editing && (
                <button
                  disabled={
                    !this.state.inputTitle.isValid ||
                    !this.state.inputBio.isValid ||
                    !this.state.inputSummary.isValid ||
                    !this.state.inputHeadline.isValid ||
                    !this.state.inputSlug.isValid ||
                    !this.state.inputSkills.isValid ||
                    !this.state.inputImage.isValid
                  }
                  onClick={this.handleAddBioClicked}
                >
                  Add Bio
                </button>
              )}
              {this.state.editing && (
                <button
                  disabled={
                    !this.state.inputTitle.isValid ||
                    !this.state.inputBio.isValid ||
                    !this.state.inputSummary.isValid ||
                    !this.state.inputHeadline.isValid ||
                    !this.state.inputSlug.isValid ||
                    !this.state.inputSkills.isValid ||
                    !this.state.inputImage.isValid
                  }
                  onClick={this.handleEditBioClicked}
                >
                  Edit Bio
                </button>
              )}
            </div>
            {/* end of divThatWrapsAroundAllFormFields */}
          </form>
        </div>
        {/* end of frmContainer */}
        {this.state.searchResultsActive && (
          <React.Fragment>
            <div id="displaySearchResults">
              <div>
                <span>Search Results</span>
                {this.dataToDisplay(this.state.searchResults)}
              </div>
              <hr />
              <div
                className="col-md-10 center-block text-center"
                id="displaySearchNav"
              >
                {" "}
                <button
                  disabled={!this.state.searchResultsPageIndex > 0}
                  type="button"
                  className="btn btn-outline-secondary"
                  id="back"
                  onClick={this.backSearchResult}
                >
                  Back
                </button>{" "}
                <span id="pageXOfY">
                  {" "}
                  page {this.state.searchResultsPageIndex + 1} of{" "}
                  {this.state.searchResultsTotalPages}{" "}
                </span>
                <button
                  disabled={
                    this.state.searchResultsPageIndex + 1 ===
                    this.state.searchResultsTotalPages
                  }
                  type="button"
                  className="btn btn-outline-secondary"
                  id="next"
                  onClick={this.nextSearchResult}
                >
                  Next
                </button>{" "}
              </div>
            </div>
          </React.Fragment>
        )}
        {/* end of div displaySearchResults */}
        <div className="col-md-10" id="displayRecords" />
        <hr />
        {/* <span>display records here</span> */}
        {this.dataToDisplay(this.state.records)}
        <hr />
        <div
          className="col-md-10 center-block text-center"
          id="displayRecordsNav"
        >
          <button
            disabled={!this.state.pageIndex > 0}
            type="button"
            className="btn btn-outline-secondary"
            id="back"
            onClick={this.backAllProfileDisplay}
          >
            Back
          </button>{" "}
          <span id="pageXOfY">
            {" "}
            page {this.state.pageIndex + 1} of {this.state.totalPages}{" "}
          </span>
          <button
            disabled={this.state.pageIndex + 1 === this.state.totalPages}
            type="button"
            className="btn btn-outline-secondary"
            id="next"
            onClick={this.nextAllProfileDisplay}
          >
            Next
          </button>
        </div>
        {/* this is the end of the nav */}
      </div>
      // {this is end of main div}
    );
  }
}
export default MyProfile;
//end of file
