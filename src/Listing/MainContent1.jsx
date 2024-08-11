import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import "./MainContent.css";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";

export default function MainContent() {
  const [reciters, setReciters] = useState([]);
  const [moshafs, setMoshafs] = useState([]);
  const [surahs, setSurahs] = useState(<option> اختر السورة</option>);
  const [audio, setAudio] = useState("");
  const language = "en";

  const getReciters = async () => {
    axios.get("https://mp3quran.net/api/v3/reciters").then((res) => {
      setReciters(res.data.reciters);
    });
  };

  const getMoshaf = async (reciter) => {
    await axios
      .get(
        ` https://mp3quran.net/api/v3/reciters?language=${language}&reciter=${reciter}`
      )
      .then((res) => {
        setMoshafs(res.data.reciters[0].moshaf);
      });
  };
  const getSurah = async (surahServer, surahList) => {
    await axios.get("https://mp3quran.net/api/v3/suwar").then((res) => {
      const SurahName = res.data.suwar;
      const surahListArray = surahList.split(",");
      const surahOptions = surahListArray.map((surah) => {
        const padSurah = surah.padStart(3, "0");
        const valueOfServer = surahServer + padSurah + ".mp3";
        const surahName = SurahName.find((surahName) => surahName.id == surah);
        if (surahName) {
          return (
            <option key={surah} value={valueOfServer}>
              {surahName.name}
            </option>
          );
        }
        return null;
      });
      setSurahs(surahOptions);
    });
  };

  function audioPlayer(surahMp3) {
    setAudio(surahMp3);
  }

  useEffect(() => {
    getReciters();
  }, [reciters]);

  return (
    <div className="heroImg" id="Listing">
      <img
        className="img"
        src="./img/ashkan-forouzani-sfmsMZ7ezXw-unsplash.jpg"
        alt=""
      />
      <h1 className="WelcomMasseg"> رحلة طيبة في رحاب القرآن الكريم</h1>
      <div className="modal">
        <Grid container justifyContent={"space-between"} className="Reciters ">
          <Grid
            xs={12}
            sm={6}
            md={4}
            
            className="inputContainer "
            style={{ display: "flex", flexDirection: "column", justifyContent:"center" }}
          >
            <label className="labelInput" htmlFor="">
              اختر القارئ
            </label>
            <select
              className="selectedInput"
              onChange={(e) => {
                getMoshaf(e.target.value);

                surahs;
              }}
              name=""
            >
              {reciters.map((reciter) => (
                <option value={reciter.id} key={reciter.id}>
                  {reciter.name}
                </option>
              ))}
              <option value="">اختر القارئ</option>
            </select>
          </Grid>

          <Grid
            xs={12}
            sm={6}
            md={4}
            
            className="inputContainer "
            style={{ display: "flex", flexDirection: "column", justifyContent:"center" }}
          >
            <label className="labelInput" htmlFor="">
              اختر المصحف
            </label>
            <select
              onClick={(e) => {
                const selectedOption =
                  e.currentTarget.options[e.currentTarget.selectedIndex];
                const surahServer = selectedOption.dataset.server;
                const surahList = selectedOption.dataset.surahlist;
                getSurah(surahServer, surahList);
              }}
              className="selectedInput"
              name=""
              id=""
            >
              {moshafs.map((data) => (
                <option
                  key={data.id}
                  value={data.id}
                  data-server={data.server}
                  data-surahlist={data.surah_list}
                >
                  {data.name}
                </option>
              ))}
              <option value="">اختر المصحف</option>
            </select>
          </Grid>
          <Grid
            xs={12}
            sm={6}
            md={4}
            
            className="inputContainer "
            style={{ display: "flex", flexDirection: "column", justifyContent:"center" }}
          >
            <label className="labelInput" htmlFor="">
              اختر السورة
            </label>
            <select
              onChange={(e) => {
                audioPlayer(e.target.value);
              }}
              className="selectedInput"
              name=""
            >
              {surahs}
            </select>
          </Grid>
        </Grid>
        <Row className="audioPlayer">
          <audio
            className="audioInput"
            src={audio}
            controls
            autoPlay={false}
          ></audio>
        </Row>
      </div>
    </div>
  );
}
