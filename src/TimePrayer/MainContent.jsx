import Grid from "@mui/material/Unstable_Grid2";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import axios from "axios";
import moment from "moment";
import { useState, useEffect } from "react";
import Prayer from "./Prayer";
import "moment/dist/locale/ar-dz";
moment.locale("ar");

export default function MainContent() {
  // STATES
  const [nextPrayerIndex, setNextPrayerIndex] = useState(2);
  const [timings, setTimings] = useState({
    Fajr: "04:20",
    Dhuhr: "11:50",
    Asr: "15:18",
    Sunset: "18:03",
    Isha: "19:33",
  });

  const [remainingTime, setRemainingTime] = useState("");

  const [selectedCity, setSelectedCity] = useState({
    displayName: "القاهرة",
    apiName: "Cairo",
  });

  const [today, setToday] = useState("");

  const avilableCities = [
    {
      displayName: "العبور",
      apiName: "Cairo",
    },
    {
      displayName: "اول جمال عبد اللناصر",
      apiName: "Aswan",
    },
  ];

  const prayersArray = [
    { key: "Fajr", displayName: "الفجر" },
    { key: "Dhuhr", displayName: "الظهر" },
    { key: "Asr", displayName: "العصر" },
    { key: "Sunset", displayName: "المغرب" },
    { key: "Isha", displayName: "العشاء" },
  ];
  const getTimings = async () => {
    console.log("calling the api");
    const response = await axios.get(
      `https://api.aladhan.com/v1/timingsByCity?country=EG&city=${selectedCity.apiName}`
    );
    setTimings(response.data.data.timings);
  };
  useEffect(() => {
    getTimings();
  }, [selectedCity]);

  useEffect(() => {
    let interval = setInterval(() => {
      console.log("calling timer");
      setupCountdownTimer();
    }, 1000);

    const t = moment();
    setToday(t.format("MMM Do YYYY | h:mm"));

    return () => {
      clearInterval(interval);
    };
  }, [timings]);

  // const data = await axios.get(
  // 	"https://api.aladhan.com/v1/timingsByCity?country=SA&city=Riyadh"
  // );

  const setupCountdownTimer = () => {
    const momentNow = moment();

    let prayerIndex = 2;

    if (
      momentNow.isAfter(moment(timings["Fajr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Dhuhr"], "hh:mm"))
    ) {
      prayerIndex = 1;
    } else if (
      momentNow.isAfter(moment(timings["Dhuhr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Asr"], "hh:mm"))
    ) {
      prayerIndex = 2;
    } else if (
      momentNow.isAfter(moment(timings["Asr"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Sunset"], "hh:mm"))
    ) {
      prayerIndex = 3;
    } else if (
      momentNow.isAfter(moment(timings["Sunset"], "hh:mm")) &&
      momentNow.isBefore(moment(timings["Isha"], "hh:mm"))
    ) {
      prayerIndex = 4;
    } else {
      prayerIndex = 0;
    }

    setNextPrayerIndex(prayerIndex);

    // now after knowing what the next prayer is, we can setup the countdown timer by getting the prayer's time
    const nextPrayerObject = prayersArray[prayerIndex];
    const nextPrayerTime = timings[nextPrayerObject.key];
    const nextPrayerTimeMoment = moment(nextPrayerTime, "hh:mm");

    let remainingTime = moment(nextPrayerTime, "hh:mm").diff(momentNow);

    if (remainingTime < 0) {
      const midnightDiff = moment("23:59:59", "hh:mm:ss").diff(momentNow);
      const fajrToMidnightDiff = nextPrayerTimeMoment.diff(
        moment("00:00:00", "hh:mm:ss")
      );

      const totalDiffernce = midnightDiff + fajrToMidnightDiff;

      remainingTime = totalDiffernce;
    }
    console.log(remainingTime);

    const durationRemainingTime = moment.duration(remainingTime);

    setRemainingTime(
      `${durationRemainingTime.seconds()} : ${durationRemainingTime.minutes()} : ${durationRemainingTime.hours()}`
    );
    console.log(
      "duration issss ",
      durationRemainingTime.hours(),
      durationRemainingTime.minutes(),
      durationRemainingTime.seconds()
    );
  };
  const handleCityChange = (event) => {
    const cityObject = avilableCities.find((city) => {
      return city.apiName == event.target.value;
    });
    console.log("the new value is ", event.target.value);
    setSelectedCity(cityObject);
  };

  return (
    <div className="mt-5 in" id="TimePrayer">
      {/* TOP ROW */}
      <Grid container>
        <Grid xs={6}>
          <div>
            <h2 style={{ direction: "" }}>{today}</h2>
            <h1>{selectedCity.displayName}</h1>
          </div>
        </Grid>

        <Grid xs={6}>
          <div>
            <h2>متبقي حتى صلاة {prayersArray[nextPrayerIndex].displayName}</h2>
            <h1>{remainingTime}</h1>
          </div>
        </Grid>
      </Grid>
      {/*== TOP ROW ==*/}

      <Divider style={{ borderColor: "white", opacity: "0.1" }} />

      {/* PRAYERS CARDS */}
      <Grid
        container
        spacing={2}
        style={{ marginTop: "15px", display: "flex", justifyContent: "center" }}
      >
        <Grid
          xs={12}
          sm={4}
          md={3}
          lg={2}
          xl={2}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Prayer
            name="الفجر"
            time={timings.Fajr}
            image="./img/fajr-prayer.png"
          />
        </Grid>
        <Grid
          xs={12}
          sm={4}
          md={3}
          lg={2}
          xl={2}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Prayer
            name="الظهر"
            time={timings.Dhuhr}
            image="./img/dhhr-prayer-mosque.png"
          />
        </Grid>
        <Grid
          xs={12}
          sm={4}
          md={3}
          lg={2}
          xl={2}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Prayer
            name="العصر"
            time={timings.Asr}
            image="./img/asr-prayer-mosque.png"
          />
        </Grid>
        <Grid
          xs={12}
          sm={4}
          md={3}
          lg={2}
          xl={2}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Prayer
            name="المغرب"
            time={timings.Sunset}
            image="./img/sunset-prayer-mosque.png"
          />
        </Grid>
        <Grid
          xs={12}
          sm={4}
          md={3}
          lg={2}
          xl={2}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Prayer
            name="العشاء"
            time={timings.Isha}
            image="./img/night-prayer-mosque.png"
          />
        </Grid>
      </Grid>

      {/*== PRAYERS CARDS ==*/}

      {/* SELECT CITY */}
      <Stack
        direction="row"
        justifyContent={"center"}
        style={{ marginTop: "40px" }}
      >
        <FormControl style={{ width: "20%" }}>
          <InputLabel id="demo-simple-select-label">
            <span style={{ color: "black" }}>المدينة</span>
          </InputLabel>
          <Select
            style={{ color: "white" }}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={age}
            label="Age"
            onChange={handleCityChange}
          >
            {avilableCities.map((city) => {
              return (
                <MenuItem value={city.apiName} key={city.apiName}>
                  {city.displayName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Stack>
    </div>
  );
}
