import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Col from "react-bootstrap/Col";

export default function Prayer({ name, time, image }) {
  return (
      <Card className="prayerCard" xs={6} style={{width:"200px", backgroundColor: "#ab998d" }}>
        <CardMedia className="prayerImg" sx={{ height: 140 }} image={image} title="green iguana" />
        <CardContent>
          <h2>{name}</h2>

          <Typography variant="h2" color="text.secondary">
            {time}
          </Typography>
        </CardContent>
      </Card>
  );
}
