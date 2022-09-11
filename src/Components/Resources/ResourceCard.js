import React, {useState, useEffect} from "react";
import resourceLinkImg from "../../Assests/link_img.png";
import ResourceItem from "./ResourceItem";

const resourceData = [
  {
    image: resourceLinkImg,
    id: "r1",
    heading: "How To Register Your Business",
    buttontext: "Open",
    target: "_blank",
    href: "https://www.example.com"
  },
  {
    image: resourceLinkImg,
    id: "r2",
    heading: "Company Registration Guide - PTY Company Registration",
    buttontext: "Open",
    target: "_blank",
    href: "https://www.example.com"
  },
  {
    image: resourceLinkImg,
    id: "r3",
    heading: "Tax Info For Small Business",
    buttontext: "Open",
    target: "_blank",
    href: "https://www.example.com"
  },
  {
    image: resourceLinkImg,
    id: "r4",
    heading: "How to expande Your Business",
    buttontext: "Open",
    target: "_blank",
    href: "https://www.example.com"
  },
  {
    image: resourceLinkImg,
    id: "r5",
    heading: "How To Market Your Product",
    buttontext: "Open",
    target: "_blank",
    href: "https://www.example.com"
  },
  {
    image: resourceLinkImg,
    id: "r6",
    heading: "How to get more visitors on your site",
    buttontext: "Open",
    target: "_blank",
    href: "https://www.example.com"
  },
  {
    image: resourceLinkImg,
    id: "r7",
    heading: "How to grow your business online.",
    buttontext: "Open",
    target: "_blank",
    href: "https://www.example.com"
  },
  {
    image: resourceLinkImg,
    id: "r8",
    heading: "How To market your business on social media.",
    buttontext: "Open",
    target: "_blank",
    href: "https://www.example.com"
  }
];

const ResourceCard = (props) => { 
  const [listPerpage, setListPerpage] = useState(5);

  const listPerpageHandler = (event) => {
    setListPerpage(event.target.value);
  }
  let resourceList = []

  resourceList = resourceData.map((list) => (
    <ResourceItem src={list.image} target={list.target} href={list.href} heading={list.heading} btntext={list.buttontext} key={list.id}/>
  ));

  useEffect(() => {
  }, [listPerpage])
  
  resourceList.length = listPerpage;

  return (
    <>
      <div className="row">
          <div className="col-md-12">
              <div className="viewBox mr-0">
                <div className="form-group">
                  <label>View:</label>
                  <select onChange={listPerpageHandler} value={listPerpage}>  
                    <option value={5}>5</option>        
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                    <option value={40}>40</option>
                  </select>
                </div>
            </div>
          </div>
        </div>
        <div className="resourceBody">
        {resourceList}
      </div>
    </>
  )
}
export default ResourceCard;