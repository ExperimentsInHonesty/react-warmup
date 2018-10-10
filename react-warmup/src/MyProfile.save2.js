import React from "react";
import axios from "axios";

class MyProfile extends React.Component {
  state = {
    pageIndex: 0,
    totalPages: 0,
    recordsPerPage: 100,
    records: [],
    success: false,
    error: false
  };

  componentDidMount() {
    this.handleProfileDisplay(0, 100);
  }

  dataToDisplay = () =>
    this.state.records.map(profile => this.writeToDOM(profile));

  getSkillsFromObject = array => array.map(obj => obj.name).join(", ");

  writeToDOM(record) {
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
                  name={record.id}
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
          </div>{" "}
          <hr />
        </div>
      </div>
    );
  }

  // prevPage = () => {
  //   this.setState(prev => ({ pageIndex: prev.pageIndex - 1 }), this.loadPage);
  // };

  // nextPage = () => {
  //   this.setState(prev => ({ pageIndex: prev.pageIndex + 1 }), this.loadPage);
  // };

  nextProfile = () => {
    // $("#displayRecords").empty();
    this.handleProfileDisplay(this.state.pageIndex + 1, this.state.totalPages);
  };

  backProfile = () => {
    // $("#displayRecords").empty();
    this.handleProfileDisplay(this.state.pageIndex - 1, this.state.totalPages);
  };

  handleProfileDisplay = (page, qty) => {
    axios
      // .get("/api/people/0/10")
      .get("/api/people/" + page + "/" + qty)
      .then(response => {
        console.log("response", response.data.item.totalPages);
        console.log("response", response.data.item.pageIndex);

        this.setState(
          {
            totalPages: response.data.item.totalPages,
            pageIndex: response.data.item.pageIndex,
            // the above set the totalPages property to 0 and resets it every time a call is made in case the number of records increases.
            records: response.data.item.pagedItems
            // puts the data into the state
          },
          () => {
            console.log("state.records", this.state.records);
          }
        );
      })
      .catch(error => this.setState({ success: false, error: true }));
  };

  render() {
    return (
      <div>
        <div id="frmContainer">
          <div id="header">
            <h1>Profile</h1>
          </div>

          <form>
            <div id="divThatWrapsAroundAllFormFields">
              <div>
                <label htmlFor="title">Title </label>
                {/* <label htmlfor"title">Title </label> */}
                <input type="text" id="title" placeholder="Title" />
              </div>

              <div>
                <label htmlFor="bio">Bio </label>
                <input type="text" id="bio" placeholder="Bio" />
              </div>

              <div>
                <label htmlFor="summary">Summary </label>
                <input type="text" id="summary" placeholder="Summary" />
              </div>

              <div>
                <label htmlFor="headline">Headline </label>
                <input type="text" id="headline" placeholder="Headline" />
              </div>

              <div>
                <label htmlFor="slug">Slug </label>
                <input type="text" id="slug" placeholder="Slug" />
              </div>

              <div>
                <label htmlFor="statusId">Status Id </label>
                <input type="text" id="status Id" placeholder="Status Id" />
              </div>

              <div>
                <label htmlFor="skills">Skills </label>
                <input type="text" id="skills" placeholder="Skills" />
              </div>
            </div>
            {/* end of divThatWrapsAroundAllFormFields */}
          </form>
        </div>
        {/* end of frmContainer */}

        <div className="col-md-10" id="displayRecords" />
        <hr />
        {/* <span>display records here</span> */}
        {this.dataToDisplay()}
        <hr />
        <div className="col-md-10 center-block text-center" id="displayNav">
          {this.state.pageIndex > 0 && (
            <button
              type="button"
              className="btn btn-outline-secondary"
              id="back"
              onClick={this.backProfile}
            >
              Back
            </button>
          )}
          &nbsp;{" "}
          <span id="pageXOfY">
            {" "}
            page {this.state.pageIndex + 1} of {this.state.totalPages}{" "}
          </span>
          {this.state.pageIndex !== this.state.totalPages && (
            <button
              type="button"
              className="btn btn-outline-secondary"
              id="next"
              onClick={this.nextProfile}
            >
              Next
            </button>
          )}
        </div>
      </div>
    );
  }
}
export default MyProfile;
