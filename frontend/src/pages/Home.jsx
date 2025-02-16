import { Card, Container } from "react-bootstrap";
import URLInput from "../components/URLInput";
import InsightTable from "../components/InsightTable";

const Home = () => {
  return (
    <Container className="py-4">
      <h1 className="mb-4">Webpage Scraper</h1>
      <URLInput />
      <Card className="mt-4" style={{ width: "97vw" }}>
        <h2 className="text-center">Results</h2>
        <InsightTable />
      </Card>
    </Container>
  );
};

export default Home;
