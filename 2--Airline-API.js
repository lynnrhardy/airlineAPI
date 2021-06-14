// You work for an app company that focuses on cheap flights out of Portland, OR Airport (PDX).
// They are putting on a marketing campaign in September and want to offer a few last min flights to travelers.
// They want you to come up with the cheapest flights from PDX to (San Diego, California),
// (Austin, Texas), (Orlando, Florida) and one city of your choosing.  The dates are leaving Sept 15 and returning anytime in Sept.
// HINTS:  
//  - You find the skyscanner API and just happen upon their docs at https://skyscanner.github.io/slate/#api-documentation
//  - If you cant find the quick way to get the apiKey then maybe Jacob could help you (You get docked a pt for this)
//  - Dont forget to run npm i
// DATA Requirements:
// - Must make all calls as fast as possible.  No 'awaiting' around on this one!
// - Return cheapest flight for each destination and sort by City Name ascending
// - You get to decide the construction of your return object but Tisha will be judging what makes most sense to her
// not knowing anything about this API

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//GO TO SRC/INDEX.HTML TO VIEW THE CODE IN ACTION
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


//TODO: there has got to be a way to pass different destination parameters
//TODO: display friendly message if no results

let SAN = fetch('https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/PDX/SAN/2021-08-15/2021-08',
{
                    method: 'get',
                    headers: {
                        "x-rapidapi-key": "35d683fa82msh1dab7927a4c968bp15a135jsn544a7d82d70b",
                        "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
                    }
                })

let AUS = fetch('https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/PDX/AUS/2021-08-15/2021-08',
{
                    method: 'get',
                    headers: {
                        "x-rapidapi-key": "35d683fa82msh1dab7927a4c968bp15a135jsn544a7d82d70b",
                        "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
                    }
                })
let MCO = fetch('https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/PDX/MCO/2021-08-15/2021-08',
{
                    method: 'get',
                    headers: {
                        "x-rapidapi-key": "35d683fa82msh1dab7927a4c968bp15a135jsn544a7d82d70b",
                        "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
                    }
                })
let PHX = fetch('https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsequotes/v1.0/US/USD/en-US/PDX/PHX/2021-08-15/2021-08',
{
                    method: 'get',
                    headers: {
                        "x-rapidapi-key": "35d683fa82msh1dab7927a4c968bp15a135jsn544a7d82d70b",
                        "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
                    }
                })

//aggregate the results from multiple asynchronous operations
   Promise.all([PHX, SAN, MCO, AUS])
    .then( response => {
        response.forEach( response => {
            // console.log('FLIGHTS: ', response);
            process(response.json())
        })
    })
   
   let process = async(prom) => {
            prom.then(response => {
                let destinations = (response);
                console.log("DESTINATIONS: ", destinations);
                return [destinations].map(destination => {
                    
                    let li = createNode('li');
                    let span = createNode('span');


                //TODO: there's got to be a better way to get the correct inbound destination city name
                    let getOutbound = `${destination.Quotes[0].OutboundLeg.DestinationId}` //outbound destinatation flight number
                    let getFlightNumber1 = `${destinations.Places[0].PlaceId}` //find place that matches outbound destination flight number
                    let getFlightNumber2 = `${destinations.Places[1].PlaceId}`
                    let getFlightName1 = `${destinations.Places[0].Name}` //get name of place that matches outbound destination flight number
                    let getFlightName2 = `${destinations.Places[1].Name}`
                    console.log("FIND FLIGHT NAME/NUMBER: ", {getOutbound, getFlightNumber1, getFlightNumber2, getFlightName1, getFlightName2})

                    let destinationNumber = (getOutbound !== '' && getOutbound == getFlightNumber1) ? getFlightNumber1 : getFlightNumber2
                    let destinationName = (destinationNumber == getFlightNumber1) ? getFlightName1 : getFlightName2
                    console.log('SET DESTINATION NAME/NUMBER: ', {destinationNumber, destinationName})

                //TODO figure out how to sort names in asc order
                    span.innerHTML = `${destinationName}: $${destinations.Quotes[0].MinPrice}`;

                    append(li, span);
                    append(ul, li);
                })

            })
   
            .catch(err => {
                console.error(err);
            });
   }


const ul = document.getElementById('destinations');


// the functions that will be used to create the list items
function createNode(element) {
    return document.createElement(element);
}

//This function will append el to parent
function append(parent, el) {
    return parent.appendChild(el);
}



       