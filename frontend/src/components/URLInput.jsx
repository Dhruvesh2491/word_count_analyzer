import { useState } from "react";
import { useDispatch } from "react-redux";
import { createInsight } from "../store/insightSlice";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-hot-toast";

const URLInput = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);
    try {
      await dispatch(createInsight(url)).unwrap();
      toast.success("Analysis completed successfully");
      setUrl("");
    } catch (error) {
      toast.error(error.message || "Failed to analyze website");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mt-4" style={{ width: "100vw" }}>
      <Form.Group className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter Website URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </Form.Group>
      <Button type="submit" variant="secondary" disabled={loading}>
        {loading ? "Analyzing..." : "Get insights"}
      </Button>
    </Form>
  );
};

export default URLInput;
