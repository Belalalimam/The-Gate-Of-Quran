import Row from "react-bootstrap/Row";
import axios from "axios";
import "./MainContent.css";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";



export default function MainContent() {

  const [reciters, setReciters] = useState();
  const [moshafs, setMoshafs] = useState();
  const [surahs, setSurahs] = useState();
  const [audio, setAudio] = useState();

  useEffect(() => {
    function getReciters() {
      axios.get("https://mp3quran.net/api/v3/reciters").then((res) => {
        const Reciters = res.data.reciters;
        setReciters(
          Reciters.map((r) => {
            return (
              <option value={r.id} key={r.id}>
                {r.name}
              </option>
            );
          })
        );
      });
    }
    getReciters();
  }, []);

  function getMoshaf(reciter) {
    axios
      .get(
        ` https://mp3quran.net/api/v3/reciters?reciter=${reciter}`
      )
      .then((res) => {
        const Moshafs = res.data.reciters[0].moshaf;
        setMoshafs(
          Moshafs.map((data) => (
            <option
              key={data.id}
              value={data.id}
              data-server={data.server}
              data-surahlist={data.surah_list}
            >
              {data.name}
            </option>
          ))
        );
      });
  }


  function getSurah(surahServer, surahList) {
    axios.get("https://mp3quran.net/api/v3/suwar").then((res) => {
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
  }

  // handelChangesFunctions

  function handelChangeReciters(r) {
    getMoshaf(r.target.value);
    setSurahs();
  }

  function handelChangeMoshaf(m) {
    const selectedOption =
      m.currentTarget.options[m.currentTarget.selectedIndex];
    const surahServer = selectedOption.dataset.server;
    const surahList = selectedOption.dataset.surahlist;
    getSurah(surahServer, surahList);
  }

  function handelChangeSurah(s) {
    handelChangePlaySurah(s.target.value);
  }

  function handelChangePlaySurah(surahMp3) {
    setAudio(surahMp3);
  }
  //==== handelChangesFunctions ====
 




  return (
    <div className="heroImg" id="Listing">
      <img className="img" src="./img/ashkan-forouzani-sfmsMZ7ezXw-unsplash.jpg" />
      <h1 className="WelcomMasseg"> رحلة طيبة في رحاب القرآن الكريم</h1>
      <div className="modal">
        <Grid container justifyContent={"space-between"} className="Reciters">


          <Grid className="inputContainer">
            <label className="labelInput">اختر القارئ </label>
            <select className="selectedInput" onChange={handelChangeReciters} name="">
              {reciters}      
              <option value="">اختر القارئ</option>
            </select>
          </Grid>

          <Grid className="inputContainer">
            <label className="labelInput">اختر المصحف </label>
            <select onChange={handelChangeMoshaf} className="selectedInput">
              {moshafs}
              <option value="">اختر المصحف</option>
            </select>
          </Grid>


          <Grid className="inputContainer">
            <label className="labelInput">اختر السورة </label>
            <select onChange={handelChangeSurah} className="selectedInput">
              <option> اختر السورة</option>
              {surahs}
            </select>
          </Grid>


        </Grid>
        <Row className="audioPlayer">
          <audio className="audioInput" src={audio} controls autoPlay={false} />
        </Row>
      </div>
    </div>
  );
}
