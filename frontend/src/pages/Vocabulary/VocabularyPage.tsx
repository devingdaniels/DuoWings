import NavigationBar from "../../components/homepage/NavigationBar";
import "./VocabularyPage.css";
import { Link } from "react-router-dom";

const VocabularyPage = () => {
  return (
    <>
      <NavigationBar />
      <div className="dashboard-container">
        <aside className="menu">
          <ul>
            <li>
              <Link to="/vocab/decks">Decks</Link>
            </li>
            <li>
              <Link to="/vocab/stats">Stats</Link>
            </li>
          </ul>
        </aside>
        <main className="main-content">
          <h1>Main Section Title</h1>
          <p>main content</p>
        </main>
      </div>
    </>
  );
};

export default VocabularyPage;
