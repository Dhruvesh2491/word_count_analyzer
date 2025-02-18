import { useDispatch, useSelector } from "react-redux";
import {
  getInsights,
  removeInsight,
  markFavorite,
} from "../store/insightSlice";
import { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { toast } from "react-hot-toast";
import { AiFillDelete, AiFillHeart, AiOutlineHeart } from "react-icons/ai";

const InsightTable = () => {
  const dispatch = useDispatch();
  const { insights, loading } = useSelector((state) => state.insights);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Show 3 rows per page

  useEffect(() => {
    dispatch(getInsights());
  }, [dispatch]);

  const handleRemove = (id) => {
    dispatch(removeInsight(id))
      .then(() => toast.success("Removed successfully"))
      .catch(() => toast.error("Failed to remove"));
  };

  const handleFavorite = (id) => {
    dispatch(markFavorite(id))
      .then(() => toast.success("Updated favorite status"))
      .catch(() => toast.error("Failed to update"));
  };

  if (loading) return <div>Loading...</div>;

  const totalPages = Math.ceil(insights.length / itemsPerPage);
  const paginatedInsights = insights.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <Table responsive bordered className="mt-4" style={{ width: "100vw"}}>
        <thead>
          <tr>
            <th>Domain Name</th>
            <th>WordCount</th>
            <th>Favourite</th>
            <th>Web-Links</th>
            <th>Media-Links</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedInsights.map((insight) => (
            <tr key={insight._id}>
              <td>{insight.domainName}</td>
              <td>{insight.wordCount}</td>
              <td>{insight.favorite ? "true" : "false"}</td>
              <td>
                <ul className="list-unstyled m-0">
                  {insight.webLinks.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-break"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                <ul className="list-unstyled m-0">
                  {insight.mediaLinks.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-break"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </td>
              <td style={{ display: "flex" }}>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="me-2"
                  onClick={() => handleFavorite(insight._id)}
                >
                  {insight.favorite ? (
                    <AiFillHeart size={22} color="red" />
                  ) : (
                    <AiOutlineHeart size={22} color="gray" />
                  )}
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleRemove(insight._id)}
                >
                  <AiFillDelete size={22} color="red" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-center mt-3">
        <Button
          variant="secondary"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </Button>

        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index + 1}
            variant={
              currentPage === index + 1 ? "primary" : "outline-secondary"
            }
            className="mx-1"
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </Button>
        ))}

        <Button
          variant="secondary"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default InsightTable;
