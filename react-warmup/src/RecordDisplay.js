import React from "react";

const RecordDisplay = props => {
  const getSkillsFromObject = array => array.map(obj => obj.name).join(", ");
  const { record, editProfile } = props;
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
              {record.skills !== null && getSkillsFromObject(record.skills)}
            </span>
            {/*  <span className="skills">{JSON.stringify(record.skills)}</span> */}
          </p>
          <button
            type="button"
            className="btn btn-outline-secondary"
            name={record.id}
            onClick={editProfile}
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
export default RecordDisplay;
