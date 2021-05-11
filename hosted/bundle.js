"use strict";

var csrfT;

var handleLink = function handleLink(e) {
  e.preventDefault();
  $("#linkMessage").animate({
    width: "hide"
  }, 350);

  if ($("#linkName").val() == "" || $("#linkURL").val() == "") {
    handleError("RAWR! All fields are required");
    return false;
  }

  sendAjax("POST", $("#linkForm").attr("action"), $("#linkForm").serialize(), function () {
    loadLinksFromServer();
  });
  return false;
};

var handleDelete = function handleDelete(e) {
  e.preventDefault();
  sendAjax("DELETE", $("#deleteForm").attr("action"), $("#deleteForm").serialize(), function () {
    loadLinksFromServer();
  });
  return false;
};

var LinkForm = function LinkForm(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "linkForm",
    onSubmit: handleLink,
    name: "linkForm",
    action: "/maker",
    method: "POST",
    className: "linkForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "name"
  }, "Name: "), /*#__PURE__*/React.createElement("input", {
    id: "linkNameInput",
    type: "text",
    name: "name",
    placeholder: "Link Name"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "url"
  }, "URL: "), /*#__PURE__*/React.createElement("input", {
    id: "linkURLInput",
    type: "text",
    name: "url",
    placeholder: "Link URL"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "desc"
  }, "Desc: "), /*#__PURE__*/React.createElement("input", {
    id: "linkDescInput",
    type: "text",
    name: "desc",
    placeholder: "Link Desc"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "makeLinkSubmit",
    type: "submit",
    value: "Make Link"
  }));
};

var LinkList = function LinkList(props) {
  if (props.links.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "linkl_ist"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "emptyLink"
    }, "No Links yet"));
  }

  var linkNodes = props.links.map(function (link) {
    return /*#__PURE__*/React.createElement("div", {
      key: link._id,
      className: "link"
    }, /*#__PURE__*/React.createElement("img", {
      src: "/assets/img/linkface.png",
      alt: "link face",
      className: "linkFace"
    }), /*#__PURE__*/React.createElement("h3", {
      className: "linkName"
    }, " Name: ", link.name, " "), /*#__PURE__*/React.createElement("h3", {
      className: "linkURL"
    }, " ", "URL:", " ", /*#__PURE__*/React.createElement("a", {
      href: link.url,
      target: "_blank"
    }, link.url), " "), /*#__PURE__*/React.createElement("h3", {
      className: "linkDesc"
    }, /*#__PURE__*/React.createElement("p", null, "Desc: ", link.desc)), /*#__PURE__*/React.createElement("form", {
      id: "deleteForm",
      onSubmit: handleDelete,
      name: "deleteForm",
      action: "/deleteLink",
      method: "DELETE",
      className: "deleteForm"
    }, /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      name: "_id",
      value: link._id
    }), /*#__PURE__*/React.createElement("input", {
      type: "hidden",
      name: "_csrf",
      value: props.csrf
    }), /*#__PURE__*/React.createElement("input", {
      className: "delete",
      type: "submit",
      value: "Delete"
    })));
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "linkList"
  }, linkNodes);
};

var loadLinksFromServer = function loadLinksFromServer() {
  sendAjax("GET", "/getLinks", null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(LinkList, {
      links: data.links,
      csrf: csrfT
    }), document.querySelector("#links"));
  });
};

var setup = function setup(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(LinkForm, {
    csrf: csrf
  }), document.querySelector("#makeLink"));
  ReactDOM.render( /*#__PURE__*/React.createElement(LinkList, {
    links: [],
    csrf: csrf
  }), document.querySelector("#links"));
  loadLinksFromServer();
};

var getToken = function getToken() {
  sendAjax("GET", "/getToken", null, function (result) {
    csrfT = result.csrfToken;
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
"use strict";

var handleError = function handleError(message) {
  $("#errorMessage").text(message);
  $("#linkMessage").animate({
    width: 'toggle'
  }, 350);
};

var redirect = function redirect(response) {
  $("#linkMesasage").animate({
    width: 'hide'
  }, 350);
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
