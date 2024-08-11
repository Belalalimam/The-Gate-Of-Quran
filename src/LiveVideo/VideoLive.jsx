import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ReactHlsPlayer from "react-hls-player";
import Divider from "@mui/material/Divider";
import { useState } from "react";
import Button from "@mui/material/Button";

import "./VideoLive.css";
export default function VideoLive() {
  const [palyLive, setPlayLive] = useState(
    "https://win.holol.com/live/quran/playlist.m3u8"
  );

  return (
    <div className="video" id="LiveVideo">
      <Container fluid>
        <Row style={{ textAlign: "center" }}>
          <h1 className="liveTitle" style={{ fontSize: "45px" }}>اختر قناة البث المباشر</h1>
          <Col>
            <ReactHlsPlayer
              src={palyLive}
              autoPlay={false}
              controls={true}
              width="100%"
            />
          </Col>
          <Col
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "15px",
            }}
            className=""
          >
            <span style={{ marginLeft: "10px" }}>
              <Button
                style={{
                  fontSize: "19px",
                  paddingRight: "16px",
                  paddingLeft: "16px",
                  backgroundColor:"#ab998d"
                }}
                variant="contained"
                onClick={() => {
                  setPlayLive("https://win.holol.com/live/quran/playlist.m3u8");
                }}
              >
                {" "}
                قناة القرآن الكريم
              </Button>
            </span>
            <span style={{ marginRight: "20px" }}>
              <Button
                style={{
                  fontSize: "19px",
                  paddingRight: "16px",
                  paddingLeft: "16px",
                  backgroundColor:"#ab998d"
                }}
                variant="contained"
                onClick={() => {
                  setPlayLive(
                    "https://win.holol.com/live/sunnah/playlist.m3u8"
                  );
                }}
              >
                قناة السنة النبوية
              </Button>
            </span>
          </Col>
        </Row>
      </Container>
      <Divider style={{ borderColor: "white", opacity: ".1" }} />
    </div>
  );
}
