import React from "react";
import "./SupportPage.scss";

const Support = () => {
  const localSupports = [
    {
      province: "Alberta",
      services: [
        {
          name: "Alberta Health Services - Addiction and Mental Health",
          number: "1-877-303-2642",
          address: "123 Main St, Edmonton, AB",
        },
        {
          name: "Mental Health Help Line",
          number: "1-877-303-2642",
          address: "",
        },
      ],
    },
    {
      province: "British Columbia",
      services: [
        {
          name: "BC Mental Health and Substance Use Services",
          number: "1-800-661-2121",
          address: "456 Oak St, Vancouver, BC",
        },
        {
          name: "Crisis Intervention and Suicide Prevention Centre of BC",
          number: "1-800-SUICIDE",
          address: "",
        },
      ],
    },
    {
      province: "Manitoba",
      services: [
        {
          name: "Manitoba Suicide Prevention and Support Line",
          number: "1-877-435-7170",
          address: "789 Elm St, Winnipeg, MB",
        },
      ],
    },
    {
      province: "New Brunswick",
      services: [
        {
          name: "New Brunswick Mental Health Crisis Line",
          number: "1-800-667-5005",
          address: "101 King St, Fredericton, NB",
        },
      ],
    },
    {
      province: "Newfoundland and Labrador",
      services: [
        {
          name: "Newfoundland and Labrador 24-Hour Mental Health Crisis Line",
          number: "1-888-737-4668",
          address: "567 Water St, St. John's, NL",
        },
      ],
    },
    {
      province: "Nova Scotia",
      services: [
        {
          name: "Nova Scotia Mental Health Crisis Line",
          number: "1-888-429-8167",
          address: "246 Spring Garden Rd, Halifax, NS",
        },
      ],
    },
    {
      province: "Ontario",
      services: [
        {
          name: "ConnexOntario",
          number: "1-866-531-2600",
          address: "789 Bay St, Toronto, ON",
        },
        {
          name: "Ontario Mental Health Helpline",
          number: "1-866-531-2600",
          address: "",
        },
      ],
    },
    {
      province: "Prince Edward Island",
      services: [
        {
          name: "Prince Edward Island Mental Health Crisis Line",
          number: "1-800-218-2885",
          address: "456 Queen St, Charlottetown, PE",
        },
      ],
    },
    {
      province: "Quebec",
      services: [
        {
          name: "Info-Social 811 (Province-wide)",
          number: "811",
          address: "789 Rue Saint-Jean, Quebec City, QC",
        },
        {
          name: "Suicide Action Montreal",
          number: "1-866-277-3553",
          address: "",
        },
      ],
    },
    {
      province: "Saskatchewan",
      services: [
        {
          name: "Saskatchewan HealthLine",
          number: "811",
          address: "123 Broadway Ave, Saskatoon, SK",
        },
      ],
    },
  ];

  return (
    <div className="support">
      <h1 className="support__h1">
        Local Mental Health Support Services in Canada
      </h1>
      {localSupports.map((province, index) => (
        <div key={index}>
          <h2 className="support__h2">{province.province}</h2>
          {province.services.map((service, idx) => (
            <div key={idx}>
              <h3 className="support__h3">{service.name}</h3>
              <p className="support__p">Number: {service.number}</p>
              {service.address && (
                <p className="support__p">Address: {service.address}</p>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Support;
