import { Container } from "@mui/material";
import Header from "./Header/Header";
import MainContent1 from "./Listing/MainContent1";
import MainContent from './TimePrayer/MainContent'
import VideoLive from "./LiveVideo/VideoLive";
import "./App.css";

export default function App() {
  return (
    <>
      <Header />
        <MainContent1 />
      <Container style={{direction:"rtl"}} maxWidth="lg">
        <VideoLive />
        <MainContent />
      </Container> 

    </>
  );
}
