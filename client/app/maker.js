let csrfT;

const handleLink = (e) => {
  e.preventDefault();
  $("#linkMessage").animate(
    {
      width: "hide",
    },
    350
  );
  if ($("#linkName").val() == "" || $("#linkURL").val() == "") {
    handleError("RAWR! All fields are required");
    return false;
  }

  sendAjax(
    "POST",
    $("#linkForm").attr("action"),
    $("#linkForm").serialize(),
    function () {
      loadLinksFromServer();
    }
  );
  return false;
};

const handleDelete = (e) => {
  e.preventDefault();

  sendAjax(
    "DELETE",
    $("#deleteForm").attr("action"),
    $("#deleteForm").serialize(),
    function () {
      loadLinksFromServer();
    }
  );
  return false;
};

const LinkForm = (props) => {
  return (
    <form
      id="linkForm"
      onSubmit={handleLink}
      name="linkForm"
      action="/maker"
      method="POST"
      className="linkForm"
    >
      <label htmlFor="name">Name: </label>
      <input
        id="linkNameInput"
        type="text"
        name="name"
        placeholder="Link Name"
      />
      <label htmlFor="url">URL: </label>
      <input id="linkURLInput" type="text" name="url" placeholder="Link URL" />
      <label htmlFor="desc">Desc: </label>
      <input
        id="linkDescInput"
        type="text"
        name="desc"
        placeholder="Link Desc"
      />
      <input type="hidden" name="_csrf" value={props.csrf} />
      <input className="makeLinkSubmit" type="submit" value="Make Link" />
    </form>
  );
};

const LinkList = function (props) {
  if (props.links.length === 0) {
    return (
      <div className="linkl_ist">
        <h3 className="emptyLink">No Links yet</h3>
      </div>
    );
  }
  const linkNodes = props.links.map(function (link) {
    return (
      <div key={link._id} className="link">
        <img
          src="/assets/img/linkface.png"
          alt="link face"
          className="linkFace"
        />
        <h3 className="linkName"> Name: {link.name} </h3>
        <h3 className="linkURL">
          {" "}
          URL:{" "}
          <a href={link.url} target="_blank">
            {link.url}
          </a>{" "}
        </h3>
        <h3 className="linkDesc">
          <p>Desc: {link.desc}</p>
        </h3>
        <form
          id="deleteForm"
          onSubmit={handleDelete}
          name="deleteForm"
          action="/deleteLink"
          method="DELETE"
          className="deleteForm"
        >
          <input type="hidden" name="_id" value={link._id} />
          <input type="hidden" name="_csrf" value={props.csrf} />
          <input className="delete" type="submit" value="Delete" />
        </form>
      </div>
    );
  });
  return <div className="linkList">{linkNodes}</div>;
};

const loadLinksFromServer = () => {
  sendAjax("GET", "/getLinks", null, (data) => {
    ReactDOM.render(
      <LinkList links={data.links} csrf={csrfT} />,
      document.querySelector("#links")
    );
  });
};

const setup = function (csrf) {

  ReactDOM.render(
    <LinkForm csrf={csrf} />,
    document.querySelector("#makeLink")
  );

  ReactDOM.render(
    <LinkList links={[]} csrf={csrf} />,
    document.querySelector("#links")
  );

  loadLinksFromServer();
};

const getToken = () => {
  sendAjax("GET", "/getToken", null, (result) => {
    csrfT = result.csrfToken;
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
