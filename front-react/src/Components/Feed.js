import React, { useEffect, useState } from "react";
import { setConstraint } from "../constraints";
import Navbar from "../Components/Navbar";
import "../css/feed.css";
import "../css/item_card.css";
import Axios from "axios";
import { Card, Col, Container, Row } from "react-bootstrap";

export default function Feed() {
  const [user_info, setuser_info] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
    return (
      <p style={{ fontSize: "1rem" }} className="text">
        {isReadMore ? text.slice(0, 15) : text}
        <span onClick={toggleReadMore} className="read-or-hide">
          {isReadMore ? "...." : " show less"}
        </span>
      </p>
    );
  };

  setConstraint(true);
  const [item, setitem] = useState("");
  const [Found_item, setFound_item] = useState();
  useEffect(() => {
    Axios({
      url: "http://localhost:5000/getitem",
      method: "GET",
    })
      .then((response) => {
        let data = response.data.postitems;
        let items = [];
        let Found_items = [];
        data.reverse().map((item) => {
          let created_date = new Date(item.createdAt);

          let createdAt =
            created_date.getDate() +
            "/" +
            created_date.getMonth() +
            "/" +
            created_date.getFullYear() +
            " " +
            created_date.getHours() +
            ":" +
            created_date.getMinutes();
          if (item.type === "Lost" && item.status === true) {
            let user = false;
            if (item.createdBy === user_info._id) {
              user = true;
            }
            items.push(
              <a
                href={`/${item.name}?cid=${item._id}&type=${item.type}/${user}`}
              >
                <Col key={item.name} style={{ marginTop: "2%" }} md={3}>
                  <Card bsPrefix="item-card">
                    <Card.Img
                      variant="top"
                      src={`https://ensetinnova.s3.amazonaws.com/${item.itemPictures[0].img}`}
                    />
                    <Card.Body bsPrefix="card-body">
                      <Card.Title
                        style={{
                          fontFamily: "'Noto Sans JP', sans-serif",
                          fontWeight: "1.35rem",
                        }}
                      >
                        Objet :{item.name}
                      </Card.Title>
                      {item.description ? (
                        <Card.Text
                          style={{
                            fontFamily: "'Noto Sans JP', sans-serif",
                            fontSize: "1rem",
                          }}
                        >
                          {" "}
                          Description :<ReadMore>{item.description}</ReadMore>
                        </Card.Text>
                      ) : (
                        ""
                      )}
                      <Card.Text
                        style={{
                          fontFamily: "'Noto Sans JP', sans-serif",
                          fontSize: "1rem",
                        }}
                      >
                        Créé à : {createdAt}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </a>
            );
          } else {
            var user1 = false;
            if (item.createdBy === user_info._id) {
              user1 = true;
            }
            Found_items.push(
              <a
                href={`/${item.name}?cid=${item._id}&type=${item.type}/${user1}`}
              >
                <Col style={{ marginTop: "2%" }} md={3}>
                  <Card bsPrefix="item-card" key={item.name}>
                    <Card.Img
                      variant="top"
                      src={`https://ensetinnova.s3.amazonaws.com/${item.itemPictures[0].img}`}
                    />
                    <Card.Body bsPrefix="card-body">
                      <Card.Title
                        style={{
                          fontFamily: "'Noto Sans JP', sans-serif",
                          fontWeight: "1.35rem",
                        }}
                      >
                        Objet :{item.name}
                      </Card.Title>
                      {item.description ? (
                        <Card.Text
                          style={{
                            fontFamily: "'Noto Sans JP', sans-serif",
                            fontSize: "1rem",
                          }}
                        >
                          {" "}
                          Description :<ReadMore>{item.description}</ReadMore>
                        </Card.Text>
                      ) : (
                        ""
                      )}
                      <Card.Text
                        style={{
                          fontFamily: "'Noto Sans JP', sans-serif",
                          fontSize: "1rem",
                        }}
                      >
                        créé à : {createdAt}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </a>
            );
          }
        });
        setitem(items);
        setFound_item(Found_items);
      })
      .catch((err) => {
        console.log("Error :", err);
      });
  }, []);

  return (
    <div>
      <div>
        <Navbar />
        <h2
          style={{
            fontFamily: "'Noto Sans JP', sans-serif",
            marginLeft: "5px",
          }}
        >
          Bienvenu {user_info.firstname} 👋!
        </h2>
      </div>
      <div>
        <Container fluid>
          <h2 style={{ textAlign: "center" }}>Objets perdus:</h2>
          <div className="title-border"></div>
          <Row>{item}</Row>
        </Container>
      </div>
      <div>
        <Container fluid>
          {Found_item ? (
            <div>
              <h2 style={{ textAlign: "center" }}>Objets trouvés :</h2>
              <div className="title-border"></div>
              <Row>{Found_item}</Row>
            </div>
          ) : (
            ""
          )}
        </Container>
      </div>
    </div>
  );
}
