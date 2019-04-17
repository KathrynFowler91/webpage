/**
 * Created by michaelcrabb on 05/03/2017.
 */


function createORCIDProfile(orcidID, elementID) {

  var ORCIDLink = "https://pub.orcid.org/v2.0/" + orcidID + "/works";

  fetch(ORCIDLink,

      {
        headers: {
          "Accept": "application/orcid+json"
        }
      })
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }

        // Examine the text in the response
        response.json().then(function(data) {

          ////DEBUG!
          // console.log(data);

          var output = "";
          for (var i in data.group) {
            //PAPER NAME
            if (data.group[i]["work-summary"]["0"].title.title.value != null) {
              var publicationName = data.group[i]["work-summary"]["0"].title.title.value;
            } 

            //PUBLICATION YEAR
            if (data.group[i]["work-summary"]["0"]["publication-date"] != null) {
              var publicationYear = data.group[i]["work-summary"]["0"]["publication-date"].year.value;
            } else {
              var publicationYear = "";
            }

            //DOI REFERENCE
            if (data.group[i]["external-ids"]["external-id"]["length"] != 0) {
              for (var j in data.group[i]["external-ids"]["external-id"]) {
                if (data.group[i]["external-ids"]["external-id"][j]["external-id-type"] == 'doi') {
                  var doiReference = data.group[i]["external-ids"]["external-id"][j]["external-id-value"];
                  break;
                }
              }
            } else {
              var doiReference = "";
            }

            //JOURNAL NAME
            var putcode = data.group[i]["work-summary"]["0"]["put-code"];
            //console.log(journalTitle);

            output += "<p><span id='publication_" + i + "'><strong>" + publicationName + "</strong>";
            output += " (" + publicationYear + ") </em></span>";
            output += " <a href='https://doi.org/" + doiReference + "'> " + doiReference + "</a></p>";
            getJournalTitle(orcidID, putcode, i);

          }

          document.getElementById(elementID).innerHTML = output;
        });
      }
    )
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
}

function getJournalTitle(orcidID, journalID, i) {
  var ORCIDLink = "https://pub.orcid.org/v2.0/" + orcidID + "/work/" + journalID;
  fetch(ORCIDLink, {
      headers: {
        "Accept": "application/orcid+json"
      }
    })
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }
        response.json().then(function(data) {
          if (data["journal-title"] != null) {
            var output = data["journal-title"].value;
            document.getElementById("publication_" + i).innerHTML = document.getElementById("publication_" + i).innerHTML + output;
          }
        });
      }
    )
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
}


function createORCIDFundingProfile(orcidID, elementID) {

var ORCIDLink = "https://pub.orcid.org/v2.0/" + orcidID + "/fundings";

  fetch(ORCIDLink,

      {
        headers: {
          "Accept": "application/orcid+json"
        }
      })
	  .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }

        // Examine the text in the response
        response.json().then(function(data) {

          ////DEBUG!
          // console.log(data);

          var output = "";
          for (var i in data.group) {

			//TITLE
            if (data.group[i]["funding-summary"]["0"].title.title.value != null) {
              var fundingTitle = data.group[i]["funding-summary"]["0"].title.title.value;
            } else {
              var fundingTitle = "";
            }
			
			//YEAR
			if (data.group[i]["funding-summary"]["0"]["start-date"].year.value != null) {
              var fundingStartDate = data.group[i]["funding-summary"]["0"]["start-date"].year.value;
            } else {
              var fundingStartDate = "";
            }
			if (data.group[i]["funding-summary"]["0"]["end-date"].year.value != null) {
              var fundingEndDate = data.group[i]["funding-summary"]["0"]["end-date"].year.value;
            } else {
              var fundingEndDate = "?";
            }
			
            //ORGANISATION NAME
            if (data.group[i]["funding-summary"]["0"]["organization"].name != null) {
              var fundingBody = data.group[i]["funding-summary"]["0"]["organization"].name;
            } else {
              var fundingBody = "";
            }
			
			//COUNTRY
			if (data.group[i]["funding-summary"]["0"]["organization"].address.country != null) {
              var fundingCountry = data.group[i]["funding-summary"]["0"]["organization"].address.country;
            } else {
              var fundingCountry = "";
            }
			
			//GRANT REFERENCE
			if (data.group[i]["funding-summary"]["0"]["external-ids"]["external-id"]["length"] != 0) {
				for (var j in data.group[i]["funding-summary"]["0"]["external-ids"]["external-id"]) {
					if (data.group[i]["funding-summary"]["0"]["external-ids"]["external-id"][j]["external-id-type"] === 'grant_number') {
						var fundingRef = data.group[i]["funding-summary"]["0"]["external-ids"]["external-id"][j]["external-id-value"];
						break;
					}
				}
			}
			

			//OUTPUT
            output += "<p><span id='publication_" + i + "'><strong>" + fundingTitle + " </strong>";
            output += " (" + fundingStartDate + "-" + fundingEndDate + ") ";
			output += fundingBody;
			output += ", " + fundingCountry;
			output += "<em> " + fundingRef + "</em>";
			output += "</span></p>";
			
          }

          document.getElementById(elementID).innerHTML = output;
        });
      }
    )
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });

}




//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

